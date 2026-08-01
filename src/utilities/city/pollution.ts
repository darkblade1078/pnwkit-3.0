import { ImprovementPollution } from "../../types/utilities/improvements";

/**
 * Improvement counts keyed by their lowercase names (matching the API's city
 * fields, e.g. `coal_mine`, `steel_mill`). Any improvement omitted counts as 0,
 * so a raw city object from `queries.cities()` can be passed directly.
 */
export type PollutingImprovements = Partial<Record<Lowercase<keyof typeof ImprovementPollution>, number>>;

/** Manufacturing improvements — pollution reduced 25% by Green Technologies. */
const MANUFACTURING: (keyof typeof ImprovementPollution)[] = [
    "OIL_REFINERY", "STEEL_MILL", "ALUMINUM_REFINERY", "MUNITIONS_FACTORY",
];

/**
 * Calculates a city's total pollution index from its improvement counts, summing
 * {@link ImprovementPollution} across every improvement and applying national
 * project modifiers. The result is floored at zero.
 *
 * National project modifiers:
 *  - Green Technologies: manufacturing pollution -25%, farm pollution -50%, and
 *    subways reduce pollution 25 points more (-45 -> -70).
 *  - Recycling Initiative: recycling centers reduce 75 instead of 70.
 *
 * @param improvements - Improvement counts keyed by lowercase name (e.g. `steel_mill`)
 * @param greenTechnologies - Whether the nation has the Green Technologies project (default: false)
 * @param recyclingInitiative - Whether the nation has the Recycling Initiative project (default: false)
 * @returns The total pollution index (never negative)
 * @throws Error if any improvement count is negative
 * @example
 * ```typescript
 * const index = pollution({ coal_mine: 10, steel_mill: 5, recycling_center: 4, subway: 1 }, true, true);
 * console.log(index); // Total pollution index with both projects applied
 * ```
 */
export default function pollution(
    improvements: PollutingImprovements,
    greenTechnologies: boolean = false,
    recyclingInitiative: boolean = false,
): number
{
    let index = 0;

    for (const key of Object.keys(ImprovementPollution) as (keyof typeof ImprovementPollution)[])
    {
        const count = improvements[key.toLowerCase() as Lowercase<keyof typeof ImprovementPollution>] ?? 0;

        if (count < 0)
            throw new Error('Invalid input: Negative values are not allowed');

        if (count === 0)
            continue;

        let perUnit: number = ImprovementPollution[key];

        if (greenTechnologies)
        {
            if (MANUFACTURING.includes(key))
                perUnit *= 0.75;
            else if (key === "FARM")
                perUnit *= 0.5;
            else if (key === "SUBWAY")
                perUnit -= 25;
        }

        if (recyclingInitiative && key === "RECYCLING_CENTER")
            perUnit -= 5;

        index += count * perUnit;
    }

    return Math.max(0, index);
}
