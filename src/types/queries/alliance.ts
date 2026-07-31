import type { GraphQLEnum } from "../../enum";
import type { DefaultParams, SortOrder } from "../others";
import type { AlliancePositionFields } from "./alliancePosition";
import type { BankTaxrecFields } from "./bankTaxRec";
import type { BulletinFields } from "./bulletin";
import type { NationFields } from "./nation";
import type { TaxBracketFields } from "./taxBrackets";
import type { WarFields } from "./war";

export interface AllianceFields {
  __typename?: 'alliances';
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

export interface AllianceQueryParams extends DefaultParams {
  id?: number[];
  name?: string[];
  color?: string[];
  orderBy?: QueryAlliancesOrderByOrderByClause;
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
  column: GraphQLEnum<QueryAlliancesOrderByColumn>;
  order: GraphQLEnum<SortOrder>;
}

export type QueryAlliancesOrderByColumn = 
  | 'ID'
  | 'DATE'
  | 'SCORE'