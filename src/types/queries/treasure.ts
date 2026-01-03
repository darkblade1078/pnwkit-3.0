import type { NationFields } from "./nation.js";

export interface TreasureFields {
  name?: string;
  color?: string;
  continent?: string;
  bonus?: number;
  spawn_date?: string;
  nation_id?: string;
}

export interface TreasureQueryParams {}

export interface TreasureRelations {
  nation: NationFields;
}