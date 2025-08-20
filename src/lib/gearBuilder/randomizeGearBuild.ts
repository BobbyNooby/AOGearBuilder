import type { AnyItemDetails } from '$lib/types/itemTypes';
import { findRandomFromList } from '$lib/utils/pickRandomFromList';
import type { Player } from './Player';

export const randomizeGearBuild = (db: AnyItemDetails[], player: Player): boolean => {
	player.build.resetBuild();

	for (const slotkey of Object.keys(player.build.slots as any) as Array<
		keyof typeof player.build.slots
	>) {
		const mainType = player.build.slots[slotkey].armor.mainType;

		let randomArmor = findRandomFromList(db, { includeNone: false, mainTypes: [mainType] });

		const triesLimit = 1000;
		let tries = 0;

		// Setting random armor
		while (!player.build.setGear(randomArmor, slotkey)) {
			randomArmor = findRandomFromList(db, { includeNone: false, mainTypes: [mainType] });
			tries++;

			// Preventing infinite loop
			if (tries > triesLimit) {
				player.build.slots[slotkey].resetSlot();
				return false;
			}
		}

		// Setting random enchant
		while (
			!player.build.setGear(
				findRandomFromList(db, { includeNone: true, mainTypes: ['Enchant'] }),
				slotkey
			)
		);

		// Setting random modifier
		while (
			!player.build.setGear(
				findRandomFromList(db, { includeNone: true, mainTypes: ['Modifier'] }),
				slotkey
			)
		);

		// Setting random gems
		if (player.build.slots[slotkey].armor.gemNo > 0) {
			for (let i = 0; i < player.build.slots[slotkey].armor.gemNo; i++) {
				while (
					!player.build.setGear(
						findRandomFromList(db, { includeNone: true, mainTypes: ['Gem'] }),
						slotkey,
						i
					)
				);
			}
		}
	}

	return true;
};
