import type { DefaultParams, SortOrder } from "../others.js"
import type { AllianceFields } from "./alliance.js"

export interface TreatyFields {
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
  column: QueryTreatiesOrderByColumn;
  order: SortOrder;
}

export type QueryTreatiesOrderByColumn = 
  | 'ID'
  | 'DATE'
  | 'TURNS_LEFT'