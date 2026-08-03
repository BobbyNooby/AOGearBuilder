<script lang="ts">
	import { fade } from 'svelte/transition';
	import MenuItem from '../MenuItem.svelte';
	import Item from '../Item.svelte';
	import FilterBar from '../ui/FilterBar.svelte';
	import type { ActiveFilter, FilterCategory, SortOption } from '../ui/FilterBar.svelte';
	import { staticImagesRootFolder, RARITY_ORDER, statsStyles } from '$lib/utils';

	let {
		show, items, field, onSelect, onClose,
		validate
	}: {
		show: boolean; items: Record<string, any>[]; field: string;
		onSelect: (id: string) => void; onClose: () => void;
		validate?: (item: Record<string, any>) => { valid: boolean; reason?: string };
	} = $props();

	let search = $state('');
	let pickerFilters: ActiveFilter[] = $state([]);
	let pickerSort = $state('ep_desc');

	function isValid(item: Record<string, any>) {
		if (!validate) return true;
		return validate(item).valid;
	}

	function cap(s: string): string {
		return s ? s[0].toUpperCase() + s.slice(1) : '';
	}

	const pickerSortOptions = $derived.by((): SortOption[] => {
		const statKeys = [...new Set(items.flatMap((it) => Object.keys(it.scaling ?? {})))].sort() as string[];
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

	const pickerFilterCategories = $derived.by((): FilterCategory[] => {
		const rarities = ([...new Set(items.map((it) => it.rarity).filter(Boolean))] as string[])
			.sort((a, b) => RARITY_ORDER.indexOf(a ?? 'None') - RARITY_ORDER.indexOf(b ?? 'None'));
		const statKeys = [...new Set(items.flatMap((it) => Object.keys(it.scaling ?? {})))].sort() as string[];
		return [
			{
				key: 'rarity',
				label: 'Rarity',
				options: rarities.map((r) => ({ value: r, label: r, count: items.filter((it) => it.rarity === r).length }))
			},
			{
				key: 'stats',
				label: 'Stats',
				toggleMode: true,
				options: statKeys.map((s) => ({
					value: s,
					label: statsStyles[s]?.name || cap(s),
					count: items.filter((it) => (it.scaling ?? {})[s] != null).length
				}))
			},
			{
				key: 'endgame',
				label: 'Endgame',
				options: [{ value: true, label: 'Yes', count: items.filter((it) => it.isEndgame === true).length }]
			}
		].filter((c) => c.options.length > 0 && c.options.some((o) => o.count && o.count > 0));
	});

	let filtered = $derived.by(() => {
		let list = items.filter(it =>
			(!search || (it.name || it.id || '').toLowerCase().includes(search.toLowerCase())) &&
			isValid(it)
		);

		const groups: Record<string, (string | boolean)[]> = {};
		for (const f of pickerFilters) {
			(groups[f.categoryKey] ||= []).push(f.value);
		}

		for (const [categoryKey, values] of Object.entries(groups)) {
			switch (categoryKey) {
				case 'rarity':
					list = list.filter((it) => values.includes(it.rarity));
					break;
				case 'stats': {
					const statFilters = pickerFilters.filter((f) => f.categoryKey === 'stats');
					const includes = statFilters.filter((f) => f.mode === 'include').map((f) => String(f.value));
					const excludes = statFilters.filter((f) => f.mode === 'exclude').map((f) => String(f.value));
					if (includes.length) {
						list = list.filter((it) => includes.every((s) => (it.scaling ?? {})[s] != null));
					}
					if (excludes.length) {
						list = list.filter((it) => excludes.every((s) => (it.scaling ?? {})[s] == null));
					}
					break;
				}
				case 'endgame':
					list = list.filter((it) => it.isEndgame === true);
					break;
			}
		}

		const rarityRank = (r: string) => RARITY_ORDER.indexOf(r ?? 'None');
		const epOf = (it: any) => Object.values(it.scaling ?? {}).reduce((s: number, v: any) => s + Number(v), 0);

		list = [...list].sort((a, b) => {
			if (pickerSort === 'ep_asc' || pickerSort === 'ep_desc') {
				const sign = pickerSort === 'ep_asc' ? 1 : -1;
				return sign * (epOf(a) - epOf(b));
			}

			const statMatch = pickerSort.match(/^([\w]+)_(asc|desc)$/);
			if (statMatch && statsStyles[statMatch[1]]) {
				const [, stat, dir] = statMatch;
				const sign = dir === 'asc' ? 1 : -1;
				return sign * (((a.scaling ?? {})[stat] ?? 0) - ((b.scaling ?? {})[stat] ?? 0));
			}

			switch (pickerSort) {
				case 'name_asc':
					return (a.name || a.id || '').localeCompare(b.name || b.id || '');
				case 'name_desc':
					return (b.name || b.id || '').localeCompare(a.name || a.id || '');
				case 'level_asc':
					return (a.minLevel ?? 0) - (b.minLevel ?? 0);
				case 'level_desc':
					return (b.minLevel ?? 0) - (a.minLevel ?? 0);
				case 'rarity_asc':
					return rarityRank(a.rarity) - rarityRank(b.rarity);
				case 'rarity_desc':
				default:
					return rarityRank(b.rarity) - rarityRank(a.rarity);
			}
		});

		return list;
	});

	function selectNone() { onSelect(''); }
	function selectItem(id: string) { onSelect(id); }

	function noneImageUrl() {
		const base = 'https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images';
		const first = items[0];
		let kind = field;
		if (first?.type === 'armor') kind = first.equipType === 'legging' ? 'pants' : 'chestplate';
		else if (first?.type === 'accessory') kind = 'accessory';
		else if (field === 'gem') kind = 'gem';
		else if (field === 'enchant') kind = 'enchant';
		else if (field === 'modifier') kind = 'modifier';
		return `${base}/${kind}/0.jpg`;
	}

	let noneItem = $derived({
		id: '',
		name: 'None',
		rarity: 'None',
		type: field,
		imageUrl: noneImageUrl()
	});
</script>

{#if show}
	<div
		id="menuouter"
		role="button"
		tabindex="0"
		class="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto bg-black bg-opacity-70 p-4"
		transition:fade={{ duration: 69 }}
		onclick={(e) => { if (e.target === e.currentTarget) onClose(); }}
		onkeydown={(e) => { if (e.key === 'Escape') onClose(); }}
	>
		<!-- Close button -->
		<button aria-label="Close menu" onclick={onClose}>
			<div class="relative my-4 flex h-24 w-24 items-center justify-center rounded border border-white bg-black text-white">
				<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				</svg>
			</div>
		</button>

		<!-- Search -->
		<div class="mb-4 w-full max-w-2xl space-y-2">
			<!-- svelte-ignore a11y_autofocus -->
			<input
				type="text"
				placeholder="Search {items.length} {field}..."
				autofocus
				bind:value={search}
				class="w-full rounded-md border border-white bg-black px-4 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#58a6ff]"
			/>
			<div class="flex flex-wrap items-center justify-center">
				<FilterBar
					categories={pickerFilterCategories}
					sortOptions={pickerSortOptions}
					filters={pickerFilters}
					sort={pickerSort}
					onChange={(filters, sort) => {
						pickerFilters = filters;
						pickerSort = sort;
					}}
				/>
			</div>
			<p class="text-center text-xs text-gray-400">{filtered.length} / {items.length}</p>
		</div>

		<!-- Item grid -->
		<div class="grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
			<!-- None -->
			<button onclick={selectNone} class="aspect-square h-24 w-24 cursor-pointer">
				<Item item={noneItem} />
			</button>

			{#each filtered as it (it.id || it._id)}
				<button onclick={() => selectItem(it.id || it._id)} class="aspect-square h-24 w-24 cursor-pointer">
					<MenuItem item={it} />
				</button>
			{/each}
		</div>
	</div>
{/if}
