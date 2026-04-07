import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { DivorceModelInputsSchema, Party, AssetCategory, LiabilityCategory, ExpenseCategory } from "./divorce_types";

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().default("Untitled Session"),
  data: jsonb("data").notNull(), 
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

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

export const emailLeads = pgTable("email_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  firstName: text("first_name"),
  source: text("source").default("free_guide"),
  assetPoolSnapshot: text("asset_pool_snapshot"),
  verified: boolean("verified").notNull().default(false),
  verificationToken: varchar("verification_token"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEmailLeadSchema = createInsertSchema(emailLeads).omit({ id: true, createdAt: true });
export type EmailLead = typeof emailLeads.$inferSelect;
export type InsertEmailLead = z.infer<typeof insertEmailLeadSchema>;

export const insertSessionSchema = createInsertSchema(sessions);
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

export type Session = typeof sessions.$inferSelect;
export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type AppState = z.infer<typeof AppStateSchema>;
export type InsertSession = z.infer<typeof insertSessionSchema>;

export { AssetCategory, LiabilityCategory, ExpenseCategory };
export { DivorceModelInputsSchema };
export * from "./divorce_types";
