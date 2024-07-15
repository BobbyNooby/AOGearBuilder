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

export type GearStats = Partial<{
	power: number;
	defense: number;
	agility: number;
	attackSpeed: number;
	attackSize: number;
	intensity: number;

	regeneration: number;
	piercing: number;
	resistance: number;

	insanity: number;
	warding: number;
	drawback: number;
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

export type GearEnchantStats = Partial<{
	powerIncrement: number;
	defenseIncrement: number;
	agilityIncrement: number;
	attackSpeedIncrement: number;
	attackSizeIncrement: number;
	intensityIncrement: number;

	regenerationIncrement: number;
	piercingIncrement: number;
	resistanceIncrement: number;

	insanity: number;
	warding: number;
	drawback: number;
}>;

export type ShipEnchantStats = Record<Partial<'ram' | 'hull' | 'sail'>, ShipStats>;

type statsPerLevel = {
	level: number;
} & GearStats;

export type ArmorItem = ItemIdentifiers & {
	gemNo: number;
	mainType: ArmorMainTypes;
	minLevel: number;
	maxLevel: number;
	statsPerLevel: statsPerLevel[];
	validModifiers: string[];
};
export type GemItem = ItemIdentifiers & GearStats;
export type ShipPartItem = ItemIdentifiers & {
	mainType: ShipMainTypes;
} & ShipStats;

export type EnchantItem = ItemIdentifiers & {
	mainType: EnchantMainTypes;
	enchantTypes: Record<Partial<'gear' | 'ship'>, GearEnchantStats | ShipEnchantStats>;
};

export type ModifierItem = ItemIdentifiers & GearEnchantStats & { mainType: ModifierMainTypes };

export type anyItem = Partial<ArmorItem | GemItem | EnchantItem | ModifierItem | ShipPartItem>;
export type MainShip = ItemIdentifiers &
	ShipStats & {
		hullArmorSlot: number;
		quartermasterSlot: number;
		cannonSlot: number;
		siegeWeaponSlot: number;
		sailMaterialSlot: number;
		shipCrewSlot: number;
		ramSlot: number;
		deckhandSlot: number;
	};
