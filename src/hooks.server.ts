import { startMongo } from '$lib/dbHandler';

export { handle } from "./auth"

startMongo().then((): void => {
	console.log('Connected to MongoDB');
});
