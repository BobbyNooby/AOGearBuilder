<script lang="ts">
	import { fade } from 'svelte/transition';
	import type {
		ArmorItemData,
		EnchantItemData,
		GemItemData,
		ModifierItemData
	} from '$lib/itemTypes';
	import type { Player } from '$lib/playerClasses';
	import Item from './Item.svelte';
	import { rarityColors } from '$lib/dataConstants';
	import { filterType, sortType } from '$lib/utils/filterSortStore';
	import FilterButton from './FilterButton.svelte';
	import SortButton from './SortButton.svelte';

	export let currentItem: ArmorItemData | GemItemData | EnchantItemData | ModifierItemData | any,
		database: any,
		slotKey: string,
		player: Player,
		gemIndex: boolean | number,
		updatePage: () => void;

	let menuBool = false;

	function toggleMenu(): void {
		menuBool = !menuBool;
	}

	function handleClick() {
		toggleMenu();
	}

	let searchQuery = '';

	let ItemMenuData = database[currentItem.mainType];
	let placeholderItem = database[currentItem.mainType].find((item) => item.name === 'None');

	$: filteredData = ItemMenuData.filter((item) => {
		// console.log($filterType, currentItem.rarity, ItemMenuData);
		if ($filterType.length === 0 || $filterType.includes(item.rarity) || item.name === 'None') {
			if (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return true;
			}
		}
	});

	$: sortedItems = filteredData.sort((a, b) => {
		const rarityValues = {
			Legendary: 1,
			Seasonal: 2,
			Exotic: 3,
			Rare: 4,
			Uncommon: 5,
			Common: 6
		};
		const rarityA = rarityValues[a.rarity] || 7;
		const rarityB = rarityValues[b.rarity] || 7;
		if ($sortType === 'rarityHighest') {
			//Sort from rarity Highest to Lowest + A-Z
			if (rarityA !== rarityB) {
				return rarityA - rarityB;
			}
			return a.name.localeCompare(b.name);
		} else if ($sortType === 'rarityLowest') {
			//Sort from rarity Lowest to Highest + A-Z
			if (rarityA !== rarityB) {
				return rarityB - rarityA;
			}
			return a.name.localeCompare(b.name);
		} else if ($sortType === 'maxLevelHighest') {
			//Sort item.maxLevel from Highest to Lowest
			return b.maxlevel - a.maxlevel;
		} else if ($sortType === 'maxLevelLowest') {
			//Sort item.maxLevel from Lowest to Highest
			return a.maxlevel - b.maxlevel;
		} else {
			if ($sortType === 'atoz') {
				// Sort by name A - Z
				return a.name.localeCompare(b.name);
			} else if ($sortType === 'ztoa') {
				// Sort by name Z - A
				return b.name.localeCompare(a.name);
			} else {
				return 0;
			}
		}
	});

	let validImage = true;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<!-- Button -->
<button
	class=" w-24 h-24 m-2 flex items-center justify-center"
	style="border-color: {rarityColors[
		currentItem.rarity
	]}; border-width: 1px; background-color: #020202;"
	on:click={handleClick}
>
	<img
		class="w-full h-full object-contain"
		style="display: {validImage && currentItem.imageId != '' ? 'block' : 'none'};"
		src={currentItem.imageId}
		alt={currentItem.name}
		on:error={() => (validImage = false)}
		on:load={() => (validImage = true)}
	/>
	<h1 style="display:{!validImage || currentItem.imageId == '' ? 'block' : 'none'}; color:white;">
		{currentItem.name || 'None'}
	</h1>
</button>

<!-- <p>{reactiveTest}</p> -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<!-- Item menu -->
{#if menuBool}
	<div
		id="menuouter"
		class="fixed inset-0 bg-black bg-opacity-70 z-10 flex flex-col items-center"
		transition:fade={{ duration: 69 }}
	>
		<button
			on:click={() => {
				toggleMenu();
			}}
			class=" my-4 w-24 h-24 bg-black border rounded border-white text-white font-bold text-lg py-2 px-4 items-center relative"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				fill="currentColor"
				class="bi bi-x-lg"
				viewBox="0 0 16 16"
				style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
			>
				<path
					d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
				/>
			</svg>
		</button>

		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search"
			class="border rounded p-2 m-2 w-1/2 bg-black text-white"
		/>
		<FilterButton></FilterButton>
		<SortButton></SortButton>
		<div class="flex-wrap flex mx-72">
			<div class="pr-1.5">
				<Item item={placeholderItem} {slotKey} {gemIndex} {player} {toggleMenu} {updatePage} />
			</div>
			{#each sortedItems as item}
				{#if item.name !== 'None'}
					<Item {item} {slotKey} {gemIndex} {player} {toggleMenu} {updatePage} />\
				{/if}
			{/each}
		</div>
	</div>
{/if}
