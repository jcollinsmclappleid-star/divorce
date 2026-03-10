import type { StoreState } from "@/hooks/use-store";
import { v4 as uuidv4 } from "uuid";

export interface ExampleScenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  data: StoreState;
}

const mortgage1Id = uuidv4();
const home1Id = uuidv4();
const mortgage2Id = uuidv4();
const home2Id = uuidv4();
const mortgage3Id = uuidv4();
const home3Id = uuidv4();

export const EXAMPLE_SCENARIOS: ExampleScenario[] = [
  {
    id: "dual-income",
    title: "Dual Income, Family Home",
    subtitle: "Both working, shared mortgage",
    description: "A typical couple both earning, with a family home and modest savings. Shows how selling vs keeping the home changes each party's liquid position.",
    highlights: ["£425k home", "£180k mortgage", "Two salaries", "50/50 split"],
    data: {
      assets: [
        { id: home1Id, name: "Family Home", category: "primary_home", owner: "joint", currentValue: 425000, liquidity: "illiquid", saleCostPct: 0.03, taxCostPct: 0, growthRate: 0.02 },
        { id: uuidv4(), name: "Joint Savings", category: "cash", owner: "joint", currentValue: 28000, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 },
        { id: uuidv4(), name: "A's ISA", category: "investments", owner: "A", currentValue: 15000, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 },
        { id: uuidv4(), name: "B's ISA", category: "investments", owner: "B", currentValue: 8500, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 },
        { id: uuidv4(), name: "A's Workplace Pension", category: "pension", owner: "A", currentValue: 95000, liquidity: "illiquid", saleCostPct: 0, taxCostPct: 0, pensionType: "DC", cetv: 95000 },
        { id: uuidv4(), name: "B's Workplace Pension", category: "pension", owner: "B", currentValue: 42000, liquidity: "illiquid", saleCostPct: 0, taxCostPct: 0, pensionType: "DC", cetv: 42000 },
      ],
      liabilities: [
        { id: mortgage1Id, name: "Mortgage", category: "mortgage", owner: "joint", balance: 180000, interestAPR: 0.048, termYearsRemaining: 18, securedAgainstAssetId: home1Id },
        { id: uuidv4(), name: "Car Finance (A)", category: "loan", owner: "A", balance: 6500, interestAPR: 0.07, termYearsRemaining: 2 },
      ],
      incomes: [
        { id: uuidv4(), name: "A's Salary", owner: "A", amountAnnualGross: 52000, taxTreatment: "use_tax_model" },
        { id: uuidv4(), name: "B's Salary", owner: "B", amountAnnualGross: 38000, taxTreatment: "use_tax_model" },
      ],
      expenses: [
        { id: uuidv4(), name: "A's Council Tax", owner: "A", amountAnnual: 1200, category: "housing", inflationLinked: true },
        { id: uuidv4(), name: "B's Council Tax", owner: "B", amountAnnual: 1200, category: "housing", inflationLinked: true },
        { id: uuidv4(), name: "A's Utilities", owner: "A", amountAnnual: 1800, category: "utilities", inflationLinked: true },
        { id: uuidv4(), name: "B's Utilities", owner: "B", amountAnnual: 1800, category: "utilities", inflationLinked: true },
        { id: uuidv4(), name: "A's Food & Groceries", owner: "A", amountAnnual: 3000, category: "food", inflationLinked: true },
        { id: uuidv4(), name: "B's Food & Groceries", owner: "B", amountAnnual: 3000, category: "food", inflationLinked: true },
        { id: uuidv4(), name: "A's Transport", owner: "A", amountAnnual: 1500, category: "transport", inflationLinked: true },
        { id: uuidv4(), name: "B's Transport", owner: "B", amountAnnual: 1500, category: "transport", inflationLinked: true },
        { id: uuidv4(), name: "A's Insurance", owner: "A", amountAnnual: 900, category: "insurance", inflationLinked: false },
        { id: uuidv4(), name: "B's Insurance", owner: "B", amountAnnual: 900, category: "insurance", inflationLinked: false },
        { id: uuidv4(), name: "A's Personal & Clothing", owner: "A", amountAnnual: 1200, category: "personal", inflationLinked: true },
        { id: uuidv4(), name: "B's Personal & Clothing", owner: "B", amountAnnual: 1200, category: "personal", inflationLinked: true },
      ],
      config: { taxYear: "2025/26", currency: "GBP" },
      scenarios: {
        S1_Sell_Split: { enabled: true, params: {} },
        S2_A_Keeps_Home: { enabled: true, params: {} },
        S3_B_Keeps_Home: { enabled: false, params: {} },
        S4_Joint_Then_Sell: { enabled: false, params: {} },
      },
      assumptions: {
        splitRatio: 0.5,
        splitPropertyToA: 0.5,
        splitPensionToA: 0.5,
        projectionYears: 10,
        inflationRate: 0.02,
        includeTaxModel: true,
        includeCMSEstimate: false,
        mortgageAPR: 0.048,
        mortgageTermYears: 18,
      },
      children: { numChildren: 0, childAges: [], nightsWithA: 182, nightsWithB: 183 },
      profile: { partyAName: "", partyBName: "", processStage: "", mainPriority: "" },
    },
  },
  {
    id: "one-earner-children",
    title: "One Earner with Children",
    subtitle: "Income imbalance, child maintenance",
    description: "One higher earner and a part-time parent, with two children. Demonstrates how child maintenance and income disparity affect long-term stability.",
    highlights: ["£350k home", "2 children", "£65k vs £12k income", "CMS estimate"],
    data: {
      assets: [
        { id: home2Id, name: "Family Home", category: "primary_home", owner: "joint", currentValue: 350000, liquidity: "illiquid", saleCostPct: 0.03, taxCostPct: 0, growthRate: 0.02 },
        { id: uuidv4(), name: "Joint Savings", category: "cash", owner: "joint", currentValue: 12000, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 },
        { id: uuidv4(), name: "A's Pension (DB)", category: "pension", owner: "A", currentValue: 180000, liquidity: "illiquid", saleCostPct: 0, taxCostPct: 0, pensionType: "DB", cetv: 180000 },
        { id: uuidv4(), name: "B's Pension", category: "pension", owner: "B", currentValue: 18000, liquidity: "illiquid", saleCostPct: 0, taxCostPct: 0, pensionType: "DC", cetv: 18000 },
        { id: uuidv4(), name: "A's Car", category: "vehicle", owner: "A", currentValue: 12000, liquidity: "illiquid", saleCostPct: 0.05, taxCostPct: 0 },
      ],
      liabilities: [
        { id: mortgage2Id, name: "Mortgage", category: "mortgage", owner: "joint", balance: 140000, interestAPR: 0.052, termYearsRemaining: 15, securedAgainstAssetId: home2Id },
        { id: uuidv4(), name: "Credit Card (A)", category: "credit_card", owner: "A", balance: 3200, interestAPR: 0.22 },
      ],
      incomes: [
        { id: uuidv4(), name: "A's Salary", owner: "A", amountAnnualGross: 65000, taxTreatment: "use_tax_model" },
        { id: uuidv4(), name: "B's Part-Time Income", owner: "B", amountAnnualGross: 12000, taxTreatment: "use_tax_model" },
      ],
      expenses: [
        { id: uuidv4(), name: "A's Council Tax", owner: "A", amountAnnual: 1200, category: "housing", inflationLinked: true },
        { id: uuidv4(), name: "B's Council Tax", owner: "B", amountAnnual: 900, category: "housing", inflationLinked: true },
        { id: uuidv4(), name: "A's Utilities", owner: "A", amountAnnual: 1800, category: "utilities", inflationLinked: true },
        { id: uuidv4(), name: "B's Utilities", owner: "B", amountAnnual: 1400, category: "utilities", inflationLinked: true },
        { id: uuidv4(), name: "A's Food & Groceries", owner: "A", amountAnnual: 3600, category: "food", inflationLinked: true },
        { id: uuidv4(), name: "B's Food & Groceries", owner: "B", amountAnnual: 3600, category: "food", inflationLinked: true },
        { id: uuidv4(), name: "Children's Activities", owner: "shared", amountAnnual: 4800, category: "childcare", inflationLinked: true },
        { id: uuidv4(), name: "A's Transport", owner: "A", amountAnnual: 1500, category: "transport", inflationLinked: true },
        { id: uuidv4(), name: "B's Transport", owner: "B", amountAnnual: 900, category: "transport", inflationLinked: true },
        { id: uuidv4(), name: "School Costs", owner: "shared", amountAnnual: 1200, category: "education", inflationLinked: true },
      ],
      config: { taxYear: "2025/26", currency: "GBP" },
      scenarios: {
        S1_Sell_Split: { enabled: true, params: {} },
        S2_A_Keeps_Home: { enabled: false, params: {} },
        S3_B_Keeps_Home: { enabled: true, params: {} },
        S4_Joint_Then_Sell: { enabled: false, params: {} },
      },
      assumptions: {
        splitRatio: 0.5,
        splitPropertyToA: 0.5,
        splitPensionToA: 0.5,
        projectionYears: 10,
        inflationRate: 0.02,
        includeTaxModel: true,
        includeCMSEstimate: true,
        mortgageAPR: 0.052,
        mortgageTermYears: 15,
      },
      children: { numChildren: 2, childAges: [8, 5], nightsWithA: 104, nightsWithB: 261 },
      profile: { partyAName: "", partyBName: "", processStage: "", mainPriority: "" },
    },
  },
  {
    id: "high-equity-retirement",
    title: "High Equity, Near Retirement",
    subtitle: "Significant pensions, low mortgage",
    description: "An older couple with substantial home equity and pension pots but modest remaining mortgage. Highlights pension splitting and long-term sustainability.",
    highlights: ["£650k home", "£45k mortgage", "Large pensions", "60/40 split"],
    data: {
      assets: [
        { id: home3Id, name: "Family Home", category: "primary_home", owner: "joint", currentValue: 650000, liquidity: "illiquid", saleCostPct: 0.03, taxCostPct: 0, growthRate: 0.01 },
        { id: uuidv4(), name: "Joint Savings", category: "cash", owner: "joint", currentValue: 45000, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 },
        { id: uuidv4(), name: "A's Investment Portfolio", category: "investments", owner: "A", currentValue: 35000, liquidity: "liquid", saleCostPct: 0.005, taxCostPct: 0 },
        { id: uuidv4(), name: "A's Final Salary Pension", category: "pension", owner: "A", currentValue: 420000, liquidity: "illiquid", saleCostPct: 0, taxCostPct: 0, pensionType: "DB", cetv: 420000 },
        { id: uuidv4(), name: "B's DC Pension", category: "pension", owner: "B", currentValue: 85000, liquidity: "illiquid", saleCostPct: 0, taxCostPct: 0, pensionType: "DC", cetv: 85000 },
        { id: uuidv4(), name: "B's Car", category: "vehicle", owner: "B", currentValue: 8000, liquidity: "illiquid", saleCostPct: 0.05, taxCostPct: 0 },
      ],
      liabilities: [
        { id: mortgage3Id, name: "Mortgage", category: "mortgage", owner: "joint", balance: 45000, interestAPR: 0.039, termYearsRemaining: 5, securedAgainstAssetId: home3Id },
      ],
      incomes: [
        { id: uuidv4(), name: "A's Salary", owner: "A", amountAnnualGross: 72000, taxTreatment: "use_tax_model" },
        { id: uuidv4(), name: "B's Salary", owner: "B", amountAnnualGross: 28000, taxTreatment: "use_tax_model" },
      ],
      expenses: [
        { id: uuidv4(), name: "A's Council Tax", owner: "A", amountAnnual: 1800, category: "housing", inflationLinked: true },
        { id: uuidv4(), name: "B's Council Tax", owner: "B", amountAnnual: 1400, category: "housing", inflationLinked: true },
        { id: uuidv4(), name: "A's Utilities", owner: "A", amountAnnual: 2200, category: "utilities", inflationLinked: true },
        { id: uuidv4(), name: "B's Utilities", owner: "B", amountAnnual: 2000, category: "utilities", inflationLinked: true },
        { id: uuidv4(), name: "A's Food & Groceries", owner: "A", amountAnnual: 4200, category: "food", inflationLinked: true },
        { id: uuidv4(), name: "B's Food & Groceries", owner: "B", amountAnnual: 3600, category: "food", inflationLinked: true },
        { id: uuidv4(), name: "A's Insurance & Health", owner: "A", amountAnnual: 1800, category: "insurance", inflationLinked: false },
        { id: uuidv4(), name: "B's Insurance & Health", owner: "B", amountAnnual: 1800, category: "insurance", inflationLinked: false },
        { id: uuidv4(), name: "A's Transport", owner: "A", amountAnnual: 1500, category: "transport", inflationLinked: true },
        { id: uuidv4(), name: "B's Transport", owner: "B", amountAnnual: 1500, category: "transport", inflationLinked: true },
        { id: uuidv4(), name: "A's Personal & Leisure", owner: "A", amountAnnual: 2400, category: "personal", inflationLinked: true },
        { id: uuidv4(), name: "B's Personal & Leisure", owner: "B", amountAnnual: 2400, category: "personal", inflationLinked: true },
      ],
      config: { taxYear: "2025/26", currency: "GBP" },
      scenarios: {
        S1_Sell_Split: { enabled: true, params: {} },
        S2_A_Keeps_Home: { enabled: true, params: {} },
        S3_B_Keeps_Home: { enabled: false, params: {} },
        S4_Joint_Then_Sell: { enabled: false, params: {} },
      },
      assumptions: {
        splitRatio: 0.6,
        splitPropertyToA: 0.6,
        splitPensionToA: 0.6,
        projectionYears: 10,
        inflationRate: 0.02,
        includeTaxModel: true,
        includeCMSEstimate: false,
        mortgageAPR: 0.039,
        mortgageTermYears: 5,
      },
      children: { numChildren: 0, childAges: [], nightsWithA: 182, nightsWithB: 183 },
      profile: { partyAName: "", partyBName: "", processStage: "", mainPriority: "" },
    },
  },
];
