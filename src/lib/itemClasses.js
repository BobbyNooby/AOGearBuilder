class Item {
	constructor(
		name,
		legend,

		minLevel = -1, // Testing for items have a min level for like scrolls and ship parts and shi.
		maxLevel = 120, // Max level an item can be atm.
		mainType,
		subType,
		rarity,
		imageId
	) {
		this.name = name;
		this.legend = legend;

		this.minLevel = minLevel;
		this.maxLevel = maxLevel;
		this.mainType = mainType;
		this.subType = subType;
		this.rarity = rarity;

		const rarityColors = {
			Common: '#7D7D7F',
			Uncommon: '#817346',
			Rare: '#6765EC',
			Exotic: '#FF0000',
			Seasonal: '#C001C2',
			Legendary: '#00FF00'
		};

		this.rarityColor = rarityColors[rarity];
		this.imageId = imageId;
	}
}

class ShipItem extends Item {
	constructor(
		name,
		legend,

		maxLevel,
		mainType,
		subType,
		rarity,
		rarityColor,
		imageId,

		durability = 0,
		magicStorage = 0,
		ramDefense = 0,
		ramStrength = 0,
		resilience = 0,
		speed = 0,
		stability = 0,
		turning = 0
	) {
		super(name, legend, maxLevel, mainType, subType, rarity, rarityColor, imageId);

		this.durability = durability;
		this.magicStorage = magicStorage;
		this.ramDefense = ramDefense;
		this.ramStrength = ramStrength;
		this.resilience = resilience;
		this.speed = speed;
		this.stability = stability;
		this.turning = turning;
	}
}

class Enchant extends Item {
	constructor(
		name,
		legend,

		minLevel,
		maxLevel,

		mainType,
		subType,
		rarity,
		imageId,

		powerIncrement = 0,
		defenseIncrement = 0,
		agilityIncrement = 0,
		attackSpeedIncrement = 0,
		attackSizeIncrement = 0,
		intensityIncrement = 0,
		insanity = 0,
		warding = 0,
		drawback = 0,

		durability = 0,
		magicStorage = 0,
		ramDefense = 0,
		ramStrength = 0,
		resilience = 0,
		speed = 0,
		stability = 0,
		turning = 0
	) {
		super(name, legend, minLevel, maxLevel, mainType, subType, rarity, imageId);

		this.powerIncrement = powerIncrement;
		this.defenseIncrement = defenseIncrement;
		this.agilityIncrement = agilityIncrement;
		this.attackSpeedIncrement = attackSpeedIncrement;
		this.attackSizeIncrement = attackSizeIncrement;
		this.intensityIncrement = intensityIncrement;
		this.insanity = insanity;
		this.warding = warding;
		this.drawback = drawback;

		this.durability = durability;
		this.magicStorage = magicStorage;
		this.ramDefense = ramDefense;
		this.ramStrength = ramStrength;
		this.resilience = resilience;
		this.speed = speed;
		this.stability = stability;
		this.turning = turning;
	}

	getStats() {
		let stats = {
			name: this.name,
			legend: this.legend,

			minLevel: this.minLevel,
			maxLevel: this.maxLevel,

			mainType: this.mainType,
			subType: this.subType,
			rarity: this.rarity,
			rarityColor: this.rarityColor,
			imageId: this.imageId,

			powerIncrement: this.powerIncrement,
			defenseIncrement: this.defenseIncrement,
			agilityIncrement: this.agilityIncrement,
			attackSpeedIncrement: this.attackSpeedIncrement,
			attackSizeIncrement: this.attackSizeIncrement,
			intensityIncrement: this.intensityIncrement,
			insanity: this.insanity,
			warding: this.warding,
			drawback: this.drawback,

			durability: this.durability,
			magicStorage: this.magicStorage,
			ramDefense: this.ramDefense,
			ramStrength: this.ramStrength,
			resilience: this.resilience,
			speed: this.speed,
			stability: this.stability,
			turning: this.turning
		};

		return stats;
	}
}

class Modifier extends Item {
	constructor(
		name,
		legend,

		minLevel,
		maxLevel,

		mainType,
		subType,
		rarity,
		imageId,

		powerIncrement = 0,
		defenseIncrement = 0,
		agilityIncrement = 0,
		attackSpeedIncrement = 0,
		attackSizeIncrement = 0,
		intensityIncrement = 0,
		insanity = 0,
		warding = 0,
		drawback = 0
	) {
		super(name, legend, minLevel, maxLevel, mainType, subType, rarity, imageId);

		this.powerIncrement = powerIncrement;
		this.defenseIncrement = defenseIncrement;
		this.agilityIncrement = agilityIncrement;
		this.attackSpeedIncrement = attackSpeedIncrement;
		this.attackSizeIncrement = attackSizeIncrement;
		this.intensityIncrement = intensityIncrement;
		this.insanity = insanity;
		this.warding = warding;
		this.drawback = drawback;
	}

	getStats() {
		let stats = {
			name: this.name,
			legend: this.legend,

			minLevel: this.minLevel,
			maxLevel: this.maxLevel,

			mainType: this.mainType,
			subType: this.subType,
			rarity: this.rarity,
			rarityColor: this.rarityColor,
			imageId: this.imageId,

			powerIncrement: this.powerIncrement,
			defenseIncrement: this.defenseIncrement,
			agilityIncrement: this.agilityIncrement,
			attackSpeedIncrement: this.attackSpeedIncrement,
			attackSizeIncrement: this.attackSizeIncrement,
			intensityIncrement: this.intensityIncrement,
			insanity: this.insanity,
			warding: this.warding,
			drawback: this.drawback
		};

		return stats;
	}
}
class Gem extends Item {
	constructor(
		name,
		legend,

		minLevel,
		maxLevel,

		mainType,
		subType,
		rarity,
		imageId,

		power = 0,
		defense = 0,
		agility = 0,
		attackSpeed = 0,
		attackSize = 0,
		intensity = 0,
		insanity = 0,
		warding = 0,
		drawback = 0
	) {
		super(name, legend, minLevel, maxLevel, mainType, subType, rarity, imageId);

		this.power = power;
		this.defense = defense;
		this.agility = agility;
		this.attackSpeed = attackSpeed;
		this.attackSize = attackSize;
		this.intensity = intensity;
		this.insanity = insanity;
		this.warding = warding;
		this.drawback = drawback;
	}

	getStats() {
		let stats = {
			name: this.name,
			legend: this.legend,

			minLevel: this.minLevel,
			maxLevel: this.maxLevel,

			mainType: this.mainType,
			subType: this.subType,
			rarity: this.rarity,
			rarityColor: this.rarityColor,
			imageId: this.imageId,

			power: this.power,
			defense: this.defense,
			agility: this.agility,
			attackSpeed: this.attackSpeed,
			attackSize: this.attackSize,
			intensity: this.intensity,
			insanity: this.insanity,
			warding: this.warding,
			drawback: this.drawback
		};

		return stats;
	}
}

export class ArmorItem extends Item {
	constructor(
		name,
		legend,

		minLevel,
		maxLevel,

		mainType,
		subType,
		rarity,
		imageId,

		gemNo = 0,

		powerIncrement = 0,
		defenseIncrement = 0,
		agilityIncrement = 0,
		attackSpeedIncrement = 0,
		attackSizeIncrement = 0,
		intensityIncrement = 0,
		insanity = 0,
		warding = 0,
		drawback = 0
	) {
		super(name, legend, minLevel, maxLevel, mainType, subType, rarity, imageId);

		this.gemNo = gemNo;

		this.powerIncrement = powerIncrement;
		this.defenseIncrement = defenseIncrement;
		this.agilityIncrement = agilityIncrement;
		this.attackSpeedIncrement = attackSpeedIncrement;
		this.attackSizeIncrement = attackSizeIncrement;
		this.intensityIncrement = intensityIncrement;
		this.insanity = insanity;
		this.warding = warding;
		this.drawback = drawback;
	}

	getStats() {
		let stats = {
			name: this.name,
			legend: this.legend,

			minLevel: this.minLevel,
			maxLevel: this.maxLevel,

			mainType: this.mainType,
			subType: this.subType,
			rarity: this.rarity,
			rarityColor: this.rarityColor,
			imageId: this.imageId,

			gemNo: this.gemNo,

			powerIncrement: this.powerIncrement,
			defenseIncrement: this.defenseIncrement,
			agilityIncrement: this.agilityIncrement,
			attackSpeedIncrement: this.attackSpeedIncrement,
			attackSizeIncrement: this.attackSizeIncrement,
			intensityIncrement: this.intensityIncrement,
			insanity: this.insanity,
			warding: this.warding,
			drawback: this.drawback
		};

		return stats;
	}
}

const noneItem = new ArmorItem(
	'None',
	'None lol.',
	10,
	10,
	'None',
	'None',
	'None',
	'None',
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0
);

const noneGem = new Gem(
	'None',
	'None lol.',
	10,
	10,
	'None',
	'None',
	'None',
	'None',
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0
);
const noneEnchant = new Enchant(
	'None',
	'None',
	0,
	0,
	'None',
	'None',
	'None',
	'None',
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0
);

const noneModifier = new Modifier(
	'None',
	'None',
	0,
	0,
	'None',
	'None',
	'None',
	'None',
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0
);

class ArmorSlot {
	constructor(armor = noneItem, armorLevel = 0, enchant = noneEnchant, modifier = noneModifier) {
		this.armor = armor;
		this.armorLevel = armorLevel;
		this.enchant = enchant;
		this.modifier = modifier;

		this.gems = [];
		console.log(this.armor.gemNo);

		for (let i = 0; i < armor.gemNo; i++) {
			this.gems.push(noneGem);
		}

		this.chosenAtlanteanAttribute = '';
	}

	setArmor(armor) {
		this.armor = armor;
	}

	getSlotStats() {
		const armorStats = this.armor.getStats();
		const enchantStats = this.enchant.getStats();
		const modifierStats = this.modifier.getStats();
		const levelMultiplier = this.armorLevel / 10;

		let gemsStats = [];

		for (const gem of this.gems) {
			gemsStats.push(gem.getStats());
		}

		let finalStats = {
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

		const statNames = {
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

			finalStats[stat] +=
				Math.floor(
					armorStats[statNames[stat]] * (nonIncrementalStats.includes(stat) ? 1 : levelMultiplier)
				) +
				Math.floor(
					enchantStats[statNames[stat]] * (nonIncrementalStats.includes(stat) ? 1 : levelMultiplier)
				);

			for (const gem of gemsStats) {
				finalStats[stat] += gem[stat];
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
				if (finalStats[stat] == 0) {
					finalStats[stat] += Math.floor(modifierStats[statNames[stat]] * levelMultiplier);
					this.chosenAtlanteanAttribute = stat;
					finalStats.insanity += modifierStats.insanity;
					break modifierCalcs;
				}
			}

			// Only happens if all have value
			finalStats['power'] += Math.floor(modifierStats[statNames['power']] * levelMultiplier);
		} else {
			// Regular modifier calculations

			for (const stat in statNames) {
				finalStats[stat] += Math.floor(modifierStats[statNames[stat]] * levelMultiplier);
			}
		}

		return finalStats;
	}
}

class CurrentBuild {
	constructor(
		accessory1 = blankArmor,
		accessory2 = blankArmor,
		accessory3 = blankArmor,
		chestplate = blankArmor,
		pants = blankArmor
	) {
		this.accessory1 = accessory1;
		this.accessory2 = accessory2;
		this.accessory3 = accessory3;
		this.chestplate = chestplate;
		this.pants = pants;
	}

	isArmorAlreadyExist(inputArmor) {
		let currentArmorSet = [
			this.accessory1,
			this.accessory2,
			this.accessory3,
			this.chestplate,
			this.pants
		];

		for (const armor of currentArmorSet) {
			if (armor.name == inputArmor.name) {
				return true;
			}
		}

		return false;
	}

	setArmor(category, armor) {
		console.log(this.isArmorAlreadyExist(armor));
		if (!this.isArmorAlreadyExist(armor)) {
			switch (category) {
				case 'accessory1':
					this.accessory1 = armor;
				case 'accessory2':
					this.accessory2 = armor;
				case 'accessory3':
					this.accessory3 = armor;
				case 'chestplate':
					this.chestplate = armor;
				case 'pants':
					this.pants = armor;
			}
		} else {
			console.log('Cant set armor, already exists');
		}
	}

	getBuildStats() {
		let finalBuildStats = {
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

		const currentGearStats = [
			this.accessory1.getStats(),
			this.accessory2.getStats(),
			this.accessory3.getStats(),
			this.chestplate.getStats(),
			this.pants.getStats()
		];

		const statNames = [
			'power',
			'defense',
			'agility',
			'	attackSpeed',
			'attackSize',
			'intensity',
			'insanity',
			'warding',
			'drawback'
		];

		for (const gearStats of currentGearStats) {
			for (const stat of statNames) {
				finalBuildStats[stat] += gearStats[stat];
			}
		}

		return finalBuildStats;
	}
}
class Player {
	constructor(level = 1, vitality, magic, strength, weapons) {
		this.level = level;
		this.vitality = vitality;
		this.magic = magic;
		this.strength = strength;
		this.weapons = weapons;
	}

	getStatBuild() {
		const totalStats = this.vitality + this.magic + this.strength + this.weapons;
		const percentages = {
			vitality: this.vitality / totalStats,
			magic: this.magic / totalStats,
			strength: this.strength / totalStats,
			weapons: this.weapons / totalStats
		};

		const buildTypes = [
			{ type: 'Warden', conditions: [({ vitality }) => vitality > 0.6] },
			{ type: 'Berserker', conditions: [({ strength }) => strength > 0.6] },
			{ type: 'Warrior', conditions: [({ weapons }) => weapons > 0.6] },
			{ type: 'Mage', conditions: [({ magic }) => magic > 0.6] },
			{
				type: 'Juggernaut',
				conditions: [({ vitality, strength }) => vitality >= 0.4 && strength >= 0.4]
			},
			{
				type: 'Knight',
				conditions: [({ vitality, weapons }) => vitality >= 0.4 && weapons >= 0.4]
			},
			{ type: 'Paladin', conditions: [({ vitality, magic }) => vitality >= 0.4 && magic >= 0.4] },
			{
				type: 'Warlord',
				conditions: [({ strength, weapons }) => strength >= 0.4 && weapons >= 0.4]
			},
			{ type: 'Warlock', conditions: [({ strength, magic }) => strength >= 0.4 && magic >= 0.4] },
			{ type: 'Conjurer', conditions: [({ weapons, magic }) => weapons >= 0.4 && magic >= 0.4] },
			{
				type: 'Savant',
				conditions: [
					({ vitality, magic, strength }) => vitality >= 0.15 && magic >= 0.15 && strength >= 0.15
				]
			}
		];

		for (const build of buildTypes) {
			if (build.conditions.every((condition) => condition(percentages))) {
				return build.type;
			}
		}

		return 'Unknown build type';
	}

	getHealth() {
		const health = 93 + this.level * 7 + this.vitality * 4;

		return health;
	}
}

const blankArmor = new ArmorItem('None', 'None', 0, 'None', 'None', 'None', 'None', 'None', 0);

const testArmor = new ArmorItem(
	'TestName',
	'Hello this is a legend',
	10,
	20,
	'testMainType',
	'testSubType',
	'Rare',
	'testImageId',
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10
);

const sunkenIronHelm = new ArmorItem(
	'Sunken Iron Helmet',
	'Test Legend',
	90,
	120,
	'Accessory',
	'Helmet',
	'Rare',
	'None',
	2,
	0,
	175,
	0,
	0,
	19,
	0,
	0,
	0,
	0
);

const sunkenIronChestplate = new ArmorItem(
	'Sunken Iron Helmet',
	'Test Legend',
	90,
	120,
	'Chestplate',
	'None',
	'Rare',
	'None',
	2,
	0,
	234,
	0,
	0,
	26,
	0,
	0,
	0,
	0
);

const sunkenIronLeggings = new ArmorItem(
	'Sunken Iron Leggings',
	'Test Legend',
	90,
	120,
	'Pants',
	'None',
	'Rare',
	'None',
	2,
	0,
	175,
	0,
	0,
	19,
	0,
	0,
	0,
	0
);

const testPlayer = new Player(125, 151, 100, 0, 0);
console.log(testPlayer.getStatBuild(), testPlayer.getHealth());
let testArmorSlot = new ArmorSlot(sunkenIronChestplate, 10, noneEnchant, noneModifier);

console.log(sunkenIronChestplate.getStats());
console.log(testArmorSlot.getSlotStats());

// console.log(testArmor.getStats());
