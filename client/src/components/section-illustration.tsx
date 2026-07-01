export type IllustrationVariant =
  | "house"
  | "ledger-reveal"
  | "balance-ledger";

type SectionIllustrationProps = {
  variant?: IllustrationVariant;
  /** subtle = small accent; feature = stronger; background = full-section watermark */
  tone?: "subtle" | "feature" | "background";
  /** When true, fills the parent section on all breakpoints */
  fill?: boolean;
  className?: string;
};

const SOURCES: Record<IllustrationVariant, string> = {
  house: "/illustrations/house-gold-etching.png",
  "ledger-reveal": "/illustrations/ledger-reveal-etching.png",
  "balance-ledger": "/illustrations/balance-ledger-etching.png",
};

const TONE_CLASSES = {
  subtle: "opacity-[0.38] saturate-[0.9] contrast-[1.05]",
  feature: "opacity-[0.92] drop-shadow-[0_24px_40px_rgba(201,168,76,0.14)]",
  background: "opacity-[0.26] sm:opacity-[0.28] md:opacity-[0.30] lg:opacity-[0.32] contrast-[1.08]",
} as const;

/** Fine-line gold etching — quiet psychological accent, not a focal point. */
export function SectionIllustration({
  variant = "house",
  tone = "subtle",
  fill = false,
  className = "",
}: SectionIllustrationProps) {
  if (fill) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <img
          src={SOURCES[variant]}
          alt=""
          role="presentation"
          decoding="async"
          loading="lazy"
          fetchPriority="low"
          className={`absolute left-1/2 top-1/2 h-[128%] w-[128%] max-w-none -translate-x-1/2 -translate-y-[48%] object-contain object-center sm:h-[122%] sm:w-[122%] md:h-[118%] md:w-[118%] ${TONE_CLASSES.background}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_85%_at_50%_42%,_transparent_0%,_hsl(var(--background)/0.08)_72%,_hsl(var(--background)/0.22)_100%)]" />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <img
        src={SOURCES[variant]}
        alt=""
        role="presentation"
        decoding="async"
        loading="lazy"
        fetchPriority="low"
        className={`h-full w-full object-contain object-bottom ${TONE_CLASSES[tone === "background" ? "subtle" : tone]}`}
      />
    </div>
  );
}

export type WizardStepConcept = {
  variant: IllustrationVariant;
  label: string;
  focus: string;
  reportHook: string;
  accent: string;
};

/** Compact focus card for wizard step headers — consistent top-right placement. */
export function WizardStepIllustration({
  concept,
  className = "w-[132px] sm:w-[156px]",
}: {
  concept: WizardStepConcept;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border bg-white shadow-sm ${concept.accent} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-white/70" />
      <img
        src={SOURCES[concept.variant]}
        alt=""
        role="presentation"
        decoding="async"
        loading="lazy"
        className="absolute -right-8 -bottom-7 h-24 w-24 object-contain opacity-[0.22] contrast-[1.08] sm:h-28 sm:w-28"
      />
      <div className="relative p-3 sm:p-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">{concept.label}</p>
        <p className="mt-1 text-[11px] sm:text-xs font-semibold leading-snug text-foreground">{concept.focus}</p>
        <div className="mt-2 rounded-lg border border-slate-200/80 bg-slate-50/80 px-2 py-1.5">
          <p className="text-[10px] leading-snug text-muted-foreground">{concept.reportHook}</p>
        </div>
      </div>
    </div>
  );
}

/** Wizard step → psychology-led visual concept. */
export const WIZARD_STEP_CONCEPTS: Record<number, WizardStepConcept> = {
  0: {
    variant: "ledger-reveal",
    label: "Private first view",
    focus: "What could this leave me with?",
    reportHook: "The report turns your figures into a plain-English position check.",
    accent: "border-cyan-200/80",
  },
  1: {
    variant: "balance-ledger",
    label: "Relevant factors",
    focus: "Your situation shapes the model.",
    reportHook: "We flag facts that may be relevant, without giving legal advice.",
    accent: "border-violet-200/80",
  },
  2: {
    variant: "house",
    label: "Home pressure",
    focus: "Keep, sell, buy out, or defer?",
    reportHook: "Housing pressure is checked against equity, costs and affordability.",
    accent: "border-rose-200/80",
  },
  3: {
    variant: "ledger-reveal",
    label: "Hidden value",
    focus: "Do not miss savings, debts or business value.",
    reportHook: "Missing values and debt pressure are surfaced before you agree.",
    accent: "border-amber-200/80",
  },
  4: {
    variant: "balance-ledger",
    label: "Pension gap",
    focus: "The overlooked asset behind many splits.",
    reportHook: "CETVs are shown separately so pension value is not buried.",
    accent: "border-emerald-200/80",
  },
  5: {
    variant: "ledger-reveal",
    label: "Earning capacity",
    focus: "Income gaps change what feels workable.",
    reportHook: "Career breaks and lower income are framed as questions to discuss.",
    accent: "border-cyan-200/80",
  },
  6: {
    variant: "balance-ledger",
    label: "Monthly reality",
    focus: "Will the split still work after bills?",
    reportHook: "Cashflow and left-short risk are checked scenario by scenario.",
    accent: "border-rose-200/80",
  },
  7: {
    variant: "house",
    label: "Children & support",
    focus: "Housing and maintenance affect the monthly picture.",
    reportHook: "Child costs are modelled for cashflow, not legal arrangements.",
    accent: "border-violet-200/80",
  },
  8: {
    variant: "ledger-reveal",
    label: "Unlock clarity",
    focus: "See the factors, gaps and questions.",
    reportHook: "The paid report shows what may matter before solicitor time.",
    accent: "border-emerald-200/80",
  },
};

export function getWizardConcept(step: number): WizardStepConcept {
  return WIZARD_STEP_CONCEPTS[step] ?? WIZARD_STEP_CONCEPTS[0];
}
