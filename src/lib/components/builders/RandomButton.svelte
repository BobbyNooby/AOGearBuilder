<script lang="ts">
	import type { Player } from '$lib/gearBuilder/playerClasses';
	import BlackButton from '../misc/BlackButton.svelte';

	export let database: any[], player: Player, updatePage: () => void;

	function randomItemFromList(list: any[], includeNone: boolean) {
		let filteredList = list;

		if (!includeNone) {
			filteredList = list.filter((item) => item.name !== 'None');
		}

		return filteredList[Math.floor(Math.random() * filteredList.length)];
	}

	function randomizeBuild(database: any[], player: Player) {
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
</script>

<BlackButton parentFunction={() => randomizeBuild(database, player)} parentText={'Random Build'}
></BlackButton>
