import type { ScenarioResult } from "@/hooks/use-engine";
import type { StoreState } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/utils";

export interface RiskFlag {
  label: string;
  severity: "ok" | "warn" | "risk";
  detail: string;
}

export interface ScenarioNarrative {
  headline: string;
  summaryParagraph: string;
  keyDrivers: string[];
  tradeOffs: string[];
  riskFlags: RiskFlag[];
  reassurance: string;
}

export function generateScenarioNarrative(
  scenario: ScenarioResult,
  inputs: StoreState,
  netHomeEquity: number,
  totalLiquid: number,
  totalDebt: number,
  homeSaleCosts: number,
): ScenarioNarrative {
  const splitPct = Math.round(inputs.assumptions.splitRatio * 100);
  const otherPct = 100 - splitPct;
  const hasHome = inputs.assets.some(a => a.category === "primary_home" && a.currentValue > 0);
  const homeValue = inputs.assets.find(a => a.category === "primary_home")?.currentValue ?? 0;
  const totalMortgage = inputs.liabilities
    .filter(l => l.category === "mortgage")
    .reduce((s, l) => s + l.balance, 0);
  const hasPension = inputs.assets.some(a => a.category === "pension");
  const totalPensionCETV = inputs.assets
    .filter(a => a.category === "pension")
    .reduce((s, p) => s + (p.cetv ?? p.currentValue), 0);

  const keyDrivers: string[] = [];
  const tradeOffs: string[] = [];
  const riskFlags: RiskFlag[] = [];

  if (scenario.id === "S1") {
    const headline = "Both parties start fresh with liquid capital";
    const parts: string[] = [];

    if (hasHome) {
      parts.push(`The family home (valued at ${formatCurrency(homeValue)}) is sold.`);
      if (totalMortgage > 0) {
        parts.push(`After paying off the ${formatCurrency(totalMortgage)} mortgage and ${formatCurrency(homeSaleCosts)} in selling costs, ${formatCurrency(netHomeEquity)} in net equity is released.`);
      } else {
        parts.push(`After ${formatCurrency(homeSaleCosts)} in selling costs, ${formatCurrency(netHomeEquity)} in net equity is released.`);
      }
    }

    if (totalLiquid > 0) {
      parts.push(`Combined with ${formatCurrency(totalLiquid)} in liquid savings, the total distributable pool is ${formatCurrency(totalLiquid + netHomeEquity)}.`);
    }

    parts.push(`Based on a ${splitPct}/${otherPct} split, Party A receives ${formatCurrency(scenario.liquidStartA)} and Party B receives ${formatCurrency(scenario.liquidStartB)} in liquid capital.`);

    if (hasPension && totalPensionCETV > 0) {
      parts.push(`Pensions (total CETV ${formatCurrency(totalPensionCETV)}) are split separately: Party A retains ${formatCurrency(scenario.pensionA)}, Party B retains ${formatCurrency(scenario.pensionB)}.`);
    }

    keyDrivers.push("All assets converted to liquid capital for a clean division");
    if (hasHome) keyDrivers.push("Property equity forms the largest component");
    if (totalLiquid > 0) keyDrivers.push("Existing liquid capital added to the distributable pool");

    tradeOffs.push("Maximum liquidity and flexibility for both parties");
    tradeOffs.push("Both parties need to find new housing");
    tradeOffs.push("No ongoing mortgage obligation");

    riskFlags.push({
      label: "Accommodation transition required",
      severity: "warn",
      detail: "Both parties will need to arrange new accommodation. Consider rental costs or deposit requirements.",
    });

    return {
      headline,
      summaryParagraph: parts.join(" "),
      keyDrivers,
      tradeOffs,
      riskFlags,
      reassurance: "This scenario provides the cleanest financial separation, giving both parties maximum flexibility to rebuild independently.",
    };
  }

  const keeper = scenario.id === "S2" ? "A" : "B";
  const leaver = scenario.id === "S2" ? "B" : "A";
  const headline = `Party ${keeper} retains the family home`;
  const parts: string[] = [];

  if (hasHome) {
    const homeEquityRetained = Math.max(0, homeValue - totalMortgage);
    parts.push(`Party ${keeper} retains the property (${formatCurrency(homeValue)}) with ${formatCurrency(homeEquityRetained)} in equity (this is illiquid \u2014 tied up in the property).`);

    if (scenario.buyoutAmount && scenario.buyoutAmount > 0) {
      parts.push(`A buyout payment of ${formatCurrency(scenario.buyoutAmount)} is due to Party ${leaver} to compensate for their share of the home equity.`);
    }

    if (totalMortgage > 0) {
      const monthlyMtg = keeper === "A" ? scenario.mortgageMonthlyA : scenario.mortgageMonthlyB;
      if (monthlyMtg && monthlyMtg > 0) {
        parts.push(`Party ${keeper} continues paying the ${formatCurrency(totalMortgage)} mortgage at ${formatCurrency(monthlyMtg)}/month (${formatCurrency(monthlyMtg * 12)}/year).`);
      }
    }
  }

  parts.push(`After the buyout, Party ${keeper} is allocated ${formatCurrency(keeper === "A" ? scenario.liquidStartA : scenario.liquidStartB)} in liquid capital, while Party ${leaver} receives ${formatCurrency(leaver === "A" ? scenario.liquidStartA : scenario.liquidStartB)}.`);

  if (hasPension && totalPensionCETV > 0) {
    parts.push(`Pensions are split separately: Party A retains ${formatCurrency(scenario.pensionA)}, Party B retains ${formatCurrency(scenario.pensionB)}.`);
  }

  keyDrivers.push(`Party ${keeper} retains housing stability`);
  keyDrivers.push("Home equity is illiquid and not available as liquid capital");
  if (totalMortgage > 0) keyDrivers.push("Ongoing mortgage creates a monthly obligation");
  if (scenario.buyoutAmount && scenario.buyoutAmount > 0) keyDrivers.push(`Buyout payment of ${formatCurrency(scenario.buyoutAmount)} required`);

  tradeOffs.push(`Party ${keeper}: housing security, but reduced liquidity and ongoing mortgage costs`);
  tradeOffs.push(`Party ${leaver}: additional liquid capital, but requires new accommodation`);
  tradeOffs.push("The retaining party's net worth is higher on paper, but a significant portion is illiquid property equity");

  if (scenario.fundingGap && scenario.fundingGap > 0) {
    riskFlags.push({
      label: "Funding shortfall",
      severity: "risk",
      detail: `Party ${keeper} needs an additional ${formatCurrency(scenario.fundingGap)} to fund the buyout. This may require remortgaging or other borrowing.`,
    });
  }

  if (scenario.affordable === false) {
    riskFlags.push({
      label: "Mortgage affordability",
      severity: "risk",
      detail: `Party ${keeper} may not qualify for the mortgage based on typical market benchmarks (typically 4-4.5x income).`,
    });
  } else if (scenario.affordable === true) {
    riskFlags.push({
      label: "Mortgage affordability",
      severity: "ok",
      detail: `Party ${keeper} should qualify for the mortgage based on typical market benchmarks.`,
    });
  }

  if (totalMortgage > 0) {
    const monthlyMtg = keeper === "A" ? scenario.mortgageMonthlyA : scenario.mortgageMonthlyB;
    if (monthlyMtg && monthlyMtg > 0) {
      const annualMtg = monthlyMtg * 12;
      const keeperIncome = inputs.incomes
        .filter(i => i.owner === keeper)
        .reduce((s, i) => s + i.amountAnnualGross, 0);
      const mtgPctIncome = keeperIncome > 0 ? Math.round((annualMtg / keeperIncome) * 100) : 0;
      if (mtgPctIncome > 35) {
        riskFlags.push({
          label: "Elevated mortgage-to-income ratio",
          severity: "warn",
          detail: `Mortgage payments represent ${mtgPctIncome}% of Party ${keeper}'s gross income, which is above the typical 35% comfort threshold.`,
        });
      }
    }
  }

  return {
    headline,
    summaryParagraph: parts.join(" "),
    keyDrivers,
    tradeOffs,
    riskFlags,
    reassurance: `This scenario provides housing continuity for Party ${keeper} while ensuring Party ${leaver} receives their fair share of the equity as liquid capital.`,
  };
}
