<script lang="ts">
	import { statsStyles, statImageUrl, staticImagesRootFolder } from '$lib/utils';

	interface Props {
		value?: Record<string, number>;
		stats?: string[];
		config?: { statRegistry?: Record<string, { imageUrl?: string }> };
		onChange?: (v: Record<string, number>) => void;
	}

	let { value = {}, stats = [], config, onChange }: Props = $props();

	const entries = $derived(Object.entries(value));
	let adding = $state(false);
	let newStat = $state('');
	let newVal = $state('');

	const availableStats = $derived(stats.filter((s) => !(s in value)));

	function setCell(stat: string, raw: string) {
		const n = Number(raw);
		const next = { ...value };
		if (isNaN(n) || raw === '') {
			delete next[stat];
		} else {
			next[stat] = n;
		}
		onChange?.(next);
	}

	function confirmAdd() {
		const n = Number(newVal);
		if (!newStat || isNaN(n)) return;
		const next = { ...value, [newStat]: n };
		onChange?.(next);
		newStat = '';
		newVal = '';
		adding = false;
	}

	function removeStat(stat: string) {
		const next = { ...value };
		delete next[stat];
		onChange?.(next);
	}

	function cap(s: string): string { return s ? s[0].toUpperCase() + s.slice(1) : ''; }
</script>

<div class="space-y-2">
	<div class="overflow-auto rounded border border-gray-600">
		<table class="w-full text-left text-sm text-white">
			<thead class="bg-black/60 text-xs uppercase text-gray-400">
				<tr>
					<th class="px-3 py-2">Stat</th>
					<th class="px-3 py-2 w-32">Multiplier</th>
					<th class="w-10"></th>
				</tr>
			</thead>
			<tbody>
				{#each entries as [stat, val], i}
					<tr class="border-t border-gray-700 {i % 2 === 1 ? 'bg-white/5' : ''}">
						<td class="px-3 py-1">
							<div class="flex items-center gap-2">
								<img
									class="h-5 w-5"
									src={statImageUrl(stat, config)}
									alt={stat}
									onerror={(e) => (e.currentTarget as HTMLElement).remove()}
								/>
								<span>{statsStyles[stat]?.name || cap(stat)}</span>
							</div>
						</td>
						<td class="px-2 py-1">
							<input
								type="number"
								value={val}
								step="any"
								onchange={(e) => setCell(stat, (e.target as HTMLInputElement).value)}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white focus:border-white focus:outline-none"
							/>
						</td>
						<td class="px-2 py-1">
							<button
								onclick={() => removeStat(stat)}
								class="text-red-400 hover:text-red-300"
								aria-label="Remove {stat}"
							>×</button>
						</td>
					</tr>
				{/each}

				{#if adding}
					<tr class="border-t border-gray-700 bg-white/5">
						<td class="px-3 py-1">
							<select
								bind:value={newStat}
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white focus:border-white focus:outline-none"
							>
								<option value="">Pick stat...</option>
								{#each availableStats as s}
									<option value={s}>{statsStyles[s]?.name || cap(s)}</option>
								{/each}
							</select>
						</td>
						<td class="px-2 py-1">
							<input
								type="number"
								bind:value={newVal}
								step="any"
								placeholder="Value"
								class="w-full rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white focus:border-white focus:outline-none"
							/>
						</td>
						<td class="px-2 py-1">
							<div class="flex items-center gap-1">
								<button
									onclick={confirmAdd}
									disabled={!newStat || !newVal}
									class="rounded border border-white/30 px-2 py-0.5 text-xs text-white hover:bg-white/10 disabled:opacity-50"
								>+</button>
								<button
									onclick={() => { adding = false; newStat = ''; newVal = ''; }}
									class="text-gray-400 hover:text-white"
								>×</button>
							</div>
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>

	{#if !adding}
		<button
			type="button"
			onclick={() => adding = true}
			disabled={availableStats.length === 0}
			class="rounded border border-white/30 bg-black px-3 py-1 text-xs text-white hover:bg-white/10 disabled:opacity-50"
		>
			+ Add Stat
		</button>
	{/if}
</div>
