import { db } from "./db";
import { purchases, emailLeads, magicLinks, reportSupportPurchases, type Purchase, type InsertPurchase, type EmailLead, type MagicLink, type ReportSupportPurchase } from "@shared/schema";
import { eq, and, sql, desc } from "drizzle-orm";

export interface IStorage {
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchaseById(id: string): Promise<Purchase | undefined>;
  getPurchaseBySessionToken(sessionToken: string): Promise<Purchase | undefined>;
  getPurchaseByCheckoutSessionId(checkoutSessionId: string): Promise<Purchase | undefined>;
  markPurchasePaid(id: string, paymentIntentId: string, email: string | null): Promise<Purchase>;
  getPaidPurchasesByEmail(email: string): Promise<Purchase[]>;
  createPurchaseFromStripeSession(checkoutSessionId: string, paymentIntentId: string, email: string): Promise<Purchase>;
  extendPurchaseExpiry(purchaseId: string, months: number): Promise<Purchase>;

  createEmailLead(email: string, firstName?: string, source?: string, verificationToken?: string): Promise<EmailLead>;
  getEmailLeadByEmail(email: string): Promise<EmailLead | undefined>;
  getEmailLeadByVerificationToken(token: string): Promise<EmailLead | undefined>;
  verifyEmailLead(id: string): Promise<EmailLead>;
  anonymisePurchasesByEmail(email: string): Promise<void>;
  deleteEmailLeadByEmail(email: string): Promise<void>;

  createMagicLink(email: string, token: string, expiresAt: Date): Promise<MagicLink>;
  getMagicLinkByToken(token: string): Promise<MagicLink | undefined>;
  useMagicLink(id: string): Promise<MagicLink>;
  deleteMagicLinksByEmail(email: string): Promise<void>;

  createReportSupportPurchase(data: {
    sessionToken: string;
    stripeCheckoutSessionId: string;
  }): Promise<ReportSupportPurchase>;
  getReportSupportByCheckoutSessionId(checkoutSessionId: string): Promise<ReportSupportPurchase | undefined>;
  getPaidReportSupportBySessionToken(sessionToken: string): Promise<ReportSupportPurchase | undefined>;
  markReportSupportPaid(id: string, paymentIntentId: string, email: string | null): Promise<ReportSupportPurchase>;
}

export class DatabaseStorage implements IStorage {
  async createPurchase(purchase: InsertPurchase): Promise<Purchase> {
    const [newPurchase] = await db.insert(purchases).values(purchase).returning();
    return newPurchase;
  }

  async getPurchaseById(id: string): Promise<Purchase | undefined> {
    const [purchase] = await db.select().from(purchases).where(eq(purchases.id, id));
    return purchase;
  }

  async getPurchaseBySessionToken(sessionToken: string): Promise<Purchase | undefined> {
    const [purchase] = await db
      .select()
      .from(purchases)
      .where(
        and(
          eq(purchases.sessionToken, sessionToken),
          eq(purchases.status, "paid")
        )
      );
    return purchase;
  }

  async getPurchaseByCheckoutSessionId(checkoutSessionId: string): Promise<Purchase | undefined> {
    const [purchase] = await db
      .select()
      .from(purchases)
      .where(eq(purchases.stripeCheckoutSessionId, checkoutSessionId));
    return purchase;
  }

  async markPurchasePaid(id: string, paymentIntentId: string, email: string | null): Promise<Purchase> {
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + 12);

    const [updated] = await db
      .update(purchases)
      .set({
        status: "paid",
        stripePaymentIntentId: paymentIntentId,
        email: email,
        purchasedAt: now,
        expiresAt: expiresAt,
      })
      .where(eq(purchases.id, id))
      .returning();
    return updated;
  }

  async getPaidPurchasesByEmail(email: string): Promise<Purchase[]> {
    return db
      .select()
      .from(purchases)
      .where(
        and(
          eq(purchases.email, email.toLowerCase().trim()),
          eq(purchases.status, "paid")
        )
      )
      .orderBy(desc(purchases.purchasedAt));
  }

  async createPurchaseFromStripeSession(checkoutSessionId: string, paymentIntentId: string, email: string): Promise<Purchase> {
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + 12);
    const { randomUUID } = await import('crypto');
    const [newPurchase] = await db.insert(purchases).values({
      id: randomUUID(),
      sessionToken: randomUUID(),
      stripeCheckoutSessionId: checkoutSessionId,
      stripePaymentIntentId: paymentIntentId,
      email: email.toLowerCase().trim(),
      status: 'paid',
      purchasedAt: now,
      expiresAt,
    }).returning();
    return newPurchase;
  }

  async extendPurchaseExpiry(purchaseId: string, months: number): Promise<Purchase> {
    const [purchase] = await db
      .select()
      .from(purchases)
      .where(eq(purchases.id, purchaseId));

    if (!purchase) throw new Error("Purchase not found");

    const currentExpiry = purchase.expiresAt ? new Date(purchase.expiresAt) : new Date();
    const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
    const newExpiry = new Date(baseDate);
    newExpiry.setMonth(newExpiry.getMonth() + months);

    const [updated] = await db
      .update(purchases)
      .set({ expiresAt: newExpiry })
      .where(eq(purchases.id, purchaseId))
      .returning();
    return updated;
  }
  async createEmailLead(email: string, firstName?: string, source?: string, verificationToken?: string): Promise<EmailLead> {
    const [lead] = await db.insert(emailLeads).values({
      email: email.toLowerCase().trim(),
      firstName: firstName ?? null,
      source: source ?? "free_guide",
      verified: false,
      verificationToken: verificationToken ?? null,
    }).returning();
    return lead;
  }

  async getEmailLeadByEmail(email: string): Promise<EmailLead | undefined> {
    const [lead] = await db
      .select()
      .from(emailLeads)
      .where(eq(emailLeads.email, email.toLowerCase().trim()));
    return lead;
  }

  async getEmailLeadByVerificationToken(token: string): Promise<EmailLead | undefined> {
    const [lead] = await db
      .select()
      .from(emailLeads)
      .where(eq(emailLeads.verificationToken, token));
    return lead;
  }

  async verifyEmailLead(id: string): Promise<EmailLead> {
    const [updated] = await db
      .update(emailLeads)
      .set({ verified: true, verificationToken: null })
      .where(eq(emailLeads.id, id))
      .returning();
    return updated;
  }

  async anonymisePurchasesByEmail(email: string): Promise<void> {
    await db
      .update(purchases)
      .set({ email: null })
      .where(eq(purchases.email, email.toLowerCase().trim()));
  }

  async deleteEmailLeadByEmail(email: string): Promise<void> {
    await db
      .delete(emailLeads)
      .where(eq(emailLeads.email, email.toLowerCase().trim()));
  }

  async createMagicLink(email: string, token: string, expiresAt: Date): Promise<MagicLink> {
    const [link] = await db.insert(magicLinks).values({
      email: email.toLowerCase().trim(),
      token,
      expiresAt,
    }).returning();
    return link;
  }

  async getMagicLinkByToken(token: string): Promise<MagicLink | undefined> {
    const [link] = await db.select().from(magicLinks).where(eq(magicLinks.token, token));
    return link;
  }

  async useMagicLink(id: string): Promise<MagicLink> {
    const [updated] = await db
      .update(magicLinks)
      .set({ usedAt: new Date() })
      .where(eq(magicLinks.id, id))
      .returning();
    return updated;
  }

  async deleteMagicLinksByEmail(email: string): Promise<void> {
    await db.delete(magicLinks).where(eq(magicLinks.email, email.toLowerCase().trim()));
  }

  async createReportSupportPurchase(data: {
    sessionToken: string;
    stripeCheckoutSessionId: string;
  }): Promise<ReportSupportPurchase> {
    const [row] = await db.insert(reportSupportPurchases).values({
      sessionToken: data.sessionToken,
      stripeCheckoutSessionId: data.stripeCheckoutSessionId,
      status: "pending",
    }).returning();
    return row;
  }

  async getReportSupportByCheckoutSessionId(checkoutSessionId: string): Promise<ReportSupportPurchase | undefined> {
    const [row] = await db
      .select()
      .from(reportSupportPurchases)
      .where(eq(reportSupportPurchases.stripeCheckoutSessionId, checkoutSessionId));
    return row;
  }

  async getPaidReportSupportBySessionToken(sessionToken: string): Promise<ReportSupportPurchase | undefined> {
    const [row] = await db
      .select()
      .from(reportSupportPurchases)
      .where(
        and(
          eq(reportSupportPurchases.sessionToken, sessionToken),
          eq(reportSupportPurchases.status, "paid"),
        ),
      );
    return row;
  }

  async markReportSupportPaid(id: string, paymentIntentId: string, email: string | null): Promise<ReportSupportPurchase> {
    const [updated] = await db
      .update(reportSupportPurchases)
      .set({
        status: "paid",
        stripePaymentIntentId: paymentIntentId,
        email: email?.toLowerCase().trim() ?? null,
        purchasedAt: new Date(),
      })
      .where(eq(reportSupportPurchases.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
