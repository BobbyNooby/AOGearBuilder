import db from '$lib/dbHandler';
import type { anyItem } from '$lib/gearBuilder/itemTypes.js';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

let itemsDB = db.collection<anyItem>('items');

async function verifySession(session: any) {
	if (session == null) {
		return fail(403, { error: 'Not logged in' });
	}

	let sessionobj = await db.collection('users').findOne({ id: session.user.id });
	console.log(sessionobj);
	if (sessionobj != null && sessionobj.permissions.database == true) {
		return true;
	}
	return fail(403, { error: 'No database access' });
}

const maxIdGen = 100;
const idLength: number = 3;

const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function getRandomId() {
	let id: string = '';
	for (let i = 0; i < idLength; i++) {
		id += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return id;
}

function checkAttributes(item: anyItem) {
	let attributes = ['id', 'name', 'legend', 'mainType', 'rarity', 'imageId', 'deleted'];

	for (let attribute of attributes) {
		if (!(attribute in item)) {
			return attribute;
		}
	}

	return true;
}

export async function load({ fetch, setHeaders }) {
	const data = await itemsDB
		.find(
			{ deleted: false },
			{
				projection: {
					_id: 0
				}
			}
		)
		.toArray();

	return {
		items: data
	};
}

/*

example data:

itemData: {"id":"","name":"Test","legend":"This is for testing","mainType":"Chestplate","rarity":"Legendary","imageId":"https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/unknown.jpg", "deleted":false,"subType":"Magic","gemNo":2,"statsPerLevel":[{"level":70,"power":1,"attackSpeed":10},{"level":80,"power":2,"attackSpeed":20},{"level":90,"power":3,"attackSpeed":30},{"level":100,"power":4,"attackSpeed":40},{"level":110,"power":5,"attackSpeed":50},{"level":120,"power":6,"attackSpeed":60}],"validModifiers":["Atlantean Essence","Frozen","Superheated","Blasted"]}
name: Test
rarity: Legendary
mainType: Chestplate
subType: Magic
gemNo: 2
minLevel: 70
maxLevel: 120
legend: This is for testing
imageId: https://raw.githubusercontent.com/BobbyNooby/AOGearBuilder/master/static/assets/images/unknown.jpg

*/

export const actions = {
	create: async (event) => {
		let session = await event.locals.auth();
		let validSession = await verifySession(session);
		if (validSession != true) {
			return validSession;
		}

		const formData = await event.request.formData();

		let item: anyItem = JSON.parse(formData.get('itemData') as string);

		// do validating checks
		let validAttributes = checkAttributes(item);
		if (validAttributes != true) {
			return fail(403, { error: `Missing ${validAttributes}` });
		}

		let newId = getRandomId();
		let generatedIds = 0;

		while (await itemsDB.findOne({ id: newId }, { projection: { _id: 0, id: 1 } })) {
			newId = getRandomId();
			generatedIds += 1;
			if (generatedIds > maxIdGen) {
				return fail(403, {
					error:
						'Something has gone wrong. Reached max IDs generated. The database maybe full please contact a developer.'
				});
			}
		}
		item.id = newId;

		await db.collection('items').insertOne(item);
	},
	edit: async (event) => {
		let session = await event.locals.auth();
		let validSession = await verifySession(session);
		if (validSession != true) {
			return validSession;
		}

		const formData = await event.request.formData();

		let item: anyItem = JSON.parse(formData.get('itemData') as string);

		// do validating checks
		let validAttributes = checkAttributes(item);
		if (validAttributes != true) {
			return fail(403, { error: `Missing ${validAttributes}` });
		}

		await db.collection('items').updateOne({ id: item.id }, { $set: item });
	}
} satisfies Actions;
