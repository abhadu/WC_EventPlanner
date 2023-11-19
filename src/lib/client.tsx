import { ClientResponse, Result } from "./types"

export const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL + '/api/v1/'

async function ClientResponseWrapper(res: Response): Promise<ClientResponse> {
    return res.ok ? res.json() as Promise<Result> : null
}

export async function getNextMatch() {
    const res = await fetch(ServerURL + '/matches/upcoming/next', {
        method: 'GET'
    })

    return ClientResponseWrapper(res)
}

export async function getAllUpcoming() {
    const res = await fetch(ServerURL + '/matches/upcoming/all', {
        method: 'GET'
    })

    return ClientResponseWrapper(res)
}

export async function getVenues() {
    const res = await fetch(ServerURL + 'worldcup/6732/venues', {
        method: 'GET'
    })

    return ClientResponseWrapper(res)
}

export async function getMatchDetailedInfo(matchId: number) {
    const res = await fetch(`${ServerURL}/worldcup/matches/${matchId}`, {
        method: 'GET'
    })

    return ClientResponseWrapper(res)
}

export async function getTopPlaces() {
    const res = await fetch(`${ServerURL}/places`, {
        method: 'GET'
    })

    return ClientResponseWrapper(res)
}