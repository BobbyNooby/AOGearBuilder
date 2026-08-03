import type { BuildObject, BuildSlot, BuildPlayer } from '../schema/build';

export const CURRENT_BUILD_VERSION = '2026.1';

export function isNumericSegment(seg: string): boolean {
	return /^[0-9]+(\.[0-9]+)?$/.test(seg);
}

export function migrateLegacyCodeString(code: string): BuildObject | null {
	// Old AOGearBuilder gear build code format:
	// [level]|[spirit]|[magic]|[strength]|[weapons]|[awakened]|[armor,enchant,modifier,gem1,...,level]|...
	// or simply slot codes separated by '|'.
	try {
		const parts = code.split('|');
		const player: BuildPlayer = {
			level: 150,
			spirit: 0,
			magic: 0,
			strength: 0,
			weapons: 0,
			awakened: false
		};

		const playerKeys: (keyof BuildPlayer)[] = ['level', 'spirit', 'magic', 'strength', 'weapons', 'awakened'];
		let slotStart = 0;
		for (let i = 0; i < parts.length && i < playerKeys.length; i++) {
			if (!isNumericSegment(parts[i])) break;
			const key = playerKeys[i];
			if (key === 'awakened') {
				(player as any)[key] = parts[i] !== '0';
			} else {
				(player as any)[key] = Number(parts[i]);
			}
			slotStart = i + 1;
		}

		const slots: BuildSlot[] = [];
		const expectedKeys = ['accessory1', 'accessory2', 'accessory3', 'chestplate', 'pants'];
		for (let i = slotStart; i < parts.length; i++) {
			const segs = parts[i].split(',');
			if (segs.length < 2) continue;
			const level = Number(segs[segs.length - 1]);
			if (!isFinite(level)) continue;
			const armorId = segs[0] || undefined;
			const enchantId = segs[1] || undefined;
			const modifierId = segs[2] || undefined;
			const gemIds = segs.slice(3, segs.length - 1).filter(Boolean);
			slots.push({
				key: expectedKeys[slots.length] || `slot${slots.length}`,
				armorId,
				enchantId,
				modifierId,
				gemIds,
				level,
				attunement: null,
				amuletVariant: null
			});
		}

		if (slots.length === 0) return null;
		return {
			version: CURRENT_BUILD_VERSION,
			player,
			selectedMagic: [],
			selectedFS: [],
			slots
		};
	} catch {
		return null;
	}
}
