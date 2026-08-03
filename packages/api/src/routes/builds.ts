import { Elysia } from 'elysia';
import { getDb } from '../db';
import { generateShortId } from '../lib/shortIds';
import { getMaxBuilds } from '../lib/buildLimits';
import { requirePermission } from '../middleware/adminGuard';
import { PERMISSIONS } from '@aotools/shared';
import type { AuthContext } from '../middleware/auth';

async function getOwnerId(auth: AuthContext): Promise<string | null> {
	if (auth.type === 'session' && auth.user?.id) {
		const db = getDb();
		const account = await db.collection<any>('account').findOne({
			userId: auth.user.id,
			providerId: 'discord'
		});
		return account?.accountId ?? null;
	}
	if (auth.type === 'apiKey') {
		return auth.keyId;
	}
	return null;
}

export const buildRoutes = new Elysia({ prefix: '/builds' })
	.post('/', async (ctx: any) => {
		const { body, auth, set }: { body: any; auth: AuthContext; set: any } = ctx;
		if (!requirePermission(auth, PERMISSIONS.BUILDS_WRITE)) {
			set.status = 403;
			return { error: 'Missing builds:write scope' };
		}
		const ownerId = await getOwnerId(auth);
		if (!ownerId) {
			set.status = 401;
			return { error: 'Discord session or API key required' };
		}

		const type = body.type || 'gear';
		const count = await getDb().collection('builds').countDocuments({ ownerId, type });
		const max = await getMaxBuilds(ownerId, type);
		if (count >= max) {
			set.status = 403;
			return { error: `Build limit reached (${max})` };
		}

		const shortId = await generateShortId(10);
		const doc = {
			shortId,
			ownerId,
			type,
			name: body.name || 'Untitled build',
			build: body.build,
			isPublic: body.isPublic ?? true,
			createdAt: new Date(),
			updatedAt: new Date()
		};
		await getDb().collection('builds').insertOne(doc);
		set.status = 201;
		return { shortId };
	})
	.get('/me', async (ctx: any) => {
		const { auth, set }: { auth: AuthContext; set: any } = ctx;
		if (!requirePermission(auth, PERMISSIONS.BUILDS_READ)) {
			set.status = 403;
			return { error: 'Missing builds:read scope' };
		}
		const ownerId = await getOwnerId(auth);
		if (!ownerId) {
			set.status = 401;
			return { error: 'Discord session or API key required' };
		}
		const builds = await getDb()
			.collection('builds')
			.find({ ownerId })
			.sort({ updatedAt: -1 })
			.project({ _id: 0 })
			.toArray();
		return builds;
	})
	.get('/:shortId', async (ctx: any) => {
		const { params: { shortId }, auth, set }: { params: { shortId: string }; auth: AuthContext; set: any } = ctx;
		const doc = await getDb().collection('builds').findOne({ shortId });
		if (!doc) {
			set.status = 404;
			return { error: 'Build not found' };
		}
		if (doc.isPublic) {
			return {
				shortId: doc.shortId,
				name: doc.name,
				build: doc.build,
				isPublic: doc.isPublic,
				ownerId: doc.ownerId,
				updatedAt: doc.updatedAt
			};
		}
		if (!requirePermission(auth, PERMISSIONS.BUILDS_READ)) {
			set.status = 403;
			return { error: 'Private build' };
		}
		const ownerId = await getOwnerId(auth);
		if (doc.ownerId !== ownerId) {
			set.status = 403;
			return { error: 'Private build' };
		}
		return {
			shortId: doc.shortId,
			name: doc.name,
			build: doc.build,
			isPublic: doc.isPublic,
			ownerId: doc.ownerId,
			updatedAt: doc.updatedAt
		};
	})
	.patch('/:shortId', async (ctx: any) => {
		const { params: { shortId }, body, auth, set }: { params: { shortId: string }; body: any; auth: AuthContext; set: any } = ctx;
		if (!requirePermission(auth, PERMISSIONS.BUILDS_WRITE)) {
			set.status = 403;
			return { error: 'Missing builds:write scope' };
		}
		const ownerId = await getOwnerId(auth);
		if (!ownerId) {
			set.status = 401;
			return { error: 'Discord session or API key required' };
		}
		const db = getDb();
		const existing = await db.collection('builds').findOne({ shortId });
		if (!existing) {
			set.status = 404;
			return { error: 'Build not found' };
		}
		if (existing.ownerId !== ownerId) {
			set.status = 403;
			return { error: 'Not your build' };
		}
		const update: any = { updatedAt: new Date() };
		if (body.name !== undefined) update.name = body.name;
		if (body.build !== undefined) update.build = body.build;
		if (body.isPublic !== undefined) update.isPublic = body.isPublic;
		await db.collection('builds').updateOne({ shortId }, { $set: update });
		return { success: true };
	})
	.delete('/:shortId', async (ctx: any) => {
		const { params: { shortId }, auth, set }: { params: { shortId: string }; auth: AuthContext; set: any } = ctx;
		if (!requirePermission(auth, PERMISSIONS.BUILDS_WRITE)) {
			set.status = 403;
			return { error: 'Missing builds:write scope' };
		}
		const ownerId = await getOwnerId(auth);
		if (!ownerId) {
			set.status = 401;
			return { error: 'Discord session or API key required' };
		}
		const db = getDb();
		const existing = await db.collection('builds').findOne({ shortId });
		if (!existing) {
			set.status = 404;
			return { error: 'Build not found' };
		}
		if (existing.ownerId !== ownerId) {
			set.status = 403;
			return { error: 'Not your build' };
		}
		await db.collection('builds').deleteOne({ shortId });
		return { success: true };
	});
