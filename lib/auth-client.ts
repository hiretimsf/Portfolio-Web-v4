import { createAuthClient } from "better-auth/react"
import { nextCookies } from "better-auth/next-js"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    plugins: [
        nextCookies()
    ]
})

export const { signIn, signUp, useSession, signOut } = authClient