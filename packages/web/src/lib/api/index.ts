import { API_BASE_URL, INTERNAL_API_KEY } from '$env/static/private';

export async function apiFetch(path: string, options: RequestInit = {}) {
	const headers = new Headers(options.headers);
	headers.set('Content-Type', 'application/json');
	headers.set('X-Internal-Key', INTERNAL_API_KEY);

	const res = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers
	});

	if (!res.ok) {
		const text = await res.text().catch(() => res.statusText);
		throw new Error(`API ${path} returned ${res.status}: ${text}`);
	}

	return res.json();
}
