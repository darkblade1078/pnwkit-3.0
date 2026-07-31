import type PnwKitApi from "../index";
import { BankDepositMutation } from "./bankDeposit";
import { BankWithdrawMutation } from "./bankWithdraw";
import { ApproveTreatyMutation } from "./approveTreaty";
import { CancelTreatyMutation } from "./cancelTreaty";
import { ProposeTreatyMutation } from "./proposeTreaty";
import { AssignTaxBracketMutation } from "./assignTaxBracket";
import { CreateTaxBracketMutation } from "./createTaxBracket";
import { DeleteTaxBracketMutation } from "./deleteTaxBracket";
import { EditTaxBracketMutation } from "./editTaxBracket";
import { AcceptPersonalTradeMutation } from "./acceptPersonalTrade";
import { DeclinePersonalTradeMutation } from "./declinePersonalTrade";
import { AssignAlliancePositionMutation } from "./assignAlliancePosition";
import { CreateAlliancePositionMutation } from "./createAlliancePosition";
import { DeleteAlliancePositionMutation } from "./deleteAlliancePosition";
import { EditAlliancePositionMutation } from "./editAlliancePosition";

export {
    BankDepositMutation, BankWithdrawMutation,
    ApproveTreatyMutation, CancelTreatyMutation, ProposeTreatyMutation,
    AssignTaxBracketMutation, CreateTaxBracketMutation, DeleteTaxBracketMutation, EditTaxBracketMutation,
    AcceptPersonalTradeMutation, DeclinePersonalTradeMutation,
    AssignAlliancePositionMutation, CreateAlliancePositionMutation,
    DeleteAlliancePositionMutation, EditAlliancePositionMutation,
};

/**
 * Container class for all Politics & War GraphQL mutations.
 *
 * Provides factory methods that return a fresh, independent mutation builder for
 * each mutation. Accessed via `pnwkit.mutations`.
 *
 * @example
 * ```typescript
 * await pnwkit.mutations.bankWithdraw()
 *   .set({ receiver: 738355, receiver_type: 1, money: 1_000_000 })
 *   .select('id', 'money', 'note')
 *   .execute();
 * ```
 *
 * @category Mutations
 */
export default class Mutations
{
    /** @internal */
    constructor(private kit: PnwKitApi) {}

    bankDeposit() { return new BankDepositMutation(this.kit); }
    bankWithdraw() { return new BankWithdrawMutation(this.kit); }

    approveTreaty() { return new ApproveTreatyMutation(this.kit); }
    cancelTreaty() { return new CancelTreatyMutation(this.kit); }
    proposeTreaty() { return new ProposeTreatyMutation(this.kit); }

    assignTaxBracket() { return new AssignTaxBracketMutation(this.kit); }
    createTaxBracket() { return new CreateTaxBracketMutation(this.kit); }
    deleteTaxBracket() { return new DeleteTaxBracketMutation(this.kit); }
    editTaxBracket() { return new EditTaxBracketMutation(this.kit); }

    acceptPersonalTrade() { return new AcceptPersonalTradeMutation(this.kit); }
    declinePersonalTrade() { return new DeclinePersonalTradeMutation(this.kit); }

    assignAlliancePosition() { return new AssignAlliancePositionMutation(this.kit); }
    createAlliancePosition() { return new CreateAlliancePositionMutation(this.kit); }
    deleteAlliancePosition() { return new DeleteAlliancePositionMutation(this.kit); }
    editAlliancePosition() { return new EditAlliancePositionMutation(this.kit); }
}
