import type { DefaultParams, SortOrder } from "../others.js";

export interface ActivityStatsFields {
    date?: string;
    total_nations?: number;
    nations_created?: number;
    active_1_day?: number;
    active_2_days?: number;
    active_3_days?: number;
    active_1_week?: number;
    active_1_month?: number;
}

export interface ActivityStatsQueryParams extends DefaultParams {
    before?: string;
    after?: string;
    orderBy?: QueryActivityStatsOrderByOrderByClause;
}

export interface ActivityStatRelations {}

export type QueryActivityStatsOrderByOrderByClause = {
  column: QueryActivityStatsOrderByColumn;
  order: SortOrder;
}

export type QueryActivityStatsOrderByColumn =
    | 'DATE'
    | 'TOTAL_NATIONS'
    | 'NATIONS_CREATED'
    | 'ACTIVE_1_DAY'
    | 'ACTIVE_2_DAYS'
    | 'ACTIVE_3_DAYS'
    | 'ACTIVE_1_WEEK'
    | 'ACTIVE_1_MONTH';