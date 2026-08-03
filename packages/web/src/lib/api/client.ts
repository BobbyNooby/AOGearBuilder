import { PUBLIC_API_URL } from '$env/static/public';

const base = import.meta.env.DEV ? '' : PUBLIC_API_URL;

export async function apiClient(path: string, options: RequestInit = {}) {
	const res = await fetch(`${base}${path}`, {
		...options,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		}
	});

	if (!res.ok) {
		const text = await res.text().catch(() => res.statusText);
		throw new Error(`API ${path} returned ${res.status}: ${text}`);
	}

	return res.json();
}
