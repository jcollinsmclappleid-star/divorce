import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useAccess, useSessionToken } from "@/hooks/use-access";
import { formatCurrency, scrollTop } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Lock, Check, Shield, ArrowRight, Loader2,
  Eye, FileText, ChevronDown, BarChart3,
} from "lucide-react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useCheckout } from "@/hooks/use-checkout";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { SettlementConsole, buildConsoleScenarios } from "@/components/settlement-console";
import { ScenarioLeaderboard } from "@/components/scenario-leaderboard";
import { SectionIllustration } from "@/components/section-illustration";
import { ReportPortfolioBundle } from "@/components/homepage-report-portfolio";
import { buildMonthlySnapshot } from "@/lib/insights/monthlySnapshot";
import {
  ANSWER_READY_HEADLINE,
  PRODUCT_LAYERS,
  PRODUCT_NAMES,
  PRODUCT_PRICE,
  PREVIEW_SNAPSHOT_GAP,
  PREVIEW_UNLOCK_PILLARS,
  getPreviewIntentBridge,
  getPreviewUnansweredChecks,
  getUnlockCta,
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

function PreviewUnansweredChecklist({ intent }: { intent: string | null | undefined }) {
  const items = getPreviewUnansweredChecks(intent);
  return (
    <ul className="space-y-2" data-testid="preview-unanswered-checklist">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-2.5 text-xs leading-relaxed">
          {item.included ? (
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <Lock className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
          )}
          <span className={item.included ? "text-slate-600" : "text-slate-800 font-medium"}>
            {item.label}
            {!item.included && (
              <span className="text-primary font-semibold ml-1">· unlock</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

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

const CHART_COLOURS = ["hsl(220,52%,22%)", "#0d9488", "#64748b"];

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

function CompactReportList() {
  return (
    <div className="rounded-sm border border-gold/25 bg-gold/[0.06] p-4 space-y-3" data-testid="preview-report-list-compact">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        Unlock answers the three things snapshot can&apos;t
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
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const snapshotAnchorRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  const unlockIntent =
    store.profile?.calculationIntent ||
    (typeof sessionStorage !== "undefined" ? sessionStorage.getItem("dfm-homepage-intent") : null);
  const unlockCta = getUnlockCta(unlockIntent);
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

  const monthlyTease = (() => {
    if (engine.scenarios.length === 0) return null;
    let weakest = Infinity;
    for (const scenario of engine.scenarios) {
      const snap = buildMonthlySnapshot(scenario, store, engine.taxA, engine.taxB, engine.cmsAnnual);
      weakest = Math.min(weakest, snap.surplusA, snap.surplusB);
    }
    if (!Number.isFinite(weakest)) return null;
    return Math.round(weakest);
  })();

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
  }: {
    size?: "lg" | "sm";
    className?: string;
    label?: string;
    variant?: "gold" | "primary";
    testId?: string;
  }) => (
    <Button
      size={size}
      onClick={handleCheckout}
      disabled={checkoutLoading}
      className={
        variant === "primary"
          ? `bg-primary hover:bg-primary/90 text-white font-semibold ${className}`
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
          {label} <ArrowRight className="w-4 h-4 ml-1.5" />
        </>
      )}
    </Button>
  );

  const snapshotBreakdown = chartTotal > 0 && (
    <>
      <Card data-testid="card-asset-breakdown" className="border-slate-200 shadow-none rounded-sm hidden md:block">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Asset pool breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-36 h-36 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={58} dataKey="value" strokeWidth={2}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLOURS[i % CHART_COLOURS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 flex-1 w-full">
              {chartData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: CHART_COLOURS[i % CHART_COLOURS.length] }} />
                    {d.name}
                  </div>
                  <div className="text-right tabular-nums">
                    <span className="font-semibold text-slate-800">{formatCurrency(d.value)}</span>
                    <span className="text-xs text-slate-400 ml-1">({Math.round((d.value / chartTotal) * 100)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 p-3.5 bg-slate-50 rounded-sm border border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed" data-testid="text-interpretation">
              Based on what you&apos;ve entered, the combined distributable pool is{" "}
              <strong className="text-slate-900">{formatCurrency(combinedPool)}</strong>. Under a 50/50 split, each party
              would start from approximately <strong className="text-slate-900">{formatCurrency(halfPool)}</strong> — before
              housing arrangements and pension allocations are applied.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="min-h-screen bg-[#e8ebf0] overflow-x-hidden pb-20 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 safe-area-inset-top">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 min-w-0">
          <Logo size="sm" />
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Button variant="ghost" size="sm" asChild className="text-slate-600 px-2 h-8 text-xs sm:text-sm">
              <Link href="/wizard" data-testid="button-edit-inputs-preview" onClick={scrollTop}>
                Edit
              </Link>
            </Button>
            <UnlockButton
              size="sm"
              className="hidden sm:inline-flex text-sm px-3 md:px-4 h-8 max-w-[11rem] truncate"
              variant="primary"
              label={`Unlock · ${PRODUCT_PRICE}`}
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
            <div className="px-4 md:px-6 py-4 md:py-7 space-y-4 md:space-y-5">
              <ReportChapterHeader
                number="Your snapshot"
                title="Your figures, totalled"
                subtitle="Calculated from your inputs — yours to keep before unlock."
              />

              {/* Snapshot stats — one grid, responsive labels */}
              <div className="grid grid-cols-2 gap-2 md:gap-4" data-testid="preview-snapshot-hero">
                <Card data-testid="card-asset-pool" className="border-slate-200 shadow-none rounded-sm col-span-1">
                  <CardHeader className="pb-1 md:pb-2 pt-3 md:pt-6 px-3 md:px-6">
                    <CardTitle className="text-[9px] md:text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Combined pool
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 md:px-6 pb-3 md:pb-6 pt-0">
                    <p
                      className="text-lg md:text-2xl font-bold tabular-nums text-slate-900"
                      data-testid="value-asset-pool"
                    >
                      {formatCurrency(combinedPool)}
                    </p>
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1 hidden md:block">
                      Property equity plus liquid assets and savings
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-none rounded-sm col-span-1 md:hidden">
                  <CardHeader className="pb-1 pt-3 px-3">
                    <CardTitle className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
                      ~50/50 starting point
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 pt-0">
                    <p className="text-lg font-bold tabular-nums text-slate-900" data-testid="value-half-pool">
                      {formatCurrency(halfPool)}
                    </p>
                  </CardContent>
                </Card>
                <Card data-testid="card-net-equity" className="border-slate-200 shadow-none rounded-sm col-span-1 hidden md:block">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Net property equity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold tabular-nums text-slate-900" data-testid="value-net-equity">
                      {formatCurrency(intermediate.netHomeEquity)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Property value less mortgage and estimated sale costs</p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-medium md:font-normal" data-testid="text-intent-bridge">
                {intentBridge}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">{PREVIEW_SNAPSHOT_GAP}</p>

              <div className="rounded-sm border border-slate-200 bg-slate-50/80 p-3 md:p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-2.5">
                  Still unanswered from your question
                </p>
                <PreviewUnansweredChecklist intent={unlockIntent} />
              </div>

              {/* Mobile: primary CTA — before tease so it stays in first screen */}
              <div ref={snapshotAnchorRef} className="md:hidden space-y-2" data-testid="preview-mobile-cta">
                <UnlockButton className="w-full text-sm whitespace-normal h-auto min-h-10 py-2.5 leading-snug" variant="gold" testId="button-unlock-preview-primary" />
                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Share · monthly headroom · questions to ask · {PRODUCT_PRICE} · 12 months
                </p>
              </div>

              {/* Monthly / runway locked tease */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full text-left rounded-sm border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-3 space-y-2"
                data-testid="preview-locked-tease-mobile"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <BarChart3 className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-xs font-semibold text-slate-800">
                      Monthly headroom · 5-year reserve outlook
                    </p>
                  </div>
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 items-center">
                  <span className="blur-[4px] select-none tabular-nums">
                    {monthlyTease != null ? formatCurrency(monthlyTease) : "£680"}/mo weakest
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="blur-[4px] select-none">Sell · Keep · Deferred</span>
                  <span className="text-primary font-semibold ml-auto">Unlock my share &amp; monthly position →</span>
                </div>
              </button>

              <div className="hidden md:block rounded-sm border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Unlock answers the three things snapshot can&apos;t
                </p>
                <PreviewUnlockPillars />
              </div>

              {/* Mobile: collapsible full breakdown */}
              <Collapsible open={breakdownOpen} onOpenChange={setBreakdownOpen} className="md:hidden">
                <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-sm border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700">
                  See full breakdown
                  <ChevronDown className={`w-4 h-4 transition-transform ${breakdownOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3 space-y-3">
                  <Card className="border-slate-200 shadow-none rounded-sm">
                    <CardContent className="pt-4 pb-3">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Net property equity</p>
                      <p className="text-xl font-bold tabular-nums text-slate-900 mt-1">
                        {formatCurrency(intermediate.netHomeEquity)}
                      </p>
                    </CardContent>
                  </Card>
                  {chartData.length > 0 && (
                    <div className="space-y-2">
                      {chartData.map((d, i) => (
                        <div key={d.name} className="flex items-center justify-between text-xs px-1">
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="w-2 h-2 rounded-sm" style={{ background: CHART_COLOURS[i % CHART_COLOURS.length] }} />
                            {d.name}
                          </div>
                          <span className="font-semibold tabular-nums">{formatCurrency(d.value)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-slate-500 leading-relaxed" data-testid="text-interpretation">
                    Pool <strong>{formatCurrency(combinedPool)}</strong> · ~{formatCurrency(halfPool)} each at 50/50 before housing and pensions.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              {/* Desktop: full breakdown inline */}
              {snapshotBreakdown}

              {/* Desktop: bridge CTA after snapshot */}
              <div className="hidden md:flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-2 border-t border-slate-100">
                <UnlockButton variant="primary" testId="button-unlock-preview-primary" />
                <p className="text-xs text-slate-400">{PRODUCT_PRICE} one-off · 12 months · Secured by Stripe</p>
              </div>
            </div>
          </ReportPage>

          {/* ── Locked dashboards ── */}
          {previewComposition.length > 0 && previewConsoleScenarios.length > 0 && (
            <ReportPage data-testid="section-locked-console">
              <div className="px-4 md:px-6 py-4 md:py-7 space-y-4 md:space-y-5">
                <ReportChapterHeader
                  number="What unlock reveals"
                  title="Which option leaves you strongest — and for how long?"
                  subtitle="Exact capital, monthly surplus and reserve outlook for all four paths — from your figures."
                  locked
                />

                {/* Mobile: collapsed console */}
                <Collapsible open={consoleOpen} onOpenChange={setConsoleOpen} className="md:hidden">
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 rounded-sm border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700">
                    Compare all 4 settlement options
                    <ChevronDown className={`w-4 h-4 transition-transform ${consoleOpen ? "rotate-180" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 space-y-3">
                    <SettlementConsole
                      scenarios={previewConsoleScenarios.slice(0, 2)}
                      composition={previewComposition}
                      partyAName={nameA}
                      partyBName={nameB}
                      locked
                      onUnlock={handleCheckout}
                      chromeCaption="Settlement comparison"
                      footerText="Unlock to reveal exact figures"
                      hideStress
                      testId="preview-settlement-console-mobile"
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* Desktop: full console */}
                <div className="hidden md:block space-y-5">
                  <SettlementConsole
                    scenarios={previewConsoleScenarios}
                    composition={previewComposition}
                    partyAName={nameA}
                    partyBName={nameB}
                    locked
                    onUnlock={handleCheckout}
                    chromeCaption="Settlement comparison"
                    footerText="Unlock to reveal exact figures, surplus and resilience scoring"
                    hideStress
                    testId="preview-settlement-console"
                  />
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-600 mb-3">Side-by-side scenario view</p>
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

                <div className="flex justify-center md:justify-start">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    data-testid="button-unlock-scenarios"
                  >
                    <Lock className="w-3.5 h-3.5" /> Unlock to see my numbers →
                  </button>
                </div>
              </div>
            </ReportPage>
          )}

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
              onClick={handleCheckout}
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
      </div>

      {sampleReportOpen && (
        <Suspense fallback={null}>
          <ReportPreviewModal open={sampleReportOpen} onClose={() => setSampleReportOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
