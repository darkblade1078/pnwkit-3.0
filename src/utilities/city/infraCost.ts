
/**
 * Calculates the total infrastructure cost between two amounts, applying discounts for various projects.
 *
 * @example
 * // Basic usage
 * const cost = infraCost(100, 200);
 * // With all discounts
 * const discounted = infraCost(100, 200, true, true, true, true, true);
 *
 * @param startingAmount Starting infrastructure amount
 * @param endingAmount Ending infrastructure amount
 * @param centerOfCivilEngineering If true, applies 5% or 10% discount with advancedEngineeringCorps
 * @param advancedEngineeringCorps If true, applies additional discount with centerOfCivilEngineering
 * @param urbanization If true, applies discount based on governmentSupportAgency or bureauOfDomesticAffairs
 * @param governmentSupportAgency If true, increases urbanization discount
 * @param bureauOfDomesticAffairs If true, increases urbanization discount further
 * @returns Total infrastructure cost after discounts
 */
export function infraCost(
    startingAmount: number, 
    endingAmount: number,
    centerOfCivilEngineering: boolean = false,
    advancedEngineeringCorps: boolean = false,
    urbanization: boolean = false,
    governmentSupportAgency: boolean = false,
    bureauOfDomesticAffairs: boolean = false,
): number 
{
    let infraPrice = infraCostFormula(startingAmount, endingAmount);
    let discount = 0;

    // Calculate discount percentage
    discount += (centerOfCivilEngineering && advancedEngineeringCorps) ? 10 : (centerOfCivilEngineering ? 5 : 0);
    discount += urbanization ? (bureauOfDomesticAffairs ? 8.75 : (governmentSupportAgency ? 7.5 : 5)) : 0;

    // Apply discount to total price
    return Math.round(infraPrice * (1 - (discount / 100)) * 100) / 100;
}


/**
 * Calculates the total infrastructure cost between two amounts, chunked for efficiency.
 *
 * @example
 * const cost = infraCostFormula(100, 200);
 *
 * @param startingAmount Starting infrastructure amount
 * @param endingAmount Ending infrastructure amount
 * @returns Total cost for the infrastructure increase
 */
function infraCostFormula(startingAmount: number, endingAmount: number): number 
{
    // Round values to nearest 2 decimals
    startingAmount = Math.round(startingAmount * 100) / 100;
    endingAmount = Math.round(endingAmount * 100) / 100;

    // Check difference between amounts
    const difference = endingAmount - startingAmount;

    // Cap out at 10,000 to prevent script running forever
    if (difference > 10000)
        throw new Error('Difference between startingAmount and endingAmount exceeds maximum limit of 10,000');

    // If values are the same, no need to continue
    if (difference === 0)
        return 0;

    // If starting amount is greater than ending amount
    if (difference < 0) 
    {
        const infraPriceValue = 150;
        return infraPriceValue * difference;
    }

    // Break into chunks of 100, and get the price
    if (difference > 100 && difference % 100 === 0) 
    {
        const costOfChunk = Math.round(infraPrice(startingAmount) * 100) / 100 * 100;
        // Recursively get value of next chunk
        return costOfChunk + (infraCostFormula(startingAmount + 100, endingAmount) as number);
    }

    // See if the amount left is not divisible by 100 but greater than 100
    if (difference > 100 && difference % 100 !== 0) 
    {
        const chunk = difference % 100;
        const costOfChunk = Math.round(infraPrice(startingAmount) * 100) / 100 * chunk;
        // Recursively get value of next chunk
        return costOfChunk + (infraCostFormula(startingAmount + chunk, endingAmount) as number);
    }

    // If there's less or equal to 100 left, just add that. No need for recursion
    if (difference <= 100) 
    {
        const costOfChunk = Math.round(infraPrice(startingAmount) * 100) / 100 * difference;
        return costOfChunk;
    }

    throw new Error('An unexpected error occurred while calculating infrastructure cost.');
}


/**
 * Calculates the price per unit of infrastructure for a given amount.
 *
 * @example
 * const price = infraPrice(100);
 *
 * @param amount Infrastructure amount
 * @returns Price for the given infrastructure amount
 */
function infraPrice(amount: number): number {
    if (amount < 10)
        return 300;
    else
        return Math.pow(Math.abs(amount - 10), 2.2) / 710 + 300;
}