import type { BuildObject } from '../schema/build';
import { CURRENT_BUILD_VERSION, migrateLegacyCodeString } from './legacy';
import { base64urlDecode, base64urlEncode } from './base64';

const V2026_1_SLOT_KEYS = ['accessory1', 'accessory2', 'accessory3', 'chestplate', 'pants'];

export function encodeBuild(build: BuildObject): string {
	return base64urlEncode(JSON.stringify({ ...build, version: CURRENT_BUILD_VERSION }));
}

export function decodeBuild(code: string): BuildObject | null {
	try {
		const json = base64urlDecode(code);
		const parsed = JSON.parse(json);
		return migrateBuild(parsed);
	} catch {
		return null;
	}
}

export function migrateBuild(build: any): BuildObject | null {
	if (!build || typeof build !== 'object') return null;
	if (build.version === CURRENT_BUILD_VERSION) return build as BuildObject;

	if (build.version === '2026.1') {
		const slots = (build.slots || []).slice();
		while (slots.length < V2026_1_SLOT_KEYS.length) {
			slots.push({
				key: V2026_1_SLOT_KEYS[slots.length],
				armorId: undefined, enchantId: undefined, modifierId: undefined,
				gemIds: [], level: 0, attunement: null, amuletVariant: null
			});
		}
		slots.push({
			key: 'weapon',
			armorId: undefined, enchantId: undefined, modifierId: undefined,
			gemIds: [], level: 0, attunement: null, amuletVariant: null
		});
		return { ...build, version: CURRENT_BUILD_VERSION, slots } as BuildObject;
	}

	if (build.version === '2026.0') {
		return { ...build, version: CURRENT_BUILD_VERSION } as BuildObject;
	}

	if (typeof build.code === 'string') {
		return migrateLegacyCodeString(build.code);
	}

	if (typeof build === 'string') {
		return migrateLegacyCodeString(build);
	}

	return null;
}

export function tryLoadBuild(code: string): { build: BuildObject; migrated: boolean } | null {
	// 1. Try base64 JSON
	const decoded = decodeBuild(code);
	if (decoded) return { build: decoded, migrated: false };

	// 2. Try legacy code string
	const legacy = migrateLegacyCodeString(code);
	if (legacy) return { build: legacy, migrated: true };

	return null;
}
