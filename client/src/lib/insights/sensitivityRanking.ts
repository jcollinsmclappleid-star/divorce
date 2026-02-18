import type { ScenarioResult } from "@/hooks/use-engine";
import type { StoreState } from "@/hooks/use-store";

export interface SensitivityFactor {
  factor: string;
  description: string;
  impactOnSurplusA: number;
  impactOnSurplusB: number;
  impactOnRunwayA: number;
  impactOnRunwayB: number;
  rank: number;
}

function clampRunway(value: number): number {
  return Math.max(-5, Math.min(5, value));
}

function estimateRunwayChange(
  impactOnSurplus: number,
  currentSurplus: number,
  projectionYears: number,
): number {
  if (Math.abs(currentSurplus) < 1) {
    return impactOnSurplus >= 0 ? 5 : -5;
  }
  const proportional = (impactOnSurplus / Math.abs(currentSurplus)) * projectionYears;
  return clampRunway(Math.round(proportional * 10) / 10);
}

export function computeSensitivityRanking(
  scenario: ScenarioResult,
  store: StoreState,
  surplusA: number,
  surplusB: number,
  totalLiquid: number,
  netHomeEquity: number,
  totalMortgage: number,
): SensitivityFactor[] {
  const projectionYears = store.assumptions.projectionYears;

  const factors: Omit<SensitivityFactor, "rank">[] = [];

  const hasMortgageA = (scenario.mortgageMonthlyA ?? 0) > 0;
  const hasMortgageB = (scenario.mortgageMonthlyB ?? 0) > 0;
  const mortgageA = hasMortgageA ? totalMortgage : 0;
  const mortgageB = hasMortgageB ? totalMortgage : 0;
  const impactSurplusA_rate = hasMortgageA ? -Math.round(mortgageA * 0.01) : 0;
  const impactSurplusB_rate = hasMortgageB ? -Math.round(mortgageB * 0.01) : 0;

  factors.push({
    factor: "Interest rate",
    description: "+1% interest rate",
    impactOnSurplusA: Math.round(impactSurplusA_rate),
    impactOnSurplusB: Math.round(impactSurplusB_rate),
    impactOnRunwayA: estimateRunwayChange(impactSurplusA_rate, surplusA, projectionYears),
    impactOnRunwayB: estimateRunwayChange(impactSurplusB_rate, surplusB, projectionYears),
  });

  const expenseA = store.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const expenseB = store.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);

  const impactExpA = -Math.round(expenseA * 0.10);
  const impactExpB = -Math.round(expenseB * 0.10);

  factors.push({
    factor: "Living costs",
    description: "+10% living costs",
    impactOnSurplusA: impactExpA,
    impactOnSurplusB: impactExpB,
    impactOnRunwayA: estimateRunwayChange(impactExpA, surplusA, projectionYears),
    impactOnRunwayB: estimateRunwayChange(impactExpB, surplusB, projectionYears),
  });

  const splitImpact = Math.round((totalLiquid + netHomeEquity) * 0.05);

  factors.push({
    factor: "Asset split",
    description: "+5% asset split to A",
    impactOnSurplusA: splitImpact,
    impactOnSurplusB: -splitImpact,
    impactOnRunwayA: estimateRunwayChange(splitImpact, surplusA, projectionYears),
    impactOnRunwayB: estimateRunwayChange(-splitImpact, surplusB, projectionYears),
  });

  const ranked = factors
    .map(f => ({
      ...f,
      _magnitude: Math.abs(f.impactOnSurplusA) + Math.abs(f.impactOnSurplusB),
    }))
    .sort((a, b) => b._magnitude - a._magnitude)
    .map(({ _magnitude, ...f }, index) => ({
      ...f,
      rank: index + 1,
    }));

  return ranked;
}
