<script lang="ts">
	import { STAT_NAMES, DEFAULT_MAX_LEVEL } from '@aotools/shared';
	import { statsStyles, statImageUrl } from '$lib/utils';

	interface Props {
		value?: Record<string, Record<string, number>>;
		maxLevel?: number;
		stats?: string[];
		config?: { statRegistry?: Record<string, { imageUrl?: string }> };
		onChange: (v: Record<string, Record<string, number>>) => void;
	}

	let { value = {}, maxLevel = DEFAULT_MAX_LEVEL, stats = STAT_NAMES, config, onChange }: Props = $props();

	const levels = $derived(Array.from({ length: Math.floor(maxLevel / 10) }, (_, i) => String((i + 1) * 10)));
	const allStats = $derived(stats);

	function getCell(level: string, stat: string): number | undefined {
		return value?.[level]?.[stat];
	}

	function hasAnyValue(): boolean {
		const v = value ?? {};
		return levels.some((lvl) => v[lvl] && Object.keys(v[lvl]).length > 0);
	}

	function cleanValue(src: Record<string, Record<string, number>>): Record<string, Record<string, number>> {
		const next: Record<string, Record<string, number>> = {};
		for (const [lvl, stats] of Object.entries(src)) {
			const clean: Record<string, number> = {};
			for (const [k, v] of Object.entries(stats)) {
				if (v !== 0 && v != null) clean[k] = v;
			}
			if (Object.keys(clean).length) next[lvl] = clean;
		}
		return next;
	}

	function setCell(level: string, stat: string, raw: string) {
		const n = raw === '' ? undefined : Number(raw);
		let next = cleanValue(value ?? {});
		if (n !== undefined && n !== 0) {
			next = { ...next, [level]: { ...(next[level] ?? {}), [stat]: n } };
		} else {
			const rest = { ...(next[level] ?? {}) };
			delete rest[stat];
			if (Object.keys(rest).length) {
				next = { ...next, [level]: rest };
			} else {
				next = { ...next };
				delete next[level];
			}
		}
		onChange(next);
	}

	function removeStat(stat: string) {
		const next: Record<string, Record<string, number>> = {};
		for (const [lvl, stats] of Object.entries(value ?? {})) {
			const clean: Record<string, number> = {};
			for (const [k, v] of Object.entries(stats)) {
				if (k !== stat && v !== 0 && v != null) clean[k] = v;
			}
			if (Object.keys(clean).length) next[lvl] = clean;
		}
		onChange(next);
	}
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<div class="space-y-3">
	<div class="flex items-center gap-2">
		<label class="text-xs font-bold uppercase tracking-wider text-gray-400">Stat Overrides</label>
		{#if !hasAnyValue()}
			<span class="text-xs text-gray-500">(no overrides set)</span>
		{/if}
	</div>

	<div class="overflow-auto rounded border border-gray-600">
		<table class="w-full text-left text-sm text-white">
			<thead class="bg-black/60 text-xs uppercase text-gray-400">
				<tr>
					<th class="sticky left-0 bg-black/60 px-3 py-2">Level</th>
					{#each allStats as stat}
						<th class="px-3 py-2">
							<div class="flex items-center gap-2">
								<img
									class="h-4 w-4"
									src={statImageUrl(stat, config)}
									alt={stat}
									onerror={(e) => (e.currentTarget as HTMLElement).remove()}
								/>
								{stat}
								<button onclick={() => removeStat(stat)} class="text-red-400 hover:text-red-300" aria-label="Remove stat column">×</button>
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each levels as level, i}
					<tr class="border-t border-gray-700 {i % 2 === 1 ? 'bg-white/5' : ''}">
						<td class="sticky left-0 bg-inherit px-3 py-1 font-mono text-xs">{level}</td>
						{#each allStats as stat}
							<td class="px-2 py-1">
								<input
									type="number"
									value={getCell(level, stat) ?? ''}
									onchange={(e) => setCell(level, stat, (e.target as HTMLInputElement).value)}
									class="w-20 rounded border border-gray-600 bg-black px-2 py-1 text-sm text-white focus:border-white focus:outline-none"
								/>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="text-xs text-gray-400">Leave a cell blank to omit the override for that level/stat. Values are saved when you leave the input.</p>
</div>
