import { Elysia } from 'elysia';
import { getDb } from '../db';
import { PERMISSIONS } from '@aotools/shared';
import { requirePermission } from '../middleware/adminGuard';

function denied(set: any) {
	set.status = 403;
	return { error: 'Forbidden: insufficient permissions.' };
}

export const configRoutes = new Elysia({ prefix: '/config', detail: { tags: ['Admin: Config'] } })
	.get('/', async () => {
		const db = getDb();
		const configCol = db.collection<any>('config');
		const gameConfig = await configCol.findOne({ _id: 'game-config' }, { projection: { _id: 0 } });
		const formulas = await configCol.findOne({ _id: 'formulas' }, { projection: { _id: 0 } });
		return { gameConfig: gameConfig ?? {}, formulas: formulas ?? {} };
	}, {
		beforeHandle(ctx: any) {
			if (!requirePermission(ctx.auth, PERMISSIONS.CONFIG_READ)) return denied(ctx.set);
		}
	})
	.put('/game-config', async ({ body }: { body: any }) => {
		const db = getDb();
		await db.collection<any>('config').replaceOne({ _id: 'game-config' }, { _id: 'game-config', ...body }, { upsert: true });
		return { success: true };
	}, {
		beforeHandle(ctx: any) {
			if (!requirePermission(ctx.auth, PERMISSIONS.CONFIG_WRITE)) return denied(ctx.set);
		}
	})
	.put('/formulas', async ({ body }: { body: any }) => {
		const db = getDb();
		await db.collection<any>('config').replaceOne({ _id: 'formulas' }, { _id: 'formulas', ...body }, { upsert: true });
		return { success: true };
	}, {
		beforeHandle(ctx: any) {
			if (!requirePermission(ctx.auth, PERMISSIONS.FORMULAS_WRITE)) return denied(ctx.set);
		}
	});
