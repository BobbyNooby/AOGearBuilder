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

	function extractStatsFromEnchant(enchantStats: GearEnchantStats): Record<string, string> {
		const stats: Record<string, string> = {};
		for (const stat in enchantStats) {
			const key = stat as keyof GearEnchantStats;
			if (['warding', 'insanity', 'drawback'].includes(stat)) {
				if (enchantStats[key] > 0) {
					stats[key] = enchantStats[key]?.toString();
				}
			} else {
				const derivedKey = statRelations[key];
				const scaledValue = Math.floor(
					((enchantStats[key] ?? 0) * player!.build.slots[slotKey!].armorLevel) / 10
				);
				console.log(player?.build.slots[slotKey!].armorLevel);
				stats[derivedKey] = scaledValue.toString();
			}
		}
		return stats;
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
			chosenStat = extractStatsFromEnchant(item.enchantTypes.gear as GearEnchantStats);
		} else if (item.mainType === 'Modifier') {
			const modStats = extractStatsFromEnchant(filterData(item) as GearEnchantStats);
			chosenStat = modStats;
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
