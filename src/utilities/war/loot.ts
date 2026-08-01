import { VictoryType, WarType, WarPolicy } from "../../types/utilities/war";
import { lootFactor } from "../other";

/** Money looted per attacking soldier / tank before factors. */
const SOLDIER_LOOT_VALUE = 1.1;
const TANK_LOOT_VALUE = 25.15;

/**
 * Returns the war-type loot multiplier — the fraction of potential loot an
 * attacker takes based on the war type:
 *   - Ordinary:  50% of potential loot.
 *   - Attrition: 25% of potential loot.
 *   - Raid:      100% of potential loot.
 *
 * (Note this differs from the infrastructure war-type factor, where Attrition is
 * the strongest and Raid the weakest.)
 *
 * @param warType - The war type
 * @returns The loot multiplier for the attacker
 */
export function warTypeLootMultiplier(warType: WarType): number
{
    switch(warType)
    {
        case WarType.RAID:
            return 1.00;
        case WarType.ATTRITION:
            return 0.25;
        case WarType.ORDINARY:
        default:
            return 0.50;
    }
}

/**
 * Returns the combined war-policy loot multiplier from the attacker's and
 * defender's war policies:
 *   - Defender Moneybags: x0.6 loot.
 *   - Attacker Pirate:    x1.4 loot.
 *   - Both applicable:    they cancel out to x1.0.
 *
 * All other policies have no effect on loot.
 *
 * @param attacker - The attacker's war policy
 * @param defender - The defender's war policy
 * @returns The multiplier to apply to the base loot
 */
export function lootPolicyMultiplier(attacker?: WarPolicy, defender?: WarPolicy): number
{
    const pirate = attacker === WarPolicy.PIRATE;
    const moneybags = defender === WarPolicy.MONEYBAGS;

    if(pirate && moneybags)
        return 1;
    if(pirate)
        return 1.4;
    if(moneybags)
        return 0.6;
    return 1;
}

/**
 * Simulates the money looted from a successful ground attack.
 *
 * Loot = (Attacking Soldiers * 1.1 + Attacking Tanks * 25.15) * VictoryFactor
 *        * RAND(0.8, 1.1) * WarTypeFactor * WarPolicyFactor
 *
 * where VictoryFactor is the victory tier (0 for Utter Failure up to 3 for Immense
 * Triumph), the war-type factor comes from {@link warTypeLootMultiplier}, and the
 * war-policy factor from {@link lootPolicyMultiplier}. The result is capped at 75%
 * of the defender's cash on hand, cannot take their last $1,000,000, and is floored
 * at zero.
 *
 * @param attackingSoldiers - Number of the attacker's surviving soldiers
 * @param attackingTanks - Number of the attacker's surviving tanks
 * @param victory - The victory tier (see {@link VictoryType})
 * @param defendersMoney - The defender's on-hand money
 * @param warType - The war type (loot modifier; defaults to Ordinary)
 * @param attackerWarPolicy - The attacker's war policy (loot modifier)
 * @param defenderWarPolicy - The defender's war policy (loot modifier)
 * @returns The amount of money looted
 * @example
 * ```typescript
 * const loot = lootSim(5000, 250, VictoryType.IMMENSE_TRIUMPH, 10_000_000, WarType.RAID, WarPolicy.PIRATE);
 * console.log(loot); // Money looted on an immense triumph
 * ```
 */
export function lootSim(
    attackingSoldiers: number,
    attackingTanks: number,
    victory: VictoryType,
    defendersMoney: number,
    warType: WarType = WarType.ORDINARY,
    attackerWarPolicy?: WarPolicy,
    defenderWarPolicy?: WarPolicy
): number
{
    if(attackingSoldiers < 0 || attackingTanks < 0)
        throw new Error("Soldiers and tanks cannot be negative.");

    const loot = (attackingSoldiers * SOLDIER_LOOT_VALUE + attackingTanks * TANK_LOOT_VALUE)
        * victory
        * lootFactor()
        * warTypeLootMultiplier(warType)
        * lootPolicyMultiplier(attackerWarPolicy, defenderWarPolicy);

    // Can't take more than 75% of cash on hand, nor the defender's last $1,000,000.
    return Math.max(0, Math.min(loot, defendersMoney * 0.75, defendersMoney - 1_000_000));
}
