import { db } from "./db";
import { sessions, purchases, type Session, type InsertSession, type Purchase, type InsertPurchase } from "@shared/schema";
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
    expiresAt.setMonth(expiresAt.getMonth() + 6);

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
}

export const storage = new DatabaseStorage();
