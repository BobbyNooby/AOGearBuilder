import { apiFetch } from '$lib/api';
import type { GameConfig } from '@aotools/shared';

export async function loadGameConfig(): Promise<GameConfig> {
	const data = await apiFetch('/api/public/config');
	return {
		...(data.config ?? {}),
		formulas: data.formulas ?? {}
	};
}
