<script lang="ts">
	import MenuItem from '$lib/components/MenuItem.svelte';
	import { resolveEquipTypeLabel, RARITY_ORDER, statsStyles } from '$lib/utils';
	import { SlidersHorizontal } from 'lucide-svelte';

	let { data }: { data: { items: any[] } } = $props();

	let search = $state('');
	let sort = $state('rarity_desc');

	function cap(s: string): string {
		return s ? s[0].toUpperCase() + s.slice(1) : '';
	}

	const TYPE_ORDER = ['armor', 'accessory', 'weapon', 'gem', 'enchant', 'modifier', 'shipPart', 'magic'];

	const sortOptions = $derived.by(() => {
		const statKeys = [
			...new Set(data.items.flatMap((i: any) => Object.keys(i.scaling ?? {})))
		].sort() as string[];
		return [
			{ value: 'ep_desc', label: 'EP ↓' },
			{ value: 'ep_asc', label: 'EP ↑' },
			{ value: 'rarity_desc', label: 'Rarity ↓' },
			{ value: 'rarity_asc', label: 'Rarity ↑' },
			...statKeys.flatMap((k) => {
				const name = statsStyles[k]?.name || cap(k);
				return [
					{ value: `${k}_desc`, label: `${name} ↓` },
					{ value: `${k}_asc`, label: `${name} ↑` }
				];
			}),
			{ value: 'name_asc', label: 'Name A-Z' },
			{ value: 'name_desc', label: 'Name Z-A' },
			{ value: 'level_asc', label: 'Level ↑' },
			{ value: 'level_desc', label: 'Level ↓' }
		];
	});

	const filtered = $derived.by(() => {
		let list = data.items.filter((i: any) =>
			!search || (i.name || '').toLowerCase().includes(search.toLowerCase())
		);

		const rarityRank = (r: string) => RARITY_ORDER.indexOf(r ?? 'None');
		const epOf = (i: any) => Object.values(i.scaling ?? {}).reduce((s: number, v: any) => s + Number(v), 0);

		list = [...list].sort((a: any, b: any) => {
			if (sort === 'ep_asc' || sort === 'ep_desc') {
				const sign = sort === 'ep_asc' ? 1 : -1;
				return sign * (epOf(a) - epOf(b));
			}
			const statMatch = sort.match(/^([\w]+)_(asc|desc)$/);
			if (statMatch && statsStyles[statMatch[1]]) {
				const [, stat, dir] = statMatch;
				const sign = dir === 'asc' ? 1 : -1;
				return sign * (((a.scaling ?? {})[stat] ?? 0) - ((b.scaling ?? {})[stat] ?? 0));
			}
			switch (sort) {
				case 'name_asc': return (a.name || '').localeCompare(b.name || '');
				case 'name_desc': return (b.name || '').localeCompare(a.name || '');
				case 'level_asc': return (a.minLevel ?? 0) - (b.minLevel ?? 0);
				case 'level_desc': return (b.minLevel ?? 0) - (a.minLevel ?? 0);
				case 'rarity_asc': return rarityRank(a.rarity) - rarityRank(b.rarity);
				case 'rarity_desc': default: return rarityRank(b.rarity) - rarityRank(a.rarity);
			}
		});

		return list;
	});

	const groups = $derived.by(() => {
		const result: { type: string; subtypes: { subtype: string; label: string; items: any[] }[]; total: number }[] = [];
		for (const type of TYPE_ORDER) {
			const typeItems = filtered.filter((i: any) => i.type === type);
			if (typeItems.length === 0) continue;

			const subtypeMap: Record<string, any[]> = {};
			const noSubtype: any[] = [];
			for (const item of typeItems) {
				if (item.equipType) {
					(subtypeMap[item.equipType] ??= []).push(item);
				} else {
					noSubtype.push(item);
				}
			}

			const subtypes = Object.entries(subtypeMap)
				.sort(([a], [b]) => a.localeCompare(b))
				.map(([subtype, items]) => ({ subtype, label: resolveEquipTypeLabel(subtype), items }));

			if (noSubtype.length) {
				subtypes.unshift({ subtype: '', label: '', items: noSubtype });
			}

			result.push({ type, subtypes, total: typeItems.length });
		}
		return result;
	});
</script>

<svelte:head><title>Atlas — AO Tools</title></svelte:head>

<div class="mx-auto max-w-6xl p-4 md:p-6">
	<div class="mb-6 flex flex-wrap items-center gap-3">
		<h1 class="text-2xl md:text-3xl" style="font-family:Merriweather,serif">Atlas</h1>
		<span class="text-xs text-gray-400">{filtered.length} / {data.items.length} items</span>
	</div>

	<div class="mb-6 flex flex-wrap items-center gap-2">
		<input
			type="text"
			placeholder="Search {data.items.length} items..."
			bind:value={search}
			class="flex-1 min-w-[200px] rounded-md border border-[#30363d] bg-black px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#58a6ff]"
		/>
		<div class="flex items-center gap-1.5">
			<SlidersHorizontal class="h-3 w-3 text-gray-400" />
			<select
				bind:value={sort}
				class="rounded border border-gray-600 bg-black px-2 py-2 text-xs text-white focus:border-white focus:outline-none"
			>
				{#each sortOptions as opt (opt.value)}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>
		</div>
	</div>

	{#each groups as group (group.type)}
		<div class="mb-8">
			<details open>
				<summary class="sticky top-0 z-10 cursor-pointer border-b border-white/10 bg-[#0d1117] py-2 list-none">
					<h2 class="inline font-bold text-white" style="font-family:Merriweather,serif; font-size:1.5rem">
						{cap(group.type)}
						<span class="ml-2 text-sm font-normal text-gray-400">({group.total})</span>
					</h2>
				</summary>

				<div class="mt-2">
					{#each group.subtypes as sub (`${group.type}-${sub.subtype}`)}
						<div class="mt-4">
							{#if sub.label}
								<h3 class="mb-2 font-semibold text-gray-300" style="font-family:Merriweather,serif; font-size:1.1rem">
									{sub.label}
									<span class="ml-1 text-xs font-normal text-gray-500">({sub.items.length})</span>
								</h3>
							{/if}
							<div class="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
								{#each sub.items as item (item.id)}
									<MenuItem {item} />
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</details>
		</div>
	{/each}

	{#if groups.length === 0 && data.items.length > 0}
		<p class="mt-8 text-center text-sm text-gray-400">No items match "{search}"</p>
	{/if}
</div>
