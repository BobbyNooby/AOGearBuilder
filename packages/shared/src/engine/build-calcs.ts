import type { Item } from '../schema/item';
import type { ModifierDef, Rule } from '../schema/modifier';
import type { GameConfig } from '../schema/game-config';
import { evalFormulaDef } from './formulas';

export const STAT_NAMES = [
	'power', 'defense', 'size', 'haste', 'dexterity', 'range', 'regeneration', 'pierce', 'resistance', 'insanity', 'warding', 'drawback'
];
export const TERTIARY = ['insanity', 'warding', 'drawback'];

const STAT_RELATIONS: Record<string, string> = {
	powerIncrement: 'power',
	defenseIncrement: 'defense',
	sizeIncrement: 'size',
	hasteIncrement: 'haste',
	dexterityIncrement: 'dexterity',
	rangeIncrement: 'range',
	regenerationIncrement: 'regeneration',
	pierceIncrement: 'pierce',
	resistanceIncrement: 'resistance',
	insanity: 'insanity',
	warding: 'warding',
	drawback: 'drawback'
};

function round(v: number, mode: 'round' | 'floor'): number {
	if (!isFinite(v)) return 0;
	return mode === 'round' ? Math.round(v) : Math.floor(v);
}

function evalFormulaSafe(
	config: GameConfig,
	name: string,
	extraScope: Record<string, number>,
	fallback: () => number
): number {
	const def = config.formulas?.[name];
	if (!def?.expression) return fallback();
	try {
		return evalFormulaDef(def, extraScope);
	} catch (err) {
		console.warn(`Formula ${name} failed:`, err);
		return fallback();
	}
}

export function displayMaxLevel(item: Record<string, any>, gameMaxLevel: number): number {
	const raw = item.maxLevel ?? gameMaxLevel;
	const capped = Math.min(raw, gameMaxLevel);
	return Math.floor(capped / 10) * 10;
}

export function computeItemStats(
	item: Record<string, any>,
	level: number,
	config: GameConfig
): Record<string, number> {
	const out: Record<string, number> = {};
	if (!level || level <= 0 || !item?.scaling) return out;

	const dragonMulti = item.dragonColor ? config.scalings.dragon?.type?.[item.dragonColor] ?? 1 : 1;

	for (const [stat, raw] of Object.entries(item.scaling)) {
		const mult = Number(raw);
		if (!isFinite(mult) || mult === 0) continue;
		const def = config.statRegistry[stat];
		const cat = def?.category || 'secondary';
		if (cat === 'tertiary') {
			out[stat] = mult;
			continue;
		}
		const constant =
			cat === 'primary'
				? stat === 'power'
					? config.scalings.power
					: config.scalings.defense
				: config.scalings.substat;
		const val = mult * level * constant * dragonMulti;
		out[stat] = isFinite(val) ? round(val, config.scalings.rounding) : 0;
	}

	// Imbued bonus
	if (item.imbue) {
		const imbuedTable = config.scalings.imbuedStatType?.[item.imbue];
		if (imbuedTable) {
			for (const [stat, addMult] of Object.entries(imbuedTable)) {
				const toStat = config.scalings.toStat?.[stat] ?? config.scalings.substat;
				const imbuedMulti = config.scalings.imbuedMulti?.[stat] ?? config.scalings.imbuedMulti?.substat ?? 1;
				const accessoryPenalty = item.type === 'accessory' && !item.tags?.includes('amulet') ? 0.75 : 1;
				const add = Number(addMult) * level * toStat * 1.5 * imbuedMulti * accessoryPenalty;
				out[stat] = (out[stat] ?? 0) + round(add, config.scalings.rounding);
			}
		}
	}

	const ov = item.statOverrides?.[level];
	if (ov) for (const [s, v] of Object.entries(ov)) {
		const n = Number(v);
		if (isFinite(n)) out[s] = n;
	}
	return out;
}

export function computeEP(stats: Record<string, number>, level: number, config: GameConfig): number {
	let ep = 0;
	for (const s of STAT_NAMES) {
		const def = config.statRegistry[s];
		if (!def) continue;
		let val = stats[s] || 0;
		if (TERTIARY.includes(s)) val *= Math.floor(level / 10);
		ep += val * (def.epPerPoint || 0);
	}
	return Math.round(ep * 100) / 100;
}

export function formatStatRange(
	item: Record<string, any>,
	config: GameConfig
): { stats: Record<string, string>; ep: string } {
	const minLvl = Math.floor((item.minLevel || 1) / 10) * 10;
	const maxLvl = displayMaxLevel(item, config.maxLevel);

	const minStats = computeItemStats(item, minLvl, config);
	const maxStats = computeItemStats(item, maxLvl, config);

	const stats: Record<string, string> = {};
	for (const s of STAT_NAMES) {
		const a = minStats[s] ?? 0;
		const b = maxStats[s] ?? 0;
		if (a <= 0 && b <= 0) continue;
		const da = round(a, config.scalings.rounding);
		const db = round(b, config.scalings.rounding);
		stats[s] = da === db ? `${da}` : `${da} ~ ${db}`;
	}

	const minEp = computeEP(minStats, maxLvl, config);
	const maxEp = computeEP(maxStats, maxLvl, config);
	const ep = Math.abs(minEp - maxEp) < 0.01 ? `${minEp}` : `${minEp} ~ ${maxEp}`;

	return { stats, ep };
}

export interface SlotData {
	key?: string;
	equipType?: string;
	armor: Record<string, any> | null;
	level: number;
	enchant: Record<string, any> | null;
	modifier: Record<string, any> | null;
	gems: Record<string, any>[];
	attunement?: string | null;
	amuletVariant?: { type: string; tier: string } | null;
}

export interface PlayerState {
	level: number;
	spirit: number;
	magic: number;
	strength: number;
	weapons: number;
	awakened: boolean;
	awakenedBuild: Record<string, any> | null;
	selectedMagic?: string[];
	selectedFS?: string[];
}

export function getItemMultiplier(item: Record<string, any>, config: GameConfig): number {
	const mult = config.arcaniumAttunements?.itemMultiplier || {};
	if (item.id?.toLowerCase().includes('arcsphere') || item.name?.toLowerCase().includes('arcsphere')) return mult.arcsphere ?? mult.default ?? 0.75;
	if (item.equipType && mult[item.equipType]) return mult[item.equipType];
	return mult.default ?? 0.75;
}

export function getArcaniumStats(
	item: Record<string, any>,
	magicId: string | null | undefined,
	level: number,
	config: GameConfig
): Record<string, number> {
	const out: Record<string, number> = {};
	if (!magicId || !config.arcaniumAttunements) return out;
	const alloc = config.arcaniumAttunements.magics[magicId];
	if (!alloc) return out;

	const baseLevel = config.arcaniumAttunements.baseLevel || 100;
	const itemMult = getItemMultiplier(item, config);
	const ep = 9.3 * (1.1 + 0.01 * (level - baseLevel)) * itemMult;
	if (!isFinite(ep) || ep <= 0) return out;

	const epVal = config.arcaniumAttunements.epValue;
	for (const [stat, pct] of Object.entries(alloc)) {
		const p = Number(pct);
		if (!isFinite(p) || p === 0) continue;
		const def = config.statRegistry[stat];
		const cat = def?.category || 'secondary';
		let val = 0;
		if (stat === 'power') val = (ep * p) / 100 * epVal.power;
		else if (stat === 'defense') val = (ep * p) / 100 * epVal.defense;
		else val = (ep * p) / 100 * epVal.substat;
		if (!isFinite(val)) continue;
		out[stat] = (out[stat] || 0) + round(val, config.scalings.rounding);
	}
	return out;
}

export function getAmuletVariantStats(
	slot: SlotData,
	level: number,
	config: GameConfig
): Record<string, number> {
	const out: Record<string, number> = {};
	if (!slot.amuletVariant || !config.amuletVariants) return out;
	const tierDef = config.amuletVariants.tiers[slot.amuletVariant.tier];
	if (!tierDef) return out;
	const type = slot.amuletVariant.type;
	const def = config.statRegistry[type];
	const cat = def?.category || 'secondary';
	let mult = 0;
	if (type === 'power') mult = tierDef.scaling.power ?? 0;
	else if (type === 'defense') mult = tierDef.scaling.defense ?? 0;
	else mult = tierDef.scaling.secondary ?? 0;
	if (mult === 0) return out;
	const constant =
		cat === 'primary'
			? type === 'power'
				? config.scalings.power
				: config.scalings.defense
			: config.scalings.substat;
	const val = mult * level * constant;
	out[type] = isFinite(val) ? round(val, config.scalings.rounding) : 0;
	return out;
}

export function effectiveMagicSlots(player: PlayerState, build: Record<string, any> | null): number {
	if (!player.awakened || !build) return 1;
	return build.abilitySlots?.magicSlots ?? 0;
}

export function effectiveFsSlots(player: PlayerState, build: Record<string, any> | null): number {
	if (!player.awakened || !build) return 1;
	return build.abilitySlots?.fsSlots ?? 0;
}

export function applyModifier(
	mod: Record<string, any>,
	stats: Record<string, number>,
	level: number,
	config: GameConfig,
	ctx?: { baseStatCount?: number; armor?: Record<string, any> }
): void {
	const step = Math.floor(level / 10);
	for (const r of mod.effects || []) {
		const rule = r as Rule;
		switch (rule.type) {
			case 'flatStat': {
				const t = STAT_RELATIONS[rule.stat] || rule.stat;
				stats[t] = (stats[t] || 0) + (rule.value || 0);
				break;
			}
			case 'steppedStat': {
				const t = STAT_RELATIONS[rule.stat] || rule.stat;
				let v = (rule.per10 || 0) * step;
				if (rule.cap && level > rule.cap.level) v = (rule.per10 || 0) * Math.floor(rule.cap.level / 10);
				stats[t] = (stats[t] || 0) + Math.round(v);
				break;
			}
			case 'priorityFill': {
				let found = false;
				for (const s of rule.order || []) {
					if (!stats[s] || stats[s] === 0) {
						stats[s] = (stats[s] || 0) + Math.round((rule.per10?.[s] || 0) * step);
						found = true;
						break;
					}
				}
				if (!found) stats['power'] = (stats['power'] || 0) + Math.round((rule.per10?.['power'] || 0) * step);
				break;
			}
			case 'imbuedBonus': {
				const half = rule.ratio || 0.5;
				const baseStatCount = ctx?.baseStatCount ?? Object.keys(stats).filter((s) => !TERTIARY.includes(s) && stats[s] > 0).length;
				for (const s of Object.keys(stats)) {
					if (STAT_RELATIONS[`${s}Increment`]) {
						stats[s] += round(2.2353 * half * baseStatCount * step, config.scalings.rounding);
					}
				}
				break;
			}
			case 'dragonBonus': {
				// Handled at item level via dragonColor; rule is reserved for future overrides.
				break;
			}
			case 'percentageBuff': {
				for (const s of rule.stats) {
					if (s === 'all') {
						for (const k of Object.keys(stats)) stats[k] = (stats[k] || 0) * (1 + rule.value);
					} else if (stats[s] !== undefined) {
						stats[s] = (stats[s] || 0) * (1 + rule.value);
					}
				}
				break;
			}
		}
	}
}

export function getSocketCount(armor: Record<string, any>, modifier: Record<string, any> | null): number {
	let count = armor?.jewelSlots ?? armor?.gemNo ?? 0;
	if (modifier) {
		for (const r of modifier.effects || []) {
			if (r.type === 'addSocket') count += r.amount || 0;
		}
	}
	return count;
}

export function getSlotStats(
	slot: SlotData,
	player: PlayerState,
	config: GameConfig
): Record<string, number> {
	const stats: Record<string, number> = {};
	if (!slot.armor || !slot.level) return stats;

	const base = computeItemStats(slot.armor, slot.level, config);
	for (const [k, v] of Object.entries(base)) stats[k] = v;

	if (slot.armor.statType === 'Arcanium' && slot.attunement) {
		const arcanium = getArcaniumStats(slot.armor, slot.attunement, slot.level, config);
		for (const [k, v] of Object.entries(arcanium)) stats[k] = (stats[k] || 0) + v;
	}

	if ((slot.armor.id === 'amulet' || slot.armor.name === 'Amulet') && slot.amuletVariant) {
		const amulet = getAmuletVariantStats(slot, slot.level, config);
		for (const [k, v] of Object.entries(amulet)) stats[k] = (stats[k] || 0) + v;
	}

	for (const gem of slot.gems || []) {
		const gs = computeItemStats(gem, slot.level, config);
		for (const [k, v] of Object.entries(gs)) stats[k] = (stats[k] || 0) + v;
		const tert = gem.flags?.tertiary;
		if (tert) for (const [k, v] of Object.entries(tert)) stats[k] = (stats[k] || 0) + Number(v);
	}

	const baseStatCount = Object.keys(slot.armor.scaling || {}).length;
	if (slot.enchant?.effects) applyModifier(slot.enchant, stats, slot.level, config, { baseStatCount, armor: slot.armor });
	if (slot.modifier?.effects) applyModifier(slot.modifier, stats, slot.level, config, { baseStatCount, armor: slot.armor });

	const isVitality =
		slot.armor.flags?.vitality ||
		slot.armor.statType === 'Vitality' ||
		slot.armor.tags?.includes('vitality-scaling') ||
		(slot.modifier?.effects || []).some((r: any) => r.type === 'vitalityScaling');

	if (isVitality) {
		const vit = evalFormulaSafe(
			config,
			'vitalityScaling',
			{ spirit: player.spirit || 0, level: player.level || 1 },
			() => Math.min(Math.max((player.spirit / (player.level * 2)) * 3, 0.3), 1)
		);
		for (const k of Object.keys(stats)) stats[k] = Math.floor(stats[k] * vit);
	}

	return stats;
}

export function aggregateBuildStats(
	slots: SlotData[],
	player: PlayerState,
	config: GameConfig
): Record<string, number> {
	const out: Record<string, number> = {};
	for (const s of STAT_NAMES) out[s] = 0;
	for (const slot of slots) {
		const ss = getSlotStats(slot, player, config);
		for (const [k, v] of Object.entries(ss)) if (out[k] !== undefined) out[k] += v;
	}
	out._health = evalFormulaSafe(
		config,
		'healthFormula',
		{ level: player.level, defense: out.defense || 0, spirit: player.spirit || 0 },
		() => 93 + player.level * 7 + (out.defense || 0) + (player.spirit || 0) * 4
	);
	out._ep = computeEP(out, player.level, config);
	return out;
}

export function formatModifierStats(
	mod: Record<string, any>,
	level: number,
	config: GameConfig
): Record<string, number> {
	const stats: Record<string, number> = {};
	applyModifier(mod, stats, level, config);
	return stats;
}

export function validateSlotItem(
	item: Record<string, any>,
	slotIdx: number,
	slots: SlotData[],
	player: PlayerState,
	config: GameConfig
): { valid: boolean; reason?: string } {
	if (slotIdx === -1) return { valid: true };

	const slot = slots[slotIdx];
	if (['enchant', 'modifier', 'gem'].includes(item.type) && !slot.armor) {
		return { valid: false, reason: 'Equip armor first' };
	}

	const validation = config.playerConstraints?.validation || {};

	const equipTypeExclusive: string[][] = validation.equipTypeExclusive || [];
	if (item.equipType) {
		for (const group of equipTypeExclusive) {
			if (group.includes(item.equipType)) {
				for (let i = 0; i < slots.length; i++) {
					if (i === slotIdx) continue;
					const otherArmor = slots[i].armor;
					if (otherArmor && group.includes(otherArmor.equipType)) {
						return { valid: false, reason: `Only one ${group.join('/')} allowed` };
					}
				}
			}
		}
	}

	const namePatternExclusive: string[][] = validation.namePatternExclusive || [];
	if (item.name) {
		for (const group of namePatternExclusive) {
			for (const pattern of group) {
				if (item.name.toLowerCase().includes(pattern.toLowerCase())) {
					for (let i = 0; i < slots.length; i++) {
						if (i === slotIdx) continue;
						const otherArmor = slots[i].armor;
						if (otherArmor?.name?.toLowerCase().includes(pattern.toLowerCase())) {
							return { valid: false, reason: `Only one ${pattern} item allowed` };
						}
					}
				}
			}
		}
	}

	if (validation.duplicateItemRule === 'uniquePerSlot') {
		for (let i = 0; i < slots.length; i++) {
			if (i === slotIdx) continue;
			if (slots[i].armor?.id === item.id) {
				return { valid: false, reason: 'This item is already equipped' };
			}
		}
	}

	if (validation.statTypeMatch) {
		if (item.requiresMagic?.length) {
			const selectedMagic = player.selectedMagic || [];
			if (!item.requiresMagic.some((m: string) => selectedMagic.includes(m))) {
				return { valid: false, reason: 'Requires a matching magic' };
			}
		}
		if (item.statType === 'Magic' && player.magic <= 0) {
			return { valid: false, reason: 'Requires magic investment' };
		}
		if (item.statType === 'Strength' && player.strength <= 0) {
			return { valid: false, reason: 'Requires strength investment' };
		}
	}

	if (item.type === 'enchant') {
		if (slot.modifier?.exclusiveWith?.includes(item.id)) {
			return { valid: false, reason: 'Conflicts with equipped modifier' };
		}
	}
	if (item.type === 'modifier') {
		if (slot.enchant?.exclusiveWith?.includes(item.id)) {
			return { valid: false, reason: 'Conflicts with equipped enchant' };
		}
	}

	return { valid: true };
}

export function secondaryStatEffect(
	stat: string,
	value: number,
	_level: number,
	config: GameConfig
): string {
	if (value <= 0) return '0%';
	const s = value;
	const m = config.maxLevel;
	const effMap: Record<string, number> = {
		size: 0.575,
		range: 0.8,
		dexterity: 0.55,
		resistance: 0.525,
		regeneration: 0.55,
		pierce: 1.001,
		haste: 1
	};
	const eff = effMap[stat] ?? 1;
	const pct = evalFormulaSafe(
		config,
		'substatEfficiency',
		{ s, m, eff },
		() => {
			const base =
				1.35 * ((16 * Math.pow(Math.log(0.1 * s + 4), 3) * 0.09 + 0.15 * s) / (0.1 + 0.15 * Math.sqrt(m)) - 0.79);
			return base * eff * 100;
		}
	);
	return isFinite(pct) ? pct.toFixed(1) + '%' : '?';
}
