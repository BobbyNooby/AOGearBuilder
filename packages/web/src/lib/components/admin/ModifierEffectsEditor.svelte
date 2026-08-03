<script lang="ts">
	import { STAT_NAMES } from '@aotools/shared';
	import { Plus, Trash2 } from 'lucide-svelte';

	interface Props {
		value?: any[];
		stats?: string[];
		onChange: (v: any[]) => void;
	}

	let { value = [], stats = STAT_NAMES, onChange }: Props = $props();

	const RULE_TYPES = [
		{ id: 'flatStat', label: 'Flat Stat' },
		{ id: 'steppedStat', label: 'Stepped Stat' },
		{ id: 'scaledStat', label: 'Scaled Stat' },
		{ id: 'priorityFill', label: 'Priority Fill' },
		{ id: 'scaledByBaseStatCount', label: 'Scaled By Base Stat Count' },
		{ id: 'addSocket', label: 'Add Socket' },
		{ id: 'statOverride', label: 'Stat Override' },
		{ id: 'multiplyStats', label: 'Multiply Stats' },
		{ id: 'percentageBuff', label: 'Percentage Buff' },
		{ id: 'validateExclusion', label: 'Validate Exclusion' },
		{ id: 'setVisual', label: 'Set Visual' },
		{ id: 'imbuedBonus', label: 'Imbued Bonus' },
		{ id: 'dragonBonus', label: 'Dragon Bonus' },
		{ id: 'vitalityScaling', label: 'Vitality Scaling' }
	];

	const DEFAULTS: Record<string, any> = {
		flatStat: { type: 'flatStat', stat: 'power', value: 0 },
		steppedStat: { type: 'steppedStat', stat: 'power', per10: 0 },
		scaledStat: { type: 'scaledStat', stat: 'power', multiplier: 1 },
		priorityFill: { type: 'priorityFill', order: [], per10: {}, fallback: 'power' },
		scaledByBaseStatCount: { type: 'scaledByBaseStatCount', ratio: 0 },
		addSocket: { type: 'addSocket', amount: 1 },
		statOverride: { type: 'statOverride', level: 100, stat: 'power', value: 0 },
		multiplyStats: { type: 'multiplyStats', additive: false },
		percentageBuff: { type: 'percentageBuff', stats: [], value: 0 },
		validateExclusion: { type: 'validateExclusion', target: '', action: 'block' },
		setVisual: { type: 'setVisual', key: '' },
		imbuedBonus: { type: 'imbuedBonus', ratio: 0.5 },
		dragonBonus: { type: 'dragonBonus', color: 'red' },
		vitalityScaling: { type: 'vitalityScaling' }
	};

	let newType = $state('');

	function updateRule(index: number, next: any) {
		const rules = [...value];
		rules[index] = next;
		onChange(rules);
	}

	function removeRule(index: number) {
		const rules = [...value];
		rules.splice(index, 1);
		onChange(rules);
	}

	function addRule() {
		if (!newType) return;
		const rules = [...value, { ...DEFAULTS[newType] }];
		newType = '';
		onChange(rules);
	}

	function isKnownType(t: string): boolean {
		return RULE_TYPES.some((r) => r.id === t);
	}

	function setField(rule: any, index: number, key: string, val: any) {
		updateRule(index, { ...rule, [key]: val });
	}

	function setNested(rule: any, index: number, key: string, val: any) {
		updateRule(index, { ...rule, [key]: { ...(rule[key] ?? {}), ...val } });
	}

	function addToArray(rule: any, index: number, key: string, val: string) {
		if (!val || (rule[key] ?? []).includes(val)) return;
		setField(rule, index, key, [...(rule[key] ?? []), val]);
	}

	function removeFromArray(rule: any, index: number, key: string, val: string) {
		setField(rule, index, key, (rule[key] ?? []).filter((x: string) => x !== val));
	}

	function addPer10(rule: any, index: number, stat: string) {
		if (!stat || rule.per10?.[stat] != null) return;
		setNested(rule, index, 'per10', { [stat]: 0 });
	}

	function removePer10(rule: any, index: number, stat: string) {
		const next = { ...(rule.per10 ?? {}) };
		delete next[stat];
		setField(rule, index, 'per10', next);
	}
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<div class="space-y-3">
	<div class="flex items-center gap-2">
		<select bind:value={newType} class="rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white">
			<option value="">Add effect...</option>
			{#each RULE_TYPES as rt}
				<option value={rt.id}>{rt.label}</option>
			{/each}
		</select>
		<button
			disabled={!newType}
			onclick={addRule}
			class="inline-flex items-center gap-1 rounded border border-white/30 px-2 py-1 text-xs hover:bg-white/10 disabled:opacity-50"
		>
			<Plus class="h-3 w-3" /> Add
		</button>
	</div>

	{#each value as rule, i (rule)}
		<div class="rounded border border-gray-600 bg-black/40 p-3">
			<div class="mb-2 flex items-center justify-between">
				{#if isKnownType(rule.type)}
					<span class="text-sm font-bold text-white">{RULE_TYPES.find((r) => r.id === rule.type)?.label}</span>
				{:else}
					<span class="text-sm font-bold text-yellow-400">{rule.type}</span>
				{/if}
				<button onclick={() => removeRule(i)} class="text-red-400 hover:text-red-300" aria-label="Remove effect">
					<Trash2 class="h-4 w-4" />
				</button>
			</div>

			{#if !isKnownType(rule.type)}
				<textarea
					value={JSON.stringify(rule, null, 2)}
					oninput={(e) => {
						try {
							updateRule(i, JSON.parse((e.target as HTMLTextAreaElement).value));
						} catch {}
					}}
					class="min-h-[8rem] w-full rounded border border-gray-600 bg-black px-2 py-1 font-mono text-xs text-white"
				></textarea>
			{:else}
				<div class="grid gap-3 sm:grid-cols-2">
					<!-- Common stat field for rule types that use a single stat -->
					{#if ['flatStat', 'steppedStat', 'scaledStat', 'statOverride'].includes(rule.type)}
						<div>
							<label class="block text-xs text-gray-400">Stat</label>
							<select
								value={rule.stat}
								onchange={(e) => setField(rule, i, 'stat', (e.target as HTMLSelectElement).value)}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							>
								{#each stats as s}
									<option value={s}>{s}</option>
								{/each}
							</select>
						</div>
					{/if}

					{#if rule.type === 'flatStat'}
						<div>
							<label class="block text-xs text-gray-400">Value</label>
							<input
								type="number"
								value={rule.value ?? 0}
								oninput={(e) => setField(rule, i, 'value', Number((e.target as HTMLInputElement).value))}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
						<div>
							<label class="block text-xs text-gray-400">Per 10 (optional)</label>
							<input
								type="number"
								value={rule.per10 ?? ''}
								oninput={(e) => setField(rule, i, 'per10', (e.target as HTMLInputElement).value === '' ? undefined : Number((e.target as HTMLInputElement).value))}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
					{/if}

					{#if rule.type === 'steppedStat'}
						<div>
							<label class="block text-xs text-gray-400">Per 10</label>
							<input
								type="number"
								value={rule.per10 ?? 0}
								oninput={(e) => setField(rule, i, 'per10', Number((e.target as HTMLInputElement).value))}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
						<div>
							<label class="block text-xs text-gray-400">Cap Level</label>
							<input
								type="number"
								value={rule.cap?.level ?? ''}
								oninput={(e) => setNested(rule, i, 'cap', { level: Number((e.target as HTMLInputElement).value) })}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
					{/if}

					{#if rule.type === 'scaledStat'}
						<div>
							<label class="block text-xs text-gray-400">Multiplier</label>
							<input
								type="number"
								value={rule.multiplier ?? 1}
								oninput={(e) => setField(rule, i, 'multiplier', Number((e.target as HTMLInputElement).value))}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
					{/if}

					{#if rule.type === 'statOverride'}
						<div>
							<label class="block text-xs text-gray-400">Level</label>
							<input
								type="number"
								value={rule.level ?? 100}
								oninput={(e) => setField(rule, i, 'level', Number((e.target as HTMLInputElement).value))}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
						<div>
							<label class="block text-xs text-gray-400">Value</label>
							<input
								type="number"
								value={rule.value ?? 0}
								oninput={(e) => setField(rule, i, 'value', Number((e.target as HTMLInputElement).value))}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
					{/if}

					{#if rule.type === 'scaledByBaseStatCount'}
						<div>
							<label class="block text-xs text-gray-400">Ratio</label>
							<input
								type="number"
								step="0.01"
								value={rule.ratio ?? 0}
								oninput={(e) => setField(rule, i, 'ratio', Number((e.target as HTMLInputElement).value))}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
					{/if}

					{#if rule.type === 'imbuedBonus'}
						<div>
							<label class="block text-xs text-gray-400">Ratio</label>
							<input
								type="number"
								step="0.01"
								value={rule.ratio ?? 0.5}
								oninput={(e) => setField(rule, i, 'ratio', Number((e.target as HTMLInputElement).value))}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
					{/if}

					{#if rule.type === 'dragonBonus'}
						<div>
							<label class="block text-xs text-gray-400">Color</label>
							<input
								type="text"
								value={rule.color ?? ''}
								oninput={(e) => setField(rule, i, 'color', (e.target as HTMLInputElement).value)}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
					{/if}

					{#if rule.type === 'addSocket'}
						<div>
							<label class="block text-xs text-gray-400">Amount</label>
							<input
								type="number"
								value={rule.amount ?? 1}
								oninput={(e) => setField(rule, i, 'amount', Number((e.target as HTMLInputElement).value))}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
					{/if}

					{#if rule.type === 'multiplyStats'}
						<div class="sm:col-span-2">
							<label class="flex items-center gap-2 text-sm text-white">
								<input
									type="checkbox"
									checked={!!rule.additive}
									onchange={(e) => setField(rule, i, 'additive', (e.target as HTMLInputElement).checked)}
									class="rounded border-gray-600"
								/>
								Additive
							</label>
							<p class="mt-1 text-xs text-gray-400">Additional stat keys are allowed in this rule.</p>
						</div>
					{/if}

					{#if rule.type === 'percentageBuff'}
						<div class="sm:col-span-2">
							<label class="block text-xs text-gray-400">Stats</label>
							<div class="flex flex-wrap gap-2">
								{#each stats as s}
									<label class="flex items-center gap-1 text-xs text-white">
										<input
											type="checkbox"
											checked={(rule.stats ?? []).includes(s)}
											onchange={(e) => {
												const checked = (e.target as HTMLInputElement).checked;
												if (checked) addToArray(rule, i, 'stats', s);
												else removeFromArray(rule, i, 'stats', s);
											}}
											class="rounded border-gray-600"
										/>
										{s}
									</label>
								{/each}
							</div>
							<div class="mt-2 grid gap-3 sm:grid-cols-2">
								<div>
									<label class="block text-xs text-gray-400">Value</label>
									<input
										type="number"
										step="0.01"
										value={rule.value ?? 0}
										oninput={(e) => setField(rule, i, 'value', Number((e.target as HTMLInputElement).value))}
										class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
									/>
								</div>
								<div class="flex items-center">
									<label class="flex items-center gap-2 text-sm text-white">
										<input
											type="checkbox"
											checked={!!rule.perTier}
											onchange={(e) => setField(rule, i, 'perTier', (e.target as HTMLInputElement).checked)}
											class="rounded border-gray-600"
										/>
										Per tier
									</label>
								</div>
							</div>
						</div>
					{/if}

					{#if rule.type === 'validateExclusion'}
						<div>
							<label class="block text-xs text-gray-400">Target</label>
							<input
								type="text"
								value={rule.target ?? ''}
								oninput={(e) => setField(rule, i, 'target', (e.target as HTMLInputElement).value)}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
						<div>
							<label class="block text-xs text-gray-400">Action</label>
							<select
								value={rule.action ?? 'block'}
								onchange={(e) => setField(rule, i, 'action', (e.target as HTMLSelectElement).value)}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							>
								<option value="block">block</option>
								<option value="remove">remove</option>
							</select>
						</div>
					{/if}

					{#if rule.type === 'setVisual'}
						<div>
							<label class="block text-xs text-gray-400">Key</label>
							<input
								type="text"
								value={rule.key ?? ''}
								oninput={(e) => setField(rule, i, 'key', (e.target as HTMLInputElement).value)}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							/>
						</div>
					{/if}
				</div>

				{#if rule.type === 'priorityFill'}
					<div class="mt-3 space-y-3">
						<div>
							<label class="block text-xs text-gray-400">Order</label>
							<div class="flex flex-wrap gap-2">
								{#each rule.order ?? [] as s, idx (s)}
									<span class="inline-flex items-center gap-1 rounded border border-gray-600 bg-black px-2 py-1 text-xs">
										{s}
										<button onclick={() => removeFromArray(rule, i, 'order', s)} class="text-red-400 hover:text-red-300">×</button>
									</span>
								{/each}
							</div>
							<div class="mt-1 flex items-center gap-2">
								<select
									onchange={(e) => {
										const val = (e.target as HTMLSelectElement).value;
										if (val) {
											addToArray(rule, i, 'order', val);
											(e.target as HTMLSelectElement).value = '';
										}
									}}
									class="rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
								>
									<option value="">Add stat...</option>
									{#each stats.filter((s) => !(rule.order ?? []).includes(s)) as s}
										<option value={s}>{s}</option>
									{/each}
								</select>
							</div>
						</div>
						<div>
							<label class="block text-xs text-gray-400">Fallback</label>
							<select
								value={rule.fallback}
								onchange={(e) => setField(rule, i, 'fallback', (e.target as HTMLSelectElement).value)}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
							>
								{#each stats as s}
									<option value={s}>{s}</option>
								{/each}
							</select>
						</div>
						<div>
							<label class="block text-xs text-gray-400">Per 10 values</label>
							<div class="flex flex-wrap gap-2">
								{#each Object.keys(rule.per10 ?? {}) as stat (stat)}
									<div class="flex items-center gap-2 rounded border border-gray-600 bg-black px-2 py-1 text-xs">
										<span>{stat}</span>
										<input
											type="number"
											value={rule.per10[stat]}
											oninput={(e) => setNested(rule, i, 'per10', { [stat]: Number((e.target as HTMLInputElement).value) })}
											class="w-16 rounded border border-gray-600 bg-black px-1 py-0.5 text-white"
										/>
										<button onclick={() => removePer10(rule, i, stat)} class="text-red-400 hover:text-red-300">×</button>
									</div>
								{/each}
								</div>
								<div class="mt-1 flex items-center gap-2">
									<select
										onchange={(e) => {
											const val = (e.target as HTMLSelectElement).value;
											if (val) {
												addPer10(rule, i, val);
												(e.target as HTMLSelectElement).value = '';
											}
										}}
										class="rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white"
									>
										<option value="">Add per10 stat...</option>
										{#each stats.filter((s) => rule.per10?.[s] == null) as s}
											<option value={s}>{s}</option>
										{/each}
									</select>
									</div>
								</div>
							</div>
						{/if}
			{/if}
		</div>
{:else}
	<p class="text-sm text-gray-400">No effects.</p>
{/each}
</div>
