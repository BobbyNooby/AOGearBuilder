import { redirect, error } from '@sveltejs/kit';
import { API_BASE_URL, INTERNAL_API_KEY } from '$env/static/private';
import { encodeBuild } from '@aotools/shared';

export async function load({ params }: { params: { shortId: string } }) {
	const { shortId } = params;
	const res = await fetch(`${API_BASE_URL}/api/builds/${encodeURIComponent(shortId)}`, {
		headers: {
			'Content-Type': 'application/json',
			'X-Internal-Key': INTERNAL_API_KEY
		}
	});

	if (!res.ok) {
		error(res.status, 'Build not found or not accessible');
	}

	const data = await res.json();
	const code = encodeBuild(data.build);
	redirect(307, `/builder?shortId=${encodeURIComponent(shortId)}&code=${encodeURIComponent(code)}`);
}
