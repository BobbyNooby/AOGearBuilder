import { expoIn } from 'svelte/easing';

export type Rarities =
	| 'None'
	| 'Common'
	| 'Uncommon'
	| 'Rare'
	| 'Exotic'
	| 'Seasonal'
	| 'Legendary';

export type ArmorMainTypes = 'Accessory' | 'Chestplate' | 'Pants';

export type GemMainTypes = 'Gem';

export type ModifierMainTypes = 'Modifier';

export type EnchantMainTypes = 'Enchant';

export type StatTypes = 'None' | 'Magic' | 'Strength' | 'Vitality';

export type ShipMainTypes =
	| 'Cannon'
	| 'Hull Armor'
	| 'Deckhand'
	| 'Ram'
	| 'Sail Material'
	| 'Siege Weapon'
	| 'Boat'
	| 'Ship Crew'
	| 'Quartermaster'
	| 'Ship';

export type ItemIdentifiers = {
	[index: string]: any;
	id: string;
	name: string;
	legend: string;
	mainType: string;
	rarity: Rarities;
	imageId: string;
} & Partial<{ deleted: boolean; subType: string; statType: StatTypes }>;

export type GearBaseStats = Partial<{
	power: number;
	defense: number;
	agility: number;
	attackSpeed: number;
	attackSize: number;
	intensity: number;

	regeneration: number;
	piercing: number;
	resistance: number;
}>;

export type GearStaticStats = Partial<{
	insanity: number;
	warding: number;
	drawback: number;
}>;

export type GearIncrementalStats = Partial<{
	powerIncrement: number;
	defenseIncrement: number;
	agilityIncrement: number;
	attackSpeedIncrement: number;
	attackSizeIncrement: number;
	intensityIncrement: number;

	regenerationIncrement: number;
	piercingIncrement: number;
	resistanceIncrement: number;
}>;

export type ShipStats = Partial<{
	durability: number;
	magicStorage: number;
	ramDefense: number;
	ramStrength: number;
	resilience: number;
	speed: number;
	stability: number;
	turning: number;
}>;

export type ArmorStats = GearBaseStats & GearStaticStats;
export type GemStats = ArmorStats;
export type ModifierStats = GearIncrementalStats & GearStaticStats;
export type EnchantStats = ModifierStats & ShipStats;
export type ItemStats = GearBaseStats & GearIncrementalStats & GearStaticStats & ShipStats;

export type ArmorLevelStats = {
	level: number;
} & ArmorStats;

export type ArmorItemData = ItemIdentifiers & {
	gemNo: number;
	mainType: ArmorMainTypes;
	minLevel: number;
	maxLevel: number;
	statsPerLevel: ArmorLevelStats[];
	validModifiers: string[];
};
export type GemItemData = ItemIdentifiers & { mainType: GemMainTypes } & GemStats;
export type ShipItemData = ItemIdentifiers & ShipStats & { mainType: ShipMainTypes };
export type EnchantItemData = ItemIdentifiers & EnchantStats & { mainType: EnchantMainTypes };
export type ModifierItemData = ItemIdentifiers & ModifierStats & { mainType: ModifierMainTypes };

export type anyItem = Partial<ArmorItemData | GemItemData | EnchantItemData | ModifierItemData>;
