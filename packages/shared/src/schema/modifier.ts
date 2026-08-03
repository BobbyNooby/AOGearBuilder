// Modifier definition — everything layered on a base item.
// Composed from rule-types interpreted by engine/build-calcs.ts.

export type ModifierType = 'enchant' | 'modifier' | 'faction' | 'imbue' | 'cosmetic';

export type Rule =
  | { type: 'flatStat'; stat: string; value: number; per10?: number }
  | { type: 'steppedStat'; stat: string; per10: number; cap?: { level: number } }
  | { type: 'scaledStat'; stat: string; multiplier: number }
  | {
      type: 'priorityFill';
      per10: Record<string, number>;
      order: string[];
      fallback: string;
      recalcOnChange?: boolean;
    }
  | { type: 'scaledByBaseStatCount'; ratio: number }
  | { type: 'addSocket'; amount: number }
  | { type: 'statOverride'; level: number; stat: string; value: number }
  | { type: 'multiplyStats'; [k: string]: unknown; additive?: boolean }
  | { type: 'percentageBuff'; stats: string[]; value: number; perTier?: boolean }
  | { type: 'validateExclusion'; target: string; action: 'remove' | 'block' }
  | { type: 'setVisual'; key: string }
  | { type: 'imbuedBonus'; ratio: number }
  | { type: 'dragonBonus'; color: string }
  | { type: 'vitalityScaling'; tags?: string[] };

export interface ModifierDef {
  id: string;
  name?: string;
  type: ModifierType;
  layer?: string;               // ≤1 per layer; faction ≠ modifier → stack
  tier?: 'rare' | 'exotic';
  applicableTo: string[];       // target item types
  exclusiveWith?: string[];
  stackableWith?: string[];     // e.g. ["faction-*"]
  allowedOn?: string[];         // e.g. ["lost-set"]
  param?: { type: string };     // for imbues/cosmetics: magic | fightingStyle | relic | color
  effects: Rule[];
}
