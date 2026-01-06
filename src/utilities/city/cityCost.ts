/**
 * Calculate the cost of a new city based on the new formula (effective late February 2025).
 * 
 * The city cost projects (MP, UP, AUP) were removed and replaced with a dynamic formula
 * that considers the top 20% average city count.
 * 
 * @param cityToBuy - The city number being purchased (e.g., if you have 10 cities, this is 11)
 * @param top20Average - The average city count of the top 20% of active nations (updated monthly)
 * @returns The cost in dollars for the next city
 * @throws Error if parameters are invalid (not finite, out of range, or produce unsafe results)
 * 
 * @example
 * ```typescript
 * const cost = cityCost(41, 43.2035);
 * console.log(cost); // Cost for city 41 with current top20Average
 * ```
 */
export function cityCost(cityToBuy: number, top20Average: number): number 
{
    // Validate inputs are finite numbers
    if (!Number.isFinite(cityToBuy) || !Number.isFinite(top20Average))
        throw new Error('Invalid input: parameters must be finite numbers');
    
    // Validate cityToBuy range (Politics & War limits)
    if (cityToBuy < 1 || cityToBuy > 150)
        throw new Error('Invalid cityToBuy: must be between 1 and 150');
    
    // Validate top20Average range
    if (top20Average < 1 || top20Average > 150)
        throw new Error('Invalid top20Average: must be between 1 and 150');
    
    // Adjust city number based on top 20% average
    const adjustedCity = cityToBuy - (top20Average / 4);
    
    // Calculate cost using polynomial and minimum cost formulas
    const polynomialCost = 
        (100000 * (adjustedCity ** 3)) +
        (150000 * adjustedCity) +
        75000;
    
    // Ensure minimum cost based on square of city number
    const minimumCost = (cityToBuy ** 2) * 100000;
    
    // Return the higher of the two costs
    const result = Math.max(polynomialCost, minimumCost);
    
    // Ensure result is a safe integer
    if (!Number.isSafeInteger(result))
        throw new Error('Calculation resulted in unsafe integer value');
    
    return Math.floor(result);
}
