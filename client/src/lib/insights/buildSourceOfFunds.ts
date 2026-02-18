import type { ScenarioResult } from "@/hooks/use-engine";
import type { StoreState } from "@/hooks/use-store";

export interface FundRow {
  label: string;
  amount: number;
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

  const savings = inputs.assets
    .filter(a => a.category === "cash" && a.liquidity === "liquid")
    .reduce((s, a) => s + a.currentValue, 0);
  const investments = inputs.assets
    .filter(a => a.category === "investments")
    .reduce((s, a) => s + a.currentValue, 0);
  const otherLiquid = inputs.assets
    .filter(a => a.liquidity === "liquid" && a.category !== "cash" && a.category !== "investments" && a.category !== "pension" && a.category !== "primary_home")
    .reduce((s, a) => s + a.currentValue, 0);

  const nonMortgageDebt = inputs.liabilities
    .filter(l => l.category !== "mortgage")
    .reduce((s, l) => s + l.balance, 0);

  const pensions = inputs.assets.filter(a => a.category === "pension");
  const totalPensionCETV = pensions.reduce((s, p) => s + (p.cetv ?? p.currentValue), 0);
  const pensionToA_before = pensions.filter(p => p.owner === "A").reduce((s, p) => s + (p.cetv ?? p.currentValue), 0)
    + pensions.filter(p => p.owner === "joint").reduce((s, p) => s + (p.cetv ?? p.currentValue) / 2, 0);
  const pensionToB_before = totalPensionCETV - pensionToA_before;

  if (scenario.id === "S1") {
    const rowsA: FundRow[] = [];
    const rowsB: FundRow[] = [];

    if (netHomeEquity > 0) {
      rowsA.push({ label: "Share of property equity", amount: Math.round(netHomeEquity * splitA) });
      rowsB.push({ label: "Share of property equity", amount: Math.round(netHomeEquity * splitB) });
    }
    if (savings > 0) {
      rowsA.push({ label: "Share of savings", amount: Math.round(savings * splitA) });
      rowsB.push({ label: "Share of savings", amount: Math.round(savings * splitB) });
    }
    if (investments > 0) {
      rowsA.push({ label: "Share of investments", amount: Math.round(investments * splitA) });
      rowsB.push({ label: "Share of investments", amount: Math.round(investments * splitB) });
    }
    if (otherLiquid > 0) {
      rowsA.push({ label: "Share of other assets", amount: Math.round(otherLiquid * splitA) });
      rowsB.push({ label: "Share of other assets", amount: Math.round(otherLiquid * splitB) });
    }
    if (nonMortgageDebt > 0) {
      rowsA.push({ label: "Less share of debts", amount: -Math.round(nonMortgageDebt * splitA) });
      rowsB.push({ label: "Less share of debts", amount: -Math.round(nonMortgageDebt * splitB) });
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
    keeperRows.push({ label: "Share of liquid assets", amount: Math.round(totalLiquid * keeperSplit) });
    leaverRows.push({ label: "Share of liquid assets", amount: Math.round(totalLiquid * leaverSplit) });
  }

  if (scenario.buyoutAmount && scenario.buyoutAmount > 0) {
    keeperRows.push({ label: "Less buyout payment", amount: -scenario.buyoutAmount });
    leaverRows.push({ label: "Buyout received", amount: scenario.buyoutAmount });
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
