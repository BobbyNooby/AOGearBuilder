import type { BuildObject } from '../schema/build';
import { CURRENT_BUILD_VERSION, migrateLegacyCodeString } from './legacy';
import { base64urlDecode, base64urlEncode } from './base64';

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
