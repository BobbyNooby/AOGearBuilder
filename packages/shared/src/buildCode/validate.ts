import type { BuildObject } from '../schema/build';
import type { Item } from '../schema/item';
import type { ModifierDef } from '../schema/modifier';
import type { GameConfig } from '../schema/game-config';

export function validateBuild(
	build: BuildObject,
	items: Item[],
	modifiers: ModifierDef[],
	config: GameConfig
): { valid: boolean; reason?: string } {
	if (!build.version) return { valid: false, reason: 'Missing version' };
	if (build.version !== '2026.1') return { valid: false, reason: `Unsupported version ${build.version}` };
	if (build.player.level < 1 || build.player.level > config.maxLevel) {
		return { valid: false, reason: `Invalid player level ${build.player.level}` };
	}

	const itemIds = new Set(items.map((i) => i.id));
	const modIds = new Set(modifiers.map((m) => m.id));

	for (const slot of build.slots) {
		if (slot.armorId && !itemIds.has(slot.armorId)) {
			return { valid: false, reason: `Unknown item ${slot.armorId}` };
		}
		if (slot.enchantId && !modIds.has(slot.enchantId)) {
			return { valid: false, reason: `Unknown enchant ${slot.enchantId}` };
		}
		if (slot.modifierId && !modIds.has(slot.modifierId)) {
			return { valid: false, reason: `Unknown modifier ${slot.modifierId}` };
		}
		for (const gemId of slot.gemIds) {
			if (!itemIds.has(gemId)) {
				return { valid: false, reason: `Unknown gem ${gemId}` };
			}
		}
	}

	return { valid: true };
}
