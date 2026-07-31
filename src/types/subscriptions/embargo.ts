export interface EmbargoSubscriptionFields {
  id: number;
  date: string;
  sender_id: number;
  receiver_id: number;
  reason: string;
  type: string;
}
