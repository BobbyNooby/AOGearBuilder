import { Elysia } from 'elysia';
import { openapi } from '@elysia/openapi';
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
					if (auth.type === 'invalidApiKey') {
						set.status = 401;
						return { error: 'Invalid API key' };
					}
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
		.guard({
			beforeHandle: ({ headers, set }) => {
				if (headers['x-internal-key'] !== config.INTERNAL_API_KEY) {
					set.status = 401;
					return { error: 'Unauthorized' };
				}
			}
		}, (app) =>
			app.use(openapi({
				path: '/api/docs/internal',
				provider: 'scalar',
				documentation: {
					info: {
						title: 'AOGearBuilder API (Internal)',
						version: '1.0.0',
						description: 'Full API reference for Arcane Odyssey build tools — internal use only'
					},
					tags: [
						{ name: 'Public', description: 'Read-only public data endpoints' },
						{ name: 'Admin: Items', description: 'Item CRUD operations' },
						{ name: 'Admin: Modifiers', description: 'Modifier CRUD operations' },
						{ name: 'Admin: Magics', description: 'Magic CRUD operations' },
						{ name: 'Admin: Fighting Styles', description: 'Fighting style CRUD operations' },
						{ name: 'Admin: Config', description: 'Game config and formulas' },
						{ name: 'Admin: Platform', description: 'Users, API keys, roles, stats' },
						{ name: 'Builds', description: 'Build save/load via API key' }
					],
					components: {
						securitySchemes: {
							apiKey: { type: 'apiKey', in: 'header', name: 'X-API-Key', description: 'Scoped API key for write access' },
							internalKey: { type: 'apiKey', in: 'header', name: 'X-Internal-Key', description: 'Server-to-server internal key' }
						}
					}
				},
				scalar: { theme: 'purple', darkMode: true }
			}))
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
