import type { ScenarioResult } from "@/hooks/use-engine";

export interface HousingFeasibility {
  mortgageRequired: number;
  estimatedMonthlyPayment: number;
  incomeMultiple: number;
  typicalMaxMultiple: number;
  withinBenchmarkThresholds: boolean;
  availableDeposit: number;
  depositPercentage: number;
  mortgageToNetIncomeRatio: number | null;
  classification: string;
  notes: string[];
}

export function computeHousingFeasibility(
  scenario: ScenarioResult,
  keeperGrossIncome: number,
  keeperNetIncome: number,
  homeValue: number,
  totalMortgage: number,
): HousingFeasibility | null {
  if (scenario.id !== "S2" && scenario.id !== "S3") {
    return null;
  }

  const isKeeperA = scenario.id === "S2";

  const mortgageRequired = totalMortgage;
  const estimatedMonthlyPayment = isKeeperA
    ? (scenario.mortgageMonthlyA ?? 0)
    : (scenario.mortgageMonthlyB ?? 0);

  const incomeMultiple = keeperGrossIncome > 0
    ? Math.round((totalMortgage / keeperGrossIncome) * 10) / 10
    : 0;

  const typicalMaxMultiple = 4.5;
  const withinBenchmarkThresholds = incomeMultiple <= typicalMaxMultiple;

  const availableDeposit = isKeeperA ? scenario.liquidStartA : scenario.liquidStartB;

  const depositPercentage = homeValue > 0
    ? Math.round(((homeValue - totalMortgage) / homeValue) * 1000) / 10
    : 0;

  const monthlyNetIncome = keeperNetIncome / 12;
  const mortgageToNetIncomeRatio: number | null = monthlyNetIncome > 0
    ? Math.round((estimatedMonthlyPayment / monthlyNetIncome) * 1000) / 10
    : null;

  const exceedsAffordability = mortgageToNetIncomeRatio !== null && mortgageToNetIncomeRatio > 35;
  const overallWithin = withinBenchmarkThresholds && !exceedsAffordability;

  const classification = overallWithin
    ? "Within selected benchmark thresholds"
    : "Exceeds selected benchmark thresholds";

  const notes: string[] = [];

  if (withinBenchmarkThresholds) {
    notes.push(
      `Mortgage obligation of £${Math.round(mortgageRequired).toLocaleString()} is within the selected income multiple benchmark (${incomeMultiple.toFixed(1)}x gross income vs ${typicalMaxMultiple}x threshold)`
    );
  } else {
    notes.push(
      `Mortgage obligation of £${Math.round(mortgageRequired).toLocaleString()} exceeds the selected ${typicalMaxMultiple}x gross income benchmark at ${incomeMultiple.toFixed(1)}x`
    );
  }

  if (exceedsAffordability) {
    notes.push(
      `Mortgage payments represent ${mortgageToNetIncomeRatio.toFixed(1)}% of net income, exceeding the selected 35% benchmark threshold`
    );
  }

  if (depositPercentage > 20) {
    notes.push(
      `Equity position at ${Math.round(depositPercentage)}% — no mortgage indemnity requirement at this level`
    );
  }

  return {
    mortgageRequired: Math.round(mortgageRequired),
    estimatedMonthlyPayment: Math.round(estimatedMonthlyPayment),
    incomeMultiple,
    typicalMaxMultiple,
    withinBenchmarkThresholds: overallWithin,
    availableDeposit: Math.round(availableDeposit),
    depositPercentage,
    mortgageToNetIncomeRatio,
    classification,
    notes,
  };
}
