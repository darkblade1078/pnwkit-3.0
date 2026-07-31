export interface AllianceSubscriptionFields {
  id: number;
  name: string;
  acronym: string;
  score: number;
  color: string;
  date: string;
  accept_members: number;
  flag: string;
  forum_link: string;
  discord_link: string;
  wiki_link: string;
  money: number | null;
  coal: number | null;
  oil: number | null;
  uranium: number | null;
  iron: number | null;
  bauxite: number | null;
  lead: number | null;
  gasoline: number | null;
  munitions: number | null;
  steel: number | null;
  aluminum: number | null;
  food: number | null;
}
