import type { ArmorItem, GemItem, EnchantItem, ModifierItem } from '../utils/itemTypes';

export const noneAccessory: ArmorItem = {
	id: 'AAA',
	name: 'None',
	legend: 'Ermmm this is a nothing accessory',
	mainType: 'Accessory',
	rarity: 'None',
	imageId: 'https://i.imgur.com/ynJYNoA.jpg',
	deleted: false,
	subType: 'None',
	gemNo: 0,
	minLevel: 0,
	maxLevel: 0,
	statsPerLevel: [],
	validModifiers: []
};

export const noneChestplate: ArmorItem = {
	id: 'AAB',
	name: 'None',
	legend: 'Nope. Big nothingburger chestplate here.',
	mainType: 'Chestplate',
	rarity: 'None',
	imageId: 'https://i.imgur.com/Uj7r6Fm.jpg',
	deleted: false,
	subType: 'None',
	gemNo: 0,
	minLevel: 0,
	maxLevel: 0,
	statsPerLevel: [],
	validModifiers: []
};

export const nonePants: ArmorItem = {
	id: 'AAC',
	name: 'None',
	legend: 'Yep, big nothing pants over here nothing to see.',
	mainType: 'Pants',
	rarity: 'None',
	imageId: 'https://i.imgur.com/U9Z0chG.jpg',
	deleted: false,
	subType: 'None',
	gemNo: 0,
	minLevel: 0,
	maxLevel: 0,
	statsPerLevel: [],
	validModifiers: []
};

export const noneGem: GemItem = {
	id: 'AAF',
	name: 'None',
	legend: 'Shine bright like a NOTHING',
	mainType: 'Gem',
	rarity: 'None',
	imageId:
		'https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/gem/0.jpg',
	deleted: false
};

export const noneEnchant: EnchantItem = {
	id: 'AAD',
	name: 'None',
	legend: 'Nope nothing enchanting about this at all',
	mainType: 'Enchant',
	rarity: 'None',
	imageId:
		'https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/enchant/0.jpg',
	deleted: false
};

export const noneModifier: ModifierItem = {
	id: 'AAE',
	name: 'None',
	legend: 'This modifies NOTHING it serves ZERO PURPOSE it should disappear NOW!!',
	mainType: 'Modifier',
	rarity: 'None',
	imageId:
		'https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/modifier/0.jpg',
	deleted: false
};
