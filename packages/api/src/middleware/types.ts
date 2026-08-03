export type AuthContext =
	| { type: 'internal'; scopes: string[]; rateLimit: null }
	| { type: 'apiKey'; keyId: string; scopes: string[]; rateLimit: number }
	| { type: 'session'; user: any; roles: string[]; permissions: string[] }
	| { type: 'public' };
