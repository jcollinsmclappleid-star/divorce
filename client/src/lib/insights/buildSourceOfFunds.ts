import type { ScenarioResult } from "@/hooks/use-engine";
import type { StoreState } from "@/hooks/use-store";

export interface FundSubItem {
  label: string;
  amount: number;
}

export interface FundRow {
  label: string;
  amount: number;
  subItems?: FundSubItem[];
}

export interface PartyFunds {
  rows: FundRow[];
  netStartingLiquid: number;
}

export interface PensionBreakdown {
  A_after: number;
  B_after: number;
  A_delta: number;
  B_delta: number;
}

export interface SourceOfFunds {
  A: PartyFunds;
  B: PartyFunds;
  pension: PensionBreakdown;
}

function pct(v: number): string {
  return `${Math.round(v * 100)}%`;
}

export function buildSourceOfFunds(
  scenario: ScenarioResult,
  inputs: StoreState,
  netHomeEquity: number,
  totalLiquid: number,
  homeSaleCosts: number,
): SourceOfFunds {
  const splitA = inputs.assumptions.splitRatio;
  const splitB = 1 - splitA;

  const homeValue = inputs.assets.find(a => a.category === "primary_home")?.currentValue ?? 0;
  const totalMortgage = inputs.liabilities.filter(l => l.category === "mortgage").reduce((s, l) => s + l.balance, 0);

  const savingsItems = inputs.assets.filter(a => a.category === "cash" && a.liquidity === "liquid");
  const savings = savingsItems.reduce((s, a) => s + a.currentValue, 0);

  const investmentItems = inputs.assets.filter(a => a.category === "investments");
  const investments = investmentItems.reduce((s, a) => s + a.currentValue, 0);

  const otherLiquidItems = inputs.assets.filter(a => a.liquidity === "liquid" && a.category !== "cash" && a.category !== "investments" && a.category !== "pension" && a.category !== "primary_home");
  const otherLiquid = otherLiquidItems.reduce((s, a) => s + a.currentValue, 0);

  const debtItems = inputs.liabilities.filter(l => l.category !== "mortgage");
  const nonMortgageDebt = debtItems.reduce((s, l) => s + l.balance, 0);

  const pensions = inputs.assets.filter(a => a.category === "pension");
  const totalPensionCETV = pensions.reduce((s, p) => s + (p.cetv ?? p.currentValue), 0);
  const pensionToA_before = pensions.filter(p => p.owner === "A").reduce((s, p) => s + (p.cetv ?? p.currentValue), 0)
    + pensions.filter(p => p.owner === "joint").reduce((s, p) => s + (p.cetv ?? p.currentValue) / 2, 0);
  const pensionToB_before = totalPensionCETV - pensionToA_before;

  function buildEquitySubs(split: number): FundSubItem[] {
    const subs: FundSubItem[] = [];
    subs.push({ label: `Property value`, amount: homeValue });
    if (totalMortgage > 0) subs.push({ label: `Less mortgage`, amount: -totalMortgage });
    if (homeSaleCosts > 0) subs.push({ label: `Less sale costs`, amount: -Math.round(homeSaleCosts) });
    subs.push({ label: `Net equity`, amount: Math.round(netHomeEquity) });
    subs.push({ label: `Your ${pct(split)} share`, amount: Math.round(netHomeEquity * split) });
    return subs;
  }

  function buildSavingsSubs(split: number): FundSubItem[] {
    const subs: FundSubItem[] = [];
    savingsItems.forEach(a => subs.push({ label: a.name || "Liquid capital account", amount: a.currentValue }));
    if (savingsItems.length > 1) subs.push({ label: `Total liquid capital`, amount: savings });
    subs.push({ label: `Your ${pct(split)} share`, amount: Math.round(savings * split) });
    return subs;
  }

  function buildInvestmentSubs(split: number): FundSubItem[] {
    const subs: FundSubItem[] = [];
    investmentItems.forEach(a => subs.push({ label: a.name || "Investment", amount: a.currentValue }));
    if (investmentItems.length > 1) subs.push({ label: `Total investments`, amount: investments });
    subs.push({ label: `Your ${pct(split)} share`, amount: Math.round(investments * split) });
    return subs;
  }

  function buildOtherSubs(split: number): FundSubItem[] {
    const subs: FundSubItem[] = [];
    otherLiquidItems.forEach(a => subs.push({ label: a.name || "Other asset", amount: a.currentValue }));
    if (otherLiquidItems.length > 1) subs.push({ label: `Total other assets`, amount: otherLiquid });
    subs.push({ label: `Your ${pct(split)} share`, amount: Math.round(otherLiquid * split) });
    return subs;
  }

  function buildDebtSubs(split: number): FundSubItem[] {
    const subs: FundSubItem[] = [];
    debtItems.forEach(l => subs.push({ label: l.name || l.category, amount: l.balance }));
    if (debtItems.length > 1) subs.push({ label: `Total liabilities`, amount: nonMortgageDebt });
    subs.push({ label: `Your ${pct(split)} share`, amount: Math.round(nonMortgageDebt * split) });
    return subs;
  }

  function buildLiquidAssetSubs(split: number): FundSubItem[] {
    const subs: FundSubItem[] = [];
    if (savings > 0) subs.push({ label: `Liquid Capital`, amount: savings });
    if (investments > 0) subs.push({ label: `Investment Holdings`, amount: investments });
    if (otherLiquid > 0) subs.push({ label: `Other liquid assets`, amount: otherLiquid });
    subs.push({ label: `Total liquid asset pool`, amount: totalLiquid });
    subs.push({ label: `Your ${pct(split)} share`, amount: Math.round(totalLiquid * split) });
    return subs;
  }

  function buildBuyoutSubs(buyout: number, equityTotal: number): FundSubItem[] {
    const subs: FundSubItem[] = [];
    subs.push({ label: `Property equity`, amount: Math.round(equityTotal) });
    subs.push({ label: `Counterparty entitlement`, amount: buyout });
    return subs;
  }

  if (scenario.id === "S1") {
    const rowsA: FundRow[] = [];
    const rowsB: FundRow[] = [];

    if (netHomeEquity > 0) {
      rowsA.push({ label: "Allocated Property Equity", amount: Math.round(netHomeEquity * splitA), subItems: buildEquitySubs(splitA) });
      rowsB.push({ label: "Allocated Property Equity", amount: Math.round(netHomeEquity * splitB), subItems: buildEquitySubs(splitB) });
    }
    if (savings > 0) {
      rowsA.push({ label: "Allocated Liquid Capital", amount: Math.round(savings * splitA), subItems: buildSavingsSubs(splitA) });
      rowsB.push({ label: "Allocated Liquid Capital", amount: Math.round(savings * splitB), subItems: buildSavingsSubs(splitB) });
    }
    if (investments > 0) {
      rowsA.push({ label: "Allocated Investment Holdings", amount: Math.round(investments * splitA), subItems: buildInvestmentSubs(splitA) });
      rowsB.push({ label: "Allocated Investment Holdings", amount: Math.round(investments * splitB), subItems: buildInvestmentSubs(splitB) });
    }
    if (otherLiquid > 0) {
      rowsA.push({ label: "Allocated Other Assets", amount: Math.round(otherLiquid * splitA), subItems: buildOtherSubs(splitA) });
      rowsB.push({ label: "Allocated Other Assets", amount: Math.round(otherLiquid * splitB), subItems: buildOtherSubs(splitB) });
    }
    if (nonMortgageDebt > 0) {
      rowsA.push({ label: "Less Allocated Liabilities", amount: -Math.round(nonMortgageDebt * splitA), subItems: buildDebtSubs(splitA) });
      rowsB.push({ label: "Less Allocated Liabilities", amount: -Math.round(nonMortgageDebt * splitB), subItems: buildDebtSubs(splitB) });
    }

    return {
      A: { rows: rowsA, netStartingLiquid: scenario.liquidStartA },
      B: { rows: rowsB, netStartingLiquid: scenario.liquidStartB },
      pension: {
        A_after: scenario.pensionA,
        B_after: scenario.pensionB,
        A_delta: scenario.pensionA - pensionToA_before,
        B_delta: scenario.pensionB - pensionToB_before,
      },
    };
  }

  const keeper = scenario.id === "S2" ? "A" : "B";
  const keeperSplit = keeper === "A" ? splitA : splitB;
  const leaverSplit = 1 - keeperSplit;

  const keeperRows: FundRow[] = [];
  const leaverRows: FundRow[] = [];

  if (totalLiquid > 0) {
    keeperRows.push({ label: "Allocated Liquid Assets", amount: Math.round(totalLiquid * keeperSplit), subItems: buildLiquidAssetSubs(keeperSplit) });
    leaverRows.push({ label: "Allocated Liquid Assets", amount: Math.round(totalLiquid * leaverSplit), subItems: buildLiquidAssetSubs(leaverSplit) });
  }

  if (scenario.buyoutAmount && scenario.buyoutAmount > 0) {
    const equityForBuyout = netHomeEquity > 0 ? netHomeEquity : homeValue - totalMortgage;
    keeperRows.push({ label: "Less Equity Buyout Payment", amount: -scenario.buyoutAmount, subItems: buildBuyoutSubs(scenario.buyoutAmount, equityForBuyout) });
    leaverRows.push({ label: "Equity Buyout Received", amount: scenario.buyoutAmount, subItems: [{ label: `Counterparty equity entitlement`, amount: scenario.buyoutAmount }] });
  }

  if (nonMortgageDebt > 0) {
    keeperRows.push({ label: "Less Allocated Liabilities", amount: -Math.round(nonMortgageDebt * keeperSplit), subItems: buildDebtSubs(keeperSplit) });
    leaverRows.push({ label: "Less Allocated Liabilities", amount: -Math.round(nonMortgageDebt * leaverSplit), subItems: buildDebtSubs(leaverSplit) });
  }

  const keeperLiq = keeper === "A" ? scenario.liquidStartA : scenario.liquidStartB;
  const leaverLiq = keeper === "A" ? scenario.liquidStartB : scenario.liquidStartA;

  const keeperFunds: PartyFunds = { rows: keeperRows, netStartingLiquid: keeperLiq };
  const leaverFunds: PartyFunds = { rows: leaverRows, netStartingLiquid: leaverLiq };

  return {
    A: keeper === "A" ? keeperFunds : leaverFunds,
    B: keeper === "B" ? keeperFunds : leaverFunds,
    pension: {
      A_after: scenario.pensionA,
      B_after: scenario.pensionB,
      A_delta: scenario.pensionA - pensionToA_before,
      B_delta: scenario.pensionB - pensionToB_before,
    },
  };
}
