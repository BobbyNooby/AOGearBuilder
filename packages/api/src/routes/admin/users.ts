import { Elysia } from 'elysia';
import { getDb } from '../../db';
import { PERMISSIONS } from '@aotools/shared';
import { guardResource } from '../../middleware/adminGuard';

export const userRoutes = new Elysia({ prefix: '/users' }).onBeforeHandle((ctx: any) =>
	guardResource(ctx.auth, ctx.request, ctx.set, {
		read: PERMISSIONS.USERS_READ,
		write: PERMISSIONS.USERS_WRITE
	})
)
	.get('/', async () => {
		const db = getDb();
		const users = await db.collection<any>('user').find().toArray();
		const accounts = await db.collection<any>('account').find().toArray();
		const roles = await db.collection<any>('roles').find().toArray();
		const roleMap = new Map(roles.map((r) => [r._id, r]));

		return users.map((user: any) => {
			const id = user._id.toString();
			const roleIds = Array.isArray(user.roles) ? user.roles : [user.role ?? 'user'];
			return {
				id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified,
				image: user.image,
				roles: roleIds,
				roleDetails: roleIds.map((rid: string) => {
					const r = roleMap.get(rid);
					return { id: rid, name: r?.name ?? rid, color: r?.color ?? '' };
				}),
				createdAt: user.createdAt,
				accounts: accounts
					.filter((a: any) => a.userId === id)
					.map((a: any) => ({ provider: a.providerId, accountId: a.accountId }))
			};
		});
	})
	.patch('/:id', async (ctx: any) => {
		const { params: { id }, body, set } = ctx;
		const db = getDb();
		const { ObjectId } = await import('mongodb');

		if (!Array.isArray(body.roles)) {
			set.status = 400;
			return { error: 'roles array is required' };
		}

		const roles = body.roles.map((r: any) => String(r).trim()).filter(Boolean);
		const found = await db.collection<any>('roles').countDocuments({ _id: { $in: roles } });
		if (found !== roles.length) {
			set.status = 400;
			return { error: 'one or more roles do not exist' };
		}

		const update: any = { roles };
		if (roles.length > 0) update.role = roles[0];

		const result = await db.collection<any>('user').updateOne(
			{ _id: new ObjectId(id) },
			{ $set: update }
		);

		if (result.matchedCount === 0) {
			set.status = 404;
			return { error: 'User not found' };
		}

		return { success: true };
	});