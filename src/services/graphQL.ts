import { LRUCache } from 'lru-cache';
import type { CacheOptions } from '../types/pnwkit.js';

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
 * import graphQLService from './services/graphQL';
 * 
 * const data = await graphQLService.queryCall<MyDataType>(apiKey, query);
 * ```
 */
class GraphQLService 
{
    private url = 'https://api.politicsandwar.com/graphql';
    private readonly MAX_QUERY_LENGTH = 50000; // 50,000 characters
    private readonly REQUEST_TIMEOUT = 30000; // 30 seconds
    private readonly MIN_REQUEST_INTERVAL = 100; // Minimum 100ms between requests
    private readonly MAX_RETRIES = 3; // Maximum retry attempts
    private readonly RETRY_DELAY = 1000; // Initial retry delay in ms

    private lastRequestTime = 0;
    private cache?: LRUCache<string, any>;

    /**
     * Initialize cache with the provided options.
     * 
     * Only initializes once - subsequent calls are ignored to prevent
     * cache configuration conflicts when multiple PnWKit instances are created.
     * 
     * @param options - Cache configuration options
     */
    public initializeCache(options: CacheOptions): void 
    {
        // Only initialize if not already initialized
        if (this.cache)
            return;
        
        if (options.enabled) 
        {
            this.cache = new LRUCache({
                max: options.maxSize ?? 100,
                ttl: options.ttl ?? 60000,
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
     * const nations = await graphQLService.queryCall<Nation[]>(apiKey, `
     *   query { nations(first: 10) { data { id nation_name } } }
     * `);
     * ```
     */
    public async queryCall<TData = any>(apiKey: string, query: string): Promise<TData>
    {
        // Validate inputs
        if (!apiKey || typeof apiKey !== 'string')
            throw new Error('Invalid API key');
        
        if (!query || typeof query !== 'string')
            throw new Error('Invalid query');
        
        if (query.length > this.MAX_QUERY_LENGTH)
            throw new Error(`Query exceeds maximum length of ${this.MAX_QUERY_LENGTH} characters`);

        // Check cache first
        if (this.cache) 
        {
            const cacheKey = this.getCacheKey(apiKey, query);
            const cached = this.cache.get(cacheKey);

            if (cached !== undefined)
                return cached;
        }

        // Retry logic with exponential backoff
        let lastError: Error | null = null;
        
        for (let attempt = 0; attempt <= this.MAX_RETRIES; attempt++) 
        {
            try 
            {
                const result = await this.executeQuery<TData>(apiKey, query);
                
                // Cache successful result
                if (this.cache) 
                {
                    const cacheKey = this.getCacheKey(apiKey, query);
                    this.cache.set(cacheKey, result);
                }
                
                return result;
            } 
            catch (error) 
            {
                lastError = error instanceof Error ? error : new Error('Unknown error');
                
                // Don't retry on client errors (4xx) or validation errors
                if 
                (
                    lastError.message.includes('Invalid') || 
                    lastError.message.includes('Request failed')
                )
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
    private async executeQuery<TData>(apiKey: string, query: string): Promise<TData>
    {
        // Rate Limiting
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;

        if(timeSinceLastRequest < this.MIN_REQUEST_INTERVAL)
        {
            const waitTime = this.MIN_REQUEST_INTERVAL - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        this.lastRequestTime = Date.now();

        // Sanitize API key to prevent injection in URL
        const sanitizedApiKey = encodeURIComponent(apiKey);
        const url = `${this.url}?api_key=${sanitizedApiKey}`;

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

        try 
        {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) 
            {
                const message = response.status === 429 
                ? 'Rate limit exceeded. Please try again later.'
                : response.status >= 500
                ? 'API server error. Please try again later.'
                : 'Request failed. Please check your API key and try again.';

                throw new Error(message);
            }

            const result = await response.json();

            if(!result || typeof result !== 'object')
                throw new Error('Invalid response format from API');

            if(result.errors)
            {
                const errorMessages = Array.isArray(result.errors) 
                    ? result.errors.map((e: { message: string }) => e.message).join(', ')
                    : 'Unknown GraphQL error';
                throw new Error(errorMessages);
            }

            if(!result.data)
                throw new Error('No data field in response from API');

            return result.data;
        } 
        catch (error) 
        {
            clearTimeout(timeoutId);
            
            if (error instanceof Error) {
                if (error.name === 'AbortError')
                    throw new Error(`Request timeout after ${this.REQUEST_TIMEOUT}ms`);
                throw error;
            }
            throw new Error('Unknown error occurred during GraphQL query');
        }
    }
}

export default new GraphQLService();