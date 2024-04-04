import { startMongo } from '$lib/dbHandler';

startMongo().then((): void => {
	console.log('Connected to MongoDB');
});
