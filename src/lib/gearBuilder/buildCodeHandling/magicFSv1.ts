import { listOfFightingStyles } from '$lib/data/playerFightingStyles';
import { listOfMagics } from '$lib/dataConstants';
import { getItemById } from '$lib/utils/getItemById';
import type { anyItem } from '../../utils/itemTypes';
import type { Player } from '../playerClasses';
import { savantChoiceStore } from '../savantChoiceStore';

export function isMagicFSv1(buildCode: string) {
	try {
		let codeArray = buildCode.split('|');

		if (codeArray.length == 8) {
			return true;
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export function loadMagicFSv1(player: Player, database: anyItem[], codeString: string) {
	try {
		const slotCodeArray = codeString.split('|').map((slotString) => slotString.split(','));

		const slotkeyArray = ['accessory1', 'accessory2', 'accessory3', 'chestplate', 'pants'];

		try {
			player.level = parseInt(slotCodeArray[0][0]);
			player.vitalityPoints = parseInt(slotCodeArray[0][1]);
			player.magicPoints = parseInt(slotCodeArray[0][2]);
			player.strengthPoints = parseInt(slotCodeArray[0][3]);
			player.weaponPoints = parseInt(slotCodeArray[0][4]);
		} catch (e) {
			console.log(
				e,
				'Error In Setting / Parsing -> Player Level, Vitality Points, Magic Points, Strength Points, Weapon Points.'
			);
		}

		try {
			if (slotCodeArray[1][0] != '') {
				for (let i = 0; i < slotCodeArray[1].length; i++) {
					player.magics[i] = listOfMagics[parseInt(slotCodeArray[1][i])];
				}

				if (slotCodeArray[1].length > 1) {
					savantChoiceStore.set(['Magic']);
				}
			}
		} catch (e) {
			console.log(e, 'Error In Setting / Getting / Parsing Player Magic.');
		}

		try {
			if (slotCodeArray[2][0] != '') {
				for (let i = 0; i < slotCodeArray[2].length; i++) {
					player.fightingStyles[i] = listOfFightingStyles[parseInt(slotCodeArray[2][i])];
				}

				if (slotCodeArray[2].length > 1) {
					savantChoiceStore.set(['Fighting Style']);
				}
			}
		} catch (e) {
			console.log(e, 'Error In Setting / Getting / Parsing Player Fighting Styles.');
		}

		player.updateStatBuild();

		for (let i = 0; i < slotkeyArray.length; i++) {
			const slotkey = slotkeyArray[i] as keyof typeof player.build.slots;
			const slot = slotCodeArray[i + 3];

			for (let j = 0; j < slot.length; j++) {
				if (j <= 2) {
					player.build.setGear(getItemById(database, slot[j]), slotkey);
				} else if (j > 2 && j < slot.length - 1) {
					player.build.setGear(getItemById(database, slot[j]), slotkey, j - 3);
				} else if (j == slot.length - 1) {
					player.build.slots[slotkey].armorLevel = parseInt(slot[j]);
				}
			}
		}
	} catch (error) {
		console.log(error);
		player.build.resetBuild();
	}
}
