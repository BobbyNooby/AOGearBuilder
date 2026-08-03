import { Elysia } from 'elysia';
import { getDb } from '../db';
import { generateUniqueId } from '../lib/itemIds';
import { PERMISSIONS } from '@aotools/shared';
import { guardResource } from '../middleware/adminGuard';

export const modifierRoutes = new Elysia({ prefix: '/modifiers' }).onBeforeHandle((ctx: any) =>
	guardResource(ctx.auth, ctx.request, ctx.set, {
		read: PERMISSIONS.MODIFIERS_READ,
		write: PERMISSIONS.MODIFIERS_WRITE
	})
)
	.get('/', async () => {
		const db = getDb();
		const modCol = db.collection<any>('modifiers');
		const docs = await modCol.find({}, { projection: { _id: 0 } }).toArray();
		return docs.map((doc) => ({ id: doc._id ?? doc.id, ...doc }));
	})
	.post('/', async ({ body, set }: { body: any; set: any }) => {
		const db = getDb();
		const modCol = db.collection<any>('modifiers');
		const id = body.id || (await generateUniqueId(['items', 'modifiers']));
		const existing = await modCol.findOne({ $or: [{ _id: id }, { id }] });
		if (existing) {
			set.status = 409;
			return { error: 'Modifier already exists' };
		}
		const { id: _id, ...rest } = body;
		await modCol.insertOne({ _id: id, id, ...rest });
		set.status = 201;
		return { id, ...rest };
	})
	.put('/:id', async ({ params: { id }, body, set }: { params: { id: string }; body: any; set: any }) => {
		const db = getDb();
		const { id: _id, ...rest } = body;
		const result = await db.collection<any>('modifiers').replaceOne({ _id: id }, { _id: id, ...rest });
		if (result.matchedCount === 0) {
			set.status = 404;
			return { error: 'Modifier not found' };
		}
		return body;
	})
	.delete('/:id', async ({ params: { id }, set }: { params: { id: string }; set: any }) => {
		const db = getDb();
		const result = await db.collection<any>('modifiers').deleteOne({ _id: id });
		if (result.deletedCount === 0) {
			set.status = 404;
			return { error: 'Modifier not found' };
		}
		return { success: true };
	});
