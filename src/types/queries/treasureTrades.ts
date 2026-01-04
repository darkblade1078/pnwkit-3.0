import type { DefaultParams, SortOrder } from "../others.js";
import type { NationFields } from "./nation.js"


export interface TreasureTradeFields {
    id?: string;
    offer_date?: string;
    accept_date?: string;
    sender_id?: string;
    receiver_id?: string;
    buying?: boolean;
    selling?: boolean;
    treasure?: string;
    money?: number;
    accepted?: boolean;
    rejected?: boolean;
    seller_cancelled?: boolean;
}

export interface TreasureTradesQueryParams extends DefaultParams {
    id?: number[];
    nation_id?: number[];
    min_id?: number;
    max_id?: number;
    orderBy?: QueryTreasureTradesOrderByOrderByClause;
}

export interface TreasureTradeRelations {
    sender: NationFields
    receiver: NationFields
}

export type QueryTreasureTradesOrderByOrderByClause = {
  column: QueryTreasureTradesOrderByColumn;
  order: SortOrder
}

export type QueryTreasureTradesOrderByColumn =
  | 'ID'