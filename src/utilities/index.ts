import { ConvertBitsToProject } from "./nation/projectBits.js";
import { cityCost } from "./city/cityCost.js";

/**
 * Collection of utility functions for Politics & War calculations and data transformations.
 * 
 * Provides helper functions for:
 * - Converting project bits to boolean values
 * - Calculating city costs based on city count
 * - Other game-related calculations
 * 
 * @example
 * ```typescript
 * const utils = new utilities();
 * 
 * // Check if nation has a specific project
 * const hasProject = utils.convertBitsToProject(projectBits, projectNumber);
 * 
 * // Calculate cost for next city
 * const cost = utils.cityCost(cityCount, top20Average);
 * ```
 */
export default class utilities 
{
    /** Convert project bits to boolean indicating if nation has specific project */
    convertBitsToProject = ConvertBitsToProject;
    
    /** Calculate the cost of purchasing a city based on current city count */
    cityCost = cityCost;
}