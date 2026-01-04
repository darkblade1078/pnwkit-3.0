import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { EmbargoFields, EmbargoQueryParams, EmbargoRelations } from "../../types/queries/embargo.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching embargo data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.embargoes()`
 * Embargoes are trade restrictions between nations or alliances.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include sender and receiver nation data
 * - Filter by ID, nation ID, type
 * - Access to embargo reason and type
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 */
export class EmbargoesQuery<
    F extends readonly (keyof EmbargoFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<EmbargoFields, EmbargoQueryParams>
{
    protected queryName = 'embargoes';

    /**
     * Create a new EmbargoesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from embargoes
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'date', 'sender_id', 'receiver_id', 'reason', 'type')
    */
    select<const Fields extends readonly (keyof EmbargoFields)[]>(...fields: Fields): EmbargoesQuery<Fields> 
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
     * .where({ nation_id: [123456] })
    */
    where(filters: EmbargoQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof EmbargoRelations,
        TConfig extends SubqueryConfig<EmbargoRelations[K], GetRelationsFor<EmbargoRelations[K]>, GetQueryParamsFor<EmbargoRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = EmbargoRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): EmbargoesQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    async execute(): Promise<SelectFields<EmbargoFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<EmbargoFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<EmbargoFields, F, I>[] | 
    { data: SelectFields<EmbargoFields, F, I>[], paginatorInfo: paginatorInfo }
    >
    {
        try
        {
            const query = this.buildQuery(withPaginator);
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
            throw new Error(`Failed to execute embargoes query: ${message}`);
        }
    }
}
