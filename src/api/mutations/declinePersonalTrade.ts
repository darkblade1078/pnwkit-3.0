import { MutationBuilder } from "../../services/mutationBuilder";
import type { TradeFields } from "../../types/queries/trade";
import type { DeclinePersonalTradeArgs } from "../../types/mutations/declinePersonalTrade";

export class DeclinePersonalTradeMutation extends MutationBuilder<TradeFields, DeclinePersonalTradeArgs>
{
    protected mutationName = "declinePersonalTrade";
}
