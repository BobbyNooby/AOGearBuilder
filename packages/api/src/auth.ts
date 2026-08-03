import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { admin } from 'better-auth/plugins';
import { getDb } from './db';
import { config, hasDiscordOAuth, allowedOrigins } from './config';
import { getAdminDiscordIds } from './lib/adminIds';

export const auth = betterAuth({
	database: mongodbAdapter(getDb()),
	secret: config.BETTER_AUTH_SECRET,
	baseURL: config.BETTER_AUTH_URL,
	trustedOrigins: allowedOrigins,
	advanced: {
		defaultCookieAttributes: config.BETTER_AUTH_URL.startsWith('https://')
			? {
					sameSite: 'none',
					secure: true,
					httpOnly: true
				}
			: {
					sameSite: 'lax',
					secure: false,
					httpOnly: true
				}
	},
	socialProviders: hasDiscordOAuth
		? {
				discord: {
					clientId: config.DISCORD_CLIENT_ID,
					clientSecret: config.DISCORD_CLIENT_SECRET
				}
			}
		: undefined,
	user: {
		additionalFields: {
			role: {
				type: 'string',
				defaultValue: 'user'
			}
		}
	},
	plugins: [admin()],
	databaseHooks: {
		user: {
			create: {
				async after(user) {
					const { ObjectId } = await import('mongodb');
					await getDb()
						.collection('user')
						.updateOne({ _id: new ObjectId(user.id) }, { $set: { roles: ['user'] } });
				}
			}
		},
		account: {
			create: {
				async after(account) {
					if ((account as any).providerId !== 'discord') return;
					const adminDiscordIds = await getAdminDiscordIds();
					const { ObjectId } = await import('mongodb');
					const userId = new ObjectId((account as any).userId);
					const userColl = getDb().collection('user');
					if (adminDiscordIds.has((account as any).accountId)) {
						await userColl.updateOne({ _id: userId }, { $set: { role: 'admin', roles: ['admin'] } });
					} else {
						await userColl.updateOne({ _id: userId }, { $set: { roles: ['user'] } });
					}
				}
			}
		}
	}
});
