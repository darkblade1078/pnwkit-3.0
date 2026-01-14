/**
 * Calculates the building bonus multiplier for food production or other city stats.
 *
 * @param currentbuildings - The number of relevant buildings currently present in the city.
 * @param maxbuildings - The maximum number of buildings possible for the city.
 * @returns The building bonus multiplier (between 1 and 1.5).
 *
 * Formula:
 *   bonus = 1 + (0.5 / (maxbuildings - 1)) * (currentbuildings - 1)
 * This scales the bonus linearly from 1 (at 1 building) up to 1.5 (at max buildings).
 */
export function buildingBonus(currentbuildings: number, maxbuildings: number): number
{
    return 1 + (0.5 / (maxbuildings - 1)) * (currentbuildings - 1);
}