import { URL } from "url"

export default function Team({ name, logoUrl }: {
    name: string,
    logoUrl: string
}) {
    return (
        <div className="text-center">
            <img src={logoUrl} width={128} height={128} className=" m-auto" />
            <h1 className=" font-semibold text-2xl text-white mt-2 ">{name}</h1>
        </div>
    )
}