import db from '$lib/dbHandler';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { anyItem } from '$lib/utils/itemTypes';

let itemsDB = db.collection<anyItem>('items-test');
let configDB = db.collection<any>('config');
let usersDB = db.collection<any>('users');

async function verifySession(session: any, permissions: any[]) {
	if (session == null) {
		return fail(403, { error: 'Not logged in' });
	}

	let sessionobj = await db.collection('users').findOne({ id: session.user.id });
	console.log(sessionobj);
	if (sessionobj == null) {
		return fail(403, { error: 'No access' });
	}

	for (let perm of permissions) {
		if (perm in sessionobj.permissions && sessionobj.permissions[perm] == true) {
			continue;
		}
		return fail(403, { error: `No ${perm} permission` });
	}

	return true;
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

function checkAttributes(obj: any, attributes: string[]) {
	for (let attribute of attributes) {
		if (!(attribute in obj)) {
			return attribute;
		}
	}

	return true;
}

function checkItem(item: anyItem) {
	let attributes = ['id', 'name', 'legend', 'mainType', 'rarity', 'imageId', 'deleted'];

	let valid = checkAttributes(item, attributes);

	if (valid != true) {
		return 'Missing ' + valid;
	}

	return true;
}

function checkConfig(config: any) {
	let attributes = ['name', 'maxLevel'];

	let valid = checkAttributes(config, attributes);

	if (valid != true) {
		return 'Missing ' + valid;
	}

	if (config.name != 'config') {
		return 'Config name incorrect';
	}

	if (typeof config.maxLevel !== 'number') {
		return 'Max level must be a number';
	}

	return true;
}

function checkUser(user: any) {
	let attributes = ['id', 'permissions'];

	let valid = checkAttributes(user, attributes);

	if (valid != true) {
		return 'Missing ' + valid;
	}

	return true;
}

export async function load({ fetch, setHeaders, locals }) {
	const session = await locals.auth();
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
	const config = await configDB.findOne({ name: 'config' }, { projection: { _id: 0 } });
	const users = await usersDB.find({}, { projection: { _id: 0 } }).toArray();
	let permissions = {};

	if (session != null && session.user != null) {
		const sessionobj = await db
			.collection('users')
			.findOne({ id: session.user.id }, { projection: { _id: 0 } });
		if (sessionobj != null && 'permissions' in sessionobj) {
			permissions = sessionobj.permissions;
		}
	}

	return {
		items: data,
		config: config,
		permissions: permissions,
		users: users
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
		let validSession = await verifySession(session, ['database']);
		if (validSession != true) {
			return validSession;
		}

		const formData = await event.request.formData();

		let item: anyItem = JSON.parse(formData.get('itemData') as string);

		// do validating checks
		let validAttributes = checkItem(item);
		if (validAttributes != true) {
			return fail(403, { error: validAttributes });
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

		await db.collection('items-test').insertOne(item);
	},
	edit: async (event) => {
		let session = await event.locals.auth();
		let validSession = await verifySession(session, ['database']);
		if (validSession != true) {
			return validSession;
		}

		const formData = await event.request.formData();

		let item: anyItem = JSON.parse(formData.get('itemData') as string);

		// do validating checks
		let validAttributes = checkItem(item);
		if (validAttributes != true) {
			return fail(403, { error: validAttributes });
		}

		await db.collection('items-test').updateOne({ id: item.id }, { $set: item });
	},
	updateConfig: async (event) => {
		let session = await event.locals.auth();
		let validSession = await verifySession(session, ['config']);
		if (validSession != true) {
			return validSession;
		}

		const formData = await event.request.formData();
		let config: any = JSON.parse(formData.get('config') as string);

		let validConfig = checkConfig(config);
		if (validConfig != true) {
			return fail(403, { error: validConfig });
		}

		await configDB.updateOne({ name: 'config' }, { $set: config });
	},
	updateUser: async (event) => {
		let session = await event.locals.auth();
		let validSession = await verifySession(session, ['users']);
		if (validSession != true) {
			return validSession;
		}

		const formData = await event.request.formData();
		let user: any = JSON.parse(formData.get('user') as string);

		let validUser = checkUser(user);
		if (validUser != true) {
			return fail(403, { error: validUser });
		}

		let stringToBoolean: Record<string, boolean> = { true: true, false: false };

		for (var key of Object.keys(user.permissions)) {
			if (user.permissions[key] in stringToBoolean) {
				user.permissions[key] = stringToBoolean[user.permissions[key]];
			} else if (typeof user.permissions[key] == 'boolean') {
				continue;
			} else {
				delete user.permissions[key];
			}
		}

		const userObj = await usersDB.findOne({ id: user.id }, { projection: { _id: 0 } });
		if (userObj != null && user.id == userObj.id) {
			await usersDB.updateOne({ id: user.id }, { $set: user });
		} else {
			await usersDB.insertOne(user);
		}
	}
} satisfies Actions;
