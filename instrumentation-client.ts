import posthog from "posthog-js";

// Initialize PostHog analytics in production only
if (
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_POSTHOG_KEY
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST,
    session_idle_timeout_seconds: 1800,
    cookieless_mode: "on_reject",
  });

  // Prevent tracking until consent is given via c15t
  posthog.has_opted_out_capturing();
}
