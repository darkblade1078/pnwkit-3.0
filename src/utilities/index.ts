import { ConvertBitsToProject } from "./nation/projectBits";
import cityCost from "./city/cityCost";
import infraCost from "./city/infraCost";
import landCost from "./city/landCost";
import { basePopulation, populationDensity, ageBonus } from "./city/population";
import commerce from "./city/commerce";
import { buildingBonus } from "./other";
import { foodProduction, radiationModifier } from "./city/food";

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
 * const utils = new Utilities();
 * 
 * // Check if nation has a specific project
 * const hasProject = utils.convertBitsToProject(projectBits, projectNumber);
 * 
 * // Calculate cost for next city
 * const cost = utils.cityCost(cityCount, top20Average);
 * ```
 */
export default class Utilities 
{
    // Convert project bits to boolean indicating if nation has specific project
    convertBitsToProject = ConvertBitsToProject;
    
    // Calculate the cost of purchasing a city based on current city count
    cityCost = cityCost;

    // Land and infrastructure cost utilities
    infraCost = infraCost;
    landCost = landCost;
    
    // Population related utilities
    basePopulation = basePopulation;
    populationDensity = populationDensity;
    ageBonus = ageBonus;

    // commerce utilites
    commerce = commerce;

    // production utilities
    foodProduction = foodProduction;

    // other
    buildingBonus = buildingBonus;
    radiationModifier = radiationModifier;
}