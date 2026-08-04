import type { GameConfig } from '../schema/game-config';

export function computeFusedGemStats(
	gemA: Record<string, any>,
	gemB: Record<string, any>,
	config: GameConfig
): Record<string, number> {
	const rate = config.gemFusion?.reduction ?? 0.55;
	const fused: Record<string, number> = {};

	const allStats = new Set([
		...Object.keys(gemA.scaling ?? {}),
		...Object.keys(gemB.scaling ?? {})
	]);

	for (const stat of allStats) {
		const a = Number(gemA.scaling?.[stat]) || 0;
		const b = Number(gemB.scaling?.[stat]) || 0;
		const val = Math.round(rate * (a + b));
		if (val > 0 || stat === 'drawback' || stat === 'insanity' || stat === 'warding') {
			fused[stat] = val;
		}
	}

	return fused;
}

export function buildFusedGemItem(
	gemA: Record<string, any>,
	gemB: Record<string, any>,
	config: GameConfig
): Record<string, any> {
	const sameGem = gemA.id === gemB.id;
	const name = sameGem
		? `2x ${gemA.name}`
		: `${gemA.name}-${gemB.name}`;

	const scaling = computeFusedGemStats(gemA, gemB, config);

	return {
		_fused: true,
		_fusedFrom: [gemA.id, gemB.id],
		id: `fused:${gemA.id}:${gemB.id}`,
		name,
		type: 'gem',
		rarity: 'Exotic',
		scaling
	};
}

export function parseFusedGemId(id: string): { gemAId: string; gemBId: string } | null {
	if (!id.startsWith('fused:')) return null;
	const parts = id.split(':');
	if (parts.length !== 3) return null;
	return { gemAId: parts[1], gemBId: parts[2] };
}
