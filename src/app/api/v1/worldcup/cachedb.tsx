import { VercelKV, createClient, kv } from "@vercel/kv";

export  default function KVClient(): VercelKV {
    return createClient({
        url: process.env.USERS_REST_API_URL as string,
        token: process.env.USERS_REST_API_TOKEN as string,
    })
}