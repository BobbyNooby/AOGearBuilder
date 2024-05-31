import type { PageServerLoad } from './$types';
import db, { filterCollection } from '$lib/dbHandler';

export const load: PageServerLoad = async () => {
	const data = await db
		.collection('items')
		.find({}, { projection: { _id: 0 } })
		.toArray();

	return {
		database: data,
		Cannon: filterCollection(data, 'Cannon'),
		'Hull Armor': filterCollection(data, 'Hull Armor'),
		Deckhand: filterCollection(data, 'Deckhand'),
		Ram: filterCollection(data, 'Ram'),
		'Sail Material': filterCollection(data, 'Sail Material'),
		'Siege Weapon': filterCollection(data, 'Siege Weapon'),
		Boat: filterCollection(data, 'Boat'),
		'Ship Crew': filterCollection(data, 'Ship Crew'),
		Quartermaster: filterCollection(data, 'Quartermaster')
	};
};
