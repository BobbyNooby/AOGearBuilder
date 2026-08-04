import { Elysia } from 'elysia';
import { getDb } from '../db';

export const publicRoutes = new Elysia({ prefix: '/public', detail: { tags: ['Public'] } })
	.get('/items', async ({ query }) => {
		const db = getDb();
		const filters: Record<string, any> = {};
		if (query.ids) filters.id = { $in: query.ids.split(',') };
		if (query.types) filters.type = { $in: query.types.split(',') };
		if (query.names) filters.name = { $in: query.names.split(',') };

		const items = await db
			.collection('items')
			.find(filters, { projection: { _id: 0 } })
			.toArray();
		return items;
	})
	.get('/items/:id', async ({ params: { id } }) => {
		const db = getDb();
		const item = await db.collection('items').findOne({ id }, { projection: { _id: 0 } });
		if (!item) return { error: 'Item not found' };
		return item;
	})
	.get('/magics', async () => {
		const db = getDb();
		return await db.collection('magics').find({}, { projection: { _id: 0 } }).toArray();
	})
	.get('/magics/:id', async ({ params: { id } }) => {
		const db = getDb();
		const magic = await db.collection('magics').findOne({ id }, { projection: { _id: 0 } });
		if (!magic) return { error: 'Magic not found' };
		return magic;
	})
	.get('/fighting-styles', async () => {
		const db = getDb();
		return await db.collection('fightingStyles').find({}, { projection: { _id: 0 } }).toArray();
	})
	.get('/fighting-styles/:id', async ({ params: { id } }) => {
		const db = getDb();
		const fs = await db.collection('fightingStyles').findOne({ id }, { projection: { _id: 0 } });
		if (!fs) return { error: 'Fighting style not found' };
		return fs;
	})
	.get('/config', async () => {
		const db = getDb();
		const configCol = db.collection<any>('config');
		const config = await configCol.findOne({ _id: 'game-config' }, { projection: { _id: 0 } });
		const formulas = await configCol.findOne({ _id: 'formulas' }, { projection: { _id: 0 } });
		return { config: config ?? {}, formulas: formulas ?? {} };
	})
	.get('/modifiers', async () => {
		const db = getDb();
		const modCol = db.collection<any>('modifiers');
		const docs = await modCol.find({}, { projection: { _id: 0 } }).toArray();
		return docs.map((doc) => ({ id: doc._id ?? doc.id, ...doc }));
	})
	.get('/modifiers/:id', async ({ params: { id } }) => {
		const db = getDb();
		const modCol = db.collection<any>('modifiers');
		const doc = await modCol.findOne({ $or: [{ _id: id }, { id }] }, { projection: { _id: 0 } });
		if (!doc) return { error: 'Modifier not found' };
		return { id: doc._id ?? doc.id, ...doc };
	});
