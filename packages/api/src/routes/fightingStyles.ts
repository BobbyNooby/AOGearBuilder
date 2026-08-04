import { Elysia } from 'elysia';
import { getDb } from '../db';
import { PERMISSIONS } from '@aotools/shared';
import { guardResource } from '../middleware/adminGuard';

export const fightingStyleRoutes = new Elysia({ prefix: '/fighting-styles', detail: { tags: ['Admin: Fighting Styles'] } }).onBeforeHandle((ctx: any) =>
	guardResource(ctx.auth, ctx.request, ctx.set, {
		read: PERMISSIONS.ITEMS_READ,
		write: PERMISSIONS.ITEMS_WRITE
	})
)
	.get('/', async () => {
		const db = getDb();
		return await db.collection('fightingStyles').find({}, { projection: { _id: 0 } }).toArray();
	})
	.post('/', async ({ body, set }: { body: any; set: any }) => {
		const db = getDb();
		if (!body.id) {
			set.status = 400;
			return { error: 'id is required' };
		}
		const existing = await db.collection('fightingStyles').findOne({ id: body.id });
		if (existing) {
			set.status = 409;
			return { error: 'Fighting style already exists' };
		}
		await db.collection('fightingStyles').insertOne(body);
		set.status = 201;
		return body;
	})
	.put('/:id', async ({ params: { id }, body, set }: { params: { id: string }; body: any; set: any }) => {
		const db = getDb();
		const result = await db.collection('fightingStyles').replaceOne({ id }, body);
		if (result.matchedCount === 0) {
			set.status = 404;
			return { error: 'Fighting style not found' };
		}
		return body;
	})
	.delete('/:id', async ({ params: { id }, set }: { params: { id: string }; set: any }) => {
		const db = getDb();
		const result = await db.collection('fightingStyles').deleteOne({ id });
		if (result.deletedCount === 0) {
			set.status = 404;
			return { error: 'Fighting style not found' };
		}
		return { success: true };
	});
