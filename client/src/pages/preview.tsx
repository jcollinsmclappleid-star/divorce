import { useLocation, Link } from "wouter";
import { useAppStore } from "@/hooks/use-store";
import { useEngine } from "@/hooks/use-engine";
import { useAccess, useSessionToken } from "@/hooks/use-access";
import { formatCurrency, scrollTop } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Lock, Check, Shield, ArrowRight, Loader2,
  AlertCircle, Eye, FileText,
} from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import { useCheckout } from "@/hooks/use-checkout";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useNoIndex } from "@/hooks/use-noindex";
import { Logo } from "@/components/logo";
import { FsiGaugeLocked } from "@/components/fsi-gauge";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { SettlementConsole, buildConsoleScenarios } from "@/components/settlement-console";
import { ScenarioLeaderboard } from "@/components/scenario-leaderboard";
import { SectionIllustration } from "@/components/section-illustration";
import { AnswerReadinessStrip } from "@/components/product-stack-visual";
import { ReportPortfolioBundle } from "@/components/homepage-report-portfolio";
import {
  ANSWER_READY_HEADLINE,
  PRODUCT_LAYERS,
  PRODUCT_NAMES,
  PRODUCT_PRICE,
  PRODUCT_TAGLINE,
  getUnlockCta,
} from "@/lib/product-copy";

const ReportPreviewModal = lazy(() =>
  import("@/components/report-preview-modal").then((m) => ({ default: m.ReportPreviewModal })),
);

const PREVIEW_INTENT_HOOKS: Record<string, string> = {
  fair_split: "You wanted to know what your share could be — your full report shows capital, monthly position and reserve outlook across all four settlement options.",
  house_split: "You wanted to know if you can keep the house — your report shows mortgage pressure and what each keep-home option leaves you with monthly.",
  offer_check: "You wanted to check their offer — your report mirrors the split and shows what it leaves each person with.",
  pension_impact: "You wanted to understand your pension position — your report compares split vs offset trade-offs in your figures.",
  income_gap: "You gave up work or earned less — your report shows where that appears and what to verify before agreeing.",
  protect_position: "You wanted to know whether your contributions count — your report maps evidence prompts to your figures.",
  children_housing: "You wanted to know if you can afford to live on with the kids — your report shows monthly surplus under each scenario.",
};

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
          <Lock className="w-3 h-3 mr-1" /> Preview · figures locked
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
  const unlockIntent =
    store.profile?.calculationIntent ||
    (typeof sessionStorage !== "undefined" ? sessionStorage.getItem("dfm-homepage-intent") : null);
  const unlockCta = getUnlockCta(unlockIntent);
  const intentHook =
    (unlockIntent && PREVIEW_INTENT_HOOKS[unlockIntent]) ||
    "Your figures are loaded. Unlock three dedicated reports plus your downloadable PDF to see what each option leaves you with before you agree.";

  useEffect(() => {
    if (!isLoading && hasAccess) navigate("/results");
  }, [hasAccess, isLoading, navigate]);

  const hasData = store.assets.length > 0 || store.incomes.length > 0;
  useEffect(() => {
    if (!hasData) navigate("/");
  }, [hasData, navigate]);
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
  }: {
    size?: "lg" | "sm";
    className?: string;
    label?: string;
    variant?: "gold" | "primary";
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
      data-testid="button-unlock-pricing"
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

  return (
    <div className="min-h-screen bg-[#e8ebf0] overflow-x-hidden">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="text-slate-600">
              <Link href="/wizard" data-testid="button-edit-inputs-preview" onClick={scrollTop}>
                Edit inputs
              </Link>
            </Button>
            <UnlockButton size="sm" className="text-sm px-4 py-2 h-8" variant="primary" />
          </div>
        </div>
      </header>

      <main className="px-4 py-8 md:py-10 space-y-8">
        <div className="max-w-4xl mx-auto space-y-8">
        {/* ── Report cover ── */}
        <ReportPage data-testid="preview-report-cover">
          <div className="border-b border-slate-100 px-6 py-4 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Confidential · Illustrative modelling
              </p>
              <p className="text-xs text-slate-500 mt-1">England &amp; Wales · Prepared from your inputs</p>
            </div>
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
          </div>
          <div className="px-6 py-8 md:py-10 space-y-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 font-semibold mb-2">
                {PRODUCT_NAMES.snapshot}
              </p>
              <h1 className="text-2xl md:text-[1.75rem] font-display font-bold text-slate-900 leading-tight" data-testid="text-preview-title">
                {ANSWER_READY_HEADLINE}
              </h1>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{intentHook}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{PRODUCT_TAGLINE}</p>
            <AnswerReadinessStrip className="max-w-xl" />
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-1 border-t border-slate-100">
              <UnlockButton variant="primary" />
              <p className="text-xs text-slate-400">{PRODUCT_PRICE} one-off · 12 months access · Secured by Stripe</p>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Illustrative modelling only — not legal, tax or financial advice.
            </p>
          </div>
        </ReportPage>
        </div>

        {/* ── Report portfolio — full width for three-column previews ── */}
        <div className="max-w-6xl mx-auto space-y-4" id="preview-report-portfolio" data-testid="section-preview-three-reports">
          <div className="max-w-2xl space-y-1 px-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Your report package</p>
            <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 leading-snug">
              Three reports + PDF export
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Each report is built from your figures. Unlock to reveal full content across all four settlement options.
            </p>
          </div>
          <ReportPortfolioBundle
            mode="preview"
            onOpenFullSample={() => setSampleReportOpen(true)}
            onScrollToPricing={scrollToPricing}
            onUnlock={handleCheckout}
            unlockLabel={unlockCta}
            unlockLoading={checkoutLoading}
          />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
        {/* ── Free section: asset summary ── */}
        <ReportPage>
          <div className="px-6 py-6 md:py-7 space-y-5">
            <ReportChapterHeader
              number="Snapshot section"
              title="Combined asset pool"
              subtitle="Calculated from your inputs — included free before unlock."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Card data-testid="card-net-equity" className="border-slate-200 shadow-none rounded-sm">
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
              <Card data-testid="card-asset-pool" className="border-slate-200 shadow-none rounded-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    Combined distributable pool
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold tabular-nums text-slate-900" data-testid="value-asset-pool">
                    {formatCurrency(combinedPool)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Property equity plus liquid assets and savings</p>
                </CardContent>
              </Card>
            </div>
            {chartTotal > 0 && (
              <Card data-testid="card-asset-breakdown" className="border-slate-200 shadow-none rounded-sm">
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
            )}
          </div>
        </ReportPage>

        {/* ── Report 1 preview: settlement console ── */}
        {previewComposition.length > 0 && previewConsoleScenarios.length > 0 && (
          <ReportPage data-testid="section-locked-console">
            <div className="px-6 py-6 md:py-7 space-y-5">
              <ReportChapterHeader
                number="Report 1 of 3"
                title={PRODUCT_NAMES.layerScenarios}
                subtitle={PRODUCT_LAYERS[0]?.subtitle}
                locked
              />
              <p className="text-sm text-slate-500 -mt-2">
                Settlement comparison across all four options — wired to your figures. Exact outputs unlock with your full report.
              </p>
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
          </ReportPage>
        )}

        <div className="flex items-start gap-3 p-4 bg-white rounded-sm border border-emerald-200/70" data-testid="card-privacy-preview">
          <Shield className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800">Your privacy is protected.</span> Core calculations run privately in
            your browser. No names, addresses or contact details are included in any processing.
          </p>
        </div>

        {/* ── CRI ── */}
        <ReportPage data-testid="card-fsi-preview">
          <CardContent className="py-8 px-6">
            <div className="text-center space-y-4 max-w-md mx-auto">
              <ReportChapterHeader
                number="Appendix"
                title="Cashflow Resilience Indicator"
                subtitle="Scores how financially viable each scenario is for each party — income, outgoings, housing and capital combined."
                locked
              />
              <div className="flex justify-center pt-2">
                <FsiGaugeLocked size={132} />
              </div>
              <p className="text-xs text-slate-500">Your CRI scores across all four scenarios are ready — included when you unlock.</p>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                data-testid="button-unlock-fsi"
              >
                <Lock className="w-3.5 h-3.5" /> Unlock full report
              </button>
            </div>
          </CardContent>
        </ReportPage>

        {/* ── Pricing ── */}
        <section id="preview-pricing" className="relative overflow-hidden rounded-sm">
          <SectionIllustration variant="balance-ledger" fill tone="background" />
          <div className="relative z-10 rounded-sm bg-primary border border-white/10 shadow-xl overflow-hidden" data-testid="card-pricing-cta">
            <div className="px-6 pt-7 pb-5 text-center border-b border-white/10 space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Full report access</p>
              <div className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 border border-white/15 text-xs font-medium px-3 py-1 rounded-sm">
                Three reports + PDF · 12 months access
              </div>
              <div className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white pt-1" data-testid="text-price">
                {PRODUCT_PRICE}
              </div>
              <p className="text-sm text-white/55">One-time payment. No subscription.</p>
              <p className="text-xs text-white/40 max-w-md mx-auto leading-relaxed">{PRODUCT_TAGLINE}</p>
            </div>

            <div className="px-5 pt-4 pb-3 space-y-2 border-b border-white/10">
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
              <div className="flex gap-3 p-3 rounded-sm bg-white/8 border border-white/15">
                <div className="w-7 h-7 rounded-sm bg-gold/25 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">{PRODUCT_NAMES.pdf}</p>
                  <p className="text-[10px] text-white/45 mt-0.5 leading-relaxed">
                    Combined export of all three reports — download and share with your solicitor.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { stat: "4 options", label: "Fully modelled" },
                  { stat: "12 months", label: "Unlimited reruns" },
                  { stat: "In-browser", label: "Private calcs" },
                ].map(({ stat, label }) => (
                  <div key={label} className="bg-white/5 rounded-sm py-2.5 border border-white/5">
                    <p className="text-sm font-semibold text-white">{stat}</p>
                    <p className="text-[10px] text-white/45 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
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

        {/* ── Email capture ── */}
        <ReportPage>
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

        {/* ── Free vs full ── */}
        <div className="grid sm:grid-cols-2 gap-4">
          <ReportPage>
            <CardHeader className="pb-2 px-6 pt-5">
              <CardTitle className="text-sm font-medium text-slate-500">{PRODUCT_NAMES.snapshot} (current view)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-6 pb-6">
              {["Net property equity and asset pool", "Asset breakdown by category", "Four settlement option structure"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </CardContent>
          </ReportPage>
          <ReportPage className="border-primary/20 ring-1 ring-primary/10">
            <CardHeader className="pb-2 px-6 pt-5">
              <CardTitle className="text-sm font-semibold text-primary">{PRODUCT_NAMES.fullPosition}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-6 pb-6">
              {[
                "Capital allocation under all 4 options",
                "Monthly surplus / deficit per scenario",
                "Cashflow Resilience Indicator scores",
                PRODUCT_NAMES.layerStandsOut,
                PRODUCT_NAMES.layerBeforeAgree,
                PRODUCT_NAMES.pdf,
                "12 months' access — unlimited re-runs",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </CardContent>
          </ReportPage>
        </div>

        <p className="text-xs text-slate-500 text-center max-w-lg mx-auto leading-relaxed pb-4" data-testid="text-disclaimer-preview">
          This platform provides structured financial modelling and does not replace legal or regulated financial advice. All outputs
          are illustrative, based on your inputs and standard assumptions.
        </p>
        </div>
      </main>

      {sampleReportOpen && (
        <Suspense fallback={null}>
          <ReportPreviewModal open={sampleReportOpen} onClose={() => setSampleReportOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
