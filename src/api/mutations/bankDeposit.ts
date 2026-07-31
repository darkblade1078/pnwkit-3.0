import { MutationBuilder } from "../../services/mutationBuilder";
import type { BankTaxrecFields } from "../../types/queries/bankTaxRec";
import type { BankDepositArgs } from "../../types/mutations/bankDeposit";

export class BankDepositMutation extends MutationBuilder<BankTaxrecFields, BankDepositArgs>
{
    protected mutationName = "bankDeposit";
}
