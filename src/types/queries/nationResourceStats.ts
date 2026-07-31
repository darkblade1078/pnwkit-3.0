import type { GraphQLEnum } from "../../enum";
import type { SortOrder } from "../others"

export interface NationResourceStatsFields {
    __typename?: 'nation_resource_stats';
    date?: string
    money?: string
    food?: string
    steel?: string
    aluminum?: string
    gasoline?: string
    munitions?: string
    uranium?: string
    coal?: string
    oil?: string
    iron?: string
    bauxite?: string
    lead?: string
}

export interface NationResourceStatsQueryParams {
    before?: string,
    after?: string
    orderBy?: QueryNationResourceStatsByOrderByClause;
}

export interface NationResourceStatsRelations {}

export type QueryNationResourceStatsByOrderByClause = {
  column: GraphQLEnum<QueryNationResourceStatsOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
}

export type QueryNationResourceStatsOrderByColumn = 
    | 'DATE'
    | 'MONEY'
    | 'FOOD'
    | 'STEEL'
    | 'ALUMINUM'
    | 'GASOLINE'
    | 'MUNITIONS'
    | 'URANIUM'
    | 'COAL'
    | 'OIL'
    | 'IRON'
    | 'BAUXITE'
    | 'LEAD'