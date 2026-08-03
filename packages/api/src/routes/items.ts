import { Elysia } from 'elysia';
import { getDb } from '../db';
import { generateItemId } from '../lib/itemIds';
import { PERMISSIONS } from '@aotools/shared';
import { guardResource } from '../middleware/adminGuard';

export const itemRoutes = new Elysia({ prefix: '/items' }).onBeforeHandle((ctx: any) =>
	guardResource(ctx.auth, ctx.request, ctx.set, {
		read: PERMISSIONS.ITEMS_READ,
		write: PERMISSIONS.ITEMS_WRITE
	})
)
	.get('/', async () => {
		const db = getDb();
		return await db.collection('items').find({}, { projection: { _id: 0 } }).toArray();
	})
	.post('/', async ({ body, set }: { body: any; set: any }) => {
		const db = getDb();
		const id = body.id || (await generateItemId());
		const existing = await db.collection('items').findOne({ id });
		if (existing) {
			set.status = 409;
			return { error: 'Item already exists' };
		}
		const item = { ...body, id };
		await db.collection('items').insertOne(item);
		set.status = 201;
		return item;
	})
	.put('/:id', async ({ params: { id }, body, set }: { params: { id: string }; body: any; set: any }) => {
		const db = getDb();
		const result = await db.collection('items').replaceOne({ id }, body);
		if (result.matchedCount === 0) {
			set.status = 404;
			return { error: 'Item not found' };
		}
		return body;
	})
	.delete('/:id', async ({ params: { id }, set }: { params: { id: string }; set: any }) => {
		const db = getDb();
		const result = await db.collection('items').deleteOne({ id });
		if (result.deletedCount === 0) {
			set.status = 404;
			return { error: 'Item not found' };
		}
		return { success: true };
	});
