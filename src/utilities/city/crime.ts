import { ImprovementLimitPerCity, ImprovementModifiers } from "../../types/utilities/improvements";

/**
 * Calculates the crime percentage for a city using the following formula:
 *
 * Crime (%) = ((103 - commerce)^2 + (infrastructure * 100)) / 111111 - policeModifier
 *
 * @param commerce - The commerce value of the city
 * @param infrastructure - The infrastructure value of the city
 * @param policeModifier - The police modifier value
 * @returns The calculated crime rate
 * @throws Error if any input value is negative
 * @example
 * ```typescript
 * const crime = crimeRate(80, 50, 5);
 * console.log(crime); // Crime rate for a city with commerce 80, infrastructure 50, and police modifier 5
 * ```
 */
export function crimeRate(
    commerce: number,
    infrastructure: number,
    policeModifier: number
): number 
{

    if(commerce < 0 || infrastructure < 0 || policeModifier < 0)
        throw new Error('Invalid input: Negative values are not allowed');


        const result = (((103 - commerce) ** 2 + (infrastructure * 100)) / 111111) - policeModifier;

        return result < 0.1 ? 0.00 : result;
}

/**
 * Calculates the police modifier for crime rate reduction.
 * Each police station reduces crime rate by 2.5, or 3.5 if a Specialized Police Training Program is present.
 *
 * @param policeStations - Number of police stations in the city
 * @param specializedPoliceTrainingProgram - Whether a Specialized Police Training Program is present (default: false)
 * @returns The police modifier value
 * @throws Error if the number of police stations is negative
 * @example
 * ```typescript
 * const modifier = policeModifier(3, true);
 * console.log(modifier); // Police modifier for 3 police stations with a Specialized Police Training Program
 * ```
 */
export function policeModifier(policeStations: number, specializedPoliceTrainingProgram: boolean = false): number
{
    if(policeStations < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    if(policeStations > ImprovementLimitPerCity.POLICE_STATION)
        throw new Error('Invalid input: Number of police stations exceeds the limit');

    return policeStations * (specializedPoliceTrainingProgram ? ImprovementModifiers.policeStation.withProject : ImprovementModifiers.policeStation.normal);
}

/**
 * Calculates the number of crime-related deaths in a city.
 *
 * @param crimeRate - The calculated crime rate
 * @param infrastructure - The infrastructure value of the city
 * @returns The number of crime-related deaths
 * @throws Error if any input value is negative
 * @example
 * ```typescript
 * const deaths = crimeDeaths(5, 50);
 * console.log(deaths); // Crime-related deaths for a city with crime rate 5 and infrastructure 50
 * ```
 */
export function crimeDeaths(crimeRate: number, infrastructure: number): number
{
    if(crimeRate < 0 || infrastructure < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return Math.max(((crimeRate / 10) * (infrastructure * 100) - 25), 0);
}