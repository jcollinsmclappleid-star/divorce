import express, { type Express, type Request, type Response, type NextFunction } from "express";
import helmet from "helmet";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { getStripeSync, usesDirectStripeEnv, usesReplitStripeConnector } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";
import { logDeploymentEnvHints } from "./envCheck";
import { log } from "./log";

declare module "express-session" {
  interface SessionData {
    email?: string;
  }
}

async function initStripe() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    log("DATABASE_URL not set — Stripe integration skipped", "stripe");
    return;
  }

  try {
    if (usesReplitStripeConnector()) {
      const { runMigrations } = await import("stripe-replit-sync");
      log("Initializing Stripe via Replit connector...", "stripe");
      await runMigrations({ databaseUrl });
      log("Stripe schema ready", "stripe");

      const stripeSync = await getStripeSync();
      const webhookBaseUrl = `https://${process.env.REPLIT_DOMAINS?.split(",")[0]}`;
      try {
        const result = await stripeSync.findOrCreateManagedWebhook(
          `${webhookBaseUrl}/api/stripe/webhook`,
        );
        log(`Webhook configured: ${result?.webhook?.url ?? "unknown"}`, "stripe");
      } catch (webhookErr: any) {
        log(`Webhook setup skipped (non-fatal): ${webhookErr.message}`, "stripe");
      }

      stripeSync.syncBackfill()
        .then(() => log("Stripe data synced", "stripe"))
        .catch((err: any) => console.error("Error syncing Stripe data:", err));
      return;
    }

    if (!usesDirectStripeEnv()) {
      log("STRIPE_SECRET_KEY not set — Stripe disabled", "stripe");
      return;
    }

    log("Stripe configured via environment variables", "stripe");
    const appUrl = process.env.APP_URL?.replace(/\/$/, "");
    if (appUrl) {
      log(`Stripe webhook endpoint: ${appUrl}/api/stripe/webhook`, "stripe");
    }
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      log("STRIPE_WEBHOOK_SECRET not set — webhook fulfillment disabled", "stripe");
    }
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
  }
}

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

/** Build and configure the Express app (local server or Vercel serverless). */
export async function createApp(): Promise<Express> {
  const app = express();
  const isDev = process.env.NODE_ENV !== "production";

  const cspDirectives: Record<string, any> = {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "https://js.stripe.com",
      "https://checkout.stripe.com",
      ...(isDev ? ["'unsafe-eval'", "'unsafe-inline'"] : []),
    ],
    styleSrc: ["'self'", "'unsafe-inline'"],
    fontSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: [
      "'self'",
      "https://api.stripe.com",
      "https://checkout.stripe.com",
      ...(isDev ? ["ws:", "wss:"] : []),
    ],
    frameSrc: ["https://js.stripe.com", "https://hooks.stripe.com"],
    frameAncestors: ["'none'"],
  };

  if (!isDev) {
    cspDirectives.upgradeInsecureRequests = [];
  }

  app.use(helmet({
    contentSecurityPolicy: { directives: cspDirectives },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }));

  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const signature = req.headers["stripe-signature"];
      if (!signature) {
        return res.status(400).json({ error: "Missing stripe-signature" });
      }

      try {
        const sig = Array.isArray(signature) ? signature[0] : signature;
        if (!Buffer.isBuffer(req.body)) {
          console.error("STRIPE WEBHOOK ERROR: req.body is not a Buffer");
          return res.status(500).json({ error: "Webhook processing error" });
        }

        await WebhookHandlers.processWebhook(req.body as Buffer, sig);
        res.status(200).json({ received: true });
      } catch (error: any) {
        console.error("Webhook error:", error.message);
        res.status(400).json({ error: "Webhook processing error" });
      }
    },
  );

  app.use(
    express.json({
      verify: (req, _res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  app.use(express.urlencoded({ extended: false }));

  app.set("trust proxy", 1);
  app.set("etag", false);

  const PgSession = connectPgSimple(session);
  app.use(session({
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      // Table already exists in Neon; skip DDL on serverless cold start.
      createTableIfMissing: !process.env.VERCEL,
      tableName: "user_sessions",
      pruneSessionInterval: process.env.VERCEL ? false : 60 * 60,
    }),
    secret: process.env.SESSION_SECRET || "dfm-dev-secret",
    resave: false,
    saveUninitialized: false,
    name: "dfm.sid",
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 90 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  }));

  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
      }
    });

    next();
  });

  logDeploymentEnvHints();
  await initStripe();
  await registerRoutes(app);

  if (!process.env.VERCEL) {
    const { startRetentionCleanup } = await import("./cleanup");
    startRetentionCleanup();
  }

  if (!process.env.VERCEL && process.env.NURTURE_SCHEDULER_ENABLED === "true") {
    const { startEmailScheduler } = await import("./email-scheduler");
    startEmailScheduler();
  }

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  }

  return app;
}
