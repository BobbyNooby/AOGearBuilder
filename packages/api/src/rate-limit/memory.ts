import type { RateLimitStore, RateLimitResult } from './types';

interface Bucket {
	count: number;
	resetAt: number;
}

export class MemoryRateLimitStore implements RateLimitStore {
	private buckets = new Map<string, Bucket>();

	reset(key?: string): void {
		if (key) {
			this.buckets.delete(key);
		} else {
			this.buckets.clear();
		}
	}

	check(key: string, max: number, windowMs: number): RateLimitResult {
		const now = Date.now();
		const bucket = this.buckets.get(key);

		if (!bucket || bucket.resetAt <= now) {
			this.buckets.set(key, { count: 1, resetAt: now + windowMs });
			return { allowed: true };
		}

		if (bucket.count < max) {
			bucket.count++;
			return { allowed: true };
		}

		return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
	}
}
