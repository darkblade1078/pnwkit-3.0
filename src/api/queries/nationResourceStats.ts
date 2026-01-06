import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";
import type { NationResourceStatsFields, NationResourceStatsQueryParams, NationResourceStatsRelations } from "../../types/queries/nationResourceStats.js";

/**
 * Query builder for fetching nation resource statistics from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.nationResourceStats()`
 * Each call creates a fresh instance with no shared state, preventing filter pollution.
 * 
 * Nation resource stats provide historical data on resource holdings for a specific nation.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Date range filtering (before/after)
 * - Sorting support with orderBy
 * - Pagination support with optional paginatorInfo
 * 
 * Return types:
 * - `execute()` → Returns array of resource stats
 * - `execute(true)` → Returns `{ data: NationResourceStats[], paginatorInfo: {...} }`
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * @template I - Included relations (tracked through chaining with proper cardinality)
 * 
 * @example
 * ```typescript
 * // Basic query with field selection
 * const stats = await pnwkit.queries.nationResourceStats()
 *   .select('date', 'money', 'food', 'steel')
 *   .where({ 
 *     after: '2025-01-01',
 *     orderBy: { column: 'DATE', order: 'DESC' }
 *   })
 *   .first(50)
 *   .execute();
 * // Type: { date: string, money: string, food: string, steel: string }[]
 * 
 * // Query all resources with date filtering
 * const allStats = await pnwkit.queries.nationResourceStats()
 *   .select('date', 'money', 'food', 'steel', 'aluminum', 'gasoline')
 *   .where({ 
 *     before: '2025-12-31',
 *     after: '2025-01-01'
 *   })
 *   .execute();
 * 
 * // With pagination info
 * const result = await pnwkit.queries.nationResourceStats()
 *   .select('date', 'money', 'food')
 *   .first(100)
 *   .execute(true);
 * console.log(result.data);           // Resource stats array
 * console.log(result.paginatorInfo);  // Pagination metadata
 * ```
*/
export class NationResourceStatsQuery<
    F extends readonly (keyof NationResourceStatsFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<NationResourceStatsFields, NationResourceStatsQueryParams>
{
    protected queryName = 'nation_resource_stats';

    /**
     * Create a new NationResourceStatsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from nation resource stats
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * ```typescript
     * .select('date', 'money', 'food', 'steel', 'aluminum')
     * ```
    */
    select<const Fields extends readonly (keyof NationResourceStatsFields)[]>
    (
        ...fields: Fields
    ): NationResourceStatsQuery<Fields> 
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
     * .where({ 
     *   before: '2025-12-31',
     *   after: '2025-01-01',
     *   orderBy: { column: 'DATE', order: 'DESC' }
     * })
     * ```
    */
    where(filters: NationResourceStatsQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    /**
     * Include related data in the query results
     * 
     * Supports unlimited recursive nesting with full type inference at every level.
     * Each nested builder receives complete type safety for fields, relations, and query parameters.
     * 
     * @param relation - The relation name to include
     * @param config - A builder function for configuring the subquery
     * @returns New query instance with included relation
     * @example
     * ```typescript
     * // Basic subquery with field selection
     * .include('nation', builder => builder
     *   .select('id', 'nation_name', 'score')
     * )
     * 
     * // Subquery with filtering and nesting
     * .include('nation', builder => builder
     *   .select('id', 'nation_name')
     *   .where({ min_score: 1000 })
     *   .include('alliance', builder2 => builder2  // Unlimited nesting!
     *     .select('id', 'name', 'score')
     *   )
     * )
     * 
     * // Important: Always select at least one scalar field at each level
     * // GraphQL requires this - you cannot query an object without selecting fields
     * ```
    */
    include<
        K extends keyof NationResourceStatsRelations,
        TConfig extends SubqueryConfig<NationResourceStatsRelations[K], GetRelationsFor<NationResourceStatsRelations[K]>, GetQueryParamsFor<NationResourceStatsRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = NationResourceStatsRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): NationResourceStatsQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    /**
     * Execute the nation resource stats query and return results.
     * 
     * Return type changes based on withPaginator parameter:
     * - `execute()` or `execute(false)` → Returns array of resource stats
     * - `execute(true)` → Returns object with data array and paginatorInfo
     * 
     * Results only include selected fields.
     * All other fields are excluded from the response.
     * 
     * @param withPaginator - Whether to include pagination metadata in response
     * @returns Array of resource stats, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * 
     * @example
     * ```typescript
     * // Returns array directly
     * const stats = await query.execute();
     * // Type: { date: string, money: string, food: string }[]
     * stats.forEach(stat => console.log(stat.date, stat.money));
     * 
     * // Returns object with pagination info
     * const result = await query.execute(true);
     * // Type: { data: {...}[], paginatorInfo: {...} }
     * console.log(result.data);                    // Resource stats array
     * console.log(result.paginatorInfo.total);     // Total count
     * console.log(result.paginatorInfo.currentPage); // Current page number
     * ```
    */
    async execute(): Promise<SelectFields<NationResourceStatsFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<NationResourceStatsFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<NationResourceStatsFields, F, I>[] | 
    { data: SelectFields<NationResourceStatsFields, F, I>[], paginatorInfo: paginatorInfo }
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