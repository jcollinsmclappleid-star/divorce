#!/usr/bin/env node
/**
 * Smoke test for /api/guided-summary (Position Check + report blocks).
 * Usage: node --env-file=.env script/test-guided-summary.mjs [sessionToken]
 */
import fs from "node:fs";

const baseUrl = process.env.TEST_BASE_URL || "http://localhost:5000";
const args = process.argv.slice(2);
const noSave = args.includes("--no-save");
const sessionTokenArg = args.find((arg) => !arg.startsWith("--"));
const projectionYears = Number(process.env.TEST_PROJECTION_YEARS || 10);
if (!Number.isInteger(projectionYears) || projectionYears < 1 || projectionYears > 30) {
  console.error("FAIL TEST_PROJECTION_YEARS must be an integer between 1 and 30");
  process.exit(1);
}

const sessionToken =
  sessionTokenArg ||
  process.env.TEST_SESSION_TOKEN ||
  "c65588f2-6016-4e29-8539-ef8eb929d426";

const payload = {
  userIntent: "offer_check",
  offerStatus: "received",
  splitRatio: 0.45,
  projectionYears,
  netEquity: 158450,
  totalAssets: 750000,
  totalLiabilities: 327500,
  totalLiquid: 62000,
  propertyValue: 485000,
  mortgageBalance: 312000,
  assets: [
    { category: "Primary residence", value: 485000 },
    { category: "Cash / savings", value: 38000 },
    { category: "ISA / investments", value: 24000 },
    { category: "Pension", value: 155000 },
    { category: "Pension", value: 48000 },
  ],
  liabilities: [
    { category: "Mortgage", balance: 312000 },
    { category: "Credit card", balance: 9000 },
    { category: "Car finance", balance: 6500 },
  ],
  usesExpenseBenchmarks: true,
  incomes: {
    partyA: [{ type: "Employment income", grossAnnual: 78000, netAnnual: 55000 }],
    partyB: [{ type: "Employment income", grossAnnual: 34000, netAnnual: 28000 }],
  },
  expenses: { partyAAnnual: 39000, partyBAnnual: 34000, sharedAnnual: 0 },
  hasProperty: true,
  hasPension: true,
  pensionTotalCETV: 203000,
  pensionCETVPartyA: 155000,
  pensionCETVPartyB: 48000,
  childrenCount: 2,
  cmsWeeklyEstimate: 168.25,
  maintenanceIncluded: false,
  maintenanceMonthlyAmount: 0,
  maintenanceDirection: "AtoB",
  scenarios: [
    {
      id: "S1",
      name: "Clean Break (Sell & Split)",
      enabled: true,
      liquidStartA: 99203,
      liquidStartB: 121247,
      pensionA: 91350,
      pensionB: 111650,
      totalA: 190553,
      totalB: 232897,
      affordable: true,
      fundingGap: 0,
      monthlyMortgageA: 0,
      monthlyMortgageB: 0,
      homeEquityA: 0,
      homeEquityB: 0,
      runwayA: { sustained: true, depletionYear: null },
      runwayB: { sustained: false, depletionYear: 8 },
    },
    {
      id: "S2",
      name: "Party A Keeps Home",
      enabled: true,
      liquidStartA: 0,
      liquidStartB: 121247,
      pensionA: 91350,
      pensionB: 111650,
      totalA: 264350,
      totalB: 232897,
      affordable: true,
      fundingGap: 59248,
      monthlyMortgageA: 1824,
      monthlyMortgageB: 0,
      homeEquityA: 173000,
      homeEquityB: 0,
      runwayA: { sustained: false, depletionYear: 1 },
      runwayB: { sustained: false, depletionYear: 8 },
    },
    {
      id: "S3",
      name: "Party B Keeps Home",
      enabled: true,
      liquidStartA: 99203,
      liquidStartB: 0,
      pensionA: 91350,
      pensionB: 111650,
      totalA: 190553,
      totalB: 284650,
      affordable: false,
      fundingGap: 37203,
      monthlyMortgageA: 0,
      monthlyMortgageB: 1824,
      homeEquityA: 0,
      homeEquityB: 173000,
      runwayA: { sustained: true, depletionYear: null },
      runwayB: { sustained: false, depletionYear: 1 },
    },
  ],
  budget: { monthlyA: 1333, monthlyB: -500 },
  confidence: "Medium",
};

const res = await fetch(`${baseUrl}/api/guided-summary`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ sessionToken, payload }),
});

const body = await res.json();
if (!res.ok) {
  console.error("FAIL", res.status, body.message || body);
  process.exit(1);
}

const required = [
  "overview",
  "what_stands_out",
  "scenario_interpretation",
  "pressure_points",
  "position_check",
  "questions_for_professionals",
  "missing_information",
];
for (const key of required) {
  if (!body[key]) {
    console.error("MISSING field:", key);
    process.exit(1);
  }
}

const groups = [
  "missing_values",
  "left_short_risk",
  "offer_trade_offs",
  "housing_needs_pressure",
  "questions_before_agreeing",
];
for (const group of groups) {
  const items = body.position_check?.[group];
  if (!Array.isArray(items) || items.length === 0) {
    console.error("EMPTY position_check." + group);
    process.exit(1);
  }
}

const forbidden = [
  "you should accept",
  "you should reject",
  "you are entitled to",
  "the court would",
];
const text = JSON.stringify(body).toLowerCase();
for (const phrase of forbidden) {
  if (text.includes(phrase)) {
    console.error("FORBIDDEN PHRASE:", phrase);
    process.exit(1);
  }
}

const horizonText = [
  body.overview,
  body.scenario_interpretation,
  body.pressure_points,
  body.missing_information,
].join("\n");
const expectedHorizon = new RegExp(`\\b${payload.projectionYears}\\s*[- ]\\s*year\\b`, "i");
const hasSustainedRunway = payload.scenarios.some(
  (scenario) => scenario.runwayA.sustained || scenario.runwayB.sustained,
);
if (hasSustainedRunway && !expectedHorizon.test(horizonText)) {
  console.error(
    `MISSING projection horizon: expected generated summary to mention ${payload.projectionYears}-year runway context for sustained reserves`,
  );
  process.exit(1);
}

for (const staleHorizon of [5, 10]) {
  if (staleHorizon === payload.projectionYears) continue;
  const stalePattern = new RegExp(`\\b${staleHorizon}\\s*[- ]\\s*year\\b`, "i");
  if (stalePattern.test(horizonText)) {
    console.error(
      `STALE projection horizon: generated summary mentioned ${staleHorizon}-year while payload projectionYears=${payload.projectionYears}`,
    );
    process.exit(1);
  }
}

const routesSource = fs.readFileSync("server/routes.ts", "utf8");
const guidedRoutesSource = routesSource.slice(routesSource.indexOf("Guided Report Summary"));
const buildPayloadSource = fs.readFileSync("client/src/lib/guided-summary/buildPayload.ts", "utf8");
const typesSource = fs.readFileSync("client/src/lib/guided-summary/types.ts", "utf8");
const promptSource = fs.readFileSync("server/guided-summary/prompt.ts", "utf8");

const staticGuardrails = [
  {
    ok: buildPayloadSource.includes("projectionYears: store.assumptions.projectionYears"),
    message: "buildPayload must send store.assumptions.projectionYears",
  },
  {
    ok: typesSource.includes("projectionYears: number"),
    message: "GuidedSummaryPayload must type projectionYears",
  },
  {
    ok: guidedRoutesSource.includes("projectionYears: z.number().int().min(1).max(30).default(10)"),
    message: "guided-summary schema must validate projectionYears",
  },
  {
    ok: guidedRoutesSource.includes("MODELLED PROJECTION PERIOD: ${payload.projectionYears} years"),
    message: "server prompt context must include dynamic payload.projectionYears",
  },
  {
    ok: !/Party [AB] (5|10)-year runway/.test(guidedRoutesSource),
    message: "server scenario prompt must not hard-code Party A/B 5-year or 10-year runway labels",
  },
  {
    ok: !/\b(5|10)-year projection period\b/i.test(promptSource),
    message: "guided-summary system prompt must not include hard-coded 5-year/10-year projection examples",
  },
  {
    ok: buildPayloadSource.includes("homeEquityA") && buildPayloadSource.includes("homeEquityB"),
    message: "buildPayload must send scenario home equity fields",
  },
  {
    ok: guidedRoutesSource.includes("homeEquityA") && guidedRoutesSource.includes("homeEquityB"),
    message: "guided-summary schema/prompt must include scenario home equity fields",
  },
];

for (const guardrail of staticGuardrails) {
  if (!guardrail.ok) {
    console.error("GUARDRAIL FAIL:", guardrail.message);
    process.exit(1);
  }
}

console.log("PASS guided-summary API");
console.log(
  "position_check:",
  groups.map((g) => `${g}:${body.position_check[g].length}`).join(", "),
);
console.log("projection horizon:", `${payload.projectionYears}-year`, "guardrails passed");
console.log("overview:", body.overview.slice(0, 140) + "...");
console.log("sample missing_values:", body.position_check.missing_values[0]);

if (noSave) {
  console.log("Skipped save: --no-save");
} else {
  fs.writeFileSync(
    "test-results/last-guided-summary.json",
    JSON.stringify(body, null, 2),
  );
  console.log("Saved: test-results/last-guided-summary.json");
}
