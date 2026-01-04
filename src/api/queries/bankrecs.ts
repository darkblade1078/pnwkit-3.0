import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { BankTaxrecFields, BankRecordsQueryParams, BankRelations } from "../../types/queries/bankTaxRec.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching bank record data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.bankrecs()`
 * Provides transaction history for alliance and nation banks.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include sender, receiver, and banker nation data
 * - Filter by ID, date range, sender/receiver type and ID
 * - Access to all transferred resources
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 */
export class BankrecsQuery<
    F extends readonly (keyof BankTaxrecFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<BankTaxrecFields, BankRecordsQueryParams>
{
    protected queryName = 'bankrecs';

    /**
     * Create a new BankrecsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from bank records
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'date', 'note', 'money', 'food', 'coal')
    */
    select<const Fields extends readonly (keyof BankTaxrecFields)[]>(...fields: Fields): BankrecsQuery<Fields> 
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
     * .where({ sid: [123456], after: new Date('2026-01-01') })
    */
    where(filters: BankRecordsQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof BankRelations,
        TConfig extends SubqueryConfig<BankRelations[K], GetRelationsFor<BankRelations[K]>, GetQueryParamsFor<BankRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = BankRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): BankrecsQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    async execute(): Promise<SelectFields<BankTaxrecFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<BankTaxrecFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<BankTaxrecFields, F, I>[] | 
    { data: SelectFields<BankTaxrecFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute bankrecs query: ${message}`);
        }
    }
}
