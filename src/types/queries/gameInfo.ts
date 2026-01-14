export interface GameInfoFields {
    game_date?: string
    city_average?: number
}

export interface GameInfoQueryParams {}

export interface GameInfoRelations {
    radiation: RadiationFields
}

export interface RadiationFields {
    global?: number
    north_america?: number
    south_america?: number
    europe?: number
    africa?: number
    asia?: number
    australia?: number
    antarctica?: number
}