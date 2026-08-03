import { apiFetch } from '$lib/api';
import { hasPermission, PERMISSIONS } from '@aotools/shared';

export async function load({ parent }) {
	const { permissions } = await parent();

	const canReadRoles = hasPermission(permissions, PERMISSIONS.ROLES_READ);
	const canReadUsers = hasPermission(permissions, PERMISSIONS.USERS_READ);
	const canReadKeys = hasPermission(permissions, PERMISSIONS.KEYS_READ);
	const canReadInternalKeys = hasPermission(permissions, PERMISSIONS.INTERNAL_KEYS_READ);
	const canReadAdminIds = hasPermission(permissions, PERMISSIONS.ADMIN_IDS_READ);
	const canReadStats = hasPermission(permissions, PERMISSIONS.STATS_READ);

	const [roles, users, keys, internalKeys, adminIds, stats] = await Promise.all([
		canReadRoles ? apiFetch('/api/admin/roles') : [],
		canReadUsers ? apiFetch('/api/admin/users') : [],
		canReadKeys ? apiFetch('/api/admin/keys') : [],
		canReadInternalKeys ? apiFetch('/api/admin/internal-keys') : [],
		canReadAdminIds ? apiFetch('/api/admin/admin-ids') : [],
		canReadStats ? apiFetch('/api/admin/stats') : {}
	]);

	return { roles, users, keys, internalKeys, adminIds, stats, permissions };
}