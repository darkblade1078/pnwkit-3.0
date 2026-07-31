import type { SelectFields, InferSubqueryType } from "../../types/others";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder";
import type { paginatorInfo } from "../../types/others";
import type PnwKitApi from "../index";
import type { BountyFields, BountyQueryParams, BountyRelations } from "../../types/queries/bounty";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings";

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
 * 
 * @example
 * ```typescript
 * // Get active bounties
 * const bounties = await pnwkit.queries.bounties()
 *   .select('id', 'date', 'amount', 'type', 'nation_id')
 *   .where({ min_amount: 50 })
 *   .first(50)
 *   .execute();
 * // Type: { id: number, date: string, amount: number, type: string, nation_id: number }[]
 * 
 * // Query bounties with target nation details
 * const bounties = await pnwkit.queries.bounties()
 *   .select('id', 'amount', 'type')
 *   .include('nation', builder => builder
 *     .select('id', 'nation_name', 'score', 'alliance_id')
 *   )
 *   .where({ orderBy: [{ column: Enum('AMOUNT'), order: Enum('DESC') }] })
 *   .execute();
 * // Type: { id: number, amount: number, type: string, nation: {...} }[]
 * ```
 */
export class BountiesQuery<
    F extends readonly (Exclude<keyof BountyFields, '__typename'>)[] = [], 
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
    select<const Fields extends readonly (Exclude<keyof BountyFields, '__typename'>)[]>(...fields: Fields): BountiesQuery<Fields> 
    {
        if(fields.length === 0)
            throw new Error("At least one field must be selected.");

        this.selectedFields = [...new Set(fields)];
        return this;
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
        this.subqueries.set(relation, config as SubqueryConfig<any, any, any>);
        return this;
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
            const result = await this.kit['graphQL'].queryCall(this.apiKeyOverride ?? this.kit['apiKey'], query, { skipCache: this.skipCacheFlag });
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
