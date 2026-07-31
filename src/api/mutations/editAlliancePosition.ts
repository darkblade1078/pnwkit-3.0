import { MutationBuilder } from "../../services/mutationBuilder";
import type { AlliancePositionFields } from "../../types/queries/alliancePosition";
import type { EditAlliancePositionArgs } from "../../types/mutations/editAlliancePosition";

export class EditAlliancePositionMutation extends MutationBuilder<AlliancePositionFields, EditAlliancePositionArgs>
{
    protected mutationName = "editAlliancePosition";
}
