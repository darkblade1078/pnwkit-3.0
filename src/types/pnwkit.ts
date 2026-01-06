/**
 * Cache configuration options for API responses.
 * 
 * Uses an LRU (Least Recently Used) cache with TTL support for efficient memory management.
 * The cache uses FNV-1a hashing with collision-resistant algorithms to ensure data integrity.
 * 
 * @example
 * ```typescript
 * const cacheOptions: CacheOptions = {
 *   enabled: true,
 *   ttl: 300000,    // 5 minutes
 *   maxSize: 500    // Store up to 500 unique queries
 * };
 * ```
*/
export interface CacheOptions {
    /** Enable response caching */
    enabled: boolean;
    /** Time-to-live for cached responses in milliseconds (default: 60000 = 1 minute) */
    ttl?: number;
    /** Maximum number of cached responses (default: 100) */
    maxSize?: number;
}

/**
 * PnWKit configuration options.
 * 
 * All options are optional. When cache is omitted or disabled, all queries
 * will be sent directly to the Politics & War API without caching.
*/
export interface PnWKitOptions {
    cache?: CacheOptions;
}
