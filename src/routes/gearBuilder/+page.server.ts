import db, { filterCollection, readOnlyClient } from '$lib/dbHandler';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (): Promise<any> => {
	const data = await db
		.collection('items')
		.find({}, { projection: { _id: 0 } })
		.toArray();

	// Readonly testing
	// const data = await readOnlyClient
	// 	.collection('items')
	// 	.find({}, { projection: { _id: 0 } })
	// 	.toArray();

	return {
		Database: data,
		Accessory: filterCollection(data, 'Accessory'),
		Chestplate: filterCollection(data, 'Chestplate'),
		Pants: filterCollection(data, 'Pants'),
		Enchant: filterCollection(data, 'Enchant'),
		Gem: filterCollection(data, 'Gem'),
		Modifier: filterCollection(data, 'Modifier')
	};
};
