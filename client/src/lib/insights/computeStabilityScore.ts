import type { ScenarioResult, ProjectionYear } from "@/hooks/use-engine";
import type { StoreState } from "@/hooks/use-store";

export interface ScoreReason {
  label: string;
  points: number;
}

export interface StabilityDriver {
  label: string;
  value: string;
  status: "pass" | "warn" | "fail";
}

export interface StabilityResult {
  scoreA: number;
  scoreB: number;
  labelA: string;
  labelB: string;
  reasonsA: ScoreReason[];
  reasonsB: ScoreReason[];
  driversA: StabilityDriver[];
  driversB: StabilityDriver[];
}

function getLabel(score: number): string {
  if (score >= 80) return "Stable (Modelled)";
  if (score >= 60) return "Moderate (Modelled)";
  return "Liquidity Pressure Identified (Modelled)";
}

export function computeStabilityScore(
  scenario: ScenarioResult,
  projection: ProjectionYear[] | undefined,
  inputs: StoreState,
): StabilityResult {
  const reasonsA: ScoreReason[] = [];
  const reasonsB: ScoreReason[] = [];
  const driversA: StabilityDriver[] = [];
  const driversB: StabilityDriver[] = [];
  let scoreA = 100;
  let scoreB = 100;

  if (scenario.fundingGap != null && scenario.fundingGap > 0) {
    const keeper = scenario.id === "S2" ? "A" : "B";
    if (keeper === "A") {
      scoreA -= 40;
      reasonsA.push({ label: "Funding shortfall identified", points: -40 });
    } else {
      scoreB -= 40;
      reasonsB.push({ label: "Funding shortfall identified", points: -40 });
    }
  }

  if (scenario.affordable === false) {
    const keeper = scenario.id === "S2" ? "A" : "B";
    if (keeper === "A") {
      scoreA -= 30;
      reasonsA.push({ label: "Indicative affordability benchmark exceeded", points: -30 });
    } else {
      scoreB -= 30;
      reasonsB.push({ label: "Indicative affordability benchmark exceeded", points: -30 });
    }
  }

  let hitYearA: number | null = null;
  let hitYearB: number | null = null;
  let lowestCapA = scenario.liquidStartA;
  let lowestCapB = scenario.liquidStartB;

  if (projection && projection.length > 0) {
    const startYear = projection[0]?.year ?? 0;

    for (const p of projection) {
      if (p.capitalA < lowestCapA) lowestCapA = p.capitalA;
      if (p.capitalB < lowestCapB) lowestCapB = p.capitalB;
      if (p.capitalA <= 0 && hitYearA === null) hitYearA = p.year - startYear;
      if (p.capitalB <= 0 && hitYearB === null) hitYearB = p.year - startYear;
    }

    if (hitYearA !== null && hitYearA <= 2) {
      scoreA -= 20;
      reasonsA.push({ label: `Capital reserve depleted within ${hitYearA} year${hitYearA !== 1 ? "s" : ""}`, points: -20 });
    } else if (hitYearA !== null && hitYearA <= 5) {
      scoreA -= 10;
      reasonsA.push({ label: `Capital reserve depleted within ${hitYearA} years`, points: -10 });
    }

    if (hitYearB !== null && hitYearB <= 2) {
      scoreB -= 20;
      reasonsB.push({ label: `Capital reserve depleted within ${hitYearB} year${hitYearB !== 1 ? "s" : ""}`, points: -20 });
    } else if (hitYearB !== null && hitYearB <= 5) {
      scoreB -= 10;
      reasonsB.push({ label: `Capital reserve depleted within ${hitYearB} years`, points: -10 });
    }
  }

  const expenseA = inputs.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0)
    + inputs.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const expenseB = inputs.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0)
    + inputs.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);

  const sixMonthsA = expenseA / 2;
  const sixMonthsB = expenseB / 2;

  const bufferYearsA = expenseA > 0 ? Math.round((scenario.liquidStartA / expenseA) * 10) / 10 : 99;
  const bufferYearsB = expenseB > 0 ? Math.round((scenario.liquidStartB / expenseB) * 10) / 10 : 99;

  if (expenseA > 0 && scenario.liquidStartA < sixMonthsA) {
    scoreA -= 10;
    reasonsA.push({ label: "Initial liquid capital below 6-month expenditure reserve", points: -10 });
  }
  if (expenseB > 0 && scenario.liquidStartB < sixMonthsB) {
    scoreB -= 10;
    reasonsB.push({ label: "Initial liquid capital below 6-month expenditure reserve", points: -10 });
  }

  let propConcentrationA = 0;
  let propConcentrationB = 0;

  if (scenario.id !== "S1") {
    const keeper = scenario.id === "S2" ? "A" : "B";
    const keeperTotal = keeper === "A" ? scenario.totalA : scenario.totalB;
    const keeperHomeEquity = keeper === "A" ? (scenario.homeEquityA ?? 0) : (scenario.homeEquityB ?? 0);
    const concentration = keeperTotal > 0 ? keeperHomeEquity / keeperTotal : 0;

    if (keeper === "A") propConcentrationA = Math.round(concentration * 100);
    else propConcentrationB = Math.round(concentration * 100);

    if (keeperTotal > 0 && concentration > 0.7) {
      if (keeper === "A") {
        scoreA -= 10;
        reasonsA.push({ label: "Over 70% of net worth concentrated in property", points: -10 });
      } else {
        scoreB -= 10;
        reasonsB.push({ label: "Over 70% of net worth concentrated in property", points: -10 });
      }
    }
  }

  scoreA = Math.max(0, Math.min(100, scoreA));
  scoreB = Math.max(0, Math.min(100, scoreB));

  const mortgageBenchmarkA = scenario.id === "S2" ? (scenario.affordable !== false ? "Within" : "Exceeds") : "N/A";
  const mortgageBenchmarkB = scenario.id === "S3" ? (scenario.affordable !== false ? "Within" : "Exceeds") : "N/A";

  driversA.push(
    { label: "Liquidity buffer", value: bufferYearsA >= 99 ? "N/A" : `${bufferYearsA} years`, status: bufferYearsA >= 0.5 ? "pass" : "fail" },
    { label: "Capital runway", value: hitYearA !== null ? `Yr ${hitYearA} depletion` : "Sustained", status: hitYearA !== null ? "fail" : "pass" },
    { label: "Mortgage benchmark", value: mortgageBenchmarkA, status: mortgageBenchmarkA === "Within" || mortgageBenchmarkA === "N/A" ? "pass" : "fail" },
    { label: "Asset concentration", value: `${propConcentrationA}%`, status: propConcentrationA > 70 ? "warn" : "pass" },
  );

  driversB.push(
    { label: "Liquidity buffer", value: bufferYearsB >= 99 ? "N/A" : `${bufferYearsB} years`, status: bufferYearsB >= 0.5 ? "pass" : "fail" },
    { label: "Capital runway", value: hitYearB !== null ? `Yr ${hitYearB} depletion` : "Sustained", status: hitYearB !== null ? "fail" : "pass" },
    { label: "Mortgage benchmark", value: mortgageBenchmarkB, status: mortgageBenchmarkB === "Within" || mortgageBenchmarkB === "N/A" ? "pass" : "fail" },
    { label: "Asset concentration", value: `${propConcentrationB}%`, status: propConcentrationB > 70 ? "warn" : "pass" },
  );

  if (reasonsA.length === 0) reasonsA.push({ label: "All assessed factors within acceptable thresholds", points: 0 });
  if (reasonsB.length === 0) reasonsB.push({ label: "All assessed factors within acceptable thresholds", points: 0 });

  return {
    scoreA,
    scoreB,
    labelA: getLabel(scoreA),
    labelB: getLabel(scoreB),
    reasonsA,
    reasonsB,
    driversA,
    driversB,
  };
}
