import type { GearEnchantStats, GearStats, ShipStats } from './itemTypes';

export type AOTConfig = {
	name: 'config';
	maxLevel: number;
	modifiers: Record<string, string[]>;
	epPerStat: Required<GearStats>;
	scalings: {
		internal: Required<GearStats>; // formula to get stat = itemScalingValue * internalScalingMultipler * levelMultiplier
	};
};

export const tempConfig: AOTConfig = {
	name: 'config',
	maxLevel: 140,
	modifiers: {},
	epPerStat: {
		power: 3,
		defense: 3 / 11,

		agility: 1,
		attackSpeed: 1,
		attackSize: 1,
		intensity: 1,
		regeneration: 1,
		piercing: 1,
		resistance: 1,

		drawback: -3, // Varied EP Value : -3 * levelMultiplier
		warding: 1.5, // Varied EP Value : 1.5 * levelMultiplier
		insanity: -3 // Varied EP Value : -3 * levelMultiplier
	},
	scalings: {
		internal: {
			power: 3.5,
			defense: 33,

			agility: 5,
			attackSpeed: 5,
			attackSize: 5,
			intensity: 5,
			regeneration: 5,
			piercing: 5,
			resistance: 5,

			insanity: -1,
			warding: -1,
			drawback: -1
		}
	}
};

export type validStatKeysType = keyof GearStats | keyof ShipStats | keyof GearEnchantStats;

export const validStatKeys: validStatKeysType[] = [
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
	'turning',

	'damageMultiplier',
	'rangeMultiplier',
	'spreadMultiplier',
	'fuseLength',
	'reloadTime',

	'ramSpeed',

	'hullArmorSlot',
	'quartermasterSlot',
	'cannonSlot',
	'siegeWeaponSlot',
	'sailMaterialSlot',
	'shipCrewSlot',
	'ramSlot',
	'deckhandSlot'
];
