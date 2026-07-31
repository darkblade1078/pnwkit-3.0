import type { BountyType } from "../queries/bounty";

export interface BountySubscriptionFields {
  id: number;
  date: string;
  nation_id: number;
  amount: number;
  type: BountyType;
}
