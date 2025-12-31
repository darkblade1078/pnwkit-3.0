import NationsQuery from "./queries/nations.js";

/**
 * Base API class providing query builders for Politics & War data
 * @category API
*/
export default class PnwKitApi
{
    constructor(private readonly apiKey: string, private readonly botKey?: string) {}

    /**
     * Create a new nations query
     * @returns A NationsQuery builder instance
     * @example
     * ```typescript
     * const query = pnwkit.nationsQuery()
     *   .select('id', 'nation_name')
     *   .where({ min_score: 1000 })
     *   .first(50);
     * ```
    */
    nationsQuery() {
        return new NationsQuery(this.apiKey);
    }
}
