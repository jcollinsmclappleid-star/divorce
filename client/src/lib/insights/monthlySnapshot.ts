import type { ScenarioResult, TaxBreakdown } from "@/hooks/use-engine";
import type { StoreState } from "@/hooks/use-store";

export interface MonthlyLine {
  label: string;
  amountA: number;
  amountB: number;
}

export interface MonthlySnapshotResult {
  lines: MonthlyLine[];
  surplusA: number;
  surplusB: number;
  netMonthlyIncomeA: number;
  netMonthlyIncomeB: number;
}

export function buildMonthlySnapshot(
  scenario: ScenarioResult,
  inputs: StoreState,
  taxA: TaxBreakdown,
  taxB: TaxBreakdown,
  cmsAnnual: number,
): MonthlySnapshotResult {
  const lines: MonthlyLine[] = [];

  const netMonthlyA = Math.round(taxA.net / 12);
  const netMonthlyB = Math.round(taxB.net / 12);
  lines.push({ label: "Net monthly income", amountA: netMonthlyA, amountB: netMonthlyB });

  const expenseA = inputs.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0);
  const expenseB = inputs.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0);
  const sharedExpense = inputs.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual, 0);

  const totalExpenseA = Math.round((expenseA + sharedExpense / 2) / 12);
  const totalExpenseB = Math.round((expenseB + sharedExpense / 2) / 12);
  lines.push({ label: "Living expenses", amountA: -totalExpenseA, amountB: -totalExpenseB });

  const mtgA = scenario.mortgageMonthlyA ?? 0;
  const mtgB = scenario.mortgageMonthlyB ?? 0;
  if (mtgA > 0 || mtgB > 0) {
    lines.push({ label: "Mortgage payment", amountA: -Math.round(mtgA), amountB: -Math.round(mtgB) });
  }

  if (inputs.assumptions.includeCMSEstimate && cmsAnnual > 0) {
    const cmsMonthly = Math.round(cmsAnnual / 12);
    lines.push({ label: "Child maintenance", amountA: -cmsMonthly, amountB: cmsMonthly });
  }

  const surplusA = netMonthlyA - totalExpenseA - Math.round(mtgA) - (inputs.assumptions.includeCMSEstimate ? Math.round(cmsAnnual / 12) : 0);
  const surplusB = netMonthlyB - totalExpenseB - Math.round(mtgB) + (inputs.assumptions.includeCMSEstimate ? Math.round(cmsAnnual / 12) : 0);

  return {
    lines,
    surplusA,
    surplusB,
    netMonthlyIncomeA: netMonthlyA,
    netMonthlyIncomeB: netMonthlyB,
  };
}
