/**
 * Calculates the disease rate for a city using the following formula:
 *
 * Disease Rate = ((((populationDensity^2) * 0.01) - 25) / 100)
 *                + (basePopulation / 100000)
 *                + pollutionModifier
 *                - hospitalModifier
 *
 * @param populationDensity - The population density of the city
 * @param basePopulation - The base population of the city
 * @param pollutionModifier - The pollution modifier value
 * @param hospitalModifier - The hospital modifier value
 * @returns The calculated disease rate
 */
export function diseaseRate(
    populationDensity: number,
    basePopulation: number,
    pollutionModifier: number,
    hospitalModifier: number
): number 
{
    if(populationDensity < 0 || basePopulation < 0 || pollutionModifier < 0 || hospitalModifier < 0)
        throw new Error('Invalid input: Negative values are not allowed');
     
    const result = ((((populationDensity ** 2) * 0.01) - 25) / 100)
        + (basePopulation / 100000)
        + pollutionModifier
        - hospitalModifier;

    return result < 0.1 ? 0.00 : result;
}

/**
 * Calculates the hospital modifier for disease rate reduction.
 * Each hospital reduces disease rate by 2.5, or 3.5 if a Clinical Research Center is present.
 *
 * @param hospitals - Number of hospitals in the city
 * @param clinicalResearchCenter - Whether a Clinical Research Center is present (default: false)
 * @returns The hospital modifier value
 */
export function hospitalModifier(hospitals: number, clinicalResearchCenter: boolean = false): number 
{
    if(hospitals < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return hospitals * (clinicalResearchCenter ? 3.5 : 2.5);
}

/**
 * Calculates the pollution modifier for disease rate.
 *
 * @param pollutionLIndex - The pollution index value
 * @returns The pollution modifier value
 */
export function pollutionModifier(pollutionLIndex: number): number
{
    if(pollutionLIndex < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return pollutionLIndex * 0.05;
}

/**
 * Calculates the number of disease deaths in a city.
 *
 * @param diseaseRate - The calculated disease rate
 * @param basePopulation - The base population of the city
 * @returns The number of disease deaths
 */
export function diseaseDeaths(diseaseRate: number, basePopulation: number): number
{
    if(diseaseRate < 0 || basePopulation < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return diseaseRate * basePopulation;
}