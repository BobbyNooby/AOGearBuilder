import type { Rarities } from './utils/itemTypes';
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
