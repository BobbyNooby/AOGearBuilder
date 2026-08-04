import { Home, Cog, FileText, Package, Settings, Library } from 'lucide-svelte';
import { hasAnyPermission, PERMISSIONS } from '@aotools/shared';

export const appLinks = [
	{ href: '/', label: 'Home', icon: Home, desc: 'Project overview and tools' },
	{ href: '/builder', label: 'Gear Builder', icon: Cog, desc: 'Design and share your gear builds' },
	{ href: '/atlas', label: 'Atlas', icon: Library, desc: 'Browse and search all items' },
	{ href: '/api-docs', label: 'API Docs', icon: FileText, desc: 'Public API reference for developers' }
] as const;

const adminLinkData = [
	{ href: '/admin', label: 'Game Data', icon: Package, desc: 'Manage items, modifiers, and config' },
	{ href: '/admin/platform', label: 'Platform', icon: Settings, desc: 'Manage users, roles, and API keys' }
] as const;

export function getAdminLinks(permissions: string[]) {
	const links: typeof adminLinkData[number][] = [];
	if (
		hasAnyPermission(permissions, [
			PERMISSIONS.ITEMS_READ,
			PERMISSIONS.MODIFIERS_READ,
			PERMISSIONS.CONFIG_READ,
			PERMISSIONS.FORMULAS_READ
		])
	) {
		links.push(adminLinkData[0]);
	}
	if (
		hasAnyPermission(permissions, [
			PERMISSIONS.ADMIN_PANEL,
			PERMISSIONS.USERS_READ,
			PERMISSIONS.ROLES_READ,
			PERMISSIONS.KEYS_READ,
			PERMISSIONS.INTERNAL_KEYS_READ,
			PERMISSIONS.ADMIN_IDS_READ
		])
	) {
		links.push(adminLinkData[1]);
	}
	return links;
}

export function hasAdminAccess(permissions: string[]): boolean {
	return getAdminLinks(permissions).length > 0;
}
