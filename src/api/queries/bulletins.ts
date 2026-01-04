import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { BulletinFields, BulletinQueryParams, BulletinRelations } from "../../types/queries/bullentin.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching bulletin data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.bulletins()`
 * Bulletins are announcements posted by nations and alliances.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include author nation and alliance data
 * - Filter by ID, date range, nation, alliance, type
 * - Access to bulletin content and metadata
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 */
export class BulletinsQuery<
    F extends readonly (keyof BulletinFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<BulletinFields, BulletinQueryParams>
{
    protected queryName = 'bulletins';

    /**
     * Create a new BulletinsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from bulletins
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'headline', 'body', 'date', 'pinned')
    */
    select<const Fields extends readonly (keyof BulletinFields)[]>(...fields: Fields): BulletinsQuery<Fields> 
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
     * .where({ alliance_id: [1234], after: '2026-01-01' })
    */
    where(filters: BulletinQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof BulletinRelations,
        TConfig extends SubqueryConfig<BulletinRelations[K], GetRelationsFor<BulletinRelations[K]>, GetQueryParamsFor<BulletinRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = BulletinRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): BulletinsQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    async execute(): Promise<SelectFields<BulletinFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<BulletinFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<BulletinFields, F, I>[] | 
    { data: SelectFields<BulletinFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute bulletins query: ${message}`);
        }
    }
}
