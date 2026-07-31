import { MutationBuilder } from "../../services/mutationBuilder";
import type { AlliancePositionFields } from "../../types/queries/alliancePosition";
import type { AssignAlliancePositionArgs } from "../../types/mutations/assignAlliancePosition";

export class AssignAlliancePositionMutation extends MutationBuilder<AlliancePositionFields, AssignAlliancePositionArgs>
{
    protected mutationName = "assignAlliancePosition";
}
