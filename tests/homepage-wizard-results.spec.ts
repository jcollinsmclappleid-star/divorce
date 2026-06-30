import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const STORAGE_KEY = "divorce-model-storage";

const seededModelState = {
  assets: [
    {
      id: "asset-home",
      name: "Family Home",
      category: "primary_home",
      owner: "joint",
      currentValue: 500000,
      liquidity: "illiquid",
      saleCostPct: 0.03,
      taxCostPct: 0,
    },
    {
      id: "asset-cash",
      name: "Joint Savings",
      category: "cash",
      owner: "joint",
      currentValue: 40000,
      liquidity: "liquid",
      saleCostPct: 0,
      taxCostPct: 0,
    },
    {
      id: "asset-pension-a",
      name: "Party A Pension",
      category: "pension",
      owner: "A",
      currentValue: 220000,
      cetv: 220000,
      pensionType: "defined_contribution",
      liquidity: "locked",
      saleCostPct: 0,
      taxCostPct: 0,
    },
    {
      id: "asset-pension-b",
      name: "Party B Pension",
      category: "pension",
      owner: "B",
      currentValue: 90000,
      cetv: 90000,
      pensionType: "defined_contribution",
      liquidity: "locked",
      saleCostPct: 0,
      taxCostPct: 0,
    },
  ],
  liabilities: [
    {
      id: "liability-mortgage",
      name: "Mortgage",
      category: "mortgage",
      owner: "joint",
      balance: 210000,
    },
  ],
  incomes: [
    {
      id: "income-a",
      name: "Party A salary",
      owner: "A",
      amountAnnualGross: 65000,
      taxTreatment: "employment",
    },
    {
      id: "income-b",
      name: "Party B salary",
      owner: "B",
      amountAnnualGross: 42000,
      taxTreatment: "employment",
    },
  ],
  expenses: [
    {
      id: "expense-a",
      name: "Party A living costs",
      owner: "A",
      amountAnnual: 30000,
      category: "living",
      inflationLinked: true,
    },
    {
      id: "expense-b",
      name: "Party B living costs",
      owner: "B",
      amountAnnual: 28000,
      category: "living",
      inflationLinked: true,
    },
  ],
  config: { taxYear: "2026/27", currency: "GBP" },
  scenarios: {
    S1_Sell_Split: { enabled: true, params: {} },
    S2_A_Keeps_Home: { enabled: true, params: {} },
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
    includeCMSEstimate: false,
    mortgageAPR: 0.05,
    mortgageTermYears: 25,
    overrideNetIncomeA: null,
    overrideNetIncomeB: null,
    overrideCMSAnnual: null,
  },
  children: {
    numChildren: 0,
    childAges: [],
    nightsWithA: 182,
    nightsWithB: 183,
  },
  profile: {
    partyAName: "Alex",
    partyBName: "Taylor",
    processStage: "",
    mainPriority: "",
    capturedEmail: "",
    calculationIntent: "offer_check",
    offerStatus: "received",
  },
  maintenance: {
    included: false,
    monthlyAmount: 0,
    direction: "AtoB",
  },
  guidedSummary: null,
  guidedSummaryStatus: "idle",
};

async function installQaHarness(page: Page) {
  await page.addInitScript(() => {
    (window as any).dataLayer = [];
    (window as any).__gtagEvents = [];
    (window as any).gtag = (...args: unknown[]) => {
      (window as any).__gtagEvents.push(args);
    };
    document.addEventListener(
      "click",
      (event) => {
        const target = event.target as Element | null;
        const mailtoLink = target?.closest?.('a[href^="mailto:"]');
        if (mailtoLink) event.preventDefault();
      },
      true,
    );
  });

  await page.route("**/api/auth/me", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ authenticated: true, hasAccess: true }),
    });
  });

  await page.route("**/api/access/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ hasAccess: true }),
    });
  });
}

async function dataLayerEvents(page: Page) {
  return page.evaluate(() => (window as any).dataLayer ?? []);
}

async function gtagEvents(page: Page) {
  return page.evaluate(() => (window as any).__gtagEvents ?? []);
}

test.beforeEach(async ({ page }) => {
  await installQaHarness(page);
});

test("homepage loads with expected title and H1", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Divorce Settlement Calculator UK/);
  await expect(page.getByTestId("text-hero-headline")).toContainText(
    "Divorce Settlement Calculator UK",
  );
});

test("homepage intent card opens the wizard and persists the selected intent", async ({ page }) => {
  await page.goto("/");

  await page
    .getByTestId("card-intent-house-split")
    .getByRole("button", { name: /Calculate House Split/i })
    .click();

  await expect(page).toHaveURL(/\/wizard$/);
  const selectedIntent = page.getByTestId("button-intent-house_split");
  await expect(selectedIntent).toBeVisible();
  await expect(selectedIntent).toHaveClass(/bg-primary/);

  await expect
    .poll(async () => {
      const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
      return stored ? JSON.parse(stored).state.profile.calculationIntent : "";
    })
    .toBe("house_split");

  await expect.poll(() => dataLayerEvents(page)).toContainEqual(
    expect.objectContaining({
      event: "homepage_intent_card_click",
      intent: "house_split",
    }),
  );
});

test("wizard offer-check intent shows the assumptions offer-check panel", async ({ page }) => {
  await page.goto("/wizard");

  await page.getByTestId("button-intent-offer_check").click();
  await page.getByTestId("stepper-step-8").click();

  await expect(page.getByTestId("text-step-title")).toContainText("Your model is ready");
  await expect(page.getByTestId("card-offer-check-pathway")).toBeVisible();
  await expect(page.getByTestId("card-offer-check-pathway")).toContainText(
    "Settlement offer check",
  );
  await expect(page.getByTestId("button-offer-check-mode")).toHaveClass(/bg-primary/);
});

test("results page displays Settlement Reality Check Lenses and Position Check", async ({ page }) => {
  await page.addInitScript(
    ({ key, state }) => {
      localStorage.setItem(key, JSON.stringify({ state, version: 0 }));
    },
    { key: STORAGE_KEY, state: seededModelState },
  );

  await page.goto("/results");

  await expect(page.getByTestId("section-intent-reality-check")).toContainText(
    "Settlement Reality Check Lenses",
  );
  await expect(page.getByTestId("card-results-lens-offer_check")).toContainText(
    "Settlement Offer Check",
  );
  await expect(page.getByTestId("section-settlement-position-check")).toContainText(
    "Settlement Position Check",
  );
  await expect(page.getByTestId("section-settlement-position-check")).toContainText(
    "Offer Trade-Off Check",
  );
});

test("homepage conversion analytics events are emitted", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("button-hero-start").click();
  await expect.poll(() => dataLayerEvents(page)).toContainEqual(
    expect.objectContaining({ event: "homepage_calculator_start", intent: "start_free" }),
  );
  await expect.poll(() => gtagEvents(page)).toContainEqual(
    expect.arrayContaining(["event", "homepage_calculator_start", expect.any(Object)]),
  );

  await page.goto("/");
  await page.getByTestId("button-hero-offer-check").click();
  await expect.poll(() => dataLayerEvents(page)).toContainEqual(
    expect.objectContaining({ event: "homepage_offer_check_start", intent: "offer_check" }),
  );

  await page.goto("/");
  await page.getByTestId("button-hero-buy-now").click();
  await expect.poll(() => dataLayerEvents(page)).toContainEqual(
    expect.objectContaining({ event: "homepage_unlock_click", location: "hero" }),
  );

  await page.goto("/");
  await page
    .getByTestId("card-intent-pension")
    .getByRole("button", { name: /Check Pension Impact/i })
    .click();
  await expect.poll(() => dataLayerEvents(page)).toContainEqual(
    expect.objectContaining({
      event: "homepage_intent_card_click",
      intent: "pension_impact",
    }),
  );

});

test("user-facing source does not contain retired report labels", async () => {
  const forbiddenLabels = [
    "Guided " + "Intelligence Report",
    "Structured " + "Financial Brief",
  ];
  const roots = [path.join(process.cwd(), "client", "src"), path.join(process.cwd(), "client", "index.html")];
  const files: string[] = [];

  for (const root of roots) {
    if (fs.statSync(root).isDirectory()) {
      collectSourceFiles(root, files);
    } else {
      files.push(root);
    }
  }

  const matches = files.flatMap((file) => {
    const content = fs.readFileSync(file, "utf8");
    return forbiddenLabels
      .filter((label) => content.includes(label))
      .map((label) => `${path.relative(process.cwd(), file)} contains ${label}`);
  });

  expect(matches).toEqual([]);
});

function collectSourceFiles(dir: string, files: string[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectSourceFiles(fullPath, files);
      continue;
    }
    if (/\.(tsx?|html)$/.test(entry.name)) files.push(fullPath);
  }
}
