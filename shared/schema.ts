
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Since the user requested LocalStorage for MVP and no user accounts, 
// we will primarily use Zod schemas for the application state.
// However, we'll keep a 'sessions' table in case we want to enable server-side saving later.

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(), // UUID
  name: text("name").notNull().default("Untitled Session"),
  data: jsonb("data").notNull(), // Stores the entire application state
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSessionSchema = createInsertSchema(sessions);
export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;

// --- Application Domain Schemas (Zod Only for Engine) ---

// Enums
export const AssetCategory = z.enum([
  "primary_home",
  "other_property",
  "cash",
  "investments",
  "pension",
  "business",
  "vehicle",
  "personal_possessions",
  "other"
]);

export const Owner = z.enum(["A", "B", "joint"]);
export const Liquidity = z.enum(["liquid", "semi_liquid", "illiquid"]);
export const PensionType = z.enum(["DC", "DB", "unknown"]);

// 2.2 Assets
export const AssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: AssetCategory,
  owner: Owner,
  currentValue: z.number().min(0),
  liquidity: Liquidity,
  saleCostPct: z.number().min(0).max(1).default(0),
  taxCostPct: z.number().min(0).max(1).default(0),
  notes: z.string().optional(),
  // Pension specific
  pensionType: PensionType.optional(),
  cetv: z.number().optional(), // Use currentValue as CETV if not provided, but explicit field helps
  isInPayment: z.boolean().optional(),
  annualPensionIfKnown: z.number().optional(),
});

export type Asset = z.infer<typeof AssetSchema>;

// 2.3 Liabilities
export const LiabilityCategory = z.enum(["mortgage", "loan", "credit_card", "tax", "other"]);

export const LiabilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: LiabilityCategory,
  owner: Owner,
  balance: z.number().min(0),
  interestAPR: z.number().min(0).max(1).optional(),
  termYearsRemaining: z.number().min(0).optional(),
  securedAgainstAssetId: z.string().optional(),
});

export type Liability = z.infer<typeof LiabilitySchema>;

// 2.4 Income & Expenses
export const IncomeSchema = z.object({
  id: z.string(),
  owner: z.enum(["A", "B"]),
  name: z.string(),
  amountAnnualGross: z.number().min(0),
  taxTreatment: z.enum(["use_tax_model", "net_provided"]),
  amountAnnualNet: z.number().optional(), // Required if taxTreatment="net_provided"
});

export type Income = z.infer<typeof IncomeSchema>;

export const ExpenseCategory = z.enum(["living", "housing", "child", "debt_service", "insurance", "other"]);

export const ExpenseSchema = z.object({
  id: z.string(),
  owner: z.enum(["A", "B", "shared"]),
  name: z.string(),
  amountAnnual: z.number().min(0),
  inflationLinked: z.boolean().default(true),
  category: ExpenseCategory,
});

export type Expense = z.infer<typeof ExpenseSchema>;

// Config & Scenarios
export const AppConfigSchema = z.object({
  inflationRate: z.number().default(0.02),
  projectionYears: z.number().default(10),
  incomeMultiple: z.number().default(4.5),
  defaultMortgageAPR: z.number().default(0.05),
  defaultMortgageTermYears: z.number().default(25),
  saleCostPctByAssetCategory: z.record(z.string(), z.number()).default({
    primary_home: 0.02,
    other_property: 0.02,
    investments: 0.01
  }),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export const ScenarioType = z.enum([
  "S1_Sell_Split", 
  "S2_A_Keeps_Home", 
  "S3_B_Keeps_Home", 
  "S4_Joint_Then_Sell", 
  "S5_No_Property"
]);

// Full State
export const AppStateSchema = z.object({
  assets: z.array(AssetSchema),
  liabilities: z.array(LiabilitySchema),
  incomes: z.array(IncomeSchema),
  expenses: z.array(ExpenseSchema),
  config: AppConfigSchema,
  // User choices for scenarios
  scenarios: z.record(ScenarioType, z.object({
    enabled: z.boolean(),
    params: z.any() // Scenario specific params
  }))
});

export type AppState = z.infer<typeof AppStateSchema>;

// API Types
export type SaveSessionRequest = {
  name?: string;
  data: AppState;
};

export type SessionResponse = Session;
