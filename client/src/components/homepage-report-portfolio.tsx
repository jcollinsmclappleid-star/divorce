import { useState } from "react";
import {
  ArrowRight, BookOpen, ChevronRight, FileText, Lock,
  AlertTriangle, ListChecks, MessageCircleQuestion,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadialGauge } from "@/components/charts/radial-gauge";
import { HERO_EYEBROW, PRODUCT_NAMES, PRODUCT_PRICE, PRODUCT_TAGLINE } from "@/lib/product-copy";
import { SETTLEMENT_FACTOR_GROUPS } from "@/lib/settlement-factors";
import { chartTheme, densifyProjection, hashSeed } from "@/lib/chart-theme";

export interface ReportPortfolioBundleProps {
  onOpenFullSample: () => void;
  onScrollToPricing?: () => void;
  onUnlock?: () => void;
  unlockLabel?: string;
  unlockLoading?: boolean;
  /** marketing = homepage pricing link; preview = unlock-first paywall */
  mode?: "marketing" | "preview";
  className?: string;
}

interface HomepageReportPortfolioProps {
  onOpenFullSample: () => void;
  onScrollToPricing: () => void;
}

const SAMPLE_SCENARIOS = [
  { id: "S1", short: "Sell & Split", color: "#2563EB", capTotal: 423_450, criA: 76, criB: 48, surA: 1333, surB: -500, projection: [220_450, 214_600, 207_800, 198_900, 188_400, 176_900] },
  { id: "S2", short: "A Keeps", color: "#10B981", capTotal: 497_247, criA: 32, criB: 48, surA: -491, surB: -500, projection: [121_247, 96_400, 70_800, 45_200, 20_100, -4_800] },
  { id: "S3", short: "B Keeps", color: "#8B5CF6", capTotal: 475_203, criA: 76, criB: 18, surA: 1333, surB: -2324, projection: [99_203, 83_700, 66_900, 49_200, 30_100, 9_400] },
  { id: "S4", short: "Deferred", color: "#F59E0B", capTotal: 455_000, criA: 70, criB: 38, surA: 1333, surB: -980, projection: [136_000, 124_500, 111_700, 98_400, 83_600, 67_800] },
] as const;

const REPORT_3_GROUP_ORDER = ["asset-pool", "home-housing", "income-career", "pensions", "children-support"] as const;

const REPORT_3_GROUPS = REPORT_3_GROUP_ORDER.map(
  (id) => SETTLEMENT_FACTOR_GROUPS.find((g) => g.id === id)!,
).filter(Boolean);

function MiniSparkline({ data, color = chartTheme.color.gold, height = 32 }: { data: number[]; color?: string; height?: number }) {
  const W = 200;
  const H = height;
  const P = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = Math.max(1, max - min);
  const pts = data.map((v, i) => ({
    x: P + (i / Math.max(1, data.length - 1)) * (W - P * 2),
    y: H - P - ((v - min) / range) * (H - P * 2),
  }));
  const path = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} preserveAspectRatio="none" aria-hidden>
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReportDocumentFrame({
  reportNum,
  meta,
  accent,
  footer,
  children,
}: {
  reportNum: number;
  meta: string;
  accent: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.07)] overflow-hidden flex flex-col flex-1 h-full min-h-[280px] md:min-h-[320px]">
      <div className="px-3 py-2 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Report {reportNum} · DivorceCalculatorUK
          </p>
          <p className="text-[10px] text-slate-600 font-medium truncate">{meta}</p>
        </div>
        <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-400 shrink-0 px-1.5 py-0.5 rounded border border-slate-200 bg-white">
          Sample
        </span>
      </div>
      <div className="h-0.5 shrink-0" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }} />
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
      {footer ? <div className="shrink-0 border-t border-slate-100">{footer}</div> : null}
    </div>
  );
}

function MiniSectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex items-stretch gap-0 rounded overflow-hidden shadow-sm">
      <div className="w-1 shrink-0 bg-gold" />
      <div className="flex-1 bg-gradient-to-r from-[hsl(220_52%_20%)] to-[hsl(220_52%_16%)] px-2.5 py-2">
        <p className="text-[9px] font-bold text-white uppercase tracking-widest leading-tight">{title}</p>
        {description ? <p className="text-[9px] text-white/50 mt-0.5 leading-snug line-clamp-2">{description}</p> : null}
      </div>
    </div>
  );
}

function BlurredValue({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tabular-nums text-slate-600 blur-[3px] select-none ${className}`}>
      £18xk
    </span>
  );
}

/** Report 1 — settlement comparison console micro-UI. */
function ScenariosReportPreview() {
  const [active, setActive] = useState(0);
  const sc = SAMPLE_SCENARIOS[active];
  const maxCap = Math.max(...SAMPLE_SCENARIOS.map((s) => s.capTotal));
  const traj = densifyProjection([...sc.projection], hashSeed(sc.id)).filter((_, i) => i % 5 === 0);

  return (
    <ReportDocumentFrame
      reportNum={1}
      meta="Settlement comparison · 4 paths modelled"
      accent="#0891b2"
    >
      <div className="p-3 flex-1 flex flex-col gap-2.5 bg-[#fafbfc] min-h-0">
        <p className="text-[10px] font-semibold text-cyan-800 bg-cyan-50 border border-cyan-100 rounded px-2 py-1">
          4 paths · capital · monthly surplus · reserves · CRI scored
        </p>

        <div className="flex gap-1 flex-wrap">
          {SAMPLE_SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className={`text-[9px] font-semibold px-2 py-1 rounded-md border transition-all ${
                active === i
                  ? "text-white border-transparent shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
              style={active === i ? { background: s.color } : undefined}
            >
              {s.short}
            </button>
          ))}
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Capital comparison</p>
          <div className="flex items-end gap-1 h-14">
            {SAMPLE_SCENARIOS.map((s) => (
              <div key={s.id} className="flex-1 flex flex-col items-center gap-0.5 min-w-0">
                <div
                  className="w-full rounded-t transition-all duration-300"
                  style={{
                    height: `${Math.max(12, (s.capTotal / maxCap) * 100)}%`,
                    background: s.id === sc.id ? s.color : `${s.color}55`,
                    opacity: s.id === sc.id ? 1 : 0.65,
                  }}
                />
                <span className="text-[7px] text-slate-400 truncate w-full text-center">{s.short.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md border border-slate-200 bg-white p-1.5 flex flex-col items-center">
            <RadialGauge score={sc.criA} size={72} animate={false} label="Party A · CRI" />
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-1.5 flex flex-col items-center">
            <RadialGauge score={sc.criB} size={72} animate={false} label="Party B · CRI" />
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-2 space-y-1">
          {[
            { label: "Combined capital", blur: true },
            { label: "Monthly surplus (A)", blur: true },
            { label: "Reserve outlook (5yr)", blur: false, spark: true },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-2 text-[10px] border-b border-slate-50 last:border-0 pb-1 last:pb-0">
              <span className="text-slate-500">{row.label}</span>
              {row.spark ? (
                <div className="w-16 shrink-0">
                  <MiniSparkline data={traj} color={sc.color} height={22} />
                </div>
              ) : row.blur ? (
                <BlurredValue />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </ReportDocumentFrame>
  );
}

/** Report 2 — executive overview memo. */
function StandsOutReportPreview() {
  return (
    <ReportDocumentFrame
      reportNum={2}
      meta="Executive overview · plain English"
      accent="#C9A84C"
    >
      <div className="p-3 flex-1 flex flex-col gap-2.5 bg-[#fafbfc] min-h-0">
        <MiniSectionHeader title="What stands out" description="Pressure, trade-offs and missing values" />

        <div className="rounded-md border border-slate-200 bg-white p-2.5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Overview</p>
          <p className="text-[11px] text-slate-700 leading-relaxed">
            Monthly position is tighter under a keep-home scenario once housing costs and reduced liquid capital are included. Pension offsetting may look balanced on paper but leaves a wider income gap day to day.
          </p>
        </div>

        <div className="rounded-md border-l-[3px] border-l-amber-500 bg-amber-50/90 border border-amber-200/60 px-2.5 py-2">
          <div className="flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-amber-900">Pressure flag · housing &amp; cashflow</p>
              <p className="text-[10px] text-amber-800/90 leading-snug mt-0.5">
                Keep-home path may leave Party B with negative monthly surplus once mortgage and running costs apply.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white px-2.5 py-2 space-y-1.5">
          {[
            { label: "Monthly surplus under keep-home", warn: true },
            { label: "Left-short risk vs headline split", warn: false },
            { label: "Missing values to verify", warn: false },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-2 text-[10px]">
              <span className={`${row.warn ? "text-amber-800 font-medium" : "text-slate-600"}`}>{row.label}</span>
              <BlurredValue className={row.warn ? "text-amber-700" : ""} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 mt-auto">
          {["Trade-off lens", "Scenario narrative", "Included in PDF"].map((tag) => (
            <span key={tag} className="text-[8px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ReportDocumentFrame>
  );
}

/** Report 3 — section headings + blurred sub-structure. */
function PreparationGuideHeadingsPreview() {
  return (
    <ReportDocumentFrame
      reportNum={3}
      meta="Preparation guide · personalised from your figures"
      accent="#7c3aed"
      footer={
        <div className="px-3 py-2 bg-violet-50/90 flex items-center gap-2">
          <Lock className="w-3 h-3 text-violet-600 shrink-0" />
          <p className="text-[10px] text-violet-800 font-medium leading-snug">
            Populated from your inputs on unlock — not in the public sample
          </p>
        </div>
      }
    >
      <div className="p-3 flex-1 flex flex-col gap-2 bg-[#fafbfc] min-h-0">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-[9px] border-violet-200 bg-violet-50 text-violet-800 font-bold">
            32 source-backed checks
          </Badge>
          <span className="text-[9px] text-violet-600 font-semibold">Your figures only</span>
        </div>

        <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[240px] pr-0.5">
          {REPORT_3_GROUPS.map((group, i) => (
            <div key={group.id} className="rounded-md border border-violet-100 bg-white px-2.5 py-2 shadow-sm">
              <p className="text-[10px] font-semibold text-violet-950 leading-snug">{group.title}</p>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400 flex items-center gap-0.5">
                    <ListChecks className="w-2.5 h-2.5" /> Figures to check
                  </p>
                  <p className="text-[8px] text-slate-400 blur-[2.5px] select-none mt-0.5 leading-snug line-clamp-2">
                    {group.items[0]?.title ?? "Mapped to your asset pool…"}
                  </p>
                </div>
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400 flex items-center gap-0.5">
                    <MessageCircleQuestion className="w-2.5 h-2.5" /> Questions to ask
                  </p>
                  <p className="text-[8px] text-slate-400 blur-[3px] select-none mt-0.5 leading-snug line-clamp-2">
                    {i % 2 === 0 ? "Evidence and professional prompts from your scenario…" : group.intro.slice(0, 60)}…
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ReportDocumentFrame>
  );
}

const REPORT_META = [
  {
    num: 1,
    title: PRODUCT_NAMES.layerScenarios,
    outcome: "See what each option leaves you with — capital, monthly position and reserves.",
    badgeClass: "border-cyan-200 bg-cyan-50 text-cyan-800",
    preview: <ScenariosReportPreview />,
    sample: true,
  },
  {
    num: 2,
    title: PRODUCT_NAMES.layerStandsOut,
    outcome: "Plain-English insights on pressure points, trade-offs and what may leave you short.",
    badgeClass: "border-amber-200 bg-amber-50 text-amber-900",
    preview: <StandsOutReportPreview />,
    sample: true,
  },
  {
    num: 3,
    title: PRODUCT_NAMES.layerBeforeAgree,
    outcome: "Answers the questions in your head — checks, evidence and what to ask before agreeing.",
    badgeClass: "border-violet-200 bg-violet-50 text-violet-800",
    preview: <PreparationGuideHeadingsPreview />,
    sample: false,
  },
] as const;

export function ReportPortfolioBundle({
  onOpenFullSample,
  onScrollToPricing,
  onUnlock,
  unlockLabel,
  unlockLoading = false,
  mode = "marketing",
  className = "",
}: ReportPortfolioBundleProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden ${className}`}
      data-testid={mode === "preview" ? "preview-report-portfolio-bundle" : "report-portfolio-bundle"}
    >
      <div className="px-4 md:px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-4.5 h-4.5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">{PRODUCT_NAMES.fullPosition}</p>
            <p className="text-[10px] text-muted-foreground">
              {mode === "preview"
                ? "Built from your figures · unlock to populate"
                : `3 reports + ${PRODUCT_NAMES.pdf} · ${PRODUCT_PRICE}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground flex-wrap justify-end">
          <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">R1 &amp; 2 · sample</span>
          <span className="px-2 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 whitespace-nowrap">R3 · your figures</span>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {REPORT_META.map((report) => (
            <div key={report.num} className="flex flex-col min-h-0 space-y-2">
              <div className="space-y-1 px-0.5">
                <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-wider ${report.badgeClass}`}>
                  Report {report.num} of 3
                  {!report.sample && (
                    <span className="ml-1.5 inline-flex items-center gap-0.5 normal-case tracking-normal font-semibold">
                      · <Lock className="w-2.5 h-2.5" /> unlock
                    </span>
                  )}
                </Badge>
                <h3 className="text-sm md:text-base font-display font-bold text-foreground leading-snug">{report.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{report.outcome}</p>
              </div>
              <div className="flex-1 flex">{report.preview}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-slate-100 space-y-4">
          <div className="rounded-xl border border-gold/25 bg-gradient-to-r from-gold/[0.06] to-white px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{PRODUCT_NAMES.pdf}</p>
                <p className="text-[11px] text-muted-foreground">All three reports combined — download and share with your solicitor</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 border-primary/30 text-primary hover:bg-primary/5 font-semibold w-full sm:w-auto"
              onClick={onOpenFullSample}
              data-testid="button-open-report-sample"
            >
              <BookOpen className="w-4 h-4 mr-2" /> Open sample (Reports 1 &amp; 2)
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            {mode === "preview" && onUnlock ? (
              <>
                <Button
                  size="lg"
                  onClick={onUnlock}
                  disabled={unlockLoading}
                  className="w-full sm:flex-1 bg-gold hover:bg-gold/90 text-white border-0 shadow-md font-semibold"
                  data-testid="button-portfolio-unlock"
                >
                  {unlockLoading ? "Redirecting…" : unlockLabel ?? `Unlock — ${PRODUCT_PRICE}`}
                  {!unlockLoading && <ArrowRight className="w-4 h-4 ml-1.5" />}
                </Button>
                {onScrollToPricing && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={onScrollToPricing}
                    className="w-full sm:w-auto border-slate-300 font-semibold"
                    data-testid="button-portfolio-to-pricing"
                  >
                    Pricing details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </>
            ) : onScrollToPricing ? (
              <Button
                size="lg"
                variant="outline"
                onClick={onScrollToPricing}
                className="w-full sm:w-auto border-slate-300 font-semibold"
                data-testid="button-portfolio-to-pricing"
              >
                See pricing — {PRODUCT_PRICE}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomepageReportPortfolio({ onOpenFullSample, onScrollToPricing }: HomepageReportPortfolioProps) {
  return (
    <section
      className="py-12 md:py-16 bg-slate-100/80 border-y border-border/40"
      data-testid="section-homepage-report-portfolio"
      id="homepage-report-portfolio"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3" data-reveal>
          <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/15">
            {HERO_EYEBROW}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
            Three reports built from your figures
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {PRODUCT_TAGLINE} Each report answers a different layer — numbers, insights, and what to check — so you walk in prepared, not guessing.
          </p>
        </div>

        <div data-reveal>
          <ReportPortfolioBundle
            mode="marketing"
            onOpenFullSample={onOpenFullSample}
            onScrollToPricing={onScrollToPricing}
          />
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use HomepageReportPortfolio on homepage. */
export function LandingReportPreviews(props: HomepageReportPortfolioProps) {
  return <HomepageReportPortfolio {...props} />;
}
