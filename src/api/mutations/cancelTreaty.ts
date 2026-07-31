import { MutationBuilder } from "../../services/mutationBuilder";
import type { TreatyFields } from "../../types/queries/treaties";
import type { CancelTreatyArgs } from "../../types/mutations/cancelTreaty";

export class CancelTreatyMutation extends MutationBuilder<TreatyFields, CancelTreatyArgs>
{
    protected mutationName = "cancelTreaty";
}
