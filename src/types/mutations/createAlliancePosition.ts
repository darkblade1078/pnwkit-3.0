export interface CreateAlliancePositionArgs {
  name: string;
  level: number;
  view_bank?: boolean;
  withdraw_bank?: boolean;
  change_permissions?: boolean;
  see_spies?: boolean;
  see_reset_timers?: boolean;
  tax_brackets?: boolean;
  post_announcements?: boolean;
  manage_announcements?: boolean;
  accept_applicants?: boolean;
  remove_members?: boolean;
  edit_alliance_info?: boolean;
  manage_treaties?: boolean;
  manage_market_share?: boolean;
  manage_embargoes?: boolean;
  promote_self_to_leader?: boolean;
}
