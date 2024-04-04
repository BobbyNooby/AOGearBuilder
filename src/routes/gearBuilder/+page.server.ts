import db, { filterCollection } from '$lib/dbHandler';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (): Promise<any> => {
	const data = await db
		.collection('test')
		.find({}, { projection: { _id: 0 } })
		.toArray();
	console.log(data);
	return {
		Accessory: filterCollection(data, 'Accessory'),
		Chestplate: filterCollection(data, 'Chestplate'),
		Pants: filterCollection(data, 'Pants'),
		Enchant: filterCollection(data, 'Enchant'),
		Gem: filterCollection(data, 'Gem'),
		Modifier: filterCollection(data, 'Modifier')
	};
};
