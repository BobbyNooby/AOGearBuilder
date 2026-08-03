import type { AuthContext } from './types';
import { hasPermission, PERMISSIONS } from '@aotools/shared';

export function checkAdmin(auth: AuthContext): boolean {
	return requirePermission(auth, PERMISSIONS.ADMIN_PANEL);
}

export function requirePermission(auth: AuthContext, permission: string): boolean {
	if (auth.type === 'internal') return true;
	if (auth.type === 'apiKey') return hasPermission(auth.scopes, permission);
	if (auth.type === 'session') return hasPermission(auth.permissions, permission);
	return false;
}

export function guardResource(
	auth: AuthContext,
	request: Request,
	set: any,
	resource: { read: string; write: string }
): { error: string } | undefined {
	if (auth.type === 'internal') return undefined;
	const isWrite = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method);
	const required = isWrite ? resource.write : resource.read;
	if (!requirePermission(auth, required)) {
		set.status = 403;
		return { error: 'Forbidden: insufficient permissions.' };
	}
	return undefined;
}
