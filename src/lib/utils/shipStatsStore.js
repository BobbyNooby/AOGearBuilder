import { writable } from 'svelte/store';
import {
	cannonsTemplate,
	deckhandTemplate,
	hullEcnhantTemplate,
	hullTemplate,
	quartermasterTemplate,
	ramEnchantTemplate,
	ramTemplate,
	sailMaterialEnchantTemplate,
	sailTemplate,
	shipCrewTemplate,
	shipTemplate,
	siegeWeaponTemplate
} from './shipStatTemplate';
import { get } from 'svelte/store';
import {
	getCannonById,
	getDeckhandsById,
	getHullArmorById,
	getHullEnchantsById,
	getQuartermasterById,
	getRamById,
	getRamEnchantById,
	getSailById,
	getSailEnchantById,
	getShipById,
	getShipCrewById,
	getSiegeWeaponById
} from './getItemById';

export const currentShip = writable(shipTemplate);
export const hullArmor1 = writable(hullTemplate);
export const hullArmor1Enchant = writable(hullEcnhantTemplate);
export const sailMaterial1 = writable(sailTemplate);
export const sailMaterial1Enchant = writable(sailMaterialEnchantTemplate);
export const quartermaster1 = writable(quartermasterTemplate);
export const quartermaster2 = writable(quartermasterTemplate);
export const cannon1 = writable(cannonsTemplate);
export const siegeWeapon1 = writable(siegeWeaponTemplate);
export const shipCrew1 = writable(shipCrewTemplate);
export const ram1 = writable(ramTemplate);
export const ram1Enchant = writable(ramEnchantTemplate);
export const deckhand1 = writable(deckhandTemplate);
export const deckhand2 = writable(deckhandTemplate);
export const deckhand3 = writable(deckhandTemplate);
export const deckhand4 = writable(deckhandTemplate);

export const finalDurability = writable(0);
export const finalMagicStorage = writable(0);
export const finalRamDefense = writable(0);
export const finalRamStrength = writable(0);
export const finalResilience = writable(0);
export const finalSpeed = writable(0);
export const finalStability = writable(0);
export const finalTurning = writable(0);

export function getCurrentShipParts() {
	const currentShipParts = {
		hull: {
			base: hullArmor1,
			enchant: hullArmor1Enchant
		},
		quartermasters: {
			quartermaster1: quartermaster1,
			quartermaster2: quartermaster2
		},
		weapons: {
			cannon: cannon1,
			siegeWeapon: siegeWeapon1
		},
		sails: {
			sailMaterial1: sailMaterial1,
			sailMaterial1Enchant: sailMaterial1Enchant
		},
		rams: {
			ram1: ram1,
			ram1Enchant: ram1Enchant
		},
		crew: {
			shipCrew1: shipCrew1
		},
		deckhands: {
			deckhand1: deckhand1,
			deckhand2: deckhand2,
			deckhand3: deckhand3,
			deckhand4: deckhand4
		}
	};
	return currentShipParts;
}

export function getCurrentShipBuild() {
	const currentShipBuild = {
		ship: {
			base: currentShip
		},
		hull: {
			base: hullArmor1,
			enchant: hullArmor1Enchant
		},
		quartermasters: {
			quartermaster1: quartermaster1,
			quartermaster2: quartermaster2
		},
		weapons: {
			cannon: cannon1,
			siegeWeapon: siegeWeapon1
		},
		sails: {
			sailMaterial1: sailMaterial1,
			sailMaterial1Enchant: sailMaterial1Enchant
		},
		rams: {
			ram1: ram1,
			ram1Enchant: ram1Enchant
		},
		crew: {
			shipCrew1: shipCrew1
		},
		deckhands: {
			deckhand1: deckhand1,
			deckhand2: deckhand2,
			deckhand3: deckhand3,
			deckhand4: deckhand4
		}
	};
	return currentShipBuild;
}

export function resetAllShipParts() {
	hullArmor1.set(hullTemplate);
	hullArmor1Enchant.set(hullEcnhantTemplate);
	sailMaterial1.set(sailTemplate);
	sailMaterial1Enchant.set(sailMaterialEnchantTemplate);
	quartermaster1.set(quartermasterTemplate);
	quartermaster2.set(quartermasterTemplate);
	cannon1.set(cannonsTemplate);
	siegeWeapon1.set(siegeWeaponTemplate);
	shipCrew1.set(shipCrewTemplate);
	ram1.set(ramTemplate);
	ram1Enchant.set(ramEnchantTemplate);
	deckhand1.set(deckhandTemplate);
	deckhand2.set(deckhandTemplate);
	deckhand3.set(deckhandTemplate);
	deckhand4.set(deckhandTemplate);
}

export function loadShipCode(inputString) {
	/*

	input: the string of build to load

	return: returns true if successful, returns false if error

	*/

	try {
		// Decode URI in case the browser auto encodes URI

		inputString = decodeURI(inputString);

		if (inputString.length >= 31) {
			// Parse the input string

			const rows = inputString.split('*');

			const shipRow = rows[0];
			const hullRow = rows[1].split(',');
			const quartermasterRow = rows[2].split(',');
			const weaponsRow = rows[3].split(',');
			const sailsRow = rows[4].split(',');
			const ramsRow = rows[5].split(',');
			const crewRow = rows[6];
			const deckhandsRow = rows[7].split(',');

			currentShip.set(getShipById(parseInt(shipRow)));

			hullArmor1.set(getHullArmorById(parseInt(hullRow[0])));
			hullArmor1Enchant.set(getHullEnchantsById(parseInt(hullRow[1])));

			quartermaster1.set(getQuartermasterById(parseInt(quartermasterRow[0])));
			quartermaster2.set(getQuartermasterById(parseInt(quartermasterRow[1])));

			cannon1.set(getCannonById(parseInt(weaponsRow[0])));
			siegeWeapon1.set(getSiegeWeaponById(parseInt(weaponsRow[1])));

			sailMaterial1.set(getSailById(parseInt(sailsRow[0])));
			sailMaterial1Enchant.set(getSailEnchantById(parseInt(sailsRow[1])));

			ram1.set(getRamById(parseInt(ramsRow[0])));
			ram1Enchant.set(getRamEnchantById(parseInt(ramsRow[1])));

			shipCrew1.set(getShipCrewById(parseInt(crewRow)));

			deckhand1.set(getDeckhandsById(parseInt(deckhandsRow[0])));
			deckhand2.set(getDeckhandsById(parseInt(deckhandsRow[1])));
			deckhand3.set(getDeckhandsById(parseInt(deckhandsRow[2])));
			deckhand4.set(getDeckhandsById(parseInt(deckhandsRow[3])));

			return true;
		} else {
			return false;
		}

		// return true if success
	} catch (error) {
		// return false if error
		return false;
	}
}

export function generateShipCode() {
	/*

	return: code generated

	*/

	const currentShipParts = {
		ship: {
			base: currentShip
		},
		hull: {
			base: hullArmor1,
			enchant: hullArmor1Enchant
		},
		quartermasters: {
			quartermaster1: quartermaster1,
			quartermaster2: quartermaster2
		},
		weapons: {
			cannon: cannon1,
			siegeWeapon: siegeWeapon1
		},
		sails: {
			sailMaterial1: sailMaterial1,
			sailMaterial1Enchant: sailMaterial1Enchant
		},
		rams: {
			ram1: ram1,
			ram1Enchant: ram1Enchant
		},
		crew: {
			shipCrew1: shipCrew1
		},
		deckhands: {
			deckhand1: deckhand1,
			deckhand2: deckhand2,
			deckhand3: deckhand3,
			deckhand4: deckhand4
		}
	};

	let rows = []; // Initialize temp array

	for (const category in currentShipParts) {
		const itemCategory = currentShipParts[category];
		const sectionIds = []; // Initialize temporary array for the row

		for (const section in itemCategory) {
			sectionIds.push(get(itemCategory[section]).id); // Get id for each base / gem1 / gem2 / gem3 / enchant / modifier and add it to the sectionIds
		}

		rows.push(sectionIds.join(',')); // Join the ids together with a .
	}

	let code = rows.join('*'); //Join the rows together with a '
	//The reason for using arrays and joining them was the old + ''' and + '.' method had extra . and ' at the end. This method removes the extra.

	// return code generated
	return code;
}

export const currentShipBuildId = writable('0*0,0*0,0*0,0*0,0*0,0*0*0,0,0,0');
