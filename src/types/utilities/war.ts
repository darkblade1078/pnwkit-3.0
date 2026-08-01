export const SabotageType = {
    TANKS: 1.5,
    AIRCRAFT: 2,
    SHIPS: 3,
    MISSILE: 4,
    NUCLEAR_WEAPON: 5,
    GATHER_INTELLIGENCE: 1,
    ASSASSINATE_SPIES: 1.5,
} as const;
export type SabotageType = typeof SabotageType[keyof typeof SabotageType];

export enum VictoryType {
    UTTER_FAILURE = 0,
    PHYRRIC_VICTORY = 1,
    MODERATE_VICTORY = 2,
    IMMENSE_TRIUMPH = 3,
}

export enum AirstrikeType {
    SOLDIERS = 1,
    TANKS = 2,
    AIRCRAFT = 3,
    SHIPS = 4,
    MONEY = 5,
    INFRASTRUCTURE = 6,
}

export enum WarType {
    ORDINARY = 0,
    ATTRITION = 1,
    RAID = 2,
}

export enum WarPolicy {
    ATTRITION = 1,
    TURTLE = 2,
    BLITZKRIEG = 3,
    FORTRESS = 4,
    MONEYBAGS = 5,
    PIRATE = 6,
    TACTICIAN = 7,
    GUARDIAN = 8,
    COVERT = 9,
    ARCANE = 10,
}

export interface AirstrikeSimResult {
    averageAttackerAircraftLost: number;
    averageDefenderAircraftLost: number;
    averageUnitsKilled: number;
    averageInfrastructureDestroyed: number;
    victoryChances: {
        utterFailure: number;
        pyrrhicVictory: number;
        moderateVictory: number;
        immenseTriumph: number;
    };
}

export interface NavalSimResult {
    averageAttackerShipsLost: number;
    averageDefenderShipsLost: number;
    averageInfrastructureDestroyed: number;
    victoryChances: {
        utterFailure: number;
        pyrrhicVictory: number;
        moderateVictory: number;
        immenseTriumph: number;
    };
}

export interface GroundSimResult {
    averageAttackerSoldiersLost: number;
    averageAttackerTanksLost: number;
    averageDefenderSoldiersLost: number;
    averageDefenderTanksLost: number;
    averageInfrastructureDestroyed: number;
    averageLoot: number;
    victoryChances: {
        utterFailure: number;
        pyrrhicVictory: number;
        moderateVictory: number;
        immenseTriumph: number;
    };
}