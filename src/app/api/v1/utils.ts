import { Result } from "@/lib/types"

export function ResultWrapper<T>(data: T, error: string = ''): Result {
    return {
        success: data ? true : false,
        error: error,
        data: data ? data : {}
    }
}

export const logoEndpoint = (teamName: String) => `${process.env.NEXT_PUBLIC_SERVER_URL}/img/teamLogos/${teamName}.png`