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

const EXPERT_REVIEW_PRODUCT = {
  name: "Expert Position Review",
  description:
    "Human-reviewed written briefing on your modelled divorce position — input checks, scenario commentary, pressure points, and focused questions before you agree or reply. Requires Your Full Divorce Position (£79). Modelling support only; not legal, financial, mortgage or tax advice. One-off £249.",
  metadata: { type: "expert_review" },
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
const expertId =
  process.env.STRIPE_EXPERT_REVIEW_PRODUCT_ID?.trim()
  || process.env.STRIPE_SUPPORT_PRODUCT_ID?.trim();

await syncProduct(mainId, MAIN_PRODUCT, "£79 main product");
await syncProduct(expertId, EXPERT_REVIEW_PRODUCT, "£249 expert review product");

console.log("\nDone. Checkout will show updated copy and logo on next session.");
