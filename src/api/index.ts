import Queries from "./queries/index.js";
import Utilities from "../utilities/index.js";
import type { CacheOptions } from "../types/pnwkit.js";
import graphQLService from "../services/graphQL.js";
import Subscriptions from "./subscriptions/index.js";

/**
 * Base API class for PnWKit that provides access to queries and utilities.
 * 
 * Handles cache initialization and provides cache management methods.
 * All GraphQL queries flow through this class to the underlying GraphQLService.
 * 
 * @internal
 */
export default class PnwKitApi
{
    /** Query builders for all Politics & War GraphQL queries */
    public readonly queries: Queries;

    public readonly subscriptions: Subscriptions;
    
    /** Utility functions for calculations and data transformations */
    public readonly utilities: Utilities;
    
    /** Cache configuration (if enabled) */
    protected readonly cacheOptions?: CacheOptions | undefined;

    /**
     * Create a new PnwKitApi instance.
     * 
     * Initializes the cache (if options provided) before setting up queries and utilities.
     * The GraphQL service uses a singleton pattern, so the first initialization sets
     * the cache configuration for all instances.
     * 
     * @param apiKey - Politics & War API key for authentication
     * @param cacheOptions - Optional cache configuration (LRU with TTL)
     */
    constructor(protected readonly apiKey: string, cacheOptions?: CacheOptions) 
    {
        this.cacheOptions = cacheOptions;
        
        // Initialize cache if options provided
        if (cacheOptions)
            graphQLService.initializeCache(cacheOptions);
        
        this.queries = new Queries(this);
        this.subscriptions = new Subscriptions(this.apiKey);
        this.utilities = new Utilities();
    }
    
    /**
     * Clear all cached query responses.
     * 
     * Useful for forcing fresh data retrieval or managing memory usage.
     * Safe to call even if caching is disabled.
     */
    public clearCache(): void {
        graphQLService.clearCache();
    }
    
    /**
     * Get cache statistics including current size and maximum capacity.
     * 
     * @returns Object with `size` (current entries) and `max` (capacity limit),
     *          or undefined if caching is disabled
     */
    public getCacheStats(): { size: number; max: number; } | undefined {
        return graphQLService.getCacheStats();
    }
}

