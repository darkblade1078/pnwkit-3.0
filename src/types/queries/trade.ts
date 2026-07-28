import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others";

export interface TradeFields {
  id?: string;
  type?: string;
  date?: string;
  sender_id?: string;
  receiver_id?: string;
  offer_resource?: string;
  offer_amount?: number;
  buy_or_sell?: string;
  price?: number;
  accepted?: boolean;
  date_accepted?: string;
  original_trade_id?: string;
}

export interface TradeQueryParams extends DefaultParams {
  id?: number[];
  min_id?: number;
  max_id?: number;
  before?: string;
  after?: string;
  type?: string;
  nation_id?: number[];
  offer_resource?: string[];
  buy_or_sell?: string;
  accepted?: boolean;
  original_trade_id?: number[];
  orderBy?: QueryTradesOrderByOrderByClause;
}

export type QueryTradesOrderByColumn = 
  | 'ID'
  | 'DATE'
  | 'DATE_ACCEPTED'
  | 'OFFER_RESOURCE'
  | 'OFFER_AMOUNT'
  | 'PRICE'

export type QueryTradesOrderByOrderByClause = {
  column: GraphQLEnum<QueryTradesOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
};

export interface TradeRelations {}