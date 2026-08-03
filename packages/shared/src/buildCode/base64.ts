export function base64urlEncode(str: string): string {
	if (typeof Buffer !== 'undefined') {
		return Buffer.from(str, 'utf-8')
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	}
	const base64 = btoa(str);
	return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function base64urlDecode(str: string): string {
	const padding = '='.repeat((4 - (str.length % 4)) % 4);
	const base64 = str.replace(/-/g, '+').replace(/_/g, '/') + padding;
	if (typeof Buffer !== 'undefined') {
		return Buffer.from(base64, 'base64').toString('utf-8');
	}
	return atob(base64);
}
