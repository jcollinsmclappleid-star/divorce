
import { storage } from "./storage";

export async function seedDatabase() {
  const existingSessions = await storage.getSession("demo-session");
  if (!existingSessions) {
    await storage.createSession({
      id: "demo-session",
      name: "Demo Divorce Scenario",
      data: {
        assets: [
          {
            id: "asset-1",
            name: "Family Home",
            category: "primary_home",
            owner: "joint",
            currentValue: 500000,
            liquidity: "illiquid",
            saleCostPct: 0.02,
            taxCostPct: 0
          },
          {
            id: "asset-2",
            name: "Joint Savings",
            category: "cash",
            owner: "joint",
            currentValue: 50000,
            liquidity: "liquid",
            saleCostPct: 0,
            taxCostPct: 0
          },
          {
            id: "asset-3",
            name: "Husband Pension",
            category: "pension",
            owner: "A",
            currentValue: 250000,
            liquidity: "illiquid",
            saleCostPct: 0,
            taxCostPct: 0,
            pensionType: "DC",
            cetv: 250000
          }
        ],
        liabilities: [
          {
            id: "liability-1",
            name: "Home Mortgage",
            category: "mortgage",
            owner: "joint",
            balance: 200000,
            interestAPR: 0.045,
            termYearsRemaining: 20,
            securedAgainstAssetId: "asset-1"
          }
        ],
        incomes: [
          {
            id: "income-1",
            owner: "A",
            name: "Salary A",
            amountAnnualGross: 60000,
            taxTreatment: "use_tax_model"
          },
          {
            id: "income-2",
            owner: "B",
            name: "Salary B",
            amountAnnualGross: 30000,
            taxTreatment: "use_tax_model"
          }
        ],
        expenses: [
          {
            id: "expense-1",
            owner: "shared",
            name: "Household Bills",
            amountAnnual: 5000,
            inflationLinked: true,
            category: "living"
          }
        ],
        config: {
          inflationRate: 0.02,
          projectionYears: 10,
          incomeMultiple: 4.5,
          defaultMortgageAPR: 0.05,
          defaultMortgageTermYears: 25,
          saleCostPctByAssetCategory: {
            primary_home: 0.02,
            other_property: 0.02,
            investments: 0.01
          }
        },
        scenarios: {
          S1_Sell_Split: { enabled: true, params: {} },
          S2_A_Keeps_Home: { enabled: false, params: {} },
          S3_B_Keeps_Home: { enabled: false, params: {} },
          S4_Joint_Then_Sell: { enabled: false, params: {} },
          S5_No_Property: { enabled: false, params: {} }
        }
      }
    });
    console.log("Seeded database with demo session");
  }
}
