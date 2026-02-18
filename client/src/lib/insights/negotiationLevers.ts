import type { ScenarioResult, ProjectionYear } from "@/hooks/use-engine";
import type { StoreState } from "@/hooks/use-store";

export interface NegotiationLever {
  title: string;
  impact: string;
  beneficiary: "A" | "B" | "both";
  magnitude: number;
}

export function generateNegotiationLevers(
  scenario: ScenarioResult,
  store: StoreState,
  projection: ProjectionYear[] | undefined,
  surplusA: number,
  surplusB: number,
  totalLiquid: number,
  netHomeEquity: number,
  totalMortgage: number,
): NegotiationLever[] {
  const levers: NegotiationLever[] = [];

  const currentSplitPct = Math.round(store.assumptions.splitRatio * 100);
  const newSplitPct = currentSplitPct + 5;
  const otherNewPct = 100 - newSplitPct;
  const liquidChange = Math.round((totalLiquid + netHomeEquity) * 0.05);
  if (liquidChange > 0) {
    levers.push({
      title: `Adjust asset allocation to ${newSplitPct}% : ${otherNewPct}%`,
      impact: `Adjusting asset allocation to ${newSplitPct}% : ${otherNewPct}% would increase Party A's liquid capital by +£${liquidChange}`,
      beneficiary: "A",
      magnitude: liquidChange,
    });
  }

  const expenseA = store.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const expenseB = store.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);

  if (surplusA < 0 && expenseA > 0) {
    const reductionPct = Math.min(50, Math.max(5, Math.round((Math.abs(surplusA) / expenseA) * 100 / 5) * 5));
    const annualSaving = Math.round(expenseA * reductionPct / 100);
    const monthlySaving = Math.round(annualSaving / 12);
    levers.push({
      title: `Reduce Party A's monthly expenditure by ${reductionPct}%`,
      impact: `Reducing £${annualSaving}/yr (£${monthlySaving}/mo) from Party A's expenditure would eliminate the monthly deficit`,
      beneficiary: "A",
      magnitude: annualSaving,
    });
  }

  if (surplusB < 0 && expenseB > 0) {
    const reductionPct = Math.min(50, Math.max(5, Math.round((Math.abs(surplusB) / expenseB) * 100 / 5) * 5));
    const annualSaving = Math.round(expenseB * reductionPct / 100);
    const monthlySaving = Math.round(annualSaving / 12);
    levers.push({
      title: `Reduce Party B's monthly expenditure by ${reductionPct}%`,
      impact: `Reducing £${annualSaving}/yr (£${monthlySaving}/mo) from Party B's expenditure would eliminate the monthly deficit`,
      beneficiary: "B",
      magnitude: annualSaving,
    });
  }

  const hasMortgageA = (scenario.mortgageMonthlyA ?? 0) > 0;
  const hasMortgageB = (scenario.mortgageMonthlyB ?? 0) > 0;
  if ((hasMortgageA || hasMortgageB) && totalMortgage > 0) {
    const monthlySaving = Math.round(totalMortgage * 0.01 / 12);
    const beneficiary: "A" | "B" | "both" = hasMortgageA && hasMortgageB ? "both" : hasMortgageA ? "A" : "B";
    levers.push({
      title: "Reduce mortgage interest rate by 1%",
      impact: `A 1% reduction in mortgage interest rate yields a saving of £${monthlySaving}/month`,
      beneficiary,
      magnitude: monthlySaving * 12,
    });
  }

  if (scenario.fundingGap != null && scenario.fundingGap > 0) {
    const gap = Math.round(scenario.fundingGap);
    const keeper = scenario.id === "S2" ? "A" : "B";
    levers.push({
      title: `Reduce equity buyout obligation by £${gap}`,
      impact: `Reducing the equity buyout by £${gap} eliminates the funding shortfall`,
      beneficiary: keeper as "A" | "B",
      magnitude: gap,
    });
  }

  if (projection && projection.length > 1) {
    const startYear = projection[0].year;
    let negYearA: number | null = null;
    let negYearB: number | null = null;
    for (const p of projection) {
      if (p.capitalA <= 0 && negYearA === null) negYearA = p.year - startYear;
      if (p.capitalB <= 0 && negYearB === null) negYearB = p.year - startYear;
    }

    if (negYearA !== null && negYearA <= 5 && negYearA > 0 && expenseA > 0) {
      const capitalAtStart = projection[0].capitalA;
      const annualBurn = capitalAtStart > 0 && surplusA < 0 ? Math.abs(surplusA) : expenseA;
      const savingsNeeded = annualBurn > 0 ? Math.round(capitalAtStart / (negYearA + 1) - capitalAtStart / negYearA + Math.abs(surplusA)) : 0;
      const approxSaving = Math.round(expenseA * 0.05);
      levers.push({
        title: "Extend Party A's capital runway",
        impact: `Reducing annual expenditure by 5% (£${approxSaving}/year) could extend Party A's capital runway by approximately 1 year`,
        beneficiary: "A",
        magnitude: approxSaving,
      });
    }

    if (negYearB !== null && negYearB <= 5 && negYearB > 0 && expenseB > 0) {
      const approxSaving = Math.round(expenseB * 0.05);
      levers.push({
        title: "Extend Party B's capital runway",
        impact: `Reducing annual expenditure by 5% (£${approxSaving}/year) could extend Party B's capital runway by approximately 1 year`,
        beneficiary: "B",
        magnitude: approxSaving,
      });
    }
  }

  levers.sort((a, b) => b.magnitude - a.magnitude);

  return levers.slice(0, 5);
}
