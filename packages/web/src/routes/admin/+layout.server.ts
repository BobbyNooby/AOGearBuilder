import { redirect } from '@sveltejs/kit';
import { hasAnyPermission, PERMISSIONS } from '@aotools/shared';

export async function load({ parent }) {
	const data = await parent();
	const permissions = data.permissions ?? [];
	const user = data.user;

	if (!user) {
		redirect(307, '/');
	}

	const canAccess = hasAnyPermission(permissions, [
		PERMISSIONS.ADMIN_PANEL,
		PERMISSIONS.ITEMS_READ,
		PERMISSIONS.MODIFIERS_READ,
		PERMISSIONS.CONFIG_READ,
		PERMISSIONS.FORMULAS_READ,
		PERMISSIONS.USERS_READ,
		PERMISSIONS.ROLES_READ,
		PERMISSIONS.KEYS_READ,
		PERMISSIONS.INTERNAL_KEYS_READ,
		PERMISSIONS.ADMIN_IDS_READ
	]);

	if (!canAccess) {
		redirect(307, '/');
	}

	return { user, permissions };
}
