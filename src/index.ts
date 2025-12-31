import PnwKitApi from "./api/index.js";

/**
 * Main PnWKit client for interacting with the Politics & War API
 * @category Main
 * @example
 * ```typescript
 * const pnwkit = new PnWKit("your-api-key");
 * const nations = await pnwkit.nationsQuery()
 *   .select('id', 'nation_name', 'score')
 *   .first(10)
 *   .execute();
 * ```
*/
export default class PnWKit extends PnwKitApi
{
    /**
     * Create a new PnWKit instance
     * @param apiKey - Your Politics & War API key
     * @param botKey - Optional bot key for additional permissions
    */
    constructor(apiKey: string, botKey?: string)
    {
        super(apiKey, botKey);
    }
}