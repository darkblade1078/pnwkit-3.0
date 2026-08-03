/**
 * TypeScript interfaces for the five Politics & War daily data dumps
 * (https://politicsandwar.com/data).
 *
 * Each interface mirrors the CSV header of its category exactly. Values in a CSV
 * are all text; getDump parses them with PapaParse's `dynamicTyping`, which
 * converts numeric strings to `number` — including the `0`/`1` flag columns, so
 * those are typed `number` (`0`/`1`) rather than `boolean` — and leaves other text
 * as `string`. Timestamps are `YYYY-MM-DD HH:MM:SS` strings.
 *
 * Note: `dynamicTyping` keys off the value, not the column, so a normally-text
 * field that happens to hold an all-digit value (e.g. a nation named `"12345"`)
 * is also returned as a `number`.
 */

/** The five daily data-dump categories published at politicsandwar.com/data. */
export type DataDumpCategory = "alliances" | "cities" | "nations" | "trades" | "wars";

/** All data-dump categories, in the order listed on the download page. */
export const DATA_DUMP_CATEGORIES: readonly DataDumpCategory[] = [
    "alliances",
    "cities",
    "nations",
    "trades",
    "wars",
];

/** One row of the `alliances` data dump. */
export interface AllianceRow {
    alliance_id: number;
    /** Creation timestamp (`YYYY-MM-DD HH:MM:SS`). */
    date_created: string;
    name: string;
    acronym: string;
    color: string;
    continent: string;
    discord_server: string;
    score: number;
    flag_url: string;
}

/** One row of the `cities` data dump. */
export interface CityRow {
    city_id: number;
    nation_id: number;
    /** Creation timestamp (`YYYY-MM-DD HH:MM:SS`). */
    date_created: string;
    name: string;
    /** `1` if this city is the nation's capital, else `0`. */
    capital: number;
    infrastructure: number;
    maxinfra: number;
    land: number;
    oil_power_plants: number;
    wind_power_plants: number;
    coal_power_plants: number;
    nuclear_power_plants: number;
    coal_mines: number;
    oil_wells: number;
    uranium_mines: number;
    iron_mines: number;
    lead_mines: number;
    bauxite_mines: number;
    farms: number;
    police_stations: number;
    hospitals: number;
    recycling_centers: number;
    subway: number;
    supermarkets: number;
    banks: number;
    shopping_malls: number;
    stadiums: number;
    oil_refineries: number;
    aluminum_refineries: number;
    steel_mills: number;
    munitions_factories: number;
    barracks: number;
    factories: number;
    hangars: number;
    drydocks: number;
    /** Timestamp of the last nuke to hit this city (empty string if never). */
    last_nuke_date: string;
    /** `1` if the city is currently powered, else `0`. */
    powered: number;
}

/** One row of the `nations` data dump. */
export interface NationRow {
    nation_id: number;
    nation_name: string;
    leader_name: string;
    /** Creation timestamp (`YYYY-MM-DD HH:MM:SS`). */
    date_created: string;
    continent: string;
    latitude: number;
    longitude: number;
    leader_title: string;
    nation_title: string;
    score: number;
    population: number;
    flag_url: string;
    color: string;
    beige_turns_remaining: number;
    portrait_url: string;
    cities: number;
    gdp: number;
    currency: string;
    wars_won: number;
    wars_lost: number;
    /** Alliance name, or `"None"` when unallied. */
    alliance: string;
    alliance_id: number;
    /** Numeric alliance-position code. */
    alliance_position: number;
    soldiers: number;
    tanks: number;
    aircraft: number;
    ships: number;
    missiles: number;
    nukes: number;
    spies: number;
    domestic_policy: string;
    war_policy: string;
    /** Total number of projects owned. */
    projects: number;
    // Individual project ownership flags (`1` owned, `0` not).
    ironworks_np: number;
    bauxiteworks_np: number;
    arms_stockpile_np: number;
    emergency_gasoline_reserve_np: number;
    mass_irrigation_np: number;
    international_trade_center_np: number;
    missile_launch_pad_np: number;
    nuclear_research_facility_np: number;
    iron_dome_np: number;
    vital_defense_system_np: number;
    intelligence_agency_np: number;
    center_for_civil_engineering_np: number;
    propaganda_bureau_np: number;
    uranium_enrichment_program_np: number;
    urban_planning_np: number;
    advanced_urban_planning_np: number;
    space_program_np: number;
    moon_landing_np: number;
    spy_satellite_np: number;
    pirate_economy_np: number;
    recycling_initiative_np: number;
    telecommunications_satellite_np: number;
    green_technologies_np: number;
    clinical_research_center_np: number;
    specialized_police_training_program_np: number;
    arable_land_agency_np: number;
    advanced_engineering_corps_np: number;
    /** Vacation-mode turns remaining. */
    vm_turns: number;
    government_support_agency_np: number;
    research_and_development_center_np: number;
    resource_production_center_np: number;
    metropolitan_planning_np: number;
    military_salvage_np: number;
    fallout_shelter_np: number;
    advanced_pirate_economy_np: number;
    bureau_of_domestic_affairs_np: number;
    mars_landing_np: number;
    surveillance_network_np: number;
    nuclear_launch_facility_np: number;
    guiding_satellite_np: number;
    military_research_np: number;
    military_doctrine_np: number;
}

/** One row of the `trades` data dump. */
export interface TradeRow {
    trade_id: number;
    /** Offer creation timestamp (`YYYY-MM-DD HH:MM:SS`). */
    date_created: string;
    offerer_nation_id: number;
    receiver_nation_id: number;
    offer_type: string;
    buy_or_sell: string;
    resource: string;
    quantity: number;
    price: number;
    /** `1` if the trade was accepted, else `0`. */
    accepted: number;
    original_trade_id: number;
    /** Acceptance timestamp (empty string if never accepted). */
    date_accepted: string;
}

/** One row of the `wars` data dump. */
export interface WarRow {
    war_id: number;
    /** Declaration timestamp (`YYYY-MM-DD HH:MM:SS`). */
    date_declared: string;
    aggressor_nation_id: number;
    defender_nation_id: number;
    aggressor_alliance_name: string;
    aggressor_alliance_id: number;
    aggressor_alliance_position: number;
    defender_alliance_name: string;
    defender_alliance_id: number;
    defender_alliance_position: number;
    /** `1` if the aggressor is offering peace, else `0`. */
    aggressor_offering_peace: number;
    /** `1` if the defender is offering peace, else `0`. */
    defender_offering_peace: number;
    reason: string;
    /** Nation id holding ground control (`0` if none). */
    ground_control: number;
    /** Nation id holding air superiority (`0` if none). */
    air_superiority: number;
    /** Nation id enforcing a blockade (`0` if none). */
    blockade: number;
    turns_left: number;
    aggressor_resistance: number;
    defender_resistance: number;
    war_type: string;
    aggressor_war_policy: string;
    defender_war_policy: string;
    att_attacks: number;
    def_attacks: number;
    att_gas_used: number;
    def_gas_used: number;
    att_mun_used: number;
    def_mun_used: number;
    att_alum_used: number;
    def_alum_used: number;
    att_steel_used: number;
    def_steel_used: number;
    att_infra_destroyed: number;
    def_infra_destroyed: number;
    att_money_looted: number;
    def_money_looted: number;
    att_soldiers_killed: number;
    def_soldiers_killed: number;
    att_tanks_killed: number;
    def_tanks_killed: number;
    att_aircraft_killed: number;
    def_aircraft_killed: number;
    att_ships_killed: number;
    def_ships_killed: number;
    att_missiles_used: number;
    def_missiles_used: number;
    att_nukes_used: number;
    def_nukes_used: number;
    /** Monetary value of the infrastructure the aggressor destroyed. */
    att_infra_destroyed_value: number;
    /** Monetary value of the infrastructure the defender destroyed. */
    def_infra_destroyed_value: number;
}

/** Maps each data-dump category to its row interface. */
export interface DataDumpRowMap {
    alliances: AllianceRow;
    cities: CityRow;
    nations: NationRow;
    trades: TradeRow;
    wars: WarRow;
}
