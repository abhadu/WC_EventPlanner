import { NextRequest } from "next/server"
import { sportOptions } from "../../../options"
import { DetailedTeam, Match, Result } from "@/lib/types"
import { ResultWrapper, logoEndpoint } from "../../../utils"

export async function GET(request: NextRequest, { params }: {
    params: { matchId: number }
}) {
    let result: Result
    const endpoint = `${process.env.SPORTS_API_ENDPOINT}/mcenter/v1/${params.matchId}`
    
    try {
        const res = await fetch(endpoint, sportOptions)

        if (res.ok) {
            const data = await res.json()
            const _matchInfo = data.matchInfo
            const matches: Match<DetailedTeam>[] = [{
                id: _matchInfo.matchId,
                state: _matchInfo.state,
                venue: {
                    ground: _matchInfo.venue.name,
                    city: _matchInfo.venue.city
                },
                timestamp: {
                    start: _matchInfo.matchStartTimestamp,
                    end: _matchInfo.matchCompleteTimestamp
                },
                teams: [{
                    id: _matchInfo.team1.id,
                    name: _matchInfo.team1.name,
                    logo: logoEndpoint(_matchInfo.team1.name),
                    players: (_matchInfo.team1.playerDetails as any[])
                        .map(player => {
                            return {
                                id: player.id,
                                name: player.name,
                                role: player.role,
                                battingStyle: player.battingStyle,
                                img: player.faceImageId
                            }
                        })
                }, {
                    id: _matchInfo.team2.id,
                    name: _matchInfo.team2.name,
                    logo: logoEndpoint(_matchInfo.team2.name),
                    players: (_matchInfo.team2.playerDetails as any[])
                        .map(player => {
                            return {
                                id: player.id,
                                name: player.name,
                                role: player.role,
                                battingStyle: player.battingStyle,
                                img: player.faceImageId
                            }
                        })
                }]
            }]

            result = ResultWrapper<Match<DetailedTeam>[]>(matches)
        } else {
            result = ResultWrapper(null, 'some internal error!')
        }
    } catch(e) {
        result = ResultWrapper(null, e.message)
    }

    return Response.json(result)
}