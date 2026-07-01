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

test("homepage house intent chip opens the wizard and persists the selected intent", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("hero-chip-house_split").click();

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
      event: "homepage_hero_chip_click",
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

test("wizard savings step supports owner tabs, inline chips and benchmark selection", async ({ page }) => {
  await page.goto("/wizard");
  await page.getByTestId("stepper-step-3").click();

  await expect(page.getByTestId("text-step-title")).toContainText("Savings");
  await expect(page.getByTestId("card-savings-benchmarks")).toBeVisible();

  await page.getByTestId("button-apply-savings-benchmark-a").click();
  await expect(page.getByTestId("button-apply-savings-benchmark-a")).toContainText("3 estimates");

  await page.getByTestId("chip-asset-isa-A").click();
  await page.getByTestId("input-chip-asset-isa-A").fill("12000");
  await page.getByTestId("button-chip-save-asset-isa-A").click();
  await expect(page.getByTestId("chip-asset-isa-A")).toContainText("£12,000");

  await page.getByTestId("assets-owner-tab-B").click();
  await page.getByTestId("chip-asset-isa-B").click();
  await page.getByTestId("input-chip-asset-isa-B").fill("8000");
  await page.getByTestId("button-chip-save-asset-isa-B").click();
  await expect(page.getByTestId("chip-asset-isa-B")).toContainText("£8,000");

  await page.getByTestId("assets-owner-tab-joint").click();
  await page.getByTestId("chip-asset-joint_savings-joint").click();
  await page.getByTestId("input-chip-asset-joint_savings-joint").fill("15000");
  await page.getByTestId("button-chip-save-asset-joint_savings-joint").click();
  await expect(page.getByTestId("chip-asset-joint_savings-joint")).toContainText("£15,000");
});

test("wizard income step supports owner tabs, inline chips and salary benchmarks", async ({ page }) => {
  await page.goto("/wizard");
  await page.getByTestId("stepper-step-5").click();

  await expect(page.getByTestId("text-step-title")).toContainText("Income");
  await expect(page.getByTestId("card-salary-benchmarks")).toBeVisible();

  await page.getByTestId("button-apply-salary-benchmark-median-a").click();
  await expect(page.getByTestId("chip-income-salary-A")).toContainText("£35k");

  await page.getByTestId("chip-income-self_employment-A").click();
  await page.getByTestId("input-chip-income-self_employment-A").fill("32000");
  await page.getByTestId("button-chip-save-income-self_employment-A").click();
  await expect(page.getByTestId("chip-income-self_employment-A")).toContainText("£32k");

  await page.getByTestId("income-owner-tab-B").click();
  await page.getByTestId("chip-income-salary-B").click();
  await page.getByTestId("input-chip-income-salary-B").fill("42000");
  await page.getByTestId("button-chip-save-income-salary-B").click();
  await expect(page.getByTestId("chip-income-salary-B")).toContainText("£42k");
});

test("results page displays intent lenses and position check when layer 3 is expanded", async ({ page }) => {
  await page.addInitScript(
    ({ key, state }) => {
      localStorage.setItem(key, JSON.stringify({ state, version: 0 }));
    },
    { key: STORAGE_KEY, state: seededModelState },
  );

  await page.goto("/results");

  await expect(page.getByTestId("text-results-title")).toContainText(
    "Your answer — built from your figures",
  );

  await page.getByTestId("button-toggle-layer-2").click();

  await expect(page.getByTestId("section-intent-reality-check")).toContainText(
    "Quick lenses",
  );
  await expect(page.getByTestId("card-results-lens-offer_check")).toContainText(
    "Offer Check",
  );
  await expect(page.getByTestId("section-settlement-position-check")).toContainText(
    "Offer Trade-Off Check",
  );
});

test("results page redirects to preview without paid access", async ({ page }) => {
  await page.addInitScript(
    ({ key, state }) => {
      localStorage.setItem(key, JSON.stringify({ state, version: 0 }));
    },
    { key: STORAGE_KEY, state: seededModelState },
  );

  await page.route("**/api/auth/me", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ authenticated: false, hasAccess: false }),
    });
  });

  await page.route("**/api/access/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ hasAccess: false, reason: "no_purchase" }),
    });
  });

  await page.goto("/results");
  await expect(page).toHaveURL(/\/preview$/);
});

test("payment success unlocks results after verify", async ({ page }) => {
  await page.addInitScript(
    ({ key, state }) => {
      localStorage.setItem(key, JSON.stringify({ state, version: 0 }));
    },
    { key: STORAGE_KEY, state: seededModelState },
  );

  const paidToken = "e2e-paid-session-token";
  const accessState = { unlocked: false };

  await page.unroute("**/api/auth/me");
  await page.unroute("**/api/access/**");

  await page.route("**/api/checkout/verify", async (route) => {
    accessState.unlocked = true;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ status: "paid", sessionToken: paidToken }),
    });
  });

  await page.route("**/api/auth/me", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        authenticated: accessState.unlocked,
        hasAccess: accessState.unlocked,
      }),
    });
  });

  await page.route("**/api/access/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(
        accessState.unlocked
          ? { hasAccess: true, purchasedAt: new Date().toISOString() }
          : { hasAccess: false, reason: "no_purchase" },
      ),
    });
  });

  await page.goto("/payment-success?session_id=cs_test_e2e");
  await expect(page.getByTestId("text-payment-confirmed")).toBeVisible();
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem("dfm-session-token")))
    .toBe(paidToken);

  await page.getByTestId("button-go-to-results").click();
  await expect(page.getByTestId("text-results-title")).toBeVisible();
  await expect(page).toHaveURL(/\/results$/);
});

test("preview page shows snapshot and unlock CTA from seeded wizard state", async ({ page }) => {
  await page.addInitScript(
    ({ key, state }) => {
      localStorage.setItem(key, JSON.stringify({ state, version: 0 }));
    },
    { key: STORAGE_KEY, state: seededModelState },
  );

  await page.route("**/api/auth/me", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ authenticated: false, hasAccess: false }),
    });
  });

  await page.route("**/api/access/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ hasAccess: false, reason: "no_purchase" }),
    });
  });

  await page.goto("/preview");

  await expect(page.getByTestId("text-preview-title")).toContainText(
    "Your answer is ready",
  );
  await expect(page.getByTestId("section-preview-snapshot")).toBeVisible();
  await expect(page.getByTestId("value-asset-pool")).toBeVisible();
  await expect(page.getByTestId("button-unlock-preview-primary").first()).toContainText("£79");
  await expect(page.getByTestId("text-intent-bridge")).toBeVisible();
});

test("unlock page shows pricing and checkout entry points", async ({ page }) => {
  await page.unroute("**/api/auth/me");
  await page.unroute("**/api/access/**");

  await page.route("**/api/auth/me", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ authenticated: false, hasAccess: false }),
    });
  });

  await page.route("**/api/access/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ hasAccess: false, reason: "no_purchase" }),
    });
  });

  await page.goto("/unlock");

  await expect(page).toHaveURL(/\/unlock$/);
  await expect(page.getByTestId("text-price")).toContainText("£79");
  await expect(page.getByTestId("button-checkout-hero")).toBeVisible();
  await expect(page.getByTestId("badge-access-duration")).toContainText("Twelve Months");
  await expect(page.getByTestId("link-recover")).toBeVisible();
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
    expect.objectContaining({ event: "homepage_hero_share_start", intent: "fair_split" }),
  );

  await page.goto("/");
  await page.getByTestId("button-hero-buy-now").click();
  await expect.poll(() => dataLayerEvents(page)).toContainEqual(
    expect.objectContaining({ event: "homepage_unlock_click", location: "hero" }),
  );

  await page.goto("/");
  await page.getByTestId("hero-chip-pension_impact").click();
  await expect.poll(() => dataLayerEvents(page)).toContainEqual(
    expect.objectContaining({
      event: "homepage_hero_chip_click",
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
