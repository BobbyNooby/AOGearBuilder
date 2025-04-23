import type { Player } from '$lib/gearBuilder/Player';
import type { GearStats } from '$lib/types/itemTypes';
import type { AOTConfig } from '$lib/types/utilTypes';
import { decRound } from './decRound';

export function calculateEP(config: AOTConfig, stats: GearStats, player: Player): number {
	let efficiencyPoints = 0;

	for (const stat in stats) {
		const statValue = stats[stat as keyof GearStats];
		if (statValue !== undefined && statValue !== null) {
			if (['drawback', 'warding', 'insanity'].includes(stat)) {
				efficiencyPoints +=
					statValue * config.epPerStat[stat as keyof GearStats] * (player.level / 10);
			} else {
				efficiencyPoints += statValue * config.epPerStat[stat as keyof GearStats];
			}
		}
	}

	return decRound(efficiencyPoints, 2);
}
