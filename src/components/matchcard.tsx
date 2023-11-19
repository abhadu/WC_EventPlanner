import { Match } from "@/lib/types";

export default function MatchCard({ match }: { match: Match }) {
    return (
        <div className="w-48">
            <div className="relative flex flex-row w-full h-44 border border-solid bg-slate-700">
                <div className="overflow-hidden">
                    <img src={match.teams[0].logo} className="w-full h-full" />
                </div>
                <div className="overflow-hidden">
                    <img src={match.teams[1].logo} className="w-full h-full" />
                </div>
                <img src="https://i.ibb.co/fqG1HpJ/110833-versus-logo-png.png" className="absolute w-12 h-12 top-1/2 right-[calc(50%-25px)]" />
            </div>
            <p className="mt-2 font-medium text-lg w-full truncate">{match.teams[0].name} vs {match.teams[1].name}</p>
            <p className=" font-medium mt-2 mb-2">{new Date(parseInt(match.timestamp.start, 10)).toDateString()}</p>
            <div className="m-auto w-fit"><button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 mt-2">Plan Match Day</button></div>
        </div>
    )
}