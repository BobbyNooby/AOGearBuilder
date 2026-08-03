import { getDb } from '../db';

export async function getMaxBuilds(ownerId: string, type: string): Promise<number> {
	const db = getDb();
	const user = await db.collection<any>('user').findOne({ id: ownerId });
	return user?.maxBuilds?.[type] ?? user?.extraBuildSlots?.[type] ?? 100;
}
