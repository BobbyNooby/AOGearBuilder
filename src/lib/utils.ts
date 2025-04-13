import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { GearEnchantStats, GearStats, Rarities, ShipStats } from './types/itemTypes';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function consoleBob(...args: any[]) {
	console.log(`[${new Date().toLocaleString()}] `, ...args);
}

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

export const statsStyles: {
	[key in
		| keyof GearStats
		| keyof GearEnchantStats
		| keyof Omit<
				ShipStats,
				| 'hullArmorSlot'
				| 'quartermasterSlot'
				| 'cannonSlot'
				| 'siegeWeaponSlot'
				| 'sailMaterialSlot'
				| 'shipCrewSlot'
				| 'ramSlot'
				| 'deckhandSlot'
		  >]: { name: string; fillColor: string; strokeColor: string; suffix: string };
} = {
	power: { name: 'POWER', fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
	defense: { name: 'DEFENSE', fillColor: '#737373', strokeColor: '#000000', suffix: '' },
	agility: { name: 'AGILITY', fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
	attackSpeed: { name: 'ATTACK SPEED', fillColor: '#FFFFFF', strokeColor: '#0077ff', suffix: '' },
	attackSize: { name: 'ATTACK SIZE', fillColor: '#00FF00', strokeColor: '#471559', suffix: '' },
	intensity: { name: 'INTENSITY', fillColor: '#FFF200', strokeColor: '#712402', suffix: '' },
	regeneration: {
		name: 'REGENERATION',
		fillColor: '#C0FFC0',
		strokeColor: '#35D234',
		suffix: ''
	},
	piercing: { name: 'PIERCING', fillColor: '#FFD6AB', strokeColor: '#E22A1D', suffix: '' },
	resistance: { name: 'RESISTANCE', fillColor: '#89ABC6', strokeColor: '#000000', suffix: '' },

	powerIncrement: { name: 'POWER', fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
	defenseIncrement: { name: 'DEFENSE', fillColor: '#737373', strokeColor: '#000000', suffix: '' },
	agilityIncrement: { name: 'AGILITY', fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
	attackSpeedIncrement: {
		name: 'ATTACK SPEED',
		fillColor: '#FFFFFF',
		strokeColor: '#0077ff',
		suffix: ''
	},
	attackSizeIncrement: {
		name: 'ATTACK SIZE',
		fillColor: '#00FF00',
		strokeColor: '#471559',
		suffix: ''
	},
	intensityIncrement: {
		name: 'INTENSITY',
		fillColor: '#FFF200',
		strokeColor: '#712402',
		suffix: ''
	},
	regenerationIncrement: {
		name: 'REGENERATION',
		fillColor: '#C0FFC0',
		strokeColor: '#35D234',
		suffix: ''
	},
	piercingIncrement: {
		name: 'PIERCING',
		fillColor: '#FFD6AB',
		strokeColor: '#E22A1D',
		suffix: ''
	},
	resistanceIncrement: {
		name: 'RESISTANCE',
		fillColor: '#89ABC6',
		strokeColor: '#000000',
		suffix: ''
	},

	insanity: { name: 'INSANITY', fillColor: '#8B27DB', strokeColor: '#DB0C45', suffix: '' },
	drawback: { name: 'DRAWBACK', fillColor: '#DC4040', strokeColor: '#000000', suffix: '' },
	warding: { name: 'WARDING', fillColor: '#FFFFFF', strokeColor: '#CBCB55', suffix: '' },

	stability: { name: 'STABILITY', fillColor: '#6297C1', strokeColor: '#124975', suffix: '%' },
	durability: { name: 'DURABILITY', fillColor: '#737373', strokeColor: '#000000', suffix: '' },
	magicStorage: {
		name: 'MAGIC STORAGE',
		fillColor: '#BA70EB',
		strokeColor: '#000000',
		suffix: ''
	},
	turning: { name: 'TURNING', fillColor: '#FFFFFF', strokeColor: '#584A8C', suffix: '' },
	speed: { name: 'SPEED', fillColor: '#FFFFFF', strokeColor: '#00ffff', suffix: '' },
	resilience: { name: 'RESILIENCE', fillColor: '#FFFFFF', strokeColor: '#AF2230', suffix: '%' },
	ramStrength: { name: 'RAM STRENGTH', fillColor: '#FF8400', strokeColor: '#000000', suffix: '' },
	ramDefense: { name: 'RAM DEFENSE', fillColor: '#FFFFFF', strokeColor: '#6B6BD7', suffix: '' },

	damageMultiplier: {
		name: 'DAMAGE MULTIPLIER',
		fillColor: '#FFFFFF',
		strokeColor: '#000000',
		suffix: ''
	},

	rangeMultiplier: {
		name: 'RANGE MULTIPLIER',
		fillColor: '#FFFFFF',
		strokeColor: '#000000',
		suffix: ''
	},

	spreadMultiplier: {
		name: 'SPREAD MULTIPLIER',
		fillColor: '#FFFFFF',
		strokeColor: '#000000',
		suffix: ''
	},

	fuseLength: { name: 'FUSE LENGTH', fillColor: '#FFFFFF', strokeColor: '#000000', suffix: '' },
	reloadTime: { name: 'RELOAD TIME', fillColor: '#FFFFFF', strokeColor: '#000000', suffix: '' },
	ramSpeed: { name: 'RAM SPEED', fillColor: '#FFFFFF', strokeColor: '#000000', suffix: '' }
};
