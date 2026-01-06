import type { SelectFields } from "../../types/others.js";
import { QueryBuilder } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { ResourceStatsFields, ResourceStatsQueryParams, ResourceStatRelations } from "../../types/queries/resourceStats.js";

/**
 * Query builder for fetching resource statistics from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.resourceStats()`
 * Provides historical data on global resource totals.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Filter by date range
 * - Access to daily resource totals across all nations
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 */
export class ResourceStatsQuery<
    F extends readonly (keyof ResourceStatsFields)[] = []
> 
extends QueryBuilder<ResourceStatsFields, ResourceStatsQueryParams>
{
    protected queryName = 'resource_stats';

    /**
     * Create a new ResourceStatsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from resource stats
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('date', 'money', 'food', 'coal', 'oil', 'uranium')
    */
    select<const Fields extends readonly (keyof ResourceStatsFields)[]>(...fields: Fields): ResourceStatsQuery<Fields> 
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
    where(filters: ResourceStatsQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    async execute(): Promise<SelectFields<ResourceStatsFields, F, {}>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<ResourceStatsFields, F, {}>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<ResourceStatsFields, F, {}>[] | 
    { data: SelectFields<ResourceStatsFields, F, {}>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute resource_stats query: ${message}`);
        }
    }
}
