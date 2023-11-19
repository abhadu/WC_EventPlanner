'use client'

import { getNextMatch } from "@/lib/client";
import { useEffect, useState } from "react"
import Team from "./team";
import { ClientResponse, Match, Team as TeamType } from "@/lib/types";
import { Button } from "flowbite-react";

export default function NextMatch() {

    const [match, setMatch] = useState<Match<TeamType> | null>(null);

    useEffect(() => {
        (async () => {
            const next: ClientResponse = await getNextMatch();
            next && setMatch(next.data[0])
        })()
    }, [])

    return (
        <div className="bg-blue-500 flex flex-row justify-around items-center h-full">
            {
                match &&
                <>
                    <Team name={match.teams[0].name} logoUrl={match.teams[0].logo} />
                    <div className="text-center">
                        <img src="https://i.ibb.co/fqG1HpJ/110833-versus-logo-png.png" alt="110833-versus-logo-png" width={128} height={128} className="m-auto" />
                        <p className="text-3xl font-semibold mt-6">{match.venue.ground}</p>
                        <p className=" font-medium mt-2 mb-4">{new Date(parseInt(match.timestamp.start, 10)).toDateString()}</p>
                        <a href={`/matches/${match.id}`} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 mt-2">Plan Match Day</a>
                    </div>
                    <Team name={match.teams[1].name} logoUrl={match.teams[1].logo} />
                </>
            }
        </div>
    )
}