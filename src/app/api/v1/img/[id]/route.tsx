import { NextRequest } from "next/server";
import { sportOptions } from "../../options";

export async function GET(request: NextRequest, { params }: {
    params: { id: string }
}) {
    const endpoint = `${process.env.SPORTS_API_ENDPOINT}/img/v1/i1/c${params.id.split('.')[0]}/i.jpg`
    const res = await fetch(endpoint, sportOptions)

    return new Response(await res.arrayBuffer(), {
        status: res.status,
        headers: {
            'Content-Type': 'image/jpeg'
        }
    })
}