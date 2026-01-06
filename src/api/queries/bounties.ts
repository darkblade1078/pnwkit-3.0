import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { BountyFields, BountyQueryParams, BountyRelations } from "../../types/queries/bounty.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching bounty data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.bounties()`
 * Bounties are rewards placed on nations for successful attacks.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include target nation data
 * - Filter by amount, nation, bounty type
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 */
export class BountiesQuery<
    F extends readonly (keyof BountyFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<BountyFields, BountyQueryParams>
{
    protected queryName = 'bounties';

    /**
     * Create a new BountiesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from bounties
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'date', 'nation_id', 'amount', 'type')
    */
    select<const Fields extends readonly (keyof BountyFields)[]>(...fields: Fields): BountiesQuery<Fields> 
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
     * .where({ min_amount: 1000000 })
    */
    where(filters: BountyQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof BountyRelations,
        TConfig extends SubqueryConfig<BountyRelations[K], GetRelationsFor<BountyRelations[K]>, GetQueryParamsFor<BountyRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = BountyRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): BountiesQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    async execute(): Promise<SelectFields<BountyFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<BountyFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<BountyFields, F, I>[] | 
    { data: SelectFields<BountyFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute bounties query: ${message}`);
        }
    }
}
