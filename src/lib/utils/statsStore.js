import { writable } from 'svelte/store';
import { statTemplate } from './statTemplate';

// Define the writable stores for your items
const accessory1 = writable(statTemplate);
const accessory1Gem1 = writable(statTemplate);
const accessory1Gem2 = writable(statTemplate);
const accessory1Gem3 = writable(statTemplate);
const accessory1Enchant = writable(statTemplate);
const accessory1Modifier = writable(statTemplate);

const accessory2 = writable(statTemplate);
const accessory2Gem1 = writable(statTemplate);
const accessory2Gem2 = writable(statTemplate);
const accessory2Gem3 = writable(statTemplate);
const accessory2Enchant = writable(statTemplate);
const accessory2Modifier = writable(statTemplate);

const accessory3 = writable(statTemplate);
const accessory3Gem1 = writable(statTemplate);
const accessory3Gem2 = writable(statTemplate);
const accessory3Gem3 = writable(statTemplate);
const accessory3Enchant = writable(statTemplate);
const accessory3Modifier = writable(statTemplate);

const chestplate1 = writable(statTemplate);
const chestplate1Gem1 = writable(statTemplate);
const chestplate1Gem2 = writable(statTemplate);
const chestplate1Gem3 = writable(statTemplate);
const chestplate1Enchant = writable(statTemplate);
const chestplate1Modifier = writable(statTemplate);

const pants1 = writable(statTemplate);
const pants1Gem1 = writable(statTemplate);
const pants1Gem2 = writable(statTemplate);
const pants1Gem3 = writable(statTemplate);
const pants1Enchant = writable(statTemplate);
const pants1Modifier = writable(statTemplate);

// Function to reset all stores to `statTemplate`
function resetAllStores() {
	accessory1.set(statTemplate);
	accessory1Gem1.set(statTemplate);
	accessory1Gem2.set(statTemplate);
	accessory1Gem3.set(statTemplate);
	accessory1Enchant.set(statTemplate);
	accessory1Modifier.set(statTemplate);

	accessory2.set(statTemplate);
	accessory2Gem1.set(statTemplate);
	accessory2Gem2.set(statTemplate);
	accessory2Gem3.set(statTemplate);
	accessory2Enchant.set(statTemplate);
	accessory2Modifier.set(statTemplate);

	accessory3.set(statTemplate);
	accessory3Gem1.set(statTemplate);
	accessory3Gem2.set(statTemplate);
	accessory3Gem3.set(statTemplate);
	accessory3Enchant.set(statTemplate);
	accessory3Modifier.set(statTemplate);

	chestplate1.set(statTemplate);
	chestplate1Gem1.set(statTemplate);
	chestplate1Gem2.set(statTemplate);
	chestplate1Gem3.set(statTemplate);
	chestplate1Enchant.set(statTemplate);
	chestplate1Modifier.set(statTemplate);

	pants1.set(statTemplate);
	pants1Gem1.set(statTemplate);
	pants1Gem2.set(statTemplate);
	pants1Gem3.set(statTemplate);
	pants1Enchant.set(statTemplate);
	pants1Modifier.set(statTemplate);
}

// Export all your stores
export {
	accessory1,
	accessory1Gem1,
	accessory1Gem2,
	accessory1Gem3,
	accessory1Enchant,
	accessory1Modifier,
	accessory2,
	accessory2Gem1,
	accessory2Gem2,
	accessory2Gem3,
	accessory2Enchant,
	accessory2Modifier,
	accessory3,
	accessory3Gem1,
	accessory3Gem2,
	accessory3Gem3,
	accessory3Enchant,
	accessory3Modifier,
	chestplate1,
	chestplate1Gem1,
	chestplate1Gem2,
	chestplate1Gem3,
	chestplate1Enchant,
	chestplate1Modifier,
	pants1,
	pants1Gem1,
	pants1Gem2,
	pants1Gem3,
	pants1Enchant,
	pants1Modifier,
	resetAllStores
};
