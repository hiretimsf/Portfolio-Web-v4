import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER"
            }
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
    },
    trustedOrigins: [
        "https://hiretimsf.com",
        "https://www.hiretimsf.com"
    ],
    advanced: {
        cookiePrefix: "hiretimsf-auth",
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            domain: process.env.NODE_ENV === "production" ? ".hiretimsf.com" : undefined
        }
    }
});
