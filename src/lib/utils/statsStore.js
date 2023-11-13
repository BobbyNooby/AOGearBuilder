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

// Function to reset all stores
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
		// Decode URI in case the browser auto encodes URI

		inputString = decodeURI(inputString);

		if (inputString.length >= 59) {
			// Parse the input string
			const rows = inputString.split("'");
			const accessory1Row = rows[0].split('.');
			const accessory2Row = rows[1].split('.');
			const accessory3Row = rows[2].split('.');
			const chestplate1Row = rows[3].split('.');
			const pants1Row = rows[4].split('.');

			//Patch for new atlantean virtuous changes.
			if (accessory1Row[4] == '15' && accessory1Row[5] == '1') {
				accessory1Row[4] = '0';
				accessory1Row[5] = '0';
			}
			if (accessory2Row[4] == '15' && accessory2Row[5] == '1') {
				accessory2Row[4] = '0';
				accessory2Row[5] = '0';
			}
			if (accessory3Row[4] == '15' && accessory3Row[5] == '1') {
				accessory3Row[4] = '0';
				accessory3Row[5] = '0';
			}
			if (chestplate1Row[4] == '15' && chestplate1Row[5] == '1') {
				chestplate1Row[4] = '0';
				chestplate1Row[5] = '0';
			}
			if (pants1Row[4] == '15' && pants1Row[5] == '1') {
				pants1Row[4] = '0';
				pants1Row[5] = '0';
			}

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
			storeCurrentBuild();
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

// Validate that the item may be entered by checking the item is not a duplicate or same sub type as another item
export function validateEntry(item, category = null) {
	/*

	input: item to be validated
	category: category of item to be validated, default null if not needed (when its known the slot its being placed in is nothing)

	return: returns true if item is valid, returns false if item is not valid
	*/

	if (
		item.name == get(accessory1).name ||
		item.name == get(accessory2).name ||
		item.name == get(accessory3).name ||
		item.name == get(chestplate1).name ||
		item.name == get(pants1).name ||
		(item.subType == 'Amulet' &&
			((get(accessory1).subType == 'Amulet' && category != 'accessory1') ||
				(get(accessory2).subType == 'Amulet' && category != 'accessory2') ||
				(get(accessory3).subType == 'Amulet' && category != 'accessory3'))) ||
		(item.subType == 'Helmet' &&
			((get(accessory1).subType == 'Helmet' && category != 'accessory1') ||
				(get(accessory2).subType == 'Helmet' && category != 'accessory2') ||
				(get(accessory3).subType == 'Helmet' && category != 'accessory3'))) ||
		//Added new virtuous and atlantean conditions
		(item.name == 'Virtuous' &&
			((category == 'accessory1Enchant' && get(accessory1Modifier).name == 'Atlantean Essence') ||
				(category == 'accessory2Enchant' && get(accessory2Modifier).name == 'Atlantean Essence') ||
				(category == 'accessory3Enchant' && get(accessory3Modifier).name == 'Atlantean Essence') ||
				(category == 'chestplate1Enchant' &&
					get(chestplate1Modifier).name == 'Atlantean Essence') ||
				(category == 'pants1Enchant' && get(pants1Modifier).name == 'Atlantean Essence'))) ||
		(item.name == 'Atlantean Essence' &&
			((category == 'accessory1Modifier' && get(accessory1Enchant).name == 'Virtuous') ||
				(category == 'accessory2Modifier' && get(accessory2Enchant).name == 'Virtuous') ||
				(category == 'accessory3Modifier' && get(accessory3Enchant).name == 'Virtuous') ||
				(category == 'chestplate1Modifier' && get(chestplate1Enchant).name == 'Virtuous') ||
				(category == 'pants1Modifier' && get(pants1Enchant).name == 'Virtuous')))
	) {
		return false;
	} else {
		return true;
	}
}

export const currentBuildId = writable(
	"0.0.0.0.0.0'0.0.0.0.0.0'0.0.0.0.0.0'0.0.0.0.0.0'0.0.0.0.0.0"
);

// Function to store the current build
export function storeCurrentBuild() {
	let currentBuild = generateCode();
	currentBuildId.set(currentBuild);
	localStorage.setItem('currentBuild', currentBuild);
}

//Switched to a store method of storing finalStats to prepare for if i need to call these values in the future.
//Old version i calcualte the final stats on the spot in the html, but with this version i used stores and calculated it in the script section of the component.
export const finalPower = writable(0);
export const finalDefense = writable(0);
export const finalAgility = writable(0);
export const finalAttackSpeed = writable(0);
export const finalAttackSize = writable(0);
export const finalIntensity = writable(0);
export const finalInsanity = writable(0);
export const finalDrawback = writable(0);
export const finalWarding = writable(0);
