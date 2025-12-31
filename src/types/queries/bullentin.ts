export interface BulletinFields {
  id?: string;
  nation_id?: string;
  alliance_id?: string;
  type?: number;
  headline?: string;
  excerpt?: string;
  image?: string;
  body?: string;
  author?: string;
  pinned?: boolean;
  like_count?: number;
  replies_enabled?: boolean;
  locked?: boolean;
  date?: string;
  edit_date?: string;
  archived?: boolean;
}