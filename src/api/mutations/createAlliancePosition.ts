import { MutationBuilder } from "../../services/mutationBuilder";
import type { AlliancePositionFields } from "../../types/queries/alliancePosition";
import type { CreateAlliancePositionArgs } from "../../types/mutations/createAlliancePosition";

export class CreateAlliancePositionMutation extends MutationBuilder<AlliancePositionFields, CreateAlliancePositionArgs>
{
    protected mutationName = "createAlliancePosition";
}
