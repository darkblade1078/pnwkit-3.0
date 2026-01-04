import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";
import type { TopTradeInfoFields, TopTradeInfoQueryParams, TopTradeInfoRelations } from "../../types/queries/topTradeInfo.js";

/**
 * Query builder for fetching top trade information from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.topTradeInfo()`
 * Each call creates a fresh instance with no shared state, preventing filter pollution.
 * 
 * Top trade info provides current market data including market index and resource-specific
 * trade information with best buy/sell offers.
 * 
 * Features:
 * - Type-safe field selection
 * - Access to real-time market index and resource prices
 * - Best buy/sell offer data per resource
 * 
 * Return types:
 * - `execute()` → Returns top trade info object
 * - `execute(true)` → Returns `{ data: TopTradeInfo, paginatorInfo: {...} }`
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * @template I - Included relations (tracked through chaining with proper cardinality)
 * 
 * @example
 * ```typescript
 * // Basic query with fields
 * const tradeInfo = await pnwkit.queries.topTradeInfo()
 *   .select('market_index')
 *   .include('resources', builder => builder
 *     .select('resource', 'average_price')
 *   )
 *   .execute();
 * // Type: { market_index: number, resources: { resource: string, average_price: number }[] }
 * 
 * // Access the data
 * console.log(tradeInfo.market_index);
 * console.log(tradeInfo.resources[0].resource);       // "FOOD"
 * console.log(tradeInfo.resources[0].average_price);  // Current avg price
 * 
 * // With pagination info
 * const result = await pnwkit.queries.topTradeInfo()
 *   .select('market_index')
 *   .include('resources', builder => builder
 *     .select('resource', 'average_price')
 *   )
 *   .execute(true);
 * console.log(result.data);           // Trade info object
 * console.log(result.paginatorInfo);  // Pagination metadata
 * ```
*/
export class TopTradeInfoQuery<
    F extends readonly (keyof TopTradeInfoFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<TopTradeInfoFields, TopTradeInfoQueryParams>
{
    protected queryName = 'top_trade_info';

    /**
     * Create a new TopTradeInfoQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from top trade info
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * ```typescript
     * .select('market_index')
     * ```
    */
    select<const Fields extends readonly (keyof TopTradeInfoFields)[]>
    (
        ...fields: Fields
    ): TopTradeInfoQuery<Fields> 
    {
        if(fields.length === 0)
            throw new Error("At least one field must be selected.");

        this.selectedFields = [...new Set(fields)] as any;
        return this as any;
    }

    /**
     * Apply filters to the query
     * @param filters - Query parameters for filtering results
     * @returns This query instance for method chaining
     * @example
     * ```typescript
     * .where({ resources: [Resources.FOOD, Resources.COAL] })
     * ```
    */
    where(filters: TopTradeInfoQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    /**
     * Include related data in the query results
     * 
     * @param relation - The relation name to include
     * @param config - A builder function for configuring the subquery
     * @returns New query instance with included relation
     * @example
     * ```typescript
     * // Include resources with specific fields
     * .include('resources', builder => builder
     *   .select('resource', 'average_price')
     * )
     * ```
    */
    include<
        K extends keyof TopTradeInfoRelations,
        TConfig extends SubqueryConfig<TopTradeInfoRelations[K], GetRelationsFor<TopTradeInfoRelations[K]>, GetQueryParamsFor<TopTradeInfoRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = TopTradeInfoRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): TopTradeInfoQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    /**
     * Execute the top trade info query and return results.
     * 
     * Return type changes based on withPaginator parameter:
     * - `execute()` or `execute(false)` → Returns single top trade info object
     * - `execute(true)` → Returns object with data and paginatorInfo
     * 
     * Results only include selected fields.
     * All other fields are excluded from the response.
     * 
     * @param withPaginator - Whether to include pagination metadata in response
     * @returns Single top trade info object, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * 
     * @example
     * ```typescript
     * // Returns single object directly
     * const tradeInfo = await query.execute();
     * // Type: { market_index: number, resources: TopTradeResourceInfo[] }
     * console.log(tradeInfo.market_index);
     * console.log(tradeInfo.resources[0].average_price);
     * 
     * // Returns object with pagination info
     * const result = await query.execute(true);
     * // Type: { data: {...}, paginatorInfo: {...} }
     * console.log(result.data);                    // Trade info object
     * console.log(result.paginatorInfo.total);     // Total count
     * ```
    */
    async execute(): Promise<SelectFields<TopTradeInfoFields, F, I>>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<TopTradeInfoFields, F, I>, 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<TopTradeInfoFields, F, I> | 
    { data: SelectFields<TopTradeInfoFields, F, I>, paginatorInfo: paginatorInfo }
    >
    {
        try
        {
            // Build the query
            const query = this.buildQuery(withPaginator);

            // Execute the query
            const result = await graphQLService.queryCall(this.kit['apiKey'], query);
            const queryData = result[this.queryName];

            if(!queryData)
                throw new Error(`No data returned from ${this.queryName} query.`);

            const returnData = queryData.data == undefined ? queryData : queryData.data;

            if(withPaginator)
                return {
                    data: returnData,
                    paginatorInfo: queryData.paginatorInfo
                };
            
            return returnData;
        }
        catch(error: unknown)
        {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to execute ${this.queryName} query: ${message}`);
        }
    }
}
