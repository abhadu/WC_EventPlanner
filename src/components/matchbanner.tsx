import { DetailedTeam, Match, Team as TeamType } from "@/lib/types";
import Team from "./team";
import { Button } from "flowbite-react";

export default function MatchBanner({ match }: {
    match: Match<DetailedTeam>
}) {

    return (
        <div className="flex flex-row justify-around">
            <div>
                <Team name={match.teams[0].name} logoUrl={match.teams[0].logo} />
                <Button className="bg-blue-600">View Players</Button>
            </div>
            <div className="text-center">
                <img src="https://i.ibb.co/fqG1HpJ/110833-versus-logo-png.png" alt="110833-versus-logo-png" width={128} height={128} className="m-auto" />
                <p className="text-3xl font-semibold mt-6">{match.venue.ground}</p>
                <p className=" font-medium mt-2 mb-4">{new Date(parseInt(match.timestamp.start, 10)).toDateString()}</p>
            </div>
            <div>
                <Team name={match.teams[1].name} logoUrl={match.teams[1].logo} />
                <Button className=" bg-blue-600">View Players</Button>
            </div>
        </div>
    )
}