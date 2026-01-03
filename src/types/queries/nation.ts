import type { AllianceFields } from "./alliance.js";
import type { AlliancePositionFields } from "./alliancePosition.js";
import type { AwardFields } from "./award.js";
import type { BankTaxrecFields } from "./bankTaxRec.js";
import type { BountyFields } from "./bounty.js";
import type { BulletinFields } from "./bullentin.js";
import type { BulletinReplyFields } from "./bullentinReplies.js";
import type { CityFields } from "./cities.js";
import type { TradeFields } from "./trade.js";
import type { TreasureFields } from "./treasure.js";
import type { WarFields } from "./war.js";
import type { DefaultParams, SortOrder } from "../others.js";

export interface NationFields {
  __typename?: 'Nation';
  id?: string;
  alliance_id?: number;
  alliance_position?: string;
  alliance_position_id?: number;
  nation_name?: string;
  leader_name?: string;
  continent?: string;
  war_policy?: warPolicy;
  war_policy_turns?: number;
  domestic_policy?: domesticPolicy;
  domestic_policy_turns?: number;
  color?: string;
  num_cities?: number;
  score?: number;
  update_tz?: number;
  population?: number;
  flag?: string;
  vacation_mode_turns?: number;
  beige_turns?: number;
  espionage_available?: boolean;
  last_active?: string;
  date?: string;
  soldiers?: number;
  tanks?: number;
  aircraft?: number;
  ships?: number;
  missiles?: number;
  nukes?: number;
  spies?: number;
  soldiers_today?: number;
  tanks_today?: number;
  aircraft_today?: number;
  ships_today?: number;
  missiles_today?: number;
  nukes_today?: number;
  spies_today?: number;
  discord?: string;
  discord_id?: string;
  turns_since_last_city?: number;
  turns_since_last_project?: number;
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
  credits?: number;
  projects?: number;
  project_bits?: string;
  iron_works?: boolean;
  bauxite_works?: boolean;
  arms_stockpile?: boolean;
  emergency_gasoline_reserve?: boolean;
  mass_irrigation?: boolean;
  international_trade_center?: boolean;
  missile_launch_pad?: boolean;
  nuclear_research_facility?: boolean;
  iron_dome?: boolean;
  vital_defense_system?: boolean;
  central_intelligence_agency?: boolean;
  center_for_civil_engineering?: boolean;
  propaganda_bureau?: boolean;
  uranium_enrichment_program?: boolean;
  urban_planning?: boolean;
  advanced_urban_planning?: boolean;
  space_program?: boolean;
  spy_satellite?: boolean;
  moon_landing?: boolean;
  pirate_economy?: boolean;
  recycling_initiative?: boolean;
  telecommunications_satellite?: boolean;
  green_technologies?: boolean;
  arable_land_agency?: boolean;
  clinical_research_center?: boolean;
  specialized_police_training_program?: boolean;
  advanced_engineering_corps?: boolean;
  government_support_agency?: boolean;
  research_and_development_center?: boolean;
  metropolitan_planning?: boolean;
  military_salvage?: boolean;
  fallout_shelter?: boolean;
  activity_center?: boolean;
  bureau_of_domestic_affairs?: boolean;
  advanced_pirate_economy?: boolean;
  mars_landing?: boolean;
  surveillance_network?: boolean;
  guiding_satellite?: boolean;
  nuclear_launch_facility?: boolean;
  military_research_center?: boolean;
  military_doctrine?: boolean;
  moon_landing_date?: string;
  mars_landing_date?: string;
  wars_won?: number;
  wars_lost?: number;
  tax_id?: number;
  alliance_seniority?: number;
  gross_national_income?: number;
  gross_domestic_product?: number;
  soldier_casualties?: number;
  soldier_kills?: number;
  tank_casualties?: number;
  tank_kills?: number;
  aircraft_casualties?: number;
  aircraft_kills?: number;
  ship_casualties?: number;
  ship_kills?: number;
  missile_casualties?: number;
  missile_kills?: number;
  nuke_casualties?: number;
  nuke_kills?: number;
  spy_casualties?: number;
  spy_kills?: number;
  spy_attacks?: number;
  money_looted?: number;
  total_infrastructure_destroyed?: number;
  total_infrastructure_lost?: number;
  vip?: boolean;
  commendations?: number;
  denouncements?: number;
  offensive_wars_count?: number;
  defensive_wars_count?: number;
  economic_policy?: economicPolicy;
  social_policy?: socialPolicy;
  government_type?: govermentType;
  credits_redeemed_this_month?: number;
  alliance_join_date?: string;
  cities_discount?: number;
}

export interface NationQueryParams extends DefaultParams {
  id?: number[];
  min_id?: number[];
  max_id?: number[];
  nation_name?: string[];
  leader_name?: string[];
  alliance_id?: number[];
  alliance_position?: number[];
  alliance_position_id?: number[];
  color?: string[];
  created_before?: string;
  created_after?: string;
  active_since?: string;
  active_before?: string;
  min_score?: number;
  max_score?: number;
  cities?: number[];
  min_cities?: number;
  max_cities?: number;
  vmode?: boolean;
  discord?: string[];
  discord_id?: string[];
  tax_id?: number[];
  continent?: Continents[];
  orderBy?: QueryNationsOrderByOrderByClause;
}

export type QueryNationsOrderByOrderByClause = {
  column: QueryNationsOrderByColumn
  order: SortOrder
}

export type QueryNationsOrderByColumn = 
| 'ID'
| 'DATE'
| 'SOLDIERS'
| 'SOLDIERS_LOST'
| 'SOLDIER_KILLS'
| 'TANKS'
| 'TANKS_LOST'
| 'TANK_KILLS'
| 'AIRCRAFT'
| 'AIRCRAFT_LOST'
| 'AIRCRAFT_KILLS'
| 'SHIPS'
| 'SHIPS_LOST'
| 'SHIP_KILLS'
| 'MISSILES'
| 'MISSILES_LAUNCHED'
| 'MISSILES_EATEN'
| 'NUKES'
| 'NUKES_LAUNCHED'
| 'NUKES_EATEN'
| 'CITIES'
| 'SCORE'
| 'GDP'
| 'POPULATION'
| 'APPROVAL_RATING'
| 'INFRA_DESTROYED'
| 'INFRA_LOST'

export enum warPolicy {
  ATTRITION = "ATTRITION",
  TURTLE = "TURTLE",
  BLITZKRIEG = "BLITZKRIEG",
  FORTRESS = "FORTRESS",
  MONEYBAGS = "MONEYBAGS",
  PIRATE = "PIRATE",
  TACTICIAN = "TACTICIAN",
  GUARDIAN = "GUARDIAN",
  COVERT = "COVERT",
  ARCANE = "ARCANE",
}

export enum domesticPolicy {
  MANIFEST_DESTINY = "MANIFEST_DESTINY",
  OPEN_MARKETS = "OPEN_MARKETS",
  TECHNOLOGICAL_ADVANCEMENT = "TECHNOLOGICAL_ADVANCEMENT",
  IMPERIALISM = "IMPERIALISM",
  URBANIZATION = "URBANIZATION",
  RAPID_EXPANSION = "RAPID_EXPANSION",
}

export enum economicPolicy {
  EXTREME_LEFT = "EXTREME_LEFT",
  FAR_LEFT = "FAR_LEFT",
  LEFT = "LEFT",
  MODERATE = "MODERATE",
  RIGHT = "RIGHT",
  FAR_RIGHT = "FAR_RIGHT",
  EXTREME_RIGHT = "EXTREME_RIGHT",
}

export enum socialPolicy {
  ANARCHIST = "ANARCHIST",
  LIBERTARIAN = "LIBERTARIAN",
  LIBERAL = "LIBERAL",
  MODERATE = "MODERATE",
  CONSERVATIVE = "CONSERVATIVE",
  AUTHORITARIAN = "AUTHORITARIAN",
  FASCIST = "FASCIST",
}

export enum govermentType {
  ABSOLUTE_MONARCHY = "ABSOLUTE_MONARCHY",
  ANARCHY = "ANARCHY",
  ARISTOCRACY = "ARISTOCRACY",
  BANANA_REPUBLIC = "BANANA_REPUBLIC",
  COMMUNIST_DEMOCRACY = "COMMUNIST_DEMOCRACY",
  COMMUNIST_DICTATORSHIP = "COMMUNIST_DICTATORSHIP",
  COMMUNIST_MONARCHY = "COMMUNIST_MONARCHY",
  COMMUNIST_REPUBLIC = "COMMUNIST_REPUBLIC",
  COMMUNIST_THEOCRACY= "COMMUNIST_THEOCRACY",
  CONSTITUTIONAL_MONARCHY = "CONSTITUTIONAL_MONARCHY",
  CONSTITUTIONAL_REPUBLIC = "CONSTITUTIONAL_REPUBLIC",
  DEMARCHY = "DEMARCHY",
  DEMOCRACY = "DEMOCRACY",
  DEMOCRATIC_REPUBLIC = "DEMOCRATIC_REPUBLIC",
  DICTATORSHIP = "DICTATORSHIP",
  FEDERAL_REPUBLIC = "FEDERAL_REPUBLIC",
  MONARCHY = "MONARCHY",
  NOOCRACY = "NOOCRACY",
  OLIGARCHY = "OLIGARCHY",
  PARLIAMENTARY_DEMOCRACY = "PARLIAMENTARY_DEMOCRACY",
  PARLIAMENTARY_REPUBLIC = "PARLIAMENTARY_REPUBLIC",
  PEOPLES_REPUBLIC = "PEOPLES_REPUBLIC",
  REPUBLIC = "REPUBLIC",
  SOCIAL_DEMOCRACY = "SOCIAL_DEMOCRACY",
  SOCIALIST_DICTATORSHIP = "SOCIALIST_DICTATORSHIP",
  SOCIALIST_REPUBLIC = "SOCIALIST_REPUBLIC",
  SOCIALIST_THEOCRACY = "SOCIALIST_THEOCRACY",
  STRATOCRACY = "STRATOCRACY",
  TECHNOCRACY = "TECHNOCRACY",
  THEOCRACY = "THEOCRACY",
  THEOCRATIC_DEMOCRACY = "THEOCRATIC_DEMOCRACY",
  THEOCRATIC_DICTATORSHIP = "THEOCRATIC_DICTATORSHIP",
  THEOCRATIC_REPUBLIC = "THEOCRATIC_REPUBLIC",
}

export enum Continents {
  AFRICA = "AFRICA",
  ANTARCTICA = "ANTARCTICA",
  ASIA = "ASIA",
  AUSTRALIA = "AUSTRALIA",
  EUROPE = "EUROPE",
  NORTH_AMERICA = "NORTH_AMERICA",
  SOUTH_AMERICA = "SOUTH_AMERICA"
}

export interface NationRelations {
  alliance: AllianceFields;
  alliance_position_info: AlliancePositionFields;
  awards: AwardFields[];
  bankrecs: BankTaxrecFields[];
  bounties: BountyFields[];
  bulletins: BulletinFields[];
  bulletin_replies: BulletinReplyFields[];
  cities: CityFields[];
  trades: TradeFields[];
  taxrecs: BankTaxrecFields[];
  treasures: TreasureFields[];
  wars: WarFields[];
}