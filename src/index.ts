import PnwKitApi from "./api/index.js";

/**
 * Main PnWKit client for interacting with the Politics & War API
 * @category Main
 * @example
 * ```typescript
 * const pnwkit = new PnWKit("your-api-key");
 * 
 * // Query nations with filters
 * const nations = await pnwkit.queries.nations()
 *   .select('id', 'nation_name', 'score')
 *   .where({ min_score: 1000, first: 10 })
 *   .execute();
 * 
 * // Query alliances
 * const alliances = await pnwkit.queries.alliances()
 *   .select('id', 'name')
 *   .where({ first: 5 })
 *   .execute();
 * ```
*/
export default class PnWKit extends PnwKitApi
{

    /**
     * Create a new PnWKit instance
     * @param apiKey - Your Politics & War API key
    */
    constructor(apiKey: string) {
        super(apiKey);
    }
}