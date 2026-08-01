import { ImprovementLimitPerCity, ImprovementModifiers } from "../../types/utilities/improvements";

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
 * @throws Error if any input value is negative
 * @example
 * ```typescript
 * const disease = diseaseRate(1000, 50000, 5, 3);
 * console.log(disease); // Disease rate for a city with population density 1000, base population 50000, pollution modifier 5, and hospital modifier 3
 * ```
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
 * @throws Error if the number of hospitals is negative
 * @example
 * ```typescript
 * const modifier = hospitalModifier(4, true);
 * console.log(modifier); // Hospital modifier for 4 hospitals with a Clinical Research Center
 * ```
 */
export function hospitalModifier(hospitals: number, clinicalResearchCenter: boolean = false): number 
{
    if(hospitals < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    if(hospitals > ImprovementLimitPerCity.HOSPITAL)
        throw new Error('Invalid input: Number of hospitals exceeds the limit');

    return hospitals * (clinicalResearchCenter ? ImprovementModifiers.hospital.withProject : ImprovementModifiers.hospital.normal);
}

/**
 * Calculates the pollution modifier for disease rate.
 *
 * @param pollutionLIndex - The pollution index value
 * @returns The pollution modifier value
 * @throws Error if the pollution index is negative
 * @example
 * ```typescript
 * const modifier = pollutionModifier(10);
 * console.log(modifier); // Pollution modifier for a pollution index of 10
 * ```
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
 * @throws Error if any input value is negative
 * @example
 * ```typescript
 * const deaths = diseaseDeaths(0.05, 50000);
 * console.log(deaths); // Disease-related deaths for a city with disease rate 0.05 and base population 50000
 * ```
 */
export function diseaseDeaths(diseaseRate: number, basePopulation: number): number
{
    if(diseaseRate < 0 || basePopulation < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    // diseaseRate is a percent, so divide by 100 to get the fraction of the
    // base population lost (equivalently, diseaseRate * infrastructure).
    return (diseaseRate / 100) * basePopulation;
}