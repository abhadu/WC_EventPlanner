export interface Team {
    id: number
    name: string
    logo: string
}

export interface DetailedTeam extends Team {
    players: Player[]
}

export interface Player {
    id: number
    name: string
    img: string
    role: string
    battingStyle: string
}

export interface Match<T extends DetailedTeam | Team> {
    id: number
    state: string
    teams: Array<T>
    venue: Venue
    timestamp: {
        start: string
        end: string
    }
}

export interface Result {
    success: Boolean
    error: string
    data: any | any[]
}

export interface Venue {
    ground: string
    city: string
}

export interface DetailedVenue extends Venue {
    country: string
    timezone: string
    capacity: number
    ends: string
    homeTeam: string
    logo: string
}

export interface Place {
    name: string
    image?: string
    address: string
    website?: string
}

export type ClientResponse = Result | null