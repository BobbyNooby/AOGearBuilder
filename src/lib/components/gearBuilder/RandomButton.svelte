<script>
	// @ts-nocheck

	import {
		accessory1,
		accessory1Gem1,
		accessory1Gem2,
		accessory1Gem3,
		accessory1Enchant,
		accessory1Modifier,
		accessory2,
		accessory2Gem1,
		accessory2Gem2,
		accessory2Gem3,
		accessory2Enchant,
		accessory2Modifier,
		accessory3,
		accessory3Gem1,
		accessory3Gem2,
		accessory3Gem3,
		accessory3Enchant,
		accessory3Modifier,
		chestplate1,
		chestplate1Gem1,
		chestplate1Gem2,
		chestplate1Gem3,
		chestplate1Enchant,
		chestplate1Modifier,
		pants1,
		pants1Gem1,
		pants1Gem2,
		pants1Gem3,
		pants1Enchant,
		pants1Modifier,
		validateEntry,
		storeCurrentBuild
	} from '$lib/utils/statsStore'; // Store import
	import { accessories } from '$lib/data/accessories';
	import { gems } from '$lib/data/gems';
	import { enchants } from '$lib/data/enchantMultipliers';
	import { chestplates } from '$lib/data/chestplates';
	import { modifiers } from '$lib/data/modifiers';
	import { pants } from '$lib/data/pants';
	import { playCorrect } from '$lib/utils/sound.js';

	// Get random entry from list
	function getRandom(data, includeZero = false) {
		var item = data[Math.floor(Math.random() * data.length)];
		while ((item.id == 0 && includeZero == false) || !validateEntry(item)) {
			item = data[Math.floor(Math.random() * data.length)];
		}
		return item;
	}

	// Get random gem in free slots
	function getRandomGem(data, slot, item, includeZero = false) {
		if (slot > item.gemNo) {
			return data[0];
		}
		return getRandom(data, includeZero);
	}

	// Handle click and set random entries
	function handleClick() {
		// Randomise items
		$accessory1 = getRandom(accessories);
		$accessory1Gem1 = getRandomGem(gems, 1, $accessory1);
		$accessory1Gem2 = getRandomGem(gems, 2, $accessory1);
		$accessory1Gem3 = getRandomGem(gems, 3, $accessory1);
		$accessory1Enchant = getRandom(enchants);
		$accessory1Modifier = getRandom(modifiers, true);

		$accessory2 = getRandom(accessories);
		$accessory2Gem1 = getRandomGem(gems, 1, $accessory2);
		$accessory2Gem2 = getRandomGem(gems, 2, $accessory2);
		$accessory2Gem3 = getRandomGem(gems, 3, $accessory2);
		$accessory2Enchant = getRandom(enchants);
		$accessory2Modifier = getRandom(modifiers, true);

		$accessory3 = getRandom(accessories);
		$accessory3Gem1 = getRandomGem(gems, 1, $accessory3);
		$accessory3Gem2 = getRandomGem(gems, 2, $accessory3);
		$accessory3Gem3 = getRandomGem(gems, 3, $accessory3);
		$accessory3Enchant = getRandom(enchants);
		$accessory3Modifier = getRandom(modifiers, true);

		$chestplate1 = getRandom(chestplates);
		$chestplate1Gem1 = getRandomGem(gems, 1, $chestplate1);
		$chestplate1Gem2 = getRandomGem(gems, 2, $chestplate1);
		$chestplate1Gem3 = getRandomGem(gems, 3, $chestplate1);
		$chestplate1Enchant = getRandom(enchants);
		$chestplate1Modifier = getRandom(modifiers, true);

		$pants1 = getRandom(pants);
		$pants1Gem1 = getRandomGem(gems, 1, $pants1);
		$pants1Gem2 = getRandomGem(gems, 2, $pants1);
		$pants1Gem3 = getRandomGem(gems, 3, $pants1);
		$pants1Enchant = getRandom(enchants);
		$pants1Modifier = getRandom(modifiers, true);
		storeCurrentBuild();
		playCorrect();
	}
</script>

<div>
	<!-- Button to make random -->
	<button
		class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-44"
		style="font-family: Merriweather;"
		on:click={handleClick}>Random</button
	>
</div>
