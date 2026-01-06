import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";
import type { ColorFields, ColorQueryParams, ColorRelations } from "../../types/queries/color.js";

/**
 * Query builder for fetching color trade bloc data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.colors()`
 * Each call creates a fresh instance with no shared state, preventing filter pollution.
 * 
 * Colors represent trade blocs in the game, each providing different bonuses and benefits.
 * 
 * Features:
 * - Type-safe field selection
 * - Access to color names, bloc names, and turn bonuses
 * - No filtering parameters (returns all colors)
 * 
 * Return types:
 * - `execute()` → Returns array of colors
 * - `execute(true)` → Returns `{ data: Color[], paginatorInfo: {...} }`
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * @template I - Included relations (tracked through chaining with proper cardinality)
 * 
 * @example
 * ```typescript
 * // Basic query with field selection
 * const colors = await pnwkit.queries.colors()
 *   .select('color', 'bloc_name', 'turn_bonus')
 *   .execute();
 * // Type: { color: string, bloc_name: string, turn_bonus: number }[]
 * 
 * // Query all available colors
 * const allColors = await pnwkit.queries.colors()
 *   .select('color', 'bloc_name')
 *   .execute();
 * console.log(allColors);  // Array of all colors
 * 
 * // With pagination info
 * const result = await pnwkit.queries.colors()
 *   .select('color', 'bloc_name', 'turn_bonus')
 *   .execute(true);
 * console.log(result.data);           // Colors array
 * console.log(result.paginatorInfo);  // Pagination metadata
 * ```
*/
export class ColorsQuery<
    F extends readonly (keyof ColorFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<ColorFields, ColorQueryParams>
{
    protected queryName = 'colors';

    /**
     * Create a new ColorsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from colors
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * ```typescript
     * .select('color', 'bloc_name', 'turn_bonus')
     * ```
    */
    select<const Fields extends readonly (keyof ColorFields)[]>
    (
        ...fields: Fields
    ): ColorsQuery<Fields> 
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
     * @note Colors query does not support filtering parameters
     * @example
     * ```typescript
     * .where({})
     * ```
    */
    where(filters: ColorQueryParams): this
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
        K extends keyof ColorRelations,
        TConfig extends SubqueryConfig<ColorRelations[K], GetRelationsFor<ColorRelations[K]>, GetQueryParamsFor<ColorRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = ColorRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): ColorsQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    /**
     * Execute the colors query and return results.
     * 
     * Return type changes based on withPaginator parameter:
     * - `execute()` or `execute(false)` → Returns array of colors
     * - `execute(true)` → Returns object with data array and paginatorInfo
     * 
     * Results only include selected fields.
     * All other fields are excluded from the response.
     * 
     * @param withPaginator - Whether to include pagination metadata in response
     * @returns Array of colors, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * 
     * @example
     * ```typescript
     * // Returns array directly
     * const colors = await query.execute();
     * // Type: { color: string, bloc_name: string, turn_bonus: number }[]
     * colors.forEach(color => console.log(color.color, color.bloc_name));
     * 
     * // Returns object with pagination info
     * const result = await query.execute(true);
     * // Type: { data: {...}[], paginatorInfo: {...} }
     * console.log(result.data);                    // Colors array
     * console.log(result.paginatorInfo.total);     // Total count
     * console.log(result.paginatorInfo.currentPage); // Current page number
     * ```
    */
    async execute(): Promise<SelectFields<ColorFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<ColorFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<ColorFields, F, I>[] | 
    { data: SelectFields<ColorFields, F, I>[], paginatorInfo: paginatorInfo }
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