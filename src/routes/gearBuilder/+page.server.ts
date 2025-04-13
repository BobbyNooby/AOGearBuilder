import db from '$lib/db';
import { type AnyItemDetails } from '$lib/types/itemTypes';
import { tempConfig, type AOTConfig } from '$lib/types/utilTypes';
import { fillStatsPerLevel } from '$lib/utils/fillStatsPerLevel';

export async function load(): Promise<{ items: AnyItemDetails[]; config: AOTConfig }> {
	const items = await db
		.collection<AnyItemDetails>('items-test')
		.find({ deleted: false }, { projection: { _id: 0 } })
		.toArray();

	const config =
		(await db
			.collection<AOTConfig>('config')
			.findOne({ name: 'config' }, { projection: { _id: 0 } })) || tempConfig;

	fillStatsPerLevel(items, config);

	return { items, config };
}
