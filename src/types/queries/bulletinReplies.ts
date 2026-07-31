import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others";
import type { BulletinFields } from "./bulletin";
import type { NationFields } from "./nation";

export interface BulletinReplyFields {
  __typename?: 'bulletin_replies';
  id?: string;
  date?: string;
  nation_id?: string;
  bulletin_id?: string;
  message?: string;
  edit_date?: string;
  nation_name?: string;
  leader_name?: string;
  like_count?: number;
}

export interface BulletinRepliesQueryParams extends DefaultParams {
  id?: number[];
  min_id?: number;
  max_id?: number;
  bulletin_id?: number[];
  bulletin_min_id?: number;
  bulletin_max_id?: number;
  before?: string;
  after?: string;
  edited_before?: string;
  edited_since?: string;
  nation_id?: number[];
  leader_name?: string[];
  nation_name?: string[];
  orderBy?: QueryBulletinRepliesOrderByOrderByClause;
}

export interface BulletinReplyRelations {
  nation: NationFields;
  bulletin: BulletinFields;
}

export type QueryBulletinRepliesOrderByOrderByClause = {
  column: GraphQLEnum<QueryBulletinRepliesOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
}

export type QueryBulletinRepliesOrderByColumn =
  | 'ID'
  | 'DATE'
  | 'EDIT_DATE'
  | 'ACCOUNT_ID'
  | 'BULLETIN_ID';