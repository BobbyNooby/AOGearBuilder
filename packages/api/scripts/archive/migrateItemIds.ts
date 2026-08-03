import { connectDb, disconnectDb, getClient, getDb } from '../db';
import fs from 'fs';
import path from 'path';

const ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const ID_LEN = 3;
const MAX_ATTEMPTS = 100;
const OLD_DB_NAME = 'AOTools';
const OLD_ITEMS_COLLECTION = 'items-woody';
const BATCH_SIZE = 500;

const currentDb = getDb();
const client = getClient();
const oldDb = client.db(OLD_DB_NAME);

function stripComments(raw: string) {
	return raw
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/\/\/.*$/gm, '');
}

function baseName(name: string) {
	return name.replace(/\s*\[.*?\]\s*$/, '').trim();
}

function generateId(reserved: Set<string>) {
	for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
		let id = '';
		for (let i = 0; i < ID_LEN; i++) {
			id += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)];
		}
		if (!reserved.has(id)) {
			reserved.add(id);
			return id;
		}
	}
	throw new Error('Could not generate a unique 3-char ID');
}

async function backupCollection(name: string) {
	const backupName = `${name}-migration-backup`;
	await currentDb.collection(name).aggregate([{ $match: {} }, { $out: backupName }]).toArray();
	console.log(`Backed up ${name} -> ${backupName}`);
}

async function migrateItems() {
	console.log('Reading old items...');
	const oldDocs = await oldDb.collection(OLD_ITEMS_COLLECTION).find({}).toArray();
	const oldByName = new Map<string, any>();
	const oldByBaseName = new Map<string, any>();

	for (const doc of oldDocs) {
		if (!doc.name || doc.name === 'None') continue;
		if (!oldByName.has(doc.name)) oldByName.set(doc.name, doc);
		const base = baseName(doc.name);
		if (!oldByBaseName.has(base)) oldByBaseName.set(base, doc);
	}

	const reservedIds = new Set<string>();
	for (const doc of oldDocs) {
		if (doc.id && doc.id.length === ID_LEN) reservedIds.add(doc.id);
	}

	console.log('Reading current items...');
	const currentDocs = await currentDb.collection('items').find({}).toArray();
	for (const doc of currentDocs) {
		if (doc.id && doc.id.length === ID_LEN) reservedIds.add(doc.id);
	}

	let matched = 0;
	let generated = 0;
	const operations: any[] = [];

	for (const doc of currentDocs) {
		let old = oldByName.get(doc.name);
		if (!old) old = oldByBaseName.get(doc.name);

		let newId: string;
		let imageUrl: string | undefined;

		if (old) {
			newId = old.id;
			imageUrl = old.imageId || old.imageUrl;
			matched++;
		} else {
			newId = generateId(reservedIds);
			generated++;
		}

		const $set: Record<string, any> = { id: newId };
		if (imageUrl) $set.imageUrl = imageUrl;
		operations.push({ updateOne: { filter: { _id: doc._id }, update: { $set } } });

		if (operations.length === BATCH_SIZE) {
			await currentDb.collection('items').bulkWrite(operations);
			operations.length = 0;
		}
	}

	if (operations.length) {
		await currentDb.collection('items').bulkWrite(operations);
	}

	console.log(`Items: ${matched} matched, ${generated} generated IDs.`);
}

async function migrateModifiers() {
	console.log('Reading old modifier/enchant entries...');
	const oldDocs = await oldDb.collection(OLD_ITEMS_COLLECTION).find({ mainType: { $in: ['Enchant', 'Modifier', 'Gem'] } }).toArray();
	const oldByName = new Map<string, any>();

	for (const doc of oldDocs) {
		if (!doc.name || doc.name === 'None') continue;
		if (!oldByName.has(doc.name)) oldByName.set(doc.name, doc);
	}

	const reservedIds = new Set<string>();
	for (const doc of oldDocs) {
		if (doc.id && doc.id.length === ID_LEN) reservedIds.add(doc.id);
	}

	console.log('Reading current modifiers...');
	const currentDocs = await currentDb.collection('modifiers').find({}).toArray();
	for (const doc of currentDocs) {
		const id = typeof doc._id === 'string' ? doc._id : doc._id?.toString?.();
		if (id && id.length === ID_LEN) reservedIds.add(id);
		if (doc.id && doc.id.length === ID_LEN) reservedIds.add(doc.id);
	}

	let matched = 0;
	let generated = 0;
	const newModifiers: any[] = [];

	for (const doc of currentDocs) {
		const old = oldByName.get(doc.name);
		let newId: string;
		let imageUrl: string | undefined;

		if (old) {
			newId = old.id;
			imageUrl = old.imageId || old.imageUrl;
			matched++;
		} else {
			newId = generateId(reservedIds);
			generated++;
		}

		const { _id, id: _oldId, ...rest } = doc;
		newModifiers.push({
			_id: newId,
			id: newId,
			...rest,
			imageUrl: imageUrl || doc.imageUrl
		});
	}

	await currentDb.collection('modifiers').deleteMany({});
	if (newModifiers.length) {
		await currentDb.collection('modifiers').insertMany(newModifiers, { ordered: false });
	}

	console.log(`Modifiers: ${matched} matched, ${generated} generated IDs.`);
}

async function seedFormulas() {
	console.log('Seeding formulas...');
	const formulasPath = path.resolve(import.meta.dir, '..', '..', '..', '..', 'data', 'config', 'formulas.jsonc');
	const raw = fs.readFileSync(formulasPath, 'utf8');
	const formulas = JSON.parse(stripComments(raw));

	await currentDb.collection<any>('config').replaceOne(
		{ _id: 'formulas' },
		{ _id: 'formulas', ...formulas },
		{ upsert: true }
	);
	console.log('Seeded formulas.');
}

async function main() {
	const seedOnly = process.argv.includes('--seed-only');
	await connectDb();
	console.log('Connected.');

	if (!seedOnly) {
		await backupCollection('items');
		await backupCollection('modifiers');
		await migrateItems();
		await migrateModifiers();
	}
	await seedFormulas();

	console.log('Migration complete.');
	await disconnectDb();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
