import db, { filterCollection, readOnlyClient } from '$lib/dbHandler';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (): Promise<any> => {
	const data = await db
		.collection('items-test')
		.find({ deleted: false }, { projection: { _id: 0 } })
		.toArray();

	const config = await db
		.collection('config')
		.findOne({ name: 'config' }, { projection: { _id: 0 } });

	// Readonly testing
	// const data = await readOnlyClient
	// 	.collection('items')
	// 	.find({}, { projection: { _id: 0 } })
	// 	.toArray();

	return {
		Database: data,
		config: config
	};
};
