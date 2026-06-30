export interface GuidedSummaryBlock {
  heading: string;
  content: string;
}

export interface ProfessionalQuestions {
  solicitor_mediator: string[];
  mortgage_broker: string[];
  pension_expert: string[];
}

export interface PositionCheck {
  missing_values: string[];
  left_short_risk: string[];
  offer_trade_offs: string[];
  housing_needs_pressure: string[];
  questions_before_agreeing: string[];
}

export interface GuidedSummary {
  overview: string;
  what_stands_out: string;
  scenario_interpretation: string;
  pressure_points: string;
  position_check?: PositionCheck;
  questions_for_professionals: ProfessionalQuestions;
  missing_information: string;
  confidence: "High" | "Medium" | "Low";
  generatedAt: string;
}

export type GuidedSummaryStatus = "idle" | "loading" | "done" | "error";

export interface GuidedSummaryPayload {
  userIntent: string;
  offerStatus: string;
  splitRatio: number;
  projectionYears: number;
  netEquity: number;
  totalAssets: number;
  totalLiabilities: number;
  totalLiquid: number;
  propertyValue: number;
  mortgageBalance: number;
  assets: Array<{ category: string; value: number }>;
  liabilities: Array<{ category: string; balance: number }>;
  usesExpenseBenchmarks: boolean;
  incomes: {
    partyA: Array<{ type: string; grossAnnual: number; netAnnual: number }>;
    partyB: Array<{ type: string; grossAnnual: number; netAnnual: number }>;
  };
  expenses: {
    partyAAnnual: number;
    partyBAnnual: number;
    sharedAnnual: number;
  };
  hasProperty: boolean;
  hasPension: boolean;
  pensionTotalCETV: number;
  pensionCETVPartyA: number;
  pensionCETVPartyB: number;
  childrenCount: number;
  cmsWeeklyEstimate: number | null;
  maintenanceIncluded: boolean;
  maintenanceMonthlyAmount: number;
  maintenanceDirection: "AtoB" | "BtoA";
  scenarios: Array<{
    id: string;
    name: string;
    enabled: boolean;
    liquidStartA: number;
    liquidStartB: number;
    pensionA: number;
    pensionB: number;
    totalA: number;
    totalB: number;
    affordable?: boolean;
    fundingGap?: number;
    monthlyMortgageA: number;
    monthlyMortgageB: number;
    homeEquityA?: number;
    homeEquityB?: number;
    runwayA: { sustained: boolean; depletionYear: number | null };
    runwayB: { sustained: boolean; depletionYear: number | null };
  }>;
  budget: {
    monthlyA: number;
    monthlyB: number;
  };
  confidence: "High" | "Medium" | "Low";
}
