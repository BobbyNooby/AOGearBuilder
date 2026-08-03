import { getDb } from '../db';
import { config } from '../config';

export async function getAdminDiscordIds(): Promise<Set<string>> {
	const db = getDb();
	const docs = await db.collection<{ _id: string }>('adminIds').find().toArray();
	let ids = docs.map((d) => d._id);

	if (ids.length === 0 && config.ADMIN_DISCORD_IDS) {
		ids = config.ADMIN_DISCORD_IDS.split(',').map((id) => id.trim()).filter(Boolean);
	}

	return new Set(ids);
}
