import type { SelectFields } from "../../types/others.js";
import { QueryBuilder } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { BannedNationFields, BannedNationsQueryParams, BannedNationRelations } from "../../types/queries/bannedNations.js";

/**
 * Query builder for fetching banned nation data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.bannedNations()`
 * Provides information about nations currently banned from the game.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Filter by nation ID, leader name, nation name
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 */
export class BannedNationsQuery<
    F extends readonly (keyof BannedNationFields)[] = []
> 
extends QueryBuilder<BannedNationFields, BannedNationsQueryParams>
{
    protected queryName = 'banned_nations';

    /**
     * Create a new BannedNationsQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from banned nations
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('nation_id', 'reason', 'date', 'days_left')
    */
    select<const Fields extends readonly (keyof BannedNationFields)[]>(...fields: Fields): BannedNationsQuery<Fields> 
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
     * .where({ nation_id: [123456] })
    */
    where(filters: BannedNationsQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    async execute(): Promise<SelectFields<BannedNationFields, F, {}>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<BannedNationFields, F, {}>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<BannedNationFields, F, {}>[] | 
    { data: SelectFields<BannedNationFields, F, {}>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute nations_banned query: ${message}`);
        }
    }
}
