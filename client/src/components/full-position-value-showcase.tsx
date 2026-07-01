import { useState } from "react";
import {
  ArrowRight, BarChart3, Check, Clock, Eye, FileText, Lock, RefreshCw, Shield, Sparkles, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerReadinessStrip } from "@/components/product-stack-visual";
import {
  PRODUCT_LAYERS,
  PRODUCT_NAMES,
  PRODUCT_PRICE,
  PRODUCT_TAGLINE,
} from "@/lib/product-copy";

const OUTCOMES = [
  "Three separate reports — each built from your figures, not generic templates",
  "See what each settlement option leaves you with monthly — not just on paper",
  "Walk into solicitor or mediation with structured questions already prepared",
  "Download one combined PDF — share with your solicitor or revisit for 12 months",
];

const THREE_PRODUCTS = [
  {
    key: "scenarios" as const,
    productNum: 1,
    icon: BarChart3,
    title: PRODUCT_NAMES.layerScenarios,
    tagline: "Scenario comparison report",
    color: PRODUCT_LAYERS[0].color,
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    border: "border-cyan-400/40",
    ring: "ring-cyan-400/30",
    bullets: [
      "Four settlement paths modelled side-by-side",
      "Monthly surplus, reserves & runway projections",
      "Mortgage stress tests & affordability benchmarks",
      "Cashflow Resilience Indicator (CRI) scores",
    ],
  },
  {
    key: "narrative" as const,
    productNum: 2,
    icon: Sparkles,
    title: PRODUCT_NAMES.layerStandsOut,
    tagline: "Executive overview report",
    color: PRODUCT_LAYERS[1].color,
    gradient: "from-amber-500/25 via-gold/10 to-transparent",
    border: "border-gold/45",
    ring: "ring-gold/35",
    bullets: [
      "Plain-English overview from your figures",
      "Pressure points & left-short risk flagged",
      "Scenario trade-offs explained clearly",
      "Generate once — included in your PDF",
    ],
  },
  {
    key: "prep" as const,
    productNum: 3,
    icon: Shield,
    title: PRODUCT_NAMES.layerBeforeAgree,
    tagline: "Preparation guide report",
    color: PRODUCT_LAYERS[2].color,
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    border: "border-violet-400/40",
    ring: "ring-violet-400/30",
    bullets: [
      "Answers the questions in your head before you agree",
      "32-factor source-backed checks on your figures",
      "Evidence to gather & questions for professionals",
      "Career, bills, home, pensions, children & debts",
    ],
  },
];

const PDF_BUNDLE = {
  icon: FileText,
  title: PRODUCT_NAMES.pdf,
  tagline: "Combined export · all three reports",
  color: "#C9A84C",
  bullets: [
    "Print-ready position report in one document",
    "All three reports combined for sharing",
    "Download anytime during 12-month access",
  ],
};

interface FullPositionValueShowcaseProps {
  onStartFree: () => void;
  onPreviewReport: () => void;
  onUnlock: () => void;
}

export function FullPositionValueShowcase({ onStartFree, onPreviewReport, onUnlock }: FullPositionValueShowcaseProps) {
  const [activeProduct, setActiveProduct] = useState(0);
  const product = THREE_PRODUCTS[activeProduct];
  const ProductIcon = product.icon;

  return (
    <section
      className="relative py-16 md:py-24 bg-gradient-to-b from-[#152e50] via-[#122844] to-[#0f2440] overflow-hidden"
      data-testid="section-full-position-showcase"
      id="full-position-showcase"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-violet-500/8 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        {/* Price hero */}
        <div className="text-center mb-12 space-y-5" data-reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
            <Package className="w-4 h-4 text-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold">3 reports + PDF export</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div>
              <p
                className="text-6xl md:text-7xl font-bold text-gold font-mono tracking-tight tabular-nums leading-none drop-shadow-lg"
                data-testid="text-showcase-price"
              >
                {PRODUCT_PRICE}
              </p>
              <p className="text-sm text-white/50 mt-2 font-medium">for {PRODUCT_NAMES.fullPosition}</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/15" />
            <div className="text-left space-y-1.5">
              <p className="text-lg md:text-xl font-display font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                12 months access
              </p>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                Unlimited re-runs · update your figures · download your PDF anytime
              </p>
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white max-w-3xl mx-auto leading-tight pt-2">
            {PRODUCT_TAGLINE}
          </h2>
          <p className="text-sm md:text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
            Illustrative modelling only — not legal, tax or financial advice. Three dedicated reports plus one combined PDF — all included in your {PRODUCT_PRICE} unlock.
          </p>
        </div>

        {/* Three product cards — always visible */}
        <div className="grid md:grid-cols-3 gap-4 mb-4" data-reveal>
          {THREE_PRODUCTS.map((p, i) => {
            const Icon = p.icon;
            const isActive = activeProduct === i;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setActiveProduct(i)}
                className={`group relative text-left rounded-2xl border-2 p-5 transition-all duration-200 overflow-hidden ${
                  isActive
                    ? `${p.border} bg-gradient-to-br ${p.gradient} shadow-xl ring-2 ${p.ring} scale-[1.02]`
                    : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
                }`}
                data-testid={`showcase-product-${p.key}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}88)` }}
                />
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      background: `${p.color}22`,
                      color: p.color,
                      border: `1px solid ${p.color}44`,
                    }}
                  >
                    Report {p.productNum}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ background: `${p.color}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45 mb-1">{p.tagline}</p>
                <p className="text-base font-display font-bold text-white leading-snug mb-2">{p.title}</p>
                <p className="text-xs text-white/55 leading-relaxed line-clamp-2">{p.bullets[0]}</p>
                {isActive && (
                  <p className="text-[10px] font-bold text-gold mt-3 uppercase tracking-wider">Tap to explore →</p>
                )}
              </button>
            );
          })}
        </div>

        {/* PDF bundle strip */}
        <div
          className="rounded-xl border border-gold/30 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          data-reveal
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center shrink-0 ring-2 ring-gold/25">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold/80">Plus · combined export</p>
              <p className="text-sm font-display font-bold text-white">{PDF_BUNDLE.title}</p>
              <p className="text-xs text-white/50 mt-0.5">{PDF_BUNDLE.tagline}</p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60 sm:text-right">
            {PDF_BUNDLE.bullets.map((b) => (
              <li key={b} className="flex items-center gap-1.5 sm:justify-end">
                <Check className="w-3 h-3 text-gold shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-8 items-start mb-8">
          {/* Outcomes */}
          <div
            className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 md:p-6 space-y-4"
            data-reveal
          >
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300/90">
              What you get for {PRODUCT_PRICE}
            </p>
            <ul className="space-y-3">
              {OUTCOMES.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm md:text-base text-white/85 leading-relaxed">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/45 uppercase tracking-wider mb-2 text-center">Value anchor</p>
              <div className="flex flex-wrap items-end justify-center gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Solicitor (indicative)</p>
                  <p className="text-xl font-mono font-semibold text-white/30 line-through tabular-nums">£200–400/hr</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/25 hidden sm:block mb-1" />
                <div className="text-center">
                  <p className="text-[10px] text-gold/70 uppercase tracking-wider mb-1 font-semibold">{PRODUCT_PRICE} · 12 months</p>
                  <p className="text-lg font-bold text-gold">3 reports + PDF</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active product detail */}
          <div
            className="rounded-2xl border-2 overflow-hidden shadow-2xl shadow-black/25 transition-colors duration-300"
            style={{ borderColor: `${product.color}55` }}
            data-reveal
            data-reveal-delay="100"
          >
            <div
              className="px-5 py-4 border-b border-white/10 bg-gradient-to-r"
              style={{ backgroundImage: `linear-gradient(135deg, ${product.color}22, transparent)` }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: product.color }}>
                Report {product.productNum} · {product.tagline}
              </p>
              <h3 className="text-xl font-display font-bold text-white leading-snug">{product.title}</h3>
            </div>

            <div className="p-5 md:p-6 space-y-4 bg-white/[0.06] backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ring-2 ring-white/10"
                  style={{ background: `${product.color}22`, borderColor: `${product.color}44` }}
                >
                  <ProductIcon className="w-6 h-6" style={{ color: product.color }} />
                </div>
                <ul className="space-y-2.5 flex-1">
                  {product.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-white/80 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-400/90 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Free vs full */}
        <div
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6 mb-8 space-y-4"
          data-reveal
          data-reveal-delay="150"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-white/45 text-center">
            Free snapshot vs {PRODUCT_PRICE} — three reports unlocked
          </p>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="font-bold text-white/55 uppercase tracking-widest text-[11px] mb-3">
                Free · {PRODUCT_NAMES.snapshot}
              </p>
              <ul className="space-y-2 text-white/60">
                {["Asset pool & scenario shape", "Basic comparison overview", "Core calculations in your browser"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 shrink-0 opacity-50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gold/25 bg-gold/5 p-4 sm:border-l sm:pl-6">
              <p className="font-bold text-gold uppercase tracking-widest text-[11px] mb-3">
                {PRODUCT_PRICE} · 12 months · 3 reports + PDF
              </p>
              <AnswerReadinessStrip className="[&>div]:border-white/15 [&>div]:bg-white/5 [&>div]:text-white/80 [&>div]:text-[11px] [&>div:first-child]:border-emerald-400/30 [&>div:first-child]:bg-emerald-500/10 [&>div:first-child]:text-emerald-200 [&>div:nth-child(2)]:border-emerald-400/30 [&>div:nth-child(2)]:bg-emerald-500/10 [&>div:nth-child(2)]:text-emerald-200" />
            </div>
          </div>
          <p className="text-xs text-white/40 flex items-start gap-2 justify-center text-center max-w-xl mx-auto">
            <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            {PRODUCT_NAMES.layerStandsOut} is generated separately with your consent — then included in {PRODUCT_NAMES.pdf}.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-xl mx-auto" data-reveal>
          {[
            { icon: Clock, value: "5 min", label: "First analysis", color: "text-cyan-400" },
            { icon: RefreshCw, value: "12 mo", label: "Unlimited re-runs", color: "text-violet-400" },
            { icon: Shield, value: "Private", label: "Calcs in-browser", color: "text-emerald-400" },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] py-3 px-2 text-center">
              <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
              <p className={`text-base font-bold ${color}`}>{value}</p>
              <p className="text-[10px] text-white/45 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-2xl mx-auto" data-reveal data-reveal-delay="200">
          <Button
            size="lg"
            onClick={onStartFree}
            className="flex-1 bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 font-semibold"
            data-testid="button-showcase-start"
          >
            Start free — model my figures <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <Button
            size="lg"
            onClick={onUnlock}
            className="flex-1 bg-white hover:bg-white/95 text-[#152e50] font-semibold shadow-lg"
            data-testid="button-showcase-unlock"
          >
            Unlock 3 reports — {PRODUCT_PRICE} <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={onPreviewReport}
            className="text-white/60 hover:text-white hover:bg-white/10"
            data-testid="button-showcase-preview"
          >
            <Eye className="w-4 h-4 mr-2" /> Preview sample (Reports 1 &amp; 2)
          </Button>
        </div>
        <p className="text-center text-xs text-white/35 mt-4 leading-relaxed">
          No sign-up to start · Stripe-secured payment · Illustrative modelling only
        </p>
      </div>
    </section>
  );
}
