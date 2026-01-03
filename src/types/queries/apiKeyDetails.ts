import type { NationFields } from "./nation.js";

export interface ApiKeyDetailsFields {
  __typename?: 'ApiKeyDetails';
  key?: string;
  requests?: number;
  max_requests?: number;
  permissions?: ApiKeyPermissions;
  permission_bits?: number;
}

export interface ApiKeyPermissions {
    nation_view_resources: boolean
    nation_deposit_to_bank: boolean
    nation_military_buys: boolean
    nation_see_reset_timers: boolean
    nation_see_spies: boolean
    nation_view_trades: boolean
    nation_accept_trade: boolean
    nation_send_message: boolean
    alliance_view_bank: boolean
    alliance_withdraw_bank: boolean
    alliance_change_permissions: boolean
    alliance_see_spies: boolean
    alliance_see_reset_timers: boolean
    alliance_tax_brackets: boolean
    alliance_accept_applicants: boolean
    alliance_remove_members: boolean
    alliance_manage_treaties: boolean
    alliance_promote_self_to_leader: boolean
}

export interface ApiKeyDetailsQueryParams {}

export interface ApiKeyDetailsRelations {
  nation: NationFields;
}