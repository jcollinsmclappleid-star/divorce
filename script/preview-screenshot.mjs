/**
 * Capture mobile preview dashboard screenshot for QA.
 * Usage: node script/preview-screenshot.mjs [baseUrl]
 */
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const baseUrl = process.argv[2] || "http://localhost:5000";
const outDir = path.join(process.cwd(), "test-results");
const outFile = path.join(outDir, "preview-dashboard-mobile.png");

const STORAGE_KEY = "divorce-model-storage";
const seededModelState = {
  assets: [
    { id: "asset-home", name: "Family Home", category: "primary_home", owner: "joint", currentValue: 500000, liquidity: "illiquid", saleCostPct: 0.03, taxCostPct: 0 },
    { id: "asset-cash", name: "Joint Savings", category: "cash", owner: "joint", currentValue: 40000, liquidity: "liquid", saleCostPct: 0, taxCostPct: 0 },
    { id: "asset-pension-a", name: "Party A Pension", category: "pension", owner: "A", currentValue: 220000, cetv: 220000, pensionType: "defined_contribution", liquidity: "locked", saleCostPct: 0, taxCostPct: 0 },
    { id: "asset-pension-b", name: "Party B Pension", category: "pension", owner: "B", currentValue: 90000, cetv: 90000, pensionType: "defined_contribution", liquidity: "locked", saleCostPct: 0, taxCostPct: 0 },
  ],
  liabilities: [{ id: "liability-mortgage", name: "Mortgage", category: "mortgage", owner: "joint", balance: 210000 }],
  incomes: [
    { id: "income-a", name: "Party A salary", owner: "A", amountAnnualGross: 65000, taxTreatment: "employment" },
    { id: "income-b", name: "Party B salary", owner: "B", amountAnnualGross: 42000, taxTreatment: "employment" },
  ],
  expenses: [
    { id: "expense-a", name: "Party A living costs", owner: "A", amountAnnual: 30000, category: "living", inflationLinked: true },
    { id: "expense-b", name: "Party B living costs", owner: "B", amountAnnual: 28000, category: "living", inflationLinked: true },
  ],
  config: { taxYear: "2026/27", currency: "GBP" },
  scenarios: { S1_Sell_Split: { enabled: true, params: {} }, S2_A_Keeps_Home: { enabled: true, params: {} }, S3_B_Keeps_Home: { enabled: true, params: {} }, S4_Joint_Then_Sell: { enabled: false, params: {} } },
  assumptions: { splitRatio: 0.5, splitPropertyToA: 0.5, splitPensionToA: 0.5, projectionYears: 10, inflationRate: 0.02, includeTaxModel: true, includeCMSEstimate: false, mortgageAPR: 0.05, mortgageTermYears: 25, overrideNetIncomeA: null, overrideNetIncomeB: null, overrideCMSAnnual: null },
  children: { numChildren: 0, childAges: [], nightsWithA: 182, nightsWithB: 183 },
  profile: { partyAName: "Alex", partyBName: "Taylor", processStage: "", mainPriority: "", capturedEmail: "", calculationIntent: "offer_check", offerStatus: "received" },
  maintenance: { included: false, monthlyAmount: 0, direction: "AtoB" },
  guidedSummary: null,
  guidedSummaryStatus: "idle",
};

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

await page.addInitScript(
  ({ key, state }) => {
    localStorage.setItem(key, JSON.stringify({ state, version: 0 }));
  },
  { key: STORAGE_KEY, state: seededModelState },
);

await page.route("**/api/auth/me", (route) =>
  route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ authenticated: false, hasAccess: false }) }),
);
await page.route("**/api/access/**", (route) =>
  route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ hasAccess: false, reason: "no_purchase" }) }),
);

await page.goto(`${baseUrl}/preview`, { waitUntil: "networkidle" });
await page.getByTestId("preview-position-dashboard").waitFor({ timeout: 30000 });
await page.getByTestId("preview-what-unlock-reveals").scrollIntoViewIfNeeded();

await page.screenshot({ path: outFile, fullPage: true });
console.log(`Screenshot saved: ${outFile}`);

await browser.close();
