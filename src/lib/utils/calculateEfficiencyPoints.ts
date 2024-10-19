import type { ItemStats } from '$lib/gearBuilder/itemTypes';
import type { Player } from '$lib/gearBuilder/playerClasses';
import { roundDecimal } from './roundDecimal';

export function calculateEfficiencyPoints(stats: ItemStats, playerLevel: number): number {
	let efficiencyPoints = 0;

	for (const stat in stats) {
		if (stat == 'power') {
			efficiencyPoints += stats[stat] * 3;
		} else if (stat == 'defense') {
			efficiencyPoints += stats[stat] * (1 / 3);
		} else if (stat == 'insanity') {
			efficiencyPoints += stats[stat] * (-0.3 * playerLevel);
		} else if (stat == 'warding') {
			efficiencyPoints += stats[stat] * (0.15 * playerLevel);
		} else if (stat == 'drawback') {
			efficiencyPoints += stats[stat] * (-0.15 * playerLevel);
		} else {
			efficiencyPoints += stats[stat];
		}
	}

	return roundDecimal(efficiencyPoints, 2);
}
