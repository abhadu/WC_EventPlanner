'use client'
import MatchBanner from "@/components/matchbanner";
import MatchDescription from "@/components/matchdescription";
import { getMatchDetailedInfo } from "@/lib/client";
import { ClientResponse, DetailedTeam, Match } from "@/lib/types";
import { Tabs } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Page({ params }: {
    params: { matchId: number }
}) {
    const [match, setMatch] = useState<Match<DetailedTeam> | null>(null)

    useEffect(() => {
        (async () => {
            const res: ClientResponse = await getMatchDetailedInfo(params.matchId)
            if (res && res.success) {
                setMatch(res.data[0])
            }
        })()
    }, [])

    return (
        <div>
            {
                /*
                1. detailed match banner
                2. a services column
                    a. best places to visit 
                    b. hotels to stay
                    c. event info
                    d. decide routes 
                */
            }
            { match && <MatchBanner match={match} /> }
            <Tabs.Group className="items-center gap-8 mt-4" style="underline">
                <Tabs.Item title="About">
                    <MatchDescription />
                </Tabs.Item>
                <Tabs.Item title="Places">
                    <MatchDescription />
                </Tabs.Item>
                <Tabs.Item title="Hotels">
                    <MatchDescription />
                </Tabs.Item>
                <Tabs.Item title="Routes">
                    <MatchDescription />
                </Tabs.Item>
            </Tabs.Group>
        </div>
    )
}