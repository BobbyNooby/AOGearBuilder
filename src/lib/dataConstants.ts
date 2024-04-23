import type { Rarities } from './gearBuilder/itemTypes';
import type { magic } from './gearBuilder/playerTypes';

export const staticImagesRootFolder: string =
	'https://raw.githubusercontent.com/BobbyNooby/AOGearBuilderImages/main';

export const rarityColors: { [key in Rarities]: string } = {
	None: '#FFFFFF',
	Common: '#7D7D7F',
	Uncommon: '#817346',
	Rare: '#6765EC',
	Exotic: '#FF0000',
	Seasonal: '#C001C2',
	Legendary: '#00FF00'
};

export const validStatKeys = [
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

export const listOfMagics: magic[] = [
	'Acid',
	'Ash',
	'Crystal',
	'Earth',
	'Explosion',
	'Fire',
	'Glass',
	'Ice',
	'Light',
	'Lightning',
	'Magma',
	'Metal',
	'Plasma',
	'Poison',
	'Sand',
	'Shadow',
	'Snow',
	'Water',
	'Wind',
	'Wood'
];

//Unused for future update
export const magicDetails = {
	Acid: {
		name: 'Acid',

		magicSize: 1.05,
		magicSpeed: 1.0,
		magicDamage: 0.875,
		magicDestruction: 0.25
	},
	Ash: {
		name: 'Ash',

		magicSize: 1.25,
		magicSpeed: 0.9,
		magicDamage: 0.85,
		magicDestruction: 0.3
	},
	Crystal: {
		name: 'Crystal',

		magicSize: 1.15,
		magicSpeed: 0.75,
		magicDamage: 0.975,
		magicDestruction: 0.725
	},
	Earth: {
		name: 'Earth',

		magicSize: 1.3,
		magicSpeed: 0.6,
		magicDamage: 1.0,
		magicDestruction: 0.75
	},
	Explosion: {
		name: 'Explosion',

		magicSize: 1.3,
		magicSpeed: 0.8,
		magicDamage: 0.925,
		magicDestruction: 1.2
	},
	Fire: {
		name: 'Fire',

		magicSize: 1.1,
		magicSpeed: 1.0,
		magicDamage: 0.85,
		magicDestruction: 0.8
	},
	Glass: {
		name: 'Glass',

		magicSize: 1.1,
		magicSpeed: 1.0,
		magicDamage: 0.9,
		magicDestruction: 0.3
	},
	Ice: {
		name: 'Ice',

		magicSize: 1.2,
		magicSpeed: 0.8,
		magicDamage: 0.975,
		magicDestruction: 0.6
	},
	Light: {
		name: 'Light',

		magicSize: 1.0,
		magicSpeed: 1.8,
		magicDamage: 0.85,
		magicDestruction: 0.5
	},
	Lightning: {
		name: 'Lightning',

		magicSize: 1.0,
		magicSpeed: 1.5,
		magicDamage: 0.9,
		magicDestruction: 1.0
	},
	Magma: {
		name: 'Magma',

		magicSize: 1.2,
		magicSpeed: 0.7,
		magicDamage: 0.9,
		magicDestruction: 0.9
	},
	Metal: {
		name: 'Metal',

		magicSize: 1.2,
		magicSpeed: 0.55,
		magicDamage: 1.05,
		magicDestruction: 1.1
	},
	Plasma: {
		name: 'Plasma',

		magicSize: 1.0,
		magicSpeed: 1.3,
		magicDamage: 0.825,
		magicDestruction: 0.9
	},
	Poison: {
		name: 'Poison',

		magicSize: 1.15,
		magicSpeed: 1.0,
		magicDamage: 0.75,
		magicDestruction: 0.2
	},
	Sand: {
		name: 'Sand',

		magicSize: 1.1,
		magicSpeed: 0.95,
		magicDamage: 0.975,
		magicDestruction: 0.5
	},
	Shadow: {
		name: 'Shadow',

		magicSize: 1.1,
		magicSpeed: 1.2,
		magicDamage: 0.95,
		magicDestruction: 0.75
	},
	Snow: {
		name: 'Snow',

		magicSize: 1.15,
		magicSpeed: 1.05,
		magicDamage: 0.925,
		magicDestruction: 0.4
	},
	Water: {
		name: 'Water',

		magicSize: 1.2,
		magicSpeed: 1.0,
		magicDamage: 0.925,
		magicDestruction: 0.2
	},
	Wind: {
		name: 'Wind',

		magicSize: 1.2,
		magicSpeed: 1.4,
		magicDamage: 0.825,
		magicDestruction: 0.5
	},
	Wood: {
		name: 'Wood',

		magicSize: 1.2,
		magicSpeed: 0.8,
		magicDamage: 0.95,
		magicDestruction: 0.7
	}
};
