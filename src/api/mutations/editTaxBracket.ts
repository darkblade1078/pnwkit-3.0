import { MutationBuilder } from "../../services/mutationBuilder";
import type { TaxBracketFields } from "../../types/queries/taxBrackets";
import type { EditTaxBracketArgs } from "../../types/mutations/editTaxBracket";

export class EditTaxBracketMutation extends MutationBuilder<TaxBracketFields, EditTaxBracketArgs>
{
    protected mutationName = "editTaxBracket";
}
