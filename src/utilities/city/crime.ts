/**
 * Calculates the crime percentage for a city using the following formula:
 *
 * Crime (%) = ((103 - commerce)^2 + (infrastructure * 100)) / 111111 - policeModifier
 *
 * @param commerce - The commerce value of the city
 * @param infrastructure - The infrastructure value of the city
 * @param policeModifier - The police modifier value
 * @returns The calculated crime rate
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
 */
export function policeModifier(policeStations: number, specializedPoliceTrainingProgram: boolean = false): number
{
    if(policeStations < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return policeStations * (specializedPoliceTrainingProgram ? 3.5 : 2.5);
}

/**
 * Calculates the number of crime-related deaths in a city.
 *
 * @param crimeRate - The calculated crime rate
 * @param infrastructure - The infrastructure value of the city
 * @returns The number of crime-related deaths
 */
export function crimeDeaths(crimeRate: number, infrastructure: number): number
{
    if(crimeRate < 0 || infrastructure < 0)
        throw new Error('Invalid input: Negative values are not allowed');

    return Math.max(((crimeRate / 10) * (infrastructure * 100) - 25), 0);
}