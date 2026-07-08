import type { Express } from "express";
import path from "path";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import crypto from "crypto";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { ensureStripeProductPresentation, ensureStripeProductPresentationForPrice } from "./stripeProductPresentation";
import { getAppBaseUrl } from "./appUrl";
import { seedDatabase } from "./seed";
import { sendPurchaseConfirmationEmail, sendAccessRecoveryEmail, sendEmailVerificationEmail, sendProgressSummaryEmail, sendMagicLinkEmail, sendAdminNotification, sendPromoEmail, sendExpertReviewConfirmationEmail } from "./email";
import { ExpertReviewIntakeSchema } from "@shared/expert-review-intake";
import { db, pool } from "./db";
import { emailLeads as emailLeadsTable, purchases as purchasesTable } from "@shared/schema";
import { and, eq, isNull, isNotNull } from "drizzle-orm";
import OpenAI from "openai";
import { isNetNewNurtureLead } from "@shared/nurture-schedule";
import { GUIDED_SUMMARY_SYSTEM_PROMPT } from "./guided-summary/prompt";
import { hasForbiddenGuidedSummaryPhrase } from "./guided-summary/compliance";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function requireCronSecret(req: any, res: any, next: any) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return res.status(503).json({ message: "Cron not configured" });
  }
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.slice(7);
  const tokenBuf = Buffer.from(token);
  const secretBuf = Buffer.from(secret);
  if (tokenBuf.length !== secretBuf.length || !crypto.timingSafeEqual(tokenBuf, secretBuf)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

function getExpertReviewPriceId(): string | undefined {
  return process.env.STRIPE_EXPERT_REVIEW_PRICE_ID?.trim()
    || process.env.STRIPE_SUPPORT_PRICE_ID?.trim()
    || undefined;
}

async function fulfillExpertReviewCheckout(stripeSession: {
  id: string;
  payment_intent?: string | { id?: string } | null;
  customer_details?: { email?: string | null } | null;
}) {
  const review = await storage.getExpertReviewByCheckoutSessionId(stripeSession.id);
  if (!review || review.status === 'paid') return review;

  const email = stripeSession.customer_details?.email ?? null;
  const paymentIntentId = typeof stripeSession.payment_intent === 'string'
    ? stripeSession.payment_intent
    : stripeSession.payment_intent?.id ?? '';
  const updated = await storage.markExpertReviewPaid(
    review.id,
    paymentIntentId,
    email,
  );

  if (email) {
    sendExpertReviewConfirmationEmail(email).catch(() => {});
    sendAdminNotification('Position Review purchased', [
      { label: 'Customer email', value: email },
      { label: 'Review purchase ID', value: review.id },
      { label: 'Analyser session', value: review.sessionToken },
      { label: 'Amount', value: '£249' },
      { label: 'Intake', value: 'Pending — customer must complete /expert-review/intake' },
      { label: 'Time', value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }) },
    ], 'expert_review').catch(() => {});
  }
  return updated;
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function rateLimit(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxAttempts) return false;
  entry.count++;
  return true;
}

/** Local dev only — never enable in production. */
function devBypassPaywall(): boolean {
  return process.env.NODE_ENV !== "production" && process.env.DEV_BYPASS_PAYWALL === "true";
}

const DEV_ACCESS_RESPONSE = {
  hasAccess: true,
  expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  purchasedAt: new Date().toISOString(),
  devBypass: true,
};

export async function registerRoutes(app: Express): Promise<void> {

  app.get("/api/health", async (_req, res) => {
    try {
      await pool.query("SELECT 1");
      res.json({
        ok: true,
        db: "connected",
        env: process.env.NODE_ENV ?? "development",
      });
    } catch {
      res.status(503).json({ ok: false, db: "unavailable" });
    }
  });

  seedDatabase().catch(console.error);

  app.get('/sitemap.xml', (_req, res) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- ═══════════════════════════════════════════════
       TIER 1 (1.0) — Homepage
       ═══════════════════════════════════════════════ -->
  <url>
    <loc>https://divorcecalculatoruk.co.uk/</loc>
    <priority>1.0</priority>
  </url>

  <!-- ═══════════════════════════════════════════════
       TIER 1.5 (0.8) — Platform navigation pages
       ═══════════════════════════════════════════════ -->
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-it-works</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/faq</loc>
    <priority>0.8</priority>
  </url>

  <!-- ═══════════════════════════════════════════════
       TIER 2 (0.9) — Tool, hub, pillar + all quality articles
       ═══════════════════════════════════════════════ -->
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-financial-settlement-calculator-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-much-will-i-get-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/career-sacrifice-divorce-settlement-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/woman-gave-up-career-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/what-am-i-entitled-to-in-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-financial-guides</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-financial-modelling</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-much-does-divorce-cost-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/can-i-keep-the-house-after-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-are-pensions-divided-in-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-50-50-split-calculator-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-house-buyout-calculator-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-pension-split-calculator-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-settlement-examples-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/free-guide</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-is-property-divided-in-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/what-is-a-consent-order-uk-divorce</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/what-is-a-clean-break-order-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/financial-disclosure-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-with-children-financial-settlement-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/mediation-vs-court-divorce-uk-costs</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-long-does-divorce-financial-settlement-take-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/buying-partner-out-of-house-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-mortgage-affordability-after-separation</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-financial-checklist-before-mediation</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/is-50-50-split-automatic-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-where-one-earns-more-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/child-maintenance-vs-spousal-maintenance-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-much-maintenance-after-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/spousal-maintenance-after-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/timeline-of-divorce-and-financial-settlement-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/can-i-hide-assets-in-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/spouse-refuses-financial-disclosure-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/can-i-divorce-without-financial-settlement-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/can-i-reopen-divorce-settlement-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-pension-offsetting-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/transfer-of-equity-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/average-divorce-settlement-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/wife-entitled-divorce-uk-after-5-years</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/wife-entitled-divorce-uk-after-10-years</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/wife-entitled-divorce-uk-after-20-years</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/wife-entitled-divorce-uk-after-25-years</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/negative-equity-and-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/second-marriage-divorce-settlement-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/moving-out-during-divorce-uk</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/do-i-need-a-solicitor-for-financial-settlement-uk</loc>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://divorcecalculatoruk.co.uk/about</loc>
    <priority>0.9</priority>
  </url>

  <!-- ═══════════════════════════════════════════════
       TIER 2.5 (0.9) — Calculator-intent cluster pages
       ═══════════════════════════════════════════════ -->
  <url>
    <loc>https://divorcecalculatoruk.co.uk/free-divorce-calculator-uk</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-calculator-uk</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-settlement-calculator-uk</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/fair-divorce-settlement-calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-asset-split-calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/equity-split-divorce-calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-pension-calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/pension-sharing-calculator-divorce</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/pension-offsetting-calculator-divorce</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/spousal-maintenance-calculator-uk</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-maintenance-calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/house-divorce-calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/can-i-keep-the-house-after-divorce-calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/mortgage-divorce-calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-cashflow-calculator</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>

  <!-- ═══════════════════════════════════════════════
       TIER 3 (0.8) — Supporting articles
       ═══════════════════════════════════════════════ -->
  <url>
    <loc>https://divorcecalculatoruk.co.uk/what-happens-to-debts-in-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/financial-remedy-proceedings-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-are-savings-split-in-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-are-investments-divided-in-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/joint-bank-accounts-after-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/can-ex-claim-inheritance-uk-divorce</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/is-inheritance-included-in-divorce-settlement-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/both-names-on-mortgage-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/can-i-force-sale-of-house-after-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/who-pays-mortgage-during-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/unmarried-separating-house-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-settlement-no-assets-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-does-child-custody-affect-financial-settlement-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/who-pays-what-after-divorce-with-children-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/does-having-children-change-divorce-settlement-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/ex-doesnt-agree-settlement-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-long-after-divorce-can-financial-claims-be-made-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/when-is-divorce-financial-settlement-legally-binding-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/steps-after-final-order-finances-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/consent-order-vs-clean-break-order-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-solicitor-vs-mediation-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/settling-out-of-court-vs-court-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/can-i-refuse-divorce-financial-settlement-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-mediation-process-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/diy-divorce-uk-cost</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/online-divorce-uk-cost</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/universal-credit-after-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/marriage-allowance-after-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/inheritance-tax-after-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/council-tax-during-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/sipp-on-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/shared-ownership-and-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/engagement-ring-and-wedding-gifts-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/directors-loan-account-divorce-uk</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-in-scotland-financial-settlement</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/divorce-in-northern-ireland-financial-settlement</loc>
    <priority>0.8</priority>
  </url>

  <!-- ═══════════════════════════════════════════════
       TIER 5 (0.5) — Support & legal (trust pages, not ranked)
       ═══════════════════════════════════════════════ -->
  <url>
    <loc>https://divorcecalculatoruk.co.uk/methodology</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/contact</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/privacy</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/terms</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://divorcecalculatoruk.co.uk/refund-policy</loc>
    <priority>0.5</priority>
  </url>

</urlset>`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  });

  app.get('/api/stripe/publishable-key', async (_req, res) => {
    try {
      const key = await getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (err) {
      res.status(500).json({ message: 'Failed to get publishable key' });
    }
  });

  app.post('/api/checkout/create', async (req, res) => {
    try {
      const { sessionToken, includeExpertReview } = req.body;
      if (!sessionToken) {
        return res.status(400).json({ message: 'sessionToken is required' });
      }

      const stripe = await getUncachableStripeClient();

      // Override via env when migrating off Replit (test vs live price IDs)
      const productId = process.env.STRIPE_PRODUCT_ID || 'prod_U08zTEPeHZJAOf';
      const product = await stripe.products.retrieve(productId);
      if (!product) {
        console.error('Stripe product not found');
        return res.status(500).json({ message: 'Payment product not configured. Please contact support.' });
      }

      const prices = await stripe.prices.list({ product: productId, active: true });
      if (prices.data.length === 0) {
        console.error('No active price found for product. Create a price in Stripe Dashboard');
        return res.status(500).json({ message: 'Payment price not configured. Please contact support.' });
      }

      // £79.00 — Stripe API uses pence: unit_amount 7900
      const priceId = process.env.STRIPE_PRICE_ID || 'price_1TBKqaDv8IzJrrwISpwdyA32';

      const baseUrl = getAppBaseUrl(req);

      await ensureStripeProductPresentation(stripe, productId, 'main');

      const lineItems: { price: string; quantity: number }[] = [{ price: priceId, quantity: 1 }];
      let bundleExpertReview = false;

      if (includeExpertReview) {
        const expertPriceId = getExpertReviewPriceId();
        if (!expertPriceId) {
          return res.status(500).json({ message: 'Expert review product not configured. Please contact support.' });
        }
        await ensureStripeProductPresentationForPrice(stripe, expertPriceId, 'expert_review');
        lineItems.push({ price: expertPriceId, quantity: 1 });
        bundleExpertReview = true;
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        allow_promotion_codes: !bundleExpertReview,
        success_url: bundleExpertReview
          ? `${baseUrl}/payment-success?bundle=1&session_id={CHECKOUT_SESSION_ID}`
          : `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/unlock`,
        custom_text: {
          submit: {
            message: bundleExpertReview
              ? 'You\'ll get instant access for 12 months plus Position Review — complete intake after payment.'
              : 'You\'ll get instant access for 12 months. All calculations remain private in your browser.',
          },
        },
        metadata: {
          sessionToken,
          ...(bundleExpertReview ? { includeExpertReview: '1' } : {}),
        },
      });

      await storage.createPurchase({
        sessionToken,
        stripeCheckoutSessionId: checkoutSession.id,
        status: 'pending',
      });

      if (bundleExpertReview) {
        await storage.createExpertReviewPurchase({
          sessionToken,
          stripeCheckoutSessionId: checkoutSession.id,
        });
      }

      res.json({ url: checkoutSession.url });
    } catch (err: any) {
      console.error('Checkout error:', err?.message || err);
      res.status(500).json({ message: err?.message || 'Failed to create checkout session' });
    }
  });

  app.post('/api/checkout/verify', async (req, res) => {
    try {
      const { checkoutSessionId } = req.body;
      if (!checkoutSessionId) {
        return res.status(400).json({ message: 'checkoutSessionId is required' });
      }

      const stripe = await getUncachableStripeClient();
      const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);

      if (session.payment_status === 'paid') {
        const purchase = await storage.getPurchaseByCheckoutSessionId(checkoutSessionId);
        if (purchase && purchase.status !== 'paid') {
          const email = session.customer_details?.email ?? null;
          await storage.markPurchasePaid(
            purchase.id,
            session.payment_intent as string,
            email
          );
          if (email) {
            const updatedForEmail = await storage.getPurchaseByCheckoutSessionId(checkoutSessionId);
            sendPurchaseConfirmationEmail(email, purchase.sessionToken, updatedForEmail?.expiresAt ?? null).catch(() => {});
            sendAdminNotification('New purchase confirmed', [
              { label: 'Customer email', value: email },
              { label: 'Purchase ID', value: purchase.id },
              { label: 'Amount', value: '£79' },
              { label: 'Time', value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }) },
            ], 'purchase').catch(() => {});
          }
        }
        const updatedPurchase = await storage.getPurchaseByCheckoutSessionId(checkoutSessionId);
        await fulfillExpertReviewCheckout(session);
        res.json({ 
          status: 'paid', 
          sessionToken: updatedPurchase?.sessionToken,
          expiresAt: updatedPurchase?.expiresAt,
          expertReviewPurchased: Boolean(await storage.getExpertReviewByCheckoutSessionId(checkoutSessionId)),
        });
      } else {
        res.json({ status: session.payment_status });
      }
    } catch (err: any) {
      console.error('Verify error:', err);
      res.status(500).json({ message: 'Failed to verify payment' });
    }
  });

  app.get('/api/expert-review/status/:sessionToken', async (req, res) => {
    try {
      const { sessionToken } = req.params;
      const paid = await storage.getPaidExpertReviewBySessionToken(sessionToken);
      res.json({
        purchased: Boolean(paid),
        purchasedAt: paid?.purchasedAt ?? null,
        intakeCompleted: Boolean(paid?.intakeCompletedAt),
        intakeCompletedAt: paid?.intakeCompletedAt ?? null,
      });
    } catch {
      res.status(500).json({ message: 'Failed to fetch expert review status' });
    }
  });

  app.post('/api/checkout/create-expert-review', async (req, res) => {
    try {
      const { sessionToken } = req.body;
      if (!sessionToken) {
        return res.status(400).json({ message: 'sessionToken is required' });
      }

      if (devBypassPaywall()) {
        return res.status(400).json({ message: 'Expert review checkout is disabled in dev bypass mode.' });
      }

      const mainPurchase = await storage.getPurchaseBySessionToken(sessionToken);
      if (!mainPurchase) {
        return res.status(403).json({ message: 'Active analyser access required before purchasing expert review.' });
      }

      const existing = await storage.getPaidExpertReviewBySessionToken(sessionToken);
      if (existing) {
        return res.status(400).json({ message: 'Position Review already purchased for this session.' });
      }

      const priceId = getExpertReviewPriceId();
      if (!priceId) {
        return res.status(500).json({ message: 'Expert review product not configured. Please contact support.' });
      }

      const stripe = await getUncachableStripeClient();
      const baseUrl = getAppBaseUrl(req);

      await ensureStripeProductPresentationForPrice(stripe, priceId, 'expert_review');

      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        allow_promotion_codes: false,
        success_url: `${baseUrl}/payment-success?expert_review=1&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/results`,
        custom_text: {
          submit: { message: 'Human-reviewed briefing on your modelled position — modelling support only, not legal advice.' },
        },
        metadata: {
          sessionToken,
          productKind: 'expert_review',
        },
      });

      await storage.createExpertReviewPurchase({
        sessionToken,
        stripeCheckoutSessionId: checkoutSession.id,
      });

      res.json({ url: checkoutSession.url });
    } catch (err: any) {
      console.error('Expert review checkout error:', err?.message || err);
      res.status(500).json({ message: err?.message || 'Failed to create expert review checkout session' });
    }
  });

  app.post('/api/checkout/verify-expert-review', async (req, res) => {
    try {
      const { checkoutSessionId } = req.body;
      if (!checkoutSessionId) {
        return res.status(400).json({ message: 'checkoutSessionId is required' });
      }

      const stripe = await getUncachableStripeClient();
      const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);

      if (session.payment_status === 'paid') {
        await fulfillExpertReviewCheckout(session);
        const review = await storage.getExpertReviewByCheckoutSessionId(checkoutSessionId);
        return res.json({
          status: 'paid',
          sessionToken: review?.sessionToken ?? null,
          intakeCompleted: Boolean(review?.intakeCompletedAt),
        });
      }

      res.json({ status: session.payment_status });
    } catch (err: any) {
      console.error('Expert review verify error:', err);
      res.status(500).json({ message: 'Failed to verify expert review payment' });
    }
  });

  app.post('/api/expert-review/intake', async (req, res) => {
    try {
      const { sessionToken, intake } = req.body;
      if (!sessionToken || !intake) {
        return res.status(400).json({ message: 'sessionToken and intake are required' });
      }

      const paid = await storage.getPaidExpertReviewBySessionToken(sessionToken);
      if (!paid) {
        return res.status(403).json({ message: 'Position Review purchase required.' });
      }

      if (paid.intakeCompletedAt) {
        return res.json({ status: 'already_submitted', intakeCompletedAt: paid.intakeCompletedAt });
      }

      const parsed = ExpertReviewIntakeSchema.safeParse(intake);
      if (!parsed.success) {
        return res.status(400).json({ message: 'Invalid intake data', errors: parsed.error.flatten() });
      }

      const updated = await storage.saveExpertReviewIntake(sessionToken, parsed.data);

      sendAdminNotification('Expert review intake submitted', [
        { label: 'Customer email', value: paid.email ?? 'unknown' },
        { label: 'Review purchase ID', value: paid.id },
        { label: 'Analyser session', value: sessionToken },
        { label: 'Situation', value: parsed.data.situationStage },
        { label: 'Top priority', value: parsed.data.topPriority },
        { label: 'Time', value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }) },
      ], 'expert_review_intake').catch(() => {});

      res.json({ status: 'submitted', intakeCompletedAt: updated.intakeCompletedAt });
    } catch (err: any) {
      console.error('Expert review intake error:', err);
      res.status(500).json({ message: 'Failed to save intake' });
    }
  });

  app.get('/api/access/:sessionToken', async (req, res) => {
    try {
      // Disable HTTP caching — auth state must always be fresh, and Set-Cookie
      // headers can be dropped on 304 responses.
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');

      if (devBypassPaywall()) {
        return res.json(DEV_ACCESS_RESPONSE);
      }

      const { sessionToken } = req.params;
      const purchase = await storage.getPurchaseBySessionToken(sessionToken);

      if (!purchase) {
        return res.json({ hasAccess: false, reason: 'no_purchase' });
      }

      if (purchase.expiresAt && new Date() > new Date(purchase.expiresAt)) {
        return res.json({ hasAccess: false, reason: 'expired', expiresAt: purchase.expiresAt });
      }

      // Elevate to a server-side session so /api/auth/me works on redirect —
      // this makes access reliable regardless of localStorage state. Await the
      // save so the Set-Cookie header lands before the response is flushed.
      if (purchase.email && !req.session?.email) {
        req.session.email = purchase.email;
        await new Promise<void>((resolve) => req.session.save(() => resolve()));
      }

      return res.json({ 
        hasAccess: true, 
        expiresAt: purchase.expiresAt,
        purchasedAt: purchase.purchasedAt 
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to check access' });
    }
  });

  app.post('/api/access/recover', async (req, res) => {
    try {
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      if (!rateLimit(`recover:${clientIp}`, 5, 60 * 60 * 1000)) {
        return res.status(429).json({ message: 'Too many attempts. Please try again later.' });
      }

      const schema = z.object({ email: z.string().email() });
      const { email } = schema.parse(req.body);

      const purchases = await storage.getPaidPurchasesByEmail(email);
      let validPurchase = purchases.find(p => p.expiresAt && new Date(p.expiresAt) > new Date());

      // If no purchase record exists locally, check Stripe directly —
      // covers cases where the webhook fired but fulfillment failed (e.g. missing secret).
      if (!validPurchase) {
        try {
          const stripe = await getUncachableStripeClient();
          const sessions = await stripe.checkout.sessions.list({ limit: 100 });
          const paidSession = sessions.data.find(s =>
            s.payment_status === 'paid' &&
            (s.customer_email?.toLowerCase() === email.toLowerCase() ||
             s.customer_details?.email?.toLowerCase() === email.toLowerCase())
          );
          if (paidSession) {
            // Check if there's already a purchase record for this session (wrong email stored)
            const existingBySession = await storage.getPurchaseByCheckoutSessionId(paidSession.id);
            if (existingBySession && existingBySession.status !== 'paid') {
              await storage.markPurchasePaid(existingBySession.id, paidSession.payment_intent as string || '', email);
              validPurchase = await storage.getPurchaseById(existingBySession.id);
            } else if (!existingBySession) {
              // No local record at all — create one from the Stripe session
              const newPurchase = await storage.createPurchaseFromStripeSession(
                paidSession.id,
                paidSession.payment_intent as string || '',
                email
              );
              validPurchase = newPurchase;
            } else {
              validPurchase = existingBySession;
            }
            console.log('[recover] Auto-fulfilled missing purchase from Stripe for', email);
          }
        } catch (stripeErr: any) {
          console.error('[recover] Stripe lookup failed:', stripeErr.message);
        }
      }

      if (!validPurchase) {
        return res.json({ found: false });
      }

      if (validPurchase.expiresAt && new Date() > new Date(validPurchase.expiresAt)) {
        return res.json({ found: true, expired: true });
      }

      sendAccessRecoveryEmail(email, validPurchase.sessionToken, validPurchase.expiresAt).catch(() => {});

      return res.json({
        found: true,
        expired: false,
        emailSent: true,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Valid email address required' });
      }
      res.status(500).json({ message: 'Failed to recover access' });
    }
  });

  // Alternative recovery: user enters their Stripe checkout session ID (cs_...) from receipt email
  app.post('/api/access/recover-by-order', async (req, res) => {
    try {
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      if (!rateLimit(`recover-order:${clientIp}`, 3, 60 * 60 * 1000)) {
        return res.status(429).json({ message: 'Too many attempts. Please try again later.' });
      }

      const schema = z.object({ checkoutSessionId: z.string().min(5) });
      const { checkoutSessionId } = schema.parse(req.body);

      const purchase = await storage.getPurchaseByCheckoutSessionId(checkoutSessionId.trim());

      if (!purchase || purchase.status !== 'paid') {
        return res.json({ found: false });
      }

      if (purchase.expiresAt && new Date() > new Date(purchase.expiresAt)) {
        return res.json({ found: true, expired: true });
      }

      if (!purchase.email) {
        // No email on record — send back the session token directly (last resort)
        return res.json({ found: true, noEmail: true });
      }

      sendAccessRecoveryEmail(purchase.email, purchase.sessionToken, purchase.expiresAt).catch(() => {});

      return res.json({
        found: true,
        expired: false,
        emailSent: true,
        maskedEmail: purchase.email.replace(/^(.)(.+?)(@.+)$/, (_, a, b, c) => a + '*'.repeat(Math.min(b.length, 4)) + c),
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Valid order reference required' });
      }
      res.status(500).json({ message: 'Failed to recover access' });
    }
  });

  // ─── Magic Link / Auth routes ────────────────────────────────────────────────

  app.post('/api/auth/send-link', async (req, res) => {
    try {
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      if (!rateLimit(`magic-link:${clientIp}`, 3, 60 * 60 * 1000)) {
        return res.status(429).json({ message: 'Too many attempts. Please try again in an hour.' });
      }

      const schema = z.object({ email: z.string().email() });
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: 'A valid email address is required.' });
      }
      const email = parsed.data.email.toLowerCase().trim();

      // Per-email rate limit (silent so behaviour mirrors the no-purchase path
      // and prevents enumeration via timing or response differences)
      if (!rateLimit(`magic-link-email:${email}`, 5, 60 * 60 * 1000)) {
        return res.json({ sent: true });
      }

      const purchases = await storage.getPaidPurchasesByEmail(email);
      const validPurchase = purchases.find(p => p.expiresAt && new Date(p.expiresAt) > new Date());

      if (!validPurchase) {
        // Always return success to prevent email enumeration
        return res.json({ sent: true });
      }

      const token = crypto.randomBytes(48).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await storage.createMagicLink(email, token, expiresAt);

      const baseUrl = getAppBaseUrl(req);
      sendMagicLinkEmail(email, token, baseUrl).catch(console.error);

      return res.json({ sent: true });
    } catch (err) {
      console.error('[auth] send-link error:', err);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  });

  app.get('/api/auth/verify', async (req, res) => {
    try {
      const token = req.query.token as string | undefined;
      if (!token) {
        return res.redirect('/recover?error=invalid_link');
      }

      const magicLink = await storage.getMagicLinkByToken(token);

      if (!magicLink) {
        return res.redirect('/recover?error=invalid_link');
      }

      if (magicLink.usedAt) {
        return res.redirect('/recover?error=link_used');
      }

      if (new Date() > new Date(magicLink.expiresAt)) {
        return res.redirect('/recover?error=link_expired');
      }

      // Mark as used
      await storage.useMagicLink(magicLink.id);

      // Set server-side session
      req.session.email = magicLink.email;
      await new Promise<void>((resolve, reject) => req.session.save(err => err ? reject(err) : resolve()));

      // Find the most recent valid purchase session token for this email
      const purchases = await storage.getPaidPurchasesByEmail(magicLink.email);
      const validPurchase = purchases.find(p => p.expiresAt && new Date(p.expiresAt) > new Date());

      if (!validPurchase) {
        // Signed in but no active purchase — redirect to unlock
        return res.redirect('/unlock?signed_in=1');
      }

      // Redirect to /access which will set the localStorage token and go to /results
      return res.redirect(`/access?token=${encodeURIComponent(validPurchase.sessionToken)}`);
    } catch (err) {
      console.error('[auth] verify error:', err);
      return res.redirect('/recover?error=server_error');
    }
  });

  app.get('/api/auth/me', async (req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');

      if (devBypassPaywall()) {
        return res.json({
          authenticated: true,
          email: 'dev@local',
          ...DEV_ACCESS_RESPONSE,
        });
      }

      const email = req.session?.email;
      if (!email) {
        return res.json({ authenticated: false, hasAccess: false });
      }

      const purchases = await storage.getPaidPurchasesByEmail(email);
      const validPurchase = purchases.find(p => p.expiresAt && new Date(p.expiresAt) > new Date());

      if (!validPurchase) {
        return res.json({ authenticated: true, email, hasAccess: false });
      }

      return res.json({
        authenticated: true,
        email,
        hasAccess: true,
        expiresAt: validPurchase.expiresAt,
        purchasedAt: validPurchase.purchasedAt,
      });
    } catch (err) {
      console.error('[auth] me error:', err);
      res.status(500).json({ message: 'Failed to fetch session' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('[auth] session destroy error:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('dfm.sid');
      res.json({ success: true });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

  function requireAdmin(req: any, res: any, next: any) {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (!rateLimit(`admin:${clientIp}`, 10, 15 * 60 * 1000)) {
      return res.status(429).json({ message: 'Too many attempts. Please try again later.' });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const token = authHeader.slice(7);
    if (!ADMIN_PASSWORD) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }
    const tokenBuf = Buffer.from(token);
    const passBuf = Buffer.from(ADMIN_PASSWORD);
    if (tokenBuf.length !== passBuf.length || !crypto.timingSafeEqual(tokenBuf, passBuf)) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }
    next();
  }

  app.post('/api/admin/lookup', requireAdmin, async (req, res) => {
    try {
      const schema = z.object({ email: z.string().email() });
      const { email } = schema.parse(req.body);

      const purchases = await storage.getPaidPurchasesByEmail(email);
      const results = purchases.map(p => ({
        id: p.id,
        email: p.email,
        status: p.status,
        purchasedAt: p.purchasedAt,
        expiresAt: p.expiresAt,
        isActive: p.expiresAt ? new Date(p.expiresAt) > new Date() : false,
      }));

      return res.json({ purchases: results });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Valid email address required' });
      }
      res.status(500).json({ message: 'Lookup failed' });
    }
  });

  app.post('/api/admin/grant', requireAdmin, async (req, res) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        months: z.number().int().min(1).max(24).default(12),
      });
      const { email, months } = schema.parse(req.body);

      const purchase = await storage.createPurchaseFromStripeSession(
        `manual-grant-${Date.now()}`,
        '',
        email
      );
      sendAccessRecoveryEmail(email, purchase.sessionToken, purchase.expiresAt).catch(() => {});
      console.log(`[admin] Manual access granted to ${email}, expires ${purchase.expiresAt}`);
      return res.json({
        id: purchase.id,
        email: purchase.email,
        sessionToken: purchase.sessionToken,
        expiresAt: purchase.expiresAt,
        accessUrl: `/access?token=${purchase.sessionToken}`,
      });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Valid email required' });
      }
      res.status(500).json({ message: err.message || 'Grant failed' });
    }
  });

  app.post('/api/admin/extend', requireAdmin, async (req, res) => {
    try {
      const schema = z.object({
        purchaseId: z.string().min(1),
        months: z.number().int().min(1).max(12),
      });
      const { purchaseId, months } = schema.parse(req.body);

      const updated = await storage.extendPurchaseExpiry(purchaseId, months);
      return res.json({
        id: updated.id,
        email: updated.email,
        expiresAt: updated.expiresAt,
        status: updated.status,
      });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid input' });
      }
      res.status(500).json({ message: err.message || 'Extension failed' });
    }
  });

  app.post('/api/leads', async (req, res) => {
    try {
      const ip = req.ip || 'unknown';
      if (!rateLimit(`leads:${ip}`, 5, 60 * 60 * 1000)) {
        return res.status(429).json({ message: 'Too many requests' });
      }
      const schema = z.object({
        email: z.string().email(),
        firstName: z.string().max(100).optional(),
        source: z.string().max(50).optional(),
        assetPoolSnapshot: z.string().max(50).optional(),
      });
      const { email, firstName, source, assetPoolSnapshot } = schema.parse(req.body);
      const existing = await storage.getEmailLeadByEmail(email);
      const isSummarySource =
        source === 'preview_page' || source === 'wizard_preview' || source === 'wizard_final';
      const now = new Date();
      const enrollNurture = isSummarySource && isNetNewNurtureLead(now, now);

      if (!existing) {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const lead = await storage.createEmailLead(
          email,
          firstName,
          source,
          verificationToken,
          enrollNurture ? now : undefined,
        );
        sendAdminNotification('New email lead captured', [
          { label: 'Email', value: email },
          { label: 'Name', value: firstName || '—' },
          { label: 'Source', value: source || '—' },
          { label: 'Time', value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }) },
        ], 'lead_capture').catch(() => {});
        if (isSummarySource) {
          if (assetPoolSnapshot) {
            await storage.updateEmailLeadAssetPool(lead.id, assetPoolSnapshot);
          }
          await sendProgressSummaryEmail(email, assetPoolSnapshot || '', lead.id);
          await storage.verifyEmailLead(lead.id);
        } else {
          await sendEmailVerificationEmail(email, verificationToken);
        }
      } else if (isSummarySource) {
        let lead = existing;
        if (assetPoolSnapshot) {
          lead = await storage.updateEmailLeadAssetPool(lead.id, assetPoolSnapshot);
        }
        if (!lead.verified) {
          await storage.verifyEmailLead(lead.id);
        }
        await sendProgressSummaryEmail(
          email,
          assetPoolSnapshot || lead.assetPoolSnapshot || '',
          lead.id,
        );
      }
      return res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Valid email address required' });
      }
      return res.status(500).json({ message: 'Failed to save' });
    }
  });

  app.get('/api/leads/verify', async (req, res) => {
    try {
      const token = z.string().min(1).parse(req.query.token);
      const lead = await storage.getEmailLeadByVerificationToken(token);
      if (!lead) {
        return res.redirect('/?verified=invalid');
      }
      await storage.verifyEmailLead(lead.id);
      return res.redirect('/?verified=true');
    } catch (err) {
      return res.redirect('/?verified=invalid');
    }
  });

  app.get('/api/leads/unsubscribe', async (req, res) => {
    try {
      const token = z.string().uuid().parse(req.query.token);
      const [lead] = await db
        .select()
        .from(emailLeadsTable)
        .where(eq(emailLeadsTable.id, token));
      if (!lead) {
        return res.status(404).send(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;max-width:480px;margin:auto"><h2>Link not recognised</h2><p>This unsubscribe link is invalid or has already been used.</p></body></html>`);
      }
      if (lead.unsubscribedAt) {
        return res.send(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;max-width:480px;margin:auto"><h2>Already unsubscribed</h2><p>You've already been removed from our mailing list. You will not receive any further emails from us.</p></body></html>`);
      }
      await db
        .update(emailLeadsTable)
        .set({ unsubscribedAt: new Date() })
        .where(eq(emailLeadsTable.id, token));
      return res.send(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;max-width:480px;margin:auto;color:#1e293b"><h2 style="color:#0f1e3c">You've been unsubscribed</h2><p>You've been removed from our mailing list and will not receive any further emails from DivorceCalculatorUK.</p><p style="color:#64748b;font-size:14px">If you change your mind, you can always return to <a href="https://divorcecalculatoruk.co.uk" style="color:#c49b2a">divorcecalculatoruk.co.uk</a> and start again.</p></body></html>`);
    } catch (err) {
      return res.status(400).send(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;max-width:480px;margin:auto"><h2>Invalid link</h2><p>This unsubscribe link is not valid. Please contact support@divorcecalculatoruk.co.uk if you need help.</p></body></html>`);
    }
  });

  app.post('/api/admin/send-promo', requireAdmin, async (req, res) => {
    try {
      const schema = z.object({
        emails: z.array(z.string().email()).min(1).max(100),
        dryRun: z.boolean().optional().default(false),
        force: z.boolean().optional().default(false),
      });
      const { emails, dryRun, force } = schema.parse(req.body);

      const paidResult = await db
        .select({ email: purchasesTable.email })
        .from(purchasesTable)
        .where(and(eq(purchasesTable.status, 'paid'), isNotNull(purchasesTable.email)));
      const paidEmails = new Set(paidResult.map((p) => p.email!.toLowerCase()));

      const results: { email: string; status: string }[] = [];

      for (const email of emails) {
        const normalised = email.toLowerCase().trim();

        if (!force && paidEmails.has(normalised)) {
          results.push({ email, status: 'skipped_paid' });
          continue;
        }

        const [lead] = await db
          .select()
          .from(emailLeadsTable)
          .where(eq(emailLeadsTable.email, normalised));

        if (!lead) {
          results.push({ email, status: 'not_found' });
          continue;
        }

        if (lead.unsubscribedAt) {
          results.push({ email, status: 'skipped_unsubscribed' });
          continue;
        }

        if (!dryRun) {
          await sendPromoEmail(email, lead.id, lead.assetPoolSnapshot ?? null);
          await db
            .update(emailLeadsTable)
            .set({ promoSentAt: new Date() })
            .where(eq(emailLeadsTable.id, lead.id));
        }

        results.push({ email, status: dryRun ? 'dry_run_ok' : 'sent' });
      }

      console.log(`[admin] send-promo: ${JSON.stringify(results)}`);
      return res.json({ results });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid request', errors: err.errors });
      }
      console.error('[admin] send-promo error:', err);
      return res.status(500).json({ message: 'Failed to send promo emails' });
    }
  });

  app.post('/api/gdpr/delete', async (req, res) => {
    try {
      const ip = req.ip || 'unknown';
      if (!rateLimit(`gdpr:${ip}`, 3, 60 * 60 * 1000)) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
      }
      const schema = z.object({ email: z.string().email() });
      const { email } = schema.parse(req.body);

      await storage.anonymisePurchasesByEmail(email);
      await storage.deleteEmailLeadByEmail(email);
      await storage.deleteMagicLinksByEmail(email);
      await pool.query(`DELETE FROM user_sessions WHERE sess->>'email' = $1`, [email.toLowerCase().trim()]);

      sendAdminNotification('GDPR data deletion processed', [
        { label: 'Email', value: email },
        { label: 'Time', value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }) },
        { label: 'Actions', value: 'Purchases anonymised · Email lead deleted · Magic links deleted · Sessions cleared' },
      ], 'gdpr_delete').catch(() => {});

      console.log('[gdpr] Data deletion request processed');
      return res.json({ success: true, message: 'All personal data for this email has been removed.' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Valid email address required' });
      }
      return res.status(500).json({ message: 'Failed to process deletion request' });
    }
  });

  app.post('/api/webhooks/stripe', async (req, res) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const rawBody = (req as any).rawBody;

    if (!Buffer.isBuffer(rawBody)) {
      console.error('[webhook] /api/webhooks/stripe: raw body not available');
      return res.status(500).json({ error: 'Webhook processing error' });
    }

    let event: any;
    const stripe = await getUncachableStripeClient();

    if (webhookSecret) {
      const signature = req.headers['stripe-signature'];
      if (!signature) {
        return res.status(400).json({ error: 'Missing stripe-signature header' });
      }
      try {
        const sig = Array.isArray(signature) ? signature[0] : signature;
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      } catch (err: any) {
        console.error('[webhook] Signature verification failed:', err.message);
        return res.status(400).json({ error: 'Webhook signature verification failed' });
      }
    } else {
      // No secret configured — parse unverified and log a prominent warning.
      // Set STRIPE_WEBHOOK_SECRET in environment secrets to enable verification.
      console.warn('[webhook] WARNING: STRIPE_WEBHOOK_SECRET not set — processing without signature verification. Set this secret to secure the endpoint.');
      try {
        event = JSON.parse(rawBody.toString('utf8'));
      } catch (err: any) {
        console.error('[webhook] Failed to parse raw body:', err.message);
        return res.status(400).json({ error: 'Invalid webhook payload' });
      }
    }

    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data?.object;
        if (session?.id && session?.payment_status === 'paid') {
          const purchase = await storage.getPurchaseByCheckoutSessionId(session.id);
          if (purchase && purchase.status !== 'paid') {
            const webhookEmail = session.customer_details?.email ?? null;
            await storage.markPurchasePaid(
              purchase.id,
              session.payment_intent as string || '',
              webhookEmail
            );
            sendAdminNotification('New purchase (Stripe webhook)', [
              { label: 'Customer email', value: webhookEmail || 'unknown' },
              { label: 'Purchase ID', value: purchase.id },
              { label: 'Stripe session', value: session.id },
              { label: 'Amount', value: '£79' },
              { label: 'Time', value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }) },
            ], 'purchase').catch(() => {});
            console.log('[webhook] Purchase marked paid for', webhookEmail || session.id);
          }

          const review = await storage.getExpertReviewByCheckoutSessionId(session.id);
          if (review && review.status !== 'paid') {
            await fulfillExpertReviewCheckout(session);
            console.log('[webhook] Expert review marked paid for', session.customer_details?.email || session.id);
          }
        }
      }
      return res.status(200).json({ received: true });
    } catch (err: any) {
      console.error('[webhook] Handler error:', err.message);
      return res.status(500).json({ error: 'Webhook handler error' });
    }
  });

  app.post(api.pdf.generate.path, async (req, res) => {
    try {
      console.log("Generating PDF for state:", req.body);
      await new Promise(resolve => setTimeout(resolve, 1000));
      res.json({ message: "PDF generation simulation successful. Check console." });
    } catch (error) {
       res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  // ─── Guided Report Summary ────────────────────────────────────────────────
  const guidedSummaryPayloadSchema = z.object({
    sessionToken: z.string().min(1),
    payload: z.object({
      userIntent: z.string().max(80).default(''),
      offerStatus: z.string().max(80).default(''),
      splitRatio: z.number().min(0).max(1),
      projectionYears: z.number().int().min(1).max(30).default(10),
      netEquity: z.number(),
      totalAssets: z.number(),
      totalLiabilities: z.number(),
      totalLiquid: z.number(),
      propertyValue: z.number().default(0),
      mortgageBalance: z.number().default(0),
      assets: z.array(z.object({
        category: z.string().max(60),
        value: z.number(),
      })),
      liabilities: z.array(z.object({
        category: z.string().max(60),
        balance: z.number(),
      })),
      usesExpenseBenchmarks: z.boolean().default(false),
      incomes: z.object({
        partyA: z.array(z.object({
          type: z.string().max(60),
          grossAnnual: z.number(),
          netAnnual: z.number(),
        })),
        partyB: z.array(z.object({
          type: z.string().max(60),
          grossAnnual: z.number(),
          netAnnual: z.number(),
        })),
      }),
      expenses: z.object({
        partyAAnnual: z.number(),
        partyBAnnual: z.number(),
        sharedAnnual: z.number(),
      }).default({ partyAAnnual: 0, partyBAnnual: 0, sharedAnnual: 0 }),
      hasProperty: z.boolean(),
      hasPension: z.boolean(),
      pensionTotalCETV: z.number(),
      pensionCETVPartyA: z.number().default(0),
      pensionCETVPartyB: z.number().default(0),
      childrenCount: z.number().int().min(0),
      cmsWeeklyEstimate: z.number().nullable(),
      maintenanceIncluded: z.boolean(),
      maintenanceMonthlyAmount: z.number(),
      maintenanceDirection: z.enum(["AtoB", "BtoA"]),
      scenarios: z.array(z.object({
        id: z.string().max(10),
        name: z.string().max(60),
        enabled: z.boolean(),
        liquidStartA: z.number(),
        liquidStartB: z.number(),
        pensionA: z.number(),
        pensionB: z.number(),
        totalA: z.number(),
        totalB: z.number(),
        affordable: z.boolean().optional(),
        fundingGap: z.number().optional(),
        monthlyMortgageA: z.number().default(0),
        monthlyMortgageB: z.number().default(0),
        homeEquityA: z.number().optional().default(0),
        homeEquityB: z.number().optional().default(0),
        runwayA: z.object({ sustained: z.boolean(), depletionYear: z.number().nullable() }),
        runwayB: z.object({ sustained: z.boolean(), depletionYear: z.number().nullable() }),
      })),
      budget: z.object({
        monthlyA: z.number(),
        monthlyB: z.number(),
      }),
      confidence: z.enum(["High", "Medium", "Low"]),
    }),
  });

  const guidedSummaryResponseSchema = z.object({
    overview: z.string().min(1),
    what_stands_out: z.string().min(1),
    scenario_interpretation: z.string().min(1),
    pressure_points: z.string().min(1),
    questions_for_professionals: z.object({
      solicitor_mediator: z.array(z.string().min(1)),
      mortgage_broker: z.array(z.string().min(1)),
      pension_expert: z.array(z.string().min(1)),
    }),
    missing_information: z.string().min(1),
  });

  type GuidedSummaryPayload = z.infer<typeof guidedSummaryPayloadSchema>["payload"];
  type GuidedSummaryAiResponse = z.infer<typeof guidedSummaryResponseSchema>;
  type DeterministicPositionCheck = {
    missing_values: string[];
    left_short_risk: string[];
    offer_trade_offs: string[];
    housing_needs_pressure: string[];
    questions_before_agreeing: string[];
  };
  type GuidedSummaryResponse = GuidedSummaryAiResponse & {
    position_check: DeterministicPositionCheck;
  };

  const formatGBP = (value: number) => `£${Math.round(value).toLocaleString('en-GB')}`;

  function buildDeterministicPositionCheck(
    payload: GuidedSummaryPayload,
    derived: {
      grossA: number;
      grossB: number;
      netAnnualA: number;
      netAnnualB: number;
      ltv: number | null;
      borrowCapA: number | null;
      borrowCapB: number | null;
      nonPensionSettlementPool: number;
    }
  ): DeterministicPositionCheck {
    const enabledScenarios = payload.scenarios.filter((scenario) => scenario.enabled);
    const depletedRunways = enabledScenarios.flatMap((scenario) => [
      ...(!scenario.runwayA.sustained ? [`Party A reserve depletion in year ${scenario.runwayA.depletionYear} under ${scenario.name}`] : []),
      ...(!scenario.runwayB.sustained ? [`Party B reserve depletion in year ${scenario.runwayB.depletionYear} under ${scenario.name}`] : []),
    ]);
    const missingValues = [
      ...(payload.hasPension ? ["Check that pension CETV figures are current and entered for every pension."] : ["No pension CETV figures are entered, so pension comparison cannot be tested in this model."]),
      ...(payload.hasProperty ? ["Check the property value, mortgage balance and sale cost assumptions against current evidence."] : ["No property value is entered, so home or rehousing pressure cannot be tested."]),
      ...(payload.usesExpenseBenchmarks ? ["Replace editable starting expense estimates with actual monthly bills when available."] : ["Core expense inputs have been entered; check they reflect post-separation costs rather than current household costs."]),
    ];

    return {
      missing_values: missingValues,
      left_short_risk: [
        payload.budget.monthlyA < 0 ? `Party A has a base monthly deficit of ${formatGBP(Math.abs(payload.budget.monthlyA))} before scenario-specific mortgage effects.` : `Party A base monthly surplus is ${formatGBP(payload.budget.monthlyA)} before scenario-specific mortgage effects.`,
        payload.budget.monthlyB < 0 ? `Party B has a base monthly deficit of ${formatGBP(Math.abs(payload.budget.monthlyB))} before scenario-specific mortgage effects.` : `Party B base monthly surplus is ${formatGBP(payload.budget.monthlyB)} before scenario-specific mortgage effects.`,
        ...depletedRunways.slice(0, 2),
      ],
      offer_trade_offs: [
        `Current model split is ${Math.round(payload.splitRatio * 100)}% to Party A and ${Math.round((1 - payload.splitRatio) * 100)}% to Party B.`,
        "Compare liquid cash, pension value and monthly surplus together rather than relying on one headline percentage.",
        ...(payload.hasPension ? ["Pension values are modelled separately from liquid assets so property-heavy outcomes can be compared with pension-heavy outcomes."] : []),
      ],
      housing_needs_pressure: payload.hasProperty
        ? [
            `Property value entered: ${formatGBP(payload.propertyValue)}; mortgage balance entered: ${formatGBP(payload.mortgageBalance)}${derived.ltv !== null ? `; loan to value ${derived.ltv}%` : ""}.`,
            ...(derived.borrowCapA !== null ? [`Party A benchmark solo borrowing capacity is approximately ${formatGBP(derived.borrowCapA)} based on 4.5x gross income.`] : []),
            ...(derived.borrowCapB !== null ? [`Party B benchmark solo borrowing capacity is approximately ${formatGBP(derived.borrowCapB)} based on 4.5x gross income.`] : []),
          ]
        : ["Housing pressure cannot be tested because no property value is entered."],
      questions_before_agreeing: [
        "Are all property, pension, debt, income and expense figures current enough to rely on for discussion?",
        "Which scenario creates the weakest monthly cashflow position under the current assumptions?",
        "What figures would change most if pension CETVs, property valuation or expenses are updated?",
        "Which professional should check any assumptions that materially affect the model?",
      ],
    };
  }

  function buildSafeGuidedSummary(
    payload: GuidedSummaryPayload,
    derived: {
      grossA: number;
      grossB: number;
      netAnnualA: number;
      netAnnualB: number;
      ltv: number | null;
      borrowCapA: number | null;
      borrowCapB: number | null;
      nonPensionSettlementPool: number;
    }
  ): GuidedSummaryResponse {
    const enabledScenarios = payload.scenarios.filter((scenario) => scenario.enabled);
    const pensionGap = Math.abs(payload.pensionCETVPartyA - payload.pensionCETVPartyB);
    const monthlyGap = Math.abs(payload.budget.monthlyA - payload.budget.monthlyB);
    const fundingGaps = enabledScenarios.filter((scenario) => (scenario.fundingGap ?? 0) > 0);
    const depletedRunways = enabledScenarios.flatMap((scenario) => [
      ...(!scenario.runwayA.sustained ? [`Party A reserve depletion in year ${scenario.runwayA.depletionYear} under ${scenario.name}`] : []),
      ...(!scenario.runwayB.sustained ? [`Party B reserve depletion in year ${scenario.runwayB.depletionYear} under ${scenario.name}`] : []),
    ]);

    const whatStandsOut = [
      `• Total assets entered: ${formatGBP(payload.totalAssets)}; total liabilities entered: ${formatGBP(payload.totalLiabilities)}.`,
      `• Non-pension settlement pool modelled: ${formatGBP(derived.nonPensionSettlementPool)} (${formatGBP(payload.netEquity)} net home equity plus ${formatGBP(payload.totalLiquid)} liquid assets).`,
      ...(payload.hasProperty && derived.ltv !== null
        ? [`• Property value entered: ${formatGBP(payload.propertyValue)} with ${formatGBP(payload.mortgageBalance)} mortgage balance (${derived.ltv}% loan to value).`]
        : []),
      ...(payload.hasPension
        ? [`• Pension Cash Equivalent Transfer Values entered: Party A ${formatGBP(payload.pensionCETVPartyA)}, Party B ${formatGBP(payload.pensionCETVPartyB)}.`]
        : []),
      ...(derived.grossA > 0 || derived.grossB > 0
        ? [`• Gross incomes entered: Party A ${formatGBP(derived.grossA)} and Party B ${formatGBP(derived.grossB)} per year.`]
        : []),
    ].slice(0, 5);

    const scenarioInterpretation = enabledScenarios.map((scenario) => {
      const mortgageLines = [
        scenario.monthlyMortgageA > 0 ? `Party A modelled mortgage payment: ${formatGBP(scenario.monthlyMortgageA)} per month.` : "",
        scenario.monthlyMortgageB > 0 ? `Party B modelled mortgage payment: ${formatGBP(scenario.monthlyMortgageB)} per month.` : "",
        scenario.affordable !== undefined ? `The model marks mortgage affordability as ${scenario.affordable ? "within" : "outside"} the benchmark used.` : "",
      ].filter(Boolean).join(" ");
      const runwayA = scenario.runwayA.sustained
        ? `Party A reserves are sustained over ${payload.projectionYears} years`
        : `Party A reserves deplete in year ${scenario.runwayA.depletionYear}`;
      const runwayB = scenario.runwayB.sustained
        ? `Party B reserves are sustained over ${payload.projectionYears} years`
        : `Party B reserves deplete in year ${scenario.runwayB.depletionYear}`;
      return `${scenario.name}: Party A modelled total ${formatGBP(scenario.totalA)} (${formatGBP(scenario.liquidStartA)} liquid, ${formatGBP(scenario.pensionA)} pension). Party B modelled total ${formatGBP(scenario.totalB)} (${formatGBP(scenario.liquidStartB)} liquid, ${formatGBP(scenario.pensionB)} pension). ${mortgageLines} ${runwayA}; ${runwayB}.`;
    }).join("\n");

    const pressurePoints = [
      ...(fundingGaps.length > 0
        ? fundingGaps.map((scenario) => `• ${scenario.name} shows a modelled funding gap of ${formatGBP(scenario.fundingGap ?? 0)}.`)
        : []),
      ...(depletedRunways.length > 0 ? depletedRunways.slice(0, 2).map((line) => `• ${line}.`) : []),
      ...(monthlyGap > 0 ? [`• Base monthly budget surplus differs by ${formatGBP(monthlyGap)} between the parties before scenario-specific mortgage effects.`] : []),
      ...(payload.hasPension && pensionGap > 0 ? [`• Pension CETV gap entered between parties is ${formatGBP(pensionGap)}.`] : []),
      ...(payload.usesExpenseBenchmarks ? [`• Some living costs are editable starting estimates, so actual bills may change the pressure shown.`] : []),
    ].slice(0, 4);

    return {
      overview: `This is a deterministic financial summary based on the figures entered. The model includes ${formatGBP(payload.totalAssets)} of assets, ${formatGBP(payload.totalLiabilities)} of liabilities, ${formatGBP(payload.netEquity)} of net home equity and ${formatGBP(payload.totalLiquid)} of liquid assets before home sale. The non-pension settlement pool used for comparison is ${formatGBP(derived.nonPensionSettlementPool)}. Gross incomes entered are Party A ${formatGBP(derived.grossA)} and Party B ${formatGBP(derived.grossB)} per year.\nNote: This is an illustrative summary based on the figures entered. It is not legal, tax, or financial advice. Please consult qualified professionals before making any decisions.`,
      what_stands_out: whatStandsOut.join("\n"),
      scenario_interpretation: scenarioInterpretation || "No enabled scenarios were available to interpret from the submitted model.",
      pressure_points: pressurePoints.length > 0
        ? pressurePoints.join("\n")
        : "• No major numerical pressure point was identified from the submitted figures, but values should still be checked before relying on the model.",
      position_check: buildDeterministicPositionCheck(payload, derived),
      questions_for_professionals: {
        solicitor_mediator: [
          `How should we understand the modelled capital positions under the current ${Math.round(payload.splitRatio * 100)}/${Math.round((1 - payload.splitRatio) * 100)} split assumption?`,
          `What further information is needed before relying on the entered asset total of ${formatGBP(payload.totalAssets)} and liability total of ${formatGBP(payload.totalLiabilities)}?`,
          ...(payload.hasPension ? [`How should the entered pension CETVs of Party A ${formatGBP(payload.pensionCETVPartyA)} and Party B ${formatGBP(payload.pensionCETVPartyB)} be checked before discussions?`] : []),
        ],
        mortgage_broker: payload.hasProperty
          ? [
              `Does the mortgage balance of ${formatGBP(payload.mortgageBalance)} look supportable against Party A gross income of ${formatGBP(derived.grossA)} and Party B gross income of ${formatGBP(derived.grossB)}?`,
              ...(derived.borrowCapA !== null ? [`How does Party A's approximate ${formatGBP(derived.borrowCapA)} income-multiple benchmark compare with any keep-home scenario?`] : []),
              ...(derived.borrowCapB !== null ? [`How does Party B's approximate ${formatGBP(derived.borrowCapB)} income-multiple benchmark compare with any keep-home scenario?`] : []),
            ]
          : [],
        pension_expert: payload.hasPension
          ? [
              `Are the entered pension CETV figures current for Party A (${formatGBP(payload.pensionCETVPartyA)}) and Party B (${formatGBP(payload.pensionCETVPartyB)})?`,
              "Is any specialist pension valuation needed before comparing pension value with property or liquid assets?",
            ]
          : [],
      },
      missing_information: `Model confidence is ${payload.confidence}. ${payload.usesExpenseBenchmarks ? "Some living costs are editable starting estimates and should be replaced with actual figures when available. " : ""}The most important checks are current property values, mortgage balances, pension CETVs, debts, income evidence and realistic post-separation expenses. This section is generated from fixed rules if AI output is unavailable or unsafe.`,
    };
  }

  app.post('/api/guided-summary', async (req, res) => {
    try {
      const parsed = guidedSummaryPayloadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: 'Invalid request payload', errors: parsed.error.flatten() });
      }

      const { sessionToken, payload } = parsed.data;

      // Verify paid access (skipped in local dev when DEV_BYPASS_PAYWALL=true)
      if (!devBypassPaywall()) {
        const purchase = await storage.getPurchaseBySessionToken(sessionToken);
        if (!purchase) {
          return res.status(403).json({ message: 'No active purchase found for this session.' });
        }
        if (purchase.expiresAt && new Date() > new Date(purchase.expiresAt)) {
          return res.status(403).json({ message: 'Your access has expired. Please renew to use this feature.' });
        }
      }

      // Rate limit: max 3 calls per session per hour
      const rlKey = `guided-summary:${sessionToken}`;
      if (!rateLimit(rlKey, 3, 60 * 60 * 1000)) {
        return res.status(429).json({ message: 'You have generated too many summaries recently. Please try again in an hour.' });
      }

      // Derived metrics for the user prompt
      const grossA = payload.incomes.partyA.reduce((s, i) => s + i.grossAnnual, 0);
      const grossB = payload.incomes.partyB.reduce((s, i) => s + i.grossAnnual, 0);
      const netAnnualA = payload.incomes.partyA.reduce((s, i) => s + i.netAnnual, 0);
      const netAnnualB = payload.incomes.partyB.reduce((s, i) => s + i.netAnnual, 0);
      const ltv = payload.hasProperty && payload.propertyValue > 0
        ? Math.round((payload.mortgageBalance / payload.propertyValue) * 100)
        : null;
      const borrowCapA = grossA > 0 ? Math.round(grossA * 4.5) : null;
      const borrowCapB = grossB > 0 ? Math.round(grossB * 4.5) : null;
      const nonPensionSettlementPool = payload.netEquity + payload.totalLiquid;

      // Build the user prompt from the validated payload
      const userPrompt = `Here is the financial model data for this case. Generate a Guided Report Summary.

USER INTENT: ${payload.userIntent || 'Not selected'}
OFFER STATUS: ${payload.offerStatus || 'Not selected'}
SPLIT RATIO: ${Math.round(payload.splitRatio * 100)}% to Party A, ${Math.round((1 - payload.splitRatio) * 100)}% to Party B
MODELLED PROJECTION PERIOD: ${payload.projectionYears} years
TOTAL ASSETS: £${payload.totalAssets.toLocaleString('en-GB')}
TOTAL LIABILITIES: £${payload.totalLiabilities.toLocaleString('en-GB')}
NET EQUITY (home after sale costs): £${payload.netEquity.toLocaleString('en-GB')}
LIQUID ASSETS BEFORE HOME SALE (cash/investments): £${payload.totalLiquid.toLocaleString('en-GB')}
NON-PENSION SETTLEMENT POOL (net home equity + liquid assets): £${nonPensionSettlementPool.toLocaleString('en-GB')}
${payload.hasProperty && payload.propertyValue > 0 ? `PROPERTY VALUE: £${payload.propertyValue.toLocaleString('en-GB')}
OUTSTANDING MORTGAGE BALANCE: £${payload.mortgageBalance.toLocaleString('en-GB')}
LOAN TO VALUE (LTV): ${ltv}%` : ''}

ASSETS:
${payload.assets.map(a => `- ${a.category}: £${a.value.toLocaleString('en-GB')}`).join('\n')}

LIABILITIES:
${payload.liabilities.length > 0 ? payload.liabilities.map(l => `- ${l.category}: £${l.balance.toLocaleString('en-GB')}`).join('\n') : '- None entered'}

INCOME — PARTY A:
${payload.incomes.partyA.length > 0 ? payload.incomes.partyA.map(i => `- ${i.type}: £${i.grossAnnual.toLocaleString('en-GB')} gross / £${i.netAnnual.toLocaleString('en-GB')} net per year (≈ £${Math.round(i.netAnnual / 12).toLocaleString('en-GB')}/mo net)`).join('\n') : '- No income entered'}
${grossA > 0 ? `PARTY A TOTAL GROSS: £${grossA.toLocaleString('en-GB')} / NET ANNUAL: £${netAnnualA.toLocaleString('en-GB')} / NET MONTHLY: £${Math.round(netAnnualA / 12).toLocaleString('en-GB')}` : ''}
${borrowCapA !== null && payload.hasProperty ? `PARTY A ESTIMATED SOLO BORROWING CAPACITY (4.5x gross income): ~£${borrowCapA.toLocaleString('en-GB')}` : ''}

INCOME — PARTY B:
${payload.incomes.partyB.length > 0 ? payload.incomes.partyB.map(i => `- ${i.type}: £${i.grossAnnual.toLocaleString('en-GB')} gross / £${i.netAnnual.toLocaleString('en-GB')} net per year (≈ £${Math.round(i.netAnnual / 12).toLocaleString('en-GB')}/mo net)`).join('\n') : '- No income entered'}
${grossB > 0 ? `PARTY B TOTAL GROSS: £${grossB.toLocaleString('en-GB')} / NET ANNUAL: £${netAnnualB.toLocaleString('en-GB')} / NET MONTHLY: £${Math.round(netAnnualB / 12).toLocaleString('en-GB')}` : ''}
${borrowCapB !== null && payload.hasProperty ? `PARTY B ESTIMATED SOLO BORROWING CAPACITY (4.5x gross income): ~£${borrowCapB.toLocaleString('en-GB')}` : ''}

BASE MONTHLY BUDGET SURPLUS (before mortgage, pre-scenario):
  Party A: £${payload.budget.monthlyA.toLocaleString('en-GB')}/mo
  Party B: £${payload.budget.monthlyB.toLocaleString('en-GB')}/mo

POST-SEPARATION EXPENSES ENTERED:
  Party A annual expenses: £${payload.expenses.partyAAnnual.toLocaleString('en-GB')} (≈ £${Math.round(payload.expenses.partyAAnnual / 12).toLocaleString('en-GB')}/mo)
  Party B annual expenses: £${payload.expenses.partyBAnnual.toLocaleString('en-GB')} (≈ £${Math.round(payload.expenses.partyBAnnual / 12).toLocaleString('en-GB')}/mo)
  Shared annual expenses: £${payload.expenses.sharedAnnual.toLocaleString('en-GB')} (≈ £${Math.round(payload.expenses.sharedAnnual / 12).toLocaleString('en-GB')}/mo)
  Uses editable starting expense estimates: ${payload.usesExpenseBenchmarks ? 'Yes' : 'No'}

HAS PROPERTY: ${payload.hasProperty ? 'Yes' : 'No'}
HAS PENSION: ${payload.hasPension ? 'Yes' : 'No'}
${payload.hasPension ? `PENSION CETVs:
  Party A pension CETV: £${payload.pensionCETVPartyA.toLocaleString('en-GB')}
  Party B pension CETV: £${payload.pensionCETVPartyB.toLocaleString('en-GB')}
  Combined pension CETV: £${payload.pensionTotalCETV.toLocaleString('en-GB')}` : ''}
CHILDREN COUNT: ${payload.childrenCount}
${payload.cmsWeeklyEstimate !== null ? `CHILD MAINTENANCE ESTIMATE: £${payload.cmsWeeklyEstimate.toLocaleString('en-GB', { maximumFractionDigits: 2 })} per week` : 'CHILD MAINTENANCE: Not modelled'}
${payload.maintenanceIncluded ? `SPOUSAL MAINTENANCE: £${payload.maintenanceMonthlyAmount.toLocaleString('en-GB')} per month, direction: ${payload.maintenanceDirection === 'AtoB' ? 'Party A → Party B' : 'Party B → Party A'}` : 'SPOUSAL MAINTENANCE: Not included'}

SCENARIOS MODELLED:
${payload.scenarios.filter(s => s.enabled).map(s => {
  const mtgA = s.monthlyMortgageA > 0 ? `\n  Monthly mortgage (Party A): £${Math.round(s.monthlyMortgageA).toLocaleString('en-GB')}/mo` : '';
  const mtgB = s.monthlyMortgageB > 0 ? `\n  Monthly mortgage (Party B): £${Math.round(s.monthlyMortgageB).toLocaleString('en-GB')}/mo` : '';
  const homeA = s.homeEquityA > 0 ? ` + £${Math.round(s.homeEquityA).toLocaleString('en-GB')} home equity` : '';
  const homeB = s.homeEquityB > 0 ? ` + £${Math.round(s.homeEquityB).toLocaleString('en-GB')} home equity` : '';
  const gap = s.fundingGap !== undefined && s.fundingGap > 0 ? `\n  Funding gap to cover buyout: £${s.fundingGap.toLocaleString('en-GB')}` : '';
  const afford = s.affordable !== undefined ? `\n  Mortgage within solo lending capacity: ${s.affordable ? 'Yes' : 'No'}` : '';
  return `
Scenario: ${s.name}
  Party A receives: £${s.liquidStartA.toLocaleString('en-GB')} liquid${homeA} + £${s.pensionA.toLocaleString('en-GB')} pension = £${s.totalA.toLocaleString('en-GB')} total${mtgA}${mtgB}${afford}${gap}
  Party B receives: £${s.liquidStartB.toLocaleString('en-GB')} liquid${homeB} + £${s.pensionB.toLocaleString('en-GB')} pension = £${s.totalB.toLocaleString('en-GB')} total
  Party A ${payload.projectionYears}-year runway: ${s.runwayA.sustained ? 'Sustained' : `Depletes in year ${s.runwayA.depletionYear}`}
  Party B ${payload.projectionYears}-year runway: ${s.runwayB.sustained ? 'Sustained' : `Depletes in year ${s.runwayB.depletionYear}`}`;
}).join('\n')}

MODEL CONFIDENCE: ${payload.confidence}

Please generate the Guided Report Summary JSON now.`;

      const safeSummary = buildSafeGuidedSummary(payload, {
        grossA,
        grossB,
        netAnnualA,
        netAnnualB,
        ltv,
        borrowCapA,
        borrowCapB,
        nonPensionSettlementPool,
      });

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4.1-mini",
          messages: [
            { role: "system", content: GUIDED_SUMMARY_SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
          max_tokens: 3000,
          response_format: { type: "json_object" },
        });

        const raw = response.choices[0]?.message?.content;
        if (!raw) {
          console.warn('[guided-summary] Empty AI response; using deterministic fallback.');
          return res.json({
            ...safeSummary,
            confidence: payload.confidence,
            generatedAt: new Date().toISOString(),
          });
        }

        let summaryData: Record<string, unknown>;
        try {
          summaryData = JSON.parse(raw);
        } catch {
          console.warn('[guided-summary] Invalid AI JSON; using deterministic fallback.');
          return res.json({
            ...safeSummary,
            confidence: payload.confidence,
            generatedAt: new Date().toISOString(),
          });
        }

        const validatedSummary = guidedSummaryResponseSchema.safeParse(summaryData);
        if (!validatedSummary.success) {
          console.warn('[guided-summary] Incomplete AI summary; using deterministic fallback.');
          return res.json({
            ...safeSummary,
            confidence: payload.confidence,
            generatedAt: new Date().toISOString(),
          });
        }

        const forbiddenPhrase = hasForbiddenGuidedSummaryPhrase(validatedSummary.data);
        if (forbiddenPhrase) {
          console.warn('[guided-summary] Rejected AI summary for forbidden phrase; using deterministic fallback:', forbiddenPhrase);
          return res.json({
            ...safeSummary,
            confidence: payload.confidence,
            generatedAt: new Date().toISOString(),
          });
        }

        return res.json({
          ...validatedSummary.data,
          position_check: safeSummary.position_check,
          confidence: payload.confidence,
          generatedAt: new Date().toISOString(),
        });
      } catch (err: unknown) {
        if (err && typeof err === 'object' && 'status' in err && (err as { status: number }).status === 429) {
          return res.status(429).json({ message: 'The summary service is busy. Please try again in a moment.' });
        }
        console.warn('[guided-summary] AI generation failed; using deterministic fallback.', err);
        return res.json({
          ...safeSummary,
          confidence: payload.confidence,
          generatedAt: new Date().toISOString(),
        });
      }

    } catch (err: unknown) {
      console.error('Guided summary error:', err);
      if (err && typeof err === 'object' && 'status' in err && (err as { status: number }).status === 429) {
        return res.status(429).json({ message: 'The summary service is busy. Please try again in a moment.' });
      }
      return res.status(502).json({ message: 'Something went wrong generating your summary. Please try again.' });
    }
  });

  app.get("/api/cron/nurture-emails", requireCronSecret, async (_req, res) => {
    try {
      const { runEmailScheduler } = await import("./email-scheduler");
      await runEmailScheduler();
      return res.json({ ok: true });
    } catch (err) {
      console.error("[cron] nurture-emails error:", err);
      return res.status(500).json({ message: "Scheduler failed" });
    }
  });
}
