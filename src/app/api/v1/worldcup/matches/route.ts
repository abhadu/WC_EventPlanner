import KVClient from "../cachedb";
import db from '../../db'
import { sportOptions } from "../../options";
import { Match, Result, Team } from "@/lib/types";
import { ResultWrapper, logoEndpoint } from "../../utils";

export async function GET() {
    let result: Result
    //const client = KVClient()
    const endpoint = `${process.env.SPORTS_API_ENDPOINT}/series/v1/${db.seriesId}`
    
    try {
        const res = await fetch(endpoint, sportOptions)

        if (res.ok) {
            const data = await res.json()
            const matches: Match<Team>[] = (data.matchDetails as any[])
                .map<Match<Team>>(matchDetail => {
                    let matchInfo = matchDetail.matchDetailMap.match[0].matchInfo
                    return {
                        id: matchInfo.matchId,
                        state: matchInfo.state,
                        venue: {
                            ground: matchInfo.venueInfo.ground,
                            city: matchInfo.venueInfo.city
                        },
                        teams: [{
                            id: matchInfo.team1.teamId,
                            name: matchInfo.team1.teamName,
                            logo: logoEndpoint(matchInfo.team1.teamName)
                        }, {
                            id: matchInfo.team2.teamId,
                            name: matchInfo.team2.teamName,
                            logo: logoEndpoint(matchInfo.team2.teamName)
                        }],
                        timestamp: {
                            start: matchInfo.startDate,
                            end: matchInfo.endDate
                        }
                    }
                })

            result = ResultWrapper<Match<Team>[]>(matches)
        } else {
            result = ResultWrapper(null, 'some internal error!')
        }
    } catch {
        result = ResultWrapper(null, 'some error on server side!')
    }

    return Response.json(result)
}