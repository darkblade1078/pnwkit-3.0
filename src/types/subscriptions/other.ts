import type { TaxBracketFields } from "../queries/taxBrackets";
import type { TreasureTradeFields } from "../queries/treasureTrades";
import type { TreatyFields } from "../queries/treaties";
import type { AccountSubscriptionFields } from "./account";
import type { NationSubscriptionFields } from "./nation";
import type { WarSubscriptionFields } from "./war";
import type { WarAttackSubscriptionFields } from "./warattack";
import type { AllianceSubscriptionFields } from "./alliance";
import type { BankrecSubscriptionFields } from "./bankrec";
import type { BBGameSubscriptionFields } from "./bbgame";
import type { BBTeamSubscriptionFields } from "./bbteam";
import type { CitySubscriptionFields } from "./city";
import type { BountySubscriptionFields } from "./bounty";
import type { AlliancePositionSubscriptionFields } from "./alliancePosition";
import type { EmbargoSubscriptionFields } from "./embargo";
import type { TradeSubscriptionFields } from "./trade";

/**
 * Maps each subscribable model to the shape of the payload its events deliver.
 *
 * Used to type `onData` in {@link SubscribeOptions} — subscribing to a model
 * gives you callbacks typed with that model's fields (the same `*Fields` types
 * the query builders return).
 *
 * @category Subscriptions
 */
export interface SubscriptionModels {
  nation: NationSubscriptionFields;
  war: WarSubscriptionFields;
  city: CitySubscriptionFields;
  alliance: AllianceSubscriptionFields;
  alliance_position: AlliancePositionSubscriptionFields;
  bankrec: BankrecSubscriptionFields;
  bbgame: BBGameSubscriptionFields;
  bbteam: BBTeamSubscriptionFields;
  bounty: BountySubscriptionFields;
  tax_bracket: TaxBracketFields;
  trade: TradeSubscriptionFields;
  treaty: TreatyFields;
  warattack: WarAttackSubscriptionFields;
  treasure_trade: TreasureTradeFields;
  embargo: EmbargoSubscriptionFields;
  account: AccountSubscriptionFields;
}

/**
 * A model that can be subscribed to (the keys of {@link SubscriptionModels}).
 * @category Subscriptions
 */
export type Model = keyof SubscriptionModels;

/**
 * The lifecycle events a subscription can listen for.
 * @category Subscriptions
 */
export type Event =
  | "create"
  | "update"
  | "delete";

/**
 * A point in time as delivered by the subscription metadata, used to request a
 * rollback of missed events after a reconnect.
 * @category Subscriptions
 */
export interface EventTime {
  /** Milliseconds since the epoch. */
  millis: number;
  /** Sub-millisecond nanosecond component. */
  nanos: number;
}

/**
 * Metadata sent alongside events, used to track position in the stream and
 * verify integrity so missed events can be replayed on reconnect.
 * @category Subscriptions
 */
export interface EventMetadata {
  /** Time of the previous event. */
  after: EventTime;
  /** Checksum of the event batch. */
  crc32: number;
  /** Time of the most recent event (the rollback anchor). */
  max: EventTime;
}

/**
 * Optional server-side filters that narrow which events a subscription receives.
 *
 * Which keys are meaningful depends on the model (e.g. `alliance_id` for
 * nations, `war_id` for war attacks). All values are strings — they are sent as
 * URL query parameters.
 *
 * @category Subscriptions
 */
export interface SubscriptionParams {
  id?: string;
  /** Sender nation/alliance id (bank records, trades). */
  sender_id?: string;
  /** Whether the sender is a nation (1) or alliance (2). */
  sender_type?: string;
  /** Receiver nation/alliance id. */
  receiver_id?: string;
  /** Whether the receiver is a nation (1) or alliance (2). */
  receiver_type?: string;
  /** Match records where the sender *or* receiver id equals this. */
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

/**
 * Options for {@link Subscriptions.subscribe}.
 *
 * @template M - The model being subscribed to; drives the type of `onData`.
 * @template Bulk - Whether this is a bulk subscription (delivers arrays).
 *
 * @example
 * ```typescript
 * await pnwkit.subscriptions.subscribe({
 *   model: "nation",
 *   event: "update",
 *   filters: { alliance_id: "1234" },
 *   onData: (nation) => console.log(nation.id, nation.nation_name),
 * });
 * ```
 *
 * @category Subscriptions
 */
export interface SubscribeOptions<M extends Model, Bulk extends boolean = false> {
  /** The model to subscribe to. */
  model: M;
  /** The lifecycle event to listen for. */
  event: Event;
  /** Optional server-side filters to narrow the event stream. */
  filters?: SubscriptionParams;
  /** Optional API key to authenticate this subscription with, overriding the client's default key. */
  apiKey?: string;
  /** Set to `true` to receive batched events as arrays instead of one at a time. */
  bulk?: Bulk;
  /**
   * Called for each event, with the payload typed to the subscribed model
   * (an array when `bulk` is `true`).
   */
  onData: (data: Bulk extends true ? SubscriptionModels[M][] : SubscriptionModels[M]) => void;
  /** Optional handler for network/parse/rollback errors on this subscription. */
  onError?: (error: Error) => void;
}
