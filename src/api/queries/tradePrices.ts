import type { SelectFields } from "../../types/others.js";
import { QueryBuilder } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type PnwKitApi from "../index.js";
import type { TradepriceFields, TradePricesQueryParams, TradePricesRelations } from "../../types/queries/tradePrices.js";

/**
 * Query builder for fetching trade price data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.tradePrices()`
 * Provides historical pricing data for resources and credits.
 * 
 * @category Query Builders
 * @template F - Selected field names (tracked through chaining for precise autocomplete)
 * 
 * @example
 * ```typescript
 * // Get latest trade prices for all resources
 * const prices = await pnwkit.queries.tradePrices()
 *   .select('date', 'coal', 'oil', 'uranium', 'food', 'aluminum', 'steel', 'gasoline')
 *   .execute();
 * // Type: { date: string, coal: number, oil: number, uranium: number, food: number, aluminum: number, steel: number, gasoline: number }
 * 
 * // Get historical credit prices
 * const creditPrices = await pnwkit.queries.tradePrices()
 *   .select('date', 'credits')
 *   .execute();
 * // Type: { date: string, credits: number }
 * ```
 */
export class TradePricesQuery<
    F extends readonly (keyof TradepriceFields)[] = []
> 
extends QueryBuilder<TradepriceFields, TradePricesQueryParams>
{
    protected queryName = 'tradeprices';

    /**
     * Create a new TradePricesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from trade prices
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('date', 'coal', 'oil', 'uranium', 'food')
    */
    select<const Fields extends readonly (keyof TradepriceFields)[]>(...fields: Fields): TradePricesQuery<Fields> 
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
    */
    where(filters: TradePricesQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    async execute(): Promise<SelectFields<TradepriceFields, F, {}>[]>
    {
        try
        {
            const query = this.buildQuery(false);
            const result = await graphQLService.queryCall(this.kit['apiKey'], query);
            const queryData = result[this.queryName];

            if(!queryData)
                throw new Error(`No data returned from ${this.queryName} query.`);

            return queryData.data == undefined ? queryData : queryData.data;
        }
        catch(error: unknown)
        {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to execute tradeprice query: ${message}`);
        }
    }
}
