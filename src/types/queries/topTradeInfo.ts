import type { TradeFields } from "./trade.js"

export interface TopTradeInfoFields {
    __typename?: 'top_trade_info'
    market_index?: number
}

export interface TopTradeResourceInfoFields {
    __typename?: 'TopTradeResourceInfo'
    resource?: string
    average_price?: number
    best_buy_offer?: TradeFields
    best_sell_offer?: TradeFields
}

export interface TopTradeInfoRelations {
    resources: TopTradeResourceInfoFields[]
}

export interface TopTradeResourceInfoRelations {}

export type TopTradeInfoQueryParams = {}

export enum Resources {
    FOOD = 'FOOD',
    COAL = 'COAL',
    OIL = 'OIL',
    URANIUM = 'URANIUM',
    LEAD = 'LEAD',
    IRON = 'IRON',
    BAUXITE = 'BAUXITE',
    GASOLINE = 'GASOLINE',
    MUNITIONS = 'MUNITIONS',
    STEEL = 'STEEL',
    ALUMINUM = 'ALUMINUM',
    CREDIT = 'CREDIT',
}

export type TopTradeInfoResourceQueryParams = {
    resource: (Resources | `${Resources}`)[]
}