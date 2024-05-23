import { MongoClient } from 'mongodb';
import { MONGO_CONNECT_URL, MONGO_READONLY_CONNECT_URL } from '$env/static/private';

const client = new MongoClient(MONGO_CONNECT_URL);

const userClient = new MongoClient(MONGO_READONLY_CONNECT_URL);

export function startMongoAdmin(): Promise<MongoClient> {
	console.log('Connecting to MongoDB (admin)...');
	return client.connect();
}

export function startMongoReadOnly(): Promise<MongoClient> {
	console.log('Connecting to MongoDB (read-only)...');
	return userClient.connect();
}

export default client.db();

export const readOnlyClient = userClient.db();

export function filterCollection(collection: any, mainType: string) {
	let filteredData: [] = [];
	for (let item of collection) {
		if (item.mainType == mainType) {
			filteredData.push(item);
		}
	}
	return filteredData;
}
