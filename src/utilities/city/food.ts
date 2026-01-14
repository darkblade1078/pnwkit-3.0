import type { Season } from "../../types/utilities/cities.js";
import { buildingBonus } from "../other.js";

/**
 * Calculates the food production for a city based on farms, land, radiation index, irrigation, and season.
 *
 * @param farms - Number of farms in the city
 * @param land - Amount of land in the city
 * @param radiationModifier - Radiation index modifier
 * @param massIrrigation - Whether mass irrigation is enabled (default: false)
 * @param season - The current season ('spring', 'summer', 'fall', 'winter')
 * @returns The calculated food production value
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