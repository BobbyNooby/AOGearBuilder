import { apiFetch } from '$lib/api';

export async function load() {
	try {
		const items = await apiFetch('/api/public/items');
		return { items };
	} catch (e) {
		console.error('Atlas load failed:', e);
		return { items: [] };
	}
}
