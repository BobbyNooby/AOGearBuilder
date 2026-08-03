import type { AuthContext } from './types';
import type { RateLimitStore } from '../rate-limit';
import { hasPermission } from '@aotools/shared';

const WINDOW_MS = 60_000;

function getClientIp(request: Request): string {
	return (
		request.headers.get('cf-connecting-ip') ??
		request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
		request.headers.get('x-real-ip') ??
		'unknown'
	);
}

export function rateLimitKey(auth: AuthContext, request: Request): { key: string; max: number } | null {
	if (auth.type === 'internal') return null;
	if (auth.type === 'session' && hasPermission(auth.permissions, 'admin')) return null;

	if (auth.type === 'apiKey') {
		return { key: `key:${auth.keyId}`, max: auth.rateLimit };
	} else if (auth.type === 'session') {
		return { key: `session:${auth.user.id}`, max: 60 };
	} else {
		return { key: `ip:${getClientIp(request)}`, max: 6 };
	}
}

export async function checkRateLimit(
	auth: AuthContext,
	request: Request,
	store: RateLimitStore
): Promise<{ allowed: boolean; retryAfter?: number }> {
	const limit = rateLimitKey(auth, request);
	if (!limit) return { allowed: true };
	return store.check(limit.key, limit.max, WINDOW_MS);
}
