import type { SelectFields, InferSubqueryType } from "../../types/others";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder";
import type { paginatorInfo } from "../../types/others";
import type PnwKitApi from "../index";
import type { TreatyFields, TreatyQueryParams, TreatyRelations } from "../../types/queries/treaties";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings";

/**
 * Query builder for fetching treaty data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.treaties()`
 * Treaties represent agreements between alliances.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include related alliance data
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 * 
 * @example
 * ```typescript
 * // Get active treaties
 * const treaties = await pnwkit.queries.treaties()
 *   .select('id', 'treaty_type', 'turns_left', 'approved')
 *   .where({ alliance_id: [123] })
 *   .execute();
 * // Type: { id: number, treaty_type: string, turns_left: number, approved: boolean }[]
 * 
 * // Query treaties with alliance details
 * const treaties = await pnwkit.queries.treaties()
 *   .select('id', 'treaty_type', 'turns_left')
 *   .include('alliance1', builder => builder
 *     .select('id', 'name', 'score')
 *   )
 *   .include('alliance2', builder => builder
 *     .select('id', 'name', 'score')
 *   )
 *   .execute();
 * // Type: { id: number, treaty_type: string, turns_left: number, alliance1: {...}, alliance2: {...} }[]
 * ```
 */
export class TreatiesQuery<
    F extends readonly (Exclude<keyof TreatyFields, '__typename'>)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<TreatyFields, TreatyQueryParams>
{
    protected queryName = 'treaties';

    /**
     * Create a new TreatiesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from treaties
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'treaty_type', 'turns_left', 'approved')
    */
    select<const Fields extends readonly (Exclude<keyof TreatyFields, '__typename'>)[]>(...fields: Fields): TreatiesQuery<Fields> 
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
     * .where({ id: '12345' })
    */
    where(filters: TreatyQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof TreatyRelations,
        TConfig extends SubqueryConfig<TreatyRelations[K], GetRelationsFor<TreatyRelations[K]>, GetQueryParamsFor<TreatyRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = TreatyRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): TreatiesQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation, config as SubqueryConfig<any, any, any>);
        return this;
    }

    async execute(): Promise<SelectFields<TreatyFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<TreatyFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<TreatyFields, F, I>[] | 
    { data: SelectFields<TreatyFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute treaties query: ${message}`);
        }
    }
}
