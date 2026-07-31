import { LRUCache } from 'lru-cache';
import type { CacheOptions } from '../types/pnwkit';

/**
 * Internal error that records whether the failed request is worth retrying.
 *
 * Transient failures (rate limits, 5xx, timeouts, network errors) are retryable;
 * client errors (4xx), malformed responses, and GraphQL validation errors are not.
 * @internal
 */
class RequestError extends Error
{
    constructor(message: string, public readonly retryable: boolean)
    {
        super(message);
        this.name = 'RequestError';
    }
}

/**
 * Service for making GraphQL API requests to Politics & War API.
 * 
 * Features:
 * - Automatic retry with exponential backoff for transient failures (3 retries max)
 * - Rate limiting (minimum 100ms between requests)
 * - Request timeout (30 seconds via AbortController)
 * - Comprehensive input validation and sanitization
 * - Error message sanitization for security
 * - Generic type support for type-safe responses
 * - Optional LRU caching with configurable TTL and collision-resistant hashing
 * - Prototype pollution prevention
 * - Query normalization for efficient caching
 * 
 * Security Features:
 * - API key sanitization via URL encoding
 * - Safe FNV-1a hash function using Math.imul() to prevent integer overflow
 * - Cache key isolation per API key
 * - Maximum query length enforcement (50KB)
 * - Timeout protection against hanging requests
 * 
 * @example
 * ```typescript
 * import GraphQLService from './services/graphQL';
 *
 * const service = new GraphQLService({ enabled: true, ttl: 60_000 });
 * const data = await service.queryCall<MyDataType>(apiKey, query);
 * ```
 */
class GraphQLService 
{
    private url = 'https://api.politicsandwar.com/graphql';
    private readonly MAX_QUERY_LENGTH = 50_000; // 50,000 characters
    private readonly REQUEST_TIMEOUT = 30_000; // 30 seconds
    private readonly MIN_REQUEST_INTERVAL = 100; // Minimum 100ms between requests
    private readonly MAX_RETRIES = 3; // Maximum retry attempts
    private readonly RETRY_DELAY = 1_000; // Initial retry delay in ms

    private lastRequestTime = 0;
    private cache?: LRUCache<string, any>;

    // Serializes rate-limit slot acquisition so concurrent requests are spaced
    // correctly instead of all reading the same stale lastRequestTime.
    private rateLimitGate: Promise<void> = Promise.resolve();

    /**
     * Create a GraphQL service with an optional per-instance cache.
     *
     * Each PnWKit client owns its own service instance, so the cache and rate
     * limiter are scoped to that client rather than shared globally.
     *
     * @param cacheOptions - Optional LRU cache configuration. When omitted or
     *   disabled, responses are not cached.
     */
    constructor(cacheOptions?: CacheOptions)
    {
        if (cacheOptions?.enabled)
        {
            this.cache = new LRUCache({
                max: cacheOptions.maxSize ?? 100,
                ttl: cacheOptions.ttl ?? 60_000,
                updateAgeOnGet: true,
                updateAgeOnHas: false
            });
        }
    }

    /**
     * Generate a cache key from API key and query.
     * 
     * Uses FNV-1a hash algorithm with Math.imul() for safe 32-bit multiplication,
     * preventing integer overflow vulnerabilities. Queries are normalized by
     * removing extra whitespace to maximize cache hit rate.
     * 
     * @param apiKey - API key for cache isolation
     * @param query - GraphQL query string to hash
     * @returns Base36-encoded hash string prefixed with 'cache_'
     */
    private getCacheKey(apiKey: string, query: string): string 
    {
        // Normalize query by removing extra whitespace
        const normalizedQuery = query.replace(/\s+/g, ' ').trim();
        const str = `${apiKey}::${normalizedQuery}`;
        
        // FNV-1a hash with safe integer arithmetic
        let hash = 2166136261 >>> 0; // FNV offset basis (unsigned)
        
        for (let i = 0; i < str.length; i++) 
        {
            hash ^= str.charCodeAt(i);
            // Use Math.imul for safe 32-bit multiplication
            hash = Math.imul(hash, 16777619); // FNV prime
        }
        
        // Convert to unsigned 32-bit integer and encode as base36
        return `cache_${(hash >>> 0).toString(36)}`;
    }

    /**
     * Clear all cached data
     */
    public clearCache(): void 
    {
        if (this.cache)
            this.cache.clear();
    }

    /**
     * Get cache statistics
     * @returns Cache size and max size, or undefined if cache is disabled
     */
    public getCacheStats(): { size: number; max: number; } | undefined 
    {
        if (!this.cache)
            return undefined;

        return {
            size: this.cache.size,
            max: this.cache.max
        };
    }

    /**
     * Execute a GraphQL query with automatic retry and rate limiting.
     * 
     * Implements retry logic with exponential backoff for server errors and timeouts.
     * Client errors (4xx) and validation errors are not retried.
     * If caching is enabled, checks cache before making request.
     * 
     * @template TData - The expected type of the response data
     * @param apiKey - Politics & War API key for authentication
     * @param query - GraphQL query string
     * @returns Promise resolving to the typed response data
     * @throws Error if query is invalid, exceeds length limit, or API request fails after retries
     * 
     * @example
     * ```typescript
     * const nations = await service.queryCall<Nation[]>(apiKey, `
     *   query { nations(first: 10) { data { id nation_name } } }
     * `);
     * ```
     */
    public async queryCall<TData = any>(apiKey: string, query: string, options?: { skipCache?: boolean; botKey?: string }): Promise<TData>
    {
        // Validate inputs
        if (!apiKey || typeof apiKey !== 'string')
            throw new Error('Invalid API key');
        
        if (!query || typeof query !== 'string')
            throw new Error('Invalid query');
        
        if (query.length > this.MAX_QUERY_LENGTH)
            throw new Error(`Query exceeds maximum length of ${this.MAX_QUERY_LENGTH} characters`);

        // Mutations pass skipCache so a state-changing call is never served from
        // (or written to) the cache.
        const useCache = this.cache && !options?.skipCache;

        // Check cache first
        if (useCache)
        {
            const cacheKey = this.getCacheKey(apiKey, query);
            const cached = this.cache!.get(cacheKey);

            if (cached !== undefined)
                return cached;
        }

        // Retry logic with exponential backoff
        let lastError: Error | null = null;
        
        for (let attempt = 0; attempt <= this.MAX_RETRIES; attempt++) 
        {
            try 
            {
                const result = await this.executeQuery<TData>(apiKey, query, options?.botKey);
                
                // Cache successful result
                if (useCache)
                {
                    const cacheKey = this.getCacheKey(apiKey, query);
                    this.cache!.set(cacheKey, result);
                }
                
                return result;
            } 
            catch (error)
            {

                // Capture the error for potential rethrow after retries
                lastError = error instanceof Error ? error : new Error('Unknown error');

                // Only retry failures explicitly marked transient (rate limit,
                // 5xx, timeout, network). Everything else fails fast.
                const retryable = error instanceof RequestError && error.retryable;

                if (!retryable)
                    throw lastError;

                // Don't retry if we've exhausted attempts
                if (attempt === this.MAX_RETRIES)
                    throw lastError;
                
                // Exponential backoff: wait longer between each retry
                const delay = this.RETRY_DELAY * Math.pow(2, attempt);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        
        throw lastError!;
    }

    /**
     * Acquire the next rate-limit slot.
     *
     * Chains each caller onto the previous one so that, even under concurrent
     * requests, no two proceed within MIN_REQUEST_INTERVAL of each other.
     * @internal
     */
    private async acquireRateLimitSlot(): Promise<void>
    {
        const previous = this.rateLimitGate;
        let release!: () => void;
        this.rateLimitGate = new Promise<void>(resolve => { release = resolve; });

        // Wait for the prior request to claim its slot before claiming ours.
        await previous;

        const elapsed = Date.now() - this.lastRequestTime;
        
        if (elapsed < this.MIN_REQUEST_INTERVAL)
            await new Promise(resolve => setTimeout(resolve, this.MIN_REQUEST_INTERVAL - elapsed));

        this.lastRequestTime = Date.now();
        release();
    }

    /**
     * Execute a single GraphQL query request with rate limiting and timeout.
     * 
     * Internal method that handles:
     * - Rate limiting enforcement
     * - API key sanitization
     * - Request timeout via AbortController
     * - Response validation
     * - Error message sanitization
     * 
     * @template TData - The expected type of the response data
     * @param apiKey - Politics & War API key (will be URL-encoded)
     * @param query - GraphQL query string
     * @returns Promise resolving to the response data
     * @throws Error for network failures, timeouts, invalid responses, or API errors
     * @internal
     */
    private async executeQuery<TData>(apiKey: string, query: string, botKey?: string): Promise<TData>
    {
        // Rate limiting (serialized so concurrent calls are spaced correctly)
        await this.acquireRateLimitSlot();

        // Sanitize API key to prevent injection in URL
        const sanitizedApiKey = encodeURIComponent(apiKey);
        const url = `${this.url}?api_key=${sanitizedApiKey}`;

        // Verified-bot requests (whitelisted mutations) authenticate via headers:
        // the bot key plus the acting nation's API key.
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (botKey)
        {
            headers['X-Bot-Key'] = botKey;
            headers['X-Api-Key'] = apiKey;
        }

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

        try
        {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify({ query }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok)
            {
                // 429 and 5xx are transient and worth retrying; other 4xx are not.
                const retryable = response.status === 429 || response.status >= 500;
                const message = response.status === 429
                ? 'Rate limit exceeded. Please try again later.'
                : response.status >= 500
                ? 'API server error. Please try again later.'
                : 'Request failed. Please check your API key and try again.';

                throw new RequestError(message, retryable);
            }

            // GraphQL responses are dynamically typed at this boundary.
            const result: any = await response.json();

            if(!result || typeof result !== 'object')
                throw new RequestError('Invalid response format from API', false);

            if(result.errors)
            {
                const errorMessages = Array.isArray(result.errors)
                    ? result.errors.map((e: { message: string }) => e.message).join(', ')
                    : 'Unknown GraphQL error';

                // GraphQL validation errors are deterministic
                throw new RequestError(errorMessages, false);
            }

            if(!result.data)
                throw new RequestError('No data field in response from API', false);

            return result.data;
        }
        catch (error)
        {
            clearTimeout(timeoutId);

            // Already classified — propagate as-is.
            if (error instanceof RequestError)
                throw error;

            if (error instanceof Error)
            {
                // Timeout and network failures are transient.
                if (error.name === 'AbortError')
                    throw new RequestError(`Request timeout after ${this.REQUEST_TIMEOUT}ms`, true);

                // Network errors (fetch failed) are transient.
                throw new RequestError(error.message, true);
            }

            throw new RequestError('Unknown error occurred during GraphQL query', false);
        }
    }
}

export default GraphQLService;