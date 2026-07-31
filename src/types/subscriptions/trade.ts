export interface TradeSubscriptionFields {
  id: number;
  type: string;
  date: string;
  sender_id: number;
  receiver_id: number;
  offer_resource: string;
  offer_amount: number;
  buy_or_sell: string;
  price: number;
  accepted: number;
  date_accepted: string | null;
  original_trade_id: number;
}
