import type { StoreState } from "@/hooks/use-store";
import type { EngineResult } from "@/hooks/use-engine";
import type { GuidedSummaryPayload } from "./types";
import { computeConfidence } from "./computeConfidence";

const ASSET_CATEGORY_LABELS: Record<string, string> = {
  primary_home: "Primary residence",
  investment_property: "Investment property",
  other_property: "Other property",
  pension: "Pension",
  isa: "ISA / Cash ISA",
  stocks_shares: "Stocks & shares",
  savings: "Savings account",
  vehicle: "Vehicle",
  business: "Business interest",
  other: "Other asset",
};

const LIABILITY_CATEGORY_LABELS: Record<string, string> = {
  mortgage: "Mortgage",
  personal_loan: "Personal loan",
  credit_card: "Credit card",
  car_finance: "Car finance",
  student_loan: "Student loan",
  other: "Other liability",
};

function assetCategoryLabel(category: string): string {
  return ASSET_CATEGORY_LABELS[category] ?? "Other asset";
}

function liabilityCategoryLabel(category: string): string {
  return LIABILITY_CATEGORY_LABELS[category] ?? "Other liability";
}

function incomeCategoryLabel(name: string, taxTreatment: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("rent") || lower.includes("rental")) return "Rental income";
  if (lower.includes("pension")) return "Pension income";
  if (lower.includes("self") || lower.includes("freelance") || lower.includes("contract")) return "Self-employment income";
  if (lower.includes("benefit") || lower.includes("universal") || lower.includes("credit")) return "State benefits";
  if (lower.includes("invest") || lower.includes("dividend")) return "Investment income";
  if (taxTreatment === "net_provided") return "Other income (net)";
  return "Employment income";
}

export function buildPayload(
  store: StoreState,
  engine: EngineResult
): GuidedSummaryPayload {
  const confidence = computeConfidence(store, engine);

  // Assets — category labels only, NO user-typed names
  const assets = store.assets.map((a) => ({
    category: assetCategoryLabel(a.category),
    value: a.currentValue,
  }));

  // Liabilities — category labels only
  const liabilities = store.liabilities.map((l) => ({
    category: liabilityCategoryLabel(l.category),
    balance: l.balance,
  }));

  // Incomes — type label only, NO employer names or free-text
  const incomesA = store.incomes
    .filter((i) => i.owner === "A" || i.owner === "joint")
    .map((i) => ({
      type: incomeCategoryLabel(i.name, i.taxTreatment),
      grossAnnual: i.amountAnnualGross,
      netAnnual: engine.taxA.net > 0 ? engine.taxA.net : i.amountAnnualGross,
    }));

  const incomesB = store.incomes
    .filter((i) => i.owner === "B" || i.owner === "joint")
    .map((i) => ({
      type: incomeCategoryLabel(i.name, i.taxTreatment),
      grossAnnual: i.amountAnnualGross,
      netAnnual: engine.taxB.net > 0 ? engine.taxB.net : i.amountAnnualGross,
    }));

  const hasPension = store.assets.some((a) => a.category === "pension");
  const pensionTotalCETV = store.assets
    .filter((a) => a.category === "pension")
    .reduce((s, p) => s + (p.cetv ?? p.currentValue), 0);

  // Individual pension CETVs by owner (joint pensions counted for both)
  const pensionCETVPartyA = store.assets
    .filter((a) => a.category === "pension" && (a.owner === "A" || a.owner === "joint"))
    .reduce((s, p) => s + (p.cetv ?? p.currentValue), 0);
  const pensionCETVPartyB = store.assets
    .filter((a) => a.category === "pension" && (a.owner === "B" || a.owner === "joint"))
    .reduce((s, p) => s + (p.cetv ?? p.currentValue), 0);

  // Scenarios with runway data + monthly mortgage from engine
  const scenarioPayloads = engine.scenarios.map((sc) => {
    const runway = engine.runways[sc.id];
    return {
      id: sc.id,
      name: sc.name,
      enabled: sc.enabled,
      liquidStartA: sc.liquidStartA,
      liquidStartB: sc.liquidStartB,
      pensionA: sc.pensionA,
      pensionB: sc.pensionB,
      totalA: sc.totalA,
      totalB: sc.totalB,
      affordable: sc.affordable,
      fundingGap: sc.fundingGap,
      monthlyMortgageA: sc.mortgageMonthlyA ?? 0,
      monthlyMortgageB: sc.mortgageMonthlyB ?? 0,
      runwayA: {
        sustained: runway?.partyA?.sustained ?? true,
        depletionYear: runway?.partyA?.depletionYear ?? null,
      },
      runwayB: {
        sustained: runway?.partyB?.sustained ?? true,
        depletionYear: runway?.partyB?.depletionYear ?? null,
      },
    };
  });

  return {
    splitRatio: store.assumptions.splitRatio,
    netEquity: engine.intermediate.netHomeEquity,
    totalAssets: store.assets.reduce((s, a) => s + a.currentValue, 0),
    totalLiabilities: store.liabilities.reduce((s, l) => s + l.balance, 0),
    totalLiquid: engine.intermediate.totalLiquid,
    propertyValue: engine.intermediate.homeValue,
    mortgageBalance: engine.intermediate.totalMortgage,
    assets,
    liabilities,
    incomes: { partyA: incomesA, partyB: incomesB },
    hasProperty: store.assets.some(
      (a) => a.category === "primary_home" && a.currentValue > 0
    ),
    hasPension,
    pensionTotalCETV,
    pensionCETVPartyA,
    pensionCETVPartyB,
    childrenCount: store.children.numChildren,
    cmsWeeklyEstimate:
      store.assumptions.includeCMSEstimate && engine.cmsWeekly > 0
        ? engine.cmsWeekly
        : null,
    maintenanceIncluded: store.maintenance.included,
    maintenanceMonthlyAmount: store.maintenance.monthlyAmount,
    maintenanceDirection: store.maintenance.direction,
    scenarios: scenarioPayloads,
    budget: {
      monthlyA: Math.round(engine.budget.surplusA / 12),
      monthlyB: Math.round(engine.budget.surplusB / 12),
    },
    confidence,
  };
}
