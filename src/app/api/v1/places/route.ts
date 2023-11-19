import { Place, Result } from "@/lib/types";
import { NextRequest } from "next/server";
import { getPlace } from "./getpalace";
import { ResultWrapper } from "../utils";
import db from "../db";
import { sportOptions } from "../options";

export async function GET(req: NextRequest) {
    let places: Place[] = [], locations: string[] = []
    let result: Result

    try {
        let endpoint = `${process.env.SPORTS_API_ENDPOINT}/series/v1/${db.seriesId}/venues`
        let res = await fetch(endpoint, sportOptions)

        if (res.ok) {
            let data = await res.json()
            locations = (data.seriesVenue as any[]).map(venue => `${venue.city}, ${venue.country}`)

            for (let i = 0; i < locations.length; i++) {
                let _places: Place[] = await getPlace(locations[i])
                places = places.concat(..._places)
            }

            console.log('places', places)

            result = ResultWrapper<Place[]>(places)
        } else {
            result = ResultWrapper(null, 'some error')
        }
    } catch (e) {
        console.log(e)
        result = ResultWrapper(null, 'error')
    }

    //console.log(result, places)
    return Response.json(result)
}