import type { SelectFields } from "../../types/others.js";
import QueryBuilder from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { NationFields, NationQueryParams, NationRelations } from "../../types/queries/nation.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";

/**
 * Query builder for fetching nation data from the Politics & War API
 * @category Query Builders
 * @template F - Selected field names as a readonly tuple
 * @template I - Included relations as a record type
 * @example
 * ```typescript
 * const nations = await pnwkit.nationsQuery
 *   .select('id', 'nation_name', 'score', 'alliance_id')
 *   .where({ 
 *     min_score: 1000, 
 *     max_score: 5000,
 *     orderBy: [{ column: 'SCORE', order: 'DESC' }]
 *   })
 *   .include('alliance', ['id', 'name'])
 *   .first(100)
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
     * @param relation - The relation name to include
     * @param fields - Fields to select from the relation
     * @returns New query instance with included relation
     * @example
     * .include('cities', ['id', 'city_name', 'infrastructure'])
    */
    include<
    K extends keyof NationRelations,    // Relation key
    R extends readonly (keyof NationRelations[K])[] // Fields to include
    >(
        relation: K, // Relation name
        fields: R   // Fields to select from the relation
    ): NationsQuery<
    F,  // Selected fields
    I & Record<K, Pick<NationRelations[K], R[number]>[]>> // Included relations
    {
        this.subqueries.set(relation as string, fields as readonly string[]);
        return this as any;
    }

    /**
     * Execute the nations query and return results
     * @returns Array of nations, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * @example
     * // Without paginator
     * const nations = await query.execute();
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