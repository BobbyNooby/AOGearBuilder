// Smoke test: load real config + scraped items, run the engine end-to-end.
import { readFileSync } from 'fs';
import { parseJsonc } from './load-jsonc';
import { computeItemStats, getSlotStats } from './rule-engine';
import { evalFormula } from './formulas';
import type { GameConfig } from '../schema/game-config';

const config = parseJsonc(readFileSync('../config/game-config.jsonc', 'utf-8')) as GameConfig;
const items = JSON.parse(readFileSync('../data/items.json', 'utf-8'));
const steel = items.find((i: any) => i.name === 'Steel Armor');
const sunken = items.find((i: any) => i.name === 'Sunken Iron Armor');

console.log('== deriveStat check (Steel Armor @150) ==');
const s150 = computeItemStats(steel, 150, config);
console.log('  Defense:', s150.defense, '(expect ~243)');

console.log('== Sunken Iron Armor @100 (uncapped) ==');
const su100 = computeItemStats(sunken, 100, config);
console.log('  Defense:', su100.defense, 'Size:', su100.size);

console.log('== vitality formula eval ==');
const vit = evalFormula('clamp((vitality / (level * 2)) * strength, floor, ceiling)',
  { vitality: 50, level: 100, strength: 3, floor: 0.3, ceiling: 1 });
console.log('  vit mult (vit50/100):', vit, '(expect 0.75)');

console.log('== Atlantean slot (Steel Armor + Atlantean, lvl150) ==');
// minimal atlantean modifier def (mirrors modifiers.jsonc)
const atlantean = {
  id: 'atlantean', type: 'modifier', layer: 'modifier', applicableTo: ['armor', 'accessory'],
  effects: [
    { type: 'flatStat', stat: 'insanity', value: 1 },
    { type: 'priorityFill',
      per10: { power: 0.7648, defense: 6.8236, size: 2.2353, dexterity: 2.2353, range: 2.2353, haste: 2.2353 },
      order: ['power', 'defense', 'size', 'dexterity', 'range', 'haste'], fallback: 'power' }
  ]
} as any;
const slot = getSlotStats(steel, 150, null, atlantean, [], { vitality: 0, playerLevel: 150 }, config, false);
console.log('  stats:', slot);
  console.log('  => insanity', slot.insanity, '(expect 1), power from atlantean', slot.power, '(expect ~11, item has def so atlantean fills power)');
