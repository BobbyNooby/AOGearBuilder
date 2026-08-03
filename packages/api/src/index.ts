import { Elysia } from 'elysia';
import { connectDb } from './db';
import { initDb } from './lib/initDb';
import { auth } from './auth';
import { config } from './config';
import { corsMiddleware } from './middleware/cors';
import { resolveAuth } from './middleware/auth';
import { checkRateLimit } from './middleware/rateLimit';
import { createRateLimitStore } from './rate-limit';
import { publicRoutes } from './routes/public';
import { itemRoutes } from './routes/items';
import { magicRoutes } from './routes/magics';
import { fightingStyleRoutes } from './routes/fightingStyles';
import { modifierRoutes } from './routes/modifiers';
import { configRoutes } from './routes/configs';
import { keyRoutes } from './routes/admin/keys';
import { internalKeyRoutes } from './routes/admin/internalKeys';
import { userRoutes } from './routes/admin/users';
import { adminIdRoutes } from './routes/admin/adminIds';
import { statsRoutes } from './routes/admin/stats';
import { roleRoutes } from './routes/admin/roles';
import { buildRoutes } from './routes/builds';

const rateLimitStore = createRateLimitStore();

export function resetRateLimits(): Promise<void> | void {
	return rateLimitStore.reset();
}

export async function createApp() {
	await connectDb();
	await initDb();

	return new Elysia()
		.use(corsMiddleware)
		.all('/api/auth/*', (ctx) => auth.handler(ctx.request))
		.group('/api', (app) =>
			app
				.derive(async ({ request, headers }) => ({
					auth: await resolveAuth(request, headers)
				}))
				.onBeforeHandle(async ({ auth, request, set }) => {
					const result = await checkRateLimit(auth, request, rateLimitStore);
					if (!result.allowed) {
						set.status = 429;
						set.headers['Retry-After'] = String(result.retryAfter ?? 60);
						return { error: 'Rate limit exceeded. Try again later.' };
					}
				})
			.get('/health', () => ({ status: 'ok' }))
			.get('/me', async ({ auth }) => {
				return {
					type: auth.type,
					user: auth.type === 'session' ? auth.user : null,
					permissions:
						auth.type === 'session'
							? auth.permissions
							: auth.type === 'apiKey'
								? auth.scopes
								: []
				};
			})
			.use(publicRoutes)
			.group('/admin', (app) =>
				app
					.use(itemRoutes)
					.use(magicRoutes)
					.use(fightingStyleRoutes)
					.use(modifierRoutes)
					.use(configRoutes)
					.use(statsRoutes)
					.use(keyRoutes)
					.use(internalKeyRoutes)
					.use(userRoutes)
					.use(roleRoutes)
					.use(adminIdRoutes)
			)
			.use(buildRoutes)
		)
		.onError(({ code, error, set }) => {
			console.error(code, error);
			set.status = 500;
			return { error: 'Internal server error' };
		});
}

async function bootstrap() {
	const app = await createApp();
	app.listen(config.PORT);
	console.log(`🚀 API running at http://localhost:${config.PORT}`);
	return app;
}

if (import.meta.main) {
	bootstrap().catch((err) => {
		console.error('Failed to start API:', err);
		process.exit(1);
	});
}
