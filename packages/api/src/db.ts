import { MongoClient, type Db } from 'mongodb';
import { config } from './config';

const client = new MongoClient(config.MONGO_CONNECT_URL);
let connected = false;

export async function connectDb(): Promise<Db> {
	if (!connected) {
		await client.connect();
		connected = true;
	}
	return client.db();
}

export function getDb(): Db {
	return client.db();
}

export function getClient(): MongoClient {
	return client;
}

export async function disconnectDb() {
	if (connected) {
		await client.close();
		connected = false;
	}
}
