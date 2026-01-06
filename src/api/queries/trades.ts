import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { TradeFields, TradeQueryParams, TradeRelations } from "../../types/queries/trade.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching trade data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.trades()`
 * Each call creates a fresh instance with no shared state, preventing filter pollution.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Recursive nesting with automatic type inference
 * - Pagination support with optional paginatorInfo
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * @template I - Included relations (tracked through chaining with proper cardinality)
 */
export class TradesQuery<
    F extends readonly (keyof TradeFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<TradeFields, TradeQueryParams>
{
    protected queryName = 'trades';

    /**
     * Create a new TradesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from trades
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'type', 'date', 'offer_resource', 'price')
    */
    select<const Fields extends readonly (keyof TradeFields)[]>(...fields: Fields): TradesQuery<Fields> 
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
     * .where({ type: 'GLOBAL', accepted: true })
    */
    where(filters: TradeQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof TradeRelations,
        TConfig extends SubqueryConfig<TradeRelations[K], GetRelationsFor<TradeRelations[K]>, GetQueryParamsFor<TradeRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = TradeRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): TradesQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    async execute(): Promise<SelectFields<TradeFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<TradeFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<TradeFields, F, I>[] | 
    { data: SelectFields<TradeFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute trades query: ${message}`);
        }
    }
}
