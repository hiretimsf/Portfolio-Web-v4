import { z } from "zod";

/**
 * Environment variables schema validation
 * Validates required and optional environment variables at runtime
 */
const envSchema = z.object({
  // Required for email functionality
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),

  // Optional email recipient (defaults to author email)
  CONTACT_EMAIL: z.string().email().optional(),

  // Optional analytics (PostHog)
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  NEXT_PUBLIC_POSTHOG_UI_HOST: z.string().url().optional(),

  // Optional base URL (auto-detected if not provided)
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),

  // Node environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

/**
 * Validated environment variables
 * This will throw an error at startup if required variables are missing
 */
export function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      throw new Error(
        `❌ Invalid environment variables:\n${missingVars.join("\n")}\n\nPlease check your .env.local file.`,
      );
    }
    throw error;
  }
}

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
