import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";
import type { GameInfoFields, GameInfoQueryParams, GameInfoRelations } from "../../types/queries/gameInfo.js";

/**
 * Query builder for fetching game information from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.gameInfo()`
 * Each call creates a fresh instance with no shared state, preventing filter pollution.
 * 
 * Game info provides current game state data including the game date, radiation levels by continent,
 * and average city infrastructure.
 * 
 * Features:
 * - Type-safe field selection
 * - Access to current game date, global and regional radiation levels
 * - Real-time city average data
 * 
 * Return types:
 * - `execute()` → Returns game info object
 * - `execute(true)` → Returns `{ data: GameInfo, paginatorInfo: {...} }`
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * @template I - Included relations (tracked through chaining with proper cardinality)
 * 
 * @example
 * ```typescript
 * // Basic query with field selection
 * const gameInfo = await pnwkit.queries.gameInfo()
 *   .select('game_date', 'radiation', 'city_average')
 *   .execute();
 * // Type: { game_date: string, radiation: Radiation, city_average: number }[]
 * 
 * // Access radiation data by continent
 * const gameInfo = await pnwkit.queries.gameInfo()
 *   .select('game_date', 'radiation')
 *   .execute();
 * console.log(gameInfo[0].radiation.global);        // Global radiation
 * console.log(gameInfo[0].radiation.north_america); // North America radiation
 * 
 * // Get current game date and city average
 * const gameInfo = await pnwkit.queries.gameInfo()
 *   .select('game_date', 'city_average')
 *   .execute();
 * console.log(gameInfo[0].game_date);      // Current game date
 * console.log(gameInfo[0].city_average);   // Average city infrastructure
 * ```
*/
export class GameInfoQuery<
    F extends readonly (keyof GameInfoFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<GameInfoFields, GameInfoQueryParams>
{
    protected queryName = 'game_info';

    /**
     * Create a new GameInfoQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from game info
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * ```typescript
     * .select('game_date', 'radiation', 'city_average')
     * ```
    */
    select<const Fields extends readonly (keyof GameInfoFields)[]>
    (
        ...fields: Fields
    ): GameInfoQuery<Fields> 
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
     * @note Game info query does not support filtering parameters
     * @example
     * ```typescript
     * .where({})
     * ```
    */
    where(filters: GameInfoQueryParams): this
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
        K extends keyof GameInfoRelations,
        TConfig extends SubqueryConfig<GameInfoRelations[K], GetRelationsFor<GameInfoRelations[K]>, GetQueryParamsFor<GameInfoRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = GameInfoRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): GameInfoQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    /**
     * Execute the game info query and return results.
     * 
     * Return type changes based on withPaginator parameter:
     * - `execute()` or `execute(false)` → Returns array with game info object
     * - `execute(true)` → Returns object with data array and paginatorInfo
     * 
     * Results only include selected fields and included relations.
     * All other fields are excluded from the response.
     * 
     * @param withPaginator - Whether to include pagination metadata in response
     * @returns Array containing game info object, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * 
     * @example
     * ```typescript
     * // Returns array directly
     * const gameInfo = await query.execute();
     * // Type: { game_date: string, radiation: Radiation, city_average: number }[]
     * console.log(gameInfo[0].game_date);
     * console.log(gameInfo[0].radiation.global);
     * 
     * // Returns object with pagination info
     * const result = await query.execute(true);
     * // Type: { data: {...}[], paginatorInfo: {...} }
     * console.log(result.data);                    // Game info array
     * console.log(result.paginatorInfo.total);     // Total count
     * console.log(result.paginatorInfo.currentPage); // Current page number
     * ```
    */
    async execute(): Promise<SelectFields<GameInfoFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<GameInfoFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<GameInfoFields, F, I>[] | 
    { data: SelectFields<GameInfoFields, F, I>[], paginatorInfo: paginatorInfo }
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