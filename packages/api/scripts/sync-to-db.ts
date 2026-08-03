import { MongoClient } from 'mongodb';
import fs from 'fs';

const MONGO_URL = process.env.MONGO_CONNECT_URL;
const ITEMS_PATH = '/Users/bobong/Repositories/AOPlanningRework/data/items.json';

async function main() {
	const client = new MongoClient(MONGO_URL);
	await client.connect();
	const db = client.db();

	const items = JSON.parse(fs.readFileSync(ITEMS_PATH, 'utf-8'));

	console.log(`Loaded ${items.length} items from items.json`);

	// Drop and recreate
	const col = db.collection('items');
	const before = await col.countDocuments();
	await col.deleteMany({});
	console.log(`Dropped ${before} items`);

	// Insert in batches
	const BATCH = 500;
	for (let i = 0; i < items.length; i += BATCH) {
		const batch = items.slice(i, i + BATCH);
		await col.insertMany(batch);
		console.log(`Inserted ${i + batch.length}/${items.length}`);
	}

	const after = await col.countDocuments();
	console.log(`Done. ${after} items in collection.`);

	// Verify jewelSlots
	const jsDist = await col.aggregate([
		{ $match: { type: { $in: ['armor', 'accessory'] } } },
		{ $group: { _id: '$jewelSlots', count: { $sum: 1 } } },
		{ $sort: { _id: 1 } }
	]).toArray();
	console.log('JewelSlots distribution:', jsDist);

	await client.close();
}

main().catch(err => { console.error(err); process.exit(1); });
