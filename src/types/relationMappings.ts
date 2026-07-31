import type { AllianceRelations, AllianceQueryParams } from "./queries/alliance";
import type { ApiKeyDetailsQueryParams, ApiKeyDetailsRelations } from "./queries/apiKeyDetails";
import type { NationRelations, NationQueryParams } from "./queries/nation";
import type { TradeRelations, TradeQueryParams } from "./queries/trade";
import type { TradePricesQueryParams } from "./queries/tradePrices";
import type { TreatyRelations, TreatyQueryParams } from "./queries/treaties";
import type { WarRelations, WarQueryParams } from "./queries/war";
import type { WarAttackRelations, WarAttackQueryParams } from "./queries/warAttacks";
import type { BountyRelations, BountyQueryParams } from "./queries/bounty";
import type { BannedNationsQueryParams } from "./queries/bannedNations";
import type { CityRelations, CityQueryParams } from "./queries/cities";
import type { BankRecordsQueryParams, BankRelations } from "./queries/bankTaxRec";
import type { BulletinRelations, BulletinQueryParams } from "./queries/bulletin";
import type { BulletinRepliesQueryParams, BulletinReplyRelations } from "./queries/bulletinReplies";
import type { EmbargoRelations, EmbargoQueryParams } from "./queries/embargo";
import type { TreasureTradesQueryParams, TreasureTradeRelations } from "./queries/treasureTrades";
import type { ActivityStatsQueryParams } from "./queries/activityStats";
import type { ResourceStatsQueryParams } from "./queries/resourceStats";
import type { TopTradeInfoRelations, TopTradeInfoQueryParams, TopTradeInfoResourceQueryParams, TopTradeResourceInfoRelations } from "./queries/topTradeInfo";
import type { BaseballGameRelations, QueryBaseballGamesQueryParams } from "./queries/baseballGames";
import type { BaseballTeamRelations, QueryBaseballTeamsQueryParams } from "./queries/baseballTeams";
import type { BaseballPlayerRelations, QueryBaseballPlayersQueryParams } from "./queries/baseballPlayers";

/**
 * Unwrap array types to get the element type
 */
type UnwrapArray<T> = T extends (infer U)[] ? U : T;

/**
 * Explicit lookup table mapping Fields types to their QueryParams types
 * This uses the __typename discriminator for reliable type resolution
*/
export interface FieldsToQueryParamsMap {
    alliances: AllianceQueryParams;
    nations: NationQueryParams;
    me: ApiKeyDetailsQueryParams;
    trades: TradeQueryParams;
    tradeprices: TradePricesQueryParams;
    treaties: TreatyQueryParams;
    wars: WarQueryParams;
    warattacks: WarAttackQueryParams;
    bounties: BountyQueryParams;
    banned_nations: BannedNationsQueryParams;
    cities: CityQueryParams;
    bankrecs: BankRecordsQueryParams;
    bulletins: BulletinQueryParams;
    bulletin_replies: BulletinRepliesQueryParams;
    embargoes: EmbargoQueryParams;
    treasure_trades: TreasureTradesQueryParams;
    activity_stats: ActivityStatsQueryParams;
    resource_stats: ResourceStatsQueryParams;
    top_trade_info: TopTradeInfoQueryParams;
    top_trade_resource_info: TopTradeInfoResourceQueryParams;
    baseball_games: QueryBaseballGamesQueryParams;
    baseball_teams: QueryBaseballTeamsQueryParams;
    baseball_players: QueryBaseballPlayersQueryParams;
}

/**
 * Explicit lookup table mapping Fields types to their Relations types
*/
export interface FieldsToRelationsMap {
    alliances: AllianceRelations;
    nations: NationRelations;
    me: ApiKeyDetailsRelations;
    trades: TradeRelations;
    tradeprices: {};
    treaties: TreatyRelations;
    wars: WarRelations;
    warattacks: WarAttackRelations;
    bounties: BountyRelations;
    banned_nations: {};
    cities: CityRelations;
    bankrecs: BankRelations;
    bulletins: BulletinRelations;
    bulletin_replies: BulletinReplyRelations;
    embargoes: EmbargoRelations;
    treasure_trades: TreasureTradeRelations;
    activity_stats: {};
    resource_stats: {};
    top_trade_info: TopTradeInfoRelations;
    top_trade_resource_info: TopTradeResourceInfoRelations;
    baseball_games: BaseballGameRelations;
    baseball_teams: BaseballTeamRelations;
    baseball_players: BaseballPlayerRelations;
}

/**
 * Extract the __typename from a Fields type
*/
type ExtractTypeName<T> = T extends { __typename?: infer U } ? U : never;

/**
 * Lookup the Relations type for a given Fields type using __typename
*/
export type GetRelationsFor<TFields> = 
    ExtractTypeName<UnwrapArray<TFields>> extends keyof FieldsToRelationsMap
        ? FieldsToRelationsMap[ExtractTypeName<UnwrapArray<TFields>>]
        : {};

/**
 * Lookup the QueryParams type for a given Fields type using __typename
*/
export type GetQueryParamsFor<TFields> = 
    ExtractTypeName<UnwrapArray<TFields>> extends keyof FieldsToQueryParamsMap
        ? FieldsToQueryParamsMap[ExtractTypeName<UnwrapArray<TFields>>]
        : Record<string, any>;
