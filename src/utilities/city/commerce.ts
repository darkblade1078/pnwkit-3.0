/**
 * Calculates the commerce value for a city based on the number of various buildings and special infrastructure.
 *
 * Building limits:
 * - superMarkets: max 4
 * - banks: max 6
 * - shoppingMalls: max 5
 * - stadiums: max 3
 * - subway: max 1
 *
 * Special infrastructure:
 * - internationalTradeCenter: increases max commerce to 115 and adds 1 to commerce
 * - telecommunicationsSatellite: increases max commerce to 125 and adds 3 to commerce
 *
 * Commerce calculation:
 *   (superMarkets * 15) + (banks * 20) + (shoppingMalls * 25) + (stadiums * 10) + (subway * 15)
 *   + bonus from special infrastructure
 *   Final value is capped at maxCommerce.
 *
 * @param superMarkets - Number of supermarkets (max 4)
 * @param banks - Number of banks (max 6)
 * @param shoppingMalls - Number of shopping malls (max 5)
 * @param stadiums - Number of stadiums (max 3)
 * @param subway - Number of subways (max 1)
 * @param internationalTradeCenter - Whether the city has an International Trade Center (default: false)
 * @param telecommunicationsSatellite - Whether the city has a Telecommunications Satellite (default: false)
 * @returns The calculated commerce value for the city
 * @throws Error if any building value exceeds its limit
 */
export default function commerce(
    superMarkets: number,
    banks: number,
    shoppingMalls: number,
    stadiums: number,
    subway: number,
    internationalTradeCenter: boolean = false,
    telecommunicationsSatellite: boolean = false
): number
{

    if 
    (
        superMarkets < 0 ||
        banks < 0 ||
        shoppingMalls < 0 ||
        stadiums < 0 ||
        subway < 0
    )
        throw new Error('Invalid input: Negative values are not allowed');

    if 
    (
        superMarkets > 4 ||
        banks > 6 ||
        shoppingMalls > 5 ||
        stadiums > 3 ||
        subway > 1
    )
        throw new Error('Invalid input: One or more values exceed their limits');
        
    const maxCommerce = internationalTradeCenter ? (telecommunicationsSatellite ? 125 : 115) : 100;

    let commerce = 
        (superMarkets * 15) +
        (banks * 20) +
        (shoppingMalls * 25) +
        (stadiums * 10) +
        (subway * 15);

    commerce += internationalTradeCenter ? (telecommunicationsSatellite ? 3 : 1) : 0;

    return Math.min(maxCommerce, commerce);
}