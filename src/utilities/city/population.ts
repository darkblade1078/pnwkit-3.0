/**
 * Calculates the base population for a city based on its infrastructure value.
 *
 * @param infrastructure - The infrastructure value of the city (must be non-negative)
 * @returns The base population (100 per infrastructure point)
 * @throws Error if infrastructure is negative
 */
export function basePopulation(infrastructure: number): number
{

    if(infrastructure < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return 100 * infrastructure;
}

/**
 * Calculates the population density for a city.
 *
 * @param population - The total population of the city (must be non-negative)
 * @param land - The land area of the city (must be greater than zero)
 * @returns The population density (population divided by land)
 * @throws Error if land is zero or negative, or population is negative
 */
export function populationDensity(population: number, land: number): number
{
    if(land <= 0)
        throw new Error('Invalid input: Land must be greater than zero');

    if(population < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return population / land;
}

/**
 * Calculates the age bonus modifier for a city based on its age.
 *
 * @param cityAge - The age of the city in turns (must be non-negative)
 * @returns The age bonus modifier
 * @throws Error if cityAge is negative
 */
export function ageBonus(cityAge: number): number
{
    if(cityAge < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return 1 + Math.log(cityAge) / 15;
}