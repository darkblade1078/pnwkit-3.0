// src/api/queries/index.ts
import { NationsQuery } from "./nations.js";
import { AlliancesQuery } from "./alliances.js";
import { ApiKeyDetailsQuery } from "./apiKeyDetails.js";
import type PnwKitApi from "../index.js";

export class Queries {
    constructor(private readonly api: PnwKitApi) {}

    /**
     * Create a new nations query builder
     * @returns A fresh NationsQuery instance
     */
    nations(): NationsQuery<[], []> {
        return new NationsQuery(this.api);
    }

    /**
     * Create a new alliances query builder
     * @returns A fresh AlliancesQuery instance
     */
    alliances(): AlliancesQuery<[], []> {
        return new AlliancesQuery(this.api);
    }

    /**
     * Create a new API key details query builder
     * @returns A fresh ApiKeyDetailsQuery instance
     */
    apiKeyDetails(): ApiKeyDetailsQuery<[], []> {
        return new ApiKeyDetailsQuery(this.api);
    }
}