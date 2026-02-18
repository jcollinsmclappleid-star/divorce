import type { ScenarioResult, ProjectionYear } from "@/hooks/use-engine";
import { formatCurrency } from "@/lib/utils";

export interface ComparisonDelta {
  deltaLiquidA: number;
  deltaLiquidB: number;
  deltaNetWorthA: number;
  deltaNetWorthB: number;
  deltaRunwayA: number | null;
  deltaRunwayB: number | null;
  notes: string[];
}

function findRunwayYear(projection: ProjectionYear[] | undefined, party: "A" | "B"): number | null {
  if (!projection || projection.length === 0) return null;
  const startYear = projection[0].year;
  for (const p of projection) {
    const cap = party === "A" ? p.capitalA : p.capitalB;
    if (cap <= 0) return p.year - startYear;
  }
  return null;
}

export function compareToSell(
  keepScenario: ScenarioResult,
  sellScenario: ScenarioResult,
  keepProjection: ProjectionYear[] | undefined,
  sellProjection: ProjectionYear[] | undefined,
): ComparisonDelta {
  const deltaLiquidA = keepScenario.liquidStartA - sellScenario.liquidStartA;
  const deltaLiquidB = keepScenario.liquidStartB - sellScenario.liquidStartB;
  const deltaNetWorthA = keepScenario.totalA - sellScenario.totalA;
  const deltaNetWorthB = keepScenario.totalB - sellScenario.totalB;

  const keepRunwayA = findRunwayYear(keepProjection, "A");
  const keepRunwayB = findRunwayYear(keepProjection, "B");
  const sellRunwayA = findRunwayYear(sellProjection, "A");
  const sellRunwayB = findRunwayYear(sellProjection, "B");

  let deltaRunwayA: number | null = null;
  let deltaRunwayB: number | null = null;

  if (keepRunwayA !== null && sellRunwayA !== null) {
    deltaRunwayA = keepRunwayA - sellRunwayA;
  } else if (keepRunwayA !== null && sellRunwayA === null) {
    deltaRunwayA = -keepRunwayA;
  } else if (keepRunwayA === null && sellRunwayA !== null) {
    deltaRunwayA = sellRunwayA;
  }

  if (keepRunwayB !== null && sellRunwayB !== null) {
    deltaRunwayB = keepRunwayB - sellRunwayB;
  } else if (keepRunwayB !== null && sellRunwayB === null) {
    deltaRunwayB = -keepRunwayB;
  } else if (keepRunwayB === null && sellRunwayB !== null) {
    deltaRunwayB = sellRunwayB;
  }

  const notes: string[] = [];
  const keeper = keepScenario.id === "S2" ? "A" : "B";
  const leaver = keeper === "A" ? "B" : "A";

  const keeperDeltaLiq = keeper === "A" ? deltaLiquidA : deltaLiquidB;
  const leaverDeltaLiq = leaver === "A" ? deltaLiquidA : deltaLiquidB;

  if (keeperDeltaLiq < 0) {
    notes.push(`Party ${keeper} has ${formatCurrency(Math.abs(keeperDeltaLiq))} less liquid capital than selling`);
  } else if (keeperDeltaLiq > 0) {
    notes.push(`Party ${keeper} has ${formatCurrency(keeperDeltaLiq)} more liquid capital than selling`);
  }

  if (leaverDeltaLiq > 0) {
    notes.push(`Party ${leaver} has ${formatCurrency(leaverDeltaLiq)} more liquid capital (receives buyout)`);
  }

  const monthlyMtg = keeper === "A" ? (keepScenario.mortgageMonthlyA ?? 0) : (keepScenario.mortgageMonthlyB ?? 0);
  if (monthlyMtg > 0) {
    notes.push(`Party ${keeper} has an ongoing mortgage obligation of ${formatCurrency(monthlyMtg * 12)}/year`);
  }

  return { deltaLiquidA, deltaLiquidB, deltaNetWorthA, deltaNetWorthB, deltaRunwayA, deltaRunwayB, notes };
}
