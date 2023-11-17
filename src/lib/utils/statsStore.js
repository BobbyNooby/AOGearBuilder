import { writable, get } from 'svelte/store';
import {
	accessoryTemplate,
	chestplateTemplate,
	pantsTemplate,
	gemTemplate,
	enchantTemplate,
	modifierTemplate,
	statTemplate
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

export function getCurrentGearSet() {
	const currentGearSet = {
		accessory1: {
			base: accessory1,
			gem1: accessory1Gem1,
			gem2: accessory1Gem2,
			gem3: accessory1Gem3,
			enchant: accessory1Enchant,
			modifier: accessory1Modifier
		},
		accessory2: {
			base: accessory2,
			gem1: accessory2Gem1,
			gem2: accessory2Gem2,
			gem3: accessory2Gem3,
			enchant: accessory2Enchant,
			modifier: accessory2Modifier
		},
		accessory3: {
			base: accessory3,
			gem1: accessory3Gem1,
			gem2: accessory3Gem2,
			gem3: accessory3Gem3,
			enchant: accessory3Enchant,
			modifier: accessory3Modifier
		},
		chestplate1: {
			base: chestplate1,
			gem1: chestplate1Gem1,
			gem2: chestplate1Gem2,
			gem3: chestplate1Gem3,
			enchant: chestplate1Enchant,
			modifier: chestplate1Modifier
		},
		pants1: {
			base: pants1,
			gem1: pants1Gem1,
			gem2: pants1Gem2,
			gem3: pants1Gem3,
			enchant: pants1Enchant,
			modifier: pants1Modifier
		}
	};
	return currentGearSet;
}
// Function to reset all stores
export function resetAllStores() {
	const gears = getCurrentGearSet();

	for (const category in gears) {
		switch (true) {
			case category.startsWith('accessory') == true:
				gears[category].base.set(accessoryTemplate);
				break;
			case category.startsWith('chestplate') == true:
				gears[category].base.set(chestplateTemplate);
				break;
			case category.startsWith('pants') == true:
				gears[category].base.set(pantsTemplate);
				break;
			default:
				break;
		}
		gears[category].gem1.set(gemTemplate);
		gears[category].gem2.set(gemTemplate);
		gears[category].gem3.set(gemTemplate);
		gears[category].enchant.set(enchantTemplate);
		gears[category].modifier.set(modifierTemplate);
	}
}

export function patchBuildCode(inputString) {
	//Prevent url loading code modifications

	const rows = inputString.split("'");
	const modifiedRows = [];

	let index = 0;
	const noDupeSubTypes = ['Amulet', 'Helmet'];
	let accessories = []; // Set up to test for dupe accessories
	for (const row of rows) {
		const currentRow = row.split('.');

		let currentGear = statTemplate;
		if (index <= 2) {
			currentGear = getAccessoryById(parseInt(currentRow[0]));

			if (
				accessories.includes(currentGear) || //Patch duplicate accessories
				(noDupeSubTypes.includes(currentGear.subType) &&
					accessories.some((accessory) => accessory.subType === currentGear.subType)) // Patch duplicate subType
			) {
				currentGear = getAccessoryById(0);
				currentRow[0] = '0';
			}

			accessories.push(currentGear);
		} else if (index == 3) {
			currentGear = getChestplateById(parseInt(currentRow[0]));
		} else if (index > 3) {
			currentGear = getPantsById(parseInt(currentRow[0]));
		}

		//Fix atlantean virtuous incompatibility
		if (currentRow[4] == '15' && currentRow[5] == '1') {
			currentRow[4] = '0';
			currentRow[5] = '0';
		}

		//Extra gems fix
		let gemCount = [];
		for (let i = 1; i <= 3; i++) {
			if (parseInt(currentRow[i]) > 0) {
				gemCount.push(true);
			}
		}

		if (gemCount.length > currentGear.gemNo) {
			for (let i = 3; i >= currentGear.gemNo + 1; i--) {
				currentRow[i] = '0';
			}
		}

		modifiedRows.push(currentRow.join('.'));
		index += 1;
	}

	return modifiedRows;
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

			const rows = patchBuildCode(inputString);
			const gears = getCurrentGearSet();

			let index = 0;
			for (const category in gears) {
				const currentRow = rows[index].split('.');

				switch (true) {
					case category.startsWith('accessory') == true:
						gears[category].base.set(getAccessoryById(parseInt(currentRow[0])));
						break;
					case category.startsWith('chestplate') == true:
						gears[category].base.set(getChestplateById(parseInt(currentRow[0])));
						break;
					case category.startsWith('pants') == true:
						gears[category].base.set(getPantsById(parseInt(currentRow[0])));
						break;
					default:
						break;
				}
				gears[category].gem1.set(getGemById(parseInt(currentRow[1])));
				gears[category].gem2.set(getGemById(parseInt(currentRow[2])));
				gears[category].gem3.set(getGemById(parseInt(currentRow[3])));
				gears[category].enchant.set(getEnchantById(parseInt(currentRow[4])));
				gears[category].modifier.set(getModifierById(parseInt(currentRow[5])));
				index += 1;
			}
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

	const gears = getCurrentGearSet();

	let rows = []; // Initialize temp array

	for (const category in gears) {
		const itemCategory = gears[category];
		const sectionIds = []; // Initialize temporary array for the row

		for (const section in itemCategory) {
			sectionIds.push(get(itemCategory[section]).id); // Get id for each base / gem1 / gem2 / gem3 / enchant / modifier and add it to the sectionIds
		}

		rows.push(sectionIds.join('.')); // Join the ids together with a .
	}

	let code = rows.join("'"); //Join the rows together with a '
	//The reason for using arrays and joining them was the old + ''' and + '.' method had extra . and ' at the end. This method removes the extra.

	// return code generated
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
