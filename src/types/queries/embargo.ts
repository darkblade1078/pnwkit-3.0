import type { DefaultParams, SortOrder } from "../others.js"
import type { NationFields } from "./nation.js"

export interface EmbargoFields {
    id?: string;
    date?: string;
    sender_id?: string;
    receiver_id?: string;
    reason?: string;
    type?: EmbargoType;
}

export interface EmbargoQueryParams extends DefaultParams {
    id?: number[];
    nation_id?: number[];
    min_id?: number;
    max_id?: number;
    orderBy?: QueryEmbargoOrderByOrderByClause;
}

export interface EmbargoRelations {
    sender: NationFields;
    receiver: NationFields;
}

export type QueryEmbargoOrderByOrderByClause = {
  column: QueryEmbargoOrderByColumn;
  order: SortOrder;
}

export type QueryEmbargoOrderByColumn =
  | 'ID'
  | 'DATE';

export enum EmbargoType {
    NATION_TO_NATION = 'NATION_TO_NATION',
    NATION_TO_ALLIANCE = 'NATION_TO_ALLIANCE',
    ALLIANCE_TO_NATION = 'ALLIANCE_TO_NATION',
    ALLIANCE_TO_ALLIANCE = 'ALLIANCE_TO_ALLIANCE'
}