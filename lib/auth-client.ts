import { createAuthClient } from "better-auth/react"
import { nextCookies } from "better-auth/next-js"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000",
    plugins: [
        nextCookies()
    ]
})

export const { signIn, signUp, useSession, signOut } = authClient