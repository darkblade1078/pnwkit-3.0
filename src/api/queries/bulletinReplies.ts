import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { BulletinReplyFields, BulletinRepliesQueryParams, BulletinReplyRelations } from "../../types/queries/bullentinReplies.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching bulletin reply data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.bulletinReplies()`
 * Replies are comments posted on bulletins.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include author nation and parent bulletin data
 * - Filter by ID, bulletin ID, date range, nation
 * - Access to reply content and like count
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 * 
 * @example
 * ```typescript
 * // Get recent replies to a bulletin
 * const replies = await pnwkit.queries.bulletinReplies()
 *   .select('id', 'message', 'date', 'nation_name', 'like_count')
 *   .where({ bulletin_id: [123456] })
 *   .first(100)
 *   .execute();
 * // Type: { id: number, message: string, date: string, nation_name: string, like_count: number }[]
 * 
 * // Query replies with author and bulletin details
 * const replies = await pnwkit.queries.bulletinReplies()
 *   .select('id', 'message', 'date', 'like_count')
 *   .include('nation', builder => builder
 *     .select('id', 'nation_name', 'alliance_id')
 *   )
 *   .include('bulletin', builder => builder
 *     .select('id', 'headline')
 *   )
 *   .execute();
 * // Type: { id: number, ..., nation: {...}, bulletin: {...} }[]
 * ```
 */
export class BulletinRepliesQuery<
    F extends readonly (keyof BulletinReplyFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<BulletinReplyFields, BulletinRepliesQueryParams>
{
    protected queryName = 'bulletin_replies';

    /**
     * Create a new BulletinRepliesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from bulletin replies
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'message', 'date', 'nation_name', 'like_count')
    */
    select<const Fields extends readonly (keyof BulletinReplyFields)[]>(...fields: Fields): BulletinRepliesQuery<Fields> 
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
     * .where({ bulletin_id: [12345], after: '2026-01-01' })
    */
    where(filters: BulletinRepliesQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof BulletinReplyRelations,
        TConfig extends SubqueryConfig<BulletinReplyRelations[K], GetRelationsFor<BulletinReplyRelations[K]>, GetQueryParamsFor<BulletinReplyRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = BulletinReplyRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): BulletinRepliesQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    async execute(): Promise<SelectFields<BulletinReplyFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<BulletinReplyFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<BulletinReplyFields, F, I>[] | 
    { data: SelectFields<BulletinReplyFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute bulletin_replies query: ${message}`);
        }
    }
}
