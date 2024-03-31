import type {
	ArmorItemData,
	Rarities,
	GemItemData,
	GemStats,
	EnchantItemData,
	EnchantStats,
	ModifierItemData,
	ModifierStats,
	ShipStats,
	ArmorStats,
	GearBaseStats,
	GearIncrementalStats,
	GearStaticStats,
	ItemStats
} from './itemTypes';

function filterData(input: any) {
	let returnObject: any = {};

	const validKeys = [
		'power',
		'defense',
		'agility',
		'attackSpeed',
		'attackSize',
		'intensity',
		'regeneration',
		'piercing',
		'resistance',

		'powerIncrement',
		'defenseIncrement',
		'agilityIncrement',
		'attackSpeedIncrement',
		'attackSizeIncrement',
		'intensityIncrement',
		'regenerationIncrement',
		'piercingIncrement',
		'resistanceIncrement',

		'insanity',
		'warding',
		'drawback',

		'durability',
		'magicStorage',
		'ramDefense',
		'ramStrength',
		'resilience',
		'speed',
		'stability',
		'turning'
	];

	for (const key in input) {
		if (validKeys.includes(key)) {
			returnObject[key] = input[key];
		}
	}
	return returnObject;
}
//Move to frontend to handle
const rarityColors: { [key in Rarities]: string } = {
	None: '#FFFFFF',
	Common: '#7D7D7F',
	Uncommon: '#817346',
	Rare: '#6765EC',
	Exotic: '#FF0000',
	Seasonal: '#C001C2',
	Legendary: '#00FF00'
};

const noneGem: GemItemData = {
	id: 0,
	name: 'None',
	legend: '',
	rarity: 'None',
	mainType: 'Gem',
	subType: 'None',
	imageId: 'https://i.imgur.com/5pGLWmQ.jpg'
};
class ArmorSlot {
	armor: ArmorItemData;
	armorLevel: number;
	enchant: EnchantItemData;
	modifier: ModifierItemData;
	gems: GemItemData[];
	chosenAtlanteanAttribute: string;
	constructor(armor: ArmorItemData, enchant: EnchantItemData, modifier: ModifierItemData) {
		this.armor = armor;
		this.armorLevel = armor.statsPerLevel[armor.statsPerLevel.length - 1].level;
		this.enchant = enchant;
		this.modifier = modifier;
		this.gems = [];
		this.chosenAtlanteanAttribute = 'None';

		for (let i = 0; i < armor.gemNo; i++) {
			this.gems.push(noneGem);
		}
	}

	getArmorDataAtLevel(level: number) {
		return this.armor.statsPerLevel.find((ArmorAtLevel) => ArmorAtLevel.level === level);
	}
	setArmor(armor: ArmorItemData) {
		this.armor = armor;
	}

	setGem(position: number, gem: GemItemData) {
		this.gems[position - 1] = gem;
	}

	getSlotStats(): ArmorStats {
		const armorStats: any = filterData(this.getArmorDataAtLevel(this.armorLevel));
		const enchantStats: any = filterData(this.enchant);
		const modifierStats: any = this.modifier;
		const levelMultiplier: any = this.armorLevel / 10;
		const gemsStats: any[] = this.gems.map((gem) => filterData(gem));

		let finalSlotStats: any = {
			power: 0,
			defense: 0,
			agility: 0,
			attackSpeed: 0,
			attackSize: 0,
			intensity: 0,
			insanity: 0,
			warding: 0,
			drawback: 0
		};

		const nonIncrementalStats = ['insanity', 'warding', 'drawback'];

		for (const stat in armorStats) {
			finalSlotStats[stat] += armorStats[stat];
		}

		for (const gem of gemsStats) {
			for (const stat in gem) {
				finalSlotStats[stat] += gem[stat];
			}
		}
		// Armor, Enchant, Gem calcs

		const statRelations: any = {
			powerIncrement: 'power',
			defenseIncrement: 'defense',
			agilityIncrement: 'agility',
			attackSpeedIncrement: 'attackSpeed',
			attackSizeIncrement: 'attackSize',
			intensityIncrement: 'intensity',
			insanity: 'insanity',
			warding: 'warding',
			drawback: 'drawback'
		};

		for (const stat in enchantStats) {
			finalSlotStats[statRelations[stat]] +=
				enchantStats[stat] * (nonIncrementalStats.includes(stat) ? 1 : levelMultiplier);
		}

		// Modifier Calcs
		modifierCalcs: if (modifierStats.name == 'Atlantean Essence') {
			//Atlantean calcs

			const atlantenOrder = [
				'powerIncrement',
				'defenseIncrement',
				'attackSizeIncrement',
				'attackSpeedIncrement',
				'agilityIncrement',
				'intensityIncrement'
			];

			for (const stat of atlantenOrder) {
				if (finalSlotStats[statRelations[stat]] == 0) {
					finalSlotStats[statRelations[stat]] += Math.floor(modifierStats[stat] * levelMultiplier);
					this.chosenAtlanteanAttribute = stat;
					finalSlotStats.insanity += modifierStats.insanity;
					break modifierCalcs;
				}
			}

			// Only happens if all have value
			finalSlotStats['power'] += Math.floor(modifierStats['powerIncrement'] * levelMultiplier);
		} else {
			// Regular modifier calculations

			for (const stat in filterData(modifierStats)) {
				finalSlotStats[statRelations[stat]] += Math.floor(modifierStats[stat] * levelMultiplier);
			}
		}

		return finalSlotStats;
	}
}

class CurrentBuild {
	accessory1: ArmorSlot;
	accessory2: ArmorSlot;
	accessory3: ArmorSlot;
	chestplate: ArmorSlot;
	pants: ArmorSlot;
	constructor(
		accessory1: ArmorSlot,
		accessory2: ArmorSlot,
		accessory3: ArmorSlot,
		chestplate: ArmorSlot,
		pants: ArmorSlot
	) {
		this.accessory1 = accessory1;
		this.accessory2 = accessory2;
		this.accessory3 = accessory3;
		this.chestplate = chestplate;
		this.pants = pants;
	}

	getBuildStats(): ArmorStats {
		let finalBuildStats: any = {
			power: 0,
			defense: 0,
			agility: 0,
			attackSpeed: 0,
			attackSize: 0,
			intensity: 0,
			insanity: 0,
			warding: 0,
			drawback: 0
		};

		const statNames: any = [
			'power',
			'defense',
			'agility',
			'attackSpeed',
			'attackSize',
			'intensity',
			'insanity',
			'warding',
			'drawback'
		];

		const currentGearSlotStats: any = [
			this.accessory1.getSlotStats(),
			this.accessory2.getSlotStats(),
			this.accessory3.getSlotStats(),
			this.chestplate.getSlotStats(),
			this.pants.getSlotStats()
		];

		for (const slotStats of currentGearSlotStats) {
			for (const stat of statNames) {
				finalBuildStats[stat] += slotStats[stat];
			}
		}

		return finalBuildStats;
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
	statsPerLevel: [{ level: 120, defense: 153, attackSize: 26 }]
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
	statsPerLevel: [{ level: 120, defense: 204, attackSize: 36 }]
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
	statsPerLevel: [{ level: 120, defense: 153, attackSize: 26 }]
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
	imageId: 'https://i.imgur.com/6XLzqal.jpg'
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
	imageId: 'https://i.imgur.com/lD5ld2A.jpg'
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

let build = new CurrentBuild(
	accessory1Slot,
	accessory2Slot,
	accessory3Slot,
	chestplateSlot,
	pantsSlot
);
console.log(build.getBuildStats());
