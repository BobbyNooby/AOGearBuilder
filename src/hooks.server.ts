import { startMongoAdmin, startMongoReadOnly } from '$lib/dbHandler';

export { handle } from './auth';

startMongoAdmin().then((): void => {
	console.log('Connected to MongoDB (admin)');
});

// startMongoReadOnly().then((): void => {
// 	console.log('Connected to MongoDB (read-only)');
// });
