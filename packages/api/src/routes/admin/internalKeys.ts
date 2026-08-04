import { Elysia } from 'elysia';
import { getDb } from '../../db';
import type { AuthContext } from '../../middleware/types';
import { PERMISSIONS } from '@aotools/shared';
import { guardResource } from '../../middleware/adminGuard';

function generateKey() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = 'aoi_';
	for (let i = 0; i < 32; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

export const internalKeyRoutes = new Elysia({ prefix: '/internal-keys', detail: { tags: ['Admin: Platform'] } }).onBeforeHandle((ctx: any) =>
	guardResource(ctx.auth, ctx.request, ctx.set, {
		read: PERMISSIONS.INTERNAL_KEYS_READ,
		write: PERMISSIONS.INTERNAL_KEYS_WRITE
	})
)
	.get('/', async () => {
		const db = getDb();
		const docs = await db.collection('internalKeys').find({}, { projection: { keyHash: 0 } }).toArray();
		return docs.map((doc) => ({ id: doc._id.toString(), ...doc, _id: undefined }));
	})
	.post('/', async (ctx: any) => {
		const { body, auth, set }: { body: any; auth: AuthContext; set: any } = ctx;
		const db = getDb();
		const label = body.label?.trim();

		if (!label) {
			set.status = 400;
			return { error: 'label is required' };
		}

		const key = generateKey();
		const keyHash = await Bun.password.hash(key);

		const createdBy =
			auth.type === 'session'
				? auth.user.id
				: auth.type === 'apiKey'
					? auth.keyId
					: 'internal';

		const result = await db.collection('internalKeys').insertOne({
			keyHash,
			keyPrefix: key.slice(-4),
			label,
			active: true,
			createdBy,
			createdAt: new Date()
		});

		set.status = 201;
		return { id: result.insertedId.toString(), key, label, active: true };
	})
	.patch('/:id', async ({ params: { id }, body, set }: { params: { id: string }; body: any; set: any }) => {
		const db = getDb();
		const { ObjectId } = await import('mongodb');
		const updates: any = {};
		if (body.label !== undefined) updates.label = body.label.trim();
		if (body.active !== undefined) updates.active = Boolean(body.active);

		const result = await db.collection('internalKeys').updateOne(
			{ _id: new ObjectId(id) },
			{ $set: updates }
		);
		if (result.matchedCount === 0) {
			set.status = 404;
			return { error: 'Key not found' };
		}
		return { success: true };
	})
	.delete('/:id', async ({ params: { id }, set }: { params: { id: string }; set: any }) => {
		const db = getDb();
		const { ObjectId } = await import('mongodb');
		const result = await db.collection('internalKeys').deleteOne({ _id: new ObjectId(id) });
		if (result.deletedCount === 0) {
			set.status = 404;
			return { error: 'Key not found' };
		}
		return { success: true };
	});
