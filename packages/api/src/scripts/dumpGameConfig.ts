import { connectDb, disconnectDb, getDb } from '../db';
import fs from 'fs';
import path from 'path';

async function main() {
  await connectDb();
  const db = getDb();

  const doc = await db.collection<any>('config').findOne({ _id: 'game-config' });
  if (!doc) {
    console.error('No game-config document found in MongoDB.');
    process.exit(1);
  }

  const { _id, ...config } = doc;
  const outPath = path.resolve(
    import.meta.dir, '..', '..', '..', '..',
    'data', 'config', 'game-config.jsonc'
  );
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);

  const header = `// Dumped from MongoDB on ${ts} UTC.\n// Previous comments are in git history — restore from blame if needed.\n`;
  fs.writeFileSync(outPath, header + JSON.stringify(config, null, 2) + '\n');

  console.log(`Dumped to game-config.jsonc (${ts})`);
  await disconnectDb();
}

main().catch((e) => { console.error(e); process.exit(1); });
