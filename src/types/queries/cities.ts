import type { DefaultParams, SortOrder } from "../others.js";
import type { NationFields } from "./nation.js";

export interface CityFields {
  id?: string;
  nation_id?: string;
  name?: string;
  date?: string;
  infrastructure?: number;
  land?: number;
  powered?: boolean;
  oil_power?: number;
  wind_power?: number;
  coal_power?: number;
  nuclear_power?: number;
  coal_mine?: number;
  oil_well?: number;
  uranium_mine?: number;
  barracks?: number;
  farm?: number;
  police_station?: number;
  hospital?: number;
  recycling_center?: number;
  subway?: number;
  supermarket?: number;
  bank?: number;
  shopping_mall?: number;
  stadium?: number;
  lead_mine?: number;
  iron_mine?: number;
  bauxite_mine?: number;
  oil_refinery?: number;
  aluminum_refinery?: number;
  steel_mill?: number;
  munitions_factory?: number;
  factory?: number;
  hangar?: number;
  drydock?: number;
  nuke_date?: string;
}

export interface CityQueryParams extends DefaultParams {
  id?: number[];
  nation_id?: number[];
  orderBy?: QueryCityOrderByOrderByClause;
}

export type QueryCityOrderByColumn = 
  | 'ID'
  | 'DATE'
  | 'INFRASTRUCTURE'
  | 'MAXINFRA'
  | 'LAND';

export type QueryCityOrderByOrderByClause = {
  column: QueryCityOrderByColumn;
  order: SortOrder;
}

export interface CityRelations {
  nation: NationFields;
}