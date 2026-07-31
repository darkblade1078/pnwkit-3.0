import type { SelectFields, InferSubqueryType } from "../../types/others";
import { QueryBuilder, type SubqueryConfig } from "../../services/queryBuilder";
import type { paginatorInfo } from "../../types/others";
import type PnwKitApi from "../index";
import type { BaseballGameFields, QueryBaseballGamesQueryParams, BaseballGameRelations } from "../../types/queries/baseballGames";
import type { GetRelationsFor, GetQueryParamsFor } from "../../types/relationMappings";

/**
 * Query builder for fetching baseball game data from the Politics & War API.
 *
 * Create new instances using the factory method: `pnwkit.queries.baseballGames()`
 *
 * @category Query Builders
 * @template F - Selected field names
 * @template I - Included relations
 *
 * @example
 * ```typescript
 * const games = await pnwkit.queries.baseballGames()
 *   .select('id', 'date', 'home_score', 'away_score')
 *   .where({ team_id: [123] })
 *   .execute();
 * ```
 */
export class BaseballGamesQuery<
    F extends readonly (Exclude<keyof BaseballGameFields, '__typename'>)[] = [],
    I extends Record<string, any> = {}
>
extends QueryBuilder<BaseballGameFields, QueryBaseballGamesQueryParams>
{
    protected queryName = 'baseball_games';

    /**
     * Create a new BaseballGamesQuery instance
     * @param kit - The PnWKit instance containing API credentials
     * @internal
    */
    constructor(private kit: PnwKitApi) {
        super();
    }

    /**
     * Select specific fields to retrieve from baseball games
     * @param fields - Field names to select
     * @returns New query instance with selected fields
     * @throws Error if no fields are provided
    */
    select<const Fields extends readonly (Exclude<keyof BaseballGameFields, '__typename'>)[]>(...fields: Fields): BaseballGamesQuery<Fields>
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
    where(filters: QueryBaseballGamesQueryParams): this
    {
        this.filters = filters;
        return this;
    }

    include<
        K extends keyof BaseballGameRelations,
        TConfig extends SubqueryConfig<BaseballGameRelations[K], GetRelationsFor<BaseballGameRelations[K]>, GetQueryParamsFor<BaseballGameRelations[K]>>,
        TNestedResult = InferSubqueryType<ReturnType<TConfig>>,
        TWrappedResult = BaseballGameRelations[K] extends any[] ? TNestedResult[] : TNestedResult
    >(
        relation: K,
        config: TConfig
    ): BaseballGamesQuery<F, I & Record<K, TWrappedResult>>
    {
        this.subqueries.set(relation, config as SubqueryConfig<any, any, any>);
        return this;
    }

    async execute(): Promise<SelectFields<BaseballGameFields, F, I>[]>;
    async execute(withPaginator: true): Promise<{
        data: SelectFields<BaseballGameFields, F, I>[],
        paginatorInfo: paginatorInfo
    }>;
    async execute(withPaginator: boolean = false): Promise<
    SelectFields<BaseballGameFields, F, I>[] |
    { data: SelectFields<BaseballGameFields, F, I>[], paginatorInfo: paginatorInfo }
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
            throw new Error(`Failed to execute baseball_games query: ${message}`);
        }
    }
}
