import { accessories } from '$lib/data/gear/accessories';
import { chestplates } from '$lib/data/gear/chestplates';
import { pants } from '$lib/data/gear/pants';
import { enchants } from '$lib/data/gear/enchantMultipliers';
import { gems } from '$lib/data/gear/gems';
import { modifiers } from '$lib/data/gear/modifiers';
import { cannons } from '$lib/data/ships/cannons';
import { dechkands } from '$lib/data/ships/deckhands';
import { hullEnchants } from '$lib/data/ships/hullEnchants';
import { hulls } from '$lib/data/ships/hulls';
import { quartermasters } from '$lib/data/ships/quartermasters';
import { ramEnchants } from '$lib/data/ships/ramEnchants';
import { rams } from '$lib/data/ships/rams';
import { sailEnchants } from '$lib/data/ships/sailEnchants';
import { sails } from '$lib/data/ships/sails';
import { shipCrews } from '$lib/data/ships/shipCrews';
import { ships } from '$lib/data/ships/ships';
import { siegeWeapons } from '$lib/data/ships/siegeWeapons';

//Gears
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

//Ship Parts

export function getShipById(id) {
	return ships.find((ship) => ship.id == id);
}

export function getCannonById(id) {
	return cannons.find((cannon) => cannon.id == id);
}

export function getSiegeWeaponById(id) {
	return siegeWeapons.find((siegeWeapon) => siegeWeapon.id == id);
}

export function getDeckhandsById(id) {
	return dechkands.find((dechkand) => dechkand.id == id);
}

export function getHullEnchantsById(id) {
	return hullEnchants.find((hullEnchant) => hullEnchant.id == id);
}

export function getHullArmorById(id) {
	return hulls.find((hullArmor) => hullArmor.id == id);
}

export function getQuartermasterById(id) {
	return quartermasters.find((quartermaster) => quartermaster.id == id);
}

export function getRamEnchantById(id) {
	return ramEnchants.find((ramEnchant) => ramEnchant.id == id);
}

export function getRamById(id) {
	return rams.find((ram) => ram.id == id);
}

export function getSailEnchantById(id) {
	return sailEnchants.find((sailEnchant) => sailEnchant.id == id);
}

export function getSailById(id) {
	return sails.find((sail) => sail.id == id);
}

export function getShipCrewById(id) {
	return shipCrews.find((shipCrew) => shipCrew.id == id);
}

export function siegeWeapon(id) {
	return siegeWeapons.find((siegeWeapon) => siegeWeapon.id == id);
}
