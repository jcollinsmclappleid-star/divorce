import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { DivorceModelInputsSchema } from "./divorce_types";

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().default("Untitled Session"),
  data: jsonb("data").notNull(), 
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSessionSchema = createInsertSchema(sessions);
export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;

export { DivorceModelInputsSchema };
export * from "./divorce_types";
