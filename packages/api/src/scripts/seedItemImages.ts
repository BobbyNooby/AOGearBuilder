import { connectDb, disconnectDb, getDb } from '../db';
import crypto from 'node:crypto';

const WIKI_MODULE_URL = 'https://roblox-arcane-odyssey.fandom.com/wiki/Module:Equipment/data?action=raw';
const FANDOM_IMAGE_BASE = 'https://static.wikia.nocookie.net/roblox-arcane-odyssey/images';
const REPO_RAW_BASE = 'https://raw.githubusercontent.com/BobbyNooby/AOGearBuilderImages/main';

function md5(str: string) {
	return crypto.createHash('md5').update(str).digest('hex');
}

function buildFandomUrl(imageFile: string) {
	const normalized = imageFile.replace(/ /g, '_');
	// Skip wiki placeholder images
	if (/^placeholder(_v2)?\.png$/i.test(normalized)) return null;
	const hash = md5(normalized);
	const encoded = encodeURIComponent(normalized).replace(/%2F/g, '/');
	return `${FANDOM_IMAGE_BASE}/${hash[0]}/${hash.slice(0, 2)}/${encoded}`;
}

function parseWikiModule(text: string) {
	const map = new Map<string, string>();
	const startRegex = /^\s*\[("[^"]+")]\s*=\s*\{/gm;
	let match: RegExpExecArray | null;
	while ((match = startRegex.exec(text)) !== null) {
		const name = match[1].slice(1, -1); // remove surrounding quotes
		const start = match.index + match[0].length - 1; // position of '{'
		let depth = 1;
		let i = start + 1;
		while (i < text.length && depth > 0) {
			const c = text[i];
			if (c === '{') depth++;
			else if (c === '}') depth--;
			i++;
		}
		const block = text.slice(start, i);
		const imgMatch = block.match(/Image\s*=\s*"([^"]+)"/);
		if (imgMatch) {
			map.set(name, imgMatch[1].trim());
		}
	}
	return map;
}

async function fetchWikiModule() {
	const res = await fetch(WIKI_MODULE_URL);
	if (!res.ok) throw new Error(`Failed to fetch wiki module: ${res.status}`);
	const text = await res.text();
	return parseWikiModule(text);
}

async function fetchRepoPaths() {
	const res = await fetch('https://api.github.com/repos/BobbyNooby/AOGearBuilderImages/git/trees/main?recursive=1');
	if (!res.ok) throw new Error(`Failed to fetch image repo tree: ${res.status}`);
	const json = await res.json();
	return (json.tree || [])
		.filter((t: any) => t.type === 'blob')
		.map((t: any) => decodeURIComponent(t.path as string));
}

function normalize(s: string) {
	return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function repoUrl(path: string) {
	const encoded = path
		.split('/')
		.map((seg) => encodeURIComponent(seg).replace(/%2F/g, '/'))
		.join('/');
	return `${REPO_RAW_BASE}/${encoded}`;
}

function findRepoImage(item: any, repoPaths: string[]) {
	const name = item.name || '';
	const norm = normalize(name);
	if (!norm) return null;
	const match = repoPaths.find((p) => {
		const fileName = p.split('/').pop() || '';
		const base = fileName.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
		return normalize(base) === norm;
	});
	return match ? repoUrl(match) : null;
}

async function main() {
	const dryRun = process.argv.includes('--dry-run');
	await connectDb();
	const db = getDb();

	console.log('Fetching wiki module...');
	const wikiMap = await fetchWikiModule();
	console.log(`Wiki module has images for ${wikiMap.size} items`);

	console.log('Fetching image repo index...');
	const repoPaths = await fetchRepoPaths();
	console.log(`Image repo has ${repoPaths.length} files`);

	const items = await db.collection('items').find({ imageUrl: { $exists: false } }).toArray();
	console.log(`Items without imageUrl: ${items.length}`);

	const operations: any[] = [];
	let wikiCount = 0;
	let repoCount = 0;
	let skipped = 0;

	for (const item of items) {
		const name = item.name;
		if (!name) continue;

		let imageUrl: string | null = null;
		const wikiImage = wikiMap.get(name);
		if (wikiImage) {
			imageUrl = buildFandomUrl(wikiImage);
			if (imageUrl) wikiCount++;
		}
		if (!imageUrl) {
			const repo = findRepoImage(item, repoPaths);
			if (repo) {
				imageUrl = repo;
				repoCount++;
			}
		}

		if (!imageUrl) {
			skipped++;
			continue;
		}

		operations.push({ updateOne: { filter: { _id: item._id }, update: { $set: { imageUrl } } } });
		if (dryRun) console.log(`DRY ${name}: ${imageUrl}`);
	}

	console.log({ wikiCount, repoCount, skipped });

	if (!dryRun && operations.length > 0) {
		await db.collection('items').bulkWrite(operations);
		console.log(`Updated ${operations.length} items.`);
	} else {
		console.log(`Dry run: would update ${operations.length} items.`);
	}

	await disconnectDb();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
