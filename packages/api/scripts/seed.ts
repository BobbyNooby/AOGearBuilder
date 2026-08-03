import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const URL = (process.env.MONGO_CONNECT_URL || '').replace(/^"|"$/g, '');
if (!URL) { console.error('Set MONGO_CONNECT_URL in .env'); process.exit(1); }

function stripJsonc(s: string): string {
	let o='',q=false,c='';for(let i=0;i<s.length;i++){const h=s[i];if(q){o+=h;if(h=='\\'){o+=s[i+1]||'';i++;continue}if(h===c){q=false;continue}continue}if(h=='"'||h=="'"){q=true;c=h;o+=h;continue}if(h=='/'&&s[i+1]=='/'){while(i<s.length&&s[i]!=='\n')i++;continue}if(h=='/'&&s[i+1]=='*'){i+=2;while(i<s.length&&!(s[i]==='*'&&s[i+1]=='/'))i++;i++;continue}o+=h}return o;
}

function readJson(p: string) { return JSON.parse(readFileSync(p, 'utf-8')); }
function readJsonc(p: string) { return JSON.parse(stripJsonc(readFileSync(p, 'utf-8'))); }

const client = new MongoClient(URL);
await client.connect();
const db = client.db();
const base = resolve(import.meta.dirname, '../../data');

// 1. items (gear + weapons + gems)
const items = readJson(resolve(base, 'items.json'));
const gems = readJson(resolve(base, 'gems.json'));
const allItems = [...items, ...gems];
await db.collection('items').deleteMany({});
const r1 = await db.collection('items').insertMany(allItems);
console.log(`✅ items: ${r1.insertedCount} (${items.length} gear + ${gems.length} gems)`);

// 2. magics (rich data with images, colors, legends, stat bars)
const magics = readJson(resolve(base, 'magics-rich.json'));
await db.collection('magics').deleteMany({});
const r2 = await db.collection('magics').insertMany(magics);
console.log(`✅ magics: ${r2.insertedCount} (rich data)`);

// 2b. fighting styles
const fightingStyles = readJson(resolve(base, 'fighting-styles.json'));
await db.collection('fightingStyles').deleteMany({});
const r2b = await db.collection('fightingStyles').insertMany(fightingStyles);
console.log(`✅ fightingStyles: ${r2b.insertedCount}`);

// 3. config (game-config doc)
const cfg = readJsonc(resolve(base, 'config/game-config.jsonc'));
cfg._id = 'game-config';
await db.collection('config').replaceOne({ _id: 'game-config' }, cfg, { upsert: true });
console.log('✅ config');

// 4. formulas (formulas doc in the same config collection)
const fml = readJsonc(resolve(base, 'config/formulas.jsonc'));
fml._id = 'formulas';
await db.collection('config').replaceOne({ _id: 'formulas' }, fml, { upsert: true });
console.log('✅ formulas');

// 5. modifiers (one doc per modifier)
const mods = readJsonc(resolve(base, 'config/modifiers.jsonc'));
await db.collection('modifiers').deleteMany({});
const modDocs = Object.entries(mods).map(([id, o]: [string, any]) => ({ _id: id, id, ...o }));
const r5 = await db.collection('modifiers').insertMany(modDocs);
console.log(`✅ modifiers: ${r5.insertedCount}`);

await client.close();
console.log('\nAll collections seeded into', db.databaseName);
