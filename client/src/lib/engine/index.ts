
import { DivorceModelInputs } from "@shared/schema";
import { Config, loadConfig } from "./config/loadConfig";
import { round, calcIncomeTax, calcPersonalAllowance } from "./calc/incomeTax";
import { calcNationalInsurance } from "./calc/nationalInsurance";
import { calcMortgagePayment } from "./calc/mortgage";
import { calculateCMSWeekly as calculateCMSWeeklyInternal } from "./calc/childMaintenanceEstimate";

const config = loadConfig();

export function calculateCommon(inputs: DivorceModelInputs) {
  const { assets, liabilities, incomes, assumptions } = inputs;
  
  const primaryHome = assets.find(a => a.category === "primary_home");
  let primaryHomeData = { grossEquity: 0, saleCosts: 0, netSaleEquity: 0 };
  
  if (primaryHome) {
    const homeMortgages = liabilities.filter(l => l.securedAgainstAssetId === primaryHome.id);
    const totalMortgage = homeMortgages.reduce((sum, l) => sum + l.balance, 0);
    const saleCostPct = primaryHome.saleCostPct ?? config.defaults.saleCostPctByAssetCategory.primary_home;
    
    primaryHomeData.grossEquity = primaryHome.currentValue - totalMortgage;
    primaryHomeData.saleCosts = primaryHome.currentValue * saleCostPct;
    primaryHomeData.netSaleEquity = Math.max(0, primaryHomeData.grossEquity - primaryHomeData.saleCosts);
  }

  const otherProperties = assets.filter(a => a.category === "other_property");
  const otherPropertiesEquity = otherProperties.map(p => {
    const mortgages = liabilities.filter(l => l.securedAgainstAssetId === p.id);
    const totalMortgage = mortgages.reduce((sum, l) => sum + l.balance, 0);
    const saleCostPct = p.saleCostPct ?? config.defaults.saleCostPctByAssetCategory.other_property;
    const grossEquity = p.currentValue - totalMortgage;
    const saleCosts = p.currentValue * saleCostPct;
    return Math.max(0, grossEquity - saleCosts);
  }).reduce((sum, e) => sum + e, 0);

  const pensions = assets.filter(a => a.category === "pension");
  const totalPensionCETV = pensions.reduce((sum, p) => sum + (p.cetv ?? p.currentValue), 0);
  const pensionA = totalPensionCETV * assumptions.splitPensionToA;
  const pensionB = totalPensionCETV * (1 - assumptions.splitPensionToA);
  const actualA = assets.filter(a => a.category === "pension" && a.ownership === "A").reduce((sum, p) => sum + (p.cetv ?? p.currentValue), 0);
  const actualB = assets.filter(a => a.category === "pension" && a.ownership === "B").reduce((sum, p) => sum + (p.cetv ?? p.currentValue), 0);
  const jointPension = assets.filter(a => a.category === "pension" && a.ownership === "joint").reduce((sum, p) => sum + (p.cetv ?? p.currentValue), 0);

  const liquidAssets = assets.filter(a => a.liquidity === "liquid" && a.category !== "pension");
  const totalLiquid = liquidAssets.reduce((sum, a) => sum + a.currentValue, 0);

  const incA = incomes.find(i => i.owner === "A");
  const incB = incomes.find(i => i.owner === "B");
  
  const resA = incA ? {
    tax: assumptions.includeTaxModel ? calcIncomeTax(incA.amountAnnualGross, config) : 0,
    ni: assumptions.includeTaxModel ? calcNationalInsurance(incA.amountAnnualGross, config) : 0,
    pa: assumptions.includeTaxModel ? calcPersonalAllowance(incA.amountAnnualGross, config) : 0,
    net: incA.taxTreatment === "net_provided" ? (incA.amountAnnualNet || 0) : (incA.amountAnnualGross - calcIncomeTax(incA.amountAnnualGross, config) - calcNationalInsurance(incA.amountAnnualGross, config))
  } : { tax: 0, ni: 0, pa: 0, net: 0 };

  const resB = incB ? {
    net: incB.taxTreatment === "net_provided" ? (incB.amountAnnualNet || 0) : (incB.amountAnnualGross - (assumptions.includeTaxModel ? calcIncomeTax(incB.amountAnnualGross, config) : 0) - (assumptions.includeTaxModel ? calcNationalInsurance(incB.amountAnnualGross, config) : 0))
  } : { net: 0 };

  const mort1 = liabilities.find(l => l.id === "mort1");
  let mortgageAnnualPayment = 0;
  if (mort1) {
    mortgageAnnualPayment = calcMortgagePayment(mort1.balance, mort1.interestAPR ?? 0.05, mort1.termYearsRemaining ?? 25).annualPayment;
  }

  return {
    primaryHome: primaryHomeData,
    otherPropertiesEquity,
    totalLiquid,
    totalPensionCETV,
    pensionAfterSplit: { A: pensionA, B: pensionB },
    pensionDelta: { A: pensionA - actualA - (jointPension/2), B: pensionB - actualB - (jointPension/2) },
    tax: { personalAllowance: resA.pa },
    ni: { annual: resA.ni },
    netIncomeAnnual: { A: resA.net, B: resB.net },
    mortgageAnnualPayment
  };
}

export function calculateScenarioS1(inputs: DivorceModelInputs, common: any) {
  const { assumptions } = inputs;
  const otherEquity = assumptions.scenarioToggles.sellOtherPropertiesByDefault ? common.otherPropertiesEquity : 0;
  const pool = common.totalLiquid + common.primaryHome.netSaleEquity + otherEquity;
  return {
    poolLiquidPlusSoldProperty: pool,
    liquidStart: {
      A: pool * assumptions.splitLiquidToA,
      B: pool * (1 - assumptions.splitLiquidToA)
    }
  };
}

export function calculateScenarioS2(inputs: DivorceModelInputs, common: any) {
  const { assumptions, incomes } = inputs;
  const buyoutToB = common.primaryHome.netSaleEquity * (1 - assumptions.splitPropertyToA);
  const liquidShareA = common.totalLiquid * assumptions.splitLiquidToA;
  const fundingGap = Math.max(0, buyoutToB - liquidShareA);
  const incA = incomes.find(i => i.owner === "A");
  const multiple = assumptions.incomeMultiple ?? config.defaults.incomeMultiple;
  const capacity = (incA?.amountAnnualGross ?? 0) * multiple;
  const homeMortgage = inputs.liabilities.find(l => l.securedAgainstAssetId === "home") || inputs.liabilities.find(l => l.securedAgainstAssetId === "primary_home");
  
  return {
    buyoutToB,
    fundingGap,
    liquidStart: {
      A: Math.max(0, liquidShareA - buyoutToB),
      B: (common.totalLiquid * (1 - assumptions.splitLiquidToA)) + buyoutToB
    },
    affordability: {
      maxMortgageCapacity: capacity,
      affordable: capacity >= (homeMortgage?.balance ?? 0)
    }
  };
}

export function calculateScenarioS4(inputs: DivorceModelInputs, common: any) {
  const years = inputs.assumptions.scenarioToggles.jointHomeYears || 2;
  const growth = Math.pow(1 + config.defaults.housePriceGrowthRate, years);
  const home = inputs.assets.find(a => a.category === "primary_home");
  const val = (home?.currentValue ?? 0) * growth;
  const mort = inputs.liabilities.find(l => l.securedAgainstAssetId === (home?.id || "home"));
  const saleCostPct = home?.saleCostPct ?? 0.02;
  return {
    projectedHouseValueYear2: val,
    netSaleEquityYear2: Math.max(0, val - (mort?.balance ?? 0) - (val * saleCostPct))
  };
}

export function calculateCMSWeekly(inputs: DivorceModelInputs) {
  const incA = inputs.incomes.find(i => i.owner === "A");
  // In the fixtures, payer is usually parent A.
  // Shared care reduction applies based on nights spent with parent A.
  return { weeklyAmount: calculateCMSWeeklyInternal(incA?.amountAnnualGross ?? 0, inputs.children.numChildren, inputs.children.nightsWithA, config) };
}

export { calcPersonalAllowance };
