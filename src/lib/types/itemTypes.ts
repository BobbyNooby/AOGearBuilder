import type { FightingStyle, Magic } from './playerTypes';

export type Rarities =
	| 'None'
	| 'Common'
	| 'Uncommon'
	| 'Rare'
	| 'Exotic'
	| 'Seasonal'
	| 'Legendary';

export type MainTypes =
	| 'Accessory'
	| 'Chestplate'
	| 'Pants'
	| 'Gem'
	| 'Modifier'
	| 'Enchant'
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

export type SubTypes =
	| 'None'
	| 'Head'
	| 'Helmet'
	| 'Hat'
	| 'Face'
	| 'Neck'
	| 'Amulet'
	| 'Shoulder'
	| 'Collar'
	| 'Arms'
	| 'Arm'
	| 'Back'
	| 'Front'
	| 'Waist';

export type StatTypes = 'None' | 'Magic' | 'Strength' | 'Vitality';

export type ImbueTypes = Magic | FightingStyle;

export type ItemIdentifiers = {
	[index: string]: any;
	id: string;
	name: string;
	legend: string;
	mainType: MainTypes;
	rarity: Rarities;
	imageId: string;
} & Partial<{
	deleted: boolean;
	subType: SubTypes;
	statType: StatTypes;
	imbueType: ImbueTypes;
	source: string[];
	isEndGame: boolean;
}>;

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

	damageMultiplier: number;
	rangeMultiplier: number;
	spreadMultiplier: number;
	fuseLength: number;
	reloadTime: number;

	ramSpeed: number;

	hullArmorSlot: number;
	quartermasterSlot: number;
	cannonSlot: number;
	siegeWeaponSlot: number;
	sailMaterialSlot: number;
	shipCrewSlot: number;
	ramSlot: number;
	deckhandSlot: number;
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

export type ArmorDetails = ItemIdentifiers & {
	mainType: 'Accessory' | 'Chestplate' | 'Pants';
	gemNo: number;
	minLevel: number;
	maxLevel: number;
	statsPerLevel: ({ level: number } & GearStats)[];
	scaling: GearStats;
};

export type GemDetails = ItemIdentifiers & GearStats;

export type ShipPartDetails = ItemIdentifiers & {
	mainType:
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
} & ShipStats;

export type EnchantDetails = ItemIdentifiers & {
	mainType: 'Enchant';
	enchantTypes: Partial<{
		gear: GearEnchantStats;
		ship: Record<'ram' | 'hull' | 'sail', ShipStats>;
	}>;
};

export type ModifierDetails = ItemIdentifiers &
	GearEnchantStats & {
		mainType: 'Modifier';
	};

export type AnyItemDetails = ItemIdentifiers &
	Partial<ArmorDetails | GemDetails | ShipPartDetails | EnchantDetails | ModifierDetails>;

export type ShipDetails = ItemIdentifiers &
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

export type AllStats = GearStats & ShipStats & GearEnchantStats;
