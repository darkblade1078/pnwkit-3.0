import type { DefaultParams, SortOrder } from "../others.js";
import type { NationFields } from "./nation.js";
import type { WarFields } from "./war.js";

export interface WarAttackFields {
    id?: string;
    date?: string;
    att_id?: string;
    def_id?: string;
    type?: string;
    war_id?: string;
    victor?: string;
    success?: number;
    city_id?: string;
    infra_destroyed?: number;
    money_stolen?: number;
    resistance_lost?: number;
    city_infra_before?: number;
    infra_destroyed_value?: number;
    att_mun_used?: number;
    def_mun_used?: number;
    att_gas_used?: number;
    def_gas_used?: number;
    money_destroyed?: number;
    military_salvage_aluminum?: number;
    military_salvage_steel?: number;
    att_soldiers_used?: number;
    att_soldiers_lost?: number;
    def_soldiers_used?: number;
    def_soldiers_lost?: number;
    att_tanks_used?: number;
    att_tanks_lost?: number;
    def_tanks_used?: number;
    def_tanks_lost?: number;
    att_aircraft_used?: number;
    att_aircraft_lost?: number;
    def_aircraft_used?: number;
    def_aircraft_lost?: number;
    att_ships_used?: number;
    att_ships_lost?: number;
    def_ships_used?: number;
    def_ships_lost?: number;
    att_missiles_lost?: number;
    def_missiles_lost?: number;
    att_nukes_lost?: number;
    def_nukes_lost?: number;
    improvements_destroyed?: string[];
    infra_destroyed_percentage?: number;
    cities_infra_before?: boolean;
    money_looted?: number;
    coal_looted?: number;
    oil_looted?: number;
    uranium_looted?: number;
    iron_looted?: number;
    bauxite_looted?: number;
    lead_looted?: number;
    gasoline_looted?: number;
    munitions_looted?: number;
    steel_looted?: number;
    aluminum_looted?: number;
    food_looted?: number;
}

export interface WarAttackQueryParams extends DefaultParams {
    id?: number[];
    min_id?: number;
    max_id?: number;
    before?: string;
    after?: string;
    war_id?: number[];
    orderBy?: QueryWarAttacksOrderByOrderByClause;
}

export type QueryWarAttacksOrderByColumn = 
    | 'ID'
    | 'DATE'

export type QueryWarAttacksOrderByOrderByClause = {
    column: QueryWarAttacksOrderByColumn;
    order: SortOrder;
};

export interface WarAttackRelations {
    attacker: NationFields;
    defender: NationFields;
    war: WarFields;
}

export interface CityInfraDamage {
    id: string;
    infrastructure: number;
}