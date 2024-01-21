import { writable, get } from 'svelte/store';
import {
	accessoryTemplate,
	chestplateTemplate,
	pantsTemplate,
	gemTemplate,
	enchantTemplate,
	modifierTemplate,
	statTemplate,
	postCalcsTempalte
} from './statTemplate';
import {
	getAccessoryById,
	getChestplateById,
	getPantsById,
	getGemById,
	getEnchantById,
	getModifierById
} from '$lib/utils/getItemById';
import { playCorrect } from './sound';
import {
	currentShipBuildId,
	generateShipCode,
	getCurrentShipBuild,
	getCurrentShipParts,
	hullArmor1Enchant,
	quartermaster1,
	quartermaster2,
	ram1Enchant,
	sailMaterial1Enchant
} from './shipStatsStore';

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
			modifier: accessory1Modifier,
			postCalcs: accessory1PostCalcs
		},
		accessory2: {
			base: accessory2,
			gem1: accessory2Gem1,
			gem2: accessory2Gem2,
			gem3: accessory2Gem3,
			enchant: accessory2Enchant,
			modifier: accessory2Modifier,
			postCalcs: accessory2PostCalcs
		},
		accessory3: {
			base: accessory3,
			gem1: accessory3Gem1,
			gem2: accessory3Gem2,
			gem3: accessory3Gem3,
			enchant: accessory3Enchant,
			modifier: accessory3Modifier,
			postCalcs: accessory3PostCalcs
		},
		chestplate1: {
			base: chestplate1,
			gem1: chestplate1Gem1,
			gem2: chestplate1Gem2,
			gem3: chestplate1Gem3,
			enchant: chestplate1Enchant,
			modifier: chestplate1Modifier,
			postCalcs: chestplate1PostCalcs
		},
		pants1: {
			base: pants1,
			gem1: pants1Gem1,
			gem2: pants1Gem2,
			gem3: pants1Gem3,
			enchant: pants1Enchant,
			modifier: pants1Modifier,
			postCalcs: pants1PostCalcs
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

	const noDupeSubTypes = ['Amulet', 'Helmet'];
	let accessories = []; // Set up to test for dupe accessories
	for (let [index, row] of rows.entries()) {
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
		} else if (index == 4) {
			currentGear = getPantsById(parseInt(currentRow[0]));
		} else {
			currentGear = statTemplate;
		}

		//Fix atlantean virtuous incompatibility
		if (currentRow[4] == '15' && currentRow[5] == '1') {
			currentRow[4] = '0';
			currentRow[5] = '0';
		}

		//Extra gems fix
		for (let i = 1; i <= 3; i++) {
			if (parseInt(currentRow[i]) > 0 && currentGear.gemNo < i) {
				currentRow[i] = '0';
			}
		}

		modifiedRows.push(currentRow.join('.'));
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
			handleHealthCalculationUpdate();
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

export function generateCode(type) {
	/*

	return: code generated

	*/

	let itemSet;
	let itemJoiner = '';
	let sectionJoiner = '';

	if (type == 'gear') {
		itemSet = getCurrentGearSet();
		itemJoiner = '.';
		sectionJoiner = "'";
	} else if (type == 'ship') {
		itemSet = getCurrentShipBuild();
		itemJoiner = ',';
		sectionJoiner = '*';
	}

	let rows = []; // Initialize temp array

	for (const category in itemSet) {
		const itemCategory = itemSet[category];
		const sectionIds = []; // Initialize temporary array for the row

		for (const section in itemCategory) {
			sectionIds.push(get(itemCategory[section]).id); // Get id for each base / gem1 / gem2 / gem3 / enchant / modifier and add it to the sectionIds
		}

		rows.push(sectionIds.join(itemJoiner)); // Join the ids together with a .
	}

	let code = rows.join(sectionJoiner); //Join the rows together with a '
	//The reason for using arrays and joining them was the old + ''' and + '.' method had extra . and ' at the end. This method removes the extra.

	// return code generated
	return code;
}

//Temporary fix for modifier restrictions. Will figure out a better way in the future T_T.
export const noModList = [
	'None',
	//Accessories
	'Aereus Hat',
	'Arcanium Bracelet',
	'Archon Quartz Amulet',
	'Cape of Ravenna Loyalty',
	"Cernyx's Faulds",
	'Collared Cape',
	'Dark Bronze Helmet',
	'Lion of Ravenna Helmet',
	"Mantello of Ravenna's Fallen King",
	'Ravenna Apostle Bracelets',
	'Ravenna Apostle Faulds',
	'Ravenna Apostle Pauldrons',
	'Shroud',
	'Sunken Iron Helmet',
	'The Lost Crown of Ravenna',
	'Theurgist Cloak',
	'Theurgist Hat',
	'Vatrachos Cape',
	'Vatrachos Helmet',
	'Wolf Pelt Cloak',
	'Siren Bracelets',
	'Golden Armbands',
	'Sunken Warrior Helmet',
	//Chestplates
	'Aereus Robes',
	"Cernyx's Sleeveless Robe",
	'Dark Bronze Armor',
	'Lion of Ravenna Armor',
	'Ravenna Apostle Gi',
	'Ravenna Fallen King Armor',
	'Ravenna Noble Armor',
	'Siren Top',
	'Sunken Iron Armor',
	'Theurgist Robes',
	'Vatrachos Armor',
	'Bronze Chainmail Shirt',
	'Sunken Warrior Armor',
	//Pants
	'Aereus Pants',
	"Cernyx's Boots",
	'Dark Bronze Boots',
	'Lion of Ravenna Leggings',
	'Ravenna Apostle Leggings',
	'Ravenna Fallen King Boots',
	'Ravenna Noble Boots',
	'Siren Pants',
	'Sunken Iron Boots',
	'Theurgist Pants',
	'Vatrachos Boots',
	'Sunken Warrior Boots'
];

export const noModModifiers = [
	'Frozen',
	'Archaic',
	'Sandy',
	'Superheated',
	'Drowned',
	'Blasted',
	'Crystalline'
];

// Validate that the item may be entered by checking the item is not a duplicate or same sub type as another item
export function validateEntry(item, category = null, currentItem = null) {
	/*

	input: item to be validated
	category: category of item to be validated, default null if not needed (when its known the slot its being placed in is nothing)

	return: returns true if item is valid, returns false if item is not valid
	*/

	const gears = getCurrentGearSet();

	if (
		(currentItem == null || item.name != get(currentItem).name) &&
		(item.name == get(accessory1).name ||
			item.name == get(accessory2).name ||
			item.name == get(accessory3).name ||
			item.name == get(chestplate1).name ||
			item.name == get(pants1).name ||
			item.name == get(quartermaster1).name ||
			item.name == get(quartermaster2).name ||
			(noModModifiers.includes(item.name) && noModList.includes(get(gears[category].base).name)) ||
			(item.subType == 'Amulet' &&
				((get(accessory1).subType == 'Amulet' && category != 'accessory1') ||
					(get(accessory2).subType == 'Amulet' && category != 'accessory2') ||
					(get(accessory3).subType == 'Amulet' && category != 'accessory3'))) ||
			(item.subType == 'Helmet' &&
				((get(accessory1).subType == 'Helmet' && category != 'accessory1') ||
					(get(accessory2).subType == 'Helmet' && category != 'accessory2') ||
					(get(accessory3).subType == 'Helmet' && category != 'accessory3'))) ||
			//Added new virtuous and atlantean conditions
			(category && item.name == 'Virtuous' && get(gears[category].modifier).name == 'Atlantean Essence') ||
			(category && item.name == 'Atlantean Essence' && get(gears[category].enchant).name == 'Virtuous') ||
			(item.name == 'Warship' &&
				(get(hullArmor1Enchant).name == 'Warship' ||
					get(sailMaterial1Enchant).name == 'Warship' ||
					get(ram1Enchant).name == 'Warship')))
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
	let currentBuild = generateCode('gear');
	let currentShipBuild = generateCode('ship');
	currentBuildId.set(currentBuild);
	currentShipBuildId.set(currentShipBuild);
	localStorage.setItem('currentBuild', currentBuild);
	localStorage.setItem('currentShipBuild', currentShipBuild);
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

export const accessory1PostCalcs = writable(postCalcsTempalte);
export const accessory2PostCalcs = writable(postCalcsTempalte);
export const accessory3PostCalcs = writable(postCalcsTempalte);
export const chestplate1PostCalcs = writable(postCalcsTempalte);
export const pants1PostCalcs = writable(postCalcsTempalte);

// Originally wanted to use this to make sure that the level in your health calculator will not go lower than the minimum level needed to wear your gear set
// On the rare chance that you see this woody could you try?
//I been having problems letting it update as well when you equip new gear or the random or load build button. Basically interaction between components
//The problem i had was that it keeps getting 1 and 0 everytime i refresh and when theres an item it defaults to that items minimum value

// export function getMinimumLevelRequirement() {
// 	const gears = getCurrentGearSet();

// 	let minimumLevelRequired = 1;

// 	for (const category in gears) {
// 		const itemMaxLevel = get(gears[category].base).maxLevel;

// 		if (itemMaxLevel > minimumLevelRequired) {
// 			minimumLevelRequired = itemMaxLevel;
// 		}
// 	}

// 	return minimumLevelRequired;
// }

// function handleHealthCalculationUpdate() {
// 	localStorage.setItem('playerLevel', playerLevel.toString());
// 	console.log(localStorage.getItem('playerLevel'));
// 	// localStorage.setItem('vitalityLevel', get(vitalityLevel).toString());
// 	console.log(localStorage.getItem('vitalityLevel'));

// 	if (playerLevel > 125) {
// 		playerLevel = 125;
// 	} else if (playerLevel < getMinimumLevelRequirement() || playerLevel == null) {
// 		playerLevel = getMinimumLevelRequirement();
// 	} else if (vitalityLevel > playerLevel * 2) {
// 		vitalityLevel = playerLevel * 2;
// 	} else if (vitalityLevel < 0 || vitalityLevel == null) {
// 		vitalityLevel = 0;
// 	}

// 	//Local storage handling

// 	localStorage.setItem('playerLevel', playerLevel.toString());
// 	console.log(localStorage.getItem('playerLevel'));
// 	localStorage.setItem('vitalityLevel', vitalityLevel.toString());

// }
