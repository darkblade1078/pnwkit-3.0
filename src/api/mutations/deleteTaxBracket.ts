import { MutationBuilder } from "../../services/mutationBuilder";
import type { TaxBracketFields } from "../../types/queries/taxBrackets";
import type { DeleteTaxBracketArgs } from "../../types/mutations/deleteTaxBracket";

export class DeleteTaxBracketMutation extends MutationBuilder<TaxBracketFields, DeleteTaxBracketArgs>
{
    protected mutationName = "deleteTaxBracket";
}
