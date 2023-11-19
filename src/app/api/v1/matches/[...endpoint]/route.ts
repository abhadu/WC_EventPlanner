import { NextRequest } from "next/server";
import { ResultWrapper } from "../../utils";
import { Result } from "@/lib/types";
import { sportOptions } from "../../options";


function Upcoming(data: any, upcomingType: string) {
    const typeMatches = (data.typeMatches as any[])
        .filter(typeMatch => typeMatch.matchType == 'International')

    if (typeMatches.length == 0)
        return ResultWrapper(null, 'world cup is over or coming soon!')

    const seriesMatches = (typeMatches[0].seriesMatches as any[])
        .filter(seriesMatch => seriesMatch?.seriesAdWrapper?.seriesName == 'ICC Cricket World Cup 2023')

    if (seriesMatches.length == 0)
        return ResultWrapper(null, 'no world cup matches remained!')

    let matches = seriesMatches[0].seriesAdWrapper.matches as any[]

    if (matches.length == 0)
        return ResultWrapper(null, 'no world cup matches found')
    if (upcomingType == 'next')
        matches = Array(matches[0])

    return ResultWrapper(
        matches.map(match => {
            const matchInfo = match.matchInfo

            return {
                id: matchInfo.matchId,
                teams: [{
                    name: matchInfo.team1.teamName,
                    logo: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/img/${matchInfo.team1.imageId}.jpg`
                }, {
                    name: matchInfo.team2.teamName,
                    logo: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/img/${matchInfo.team2.imageId}.jpg`
                }],
                venue: matchInfo.venueInfo.city,
                timestamp: {
                    start: matchInfo.startDate,
                    end: matchInfo.endDate
                }
            }
        })
    )
}

export async function GET(
    request: NextRequest,
    { params }: { params: { endpoint: Array<string> } }
) {
    let result: Result
    let callback: Function | undefined

    if (params.endpoint.length == 2 && params.endpoint[0] == 'upcoming') callback = Upcoming

    const endpoint: RequestInfo = `${process.env.SPORTS_API_ENDPOINT}/matches/v1/${params.endpoint[0]}`
    const res = await fetch(endpoint, sportOptions)

    try {
        if (res.ok && callback)
            result = callback(await res.json(), params.endpoint[1])
        else throw new Error()
    } catch (e) {
        console.log(e)
        result = ResultWrapper(null, 'error while fetching matches!')
    }

    return Response.json(result)
}