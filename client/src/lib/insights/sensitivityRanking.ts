import type { ScenarioResult } from "@/hooks/use-engine";
import type { StoreState } from "@/hooks/use-store";
import { calcMortgagePayment } from "@/lib/engine/calc/mortgage";

export interface SensitivityFactor {
  factor: string;
  description: string;
  impactType: "annual" | "one-off";
  impactLabelA: string;
  impactLabelB: string;
  impactValueA: number;
  impactValueB: number;
  methodology: string;
  rank: number;
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
  const factors: Omit<SensitivityFactor, "rank">[] = [];

  const hasMortgageA = (scenario.mortgageMonthlyA ?? 0) > 0;
  const hasMortgageB = (scenario.mortgageMonthlyB ?? 0) > 0;

  if (hasMortgageA || hasMortgageB) {
    const baseRate = store.assumptions.mortgageAPR;
    const term = store.assumptions.mortgageTermYears;
    const basePayment = calcMortgagePayment(totalMortgage, baseRate, term);
    const stressedPayment = calcMortgagePayment(totalMortgage, baseRate + 0.01, term);
    const monthlyDiff = stressedPayment.monthlyPayment - basePayment.monthlyPayment;
    const annualDiff = Math.round(monthlyDiff * 12);

    factors.push({
      factor: "Interest Rate Movement",
      description: "+1 percentage point on mortgage rate",
      impactType: "annual",
      impactLabelA: hasMortgageA ? `${annualDiff > 0 ? "-" : "+"}${formatAbs(annualDiff)}/yr extra mortgage cost` : "No mortgage held",
      impactLabelB: hasMortgageB ? `${annualDiff > 0 ? "-" : "+"}${formatAbs(annualDiff)}/yr extra mortgage cost` : "No mortgage held",
      impactValueA: hasMortgageA ? -annualDiff : 0,
      impactValueB: hasMortgageB ? -annualDiff : 0,
      methodology: `Mortgage repayment recalculated at ${((baseRate + 0.01) * 100).toFixed(1)}% (current ${(baseRate * 100).toFixed(1)}% + 1pp) over ${term}-year term. Monthly payment increases from £${basePayment.monthlyPayment.toLocaleString()} to £${stressedPayment.monthlyPayment.toLocaleString()}.`,
    });
  }

  const expenseA = store.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const expenseB = store.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0)
    + store.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);

  const impactExpA = -Math.round(expenseA * 0.10);
  const impactExpB = -Math.round(expenseB * 0.10);

  factors.push({
    factor: "Expenditure Inflation",
    description: "+10% increase in annual expenditure",
    impactType: "annual",
    impactLabelA: `${formatAbs(impactExpA)}/yr less disposable income`,
    impactLabelB: `${formatAbs(impactExpB)}/yr less disposable income`,
    impactValueA: impactExpA,
    impactValueB: impactExpB,
    methodology: `Each party's total annual expenditure (including 50% of shared costs) is increased by 10%. Party A base expenditure: £${Math.round(expenseA).toLocaleString()}/yr. Party B base expenditure: £${Math.round(expenseB).toLocaleString()}/yr.`,
  });

  const pool = totalLiquid + netHomeEquity;
  const shiftAmount = Math.round(pool * 0.05);

  factors.push({
    factor: "Asset Allocation Variance",
    description: "+5 percentage points to Party A's share",
    impactType: "one-off",
    impactLabelA: `+£${shiftAmount.toLocaleString()} to Party A's share`,
    impactLabelB: `-£${shiftAmount.toLocaleString()} from Party B's share`,
    impactValueA: shiftAmount,
    impactValueB: -shiftAmount,
    methodology: `The distributable asset pool (£${Math.round(pool).toLocaleString()}) is recalculated with a 5 percentage point shift towards Party A. This is a one-off change to starting capital, not a recurring annual figure.`,
  });

  if (store.assumptions.includeCMSEstimate && store.children.numChildren > 0) {
    const grossA = store.incomes.filter(i => i.owner === "A").reduce((s, i) => s + i.amountAnnualGross, 0);
    const tenPctGrossChange = Math.round(grossA * 0.10);
    const estimatedCmsChange = Math.round(tenPctGrossChange * 0.12);

    if (estimatedCmsChange > 0) {
      factors.push({
        factor: "Income Variation (CMS Effect)",
        description: "+10% increase in Party A gross income",
        impactType: "annual",
        impactLabelA: `-£${estimatedCmsChange.toLocaleString()}/yr (higher CMS)`,
        impactLabelB: `+£${estimatedCmsChange.toLocaleString()}/yr (higher CMS)`,
        impactValueA: -estimatedCmsChange,
        impactValueB: estimatedCmsChange,
        methodology: `A 10% increase in Party A's gross income (£${Math.round(grossA).toLocaleString()}) triggers a proportional increase in Child Maintenance Service obligations. The CMS basic rate of ~12% is applied to the income increase.`,
      });
    }
  }

  const ranked = factors
    .map(f => ({
      ...f,
      _magnitude: Math.abs(f.impactValueA) + Math.abs(f.impactValueB),
    }))
    .sort((a, b) => b._magnitude - a._magnitude)
    .map(({ _magnitude, ...f }, index) => ({
      ...f,
      rank: index + 1,
    }));

  return ranked;
}

function formatAbs(v: number): string {
  return `£${Math.abs(v).toLocaleString()}`;
}
