<script>
	// @ts-nocheck
	import {
		currentShip,
		hullArmor1,
		hullArmor1Enchant,
		sailMaterial1,
		sailMaterial1Enchant,
		quartermaster1,
		quartermaster2,
		cannon1,
		siegeWeapon1,
		shipCrew1,
		ram1,
		ram1Enchant,
		deckhand1,
		deckhand2,
		deckhand3,
		deckhand4,
		resetAllShipParts
	} from '$lib/utils/shipStatsStore';
	import { validateEntry, storeCurrentBuild, getCurrentGearSet } from '$lib/utils/statsStore'; // Store import
	import { accessories } from '$lib/data/gear/accessories';
	import { gems } from '$lib/data/gear/gems';
	import { enchants } from '$lib/data/gear/enchantMultipliers';
	import { chestplates } from '$lib/data/gear/chestplates';
	import { modifiers } from '$lib/data/gear/modifiers';
	import { pants } from '$lib/data/gear/pants';
	import { playCorrect } from '$lib/utils/sound.js';
	import { get } from 'svelte/store';
	import { hulls } from '$lib/data/ships/hulls';
	import { hullEnchants } from '$lib/data/ships/hullEnchants';
	import { sails } from '$lib/data/ships/sails';
	import { sailEnchants } from '$lib/data/ships/sailEnchants';
	import { quartermasters } from '$lib/data/ships/quartermasters';
	import { cannons } from '$lib/data/ships/cannons';
	import { siegeWeapons } from '$lib/data/ships/siegeWeapons';
	import { shipCrews } from '$lib/data/ships/shipCrews';
	import { rams } from '$lib/data/ships/rams';
	import { ramEnchants } from '$lib/data/ships/ramEnchants';
	import { dechkands } from '$lib/data/ships/deckhands';

	export let type;

	// Get random entry from list
	function getRandom(data, includeZero = false, category = null) {
		var item = data[Math.floor(Math.random() * data.length)];
		while ((item.id == 0 && includeZero == false) || !validateEntry(item, category)) {
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

		if (type == 'gear') {
			const gears = getCurrentGearSet();

			for (const category in gears) {
				switch (true) {
					case category.startsWith('accessory') == true:
						gears[category].base.set(getRandom(accessories, category));
						break;
					case category.startsWith('chestplate') == true:
						gears[category].base.set(getRandom(chestplates, category));
						break;
					case category.startsWith('pants') == true:
						gears[category].base.set(getRandom(pants, category));
						break;
					default:
						break;
				}
				gears[category].gem1.set(getRandomGem(gems, 1, get(gears[category].base)));
				gears[category].gem2.set(getRandomGem(gems, 2, get(gears[category].base)));
				gears[category].gem3.set(getRandomGem(gems, 3, get(gears[category].base)));
				gears[category].enchant.set(getRandom(enchants));
				gears[category].modifier.set(getRandom(modifiers, true, category));
			}
		} else if (type == 'ship') {
			resetAllShipParts();
			// currentShip.set(getRandom(ships, true)); -- originally wanted to randomize ships but seemed impractical

			if ($currentShip.hullArmorSlot > 0) {
				hullArmor1.set(getRandom(hulls));
				hullArmor1Enchant.set(getRandom(hullEnchants));
			}

			if ($currentShip.sailMaterialSlot > 0) {
				sailMaterial1.set(getRandom(sails));
				sailMaterial1Enchant.set(getRandom(sailEnchants));
			}

			if ($currentShip.quarterMasterSlot > 0) {
				quartermaster1.set(getRandom(quartermasters));
				if ($currentShip.quarterMasterSlot > 1) {
					quartermaster2.set(getRandom(quartermasters));
				}
			}

			if ($currentShip.cannonSlot > 0) {
				cannon1.set(getRandom(cannons));
			}

			if ($currentShip.siegeWeaponSlot > 0) {
				siegeWeapon1.set(getRandom(siegeWeapons));
			}

			if ($currentShip.shipCrewSlot > 0) {
				shipCrew1.set(getRandom(shipCrews));
			}

			if ($currentShip.ramSlot > 0) {
				ram1.set(getRandom(rams));
				ram1Enchant.set(getRandom(ramEnchants));
			}

			if ($currentShip.deckhandSlot > 0) {
				deckhand1.set(getRandom(dechkands));
				if ($currentShip.deckhandSlot > 1) {
					deckhand2.set(getRandom(dechkands));
					if ($currentShip.deckhandSlot > 2) {
						deckhand3.set(getRandom(dechkands));
						if ($currentShip.deckhandSlot > 3) {
							deckhand4.set(getRandom(dechkands));
						}
					}
				}
			}
		}

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
