import { z } from 'zod';

const schema = z.object({
	PORT: z.string().default('4000'),
	MONGO_CONNECT_URL: z.string().min(1),
	BETTER_AUTH_SECRET: z.string().min(1),
	BETTER_AUTH_URL: z.string().url().min(1),
	DISCORD_CLIENT_ID: z.string().default(''),
	DISCORD_CLIENT_SECRET: z.string().default(''),
	ADMIN_DISCORD_IDS: z.string().default(''),
	INTERNAL_API_KEY: z.string().min(1),
	ALLOWED_ORIGINS: z.string().min(1),
	REDIS_URL: z.string().optional(),
	API_URL: z.string().url().optional()
});

export const config = schema.parse(process.env);

export const allowedOrigins = config.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean);
export const hasDiscordOAuth = config.DISCORD_CLIENT_ID !== '' && config.DISCORD_CLIENT_SECRET !== '';
