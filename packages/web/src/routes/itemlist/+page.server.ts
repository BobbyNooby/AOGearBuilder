import { apiFetch } from '$lib/api';

export async function load() {
	try {
		const items = await apiFetch('/api/public/items?types=armor,accessory');
		return { items };
	} catch (e) {
		console.error('Item list load failed:', e);
		return { items: [] };
	}
}
