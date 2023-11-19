import { DetailedVenue, Result } from "@/lib/types";
import { NextRequest } from "next/server";
import { sportOptions } from "../../../options";
import { ResultWrapper } from "../../../utils";

export async function GET(request: NextRequest, { params }: {
    params: { venueId: number }
}) {
    let result: Result

    const endpoint = `${process.env.SPORTS_API_ENDPOINT}/venues/v1${params.venueId}`
    const res = await fetch(endpoint, sportOptions)

    try {
        if (res.ok) {
            const data = await res.json()
            const venue: DetailedVenue = {
                ground: data.ground,
                city: data.city,
                country: data.country,
                timezone: data.timezone,
                capacity: data.capacity,
                ends: data.ends,
                homeTeam: data.homeTeam,
                logo: data.imageId
            }

            result = ResultWrapper<DetailedVenue>(venue)
        } else {
            result = ResultWrapper(null, 'some internal error!')
        }   
    } catch {
        result = ResultWrapper(null, 'some error on server side!')
    }

    return Response.json(result)
}