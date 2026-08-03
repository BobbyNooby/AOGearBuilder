import Redis from 'ioredis';
import type { RateLimitStore, RateLimitResult } from './types';

export class RedisRateLimitStore implements RateLimitStore {
	private redis: Redis;

	constructor(url: string) {
		this.redis = new Redis(url);
	}

	async reset(key?: string): Promise<void> {
		if (key) {
			await this.redis.del(`rl:${key}`);
		} else {
			const keys = await this.redis.keys('rl:*');
			if (keys.length) await this.redis.del(...keys);
		}
	}

	async check(key: string, max: number, windowMs: number): Promise<RateLimitResult> {
		const redisKey = `rl:${key}`;

		const count = await this.redis.incr(redisKey);
		if (count === 1) {
			await this.redis.pexpire(redisKey, windowMs);
		}

		if (count <= max) {
			return { allowed: true };
		}

		const ttl = await this.redis.pttl(redisKey);
		return { allowed: false, retryAfter: Math.max(1, Math.ceil(ttl / 1000)) };
	}
}
