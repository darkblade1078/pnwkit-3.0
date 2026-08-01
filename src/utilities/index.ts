import { ConvertBitsToProject } from "./nation/projectBits";
import cityCost from "./city/cityCost";
import infraCost from "./city/infraCost";
import landCost from "./city/landCost";
import { basePopulation, populationDensity, ageBonus, population } from "./city/population";
import { crimeRate, policeModifier, crimeDeaths } from "./city/crime";
import { diseaseRate, hospitalModifier, pollutionModifier, diseaseDeaths } from "./city/disease";
import pollution from "./city/pollution";
import commerce from "./city/commerce";
import { buildingBonus } from "./other";
import { foodProduction, radiationModifier } from "./city/food";
import { warRange, inverseWarRange } from "./war/warRange";
import { espionageRange, inverseEspionageRange, espionageOdds } from "./war/espionage";
import { lootSim, warTypeLootMultiplier, lootPolicyMultiplier } from "./war/loot";
import { missileDamage, nukeDamage } from "./war/missileNukeDamage";
import { airstrikeSim } from "./war/airstrikeSim";
import { navalSim } from "./war/navalSim";
import { groundAttackSim } from "./war/groundAttackSim";
import { infraPolicyMultiplier, warTypeInfraMultiplier } from "./war/infrastructureDamage";

/**
 * Collection of utility functions for Politics & War calculations and data transformations.
 * 
 * Provides helper functions for:
 * - Converting project bits to boolean values
 * - Calculating city costs based on city count
 * - Other game-related calculations
 * 
 * @example
 * ```typescript
 * const utils = new Utilities();
 * 
 * // Check if nation has a specific project
 * const hasProject = utils.convertBitsToProject(projectBits, projectNumber);
 * 
 * // Calculate cost for next city
 * const cost = utils.cityCost(cityCount, top20Average);
 * ```
 */
export default class Utilities 
{
    // Convert project bits to boolean indicating if nation has specific project
    convertBitsToProject = ConvertBitsToProject;
    
    // Calculate the cost of purchasing a city based on current city count
    cityCost = cityCost;

    // Land and infrastructure cost utilities
    infraCost = infraCost;
    landCost = landCost;
    
    // Population related utilities
    basePopulation = basePopulation;
    populationDensity = populationDensity;
    ageBonus = ageBonus;
    population = population;

    // crime utilities
    crimeRate = crimeRate;
    policeModifier = policeModifier;
    crimeDeaths = crimeDeaths;

    // disease utilities
    diseaseRate = diseaseRate;
    hospitalModifier = hospitalModifier;
    pollutionModifier = pollutionModifier;
    diseaseDeaths = diseaseDeaths;

    // pollution utilities
    pollution = pollution;

    // commerce utilites
    commerce = commerce;

    // production utilities
    foodProduction = foodProduction;

    // war range utilities
    warRange = warRange;
    inverseWarRange = inverseWarRange;

    // espionage utilities
    espionageRange = espionageRange;
    inverseEspionageRange = inverseEspionageRange;
    espionageOdds = espionageOdds;

    // loot utilities
    lootSim = lootSim;
    warTypeLootMultiplier = warTypeLootMultiplier;
    lootPolicyMultiplier = lootPolicyMultiplier;

    // infrastructure damage modifiers
    infraPolicyMultiplier = infraPolicyMultiplier;
    warTypeInfraMultiplier = warTypeInfraMultiplier;

    // damage utilities
    missileDamage = missileDamage;
    nukeDamage = nukeDamage;

    // war sim utilities
    airstrikeSim = airstrikeSim;
    navalSim = navalSim;
    groundAttackSim = groundAttackSim;

    // other
    buildingBonus = buildingBonus;
    radiationModifier = radiationModifier;
}