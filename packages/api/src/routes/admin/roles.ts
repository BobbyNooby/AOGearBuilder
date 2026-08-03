import { Elysia } from 'elysia';
import { getDb } from '../../db';
import { PERMISSIONS } from '@aotools/shared';
import { guardResource } from '../../middleware/adminGuard';

const ALLOWED_ID_RE = /^[a-z0-9-]+$/;

export const roleRoutes = new Elysia({ prefix: '/roles' }).onBeforeHandle((ctx: any) =>
	guardResource(ctx.auth, ctx.request, ctx.set, {
		read: PERMISSIONS.ROLES_READ,
		write: PERMISSIONS.ROLES_WRITE
	})
)
	.get('/', async () => {
		const db = getDb();
		const docs = await db.collection<any>('roles').find().toArray();
		return docs.map((doc) => ({
			id: doc._id,
			name: doc.name,
			description: doc.description,
			color: doc.color,
			permissions: doc.permissions ?? [],
			system: doc.system === true,
			createdAt: doc.createdAt
		}));
	})
	.post('/', async (ctx: any) => {
		const { body, set } = ctx;
		const db = getDb();
		const id = String(body.id ?? '').trim().toLowerCase();
		const name = String(body.name ?? '').trim();
		const description = String(body.description ?? '').trim();
		const color = String(body.color ?? '').trim();
		const permissions = Array.isArray(body.permissions) ? body.permissions.filter((p: any) => typeof p === 'string') : [];

		if (!id || !ALLOWED_ID_RE.test(id)) {
			set.status = 400;
			return { error: 'Role id is required and must be lowercase letters, numbers, or dashes.' };
		}
		if (!name) {
			set.status = 400;
			return { error: 'Role name is required.' };
		}

		const existing = await db.collection<any>('roles').findOne({ _id: id });
		if (existing) {
			set.status = 409;
			return { error: 'Role already exists.' };
		}

		await db.collection<any>('roles').insertOne({
			_id: id,
			name,
			description,
			color,
			permissions,
			system: false,
			createdAt: new Date()
		});

		set.status = 201;
		return { id, name, description, color, permissions, system: false };
	})
	.patch('/:id', async (ctx: any) => {
		const { params: { id }, body, set } = ctx;
		const db = getDb();
		const existing = await db.collection<any>('roles').findOne({ _id: id });
		if (!existing) {
			set.status = 404;
			return { error: 'Role not found.' };
		}
		if (existing.system === true) {
			set.status = 403;
			return { error: 'Cannot modify a system role.' };
		}

		const updates: any = {};
		if (body.name !== undefined) updates.name = String(body.name ?? '').trim();
		if (body.description !== undefined) updates.description = String(body.description ?? '').trim();
		if (body.color !== undefined) updates.color = String(body.color ?? '').trim();
		if (body.permissions !== undefined) {
			updates.permissions = Array.isArray(body.permissions)
				? body.permissions.filter((p: any) => typeof p === 'string')
				: [];
		}

		await db.collection<any>('roles').updateOne({ _id: id }, { $set: updates });
		return { success: true };
	})
	.delete('/:id', async (ctx: any) => {
		const { params: { id }, set } = ctx;
		const db = getDb();
		const existing = await db.collection<any>('roles').findOne({ _id: id });
		if (!existing) {
			set.status = 404;
			return { error: 'Role not found.' };
		}
		if (existing.system === true) {
			set.status = 403;
			return { error: 'Cannot delete a system role.' };
		}

		await db.collection<any>('roles').deleteOne({ _id: id });
		await db.collection('user').updateMany({ roles: id }, { $pull: { roles: id } });
		return { success: true };
	});