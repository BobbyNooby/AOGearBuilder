import type { ArmorItemData, GemItemData, EnchantItemData, ModifierItemData } from './itemTypes';

export const noneAccessory: ArmorItemData = {
	id: 0,
	name: 'None',
	legend: 'None Accessory',
	mainType: 'Accessory',
	subType: 'None',
	rarity: 'None',
	imageId: 'https://i.imgur.com/ynJYNoA.jpg',
	gemNo: 2,
	statsPerLevel: [
		{ level: 110, defense: 10 },
		{ level: 120, defense: 20 }
	],
	validModifiers: []
};

export const noneChestplate: ArmorItemData = {
	id: 0,
	name: 'None',
	legend: 'None Chestplate',
	mainType: 'Chestplate',
	subType: 'None',
	rarity: 'None',
	imageId: 'https://i.imgur.com/Uj7r6Fm.jpg',
	gemNo: 0,
	statsPerLevel: [
		{ level: 110, power: 10 },
		{ level: 120, power: 20 }
	],
	validModifiers: []
};

export const nonePants: ArmorItemData = {
	id: 0,
	name: 'None',
	legend: 'None Pants',
	mainType: 'Pants',
	subType: 'None',
	rarity: 'None',
	imageId: 'https://i.imgur.com/U9Z0chG.jpg',
	gemNo: 0,
	statsPerLevel: [
		{ level: 110, agility: 10 },
		{ level: 120, agility: 20 }
	],
	validModifiers: []
};

export const noneGem: GemItemData = {
	id: 12,
	name: 'None',
	legend: 'None Gem',
	power: 3,
	attackSize: 9,
	rarity: 'None',
	mainType: 'Gem',
	subType: 'None',
	imageId: 'https://i.imgur.com/CXvDUmK.jpg'
};

const powerfulEnchant: EnchantItemData = {
	id: 13,
	name: 'Powerful',
	legend: 'An enchant that gives +1 points of Power for every 10 levels of an item, rounded down.',
	powerIncrement: 1,
	mainType: 'Enchant',
	subType: 'None',
	rarity: 'Exotic',
	imageId: 'https://i.imgur.com/tYJZ0qq.jpg'
};

const armoredEnchant: EnchantItemData = {
	id: 13,
	name: 'Armored',
	legend: 'An enchant that gives +1 points of Power for every 10 levels of an item, rounded down.',
	defenseIncrement: 9,
	mainType: 'Enchant',
	subType: 'None',
	rarity: 'Exotic',
	imageId: 'https://i.imgur.com/tYJZ0qq.jpg'
};

const atlanteanModifier: ModifierItemData = {
	id: 1,
	name: 'Atlantean Essence',
	legend:
		'Gives stats per 10 levels rounded down in the following order depending on if your item has the stat or not: Power -> Defense -> Attack Size -> Attack Speed -> Agility -> Intensity -> Power. Shown below is the stat you will get given the stats of your current item.',
	defenseIncrement: 8.83, // Defense Changed?
	powerIncrement: 1,
	agilityIncrement: 3,
	attackSizeIncrement: 3,
	attackSpeedIncrement: 3,
	intensityIncrement: 3,
	insanity: 1,
	mainType: 'Modifier',
	subType: 'None',
	rarity: 'Exotic',
	imageId: 'https://i.imgur.com/JvqDmI1.jpg'
};

const blastedModifier: ModifierItemData = {
	id: 1,
	name: 'Blasted',
	legend:
		'Gives stats per 10 levels rounded down in the following order depending on if your item has the stat or not: Power -> Defense -> Attack Size -> Attack Speed -> Agility -> Intensity -> Power. Shown below is the stat you will get given the stats of your current item.',
	powerIncrement: 0.5,
	mainType: 'Modifier',
	subType: 'None',
	rarity: 'Exotic',
	imageId: 'https://i.imgur.com/JvqDmI1.jpg'
};

export const noneModifier: ModifierItemData = {
	id: 0,
	name: 'None',
	legend:
		'Gives stats per 10 levels rounded down in the following order depending on if your item has the stat or not: Power -> Defense -> Attack Size -> Attack Speed -> Agility -> Intensity -> Power. Shown below is the stat you will get given the stats of your current item.',

	mainType: 'Modifier',
	subType: 'None',
	rarity: 'Exotic',
	imageId: 'https://i.imgur.com/JvqDmI1.jpg'
};
