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

export const STRIPE_EXPERT_REVIEW_PRODUCT = {
  name: "Position Review",
  description:
    "Written briefing on your modelled divorce position — input checks, scenario commentary, pressure points, and focused questions before you agree or reply. Requires Your Full Divorce Position (£79). Modelling support only; not legal, financial, mortgage or tax advice. One-off £249.",
  metadata: {
    type: "expert_review",
  },
} as const;

/** @deprecated Use STRIPE_EXPERT_REVIEW_PRODUCT */
export const STRIPE_SUPPORT_PRODUCT = STRIPE_EXPERT_REVIEW_PRODUCT;
