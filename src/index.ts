import PnwKitApi from "./api/index.js";
import type { PnWKitOptions } from "./types/pnwkit.js";

/**
 * Main PnWKit client for interacting with the Politics & War API.
 * 
 * Provides a type-safe, fluent API for querying Politics & War GraphQL endpoints
 * with built-in retry logic, rate limiting, and optional caching.
 * 
 * @category Main
 * @example
 * ```typescript
 * // Simple usage without caching
 * const pnwkit = new PnWKit("your-api-key");
 * 
 * // With LRU caching enabled (recommended for production)
 * const pnwkit = new PnWKit("your-api-key", {
 *   cache: {
 *     enabled: true,
 *     ttl: 60000,    // Cache for 1 minute
 *     maxSize: 100   // Store up to 100 queries
 *   }
 * });
 * 
 * // Query nations with filters
 * const nations = await pnwkit.queries.nations()
 *   .select('id', 'nation_name', 'score')
 *   .where({ min_score: 1000, first: 10 })
 *   .execute();
 * 
 * // Query alliances with nested relations
 * const alliances = await pnwkit.queries.alliances()
 *   .select('id', 'name')
 *   .include('nations', builder => builder.select('id', 'nation_name'))
 *   .where({ first: 5 })
 *   .execute();
 * 
 * // Manage cache
 * pnwkit.clearCache(); // Clear all cached queries
 * const stats = pnwkit.getCacheStats(); // Check cache utilization
 * ```
*/
export default class PnWKit extends PnwKitApi
{

    /**
     * Create a new PnWKit instance.
     * 
     * @param apiKey - Your Politics & War API key
     * @param options - Optional configuration including cache settings
     * 
     * @example
     * ```typescript
     * // Without caching
     * const pnwkit = new PnWKit("your-api-key");
     * 
     * // With caching
     * const pnwkit = new PnWKit("your-api-key", {
     *   cache: { enabled: true, ttl: 60000, maxSize: 100 }
     * });
     * ```
     */
    constructor(apiKey: string, options?: PnWKitOptions) {

        super(apiKey, options?.cache);
    }
}

// Public class re-exports so the container classes and every query builder are
// documented as first-class entries and importable by consumers.
export { default as Queries } from "./api/queries/index.js";
export { default as Subscriptions } from "./api/subscriptions/index.js";
export { default as Utilities } from "./utilities/index.js";
export * from "./api/queries/index.js";

// Public type re-exports so consumers can import the option/input shapes by name
// and TypeDoc documents them as first-class entries.
export type { PnWKitOptions, CacheOptions } from "./types/pnwkit.js";
export type {
    subscriptionData,
    SubscriptionParams,
    EventTime,
    Model,
    Event,
} from "./types/subscriptions/other.js";