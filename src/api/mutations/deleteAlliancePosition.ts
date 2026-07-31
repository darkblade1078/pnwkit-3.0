import { MutationBuilder } from "../../services/mutationBuilder";
import type { AlliancePositionFields } from "../../types/queries/alliancePosition";
import type { DeleteAlliancePositionArgs } from "../../types/mutations/deleteAlliancePosition";

export class DeleteAlliancePositionMutation extends MutationBuilder<AlliancePositionFields, DeleteAlliancePositionArgs>
{
    protected mutationName = "deleteAlliancePosition";
}
