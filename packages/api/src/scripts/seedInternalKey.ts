import { connectDb, disconnectDb, getDb } from '../db';
import { config } from '../config';

async function seed() {
	await connectDb();
	const db = getDb();

	const key = config.INTERNAL_API_KEY;
	if (!key) {
		console.log('No INTERNAL_API_KEY found in env. Nothing to seed.');
		await disconnectDb();
		return;
	}

	const existing = await db.collection('internalKeys').findOne({ label: 'seeded-internal' });
	if (existing) {
		console.log('Seeded internal key already exists. Skipping.');
		await disconnectDb();
		return;
	}

	const keyHash = await Bun.password.hash(key);
	await db.collection('internalKeys').insertOne({
		keyHash,
		keyPrefix: key.slice(-4),
		label: 'seeded-internal',
		active: true,
		createdBy: 'seed',
		createdAt: new Date()
	});

	console.log('Seeded internal API key.');
	await disconnectDb();
}

seed().catch((err) => {
	console.error('Seed failed:', err);
	process.exit(1);
});
