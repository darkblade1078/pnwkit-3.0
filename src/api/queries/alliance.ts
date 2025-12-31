import type { SelectFields } from "../../types/others.js";
import QueryBuilder from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { AllianceFields, AllianceQueryParams, AllianceRelations } from "../../types/queries/alliance.js";

/**
 * Query builder for fetching alliance data from the Politics & War API
 * @category Query Builders
 * @template F - Selected field names as a readonly tuple
 * @template I - Included relations as a record type
 * @example
 * ```typescript
 * const alliances = await pnwkit.alliancesQuery
 *   .select('id', 'name', 'score', 'color')
 *   .where({ 
 *     name: ['Rose', 'Grumpy'],
 *     orderBy: [{ column: 'SCORE', order: 'DESC' }]
 *   })
 *   .include('bankrecs', ['id', 'date', 'money'])
 *   .first(50)
 *   .execute();
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
     * @param relation - The relation name to include
     * @param fields - Fields to select from the relation
     * @returns New query instance with included relation
     * @example
     * ```typescript
     * .include('bankrecs', ['id', 'date', 'money', 'note'])
     * ```
    */
    include<
    K extends keyof AllianceRelations,
    R extends readonly (keyof AllianceRelations[K])[]
    >(
        relation: K,
        fields: R
    ): AlliancesQuery<
    F,
    I & Record<K, Pick<AllianceRelations[K], R[number]>[]>>
    {
        this.subqueries.set(relation as string, fields as readonly string[]);
        return this as any;
    }

    /**
     * Execute the alliances query and return results
     * @returns Array of alliances, or object with data and paginatorInfo if withPaginator is true
     * @throws Error if the query fails or returns no data
     * @example
     * ```typescript
     * // Without paginator
     * const alliances = await query.execute();
     * 
     * // With paginator
     * const result = await query.execute(true);
     * console.log(result.data, result.paginatorInfo);
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
            throw new Error(`Failed to execute ${this.queryName} query: ${message}`);
        }
    }
}