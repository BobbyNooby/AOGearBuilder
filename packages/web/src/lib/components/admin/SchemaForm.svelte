<script lang="ts">
	import type { Schema, SchemaField } from './schema';
	import ArrayStringEditor from './editors/ArrayStringEditor.svelte';
	import RecordNumberEditor from './editors/RecordNumberEditor.svelte';
	import RecordObjectEditor from './editors/RecordObjectEditor.svelte';
	import ObjectArrayEditor from './editors/ObjectArrayEditor.svelte';

	let {
		schema,
		value = {},
		onChange
	}: {
		schema: Schema;
		value: Record<string, any>;
		onChange: (v: Record<string, any>) => void;
	} = $props();

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

	function ensureType(field: SchemaField): any {
		if (value[field.key] !== undefined) return value[field.key];
		switch (field.type) {
			case 'array:string':
			case 'array:object':
				return [];
			case 'record:number':
			case 'record:object':
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
			// ignore invalid JSON while typing
		}
	}
</script>

<div class="grid gap-4 sm:grid-cols-2">
	{#each schema as field (field.key)}
		{@const v = ensureType(field)}
		<div class="{field.type === 'json' || field.type === 'array:object' || field.type === 'record:object' ? 'sm:col-span-2' : ''}">
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
					{#each field.options ?? [] as opt}
						<option value={opt}>{opt}</option>
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
			{/if}
			</label>
		</div>
	{/each}
</div>
