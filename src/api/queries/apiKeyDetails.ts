import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";
import type { ApiKeyDetailsFields, ApiKeyDetailsRelations, ApiKeyDetailsQueryParams } from "../../types/queries/apiKeyDetails.js";

/**
 * Query builder for fetching API key details from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.apiKeyDetails()`
 * Each call creates a fresh instance with no shared state.
 * 
 * **Important differences from other queries:**
 * - Returns a **single object**, not an array
 * - Does **not support pagination** (no first/page methods)
 * - Does **not accept filter parameters** (where clause is empty)
 * - Only has **one relation**: `nation` (the nation associated with the API key)
 * 
 * Features:
 * - Type-safe field selection
 * - Nested relation support (unlimited depth through nation)
 * - Automatic cardinality detection
 * 
 * Return type:
 * - `execute()` → Returns single API key details object (NOT an array)
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * @template I - Included relations (tracked through chaining with proper cardinality)
 * 
 * @example
 * ```typescript
 * // Basic query - returns single object
 * const apiKey = await pnwkit.queries.apiKeyDetails()
 *   .select('key', 'requests', 'max_requests', 'permissions')
 *   .execute();
 * // Type: { key: string, requests: number, max_requests: number, permissions: string }
 * console.log(apiKey.key);  // Direct access - NOT apiKey[0].key
 * 
 * // With nested nation data (singular relation)
 * const apiKey = await pnwkit.queries.apiKeyDetails()
 *   .select('key', 'requests')
 *   .include('nation', builder => builder  // Singular: returns single object
 *     .select('id', 'nation_name', 'score')
 *   )
 *   .execute();
 * // Type: { 
 * //   key: string, 
 * //   requests: number,
 * //   nation: { id: number, nation_name: string, score: number }
 * // }
 * console.log(apiKey.nation.nation_name);  // Direct access to nested object
 * 
 * // Deep nesting through nation relation
 * const apiKey = await pnwkit.queries.apiKeyDetails()
 *   .select('key')
 *   .include('nation', b1 => b1
 *     .select('id', 'nation_name')
 *     .include('alliance', b2 => b2  // Nest through nation's relations
 *       .select('id', 'name')
 *       .include('nations', b3 => b3  // Unlimited depth!
 *         .select('id', 'nation_name')
 *       )
 *     )
 *   )
 *   .execute();
 * ```
*/
export class ApiKeyDetailsQuery<
    F extends readonly (keyof ApiKeyDetailsFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<ApiKeyDetailsFields, ApiKeyDetailsQueryParams>
{
    protected queryName = 'me';

    /**
     * Create a new ApiKeyDetailsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from API key details
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * ```typescript
     * .select('key', 'requests', 'max_requests', 'permissions')
     * ```
    */
    select<const Fields extends readonly (keyof ApiKeyDetailsFields)[]>
    (
        ...fields: Fields
    ): ApiKeyDetailsQuery<Fields> 
    {
        if(fields.length === 0)
            throw new Error("At least one field must be selected.");

        this.selectedFields = [...new Set(fields)] as any;
        return this as any;
    }

    /**
     * Apply filters to the query (not supported for API key details)
     * @param filters - Query parameters (empty for this query)
     * @returns This query instance for method chaining
     * @example
     * ```typescript
     * .where({})  // No filters available for API key details
     * ```
    */
    where(filters: ApiKeyDetailsQueryParams): this
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
     * )Include nation data
     * .include('nation', builder => builder
     *   .select('id', 'nation_name', 'score')
     * )
     * 
     * // Deeply nested query with unlimited depth
     * .include('nation', builder => builder
     *   .select('id', 'nation_name')
     *   .include('alliance', builder2 => builder2
     *     .select('id', 'name', 'score')
     *     .include('nations', builder3 => builder3
     *       .select('id', 'nation_name')
     *     )
     *   )
     * )
     * 
     * // Important: Always select at least one scalar field at each level
     * // GraphQL requires this - you cannot query an object without selecting fields
     * ```
    */
    include<
        K extends keyof ApiKeyDetailsRelations,
        TConfig extends SubqueryConfig<ApiKeyDetailsRelations[K], GetRelationsFor<ApiKeyDetailsRelations[K]>, GetQueryParamsFor<ApiKeyDetailsRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = ApiKeyDetailsRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): ApiKeyDetailsQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    /**
     * Execute the API key details query and return a single object.
     * 
     * **Important:** Unlike nations/alliances queries, this returns a **single object**,
     * not an array. There is no pagination support.
     * 
     * Results only include selected fields and included relations.
     * All other fields are excluded from the response.
     * 
     * @returns Single API key details object with selected fields and included relations
     * @throws Error if the query fails or returns no data
     * 
     * @example
     * ```typescript
     * // Returns single object (NOT an array)
     * const apiKey = await query.execute();
     * // Type: { key: string, requests: number }
     * console.log(apiKey.key);  // Direct access - no [0] needed
     * 
     * // With nested data
     * const apiKey = await pnwkit.queries.apiKeyDetails()
     *   .select('key')
     *   .include('nation', b => b.select('id', 'nation_name'))
     *   .execute();
     * console.log(apiKey.nation.nation_name);  // Direct nested access
     * ```
    */
    async execute(): Promise<SelectFields<ApiKeyDetailsFields, F, I>>
    {
        try
        {
            // Build the query (no pagination for single object query)
            const query = this.buildQuery(false);

            // Execute the query
            const result = await graphQLService.queryCall(this.kit['apiKey'], query);
            const queryData = result[this.queryName];

            if(!queryData)
                throw new Error(`No data returned from ${this.queryName} query.`);

            const returnData = queryData.data == undefined ? queryData : queryData.data;
            
            return returnData;
        }
        catch(error: unknown)
        {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to execute ${this.queryName} query: ${message}`);
        }
    }
}