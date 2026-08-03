import { cors } from '@elysiajs/cors';
import { allowedOrigins } from '../config';

export const corsMiddleware = cors({
	origin: (request: Request) => {
		const origin = request.headers.get('origin') ?? '';
		return allowedOrigins.includes(origin) || allowedOrigins.includes('*');
	},
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Internal-Key', 'X-API-Key'],
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
});
