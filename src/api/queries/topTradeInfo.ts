import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { TopTradeInfo } from "../../types/queries/topTradeInfo.js";

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
 *   .select('market_index', 'resources')
 *   .execute();
 * // Type: { market_index: number, resources: TopTradeResourceInfo[] }[]
 * 
 * // Access the data
 * console.log(tradeInfo[0].market_index);
 * console.log(tradeInfo[0].resources[0].resource);       // "FOOD"
 * console.log(tradeInfo[0].resources[0].average_price);  // Current avg price
 * console.log(tradeInfo[0].resources[0].best_buy_offer); // Best buy offer details
 * 
 * // With pagination info
 * const result = await pnwkit.queries.topTradeInfo()
 *   .select('market_index', 'resources')
 *   .execute(true);
 * console.log(result.data);           // Trade info array
 * console.log(result.paginatorInfo);  // Pagination metadata
 * ```
*/
export class TopTradeInfoQuery<
    F extends readonly (keyof TopTradeInfo)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<TopTradeInfo, {}>
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
     * .select('market_index', 'resources')
     * ```
    */
    select<const Fields extends readonly (keyof TopTradeInfo)[]>
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
     * Execute the top trade info query and return results.
     * 
     * Return type changes based on withPaginator parameter:
     * - `execute()` or `execute(false)` → Returns array with top trade info object
     * - `execute(true)` → Returns object with data array and paginatorInfo
     * 
     * Results only include selected fields.
     * All other fields are excluded from the response.
     * 
     * @param withPaginator - Whether to include pagination metadata in response
     * @returns Array containing top trade info object, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * 
     * @example
     * ```typescript
     * // Returns array directly
     * const tradeInfo = await query.execute();
     * // Type: { market_index: number, resources: TopTradeResourceInfo[] }[]
     * console.log(tradeInfo[0].market_index);
     * console.log(tradeInfo[0].resources[0].average_price);
     * 
     * // Returns object with pagination info
     * const result = await query.execute(true);
     * // Type: { data: {...}[], paginatorInfo: {...} }
     * console.log(result.data);                    // Trade info array
     * console.log(result.paginatorInfo.total);     // Total count
     * ```
    */
    async execute(): Promise<SelectFields<TopTradeInfo, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<TopTradeInfo, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<TopTradeInfo, F, I>[] | 
    { data: SelectFields<TopTradeInfo, F, I>[], paginatorInfo: paginatorInfo }
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
