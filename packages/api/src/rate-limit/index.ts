import { config } from '../config';
import { MemoryRateLimitStore } from './memory';
import { RedisRateLimitStore } from './redis';
import type { RateLimitStore } from './types';

export * from './types';

export function createRateLimitStore(): RateLimitStore {
	if (config.REDIS_URL) {
		return new RedisRateLimitStore(config.REDIS_URL);
	}
	return new MemoryRateLimitStore();
}

export { MemoryRateLimitStore, RedisRateLimitStore };

