import { listOfMagics } from '$lib/dataConstants';
import { getItemById } from '$lib/utils/getItemById';
import type { anyItem } from '../itemTypes';
import type { Player } from '../playerClasses';

export function isPreMagicFSBuildCode(buildCode: string) {
	try {
		let codeArray = buildCode.split('|');

		if (codeArray.length == 11) {
			return true;
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export function loadPreMagicFSBuildCode(player: Player, database: anyItem[], codeString: string) {
	try {
		const slotCodeArray = codeString.split('|').map((slotString) => slotString.split('.'));
		console.log(slotCodeArray);

		const slotkeyArray = ['accessory1', 'accessory2', 'accessory3', 'chestplate', 'pants'];

		player.level = parseInt(slotCodeArray[0][0]);
		player.magics = [listOfMagics[parseInt(slotCodeArray[1][0])]];
		player.vitalityPoints = parseInt(slotCodeArray[2][0]);
		player.magicPoints = parseInt(slotCodeArray[3][0]);
		player.strengthPoints = parseInt(slotCodeArray[4][0]);
		player.weaponPoints = parseInt(slotCodeArray[5][0]);

		for (let i = 0; i < slotkeyArray.length; i++) {
			const slotkey = slotkeyArray[i] as keyof typeof player.build.slots;
			const slot = slotCodeArray[i + 6];

			for (let j = 0; j < slot.length; j++) {
				if (j <= 2) {
					player.build.setGear(getItemById(database, slot[j]), slotkey);
				} else if (j > 2 && j < slot.length - 1) {
					player.build.setGear(getItemById(database, slot[j]), slotkey, j - 3);
				} else if (j == slot.length - 1) {
					player.build.slots[slotkey as keyof typeof player.build.slots].armorLevel = parseInt(
						slot[j]
					);
				}
			}
		}
	} catch (error) {
		player.build.resetBuild();
		return false;
	}
}
