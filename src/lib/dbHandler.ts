import { MongoClient } from 'mongodb';
import { MONGO_CONNECT_URL } from '$env/static/private';

const client = new MongoClient(MONGO_CONNECT_URL);

export function startMongo(): Promise<MongoClient> {
	console.log('Connecting to MongoDB...');
	return client.connect();
}

export default client.db();

export function filterCollection(collection: any, mainType: string) {
	let filteredData: [] = [];
	for (let item of collection) {
		if (item.mainType == mainType) {
			filteredData.push(item);
		}
	}
	return filteredData;
}
