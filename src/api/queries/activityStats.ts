import type { SelectFields } from "../../types/others.js";
import { QueryBuilder } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { ActivityStatsFields, ActivityStatsQueryParams } from "../../types/queries/activityStats.js";

/**
 * Query builder for fetching activity statistics from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.activityStats()`
 * Provides historical data on player activity metrics.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Filter by date range
 * - Access to daily activity statistics
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * 
 * @example
 * ```typescript
 * // Get recent activity statistics
 * const stats = await pnwkit.queries.activityStats()
 *   .select('date', 'total_nations', 'active_1_day', 'active_1_week', 'active_2_weeks')
 *   .first(30)
 *   .execute();
 * // Type: { date: string, total_nations: number, active_1_day: number, active_1_week: number, active_2_weeks: number }[]
 * 
 * // Filter by specific date range
 * const stats = await pnwkit.queries.activityStats()
 *   .select('date', 'active_1_day', 'active_1_month')
 *   .where({ min_date: '2026-01-01', max_date: '2026-01-05' })
 *   .execute();
 * // Type: { date: string, active_1_day: number, active_1_month: number }[]
 * ```
 */
export class ActivityStatsQuery<
    F extends readonly (keyof ActivityStatsFields)[] = []
> 
extends QueryBuilder<ActivityStatsFields, ActivityStatsQueryParams>
{
    protected queryName = 'activity_stats';

    /**
     * Create a new ActivityStatsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from activity stats
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('date', 'total_nations', 'active_1_day', 'active_1_week')
    */
    select<const Fields extends readonly (keyof ActivityStatsFields)[]>(...fields: Fields): ActivityStatsQuery<Fields> 
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
     * .where({ before: '2026-01-01', after: '2025-12-01' })
    */
    where(filters: ActivityStatsQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    async execute(): Promise<SelectFields<ActivityStatsFields, F, {}>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<ActivityStatsFields, F, {}>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<ActivityStatsFields, F, {}>[] | 
    { data: SelectFields<ActivityStatsFields, F, {}>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute activity_stats query: ${message}`);
        }
    }
}
