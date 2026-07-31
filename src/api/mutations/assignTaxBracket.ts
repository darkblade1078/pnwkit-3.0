import { MutationBuilder } from "../../services/mutationBuilder";
import type { TaxBracketFields } from "../../types/queries/taxBrackets";
import type { AssignTaxBracketArgs } from "../../types/mutations/assignTaxBracket";

export class AssignTaxBracketMutation extends MutationBuilder<TaxBracketFields, AssignTaxBracketArgs>
{
    protected mutationName = "assignTaxBracket";
}
