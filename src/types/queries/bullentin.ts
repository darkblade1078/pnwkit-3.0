import type { DefaultParams, paginatorInfo, SortOrder } from "../others.js";
import type { AllianceFields } from "./alliance.js";
import type { BulletinReplyFields } from "./bullentinReplies.js";
import type { NationFields } from "./nation.js";

export interface BulletinFields {
  id?: string;
  nation_id?: string;
  alliance_id?: string;
  type?: number;
  headline?: string;
  excerpt?: string;
  image?: string;
  body?: string;
  author?: string;
  pinned?: boolean;
  like_count?: number;
  replies_enabled?: boolean;
  locked?: boolean;
  date?: string;
  edit_date?: string;
  archived?: boolean;
  replies?: BulletinReplyPaginator;
}

export interface BulletinQueryParams extends DefaultParams {
  id?: number[];
  min_id?: number;
  max_id?: number;
  before?: string;
  after?: string;
  edited_before?: string;
  edited_since?: string;
  nation_id?: number[];
  type?: number;
  alliance_id?: number[];
  orderBy?: QueryBulletinOrderByOrderByClause;
}

export interface BulletinRelations {
  nation: NationFields;
  alliance: AllianceFields;
}

export type QueryBulletinOrderByOrderByClause = {
  column: QueryBulletinOrderByColumn;
  order: SortOrder;
}

export type BulletinReplyPaginator= {
  paginatorInfo: paginatorInfo;
  data: BulletinReplyFields[];
}

export type QueryBulletinOrderByColumn =
  | 'ID'
  | 'DATE'
  | 'LIKE_COUNT'
  | 'EDIT_DATE';