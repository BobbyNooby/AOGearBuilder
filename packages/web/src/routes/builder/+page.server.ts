import { apiFetch } from '$lib/api';
import { loadGameConfig } from '$lib/config/load';
import { tryLoadBuild, type BuildObject, DEFAULT_MAX_LEVEL } from '@aotools/shared';

export async function load({ url }: { url: URL }) {
	try {
		const [items, modifiers, magics, fightingStyles, config] = await Promise.all([
			apiFetch('/api/public/items'),
			apiFetch('/api/public/modifiers'),
			apiFetch('/api/public/magics'),
			apiFetch('/api/public/fighting-styles'),
			loadGameConfig()
		]);

		let initialBuild: BuildObject | null = null;
		let shortId = url.searchParams.get('shortId');

		const code = url.searchParams.get('code');
		if (code) {
			const loaded = tryLoadBuild(code);
			if (loaded) initialBuild = loaded.build;
		}

		return { items, modifiers, magics, fightingStyles, config, initialBuild, shortId };
	} catch (e: any) {
		console.error('Builder load failed:', e);
		return {
			items: [],
			modifiers: [],
			magics: [],
			fightingStyles: [],
			config: { maxLevel: DEFAULT_MAX_LEVEL, scalings: { power: 0.315, defense: 2.7, substat: 0.5, rounding: 'round' }, statRegistry: {}, buildTypes: [], playerConstraints: {}, formulas: {} },
			initialBuild: null,
			shortId: null
		};
	}
}
