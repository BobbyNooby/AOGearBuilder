<script lang="ts">
	import type { Player } from '$lib/gearBuilder/playerClasses';
	import type { CurrentShipBuild } from '$lib/shipBuilder/ShipClass';
	import type { ShipItemSlot } from '$lib/shipBuilder/ShipItemSlot';
	import { filterData } from '$lib/utils/filterData';
	import type { ShipPartItem } from '$lib/utils/itemTypes';
	import ItemMenuButton from '../admin/ItemMenuButton.svelte';
	import BlackButton from '../misc/BlackButton.svelte';

	export let database: any[],
		player: Player | CurrentShipBuild,
		updatePage: () => void,
		type: string = 'gear';

	function randomItemFromList(list: any[], includeNone: boolean) {
		let filteredList = list;

		if (!includeNone) {
			filteredList = list.filter((item) => item.name !== 'None');
		}

		return filteredList[Math.floor(Math.random() * filteredList.length)];
	}

	function randomizeBuild(database: any[], player: Player | CurrentShipBuild) {
		if (type == 'gear') {
			randomizeGearBuild(database, player as Player);
		} else if (type == 'ship') {
			randomizeShipBuild(database, player as CurrentShipBuild);
		}
	}

	function randomizeGearBuild(database: any[], player: Player) {
		const accessoriesList = database.filter((item) => item.mainType === 'Accessory');
		const chestplatesList = database.filter((item) => item.mainType === 'Chestplate');
		const pantsList = database.filter((item) => item.mainType === 'Pants');
		const enchantsList = database.filter((item) => item.mainType === 'Enchant');
		const modifiersList = database.filter((item) => item.mainType === 'Modifier');
		const gemsList = database.filter((item) => item.mainType === 'Gem');

		let playerBuildSlots = player.build.slots;

		player.build.resetBuild();

		for (const slotKey of Object.keys(playerBuildSlots)) {
			let gearList = [];

			console.log(slotKey);
			//Setting armor
			if (['accessory1', 'accessory2', 'accessory3'].includes(slotKey)) {
				gearList = accessoriesList;
			} else if (['chestplate'].includes(slotKey)) {
				gearList = chestplatesList;
			} else if (['pants'].includes(slotKey)) {
				gearList = pantsList;
			}

			let randomArmor = randomItemFromList(gearList, false);

			while (!player.build.setGear(randomArmor, slotKey as keyof typeof playerBuildSlots)) {
				randomArmor = randomItemFromList(gearList, false);
			}

			// Setting enchant
			while (
				!player.build.setGear(
					randomItemFromList(enchantsList, false),
					slotKey as keyof typeof playerBuildSlots
				)
			);

			// Setting modifier
			while (
				!player.build.setGear(
					randomItemFromList(modifiersList, true),
					slotKey as keyof typeof playerBuildSlots
				)
			);

			// Gem setting
			if (player.build.slots[slotKey as keyof typeof playerBuildSlots].armor.gemNo > 0) {
				for (
					let i = 0;
					i < player.build.slots[slotKey as keyof typeof playerBuildSlots].gems.length;
					i++
				) {
					while (
						!player.build.setGear(
							randomItemFromList(gemsList, false),
							slotKey as keyof typeof playerBuildSlots,
							i
						)
					);
				}
			}
		}
		updatePage();
	}

	function getShipEnchants(database: any[], part: string) {
		const partRelations = {
			Ram: 'ram',
			'Hull Armor': 'hull',
			'Sail Material': 'sail'
		};

		try {
			return database.filter((item) => {
				if (item.mainType !== 'Enchant') {
					return false;
				}
				if (
					'enchantTypes' in item &&
					'ship' in item.enchantTypes &&
					partRelations[part] in item.enchantTypes.ship
				) {
					return true;
				}
			});
		} catch (e) {
			return [];
		}
	}

	function randomizeShipBuild(database: any[], ship: CurrentShipBuild) {
		const keyToCat = {
			hullArmorSlot: 'Hull Armor',
			quartermasterSlot: 'Quartermaster',
			cannonSlot: 'Cannon',
			siegeWeaponSlot: 'Siege Weapon',
			sailMaterialSlot: 'Sail Material',
			shipCrewSlot: 'Ship Crew',
			ramSlot: 'Ram',
			deckhandSlot: 'Deckhand'
		};

		const hasEnchant = ['Hull Armor', 'Sail Material', 'Ram'];

		ship.resetBuild();

		for (const slotKey of Object.keys(ship.slots) as Array<keyof typeof keyToCat>) {
			for (let i = 0; i < ship.slots[slotKey].length; i++) {
				let slotIndex = ship.slots[slotKey].filter((slot) => slot.base.name !== 'None').length;
				let randomItem: any;

				do {
					randomItem = randomItemFromList(
						database.filter((item) => item.mainType === keyToCat[slotKey]),
						false
					);
				} while (
					keyToCat[slotKey as keyof typeof keyToCat] != 'Deckhand' &&
					ship.slots[slotKey].filter((slot) => slot.base.id === randomItem.id).length > 0
				);

				ship.setShipPart(randomItem, slotKey, slotIndex, 'base');

				if (hasEnchant.includes(keyToCat[slotKey])) {
					ship.setShipPart(
						randomItemFromList(getShipEnchants(database, keyToCat[slotKey]), false),
						slotKey,
						slotIndex,
						'enchant'
					);
				}
			}
		}
		updatePage();
	}
</script>

<BlackButton parentFunction={() => randomizeBuild(database, player)} parentText={'Random Build'}
></BlackButton>
