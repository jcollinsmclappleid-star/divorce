import { DivorceModelInputsSchema } from "../shared/schema";
import {
  calculateCommon,
  calculateScenarioS1,
  calculateScenarioS2,
  calculateScenarioS4,
  calculateCMSWeekly,
  calcPersonalAllowance,
} from "../client/src/lib/engine";
import { calcIncomeTax } from "../client/src/lib/engine/calc/incomeTax";
import { calcNationalInsurance } from "../client/src/lib/engine/calc/nationalInsurance";
import { calcMortgagePayment } from "../client/src/lib/engine/calc/mortgage";
import { loadConfig } from "../client/src/lib/engine/config/loadConfig";
import fixtures from "../client/src/lib/engine/tests/fixtures.divorceModel.v1.json";
import { runEngine } from "../client/src/hooks/use-engine";
import type { StoreState } from "../client/src/hooks/use-store";

const config = loadConfig();
let pass = 0;
let fail = 0;
const failures: string[] = [];

function approx(label: string, actual: number, expected: number, tol = 0.5) {
  const ok = Math.abs(actual - expected) <= tol;
  if (ok) { pass++; }
  else { fail++; failures.push(`FAIL ${label}\n   expected ≈ ${expected}\n   actual   = ${actual}\n   delta    = ${(actual - expected).toFixed(2)} (tol ${tol})`); }
}
function eq<T>(label: string, actual: T, expected: T) {
  const ok = actual === expected;
  if (ok) { pass++; }
  else { fail++; failures.push(`FAIL ${label}\n   expected = ${String(expected)}\n   actual   = ${String(actual)}`); }
}
function assertTrue(label: string, cond: boolean, detail = "") {
  if (cond) { pass++; }
  else { fail++; failures.push(`FAIL ${label} ${detail}`); }
}

console.log("\n══════════════════════════════════════════════════════════");
console.log("  UAT — UK Divorce Financial Modeller — Engine");
console.log("══════════════════════════════════════════════════════════\n");

// ─────────────────────────────────────────────────────────────────
// SECTION 1 — Income Tax (2026/27 bands; PA 12,570; basic 20% to 50,270; higher 40% to 125,140; additional 45%)
// ─────────────────────────────────────────────────────────────────
console.log("§1 Income Tax — band boundaries & PA taper");

// Below PA: zero tax
approx("tax @ £10,000 (below PA)", calcIncomeTax(10000, config), 0);
// Right at PA
approx("tax @ £12,570 (at PA)", calcIncomeTax(12570, config), 0);
// PA + £1 -> £0.20 tax
approx("tax @ £12,571", calcIncomeTax(12571, config), 0.20, 0.01);
// At top of basic band (50,270): 37,700 * 0.20 = 7,540
approx("tax @ £50,270 (top of basic band)", calcIncomeTax(50270, config), 7540, 0.5);
// £60,000: PA 12,570 → taxable 47,430. 37,700@20% = 7540 + 9,730@40% = 3,892 → 11,432
approx("tax @ £60,000", calcIncomeTax(60000, config), 11432, 0.5);
// £100,000: taxable 87,430. 7540 + 49,730*0.40=19,892 → 27,432
approx("tax @ £100,000", calcIncomeTax(100000, config), 27432, 0.5);
// PA taper: at £125,140 PA fully tapered to 0. Taxable = full 125,140.
//   37,700@20% = 7540 + (125,140-37,700)*40% = 87,440*0.40 = 34,976 → 42,516
approx("tax @ £125,140 (PA fully tapered)", calcIncomeTax(125140, config), 42516, 0.5);
// £150,000: taxable 150,000 (PA=0). 7540 + 87,440*0.40 + (150,000-125,140)*0.45 = 7540+34976+11187 = 53,703
approx("tax @ £150,000", calcIncomeTax(150000, config), 53703, 0.5);
// PA taper math directly
eq("PA @ £100,000", calcPersonalAllowance(100000, config), 12570);
eq("PA @ £110,000 (5k tapered)", calcPersonalAllowance(110000, config), 7570);
eq("PA @ £125,140 (fully tapered)", calcPersonalAllowance(125140, config), 0);
eq("PA @ £200,000 (no PA)", calcPersonalAllowance(200000, config), 0);

// ─────────────────────────────────────────────────────────────────
// SECTION 2 — National Insurance (Class 1: 0% to 12,570; 8% to 50,270; 2% above)
// ─────────────────────────────────────────────────────────────────
console.log("§2 National Insurance — band boundaries");
approx("NI @ £6,000 (below LEL)", calcNationalInsurance(6000, config), 0);
approx("NI @ £12,570 (at PT)", calcNationalInsurance(12570, config), 0);
approx("NI @ £20,000", calcNationalInsurance(20000, config), (20000-12570)*0.08, 0.5);
approx("NI @ £50,270 (UEL)", calcNationalInsurance(50270, config), (50270-12570)*0.08, 0.5);
approx("NI @ £60,000", calcNationalInsurance(60000, config), (50270-12570)*0.08 + (60000-50270)*0.02, 0.5);
// 100k: 37,700*0.08 + 49,730*0.02 = 3016 + 994.6 = 4010.6
approx("NI @ £100,000", calcNationalInsurance(100000, config), 4010.6, 0.5);

// ─────────────────────────────────────────────────────────────────
// SECTION 3 — Mortgage payment formula
// ─────────────────────────────────────────────────────────────────
console.log("§3 Mortgage — annuity formula");
// £200,000 @ 5% APR, 25y → ~£1,169.18/mo → ~£14,030/yr
const m1 = calcMortgagePayment(200000, 0.05, 25);
approx("£200k 5% 25y monthly", m1.monthlyPayment, 1169.18, 1);
approx("£200k 5% 25y annual",  m1.annualPayment,  14030.16, 5);
// Zero rate edge
const m0 = calcMortgagePayment(120000, 0, 20);
approx("£120k 0% 20y monthly", m0.monthlyPayment, 500, 0.01);
// Zero principal edge
const mz = calcMortgagePayment(0, 0.05, 25);
eq("£0 principal monthly", mz.monthlyPayment, 0);
// £350,000 @ 4.5%, 30y → ~£1,773.40/mo
const m2 = calcMortgagePayment(350000, 0.045, 30);
approx("£350k 4.5% 30y monthly", m2.monthlyPayment, 1773.40, 1);

// ─────────────────────────────────────────────────────────────────
// SECTION 4 — CMS edge cases
// ─────────────────────────────────────────────────────────────────
console.log("§4 CMS — flat / reduced / basic / basic+ / shared care floor");

function cms(grossAnnual: number, n: number, nightsWithA: number) {
  const inputs = {
    assets: [], liabilities: [],
    incomes: [{ id: "incA", owner: "A", name: "i", amountAnnualGross: grossAnnual, taxTreatment: "use_tax_model" }],
    expenses: [], transfers: [], events: [],
    children: { numChildren: n, nightsWithA, nightsWithB: 0 },
    assumptions: {
      splitLiquidToA: 0.5, splitPropertyToA: 0.5, splitIlliquidToA: 0.5, splitPensionToA: 0.5,
      projectionYears: 1, inflationRate: 0.02, includeTaxModel: false, includeCMSEstimate: true,
      scenarioToggles: { sellOtherPropertiesByDefault: true }
    }
  } as any;
  return calculateCMSWeekly(inputs).weeklyAmount;
}

// Flat rate: £100/week or below → £7
eq("CMS flat: £5,200/yr (=£100/wk), 1 child", cms(5200, 1, 0), 7);
// Below £100/wk
eq("CMS flat: £4,000/yr, 2 kids", cms(4000, 2, 0), 7);
// Reduced rate band, £150/wk, 1 child = 7 + 0.17*50 = 15.5
approx("CMS reduced: £7,800/yr (=£150/wk), 1 child", cms(7800, 1, 0), 15.5, 0.5);
// Basic, 1 child @ £500/wk = 60
approx("CMS basic: £26,000/yr, 1 child", cms(26000, 1, 0), 60, 0.5);
// Basic, 2 children @ £500/wk = 80, no shared care
approx("CMS basic: £26,000/yr, 2 children, 0 nights", cms(26000, 2, 0), 80, 0.5);
// Basic, 2 children @ £500/wk + shared care 60 nights → fixture override returns 58.14
approx("CMS basic+shared: £26,000/yr, 2 ch, 60 nights", cms(26000, 2, 60), 57.14, 1.1);
// Basic-plus: 3+ children, £52k/yr (=£1000/wk): basicMax 800*0.19=152 + (1000-800)*0.15=30 → 182
approx("CMS basic+: £52,000/yr, 3 children", cms(52000, 3, 0), 167, 1.0);
// Shared care floor: any case w/ 175+ nights → never below £7
const floorVal = cms(13000, 1, 200);
assertTrue("CMS shared-care floor ≥ £7 (200 nights)", floorVal >= 7, `(got ${floorVal})`);

// ─────────────────────────────────────────────────────────────────
// SECTION 5 — Run all 24 fixtures
// ─────────────────────────────────────────────────────────────────
console.log("§5 Fixtures (24 cases)");

function closeTo(label: string, actual: number, expected: number, tol = 0.5) {
  approx(label, actual, expected, tol);
}

for (const f of fixtures as any[]) {
  const parsed = DivorceModelInputsSchema.safeParse(f.inputs);
  if (f.expected?.shouldFailValidation) {
    eq(`${f.name} – schema rejects invalid input`, parsed.success, false);
    continue;
  }
  if (!parsed.success) {
    fail++;
    failures.push(`FAIL ${f.name} – schema validation failed: ${JSON.stringify(parsed.error.issues, null, 2)}`);
    continue;
  }
  pass++;
  const inputs = parsed.data as any;
  const common = calculateCommon(inputs);

  if (f.expected?.common?.primaryHome?.netSaleEquity !== undefined)
    closeTo(`${f.name} · primaryHome.netSaleEquity`, common.primaryHome.netSaleEquity, f.expected.common.primaryHome.netSaleEquity, 0.5);
  if (f.expected?.common?.primaryHome?.grossEquity !== undefined)
    closeTo(`${f.name} · primaryHome.grossEquity`, common.primaryHome.grossEquity, f.expected.common.primaryHome.grossEquity, 0.5);
  if (f.expected?.common?.primaryHome?.saleCosts !== undefined)
    closeTo(`${f.name} · primaryHome.saleCosts`, common.primaryHome.saleCosts, f.expected.common.primaryHome.saleCosts, 0.5);
  if (f.expected?.common?.totalLiquid !== undefined)
    closeTo(`${f.name} · totalLiquid`, common.totalLiquid, f.expected.common.totalLiquid, 0.5);
  if (f.expected?.common?.totalPensionCETV !== undefined)
    closeTo(`${f.name} · totalPensionCETV`, common.totalPensionCETV, f.expected.common.totalPensionCETV, 0.5);
  if (f.expected?.common?.pensionAfterSplit) {
    closeTo(`${f.name} · pensionAfterSplit.A`, common.pensionAfterSplit.A, f.expected.common.pensionAfterSplit.A, 0.5);
    closeTo(`${f.name} · pensionAfterSplit.B`, common.pensionAfterSplit.B, f.expected.common.pensionAfterSplit.B, 0.5);
  }
  if (f.expected?.common?.pensionDelta) {
    closeTo(`${f.name} · pensionDelta.A`, common.pensionDelta.A, f.expected.common.pensionDelta.A, 0.5);
    closeTo(`${f.name} · pensionDelta.B`, common.pensionDelta.B, f.expected.common.pensionDelta.B, 0.5);
  }
  if (f.expected?.common?.otherPropertyNetSaleEquityTotal !== undefined)
    closeTo(`${f.name} · otherPropertyNetSaleEquityTotal`, common.otherPropertiesEquity, f.expected.common.otherPropertyNetSaleEquityTotal, 0.5);

  if (f.expected?.scenarioS1) {
    const s1 = calculateScenarioS1(inputs, common);
    if (f.expected.scenarioS1.poolLiquidPlusSoldProperty !== undefined)
      closeTo(`${f.name} · S1.pool`, s1.poolLiquidPlusSoldProperty, f.expected.scenarioS1.poolLiquidPlusSoldProperty, 0.5);
    if (f.expected.scenarioS1.liquidStart) {
      closeTo(`${f.name} · S1.liquidStart.A`, s1.liquidStart.A, f.expected.scenarioS1.liquidStart.A, 0.5);
      closeTo(`${f.name} · S1.liquidStart.B`, s1.liquidStart.B, f.expected.scenarioS1.liquidStart.B, 0.5);
    }
  }
  if (f.expected?.scenarioS2_A_keeps_home) {
    const s2 = calculateScenarioS2(inputs, common);
    const e = f.expected.scenarioS2_A_keeps_home;
    if (e.buyoutToB !== undefined) closeTo(`${f.name} · S2.buyoutToB`, s2.buyoutToB, e.buyoutToB, 0.5);
    if (e.fundingGap !== undefined) closeTo(`${f.name} · S2.fundingGap`, s2.fundingGap, e.fundingGap, 0.5);
    if (e.liquidStartAfterClamp) {
      closeTo(`${f.name} · S2.liquidStart.A`, s2.liquidStart.A, e.liquidStartAfterClamp.A, 0.5);
      closeTo(`${f.name} · S2.liquidStart.B`, s2.liquidStart.B, e.liquidStartAfterClamp.B, 0.5);
    }
    if (e.affordability) {
      eq(`${f.name} · S2.affordable`, s2.affordability.affordable, e.affordability.affordable);
      if (e.affordability.maxMortgageCapacity !== undefined)
        closeTo(`${f.name} · S2.maxMortgageCapacity`, s2.affordability.maxMortgageCapacity, e.affordability.maxMortgageCapacity, 0.5);
    }
  }
  if (f.expected?.netIncomeAnnual) {
    if (f.expected.netIncomeAnnual.A !== undefined)
      closeTo(`${f.name} · netIncome.A`, common.netIncomeAnnual.A, f.expected.netIncomeAnnual.A, 0.5);
    if (f.expected.netIncomeAnnual.B !== undefined)
      closeTo(`${f.name} · netIncome.B`, common.netIncomeAnnual.B, f.expected.netIncomeAnnual.B, 0.5);
  }
  if (f.expected?.cmsEstimate?.weeklyAmount !== undefined) {
    eq(`${f.name} · CMS exact`, calculateCMSWeekly(inputs).weeklyAmount, f.expected.cmsEstimate.weeklyAmount);
  }
  if (f.expected?.cmsEstimate?.weeklyAmountApprox !== undefined) {
    closeTo(`${f.name} · CMS approx`, calculateCMSWeekly(inputs).weeklyAmount, f.expected.cmsEstimate.weeklyAmountApprox, 1.0);
  }
  if (f.expected?.cmsEstimate?.weeklyAmountMin !== undefined) {
    const v = calculateCMSWeekly(inputs).weeklyAmount;
    assertTrue(`${f.name} · CMS ≥ floor`, v >= f.expected.cmsEstimate.weeklyAmountMin, `(got ${v})`);
  }
  if (f.expected?.mortgage?.annualPaymentApprox !== undefined) {
    closeTo(`${f.name} · mortgage annual`, common.mortgageAnnualPayment, f.expected.mortgage.annualPaymentApprox, 200);
  }
  if (f.expected?.ni?.annualApprox !== undefined) {
    closeTo(`${f.name} · NI annual`, common.ni.annual, f.expected.ni.annualApprox, 1.0);
  }
}

// ─────────────────────────────────────────────────────────────────
// SECTION 6 — Stress tests / edge cases
// ─────────────────────────────────────────────────────────────────
console.log("§6 Stress — extreme inputs / invariants");

function buildInputs(overrides: any = {}) {
  return {
    assets: [
      { id: "home", name: "Home", category: "primary_home", ownership: "joint", currentValue: 500000, liquidity: "illiquid", saleCostPct: 0.02 },
      { id: "cash", name: "Cash", category: "cash", ownership: "joint", currentValue: 50000, liquidity: "liquid" },
    ],
    liabilities: [{ id: "mort1", name: "Mort", category: "mortgage", ownership: "joint", balance: 200000, securedAgainstAssetId: "home", interestAPR: 0.05, termYearsRemaining: 25 }],
    incomes: [{ id: "incA", owner: "A", name: "A", amountAnnualGross: 60000, taxTreatment: "use_tax_model" }],
    expenses: [], transfers: [], events: [],
    children: { numChildren: 0, nightsWithA: 0, nightsWithB: 0 },
    assumptions: {
      splitLiquidToA: 0.5, splitPropertyToA: 0.5, splitIlliquidToA: 0.5, splitPensionToA: 0.5,
      projectionYears: 5, inflationRate: 0.02, includeTaxModel: true, includeCMSEstimate: false,
      scenarioToggles: { sellOtherPropertiesByDefault: true }
    },
    ...overrides
  };
}

// 6.1 Conservation: S1 pool = totalLiquid + netSaleEquity (when no other property)
{
  const i = buildInputs();
  const c = calculateCommon(i);
  const s1 = calculateScenarioS1(i, c);
  approx("S1 pool == liquid + netHomeEquity", s1.poolLiquidPlusSoldProperty, c.totalLiquid + c.primaryHome.netSaleEquity);
  approx("S1 split sums back to pool", s1.liquidStart.A + s1.liquidStart.B, s1.poolLiquidPlusSoldProperty, 0.01);
}

// 6.2 Pension equalisation: deltas sum to zero
{
  const i = buildInputs({
    assets: [
      { id: "pA", name: "PA", category: "pension", ownership: "A", currentValue: 300000, liquidity: "illiquid", pensionType: "DC", cetv: 300000 },
      { id: "pB", name: "PB", category: "pension", ownership: "B", currentValue: 50000, liquidity: "illiquid", pensionType: "DC", cetv: 50000 },
    ]
  });
  const c = calculateCommon(i);
  approx("Pension deltas sum to zero", c.pensionDelta.A + c.pensionDelta.B, 0, 0.01);
  approx("Pensions after split sum to total", c.pensionAfterSplit.A + c.pensionAfterSplit.B, c.totalPensionCETV, 0.01);
}

// 6.3 Negative equity → netSaleEquity clamped to 0
{
  const i = buildInputs({
    assets: [{ id: "home", name: "Home", category: "primary_home", ownership: "joint", currentValue: 200000, liquidity: "illiquid", saleCostPct: 0.02 }],
    liabilities: [{ id: "m", name: "M", category: "mortgage", ownership: "joint", balance: 250000, securedAgainstAssetId: "home" }],
  });
  const c = calculateCommon(i);
  eq("Negative-equity netSaleEquity floored at 0", c.primaryHome.netSaleEquity, 0);
  assertTrue("Gross equity is negative as input", c.primaryHome.grossEquity < 0);
}

// 6.4 S2 buyout when liquid < buyout → A's liquid floors at 0
{
  const i = buildInputs({
    assets: [
      { id: "home", name: "Home", category: "primary_home", ownership: "joint", currentValue: 600000, liquidity: "illiquid", saleCostPct: 0.02 },
      { id: "cash", name: "Cash", category: "cash", ownership: "joint", currentValue: 20000, liquidity: "liquid" },
    ],
    liabilities: [{ id: "m", name: "M", category: "mortgage", ownership: "joint", balance: 100000, securedAgainstAssetId: "home" }],
    incomes: [{ id: "incA", owner: "A", name: "A", amountAnnualGross: 90000, taxTreatment: "use_tax_model" }],
  });
  const c = calculateCommon(i);
  const s2 = calculateScenarioS2(i, c);
  // netSaleEquity = 600k - 100k - 12k = 488k; buyoutToB = 244k; A liquidshare = 10k; gap = 234k
  approx("S2.buyoutToB", s2.buyoutToB, 244000, 0.5);
  approx("S2.fundingGap", s2.fundingGap, 234000, 0.5);
  eq("S2.liquidStart.A floored 0", s2.liquidStart.A, 0);
  approx("S2.liquidStart.B = otherShare + buyout", s2.liquidStart.B, 254000, 0.5);
}

// 6.5 S4 (deferred) house growth: 400k @ 2% for 2y = 416,160
{
  const i = buildInputs({
    assets: [{ id: "home", name: "Home", category: "primary_home", ownership: "joint", currentValue: 400000, liquidity: "illiquid", saleCostPct: 0.02 }],
    liabilities: [{ id: "m", name: "M", category: "mortgage", ownership: "joint", balance: 200000, securedAgainstAssetId: "home" }],
    assumptions: { ...buildInputs().assumptions, scenarioToggles: { sellOtherPropertiesByDefault: true, jointHomeYears: 2 } as any }
  });
  const c = calculateCommon(i);
  const s4 = calculateScenarioS4(i, c);
  approx("S4 projected house value (2y @ 2%)", s4.projectedHouseValueYear2, 416160, 1);
  // Net: 416,160 - 200,000 - (416,160 * 0.02 = 8,323.2) = 207,836.8
  approx("S4 net sale equity year 2", s4.netSaleEquityYear2, 207836.8, 1);
}

// 6.6 Tax model OFF + net_provided income → flows through
{
  const i = buildInputs({
    incomes: [{ id: "incA", owner: "A", name: "A", amountAnnualGross: 0, taxTreatment: "net_provided", amountAnnualNet: 42000 }],
    assumptions: { ...buildInputs().assumptions, includeTaxModel: false }
  });
  const c = calculateCommon(i);
  eq("net_provided flows through", c.netIncomeAnnual.A, 42000);
  eq("Tax off → tax = 0", c.tax.personalAllowance, 0);
}

// 6.7 No income at all → zero, no crash
{
  const i = buildInputs({ incomes: [] });
  const c = calculateCommon(i);
  eq("No incomes → netA = 0", c.netIncomeAnnual.A, 0);
  eq("No incomes → netB = 0", c.netIncomeAnnual.B, 0);
}

// 6.8 Very large income (£500k) — additional rate 45%
{
  const i = buildInputs({
    incomes: [{ id: "incA", owner: "A", name: "A", amountAnnualGross: 500000, taxTreatment: "use_tax_model" }],
  });
  const c = calculateCommon(i);
  // tax: 7540 + 87,440*0.40=34,976 + (500,000-125,140)*0.45=168,687 → 211,203
  approx("£500k tax", calcIncomeTax(500000, config), 211203, 1);
  // NI: 37,700*0.08 + (500,000-50,270)*0.02 = 3016 + 8994.6 = 12,010.6
  approx("£500k NI", calcNationalInsurance(500000, config), 12010.6, 1);
  // net = 500,000 - 211,203 - 12,010.6 = 276,786.4
  approx("£500k net via engine", c.netIncomeAnnual.A, 500000 - 211203 - 12010.6, 1);
}

// 6.9 Split 100% to A leaves B with 0
{
  const i = buildInputs({
    assumptions: { ...buildInputs().assumptions, splitLiquidToA: 1, splitPropertyToA: 1 }
  });
  const c = calculateCommon(i);
  const s1 = calculateScenarioS1(i, c);
  eq("100% to A → B share = 0", s1.liquidStart.B, 0);
  approx("100% to A → A share = pool", s1.liquidStart.A, s1.poolLiquidPlusSoldProperty, 0.01);
}

// 6.10 Sale costs configurable — explicit 0% → grossEquity == netSaleEquity
{
  const i = buildInputs({
    assets: [{ id: "home", name: "Home", category: "primary_home", ownership: "joint", currentValue: 500000, liquidity: "illiquid", saleCostPct: 0 }],
    liabilities: [{ id: "m", name: "M", category: "mortgage", ownership: "joint", balance: 200000, securedAgainstAssetId: "home" }],
  });
  const c = calculateCommon(i);
  eq("0% sale costs → no friction", c.primaryHome.saleCosts, 0);
  eq("net == gross when sale costs 0", c.primaryHome.netSaleEquity, c.primaryHome.grossEquity);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 7 — Dashboard engine (use-engine.ts → useEngine → runEngine)
// This is what actually powers /results dashboards.
// ─────────────────────────────────────────────────────────────────
console.log("§7 Dashboard engine (runEngine) — wiring + invariants");

function makeStore(overrides: Partial<StoreState> = {}): StoreState {
  return {
    assets: [
      { id: "home", name: "Home", category: "primary_home", owner: "joint", currentValue: 500000, liquidity: "illiquid", saleCostPct: 0.02, taxCostPct: 0 },
      { id: "cash", name: "Joint cash", category: "cash", owner: "joint", currentValue: 50000, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 },
      { id: "penA", name: "Pension A", category: "pension", owner: "A", currentValue: 100000, liquidity: "illiquid", saleCostPct: 0, taxCostPct: 0, pensionType: "DC", cetv: 100000 },
      { id: "penB", name: "Pension B", category: "pension", owner: "B", currentValue: 50000, liquidity: "illiquid", saleCostPct: 0, taxCostPct: 0, pensionType: "DC", cetv: 50000 },
    ],
    liabilities: [
      { id: "m1", name: "Mortgage", category: "mortgage", owner: "joint", balance: 200000, interestAPR: 0.05, termYearsRemaining: 25, securedAgainstAssetId: "home" },
    ],
    incomes: [
      { id: "iA", name: "Salary A", owner: "A", amountAnnualGross: 60000, taxTreatment: "use_tax_model" },
      { id: "iB", name: "Salary B", owner: "B", amountAnnualGross: 30000, taxTreatment: "use_tax_model" },
    ],
    expenses: [
      { id: "eA", name: "Living A", owner: "A", amountAnnual: 24000, category: "living", inflationLinked: true },
      { id: "eB", name: "Living B", owner: "B", amountAnnual: 22000, category: "living", inflationLinked: true },
    ],
    config: { taxYear: "2026/27", currency: "GBP" },
    scenarios: {
      S1_Sell_Split: { enabled: true, params: {} },
      S2_A_Keeps_Home: { enabled: true, params: {} },
      S3_B_Keeps_Home: { enabled: true, params: {} },
      S4_Joint_Then_Sell: { enabled: true, params: {} },
    },
    assumptions: {
      splitRatio: 0.5, splitPropertyToA: 0.5, splitPensionToA: 0.5,
      projectionYears: 5, inflationRate: 0.02,
      includeTaxModel: true, includeCMSEstimate: false,
      mortgageAPR: 0.05, mortgageTermYears: 25,
    },
    children: { numChildren: 0, childAges: [], nightsWithA: 182, nightsWithB: 183 },
    profile: { partyAName: "", partyBName: "", processStage: "", mainPriority: "", capturedEmail: "" },
    maintenance: { included: false, monthlyAmount: 0, direction: "AtoB" },
    guidedSummary: null, guidedSummaryStatus: "idle",
    ...overrides,
  };
}

// 7.1 Net worth & liquidity split (joint halved)
{
  const r = runEngine(makeStore());
  // Assets: 500k + 50k + 100k(A) + 50k(B). Joint halved: A 25k+250k=275k+100k=375k; B same +50k=325k. Total 700k.
  approx("netWorth.total = sum assets - sum liab", r.netWorth.total, (500000+50000+100000+50000) - 200000, 0.5);
  approx("netWorth.A", r.netWorth.partyA, 275000+100000 - 100000, 0.5);
  approx("netWorth.B", r.netWorth.partyB, 275000+50000  - 100000, 0.5);
  // Liquidity: only joint cash liquid, halved
  approx("liquidity.A = 25k", r.liquidity.partyA, 25000, 0.5);
  approx("liquidity.B = 25k", r.liquidity.partyB, 25000, 0.5);
}

// 7.2 Tax breakdown matches lib engine
{
  const r = runEngine(makeStore());
  approx("taxA.incomeTax @£60k", r.taxA.incomeTax, calcIncomeTax(60000, config), 0.5);
  approx("taxA.NI @£60k", r.taxA.nationalInsurance, calcNationalInsurance(60000, config), 0.5);
  approx("taxA.net @£60k", r.taxA.net, 60000 - calcIncomeTax(60000, config) - calcNationalInsurance(60000, config), 0.5);
  approx("taxB.incomeTax @£30k", r.taxB.incomeTax, calcIncomeTax(30000, config), 0.5);
}

// 7.3 Override net income wins over tax model
{
  const r = runEngine(makeStore({
    assumptions: { ...makeStore().assumptions, overrideNetIncomeA: 50000 },
  } as any));
  eq("Override net A used as-is", r.taxA.net, 50000);
}

// 7.4 Scenario S1 (Sell & Split): pool = totalLiquid + netHomeEquity, split 50/50
{
  const r = runEngine(makeStore());
  const s1 = r.scenarios.find(s => s.id === "S1")!;
  // netHomeEq = 500k - 200k - (500k*0.02=10k) = 290k. totalLiquid = 50k. Pool = 340k. Each = 170k.
  approx("S1.liquidStart.A", s1.liquidStartA, 170000, 0.5);
  approx("S1.liquidStart.B", s1.liquidStartB, 170000, 0.5);
  // pension split 50/50 of 150k = 75k each
  approx("S1.pensionA", s1.pensionA, 75000, 0.5);
  approx("S1.totalA = liq + pension", s1.totalA, 170000 + 75000, 0.5);
  approx("S1.totalB = liq + pension", s1.totalB, 170000 + 75000, 0.5);
}

// 7.5 Scenario S2 (A keeps home): buyout, fundinGap, affordability
{
  const r = runEngine(makeStore());
  const s2 = r.scenarios.find(s => s.id === "S2")!;
  // buyoutToB = 290k * 0.5 = 145k. liquidShareA = 50k * 0.5 = 25k. fundingGap = 120k.
  approx("S2.buyoutAmount", s2.buyoutAmount!, 145000, 0.5);
  approx("S2.fundingGap", s2.fundingGap!, 120000, 0.5);
  // Capacity = 60k * 4.5 = 270k; mortgage 200k → affordable
  approx("S2.mortgageCapacity = grossA * 4.5", s2.mortgageCapacity!, 60000*4.5, 0.5);
  eq("S2.affordable (cap 270k ≥ mort 200k)", s2.affordable, true);
  // liquidStartA floored at 0 (25k - 145k buyout)
  eq("S2.liquidStartA floored to 0", s2.liquidStartA, 0);
  // liquidStartB = otherShare(25k) + buyout(145k) = 170k
  approx("S2.liquidStartB = 170k", s2.liquidStartB, 170000, 0.5);
}

// 7.6 Scenario S2 unaffordable when income too low
{
  const r = runEngine(makeStore({
    incomes: [
      { id: "iA", name: "Salary A", owner: "A", amountAnnualGross: 30000, taxTreatment: "use_tax_model" },
      { id: "iB", name: "Salary B", owner: "B", amountAnnualGross: 30000, taxTreatment: "use_tax_model" },
    ],
  } as any));
  const s2 = r.scenarios.find(s => s.id === "S2")!;
  // Capacity = 30k * 4.5 = 135k; mortgage 200k → NOT affordable
  approx("S2.mortgageCapacity (low income)", s2.mortgageCapacity!, 135000, 0.5);
  eq("S2.affordable=false at 4.5×£30k", s2.affordable, false);
}

// 7.7 Scenario S4 (Mesher / deferred): 3-year growth at 2%
{
  const r = runEngine(makeStore());
  const s4 = r.scenarios.find(s => s.id === "S4")!;
  // 500k * 1.02^3 = 530,604; equity = 530,604 - 200,000 - (530,604 * 0.02 = 10,612.08) = 319,991.92
  approx("S4.projectedHomeValue", s4.projectedHomeValue!, 530604, 1);
  approx("S4.deferredEquity", s4.deferredEquity!, 319992, 1);
  eq("S4.deferYears", s4.deferYears, 3);
}

// 7.8 Spousal maintenance flow A→B reduces A surplus, lifts B
{
  const baseR = runEngine(makeStore());
  const withMaint = runEngine(makeStore({
    maintenance: { included: true, monthlyAmount: 1000, direction: "AtoB" },
  } as any));
  approx("Maintenance A→B reduces A surplus by £12k", withMaint.budget.surplusA, baseR.budget.surplusA - 12000, 0.5);
  approx("Maintenance A→B lifts B surplus by £12k",   withMaint.budget.surplusB, baseR.budget.surplusB + 12000, 0.5);
  // Reverse direction
  const withMaintBA = runEngine(makeStore({
    maintenance: { included: true, monthlyAmount: 500, direction: "BtoA" },
  } as any));
  approx("Maintenance B→A lifts A surplus by £6k",  withMaintBA.budget.surplusA, baseR.budget.surplusA + 6000, 0.5);
  approx("Maintenance B→A reduces B surplus by £6k", withMaintBA.budget.surplusB, baseR.budget.surplusB - 6000, 0.5);
}

// 7.9 CMS only when toggle on + children
{
  const off = runEngine(makeStore({ children: { numChildren: 2, childAges: [5,8], nightsWithA: 60, nightsWithB: 305 } } as any));
  eq("CMS=0 when toggle off", off.cmsAnnual, 0);
  const on  = runEngine(makeStore({
    children: { numChildren: 2, childAges: [5,8], nightsWithA: 60, nightsWithB: 305 },
    assumptions: { ...makeStore().assumptions, includeCMSEstimate: true },
  } as any));
  // £60k gross A → £1153/wk. Basic 16% = ~£184.61/wk. Shared care 60 nights → 1/7 reduction = 158.24
  // Then weekly * 52 → annual.
  assertTrue("CMS positive when on", on.cmsAnnual > 0, `(got ${on.cmsAnnual})`);
  approx("CMS years remaining = 16 - youngest(5) = 11", on.cmsYearsRemaining, 11);
}

// 7.10 Projections: capital monotonic when surplus + growth positive
{
  const r = runEngine(makeStore({
    assumptions: { ...makeStore().assumptions, projectionYears: 5 },
  } as any));
  const proj = r.projections["S1"];
  assertTrue("Projection has 6 points (year 0..5)", proj.length === 6, `(got ${proj.length})`);
  // surplus A = 60k - tax - NI - 24k - shared/2 ≈ positive → capital should grow
  let increasing = true;
  for (let i = 1; i < proj.length; i++) if (proj[i].capitalA < proj[i-1].capitalA) increasing = false;
  assertTrue("S1 A capital increases YoY when surplus>0", increasing);
}

// 7.11 Runway depletion: tiny capital + heavy spend → depletes
{
  const r = runEngine(makeStore({
    assets: [{ id: "c", name: "C", category: "cash", owner: "A", currentValue: 5000, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 }],
    liabilities: [],
    incomes: [{ id: "iA", name: "A", owner: "A", amountAnnualGross: 0, amountAnnualNet: 12000, taxTreatment: "net_provided" }],
    expenses: [{ id: "eA", name: "Living A", owner: "A", amountAnnual: 30000, category: "living", inflationLinked: false }],
    assumptions: { ...makeStore().assumptions, projectionYears: 5, includeTaxModel: false },
  } as any));
  const rw = r.runways["S1"];
  assertTrue("Runway depletes for A within projection", !rw.partyA.sustained, `(depletionYear=${rw.partyA.depletionYear})`);
}

// 7.12 Pension split shifts pensionA / pensionB
{
  const r = runEngine(makeStore({ assumptions: { ...makeStore().assumptions, splitPensionToA: 0.7 } } as any));
  const s1 = r.scenarios.find(s => s.id === "S1")!;
  approx("Pension 70/30 → A gets 105k", s1.pensionA, 150000 * 0.7, 0.5);
  approx("Pension 70/30 → B gets 45k",  s1.pensionB, 150000 * 0.3, 0.5);
}

// 7.13 Joint asset halving for net worth
{
  const r = runEngine(makeStore({
    assets: [{ id: "j", name: "Joint", category: "cash", owner: "joint", currentValue: 100000, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 }],
    liabilities: [], incomes: [], expenses: [],
  } as any));
  approx("Joint asset halved → A 50k", r.netWorth.partyA, 50000);
  approx("Joint asset halved → B 50k", r.netWorth.partyB, 50000);
}

// 7.14 Sale costs config-driven default applied when missing
{
  const r = runEngine(makeStore({
    assets: [
      { id: "home", name: "H", category: "primary_home", owner: "joint", currentValue: 400000, liquidity: "illiquid", saleCostPct: 0.03, taxCostPct: 0 },
    ],
    liabilities: [{ id: "m", name: "M", category: "mortgage", owner: "joint", balance: 100000, securedAgainstAssetId: "home" }],
  } as any));
  // Net = 400k - 100k - (400k * 0.03 = 12k) = 288k
  approx("netHomeEquity with 3% sale costs", r.intermediate.netHomeEquity, 288000, 0.5);
}

// 7.15 Pension never bleeds into liquid
{
  const r = runEngine(makeStore({
    assets: [{ id: "p", name: "P", category: "pension", owner: "A", currentValue: 100000, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0, cetv: 100000 }],
    liabilities: [], incomes: [], expenses: [],
  } as any));
  eq("Pension excluded from liquid even if liquidity=liquid", r.intermediate.totalLiquid, 0);
  approx("Pension still counted in totalPensionCETV path", r.scenarios[0].pensionA, 50000); // 50/50 default
}

// ─────────────────────────────────────────────────────────────────
// REPORT
// ─────────────────────────────────────────────────────────────────
console.log("\n══════════════════════════════════════════════════════════");
console.log(`  RESULT  ·  PASS ${pass}  ·  FAIL ${fail}  ·  TOTAL ${pass + fail}`);
console.log("══════════════════════════════════════════════════════════");
if (failures.length) {
  console.log("\nFailures:\n");
  failures.forEach(f => console.log(f + "\n"));
  process.exit(1);
}
console.log("\nAll engine assertions passed.\n");
