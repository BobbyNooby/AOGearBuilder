<script>
	import { accessories } from '$lib/data/gear/accessories';
	import { chestplates } from '$lib/data/gear/chestplates';
	import { pants } from '$lib/data/gear/pants';
	import { enchants } from '$lib/data/gear/enchantMultipliers';
	import { modifiers } from '$lib/data/gear/modifiers';
	import { statTemplate } from '$lib/utils/statTemplate';
	import { gems } from '$lib/data/gear/gems';
	import Item from './Item.svelte';
	import { filterType } from '$lib/utils/filterStore';
	import { sortType } from '$lib/utils/sortStore';
	import { playCorrect } from '$lib/utils/sound.js';
	import Filter from '../Filter.svelte';
	import Sort from '../Sort.svelte';
	import { cannons } from '$lib/data/ships/cannons';
	import { dechkands } from '$lib/data/ships/deckhands';
	import { hullEnchants } from '$lib/data/ships/hullEnchants';
	import { hulls } from '$lib/data/ships/hulls';
	import { quartermasters } from '$lib/data/ships/quartermasters';
	import { ramEnchants } from '$lib/data/ships/ramEnchants';
	import { rams } from '$lib/data/ships/rams';
	import { sailEnchants } from '$lib/data/ships/sailEnchants';
	import { sails } from '$lib/data/ships/sails';
	import { shipCrews } from '$lib/data/ships/shipCrews';
	import { siegeWeapons } from '$lib/data/ships/siegeWeapons';

	export let menuToggle, category, currentItem, categoryName, currentGears, builderType;

	//Initializing the itemType Variable as placeholder statTemplate
	let itemType = [statTemplate];

	//Detection method to decide what to show depending on currentItem (which button is pressed)
	if ($currentItem.mainType == 'Accessory') {
		itemType = accessories;
	} else if ($currentItem.mainType == 'Gem') {
		itemType = gems;
	} else if ($currentItem.mainType == 'Enchant') {
		itemType = enchants;
	} else if ($currentItem.mainType == 'Chestplate') {
		itemType = chestplates;
	} else if ($currentItem.mainType == 'Pants') {
		itemType = pants;
	} else if ($currentItem.mainType == 'Modifier') {
		itemType = modifiers;
	} else if ($currentItem.mainType == 'Cannon') {
		itemType = cannons;
	} else if ($currentItem.mainType == 'Deckhand') {
		itemType = dechkands;
	} else if ($currentItem.mainType == 'Hull Enchant') {
		itemType = hullEnchants;
	} else if ($currentItem.mainType == 'Hull Armor') {
		itemType = hulls;
	} else if ($currentItem.mainType == 'Quartermaster') {
		itemType = quartermasters;
	} else if ($currentItem.mainType == 'Ram Enchant') {
		itemType = ramEnchants;
	} else if ($currentItem.mainType == 'Ram') {
		itemType = rams;
	} else if ($currentItem.mainType == 'Sail Material Enchant') {
		itemType = sailEnchants;
	} else if ($currentItem.mainType == 'Sail Material') {
		itemType = sails;
	} else if ($currentItem.mainType == 'Ship Crew') {
		itemType = shipCrews;
	} else if ($currentItem.mainType == 'Siege Weapon') {
		itemType = siegeWeapons;
	} else {
		itemType = [statTemplate];
	}

	//Search, Filter, and Sort Code

	//Initialize searchQuery
	let searchQuery = '';

	$: filteredItems = itemType.filter((item) => {
		// Filter based on rarity, and check if item ID is not 0
		if (($filterType === 'All' || item.rarity === $filterType) && item.id !== 0) {
			// Check if the search query is empty or if the item name includes the search query
			if (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
				return true;
			}
		}
		return false;
	});

	$: sortedItems = filteredItems.sort((a, b) => {
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

	let placeholderItem = itemType.find((item) => item.id === 0);
	console.log(placeholderItem);
</script>

<div class="flex flex-col items-center pt-5">
	<button
		on:click={() => {
			menuToggle();
			playCorrect();
		}}
		class="mb-4 w-20 h-20 bg-black border rounded border-white text-white font-bold text-lg py-2 px-4 items-center relative"
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
	<div class="flex items-center justify-between space-x-4">
		<Filter />
		<Sort />
	</div>
	<div class="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
		<div class="">
			<Item
				item={placeholderItem}
				{menuToggle}
				{category}
				{currentItem}
				{categoryName}
				{currentGears}
				{builderType}
			/>
		</div>
		{#each sortedItems as item (item.id)}
			<div class="">
				<Item
					{item}
					{menuToggle}
					{category}
					{currentItem}
					{categoryName}
					{currentGears}
					{builderType}
				/>
			</div>
		{/each}
	</div>
</div>
