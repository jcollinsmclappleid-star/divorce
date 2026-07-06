import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useAccess, useSessionToken } from "@/hooks/use-access";
import { formatCurrency, scrollTop } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Lock, Check, Shield, ArrowRight, Loader2,
  Eye, FileText, MessageCircle, MousePointerClick,
} from "lucide-react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useCheckout } from "@/hooks/use-checkout";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";
import { SettlementConsole, buildConsoleScenarios } from "@/components/settlement-console";
import { ScenarioLeaderboard } from "@/components/scenario-leaderboard";
import { SectionIllustration } from "@/components/section-illustration";
import { ReportPortfolioBundle } from "@/components/homepage-report-portfolio";
import { PreviewSnapshotDashboard, PreviewUnlockRevealsDashboard } from "@/components/preview-position-dashboard";
import {
  ANSWER_READY_HEADLINE,
  PRODUCT_LAYERS,
  PRODUCT_NAMES,
  PRODUCT_PRICE,
  PREVIEW_UNLOCK_PILLARS,
  PREVIEW_PRIMARY_UNLOCK_CTA,
  PREVIEW_HEADER_UNLOCK_CTA_MOBILE,
  getPreviewIntentBridge,
  getPreviewQuestionTeasers,
  PREVIEW_CTA_REASSURANCE,
  PREVIEW_CTA_REASSURANCE_SHORT,
} from "@/lib/product-copy";

const ReportPreviewModal = lazy(() =>
  import("@/components/report-preview-modal").then((m) => ({ default: m.ReportPreviewModal })),
);

const PREVIEW_INTENT_HOOKS: Record<string, string> = {
  fair_split: "You wanted to know what your share could be.",
  house_split: "You wanted to know if you can keep the house.",
  offer_check: "You wanted to check their offer before you reply.",
  pension_impact: "You wanted to understand your pension position.",
  income_gap: "You gave up work or earned less — you need that reflected.",
  protect_position: "You wanted to know whether your contributions count.",
  children_housing: "You wanted to know if you can afford to live on with the kids.",
};

function PreviewUnlockPillars({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "space-y-2" : "space-y-2.5"} data-testid="preview-unlock-pillars">
      {PREVIEW_UNLOCK_PILLARS.map((pillar) => (
        <div key={pillar.id} className="flex gap-2.5 items-start">
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white mt-0.5"
            style={{ background: pillar.color }}
          >
            {pillar.id === "share" ? "1" : pillar.id === "lasts" ? "2" : "3"}
          </span>
          <div className="min-w-0">
            <p className={`font-semibold text-slate-900 leading-snug ${compact ? "text-xs" : "text-sm"}`}>
              {pillar.question}
            </p>
            <p className={`text-slate-500 leading-relaxed ${compact ? "text-[10px]" : "text-xs"}`}>
              {pillar.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportChapterHeader({
  number,
  title,
  subtitle,
  locked = false,
}: {
  number: string;
  title: string;
  subtitle?: string;
  locked?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
      <div className="space-y-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{number}</p>
        <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 leading-snug">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{subtitle}</p> : null}
      </div>
      {locked ? (
        <Badge variant="outline" className="shrink-0 text-[10px] font-semibold uppercase tracking-wide border-slate-200 text-slate-500 bg-slate-50">
          <Lock className="w-3 h-3 mr-1" /> Unlock for exact figures
        </Badge>
      ) : (
        <Badge variant="outline" className="shrink-0 text-[10px] font-semibold uppercase tracking-wide border-emerald-200 text-emerald-700 bg-emerald-50">
          <Eye className="w-3 h-3 mr-1" /> Included in snapshot
        </Badge>
      )}
    </div>
  );
}

function ReportPage({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"section">) {
  return (
    <section
      {...props}
      className={`rounded-sm border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.04)] ${className}`}
    >
      {children}
    </section>
  );
}

function CtaReassurance({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <p
      className={`text-[10px] md:text-xs text-center leading-relaxed ${
        inverted ? "text-white/55" : "text-slate-500"
      } ${className}`}
      data-testid="text-preview-cta-reassurance"
    >
      {PREVIEW_CTA_REASSURANCE}
    </p>
  );
}

function SectionCtaBlock({
  children,
  reassurance = false,
  className = "",
}: {
  children: React.ReactNode;
  reassurance?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
      {reassurance ? <CtaReassurance /> : null}
    </div>
  );
}

function PreviewQuestionsCard({
  intent,
  onUnlock,
  checkoutLoading,
}: {
  intent: string | null | undefined;
  onUnlock: () => void;
  checkoutLoading: boolean;
}) {
  const questions = getPreviewQuestionTeasers(intent);
  return (
    <div
      className="overflow-hidden rounded-xl border border-slate-800/10 shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
      data-testid="card-preview-questions"
    >
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-3.5 py-3">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet-500/90 to-purple-400/80" />
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-violet-300 shrink-0" />
          <p className="text-sm font-semibold text-white">Personalised checks for your situation</p>
        </div>
        <p className="mt-1 text-[10px] text-white/55 leading-relaxed pl-6">
          Mapped to your figures — evidence prompts and questions before you agree.
        </p>
      </div>
      <div className="bg-gradient-to-b from-violet-50/40 to-white p-3 space-y-2">
      <ul className="space-y-1.5">
        {questions.map((question) => (
          <li
            key={question}
            className="flex items-start gap-2 rounded-lg border border-violet-100/80 bg-white/90 px-2.5 py-2"
          >
            <Lock className="w-3 h-3 text-violet-400 shrink-0 mt-0.5" />
            <p className="text-[11px] font-medium text-slate-800 leading-snug">{question}</p>
          </li>
        ))}
      </ul>
      <p className="text-[10px] text-muted-foreground text-center">+ 29 more checks in your full report</p>
      <Button
        type="button"
        onClick={onUnlock}
        disabled={checkoutLoading}
        className="w-full bg-gold hover:bg-gold/90 text-white border-0 font-semibold text-sm h-10"
        data-testid="button-preview-questions-unlock"
      >
        {checkoutLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Redirecting…
          </>
        ) : (
          <>
            {PREVIEW_PRIMARY_UNLOCK_CTA} <ArrowRight className="w-4 h-4 ml-1.5" />
          </>
        )}
      </Button>
      </div>
    </div>
  );
}

function CompactReportList() {
  return (
    <div className="rounded-sm border border-gold/25 bg-gold/[0.06] p-4 space-y-3" data-testid="preview-report-list-compact">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        What unlock reveals
      </p>
      <PreviewUnlockPillars compact />
      <div className="flex gap-2.5 items-start pt-1 border-t border-gold/20">
        <FileText className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-slate-800">{PRODUCT_NAMES.pdf}</p>
          <p className="text-[10px] text-slate-500">Download and share with your solicitor · 12 months access</p>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  useDocumentTitle("Your Settlement Snapshot | DivorceCalculatorUK");
  useNoIndex();
  const [, navigate] = useLocation();
  const store = useAppStore();
  const engine = useEngine();
  const { hasAccess, isLoading } = useAccess();
  const sessionToken = useSessionToken();
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(() => !!store.profile?.capturedEmail);
  const [emailLoading, setEmailLoading] = useState(false);
  const { checkoutLoading, handleCheckout } = useCheckout(sessionToken);
  const [sampleReportOpen, setSampleReportOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const snapshotAnchorRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  const unlockIntent =
    store.profile?.calculationIntent ||
    (typeof sessionStorage !== "undefined" ? sessionStorage.getItem("dfm-homepage-intent") : null);
  const unlockCta = PREVIEW_PRIMARY_UNLOCK_CTA;
  const intentHook =
    (unlockIntent && PREVIEW_INTENT_HOOKS[unlockIntent]) ||
    "Your figures are loaded — your snapshot is below.";

  useEffect(() => {
    if (!isLoading && hasAccess) navigate("/results");
  }, [hasAccess, isLoading, navigate]);

  const hasData = store.assets.length > 0 || store.incomes.length > 0;
  useEffect(() => {
    if (!hasData) navigate("/");
  }, [hasData, navigate]);

  useEffect(() => {
    const snapshotEl = snapshotAnchorRef.current;
    const pricingEl = pricingRef.current;
    if (!snapshotEl || !pricingEl) return;

    let pastSnapshot = false;
    let pricingVisible = false;

    const updateSticky = () => {
      setShowStickyCta(pastSnapshot && !pricingVisible);
    };

    const snapshotObserver = new IntersectionObserver(
      ([entry]) => {
        pastSnapshot = !entry.isIntersecting;
        updateSticky();
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );

    const pricingObserver = new IntersectionObserver(
      ([entry]) => {
        pricingVisible = entry.isIntersecting;
        updateSticky();
      },
      { threshold: 0.15 },
    );

    snapshotObserver.observe(snapshotEl);
    pricingObserver.observe(pricingEl);

    return () => {
      snapshotObserver.disconnect();
      pricingObserver.disconnect();
    };
  }, [hasData]);

  if (!hasData) return null;

  const { intermediate } = engine;
  const combinedPool = intermediate.totalLiquid + intermediate.netHomeEquity;
  const pensionTotal = store.assets
    .filter((a) => a.category === "pension")
    .reduce((s, p) => s + (p.cetv ?? p.currentValue ?? 0), 0);

  const chartTotal = intermediate.netHomeEquity + intermediate.totalLiquid + pensionTotal;
  const chartData = [
    { name: "Property Equity", value: intermediate.netHomeEquity },
    { name: "Pensions", value: pensionTotal },
    { name: "Savings & Investments", value: intermediate.totalLiquid },
  ].filter((d) => d.value > 0);

  const halfPool = Math.round(combinedPool / 2);
  const nameA = store.profile?.partyAName || "Party A";
  const nameB = store.profile?.partyBName || "Party B";
  const intentBridge = getPreviewIntentBridge(
    unlockIntent,
    { combinedPool, halfPool, netHomeEquity: intermediate.netHomeEquity },
    formatCurrency,
  );

  const previewConsoleScenarios = buildConsoleScenarios([
    {
      id: "S1", name: "Sell & Split", shortName: "Sell & Split",
      totalA: Math.round(combinedPool * 0.50), totalB: Math.round(combinedPool * 0.50),
      surplusA: 680, surplusB: 420, resilienceA: 74, resilienceB: 62,
      projection: Array.from({ length: 6 }, (_, y) => ({
        capitalA: Math.round(combinedPool * (0.50 + y * 0.022)),
        capitalB: Math.round(combinedPool * (0.50 + y * 0.018)),
      })),
    },
    {
      id: "S2", name: `${nameA} Keeps Home`, shortName: `${nameA} Keeps`,
      totalA: Math.round(combinedPool * 0.58), totalB: Math.round(combinedPool * 0.42),
      surplusA: 340, surplusB: 610, resilienceA: 64, resilienceB: 71,
      projection: Array.from({ length: 6 }, (_, y) => ({
        capitalA: Math.round(combinedPool * (0.58 + y * 0.018)),
        capitalB: Math.round(combinedPool * (0.42 + y * 0.020)),
      })),
    },
    {
      id: "S3", name: `${nameB} Keeps Home`, shortName: `${nameB} Keeps`,
      totalA: Math.round(combinedPool * 0.46), totalB: Math.round(combinedPool * 0.54),
      surplusA: 520, surplusB: -120, resilienceA: 68, resilienceB: 39,
      projection: Array.from({ length: 6 }, (_, y) => ({
        capitalA: Math.round(combinedPool * (0.46 + y * 0.022)),
        capitalB: Math.round(combinedPool * (0.54 - y * 0.012)),
      })),
    },
    {
      id: "S4", name: "Deferred Sale", shortName: "Deferred",
      totalA: Math.round(combinedPool * 0.49), totalB: Math.round(combinedPool * 0.49),
      surplusA: 410, surplusB: 380, resilienceA: 70, resilienceB: 66,
      projection: Array.from({ length: 6 }, (_, y) => ({
        capitalA: Math.round(combinedPool * (0.49 + y * 0.024)),
        capitalB: Math.round(combinedPool * (0.49 + y * 0.022)),
      })),
    },
  ]);

  const previewComposition = [
    { label: "Property equity", value: Math.max(0, intermediate.netHomeEquity), color: "#A78BFA" },
    { label: "Pension (CETV)", value: Math.max(0, pensionTotal), color: "#22D3EE" },
    { label: "Cash & savings", value: Math.max(0, intermediate.totalLiquid - pensionTotal), color: "#C9A84C" },
  ].filter((c) => c.value > 0);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEmailLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "preview_page", assetPoolSnapshot: String(combinedPool) }),
      });
    } catch {}
    setEmailLoading(false);
    setEmailSubmitted(true);
  }

  const scrollToPricing = () => {
    document.getElementById("preview-pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const UnlockButton = ({
    size = "lg",
    className = "",
    label = unlockCta,
    variant = "gold",
    testId = "button-unlock-pricing",
    showArrow = true,
  }: {
    size?: "lg" | "sm";
    className?: string;
    label?: string;
    variant?: "gold" | "primary" | "outline";
    testId?: string;
    showArrow?: boolean;
  }) => (
    <Button
      size={size}
      onClick={() => handleCheckout()}
      disabled={checkoutLoading}
      className={
        variant === "primary"
          ? `bg-primary hover:bg-primary/90 text-white font-semibold ${className}`
          : variant === "outline"
            ? `bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-semibold shadow-sm ${className}`
            : `bg-gold hover:bg-gold/90 text-white border-0 shadow-md font-semibold ${className}`
      }
      data-testid={testId}
    >
      {checkoutLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Redirecting…
        </>
      ) : (
        <>
          {label}
          {showArrow ? <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" /> : null}
        </>
      )}
    </Button>
  );

  return (
    <div className="min-h-screen bg-[#e8ebf0] overflow-x-hidden pb-20 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 safe-area-inset-top">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 min-w-0">
          <Logo size="sm" />
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
            <Button variant="ghost" size="sm" asChild className="text-slate-600 px-2 h-8 text-xs sm:text-sm shrink-0">
              <Link href="/wizard" data-testid="button-edit-inputs-preview" onClick={scrollTop}>
                Edit
              </Link>
            </Button>
            <UnlockButton
              size="sm"
              className="inline-flex sm:hidden shrink-0 text-xs px-2.5 h-8 font-semibold whitespace-nowrap"
              variant="primary"
              label={PREVIEW_HEADER_UNLOCK_CTA_MOBILE}
              showArrow={false}
              testId="button-unlock-header-mobile"
            />
            <UnlockButton
              size="sm"
              className="hidden sm:inline-flex text-xs md:text-sm px-2.5 md:px-3 h-8 max-w-[10.5rem] sm:max-w-none whitespace-normal leading-tight py-1"
              variant="primary"
              label={PREVIEW_PRIMARY_UNLOCK_CTA}
              testId="button-unlock-header"
            />
          </div>
        </div>
      </header>

      <main className="px-4 py-5 md:py-10 space-y-6 md:space-y-8">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {/* ── Cover: validation only ── */}
          <ReportPage data-testid="preview-report-cover">
            <div className="border-b border-slate-100 px-4 md:px-6 py-3 md:py-4 bg-slate-50/90 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-sm">
                  <Check className="w-3 h-3" /> Model complete
                </span>
                {combinedPool > 0 && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-sm tabular-nums">
                    Pool {formatCurrency(combinedPool)}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block">England &amp; Wales · Illustrative modelling</p>
            </div>
            <div className="px-4 md:px-6 py-5 md:py-8 space-y-2 md:space-y-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 font-semibold">
                {PRODUCT_NAMES.snapshot}
              </p>
              <h1 className="text-xl md:text-[1.75rem] font-display font-bold text-slate-900 leading-tight" data-testid="text-preview-title">
                {ANSWER_READY_HEADLINE}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">{intentHook}</p>
              <p className="text-[11px] text-slate-400 italic hidden md:block">
                Illustrative modelling only — not legal, tax or financial advice.
              </p>
            </div>
          </ReportPage>

          {/* ── Snapshot: reward first ── */}
          <ReportPage data-testid="section-preview-snapshot">
            <div className="px-3 md:px-6 py-4 md:py-7 space-y-4 md:space-y-5">
              <div className="space-y-3" data-testid="preview-position-dashboard">
                <PreviewSnapshotDashboard
                  combinedPool={combinedPool}
                  halfPool={halfPool}
                  netHomeEquity={intermediate.netHomeEquity}
                  chartData={chartData}
                  chartTotal={chartTotal}
                  intentBridge={intentBridge}
                />

                <SectionCtaBlock>
                  <UnlockButton
                    variant="outline"
                    className="w-full text-sm whitespace-normal h-auto min-h-10 py-2.5 leading-snug"
                    label="See my share across all paths — £79"
                    testId="button-unlock-after-snapshot"
                  />
                </SectionCtaBlock>

                {previewComposition.length > 0 && previewConsoleScenarios.length > 0 && (
                  <div className="space-y-4" data-testid="section-locked-console">
                    <ReportChapterHeader
                      number="Scenario comparison"
                      title="Which option leaves you strongest — and for how long?"
                      subtitle="Capital, monthly surplus and reserve outlook across all four paths — from your figures."
                      locked
                    />

                    <div className="space-y-5" data-testid="preview-settlement-comparison">
                      <div
                        className="flex gap-2.5 rounded-lg border border-amber-200/70 bg-amber-50/60 px-3 py-2.5 sm:px-3.5"
                        data-testid="preview-scenario-interaction-hint"
                      >
                        <MousePointerClick className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                        <p className="text-xs leading-relaxed text-slate-700">
                          <span className="font-semibold text-slate-900">Tap each scenario button below</span>{" "}
                          to compare all four settlement paths — the dashboard updates as you switch.
                        </p>
                      </div>
                      <SettlementConsole
                        scenarios={previewConsoleScenarios}
                        composition={previewComposition}
                        partyAName={nameA}
                        partyBName={nameB}
                        defaultScenarioId="S3"
                        chipPrompt="Tap a button to compare — figures update below"
                        locked
                        onUnlock={handleCheckout}
                        chromeCaption="Settlement comparison"
                        footerText="Unlock to reveal exact figures, surplus and resilience scoring"
                        hideStress
                        testId="preview-settlement-console"
                      />
                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          All four options side by side — scroll to compare capital, surplus and resilience bands.
                        </p>
                        <ScenarioLeaderboard
                          scenarios={previewConsoleScenarios}
                          partyAName={nameA}
                          partyBName={nameB}
                          locked
                          onUnlock={handleCheckout}
                          caption="locked preview · all 4 side-by-side"
                          footerText="Unlock to reveal exact capital, surplus, and resilience figures"
                          testId="preview-comparison"
                        />
                      </div>
                    </div>

                    <SectionCtaBlock reassurance>
                      <UnlockButton
                        className="w-full text-sm whitespace-normal h-auto min-h-10 py-2.5 leading-snug"
                        testId="button-unlock-scenarios"
                      />
                    </SectionCtaBlock>
                  </div>
                )}

                <PreviewUnlockRevealsDashboard />

                <div ref={snapshotAnchorRef}>
                  <SectionCtaBlock reassurance>
                    <UnlockButton
                      className="w-full text-sm whitespace-normal h-auto min-h-10 py-2.5 leading-snug"
                      testId="button-unlock-full-report"
                    />
                  </SectionCtaBlock>
                </div>
              </div>

              <PreviewQuestionsCard intent={unlockIntent} onUnlock={handleCheckout} checkoutLoading={checkoutLoading} />
            </div>
          </ReportPage>

          <div className="hidden md:flex items-start gap-3 p-4 bg-white rounded-sm border border-emerald-200/70" data-testid="card-privacy-preview">
            <Shield className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Your privacy is protected.</span> Core calculations run privately in
              your browser. No names, addresses or contact details are included in any processing.
            </p>
          </div>
        </div>

        {/* ── Upsell: three reports (after locked tease) ── */}
        <div className="max-w-6xl mx-auto space-y-4" id="preview-report-portfolio" data-testid="section-preview-three-reports">
          <div className="max-w-2xl space-y-1 px-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Go deeper before you agree</p>
            <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 leading-snug">
              You&apos;ve seen the pool — unlock shows your share, whether the money lasts, and what to ask
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed hidden md:block">
              Three dedicated reports plus PDF export, built from your figures.
            </p>
          </div>

          <div className="md:hidden px-0.5">
            <CompactReportList />
            <Button
              className="w-full mt-3 bg-gold hover:bg-gold/90 text-white border-0 font-semibold"
              onClick={() => handleCheckout()}
              disabled={checkoutLoading}
              data-testid="button-unlock-portfolio-mobile"
            >
              {checkoutLoading ? "Redirecting…" : `${unlockCta}`}
            </Button>
          </div>

          <div className="hidden md:block">
            <ReportPortfolioBundle
              mode="preview"
              onOpenFullSample={() => setSampleReportOpen(true)}
              onScrollToPricing={scrollToPricing}
              onUnlock={handleCheckout}
              unlockLabel={unlockCta}
              unlockLoading={checkoutLoading}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* ── Pricing ── */}
          <section id="preview-pricing" ref={pricingRef} className="relative overflow-hidden rounded-sm scroll-mt-20">
            <SectionIllustration variant="balance-ledger" fill tone="background" />
            <div className="relative z-10 rounded-sm bg-primary border border-white/10 shadow-xl overflow-hidden" data-testid="card-pricing-cta">
              <div className="px-5 md:px-6 pt-6 md:pt-7 pb-4 md:pb-5 text-center border-b border-white/10 space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Full report access</p>
                <div className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white pt-1" data-testid="text-price">
                  {PRODUCT_PRICE}
                </div>
                <p className="text-sm text-white/55">One-time · 12 months · Instant access</p>
                <ul className="text-left space-y-2 pt-1 max-w-sm mx-auto">
                  {PREVIEW_UNLOCK_PILLARS.map((pillar) => (
                    <li key={pillar.id} className="flex gap-2 text-[11px] text-white/75 leading-snug">
                      <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span><strong className="text-white/90">{pillar.question}</strong> — {pillar.answer}</span>
                    </li>
                  ))}
                  <li className="flex gap-2 text-[11px] text-white/75 leading-snug">
                    <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span><strong className="text-white/90">PDF export</strong> — share with your solicitor</span>
                  </li>
                </ul>
                <p className="text-[10px] text-white/40 italic">
                  A single solicitor hour often costs £250–£400. This covers your full financial picture.
                </p>
              </div>

              <div className="hidden md:block px-5 pt-4 pb-3 space-y-2 border-b border-white/10">
                {PRODUCT_LAYERS.map((layer, i) => (
                  <div key={layer.key} className="flex gap-3 p-3 rounded-sm bg-white/5 border border-white/10">
                    <div
                      className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0 text-xs font-bold text-white"
                      style={{ background: `${layer.color}44` }}
                    >
                      {i + 1}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white">{layer.title}</p>
                      <p className="text-[10px] text-white/45 mt-0.5 leading-relaxed">{layer.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 md:px-6 py-4 md:py-5 space-y-3 md:space-y-4">
                <UnlockButton className="w-full text-base" variant="gold" />
                <CtaReassurance inverted className="!text-[11px]" />
                <p className="text-xs text-white/40 text-center">Secured by Stripe · Instant access</p>
                <p className="text-xs text-white/35 text-center">
                  Already purchased?{" "}
                  <Link href="/recover" className="underline underline-offset-2 hover:text-white transition-colors" data-testid="link-recover-access-preview">
                    Recover access →
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* ── Email capture (bottom) ── */}
          <ReportPage className="hidden md:block">
            <CardContent className="py-6 px-6" data-testid="card-email-capture">
              {emailSubmitted ? (
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <p className="font-medium text-slate-800">Got it — check your inbox.</p>
                  <p className="text-sm text-slate-500">Your full report is ready whenever you are.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-sm text-slate-800">Email me my snapshot summary</p>
                    <p className="text-xs text-slate-500 mt-0.5">We&apos;ll send your combined pool total — no spam.</p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="flex gap-2 flex-col sm:flex-row">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      data-testid="input-preview-email"
                    />
                    <Button type="submit" variant="outline" disabled={emailLoading} data-testid="button-save-progress">
                      {emailLoading ? "Sending..." : "Send summary"}
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </ReportPage>

          <p className="text-xs text-slate-500 text-center max-w-lg mx-auto leading-relaxed pb-4" data-testid="text-disclaimer-preview">
            Illustrative modelling only — not legal, tax or financial advice. Based on your inputs and standard assumptions.
          </p>
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur px-4 py-3 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] transition-transform duration-200 ${
          showStickyCta ? "translate-y-0" : "translate-y-full"
        }`}
        data-testid="preview-sticky-cta"
      >
        <UnlockButton className="w-full text-sm whitespace-normal h-auto min-h-10 py-2.5 leading-snug" variant="gold" testId="button-unlock-preview-sticky" />
        <p className="text-[9px] text-slate-400 text-center mt-1.5 leading-relaxed">{PREVIEW_CTA_REASSURANCE_SHORT}</p>
      </div>

      {sampleReportOpen && (
        <Suspense fallback={null}>
          <ReportPreviewModal open={sampleReportOpen} onClose={() => setSampleReportOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
