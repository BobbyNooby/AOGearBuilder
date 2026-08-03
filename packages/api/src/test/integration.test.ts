import { beforeAll, afterAll, describe, it, expect } from 'bun:test';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { encodeBuild, decodeBuild, tryLoadBuild, hasPermission, PERMISSIONS, ROLE_PERMISSIONS, aggregateBuildStats, getSlotStats, secondaryStatEffect } from '@aotools/shared';

const PORT = '3999';
const BASE = `http://localhost:${PORT}`;
const INTERNAL_KEY = 'test-internal-key';

async function api(path: string, init?: RequestInit) {
	const res = await fetch(`${BASE}${path}`, init);
	const text = await res.text();
	let json: any;
	try { json = JSON.parse(text); } catch { json = text; }
	return { status: res.status, json, headers: res.headers };
}

describe('API integration', () => {
	let mongod: MongoMemoryServer;
	let client: MongoClient;
	let server: any;
	let resetRateLimits: () => Promise<void> | void;

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();
		const uri = mongod.getUri();

		process.env.MONGO_CONNECT_URL = uri;
		process.env.BETTER_AUTH_SECRET = 'test-secret-test-secret-test-secret';
		process.env.BETTER_AUTH_URL = BASE;
		process.env.INTERNAL_API_KEY = INTERNAL_KEY;
		process.env.ALLOWED_ORIGINS = BASE;

		const { createApp, resetRateLimits: reset } = await import('../index');
		resetRateLimits = reset;
		const app = await createApp();
		server = app.listen(PORT);

		client = new MongoClient(uri);
		await client.connect();
		const db = client.db();

		await db.collection('items').insertMany([
			{ id: 'test-helmet', name: 'Test Helmet', type: 'armor', equipType: 'helmet', rarity: 'Common', minLevel: 1, scaling: { defense: 0.5 } },
			{ id: 'test-chest', name: 'Test Chestplate', type: 'armor', equipType: 'chestpiece', rarity: 'Common', minLevel: 1, scaling: { defense: 1 } }
		]);

		await db.collection<any>('config').replaceOne(
			{ _id: 'game-config' },
			{
				_id: 'game-config',
				maxLevel: 175,
				pointsPerLevel: 2,
				statPointMaxFormula: 'level * 2',
				scalings: { power: 0.315, defense: 2.7, substat: 0.5, rounding: 'round' },
				statRegistry: {
					power: { category: 'primary', epPerPoint: 3.333, scaling: 'level' },
					defense: { category: 'primary', epPerPoint: 0.333, scaling: 'level' },
					size: { category: 'secondary', epPerPoint: 1, scaling: 'level' },
					haste: { category: 'secondary', epPerPoint: 1, scaling: 'level' },
					dexterity: { category: 'secondary', epPerPoint: 1, scaling: 'level' },
					range: { category: 'secondary', epPerPoint: 1, scaling: 'level' },
					regeneration: { category: 'secondary', epPerPoint: 1, scaling: 'level' },
					pierce: { category: 'secondary', epPerPoint: 1, scaling: 'level' },
					resistance: { category: 'secondary', epPerPoint: 1, scaling: 'level' },
					insanity: { category: 'tertiary', epPerPoint: -2.25, scaling: 'flat' },
					warding: { category: 'tertiary', epPerPoint: 0.15, scaling: 'flat' },
					drawback: { category: 'tertiary', epPerPoint: -0.15, scaling: 'flat' }
				},
				buildTypes: [],
				playerTransforms: {}
			},
			{ upsert: true }
		);

		await db.collection<any>('config').replaceOne(
			{ _id: 'formulas' },
			{
				_id: 'formulas',
				vitalityScaling: {
					description: 'Vitality multiplier for vitality-scaling items',
					expression: 'clamp((spirit / (level * 2)) * 3, floor, ceiling)',
					params: { spirit: 3, floor: 0.3, ceiling: 1 }
				},
				healthFormula: {
					description: 'Base health from level and defense',
					expression: '93 + level * 7 + defense + spirit * 4',
					params: {}
				},
				substatEfficiency: {
					description: 'Generic substat efficiency curve',
					expression: '(1.35 * ((16 * ln(0.1 * s + 4) ^ 3 * 0.09 + 0.15 * s) / (0.1 + 0.15 * sqrt(m)) - 0.79)) * eff * 100',
					params: { s: 0, m: 175, eff: 1 }
				}
			},
			{ upsert: true }
		);

		await db.collection('internalKeys').insertOne({
			keyHash: await Bun.password.hash(INTERNAL_KEY),
			keyPrefix: INTERNAL_KEY.slice(-4),
			label: 'test-internal',
			active: true,
			createdBy: 'test',
			createdAt: new Date()
		});
	}, 60_000);

	afterAll(async () => {
		server?.stop?.();
		await client?.close();
		await mongod?.stop();
	}, 60_000);

	it('health endpoint returns ok', async () => {
		const { status, json } = await api('/api/health');
		expect(status).toBe(200);
		expect(json).toEqual({ status: 'ok' });
	});

	it('public items endpoint returns items', async () => {
		const { status, json } = await api('/api/public/items');
		expect(status).toBe(200);
		expect(Array.isArray(json)).toBe(true);
		expect(json.length).toBe(2);
		expect(json[0]).toHaveProperty('id');
	});

	it('public config endpoint returns config and formulas', async () => {
		const { status, json } = await api('/api/public/config');
		expect(status).toBe(200);
		expect(json.config).toHaveProperty('maxLevel', 175);
		expect(json.formulas).toHaveProperty('vitalityScaling');
	});

	it('admin endpoints reject requests without internal key', async () => {
		const { status } = await api('/api/admin/items');
		expect(status).toBe(403);
	});

	it('admin items endpoint returns items with internal key', async () => {
		const { status, json } = await api('/api/admin/items', {
			headers: { 'X-Internal-Key': INTERNAL_KEY }
		});
		expect(status).toBe(200);
		expect(Array.isArray(json)).toBe(true);
		expect(json.length).toBe(2);
	});

	it('rate limits public requests to 6 per minute', async () => {
		await resetRateLimits();
		for (let i = 0; i < 6; i++) {
			const { status } = await api('/api/public/items');
			expect(status).toBe(200);
		}
		const { status } = await api('/api/public/items');
		expect(status).toBe(429);
	});

	it('creates and lists API keys', async () => {
		const create = await api('/api/admin/keys', {
			method: 'POST',
			headers: {
				'X-Internal-Key': INTERNAL_KEY,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: 'Test Key', owner: 'tester', rateLimit: 10, scopes: ['read'] })
		});
		expect(create.status).toBe(201);
		expect(create.json.key).toMatch(/^ao_/);

		const list = await api('/api/admin/keys', {
			headers: { 'X-Internal-Key': INTERNAL_KEY }
		});
		expect(list.status).toBe(200);
		expect(list.json.length).toBe(1);
		expect(list.json[0].name).toBe('Test Key');
	});

	it('manages admin IDs and users', async () => {
		const db = client.db();
		const user = await db.collection('user').insertOne({
			name: 'Test User',
			email: 'test@example.com',
			role: 'user',
			createdAt: new Date()
		});
		await db.collection('account').insertOne({
			userId: user.insertedId.toString(),
			providerId: 'discord',
			accountId: '123456789',
			createdAt: new Date()
		});

		const addAdmin = await api('/api/admin/admin-ids', {
			method: 'POST',
			headers: {
				'X-Internal-Key': INTERNAL_KEY,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ accountId: '123456789' })
		});
		expect(addAdmin.status).toBe(200);
		expect(addAdmin.json.success).toBe(true);

		const listIds = await api('/api/admin/admin-ids', {
			headers: { 'X-Internal-Key': INTERNAL_KEY }
		});
		expect(listIds.status).toBe(200);
		expect(listIds.json.length).toBe(1);
		expect(listIds.json[0].id).toBe('123456789');

		const listUsers = await api('/api/admin/users', {
			headers: { 'X-Internal-Key': INTERNAL_KEY }
		});
		expect(listUsers.status).toBe(200);
		expect(listUsers.json.length).toBe(1);
		expect(listUsers.json[0].roles).toContain('user');
		expect(listUsers.json[0].accounts[0].accountId).toBe('123456789');

		const promote = await api(`/api/admin/users/${user.insertedId.toString()}`, {
			method: 'PATCH',
			headers: {
				'X-Internal-Key': INTERNAL_KEY,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ roles: ['admin'] })
		});
		expect(promote.status).toBe(200);
		expect(promote.json.success).toBe(true);

		const removeAdmin = await api('/api/admin/admin-ids/123456789', {
			method: 'DELETE',
			headers: { 'X-Internal-Key': INTERNAL_KEY }
		});
		expect(removeAdmin.status).toBe(200);
		expect(removeAdmin.json.success).toBe(true);
	});

	describe('build codes', () => {
		it('encodes and decodes a build object', () => {
			const build = {
				version: '2026.1',
				player: { level: 150, spirit: 100, magic: 100, strength: 50, weapons: 50, awakened: false },
				selectedMagic: ['fire-magic'],
				selectedFS: ['basic-combat'],
				slots: [
					{
						key: 'accessory1',
						armorId: 'abc',
						level: 120,
						enchantId: 'powerful',
						modifierId: 'swift',
						gemIds: ['defense-gem'],
						attunement: null,
						amuletVariant: null
					}
				]
			};
			const code = encodeBuild(build as any);
			const decoded = decodeBuild(code);
			expect(decoded).toBeTruthy();
			expect(decoded!.player.level).toBe(150);
			expect(decoded!.slots[0].armorId).toBe('abc');
		});

		it('loads a legacy delimited code', () => {
			const legacy = '150|100|100|50|50|0|abc,powerful,swift,defense-gem,120';
			const loaded = tryLoadBuild(legacy);
			expect(loaded).toBeTruthy();
			expect(loaded!.migrated).toBe(true);
			expect(loaded!.build.player.level).toBe(150);
			expect(loaded!.build.player.spirit).toBe(100);
			expect(loaded!.build.slots[0].armorId).toBe('abc');
		});
	});

	describe('RBAC', () => {
		it('admin role has all permissions', () => {
			expect(hasPermission(ROLE_PERMISSIONS.admin, PERMISSIONS.ITEMS_WRITE)).toBe(true);
			expect(hasPermission(ROLE_PERMISSIONS.admin, PERMISSIONS.BUILDS_WRITE)).toBe(true);
		});

		it('editor role can write items but not users', () => {
			expect(hasPermission(ROLE_PERMISSIONS.editor, PERMISSIONS.ITEMS_WRITE)).toBe(true);
			expect(hasPermission(ROLE_PERMISSIONS.editor, PERMISSIONS.USERS_WRITE)).toBe(false);
		});

		it('api key scopes support wildcards', () => {
			expect(hasPermission(['builds.*'], PERMISSIONS.BUILDS_WRITE)).toBe(true);
			expect(hasPermission(['read'], PERMISSIONS.BUILDS_WRITE)).toBe(false);
		});
	});

	describe('build endpoints', () => {
		let apiKey: string;
		let readOnlyKey: string;
		let keyId: string;

		beforeAll(async () => {
			await resetRateLimits();
			const create = await api('/api/admin/keys', {
				method: 'POST',
				headers: {
					'X-Internal-Key': INTERNAL_KEY,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: 'Build Writer', owner: 'test', rateLimit: 1000, scopes: ['builds:write'] })
			});
			apiKey = create.json.key;
			keyId = create.json.id;

			const createRead = await api('/api/admin/keys', {
				method: 'POST',
				headers: {
					'X-Internal-Key': INTERNAL_KEY,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: 'Build Reader', owner: 'test', rateLimit: 1000, scopes: ['builds:read'] })
			});
			readOnlyKey = createRead.json.key;

			const db = client.db();
			await db.collection('user').insertOne({ id: keyId, maxBuilds: { gear: 2 } });
		});

		it('rejects build creation without builds:write scope', async () => {
			const { status } = await api('/api/builds', {
				method: 'POST',
				headers: {
					'X-Api-Key': readOnlyKey,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ type: 'gear', name: 'x', build: { version: '2026.1', player: { level: 1 }, slots: [], selectedMagic: [], selectedFS: [] } })
			});
			expect(status).toBe(403);
		});

		it('creates a public build with builds:write scope', async () => {
			const build = {
				version: '2026.1',
				player: { level: 150, spirit: 0, magic: 0, strength: 0, weapons: 0, awakened: false },
				selectedMagic: [],
				selectedFS: [],
				slots: []
			};
			const { status, json } = await api('/api/builds', {
				method: 'POST',
				headers: {
					'X-Api-Key': apiKey,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ type: 'gear', name: 'Test Build', build })
			});
			expect(status).toBe(201);
			expect(json.shortId).toBeTruthy();
			expect(json.shortId.length).toBe(10);

			const fetchPublic = await api(`/api/builds/${json.shortId}`);
			expect(fetchPublic.status).toBe(200);
			expect(fetchPublic.json.name).toBe('Test Build');
		});

		it('enforces build limits', async () => {
			const build = {
				version: '2026.1',
				player: { level: 1, spirit: 0, magic: 0, strength: 0, weapons: 0, awakened: false },
				selectedMagic: [],
				selectedFS: [],
				slots: []
			};
			const { status: first } = await api('/api/builds', {
				method: 'POST',
				headers: {
					'X-Api-Key': apiKey,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ type: 'gear', name: 'One', build })
			});
			const { status: second } = await api('/api/builds', {
				method: 'POST',
				headers: {
					'X-Api-Key': apiKey,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ type: 'gear', name: 'Two', build })
			});
			const { status: third } = await api('/api/builds', {
				method: 'POST',
				headers: {
					'X-Api-Key': apiKey,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ type: 'gear', name: 'Three', build })
			});
			expect(first).toBe(201);
			expect(second).toBe(403);
			expect(third).toBe(403);
		});
	});

	describe('formula-driven engine', () => {
		it('health formula matches hardcoded baseline', async () => {
			const { json } = await api('/api/public/config');
			const config = { ...json.config, formulas: json.formulas };
			const player = { level: 150, spirit: 100, magic: 0, strength: 0, weapons: 0, awakened: false, awakenedBuild: null };
			const stats = aggregateBuildStats([], player, config);
			expect(stats._health).toBe(93 + 150 * 7 + 0 + 100 * 4);
		});

		it('vitality scaling formula reduces stats', async () => {
			const { json } = await api('/api/public/config');
			const config = { ...json.config, formulas: json.formulas };
			const player = { level: 150, spirit: 100, magic: 0, strength: 0, weapons: 0, awakened: false, awakenedBuild: null };
			const slot = {
				key: 'chestplate',
				equipType: 'chestpiece',
				armor: { id: 'vit-chest', type: 'armor', scaling: { power: 1 }, tags: ['vitality-scaling'], minLevel: 1 },
				level: 150,
				enchant: null,
				modifier: null,
				gems: [],
				attunement: null,
				amuletVariant: null
			};
			const raw = getSlotStats(slot as any, player, config);
			const multiplier = Math.min(Math.max((100 / (150 * 2)) * 3, 0.3), 1);
			expect(raw.power).toBe(Math.floor(Math.round(150 * config.scalings.power) * multiplier));
		});

		it('substat efficiency formula matches hardcoded baseline', async () => {
			const { json } = await api('/api/public/config');
			const config = { ...json.config, formulas: json.formulas };
			const result = secondaryStatEffect('size', 100, 175, config);
			expect(result).toBe('1483.0%');
		});
	});
});
