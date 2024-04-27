<script lang="ts">
	import { fade } from 'svelte/transition';
	import type {
		ArmorItemData,
		EnchantItemData,
		GemItemData,
		ModifierItemData
	} from '$lib/gearBuilder/itemTypes';
	import type { Player } from '$lib/gearBuilder/playerClasses';
	import Item from './Item.svelte';
	import { rarityColors, staticImagesRootFolder } from '$lib/dataConstants';
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
		// For filtering out other magic items
		// if (item.subType == 'Magic' && !item.name.includes(player.magic)) {
		// 	return false;
		// } else if (
		// 	$filterType.length === 0 ||
		// 	$filterType.includes(item.rarity) ||
		// 	item.name === 'None'
		// ) {
		// 	if (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
		// 		return true;
		// 	}
		// }
		if ($filterType.length === 0 || $filterType.includes(item.rarity) || item.name === 'None') {
			if (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				if (
					(item.statType == 'Magic' && !player.magics.some((magic) => item.name.includes(magic))) ||
					(item.statType == 'Strength' &&
						!player.fightingStyles.some((style) => item.name.includes(style)))
				) {
					return false;
				} else {
					return true;
				}
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
	class=" w-24 h-24 m-2 flex items-center justify-center relative"
	style="border-color: {rarityColors[
		currentItem.rarity
	]}; border-width: 1px; background-color: #020202;"
	on:click={handleClick}
>
	{#if currentItem.statType && currentItem.statType != 'None'}
		<img
			style="opacity: {currentItem.statType ? '1' : '0'};"
			src="{staticImagesRootFolder}/Misc/{currentItem.statType}Items.png"
			alt="Magic"
			class="w-full h-full absolute right-0 bottom-0 z-10"
		/>
	{/if}
	<div class="absolute right-0 bottom-0 flex flex-row z-20">
		{#each { length: currentItem.gemNo } as _, i}
			<img src="{staticImagesRootFolder}/Misc/gemslot.png" alt="Gem slot" class=" w-5 h-5" />
		{/each}
	</div>
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
		class="fixed inset-0 bg-black bg-opacity-70 z-30 flex flex-col items-center overflow-y-auto"
		transition:fade={{ duration: 69 }}
	>
		<button
			on:click={() => {
				toggleMenu();
			}}
		>
			<div
				class=" my-4 w-24 h-24 bg-black border rounded border-white text-white font-bold text-lg items-center object-contain relative"
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
			</div>
		</button>

		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search"
			class="border rounded p-2 m-2 w-1/2 bg-black text-white"
		/>
		<div class="flex flex-row space-x-5 my-4">
			<FilterButton></FilterButton>
			<SortButton></SortButton>
		</div>
		<div class="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
			<Item item={placeholderItem} {slotKey} {gemIndex} {player} {toggleMenu} {updatePage} />

			{#each sortedItems as item}
				{#if item.name !== 'None'}
					<Item {item} {slotKey} {gemIndex} {player} {toggleMenu} {updatePage} />
				{/if}
			{/each}
		</div>
	</div>
{/if}
