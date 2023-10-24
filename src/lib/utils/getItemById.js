import { accessories } from '$lib/data/accessories';
import { chestplates } from '$lib/data/chestplates';
import { pants } from '$lib/data/pants';
import { enchants } from '$lib/data/enchantMultipliers';
import { gems } from '$lib/data/gems';
import { modifiers } from '$lib/data/modifiers';

export function getAccessoryById(id) {
	return accessories.find((accessory) => accessory.id == id);
}

export function getChestplateById(id) {
	return chestplates.find((chestplate) => chestplate.id == id);
}

export function getPantsById(id) {
	return pants.find((pants) => pants.id == id);
}

export function getEnchantById(id) {
	return enchants.find((enchant) => enchant.id == id);
}

export function getGemById(id) {
	return gems.find((gem) => gem.id == id);
}

export function getModifierById(id) {
	return modifiers.find((modifier) => modifier.id == id);
}
