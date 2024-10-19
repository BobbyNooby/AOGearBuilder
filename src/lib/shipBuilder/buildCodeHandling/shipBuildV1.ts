import type { CurrentShipBuild } from '$lib/shipBuilder/ShipClass';
import { getItemById } from '$lib/utils/getItemById';
import type { anyItem } from '$lib/utils/itemTypes';

export function isShipBuildv1(buildCode: string) {
	try {
		let codeArray = buildCode.split('-');

		if (codeArray.length == 9) {
			return true;
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
}

// Load Code Logic.

export function loadShipBuildv1(ship: CurrentShipBuild, database: anyItem[], buildCode: string) {
	try {
		const slotCodeArray = buildCode.split('-').map((slotString) => slotString.split(','));
		console.log(slotCodeArray);

		const slotkeyArray = [
			'hullArmorSlot',
			'quartermasterSlot',
			'cannonSlot',
			'siegeWeaponSlot',
			'sailMaterialSlot',
			'shipCrewSlot',
			'ramSlot',
			'deckhandSlot'
		];

		try {
			ship.setShip(getItemById(database, slotCodeArray[0][0]));
		} catch (e) {
			console.log(e, 'Error In Setting / Parsing -> Ship.');
		}

		for (let i = 0; i < slotkeyArray.length; i++) {
			const slotkey = slotkeyArray[i] as keyof typeof ship.slots;
			const slot = slotCodeArray[i + 1];

			if (slot[0] == '') {
				continue;
			}

			for (let j = 0; j < slot.length; j++) {
				let part = slot[j].split("'");
				ship.setShipPart(getItemById(database, part[0]), slotkey, j, 'base');
				if (part.length > 1) {
					ship.setShipPart(getItemById(database, part[1]), slotkey, j, 'enchant');
				}
			}
		}
	} catch (error) {
		console.log(error);
		//ship.resetBuild();
	}
}
