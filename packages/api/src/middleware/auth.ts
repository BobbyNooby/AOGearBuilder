import { auth } from '../auth';
import { getDb } from '../db';
import { config } from '../config';
import { validateInternalKey } from '../lib/internalKeys';
import { getPermissionsFromRoles } from '@aotools/shared';
import type { AuthContext } from './types';

export type { AuthContext } from './types';

async function validateApiKey(key: string): Promise<AuthContext | null> {
	const db = getDb();
	const col = db.collection<any>('apiKeys');
	const prefix = key.slice(-4);
	const docs = await col.find({ active: true, keyPrefix: prefix }).toArray();

	for (const doc of docs) {
		const ok = await Bun.password.verify(key, doc.keyHash);
		if (ok) {
			await col.updateOne({ _id: doc._id }, { $set: { lastUsedAt: new Date() } });
			return {
				type: 'apiKey',
				keyId: doc._id.toString(),
				scopes: doc.scopes ?? ['read'],
				rateLimit: doc.rateLimit ?? 60
			};
		}
	}
	return null;
}

export async function resolveAuth(request: Request, headers: Record<string, string | undefined>): Promise<AuthContext> {
	const internalKey = headers['x-internal-key'];
	if (typeof internalKey === 'string' && internalKey) {
		const isInternal = await validateInternalKey(internalKey);
		if (isInternal) {
			return { type: 'internal', scopes: ['*'], rateLimit: null };
		}
	}

	const apiKey = headers['x-api-key'];
	if (typeof apiKey === 'string' && apiKey) {
		const ctx = await validateApiKey(apiKey);
		if (ctx) return ctx;
		return { type: 'invalidApiKey' };
	}

	try {
		const session = await auth.api.getSession({ headers: request.headers });
		console.log('[resolveAuth] cookie header:', request.headers.get('cookie'));
		console.log('[resolveAuth] session:', session);
		if (session?.user) {
			const userId = session.user.id;
			const db = getDb();
			const { ObjectId } = await import('mongodb');
			const userDoc = await db
				.collection<any>('user')
				.findOne({ _id: new ObjectId(userId) }, { projection: { roles: 1 } });
			const roleIds = Array.isArray(userDoc?.roles) ? userDoc.roles : ['user'];
			const roleDocs = await db
				.collection<any>('roles')
				.find({ _id: { $in: roleIds } })
				.toArray();
			const permissions = getPermissionsFromRoles(
				roleIds,
				roleDocs.map((r: any) => ({ _id: String(r._id), permissions: r.permissions ?? [] }))
			);
			return {
				type: 'session',
				user: session.user,
				roles: roleIds,
				permissions
			};
		}
	} catch (err) {
		console.log('[resolveAuth] getSession error:', err);
	}

	return { type: 'public' };
}
