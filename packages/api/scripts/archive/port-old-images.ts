import { MongoClient } from 'mongodb';
import fs from 'fs';

const OLD_URL = process.env.MONGO_CONNECT_URL_OLD;
const ITEMS_PATH = '/Users/bobong/Repositories/AOPlanningRework/data/items.json';

async function main() {
	const client = new MongoClient(OLD_URL);
	await client.connect();
	const db = client.db('AOTools');
	const oldItems = await db.collection('items').find({ deleted: { $ne: true } }).toArray();
	const newItems = JSON.parse(fs.readFileSync(ITEMS_PATH, 'utf-8'));

	const oldByName = new Map<string, any>();
	for (const o of oldItems) {
		const key = o.name.toLowerCase().trim();
		if (!oldByName.has(key)) oldByName.set(key, o);
	}

	let imagePorts = 0;
	let descPorts = 0;

	// Pattern-based mappings for renamed generic items
	function findOldImageByPattern(newName: string): string | null {
		const lower = newName.toLowerCase();
		const patterns: Record<string, string[]> = {
			'arcanium helmet': ['arcanium helmet'],
			'arcanium armor': ['fire arcanium armor', 'water arcanium armor', 'earth arcanium armor'],
			'arcanium boots': ['fire arcanium boots'],
			'arcanium mage hat': ['fire arcanium mage hat'],
			'arcanium mage coat': ['fire arcanium mage coat'],
			'arcanium mage pants': ['fire arcanium mage pants'],
			'arcanium bracelet': ['arcanium bracelet'],
			'arcmancer hat': ['fire arcmancer hat'],
			'arcmancer robes': ['fire arcmancer robes'],
			'arcmancer pants': ['fire arcmancer pants'],
			'fighting armor': ['boxing armor'],
			'fighting leggings': ['boxing leggings'],
			'fighting boots': ['boxing boots'],
			'fighting chestplate': ['boxing chestplate'],
			'fighting robes': ['boxing robes'],
			'fighting handwraps': ['boxing handwraps'],
			'fighting headband': ['boxing headband'],
			'fighting shoulderpads': ['boxing shoulderpads'],
			'fighting belt': ['boxing belt'],
			'fighting balteus': ['boxing balteus'],
			'fighting greaves': ['boxing greaves'],
		};
		for (const [pat, candidates] of Object.entries(patterns)) {
			if (lower.includes(pat)) {
				for (const c of candidates) {
					const old = oldByName.get(c);
					if (old?.imageId) return old.imageId;
				}
			}
		}
		return null;
	}

	for (const n of newItems) {
		const old = oldByName.get(n.name.toLowerCase().trim());

		// Exact match image URL
		if (old?.imageId && !n.image && !n.imageUrl && !n.imageId) {
			n.imageUrl = old.imageId;
			imagePorts++;
			continue;
		}

		// Pattern-based match for renamed generics
		if (!n.image && !n.imageUrl && !n.imageId) {
			const patternImage = findOldImageByPattern(n.name);
			if (patternImage) {
				n.imageUrl = patternImage;
				imagePorts++;
				continue;
			}
		}

		// Port description if missing
		if ((!n.description || n.description === '') && old?.legend && old.legend.trim() !== '') {
			n.description = old.legend;
			descPorts++;
		}
	}

	fs.writeFileSync(ITEMS_PATH, JSON.stringify(newItems, null, 2));
	await client.close();

	console.log(`Ported ${imagePorts} image URLs from old DB`);
	console.log(`Ported ${descPorts} descriptions from old DB`);
}

main().catch(err => { console.error(err); process.exit(1); });
