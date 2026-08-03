import { MongoClient } from 'mongodb';
import fs from 'fs';

const MONGO_URL = process.env.MONGO_CONNECT_URL_OLD;
const NEW_ITEMS_PATH = '/Users/bobong/Repositories/AOPlanningRework/data/items.json';

async function main() {
	const client = new MongoClient(MONGO_URL);
	await client.connect();
	const db = client.db('AOTools');
	const oldItems = await db.collection('items').find({ deleted: { $ne: true } }).toArray();
	const newItems = JSON.parse(fs.readFileSync(NEW_ITEMS_PATH, 'utf-8'));

	const oldByName = new Map<string, any>();
	for (const o of oldItems) {
		const key = o.name.toLowerCase().trim();
		if (!oldByName.has(key)) oldByName.set(key, o);
	}

	let jewelChanges = 0;
	let descChanges = 0;
	let ruleChanges = 0;
	const jewelLog: any[] = [];
	const descLog: any[] = [];
	const ruleLog: any[] = [];

	for (const n of newItems) {
		const old = oldByName.get(n.name.toLowerCase().trim());
		if (old) {
			// Fix jewelSlots: if new says 0 and old has a positive count, use old
			if ((n.jewelSlots === 0 || n.jewelSlots == null) && (old.gemNo > 0)) {
				jewelLog.push({ name: n.name, oldGemNo: old.gemNo, newJewelSlots: n.jewelSlots });
				n.jewelSlots = old.gemNo;
				jewelChanges++;
			}

			// Backfill description: if new description is null/empty and old has legend
			if ((!n.description || n.description === '') && old.legend && old.legend.trim() !== '') {
				descLog.push({ name: n.name, description: old.legend.substring(0, 80) + (old.legend.length > 80 ? '...' : '') });
				n.description = old.legend;
				descChanges++;
			}
		}

		// Rule-based fixes for renamed items that don't match by name
		if ((n.jewelSlots === 0 || n.jewelSlots == null) && n.type !== 'weapon') {
			const name = n.name.toLowerCase();
			const isJewelry = n.equipType === 'neck' || n.equipType === 'amulet';
			const isAmulet = name.includes('amulet');
			const isArcanium = name.includes('arcanium') || name.includes('arcmancer');
			const isFighting = name.startsWith('fighting ');
			const isTheurgist = name.includes('theurgist');
			const isRareBoss = ['Rare', 'Mystic', 'Limited', 'Exotic'].includes(n.rarity);
			const isArmor = n.type === 'armor';
			const isAccessory = n.type === 'accessory';

			let targetSlots: number | null = null;
			if (isAmulet) targetSlots = 0;
			else if (isTheurgist) targetSlots = 3;
			else if (isArcanium || isFighting) targetSlots = 2;
			else if (isRareBoss && isArmor) targetSlots = 2;
			else if (isRareBoss && isAccessory && !isJewelry && !['face', 'front'].includes(n.equipType)) targetSlots = 2;

			if (targetSlots !== null && targetSlots !== 0) {
				ruleLog.push({ name: n.name, to: targetSlots, reason: `${n.rarity} ${n.type}/${n.equipType}` });
				n.jewelSlots = targetSlots;
				ruleChanges++;
			}
		}
	}

	fs.writeFileSync(NEW_ITEMS_PATH, JSON.stringify(newItems, null, 2));
	await client.close();

	console.log(`Fixed ${jewelChanges} jewelSlots by old DB name match`);
	console.log(`Backfilled ${descChanges} descriptions by old DB name match`);
	console.log(`Applied ${ruleChanges} rule-based jewelSlots fixes`);
	console.log('\nRule-based changes (first 30):');
	ruleLog.slice(0, 30).forEach(x => console.log(`  ${x.name}: -> ${x.to} (${x.reason})`));
}

main().catch(err => { console.error(err); process.exit(1); });
