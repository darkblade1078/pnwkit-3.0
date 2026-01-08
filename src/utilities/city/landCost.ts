
/**
 * Calculates the total land cost between two amounts, applying discounts for various projects.
 * @param startingAmount Starting land amount
 * @param endingAmount Ending land amount
 * @param arableLandAgency If true, applies 5% or 10% discount with advancedEngineeringCorps
 * @param advancedEngineeringCorps If true, applies additional discount with arableLandAgency
 * @param rapidExpansion If true, applies discount based on governmentSupportAgency or bureauOfDomesticAffairs
 * @param governmentSupportAgency If true, increases rapidExpansion discount
 * @param bureauOfDomesticAffairs If true, increases rapidExpansion discount further
 * @returns Total land cost after discounts
 * @example
 * // Basic usage
 * const cost = landCost(20, 500);
 * // With all discounts
 * const discounted = landCost(20, 500, true, true, true, true, true);
 */
export function landCost(
    startingAmount: number, 
    endingAmount: number,
    arableLandAgency: boolean = false,
    advancedEngineeringCorps: boolean = false,
    rapidExpansion: boolean = false,
    governmentSupportAgency: boolean = false,
    bureauOfDomesticAffairs: boolean = false,
): number 
{
    let infraPrice = landCostFormula(startingAmount, endingAmount);
    let discount = 0;

    // Calculate discount percentage
    discount += (arableLandAgency && advancedEngineeringCorps) ? 10 : (arableLandAgency ? 5 : 0);
    discount += rapidExpansion ? (bureauOfDomesticAffairs ? 8.75 : (governmentSupportAgency ? 7.5 : 5)) : 0;

    // Apply discount to total price
    return Math.round(infraPrice * (1 - (discount / 100)) * 100) / 100;
}


/**
 * Calculates the total land cost between two amounts, chunked for efficiency.
 * @param startingAmount Starting land amount
 * @param endingAmount Ending land amount
 * @returns Total cost for the land increase
 * @example
 * const cost = landCostFormula(20, 500);
 */
function landCostFormula(startingAmount: number, endingAmount: number): number 
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
        const landPriceValue = 150;
        return landPriceValue * difference;
    }

    // Break into chunks of 500, and get the price
    if (difference > 100 && difference % 100 === 0) 
    {
        const costOfChunk = Math.round(landPrice(startingAmount) * 100) / 100 * 500;
        // Recursively get value of next chunk
        return costOfChunk + (landCostFormula(startingAmount + 500, endingAmount) as number);
    }

    // See if the amount left is not divisible by 500 but greater than 500
    if (difference > 500 && difference % 500 !== 0) 
    {
        const chunk = difference % 500;
        const costOfChunk = Math.round(landPrice(startingAmount) * 100) / 100 * chunk;
        // Recursively get value of next chunk
        return costOfChunk + (landCostFormula(startingAmount + chunk, endingAmount) as number);
    }

    // If there's less or equal to 500 left, just add that. No need for recursion
    if (difference <= 500) 
    {
        const costOfChunk = Math.round(landPrice(startingAmount) * 100) / 100 * difference;
        return costOfChunk;
    }

    throw new Error('An unexpected error occurred while calculating infrastructure cost.');
}

/**
 * Calculates the price per unit of land for a given amount.
 * @param amount Land amount
 * @returns Price for the given land amount
 * @example
 * const price = landPrice(100);
 */
function landPrice(amount: number): number {
    return 0.002 * Math.pow(amount - 20, 2) + 50;
}