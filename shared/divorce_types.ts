
import { z } from "zod";

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
export type AssetCategory = z.infer<typeof AssetCategory>;

export const PensionType = z.enum(["DC", "DB", "unknown"]);
export type PensionType = z.infer<typeof PensionType>;

export const LiabilityCategory = z.enum(["mortgage", "loan", "credit_card", "tax", "other"]);
export type LiabilityCategory = z.infer<typeof LiabilityCategory>;

export const IncomeTaxTreatment = z.enum(["use_tax_model", "net_provided"]);
export type IncomeTaxTreatment = z.infer<typeof IncomeTaxTreatment>;

export const ExpenseCategory = z.enum([
  "living",
  "housing",
  "child",
  "debt_service",
  "insurance",
  "transport",
  "other"
]);
export type ExpenseCategory = z.infer<typeof ExpenseCategory>;

export const EventType = z.enum(["one_off_cost", "one_off_income"]);
export type EventType = z.infer<typeof EventType>;

export const Party = z.enum(["A", "B", "joint"]);
export type Party = z.infer<typeof Party>;

const Liquidity = z.enum(["liquid", "semi_liquid", "illiquid"]);

export const AssetInputSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    category: AssetCategory,
    ownership: Party,
    currentValue: z.number().finite().min(0),
    liquidity: Liquidity,
    growthRate: z.number().finite().min(-0.5).max(1).optional(),
    saleCostPct: z.number().finite().min(0).max(0.2).optional(),
    taxCostPct: z.number().finite().min(0).max(0.2).optional(),
    notes: z.string().optional(),

    pensionType: PensionType.optional(),
    cetv: z.number().finite().min(0).optional(),
    isInPayment: z.boolean().optional(),
    annualPensionIfKnown: z.number().finite().min(0).optional()
  })
  .superRefine((a, ctx) => {
    if (a.category === "pension") {
      if (!a.pensionType) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "pensionType required when category=pension" });
      }
    }
  });

export const LiabilityInputSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: LiabilityCategory,
  ownership: Party,
  balance: z.number().finite().min(0),
  interestAPR: z.number().finite().min(0).max(1).optional(),
  termYearsRemaining: z.number().finite().min(0).max(50).optional(),
  securedAgainstAssetId: z.string().optional(),
  notes: z.string().optional()
});

export const IncomeInputSchema = z
  .object({
    id: z.string().min(1),
    owner: z.enum(["A", "B"]),
    name: z.string().min(1),
    amountAnnualGross: z.number().finite().min(0),
    taxTreatment: IncomeTaxTreatment,
    amountAnnualNet: z.number().finite().min(0).optional(),
    growthRate: z.number().finite().min(-0.5).max(1).optional(),
    notes: z.string().optional()
  })
  .superRefine((i, ctx) => {
    if (i.taxTreatment === "net_provided" && typeof i.amountAnnualNet !== "number") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "amountAnnualNet required when taxTreatment=net_provided" });
    }
  });

export const ExpenseInputSchema = z.object({
  id: z.string().min(1),
  owner: z.enum(["A", "B", "shared"]),
  name: z.string().min(1),
  amountAnnual: z.number().finite().min(0),
  inflationLinked: z.boolean(),
  category: ExpenseCategory,
  notes: z.string().optional()
});

export const TransferInputSchema = z.object({
  id: z.string().min(1),
  from: z.enum(["A", "B"]),
  to: z.enum(["A", "B"]),
  amountAnnual: z.number().finite().min(0),
  inflationLinked: z.boolean(),
  notes: z.string().optional()
}).superRefine((t, ctx) => {
  if (t.from === t.to) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "transfer from and to must differ" });
  }
});

export const EventInputSchema = z.object({
  id: z.string().min(1),
  type: EventType,
  owner: z.enum(["A", "B"]),
  year: z.number().int().min(1).max(50),
  amount: z.number().finite().min(0),
  inflationLinked: z.boolean().optional(),
  notes: z.string().optional()
});

export const ChildrenInputSchema = z
  .object({
    numChildren: z.number().int().min(0).max(10),
    nightsWithA: z.number().int().min(0).max(365),
    nightsWithB: z.number().int().min(0).max(365)
  })
  .superRefine((c, ctx) => {
    if (c.nightsWithA + c.nightsWithB > 365) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "nightsWithA + nightsWithB must be <= 365" });
    }
  });

export const AssumptionsSchema = z.object({
  splitLiquidToA: z.number().finite().min(0).max(1),
  splitPropertyToA: z.number().finite().min(0).max(1),
  splitIlliquidToA: z.number().finite().min(0).max(1),
  splitPensionToA: z.number().finite().min(0).max(1),

  projectionYears: z.number().int().min(1).max(30),
  inflationRate: z.number().finite().min(-0.05).max(0.2),

  includeTaxModel: z.boolean(),
  includeCMSEstimate: z.boolean(),

  incomeMultiple: z.number().finite().min(0).max(10).optional(),
  mortgageAPR: z.number().finite().min(0).max(1).optional(),
  mortgageTermYears: z.number().int().min(1).max(40).optional(),

  scenarioToggles: z.object({
    sellOtherPropertiesByDefault: z.boolean(),
    jointHomeYears: z.number().int().min(0).max(10).optional()
  })
});

export const DivorceModelInputsSchema = z.object({
  assets: z.array(AssetInputSchema).min(0),
  liabilities: z.array(LiabilityInputSchema).min(0),
  incomes: z.array(IncomeInputSchema).min(0),
  expenses: z.array(ExpenseInputSchema).min(0),
  transfers: z.array(TransferInputSchema).min(0),
  events: z.array(EventInputSchema).min(0),
  children: ChildrenInputSchema,
  assumptions: AssumptionsSchema
}).superRefine((all, ctx) => {
  const assetIds = new Set(all.assets.map(a => a.id));
  for (const liab of all.liabilities) {
    if (liab.securedAgainstAssetId && !assetIds.has(liab.securedAgainstAssetId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `securedAgainstAssetId not found: ${liab.securedAgainstAssetId}`,
        path: ["liabilities", all.liabilities.indexOf(liab), "securedAgainstAssetId"]
      });
    }
  }
});

export type DivorceModelInputs = z.infer<typeof DivorceModelInputsSchema>;
export type AssetInput = z.infer<typeof AssetInputSchema>;
export type LiabilityInput = z.infer<typeof LiabilityInputSchema>;
export type IncomeInput = z.infer<typeof IncomeInputSchema>;
export type ExpenseInput = z.infer<typeof ExpenseInputSchema>;
export type TransferInput = z.infer<typeof TransferInputSchema>;
export type EventInput = z.infer<typeof EventInputSchema>;
export type ChildrenInput = z.infer<typeof ChildrenInputSchema>;
export type AssumptionsInput = z.infer<typeof AssumptionsSchema>;
