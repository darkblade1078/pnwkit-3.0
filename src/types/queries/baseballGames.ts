import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others";
import type { NationFields } from "./nation";
import type { BaseballTeamFields } from "./baseballTeams";

export interface BaseballGameFields {
    __typename?: 'baseball_games';
    id?: number;
    date?: string;
    home_id?: number;
    away_id?: number;
    home_nation_id?: number;
    away_nation_id?: number;
    stadium_name?: string;
    home_score?: number;
    away_score?: number;
    sim_text?: string;
    highlights?: string;
    home_revenue?: number;
    spoils?: number;
    open?: number;
    wager?: number;
}

export interface QueryBaseballGamesQueryParams extends DefaultParams {
    id?: number[];
    min_id?: number;
    max_id?: number;
    team_id?: number[];
    orderBy?: QueryBaseballGamesOrderByOrderByClause;
    open?: boolean;
    max_wager?: number;
    min_wager?: number;
    wager?: number[];
}

export interface BaseballGameRelations {
    home_team: BaseballTeamFields;
    away_team: BaseballTeamFields;
    home_nation: NationFields;
    away_nation: NationFields;
}

export type QueryBaseballGamesOrderByOrderByClause = {
  column: GraphQLEnum<QueryBaseballGamesOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
}

export type QueryBaseballGamesOrderByColumn =
    | 'ID'
    | 'DATE'
    | 'HTSCORE'
    | 'ATSCORE';
