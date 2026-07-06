/**
 * Verify preview page unlock CTAs fire checkout API correctly.
 * Usage: node script/preview-cta-check.mjs [baseUrl]
 */
import { chromium } from "@playwright/test";

const baseUrl = process.argv[2] || "http://localhost:5000";

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

const CTA_TEST_IDS = [
  "button-unlock-after-snapshot",
  "button-unlock-scenarios",
  "button-unlock-full-report",
  "button-preview-questions-unlock",
  "button-console-unlock",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

await page.route("**/api/auth/me", (route) =>
  route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ authenticated: false, hasAccess: false }) }),
);
await page.route("**/api/access/**", (route) =>
  route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ hasAccess: false, reason: "no_purchase" }) }),
);

const results = [];
for (const testId of CTA_TEST_IDS) {
  let checkoutCalls = 0;

  await page.addInitScript(
    ({ key, state }) => {
      localStorage.setItem(key, JSON.stringify({ state, version: 0 }));
    },
    { key: STORAGE_KEY, state: seededModelState },
  );

  await page.route("**/api/checkout/create", async (route) => {
    checkoutCalls += 1;
    const body = route.request().postDataJSON();
    if (!body?.sessionToken) {
      await route.fulfill({ status: 400, contentType: "application/json", body: JSON.stringify({ message: "Missing sessionToken" }) });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ url: "https://checkout.stripe.com/c/pay/test_session" }),
    });
  });

  await page.goto(`${baseUrl}/preview`, { waitUntil: "networkidle" });

  const btn = page.getByTestId(testId).first();
  const visible = await btn.isVisible().catch(() => false);
  if (!visible) {
    results.push({ testId, ok: false, reason: "not visible" });
    await page.unroute("**/api/checkout/create");
    continue;
  }

  await btn.scrollIntoViewIfNeeded();
  await btn.click({ force: true });
  await page.waitForTimeout(600);

  results.push({
    testId,
    ok: checkoutCalls === 1,
    checkoutCalls,
  });

  await page.unroute("**/api/checkout/create");
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(JSON.stringify({ passed: failed.length === 0, results }, null, 2));
process.exit(failed.length === 0 ? 0 : 1);
