import type { DefaultParams, SortOrder } from "../others.js"

export interface ResourceStatsFields {
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

export interface ResourceStatsQueryParams extends DefaultParams {
    before?: string
    after?: string
    orderBy?: QueryResourceStatsOrderByOrderByClause
}

export interface ResourceStatRelations {}

export type QueryResourceStatsOrderByOrderByClause = {
  column: QueryResourceStatsOrderByColumn;
  order: SortOrder;
}

export type QueryResourceStatsOrderByColumn =
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
    | 'LEAD';