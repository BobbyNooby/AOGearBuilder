import { noneGem, noneModifier } from '$lib/gearBuilder/defaultGears';
import type {
	ArmorItemData,
	GemItemData,
	EnchantItemData,
	ModifierItemData,
	ArmorStats
} from '$lib/gearBuilder/itemTypes';

import { filterData } from '$lib/utils/filterData';

import type { CurrentBuild } from './CurrentBuild';

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

export class ArmorSlot {
	parentBuild: CurrentBuild;
	armor: ArmorItemData;
	armorLevel: number;
	enchant: EnchantItemData;
	modifier: ModifierItemData;
	gems: GemItemData[];
	chosenAtlanteanAttribute: string;
	constructor(
		parentBuild: CurrentBuild,
		armor: ArmorItemData,
		enchant: EnchantItemData,
		modifier: ModifierItemData
	) {
		this.parentBuild = parentBuild;
		this.armor = armor;

		if (armor.statsPerLevel.length == 0) {
			this.armorLevel = 0;
		} else {
			this.armorLevel = armor.statsPerLevel[armor.statsPerLevel.length - 1].level;
		}

		this.enchant = enchant;
		this.modifier = modifier;
		this.gems = [];
		this.chosenAtlanteanAttribute = 'None';

		for (let i = 0; i < armor.gemNo; i++) {
			this.gems.push(noneGem);
		}
	}

	fixArmorLevel() {
		if (this.armorLevel > this.parentBuild.parentPlayer.level) {
			let validArmors = [];
			for (const statAtLevel of this.armor.statsPerLevel) {
				if (statAtLevel.level <= this.parentBuild.parentPlayer.level) {
					validArmors.push(statAtLevel);
				}
			}

			if (validArmors.length > 0) {
				this.armorLevel = validArmors[validArmors.length - 1].level;
			} else {
				this.armorLevel = 0;
			}
		}
	}

	getArmorDataAtLevel(level: number) {
		return this.armor.statsPerLevel.find((ArmorAtLevel) => ArmorAtLevel.level === level);
	}
	setArmor(armor: ArmorItemData) {
		this.armor = armor;

		if (armor.name != 'None') {
			this.armorLevel = armor.statsPerLevel[armor.statsPerLevel.length - 1].level;
		} else {
			this.armorLevel = 0;
		}
		if (this.gems.length < armor.gemNo) {
			const diff = armor.gemNo - this.gems.length;
			for (let i = 0; i < diff; i++) {
				this.gems.push(noneGem);
			}
		}

		this.gems.splice(armor.gemNo); // remove excess gems

		// Modifier checks
		if (!armor.validModifiers.includes(this.modifier.name)) {
			this.modifier = noneModifier;
		}
	}

	setGem(gemIndex: number, gem: GemItemData) {
		this.gems[gemIndex] = gem;
	}

	setEnchant(enchant: EnchantItemData) {
		this.enchant = enchant;
	}

	setModifier(modifier: ModifierItemData) {
		this.modifier = modifier;
		// Call this to update this.atlanteanAttribute
		this.getSlotStats();
	}

	getSlotStats(preAtlantean: boolean = false): ArmorStats {
		const armorStats: any = filterData(this.getArmorDataAtLevel(this.armorLevel));
		const enchantStats: any = filterData(this.enchant);
		const modifierStats: any = this.modifier;
		const levelMultiplier: any = this.armorLevel / 10;
		const gemsStats: any[] = this.gems.map((gem) => filterData(gem));

		let finalSlotStats: any = {
			power: 0,
			defense: 0,
			agility: 0,
			attackSpeed: 0,
			attackSize: 0,
			intensity: 0,
			regeneration: 0,
			piercing: 0,
			resistance: 0,
			insanity: 0,
			warding: 0,
			drawback: 0
		};

		const nonIncrementalStats = ['insanity', 'warding', 'drawback'];

		let vitalityMultiplier = 1;

		if (
			this.armor.name.includes('Oracle') ||
			this.armor.name.includes('Alitheia') ||
			this.armor.statType == 'Vitality'
		) {
			vitalityMultiplier = Math.min(
				// Vetex given formula Math.clamp((vitality/maxstatpoints)*3, 0.3, 1)
				Math.max(
					(this.parentBuild.parentPlayer.vitalityPoints /
						(this.parentBuild.parentPlayer.level * 2)) *
						3,
					0.3
				),
				1
			);
		}

		for (const stat in armorStats) {
			finalSlotStats[stat] += Math.floor(armorStats[stat] * vitalityMultiplier);
		}

		for (const gem of gemsStats) {
			for (const stat in gem) {
				finalSlotStats[stat] += gem[stat];
			}
		}
		// Armor, Enchant, Gem calcs

		const statRelations: any = {
			powerIncrement: 'power',
			defenseIncrement: 'defense',
			agilityIncrement: 'agility',
			attackSpeedIncrement: 'attackSpeed',
			attackSizeIncrement: 'attackSize',
			intensityIncrement: 'intensity',
			regenerationIncrement: 'regeneration',
			piercingIncrement: 'piercing',
			resistanceIncrement: 'resistance',
			insanity: 'insanity',
			warding: 'warding',
			drawback: 'drawback'
		};

		for (const stat in enchantStats) {
			finalSlotStats[statRelations[stat]] += Math.floor(
				enchantStats[stat] * (nonIncrementalStats.includes(stat) ? 1 : levelMultiplier)
			);
		}

		// Modifier Calcs
		if (!preAtlantean) {
			modifierCalcs: if (modifierStats.name == 'Atlantean Essence') {
				//Atlantean calcs

				const atlantenOrder = [
					'powerIncrement',
					'defenseIncrement',
					'attackSizeIncrement',
					'attackSpeedIncrement',
					'agilityIncrement',
					'intensityIncrement'
				];

				for (const stat of atlantenOrder) {
					if (finalSlotStats[statRelations[stat]] == 0) {
						finalSlotStats[statRelations[stat]] += Math.floor(
							modifierStats[stat] * levelMultiplier
						);
						this.chosenAtlanteanAttribute = statRelations[stat];
						finalSlotStats.insanity += modifierStats.insanity;
						break modifierCalcs;
					}
				}

				// Only happens if all have value
				finalSlotStats['power'] += Math.floor(modifierStats['powerIncrement'] * levelMultiplier);
				this.chosenAtlanteanAttribute = statRelations['powerIncrement'];
				finalSlotStats.insanity += modifierStats.insanity;
			} else {
				// Regular modifier calculations
				this.chosenAtlanteanAttribute = '';
				for (const stat in filterData(modifierStats)) {
					finalSlotStats[statRelations[stat]] += Math.floor(modifierStats[stat] * levelMultiplier);
				}
			}
		}

		return finalSlotStats;
	}

	getSlotCode() {
		let slotCode: any[] = [];
		slotCode = [this.armor, this.enchant, this.modifier, ...this.gems].map((item) => item.id);
		slotCode.push(this.armorLevel);
		return slotCode.join('.');
	}
}
