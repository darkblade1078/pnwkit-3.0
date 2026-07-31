import type { SelectFields, InferSubqueryType } from "../../types/others";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder";
import type { paginatorInfo } from "../../types/others";
import type PnwKitApi from "../index";
import type { TreasureTradeFields, TreasureTradesQueryParams, TreasureTradeRelations } from "../../types/queries/treasureTrades";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings";

/**
 * Query builder for fetching treasure trade data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.treasureTrades()`
 * Treasure trades are offers to buy or sell treasures between nations.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include sender and receiver nation data
 * - Filter by ID, nation ID, offer status
 * - Access to trade details and status
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 * 
 * @example
 * ```typescript
 * // Get active treasure trade offers
 * const treasureTrades = await pnwkit.queries.treasureTrades()
 *   .select('id', 'treasure', 'money', 'accepted', 'buying', 'selling')
 *   .where({ accepted: false })
 *   .first(50)
 *   .execute();
 * // Type: { id: number, treasure: string, money: number, accepted: boolean, buying: number, selling: number }[]
 * 
 * // Query trades with buyer and seller details
 * const treasureTrades = await pnwkit.queries.treasureTrades()
 *   .select('id', 'treasure', 'money', 'accepted')
 *   .include('buyer', builder => builder
 *     .select('id', 'nation_name', 'alliance_id')
 *   )
 *   .include('seller', builder => builder
 *     .select('id', 'nation_name', 'alliance_id')
 *   )
 *   .execute();
 * // Type: { id: number, ..., buyer: {...}, seller: {...} }[]
 * ```
 */
export class TreasureTradesQuery<
    F extends readonly (Exclude<keyof TreasureTradeFields, '__typename'>)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<TreasureTradeFields, TreasureTradesQueryParams>
{
    protected queryName = 'treasure_trades';

    /**
     * Create a new TreasureTradesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from treasure trades
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'treasure', 'money', 'accepted', 'buying', 'selling')
    */
    select<const Fields extends readonly (Exclude<keyof TreasureTradeFields, '__typename'>)[]>(...fields: Fields): TreasureTradesQuery<Fields> 
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
     * .where({ nation_id: [123456] })
    */
    where(filters: TreasureTradesQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof TreasureTradeRelations,
        TConfig extends SubqueryConfig<TreasureTradeRelations[K], GetRelationsFor<TreasureTradeRelations[K]>, GetQueryParamsFor<TreasureTradeRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = TreasureTradeRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): TreasureTradesQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation, config as SubqueryConfig<any, any, any>);
        return this;
    }

    async execute(): Promise<SelectFields<TreasureTradeFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<TreasureTradeFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<TreasureTradeFields, F, I>[] | 
    { data: SelectFields<TreasureTradeFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute treasure_trades query: ${message}`);
        }
    }
}
