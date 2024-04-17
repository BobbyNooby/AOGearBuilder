import type { Player } from '$lib/gearBuilder/playerClasses';

export function calculateSubstatEfficiency(statAmount: number, statKey: string, player: Player) {
	const playerLevel = player.level;
	let multiplier = 1;

	if (['atkSpdStartupProjectile'].includes(statKey)) {
		multiplier = 0.5;
	} else if (['agiReflex'].includes(statKey)) {
		multiplier = 0.3;
	} else if (['agiLeap', 'resistance', 'regenerationInCombat'].includes(statKey)) {
		multiplier = 0.75;
	} else if (['attackSize'].includes(statKey)) {
		multiplier = 0.68;
	} else if (['atkSpdEndlag'].includes(statKey)) {
		multiplier = 0.125;
	}
	const percentCalc =
		multiplier *
		1.35 *
		((16 * Math.pow(Math.log(0.1 * statAmount + 4), 3) * 0.09 + 0.15 * statAmount) /
			(0.1 + 0.15 * Math.pow(playerLevel, 0.5)) -
			0.79);

	return Math.round((percentCalc + Number.EPSILON) * 100) / 100;
}
