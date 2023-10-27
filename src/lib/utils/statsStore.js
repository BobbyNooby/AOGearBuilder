import { writable, get } from 'svelte/store';
import {
	accessoryTemplate,
	chestplateTemplate,
	pantsTemplate,
	gemTemplate,
	enchantTemplate,
	modifierTemplate
} from './statTemplate';
import {
	getAccessoryById,
	getChestplateById,
	getPantsById,
	getGemById,
	getEnchantById,
	getModifierById
} from '$lib/utils/getItemById';

// Define the writable stores for your items
export const accessory1 = writable(accessoryTemplate);
export const accessory1Gem1 = writable(gemTemplate);
export const accessory1Gem2 = writable(gemTemplate);
export const accessory1Gem3 = writable(gemTemplate);
export const accessory1Enchant = writable(enchantTemplate);
export const accessory1Modifier = writable(modifierTemplate);

export const accessory2 = writable(accessoryTemplate);
export const accessory2Gem1 = writable(gemTemplate);
export const accessory2Gem2 = writable(gemTemplate);
export const accessory2Gem3 = writable(gemTemplate);
export const accessory2Enchant = writable(enchantTemplate);
export const accessory2Modifier = writable(modifierTemplate);

export const accessory3 = writable(accessoryTemplate);
export const accessory3Gem1 = writable(gemTemplate);
export const accessory3Gem2 = writable(gemTemplate);
export const accessory3Gem3 = writable(gemTemplate);
export const accessory3Enchant = writable(enchantTemplate);
export const accessory3Modifier = writable(modifierTemplate);

export const chestplate1 = writable(chestplateTemplate);
export const chestplate1Gem1 = writable(gemTemplate);
export const chestplate1Gem2 = writable(gemTemplate);
export const chestplate1Gem3 = writable(gemTemplate);
export const chestplate1Enchant = writable(enchantTemplate);
export const chestplate1Modifier = writable(modifierTemplate);

export const pants1 = writable(pantsTemplate);
export const pants1Gem1 = writable(gemTemplate);
export const pants1Gem2 = writable(gemTemplate);
export const pants1Gem3 = writable(gemTemplate);
export const pants1Enchant = writable(enchantTemplate);
export const pants1Modifier = writable(modifierTemplate);

// Function to reset all stores to `gemTemplate`
export function resetAllStores() {
	accessory1.set(accessoryTemplate);
	accessory1Gem1.set(gemTemplate);
	accessory1Gem2.set(gemTemplate);
	accessory1Gem3.set(gemTemplate);
	accessory1Enchant.set(enchantTemplate);
	accessory1Modifier.set(modifierTemplate);

	accessory2.set(accessoryTemplate);
	accessory2Gem1.set(gemTemplate);
	accessory2Gem2.set(gemTemplate);
	accessory2Gem3.set(gemTemplate);
	accessory2Enchant.set(enchantTemplate);
	accessory2Modifier.set(modifierTemplate);

	accessory3.set(accessoryTemplate);
	accessory3Gem1.set(gemTemplate);
	accessory3Gem2.set(gemTemplate);
	accessory3Gem3.set(gemTemplate);
	accessory3Enchant.set(enchantTemplate);
	accessory3Modifier.set(modifierTemplate);

	chestplate1.set(chestplateTemplate);
	chestplate1Gem1.set(gemTemplate);
	chestplate1Gem2.set(gemTemplate);
	chestplate1Gem3.set(gemTemplate);
	chestplate1Enchant.set(enchantTemplate);
	chestplate1Modifier.set(modifierTemplate);

	pants1.set(pantsTemplate);
	pants1Gem1.set(gemTemplate);
	pants1Gem2.set(gemTemplate);
	pants1Gem3.set(gemTemplate);
	pants1Enchant.set(enchantTemplate);
	pants1Modifier.set(modifierTemplate);
}

export function loadCode(inputString) {
	/*

	input: the string of build to load

	return: returns true if successful, returns false if error
	
	*/

	try {
		// Parse the input string
		const rows = inputString.split("'");
		const accessory1Row = rows[0].split('.');
		const accessory2Row = rows[1].split('.');
		const accessory3Row = rows[2].split('.');
		const chestplate1Row = rows[3].split('.');
		const pants1Row = rows[4].split('.');

		accessory1.set(getAccessoryById(parseInt(accessory1Row[0])));
		accessory1Gem1.set(getGemById(parseInt(accessory1Row[1])));
		accessory1Gem2.set(getGemById(parseInt(accessory1Row[2])));
		accessory1Gem3.set(getGemById(parseInt(accessory1Row[3])));
		accessory1Enchant.set(getEnchantById(parseInt(accessory1Row[4])));
		accessory1Modifier.set(getModifierById(parseInt(accessory1Row[5])));

		accessory2.set(getAccessoryById(parseInt(accessory2Row[0])));
		accessory2Gem1.set(getGemById(parseInt(accessory2Row[1])));
		accessory2Gem2.set(getGemById(parseInt(accessory2Row[2])));
		accessory2Gem3.set(getGemById(parseInt(accessory2Row[3])));
		accessory2Enchant.set(getEnchantById(parseInt(accessory2Row[4])));
		accessory2Modifier.set(getModifierById(parseInt(accessory2Row[5])));

		accessory3.set(getAccessoryById(parseInt(accessory3Row[0])));
		accessory3Gem1.set(getGemById(parseInt(accessory3Row[1])));
		accessory3Gem2.set(getGemById(parseInt(accessory3Row[2])));
		accessory3Gem3.set(getGemById(parseInt(accessory3Row[3])));
		accessory3Enchant.set(getEnchantById(parseInt(accessory3Row[4])));
		accessory3Modifier.set(getModifierById(parseInt(accessory3Row[5])));

		chestplate1.set(getChestplateById(parseInt(chestplate1Row[0])));
		chestplate1Gem1.set(getGemById(parseInt(chestplate1Row[1])));
		chestplate1Gem2.set(getGemById(parseInt(chestplate1Row[2])));
		chestplate1Gem3.set(getGemById(parseInt(chestplate1Row[3])));
		chestplate1Enchant.set(getEnchantById(parseInt(chestplate1Row[4])));
		chestplate1Modifier.set(getModifierById(parseInt(chestplate1Row[5])));

		pants1.set(getPantsById(parseInt(pants1Row[0])));
		pants1Gem1.set(getGemById(parseInt(pants1Row[1])));
		pants1Gem2.set(getGemById(parseInt(pants1Row[2])));
		pants1Gem3.set(getGemById(parseInt(pants1Row[3])));
		pants1Enchant.set(getEnchantById(parseInt(pants1Row[4])));
		pants1Modifier.set(getModifierById(parseInt(pants1Row[5])));

		// return true if success
		return true;
	} catch (error) {
		// return false if error
		return false;
	}
}

export function generateCode() {
	/*

	return: code generated

	*/
	let code =
		get(accessory1).id +
		'.' +
		get(accessory1Gem1).id +
		'.' +
		get(accessory1Gem2).id +
		'.' +
		get(accessory1Gem3).id +
		'.' +
		get(accessory1Enchant).id +
		'.' +
		get(accessory1Modifier).id +
		"'" +
		get(accessory2).id +
		'.' +
		get(accessory2Gem1).id +
		'.' +
		get(accessory2Gem2).id +
		'.' +
		get(accessory2Gem3).id +
		'.' +
		get(accessory2Enchant).id +
		'.' +
		get(accessory2Modifier).id +
		"'" +
		get(accessory3).id +
		'.' +
		get(accessory3Gem1).id +
		'.' +
		get(accessory3Gem2).id +
		'.' +
		get(accessory3Gem3).id +
		'.' +
		get(accessory3Enchant).id +
		'.' +
		get(accessory3Modifier).id +
		"'" +
		get(chestplate1).id +
		'.' +
		get(chestplate1Gem1).id +
		'.' +
		get(chestplate1Gem2).id +
		'.' +
		get(chestplate1Gem3).id +
		'.' +
		get(chestplate1Enchant).id +
		'.' +
		get(chestplate1Modifier).id +
		"'" +
		get(pants1).id +
		'.' +
		get(pants1Gem1).id +
		'.' +
		get(pants1Gem2).id +
		'.' +
		get(pants1Gem3).id +
		'.' +
		get(pants1Enchant).id +
		'.' +
		get(pants1Modifier).id;

	// retirn code generated
	return code;
}
