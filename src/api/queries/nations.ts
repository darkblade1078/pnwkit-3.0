import type { SelectFields } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { NationFields, NationQueryParams, NationRelations } from "../../types/queries/nation.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { GetRelationsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching nation data from the Politics & War API
 * 
 * Supports two levels of nested queries:
 * - Level 1: Use builder functions to configure subqueries with full type support
 * - Level 2: Use field arrays for nested subqueries
 * 
 * @category Query Builders
 * @template F - Selected field names as a readonly tuple
 * @template I - Included relations as a record type
 * @example
 * ```typescript
 * // Simple query with flat includes
 * const nations = await pnwkit.nationsQuery
 *   .select('id', 'nation_name', 'score', 'alliance_id')
 *   .where({ 
 *     min_score: 1000, 
 *     max_score: 5000,
 *     orderBy: [{ column: 'SCORE', order: 'DESC' }]
 *   })
 *   .include('cities', ['id', 'name', 'infrastructure'])
 *   .first(100)
 *   .execute();
 * 
 * // Nested query (two levels deep)
 * const nations = await pnwkit.nationsQuery
 *   .select('id', 'nation_name', 'alliance_id')
 *   .include('alliance', builder => builder
 *     .select('id', 'name', 'score')
 *     .include('nations', ['id', 'nation_name'])  // Nested subquery
 *   )
 *   .first(50)
 *   .execute();
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
        this.kit = kit;
    }

    /**
     * Select specific fields to retrieve from nations
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'nation_name', 'score')
    */
    select<const Fields extends readonly (keyof NationFields)[]>
    (
        ...fields: Fields
    ): NationsQuery<Fields> 
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
     * Supports two formats:
     * 1. Field array - Simple list of fields to select from the relation
     * 2. Builder function - For relations that have their own nested relations
     * 
     * When using builder functions, the nested include() only accepts field arrays.
     * This provides two levels of nesting: query -> subquery -> nested subquery
     * 
     * @param relation - The relation name to include
     * @param config - Either an array of fields OR a builder function for nested queries
     * @returns New query instance with included relation
     * @example
     * ```typescript
     * // Simple field array (one level)
     * .include('cities', ['id', 'name', 'infrastructure'])
     * 
     * // Builder function with nested relations (two levels)
     * .include('alliance', builder => builder
     *   .select('id', 'name', 'score')  // Select fields from alliance
     *   .include('nations', ['id', 'nation_name'])  // Nested: only arrays allowed
     *   .include('tax_brackets', ['id', 'tax_rate'])  // Can include multiple nested relations
     * )
     * 
     * // Important: Always select at least one scalar field at each level
     * // GraphQL requires this - you cannot query an object without selecting fields
     * ```
    */
    include<K extends keyof NationRelations>(
        relation: K,
        config: SubqueryConfig<NationRelations[K], GetRelationsFor<NationRelations[K]>>
    ): NationsQuery<F, I & Record<K, any>>
    {
        this.subqueries.set(relation as string, config);
        return this as any;
    }

    /**
     * Execute the nations query and return results
     * @returns Array of nations, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * @example
     * // Without paginator
     * const result = await query.execute();
     * console.log(result);
     * 
     * // With paginator
     * const result = await query.execute(true);
     * console.log(result.data, result.paginatorInfo);
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