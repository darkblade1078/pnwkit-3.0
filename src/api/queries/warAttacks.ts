import type { SelectFields, InferSubqueryType } from "../../types/others.js";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder.js";
import graphQLService from "../../services/graphQL.js";
import type { paginatorInfo } from "../../types/others.js";
import type PnwKitApi from "../index.js";
import type { WarAttackFields, WarAttackQueryParams, WarAttackRelations } from "../../types/queries/warAttacks.js";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings.js";

/**
 * Query builder for fetching war attack data from the Politics & War API.
 * 
 * Create new instances using the factory method: `pnwkit.queries.warAttacks()`
 * Provides detailed information about individual attacks within wars.
 * 
 * Features:
 * - Type-safe field selection and filtering
 * - Include attacker, defender, and war data
 * - Filter by war ID, date range, attack type
 * - Detailed casualty and loot information
 * - Pagination support
 * 
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 */
export class WarAttacksQuery<
    F extends readonly (keyof WarAttackFields)[] = [], 
    I extends Record<string, any> = {}
> 
extends QueryBuilder<WarAttackFields, WarAttackQueryParams>
{
    protected queryName = 'war_attacks';

    /**
     * Create a new WarAttacksQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from war attacks
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
     * @example
     * .select('id', 'date', 'type', 'victor', 'success')
    */
    select<const Fields extends readonly (keyof WarAttackFields)[]>(...fields: Fields): WarAttacksQuery<Fields> 
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
     * .where({ war_id: [12345], after: '2026-01-01' })
    */
    where(filters: WarAttackQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof WarAttackRelations,
        TConfig extends SubqueryConfig<WarAttackRelations[K], GetRelationsFor<WarAttackRelations[K]>, GetQueryParamsFor<WarAttackRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = WarAttackRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): WarAttacksQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation as string, config as SubqueryConfig<any, any, any>);
        return this as any;
    }

    async execute(): Promise<SelectFields<WarAttackFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{ 
        data: SelectFields<WarAttackFields, F, I>[], 
        paginatorInfo: paginatorInfo 
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<WarAttackFields, F, I>[] | 
    { data: SelectFields<WarAttackFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute warattacks query: ${message}`);
        }
    }
}
