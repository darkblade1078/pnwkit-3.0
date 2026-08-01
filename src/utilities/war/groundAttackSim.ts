import { percentOfNumber, randBetween, damageFactor } from "../other";
import { WarPolicy, WarType, VictoryType, type GroundSimResult } from "../../types/utilities/war";
import { infraPolicyMultiplier, warTypeInfraMultiplier } from "./infrastructureDamage";
import { lootSim } from "./loot";

/** Army-value weights for ground forces. */
const ARMED_SOLDIER_VALUE = 1.75;
const UNARMED_SOLDIER_VALUE = 1;
const TANK_VALUE = 40;
/** A defending nation adds population / this as resisting army strength. */
const RESISTANCE_DIVISOR = 400;

/** Soldier casualties per roll: opponent soldier roll * this + opponent tank roll * the tank weight. */
const SOLDIER_CASUALTY_FROM_SOLDIER = 0.0084;
const SOLDIER_CASUALTY_FROM_TANK = 0.0092;

/** Tank casualties per roll — the winning side takes fewer, the losing side more. */
const WINNER_TANK_FROM_SOLDIER = 0.0004060606;
const WINNER_TANK_FROM_TANK = 0.00066666666;
const LOSER_TANK_FROM_SOLDIER = 0.00043225806;
const LOSER_TANK_FROM_TANK = 0.00070967741;

/** Minimum soldiers required to launch a ground attack. */
const MIN_ATTACKING_SOLDIERS = 50;

/**
 * Simulates one or more ground battles and returns the average soldier and tank
 * losses for both sides, the average infrastructure destroyed, and the probability
 * of each victory type.
 *
 * Each side's forces are converted to army values:
 *   soldier value = soldiers * (using munitions ? 1.75 : 1)
 *   tank value    = tanks * 40
 * The defender additionally gains `population / 400` resisting army strength on its
 * soldier value.
 *
 * Each battle resolves as 3 rolls. Every roll, each side rolls its soldier value and
 * its tank value independently between 40% and 100%; the attacker's total roll
 * (AR = soldier + tank) is compared to the defender's (DR). The number of rolls the
 * attacker wins (AR > DR) determines the victory type:
 *
 *   3 wins → Immense Triumph, 2 → Moderate Victory, 1 → Pyrrhic Victory, 0 → Utter Failure.
 *
 * Casualties accrue each roll from the opponent's rolls:
 *   soldier losses = opponent soldier roll * 0.0084 + opponent tank roll * 0.0092
 *   tank losses    = opponent soldier roll * s + opponent tank roll * t, where the
 *     winning side uses (0.0004060606, 0.00066666666) and the losing side uses
 *     (0.00043225806, 0.00070967741).
 *
 * Infrastructure destroyed uses:
 *   Infra = MAX(MIN(((Att Soldiers - Def Soldiers * 0.5) * 0.000606061
 *           + (Att Tanks - Def Tanks * 0.5) * 0.01) * RAND(0.85, 1.05) * (wins / 3),
 *           City Infrastructure * 0.2 + 25), 0)
 * multiplied by the war-type factor (see {@link warTypeInfraMultiplier}) and the
 * combined war-policy factor (see {@link infraPolicyMultiplier}).
 *
 * @param attackingSoldiers - The attacker's soldier count (must be at least 50)
 * @param attackingTanks - The attacker's tank count
 * @param defendingSoldiers - The defender's soldier count
 * @param defendingTanks - The defender's tank count
 * @param attacks - Number of ground battles to simulate (results are averaged over these)
 * @param attackerMunitions - Whether the attacker's soldiers fight with munitions (1.75x vs 1x value)
 * @param defenderMunitions - Whether the defender's soldiers fight with munitions (1.75x vs 1x value)
 * @param defendingPopulation - The defender's population (adds population / 400 resisting strength)
 * @param defendingCityInfrastructure - The targeted city's infrastructure (drives the infra-damage cap)
 * @param attackerWarPolicy - The attacker's war policy (infra and loot modifier)
 * @param defenderWarPolicy - The defender's war policy (infra and loot modifier)
 * @param warType - The war type (infra and loot modifier; defaults to Ordinary)
 * @param defendersMoney - The defender's on-hand money (drives the loot amount and its caps)
 * @returns The averaged {@link GroundSimResult} across all simulated battles
 * @throws Error if any count is negative, attacks is outside the 1-1000 range, or fewer than 50 attacking soldiers
 * @example
 * ```typescript
 * const result = groundAttackSim(10000, 500, 8000, 400, 1000, true, true, 100000, 2000, WarPolicy.ATTRITION, WarPolicy.TURTLE, WarType.ATTRITION, 50_000_000);
 * console.log(result.averageDefenderSoldiersLost, result.averageInfrastructureDestroyed, result.averageLoot);
 * ```
 */
export function groundAttackSim(
    attackingSoldiers: number,
    attackingTanks: number,
    defendingSoldiers: number,
    defendingTanks: number,
    attacks: number,
    attackerMunitions: boolean = true,
    defenderMunitions: boolean = true,
    defendingPopulation: number = 0,
    defendingCityInfrastructure: number = 0,
    attackerWarPolicy?: WarPolicy,
    defenderWarPolicy?: WarPolicy,
    warType: WarType = WarType.ORDINARY,
    defendersMoney: number = 0
): GroundSimResult
{
    if(attackingSoldiers < 0 || attackingTanks < 0 || defendingSoldiers < 0 || defendingTanks < 0)
        throw new Error("Soldiers and tanks cannot be negative.");

    if(attackingSoldiers < MIN_ATTACKING_SOLDIERS)
        throw new Error(`A ground attack requires at least ${MIN_ATTACKING_SOLDIERS} attacking soldiers.`);

    if(attacks < 1)
        throw new Error("Number of attacks must be at least 1.");

    if(attacks > 1000)
        throw new Error("Number of attacks cannot go over 1,000.");

    const infraDamageMultiplier = warTypeInfraMultiplier(warType) * infraPolicyMultiplier(attackerWarPolicy, defenderWarPolicy);
    const infraCap = defendingCityInfrastructure * 0.2 + 25;

    // Army values (fixed for the whole simulation).
    const attackerSoldierValue = attackingSoldiers * (attackerMunitions ? ARMED_SOLDIER_VALUE : UNARMED_SOLDIER_VALUE);
    const defenderSoldierValue = defendingSoldiers * (defenderMunitions ? ARMED_SOLDIER_VALUE : UNARMED_SOLDIER_VALUE)
        + defendingPopulation / RESISTANCE_DIVISOR;
    const attackerTankValue = attackingTanks * TANK_VALUE;
    const defenderTankValue = defendingTanks * TANK_VALUE;

    let totalAttackerSoldiersLost = 0;
    let totalAttackerTanksLost = 0;
    let totalDefenderSoldiersLost = 0;
    let totalDefenderTanksLost = 0;
    let totalInfraDestroyed = 0;
    let totalLoot = 0;
    let utterFailures = 0;
    let pyrrhicVictories = 0;
    let moderateVictories = 0;
    let immenseTriumphs = 0;

    for(let attack = 0; attack < attacks; attack++)
    {
        let wins = 0;
        let attackerSoldiersLost = 0;
        let attackerTanksLost = 0;
        let defenderSoldiersLost = 0;
        let defenderTanksLost = 0;

        for(let roll = 0; roll < 3; roll++)
        {
            const attackerSoldierRoll = randBetween(percentOfNumber(40, attackerSoldierValue), attackerSoldierValue);
            const defenderSoldierRoll = randBetween(percentOfNumber(40, defenderSoldierValue), defenderSoldierValue);
            const attackerTankRoll = randBetween(percentOfNumber(40, attackerTankValue), attackerTankValue);
            const defenderTankRoll = randBetween(percentOfNumber(40, defenderTankValue), defenderTankValue);

            const attackerRoll = attackerSoldierRoll + attackerTankRoll;
            const defenderRoll = defenderSoldierRoll + defenderTankRoll;
            const attackerWonRoll = attackerRoll > defenderRoll;

            // Soldier casualties come from the opponent's rolls, regardless of who won.
            attackerSoldiersLost += defenderSoldierRoll * SOLDIER_CASUALTY_FROM_SOLDIER + defenderTankRoll * SOLDIER_CASUALTY_FROM_TANK;
            defenderSoldiersLost += attackerSoldierRoll * SOLDIER_CASUALTY_FROM_SOLDIER + attackerTankRoll * SOLDIER_CASUALTY_FROM_TANK;

            // Tank casualties: the winning side takes the lighter coefficients.
            if(attackerWonRoll)
            {
                attackerTanksLost += defenderSoldierRoll * WINNER_TANK_FROM_SOLDIER + defenderTankRoll * WINNER_TANK_FROM_TANK;
                defenderTanksLost += attackerSoldierRoll * LOSER_TANK_FROM_SOLDIER + attackerTankRoll * LOSER_TANK_FROM_TANK;
                wins++;
            }
            else
            {
                attackerTanksLost += defenderSoldierRoll * LOSER_TANK_FROM_SOLDIER + defenderTankRoll * LOSER_TANK_FROM_TANK;
                defenderTanksLost += attackerSoldierRoll * WINNER_TANK_FROM_SOLDIER + attackerTankRoll * WINNER_TANK_FROM_TANK;
            }
        }

        // Casualties can't exceed each side's starting forces.
        attackerSoldiersLost = Math.min(attackerSoldiersLost, attackingSoldiers);
        attackerTanksLost = Math.min(attackerTanksLost, attackingTanks);
        defenderSoldiersLost = Math.min(defenderSoldiersLost, defendingSoldiers);
        defenderTanksLost = Math.min(defenderTanksLost, defendingTanks);

        // Infrastructure damage scales linearly with the rolls won (wins / 3).
        const groundPower = (attackingSoldiers - defendingSoldiers * 0.5) * 0.000606061
            + (attackingTanks - defendingTanks * 0.5) * 0.01;
        let infraDestroyed = Math.max(Math.min(
            groundPower * damageFactor() * (wins / 3),
            infraCap
        ), 0);

        infraDestroyed *= infraDamageMultiplier;

        // Loot is based on the attacker's forces that survive the battle and the
        // victory tier (wins). lootSim applies the RAND(0.8, 1.1), war-type and
        // war-policy loot factors and the cash-on-hand caps.
        const loot = lootSim(
            attackingSoldiers - attackerSoldiersLost,
            attackingTanks - attackerTanksLost,
            wins as VictoryType,
            defendersMoney,
            warType,
            attackerWarPolicy,
            defenderWarPolicy
        );

        totalAttackerSoldiersLost += attackerSoldiersLost;
        totalAttackerTanksLost += attackerTanksLost;
        totalDefenderSoldiersLost += defenderSoldiersLost;
        totalDefenderTanksLost += defenderTanksLost;
        totalInfraDestroyed += infraDestroyed;
        totalLoot += loot;

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
        averageAttackerSoldiersLost: totalAttackerSoldiersLost / attacks,
        averageAttackerTanksLost: totalAttackerTanksLost / attacks,
        averageDefenderSoldiersLost: totalDefenderSoldiersLost / attacks,
        averageDefenderTanksLost: totalDefenderTanksLost / attacks,
        averageInfrastructureDestroyed: totalInfraDestroyed / attacks,
        averageLoot: totalLoot / attacks,
        victoryChances: {
            utterFailure: utterFailures / attacks,
            pyrrhicVictory: pyrrhicVictories / attacks,
            moderateVictory: moderateVictories / attacks,
            immenseTriumph: immenseTriumphs / attacks,
        },
    };
}
