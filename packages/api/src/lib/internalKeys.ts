import { getDb } from '../db';

export async function validateInternalKey(key: string): Promise<boolean> {
	const db = getDb();
	const prefix = key.slice(-4);
	const docs = await db.collection<any>('internalKeys').find({ keyPrefix: prefix, active: true }).toArray();

	for (const doc of docs) {
		if (await Bun.password.verify(key, doc.keyHash)) {
			await db.collection('internalKeys').updateOne(
				{ _id: doc._id },
				{ $set: { lastUsedAt: new Date() } }
			);
			return true;
		}
	}
	return false;
}
