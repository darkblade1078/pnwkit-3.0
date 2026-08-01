import { percentOfNumber, randBetween, damageFactor } from "../other";
import { AirstrikeType, WarPolicy, WarType, type AirstrikeSimResult } from "../../types/utilities/war";
import { infraPolicyMultiplier, warTypeInfraMultiplier } from "./infrastructureDamage";

/** Each aircraft contributes this much to a nation's airforce value. */
const AIRFORCE_VALUE = 3;

/**
 * Simulates one or more airstrikes and returns the average losses for both sides,
 * the average infrastructure destroyed, and the probability of each victory type.
 *
 * Each airstrike resolves as 3 rolls. Every roll each side generates a value
 * between 40% and 100% of its airforce value (`Aircraft * 3`); the side with the
 * higher value wins the roll. The number of rolls won determines the victory type:
 *
 *   3 wins → Immense Triumph, 2 → Moderate Victory, 1 → Pyrrhic Victory, 0 → Utter Failure.
 *
 * Aircraft casualties accrue each roll from the opponent's roll value:
 *   - Dogfight (target Aircraft):     attacker loses roll * 0.01,     defender loses roll * 0.018337
 *   - Any other target:               attacker loses roll * 0.015385, defender loses roll * 0.009091
 *
 * Targeted units killed (soldiers/tanks/ships) use the base formula:
 *   Killed = ROUND(MAX(MIN(Enemy Units, Enemy Units * capRate + capFlat,
 *            (Att Aircraft - Def Aircraft * 0.5) * coeff * RAND(0.85, 1.05)), 0))
 * scaled by the victory type: Immense Triumph 100%, Moderate 70%, Pyrrhic 40%,
 * Utter Failure 0% (no targeted units are killed on a failure).
 *
 * Infrastructure destroyed uses:
 *   Infra = MAX(MIN((Att Aircraft - Def Aircraft * 0.5) * 0.35353535 * RAND(0.85, 1.05)
 *           * (wins / 3), City Infrastructure * 0.5 + 100), 0)
 * (note the `wins / 3` scaling differs from the unit-kill scaling), reduced to 1/3
 * for any airstrike that is not explicitly targeting infrastructure, then multiplied
 * by the war-type factor (see {@link warTypeInfraMultiplier}) and the combined
 * war-policy factor (see {@link airstrikeInfraPolicyMultiplier}).
 *
 * @param attackingAircraft - The attacker's aircraft count
 * @param defendingAircraft - The defender's aircraft count
 * @param attacks - Number of airstrikes to simulate (results are averaged over these)
 * @param attackType - The airstrike target (see {@link AirstrikeType})
 * @param defendingSoldiers - The defender's soldiers (only used when targeting soldiers)
 * @param defendingTanks - The defender's tanks (only used when targeting tanks)
 * @param defendingShips - The defender's ships (only used when targeting ships)
 * @param defendingCityInfrastructure - The targeted city's infrastructure (drives the infra-damage cap)
 * @param attackerWarPolicy - The attacker's war policy (offensive infra modifier)
 * @param defenderWarPolicy - The defender's war policy (defensive infra modifier)
 * @param warType - The war type (offensive infra modifier; defaults to Ordinary)
 * @returns The averaged {@link AirstrikeSimResult} across all simulated airstrikes
 * @throws Error if aircraft counts are negative, attacks is less than 1, or the attack type is invalid
 * @example
 * ```typescript
 * const result = airstrikeSim(1000, 200, 10000, AirstrikeType.SOLDIERS, 15000, 0, 0, 2000, WarPolicy.ATTRITION, WarPolicy.TURTLE);
 * console.log(result.averageUnitsKilled, result.averageInfrastructureDestroyed);
 * ```
 */
export function airstrikeSim(
    attackingAircraft: number,
    defendingAircraft: number,
    attacks: number,
    attackType: AirstrikeType,
    defendingSoldiers: number = 0,
    defendingTanks: number = 0,
    defendingShips: number = 0,
    defendingCityInfrastructure: number = 0,
    attackerWarPolicy?: WarPolicy,
    defenderWarPolicy?: WarPolicy,
    warType: WarType = WarType.ORDINARY
): AirstrikeSimResult
{
    if(attackingAircraft < 0 || defendingAircraft < 0)
        throw new Error("Aircraft cannot be negative.");

    if(attacks < 1)
        throw new Error("Number of attacks must be at least 1.");

    if(attacks > 1000)
        throw new Error("Number of attacks cannot go over 1,000.");

    if(!Object.values(AirstrikeType).includes(attackType))
        throw new Error(`Invalid attack type: ${attackType}`);

    const isDogfight = attackType === AirstrikeType.AIRCRAFT;
    const infraDamageMultiplier = warTypeInfraMultiplier(warType) * infraPolicyMultiplier(attackerWarPolicy, defenderWarPolicy);
    const infraCap = defendingCityInfrastructure * 0.5 + 100;

    let totalAttackerLost = 0;
    let totalDefenderLost = 0;
    let totalUnitsKilled = 0;
    let totalInfraDestroyed = 0;
    let utterFailures = 0;
    let pyrrhicVictories = 0;
    let moderateVictories = 0;
    let immenseTriumphs = 0;

    for(let attack = 0; attack < attacks; attack++)
    {
        let wins = 0;
        let attackerLost = 0;
        let defenderLost = 0;

        for(let roll = 0; roll < 3; roll++)
        {
            const attackRoll = randBetween(percentOfNumber(40, attackingAircraft), attackingAircraft) * AIRFORCE_VALUE;
            const defenseRoll = randBetween(percentOfNumber(40, defendingAircraft), defendingAircraft) * AIRFORCE_VALUE;

            if(isDogfight)
            {
                attackerLost += defenseRoll * 0.01;
                defenderLost += attackRoll * 0.018337;
            }
            else
            {
                attackerLost += defenseRoll * 0.015385;
                defenderLost += attackRoll * 0.009091;
            }

            if(attackRoll > defenseRoll)
                wins++;
        }

        attackerLost = Math.min(attackerLost, attackingAircraft);
        defenderLost = Math.min(defenderLost, defendingAircraft);

        const victoryModifier = wins === 3 ? 1 : (wins === 2 ? 0.70 : (wins === 1 ? 0.40 : 0));
        const airpower = attackingAircraft - defendingAircraft * 0.5;
        let unitsKilled = 0;

        switch(attackType)
        {
            case AirstrikeType.SOLDIERS:
                unitsKilled = Math.round(Math.max(Math.min(
                    defendingSoldiers,
                    defendingSoldiers * 0.75 + 1000,
                    airpower * 35 * damageFactor()
                ), 0) * victoryModifier);
                break;

            case AirstrikeType.TANKS:
                unitsKilled = Math.round(Math.max(Math.min(
                    defendingTanks,
                    defendingTanks * 0.75 + 10,
                    airpower * 1.25 * damageFactor()
                ), 0) * victoryModifier);
                break;

            case AirstrikeType.SHIPS:
                unitsKilled = Math.round(Math.max(Math.min(
                    defendingShips,
                    defendingShips * 0.5 + 4,
                    airpower * 0.0285 * damageFactor()
                ), 0) * victoryModifier);
                break;

            default:
                break;
        }

        let infraDestroyed = Math.max(Math.min(
            airpower * 0.35353535 * damageFactor() * (wins / 3),
            infraCap
        ), 0);

        if(attackType !== AirstrikeType.INFRASTRUCTURE)
            infraDestroyed /= 3;

        infraDestroyed *= infraDamageMultiplier;

        totalAttackerLost += attackerLost;
        totalDefenderLost += defenderLost;
        totalUnitsKilled += unitsKilled;
        totalInfraDestroyed += infraDestroyed;

        if(wins === 3)
            immenseTriumphs++;
        else if(wins === 2)
            moderateVictories++;
        else if(wins === 1)
            pyrrhicVictories++;
        else
            utterFailures++;
    }

    return {
        averageAttackerAircraftLost: totalAttackerLost / attacks,
        averageDefenderAircraftLost: totalDefenderLost / attacks,
        averageUnitsKilled: totalUnitsKilled / attacks,
        averageInfrastructureDestroyed: totalInfraDestroyed / attacks,
        victoryChances: {
            utterFailure: utterFailures / attacks,
            pyrrhicVictory: pyrrhicVictories / attacks,
            moderateVictory: moderateVictories / attacks,
            immenseTriumph: immenseTriumphs / attacks,
        },
    };
}