import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
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

export const insertSessionSchema = createInsertSchema(sessions);
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
export type AppState = z.infer<typeof AppStateSchema>;
export type InsertSession = z.infer<typeof insertSessionSchema>;

export { AssetCategory, LiabilityCategory, ExpenseCategory };
export { DivorceModelInputsSchema };
export * from "./divorce_types";
