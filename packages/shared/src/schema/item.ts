// Unified item type — covers gear, weapon, ship, accessory, gem, enchant, modifier, magic.
// `scaling` drives normal calculation; `statOverrides` is your emergency-edit layer.

export type ItemType =
  | 'armor' | 'weapon' | 'shipPart' | 'accessory'
  | 'gem' | 'enchant' | 'modifier' | 'magic';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  equipType?: string;            // chestpiece | hull | sail | ram | sword ...
  rarity: string;
  minLevel: number;
  maxLevel?: number | null;      // null = uncapped (Sunken)
  scaling: Record<string, number>;                       // formula base (per-stat multiplier)
  statOverrides?: Record<number, Record<string, number>>; // { [level]: { [stat]: value } }
  jewelSlots?: number;
  description?: string | null;
  statType?: string;                    // "Normal" | "Magic" | "Strength" | "Vitality"
  obtainedBy?: string[];                // ["Chests", "Fishing", "Armorer"]
  tags?: string[];                       // ["endgame", "boss-drop", "sunken-set"]
  isEndgame?: boolean;                  // currently relevant endgame gear
  flags?: Record<string, unknown>;

  // Dynamic mechanics
  imbue?: string;                      // e.g. "heat", "cold"
  dragonColor?: string;                 // e.g. "red", "blue"
  requiresMagic?: string[];            // Arcanium armor matching
}

// A magic entry (separate collection, simpler shape)
export interface Magic {
  id: string;
  name: string;
  type: 'magic';
  stats: { damage: number; size: number; speed: number };
  statusEffect?: string;
  temperature?: 'heat' | 'cold' | 'neutral';
  synergies?: string[];
  clashes?: { advantage: string[]; disadvantage: string[] };
}
