export type Rarities = "None" | 'Common' | 'Uncommon' | 'Rare' | 'Exotic' | 'Seasonal' | 'Legendary';

export type ArmorMainTypes = "Accessory" | "Chestplate" | "Pants";

export type GemMainTypes = "Gem";

export type ModifierMainTypes = "Modifier";

export type EnchantMainTypes = "Enchant";

export type ShipMainTypes = "Cannons" | "Hull Armor" | "Deckhands" | "Ram" | "Sail Material" | "Siege Weapon" | "Boat" | "Ship Crew" | "Quartermaster";


export type ItemIdentifiers = {
    id: number;
    name: string;
    legend: string;
    minLevel: number;
    maxLevel: number;
    mainType: string;
    subType: string;
    rarity: Rarities;
    imageId: string;
};

export type ArmorItemStats = {
    gemNo: number;
    powerIncrement: number;
    defenseIncrement: number;
    agilityIncrement: number;
    attackSpeedIncrement: number;
    attackSizeIncrement: number;
    intensityIncrement: number;
    insanity: number;
    warding: number;
    drawback: number;
}

export type GemStats = {
    power: number;
    defense: number;
    agility: number;
    attackSpeed: number;
    attackSize: number;
    intensity: number;
    insanity: number;
    warding: number;
    drawback: number;
}

export type ArmorStats = GemStats;

export type ShipStats = {
    durability: number,
    magicStorage: number,
    ramDefense: number,
    ramStrength: number,
    resilience: number,
    speed: number,
    stability: number,
    turning: number
}

export type EnchantStats = Omit<ArmorItemStats, 'gemNo'> & ShipStats;
export type ModifierStats = Omit<ArmorItemStats, 'gemNo'>;




export type ArmorItemData = ItemIdentifiers & ArmorItemStats & {mainType : ArmorMainTypes};
export type GemItemData = ItemIdentifiers & GemStats & {mainType : GemMainTypes};
export type ShipItemData = ItemIdentifiers & ShipStats & {mainType : ShipMainTypes};
export type EnchantItemData = ItemIdentifiers & EnchantStats & {mainType : EnchantMainTypes};
export type ModifierItemData = ItemIdentifiers & ModifierStats & {mainType : ModifierMainTypes};

