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

/**
 * Calculates the actual (displayed) population for a city.
 *
 * Population = (Base Population - Disease Deaths - Crime Deaths) * Age Bonus
 *
 * @param basePopulation - The base population (infrastructure * 100)
 * @param diseaseDeaths - Population lost to disease (see diseaseDeaths)
 * @param crimeDeaths - Population lost to crime (see crimeDeaths)
 * @param ageBonus - The city age bonus modifier (see ageBonus)
 * @returns The actual population, floored at zero
 * @throws Error if any input value is negative
 * @example
 * ```typescript
 * const basePop = basePopulation(50); // 5000
 * const ageBonusValue = ageBonus(20); // Age bonus for a 20-turn-old city
 * const diseaseDeaths = 120;
 * const crimeDeaths = 80;
 * const pop = population(basePop, diseaseDeaths, crimeDeaths, ageBonusValue);
 * console.log(pop); // Actual population after deaths and age bonus
 * ```
 */
export function population(
    basePopulation: number,
    diseaseDeaths: number,
    crimeDeaths: number,
    ageBonus: number
): number
{
    if(basePopulation < 0 || diseaseDeaths < 0 || crimeDeaths < 0 || ageBonus < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return Math.max((basePopulation - diseaseDeaths - crimeDeaths) * ageBonus, 0);
}