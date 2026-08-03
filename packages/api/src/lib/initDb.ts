import { getDb } from '../db';
import { ROLE_PERMISSIONS } from '@aotools/shared';
import fs from 'fs';
import path from 'path';

const COLLECTIONS = [
	'items',
	'magics',
	'fightingStyles',
	'modifiers',
	'config',
	'apiKeys',
	'adminIds',
	'builds',
	'internalKeys',
	'roles'
];

function stripComments(raw: string) {
	return raw
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/\/\/.*$/gm, '');
}

export async function initDb() {
	const db = getDb();
	const existing = await db.listCollections().toArray();
	const existingNames = new Set(existing.map((c) => c.name));

	for (const name of COLLECTIONS) {
		if (!existingNames.has(name)) {
			await db.createCollection(name);
			console.log(`📦 Created collection: ${name}`);
		}
	}

	const rolesCol = db.collection<any>('roles');
	for (const [id, permissions] of Object.entries(ROLE_PERMISSIONS)) {
		await rolesCol.updateOne(
			{ _id: id },
			{
				$setOnInsert: {
					name: id[0].toUpperCase() + id.slice(1),
					description: '',
					permissions,
					system: true,
					createdAt: new Date()
				}
			},
			{ upsert: true }
		);
	}

	const { ObjectId } = await import('mongodb');
	const userCol = db.collection<any>('user');
	const users = await userCol.find({ roles: { $exists: false } }).toArray();
	for (const user of users) {
		const role = user.role === 'admin' ? 'admin' : 'user';
		await userCol.updateOne(
			{ _id: new ObjectId(user._id) },
			{ $set: { roles: [role] } }
		);
	}

	const configCol = db.collection<any>('config');
	const existingFormulas = await configCol.findOne({ _id: 'formulas' });
	if (!existingFormulas) {
		const formulasPath = path.resolve(import.meta.dir, '..', '..', '..', '..', 'data', 'config', 'formulas.jsonc');
		const raw = fs.readFileSync(formulasPath, 'utf8');
		const formulas = JSON.parse(stripComments(raw));
		await configCol.insertOne({ _id: 'formulas', ...formulas });
		console.log('🌱 Seeded default formulas');
	}

	console.log(`🗄️  Connected to database: ${db.databaseName}`);
}
