import type { ArmorItemData, ItemStats } from '$lib/itemTypes';
import type { Player } from '$lib/playerClasses';

export function calculateEfficiencyPoints(stats: ItemStats): number {
	let efficiencyPoints = 0;

	for (const stat in stats) {
		if (stat == 'power') {
			efficiencyPoints += stats[stat] * 3;
		} else if (stat == 'defense') {
			efficiencyPoints += stats[stat] / 3;
		} else if (stat == 'insanity') {
			efficiencyPoints += stats[stat] * -36;
		} else if (stat == 'warding') {
			efficiencyPoints += stats[stat] * 18;
		} else if (stat == 'drawback') {
			efficiencyPoints += stats[stat] * -18;
		} else {
			efficiencyPoints += stats[stat];
		}
	}

	return Math.round((efficiencyPoints + Number.EPSILON) * 100) / 100;
}
