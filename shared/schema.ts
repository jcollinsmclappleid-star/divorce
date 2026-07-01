import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { DivorceModelInputsSchema, Party, AssetCategory, LiabilityCategory, ExpenseCategory } from "./divorce_types";

export const purchases = pgTable("purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionToken: varchar("session_token").notNull(),
  stripeCheckoutSessionId: text("stripe_checkout_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  email: text("email"),
  status: text("status").notNull().default("pending"),
  purchasedAt: timestamp("purchased_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

/** Optional £129 report walkthrough support — separate from main £79 purchase. */
export const reportSupportPurchases = pgTable("report_support_purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionToken: varchar("session_token").notNull(),
  stripeCheckoutSessionId: text("stripe_checkout_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  email: text("email"),
  status: text("status").notNull().default("pending"),
  purchasedAt: timestamp("purchased_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const magicLinks = pgTable("magic_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  token: varchar("token", { length: 128 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type MagicLink = typeof magicLinks.$inferSelect;

export const emailLeads = pgTable("email_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  firstName: text("first_name"),
  source: text("source").default("free_guide"),
  assetPoolSnapshot: text("asset_pool_snapshot"),
  verified: boolean("verified").notNull().default(false),
  verificationToken: varchar("verification_token"),
  createdAt: timestamp("created_at").defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at"),
  /** When this lead entered nurture v2 — each email is scheduled relative to this timestamp. */
  nurtureEnrolledAt: timestamp("nurture_enrolled_at"),
  /** 0 = not on v2 sequence; 2 = nurture v2 */
  nurtureVersion: integer("nurture_version").notNull().default(0),
  /** v2 day 3 — gentle re-engage */
  followup1SentAt: timestamp("followup1_sent_at"),
  /** v2 day 14 — monthly headroom (column reused from legacy promo slot) */
  promoSentAt: timestamp("promo_sent_at"),
  /** v2 day 7 — share / what each path leaves you with */
  followup2SentAt: timestamp("followup2_sent_at"),
  /** v2 day 21 — questions before you agree */
  followup3SentAt: timestamp("followup3_sent_at"),
  /** v2 day 35 — final sign-off */
  followup4SentAt: timestamp("followup4_sent_at"),
});

export const insertEmailLeadSchema = createInsertSchema(emailLeads).omit({ id: true, createdAt: true });
export type EmailLead = typeof emailLeads.$inferSelect;
export type InsertEmailLead = z.infer<typeof insertEmailLeadSchema>;

export const insertPurchaseSchema = createInsertSchema(purchases).omit({ id: true, createdAt: true });

export const AppStateSchema = z.object({
  inputs: DivorceModelInputsSchema,
  activeScenario: z.string(),
  metadata: z.record(z.any()).optional()
});

export const AppConfigSchema = z.object({
  taxYear: z.string(),
  currency: z.string()
});

export const Owner = Party;

export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type ReportSupportPurchase = typeof reportSupportPurchases.$inferSelect;
export type AppState = z.infer<typeof AppStateSchema>;

export { AssetCategory, LiabilityCategory, ExpenseCategory };
export { DivorceModelInputsSchema };
export * from "./divorce_types";
