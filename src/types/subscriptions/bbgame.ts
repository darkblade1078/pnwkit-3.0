export interface BBGameSubscriptionFields {
  id: number;
  date: string;
  home_id: number;
  away_id: number | null;
  home_nation_id: number;
  away_nation_id: number | null;
  stadium_name: string;
  home_score: number | null;
  away_score: number | null;
  sim_text: string;
  highlights: string | null;
  home_revenue: number | null;
  spoils: number | null;
  open: number;
  wager: number;
}
