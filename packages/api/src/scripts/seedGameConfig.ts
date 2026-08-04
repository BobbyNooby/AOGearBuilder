import { connectDb, disconnectDb, getDb } from '../db';
import { stripJsoncComments } from '@aotools/shared';
import fs from 'fs';
import path from 'path';

async function main() {
	await connectDb();
	const db = getDb();

	const configPath = path.resolve(import.meta.dir, '..', '..', '..', '..', 'data', 'config', 'game-config.jsonc');
	const raw = fs.readFileSync(configPath, 'utf8');
	const cfg = JSON.parse(stripJsoncComments(raw));
	cfg._id = 'game-config';

	await db.collection<any>('config').replaceOne({ _id: 'game-config' }, cfg, { upsert: true });
	console.log('Updated game-config document.');

	await disconnectDb();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
