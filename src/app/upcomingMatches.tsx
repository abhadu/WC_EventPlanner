'use client'
import MatchCard from "@/components/matchcard";
import Slider from "@/components/slider";
import { getAllUpcoming } from "@/lib/client";
import { ClientResponse, Match, Team } from "@/lib/types";
import { useEffect, useState } from "react";

export default function UpcomingMatches() {
    const [matches, setMatches] = useState<Match<Team>[] | null>(null)

    useEffect(() => {
        (async () => {
            const next: ClientResponse = await getAllUpcoming();
            next && setMatches(next.data)
        })()
    }, [])

    return (
        <div className="w-full">
            <div className="flex justify-between mt-8 mb-4">
                <p className="font-bold text-4xl text-[#787a90]">Upcoming matches to watch.</p>
                <a href="#" className=" text-blue-600 font-semibold text-2xl">view all</a>
            </div>
            <Slider slotSize={4}>
                {
                    matches && matches.map(match => {
                        return <MatchCard match={match} />
                    })
                }
            </Slider>
        </div>
    )
}