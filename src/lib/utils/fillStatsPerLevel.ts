import type { AnyItemDetails, GearStats } from '$lib/types/itemTypes';
import type { AOTConfig } from '$lib/types/utilTypes';

export function fillStatsPerLevel(items: AnyItemDetails[], config: AOTConfig) {
	for (const item of items) {
		if (item.scaling && item.minLevel !== undefined && item.maxLevel !== undefined) {
			// Initialize statsPerLevel as an array if needed
			if (!item.statsPerLevel || !Array.isArray(item.statsPerLevel)) {
				item.statsPerLevel = [];
			}

			for (let level = item.minLevel; level <= item.maxLevel; level += 10) {
				// Find or create entry for this level
				let levelEntry = item.statsPerLevel.find((entry) => entry.level === level);
				if (!levelEntry) {
					levelEntry = { level };
					item.statsPerLevel.push(levelEntry);
				}

				const levelMultiplier = level / 10;

				for (const stat of Object.keys(item.scaling) as (keyof GearStats)[]) {
					const itemStatScaling = item.scaling[stat];
					const configStatScaling = config.scalings.internal[stat];

					// Skip if either scaling value is invalid
					if (itemStatScaling == null || configStatScaling == null) continue;

					const isScalable = configStatScaling !== -1;
					const statValue = Math.floor(
						itemStatScaling * (isScalable ? levelMultiplier * configStatScaling : 1)
					);

					// Only set if missing
					if (levelEntry[stat] === undefined) {
						levelEntry[stat] = statValue;
					}
				}
			}
		}
	}
}
