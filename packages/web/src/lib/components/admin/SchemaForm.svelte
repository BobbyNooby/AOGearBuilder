<script lang="ts">
	import type { Schema, SchemaField } from './schema';
	import ArrayStringEditor from './editors/ArrayStringEditor.svelte';
	import RecordNumberEditor from './editors/RecordNumberEditor.svelte';
	import RecordObjectEditor from './editors/RecordObjectEditor.svelte';
	import ObjectArrayEditor from './editors/ObjectArrayEditor.svelte';
	import LevelRangeSlider from './LevelRangeSlider.svelte';
	import StatPicker from './StatPicker.svelte';
	import { typeFields } from '$lib/adminSchemas';

	const baseFields = new Set([
		'id', 'name', 'type', 'rarity', 'minLevel', 'scaling',
		'description', 'imageUrl', 'obtainedBy', 'tags', 'isEndgame', 'flags'
	]);

	let {
		schema,
		value = {},
		onChange,
		typeFilter = '',
		config = undefined as any
	}: {
		schema: Schema;
		value: Record<string, any>;
		onChange: (v: Record<string, any>) => void;
		typeFilter?: string;
		config?: any;
	} = $props();

	const visibleSchema = $derived(typeFilter
		? schema.filter((f) => {
			const allowed = typeFields[typeFilter] || [];
			return baseFields.has(f.key) || allowed.includes(f.key);
		})
		: schema
	);

	function setValue(key: string, next: any) {
		onChange({ ...value, [key]: next });
	}

	function handleNumber(key: string, raw: string, nullable?: boolean) {
		if (raw === '' && nullable) {
			setValue(key, null);
		} else {
			const n = Number(raw);
			setValue(key, Number.isNaN(n) ? 0 : n);
		}
	}

	function handleRange(minVal: number, maxVal: number) {
		onChange({ ...value, minLevel: minVal, maxLevel: maxVal });
	}

	function getSelectOptions(field: SchemaField): string[] {
		if (field.constrainedBy === 'type') {
			const t = typeFilter || value.type;
			if (!t || !config?.equipTypes) return field.options ?? [];
			return Object.entries(config.equipTypes as Record<string, { appliesTo?: string[] }>)
				.filter(([, def]) => def.appliesTo?.includes(t))
				.map(([key]) => key);
		}
		return field.options ?? [];
	}

	function getOptionLabel(field: SchemaField, opt: string): string {
		if (field.labels) return field.labels[opt] ?? opt;
		if (field.constrainedBy === 'type' && config?.equipTypes?.[opt]) {
			return config.equipTypes[opt].label ?? opt;
		}
		return opt;
	}

	function ensureType(field: SchemaField): any {
		if (value[field.key] !== undefined) return value[field.key];
		switch (field.type) {
			case 'array:string':
			case 'array:object':
				return [];
			case 'record:number':
			case 'record:object':
			case 'stat-map':
				return {};
			case 'boolean':
				return false;
			case 'number':
				return 0;
			case 'json':
				return {};
			default:
				return '';
		}
	}

	function jsonStringify(v: unknown) {
		try {
			return JSON.stringify(v ?? {}, null, 2);
		} catch {
			return '';
		}
	}

	function jsonUpdate(key: string, raw: string) {
		try {
			setValue(key, JSON.parse(raw));
		} catch {
		}
	}
</script>

<div class="grid gap-4 sm:grid-cols-2">
	{#each visibleSchema as field (field.key)}
		{@const v = ensureType(field)}
		<div class="{field.type === 'json' || field.type === 'array:object' || field.type === 'record:object' || field.type === 'stat-map' || field.type === 'range' ? 'sm:col-span-2' : ''}">
			<label class="block text-xs font-bold uppercase tracking-wider text-gray-400">
				<span class="mb-1 block">{field.label ?? field.key}{field.required ? ' *' : ''}</span>

			{#if field.type === 'string' || field.type === 'textarea'}
				{#if field.type === 'textarea'}
					<textarea
						value={v ?? ''}
						oninput={(e) => setValue(field.key, (e.target as HTMLTextAreaElement).value)}
						placeholder={field.placeholder}
						readonly={field.readonly}
						class="min-h-[6rem] w-full rounded border border-gray-600 bg-black px-3 py-2 text-sm text-white focus:border-white focus:outline-none {field.readonly ? 'cursor-not-allowed opacity-70' : ''}"
					></textarea>
				{:else}
					<input
						type="text"
						value={v ?? ''}
						oninput={(e) => setValue(field.key, (e.target as HTMLInputElement).value)}
						placeholder={field.placeholder}
						readonly={field.readonly}
						class="w-full rounded border border-gray-600 bg-black px-3 py-2 text-sm text-white focus:border-white focus:outline-none {field.readonly ? 'cursor-not-allowed opacity-70' : ''}"
					/>
				{/if}
			{:else if field.type === 'number'}
				<input
					type="number"
					value={v ?? (field.nullable ? '' : 0)}
					min={field.min ?? undefined}
					max={field.max ?? undefined}
					oninput={(e) => handleNumber(field.key, (e.target as HTMLInputElement).value, field.nullable)}
					readonly={field.readonly}
					class="w-full rounded border border-gray-600 bg-black px-3 py-2 text-sm text-white focus:border-white focus:outline-none {field.readonly ? 'cursor-not-allowed opacity-70' : ''}"
				/>
			{:else if field.type === 'boolean'}
				{#if field.readonly}
					<span class="rounded border px-3 py-2 text-sm {v ? 'border-white bg-white text-black' : 'border-gray-600 bg-black text-gray-300'}">
						{v ? 'Yes' : 'No'}
					</span>
				{:else}
					<button
						type="button"
						onclick={() => setValue(field.key, !v)}
						class="rounded border px-3 py-2 text-sm {v ? 'border-white bg-white text-black' : 'border-gray-600 bg-black text-gray-300'}"
					>
						{v ? 'Yes' : 'No'}
					</button>
				{/if}
			{:else if field.type === 'select'}
				<select
					value={v ?? ''}
					onchange={(e) => setValue(field.key, (e.target as HTMLSelectElement).value)}
					disabled={field.readonly}
					class="w-full rounded border border-gray-600 bg-black px-3 py-2 text-sm text-white focus:border-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
				>
					{#each getSelectOptions(field) as opt}
						<option value={opt}>{field.constrainedBy ? getOptionLabel(field, opt) : (field.labels ? (field.labels[opt] ?? opt) : opt)}</option>
					{/each}
				</select>
			{:else if field.type === 'multiselect'}
				<select
					multiple
					value={Array.isArray(v) ? v : []}
					onchange={(e) => {
						const selected = Array.from((e.target as HTMLSelectElement).selectedOptions).map((o) => o.value);
						setValue(field.key, selected);
					}}
					disabled={field.readonly}
					class="min-h-[6rem] w-full rounded border border-gray-600 bg-black px-3 py-2 text-sm text-white focus:border-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
				>
					{#each field.options ?? [] as opt}
						<option value={opt} selected={Array.isArray(v) && v.includes(opt)}>{opt}</option>
					{/each}
				</select>
			{:else if field.type === 'array:string'}
				<ArrayStringEditor value={v} onChange={(next) => setValue(field.key, next)} />
			{:else if field.type === 'record:number'}
				<RecordNumberEditor value={v} onChange={(next) => setValue(field.key, next)} />
			{:else if field.type === 'record:object'}
				<RecordObjectEditor value={v} valueSchema={field.valueSchema ?? []} onChange={(next) => setValue(field.key, next)} />
			{:else if field.type === 'array:object'}
				<ObjectArrayEditor value={v} itemSchema={field.itemSchema ?? []} onChange={(next) => setValue(field.key, next)} />
			{:else if field.type === 'json'}
				<textarea
					value={jsonStringify(v)}
					oninput={(e) => jsonUpdate(field.key, (e.target as HTMLTextAreaElement).value)}
					class="min-h-[10rem] w-full rounded border border-gray-600 bg-black px-3 py-2 font-mono text-xs text-white focus:border-white focus:outline-none"
				></textarea>
			{:else if field.type === 'range'}
				<LevelRangeSlider
					min={field.min ?? 10}
					max={config?.maxLevel ?? field.max ?? 175}
					minValue={value.minLevel ?? 10}
					maxValue={value.maxLevel ?? config?.maxLevel ?? 175}
					step={field.step ?? 10}
					onChange={handleRange}
				/>
			{:else if field.type === 'stat-map'}
				<StatPicker
					value={v ?? {}}
					stats={config?.statRegistry ? Object.keys(config.statRegistry) : []}
					{config}
					onChange={(next) => setValue(field.key, next)}
				/>
			{/if}
			</label>
		</div>
	{/each}
</div>
