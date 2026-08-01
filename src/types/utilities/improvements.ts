/**
 * The one-time build cost of an improvement.
 * `money` is always present; `steel` and `aluminum` are only set for the
 * improvements that additionally require those resources to build.
 */
export interface ImprovementBuildCost {
    money: number;
    steel?: number;
    aluminum?: number;
}

export interface ImprovementModifier {
    normal: number;
    withProject: number;
}

/**
 * Raw resource produced per turn (tons/turn) by a single improvement, before the
 * building-count bonus, season, radiation, or nation-project modifiers.
 *
 * Note: Farms are intentionally excluded — their output is land-dependent
 * (`Land / 500`, or `Land / 400` with Mass Irrigation), not a constant.
 * Use `foodProduction()` for farms.
 */
export const ImprovementProducePerTurn = {

    // Resources
    COAL_MINE: 0.25,
    OIL_WELL: 0.25,
    BAUXITE_MINE: 0.25,
    IRON_MINE: 0.25,
    LEAD_MINE: 0.25,
    URANIUM_MINE: 0.25,

    // Manufacturing
    OIL_REFINERY: 0.5,
    STEEL_MILL: 0.75,
    ALUMINUM_REFINERY: 0.75,
    MUNITIONS_FACTORY: 1.5,
} as const satisfies Record<string, number>;

/**
 * Commerce produced per turn ($/turn) by a single improvement.
 */
export const ImprovementCommercePerTurn = {
    SUPERMARKET: 4,
    BANK: 6,
    SHOPPING_MALL: 8,
    STADIUM: 10,
    SUBWAY: 8,
} as const satisfies Record<string, number>;

/**
 * One-time construction cost of an improvement.
 *
 * Note: this is a `const` object rather than an `enum` because enum members can
 * only be numbers/strings — they cannot hold the `{ money, steel, aluminum }`
 * object. Access like `ImprovementConstructionCost.NUCLEAR_POWER.money`.
 */
export const ImprovementConstructionCost = {

    // Power
    COAL_POWER: { money: 5_000 },
    OIL_POWER: { money: 7_000 },
    NUCLEAR_POWER: { money: 500_000, aluminum: 100 },
    WIND_POWER: { money: 30_000, steel: 25 },

    // Resources
    COAL_MINE: { money: 1_000 },
    OIL_WELL: { money: 1_500 },
    BAUXITE_MINE: { money: 9_500 },
    IRON_MINE: { money: 9_500 },
    LEAD_MINE: { money: 7_500 },
    URANIUM_MINE: { money: 25_000 },
    FARM: { money: 1_000 },

    // Manufacturing
    OIL_REFINERY: { money: 45_000 },
    STEEL_MILL: { money: 45_000 },
    ALUMINUM_REFINERY: { money: 30_000 },
    MUNITIONS_FACTORY: { money: 35_000 },

    // Civil
    POLICE_STATION: { money: 75_000, steel: 20 },
    HOSPITAL: { money: 100_000, aluminum: 25 },
    RECYCLING_CENTER: { money: 125_000 },
    SUBWAY: { money: 250_000, steel: 50, aluminum: 25 },

    // Commerce
    SUPERMARKET: { money: 5_000 },
    BANK: { money: 15_000, steel: 5, aluminum: 10 },
    SHOPPING_MALL: { money: 45_000, steel: 20, aluminum: 25 },
    STADIUM: { money: 100_000, steel: 40, aluminum: 50 },

    // Military
    BARRACKS: { money: 3_000 },
    FACTORY: { money: 15_000, aluminum: 5 },
    HANGAR: { money: 100_000, steel: 10 },
    DRYDOCK: { money: 250_000, aluminum: 20 },

} as const satisfies Record<string, ImprovementBuildCost>;

/**
 * Operational (upkeep) cost per turn ($/turn) of an improvement.
 */
export const ImprovementOperationalCostPerTurn = {

    // Power
    COAL_POWER: 100,
    OIL_POWER: 150,
    NUCLEAR_POWER: 875,
    WIND_POWER: 42,

    // Resources
    COAL_MINE: 34,
    OIL_WELL: 50,
    BAUXITE_MINE: 134,
    IRON_MINE: 134,
    LEAD_MINE: 125,
    URANIUM_MINE: 417,
    FARM: 25,

    // Manufacturing
    OIL_REFINERY: 334,
    STEEL_MILL: 334,
    ALUMINUM_REFINERY: 209,
    MUNITIONS_FACTORY: 292,

    // Civil
    POLICE_STATION: 63,
    HOSPITAL: 84,
    RECYCLING_CENTER: 209,
    SUBWAY: 271,

    // Commerce
    SUPERMARKET: 50,
    BANK: 150,
    SHOPPING_MALL: 450,
    STADIUM: 1013,
} as const satisfies Record<string, number>;

/** Pollution index added (or removed, if negative) per improvement. */
export const ImprovementPollution = {
    // Power
    COAL_POWER: 8,
    OIL_POWER: 6,
    NUCLEAR_POWER: 0,
    WIND_POWER: 0,

    // Resources
    COAL_MINE: 12,
    OIL_WELL: 12,
    BAUXITE_MINE: 12,
    IRON_MINE: 12,
    LEAD_MINE: 12,
    URANIUM_MINE: 20,
    FARM: 2,

    // Manufacturing
    OIL_REFINERY: 32,
    STEEL_MILL: 40,
    ALUMINUM_REFINERY: 40,
    MUNITIONS_FACTORY: 32,

    // Civil
    POLICE_STATION: 1,
    HOSPITAL: 4,
    RECYCLING_CENTER: -70,
    SUBWAY: -45,

    // Commerce
    SUPERMARKET: 0,
    BANK: 0,
    SHOPPING_MALL: 2,
    STADIUM: 5,
} as const satisfies Record<string, number>;

/**
 * Maximum number of each improvement allowed per city.
 * Power plants have no fixed per-city count in the provided sources — they are
 * built as needed to power the city's infrastructure — so they are omitted here.
 */
export const ImprovementLimitPerCity = {

    // Resources
    COAL_MINE: 10,
    OIL_WELL: 10,
    BAUXITE_MINE: 10,
    IRON_MINE: 10,
    LEAD_MINE: 10,
    URANIUM_MINE: 5,
    FARM: 20,

    // Manufacturing
    OIL_REFINERY: 5,
    STEEL_MILL: 5,
    ALUMINUM_REFINERY: 5,
    MUNITIONS_FACTORY: 5,

    // Civil
    POLICE_STATION: 5,
    HOSPITAL: 6,
    RECYCLING_CENTER: 3,
    SUBWAY: 1,

    // Commerce
    SUPERMARKET: 4,
    BANK: 6,
    SHOPPING_MALL: 5,
    STADIUM: 3,

    // Military
    BARRACKS: 5,
    FACTORY: 5,
    HANGAR: 5,
    DRYDOCK: 3,
} as const satisfies Record<string, number>;


export const ImprovementModifiers = {
    policeStation: { normal: 2.5, withProject: 3.5 },
    hospital: { normal: 4, withProject: 5 },
    recyclingCenter: { normal: -70, withProject: -75 },

} as const satisfies Record<string, ImprovementModifier>;