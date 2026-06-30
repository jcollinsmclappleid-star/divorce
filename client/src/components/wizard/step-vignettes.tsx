import type { ReactNode } from "react";

const GOLD = "#C9A84C";
const NAVY = "#1a3357";

const baseProps = {
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function VignetteFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      className="relative w-[120px] h-[80px] shrink-0 rounded-xl border border-gold/20 bg-gradient-to-br from-gold/[0.06] to-primary/[0.04] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 80" className="w-[104px] h-[68px]" role="img" aria-label={label}>
        {children}
      </svg>
    </div>
  );
}

function WelcomeVignette() {
  return (
    <VignetteFrame label="Private calculation">
      <rect x="28" y="22" width="64" height="44" rx="6" stroke={NAVY} strokeWidth="1.2" opacity={0.35} {...baseProps} />
      <path d="M38 36 H82 M38 46 H70 M38 56 H58" stroke={NAVY} strokeWidth="1" opacity={0.25} {...baseProps} />
      <path d="M78 18 L78 28 M73 23 H83" stroke={GOLD} strokeWidth="1.4" {...baseProps} />
      <circle cx="60" cy="12" r="4" stroke={GOLD} strokeWidth="1.2" {...baseProps} />
    </VignetteFrame>
  );
}

function ProfileVignette() {
  return (
    <VignetteFrame label="Your situation">
      <circle cx="42" cy="30" r="10" stroke={NAVY} strokeWidth="1.2" opacity={0.4} {...baseProps} />
      <circle cx="78" cy="30" r="10" stroke={NAVY} strokeWidth="1.2" opacity={0.4} {...baseProps} />
      <path d="M28 58 Q42 46 56 58 M64 58 Q78 46 92 58" stroke={GOLD} strokeWidth="1.2" {...baseProps} />
    </VignetteFrame>
  );
}

function PropertyVignette() {
  return (
    <VignetteFrame label="Property and mortgage">
      <path d="M60 14 L24 40 V66 H96 V40 Z" stroke={GOLD} strokeWidth="1.3" {...baseProps} />
      <path d="M44 66 V48 H76 V66" stroke={NAVY} strokeWidth="1.1" opacity={0.45} {...baseProps} />
      <path d="M24 58 H96" stroke={NAVY} strokeWidth="1" opacity={0.2} {...baseProps} />
    </VignetteFrame>
  );
}

function AssetsVignette() {
  return (
    <VignetteFrame label="Savings and debts">
      <rect x="26" y="24" width="68" height="40" rx="5" stroke={GOLD} strokeWidth="1.2" {...baseProps} />
      <path d="M36 36 H84 M36 46 H72 M36 56 H60" stroke={NAVY} strokeWidth="1" opacity={0.35} {...baseProps} />
      <path d="M88 18 L88 28" stroke={GOLD} strokeWidth="1.2" {...baseProps} />
    </VignetteFrame>
  );
}

function PensionVignette() {
  return (
    <VignetteFrame label="Pension provision">
      <path d="M36 58 V34 C36 24 48 18 60 18 C72 18 84 24 84 34 V58" stroke={GOLD} strokeWidth="1.3" {...baseProps} />
      <path d="M32 58 H88" stroke={NAVY} strokeWidth="1.1" opacity={0.4} {...baseProps} />
      <path d="M44 42 Q60 28 76 42" stroke={NAVY} strokeWidth="1" opacity={0.35} {...baseProps} />
    </VignetteFrame>
  );
}

function IncomeVignette() {
  return (
    <VignetteFrame label="Income and employment">
      <path d="M30 58 V38 M46 58 V28 M62 58 V44 M78 58 V22" stroke={GOLD} strokeWidth="1.3" {...baseProps} />
      <path d="M24 58 H96" stroke={NAVY} strokeWidth="1" opacity={0.3} {...baseProps} />
    </VignetteFrame>
  );
}

function ExpensesVignette() {
  return (
    <VignetteFrame label="Monthly expenses">
      <path d="M28 24 H92 M28 38 H80 M28 52 H68 M28 66 H56" stroke={NAVY} strokeWidth="1" opacity={0.35} {...baseProps} />
      <path d="M88 24 L88 66" stroke={GOLD} strokeWidth="1.2" {...baseProps} />
    </VignetteFrame>
  );
}

function ChildrenVignette() {
  return (
    <VignetteFrame label="Children and support">
      <path d="M48 20 L24 38 V62 H72 V38 Z" stroke={NAVY} strokeWidth="1.1" opacity={0.35} {...baseProps} />
      <circle cx="86" cy="52" r="8" stroke={GOLD} strokeWidth="1.2" {...baseProps} />
      <path d="M86 44 V48" stroke={GOLD} strokeWidth="1" {...baseProps} />
    </VignetteFrame>
  );
}

function SummaryVignette() {
  return (
    <VignetteFrame label="Model ready">
      <path d="M34 42 L44 52 L66 30" stroke={GOLD} strokeWidth="1.5" {...baseProps} />
      <circle cx="60" cy="40" r="22" stroke={NAVY} strokeWidth="1.1" opacity={0.35} {...baseProps} />
      <path d="M78 58 L92 44" stroke={GOLD} strokeWidth="1.2" {...baseProps} />
    </VignetteFrame>
  );
}

const VIGNETTES = [
  WelcomeVignette,
  ProfileVignette,
  PropertyVignette,
  AssetsVignette,
  PensionVignette,
  IncomeVignette,
  ExpensesVignette,
  ChildrenVignette,
  SummaryVignette,
];

export function StepVignette({ step }: { step: number }) {
  const Vignette = VIGNETTES[step] ?? WelcomeVignette;
  return <Vignette />;
}
