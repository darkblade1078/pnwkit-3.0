import type { DefaultParams, SortOrder } from "../others.js";
import type { NationFields } from "./nation.js";

export interface BountyFields {
  id?: string;
  date?: string;
  nation_id?: string;
  amount?: number;
  type?: BountyType;
}

export interface BountyQueryParams extends DefaultParams {
  nation_id?: number[];
  min_amount?: number;
  max_amount?: number;
  orderBy?: QueryBountiesOrderByOrderByClause;
}

export type QueryBountiesOrderByColumn = 
  | 'ID'
  | 'DATE'
  | 'AMOUNT';

export type QueryBountiesOrderByOrderByClause = {
  column: QueryBountiesOrderByColumn;
  order: SortOrder;
};

export interface BountyRelations {
  nation: NationFields;
}

export enum BountyType {
  ORDINARY = 'ORDINARY',
  ATTRITION = 'ATTRITION',
  RAID = 'RAID',
  NUCLEAR = 'NUCLEAR'
}