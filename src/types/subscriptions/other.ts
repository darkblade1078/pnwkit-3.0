export type Model =
  | "alliance"
  | "alliance_position"
  | "bankrec"
  | "bbgame"
  | "bbteam"
  | "bounty"
  | "city"
  | "nation"
  | "tax_bracket"
  | "trade"
  | "treaty"
  | "warattack"
  | "war"
  | "treasure_trade"
  | "embargo"
  | "account";

export type Event = 
  | "create"
  | "update"
  | "delete";

export interface EventTime {
  millis: number; 
  nanos: number
}

export interface EventMetadata {
  after: EventTime;
  crc32: number;
  max: EventTime;
}

export interface SubscriptionParams {
  id?: string;
  sender_id?: string;
  sender_type?: string;
  receiver_id?: string;
  receiver_type?: string;
  or_id?: string;
  team_id?: string;
  nation_id?: string;
  alliance_id?: string;
  offer_resource?: string;
  buy_or_sell?: string;
  war_id?: string;
  att_alliance_id?: string;
  def_alliance_id?: string;
}

export interface subscriptionData {
  model: Model, 
  event: Event, 
  callback: Function, 
  params?: SubscriptionParams, 
  bulk?: boolean,
}