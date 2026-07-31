import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others";
import type { BaseballTeamFields } from "./baseballTeams";
import type { NationFields } from "./nation";

export interface BaseballPlayersFields {
    __typename?: 'baseball_players';
    id?: number;
    date?: string;
    nation_id?: number;
    team_id?: number;
    name?: string;
    age?: number;
    position?: string;
    pitching?: number;
    batting?: number;
    speed?: number;
    awareness?: number;
    overall?: number;
    birthday?: number;
}

export interface QueryBaseballPlayersQueryParams extends DefaultParams {
    id?: number[];
    team_id?: number;
    orderBy?: QueryBaseballPlayersOrderByOrderByClause;
}

export interface BaseballPlayerRelations {
    nation: NationFields;
    team: BaseballTeamFields;
}

export type QueryBaseballPlayersOrderByOrderByClause = {
  column: GraphQLEnum<QueryBaseballPlayersOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
}

export type QueryBaseballPlayersOrderByColumn =
    | 'ID'
    | 'DATE'
    | 'AGE'
    | 'PITCHING'
    | 'BATTING'
    | 'SPEED'
    | 'AWARENESS'
    | 'OVERALL';
