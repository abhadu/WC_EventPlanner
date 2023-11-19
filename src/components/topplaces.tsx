'use client'
import { getTopPlaces } from "@/lib/client";
import { ClientResponse, Place } from "@/lib/types";
import { useEffect, useState } from "react"

export default function TopPlaces() {

    const [places, setPlaces] = useState<Place[]>([])
    useEffect(() => {
        (async () => {
            const res: ClientResponse = await getTopPlaces();
            res?.success && setPlaces(res.data)
        })()
    }, [])

    return (
        <div className="text-center">
            <div className="flex justify-between mt-8 mb-4">
                <p className=" font-bold text-4xl text-[#787a90]">Top Places to visit around events.</p>
                <a href="#" className=" text-blue-600 font-semibold text-2xl">view all</a>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                {
                    places.filter(place => place.image ? true : false).slice(0, 15).map(place => {
                        return (
                            <div className="flex">
                                <img className="max-w-full rounded-lg object-cover" src={place.image} alt="" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}