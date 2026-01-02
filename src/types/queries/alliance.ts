import type { SortOrder } from "../others.js";
import type { AlliancePositionFields } from "./alliancePosition.js";
import type { BankTaxrecFields } from "./bankTaxRec.js";
import type { BulletinFields } from "./bullentin.js";
import type { NationFields } from "./nation.js";
import type { TaxBracketFields } from "./taxBrackets.js";
import type { WarFields } from "./war.js";

export interface AllianceFields {
  __typename?: 'Alliance';
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

export interface AllianceQueryParams {
  id?: number[];
  name?: string[];
  color?: string[];
  orderBy?: QueryAlliancesOrderByOrderByClause[];
}

export interface AllianceRelations {
  alliance_positions: AlliancePositionFields[];
  bankrecs: BankTaxrecFields[];
  bulletins: BulletinFields[];
  nations: NationFields[];
  taxrecs: BankTaxrecFields[];
  tax_brackets: TaxBracketFields[];
  wars: WarFields[];
}

export type QueryAlliancesOrderByOrderByClause = {
  column: QueryAlliancesOrderByColumn;
  order: SortOrder;
}

export type QueryAlliancesOrderByColumn = 
  | 'ID'
  | 'NAME'
  | 'DATE'