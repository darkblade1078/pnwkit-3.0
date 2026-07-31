import { MutationBuilder } from "../../services/mutationBuilder";
import type { TreatyFields } from "../../types/queries/treaties";
import type { ProposeTreatyArgs } from "../../types/mutations/proposeTreaty";

export class ProposeTreatyMutation extends MutationBuilder<TreatyFields, ProposeTreatyArgs>
{
    protected mutationName = "proposeTreaty";
}
