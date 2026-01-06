import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { WarFields, WarQueryParams, WarRelations } from "../../types/queries/war.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching war data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.wars()`
 * Provides detailed information about active and historical wars.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include attacker and defender nation data
 * - Filter by active status, date range, participants
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 */
export class WarsQuery<
    F extends readonly (keyof WarFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<WarFields, WarQueryParams>
{
    protected queryName = 'wars';

    /**
     * Create a new WarsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from wars
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'date', 'reason', 'war_type', 'turns_left')
    */
    select<const Fields extends readonly (keyof WarFields)[]>(...fields: Fields): WarsQuery<Fields> 
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
     * .where({ active: true, days_ago: 7 })
    */
    where(filters: WarQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof WarRelations,
        TConfig extends SubqueryConfig<WarRelations[K], GetRelationsFor<WarRelations[K]>, GetQueryParamsFor<WarRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = WarRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): WarsQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    async execute(): Promise<SelectFields<WarFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<WarFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<WarFields, F, I>[] | 
    { data: SelectFields<WarFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute wars query: ${message}`);
        }
    }
}
