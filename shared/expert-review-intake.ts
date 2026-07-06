import { z } from "zod";

/** Premium intake — collected after £249 purchase, before human review begins. */
export const ExpertReviewIntakeSchema = z.object({
  situationStage: z.enum([
    "offer_on_table",
    "mediation_soon",
    "solicitor_instructed",
    "early_research",
    "other",
  ]),
  offerOnTable: z.enum(["yes", "no", "considering"]).optional(),
  housingPlan: z.enum([
    "keep_home",
    "sell_home",
    "unsure",
    "not_applicable",
  ]).optional(),
  remortgageExplored: z.enum(["yes", "no", "unsure"]).optional(),
  pensionDiscussed: z.enum(["yes", "no", "unsure"]).optional(),
  pensionTypes: z
    .array(z.enum(["defined_benefit", "defined_contribution", "mixed", "none"]))
    .optional(),
  incomeVariability: z.enum(["stable", "variable", "not_applicable"]).optional(),
  childrenArrangements: z.enum([
    "primary_carer",
    "shared",
    "no_children",
    "prefer_not_say",
  ]).optional(),
  jointDebtConcern: z.enum(["yes", "no", "unsure"]).optional(),
  topPriority: z.enum([
    "keep_house",
    "protect_pension",
    "monthly_cashflow",
    "clean_break",
    "fair_split",
  ]),
  mainConcern: z.string().max(2000).optional(),
  questionsBeforeAgreeing: z.string().max(2000).optional(),
});

export type ExpertReviewIntake = z.infer<typeof ExpertReviewIntakeSchema>;
