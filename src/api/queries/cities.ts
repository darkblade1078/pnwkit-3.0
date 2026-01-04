import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../builders/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { CityFields, CityQueryParams, CityRelations } from "../../types/queries/cities.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching city data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.cities()`
 * Provides detailed information about cities including infrastructure and improvements.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include parent nation data
 * - Filter by nation ID, city ID
 * - Access to all city improvements and infrastructure
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 */
export class CitiesQuery<
    F extends readonly (keyof CityFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<CityFields, CityQueryParams>
{
    protected queryName = 'cities';

    /**
     * Create a new CitiesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from cities
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'name', 'infrastructure', 'land', 'powered')
    */
    select<const Fields extends readonly (keyof CityFields)[]>(...fields: Fields): CitiesQuery<Fields> 
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
    where(filters: CityQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof CityRelations,
        TConfig extends SubqueryConfig<CityRelations[K], GetRelationsFor<CityRelations[K]>, GetQueryParamsFor<CityRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = CityRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): CitiesQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    async execute(): Promise<SelectFields<CityFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<CityFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<CityFields, F, I>[] | 
    { data: SelectFields<CityFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute cities query: ${message}`);
        }
    }
}
