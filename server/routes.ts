import type { Express } from "express";
import type { Server } from "http";
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
          submit: { message: 'You\'ll get instant access for 6 months. All calculations remain private in your browser.' },
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
