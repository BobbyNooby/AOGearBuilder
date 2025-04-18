<script lang="ts">
	import type { Player } from '$lib/gearBuilder/Player';
	import type { AllStats, AnyItemDetails, GearEnchantStats, GearStats } from '$lib/types/itemTypes';
	import { staticImagesRootFolder, statsStyles } from '$lib/utils';
	import { clamp } from '$lib/utils/clamp';
	import { filterData } from '$lib/utils/filterData';

	let {
		item,
		showStatName,
		player,
		ship,
		slotKey,
		isMenu,
		atlanteanAttribute = '',
		showOnlyAtlanteanStat = false,
		shipPartType
	}: {
		item: AnyItemDetails;
		showStatName: boolean;
		player?: Player;
		ship?: undefined;
		slotKey?: keyof typeof Player.prototype.build.slots;
		isMenu?: boolean;
		atlanteanAttribute?: string;
		showOnlyAtlanteanStat?: boolean;
		shipPartType?: 'base' | 'enchant';
	} = $props();

	let chosenStat: Partial<Record<keyof AllStats, string>> = {};

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
		drawback: 'drawback',
		warding: 'warding',
		insanity: 'insanity'
	};

	function applyVitalityScaling(stats: AllStats, multiplier: number): AllStats {
		for (const stat in stats) {
			if (!['warding', 'drawback', 'insanity'].includes(stat)) {
				stats[stat] = Math.floor(stats[stat] * multiplier);
			}
		}
		return stats;
	}

	function stringifyStats(stats: AllStats): Record<string, string> {
		const result: Record<string, string> = {};
		for (const [key, value] of Object.entries(stats)) {
			if (value > 0) result[key] = value.toString();
		}
		return result;
	}

	function extractStatsFromEnchant(
		enchantStats: GearEnchantStats,
		slotKey?: keyof typeof Player.prototype.build.slots,
		player?: Player
	): Record<string, string> {
		const stats: Record<string, string> = {};
		for (const stat in enchantStats) {
			const key = stat as keyof GearEnchantStats;
			const levelMultiplier = player!.build.slots[slotKey!].armorLevel / 10; 
			if (levelMultiplier !== 0) { // Prevent 0s from being displayed
				if (['warding', 'insanity', 'drawback'].includes(stat)) {
					if (enchantStats[key]! > 0) {
						stats[key] = enchantStats[key]?.toString();
					}
				} else {
					const derivedKey = statRelations[key];
					const scaledValue = Math.floor((enchantStats[key] ?? 0) * levelMultiplier);
					stats[derivedKey] = scaledValue.toString();
				}
			}
		}
		return stats;
	}

	function extractStatsFromAtlantean(
		modifierStats: GearEnchantStats,
		slotKey?: keyof typeof Player.prototype.build.slots,
		player?: Player,
		currentStats?: Record<string, number>
	): Record<string, string> {
		const stats: Record<string, string> = {};
		const levelMultiplier = player!.build.slots[slotKey!].armorLevel / 10;

		// Define the Atlantean order of stats to check
		const atlanteanOrder: (keyof GearEnchantStats)[] = [
			'powerIncrement',
			'defenseIncrement',
			'attackSizeIncrement',
			'attackSpeedIncrement',
			'agilityIncrement',
			'intensityIncrement'
		];

		// If we're showing only the Atlantean stat that was chosen
		if (showOnlyAtlanteanStat && atlanteanAttribute) {
			// Find the matching increment stat for the selected attribute
			const incrementKey = Object.entries(statRelations).find(
				([, value]) => value === atlanteanAttribute
			)?.[0] as keyof GearEnchantStats;

			if (incrementKey && modifierStats[incrementKey]) {
				const derivedKey = statRelations[incrementKey];
				const scaledValue = Math.floor((modifierStats[incrementKey] ?? 0) * levelMultiplier);
				stats[derivedKey] = scaledValue.toString();
			}

			// Always include insanity
			if (modifierStats.insanity) {
				stats.insanity = modifierStats.insanity.toString();
			}

			return stats;
		}

		// If we have currentStats, determine which Atlantean stat would be chosen
		if (currentStats) {
			let chosenAttribute = '';

			// Check each attribute in order to find the first one with zero value
			for (const stat of atlanteanOrder) {
				const statRelationKey = statRelations[stat];
				if (currentStats[statRelationKey] === 0) {
					const statValue = modifierStats[stat];
					if (statValue) {
						const scaledValue = Math.floor(statValue * levelMultiplier);
						stats[statRelationKey] = scaledValue.toString();
						chosenAttribute = statRelationKey;
						break;
					}
				}
			}

			// If no stat with zero value was found, default to power
			if (!chosenAttribute) {
				const scaledValue = Math.floor((modifierStats.powerIncrement ?? 0) * levelMultiplier);
				stats.power = scaledValue.toString();
				chosenAttribute = 'power';
			}

			// Always include insanity
			if (modifierStats.insanity) {
				stats.insanity = modifierStats.insanity.toString();
			}

			return stats;
		}

		// Default case: return all modifier stats
		return extractStatsFromEnchant(modifierStats, slotKey, player);
	}

	function filterAndStringifyStats(stats: Record<string, any>): Record<string, string> {
		return stringifyStats(filterData(stats));
	}

	function setupStats() {
		if (isMenu && item.mainType === 'Enchant') {
			const keysToRemove = player
				? [
						'power',
						'defense',
						'agility',
						'attackSpeed',
						'attackSize',
						'intensity',
						'regeneration',
						'piercing',
						'resistance'
					]
				: [
						'powerIncrement',
						'defenseIncrement',
						'agilityIncrement',
						'attackSpeedIncrement',
						'attackSizeIncrement',
						'intensityIncrement',
						'regenerationIncrement',
						'piercingIncrement',
						'resistanceIncrement'
					];

			for (const key of keysToRemove) {
				delete item[key];
			}
		}

		if (!player) {
			chosenStat = filterAndStringifyStats(item);
			return;
		}

		const vitalityMultiplier = clamp((player.statBuild.vitality / (player.level * 2)) * 3, 0.3, 1);

		if (
			['Accessory', 'Chestplate', 'Pants'].includes(item.mainType) &&
			item.statsPerLevel?.length
		) {
			const statsPerLevel = item.statsPerLevel.map(filterData);
			if (item.statType === 'Vitality') {
				statsPerLevel.forEach((stats) => applyVitalityScaling(stats, vitalityMultiplier));
			}

			const [minStats, maxStats] = [statsPerLevel[0], statsPerLevel.at(-1)!];
			for (const stat in statsStyles) {
				if (minStats[stat] && maxStats[stat]) {
					chosenStat[stat] =
						minStats[stat] === maxStats[stat]
							? minStats[stat].toString()
							: `${minStats[stat]} ~ ${maxStats[stat]}`;
				}
			}
		} else if (item.mainType === 'Enchant') {
			chosenStat = extractStatsFromEnchant(
				item.enchantTypes.gear as GearEnchantStats,
				slotKey,
				player
			);
		} else if (item.mainType === 'Modifier') {
			// Handle Atlantean Essence modifier differently
			if (item.name === 'Atlantean Essence' && slotKey && player) {
				// Get the current stats of the armor and gems
				const slot = player.build.slots[slotKey];
				const armorStats = filterData(slot.getArmorDataAtLevel(slot.armorLevel)!);

				// Combine armor stats with gem stats
				const currentStats: Record<string, number> = { ...armorStats };
				for (const gem of slot.gems) {
					const gemStats = filterData(gem);
					for (const stat in gemStats) {
						if (currentStats[stat]) {
							currentStats[stat] += gemStats[stat];
						} else {
							currentStats[stat] = gemStats[stat];
						}
					}
				}

				// Also include enchant stats
				const enchantStats = slot.enchant.enchantTypes.gear
					? filterData(slot.enchant.enchantTypes.gear)
					: {};
				for (const stat in enchantStats) {
					const key = stat as keyof GearEnchantStats;
					if (!['warding', 'insanity', 'drawback'].includes(stat)) {
						const derivedKey = statRelations[key];
						if (currentStats[derivedKey]) {
							currentStats[derivedKey] += Math.floor(enchantStats[key] * (slot.armorLevel / 10));
						} else {
							currentStats[derivedKey] = Math.floor(enchantStats[key] * (slot.armorLevel / 10));
						}
					}
				}

				chosenStat = extractStatsFromAtlantean(
					filterData(item) as GearEnchantStats,
					slotKey,
					player,
					currentStats
				);
			} else {
				const modStats = extractStatsFromEnchant(
					filterData(item) as GearEnchantStats,
					slotKey,
					player
				);
				chosenStat = modStats;
			}
		} else {
			chosenStat = filterAndStringifyStats(item);
		}
	}

	setupStats();
</script>

{#each Object.keys(chosenStat) as stat}
	<div class="flex items-center justify-center">
		<img class="h-6" src="{staticImagesRootFolder}/stats/{stat}.png" alt={stat} />
		<p
			style="
				font-family: 'Open Sans', sans-serif;
				font-weight: 700;
				font-size: 20px;
				-webkit-text-fill-color: {statsStyles[stat].fillColor};
				-webkit-text-stroke: 1px;
				-webkit-text-stroke-color: {statsStyles[stat].strokeColor};
				text-align: center;
			"
		>
			{#if showStatName && parseInt(chosenStat[stat]) > 0}
				+
			{/if}
			{chosenStat[stat]}{#if ['stability', 'resilience'].includes(stat)}%{/if}
			{#if showStatName}{statsStyles[stat].name}{/if}
		</p>
	</div>
{/each}
