import { randBetween } from "../other";

/**
 * Simulates the infrastructure destroyed by a missile strike on a city.
 *
 * Infra Destroyed = min(
 *   randBetween(300, max(350, populationDensity * 3)),
 *   (cityInfrastructure * 0.3) + 100,   // city infra limit
 *   cityInfrastructure                  // can't destroy more than the city has
 * )
 *
 * @param cityInfrastructure - The city's current infrastructure
 * @param populationDensity - The city's population density
 * @returns The amount of infrastructure destroyed
 * @throws Error if any input value is negative
 * @example
 * ```typescript
 * const destroyed = missileDamage(2000, 500);
 * console.log(destroyed); // Infrastructure destroyed by a missile
 * ```
 */
export function missileDamage(cityInfrastructure: number, populationDensity: number): number
{
    if(cityInfrastructure < 0 || populationDensity < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    const infraLimit = (cityInfrastructure * 0.3) + 100;
    const roll = randBetween(300, Math.max(350, populationDensity * 3));

    return Math.min(roll, infraLimit, cityInfrastructure);
}

/**
 * Simulates the infrastructure destroyed by a nuclear strike on a city.
 *
 * Infra Destroyed = min(
 *   randBetween(1700, max(2000, populationDensity * 13.5)),
 *   (cityInfrastructure * 0.8) + 150,   // city infra limit
 *   cityInfrastructure                  // can't destroy more than the city has
 * )
 *
 * @param cityInfrastructure - The city's current infrastructure
 * @param populationDensity - The city's population density
 * @returns The amount of infrastructure destroyed
 * @throws Error if any input value is negative
 * @example
 * ```typescript
 * const destroyed = nukeDamage(2000, 500);
 * console.log(destroyed); // Infrastructure destroyed by a nuclear strike
 * ```
 */
export function nukeDamage(cityInfrastructure: number, populationDensity: number): number
{
    if(cityInfrastructure < 0 || populationDensity < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    const infraLimit = (cityInfrastructure * 0.8) + 150;
    const roll = randBetween(1700, Math.max(2000, populationDensity * 13.5));

    return Math.min(roll, infraLimit, cityInfrastructure);
}
