import type PnwKitApi from "../index";
import { NationsQuery } from "./nations";
import { AlliancesQuery } from "./alliances";
import { ApiKeyDetailsQuery } from "./apiKeyDetails";
import { TreasuresQuery } from "./treasures";
import { ColorsQuery } from "./colors";
import { GameInfoQuery } from "./gameInfo";
import { TopTradeInfoQuery } from "./topTradeInfo";
import { NationResourceStatsQuery } from "./nationResourceStats";
import { TradesQuery } from "./trades";
import { TradePricesQuery } from "./tradePrices";
import { TreatiesQuery } from "./treaties";
import { WarsQuery } from "./wars";
import { WarAttacksQuery } from "./warAttacks";
import { BountiesQuery } from "./bounties";
import { BannedNationsQuery } from "./bannedNations";
import { CitiesQuery } from "./cities";
import { BankrecsQuery } from "./bankrecs";
import { BulletinsQuery } from "./bulletins";
import { BulletinRepliesQuery } from "./bulletinReplies";
import { EmbargoesQuery } from "./embargoes";
import { TreasureTradesQuery } from "./treasureTrades";
import { ActivityStatsQuery } from "./activityStats";
import { ResourceStatsQuery } from "./resourceStats";
import { BaseballGamesQuery } from "./baseballGames";
import { BaseballTeamsQuery } from "./baseballTeams";
import { BaseballPlayersQuery } from "./baseballPlayers";

// Re-export every query builder so they are documented as part of the public API
// and importable by consumers.
export {
    NationsQuery, AlliancesQuery, ApiKeyDetailsQuery, TreasuresQuery, ColorsQuery,
    GameInfoQuery, TopTradeInfoQuery, NationResourceStatsQuery, TradesQuery, TradePricesQuery,
    TreatiesQuery, WarsQuery, WarAttacksQuery, BountiesQuery, BannedNationsQuery,
    CitiesQuery, BankrecsQuery, BulletinsQuery, BulletinRepliesQuery, EmbargoesQuery,
    TreasureTradesQuery, ActivityStatsQuery, ResourceStatsQuery,
    BaseballGamesQuery, BaseballTeamsQuery, BaseballPlayersQuery,
};

/**
 * Container class for all Politics & War GraphQL query builders.
 * 
 * Provides factory methods to create fresh instances of query builders
 * for each available GraphQL query endpoint. Each method returns a new
 * builder instance with full type safety and fluent API support.
 * 
 * @example
 * ```typescript
 * const queries = new Queries(api);
 * 
 * // Get nations data
 * const nations = await queries.nations()
 *   .select('id', 'nation_name')
 *   .where({ first: 10 })
 *   .execute();
 * 
 * // Get alliance data with nested relations
 * const alliances = await queries.alliances()
 *   .select('id', 'name')
 *   .include('nations', builder => builder.select('id', 'nation_name'))
 *   .execute();
 * ```
 */
export default class Queries 
{
    constructor(private readonly api: PnwKitApi) {}

    /**
     * Create a new alliances query builder
     * @returns A fresh AlliancesQuery instance
    */
    alliances(): AlliancesQuery<[], []> 
    {
        return new AlliancesQuery(this.api);
    }

    /**
     * Create a new API key details query builder
     * @returns A fresh ApiKeyDetailsQuery instance
    */
    apiKeyDetails(): ApiKeyDetailsQuery<[], []> 
    {
        return new ApiKeyDetailsQuery(this.api);
    }

    /**
     * Create a new colors query builder
     * @returns A fresh ColorsQuery instance
    */
    colors(): ColorsQuery<[], []> 
    {
        return new ColorsQuery(this.api);
    }

    /** 
     * Create a new treasures query builder
     * @returns A fresh TreasuresQuery instance
    */
    treasures(): TreasuresQuery<[], []> 
    {
        return new TreasuresQuery(this.api);
    }

    /**
     * Create a new game info query builder
     * @returns A fresh GameInfoQuery instance
    */
    gameInfo(): GameInfoQuery<[], []> 
    {
        return new GameInfoQuery(this.api);
    }

    /**
     * Create a new nations query builder
     * @returns A fresh NationsQuery instance
    */
    nations(): NationsQuery<[], []> 
    {
        return new NationsQuery(this.api);
    }

    /**
     * Create a new nation resource stats query builder
     * @returns A fresh NationResourceStatsQuery instance
    */
    nationResourceStats(): NationResourceStatsQuery<[], {}> 
    {
        return new NationResourceStatsQuery(this.api);
    }

    /**
     * Create a new top trade info query builder
     * @returns A fresh TopTradeInfoQuery instance
    */
    topTradeInfo(): TopTradeInfoQuery<[], {}> 
    {
        return new TopTradeInfoQuery(this.api);
    }

    /**
     * Create a new trades query builder
     * @returns A fresh TradesQuery instance
    */
    trades(): TradesQuery<[], []> 
    {
        return new TradesQuery(this.api);
    }

    /**
     * Create a new trade prices query builder
     * @returns A fresh TradePricesQuery instance
    */
    tradePrices(): TradePricesQuery<[]> 
    {
        return new TradePricesQuery(this.api);
    }

    /**
     * Create a new treaties query builder
     * @returns A fresh TreatiesQuery instance
    */
    treaties(): TreatiesQuery<[], []> 
    {
        return new TreatiesQuery(this.api);
    }

    /**
     * Create a new wars query builder
     * @returns A fresh WarsQuery instance
    */
    wars(): WarsQuery<[], []> 
    {
        return new WarsQuery(this.api);
    }

    /**
     * Create a new war attacks query builder
     * @returns A fresh WarAttacksQuery instance
    */
    warAttacks(): WarAttacksQuery<[], []> 
    {
        return new WarAttacksQuery(this.api);
    }

    /**
     * Create a new bounties query builder
     * @returns A fresh BountiesQuery instance
    */
    bounties(): BountiesQuery<[], []> 
    {
        return new BountiesQuery(this.api);
    }

    /**
     * Create a new banned nations query builder
     * @returns A fresh BannedNationsQuery instance
    */
    bannedNations(): BannedNationsQuery<[]> 
    {
        return new BannedNationsQuery(this.api);
    }

    /**
     * Create a new cities query builder
     * @returns A fresh CitiesQuery instance
    */
    cities(): CitiesQuery<[], []> 
    {
        return new CitiesQuery(this.api);
    }

    /**
     * Create a new bankrecs query builder
     * @returns A fresh BankrecsQuery instance
    */
    bankrecs(): BankrecsQuery<[], []> 
    {
        return new BankrecsQuery(this.api);
    }

    /**
     * Create a new bulletins query builder
     * @returns A fresh BulletinsQuery instance
    */
    bulletins(): BulletinsQuery<[], []> 
    {
        return new BulletinsQuery(this.api);
    }

    /**
     * Create a new bulletin replies query builder
     * @returns A fresh BulletinRepliesQuery instance
    */
    bulletinReplies(): BulletinRepliesQuery<[], []> 
    {
        return new BulletinRepliesQuery(this.api);
    }

    /**
     * Create a new embargoes query builder
     * @returns A fresh EmbargoesQuery instance
    */
    embargoes(): EmbargoesQuery<[], []> 
    {
        return new EmbargoesQuery(this.api);
    }

    /**
     * Create a new treasure trades query builder
     * @returns A fresh TreasureTradesQuery instance
    */
    treasureTrades(): TreasureTradesQuery<[], []> 
    {
        return new TreasureTradesQuery(this.api);
    }

    /**
     * Create a new activity stats query builder
     * @returns A fresh ActivityStatsQuery instance
    */
    activityStats(): ActivityStatsQuery<[]> 
    {
        return new ActivityStatsQuery(this.api);
    }

    /**
     * Create a new resource stats query builder
     * @returns A fresh ResourceStatsQuery instance
    */
    resourceStats(): ResourceStatsQuery<[]>
    {
        return new ResourceStatsQuery(this.api);
    }

    /**
     * Create a new baseball games query builder
     * @returns A fresh BaseballGamesQuery instance
    */
    baseballGames(): BaseballGamesQuery<[], []>
    {
        return new BaseballGamesQuery(this.api);
    }

    /**
     * Create a new baseball teams query builder
     * @returns A fresh BaseballTeamsQuery instance
    */
    baseballTeams(): BaseballTeamsQuery<[], []>
    {
        return new BaseballTeamsQuery(this.api);
    }

    /**
     * Create a new baseball players query builder
     * @returns A fresh BaseballPlayersQuery instance
    */
    baseballPlayers(): BaseballPlayersQuery<[], []>
    {
        return new BaseballPlayersQuery(this.api);
    }
}