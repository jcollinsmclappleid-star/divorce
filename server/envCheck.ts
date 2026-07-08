import { usesDirectStripeEnv, usesReplitStripeConnector } from "./stripeClient";

function startupLog(message: string): void {
  console.log(`[startup] ${message}`);
}

/** Warn-only checks — never exit (Replit production must keep running). */
export function logDeploymentEnvHints(): void {
  const isProd = process.env.NODE_ENV === "production";

  if (process.env.DEV_BYPASS_PAYWALL === "true") {
    startupLog(
      isProd
        ? "WARNING: DEV_BYPASS_PAYWALL=true — paywall is disabled. Remove before public launch on new hosting."
        : "DEV_BYPASS_PAYWALL=true — paywall disabled for local/staging development",
    );
  }

  if (isProd && usesDirectStripeEnv() && !process.env.STRIPE_WEBHOOK_SECRET) {
    startupLog("WARNING: STRIPE_WEBHOOK_SECRET not set — paid checkout fulfillment via webhook will not run");
  }

  if (isProd && !process.env.SESSION_SECRET) {
    startupLog("WARNING: SESSION_SECRET not set — using insecure default. Set before new-hosting cutover.");
  }

  if (isProd && !process.env.DATABASE_URL) {
    startupLog("WARNING: DATABASE_URL not set — database features will fail");
  }

  if (isProd && !process.env.OPENAI_API_KEY) {
    startupLog("WARNING: OPENAI_API_KEY not set — Settlement Reality Check Report generation disabled");
  }

  if (isProd && !process.env.RESEND_API_KEY) {
    startupLog("WARNING: RESEND_API_KEY not set — magic link and purchase emails disabled");
  }

  if (isProd && process.env.VERCEL && !process.env.CRON_SECRET?.trim()) {
    startupLog("WARNING: CRON_SECRET not set — nurture cron will reject requests");
  }

  if (usesReplitStripeConnector()) {
    startupLog("Stripe: Replit connector (current Replit production path)");
  } else if (usesDirectStripeEnv()) {
    const sk = process.env.STRIPE_SECRET_KEY?.trim() ?? "";
    if (sk.startsWith("sk_live_") && (process.env.APP_URL?.includes("localhost") || process.env.DEV_BYPASS_PAYWALL === "true")) {
      startupLog("WARNING: sk_live_ detected on local/test env — use sk_test_ until cutover");
    } else if (sk.startsWith("sk_test_")) {
      startupLog("Stripe: TEST mode (environment variables) — production checkout unaffected");
    } else {
      startupLog("Stripe: environment variables");
    }
  } else {
    startupLog("Stripe: not configured (checkout disabled — use DEV_BYPASS_PAYWALL on staging to test report UI)");
  }
}
