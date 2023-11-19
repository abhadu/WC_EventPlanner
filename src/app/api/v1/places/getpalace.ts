import { Place } from "@/lib/types";
import db from "../db";

export async function getPlace(text: string): Promise<Place[]> {
    let data, res, endpoint, places: Place[] = [], newPlaces: Place[] = []
    try {
        // geocode endpoint calling
        endpoint = `${process.env.PLACE_API_ENDPOINT}/v1/geocode/search?text=${text}&lang=en&limit=10&format=json&apiKey=${process.env.PLACE_API_KEY}`
        res = await fetch(endpoint, {
            method: 'GET'
        })

        if (res.ok) {
            data = await res.json()
            data = data.results as any[]
            if (data.length > 0) {
                data = data[0].place_id
            } else throw new Error("didn't find any data")
        }

        // place endpoint calling
        endpoint = `${process.env.PLACE_API_ENDPOINT}/v2/places?categories=${db.placeFeatures}&lang=en&limit=10&filter=place:${data}&apiKey=${process.env.PLACE_API_KEY}`
        res = await fetch(endpoint, {
            method: 'GET'
        })

        if (res.ok) {
            data = await res.json()
            data = data.features as any[]
            if (data.length > 0) {
                places = data.map(ele => {
                    ele = ele.properties

                    return {
                        name: ele.name,
                        address: ele.address_line1 + ele.address_line2,
                        website: ele.datasource.raw.website,
                        image: ele.datasource.raw.wikipedia
                    }
                })
            } else throw new Error("didn't find any data")
        }

        // place media endpoint calling
        for (let i = 0; i < places.length; i++) {
            if (places[i].image && places[i].image !== undefined) {
                let img = places[i].image?.replace("en:", "")
                endpoint = `${process.env.PLACE_MEDIA_API_ENDPOINT}/${img}`
                res = await fetch(endpoint, {
                    method: 'GET'
                })

                if (res.ok) {
                    data = await res.json()
                    if (data.originalimage && data.originalimage.source) {
                        newPlaces.push({ ...places[i], image: data.originalimage.source })
                    }
                }
            }
        }
    }
    catch (e) {
        console.log(e)
    }

    return newPlaces
}