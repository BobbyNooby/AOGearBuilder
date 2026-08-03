import { getDb } from '../db';

const ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const ID_LEN = 3;
const MAX_ATTEMPTS = 100;

function randomId() {
	let id = '';
	for (let i = 0; i < ID_LEN; i++) {
		id += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)];
	}
	return id;
}

export async function generateUniqueId(collections: ('items' | 'modifiers')[] = ['items']): Promise<string> {
	const db = getDb();
	for (let i = 0; i < MAX_ATTEMPTS; i++) {
		const id = randomId();
		let collision = false;
		for (const coll of collections) {
			const existing =
				coll === 'items'
					? await db.collection('items').findOne({ id })
					: await db.collection<any>('modifiers').findOne({ $or: [{ _id: id }, { id }] });
			if (existing) {
				collision = true;
				break;
			}
		}
		if (!collision) return id;
	}
	throw new Error('Could not generate a unique 3-char ID');
}

export async function generateItemId(): Promise<string> {
	return generateUniqueId(['items']);
}
