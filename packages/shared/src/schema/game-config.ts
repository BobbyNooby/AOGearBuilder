// Top-level game config (game-config.jsonc, stripped of // comments on load).

import type { Formulas } from './formulas';

export interface StatDef {
  category: 'primary' | 'secondary' | 'tertiary' | 'weapon' | 'ship';
  epPerPoint: number;
  scaling: 'level' | 'flat';
}

export interface BuildType {
  id: string;
  color: string;
  magicSlots: number;
  fsSlots: number;
  weaponSlots: number;
  conditions: Array<
    { stat: string; minPercent: number } | { type: 'any'; minPercent: number; countAtLeast: number }
  >;
}

export interface PlayerTransform {
  type?: string;
  appliesTo?: string;
  formulaRef?: string;
  stats?: string[];
  value?: number;
  perTier?: boolean;
  status?: string;
}

export interface RarityDef {
  order: number;
  color: string;
}

export interface StatTypeDef {
  color: string;
}

export interface EquipTypeDef {
  label: string;
}

export interface GameConfig {
  maxLevel: number;
  pointsPerLevel: number;
  statPointMaxFormula: string;
  scalings: {
    power: number;
    defense: number;
    substat: number;
    rounding: 'floor' | 'round';
    toStat?: Record<string, number>;
    imbuedStatType?: Record<string, Record<string, number>>;
    imbuedMulti?: Record<string, number>;
    dragon?: { colors: string[]; type: Record<string, number> };
  };
  statRegistry: Record<string, StatDef>;
  buildTypes: BuildType[];
  playerTransforms: Record<string, PlayerTransform>;
  playerConstraints?: {
    awakeningLevel?: number;
    buildStats?: string[];
    fiftyPercentRule?: boolean;
    validation?: {
      equipTypeExclusive?: string[][];
      namePatternExclusive?: string[][];
      duplicateItemRule?: string;
      statTypeMatch?: boolean;
      uniqueEquipType?: boolean;
    };
  };
  arcaniumAttunements?: {
    baseLevel: number;
    itemMultiplier: Record<string, number>;
    epValue: { power: number; defense: number; substat: number };
    magics: Record<string, Record<string, number>>;
  };
  amuletVariants?: {
    types: string[];
    tiers: Record<string, { levelRange: number[]; scaling: Record<string, number> }>;
  };
  rarities?: Record<string, RarityDef>;
  statTypes?: Record<string, StatTypeDef>;
  equipTypes?: Record<string, EquipTypeDef>;
  formulas?: Formulas;
}
