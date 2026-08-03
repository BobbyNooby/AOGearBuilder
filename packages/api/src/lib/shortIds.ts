import { getDb } from '../db';

const ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const MAX_ATTEMPTS = 100;

export async function generateShortId(length: number): Promise<string> {
	const db = getDb();
	for (let i = 0; i < MAX_ATTEMPTS; i++) {
		let id = '';
		for (let j = 0; j < length; j++) {
			id += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)];
		}
		const existing = await db.collection('builds').findOne({ shortId: id });
		if (!existing) return id;
	}
	throw new Error('Could not generate a unique short ID');
}
