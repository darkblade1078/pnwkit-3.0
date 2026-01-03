export interface GameInfoFields {
    game_date: string
    radiation: Radiation
    city_average: number
}

export interface GameInfoQueryParams {}

export interface GameInfoRelations {}

export interface Radiation {
    global: number
    north_america: number
    south_america: number
    europe: number
    africa: number
    asia: number
    australia: number
    antarctica: number
}