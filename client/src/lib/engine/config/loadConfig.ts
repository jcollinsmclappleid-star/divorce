
import { z } from "zod";
import configData from "./config.fixed.json";

const RoundingSchema = z.object({
  currencyDecimals: z.number(),
  roundHalfUp: z.boolean()
});

const TaxBandSchema = z.object({
  name: z.string(),
  from: z.number(),
  to: z.number().nullable(),
  rate: z.number()
});

const IncomeTaxSchema = z.object({
  enabled: z.boolean(),
  personalAllowance: z.object({
    amount: z.number(),
    taper: z.object({
      enabled: z.boolean(),
      startsAt: z.number(),
      endsAt: z.number(),
      reductionPer2Over: z.number()
    })
  }),
  bands: z.array(TaxBandSchema)
});

const NationalInsuranceSchema = z.object({
  enabled: z.boolean(),
  employeeClass1: z.object({
    thresholds: z.object({
      lowerEarningsLimit: z.number(),
      primaryThreshold: z.number(),
      upperEarningsLimit: z.number()
    }),
    bands: z.array(TaxBandSchema)
  })
});

const ChildMaintenanceSchema = z.object({
  enabledByDefault: z.boolean(),
  incomeBasis: z.string(),
  flatRate: z.object({
    weeklyAmount: z.number(),
    appliesIfGrossWeeklyIncomeAtOrBelow: z.number()
  }),
  reducedRate: z.object({
    appliesIfGrossWeeklyIncomeOver: z.number(),
    appliesIfGrossWeeklyIncomeUnder: z.number(),
    baseWeeklyAmountOnFirst100: z.number(),
    percentageOnRemainderUpTo200_byChildren: z.record(z.string(), z.number())
  }),
  basicRate: z.object({
    appliesIfGrossWeeklyIncomeAtOrAbove: z.number(),
    appliesIfGrossWeeklyIncomeAtOrBelow: z.number(),
    pctOfGross_byChildren: z.record(z.string(), z.number())
  }),
  basicPlusRate: z.object({
    appliesOnIncomeOver: z.number(),
    appliesUpToWeeklyIncome: z.number(),
    pctOnExcessOver800_byChildren: z.record(z.string(), z.number())
  }),
  sharedCare: z.object({
    enabled: z.boolean(),
    bands: z.array(z.object({
      minNights: z.number(),
      maxNights: z.number(),
      reductionFraction: z.number(),
      extraWeeklyReduction: z.number()
    })),
    floorWeeklyAmount: z.number()
  })
});

const ConfigSchema = z.object({
  rounding: RoundingSchema,
  defaults: z.object({
    inflationRate: z.number(),
    projectionYears: z.number(),
    incomeMultiple: z.number(),
    housePriceGrowthRate: z.number(),
    saleCostPctByAssetCategory: z.record(z.string(), z.number()),
    taxCostPctByAssetCategory: z.record(z.string(), z.number()),
    mortgage: z.object({
      defaultAPR: z.number(),
      defaultTermYears: z.number()
    }),
    budget: z.object({
      defaultAnnualLivingCostPerAdult: z.number(),
      defaultChildCostPerChildAnnual: z.number(),
      inflateExpenses: z.boolean()
    })
  }),
  affordability: z.object({
    enabled: z.boolean(),
    incomeMultipleRule: z.object({ enabled: z.boolean(), multiple: z.number() }),
    dtiRule: z.object({ enabled: z.boolean(), maxNetIncomeRatio: z.number() })
  }),
  taxModel: z.object({
    enabledByDefault: z.boolean(),
    incomeTax: IncomeTaxSchema,
    nationalInsurance: NationalInsuranceSchema
  }),
  childMaintenanceModel: ChildMaintenanceSchema
});

export type Config = z.infer<typeof ConfigSchema>;

export const config: Config = ConfigSchema.parse(configData);

export function loadConfig(): Config {
  return config;
}
