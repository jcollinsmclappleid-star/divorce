import Stripe from 'stripe';

const STRIPE_API_VERSION = '2025-11-17.clover' as Stripe.LatestApiVersion;

/** True when Stripe keys come from env vars (Vercel/Neon/local), not Replit connectors. */
export function usesDirectStripeEnv(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

/** True when falling back to Replit managed Stripe connector (legacy production on Replit). */
export function usesReplitStripeConnector(): boolean {
  if (usesDirectStripeEnv()) return false;
  return Boolean(
    process.env.REPLIT_CONNECTORS_HOSTNAME
    && (process.env.REPL_IDENTITY || process.env.WEB_REPL_RENEWAL),
  );
}

async function getReplitCredentials(): Promise<{ publishableKey: string; secretKey: string }> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? `repl ${process.env.REPL_IDENTITY}`
    : process.env.WEB_REPL_RENEWAL
      ? `depl ${process.env.WEB_REPL_RENEWAL}`
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error('Stripe not configured: set STRIPE_SECRET_KEY or run on Replit with the Stripe connector.');
  }

  const isProduction = process.env.REPLIT_DEPLOYMENT === '1';
  const targetEnvironment = isProduction ? 'production' : 'development';

  const url = new URL(`https://${hostname}/api/v2/connection`);
  url.searchParams.set('include_secrets', 'true');
  url.searchParams.set('connector_names', 'stripe');
  url.searchParams.set('environment', targetEnvironment);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
      'X_REPLIT_TOKEN': xReplitToken,
    },
  });

  const data = await response.json();
  const connectionSettings = data.items?.[0];

  if (!connectionSettings?.settings?.publishable || !connectionSettings?.settings?.secret) {
    throw new Error(`Stripe ${targetEnvironment} connection not found on Replit`);
  }

  return {
    publishableKey: connectionSettings.settings.publishable,
    secretKey: connectionSettings.settings.secret,
  };
}

export async function getStripeSecretKey(): Promise<string> {
  const fromEnv = process.env.STRIPE_SECRET_KEY?.trim();
  if (fromEnv) return fromEnv;
  return (await getReplitCredentials()).secretKey;
}

export async function getStripePublishableKey(): Promise<string> {
  const fromEnv = process.env.STRIPE_PUBLISHABLE_KEY?.trim();
  if (fromEnv) return fromEnv;
  return (await getReplitCredentials()).publishableKey;
}

let cachedClient: Stripe | null = null;
let cachedSecretKey: string | null = null;

export async function getUncachableStripeClient(): Promise<Stripe> {
  const secretKey = await getStripeSecretKey();
  if (!cachedClient || cachedSecretKey !== secretKey) {
    cachedClient = new Stripe(secretKey, { apiVersion: STRIPE_API_VERSION });
    cachedSecretKey = secretKey;
  }
  return cachedClient;
}

let stripeSync: any = null;

/** Replit-only: syncs Stripe catalog/webhooks into Postgres via stripe-replit-sync. */
export async function getStripeSync() {
  if (!usesReplitStripeConnector()) {
    throw new Error('Stripe sync is only available with the Replit Stripe connector');
  }
  if (!stripeSync) {
    const { StripeSync } = await import('stripe-replit-sync');
    const secretKey = await getStripeSecretKey();
    stripeSync = new StripeSync({
      poolConfig: {
        connectionString: process.env.DATABASE_URL!,
        max: 2,
      },
      stripeSecretKey: secretKey,
    });
  }
  return stripeSync;
}
