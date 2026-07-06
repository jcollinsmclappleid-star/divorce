/**
 * Verify cookie consent banner: Decline blocks GA, Accept loads GA.
 * Usage: node script/cookie-consent-check.mjs [baseUrl]
 */
import { chromium } from "@playwright/test";

const baseUrl = process.argv[2] || "http://localhost:5000";
const CONSENT_KEY = "dfm-cookie-consent";
const GA_ID = "G-26BB9XFNH5";

async function gaScriptLoaded(page) {
  return page.evaluate((id) => {
    return Array.from(document.querySelectorAll("script")).some((s) =>
      (s.src || "").includes(`googletagmanager.com/gtag/js?id=${id}`),
    );
  }, GA_ID);
}

async function getConsent(page) {
  return page.evaluate((key) => localStorage.getItem(key), CONSENT_KEY);
}

const browser = await chromium.launch();
const page = await browser.newPage();

// ── Decline: no GA, consent stored ──
await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
await page.getByTestId("cookie-consent-banner").waitFor({ timeout: 15000 });
await page.getByTestId("button-cookie-decline").click();
await page.waitForTimeout(500);

const declineConsent = await getConsent(page);
const declineGa = await gaScriptLoaded(page);
const bannerHiddenAfterDecline = !(await page.getByTestId("cookie-consent-banner").isVisible().catch(() => false));

// ── Accept: GA loads, consent stored ──
await page.evaluate((key) => localStorage.removeItem(key), CONSENT_KEY);
await page.reload({ waitUntil: "networkidle" });
await page.getByTestId("cookie-consent-banner").waitFor({ timeout: 15000 });
await page.getByTestId("button-cookie-accept").click();
await page.waitForTimeout(800);

const acceptConsent = await getConsent(page);
const acceptGa = await gaScriptLoaded(page);
const bannerHiddenAfterAccept = !(await page.getByTestId("cookie-consent-banner").isVisible().catch(() => false));

// ── Persisted accept on reload ──
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(500);
const persistedGa = await gaScriptLoaded(page);
const bannerNotShownAgain = await page.getByTestId("cookie-consent-banner").isVisible().catch(() => false);

// ── Manage preferences resets banner ──
await page.goto(`${baseUrl}/privacy#cookies`, { waitUntil: "networkidle" });
await page.getByTestId("button-cookie-preferences").click();
await page.waitForTimeout(500);
const bannerAfterReset = await page.getByTestId("cookie-consent-banner").isVisible().catch(() => false);

await browser.close();

const results = {
  decline: {
    consent: declineConsent,
    gaLoaded: declineGa,
    bannerHidden: bannerHiddenAfterDecline,
    ok: declineConsent === "declined" && !declineGa && bannerHiddenAfterDecline,
  },
  accept: {
    consent: acceptConsent,
    gaLoaded: acceptGa,
    bannerHidden: bannerHiddenAfterAccept,
    ok: acceptConsent === "accepted" && acceptGa && bannerHiddenAfterAccept,
  },
  persistAccept: {
    gaLoaded: persistedGa,
    bannerHidden: !bannerNotShownAgain,
    ok: persistedGa && !bannerNotShownAgain,
  },
  resetPreferences: {
    bannerShown: bannerAfterReset,
    ok: bannerAfterReset,
  },
};

const passed = Object.values(results).every((r) => r.ok);
console.log(JSON.stringify({ passed, results }, null, 2));
process.exit(passed ? 0 : 1);
