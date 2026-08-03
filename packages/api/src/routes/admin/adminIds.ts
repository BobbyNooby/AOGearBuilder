import { Elysia } from 'elysia';
import { getDb } from '../../db';
import type { AuthContext } from '../../middleware/types';
import { PERMISSIONS } from '@aotools/shared';
import { guardResource } from '../../middleware/adminGuard';

export const adminIdRoutes = new Elysia({ prefix: '/admin-ids' }).onBeforeHandle((ctx: any) =>
	guardResource(ctx.auth, ctx.request, ctx.set, {
		read: PERMISSIONS.ADMIN_IDS_READ,
		write: PERMISSIONS.ADMIN_IDS_WRITE
	})
)
	.get('/', async () => {
		const db = getDb();
		const docs = await db.collection<any>('adminIds').find().toArray();
		return docs.map((doc) => ({
			id: doc._id.toString(),
			addedAt: doc.addedAt,
			addedBy: doc.addedBy
		}));
	})
	.post('/', async (ctx: any) => {
		const { body, auth, set }: { body: any; auth: AuthContext; set: any } = ctx;
		const db = getDb();
		const accountId = body.accountId?.trim();
		if (!accountId) {
			set.status = 400;
			return { error: 'accountId is required' };
		}

		const addedBy =
			auth.type === 'session'
				? auth.user.id
				: auth.type === 'apiKey'
					? auth.keyId
					: 'internal';

		await db.collection<any>('adminIds').replaceOne(
			{ _id: accountId },
			{ _id: accountId, addedAt: new Date(), addedBy },
			{ upsert: true }
		);

		return { success: true, accountId };
	})
	.delete('/:id', async ({ params: { id }, set }: { params: { id: string }; set: any }) => {
		const db = getDb();
		const result = await db.collection<any>('adminIds').deleteOne({ _id: id });
		if (result.deletedCount === 0) {
			set.status = 404;
			return { error: 'Admin ID not found' };
		}
		return { success: true };
	});
