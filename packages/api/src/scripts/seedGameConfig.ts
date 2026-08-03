import { connectDb, disconnectDb, getDb } from '../db';
import fs from 'fs';
import path from 'path';

function stripComments(raw: string) {
	return raw
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/\/\/.*$/gm, '');
}

async function main() {
	await connectDb();
	const db = getDb();

	const configPath = path.resolve(import.meta.dir, '..', '..', '..', '..', 'data', 'config', 'game-config.jsonc');
	const raw = fs.readFileSync(configPath, 'utf8');
	const cfg = JSON.parse(stripComments(raw));
	cfg._id = 'game-config';

	await db.collection<any>('config').replaceOne({ _id: 'game-config' }, cfg, { upsert: true });
	console.log('Updated game-config document.');

	await disconnectDb();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
