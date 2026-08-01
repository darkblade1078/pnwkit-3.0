import type { SabotageType } from "../../types/utilities/war";

/**
 * Calculates the espionage range for a nation — the span of nation scores it can
 * run espionage operations against (40% to 250% of its own score).
 *
 * @param score - The nation's score
 * @returns The minimum and maximum targetable enemy score
 * @example
 * ```typescript
 * const range = espionageRange(1000);
 * console.log(range); // { min: 400, max: 2500 }
 * ```
 */
export function espionageRange(score: number): { min: number; max: number }
{
    return {
        min: score * 0.40,
        max: score * 2.50
    }
}

/**
 * Calculates the inverse espionage range — given a nation's score, the span of
 * attacker scores that can run espionage against it (the inverse of
 * {@link espionageRange}).
 *
 * @param score - The nation's score
 * @returns The minimum and maximum attacker score that has this nation in range
 * @example
 * ```typescript
 * const range = inverseEspionageRange(1000);
 * console.log(range); // { min: 2500, max: 400 }
 * ```
 */
export function inverseEspionageRange(score: number): { min: number; max: number }
{
    return {
        min: score / 0.40,
        max: score / 2.50
    }
}

/**
 * Estimates the success odds (%) of an espionage operation.
 *
 * Initial Odds = (safetyLevel * 25) + ((yourSpies * 100) / ((enemySpies * 3) + 1)),
 * then divided by the operation's {@link SabotageType} difficulty factor.
 *
 * @param safetyLevel - The attacker's espionage safety level (0-3)
 * @param yourSpies - The attacker's number of spies
 * @param enemySpies - The defender's number of spies
 * @param type - The espionage operation type (see {@link SabotageType})
 * @returns The estimated success odds
 * @example
 * ```typescript
 * const odds = espionageOdds(3, 50, 30, SabotageType.TANKS);
 * console.log(odds); // Estimated success odds for sabotaging tanks
 * ```
 */
export function espionageOdds(
    safetyLevel: number,
    yourSpies: number,
    enemySpies: number,
    type: SabotageType
): number
{
    const initialOdds = (safetyLevel * 25) + ((yourSpies * 100) / (((enemySpies * 3) + 1)));
    return initialOdds / type;
}
