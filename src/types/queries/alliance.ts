import type { NationFields } from "./nation.js";
import type { WarFields } from "./war.js";

export interface AllianceFields {
  id?: string;
  name?: string;
  acronym?: string;
  score?: number;
  color?: string;
  date?: string;
  average_score?: number;
  accept_members?: boolean;
  flag?: string;
  forum_link?: string;
  discord_link?: string;
  wiki_link?: string;
  money?: number;
  coal?: number;
  oil?: number;
  uranium?: number;
  iron?: number;
  bauxite?: number;
  lead?: number;
  gasoline?: number;
  munitions?: number;
  steel?: number;
  aluminum?: number;
  food?: number;
  rank?: number;
}