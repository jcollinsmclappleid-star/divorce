import { db } from "./db";
import { sessions, purchases, emailLeads, magicLinks, type Session, type InsertSession, type Purchase, type InsertPurchase, type EmailLead, type MagicLink } from "@shared/schema";
import { eq, and, sql, desc } from "drizzle-orm";

export interface IStorage {
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  updateSession(id: string, session: Partial<InsertSession>): Promise<Session>;

  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchaseBySessionToken(sessionToken: string): Promise<Purchase | undefined>;
  getPurchaseByCheckoutSessionId(checkoutSessionId: string): Promise<Purchase | undefined>;
  markPurchasePaid(id: string, paymentIntentId: string, email: string | null): Promise<Purchase>;
  getPaidPurchasesByEmail(email: string): Promise<Purchase[]>;
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
}

export class DatabaseStorage implements IStorage {
  async createSession(session: InsertSession): Promise<Session> {
    const [newSession] = await db.insert(sessions).values(session).returning();
    return newSession;
  }

  async getSession(id: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id));
    return session;
  }

  async updateSession(id: string, updates: Partial<InsertSession>): Promise<Session> {
    const [updated] = await db
      .update(sessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(sessions.id, id))
      .returning();
    return updated;
  }

  async createPurchase(purchase: InsertPurchase): Promise<Purchase> {
    const [newPurchase] = await db.insert(purchases).values(purchase).returning();
    return newPurchase;
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
}

export const storage = new DatabaseStorage();
