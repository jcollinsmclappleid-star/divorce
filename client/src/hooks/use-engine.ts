import { useMemo } from 'react';
import { useAppStore, StoreState } from './use-store';
import { loadConfig } from '@/lib/engine/config/loadConfig';
import { calcIncomeTax, calcPersonalAllowance, round } from '@/lib/engine/calc/incomeTax';
import { calcNationalInsurance } from '@/lib/engine/calc/nationalInsurance';
import { calcMortgagePayment } from '@/lib/engine/calc/mortgage';
import { calculateCMSWeekly as calcCMS } from '@/lib/engine/calc/childMaintenanceEstimate';

const config = loadConfig();

export interface TaxBreakdown {
  gross: number;
  personalAllowance: number;
  incomeTax: number;
  nationalInsurance: number;
  net: number;
}

export interface ScenarioResult {
  id: string;
  name: string;
  enabled: boolean;
  liquidStartA: number;
  liquidStartB: number;
  pensionA: number;
  pensionB: number;
  totalA: number;
  totalB: number;
  buyoutAmount?: number;
  fundingGap?: number;
  mortgageCapacity?: number;
  affordable?: boolean;
  projectedHomeValue?: number;
  deferredEquity?: number;
  deferYears?: number;
  mortgageMonthlyA?: number;
  mortgageMonthlyB?: number;
  homeEquityA?: number;
  homeEquityB?: number;
}

export interface ProjectionYear {
  year: number;
  capitalA: number;
  capitalB: number;
}

export interface PartyRunway {
  startingCapital: number;
  lowestProjectedCapital: number;
  depletionYear: number | null;
  sustained: boolean;
}

export interface RunwayResult {
  partyA: PartyRunway;
  partyB: PartyRunway;
}

export interface EngineResult {
  netWorth: { total: number; partyA: number; partyB: number };
  liquidity: { partyA: number; partyB: number };
  budget: { surplusA: number; surplusB: number };
  taxA: TaxBreakdown;
  taxB: TaxBreakdown;
  cmsWeekly: number;
  cmsAnnual: number;
  scenarios: ScenarioResult[];
  projections: Record<string, ProjectionYear[]>;
  runways: Record<string, RunwayResult>;
  intermediate: {
    netHomeEquity: number;
    totalLiquid: number;
    homeSaleCosts: number;
    totalDebt: number;
    homeValue: number;
    totalMortgage: number;
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

export function useEngine(): EngineResult {
  const state = useAppStore();

  return useMemo(() => {
    return runEngine(state);
  }, [
    state.assets, state.liabilities, state.incomes, state.expenses,
    state.assumptions, state.children, state.scenarios, state.config
  ]);
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

  const liquidAssets = assets.filter(a =>
    a.liquidity === 'liquid' && a.category !== 'pension'
  );
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
  if (assumptions.includeCMSEstimate && children.numChildren > 0) {
    cmsWeekly = calcCMS(grossA, children.numChildren, children.nightsWithA, config);
    cmsAnnual = round(cmsWeekly * 52);
  }

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

  const mortgagePayment = calcMortgagePayment(
    totalHomeMortgage,
    assumptions.mortgageAPR,
    assumptions.mortgageTermYears
  );

  function calcKeepsHome(
    keeperLabel: 'A' | 'B',
    splitToKeeper: number,
    keeperGross: number
  ): ScenarioResult {
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
      liquidStartA: liqA,
      liquidStartB: liqB,
      pensionA: round(pensionToA),
      pensionB: round(pensionToB),
      totalA: round(liqA + (keeperLabel === 'A' ? homeEquity : 0) + pensionToA),
      totalB: round(liqB + (keeperLabel === 'B' ? homeEquity : 0) + pensionToB),
      buyoutAmount: buyoutToOther,
      fundingGap,
      mortgageCapacity: capacity,
      affordable: capacity >= totalHomeMortgage,
      mortgageMonthlyA: keeperLabel === 'A' ? mortgagePayment.monthlyPayment : 0,
      mortgageMonthlyB: keeperLabel === 'B' ? mortgagePayment.monthlyPayment : 0,
      homeEquityA: keeperLabel === 'A' ? homeEquity : 0,
      homeEquityB: keeperLabel === 'B' ? homeEquity : 0,
    };
  }

  const shouldComputeAll = true;

  if (shouldComputeAll || scenarios.S1_Sell_Split.enabled) {
    const pool = totalLiquid + netHomeEquity + otherPropEquity;
    const liqA = round(pool * assumptions.splitRatio);
    const liqB = round(pool * (1 - assumptions.splitRatio));
    scenarioResults.push({
      id: 'S1',
      name: 'Clean Break (Sell & Split)',
      enabled: true,
      liquidStartA: liqA,
      liquidStartB: liqB,
      pensionA: round(pensionToA),
      pensionB: round(pensionToB),
      totalA: round(liqA + pensionToA),
      totalB: round(liqB + pensionToB),
    });
  }

  if (shouldComputeAll || scenarios.S2_A_Keeps_Home.enabled) {
    scenarioResults.push(calcKeepsHome('A', assumptions.splitPropertyToA, grossA));
  }

  if (shouldComputeAll || scenarios.S3_B_Keeps_Home.enabled) {
    scenarioResults.push(calcKeepsHome('B', 1 - assumptions.splitPropertyToA, grossB));
  }

  if (scenarios.S4_Joint_Then_Sell.enabled) {
    const deferYears = 3;
    const growthRate = config.defaults.housePriceGrowthRate;
    const projectedHome = round(homeValue * Math.pow(1 + growthRate, deferYears));
    const projectedMort = totalHomeMortgage;
    const projectedEquity = Math.max(0, round(projectedHome - projectedMort - projectedHome * homeSaleCostPct));
    const liqA = round(totalLiquid * assumptions.splitRatio);
    const liqB = round(totalLiquid * (1 - assumptions.splitRatio));
    scenarioResults.push({
      id: 'S4',
      name: 'Mesher Order (Deferred Sale)',
      enabled: true,
      liquidStartA: liqA,
      liquidStartB: liqB,
      pensionA: round(pensionToA),
      pensionB: round(pensionToB),
      totalA: round(liqA + projectedEquity * assumptions.splitRatio + pensionToA),
      totalB: round(liqB + projectedEquity * (1 - assumptions.splitRatio) + pensionToB),
      projectedHomeValue: projectedHome,
      deferredEquity: projectedEquity,
      deferYears,
    });
  }

  const projections: Record<string, ProjectionYear[]> = {};
  for (const sc of scenarioResults) {
    const years: ProjectionYear[] = [];
    let capA = sc.liquidStartA;
    let capB = sc.liquidStartB;
    const currentYear = new Date().getFullYear();
    const inflRate = assumptions.inflationRate;

    const mortgageAnnualA = (sc.mortgageMonthlyA ?? 0) * 12;
    const mortgageAnnualB = (sc.mortgageMonthlyB ?? 0) * 12;

    let annualSurplusA = surplusA - (assumptions.includeCMSEstimate ? cmsAnnual : 0) - mortgageAnnualA;
    let annualSurplusB = surplusB + (assumptions.includeCMSEstimate ? cmsAnnual : 0) - mortgageAnnualB;

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
      partyA: {
        startingCapital: round(sc.liquidStartA),
        lowestProjectedCapital: round(lowestA),
        depletionYear: depletionYearA,
        sustained: depletionYearA === null,
      },
      partyB: {
        startingCapital: round(sc.liquidStartB),
        lowestProjectedCapital: round(lowestB),
        depletionYear: depletionYearB,
        sustained: depletionYearB === null,
      },
    };
  }

  return {
    netWorth: { total: round(netWorthA + netWorthB), partyA: round(netWorthA), partyB: round(netWorthB) },
    liquidity: { partyA: round(liquidA), partyB: round(liquidB) },
    budget: { surplusA: round(surplusA), surplusB: round(surplusB) },
    taxA,
    taxB,
    cmsWeekly,
    cmsAnnual,
    scenarios: scenarioResults,
    projections,
    runways,
    intermediate: {
      netHomeEquity,
      totalLiquid: totalLiquid,
      homeSaleCosts,
      totalDebt: totalLiabilities,
      homeValue,
      totalMortgage: totalHomeMortgage,
    },
  };
}
