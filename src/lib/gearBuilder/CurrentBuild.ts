import { noneAccessory, noneChestplate, nonePants } from '../defaultGears';
import type {
	ArmorItemData,
	GemItemData,
	EnchantItemData,
	ModifierItemData,
	ArmorStats,
	anyItem
} from '../itemTypes';
import type { Player } from '../playerClasses';

import { ArmorSlot } from './ArmorSlot';
//Move to frontend to handle

export class CurrentBuild {
	parentPlayer: Player;
	slots: {
		accessory1: ArmorSlot;
		accessory2: ArmorSlot;
		accessory3: ArmorSlot;
		chestplate: ArmorSlot;
		pants: ArmorSlot;
	};

	constructor(parentPlayer: Player) {
		//Establish two way interation between player and build
		this.parentPlayer = parentPlayer;

		this.slots = {
			accessory1: new ArmorSlot(noneAccessory, powerfulEnchant, noneModifier),
			accessory2: new ArmorSlot(noneAccessory, powerfulEnchant, noneModifier),
			accessory3: new ArmorSlot(noneAccessory, powerfulEnchant, noneModifier),
			chestplate: new ArmorSlot(noneChestplate, powerfulEnchant, noneModifier),
			pants: new ArmorSlot(nonePants, powerfulEnchant, noneModifier)
		};
	}

	getBuildStats(): ArmorStats {
		let finalBuildStats: any = {
			power: 0,
			defense: 0,
			agility: 0,
			attackSpeed: 0,
			attackSize: 0,
			intensity: 0,
			regeneration: 0,
			piercing: 0,
			resistance: 0,
			insanity: 0,
			warding: 0,
			drawback: 0
		};

		const currentGearSlotStats: any = [
			this.slots.accessory1.getSlotStats(),
			this.slots.accessory2.getSlotStats(),
			this.slots.accessory3.getSlotStats(),
			this.slots.chestplate.getSlotStats(),
			this.slots.pants.getSlotStats()
		];

		for (const slotStats of currentGearSlotStats) {
			for (const stat in slotStats) {
				finalBuildStats[stat] += slotStats[stat];
			}
		}

		return finalBuildStats;
	}

	validateItem(item: anyItem, inputSlotKey: string): boolean {
		for (const slotKey of Object.keys(this.slots)) {
			const slot: ArmorSlot = this.slots[slotKey as keyof typeof this.slots];

			let badConditions: Array<(item: anyItem, slot: ArmorSlot) => boolean> = [];

			if (['Accessory', 'Chestplate', 'Pants'].includes(item.mainType)) {
				//Gears validation handling

				const strictlySingleSubtypes: string[] = ['Amulet', 'Helmet'];

				badConditions = [
					(item, slot) => item.id === slot.armor.id,
					(item, slot) =>
						strictlySingleSubtypes.includes(item.subType) &&
						strictlySingleSubtypes.includes(slot.armor.subType) &&
						inputSlotKey !== slotKey,
					(item, slot) => item.name == 'Virtuous' && slot.modifier.name == 'Atlantean Essence',
					(item, slot) => item.name == 'Atlantean Essence' && slot.enchant.name == 'Virtuous'
				];
			} else if (['Enchant', 'Modifier'].includes(item.mainType)) {
				//Enchant / modifier validation handling

				badConditions = [
					(item, slot) => item.name == 'Virtuous' && slot.modifier.name == 'Atlantean Essence',
					(item, slot) => item.name == 'Atlantean Essence' && slot.enchant.name == 'Virtuous',
					(item, slot) =>
						item.mainType == 'Modifier' && !slot.armor.validModifiers.includes(item.name)
				];
			}

			if (badConditions.some((condition) => condition(item, slot))) {
				return false;
			}
		}

		return true;
	}

	setGear(item: anyItem, slotKey: keyof typeof this.slots, gemIndex: number | boolean = false) {
		if (true) {
			if (['Accessory', 'Chestplate', 'Pants'].includes(item.mainType)) {
				this.slots[slotKey].setArmor(item as ArmorItemData);
			} else if (item.mainType == 'Enchant') {
				this.slots[slotKey].setEnchant(item as EnchantItemData);
			} else if (item.mainType == 'Modifier') {
				this.slots[slotKey].setModifier(item as ModifierItemData);
			} else if (item.mainType == 'Gem' && gemIndex !== false) {
				this.slots[slotKey].setGem(gemIndex as number, item as GemItemData);
			}
		}
	}
}

const sunkenIronHelmet: ArmorItemData = {
	id: 0,
	name: 'Sunken Iron Helmet',
	legend: 'Sunken Balls',
	mainType: 'Accessory',
	subType: 'Helmet',
	rarity: 'Rare',
	imageId: 'https://i.imgur.com/fg5aYLT.jpg',
	gemNo: 2,
	statsPerLevel: [{ level: 120, defense: 153, attackSize: 26 }],
	validModifiers: []
};

const sunkenIronArmor: ArmorItemData = {
	id: 0,
	name: 'Sunken Iron Armor',
	legend: 'Sunken Balls',
	mainType: 'Accessory',
	subType: 'Helmet',
	rarity: 'Rare',
	imageId: 'https://i.imgur.com/MSM7WOL.jpg',

	gemNo: 2,
	statsPerLevel: [{ level: 120, defense: 204, attackSize: 36 }],
	validModifiers: []
};

const sunkenIronBoots: ArmorItemData = {
	id: 0,
	name: 'Sunken Iron Boots',
	legend: 'Sunken Balls',
	mainType: 'Pants',
	subType: 'None',
	rarity: 'Rare',
	imageId: 'https://i.imgur.com/v3D3oZQ.jpg',

	gemNo: 2,
	statsPerLevel: [{ level: 120, defense: 153, attackSize: 26 }],
	validModifiers: []
};

const malachiteGem: GemItemData = {
	id: 12,
	name: 'Perfect Malachite',
	legend:
		'Malachi was a mostly-anonymous prophet whose ministry occurred in Jerusalem during the era of Nehemiah and Ezra. Although he spoke primarily to a specific time and place in history, Malachi also prophesied of the messianic “forerunner” who would announce the appearance of Christ more than 400 years after his lifetime.',
	power: 3,
	attackSize: 9,
	rarity: 'None',
	mainType: 'Gem',
	subType: 'None',
	imageId: 'https://i.imgur.com/CXvDUmK.jpg'
};

const arcsphere: ArmorItemData = {
	id: 8,
	name: 'Arcanium Arcsphere',
	legend: 'An arcanium-glass dome capable of conducting magic, meant to be worn on the head.',
	gemNo: 2,
	statsPerLevel: [{ level: 120, power: 21 }],
	mainType: 'Accessory',
	subType: 'Hat',
	rarity: 'Uncommon',
	imageId: 'https://i.imgur.com/6XLzqal.jpg',
	validModifiers: []
};

const elitenoble: ArmorItemData = {
	id: 47,
	name: 'Elite Noble Pauldrons',
	legend: 'Im batman',
	gemNo: 2,
	statsPerLevel: [{ level: 120, agility: 20, attackSize: 33 }],
	mainType: 'Accessory',
	subType: 'Back',
	rarity: 'Uncommon',
	imageId: 'https://i.imgur.com/lD5ld2A.jpg',
	validModifiers: []
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

const noneModifier: ModifierItemData = {
	id: 1,
	name: 'Blastesd',
	legend:
		'Gives stats per 10 levels rounded down in the following order depending on if your item has the stat or not: Power -> Defense -> Attack Size -> Attack Speed -> Agility -> Intensity -> Power. Shown below is the stat you will get given the stats of your current item.',

	mainType: 'Modifier',
	subType: 'None',
	rarity: 'Exotic',
	imageId: 'https://i.imgur.com/JvqDmI1.jpg'
};

let accessory1Slot = new ArmorSlot(elitenoble, powerfulEnchant, blastedModifier);
accessory1Slot.setGem(1, malachiteGem);
accessory1Slot.setGem(2, malachiteGem);

let accessory2Slot = new ArmorSlot(arcsphere, powerfulEnchant, blastedModifier);
accessory2Slot.setGem(1, malachiteGem);
accessory2Slot.setGem(2, malachiteGem);

let accessory3Slot = new ArmorSlot(sunkenIronHelmet, armoredEnchant, noneModifier);
accessory3Slot.setGem(1, malachiteGem);
accessory3Slot.setGem(2, malachiteGem);

let chestplateSlot = new ArmorSlot(sunkenIronArmor, armoredEnchant, noneModifier);
chestplateSlot.setGem(1, malachiteGem);
chestplateSlot.setGem(2, malachiteGem);

let pantsSlot = new ArmorSlot(sunkenIronBoots, armoredEnchant, atlanteanModifier);
pantsSlot.setGem(1, malachiteGem);
pantsSlot.setGem(2, malachiteGem);

// let build = new CurrentBuild(
// 	accessory1Slot,
// 	accessory2Slot,
// 	accessory3Slot,
// 	chestplateSlot,
// 	pantsSlot
// );
// console.log(build.getBuildStats());
