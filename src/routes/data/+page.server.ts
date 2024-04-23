import db from '$lib/dbHandler';
import type { anyItem } from '$lib/gearBuilder/itemTypes.js';

export async function load({ fetch, setHeaders }) {

    const data = await db.collection<anyItem>("items").find({}, {projection: {
		_id: 0
	}}).toArray();


	return {
		items: data
	}
}