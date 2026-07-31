import Queries from "./queries/index";
import Mutations from "./mutations/index";
import Utilities from "../utilities/index";
import type { CacheOptions } from "../types/pnwkit";
import GraphQLService from "../services/graphQL";
import Subscriptions from "./subscriptions/index";

/**
 * Base API class for PnWKit that provides access to queries and utilities.
 *
 * Owns this client's GraphQL service instance (with its own cache and rate
 * limiter) and provides cache management methods.
 *
 * The public members here (`queries`, `subscriptions`, `utilities`, and the
 * cache methods) form the inherited surface of the {@link default | PnWKit}
 * client, so this class is part of the documented public API.
 */
export default class PnwKitApi
{
    /** Query builders for all Politics & War GraphQL queries */
    public readonly queries: Queries;

    /** Mutation builders for all Politics & War GraphQL mutations */
    public readonly mutations: Mutations;

    public readonly subscriptions: Subscriptions;
    
    /** Utility functions for calculations and data transformations */
    public readonly utilities: Utilities;
    
    /** Cache configuration (if enabled) */
    protected readonly cacheOptions?: CacheOptions | undefined;

    /** Verified-bot key used to authorize whitelisted mutations (if provided) @internal */
    protected readonly botKey?: string | undefined;

    /** This client's GraphQL service (owns its cache and rate limiter) @internal */
    protected readonly graphQL: GraphQLService;

    /**
     * Create a new PnwKitApi instance.
     *
     * Sets up a client-scoped GraphQL service (with cache, if configured) before
     * wiring up queries, subscriptions, and utilities.
     *
     * @param apiKey - Politics & War API key for authentication
     * @param cacheOptions - Optional cache configuration (LRU with TTL)
     * @param botKey - Optional verified-bot key for authorizing whitelisted mutations
     */
    constructor(protected readonly apiKey: string, cacheOptions?: CacheOptions, botKey?: string)
    {
        this.cacheOptions = cacheOptions;
        this.botKey = botKey;
        this.graphQL = new GraphQLService(cacheOptions);

        this.queries = new Queries(this);
        this.mutations = new Mutations(this);
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
        this.graphQL.clearCache();
    }
    
    /**
     * Get cache statistics including current size and maximum capacity.
     * 
     * @returns Object with `size` (current entries) and `max` (capacity limit),
     *          or undefined if caching is disabled
     */
    public getCacheStats(): { size: number; max: number; } | undefined {
        return this.graphQL.getCacheStats();
    }
}

