import type { ScenarioResult, ProjectionYear } from "@/hooks/use-engine";
import type { StoreState } from "@/hooks/use-store";

export interface ScoreReason {
  label: string;
  points: number;
}

export interface StabilityResult {
  scoreA: number;
  scoreB: number;
  labelA: string;
  labelB: string;
  reasonsA: ScoreReason[];
  reasonsB: ScoreReason[];
}

function getLabel(score: number): string {
  if (score >= 80) return "Stable";
  if (score >= 60) return "Watch";
  return "High Risk";
}

export function computeStabilityScore(
  scenario: ScenarioResult,
  projection: ProjectionYear[] | undefined,
  inputs: StoreState,
): StabilityResult {
  const reasonsA: ScoreReason[] = [];
  const reasonsB: ScoreReason[] = [];
  let scoreA = 100;
  let scoreB = 100;

  if (scenario.fundingGap != null && scenario.fundingGap > 0) {
    const keeper = scenario.id === "S2" ? "A" : "B";
    if (keeper === "A") {
      scoreA -= 40;
      reasonsA.push({ label: "Funding gap exists", points: -40 });
    } else {
      scoreB -= 40;
      reasonsB.push({ label: "Funding gap exists", points: -40 });
    }
  }

  if (scenario.affordable === false) {
    const keeper = scenario.id === "S2" ? "A" : "B";
    if (keeper === "A") {
      scoreA -= 30;
      reasonsA.push({ label: "Mortgage affordability fails", points: -30 });
    } else {
      scoreB -= 30;
      reasonsB.push({ label: "Mortgage affordability fails", points: -30 });
    }
  }

  if (projection && projection.length > 0) {
    let hitYearA: number | null = null;
    let hitYearB: number | null = null;
    const startYear = projection[0]?.year ?? 0;

    for (const p of projection) {
      if (p.capitalA <= 0 && hitYearA === null) hitYearA = p.year - startYear;
      if (p.capitalB <= 0 && hitYearB === null) hitYearB = p.year - startYear;
    }

    if (hitYearA !== null && hitYearA <= 2) {
      scoreA -= 20;
      reasonsA.push({ label: "Capital runs out within 2 years", points: -20 });
    } else if (hitYearA !== null && hitYearA <= 5) {
      scoreA -= 10;
      reasonsA.push({ label: "Capital runs out within 5 years", points: -10 });
    }

    if (hitYearB !== null && hitYearB <= 2) {
      scoreB -= 20;
      reasonsB.push({ label: "Capital runs out within 2 years", points: -20 });
    } else if (hitYearB !== null && hitYearB <= 5) {
      scoreB -= 10;
      reasonsB.push({ label: "Capital runs out within 5 years", points: -10 });
    }
  }

  const expenseA = inputs.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0)
    + inputs.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const expenseB = inputs.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0)
    + inputs.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);

  const sixMonthsA = expenseA / 2;
  const sixMonthsB = expenseB / 2;

  if (expenseA > 0 && scenario.liquidStartA < sixMonthsA) {
    scoreA -= 10;
    reasonsA.push({ label: "Starting liquid < 6 months expenses", points: -10 });
  }
  if (expenseB > 0 && scenario.liquidStartB < sixMonthsB) {
    scoreB -= 10;
    reasonsB.push({ label: "Starting liquid < 6 months expenses", points: -10 });
  }

  if (scenario.id !== "S1") {
    const keeper = scenario.id === "S2" ? "A" : "B";
    const keeperTotal = keeper === "A" ? scenario.totalA : scenario.totalB;
    const keeperHomeEquity = keeper === "A" ? (scenario.homeEquityA ?? 0) : (scenario.homeEquityB ?? 0);
    if (keeperTotal > 0 && (keeperHomeEquity / keeperTotal) > 0.7) {
      if (keeper === "A") {
        scoreA -= 10;
        reasonsA.push({ label: ">70% net worth tied to property", points: -10 });
      } else {
        scoreB -= 10;
        reasonsB.push({ label: ">70% net worth tied to property", points: -10 });
      }
    }
  }

  scoreA = Math.max(0, Math.min(100, scoreA));
  scoreB = Math.max(0, Math.min(100, scoreB));

  if (reasonsA.length === 0) reasonsA.push({ label: "No risk factors identified", points: 0 });
  if (reasonsB.length === 0) reasonsB.push({ label: "No risk factors identified", points: 0 });

  return {
    scoreA,
    scoreB,
    labelA: getLabel(scoreA),
    labelB: getLabel(scoreB),
    reasonsA,
    reasonsB,
  };
}
