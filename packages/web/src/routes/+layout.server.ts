import { loadGameConfig } from '$lib/config/load';
import { API_BASE_URL } from '$env/static/private';

export async function load({ cookies, request }) {
	const config = await loadGameConfig();
	const cookieHeader = cookies.getAll().map((c) => `${c.name}=${c.value}`).join('; ');

	let user = null;
	let permissions: string[] = [];
	try {
		const res = await fetch(`${API_BASE_URL}/api/me`, {
			headers: cookieHeader ? { Cookie: cookieHeader } : {}
		});
		if (res.ok) {
			const me = await res.json();
			user = me.user ?? null;
			permissions = me.permissions ?? [];
		}
	} catch (e) {
		// unauthenticated or API unavailable
	}

	return {
		gameMaxLevel: config.maxLevel,
		scalings: config.scalings,
		statRegistry: config.statRegistry,
		user,
		permissions
	};
}
