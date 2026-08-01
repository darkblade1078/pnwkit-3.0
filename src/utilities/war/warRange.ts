/**
 * Calculates the war declaration range for a nation — the span of nation scores
 * it can declare war on (75% to 250% of its own score).
 *
 * @param score - The nation's score
 * @returns The minimum and maximum declarable enemy score
 * @example
 * ```typescript
 * const range = warRange(1000);
 * console.log(range); // { min: 750, max: 2500 }
 * ```
 */
export function warRange(score: number): { min: number; max: number }
{
    return {
        min: score * 0.75,
        max: score * 2.50
    }
}

/**
 * Calculates the inverse war range — given a nation's score, the span of attacker
 * scores that can declare war on it (the inverse of {@link warRange}).
 *
 * @param score - The nation's score
 * @returns The minimum and maximum attacker score that has this nation in range
 * @example
 * ```typescript
 * const range = inverseWarRange(1000);
 * console.log(range); // { min: 1333.33, max: 400 }
 * ```
 */
export function inverseWarRange(score: number): { min: number; max: number }
{
    return {
        min: score / 0.75,
        max: score / 2.50
    }
}
