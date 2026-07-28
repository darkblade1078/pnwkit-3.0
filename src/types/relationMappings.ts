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
import type { TopTradeInfoResourceQueryParams, TopTradeResourceInfoRelations } from "./queries/topTradeInfo";

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
