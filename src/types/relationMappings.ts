import type { AllianceRelations, AllianceQueryParams } from "./queries/alliance.js";
import type { ApiKeyDetailsQueryParams, ApiKeyDetailsRelations } from "./queries/apiKeyDetails.js";
import type { NationRelations, NationQueryParams } from "./queries/nation.js";
import type { TradeRelations, TradeQueryParams } from "./queries/trade.js";
import type { TradePricesQueryParams } from "./queries/tradePrices.js";
import type { TreatyRelations, TreatyQueryParams } from "./queries/treaties.js";
import type { WarRelations, WarQueryParams } from "./queries/war.js";
import type { WarAttackRelations, WarAttackQueryParams } from "./queries/warAttacks.js";
import type { BountyRelations, BountyQueryParams } from "./queries/bounty.js";
import type { BannedNationsQueryParams } from "./queries/bannedNations.js";
import type { CityRelations, CityQueryParams } from "./queries/cities.js";
import type { BankRecordsQueryParams, BankRelations } from "./queries/bankTaxRec.js";
import type { BulletinRelations, BulletinQueryParams } from "./queries/bullentin.js";
import type { BulletinRepliesQueryParams, BulletinReplyRelations } from "./queries/bullentinReplies.js";
import type { EmbargoRelations, EmbargoQueryParams } from "./queries/embargo.js";
import type { TreasureTradesQueryParams, TreasureTradeRelations } from "./queries/treasureTrades.js";
import type { ActivityStatsQueryParams } from "./queries/activityStats.js";
import type { ResourceStatsQueryParams } from "./queries/resourceStats.js";
import type { TopTradeInfoResourceQueryParams, TopTradeResourceInfoRelations } from "./queries/topTradeInfo.js";

/**
 * Unwrap array types to get the element type
 */
type UnwrapArray<T> = T extends (infer U)[] ? U : T;

/**
 * Explicit lookup table mapping Fields types to their QueryParams types
 * This uses the __typename discriminator for reliable type resolution
*/
export interface FieldsToQueryParamsMap {
    Alliance: AllianceQueryParams;
    Nation: NationQueryParams;
    ApiKeyDetails: ApiKeyDetailsQueryParams;
    Trade: TradeQueryParams;
    Tradeprice: TradePricesQueryParams;
    Treaty: TreatyQueryParams;
    War: WarQueryParams;
    WarAttack: WarAttackQueryParams;
    Bounty: BountyQueryParams;
    BannedNation: BannedNationsQueryParams;
    City: CityQueryParams;
    Bankrec: BankRecordsQueryParams;
    Bulletin: BulletinQueryParams;
    BulletinReply: BulletinRepliesQueryParams;
    Embargo: EmbargoQueryParams;
    TreasureTrade: TreasureTradesQueryParams;
    ActivityStat: ActivityStatsQueryParams;
    ResourceStat: ResourceStatsQueryParams;
    TopTradeResourceInfo: TopTradeInfoResourceQueryParams;
}

/**
 * Explicit lookup table mapping Fields types to their Relations types
*/
export interface FieldsToRelationsMap {
    Alliance: AllianceRelations;
    Nation: NationRelations;
    ApiKeyDetails: ApiKeyDetailsRelations;
    Trade: TradeRelations;
    Tradeprice: {};
    Treaty: TreatyRelations;
    War: WarRelations;
    WarAttack: WarAttackRelations;
    Bounty: BountyRelations;
    BannedNation: {};
    City: CityRelations;
    Bankrec: BankRelations;
    Bulletin: BulletinRelations;
    BulletinReply: BulletinReplyRelations;
    Embargo: EmbargoRelations;
    TreasureTrade: TreasureTradeRelations;
    ActivityStat: {};
    ResourceStat: {};
    TopTradeResourceInfo: TopTradeResourceInfoRelations;
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
