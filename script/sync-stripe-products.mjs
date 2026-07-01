#!/usr/bin/env node
/**
 * Update live/test Stripe product names, descriptions and checkout logo.
 *
 * Usage:
 *   node --env-file=.env.cutover script/sync-stripe-products.mjs
 *   node --env-file=.env.test script/sync-stripe-products.mjs
 */

import Stripe from "stripe";
import fs from "fs";
import path from "path";

const LOGO_URL = "https://divorcecalculatoruk.co.uk/og-image.png";

const MAIN_PRODUCT = {
  name: "Your Full Divorce Position",
  description:
    "Three reports + PDF from your figures: what each settlement path leaves you with (capital and monthly headroom), what stands out in your case, and what to check before you agree. 12 months access. Illustrative modelling only — not legal, tax or financial advice.",
  metadata: { type: "one_time_access", duration_months: "12" },
};

const SUPPORT_PRODUCT = {
  name: "Report Walkthrough Support",
  description:
    "Optional written email support after your full report — sense-check your inputs and help you read the modelling outputs. Modelling support only; not legal, financial, mortgage or tax advice. One-off £129.",
  metadata: { type: "report_support" },
};

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile(path.resolve(process.cwd(), ".env.cutover"));

const key = process.env.STRIPE_SECRET_KEY?.trim();
if (!key) {
  console.error("Set STRIPE_SECRET_KEY (e.g. node --env-file=.env.cutover ...)");
  process.exit(1);
}

const stripe = new Stripe(key, { apiVersion: "2025-11-17.clover" });

async function syncProduct(productId, copy, label) {
  if (!productId) {
    console.warn(`Skip ${label}: product ID not set`);
    return;
  }

  const existing = await stripe.products.retrieve(productId);
  const updated = await stripe.products.update(productId, {
    name: copy.name,
    description: copy.description,
    images: [LOGO_URL],
    metadata: { ...existing.metadata, ...copy.metadata },
  });

  console.log(`OK ${label}: ${updated.id}`);
  console.log(`   name: ${updated.name}`);
  console.log(`   images: ${updated.images?.join(", ") || "(none)"}`);
}

const mainId = process.env.STRIPE_PRODUCT_ID;
const supportId = process.env.STRIPE_SUPPORT_PRODUCT_ID;

await syncProduct(mainId, MAIN_PRODUCT, "£79 main product");
await syncProduct(supportId, SUPPORT_PRODUCT, "£129 support product");

console.log("\nDone. Checkout will show updated copy and logo on next session.");
