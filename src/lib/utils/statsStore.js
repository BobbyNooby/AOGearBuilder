import { get, writable } from 'svelte/store';
import {
	accessoryTemplate,
	chestplateTemplate,
	pantsTemplate,
	gemTemplate,
	enchantTemplate,
	modifierTemplate
} from './statTemplate';

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

// Validate that the item may be entered by checking the item is not a duplicate or same sub type as another item
export function validateEntry(item) {
	/*

	input: item to be validated

	return: returns true if item is valid, returns false if item is not valid
	*/

	if (item.name == get(accessory1).name ||
		item.name == get(accessory2).name ||
		item.name == get(accessory3).name ||
		item.name == get(chestplate1).name ||
		item.name == get(pants1).name ||
		(item.subType == 'Amulet' && (get(accessory1).subType == 'Amulet'|| get(accessory2).subType == 'Amulet' || get(accessory3).subType == 'Amulet')) ||
		(item.subType == 'Helmet' && (get(accessory1).subType == 'Helmet'|| get(accessory2).subType == 'Helmet' || get(accessory3).subType == 'Helmet'))) 
	{
		return false;
	} else {
		return true;
	}
}
