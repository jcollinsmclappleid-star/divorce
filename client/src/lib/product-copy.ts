/** Customer-facing product names and conversion copy — single source of truth. */

export const PRODUCT_PRICE = "£79";

export const PRODUCT_NAMES = {
  /** Master paid bundle */
  fullPosition: "Your Full Divorce Position",
  /** Free tier after wizard */
  snapshot: "Your Settlement Snapshot",
  /** PDF download */
  pdf: "Your Position Report (PDF)",
  /** Layer 1 — was Settlement Analyser */
  layerScenarios: "What Each Option Leaves You With",
  /** Layer 2 — was Settlement Reality Check narrative */
  layerStandsOut: "What Stands Out In Your Case",
  /** Layer 3 — was Position Check / preparation guide */
  layerBeforeAgree: "What To Check Before You Agree",
} as const;

export const PRODUCT_TAGLINE =
  "Three dedicated reports from your figures — before you agree or accept less than you should.";

export const ANSWER_READY_HEADLINE = "Your answer is ready — built from your figures";

export const DEFAULT_UNLOCK_CTA = `Reveal my full answer — ${PRODUCT_PRICE}`;

export type ConversionArchetype = "protector" | "optimiser" | "clarity";

const CTA_BY_ARCHETYPE: Record<ConversionArchetype, string> = {
  protector: `Reveal what my offer may be hiding — ${PRODUCT_PRICE}`,
  optimiser: `See my full share — ${PRODUCT_PRICE}`,
  clarity: `See what I could keep — ${PRODUCT_PRICE}`,
};

const CTA_BY_INTENT: Record<string, string> = {
  offer_check: CTA_BY_ARCHETYPE.protector,
  protect_position: CTA_BY_ARCHETYPE.protector,
  debt_pressure: CTA_BY_ARCHETYPE.protector,
  fair_split: CTA_BY_ARCHETYPE.optimiser,
  pension_impact: CTA_BY_ARCHETYPE.optimiser,
  house_split: CTA_BY_ARCHETYPE.optimiser,
  income_gap: CTA_BY_ARCHETYPE.clarity,
  children_housing: CTA_BY_ARCHETYPE.clarity,
  first_private_view: CTA_BY_ARCHETYPE.clarity,
};

/** Map wizard / homepage intent to unlock CTA label. */
export function getUnlockCta(intent?: string | null): string {
  if (!intent) return DEFAULT_UNLOCK_CTA;
  return CTA_BY_INTENT[intent] ?? DEFAULT_UNLOCK_CTA;
}

const INTENT_TO_ARCHETYPE: Record<string, ConversionArchetype> = {
  offer_check: "protector",
  protect_position: "protector",
  debt_pressure: "protector",
  fair_split: "optimiser",
  pension_impact: "optimiser",
  house_split: "optimiser",
  income_gap: "clarity",
  children_housing: "clarity",
  first_private_view: "clarity",
};

export function getArchetypeForIntent(intent?: string | null): ConversionArchetype | null {
  if (!intent) return null;
  return INTENT_TO_ARCHETYPE[intent] ?? null;
}

export function getPreviewArchetypeSecret(intent?: string | null): string | null {
  const archetype = getArchetypeForIntent(intent);
  if (!archetype) return null;
  return ARCHETYPE_PATHS.find((p) => p.id === archetype)?.secret ?? null;
}

export const PREVIEW_SNAPSHOT_GAP =
  "Your snapshot shows the pool. Unlock shows what each path actually leaves you with — monthly and long-term.";

export const PREVIEW_UNLOCK_PILLARS = [
  {
    id: "share",
    question: "How much is my share?",
    answer: "Capital and pension under each of the 4 settlement paths — not just the pool",
    color: "#0891b2",
  },
  {
    id: "lasts",
    question: "How long will it last?",
    answer: "Monthly headroom and reserve outlook — whether any path leaves you short",
    color: "#C9A84C",
  },
  {
    id: "questions",
    question: "What should I ask?",
    answer: "What stands out, what's missing, and questions to raise before you agree",
    color: "#7c3aed",
  },
] as const;

export type PreviewCheckItem = { label: string; included: boolean };

const DEFAULT_LOCKED_CHECKS: PreviewCheckItem[] = [
  { label: "Your share under each settlement path", included: false },
  { label: "Monthly headroom and whether money lasts", included: false },
  { label: "Questions to check before you agree", included: false },
];

const LOCKED_CHECKS_BY_INTENT: Record<string, PreviewCheckItem[]> = {
  offer_check: [
    { label: "What their split leaves each of you monthly", included: false },
    { label: "Whether anything looks short before you reply", included: false },
    { label: "Questions to raise with your solicitor", included: false },
  ],
  fair_split: [
    { label: "Your actual share once pensions and housing are applied", included: false },
    { label: "Whether 50/50 works in monthly reality", included: false },
    { label: "Trade-offs if the split isn't equal", included: false },
  ],
  house_split: [
    { label: "Whether keep-home works after the mortgage", included: false },
    { label: "Monthly headroom if you keep vs sell", included: false },
    { label: "Buyout and funding pressure to check", included: false },
  ],
  pension_impact: [
    { label: "Pension split vs offset trade-offs", included: false },
    { label: "Long-term effect on monthly position", included: false },
    { label: "Questions for a pension adviser", included: false },
  ],
  children_housing: [
    { label: "Monthly surplus under each housing scenario", included: false },
    { label: "Whether any path leaves you short for the kids", included: false },
    { label: "Housing and maintenance questions to raise", included: false },
  ],
  income_gap: [
    { label: "Where the income gap shows in the model", included: false },
    { label: "Whether career sacrifice is reflected fairly", included: false },
    { label: "Evidence to gather before agreeing", included: false },
  ],
  protect_position: [
    { label: "Whether your contributions are reflected", included: false },
    { label: "Missing values that could change the split", included: false },
    { label: "Questions if you feel you're being short-changed", included: false },
  ],
};

/** Free vs locked checklist for preview — mirrors the user's intent. */
export function getPreviewUnansweredChecks(intent?: string | null): PreviewCheckItem[] {
  return [
    { label: "Combined asset pool from your figures", included: true },
    ...(LOCKED_CHECKS_BY_INTENT[intent ?? ""] ?? DEFAULT_LOCKED_CHECKS),
  ];
}

/** Intent-aware bridge line after snapshot stats (include formatted pool). */
export function getPreviewIntentBridge(
  intent: string | null | undefined,
  stats: { combinedPool: number; halfPool: number; netHomeEquity: number },
  formatMoney: (n: number) => string,
): string {
  const pool = formatMoney(stats.combinedPool);
  const half = formatMoney(stats.halfPool);
  const equity = formatMoney(stats.netHomeEquity);
  const secret = getPreviewArchetypeSecret(intent);
  if (secret) return secret;

  switch (intent) {
    case "offer_check":
      return `Your pool is ${pool}. Unlock to see what their split leaves each of you monthly.`;
    case "house_split":
      return stats.netHomeEquity > 0
        ? `${equity} home equity modelled. Unlock to see if keep-home works after the mortgage.`
        : `Your pool is ${pool}. Unlock to see keep-home pressure across all four options.`;
    case "fair_split":
      return `50/50 starts at ~${half} each. Unlock to see if that holds once pensions and housing are applied.`;
    case "pension_impact":
      return `Your pool is ${pool}. Unlock to compare pension split vs offset trade-offs.`;
    case "children_housing":
      return `Your pool is ${pool}. Unlock to see monthly surplus under each housing scenario.`;
    case "income_gap":
      return `Your pool is ${pool}. Unlock to see where the income gap appears before you agree.`;
    case "protect_position":
      return `Your pool is ${pool}. Unlock to see evidence prompts mapped to your figures.`;
    default:
      return `Your pool is ${pool}. Unlock to see what each of the four settlement paths leaves you with.`;
  }
}

export const HERO_EYEBROW = "Model the split. Get the answers. Before you agree.";

export const HERO_CHIPS: { label: string; intent: string; icon: "coins" | "home" | "search" | "scale" | "pension" | "briefcase" }[] = [
  { label: "How much will I get?", intent: "fair_split", icon: "coins" },
  { label: "Can I keep the house?", intent: "house_split", icon: "home" },
  { label: "Is their offer fair?", intent: "offer_check", icon: "search" },
  { label: "Is 50/50 actually fair?", intent: "fair_split", icon: "scale" },
  { label: "What happens to my pension?", intent: "pension_impact", icon: "pension" },
  { label: "I gave up work — does that count?", intent: "income_gap", icon: "briefcase" },
];

export const ARCHETYPE_PATHS: {
  id: ConversionArchetype;
  label: string;
  secret: string;
  questions: { q: string; intent: string; link?: string }[];
  cta: string;
}[] = [
  {
    id: "protector",
    label: "Protector",
    secret: "The offer may look fine as a percentage. Your report shows what it leaves you with monthly — and what's missing.",
    questions: [
      { q: "Is their offer actually fair?", intent: "offer_check" },
      { q: "What am I missing before I agree?", intent: "protect_position" },
      { q: "Could this leave me short once bills hit?", intent: "debt_pressure" },
    ],
    cta: "Check the offer",
  },
  {
    id: "optimiser",
    label: "Optimiser",
    secret: "A 50/50 headline can hide a worse outcome. See your full share across house, pension, capital and monthly reality.",
    questions: [
      { q: "How much will I actually get?", intent: "fair_split", link: "/how-much-will-i-get-divorce-uk" },
      { q: "Is 50/50 fair once everything's included?", intent: "fair_split", link: "/divorce-50-50-split-calculator-uk" },
      { q: "Is pension value being ignored for the house?", intent: "pension_impact", link: "/divorce-pension-calculator" },
    ],
    cta: "See what I could get",
  },
  {
    id: "clarity",
    label: "Clarity-seeker",
    secret: "You don't need a solicitor to see the shape of your answer. Model your share privately first — then reveal the full picture for £79.",
    questions: [
      { q: "How much will I get without a solicitor first?", intent: "first_private_view", link: "/how-much-will-i-get-divorce-uk" },
      { q: "I gave up work — will that show?", intent: "income_gap", link: "/career-sacrifice-divorce-settlement-uk" },
      { q: "Will I have enough to live on?", intent: "children_housing" },
    ],
    cta: "See my share — free",
  },
];

export const PRODUCT_LAYERS: {
  key: keyof typeof PRODUCT_NAMES;
  title: string;
  subtitle: string;
  color: string;
}[] = [
  {
    key: "layerScenarios",
    title: PRODUCT_NAMES.layerScenarios,
    subtitle: "Four scenarios: capital, pension, monthly pressure, reserves",
    color: "#0891b2",
  },
  {
    key: "layerStandsOut",
    title: PRODUCT_NAMES.layerStandsOut,
    subtitle: "Pressure points, left-short risk, missing values, trade-offs",
    color: "#C9A84C",
  },
  {
    key: "layerBeforeAgree",
    title: PRODUCT_NAMES.layerBeforeAgree,
    subtitle: "Source-backed checks, evidence to gather, questions to ask",
    color: "#7c3aed",
  },
];

/** Three conversion layers shown on preview paywall — names visible, content locked. */
export const LOCKED_ANSWER_SECTIONS = [
  {
    title: PRODUCT_NAMES.layerScenarios,
    desc: "Capital, pension share, monthly surplus and reserve outlook for all four settlement options.",
    locked: true,
    color: "#0891b2",
  },
  {
    title: PRODUCT_NAMES.layerStandsOut,
    desc: "Plain-English overview of what stands out, where pressure appears, and what may leave either side short.",
    locked: true,
    color: "#C9A84C",
  },
  {
    title: PRODUCT_NAMES.layerBeforeAgree,
    desc: "Personalised checks on career, bills, home, pensions, children and debts — with questions to raise before agreeing.",
    locked: true,
    color: "#7c3aed",
  },
] as const;
