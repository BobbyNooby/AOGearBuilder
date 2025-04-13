import type {
	AnyItemDetails,
	ArmorDetails,
	EnchantDetails,
	GearEnchantStats,
	GearStats,
	GemDetails,
	ModifierDetails
} from '$lib/types/itemTypes';
import type { AOTConfig, validStatKeysType } from '$lib/types/utilTypes';
import { consoleBob } from '$lib/utils';
import { clamp } from '$lib/utils/clamp';
import { filterData } from '$lib/utils/filterData';
import { Player } from './Player';
import type { PlayerBuild } from './PlayerBuild';

export class PlayerBuildSlot {
	database: AnyItemDetails[] = [];
	config: AOTConfig;

	build: PlayerBuild;
	armor: ArmorDetails;
	armorLevel: number;
	enchant: EnchantDetails;
	modifier: ModifierDetails;
	gems: GemDetails[];
	chosenAtlanteanAttribute: string = '';

	constructor(
		build: PlayerBuild,
		armor: ArmorDetails,
		enchant: EnchantDetails,
		modifier: ModifierDetails
	) {
		this.database = build.database;
		this.config = build.player.config;

		const noneGem =
			this.database.find((item) => item.name === 'None' && item.mainType === 'Gem') || null;

		this.build = build;
		this.armor = armor;
		this.armorLevel =
			Object.keys(this.armor.statsPerLevel).length === 0
				? 0
				: Math.max(...Object.keys(this.armor.statsPerLevel).map((key) => parseInt(key)));
		this.enchant = enchant;
		this.modifier = modifier;
		this.gems = [];
		this.chosenAtlanteanAttribute = 'None';

		// Armor level checking
		if (Object.keys(this.armor.statsPerLevel).length == 0) {
			this.armorLevel = 0;
		} else {
			this.armorLevel = Math.max(
				...Object.keys(this.armor.statsPerLevel).map((key) => parseInt(key))
			);
		}

		// Pushing gem slots
		for (let i = 0; i < this.armor.gemNo; i++) {
			this.gems.push(noneGem as GemDetails);
		}
	}

	resetSlot() {
		// Get all None items
		const noneArmor =
			this.database.find((item) => item.name === 'None' && item.mainType === this.armor.mainType) ||
			null;
		const noneEnchant =
			this.database.find((item) => item.name === 'None' && item.mainType === 'Enchant') || null;
		const noneGem =
			this.database.find((item) => item.name === 'None' && item.mainType === 'Gem') || null;
		const noneModifier =
			this.database.find((item) => item.name === 'None' && item.mainType === 'Modifier') || null;

		// Reset slot
		this.armor = noneArmor as ArmorDetails;
		this.armorLevel = 0;
		this.enchant = noneEnchant as EnchantDetails;
		this.modifier = noneModifier as ModifierDetails;
		this.gems = [];
		this.chosenAtlanteanAttribute = 'None';

		for (let i = 0; i < this.armor.gemNo; i++) {
			this.gems.push(noneGem as GemDetails);
		}
	}

	fixSlotLevel() {
		if (this.build.player.level) {
			if (this.armorLevel > this.build.player.level) {
				// Filter armor levels within player level range
				let validStatsPerLevels = Object.keys(this.armor.statsPerLevel)
					.filter((key) => {
						if (this.build.player.level) {
							return Number(key) <= this.build.player.level;
						}
					})
					.map((key) => Number(key));

				// Get max armor level or set to 0
				if (validStatsPerLevels.length > 0) {
					this.armorLevel = Math.max(...validStatsPerLevels);
				} else {
					this.armorLevel = 0;
				}
			}
		} else {
			consoleBob('ArmorSlot.fixSlotLevel() - this.build.player.level is undefined');
		}
	}

	fixSlotItems() {
		const noneItem = this.database.find(
			(item) => item.name === 'None' && item.mainType === this.armor.mainType
		);
		const noneGem = this.database.find((item) => item.name === 'None' && item.mainType === 'Gem');
		const noneModifier = this.database.find(
			(item) => item.name === 'None' && item.mainType === 'Modifier'
		);

		//Armor fix
		if (this.armor.name !== 'None') {
			this.fixSlotLevel();
		} else {
			this.armor = noneItem as ArmorDetails;
			this.fixSlotLevel();
		}

		//Gems fix
		if (this.gems.length < this.armor.gemNo) {
			const diff = this.armor.gemNo - this.gems.length;
			for (let i = 0; i < diff; i++) {
				this.gems.push(noneGem as GemDetails);
			}
		}
		//Remove extra gems
		this.gems.splice(this.armor.gemNo);

		//Modifier fix [TEMP]
		if (!this.armor.validModifiers.includes(this.modifier.name)) {
			this.modifier = noneModifier as ModifierDetails;
		}

		this.fixSlotLevel();
	}

	getArmorDataAtLevel(level: number) {
		return this.armor.statsPerLevel[level];
	}

	setArmor(armor: ArmorDetails) {
		this.armor = armor;
		this.fixSlotItems();
	}

	setEnchant(enchant: EnchantDetails) {
		this.enchant = enchant;
		this.fixSlotItems();
	}

	setModifier(modifier: ModifierDetails) {
		this.modifier = modifier;
		this.fixSlotItems();
	}

	setGem(gem: GemDetails, index: number) {
		this.gems[index] = gem;
		this.fixSlotItems();
	}

	getSlotStats(preAtlantean: boolean = false) {
		const armorStats: GearStats = filterData(
			this.getArmorDataAtLevel(this.armorLevel)
		) as GearStats;

		let enchantStats: GearEnchantStats = {};

		try {
			enchantStats = filterData(this.enchant.enchantTypes.gear || {});
		} catch {
			consoleBob('PlayerBuildSlot.getSlotStats() - enchantStats is undefined');
		}

		const modifierStats: GearEnchantStats = filterData(this.modifier);
		const levelMultiplier: number = this.armorLevel / 10;
		const gemStats: GearStats[] = this.gems.map((gem) => filterData(gem));

		let vitalityMultipler = 1;

		let finalSlotStats = {
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

		if (this.armor.statType == 'Vitality') {
			// Vetex given formula Math.clamp((vitality/maxstatpoints)*3, 0.3, 1)
			vitalityMultipler = clamp(
				(this.build.player.statBuild.vitality / (this.build.player.level * 2)) * 3,
				0.3,
				1
			);
		}

		// Add armor stats
		if (armorStats && finalSlotStats) {
			for (const stat in armorStats) {
				if (Object.prototype.hasOwnProperty.call(armorStats, stat)) {
					const statKey = stat as keyof GearStats;
					// Ensure armorStats[statKey] is defined before accessing it
					if (armorStats[statKey] !== undefined) {
						finalSlotStats[statKey] += Math.floor(armorStats[statKey]! * vitalityMultipler);
					} else {
						consoleBob('PlayerBuildSlot.getSlotStats() - armorStats[statKey] is undefined');
					}
				}
			}
		} else {
			consoleBob('PlayerBuildSlot.getSlotStats() - armorStats or finalSlotStats is undefined');
		}

		// Add gem stats
		for (const gem of gemStats) {
			for (const stat in gem) {
				if (Object.prototype.hasOwnProperty.call(gem, stat)) {
					const statKey = stat as keyof GearStats;
					// Ensure gem[statKey] is defined before accessing it
					if (gem[statKey] !== undefined) {
						finalSlotStats[statKey] += Math.floor(gem[statKey]! * vitalityMultipler);
					} else {
						consoleBob('PlayerBuildSlot.getSlotStats() - gem[statKey] is undefined');
					}
				}
			}
		}

		const statRelations: Record<keyof GearEnchantStats, keyof GearStats> = {
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

		const nonIncrementalStats = ['insanity', 'warding', 'drawback'];

		//Enchant calcs
		for (const stat in enchantStats) {
			if (Object.prototype.hasOwnProperty.call(enchantStats, stat)) {
				const statKey = stat as keyof GearEnchantStats;
				// Ensure enchantStats[statKey] is defined before accessing it
				if (enchantStats[statKey] !== undefined) {
					finalSlotStats[statRelations[statKey]] += Math.floor(
						enchantStats[statKey] * (nonIncrementalStats.includes(statKey) ? 1 : levelMultiplier)
					);
				} else {
					consoleBob('PlayerBuildSlot.getSlotStats() - enchantStats[statKey] is undefined');
				}
			}
		}

		//Modifier calcs
		if (!preAtlantean) {
			modifierCalcs: if (this.modifier.name == 'Atlantean Essence') {
				// Atlantean calcs

				const atlantenOrder: (keyof GearEnchantStats)[] = [
					'powerIncrement',
					'defenseIncrement',
					'attackSizeIncrement',
					'attackSpeedIncrement',
					'agilityIncrement',
					'intensityIncrement'
				];

				// Atlantean Calcs
				for (const stat of atlantenOrder) {
					const statRelationKey = statRelations[stat];
					const currentFinalStatValue = finalSlotStats[statRelationKey];

					if (currentFinalStatValue == 0) {
						const statValue = modifierStats[stat]!;
						finalSlotStats[statRelationKey] += Math.floor(statValue * levelMultiplier);
						this.chosenAtlanteanAttribute = statRelations[stat];

						finalSlotStats.insanity += Math.floor(modifierStats.insanity! * levelMultiplier);
						break modifierCalcs;
					}
				}

				finalSlotStats.power += Math.floor(modifierStats.powerIncrement! * levelMultiplier);
				this.chosenAtlanteanAttribute = statRelations.powerIncrement;
				finalSlotStats.insanity += modifierStats.insanity!;
			} else {
				// Regular modifier calcs
				this.chosenAtlanteanAttribute = '';
				for (const stat in modifierStats) {
					if (Object.prototype.hasOwnProperty.call(modifierStats, stat)) {
						const statKey = stat as keyof GearEnchantStats;
						// Ensure modifierStats[statKey] is defined before accessing it
						if (modifierStats[statKey] !== undefined) {
							finalSlotStats[statRelations[statKey]] += Math.floor(
								modifierStats[statKey] * levelMultiplier
							);
						} else {
							consoleBob('PlayerBuildSlot.getSlotStats() - modifierStats[statKey] is undefined');
						}
					}
				}
			}
		}
		return finalSlotStats;
	}

	getSlotCode() {
		let slotCode: string[] = [];
		slotCode = [this.armor, this.enchant, this.modifier, ...this.gems].map((item) => item.id);
		slotCode.push(this.armorLevel.toString());
		return slotCode.join(',');
	}
}
