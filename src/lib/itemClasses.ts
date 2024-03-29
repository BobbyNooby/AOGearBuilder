import type {
	ArmorItemData,
	ArmorItemStats,
	ItemIdentifiers,
	Rarities,
	ArmorMainTypes,
	GemItemData,
	GemStats,
	GemMainTypes,
	EnchantItemData,
	EnchantMainTypes,
	EnchantStats,
	ModifierItemData,
	ModifierMainTypes,
	ModifierStats,
	ShipItemData,
	ShipMainTypes,
	ShipStats,
	ArmorStats
} from './itemTypes';

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
	legend: 'Nothing Lol',
	defense: 0,
	power: 0,
	agility: 0,
	attackSize: 0,
	attackSpeed: 0,
	intensity: 0,
	insanity: 0,
	drawback: 0,
	warding: 0,
	minLevel: 0,
	maxLevel: 0,
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
	constructor(
		armor: ArmorItemData,
		armorLevel: number,
		enchant: EnchantItemData,
		modifier: ModifierItemData
	) {
		this.armor = armor;
		this.armorLevel = armorLevel;
		this.enchant = enchant;
		this.modifier = modifier;
		this.gems = [];
		this.chosenAtlanteanAttribute = 'None';

		for (let i = 0; i < armor.gemNo; i++) {
			this.gems.push(noneGem);
		}
	}

	setArmor(armor: ArmorItemData) {
		this.armor = armor;
	}

	setGem(position: number, gem: GemItemData) {
		this.gems[position - 1] = gem;
	}

	getSlotStats(): ArmorStats {
		const armorStats: any = this.armor as ArmorItemStats;
		const enchantStats: any = this.enchant as EnchantStats;
		const modifierStats: any = this.modifier as ModifierStats;
		const levelMultiplier: any = this.armorLevel / 10;
		const gemsStats: any[] = this.gems.map((gem) => gem as GemStats);

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

		const statNames: any = {
			power: 'powerIncrement',
			defense: 'defenseIncrement',
			agility: 'agilityIncrement',
			attackSpeed: 'attackSpeedIncrement',
			attackSize: 'attackSizeIncrement',
			intensity: 'intensityIncrement',
			insanity: 'insanity',
			warding: 'warding',
			drawback: 'drawback'
		};

		const nonIncrementalStats = ['insanity', 'warding', 'drawback'];

		// Armor, Enchant, Gem calcs
		for (const stat in statNames) {
			console.log(stat, statNames[stat]);
			//Seperated armor and enchant stats as in rare cases could cause issues if i simplified their formula.

			finalSlotStats[stat] +=
				Math.floor(
					armorStats[statNames[stat]] * (nonIncrementalStats.includes(stat) ? 1 : levelMultiplier)
				) +
				Math.floor(
					enchantStats[statNames[stat]] * (nonIncrementalStats.includes(stat) ? 1 : levelMultiplier)
				);

			for (const gem of gemsStats) {
				finalSlotStats[stat] += gem[stat];
			}
		}

		// Modifier Calcs
		modifierCalcs: if (modifierStats.name == 'Atlantean Essence') {
			//Atlantean calcs

			const atlantenOrder = [
				'power',
				'defense',
				'attackSize',
				'attackSpeed',
				'agility',
				'intensity'
			];

			for (const stat of atlantenOrder) {
				if (finalSlotStats[stat] == 0) {
					finalSlotStats[stat] += Math.floor(modifierStats[statNames[stat]] * levelMultiplier);
					this.chosenAtlanteanAttribute = stat;
					finalSlotStats.insanity += modifierStats.insanity;
					break modifierCalcs;
				}
			}

			// Only happens if all have value
			finalSlotStats['power'] += Math.floor(modifierStats[statNames['power']] * levelMultiplier);
		} else {
			// Regular modifier calculations

			for (const stat in statNames) {
				finalSlotStats[stat] += Math.floor(modifierStats[statNames[stat]] * levelMultiplier);
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

	minLevel: 90,
	maxLevel: 120,

	gemNo: 2,
	powerIncrement: 0,
	defenseIncrement: 153,
	agilityIncrement: 0,
	attackSizeIncrement: 26,
	attackSpeedIncrement: 0,
	intensityIncrement: 0,
	insanity: 0,
	drawback: 0,
	warding: 0
};

const sunkenIronArmor: ArmorItemData = {
	id: 0,
	name: 'Sunken Iron Armor',
	legend: 'Sunken Balls',
	mainType: 'Accessory',
	subType: 'Helmet',
	rarity: 'Rare',
	imageId: 'https://i.imgur.com/MSM7WOL.jpg',

	minLevel: 90,
	maxLevel: 120,

	gemNo: 2,
	powerIncrement: 0,
	defenseIncrement: 204,
	agilityIncrement: 0,
	attackSizeIncrement: 36,
	attackSpeedIncrement: 0,
	intensityIncrement: 0,
	insanity: 0,
	drawback: 0,
	warding: 0
};

const sunkenIronBoots: ArmorItemData = {
	id: 0,
	name: 'Sunken Iron Boots',
	legend: 'Sunken Balls',
	mainType: 'Pants',
	subType: 'None',
	rarity: 'Rare',
	imageId: 'https://i.imgur.com/v3D3oZQ.jpg',

	minLevel: 90,
	maxLevel: 120,

	gemNo: 2,
	powerIncrement: 0,
	defenseIncrement: 153,
	agilityIncrement: 0,
	attackSizeIncrement: 26,
	attackSpeedIncrement: 0,
	intensityIncrement: 0,
	insanity: 0,
	drawback: 0,
	warding: 0
};

const malachiteGem: GemItemData = {
	id: 12,
	name: 'Perfect Malachite',
	legend:
		'Malachi was a mostly-anonymous prophet whose ministry occurred in Jerusalem during the era of Nehemiah and Ezra. Although he spoke primarily to a specific time and place in history, Malachi also prophesied of the messianic “forerunner” who would announce the appearance of Christ more than 400 years after his lifetime.',
	defense: 0,
	power: 3,
	agility: 0,
	attackSize: 9,
	attackSpeed: 0,
	intensity: 0,
	insanity: 0,
	drawback: 0,
	warding: 0,

	minLevel: 0,
	maxLevel: 0,
	rarity: 'None',
	mainType: 'Gem',
	subType: 'None',
	imageId: 'https://i.imgur.com/CXvDUmK.jpg'
};

const arcsphere: ArmorItemData = {
	id: 8,
	name: 'Arcanium Arcsphere',
	legend: 'An arcanium-glass dome capable of conducting magic, meant to be worn on the head.',
	defenseIncrement: 0,
	powerIncrement: 21,
	agilityIncrement: 0,
	attackSizeIncrement: 0,
	attackSpeedIncrement: 0,
	intensityIncrement: 0,
	insanity: 0,
	drawback: 0,
	warding: 0,
	minLevel: 90,
	maxLevel: 120,
	gemNo: 2,
	mainType: 'Accessory',
	subType: 'Hat',
	rarity: 'Uncommon',
	imageId: 'https://i.imgur.com/6XLzqal.jpg'
};

const elitenoble: ArmorItemData = {
	id: 47,
	name: 'Elite Noble Pauldrons',
	legend: 'Im batman',
	defenseIncrement: 0,
	powerIncrement: 0,
	agilityIncrement: 20,
	attackSizeIncrement: 33,
	attackSpeedIncrement: 0,
	intensityIncrement: 0,
	insanity: 0,
	drawback: 0,
	warding: 0,
	minLevel: 90,
	maxLevel: 120,
	gemNo: 2,
	mainType: 'Accessory',
	subType: 'Back',
	rarity: 'Uncommon',
	imageId: 'https://i.imgur.com/lD5ld2A.jpg'
};

const powerfulEnchant: EnchantItemData = {
	id: 13,
	name: 'Powerful',
	legend: 'An enchant that gives +1 points of Power for every 10 levels of an item, rounded down.',
	defenseIncrement: 0,
	powerIncrement: 1,
	agilityIncrement: 0,
	attackSizeIncrement: 0,
	attackSpeedIncrement: 0,
	intensityIncrement: 0,
	insanity: 0,
	drawback: 0,
	warding: 0,
	minLevel: 0,
	maxLevel: 0,
	mainType: 'Enchant',
	subType: 'None',
	rarity: 'Exotic',
	imageId: 'https://i.imgur.com/tYJZ0qq.jpg',
	durability: 0,
	magicStorage: 0,
	ramDefense: 0,
	ramStrength: 0,
	resilience: 0,
	speed: 0,
	stability: 0,
	turning: 0
};

const armoredEnchant: EnchantItemData = {
	id: 13,
	name: 'Armored',
	legend: 'An enchant that gives +1 points of Power for every 10 levels of an item, rounded down.',
	defenseIncrement: 9,
	powerIncrement: 0,
	agilityIncrement: 0,
	attackSizeIncrement: 0,
	attackSpeedIncrement: 0,
	intensityIncrement: 0,
	insanity: 0,
	drawback: 0,
	warding: 0,
	minLevel: 0,
	maxLevel: 0,
	mainType: 'Enchant',
	subType: 'None',
	rarity: 'Exotic',
	imageId: 'https://i.imgur.com/tYJZ0qq.jpg',
	durability: 0,
	magicStorage: 0,
	ramDefense: 0,
	ramStrength: 0,
	resilience: 0,
	speed: 0,
	stability: 0,
	turning: 0
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
	drawback: 0,
	warding: 0,
	minLevel: 0,
	maxLevel: 0,
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
	defenseIncrement: 0, // Defense Changed?
	powerIncrement: 0.5,
	agilityIncrement: 0,
	attackSizeIncrement: 0,
	attackSpeedIncrement: 0,
	intensityIncrement: 0,
	insanity: 0,
	drawback: 0,
	warding: 0,
	minLevel: 0,
	maxLevel: 0,
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
	defenseIncrement: 0, // Defense Changed?
	powerIncrement: 0,
	agilityIncrement: 0,
	attackSizeIncrement: 0,
	attackSpeedIncrement: 0,
	intensityIncrement: 0,
	insanity: 0,
	drawback: 0,
	warding: 0,
	minLevel: 0,
	maxLevel: 0,
	mainType: 'Modifier',
	subType: 'None',
	rarity: 'Exotic',
	imageId: 'https://i.imgur.com/JvqDmI1.jpg'
};

let accessory1Slot = new ArmorSlot(elitenoble, 10, powerfulEnchant, blastedModifier);
accessory1Slot.setGem(1, malachiteGem);
accessory1Slot.setGem(2, malachiteGem);

let accessory2Slot = new ArmorSlot(arcsphere, 100, powerfulEnchant, blastedModifier);
accessory2Slot.setGem(1, malachiteGem);
accessory2Slot.setGem(2, malachiteGem);

let accessory3Slot = new ArmorSlot(sunkenIronHelmet, 10, armoredEnchant, noneModifier);
accessory3Slot.setGem(1, malachiteGem);
accessory3Slot.setGem(2, malachiteGem);

let chestplateSlot = new ArmorSlot(sunkenIronArmor, 10, armoredEnchant, noneModifier);
chestplateSlot.setGem(1, malachiteGem);
chestplateSlot.setGem(2, malachiteGem);

let pantsSlot = new ArmorSlot(sunkenIronBoots, 10, armoredEnchant, atlanteanModifier);
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
