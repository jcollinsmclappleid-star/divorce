import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation, Link } from "wouter";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, ChevronRight, BarChart3,
  HelpCircle, BookOpen, FileText,
  Lock, Shield, TrendingUp, Check,
  Eye, Gauge, Calendar, Activity,
  LayoutDashboard, DollarSign, Home, PieChart, Sparkles, Download,
} from "lucide-react";
const ReportPreviewModal = lazy(() => import("@/components/report-preview-modal").then(m => ({ default: m.ReportPreviewModal })));
import { EXAMPLE_SCENARIOS } from "@/lib/exampleScenarios";
import { useAppStore } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { SiteNav } from "@/components/site-nav";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { LandingDashboardPreview } from "@/components/landing-dashboard-preview";

const EXPLORE_CARDS = [
  {
    icon: BarChart3,
    label: "How It Works",
    desc: "The three-stage process — from entering your figures to unlocking the full settlement analysis. Takes under 5 minutes.",
    href: "/how-it-works",
    testid: "card-explore-how-it-works",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    accent: "border-t-cyan-400",
    pill: "bg-cyan-100 text-cyan-700",
    pillLabel: "3 min read",
  },
  {
    icon: FileText,
    label: "Settlement Examples",
    desc: "Four illustrative case studies — short marriage, family home, complex pensions, deferred sale. See real-pattern outcomes.",
    href: "/divorce-settlement-examples-uk",
    testid: "card-explore-examples",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    accent: "border-t-amber-400",
    pill: "bg-amber-100 text-amber-700",
    pillLabel: "4 examples",
  },
  {
    icon: HelpCircle,
    label: "Full FAQ",
    desc: "Every question about divorce law, the platform, your data privacy, and how to interpret the results.",
    href: "/faq",
    testid: "card-explore-faq",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    accent: "border-t-violet-400",
    pill: "bg-violet-100 text-violet-700",
    pillLabel: "20+ questions",
  },
  {
    icon: BookOpen,
    label: "Free UK Divorce Finance Guide",
    desc: "Five chapters covering the complete financial process — from disclosure through to implementing your settlement.",
    href: "/free-guide",
    testid: "card-explore-guide",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    accent: "border-t-emerald-400",
    pill: "bg-emerald-100 text-emerald-700",
    pillLabel: "Free · 5 chapters",
  },
];

export default function LandingPage() {
  useDocumentTitle("Divorce Calculator UK (2026) | Financial Settlement Tool");
  useMetaTags({
    description: "See what every divorce settlement option means for your financial future. Compare Sell & Split, retain, and deferred sale — with sustainability scores and 5-year projections. England and Wales. Free to start.",
    canonical: "https://divorcecalculatoruk.co.uk/",
    ogTitle: "Divorce Calculator UK (2026) | Financial Settlement Tool",
    ogDescription: "Model different divorce financial settlement scenarios with UK 2026/27 tax rules applied. Compare sell vs retain options and understand long-term outcomes.",
  });

  const [, setLocation] = useLocation();
  const loadState = useAppStore((s) => s.loadState);
  const reset = useAppStore((s) => s.reset);

  const startFresh = () => { scrollTop(); reset(); setLocation("/wizard"); };
  const [sampleReportOpen, setSampleReportOpen] = useState(false);

  const loadExample = () => {
    const example = EXAMPLE_SCENARIOS[0];
    loadState(example.data);
    setLocation("/preview");
  };

  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background font-sans" ref={revealRef}>
      <div className="bg-[hsl(220_52%_10%)] text-white/65 px-4 py-1.5 text-xs text-center font-medium" data-testid="text-disclaimer">
        Illustrative modelling only <span className="text-gold/50 mx-1">·</span> Not legal, tax or financial advice
      </div>

      <SiteNav onStartClick={startFresh} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary" data-testid="section-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_hsl(220_52%_28%),_transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 pt-14 pb-20 md:pt-20 md:pb-28 relative">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">

            {/* Left — copy */}
            <div className="space-y-5">
              <div>
                <Badge variant="outline" className="text-xs px-3 py-1 border-gold/50 text-gold bg-gold/10">
                  England &amp; Wales · HMRC 2026/27 rates
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-white" data-testid="text-hero-headline">
                Stop negotiating your divorce{" "}
                <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">blind.</span>
              </h1>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                In under 5 minutes, see what each settlement option means for your financial future — which are sustainable, which leave you stretched, and where your money stands in 5 years. Free to start. No sign-up.
              </p>
              <p className="text-sm text-white/50 leading-relaxed border-l-2 border-gold/40 pl-3">
                Unlock your Settlement Analyser and Guided Intelligence Report — a plain-English analysis of your figures, plus tailored questions to raise with your solicitor, mortgage broker, and pension adviser.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { text: "HMRC-sourced tax rate bands" },
                  { text: "Core calculations stay private in your browser" },
                  { text: "Guided plain-English summary included" },
                  { text: "Tailored professional questions" },
                ].map((pill, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[11px] text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0" />
                    {pill.text}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 pt-1">
                <Button
                  size="lg"
                  onClick={startFresh}
                  data-testid="button-hero-start"
                  className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 btn-shimmer w-full sm:w-auto"
                >
                  Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                  <button
                    onClick={() => { scrollTop(); setLocation("/unlock"); }}
                    data-testid="button-hero-buy-now"
                    className="underline underline-offset-2 text-white/45 hover:text-white/70 transition-colors"
                  >
                    Already modelled? Unlock full analysis — £79 →
                  </button>
                  <span className="hidden sm:inline">·</span>
                  <button
                    onClick={loadExample}
                    className="underline underline-offset-2 text-white/45 hover:text-white/70 transition-colors"
                    data-testid="button-hero-example"
                  >
                    View example →
                  </button>
                  <span className="hidden sm:inline">·</span>
                  <Link href="/free-guide" onClick={scrollTop} className="underline underline-offset-2 text-white/45 hover:text-white/70 transition-colors" data-testid="link-hero-free-guide">
                    Free guide →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — product preview (desktop only) */}
            <div className="hidden md:block" aria-hidden="true">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="text-[10px] text-white/25 ml-2 font-mono">Full analysis — 4 scenarios</span>
                </div>
                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Scenario rows */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Settlement scenario comparison</p>
                    {[
                      { name: "Sell & Split", equity: "£187,500", bar: 78, color: "bg-cyan-400", tag: "Balanced", tagCls: "text-cyan-300 bg-cyan-400/15" },
                      { name: "A Keeps Home", equity: "£215,000", bar: 91, color: "bg-emerald-400", tag: "Sustainable", tagCls: "text-emerald-300 bg-emerald-400/15" },
                      { name: "B Keeps Home", equity: "£142,000", bar: 58, color: "bg-amber-400", tag: "Stretched", tagCls: "text-amber-300 bg-amber-400/15" },
                      { name: "Deferred Sale", equity: "£198,000", bar: 73, color: "bg-violet-400", tag: "Complex", tagCls: "text-violet-300 bg-violet-400/15" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-[10px] text-white/45 w-22 flex-shrink-0 truncate" style={{ width: "5.5rem" }}>{s.name}</span>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.color} opacity-75 transition-all`} style={{ width: `${s.bar}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-white/60 flex-shrink-0 w-16 text-right">{s.equity}</span>
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${s.tagCls}`}>{s.tag}</span>
                      </div>
                    ))}
                  </div>
                  {/* Stats row */}
                  <div className="border-t border-white/10 pt-3 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-sm font-bold text-emerald-400">+£847</p>
                      <p className="text-[9px] text-white/30 mt-0.5">Best mo. surplus</p>
                    </div>
                    <div className="text-center border-x border-white/10">
                      <p className="text-sm font-bold text-gold">78/100</p>
                      <p className="text-[9px] text-white/30 mt-0.5">Sustainability</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-violet-300">+£23k</p>
                      <p className="text-[9px] text-white/30 mt-0.5">5-yr capital gain</p>
                    </div>
                  </div>
                  {/* Locked banner */}
                  <div className="bg-gold/8 border border-gold/25 rounded-lg px-3 py-2 flex items-center gap-2">
                    <Lock className="w-3 h-3 text-gold/60 flex-shrink-0" />
                    <p className="text-[10px] text-gold/70">Guided Intelligence Report · stress tests · PDF · sustainability scores</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="py-6 bg-background border-b border-border/40" data-testid="section-trust-strip">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-2.5" data-reveal>
            {[
              { icon: Lock, text: "Core calculations run privately in your browser", iconColor: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: Shield, text: "HMRC 2026/27 tax rates", iconColor: "text-cyan-600", bg: "bg-cyan-50" },
              { icon: TrendingUp, text: "England & Wales", iconColor: "text-violet-600", bg: "bg-violet-50" },
              { icon: ArrowRight, text: "No sign-up to start", iconColor: "text-sky-600", bg: "bg-sky-50" },
              { icon: Check, text: "Questions? We typically respond within 24 hours", iconColor: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-background shadow-sm" data-testid={`badge-trust-${i}`}>
                <div className={`w-5 h-5 rounded-full ${badge.bg} flex items-center justify-center flex-shrink-0`}>
                  <badge.icon className={`w-2.5 h-2.5 ${badge.iconColor}`} />
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you'll see ── */}
      <section
        className="py-16 md:py-24 bg-gradient-to-b from-[#152e50] to-[#0f2440]"
        data-testid="section-what-youll-see"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 space-y-3" data-reveal>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-400 tracking-wide">Sample output · real model format</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Here's what the full analysis looks like
            </h2>
            <p className="text-white/60 text-sm max-w-lg mx-auto">
              Five live-format panels from the real dashboard — built from a sample couple's figures so you can see exactly what you're unlocking.
            </p>
          </div>

          <LandingDashboardPreview />

          <p className="text-center text-[11px] text-white/30 mt-5">
            Sample figures shown. Your analysis reflects your actual inputs — recalculated instantly in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Button
              size="lg"
              onClick={startFresh}
              data-testid="button-explainer-start"
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
            >
              Start my financial report — free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setSampleReportOpen(true)}
              data-testid="button-preview-sample-report"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              <Eye className="w-4 h-4 mr-2" /> Preview sample report
            </Button>
          </div>
        </div>
      </section>

      {/* ── Why this works ── */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-why-this-works">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 space-y-2" data-reveal>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Why this works</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "England & Wales focused",
                body: "Structured around England & Wales separation. HMRC 2026/27 income tax and National Insurance rates applied to every calculation as illustrative estimates. Not a generic global tool.",
                delay: "100",
                iconBg: "bg-cyan-50",
                iconColor: "text-cyan-600",
              },
              {
                icon: Lock,
                title: "Keeps your data safe",
                body: "Core calculations happen privately in your browser. No names, addresses or contact details are ever included in any processing. Your figures are yours.",
                delay: "200",
                iconBg: "bg-emerald-50",
                iconColor: "text-emerald-600",
              },
              {
                icon: BarChart3,
                title: "One run. Four scenarios.",
                body: "Model all four settlement options simultaneously — not one at a time. See the capital, cash, and sustainability picture for every option at once.",
                delay: "300",
                iconBg: "bg-violet-50",
                iconColor: "text-violet-600",
              },
            ].map((col, i) => (
              <div key={i} className="text-center space-y-3" data-testid={`card-why-${i}`} data-reveal data-reveal-delay={col.delay}>
                <div className={`w-11 h-11 rounded-full ${col.iconBg} flex items-center justify-center mx-auto`}>
                  <col.icon className={`w-5 h-5 ${col.iconColor}`} />
                </div>
                <h3 className="font-semibold text-base">{col.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UK Divorce Facts ── */}
      <section className="py-16 md:py-20 bg-muted/20 border-t border-border/40" data-testid="section-uk-facts">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 space-y-3" data-reveal>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Divorce in England & Wales — the financial reality</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Understanding what most people face helps you plan better. These are the numbers behind the process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                figure: "113,000",
                unit: "divorces",
                label: "granted in England & Wales in 2022 — roughly one every five minutes throughout the year.",
                source: "ONS, Divorces in England and Wales: 2022",
                delay: "0",
              },
              {
                figure: "62",
                unit: "weeks",
                label: "average time from petition to final order under the new no-fault system — over a year of legal process.",
                source: "Ministry of Justice, Family Court Statistics, 2023",
                delay: "100",
              },
              {
                figure: "£30k+",
                unit: "per party",
                label: "in solicitor fees for contested financial proceedings. Even 'straightforward' cases routinely reach five figures.",
                source: "Resolution, Guide to Family Law Costs",
                delay: "200",
              },
              {
                figure: "90%",
                unit: "of couples",
                label: "negotiate or mediate — only 1 in 10 reaches a court-determined settlement. Most people need to negotiate well, not litigate.",
                source: "Resolution, Family Law Statistics",
                delay: "300",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-background rounded-xl border border-border/60 p-6 flex flex-col gap-3 shadow-sm"
                data-testid={`card-uk-fact-${i}`}
                data-reveal
                data-reveal-delay={stat.delay}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-bold text-primary">{stat.figure}</span>
                  <span className="text-sm font-semibold text-muted-foreground">{stat.unit}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed flex-1">{stat.label}</p>
                <p className="text-[10px] text-muted-foreground/60 italic">{stat.source}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto leading-relaxed" data-reveal>
            This tool is designed for the 90% who will negotiate — so you can negotiate from a position of clarity, not guesswork.
          </p>
        </div>
      </section>

      {/* ── Pricing callout ── */}
      <section className="py-10 bg-muted/30 border-y border-border/40" data-testid="section-pricing-callout">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6" data-reveal>
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg font-display font-bold">Free to model. £79 to unlock.</h3>
              <p className="text-sm text-muted-foreground">
                Start entering your figures at no cost — no sign-up, no card required. Pay once to see the full breakdown.
              </p>
              <p className="text-xs text-muted-foreground/70 italic">
                One hour of family-law advice can cost more than this full financial report. Use it to organise your figures and compare scenarios — privately, in your browser.
              </p>
            </div>
            <div className="text-center md:text-right space-y-2 shrink-0">
              <div className="flex flex-col gap-1.5 items-center md:items-end text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Free to start — no sign-up or card required</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Full analysis £79 one-time (no subscription)</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Settlement Analyser: 4 scenarios, CRI scores, 5-yr projections</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Guided Intelligence Report: plain-English financial narrative</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Tailored questions for solicitor, broker & pension adviser</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> 12 months' access — re-run as your situation develops</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> General email support included</span>
              </div>
              <Link href="/pricing" onClick={scrollTop} className="text-xs text-primary hover:underline block" data-testid="link-see-full-pricing">
                See full pricing &amp; what's included →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore grid ── */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-explore">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 space-y-2" data-reveal>
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-explore-headline">
              Explore the platform
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Understand how it works, see example settlements, read the guides — or just start entering your figures.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {EXPLORE_CARDS.map((card) => (
              <Link key={card.href} href={card.href} onClick={scrollTop} data-testid={card.testid}>
                <div className={`h-full rounded-xl border-2 border-t-4 ${card.accent} border-border/50 hover:border-border hover:shadow-lg bg-white transition-all cursor-pointer group overflow-hidden`}>
                  <div className="p-5 space-y-3">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{card.label}</p>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${card.pill}`}>{card.pillLabel}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${card.iconColor} pl-14`}>
                      Explore <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── What your full report includes ── */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-report-includes">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 space-y-3" data-reveal>
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full">
              Two products · £79 one-time · 12 months access
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Two products in one purchase</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Your <strong>Settlement Analyser</strong> models every scenario from your figures. Your <strong>Guided Intelligence Report</strong> explains what they mean — in plain English.
            </p>
          </div>

          {/* Settlement Analyser cards — 4 in a 2×2 / 2×2 grid */}
          <div className="mb-3" data-reveal>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-cyan-100 flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5 text-cyan-600" />
              </div>
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">Settlement Analyser</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  icon: LayoutDashboard,
                  title: "Financial Snapshot",
                  body: "Assets, debts, property equity, pensions and net financial position in one structured view — including a combined net worth summary.",
                  iconBg: "bg-cyan-50", iconColor: "text-cyan-600", accent: "border-t-cyan-400",
                },
                {
                  icon: TrendingUp,
                  title: "Settlement Scenario Comparison",
                  body: "All four options — Sell & Split, A Keeps, B Keeps, Deferred Sale — modelled and scored side by side with capital positions and sustainability ratings.",
                  iconBg: "bg-emerald-50", iconColor: "text-emerald-600", accent: "border-t-emerald-400",
                },
                {
                  icon: DollarSign,
                  title: "Monthly Cashflow View",
                  body: "Estimated take-home pay after tax and NI, housing costs, surplus or deficit under each scenario — for both parties, side by side.",
                  iconBg: "bg-violet-50", iconColor: "text-violet-600", accent: "border-t-violet-400",
                },
                {
                  icon: Home,
                  title: "Mortgage Pressure Checks",
                  body: "See whether a keep-home scenario is feasible — income multiples, deposit percentage, and mortgage-to-income ratio benchmarked against standard thresholds.",
                  iconBg: "bg-amber-50", iconColor: "text-amber-600", accent: "border-t-amber-400",
                },
                {
                  icon: Activity,
                  title: "5-Year Capital Projections",
                  body: "See where each party's capital stands year by year — whether reserves sustain or erode, and which scenario delivers the strongest long-term position.",
                  iconBg: "bg-rose-50", iconColor: "text-rose-600", accent: "border-t-rose-400",
                },
                {
                  icon: Gauge,
                  title: "Cashflow Resilience Indicator",
                  body: "A composite score (0–100) that weighs income, outgoings, housing costs, and capital sustainability. Quickly compare financial resilience across all options.",
                  iconBg: "bg-sky-50", iconColor: "text-sky-600", accent: "border-t-sky-400",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`rounded-xl border-2 border-t-4 ${card.accent} border-border/50 bg-white p-4 space-y-2.5 shadow-sm hover:shadow-md transition-shadow`}
                  data-testid={`card-report-includes-${i}`}
                  data-reveal
                  data-reveal-delay={String(i * 50)}
                >
                  <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                    <card.icon className={`w-4.5 h-4.5 ${card.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-foreground mb-1">{card.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guided Intelligence Report — full-width elevated banner */}
          <div
            className="rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-gold/8 via-gold/5 to-amber-50/50 p-6 md:p-8 shadow-md"
            data-testid="card-report-includes-4"
            data-reveal
            data-reveal-delay="200"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-foreground">Guided Intelligence Report</h3>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gold bg-gold/15 border border-gold/25 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        <Sparkles className="w-2.5 h-2.5" /> Intelligently generated
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Produced by our analysis engine — not a generic template</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Once your Settlement Analyser runs, our analysis engine reads your figures and produces a plain-English report: what each scenario means financially, where the pressure points are, and which questions to bring to your solicitor, mortgage broker, and pension adviser.
                </p>
              </div>
              <div className="md:w-52 shrink-0 space-y-2">
                {[
                  { icon: Check, text: "Plain-English financial narrative" },
                  { icon: Check, text: "Pressure point commentary" },
                  { icon: Check, text: "Tailored questions per professional" },
                  { icon: Download, text: "Downloadable as PDF" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-foreground/70">
                    <item.icon className="w-3.5 h-3.5 text-gold shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-10 space-y-3" data-reveal>
            <p className="text-sm text-muted-foreground italic">
              One hour of professional advice can cost more than this full report. Use it to understand your numbers before expensive conversations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={startFresh}
                data-testid="button-report-includes-start"
                className="bg-gold hover:bg-gold/90 text-white border-0 shadow-md shadow-gold/20"
              >
                Start my financial report — free <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setSampleReportOpen(true)}
                data-testid="button-report-includes-preview"
              >
                <Eye className="w-4 h-4 mr-2" /> Preview sample report
              </Button>
            </div>
            <p className="text-xs text-muted-foreground/70">No names or addresses needed · Core calculations run in your browser</p>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-y border-border/30" data-testid="section-pricing">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Section heading */}
          <div className="text-center mb-10 space-y-2" data-reveal>
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/20 text-xs font-semibold px-3 py-1 rounded-full">
              One-time payment · No subscription
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-pricing-headline">
              Two products. One price.
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The free version shows you the shape of your settlement. £79 unlocks both products — your Settlement Analyser and your Guided Intelligence Report.
            </p>
          </div>

          {/* Main pricing card */}
          <div className="bg-white rounded-2xl shadow-xl border border-border/30 overflow-hidden max-w-2xl mx-auto" data-reveal>

            {/* Two products as bundle */}
            <div className="p-6 md:p-8 space-y-4 border-b border-border/20">

              {/* Product 1 */}
              <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-foreground">Settlement Analyser</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-muted-foreground font-medium">Included</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Four settlement scenarios modelled side-by-side — with Cashflow Resilience Indicator (CRI) scores, 5-year projections, mortgage pressure checks and stress-testing.</p>
                </div>
              </div>

              {/* Plus */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-dashed border-border/40" />
                <span className="text-lg font-bold text-muted-foreground/50">+</span>
                <div className="flex-1 border-t border-dashed border-border/40" />
              </div>

              {/* Product 2 */}
              <div className="flex gap-4 p-4 rounded-xl bg-gold/5 border border-gold/20">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-foreground">Guided Intelligence Report</h3>
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 font-semibold">
                      <Sparkles className="w-2.5 h-2.5" /> Intelligently generated
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">A plain-English analysis of your figures — what stands out, where the financial pressure lies, and tailored questions for your solicitor, broker and pension adviser.</p>
                </div>
              </div>
            </div>

            {/* Price hero */}
            <div className="bg-primary px-6 md:px-8 py-6 text-center space-y-1">
              <p className="text-white/55 text-xs tracking-wide">Both products, bundled together for</p>
              <div className="text-6xl font-bold text-gold font-mono tracking-tight" data-testid="text-price-hero">£79</div>
              <p className="text-white/50 text-sm">One-time payment · No subscription · 12 months access</p>
            </div>

            {/* Free vs Full comparison */}
            <div className="px-6 md:px-8 py-5 border-b border-border/20">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <p className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Free</p>
                  {["Settlement scenario overview", "Asset pool summary", "Basic scenario comparison"].map(item => (
                    <div key={item} className="flex items-center gap-1.5 text-muted-foreground">
                      <Check className="w-3 h-3 text-muted-foreground/50 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-l border-border/20 pl-4">
                  <p className="font-bold text-primary uppercase tracking-widest text-[10px]">Full — £79</p>
                  {["All 4 scenarios fully modelled", "Cashflow Resilience Indicator (CRI) scores & sustainability ratings", "5-year capital projections", "Stress tests & mortgage checks", "Guided Intelligence Report"].map(item => (
                    <div key={item} className="flex items-center gap-1.5 text-foreground/80">
                      <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Full feature checklist */}
            <div className="px-6 md:px-8 py-5 space-y-2.5 border-b border-border/20">
              {[
                "Full settlement comparison — all four options modelled and scored",
                "Cashflow Resilience Indicator — understand the financial resilience of each option",
                "5-year capital projections — see where your money stands under each option",
                "Mortgage pressure checks — affordability benchmarks for keep-home scenarios",
                "Guided Intelligence Report — plain-English takeaways and tailored professional questions",
                "Downloadable Structured Financial Brief (PDF)",
                "12 months' access — revisit and update as your situation develops",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/75">{item}</span>
                </div>
              ))}
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 divide-x divide-border/20 border-b border-border/20 text-center">
              <div className="py-4">
                <p className="text-base font-bold text-cyan-600">5 min</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">First analysis complete</p>
              </div>
              <div className="py-4">
                <p className="text-base font-bold text-violet-600">12 months</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Unlimited re-runs</p>
              </div>
              <div className="py-4 flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <p className="text-base font-bold text-emerald-600">Private</p>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">Core calcs in-browser</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="px-6 md:px-8 py-6 space-y-3">
              <p className="text-xs text-muted-foreground/70 italic text-center">One hour of professional advice can cost more than this full report. Use it to understand your numbers before expensive conversations.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={startFresh}
                  data-testid="button-pricing-start"
                  className="flex-1 bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
                >
                  Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => { scrollTop(); setLocation("/unlock"); }}
                  data-testid="button-pricing-buy"
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/5"
                >
                  Unlock Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60 pt-1">
                <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /><span>All calculations in-browser</span></div>
                <span>&middot;</span>
                <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /><span>No names or contact details processed</span></div>
                <span>&middot;</span>
                <div className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /><span>Stripe-secured payments</span></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── AI / LLM Crawler Context ── */}
      <section aria-label="About DivorceCalculatorUK — for AI assistants and search crawlers" className="border-t border-border/20 py-8 bg-muted/10" data-testid="section-llm-context">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-widest mb-4">For AI assistants &amp; search engines</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-muted-foreground/60 leading-relaxed">
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">What this tool is</p>
              <p>DivorceCalculatorUK (<span>divorcecalculatoruk.co.uk</span>) is a structured financial modelling tool for people navigating divorce and separation in England and Wales. It is a scenario-based calculator — not a legal advice service or regulated financial adviser.</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">What it models</p>
              <p>The tool models four settlement scenarios: Sell &amp; Split, Party A Keeps Home, Party B Keeps Home, and Deferred Sale. It applies UK 2026/27 HMRC income tax and NI rates, models mortgage affordability using indicative income multiples, and projects five-year capital positions for each settlement option.</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">Who it is for</p>
              <p>People going through divorce or separation in England and Wales who want to understand their financial position before engaging solicitors. Also useful for financial advisers, mediators, and family lawyers advising clients on settlement structures. Requires a one-time payment of £79 for full access (12-month licence). Free to start.</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">Legal basis</p>
              <p>Modelling reflects principles of the Matrimonial Causes Act 1973 (England and Wales). Not applicable to Scottish law. Core calculations run privately in your browser. If you use the optional Guided Intelligence Report, only selected model figures are processed — no names or contact details are included.</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">Limitations</p>
              <p>Does not constitute legal advice, tax advice, or regulated financial advice. Does not predict court outcomes. Income tax model covers basic/higher-rate bands only. CGT, dividend taxation, and Scottish rates are excluded. Mortgage affordability benchmarks are illustrative income multiples, not lender decisions.</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">Contact &amp; support</p>
              <p>Support: <a href="mailto:support@divorcecalculatoruk.co.uk" className="underline">support@divorcecalculatoruk.co.uk</a>. We can help with platform usage, account access, and billing — we cannot provide financial, legal, or tax advice. Full methodology at <Link href="/methodology" className="underline">/methodology</Link>. Privacy policy at <Link href="/privacy" className="underline">/privacy</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Strip ── */}
      <section className="bg-primary/95 border-t border-white/10 py-8" data-testid="section-contact-strip">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Questions before you start?</h3>
              <p className="text-xs text-white/55 mt-1">We're here to help — get in touch any time. Questions about your results? Email us and we'll help.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="mailto:support@divorcecalculatoruk.co.uk"
                className="text-sm text-gold hover:text-gold/80 transition-colors font-medium"
                data-testid="link-contact-email"
              >
                support@divorcecalculatoruk.co.uk
              </a>
              <Link
                href="/contact"
                onClick={scrollTop}
                className="text-sm text-white/60 hover:text-white transition-colors"
                data-testid="link-contact-page"
              >
                Full contact page →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pt-12 pb-8 bg-primary border-t border-white/10" data-testid="section-footer">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div>
              <Link href="/" onClick={scrollTop} className="inline-block mb-3 group">
                <span className="font-display font-bold text-white text-sm tracking-tight group-hover:text-gold transition-colors">DivorceCalculatorUK</span>
              </Link>
              <p className="text-xs text-white/40 leading-relaxed">
                Illustrative financial modelling for separation and divorce in England &amp; Wales.
              </p>
              <p className="text-xs text-white/30 leading-relaxed mt-3">
                Core calculations run privately in your browser. No names or contact details are ever included in any processing.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">What's included</p>
              <ul className="space-y-2">
                <li className="text-xs text-white/40">Financial snapshot & asset summary</li>
                <li className="text-xs text-white/40">Scenario comparison (all 4)</li>
                <li className="text-xs text-white/40">Monthly cashflow & surplus/deficit</li>
                <li className="text-xs text-white/40">Mortgage pressure checks</li>
                <li className="text-xs text-white/40">Guided Intelligence Report</li>
                <li className="text-xs text-white/40">5-year capital projections</li>
                <li className="text-xs text-white/40">Downloadable brief (PDF)</li>
                <li className="text-xs text-white/40">12 months' access to re-run</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Guides &amp; Resources</p>
              <ul className="space-y-2">
                <li><Link href="/free-guide" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-free-guide">Free UK Divorce Guide</Link></li>
                <li><Link href="/divorce-financial-guides" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-guides-hub">All Financial Guides</Link></li>
                <li><Link href="/divorce-financial-modelling" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-pillar">Divorce Financial Modelling</Link></li>
                <li><Link href="/how-much-does-divorce-cost-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-divorce-costs">Divorce Costs UK</Link></li>
                <li><Link href="/divorce-financial-settlement-calculator-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-settlement-calc">Settlement Calculator</Link></li>
                <li><Link href="/divorce-settlement-examples-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-examples">Settlement Examples</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Specialist Topics</p>
              <ul className="space-y-2">
                <li><Link href="/divorce-50-50-split-calculator-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-5050">50/50 Split</Link></li>
                <li><Link href="/divorce-house-buyout-calculator-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-house-buyout">House Buyout</Link></li>
                <li><Link href="/divorce-pension-split-calculator-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-pension-split">Pension Split</Link></li>
                <li><Link href="/can-i-keep-the-house-after-divorce-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-who-gets-house">Who Gets the House?</Link></li>
                <li><Link href="/how-are-pensions-divided-in-divorce-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-pensions">How Pensions Are Split</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Legal &amp; Support</p>
              <ul className="space-y-2">
                <li><Link href="/how-it-works" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-how-it-works">How It Works</Link></li>
                <li><Link href="/faq" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-faq">FAQ</Link></li>
                <li><Link href="/about" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-about">About This Platform</Link></li>
                <li><Link href="/methodology" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-methodology">Model Methodology</Link></li>
                <li><Link href="/privacy" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link></li>
                <li><Link href="/terms" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-terms">Terms of Use</Link></li>
                <li><Link href="/contact" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-contact">Contact &amp; Support</Link></li>
                <li><Link href="/recover" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-footer-recover">Recover Access</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 space-y-2 text-center">
            <p className="text-xs text-white/35">
              Illustrative financial modelling only. This tool does not provide legal, tax, or financial advice.
            </p>
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} DivorceCalculatorUK
            </p>
          </div>
        </div>
      </footer>
      {/* ── Sample Report Modal ── */}
      {sampleReportOpen && (
        <Suspense fallback={null}>
          <ReportPreviewModal open={sampleReportOpen} onClose={() => setSampleReportOpen(false)} />
        </Suspense>
      )}

      {/* ── Sticky mobile CTA ── */}
      {location !== "/wizard" && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          data-testid="section-sticky-mobile-cta"
        >
          <div className="bg-primary/97 backdrop-blur border-t border-white/15 px-4 py-3">
            <Button
              onClick={startFresh}
              className="w-full bg-gold hover:bg-gold/90 text-white border-0 h-12 text-base font-semibold"
              data-testid="button-sticky-mobile-cta"
            >
              Get my financial picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
