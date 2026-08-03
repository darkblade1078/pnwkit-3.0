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

/**
 * Returns a random integer uniformly distributed in the inclusive range
 * `[min, max]`.
 *
 * Note: the result is floored to an integer, so this is only appropriate for
 * whole-number ranges. For a continuous fractional multiplier (e.g. the
 * `RAND(0.85, 1.05)` damage factor) use {@link damageFactor} instead.
 *
 * @param min - The lower bound (inclusive)
 * @param max - The upper bound (inclusive)
 * @returns A random integer between `min` and `max`
 */
export function randBetween(min: number, max: number): number
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns `percent` percent of `number` (i.e. `(percent / 100) * number`).
 *
 * @param percent - The percentage to take (e.g. 40 for 40%)
 * @param number - The value to take the percentage of
 * @returns The resulting portion of `number`
 */
export function percentOfNumber(percent: number, number: number): number
{
  return (percent / 100) * number;
}

/**
 * Returns a continuous random multiplier in the range [0.85, 1.05], matching the
 * `RAND(0.85, 1.05)` factor used by the in-game damage formulas.
 *
 * (Note: {@link randBetween} floors to an integer and therefore cannot be used
 * for this fractional range.)
 */
export function damageFactor(): number
{
    return 0.85 + Math.random() * (1.05 - 0.85);
}

/**
 * Returns a continuous random multiplier in the range [0.8, 1.1], matching the
 * `RAND(0.8, 1.1)` factor used by the in-game ground-battle loot formula.
 *
 * (Note: {@link randBetween} floors to an integer and therefore cannot be used
 * for this fractional range.)
 */
export function lootFactor(): number
{
  return 0.8 + Math.random() * (1.1 - 0.8);
}

/**
 * Date (YYYY-MM-DD, UTC) of the most recent dump that should exist.
 * Dumps generate at 23:55 UTC, so before that the newest available is yesterday's.
 */
export function latestDumpDate(now: Date = new Date()): string
{
  const GENERATED_AT = 23 * 60 + 55;                 // 23:55 UTC, in minutes
  const nowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const d = new Date(now);

  if (nowMinutes < GENERATED_AT)
    d.setUTCDate(d.getUTCDate() - 1);

  return d.toISOString().slice(0, 10);
}


