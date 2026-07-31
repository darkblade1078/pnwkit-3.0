import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others"
import type { AllianceFields } from "./alliance"

export interface TreatyFields {
    __typename?: 'treaties';
    id?: string
    date?: string
    treaty_type?: string
    treaty_url?: string
    turns_left?: number
    alliance1_id?: string
    alliance2_id?: string
    approved?: boolean
}

export interface TreatyQueryParams extends DefaultParams {
  id?: string;
  orderBy?: QueryTreatiesOrderByOrderByClause;
}

export interface TreatyRelations {
  alliance1: AllianceFields
  alliance2: AllianceFields
}

export type QueryTreatiesOrderByOrderByClause = {
  column: GraphQLEnum<QueryTreatiesOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
}

export type QueryTreatiesOrderByColumn = 
  | 'ID'
  | 'DATE'
  | 'TURNS_LEFT'