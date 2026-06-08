import type { Express } from "express";
import type { Server } from "http";
import path from "path";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import crypto from "crypto";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { seedDatabase } from "./seed";
import { sendPurchaseConfirmationEmail, sendAccessRecoveryEmail, sendEmailVerificationEmail, sendProgressSummaryEmail, sendMagicLinkEmail, sendAdminNotification } from "./email";
import { db, pool } from "./db";
import { emailLeads as emailLeadsTable, purchases as purchasesTable } from "@shared/schema";
import { and, eq, isNull, isNotNull } from "drizzle-orm";
import OpenAI from "openai";
import { GUIDED_SUMMARY_SYSTEM_PROMPT } from "./guided-summary/prompt";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

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
      const { sessionToken } = req.body;
      if (!sessionToken) {
        return res.status(400).json({ message: 'sessionToken is required' });
      }

      const stripe = await getUncachableStripeClient();

      // Use product ID directly for reliability
      const productId = 'prod_U08zTEPeHZJAOf';
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

      // Use the £79 price specifically
      const priceId = 'price_1TBKqaDv8IzJrrwISpwdyA32';

      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const logoUrl = 'https://divorcecalculatoruk.co.uk/og-image.png';
      if (!product.images || product.images.length === 0) {
        await stripe.products.update(productId, { images: [logoUrl] });
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/unlock`,
        custom_text: {
          submit: { message: 'You\'ll get instant access for 12 months. All calculations remain private in your browser.' },
        },
        metadata: {
          sessionToken,
        },
      });

      await storage.createPurchase({
        sessionToken,
        stripeCheckoutSessionId: checkoutSession.id,
        status: 'pending',
      });

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
        res.json({ 
          status: 'paid', 
          sessionToken: updatedPurchase?.sessionToken,
          expiresAt: updatedPurchase?.expiresAt 
        });
      } else {
        res.json({ status: session.payment_status });
      }
    } catch (err: any) {
      console.error('Verify error:', err);
      res.status(500).json({ message: 'Failed to verify payment' });
    }
  });

  app.get('/api/access/:sessionToken', async (req, res) => {
    try {
      // Disable HTTP caching — auth state must always be fresh, and Set-Cookie
      // headers can be dropped on 304 responses.
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');

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

      const baseUrl = `${req.protocol}://${req.get('host')}`;
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
      const isSummarySource = source === 'preview_page' || source === 'wizard_preview';
      if (!existing) {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        await storage.createEmailLead(email, firstName, source, verificationToken);
        sendAdminNotification('New email lead captured', [
          { label: 'Email', value: email },
          { label: 'Name', value: firstName || '—' },
          { label: 'Source', value: source || '—' },
          { label: 'Time', value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }) },
        ], 'lead_capture').catch(() => {});
        if (isSummarySource) {
          await sendProgressSummaryEmail(email, assetPoolSnapshot || '');
          await storage.verifyEmailLead((await storage.getEmailLeadByEmail(email))!.id);
        } else {
          await sendEmailVerificationEmail(email, verificationToken);
        }
      } else if (isSummarySource) {
        await sendProgressSummaryEmail(email, assetPoolSnapshot || '');
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
      splitRatio: z.number().min(0).max(1),
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

  app.post('/api/guided-summary', async (req, res) => {
    try {
      const parsed = guidedSummaryPayloadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: 'Invalid request payload', errors: parsed.error.flatten() });
      }

      const { sessionToken, payload } = parsed.data;

      // Verify paid access
      const purchase = await storage.getPurchaseBySessionToken(sessionToken);
      if (!purchase) {
        return res.status(403).json({ message: 'No active purchase found for this session.' });
      }
      if (purchase.expiresAt && new Date() > new Date(purchase.expiresAt)) {
        return res.status(403).json({ message: 'Your access has expired. Please renew to use this feature.' });
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

      // Build the user prompt from the validated payload
      const userPrompt = `Here is the financial model data for this case. Generate a Guided Report Summary.

SPLIT RATIO: ${Math.round(payload.splitRatio * 100)}% to Party A, ${Math.round((1 - payload.splitRatio) * 100)}% to Party B
TOTAL ASSETS: £${payload.totalAssets.toLocaleString('en-GB')}
TOTAL LIABILITIES: £${payload.totalLiabilities.toLocaleString('en-GB')}
NET EQUITY (home after sale costs): £${payload.netEquity.toLocaleString('en-GB')}
TOTAL LIQUID ASSETS (distributable pool): £${payload.totalLiquid.toLocaleString('en-GB')}
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
  const gap = s.fundingGap !== undefined && s.fundingGap > 0 ? `\n  Funding gap to cover buyout: £${s.fundingGap.toLocaleString('en-GB')}` : '';
  const afford = s.affordable !== undefined ? `\n  Mortgage within solo lending capacity: ${s.affordable ? 'Yes' : 'No'}` : '';
  return `
Scenario: ${s.name}
  Party A receives: £${s.liquidStartA.toLocaleString('en-GB')} liquid + £${s.pensionA.toLocaleString('en-GB')} pension = £${s.totalA.toLocaleString('en-GB')} total${mtgA}${mtgB}${afford}${gap}
  Party B receives: £${s.liquidStartB.toLocaleString('en-GB')} liquid + £${s.pensionB.toLocaleString('en-GB')} pension = £${s.totalB.toLocaleString('en-GB')} total
  Party A 10-year runway: ${s.runwayA.sustained ? 'Sustained' : `Depletes in year ${s.runwayA.depletionYear}`}
  Party B 10-year runway: ${s.runwayB.sustained ? 'Sustained' : `Depletes in year ${s.runwayB.depletionYear}`}`;
}).join('\n')}

MODEL CONFIDENCE: ${payload.confidence}

Please generate the Guided Report Summary JSON now.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: GUIDED_SUMMARY_SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 3000,
        response_format: { type: "json_object" },
      });

      const raw = response.choices[0]?.message?.content;
      if (!raw) {
        return res.status(502).json({ message: 'The summary service returned an empty response. Please try again.' });
      }

      let summaryData: Record<string, unknown>;
      try {
        summaryData = JSON.parse(raw);
      } catch {
        return res.status(502).json({ message: 'The summary service returned an unexpected format. Please try again.' });
      }

      // Validate required keys are present
      const requiredKeys = ['overview', 'what_stands_out', 'scenario_interpretation', 'pressure_points', 'questions_for_professionals', 'missing_information'];
      for (const key of requiredKeys) {
        if (!summaryData[key]) {
          return res.status(502).json({ message: 'The summary was incomplete. Please try again.' });
        }
      }

      return res.json({
        ...summaryData,
        confidence: payload.confidence,
        generatedAt: new Date().toISOString(),
      });

    } catch (err: unknown) {
      console.error('Guided summary error:', err);
      if (err && typeof err === 'object' && 'status' in err && (err as { status: number }).status === 429) {
        return res.status(429).json({ message: 'The summary service is busy. Please try again in a moment.' });
      }
      return res.status(502).json({ message: 'Something went wrong generating your summary. Please try again.' });
    }
  });

  return httpServer;
}
