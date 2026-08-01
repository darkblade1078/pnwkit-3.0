import { WarType, WarPolicy } from "../../types/utilities/war";

/**
 * Returns the combined infrastructure-damage multiplier applied to an airstrike
 * from the attacker's and the defender's war policies.
 *
 * Attacker (offensive) modifiers:
 *   - Attrition:  +10% infrastructure damage.
 *   - Blitzkrieg: +10% infrastructure damage (only within the first 12 turns of
 *     switching to this policy — pass the policy only while that window is active).
 *
 * Defender (damage-taken) modifiers:
 *   - Turtle:                -10% infrastructure damage taken.
 *   - Moneybags/Covert/Arcane: +5% infrastructure damage taken.
 *
 * All other policies have no effect on airstrike infrastructure damage.
 *
 * @param attacker - The attacker's war policy
 * @param defender - The defender's war policy
 * @returns The multiplier to apply to the base infrastructure damage
 */
export function infraPolicyMultiplier(attacker?: WarPolicy, defender?: WarPolicy): number
{
    let multiplier = 1;

    if(attacker === WarPolicy.ATTRITION || attacker === WarPolicy.BLITZKRIEG)
        multiplier *= 1.10;

    if(defender === WarPolicy.TURTLE)
        multiplier *= 0.90;
    else if(defender === WarPolicy.MONEYBAGS || defender === WarPolicy.COVERT || defender === WarPolicy.ARCANE)
        multiplier *= 1.05;

    return multiplier;
}

/**
 * Returns the fraction of potential infrastructure damage an attacker deals based
 * on the war type:
 *   - Ordinary:  50% of potential infrastructure damage.
 *   - Attrition: 100% of potential infrastructure damage.
 *   - Raid:      25% of potential infrastructure damage.
 *
 * @param warType - The war type
 * @returns The infrastructure-damage multiplier for the attacker
 */
export function warTypeInfraMultiplier(warType: WarType): number
{
    switch(warType)
    {
        case WarType.ATTRITION:
            return 1.00;
        case WarType.RAID:
            return 0.25;
        case WarType.ORDINARY:
        default:
            return 0.50;
    }
}