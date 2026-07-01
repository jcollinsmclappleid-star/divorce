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

export const HERO_EYEBROW = "The question in your head — answered from your figures";

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
