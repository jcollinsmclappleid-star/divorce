import { useRef, useState } from "react";
import {
  ArrowRight, BarChart3, Check, ChevronRight, Clock, Eye, FileText, MousePointerClick,
  RefreshCw, Shield, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerReadinessStrip } from "@/components/product-stack-visual";
import {
  PRODUCT_LAYERS,
  PRODUCT_NAMES,
  PRODUCT_PRICE,
  PRODUCT_TAGLINE,
} from "@/lib/product-copy";

const THREE_PRODUCTS = [
  {
    key: "scenarios" as const,
    productNum: 1,
    icon: BarChart3,
    title: PRODUCT_NAMES.layerScenarios,
    tagline: "Scenario comparison",
    color: PRODUCT_LAYERS[0].color,
    bullets: [
      "Four settlement paths side-by-side",
      "Monthly surplus, reserves & runway",
      "Mortgage stress & CRI scores",
    ],
  },
  {
    key: "narrative" as const,
    productNum: 2,
    icon: Sparkles,
    title: PRODUCT_NAMES.layerStandsOut,
    tagline: "Executive overview",
    color: PRODUCT_LAYERS[1].color,
    bullets: [
      "Plain-English overview from your figures",
      "Pressure points & trade-offs flagged",
      "Included in your PDF export",
    ],
  },
  {
    key: "prep" as const,
    productNum: 3,
    icon: Shield,
    title: PRODUCT_NAMES.layerBeforeAgree,
    tagline: "Preparation guide",
    color: PRODUCT_LAYERS[2].color,
    bullets: [
      "Questions in your head — structured from your figures",
      "32 source-backed checks & evidence prompts",
      "Home, pensions, income, children & debts",
    ],
  },
];

const FREE_INCLUDES = ["Asset pool & scenario shape", "Calculations in your browser"];
const PAID_INCLUDES = ["3 reports from your figures", "Combined PDF export", "12 months access"];
const TRUST_PILLS = [
  { icon: Clock, label: "5 min to start" },
  { icon: RefreshCw, label: "12 mo re-runs" },
  { icon: Shield, label: "Private in-browser" },
];

interface FullPositionValueShowcaseProps {
  onStartFree: () => void;
  onPreviewReport: () => void;
  onUnlock: () => void;
}

function ReportDetailPanel({ product }: { product: (typeof THREE_PRODUCTS)[number] }) {
  const ProductIcon = product.icon;
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-start gap-3 md:gap-4">
        <div
          className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ring-1 ring-black/5"
          style={{ background: `${product.color}14` }}
        >
          <ProductIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color: product.color }} />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: product.color }}>
            Report {product.productNum} · {product.tagline}
          </p>
          <h3 className="text-base md:text-xl font-display font-bold text-slate-900 leading-snug mt-0.5">
            {product.title}
          </h3>
        </div>
      </div>
      <ul className="space-y-2 md:space-y-2.5">
        {product.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[13px] md:text-sm text-slate-700 leading-snug">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FullPositionValueShowcase({ onStartFree, onPreviewReport, onUnlock }: FullPositionValueShowcaseProps) {
  const [activeProduct, setActiveProduct] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const product = THREE_PRODUCTS[activeProduct];

  const selectProduct = (index: number) => {
    setActiveProduct(index);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  };

  return (
    <section
      className="relative py-10 md:py-20 bg-gradient-to-b from-[#152e50] via-[#122844] to-[#0f2440] overflow-hidden"
      data-testid="section-full-position-showcase"
      id="full-position-showcase"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-6xl space-y-5 md:space-y-8">
        {/* Price + anchor */}
        <div
          className="rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-sm px-4 py-5 md:px-8 md:py-7 text-center space-y-3 md:space-y-4"
          data-reveal
        >
          <p
            className="text-5xl md:text-6xl font-bold text-gold font-mono tracking-tight tabular-nums leading-none"
            data-testid="text-showcase-price"
          >
            {PRODUCT_PRICE}
          </p>
          <p className="text-sm md:text-base text-white/85 font-medium">
            {PRODUCT_NAMES.fullPosition} · 12 months · 3 reports + PDF
          </p>
          <p className="text-sm md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            {PRODUCT_TAGLINE}
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-3 border-t border-white/10 text-sm"
            data-testid="showcase-value-anchor"
          >
            <span className="text-white/40 line-through tabular-nums">£200–400/hr solicitor</span>
            <ArrowRight className="w-4 h-4 text-white/30 shrink-0" aria-hidden />
            <span className="text-gold font-semibold tabular-nums">
              {PRODUCT_PRICE} · 3 reports + PDF · 12 months
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {TRUST_PILLS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-white/55 bg-white/5 border border-white/10 rounded-full px-2.5 py-1"
              >
                <Icon className="w-3 h-3 text-gold/80 shrink-0" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Report explorer */}
        <div
          className="rounded-xl border border-slate-200/90 bg-white shadow-lg overflow-hidden"
          data-reveal
          data-testid="showcase-report-explorer"
        >
          {/* Instruction bar */}
          <div className="px-4 py-2.5 md:py-3 border-b border-slate-100 bg-slate-50/90 flex items-center justify-between gap-3">
            <p className="text-xs md:text-sm font-semibold text-slate-800">
              What&apos;s included — 3 reports + PDF
            </p>
            <p className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-medium text-primary shrink-0">
              <MousePointerClick className="w-3.5 h-3.5 shrink-0 md:hidden" aria-hidden />
              <span className="md:hidden">Tap a report</span>
              <span className="hidden md:inline">Select a report to explore</span>
              <ChevronRight className="w-3.5 h-3.5 hidden md:block" aria-hidden />
            </p>
          </div>

          <div className="md:grid md:grid-cols-[minmax(260px,300px)_1fr] md:min-h-[300px]">
            {/* Report selector — horizontal on mobile, vertical sidebar on desktop */}
            <div
              className="flex border-b md:border-b-0 md:border-r border-slate-100 overflow-x-auto md:overflow-visible overscroll-x-contain snap-x snap-mandatory md:snap-none md:flex-col md:p-3 md:gap-2 md:bg-slate-50/40"
              role="tablist"
              aria-label="Choose a report"
            >
              {THREE_PRODUCTS.map((p, i) => {
                const Icon = p.icon;
                const isActive = activeProduct === i;
                return (
                  <button
                    key={p.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectProduct(i)}
                    className={`group flex shrink-0 snap-start text-left transition-all
                      flex-1 min-w-[33%] md:min-w-0 md:flex-none md:w-full
                      flex flex-col items-center md:flex-row md:items-start md:gap-3
                      px-2 py-3.5 md:rounded-lg md:border md:p-3
                      border-b-2 md:border
                      ${isActive
                        ? "border-current bg-slate-50/80 md:border-slate-200 md:bg-white md:shadow-sm md:ring-2"
                        : "border-transparent md:hover:bg-white/80 md:hover:border-slate-200/80"
                      }`}
                    style={isActive ? ({ color: p.color, borderBottomColor: p.color, "--tw-ring-color": `${p.color}44` } as React.CSSProperties) : undefined}
                    data-testid={`showcase-product-${p.key}`}
                  >
                    <div
                      className="hidden md:flex w-9 h-9 rounded-lg items-center justify-center shrink-0"
                      style={{ background: `${p.color}${isActive ? "18" : "10"}` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: p.color }} />
                    </div>
                    <Icon
                      className="w-4 h-4 md:hidden mb-1"
                      style={{ color: isActive ? p.color : "#94a3b8" }}
                    />
                    <div className="min-w-0 flex-1 text-center md:text-left w-full">
                      <p className="text-[10px] font-bold uppercase tracking-wide leading-none text-slate-400 md:text-slate-400">
                        Report {p.productNum}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 md:hidden">{p.tagline}</p>
                      <p className="hidden md:block text-sm font-display font-semibold text-slate-900 leading-snug mt-0.5">
                        {p.title}
                      </p>
                      {!isActive && (
                        <p className="hidden md:block text-[10px] text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to view
                        </p>
                      )}
                    </div>
                    <ChevronRight
                      className={`hidden md:block w-4 h-4 shrink-0 mt-1 transition-colors ${isActive ? "" : "text-slate-300 group-hover:text-slate-400"}`}
                      style={isActive ? { color: p.color } : undefined}
                    />
                  </button>
                );
              })}
            </div>

            {/* Detail panel — centred on desktop */}
            <div
              ref={detailRef}
              role="tabpanel"
              className="flex items-center justify-center px-4 py-5 md:px-8 md:py-8 min-h-[200px] md:min-h-0 bg-white"
              style={{ background: `linear-gradient(135deg, ${product.color}06, #ffffff 55%)` }}
              data-testid="showcase-product-detail"
            >
              <ReportDetailPanel product={product} />
            </div>
          </div>

          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FileText className="w-4 h-4 text-gold shrink-0" />
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">{PRODUCT_NAMES.pdf}</span>
                {" "}— all three reports combined
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviewReport}
              className="shrink-0 border-primary/25 text-primary hover:bg-primary/5 text-xs h-8 w-full sm:w-auto"
              data-testid="button-showcase-preview"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" /> Sample (Reports 1 &amp; 2)
            </Button>
          </div>
        </div>

        {/* Free vs paid */}
        <div
          className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-sm"
          data-reveal
          data-reveal-delay="100"
        >
          <div className="grid grid-cols-2 divide-x divide-slate-100 text-sm">
            <div className="p-3 md:p-5 bg-slate-50/80">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Free · {PRODUCT_NAMES.snapshot}
              </p>
              <ul className="space-y-1.5 text-slate-600 text-xs md:text-sm">
                {FREE_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 shrink-0 mt-0.5 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 md:p-5 bg-gradient-to-br from-gold/[0.07] to-white">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-2">
                {PRODUCT_PRICE} · full unlock
              </p>
              <ul className="space-y-1.5 text-slate-700 text-xs md:text-sm md:hidden">
                {PAID_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 shrink-0 mt-0.5 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="hidden md:block">
                <AnswerReadinessStrip />
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2.5 max-w-md mx-auto md:max-w-2xl md:flex-row md:gap-3" data-reveal data-reveal-delay="150">
          <Button
            size="lg"
            onClick={onUnlock}
            className="w-full md:flex-1 bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 font-semibold order-1 md:order-2"
            data-testid="button-showcase-unlock"
          >
            Unlock 3 reports — {PRODUCT_PRICE} <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onStartFree}
            className="w-full md:flex-1 bg-white/10 border-white/25 text-white hover:bg-white/15 hover:text-white font-semibold order-2 md:order-1"
            data-testid="button-showcase-start"
          >
            Start free first
          </Button>
        </div>

        <p className="text-center text-[11px] text-white/35 leading-relaxed px-2">
          Illustrative modelling only · Not legal or financial advice · Stripe-secured
        </p>
      </div>
    </section>
  );
}
