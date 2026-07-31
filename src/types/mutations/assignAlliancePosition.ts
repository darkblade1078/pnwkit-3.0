import type { GraphQLEnum } from "../../enum";

export type DefaultAlliancePosition =
  | 'REMOVE'
  | 'APPLICANT'
  | 'MEMBER'
  | 'OFFICER'
  | 'HEIR'
  | 'LEADER';

export interface AssignAlliancePositionArgs {
  id: number;
  default_position?: GraphQLEnum<DefaultAlliancePosition>;
  position_id?: number;
}
