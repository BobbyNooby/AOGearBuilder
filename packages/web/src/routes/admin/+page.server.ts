import { apiFetch } from '$lib/api';
import { hasPermission, PERMISSIONS } from '@aotools/shared';

export async function load({ parent }) {
	const { permissions } = await parent();

	const canReadItems = hasPermission(permissions, PERMISSIONS.ITEMS_READ);
	const canReadModifiers = hasPermission(permissions, PERMISSIONS.MODIFIERS_READ);
	const canReadConfig = hasPermission(permissions, PERMISSIONS.CONFIG_READ);
	const canReadFormulas = hasPermission(permissions, PERMISSIONS.FORMULAS_READ);
	const canReadStats = hasPermission(permissions, PERMISSIONS.STATS_READ);

	const [items, modifiers, configData, stats] = await Promise.all([
		canReadItems ? apiFetch('/api/admin/items') : [],
		canReadModifiers ? apiFetch('/api/admin/modifiers') : [],
		canReadConfig || canReadFormulas ? apiFetch('/api/admin/config') : { gameConfig: {}, formulas: {} },
		canReadStats ? apiFetch('/api/admin/stats') : {}
	]);

	return {
		items,
		modifiers,
		gameConfig: configData.gameConfig ?? {},
		formulas: configData.formulas ?? {},
		stats,
		permissions
	};
}