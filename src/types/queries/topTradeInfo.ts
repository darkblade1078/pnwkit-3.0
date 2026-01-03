import type { TradeFields } from "./trade.js"

export interface TopTradeInfo {
    market_index: number
    resources: TopTradeResourceInfo[]
}

export interface TopTradeResourceInfo {
    resource: string
    average_price: number
    best_buy_offer: TradeFields
    best_sell_offer: TradeFields
}

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