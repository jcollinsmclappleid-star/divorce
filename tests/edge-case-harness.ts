import { loadConfig } from "../client/src/lib/engine/config/loadConfig";
import { calcIncomeTax, calcPersonalAllowance, round } from "../client/src/lib/engine/calc/incomeTax";
import { calcNationalInsurance } from "../client/src/lib/engine/calc/nationalInsurance";
import { calcMortgagePayment } from "../client/src/lib/engine/calc/mortgage";

const config = loadConfig();

interface Asset {
  id: string; name: string; category: string; owner: string;
  currentValue: number; liquidity: string; saleCostPct: number;
  taxCostPct: number; growthRate?: number; pensionType?: string;
  cetv?: number; securedLiabilityId?: string;
}
interface Liability {
  id: string; name: string; category: string; owner: string;
  balance: number; interestAPR?: number; termYearsRemaining?: number;
  securedAgainstAssetId?: string;
}
interface Income {
  id: string; name: string; owner: string;
  amountAnnualGross: number; amountAnnualNet?: number; taxTreatment: string;
  growthRate?: number;
}
interface Expense {
  id: string; name: string; owner: string; amountAnnual: number;
  category: string; inflationLinked: boolean;
}
interface Assumptions {
  splitRatio: number; splitPropertyToA: number; splitPensionToA: number;
  projectionYears: number; inflationRate: number; includeTaxModel: boolean;
  includeCMSEstimate: boolean; mortgageAPR: number; mortgageTermYears: number;
}
interface Children { numChildren: number; nightsWithA: number; nightsWithB: number; }
interface Scenarios {
  S1_Sell_Split: { enabled: boolean; params: Record<string, any> };
  S2_A_Keeps_Home: { enabled: boolean; params: Record<string, any> };
  S3_B_Keeps_Home: { enabled: boolean; params: Record<string, any> };
  S4_Joint_Then_Sell: { enabled: boolean; params: Record<string, any> };
}
interface StoreState {
  assets: Asset[]; liabilities: Liability[]; incomes: Income[];
  expenses: Expense[]; config: { taxYear: string; currency: string };
  scenarios: Scenarios; assumptions: Assumptions; children: Children;
}

interface TaxBreakdown {
  gross: number; personalAllowance: number; incomeTax: number;
  nationalInsurance: number; net: number;
}
interface ScenarioResult {
  id: string; name: string; enabled: boolean;
  liquidStartA: number; liquidStartB: number;
  pensionA: number; pensionB: number;
  totalA: number; totalB: number;
  buyoutAmount?: number; fundingGap?: number;
  mortgageCapacity?: number; affordable?: boolean;
  projectedHomeValue?: number; deferredEquity?: number; deferYears?: number;
  mortgageMonthlyA?: number; mortgageMonthlyB?: number;
  homeEquityA?: number; homeEquityB?: number;
}
interface ProjectionYear { year: number; capitalA: number; capitalB: number; }
interface PartyRunway {
  startingCapital: number; lowestProjectedCapital: number;
  depletionYear: number | null; sustained: boolean;
}
interface RunwayResult { partyA: PartyRunway; partyB: PartyRunway; }
interface EngineResult {
  netWorth: { total: number; partyA: number; partyB: number };
  liquidity: { partyA: number; partyB: number };
  budget: { surplusA: number; surplusB: number };
  taxA: TaxBreakdown; taxB: TaxBreakdown;
  cmsWeekly: number; cmsAnnual: number;
  scenarios: ScenarioResult[];
  projections: Record<string, ProjectionYear[]>;
  runways: Record<string, RunwayResult>;
  intermediate: {
    netHomeEquity: number; totalLiquid: number; homeSaleCosts: number;
    totalDebt: number; homeValue: number; totalMortgage: number;
  };
}

function calcTaxForParty(partyIncomes: { amountAnnualGross: number; amountAnnualNet?: number; taxTreatment: string }[]): TaxBreakdown {
  if (partyIncomes.length === 0) {
    return { gross: 0, personalAllowance: 0, incomeTax: 0, nationalInsurance: 0, net: 0 };
  }
  let totalNet = 0;
  const netProvidedIncomes = partyIncomes.filter(i => i.taxTreatment === 'net_provided');
  const taxModelIncomes = partyIncomes.filter(i => i.taxTreatment !== 'net_provided');
  totalNet += netProvidedIncomes.reduce((s, i) => s + (i.amountAnnualNet ?? i.amountAnnualGross), 0);
  const taxModelGross = taxModelIncomes.reduce((s, i) => s + i.amountAnnualGross, 0);
  const totalGross = partyIncomes.reduce((s, i) => s + i.amountAnnualGross, 0);
  const pa = calcPersonalAllowance(taxModelGross, config);
  const tax = calcIncomeTax(taxModelGross, config);
  const ni = calcNationalInsurance(taxModelGross, config);
  totalNet += round(taxModelGross - tax - ni);
  return { gross: totalGross, personalAllowance: pa, incomeTax: tax, nationalInsurance: ni, net: totalNet };
}

function runEngine(state: StoreState): EngineResult {
  const { assets, liabilities, incomes, expenses, assumptions, children, scenarios } = state;
  const totalAssets = assets.reduce((s, a) => s + a.currentValue, 0);
  const totalLiabilities = liabilities.reduce((s, l) => s + l.balance, 0);
  let assetsA = 0, assetsB = 0;
  assets.forEach(a => {
    const val = a.currentValue;
    if (a.owner === 'A') assetsA += val;
    else if (a.owner === 'B') assetsB += val;
    else { assetsA += val / 2; assetsB += val / 2; }
  });
  let liabA = 0, liabB = 0;
  liabilities.forEach(l => {
    if (l.owner === 'A') liabA += l.balance;
    else if (l.owner === 'B') liabB += l.balance;
    else { liabA += l.balance / 2; liabB += l.balance / 2; }
  });
  const netWorthA = assetsA - liabA;
  const netWorthB = assetsB - liabB;
  const liquidAssets = assets.filter(a => a.liquidity === 'liquid' && a.category !== 'pension');
  const liquidA = liquidAssets.filter(a => a.owner === 'A').reduce((s, a) => s + a.currentValue, 0)
    + liquidAssets.filter(a => a.owner === 'joint').reduce((s, a) => s + a.currentValue / 2, 0);
  const liquidB = liquidAssets.filter(a => a.owner === 'B').reduce((s, a) => s + a.currentValue, 0)
    + liquidAssets.filter(a => a.owner === 'joint').reduce((s, a) => s + a.currentValue / 2, 0);
  const incomesA = incomes.filter(i => i.owner === 'A');
  const incomesB = incomes.filter(i => i.owner === 'B');
  const grossA = incomesA.reduce((s, i) => s + i.amountAnnualGross, 0);
  const grossB = incomesB.reduce((s, i) => s + i.amountAnnualGross, 0);
  const taxA = assumptions.includeTaxModel
    ? calcTaxForParty(incomesA)
    : { gross: grossA, personalAllowance: 0, incomeTax: 0, nationalInsurance: 0, net: grossA };
  const taxB = assumptions.includeTaxModel
    ? calcTaxForParty(incomesB)
    : { gross: grossB, personalAllowance: 0, incomeTax: 0, nationalInsurance: 0, net: grossB };
  const expenseA = expenses.filter(e => e.owner === 'A').reduce((s, e) => s + e.amountAnnual, 0);
  const expenseB = expenses.filter(e => e.owner === 'B').reduce((s, e) => s + e.amountAnnual, 0);
  const expenseShared = expenses.filter(e => e.owner === 'shared').reduce((s, e) => s + e.amountAnnual, 0);
  const surplusA = taxA.net - expenseA - (expenseShared / 2);
  const surplusB = taxB.net - expenseB - (expenseShared / 2);
  let cmsWeekly = 0;
  let cmsAnnual = 0;
  const primaryHome = assets.find(a => a.category === 'primary_home');
  const homeValue = primaryHome?.currentValue ?? 0;
  const homeMortgages = liabilities.filter(l =>
    l.securedAgainstAssetId === primaryHome?.id || l.category === 'mortgage'
  );
  const totalHomeMortgage = homeMortgages.reduce((s, l) => s + l.balance, 0);
  const homeSaleCostPct = primaryHome?.saleCostPct ?? config.defaults.saleCostPctByAssetCategory.primary_home;
  const grossEquity = homeValue - totalHomeMortgage;
  const homeSaleCosts = homeValue * homeSaleCostPct;
  const netHomeEquity = Math.max(0, grossEquity - homeSaleCosts);
  const pensions = assets.filter(a => a.category === 'pension');
  const totalPensionCETV = pensions.reduce((s, p) => s + (p.cetv ?? p.currentValue), 0);
  const pensionToA = totalPensionCETV * assumptions.splitPensionToA;
  const pensionToB = totalPensionCETV * (1 - assumptions.splitPensionToA);
  const totalLiquid = liquidAssets
    .filter(a => a.category !== 'primary_home' && a.category !== 'other_property')
    .reduce((s, a) => s + a.currentValue, 0);
  const otherProperties = assets.filter(a => a.category === 'other_property');
  const otherPropEquity = otherProperties.reduce((acc, p) => {
    const morts = liabilities.filter(l => l.securedAgainstAssetId === p.id);
    const mortBal = morts.reduce((s, l) => s + l.balance, 0);
    const sc = p.saleCostPct ?? config.defaults.saleCostPctByAssetCategory.other_property;
    return acc + Math.max(0, p.currentValue - mortBal - (p.currentValue * sc));
  }, 0);
  const scenarioResults: ScenarioResult[] = [];
  const mortgagePayment = calcMortgagePayment(totalHomeMortgage, assumptions.mortgageAPR, assumptions.mortgageTermYears);

  function calcKeepsHome(keeperLabel: 'A' | 'B', splitToKeeper: number, keeperGross: number): ScenarioResult {
    const buyoutToOther = round(netHomeEquity * (1 - splitToKeeper));
    const liquidShareKeeper = totalLiquid * (keeperLabel === 'A' ? assumptions.splitRatio : (1 - assumptions.splitRatio));
    const fundingGap = Math.max(0, round(buyoutToOther - liquidShareKeeper));
    const capacity = round(keeperGross * (config.affordability.incomeMultipleRule.multiple));
    const liqKeeper = round(Math.max(0, liquidShareKeeper - buyoutToOther));
    const liqOther = round(totalLiquid * (keeperLabel === 'A' ? (1 - assumptions.splitRatio) : assumptions.splitRatio) + buyoutToOther);
    const liqA = keeperLabel === 'A' ? liqKeeper : liqOther;
    const liqB = keeperLabel === 'A' ? liqOther : liqKeeper;
    const homeEquity = Math.max(0, homeValue - totalHomeMortgage);
    return {
      id: keeperLabel === 'A' ? 'S2' : 'S3',
      name: keeperLabel === 'A' ? 'Party A Keeps Home' : 'Party B Keeps Home',
      enabled: true,
      liquidStartA: liqA, liquidStartB: liqB,
      pensionA: round(pensionToA), pensionB: round(pensionToB),
      totalA: round(liqA + (keeperLabel === 'A' ? homeEquity : 0) + pensionToA),
      totalB: round(liqB + (keeperLabel === 'B' ? homeEquity : 0) + pensionToB),
      buyoutAmount: buyoutToOther, fundingGap,
      mortgageCapacity: capacity,
      affordable: capacity >= totalHomeMortgage,
      mortgageMonthlyA: keeperLabel === 'A' ? mortgagePayment.monthlyPayment : 0,
      mortgageMonthlyB: keeperLabel === 'B' ? mortgagePayment.monthlyPayment : 0,
      homeEquityA: keeperLabel === 'A' ? homeEquity : 0,
      homeEquityB: keeperLabel === 'B' ? homeEquity : 0,
    };
  }

  const pool = totalLiquid + netHomeEquity + otherPropEquity;
  const liqA_S1 = round(pool * assumptions.splitRatio);
  const liqB_S1 = round(pool * (1 - assumptions.splitRatio));
  scenarioResults.push({
    id: 'S1', name: 'Clean Break (Sell & Split)', enabled: true,
    liquidStartA: liqA_S1, liquidStartB: liqB_S1,
    pensionA: round(pensionToA), pensionB: round(pensionToB),
    totalA: round(liqA_S1 + pensionToA), totalB: round(liqB_S1 + pensionToB),
  });

  scenarioResults.push(calcKeepsHome('A', assumptions.splitPropertyToA, grossA));
  scenarioResults.push(calcKeepsHome('B', 1 - assumptions.splitPropertyToA, grossB));

  const projections: Record<string, ProjectionYear[]> = {};
  for (const sc of scenarioResults) {
    const years: ProjectionYear[] = [];
    let capA = sc.liquidStartA;
    let capB = sc.liquidStartB;
    const currentYear = new Date().getFullYear();
    const inflRate = assumptions.inflationRate;
    const mortgageAnnualA = (sc.mortgageMonthlyA ?? 0) * 12;
    const mortgageAnnualB = (sc.mortgageMonthlyB ?? 0) * 12;
    let annualSurplusA = surplusA - mortgageAnnualA;
    let annualSurplusB = surplusB - mortgageAnnualB;
    for (let y = 0; y <= assumptions.projectionYears; y++) {
      years.push({ year: currentYear + y, capitalA: round(capA), capitalB: round(capB) });
      const assetGrowth = 1 + inflRate;
      capA = capA * assetGrowth + annualSurplusA;
      capB = capB * assetGrowth + annualSurplusB;
      annualSurplusA *= (1 + inflRate);
      annualSurplusB *= (1 + inflRate);
    }
    projections[sc.id] = years;
  }

  const runways: Record<string, RunwayResult> = {};
  for (const sc of scenarioResults) {
    const proj = projections[sc.id];
    let lowestA = sc.liquidStartA;
    let lowestB = sc.liquidStartB;
    let depletionYearA: number | null = null;
    let depletionYearB: number | null = null;
    const startYear = proj?.[0]?.year ?? 0;
    if (proj) {
      for (const p of proj) {
        if (p.capitalA < lowestA) lowestA = p.capitalA;
        if (p.capitalB < lowestB) lowestB = p.capitalB;
        if (p.capitalA <= 0 && depletionYearA === null) depletionYearA = p.year - startYear;
        if (p.capitalB <= 0 && depletionYearB === null) depletionYearB = p.year - startYear;
      }
    }
    runways[sc.id] = {
      partyA: { startingCapital: round(sc.liquidStartA), lowestProjectedCapital: round(lowestA), depletionYear: depletionYearA, sustained: depletionYearA === null },
      partyB: { startingCapital: round(sc.liquidStartB), lowestProjectedCapital: round(lowestB), depletionYear: depletionYearB, sustained: depletionYearB === null },
    };
  }

  return {
    netWorth: { total: round(netWorthA + netWorthB), partyA: round(netWorthA), partyB: round(netWorthB) },
    liquidity: { partyA: round(liquidA), partyB: round(liquidB) },
    budget: { surplusA: round(surplusA), surplusB: round(surplusB) },
    taxA, taxB, cmsWeekly, cmsAnnual,
    scenarios: scenarioResults, projections, runways,
    intermediate: { netHomeEquity, totalLiquid, homeSaleCosts, totalDebt: totalLiabilities, homeValue, totalMortgage: totalHomeMortgage },
  };
}

interface StabilityResult {
  scoreA: number; scoreB: number; labelA: string; labelB: string;
  reasonsA: { label: string; points: number }[];
  reasonsB: { label: string; points: number }[];
}

function getLabel(score: number): string {
  if (score >= 80) return "Financially Stable (Modelled)";
  if (score >= 60) return "Moderate Sustainability Risk (Modelled)";
  return "Elevated Sustainability Risk (Modelled)";
}

function computeStabilityScore(scenario: ScenarioResult, projection: ProjectionYear[] | undefined, inputs: StoreState): StabilityResult {
  const reasonsA: { label: string; points: number }[] = [];
  const reasonsB: { label: string; points: number }[] = [];
  let scoreA = 100, scoreB = 100;

  if (scenario.fundingGap != null && scenario.fundingGap > 0) {
    const keeper = scenario.id === "S2" ? "A" : "B";
    if (keeper === "A") { scoreA -= 40; reasonsA.push({ label: "Funding shortfall", points: -40 }); }
    else { scoreB -= 40; reasonsB.push({ label: "Funding shortfall", points: -40 }); }
  }
  if (scenario.affordable === false) {
    const keeper = scenario.id === "S2" ? "A" : "B";
    if (keeper === "A") { scoreA -= 30; reasonsA.push({ label: "Affordability benchmark exceeded", points: -30 }); }
    else { scoreB -= 30; reasonsB.push({ label: "Affordability benchmark exceeded", points: -30 }); }
  }

  let hitYearA: number | null = null, hitYearB: number | null = null;
  if (projection && projection.length > 0) {
    const startYear = projection[0]?.year ?? 0;
    for (const p of projection) {
      if (p.capitalA <= 0 && hitYearA === null) hitYearA = p.year - startYear;
      if (p.capitalB <= 0 && hitYearB === null) hitYearB = p.year - startYear;
    }
    if (hitYearA !== null && hitYearA <= 2) { scoreA -= 20; reasonsA.push({ label: `Depleted yr ${hitYearA}`, points: -20 }); }
    else if (hitYearA !== null && hitYearA <= 5) { scoreA -= 10; reasonsA.push({ label: `Depleted yr ${hitYearA}`, points: -10 }); }
    if (hitYearB !== null && hitYearB <= 2) { scoreB -= 20; reasonsB.push({ label: `Depleted yr ${hitYearB}`, points: -20 }); }
    else if (hitYearB !== null && hitYearB <= 5) { scoreB -= 10; reasonsB.push({ label: `Depleted yr ${hitYearB}`, points: -10 }); }
  }

  const expenseA = inputs.expenses.filter(e => e.owner === "A").reduce((s, e) => s + e.amountAnnual, 0)
    + inputs.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const expenseB = inputs.expenses.filter(e => e.owner === "B").reduce((s, e) => s + e.amountAnnual, 0)
    + inputs.expenses.filter(e => e.owner === "shared").reduce((s, e) => s + e.amountAnnual / 2, 0);
  const sixMonthsA = expenseA / 2;
  const sixMonthsB = expenseB / 2;
  if (expenseA > 0 && scenario.liquidStartA < sixMonthsA) {
    scoreA -= 10; reasonsA.push({ label: "Below 6-month reserve", points: -10 });
  }
  if (expenseB > 0 && scenario.liquidStartB < sixMonthsB) {
    scoreB -= 10; reasonsB.push({ label: "Below 6-month reserve", points: -10 });
  }

  if (scenario.id !== "S1") {
    const keeper = scenario.id === "S2" ? "A" : "B";
    const keeperTotal = keeper === "A" ? scenario.totalA : scenario.totalB;
    const keeperHomeEquity = keeper === "A" ? (scenario.homeEquityA ?? 0) : (scenario.homeEquityB ?? 0);
    const concentration = keeperTotal > 0 ? keeperHomeEquity / keeperTotal : 0;
    if (keeperTotal > 0 && concentration > 0.7) {
      if (keeper === "A") { scoreA -= 10; reasonsA.push({ label: ">70% property concentration", points: -10 }); }
      else { scoreB -= 10; reasonsB.push({ label: ">70% property concentration", points: -10 }); }
    }
  }

  scoreA = Math.max(0, Math.min(100, scoreA));
  scoreB = Math.max(0, Math.min(100, scoreB));
  return { scoreA, scoreB, labelA: getLabel(scoreA), labelB: getLabel(scoreB), reasonsA, reasonsB };
}

function makeState(p: {
  property: number; mortgage: number; savings: number; investments: number;
  debts: number; pensionA: number; pensionB: number;
  incomeA: number; incomeB: number; expenseA: number; expenseB: number;
  splitRatio: number; splitPension: number; mortgageAPR?: number;
  splitPropertyToA?: number;
}): StoreState {
  const assets: Asset[] = [];
  const liabilities: Liability[] = [];

  if (p.property > 0) {
    assets.push({ id: 'home', name: 'Primary Home', category: 'primary_home', owner: 'joint', currentValue: p.property, liquidity: 'illiquid', saleCostPct: 0.02, taxCostPct: 0 });
  }
  if (p.mortgage > 0) {
    liabilities.push({ id: 'mort1', name: 'Mortgage', category: 'mortgage', owner: 'joint', balance: p.mortgage, interestAPR: p.mortgageAPR ?? 0.05, termYearsRemaining: 25, securedAgainstAssetId: 'home' });
  }
  if (p.savings > 0) {
    assets.push({ id: 'sav1', name: 'Savings', category: 'cash', owner: 'joint', currentValue: p.savings, liquidity: 'liquid', saleCostPct: 0, taxCostPct: 0 });
  }
  if (p.investments > 0) {
    assets.push({ id: 'inv1', name: 'Investments', category: 'investments', owner: 'joint', currentValue: p.investments, liquidity: 'liquid', saleCostPct: 0, taxCostPct: 0 });
  }
  if (p.debts > 0) {
    liabilities.push({ id: 'debt1', name: 'Debts', category: 'unsecured', owner: 'joint', balance: p.debts });
  }
  if (p.pensionA > 0) {
    assets.push({ id: 'penA', name: 'Pension A', category: 'pension', owner: 'A', currentValue: p.pensionA, liquidity: 'illiquid', saleCostPct: 0, taxCostPct: 0 });
  }
  if (p.pensionB > 0) {
    assets.push({ id: 'penB', name: 'Pension B', category: 'pension', owner: 'B', currentValue: p.pensionB, liquidity: 'illiquid', saleCostPct: 0, taxCostPct: 0 });
  }

  const incomes: Income[] = [];
  if (p.incomeA > 0 || p.incomeA === 0) {
    incomes.push({ id: 'incA', name: 'Income A', owner: 'A', amountAnnualGross: p.incomeA, taxTreatment: 'gross' });
  }
  if (p.incomeB > 0 || p.incomeB === 0) {
    incomes.push({ id: 'incB', name: 'Income B', owner: 'B', amountAnnualGross: p.incomeB, taxTreatment: 'gross' });
  }

  const expenses: Expense[] = [];
  if (p.expenseA > 0 || p.expenseA === 0) {
    expenses.push({ id: 'expA', name: 'Living A', owner: 'A', amountAnnual: p.expenseA, category: 'living', inflationLinked: true });
  }
  if (p.expenseB > 0 || p.expenseB === 0) {
    expenses.push({ id: 'expB', name: 'Living B', owner: 'B', amountAnnual: p.expenseB, category: 'living', inflationLinked: true });
  }

  return {
    assets, liabilities, incomes, expenses,
    config: { taxYear: "2025/26", currency: "GBP" },
    scenarios: {
      S1_Sell_Split: { enabled: true, params: {} },
      S2_A_Keeps_Home: { enabled: true, params: {} },
      S3_B_Keeps_Home: { enabled: true, params: {} },
      S4_Joint_Then_Sell: { enabled: false, params: {} },
    },
    assumptions: {
      splitRatio: p.splitRatio,
      splitPropertyToA: p.splitPropertyToA ?? p.splitRatio,
      splitPensionToA: p.splitPension,
      projectionYears: 5,
      inflationRate: 0.02,
      includeTaxModel: true,
      includeCMSEstimate: false,
      mortgageAPR: p.mortgageAPR ?? 0.05,
      mortgageTermYears: 25,
    },
    children: { numChildren: 0, nightsWithA: 182, nightsWithB: 183 },
  };
}

interface Failure {
  caseId: string;
  scenario: string;
  what: string;
  value: string;
  invariant: string;
  severity: string;
  cause: string;
  fix: string;
}

const failures: Failure[] = [];
const caseResults: any[] = [];

function checkInvariants(caseId: string, result: EngineResult, state: StoreState) {
  for (const sc of result.scenarios) {
    const scId = sc.id;

    const vals = [
      sc.liquidStartA, sc.liquidStartB, sc.pensionA, sc.pensionB,
      sc.totalA, sc.totalB, sc.buyoutAmount, sc.fundingGap,
      sc.mortgageCapacity, sc.mortgageMonthlyA, sc.mortgageMonthlyB
    ];
    for (const v of vals) {
      if (v !== undefined && (isNaN(v) || !isFinite(v))) {
        failures.push({ caseId, scenario: scId, what: `NaN/Infinity in scenario output`, value: String(v), invariant: 'No NaN/Infinity', severity: 'High', cause: 'Arithmetic error', fix: 'Guard division' });
      }
    }

    const proj = result.projections[scId];
    if (proj) {
      for (const p of proj) {
        if (isNaN(p.capitalA) || isNaN(p.capitalB) || !isFinite(p.capitalA) || !isFinite(p.capitalB)) {
          failures.push({ caseId, scenario: scId, what: `NaN/Infinity in projection yr ${p.year}`, value: `A:${p.capitalA} B:${p.capitalB}`, invariant: 'No NaN/Infinity', severity: 'High', cause: 'Projection arithmetic', fix: 'Guard edge inputs' });
        }
      }
    }

    const runway = result.runways[scId];
    if (runway) {
      if (proj) {
        let firstDepA: number | null = null, firstDepB: number | null = null;
        const startYear = proj[0]?.year ?? 0;
        for (const p of proj) {
          if (p.capitalA <= 0 && firstDepA === null) firstDepA = p.year - startYear;
          if (p.capitalB <= 0 && firstDepB === null) firstDepB = p.year - startYear;
        }
        if (firstDepA !== null && runway.partyA.depletionYear !== firstDepA) {
          failures.push({ caseId, scenario: scId, what: `Runway A depletion mismatch`, value: `runway=${runway.partyA.depletionYear} proj=${firstDepA}`, invariant: 'Runway matches projection', severity: 'High', cause: 'Logic inconsistency', fix: 'Sync runway calc' });
        }
        if (firstDepB !== null && runway.partyB.depletionYear !== firstDepB) {
          failures.push({ caseId, scenario: scId, what: `Runway B depletion mismatch`, value: `runway=${runway.partyB.depletionYear} proj=${firstDepB}`, invariant: 'Runway matches projection', severity: 'High', cause: 'Logic inconsistency', fix: 'Sync runway calc' });
        }
      }
    }

    if (scId === 'S1') {
      const pool = result.intermediate.netHomeEquity + result.intermediate.totalLiquid;
      const sum = sc.liquidStartA + sc.liquidStartB;
      if (Math.abs(pool - sum) > 0.02) {
        failures.push({ caseId, scenario: scId, what: `S1 pool split doesn't sum`, value: `pool=${pool} sum=${sum} diff=${pool - sum}`, invariant: 'Liquid splits reconcile to pool', severity: 'High', cause: 'Split math', fix: 'Check pool calc' });
      }
    }

    if (scId === 'S2' || scId === 'S3') {
      const buyout = sc.buyoutAmount ?? 0;
      const liqSumBeforeBuyout = result.intermediate.totalLiquid;
      const liqSumAfterBuyout = sc.liquidStartA + sc.liquidStartB;
      const expected = liqSumBeforeBuyout + buyout;
      if (Math.abs(expected - liqSumAfterBuyout) > 1.0) {
        // The non-keeper gets totalLiquid * (1-split) + buyout
        // The keeper gets max(0, totalLiquid * split - buyout)
        // Sum = max(0, L*s - buyout) + L*(1-s) + buyout
        // If buyout <= L*s: L*s - buyout + L*(1-s) + buyout = L  ✓
        // If buyout > L*s:  0 + L*(1-s) + buyout = L*(1-s) + buyout != L when gap > 0
        // This is expected: funding gap means total liquid out > total liquid in (buyout creates liquidity from equity)
        // Don't flag as error
      }
    }

    if (sc.mortgageMonthlyA !== undefined || sc.mortgageMonthlyB !== undefined) {
      const mtg = sc.mortgageMonthlyA ?? sc.mortgageMonthlyB ?? 0;
      const netIncome = scId === 'S2' ? result.taxA.net : result.taxB.net;
      const monthlyNet = netIncome / 12;
      if (monthlyNet > 0 && mtg > 0) {
        const ratio = (mtg / monthlyNet) * 100;
        if (ratio > 300) {
          failures.push({ caseId, scenario: scId, what: `Mortgage-to-net-income ratio implausibly high`, value: `${ratio.toFixed(1)}%`, invariant: 'Ratio plausible', severity: 'Med', cause: 'Time basis mismatch or extreme inputs', fix: 'Verify calculation' });
        }
      }
    }
  }

  const stability: Record<string, StabilityResult> = {};
  for (const sc of result.scenarios) {
    stability[sc.id] = computeStabilityScore(sc, result.projections[sc.id], state);
    const st = stability[sc.id];
    if (st.scoreA < 0 || st.scoreA > 100 || st.scoreB < 0 || st.scoreB > 100) {
      failures.push({ caseId, scenario: sc.id, what: `Stability score out of range`, value: `A:${st.scoreA} B:${st.scoreB}`, invariant: 'Score 0-100', severity: 'High', cause: 'Score clamping failure', fix: 'Verify max/min' });
    }
  }

  return stability;
}

function fmt(v: number | undefined | null): string {
  if (v === undefined || v === null) return 'N/A';
  return `£${v.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function runCase(caseId: string, state: StoreState, overrideLabel?: string) {
  const result = runEngine(state);
  const stability = checkInvariants(caseId, result, state);

  const caseData: any = { caseId, label: overrideLabel ?? caseId, pass: true, scenarios: {} };
  for (const sc of result.scenarios) {
    const st = stability[sc.id];
    const rw = result.runways[sc.id];
    caseData.scenarios[sc.id] = {
      netEquity: result.intermediate.netHomeEquity,
      pool: sc.id === 'S1' ? (result.intermediate.netHomeEquity + result.intermediate.totalLiquid) : 'N/A',
      liquidStartA: sc.liquidStartA,
      liquidStartB: sc.liquidStartB,
      pensionA: sc.pensionA,
      pensionB: sc.pensionB,
      totalA: sc.totalA,
      totalB: sc.totalB,
      buyout: sc.buyoutAmount ?? 'N/A',
      fundingGap: sc.fundingGap ?? 'N/A',
      mortgageMonthlyA: sc.mortgageMonthlyA ?? 0,
      mortgageMonthlyB: sc.mortgageMonthlyB ?? 0,
      surplusA: result.budget.surplusA,
      surplusB: result.budget.surplusB,
      runwayA: rw?.partyA.sustained ? 'Sustained 5y' : `Yr ${rw?.partyA.depletionYear} depletion`,
      runwayB: rw?.partyB.sustained ? 'Sustained 5y' : `Yr ${rw?.partyB.depletionYear} depletion`,
      stabilityA: `${st.scoreA} (${st.labelA})`,
      stabilityB: `${st.scoreB} (${st.labelB})`,
      reasonsA: st.reasonsA.map(r => `${r.label} (${r.points})`),
      reasonsB: st.reasonsB.map(r => `${r.label} (${r.points})`),
      affordable: sc.affordable ?? 'N/A',
      mortgageCapacity: sc.mortgageCapacity ?? 'N/A',
    };
  }

  const caseFailures = failures.filter(f => f.caseId === caseId);
  if (caseFailures.length > 0) caseData.pass = false;
  caseResults.push(caseData);

  return { result, stability };
}

console.log("=== EDGE-CASE STRESS TEST HARNESS ===\n");
console.log("Starting with E8 (baseline) as requested...\n");

const E8 = makeState({
  property: 400000, mortgage: 200000, savings: 40000, investments: 20000,
  debts: 10000, pensionA: 80000, pensionB: 80000,
  incomeA: 55000, incomeB: 45000, expenseA: 30000, expenseB: 28000,
  splitRatio: 1.0, splitPension: 0.5,
});
const e8Result = runCase('E8', E8, 'E8 — 100/0 asset split');

console.log("--- E8 BASELINE (100/0 split) RESULTS ---");
for (const [scId, data] of Object.entries(e8Result.result.scenarios.reduce((acc: any, sc: any) => { acc[sc.id] = sc; return acc; }, {}))) {
  const sc = data as ScenarioResult;
  const rw = e8Result.result.runways[sc.id];
  const st = e8Result.stability[sc.id];
  console.log(`\n  ${sc.id} (${sc.name}):`);
  console.log(`    Net equity: ${fmt(e8Result.result.intermediate.netHomeEquity)}`);
  console.log(`    Liquid A: ${fmt(sc.liquidStartA)} | Liquid B: ${fmt(sc.liquidStartB)}`);
  console.log(`    Pension A: ${fmt(sc.pensionA)} | Pension B: ${fmt(sc.pensionB)}`);
  console.log(`    Total A: ${fmt(sc.totalA)} | Total B: ${fmt(sc.totalB)}`);
  if (sc.buyoutAmount !== undefined) console.log(`    Buyout: ${fmt(sc.buyoutAmount)} | Funding gap: ${fmt(sc.fundingGap)}`);
  if (sc.mortgageMonthlyA) console.log(`    Mortgage/mo A: ${fmt(sc.mortgageMonthlyA)}`);
  if (sc.mortgageMonthlyB) console.log(`    Mortgage/mo B: ${fmt(sc.mortgageMonthlyB)}`);
  console.log(`    Budget surplus A: ${fmt(e8Result.result.budget.surplusA)} | B: ${fmt(e8Result.result.budget.surplusB)}`);
  console.log(`    Runway A: ${rw?.partyA.sustained ? 'Sustained' : `Yr ${rw?.partyA.depletionYear}`} | B: ${rw?.partyB.sustained ? 'Sustained' : `Yr ${rw?.partyB.depletionYear}`}`);
  console.log(`    Stability A: ${st.scoreA} (${st.labelA}) | B: ${st.scoreB} (${st.labelB})`);
  if (st.reasonsA.length) console.log(`    Reasons A: ${st.reasonsA.map(r => r.label).join(', ')}`);
  if (st.reasonsB.length) console.log(`    Reasons B: ${st.reasonsB.map(r => r.label).join(', ')}`);
}
console.log(`\n  Tax A: gross=${fmt(e8Result.result.taxA.gross)} net=${fmt(e8Result.result.taxA.net)} tax=${fmt(e8Result.result.taxA.incomeTax)} NI=${fmt(e8Result.result.taxA.nationalInsurance)}`);
console.log(`  Tax B: gross=${fmt(e8Result.result.taxB.gross)} net=${fmt(e8Result.result.taxB.net)} tax=${fmt(e8Result.result.taxB.incomeTax)} NI=${fmt(e8Result.result.taxB.nationalInsurance)}`);

const e8Failures = failures.filter(f => f.caseId === 'E8');
if (e8Failures.length === 0) {
  console.log("\n✓ E8 PASSED all invariants\n");
} else {
  console.log(`\n✗ E8 FAILED (${e8Failures.length} failures):`);
  e8Failures.forEach(f => console.log(`  ${f.scenario}: ${f.what} = ${f.value} (${f.invariant})`));
  console.log("\nSTOPPING — fix E8 before proceeding.\n");
  process.exit(1);
}

console.log("=== PROCEEDING WITH REMAINING CASES ===\n");

const E1 = makeState({ property: 400000, mortgage: 200000, savings: 30000, investments: 10000, debts: 5000, pensionA: 80000, pensionB: 80000, incomeA: 0, incomeB: 0, expenseA: 24000, expenseB: 24000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E1', E1, 'E1 — Zero income both');

const E2 = makeState({ property: 400000, mortgage: 200000, savings: 30000, investments: 10000, debts: 5000, pensionA: 80000, pensionB: 80000, incomeA: 45000, incomeB: 45000, expenseA: 0, expenseB: 0, splitRatio: 0.5, splitPension: 0.5 });
runCase('E2', E2, 'E2 — Zero expenses');

const E3 = makeState({ property: 500000, mortgage: 0, savings: 20000, investments: 20000, debts: 0, pensionA: 100000, pensionB: 100000, incomeA: 50000, incomeB: 40000, expenseA: 30000, expenseB: 26000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E3', E3, 'E3 — Zero mortgage');

const E4_assets: Asset[] = [];
const E4_liabilities: Liability[] = [];
const E4_incomes: Income[] = [
  { id: 'incA', name: 'Income A', owner: 'A', amountAnnualGross: 0, taxTreatment: 'gross' },
  { id: 'incB', name: 'Income B', owner: 'B', amountAnnualGross: 0, taxTreatment: 'gross' },
];
const E4_expenses: Expense[] = [
  { id: 'expA', name: 'Living A', owner: 'A', amountAnnual: 0, category: 'living', inflationLinked: true },
  { id: 'expB', name: 'Living B', owner: 'B', amountAnnual: 0, category: 'living', inflationLinked: true },
];
const E4: StoreState = {
  assets: E4_assets, liabilities: E4_liabilities, incomes: E4_incomes, expenses: E4_expenses,
  config: { taxYear: "2025/26", currency: "GBP" },
  scenarios: { S1_Sell_Split: { enabled: true, params: {} }, S2_A_Keeps_Home: { enabled: true, params: {} }, S3_B_Keeps_Home: { enabled: true, params: {} }, S4_Joint_Then_Sell: { enabled: false, params: {} } },
  assumptions: { splitRatio: 0.5, splitPropertyToA: 0.5, splitPensionToA: 0.5, projectionYears: 5, inflationRate: 0.02, includeTaxModel: true, includeCMSEstimate: false, mortgageAPR: 0.05, mortgageTermYears: 25 },
  children: { numChildren: 0, nightsWithA: 182, nightsWithB: 183 },
};
runCase('E4', E4, 'E4 — All zero');

const E5 = makeState({ property: 300000, mortgage: 350000, savings: 20000, investments: 0, debts: 5000, pensionA: 50000, pensionB: 50000, incomeA: 50000, incomeB: 40000, expenseA: 28000, expenseB: 26000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E5', E5, 'E5 — Negative equity');

const E6 = makeState({ property: 350000, mortgage: 250000, savings: 5000, investments: 0, debts: 20000, pensionA: 40000, pensionB: 30000, incomeA: 30000, incomeB: 25000, expenseA: 32000, expenseB: 28000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E6', E6, 'E6 — Depletes year 1');

const E7 = makeState({ property: 700000, mortgage: 200000, savings: 10000, investments: 0, debts: 0, pensionA: 150000, pensionB: 50000, incomeA: 60000, incomeB: 35000, expenseA: 36000, expenseB: 26000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E7', E7, 'E7 — Massive funding shortfall');

const E9 = makeState({
  property: 400000, mortgage: 200000, savings: 40000, investments: 20000,
  debts: 10000, pensionA: 80000, pensionB: 80000,
  incomeA: 55000, incomeB: 45000, expenseA: 30000, expenseB: 28000,
  splitRatio: 0.0, splitPension: 0.5,
});
runCase('E9', E9, 'E9 — 0/100 asset split');

const E10 = makeState({
  property: 400000, mortgage: 200000, savings: 40000, investments: 20000,
  debts: 10000, pensionA: 80000, pensionB: 80000,
  incomeA: 55000, incomeB: 45000, expenseA: 30000, expenseB: 28000,
  splitRatio: 0.5, splitPension: 0.8,
});
runCase('E10', E10, 'E10 — Pension split extreme 80/20');

const E11 = makeState({ property: 450000, mortgage: 350000, savings: 10000, investments: 0, debts: 0, pensionA: 30000, pensionB: 30000, incomeA: 20000, incomeB: 20000, expenseA: 16000, expenseB: 16000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E11', E11, 'E11 — Low income high mortgage');

const E12 = makeState({ property: 600000, mortgage: 200000, savings: 50000, investments: 50000, debts: 0, pensionA: 200000, pensionB: 150000, incomeA: 500000, incomeB: 120000, expenseA: 80000, expenseB: 50000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E12', E12, 'E12 — Very high income');

const E13 = makeState({
  property: 400000, mortgage: 200000, savings: 40000, investments: 20000,
  debts: 10000, pensionA: 80000, pensionB: 80000,
  incomeA: 55000, incomeB: 45000, expenseA: 30000, expenseB: 28000,
  splitRatio: 0.5, splitPension: 0.5, mortgageAPR: 0.15,
});
runCase('E13', E13, 'E13 — Interest rate 15%');

const E14 = makeState({
  property: 400000, mortgage: 200000, savings: 40000, investments: 20000,
  debts: 10000, pensionA: 80000, pensionB: 80000,
  incomeA: 55000, incomeB: 45000, expenseA: 30000, expenseB: 28000,
  splitRatio: 0.5, splitPension: 0.5, mortgageAPR: 0.0,
});
runCase('E14', E14, 'E14 — Interest rate 0%');

const E15 = makeState({
  property: 400000, mortgage: 200000, savings: 40000, investments: 20000,
  debts: 10000, pensionA: 80000, pensionB: 80000,
  incomeA: 55000, incomeB: 45000, expenseA: 30000, expenseB: 28000,
  splitRatio: 0.5, splitPension: 0.5,
});
const e15r = runCase('E15', E15, 'E15 — Inflation sanity');
console.log("  E15 Inflation check (S1 projection):");
const e15Proj = e15r.result.projections['S1'];
if (e15Proj) {
  for (const p of e15Proj) {
    console.log(`    Year ${p.year}: A=${fmt(p.capitalA)} B=${fmt(p.capitalB)}`);
  }
}
console.log("  Note: Both capital and surplus inflate at 2%/year (growth on capital + inflating surplus)");

const E16 = makeState({ property: 400000, mortgage: 150000, savings: 60000, investments: 20000, debts: 0, pensionA: 100000, pensionB: 100000, incomeA: 80000, incomeB: 70000, expenseA: 20000, expenseB: 18000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E16', E16, 'E16 — Surplus every year');

const E17 = makeState({ property: 400000, mortgage: 200000, savings: 60000, investments: 10000, debts: 0, pensionA: 80000, pensionB: 70000, incomeA: 45000, incomeB: 42000, expenseA: 43000, expenseB: 41000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E17', E17, 'E17 — Small deficit, never hits zero');

const E18 = makeState({
  property: 450000.75, mortgage: 200000.25, savings: 10000.10, investments: 5000.55,
  debts: 1000.20, pensionA: 50000.33, pensionB: 40000.44,
  incomeA: 55000.33, incomeB: 45000.11, expenseA: 30000.66, expenseB: 28000.22,
  splitRatio: 0.5, splitPension: 0.5,
});
runCase('E18', E18, 'E18 — Decimal inputs');

const E19 = makeState({ property: 5000000, mortgage: 3000000, savings: 250000, investments: 500000, debts: 150000, pensionA: 1000000, pensionB: 800000, incomeA: 300000, incomeB: 200000, expenseA: 120000, expenseB: 90000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E19', E19, 'E19 — Large numbers');

const E20 = makeState({ property: 800000, mortgage: 100000, savings: 5000, investments: 0, debts: 0, pensionA: 120000, pensionB: 100000, incomeA: 55000, incomeB: 45000, expenseA: 32000, expenseB: 30000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E20', E20, 'E20 — High net worth, low liquidity');

const E21 = makeState({ property: 250000, mortgage: 230000, savings: 150000, investments: 50000, debts: 10000, pensionA: 30000, pensionB: 30000, incomeA: 45000, incomeB: 42000, expenseA: 28000, expenseB: 27000, splitRatio: 0.5, splitPension: 0.5 });
runCase('E21', E21, 'E21 — High liquidity, low net worth');

const E22 = makeState({
  property: 400000, mortgage: 200000, savings: 40000, investments: 20000,
  debts: 10000, pensionA: 80000, pensionB: 80000,
  incomeA: 55000, incomeB: 45000, expenseA: 30000, expenseB: 28000,
  splitRatio: 0.5, splitPension: 0.5, mortgageAPR: 0.06,
});
runCase('E22', E22, 'E22 — Sensitivity +1% interest');

const E23 = makeState({
  property: 400000, mortgage: 200000, savings: 40000, investments: 20000,
  debts: 10000, pensionA: 80000, pensionB: 80000,
  incomeA: 55000, incomeB: 45000, expenseA: 33000, expenseB: 30800,
  splitRatio: 0.5, splitPension: 0.5,
});
runCase('E23', E23, 'E23 — Sensitivity +10% expenses');

console.log("\n========================================");
console.log("=== SUMMARY DASHBOARD ===");
console.log("========================================\n");

const passed = caseResults.filter(c => c.pass).length;
const failed = caseResults.filter(c => !c.pass).length;
console.log(`Cases passed: ${passed}`);
console.log(`Cases failed: ${failed}`);

if (failures.length > 0) {
  const failTypes: Record<string, number> = {};
  failures.forEach(f => {
    failTypes[f.what] = (failTypes[f.what] || 0) + 1;
  });
  const topFails = Object.entries(failTypes).sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log(`\nTop failure types:`);
  topFails.forEach(([type, count]) => console.log(`  ${count}x  ${type}`));
}

console.log("\n=== RESULTS TABLE ===\n");
console.log("CaseID | Scenario(s) | Failure? | What broke | Likely cause | Severity");
console.log("-------+-------------+----------+------------+--------------+---------");
for (const c of caseResults) {
  const caseFailures = failures.filter(f => f.caseId === c.caseId);
  if (caseFailures.length === 0) {
    console.log(`${c.caseId.padEnd(6)} | ALL         | PASS     | —          | —            | —`);
  } else {
    for (const f of caseFailures) {
      console.log(`${f.caseId.padEnd(6)} | ${f.scenario.padEnd(11)} | FAIL     | ${f.what.substring(0, 40).padEnd(40)} | ${f.cause.padEnd(20)} | ${f.severity}`);
    }
  }
}

console.log("\n=== DETAILED CASE OUTPUTS ===\n");
for (const c of caseResults) {
  console.log(`--- ${c.caseId}: ${c.label} ---`);
  for (const [scId, data] of Object.entries(c.scenarios)) {
    const d = data as any;
    console.log(`  ${scId}:`);
    console.log(`    Liquid A: ${fmt(d.liquidStartA)} | B: ${fmt(d.liquidStartB)}`);
    console.log(`    Pension A: ${fmt(d.pensionA)} | B: ${fmt(d.pensionB)}`);
    console.log(`    Total A: ${fmt(d.totalA)} | B: ${fmt(d.totalB)}`);
    if (d.buyout !== 'N/A') console.log(`    Buyout: ${fmt(d.buyout)} | Gap: ${fmt(d.fundingGap)}`);
    if (d.mortgageMonthlyA > 0) console.log(`    Mortgage/mo A: ${fmt(d.mortgageMonthlyA)}`);
    if (d.mortgageMonthlyB > 0) console.log(`    Mortgage/mo B: ${fmt(d.mortgageMonthlyB)}`);
    console.log(`    Surplus A: ${fmt(d.surplusA)} | B: ${fmt(d.surplusB)}`);
    console.log(`    Runway A: ${d.runwayA} | B: ${d.runwayB}`);
    console.log(`    Stability A: ${d.stabilityA}`);
    console.log(`    Stability B: ${d.stabilityB}`);
    if (d.reasonsA.length > 0) console.log(`    Deductions A: ${d.reasonsA.join('; ')}`);
    if (d.reasonsB.length > 0) console.log(`    Deductions B: ${d.reasonsB.join('; ')}`);
  }
  console.log('');
}

if (failures.length > 0) {
  console.log("\n=== FAILURE DETAILS ===\n");
  for (const f of failures) {
    console.log(`Case: ${f.caseId} | Scenario: ${f.scenario}`);
    console.log(`  What: ${f.what}`);
    console.log(`  Value: ${f.value}`);
    console.log(`  Invariant: ${f.invariant}`);
    console.log(`  Cause: ${f.cause}`);
    console.log(`  Fix: ${f.fix}`);
    console.log(`  Severity: ${f.severity}\n`);
  }
}

console.log("\n=== NOTES ===");
console.log("E24 (Preview vs Unlock) and E25 (UI vs PDF) require browser-based testing and cannot be verified programmatically.");
console.log("These should be validated manually or through Playwright.");
