import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others";
import type { NationFields } from "./nation";

export interface BankTaxrecFields {
  __typename?: 'bankrecs';
  id?: string;
  date?: string;
  sender_id?: string;
  sender_type?: number;
  receiver_id?: string;
  receiver_type?: number;
  banker_id?: string;
  note?: string;
  money?: number;
  coal?: number;
  oil?: number;
  uranium?: number;
  iron?: number;
  bauxite?: number;
  lead?: number;
  gasoline?: number;
  munitions?: number;
  steel?: number;
  aluminum?: number;
  food?: number;
  tax_id?: string;
}

export interface BankRecordsQueryParams extends DefaultParams {
  id?: number[];
  min_id?: number;
  max_id?: number;
  before?: Date;
  after?: Date;
  stype?: number[];
  rtype?: number[];
  or_type?: number[];
  sid?: number[];
  rid?: number[];
  or_id?: number[];
  orderBy?: QueryBankrecsOrderByOrderByClause;
}

export interface BankRelations {
  sender: NationFields;
  receiver: NationFields;
  banker: NationFields;
}

export type QueryBankrecsOrderByOrderByClause = {
  column: GraphQLEnum<QueryBankrecsOrderByColumn>;
  order: GraphQLEnum<SortOrder>
}

export type QueryBankrecsOrderByColumn =
  | 'ID'
  | 'DATE'
  | 'MONEY'
  | 'COAL'
  | 'OIL'
  | 'URANIUM'
  | 'IRON'
  | 'BAUXITE'
  | 'LEAD'
  | 'GASOLINE'
  | 'MUNITIONS'
  | 'STEEL'
  | 'ALUMINUM'
  | 'FOOD';