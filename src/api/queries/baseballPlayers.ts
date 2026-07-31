import type { SelectFields, InferSubqueryType } from "../../types/others";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder";
import type { paginatorInfo } from "../../types/others";
import type PnwKitApi from "../index";
import type { BaseballPlayersFields, QueryBaseballPlayersQueryParams, BaseballPlayerRelations } from "../../types/queries/baseballPlayers";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings";

/**
 * Query builder for fetching baseball player data from the Politics & War API.
 *
 * Create new instances using the factory method: `pnwkit.queries.baseballPlayers()`
 *
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 *
 * @example
 * ```typescript
 * const players = await pnwkit.queries.baseballPlayers()
 *   .select('id', 'name', 'overall', 'batting', 'pitching')
 *   .where({ team_id: 123 })
 *   .execute();
 * ```
 */
export class BaseballPlayersQuery<
    F extends readonly (Exclude<keyof BaseballPlayersFields, '__typename'>)[] = [],
    I extends Record<string, any> = {}
>
extends QueryBuilder<BaseballPlayersFields, QueryBaseballPlayersQueryParams>
{
    protected queryName = 'baseball_players';

    /**
     * Create a new BaseballPlayersQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from baseball players
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
    */
    select<const Fields extends readonly (Exclude<keyof BaseballPlayersFields, '__typename'>)[]>(...fields: Fields): BaseballPlayersQuery<Fields>
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
    */
    where(filters: QueryBaseballPlayersQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof BaseballPlayerRelations,
        TConfig extends SubqueryConfig<BaseballPlayerRelations[K], GetRelationsFor<BaseballPlayerRelations[K]>, GetQueryParamsFor<BaseballPlayerRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = BaseballPlayerRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): BaseballPlayersQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation, config as SubqueryConfig<any, any, any>);
        return this;
    }

    async execute(): Promise<SelectFields<BaseballPlayersFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{
        data: SelectFields<BaseballPlayersFields, F, I>[],
        paginatorInfo: paginatorInfo
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<BaseballPlayersFields, F, I>[] |
    { data: SelectFields<BaseballPlayersFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute baseball_players query: ${message}`);
        }
    }
}
