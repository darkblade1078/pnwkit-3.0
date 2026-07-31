import { MutationBuilder } from "../../services/mutationBuilder";
import type { BankTaxrecFields } from "../../types/queries/bankTaxRec";
import type { BankWithdrawArgs } from "../../types/mutations/bankWithdraw";

export class BankWithdrawMutation extends MutationBuilder<BankTaxrecFields, BankWithdrawArgs>
{
    protected mutationName = "bankWithdraw";
}
