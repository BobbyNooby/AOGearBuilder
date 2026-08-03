export interface RateLimitResult {
	allowed: boolean;
	retryAfter?: number;
}

export interface RateLimitStore {
	check(key: string, max: number, windowMs: number): Promise<RateLimitResult> | RateLimitResult;
	reset(key?: string): Promise<void> | void;
}
