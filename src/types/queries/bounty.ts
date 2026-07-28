import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others";
import type { NationFields } from "./nation";

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
  column: GraphQLEnum<QueryBountiesOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
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