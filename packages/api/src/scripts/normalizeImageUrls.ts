import { connectDb, disconnectDb, getDb } from '../db';

async function main() {
  await connectDb();
  const db = getDb();
  const coll = db.collection('items');

  const withImageId = await coll.find({ imageId: { $exists: true }, imageUrl: { $exists: false } }).toArray();
  for (const item of withImageId) {
    const url = `https://raw.githubusercontent.com/BobbyNooby/AOGearBuilderImages/main/${item.imageId}`;
    await coll.updateOne({ _id: item._id }, { $set: { imageUrl: url }, $unset: { imageId: '', image: '' } });
  }
  console.log(`Migrated ${withImageId.length} items from imageId → imageUrl`);

  const withImage = await coll.find({ image: { $exists: true }, imageUrl: { $exists: false } }).toArray();
  for (const item of withImage) {
    await coll.updateOne({ _id: item._id }, { $set: { imageUrl: item.image }, $unset: { image: '', imageId: '' } });
  }
  console.log(`Migrated ${withImage.length} items from image → imageUrl`);

  await coll.updateMany({ imageUrl: { $exists: true } }, { $unset: { imageId: '', image: '' } });
  console.log('Cleaned up leftover image/imageId on migrated items.');

  await disconnectDb();
}

main().catch((e) => { console.error(e); process.exit(1); });
