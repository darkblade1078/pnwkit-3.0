export interface TradeFields {
  id?: string;
  type?: string;
  date?: string;
  sender_id?: string;
  receiver_id?: string;
  offer_resource?: string;
  offer_amount?: number;
  buy_or_sell?: string;
  price?: number;
  accepted?: boolean;
  date_accepted?: string;
  original_trade_id?: string;
}