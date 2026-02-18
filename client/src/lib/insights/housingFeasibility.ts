import type { ScenarioResult } from "@/hooks/use-engine";

export interface HousingFeasibility {
  mortgageRequired: number;
  estimatedMonthlyPayment: number;
  incomeMultiple: number;
  typicalMaxMultiple: number;
  withinLendingCriteria: boolean;
  availableDeposit: number;
  depositPercentage: number;
  monthlyPaymentAsPercentOfNetIncome: number;
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
  const withinLendingCriteria = incomeMultiple <= typicalMaxMultiple;

  const availableDeposit = isKeeperA ? scenario.liquidStartA : scenario.liquidStartB;

  const depositPercentage = homeValue > 0
    ? Math.round(((homeValue - totalMortgage) / homeValue) * 1000) / 10
    : 0;

  const monthlyPaymentAsPercentOfNetIncome = keeperNetIncome > 0
    ? Math.round(((estimatedMonthlyPayment * 12) / keeperNetIncome) * 1000) / 10
    : 0;

  const notes: string[] = [];

  if (withinLendingCriteria) {
    notes.push(
      `Mortgage obligation of £${Math.round(mortgageRequired)} is within standard lending criteria (${incomeMultiple.toFixed(1)}x gross income)`
    );
  } else {
    notes.push(
      `Mortgage obligation of £${Math.round(mortgageRequired)} exceeds the standard 4.5x gross income multiple — lender may require additional collateral or guarantees`
    );
  }

  if (monthlyPaymentAsPercentOfNetIncome > 35) {
    notes.push(
      `Mortgage payments would represent ${Math.round(monthlyPaymentAsPercentOfNetIncome)}% of net income, exceeding the standard 35% affordability threshold`
    );
  }

  if (depositPercentage > 20) {
    notes.push(
      `Strong equity position at ${Math.round(depositPercentage)}% — no mortgage indemnity requirement`
    );
  }

  return {
    mortgageRequired: Math.round(mortgageRequired),
    estimatedMonthlyPayment: Math.round(estimatedMonthlyPayment),
    incomeMultiple,
    typicalMaxMultiple,
    withinLendingCriteria,
    availableDeposit: Math.round(availableDeposit),
    depositPercentage,
    monthlyPaymentAsPercentOfNetIncome,
    notes,
  };
}
