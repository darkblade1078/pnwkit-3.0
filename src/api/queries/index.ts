import type PnwKitApi from "../index.js";
import { NationsQuery } from "./nations.js";
import { AlliancesQuery } from "./alliances.js";
import { ApiKeyDetailsQuery } from "./apiKeyDetails.js";
import { TreasuresQuery } from "./treasures.js";
import { ColorsQuery } from "./colors.js";
import { GameInfoQuery } from "./gameInfo.js";
import { TopTradeInfoQuery } from "./topTradeInfo.js";
import { NationResourceStatsQuery } from "./nationResourceStats.js";

export class Queries {
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
}