import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { AllianceFields, AllianceQueryParams, AllianceRelations } from "../../types/queries/alliance.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching alliance data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.alliances()`
 * Each call creates a fresh instance with no shared state, preventing filter pollution.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Unlimited recursive nesting with automatic type inference
 * - Automatic cardinality detection (all alliance relations are arrays)
 * - Pagination support with optional paginatorInfo
 * 
 * Return types:
 * - `execute()` → Returns array of alliances
 * - `execute(true)` → Returns `{ data: Alliance[], paginatorInfo: {...} }`
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * @template I - Included relations (tracked through chaining, all arrays for alliances)
 * 
 * @example
 * ```typescript
 * // Basic query with filtering
 * const alliances = await pnwkit.queries.alliances()
 *   .select('id', 'name', 'score', 'color')
 *   .where({ 
 *     name: ['Rose', 'Grumpy'],
 *     orderBy: [{ column: 'SCORE', order: 'DESC' }]
 *   })
 *   .first(50)
 *   .execute();
 * // Type: { id: number, name: string, score: number, color: string }[]
 * 
 * // Nested query with array relations (all alliance relations return arrays)
 * const alliances = await pnwkit.queries.alliances()
 *   .select('id', 'name')
 *   .include('nations', builder => builder  // Array: returns nation[]
 *     .select('id', 'nation_name', 'score')
 *     .where({ min_score: 1000 })
 *   )
 *   .include('bankrecs', builder => builder  // Array: returns bankrec[]
 *     .select('id', 'date', 'money')
 *   )
 *   .first(10)
 *   .execute();
 * // Type: { 
 * //   id: number, 
 * //   name: string,
 * //   nations: { id: number, nation_name: string, score: number }[],
 * //   bankrecs: { id: number, date: string, money: number }[]
 * // }[]
 * 
 * // Unlimited nesting depth
 * const alliances = await pnwkit.queries.alliances()
 *   .select('id', 'name')
 *   .include('nations', b1 => b1
 *     .select('id', 'nation_name')
 *     .include('cities', b2 => b2  // Unlimited nesting!
 *       .select('id', 'name', 'infrastructure')
 *       .where({ min_infrastructure: 500 })
 *     )
 *   )
 *   .execute();
 * 
 * // With pagination info
 * const result = await pnwkit.queries.alliances()
 *   .select('id', 'name')
 *   .first(100)
 *   .execute(true);
 * console.log(result.data);           // Alliances array
 * console.log(result.paginatorInfo);  // Pagination metadata
 * ```
*/
export class AlliancesQuery<
    F extends readonly (keyof AllianceFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<AllianceFields, AllianceQueryParams>
{
    protected queryName = 'alliances';

    /**
     * Create a new AlliancesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from alliances
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * ```typescript
     * .select('id', 'name', 'score', 'color')
     * ```
    */
    select<const Fields extends readonly (keyof AllianceFields)[]>
    (
        ...fields: Fields
    ): AlliancesQuery<Fields> 
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
     *   name: ['Rose', 'Grumpy'], 
     *   color: ['AQUA', 'BLUE'] 
     * })
     * ```
    */
    where(filters: AllianceQueryParams): this
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
     * .include('bankrecs', builder => builder
     *   .select('id', 'date', 'money', 'note')
     * )
     * 
     * // Subquery with filtering
     * .include('nations', builder => builder
     *   .select('id', 'nation_name', 'score')
     *   .where({ min_score: 1000 })
     * )
     * 
     * // Deeply nested subquery with unlimited depth
     * .include('nations', builder => builder
     *   .select('id', 'nation_name', 'score')
     *   .where({ min_score: 1000 })
     *   .include('cities', builder2 => builder2  // Unlimited nesting!
     *     .select('id', 'name', 'infrastructure')
     *     .where({ min_infrastructure: 500 })
     *     .include('buildings', builder3 => builder3
     *       .select('id', 'type')
     *     )
     *   )
     * )
     * 
     * // Important: Always select at least one scalar field at each level
     * // GraphQL requires this - you cannot query an object without selecting fields
     * ```
    */
    include<
        K extends keyof AllianceRelations,
        TConfig extends SubqueryConfig<AllianceRelations[K], GetRelationsFor<AllianceRelations[K]>, GetQueryParamsFor<AllianceRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = AllianceRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): AlliancesQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    /**
     * Execute the alliances query and return results.
     * 
     * Return type changes based on withPaginator parameter:
     * - `execute()` or `execute(false)` → Returns array of alliances
     * - `execute(true)` → Returns object with data array and paginatorInfo
     * 
     * Results only include selected fields and included relations.
     * All other fields are excluded from the response.
     * 
     * @param withPaginator - Whether to include pagination metadata in response
     * @returns Array of alliances, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * 
     * @example
     * ```typescript
     * // Returns array directly
     * const alliances = await query.execute();
     * // Type: { id: number, name: string }[]
     * alliances.forEach(alliance => console.log(alliance.id, alliance.name));
     * 
     * // Returns object with pagination info
     * const result = await query.execute(true);
     * // Type: { data: {...}[], paginatorInfo: {...} }
     * console.log(result.data);                    // Alliances array
     * console.log(result.paginatorInfo.total);     // Total count
     * console.log(result.paginatorInfo.currentPage); // Current page number
     * ```
    */
    async execute(): Promise<SelectFields<AllianceFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<AllianceFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<AllianceFields, F, I>[] | 
    { data: SelectFields<AllianceFields, F, I>[], paginatorInfo: paginatorInfo }
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