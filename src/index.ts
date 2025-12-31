import PnwKitApi from "./api/index.js";

/**
 * Main PnWKit client for interacting with the Politics & War API
 * @category Main
 * @example
 * ```typescript
 * const pnwkit = new PnWKit("your-api-key");
 * 
 * // Access the nations query builder directly
 * const nations = await pnwkit.nationsQuery
 *   .select('id', 'nation_name', 'score')
 *   .where({ min_score: 1000 })
 *   .first(10)
 *   .execute();
 * ```
*/
export default class PnWKit extends PnwKitApi
{

    /**
     * Main PnWKit client for interacting with the Politics & War API
     * @category Main
     * @example
     * ```typescript
     * const pnwkit = new PnWKit("your-api-key");
     * 
     * // Access the nations query builder directly
     * const nations = await pnwkit.nationsQuery
     *   .select('id', 'nation_name', 'score')
     *   .where({ min_score: 1000 })
     *   .first(10)
     *   .execute();
     * ```
    */
    constructor(apiKey: string) {
        super(apiKey);
    }
}

export { NationsQuery } from "./api/queries/nations.js";

// Export types for documentation and user convenience
export type { NationFields, NationQueryParams, NationRelations } from "./types/queries/nation.js";
export type { SelectFields, paginatorInfo } from "./types/others.js";