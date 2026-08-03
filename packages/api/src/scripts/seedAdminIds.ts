import { connectDb, disconnectDb, getDb } from '../db';
import { config } from '../config';

async function seed() {
	await connectDb();
	const db = getDb();

	const ids = config.ADMIN_DISCORD_IDS.split(',').map((id) => id.trim()).filter(Boolean);
	if (ids.length === 0) {
		console.log('No ADMIN_DISCORD_IDS found in env. Nothing to seed.');
		await disconnectDb();
		return;
	}

	for (const id of ids) {
		await db.collection<any>('adminIds').replaceOne(
			{ _id: id },
			{ _id: id, addedAt: new Date(), addedBy: 'seed' },
			{ upsert: true }
		);
		console.log(`Seeded admin ID: ${id}`);
	}

	await disconnectDb();
}

seed().catch((err) => {
	console.error('Seed failed:', err);
	process.exit(1);
});
