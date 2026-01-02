import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { NationFields, NationQueryParams, NationRelations } from "../../types/queries/nation.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching nation data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.nations()`
 * Each call creates a fresh instance with no shared state, preventing filter pollution.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Unlimited recursive nesting with automatic type inference
 * - Automatic cardinality detection (singular vs array relations)
 * - Pagination support with optional paginatorInfo
 * 
 * Return types:
 * - `execute()` → Returns array of nations
 * - `execute(true)` → Returns `{ data: Nation[], paginatorInfo: {...} }`
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * @template I - Included relations (tracked through chaining with proper cardinality)
 * 
 * @example
 * ```typescript
 * // Basic query with filtering and pagination
 * const nations = await pnwkit.queries.nations()
 *   .select('id', 'nation_name', 'score', 'alliance_id')
 *   .where({ 
 *     min_score: 1000, 
 *     max_score: 5000,
 *     orderBy: [{ column: 'SCORE', order: 'DESC' }]
 *   })
 *   .first(100)
 *   .execute();
 * // Type: { id: number, nation_name: string, score: number, alliance_id: number }[]
 * 
 * // Nested query with singular and array relations
 * const nations = await pnwkit.queries.nations()
 *   .select('id', 'nation_name')
 *   .include('alliance', builder => builder  // Singular: returns object
 *     .select('id', 'name', 'score')
 *     .where({ min_score: 5000 })
 *   )
 *   .include('cities', builder => builder  // Array: returns array
 *     .select('id', 'name', 'infrastructure')
 *   )
 *   .first(50)
 *   .execute();
 * // Type: { 
 * //   id: number, 
 * //   nation_name: string,
 * //   alliance: { id: number, name: string, score: number },
 * //   cities: { id: number, name: string, infrastructure: number }[]
 * // }[]
 * 
 * // Unlimited nesting depth
 * const nations = await pnwkit.queries.nations()
 *   .select('id', 'nation_name')
 *   .include('alliance', b1 => b1
 *     .select('id', 'name')
 *     .include('nations', b2 => b2  // Nested nations
 *       .select('id', 'nation_name')
 *       .include('cities', b3 => b3  // Unlimited depth!
 *         .select('id', 'name')
 *       )
 *     )
 *   )
 *   .execute();
 * 
 * // With pagination info
 * const result = await pnwkit.queries.nations()
 *   .select('id', 'nation_name')
 *   .first(500)
 *   .page(2)
 *   .execute(true);
 * console.log(result.data);           // Nations array
 * console.log(result.paginatorInfo);  // { currentPage, total, hasMorePages, ... }
 * ```
*/
export class NationsQuery<
    F extends readonly (keyof NationFields)[] = [], // Selected fields
    I extends Record<string, any> = {}  // Included relations
> 
extends QueryBuilder<
NationFields,   // Main entity fields
NationQueryParams   // Filter parameters
>
{
    protected queryName = 'nations';

    /**
     * Create a new NationsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from nations
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'nation_name', 'score')
    */
    select<const Fields extends readonly (keyof NationFields)[]>(...fields: Fields): NationsQuery<Fields>
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
     * .where({ min_score: 1000, max_score: 5000 })
    */
    where(filters: NationQueryParams): this
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
     * .include('cities', builder => builder
     *   .select('id', 'name', 'infrastructure')
     * )
     * 
     * // Subquery with filtering
     * .include('alliance', builder => builder
     *   .select('id', 'name', 'score')
     *   .where({ id: [1234] })
     * )
     * 
     * // Deeply nested subquery with unlimited depth
     * .include('alliance', builder => builder
     *   .select('id', 'name', 'score')
     *   .where({ min_score: 1000 })
     *   .include('nations', builder2 => builder2  // Unlimited nesting!
     *     .select('id', 'nation_name')
     *     .where({ min_score: 500 })
     *     .include('cities', builder3 => builder3
     *       .select('id', 'name', 'infrastructure')
     *     )
     *   )
     * )
     * 
     * // Important: Always select at least one scalar field at each level
     * // GraphQL requires this - you cannot query an object without selecting fields
     * ```
    */
    include<
        K extends keyof NationRelations,
        TConfig extends SubqueryConfig<NationRelations[K], GetRelationsFor<NationRelations[K]>, GetQueryParamsFor<NationRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = NationRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): NationsQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    /**
     * Execute the nations query and return results.
     * 
     * Return type changes based on withPaginator parameter:
     * - `execute()` or `execute(false)` → Returns array of nations
     * - `execute(true)` → Returns object with data array and paginatorInfo
     * 
     * Results only include selected fields and included relations.
     * All other fields are excluded from the response.
     * 
     * @param withPaginator - Whether to include pagination metadata in response
     * @returns Array of nations, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * 
     * @example
     * ```typescript
     * // Returns array directly
     * const nations = await query.execute();
     * // Type: { id: number, nation_name: string }[]
     * nations.forEach(nation => console.log(nation.id, nation.nation_name));
     * 
     * // Returns object with pagination info
     * const result = await query.execute(true);
     * // Type: { data: {...}[], paginatorInfo: {...} }
     * console.log(result.data);                    // Nations array
     * console.log(result.paginatorInfo.total);     // Total count
     * console.log(result.paginatorInfo.hasMorePages); // Boolean
     * ```
    */
    async execute(): Promise<SelectFields<NationFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<NationFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<NationFields, F, I>[] | 
    { data: SelectFields<NationFields, F, I>[], paginatorInfo: paginatorInfo }
    >
    {
        try
        {
            // Build the query
            const query = this.buildQuery(withPaginator);

            // Execute the query
            const result = await graphQLService.queryCall(this.kit['apiKey'], query);
            const queryData = result[this.queryName];

            if(!queryData?.data)
                throw new Error(`No data returned from ${this.queryName} query.`);

            if(withPaginator)
                return {
                    data: queryData.data,
                    paginatorInfo: queryData.paginatorInfo
                };
            
            return queryData.data;
        }
        catch(error: unknown)
        {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to execute nations query: ${message}`);
        }
    }
}