    baseURL: process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== "undefined" ? window.location.origin : undefined),
    plugins: []
})

export const { signIn, signUp, useSession, signOut } = authClient