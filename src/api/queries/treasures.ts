import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";
import type { TreasureQueryParams, TreasureRelations, TreasureFields } from "../../types/queries/treasure.js";

/**
 * Query builder for fetching treasure data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.treasures()`
 * Each call creates a fresh instance with no shared state, preventing filter pollution.
 * 
 * Treasures are special bonus items that can be obtained through various means in the game.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Unlimited recursive nesting with automatic type inference
 * - Automatic cardinality detection for relations
 * - Pagination support with optional paginatorInfo
 * 
 * Return types:
 * - `execute()` → Returns array of treasures
 * - `execute(true)` → Returns `{ data: Treasure[], paginatorInfo: {...} }`
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * @template I - Included relations (tracked through chaining with proper cardinality)
 * 
 * @example
 * ```typescript
 * // Basic query with field selection
 * const treasures = await pnwkit.queries.treasures()
 *   .select('name', 'color', 'continent', 'bonus', 'spawn_date')
 *   .first(50)
 *   .execute();
 * // Type: { name: string, color: string, continent: string, bonus: number, spawn_date: string }[]
 * 
 * // Query with filtering
 * const treasures = await pnwkit.queries.treasures()
 *   .select('name', 'bonus')
 *   .where({ 
 *     name: ['The Chalice'],
 *     orderBy: [{ column: 'BONUS', order: 'DESC' }]
 *   })
 *   .execute();
 * 
 * // With nested nation data (if treasure has nation relation)
 * const treasures = await pnwkit.queries.treasures()
 *   .select('name', 'bonus')
 *   .include('nation', builder => builder  // Singular or array based on schema
 *     .select('id', 'nation_name', 'score')
 *   )
 *   .first(100)
 *   .execute();
 * 
 * // With pagination info
 * const result = await pnwkit.queries.treasures()
 *   .select('name', 'bonus', 'color')
 *   .first(100)
 *   .execute(true);
 * console.log(result.data);           // Treasures array
 * console.log(result.paginatorInfo);  // Pagination metadata
 * ```
*/
export class TreasuresQuery<
    F extends readonly (keyof TreasureFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<TreasureFields, TreasureQueryParams>
{
    protected queryName = 'treasures';

    /**
     * Create a new TreasuresQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from treasures
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * ```typescript
     * .select('name', 'color', 'continent', 'bonus', 'spawn_date')
     * ```
    */
    select<const Fields extends readonly (keyof TreasureFields)[]>
    (
        ...fields: Fields
    ): TreasuresQuery<Fields> 
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
     *   name: ['The Chalice', 'The Ark'],
     *   color: ['BLACK', 'MAROON']
     * })
     * ```
    */
    where(filters: TreasureQueryParams): this
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
        K extends keyof TreasureRelations,
        TConfig extends SubqueryConfig<TreasureRelations[K], GetRelationsFor<TreasureRelations[K]>, GetQueryParamsFor<TreasureRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = TreasureRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): TreasuresQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    /**
     * Execute the treasures query and return results.
     * 
     * Return type changes based on withPaginator parameter:
     * - `execute()` or `execute(false)` → Returns array of treasures
     * - `execute(true)` → Returns object with data array and paginatorInfo
     * 
     * Results only include selected fields and included relations.
     * All other fields are excluded from the response.
     * 
     * @param withPaginator - Whether to include pagination metadata in response
     * @returns Array of treasures, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * 
     * @example
     * ```typescript
     * // Returns array directly
     * const treasures = await query.execute();
     * // Type: { name: string, bonus: number }[]
     * treasures.forEach(treasure => console.log(treasure.name, treasure.bonus));
     * 
     * // Returns object with pagination info
     * const result = await query.execute(true);
     * // Type: { data: {...}[], paginatorInfo: {...} }
     * console.log(result.data);                    // Treasures array
     * console.log(result.paginatorInfo.total);     // Total count
     * console.log(result.paginatorInfo.currentPage); // Current page number
     * ```
    */
    async execute(): Promise<SelectFields<TreasureFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<TreasureFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<TreasureFields, F, I>[] | 
    { data: SelectFields<TreasureFields, F, I>[], paginatorInfo: paginatorInfo }
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