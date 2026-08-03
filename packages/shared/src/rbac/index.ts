export const PERMISSIONS = {
	ADMIN_PANEL: 'admin',
	ITEMS_READ: 'items.read',
	ITEMS_WRITE: 'items.write',
	MODIFIERS_READ: 'modifiers.read',
	MODIFIERS_WRITE: 'modifiers.write',
	CONFIG_READ: 'config.read',
	CONFIG_WRITE: 'config.write',
	FORMULAS_READ: 'formulas.read',
	FORMULAS_WRITE: 'formulas.write',
	USERS_READ: 'users.read',
	USERS_WRITE: 'users.write',
	ROLES_READ: 'roles.read',
	ROLES_WRITE: 'roles.write',
	KEYS_READ: 'keys.read',
	KEYS_WRITE: 'keys.write',
	INTERNAL_KEYS_READ: 'internalKeys.read',
	INTERNAL_KEYS_WRITE: 'internalKeys.write',
	ADMIN_IDS_READ: 'adminIds.read',
	ADMIN_IDS_WRITE: 'adminIds.write',
	STATS_READ: 'stats.read',
	BUILDS_READ: 'builds.read',
	BUILDS_WRITE: 'builds.write',
	REPORTS_READ: 'reports.read',
	REPORTS_WRITE: 'reports.write',
	BAN: 'ban',
	LIMIT: 'limit'
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSIONS = Object.values(PERMISSIONS);

export const ROLE_PERMISSIONS: Record<string, string[]> = {
	admin: ['*'],
	moderator: [
		PERMISSIONS.ADMIN_PANEL,
		PERMISSIONS.ITEMS_READ,
		PERMISSIONS.ITEMS_WRITE,
		PERMISSIONS.MODIFIERS_READ,
		PERMISSIONS.MODIFIERS_WRITE,
		PERMISSIONS.CONFIG_READ,
		PERMISSIONS.CONFIG_WRITE,
		PERMISSIONS.FORMULAS_READ,
		PERMISSIONS.FORMULAS_WRITE,
		PERMISSIONS.USERS_READ,
		PERMISSIONS.STATS_READ,
		PERMISSIONS.REPORTS_READ,
		PERMISSIONS.REPORTS_WRITE
	],
	editor: [
		PERMISSIONS.ITEMS_READ,
		PERMISSIONS.ITEMS_WRITE,
		PERMISSIONS.MODIFIERS_READ,
		PERMISSIONS.MODIFIERS_WRITE,
		PERMISSIONS.CONFIG_READ,
		PERMISSIONS.CONFIG_WRITE,
		PERMISSIONS.FORMULAS_READ,
		PERMISSIONS.FORMULAS_WRITE
	],
	user: [PERMISSIONS.BUILDS_READ, PERMISSIONS.BUILDS_WRITE]
};

export function hasPermission(permissions: string[], permission: string): boolean {
	const normalized = permission.replace(/:/g, '.');
	const granted = permissions.map((s) => s.replace(/:/g, '.'));
	if (granted.includes('*')) return true;
	if (granted.includes(normalized)) return true;
	const parts = normalized.split('.');
	for (let i = 1; i < parts.length; i++) {
		const wildcard = `${parts.slice(0, i).join('.')}.*`;
		if (granted.includes(wildcard)) return true;
	}
	return false;
}

export function hasAnyPermission(permissions: string[], permissionList: string[]): boolean {
	return permissionList.some((p) => hasPermission(permissions, p));
}

export function getPermissionsFromRoles(roleIds: string[], roles: { _id: string; permissions: string[] }[]): string[] {
	const set = new Set<string>();
	for (const id of roleIds) {
		const role = roles.find((r) => r._id === id);
		if (role) {
			for (const p of role.permissions) set.add(p);
		}
	}
	return Array.from(set);
}

export function canAccessAdmin(permissions: string[]): boolean {
	return hasPermission(permissions, PERMISSIONS.ADMIN_PANEL);
}

export function canManageUsers(permissions: string[]): boolean {
	return hasPermission(permissions, PERMISSIONS.USERS_WRITE);
}

export function canManageRoles(permissions: string[]): boolean {
	return hasPermission(permissions, PERMISSIONS.ROLES_WRITE);
}

export function canManageKeys(permissions: string[]): boolean {
	return hasPermission(permissions, PERMISSIONS.KEYS_WRITE);
}

export function canManageInternalKeys(permissions: string[]): boolean {
	return hasPermission(permissions, PERMISSIONS.INTERNAL_KEYS_WRITE);
}

export function canManageAdminIds(permissions: string[]): boolean {
	return hasPermission(permissions, PERMISSIONS.ADMIN_IDS_WRITE);
}
