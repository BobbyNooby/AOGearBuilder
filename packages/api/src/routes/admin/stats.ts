import { Elysia } from 'elysia';
import { getDb } from '../../db';
import { PERMISSIONS } from '@aotools/shared';
import { requirePermission } from '../../middleware/adminGuard';

export const statsRoutes = new Elysia({ prefix: '/stats' }).onBeforeHandle((ctx: any) => {
	if (!requirePermission(ctx.auth, PERMISSIONS.STATS_READ)) {
		ctx.set.status = 403;
		return { error: 'Forbidden: insufficient permissions.' };
	}
}).get('/', async () => {
	const db = getDb();
	const [users, apiKeys, internalKeys, items, modifiers] = await Promise.all([
		db.collection('user').countDocuments(),
		db.collection('apiKeys').countDocuments(),
		db.collection('internalKeys').countDocuments(),
		db.collection('items').countDocuments(),
		db.collection('modifiers').countDocuments()
	]);

	return { users, apiKeys, internalKeys, items, modifiers };
});
