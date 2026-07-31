import { MutationBuilder } from "../../services/mutationBuilder";
import type { TaxBracketFields } from "../../types/queries/taxBrackets";
import type { CreateTaxBracketArgs } from "../../types/mutations/createTaxBracket";

export class CreateTaxBracketMutation extends MutationBuilder<TaxBracketFields, CreateTaxBracketArgs>
{
    protected mutationName = "createTaxBracket";
}
