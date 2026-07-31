import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others";

export interface BannedNationFields {
    __typename?: 'banned_nations';
    nation_id?: string;
    reason?: string;
    date?: string;
    days_left?: number;
}

export interface BannedNationsQueryParams extends DefaultParams {
    nation_id?: number[];
    leader_name?: string[];
    nation_name?: string[];
    orderBy?: QueryBannedNationsOrderByOrderByClause;
}

export interface BannedNationRelations {}

export type QueryBannedNationsOrderByOrderByClause = {
  column: GraphQLEnum<QueryBannedNationsOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
}

export type QueryBannedNationsOrderByColumn =
    | 'NATION_ID'
    | 'DATE';