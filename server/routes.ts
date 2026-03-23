import type { Express } from "express";
import type { Server } from "http";
import path from "path";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import crypto from "crypto";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { seedDatabase } from "./seed";
import { sendPurchaseConfirmationEmail, sendAccessRecoveryEmail } from "./email";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
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
    <loc>https://divorcecalculatoruk.co.uk/about</loc>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://divorcecalculatoruk.co.uk/how-it-works</loc>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://divorcecalculatoruk.co.uk/faq</loc>
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
      if (!product || product.deleted) {
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
      const { sessionToken } = req.params;
      const purchase = await storage.getPurchaseBySessionToken(sessionToken);

      if (!purchase) {
        return res.json({ hasAccess: false, reason: 'no_purchase' });
      }

      if (purchase.expiresAt && new Date() > new Date(purchase.expiresAt)) {
        return res.json({ hasAccess: false, reason: 'expired', expiresAt: purchase.expiresAt });
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
      if (purchases.length === 0) {
        return res.json({ found: false });
      }

      const validPurchase = purchases.find(p => p.expiresAt && new Date(p.expiresAt) > new Date());
      if (!validPurchase) {
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

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.SESSION_SECRET || '';

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
      if (!existing) {
        await storage.createEmailLead(email, firstName, source, assetPoolSnapshot);
      }
      return res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Valid email address required' });
      }
      return res.status(500).json({ message: 'Failed to save' });
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

  app.post(api.sessions.create.path, async (req, res) => {
    try {
      const input = api.sessions.create.input.parse(req.body);
      const session = await storage.createSession({
        id: crypto.randomUUID(),
        name: input.name || "Untitled Session",
        data: input.data
      });
      res.status(201).json(session);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

  app.get(api.sessions.get.path, async (req, res) => {
    const session = await storage.getSession(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  });
  
  app.put(api.sessions.update.path, async (req, res) => {
    try {
      const input = api.sessions.update.input.parse(req.body);
      const session = await storage.updateSession(req.params.id, {
        name: input.name,
        data: input.data
      });
      res.json(session);
    } catch (err) {
       res.status(500).json({ message: "Failed to update session" });
    }
  });

  return httpServer;
}
