import { MutationBuilder } from "../../services/mutationBuilder";
import type { TreatyFields } from "../../types/queries/treaties";
import type { ApproveTreatyArgs } from "../../types/mutations/approveTreaty";

export class ApproveTreatyMutation extends MutationBuilder<TreatyFields, ApproveTreatyArgs>
{
    protected mutationName = "approveTreaty";
}
