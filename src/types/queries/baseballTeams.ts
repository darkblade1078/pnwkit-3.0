import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others";
import type { BaseballGameFields } from "./baseballGames";
import type { BaseballPlayersFields } from "./baseballPlayers";
import type { NationFields } from "./nation";

export interface BaseballTeamFields {
    __typename?: 'baseball_teams';
    id?: number;
    date?: string;
    nation_id?: number;
    name?: string;
    logo?: string;
    home_jersey?: string;
    away_jersey?: string;
    stadium?: string;
    quality?: number;
    seating?: number;
    rating?: number;
    wins?: number;
    glosses?: number;
    runs?: number;
    homers?: number;
    strikeouts?: number;
    games_played?: number;
}

export interface QueryBaseballTeamsQueryParams extends DefaultParams {
    id?: number[];
    orderBy?: QueryBaseballTeamsOrderByOrderByClause;
}

export interface BaseballTeamRelations {
    nation: NationFields;
    games: BaseballGameFields[];
    players: BaseballPlayersFields[];
}

export type QueryBaseballTeamsOrderByOrderByClause = {
  column: GraphQLEnum<QueryBaseballTeamsOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
}

export type QueryBaseballTeamsOrderByColumn =
    | 'ID'
    | 'DATE'
    | 'QUALITY'
    | 'SEATING'
    | 'RATING'
    | 'WINS'
    | 'GLOSSES'
    | 'RUNS'
    | 'HOMERS'
    | 'STRIKEOUTS'
    | 'GAMES';
