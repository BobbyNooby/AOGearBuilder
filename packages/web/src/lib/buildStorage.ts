import { tryLoadBuild, encodeBuild, validateBuild, type BuildObject, type SavedBuild } from '$lib/stats';

const LS_KEY = 'aotools.savedBuilds';
const LEGACY_KEYS = ['savedBuilds', 'savedShipBuilds', 'gearBuild', 'shipBuild'];

function now(): string {
	return new Date().toISOString();
}

export interface BuildStorageDeps {
	items: any[];
	modifiers: any[];
	config: any;
}

export function loadLocalBuildsRaw(): any[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(LS_KEY);
		if (!raw) return [];
		return JSON.parse(raw);
	} catch {
		return [];
	}
}

export function saveLocalBuildsRaw(builds: any[]) {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem(LS_KEY, JSON.stringify(builds));
}

export function loadLocalBuilds(deps: BuildStorageDeps): SavedBuild[] {
	migrateLegacyLocalStorage(deps);

	const raw = loadLocalBuildsRaw();
	const valid: SavedBuild[] = [];

	for (const entry of raw) {
		const build = entry?.build ?? entry;
		const loaded = tryLoadBuild(typeof build === 'string' ? build : encodeBuild(build));
		if (!loaded) continue;

		const validation = validateBuild(loaded.build, deps.items, deps.modifiers, deps.config);
		if (!validation.valid) continue;

		valid.push({
			id: entry.id || crypto.randomUUID(),
			name: entry.name || 'Unnamed build',
			version: loaded.build.version,
			build: loaded.build,
			savedAt: entry.savedAt || now(),
			source: 'local'
		});
	}

	// Persist cleaned/migrated list
	saveLocalBuildsRaw(valid);
	return valid;
}

export function saveLocalBuild(build: SavedBuild) {
	const builds = loadLocalBuildsRaw();
	const idx = builds.findIndex((b: any) => b.id === build.id);
	const entry = { ...build, source: 'local' };
	if (idx >= 0) {
		builds[idx] = entry;
	} else {
		builds.unshift(entry);
	}
	saveLocalBuildsRaw(builds);
}

export function deleteLocalBuild(id: string) {
	const builds = loadLocalBuildsRaw().filter((b: any) => b.id !== id);
	saveLocalBuildsRaw(builds);
}

export function migrateLegacyLocalStorage(deps: BuildStorageDeps) {
	if (typeof localStorage === 'undefined') return;
	let migrated: SavedBuild[] = [];

	for (const key of LEGACY_KEYS) {
		const raw = localStorage.getItem(key);
		if (!raw) continue;
		try {
			const parsed = JSON.parse(raw);
			const entries = Array.isArray(parsed) ? parsed : [parsed];
			for (const entry of entries) {
				if (!entry) continue;
				const code = typeof entry === 'string' ? entry : entry.code;
				if (typeof code !== 'string') continue;
				const loaded = tryLoadBuild(code);
				if (!loaded) continue;
				const validation = validateBuild(loaded.build, deps.items, deps.modifiers, deps.config);
				if (!validation.valid) continue;
				migrated.push({
					id: crypto.randomUUID(),
					name: entry.name || 'Migrated build',
					version: loaded.build.version,
					build: loaded.build,
					savedAt: now(),
					source: 'local'
				});
			}
		} catch {
			// ignore malformed legacy entries
		}
	}

	if (migrated.length === 0) return;

	const existing = loadLocalBuildsRaw();
	const merged = [...migrated, ...existing];
	saveLocalBuildsRaw(merged);

	// Optionally remove legacy keys after migration
	for (const key of LEGACY_KEYS) {
		localStorage.removeItem(key);
	}
}
