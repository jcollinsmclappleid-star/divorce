/** Stripe Checkout product names, descriptions and branding — keep in sync with product-copy.ts positioning. */

export const STRIPE_CHECKOUT_LOGO_URL = "https://divorcecalculatoruk.co.uk/og-image.png";

export const STRIPE_MAIN_PRODUCT = {
  name: "Your Full Divorce Position",
  description:
    "Three reports + PDF from your figures: what each settlement path leaves you with (capital and monthly headroom), what stands out in your case, and what to check before you agree. 12 months access. Illustrative modelling only — not legal, tax or financial advice.",
  metadata: {
    type: "one_time_access",
    duration_months: "12",
  },
} as const;

export const STRIPE_SUPPORT_PRODUCT = {
  name: "Report Walkthrough Support",
  description:
    "Optional written email support after your full report — sense-check your inputs and help you read the modelling outputs. Modelling support only; not legal, financial, mortgage or tax advice. One-off £129.",
  metadata: {
    type: "report_support",
  },
} as const;
