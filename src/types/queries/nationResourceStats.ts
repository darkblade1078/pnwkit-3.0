import type { SortOrder } from "../others.js"

export interface NationResourceStatsFields {
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
  column: QueryNationResourceStatsOrderByColumn;
  order: SortOrder;
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