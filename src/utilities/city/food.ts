import type { Season } from "../../types/utilities/nation";
import { buildingBonus } from "../other";

/**
 * Calculates the food production for a city based on farms, land, radiation index, irrigation, and season.
 *
 * @param farms - Number of farms in the city
 * @param land - Amount of land in the city
 * @param radiationModifier - Radiation index modifier
 * @param massIrrigation - Whether mass irrigation is enabled (default: false)
 * @param season - The current season ('spring', 'summer', 'fall', 'winter')
 * @returns The calculated food production value
 * @throws Error if any input value is negative
 * @example
 * ```typescript
 * const food = foodProduction(10, 5000, 0.05, true, 'summer');
 * console.log(food); // Food production for a city with 10 farms, 5000 land, radiation modifier 0.05, mass irrigation enabled, and summer season
 * ```
 */
export function foodProduction(
    farms: number,
    land: number,
    radiationModifier: number,
    massIrrigation: boolean = false,
    season: Season,
    isInAntarctica: boolean = false
): number 
{

    if(farms < 0 || land < 0 || radiationModifier < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    const seasonModifier =
        season === 'spring' || season === 'fall' ? 1 :
        season === 'summer' ? 1.2 :
        0.8;


    let production = land / (massIrrigation ? 400 : 500) * farms * buildingBonus(farms, 20) * seasonModifier * (1 - radiationModifier);


    if(isInAntarctica)
        production *= 0.5;

    return Math.max(production, 0);
}

/**
 * Calculates the radiation index modifier for a city based on continent and global radiation values.
 *
 * @param continentRadiation - Radiation value for the continent
 * @param globalRadiation - Global radiation value
 * @returns The calculated radiation index modifier
 * @throws Error if any input value is negative
 * @example
 * ```typescript
 * const modifier = radiationModifier(50, 100);
 * console.log(modifier); // Radiation index modifier for a continent radiation of 50 and global radiation of 100
 * ```
 */
export function radiationModifier(
    continentRadiation: number,
    globalRadiation: number,
    falloutShelter: boolean = false
): number 
{
    const raw = ((continentRadiation + globalRadiation) / 1000) * (falloutShelter ? 0.85 : 1);
    return Math.floor(raw * 10000) / 10000;
}