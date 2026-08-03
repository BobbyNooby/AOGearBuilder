import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_API_URL } from '$env/static/public';

export const authClient = createAuthClient({
	baseURL: PUBLIC_API_URL,
	fetchOptions: {
		credentials: 'include'
	}
});
