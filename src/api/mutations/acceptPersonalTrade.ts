import { MutationBuilder } from "../../services/mutationBuilder";
import type { TradeFields } from "../../types/queries/trade";
import type { AcceptPersonalTradeArgs } from "../../types/mutations/acceptPersonalTrade";

export class AcceptPersonalTradeMutation extends MutationBuilder<TradeFields, AcceptPersonalTradeArgs>
{
    protected mutationName = "acceptPersonalTrade";
}
