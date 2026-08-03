import { aggregateBuildStats, getSlotStats, effectiveMagicSlots, effectiveFsSlots, validateSlotItem, type PlayerState, type SlotData, type GameConfig } from '$lib/stats';
import { encodeBuild, tryLoadBuild, evalFormulaDef, type BuildObject } from '@aotools/shared';

export class BuildManager {
	config: GameConfig;
	allItems: any[];
	modifiers: any[];
	magics: any[];
	fightingStyles: any[];

	player: PlayerState & { selectedMagic?: string[]; selectedFS?: string[] } = $state({
		level: 150,
		spirit: 0,
		magic: 0,
		strength: 0,
		weapons: 0,
		awakened: false,
		awakenedBuild: null,
		selectedMagic: [],
		selectedFS: []
	});

	slots: SlotData[] = $state([
		{ key: 'accessory1', equipType: 'accessory', armor: null, level: 0, enchant: null, modifier: null, gems: [], attunement: null, amuletVariant: null },
		{ key: 'accessory2', equipType: 'accessory', armor: null, level: 0, enchant: null, modifier: null, gems: [], attunement: null, amuletVariant: null },
		{ key: 'accessory3', equipType: 'accessory', armor: null, level: 0, enchant: null, modifier: null, gems: [], attunement: null, amuletVariant: null },
		{ key: 'chestplate', equipType: 'chestpiece', armor: null, level: 0, enchant: null, modifier: null, gems: [], attunement: null, amuletVariant: null },
		{ key: 'pants',      equipType: 'legging',    armor: null, level: 0, enchant: null, modifier: null, gems: [], attunement: null, amuletVariant: null },
	]);

	buildStats: Record<string, number>;

	// --- Derived (initialized in constructor) ---
	maxPoints: number;
	usedPoints: number;
	availablePoints: number;
	detectedBuild: Record<string, any> | null;
	awakeningLevel: number;
	canAwaken: boolean;
	magicSlotCount: number;
	fsSlotCount: number;

	constructor(data: Record<string, any>) {
		this.config = data.config;
		this.allItems = (data.items || []).filter((i: any) => Object.keys(i.scaling ?? {}).length > 0);
		this.modifiers = data.modifiers || [];
		this.magics = data.magics || [];
		this.fightingStyles = data.fightingStyles || [];

		this.maxPoints = $derived(this.computeMaxPoints());
		this.usedPoints = $derived(this.player.spirit + this.player.magic + this.player.strength + this.player.weapons);
		this.availablePoints = $derived(this.maxPoints - this.usedPoints);
		this.detectedBuild = $derived(this.detectBuild());
		this.magicSlotCount = $derived(effectiveMagicSlots(this.player, this.detectedBuild));
		this.fsSlotCount = $derived(effectiveFsSlots(this.player, this.detectedBuild));
		this.buildStats = $derived(aggregateBuildStats(this.slots, this.player, this.config));
		this.awakeningLevel = $derived(this.config.playerConstraints?.awakeningLevel ?? 120);
		this.canAwaken = $derived(!!this.detectedBuild && this.player.level >= this.awakeningLevel && !this.player.awakened);
	}

	bump() {
		// no-op — Svelte 5 reactivity handles the rest
	}

	computeMaxPoints(): number {
		const formula = this.config.statPointMaxFormula;
		if (formula) {
			try {
				return Math.round(evalFormulaDef({ expression: formula, params: {} }, { level: this.player.level }));
			} catch {
				// fall through
			}
		}
		return this.player.level * 2;
	}

	// --- Stat allocation ---

	canEditStat(stat: string): boolean {
		if (!this.player.awakened || !this.player.awakenedBuild) return true;
		return (this.player.awakenedBuild.activeStats || []).includes(stat);
	}

	changeStatPoint(stat: 'spirit' | 'magic' | 'strength' | 'weapons', delta: number): void {
		if (!this.canEditStat(stat)) return;
		const cur = (this.player as any)[stat] || 0;
		if (delta > 0) {
			delta = Math.min(delta, this.availablePoints);
		}
		if (delta < 0) {
			delta = Math.max(delta, -cur);
		}
		(this.player as any)[stat] = cur + delta;
		this.player.level = Math.min(Math.max(this.player.level, 1), this.config.maxLevel || 175);
	}

	resetStatPoints(): void {
		this.player.spirit = 0;
		this.player.magic = 0;
		this.player.strength = 0;
		this.player.weapons = 0;
		this.player.awakened = false;
		this.player.awakenedBuild = null;
		this.player.selectedMagic = [];
		this.player.selectedFS = [];
	}

	// --- Build detection ---

	detectBuild(): Record<string, any> | null {
		const lvl = this.player.level * 2;
		if (lvl <= 0) return null;
		const pcts: Record<string, number> = {
			spirit: this.player.spirit / lvl,
			magic: this.player.magic / lvl,
			strength: this.player.strength / lvl,
			weapon: this.player.weapons / lvl // player property is plural, config condition key is singular
		};
		const types = this.config.buildTypes || [];

		const normalizeBuild = (b: Record<string, any> | null): Record<string, any> | null => {
			if (!b) return b;
			return {
				...b,
				activeStats: (b.activeStats || []).map((s: string) => (s === 'weapon' ? 'weapons' : s))
			};
		};

		// 1. 60%+ pure builds
		for (const b of types) {
			if (b.id === 'savant') continue;
			if ((b.conditions || []).every((c: any) => pcts[c.stat] >= c.minPercent)) {
				return normalizeBuild(b);
			}
		}

		// 2. Hybrid builds (40%+ in two stats)
		for (const b of types) {
			if (b.id === 'savant') continue;
			const conds = b.conditions || [];
			if (conds.length >= 2 && conds.every((c: any) => pcts[c.stat] >= c.minPercent)) {
				return normalizeBuild(b);
			}
		}

		// 3. 50% fallback rule
		for (const b of types) {
			if (b.id === 'savant') continue;
			for (const c of b.conditions || []) {
				if (!('stat' in c)) continue;
				const m: Record<string, string> = { magic: 'mage', strength: 'berserker', weapon: 'warrior', spirit: 'oracle' };
				if (c.stat && pcts[c.stat] >= 0.5 && b.id === m[c.stat]) {
					return normalizeBuild(b);
				}
			}
		}

		// 4. Savant fallback
		const sv = types.find((b: any) => b.id === 'savant');
		if (sv && Object.keys(pcts).filter((s: string) => pcts[s] >= 0.15).length >= 3) {
			return normalizeBuild(sv);
		}

		return null;
	}

	// --- Awakening ---

	awaken(): void {
		const b = this.detectedBuild;
		if (!b || this.player.level < this.awakeningLevel) return;
		this.player.awakened = true;
		this.player.awakenedBuild = b;
		const STATS = ['spirit', 'magic', 'strength', 'weapons'];
		for (const s of STATS) {
			if (!(b.activeStats || []).includes(s)) {
				(this.player as any)[s] = 0;
			}
		}
		this.updateAbilitySlots();
		this.fixBuildItems();
	}

	unawaken(): void {
		this.player.awakened = false;
		this.player.awakenedBuild = null;
	}

	// --- Ability slots ---

	updateAbilitySlots(): void {
		if (!this.player.selectedMagic) this.player.selectedMagic = [];
		if (!this.player.selectedFS) this.player.selectedFS = [];

		// Resize to slot counts
		if (this.player.selectedMagic.length > this.magicSlotCount) {
			this.player.selectedMagic = this.player.selectedMagic.slice(0, this.magicSlotCount);
		}
		if (this.player.selectedFS.length > this.fsSlotCount) {
			this.player.selectedFS = this.player.selectedFS.slice(0, this.fsSlotCount);
		}

		// Pre-awakening defaults
		if (!this.player.awakened) {
			if (this.player.selectedMagic.length === 0 && this.magics.length > 0) {
				this.player.selectedMagic = [this.magics[0].id];
			}
			if (this.player.selectedFS.length === 0) {
				this.player.selectedFS = ['basic-combat'];
			}
		}
	}

	selectMagic(slotIndex: number, magicId: string): void {
		if (slotIndex < 0 || slotIndex >= this.magicSlotCount) return;
		if (!this.player.selectedMagic) this.player.selectedMagic = [];
		// Duplicate guard
		if (this.player.selectedMagic.some((id, i) => i !== slotIndex && id === magicId)) return;
		this.player.selectedMagic[slotIndex] = magicId;
		this.fixBuildItems();
	}

	selectFightingStyle(slotIndex: number, fsId: string): void {
		if (slotIndex < 0 || slotIndex >= this.fsSlotCount) return;
		if (!this.player.selectedFS) this.player.selectedFS = [];
		// Duplicate guard
		if (this.player.selectedFS.some((id, i) => i !== slotIndex && id === fsId)) return;
		this.player.selectedFS[slotIndex] = fsId;
		this.fixBuildItems();
	}

	// --- Gear purge ---

	fixBuildItems(): void {
		for (const slot of this.slots) {
			if (!slot.armor) continue;
			const item = slot.armor;

			// Check statType compatibility
			if (item.statType === 'Magic') {
				const hasMagic = (this.player.selectedMagic || []).some(m =>
					item.name?.toLowerCase().includes(m.toLowerCase().replace('-magic', ''))
				);
				if (!hasMagic) {
					// Remove incompatible gear
					this.clearSlot(slot);
					continue;
				}
			}
			if (item.statType === 'Strength') {
				const hasFS = (this.player.selectedFS || []).some(fs =>
					item.name?.toLowerCase().includes(fs.toLowerCase().replace('-style', '').replace('-fist', ''))
				);
				if (!hasFS) {
					this.clearSlot(slot);
					continue;
				}
			}
		}
	}

	clearSlot(slot: SlotData): void {
		slot.armor = null;
		slot.level = 0;
		slot.enchant = null;
		slot.modifier = null;
		slot.gems = [];
		slot.attunement = null;
		slot.amuletVariant = null;
	}

	// --- Picker filtering ---

	getPickerItems(field: string, slotIdx: number): any[] {
		const slot = this.slots[slotIdx];
		if (field === 'armor') {
			const isArmorSlot = ['chestpiece', 'legging'].includes(slot.equipType || '');
			return this.allItems.filter((i: any) => {
				if (isArmorSlot) return i.type === 'armor' && i.equipType === slot.equipType;
				return i.type === 'accessory';
			});
		}
		const armorType = slot.armor?.type;
		if (field === 'enchant') {
			if (!armorType) return [];
			return this.modifiers.filter((m: any) =>
				(m.type === 'enchant' || (m.id || '').startsWith('strong') || (m.id || '').startsWith('hard') || (m.id || '').startsWith('powerful'))
				&& (m.applicableTo || []).includes(armorType)
			);
		}
		if (field === 'modifier') {
			if (!armorType) return [];
			return this.modifiers.filter((m: any) =>
				(m.type === 'modifier' || m.type === 'faction')
				&& (m.applicableTo || []).includes(armorType)
			);
		}
		if (field === 'gem') return this.allItems.filter((i: any) => i.type === 'gem');
		return [];
	}

	canPickItem(field: string, slotIdx: number, item: Record<string, any>): { valid: boolean; reason?: string } {
		if (slotIdx < 0) return { valid: true };
		return validateSlotItem(item, slotIdx, this.slots, this.player, this.config);
	}

	// --- Slot mutations ---

	pickItem(field: string, slotIdx: number, id: string | null): void {
		const slot = this.slots[slotIdx];
		if (!id) {
			if (field === 'armor') {
				this.clearSlot(slot);
			} else if (field === 'enchant') {
				slot.enchant = null;
			} else if (field === 'modifier') {
				slot.modifier = null;
			} else if (field === 'gem') {
				slot.gems = [];
			}
			return;
		}
		const all = [...this.allItems, ...this.modifiers];
		const it = all.find((i: any) => (i.id || i._id) === id) || all.find((i: any) => i._id?.toString() === id);
		if (!it) return;
		if (field === 'armor') {
			slot.armor = it;
			const maxLvl = Math.min(it.maxLevel ?? this.player.level, this.player.level);
			const lo = Math.ceil((it.minLevel ?? 1) / 10) * 10;
			const hi = Math.floor(maxLvl / 10) * 10;
			slot.level = hi;
			if (slot.level < lo) slot.level = lo;
			if (slot.level > hi) slot.level = hi;
			slot.gems = [];
		} else if (field === 'enchant') {
			slot.enchant = it;
		} else if (field === 'modifier') {
			slot.modifier = it;
		} else if (field === 'gem') {
			if (!slot.gems) slot.gems = [];
			slot.gems = [it];
		}
	}

	setLevel(slotIdx: number, level: number): void {
		this.slots[slotIdx].level = level;
	}

	setAttunement(slotIdx: number, magicId: string | null): void {
		this.slots[slotIdx].attunement = magicId || null;
	}

	setAmuletVariant(slotIdx: number, type: string | null, tier: string | null): void {
		const slot = this.slots[slotIdx];
		if (!type && !tier) {
			slot.amuletVariant = null;
			return;
		}
		if (!slot.amuletVariant) slot.amuletVariant = { type: '', tier: '' };
		if (type != null) slot.amuletVariant.type = type;
		if (tier != null) slot.amuletVariant.tier = tier;
		const types = this.config.amuletVariants?.types || [];
		const tiers = Object.keys(this.config.amuletVariants?.tiers || {});
		if (!slot.amuletVariant.type && types.length) slot.amuletVariant.type = types[0];
		if (!slot.amuletVariant.tier && tiers.length) slot.amuletVariant.tier = tiers[0];
	}

	resetSlotVariants(slotIdx: number): void {
		const slot = this.slots[slotIdx];
		slot.attunement = null;
		slot.amuletVariant = null;
	}

	getSlotStats(slotIdx: number): Record<string, number> {
		return getSlotStats(this.slots[slotIdx], this.player, this.config);
	}

	// --- Bulk operations ---

	randomize() {
		const gemPool: any[] = this.allItems.filter((i: any) => i.type === 'gem');
		const enchantPool: any[] = this.modifiers.filter((m: any) =>
			m.type === 'enchant' || (m.id || '').startsWith('strong') || (m.id || '').startsWith('hard') || (m.id || '').startsWith('powerful')
		);
		const modifierPool: any[] = this.modifiers.filter((m: any) => m.type === 'modifier' || m.type === 'faction');

		for (const slot of this.slots) {
			const validArmor = this.allItems.filter((i: any) => {
				if (slot.equipType === 'accessory') return i.type === 'accessory';
				return i.type === 'armor' && i.equipType === slot.equipType;
			});
			if (!validArmor.length) continue;
			const armor = validArmor[Math.floor(Math.random() * validArmor.length)];
			slot.armor = armor;
			slot.level = Math.min(armor.maxLevel ?? this.player.level, this.player.level);
			slot.gems = [];

			const armorType = armor.type;

			const validEnchants = enchantPool.filter((e: any) => (e.applicableTo || []).includes(armorType));
			if (validEnchants.length) {
				slot.enchant = validEnchants[Math.floor(Math.random() * validEnchants.length)];
			} else {
				slot.enchant = null;
			}

			const ench = slot.enchant;
			const validModifiers = modifierPool.filter((m: any) => {
				if (!(m.applicableTo || []).includes(armorType)) return false;
				if (m.exclusiveWith?.includes(ench?.id)) return false;
				if (ench?.exclusiveWith?.includes(m.id)) return false;
				return true;
			});
			if (validModifiers.length) {
				slot.modifier = validModifiers[Math.floor(Math.random() * validModifiers.length)];
			} else {
				slot.modifier = null;
			}

			const gemCount = Math.min(armor.jewelSlots || armor.gemNo || 0, 4);
			if (gemCount > 0 && gemPool.length) {
				const picked: any[] = [];
				for (let g = 0; g < gemCount; g++) {
					picked.push(gemPool[Math.floor(Math.random() * gemPool.length)]);
				}
				slot.gems = picked;
			} else {
				slot.gems = [];
			}
		}
	}

	reset() {
		for (const slot of this.slots) {
			this.clearSlot(slot);
		}
	}

	// --- Serialization ---

	getItemId(item: any): string | undefined {
		if (!item) return undefined;
		if (item.id) return item.id;
		if (item._id) return typeof item._id === 'string' ? item._id : item._id.toString();
		return undefined;
	}

	findById(id: string | undefined, collection: any[]): any | undefined {
		if (!id) return undefined;
		return collection.find((x) => x.id === id || x._id === id || x._id?.toString() === id);
	}

	toBuildObject(): BuildObject {
		return {
			version: '2026.1',
			player: {
				level: this.player.level,
				spirit: this.player.spirit,
				magic: this.player.magic,
				strength: this.player.strength,
				weapons: this.player.weapons,
				awakened: this.player.awakened
			},
			selectedMagic: this.player.selectedMagic || [],
			selectedFS: this.player.selectedFS || [],
			slots: this.slots.map((slot) => ({
				key: slot.key as string,
				armorId: this.getItemId(slot.armor),
				level: slot.level,
				enchantId: this.getItemId(slot.enchant),
				modifierId: this.getItemId(slot.modifier),
				gemIds: (slot.gems || []).map((g) => this.getItemId(g)).filter(Boolean) as string[],
				attunement: slot.attunement ?? null,
				amuletVariant: slot.amuletVariant ?? null
			}))
		};
	}

	applyBuildObject(build: BuildObject): boolean {
		if (!build || !build.slots || !build.player) return false;

		this.player.level = Math.min(Math.max(build.player.level || 1, 1), this.config.maxLevel || 175);
		this.player.spirit = build.player.spirit || 0;
		this.player.magic = build.player.magic || 0;
		this.player.strength = build.player.strength || 0;
		this.player.weapons = build.player.weapons || 0;
		this.player.awakened = build.player.awakened || false;
		this.player.awakenedBuild = null;
		this.player.selectedMagic = build.selectedMagic || [];
		this.player.selectedFS = build.selectedFS || [];

		for (const slot of this.slots) {
			this.clearSlot(slot);
		}

		for (const savedSlot of build.slots) {
			const slot = this.slots.find((s) => s.key === savedSlot.key);
			if (!slot) continue;
			if (savedSlot.armorId) {
				const armor = this.findById(savedSlot.armorId, this.allItems);
				if (armor) {
					slot.armor = armor;
					slot.level = savedSlot.level || 0;
				}
			}
			if (savedSlot.enchantId) slot.enchant = this.findById(savedSlot.enchantId, this.modifiers);
			if (savedSlot.modifierId) slot.modifier = this.findById(savedSlot.modifierId, this.modifiers);
			if (savedSlot.gemIds?.length) {
				slot.gems = savedSlot.gemIds
					.map((id) => this.findById(id, this.allItems))
					.filter(Boolean);
			}
			slot.attunement = savedSlot.attunement ?? null;
			slot.amuletVariant = savedSlot.amuletVariant ?? null;
		}

		if (this.player.awakened) {
			const b = this.detectedBuild;
			this.player.awakenedBuild = b;
			if (b) {
				const STATS = ['spirit', 'magic', 'strength', 'weapons'];
				for (const s of STATS) {
					if (!(b.activeStats || []).includes(s)) {
						(this.player as any)[s] = 0;
					}
				}
			}
		}
		this.updateAbilitySlots();
		this.fixBuildItems();
		return true;
	}

	encodeBuild(): string {
		return encodeBuild(this.toBuildObject());
	}

	decodeBuildCode(code: string): { ok: boolean; migrated?: boolean } {
		const loaded = tryLoadBuild(code);
		if (!loaded) return { ok: false };
		this.applyBuildObject(loaded.build);
		return { ok: true, migrated: loaded.migrated };
	}
}
