import type { DefaultParams } from "../others.js"

export interface TradepriceFields {
    id: string
    date: string
    coal: number
    oil: number
    uranium: number
    iron: number
    bauxite: number
    lead: number
    gasoline: number
    munitions: number
    steel: number
    aluminum: number
    food: number
    credits: number
}

export interface TradePricesQueryParams extends DefaultParams {}

export interface TradePricesRelations {}