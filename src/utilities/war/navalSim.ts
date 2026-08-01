import { percentOfNumber, randBetween, damageFactor } from "../other";
import { WarPolicy, WarType, type NavalSimResult } from "../../types/utilities/war";
import { infraPolicyMultiplier, warTypeInfraMultiplier } from "./infrastructureDamage";

/** Each ship contributes this much to a nation's naval (army) value. */
const SHIP_VALUE = 4;

/**
 * Simulates one or more naval battles and returns the average ship losses for
 * both sides, the average infrastructure destroyed, and the probability of each
 * victory type.
 *
 * Each battle resolves as 3 rolls. Every roll each side generates a value between
 * 40% and 100% of its naval value (`Ships * 4`); the side with the higher value
 * wins the roll. The number of rolls won determines the victory type:
 *
 *   3 wins → Immense Triumph, 2 → Moderate Victory, 1 → Pyrrhic Victory, 0 → Utter Failure.
 *
 * Ship casualties accrue each roll from the opponent's roll value: each side loses
 * `(opponent's roll) * 0.01375` ships per roll.
 *
 * Infrastructure destroyed uses:
 *   Infra = MAX(MIN((Att Ships - Def Ships * 0.5) * 2.625 * RAND(0.85, 1.05) * (wins / 3),
 *           City Infrastructure * 0.5 + 25), 0)
 * multiplied by the war-type factor (see {@link warTypeInfraMultiplier}) and the
 * combined war-policy factor (see {@link airstrikeInfraPolicyMultiplier} — the
 * Attrition/Turtle/Moneybags/Covert/Arcane modifiers apply to naval battles too).
 *
 * @param attackingShips - The attacker's ship count
 * @param defendingShips - The defender's ship count
 * @param attacks - Number of naval battles to simulate (results are averaged over these)
 * @param defendingCityInfrastructure - The targeted city's infrastructure (drives the infra-damage cap)
 * @param attackerWarPolicy - The attacker's war policy (offensive infra modifier)
 * @param defenderWarPolicy - The defender's war policy (defensive infra modifier)
 * @param warType - The war type (offensive infra modifier; defaults to Ordinary)
 * @returns The averaged {@link NavalSimResult} across all simulated battles
 * @throws Error if ship counts are negative or attacks is outside the 1-1000 range
 * @example
 * ```typescript
 * const result = navalSim(50, 30, 1000, 2000, WarPolicy.ATTRITION, WarPolicy.TURTLE, WarType.ATTRITION);
 * console.log(result.averageDefenderShipsLost, result.averageInfrastructureDestroyed);
 * ```
 */
export function navalSim(
    attackingShips: number,
    defendingShips: number,
    attacks: number,
    defendingCityInfrastructure: number = 0,
    attackerWarPolicy?: WarPolicy,
    defenderWarPolicy?: WarPolicy,
    warType: WarType = WarType.ORDINARY
): NavalSimResult
{
    if(attackingShips < 0 || defendingShips < 0)
        throw new Error("Ships cannot be negative.");

    if(attacks < 1)
        throw new Error("Number of attacks must be at least 1.");

    if(attacks > 1000)
        throw new Error("Number of attacks cannot go over 1,000.");

    const infraDamageMultiplier = warTypeInfraMultiplier(warType) * infraPolicyMultiplier(attackerWarPolicy, defenderWarPolicy);
    const infraCap = defendingCityInfrastructure * 0.5 + 25;

    let totalAttackerLost = 0;
    let totalDefenderLost = 0;
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
            const attackRoll = randBetween(percentOfNumber(40, attackingShips), attackingShips) * SHIP_VALUE;
            const defenseRoll = randBetween(percentOfNumber(40, defendingShips), defendingShips) * SHIP_VALUE;

            // Each side loses the opponent's roll * 0.01375 ships.
            attackerLost += defenseRoll * 0.01375;
            defenderLost += attackRoll * 0.01375;

            if(attackRoll > defenseRoll)
                wins++;
        }

        // Ship losses come purely from the rolls and can't exceed each side's fleet.
        attackerLost = Math.min(attackerLost, attackingShips);
        defenderLost = Math.min(defenderLost, defendingShips);

        // Infrastructure damage scales linearly with the rolls won (wins / 3).
        const navalPower = attackingShips - defendingShips * 0.5;
        let infraDestroyed = Math.max(Math.min(
            navalPower * 2.625 * damageFactor() * (wins / 3),
            infraCap
        ), 0);

        infraDestroyed *= infraDamageMultiplier;

        totalAttackerLost += attackerLost;
        totalDefenderLost += defenderLost;
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
        averageAttackerShipsLost: totalAttackerLost / attacks,
        averageDefenderShipsLost: totalDefenderLost / attacks,
        averageInfrastructureDestroyed: totalInfraDestroyed / attacks,
        victoryChances: {
            utterFailure: utterFailures / attacks,
            pyrrhicVictory: pyrrhicVictories / attacks,
            moderateVictory: moderateVictories / attacks,
            immenseTriumph: immenseTriumphs / attacks,
        },
    };
}
