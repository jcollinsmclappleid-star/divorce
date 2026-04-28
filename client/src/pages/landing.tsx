import { useEffect, useState } from "react";
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
} from "lucide-react";
import { EXAMPLE_SCENARIOS } from "@/lib/exampleScenarios";
import { useAppStore } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { SiteNav } from "@/components/site-nav";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const EXPLORE_CARDS = [
  {
    icon: BarChart3,
    label: "How It Works",
    desc: "The three-stage process — from entering your figures to unlocking the full settlement analysis. See the 9 wizard steps mapped out.",
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
        <div className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline" className="text-xs px-3 py-1 border-gold/50 text-gold bg-gold/10">
                UK 2026/27 Tax &amp; NI Rates
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-white" data-testid="text-hero-headline">
              Stop negotiating your divorce{" "}
              <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">blind.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              In 20 minutes, see exactly what each settlement option means for your financial future — which ones are sustainable, which leave you stretched, and what your money looks like in five years under each. Free to start. No sign-up.
            </p>
            <p className="text-sm text-white/50 leading-relaxed border-l-2 border-gold/40 pl-3 text-left">
              If you're here, you're probably trying to make sense of a situation that feels financially overwhelming. You're not sure what you're entitled to, you're worried about the house, and you don't know whether you can afford to keep it. That's exactly what this is for.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
              <Button
                size="lg"
                onClick={startFresh}
                data-testid="button-hero-start"
                className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 btn-shimmer"
              >
                Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => { scrollTop(); setLocation("/unlock"); }}
                data-testid="button-hero-buy-now"
                className="border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                Unlock My Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40 pt-1">
              <span>Private. All calculations run in your browser.</span>
              <span>·</span>
              <button
                onClick={loadExample}
                className="underline underline-offset-2 text-white/55 hover:text-white transition-colors"
                data-testid="button-hero-example"
              >
                View example →
              </button>
              <span>·</span>
              <Link href="/free-guide" onClick={scrollTop} className="underline underline-offset-2 text-white/55 hover:text-white transition-colors" data-testid="link-hero-free-guide">
                Free guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="py-6 bg-background border-b border-border/40" data-testid="section-trust-strip">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-2.5" data-reveal>
            {[
              { icon: Lock, text: "Runs in your browser — we never see your data", iconColor: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: Shield, text: "HMRC 2026/27 tax rates", iconColor: "text-cyan-600", bg: "bg-cyan-50" },
              { icon: TrendingUp, text: "England & Wales", iconColor: "text-violet-600", bg: "bg-violet-50" },
              { icon: ArrowRight, text: "No sign-up to start", iconColor: "text-sky-600", bg: "bg-sky-50" },
              { icon: Check, text: "7-day money-back guarantee", iconColor: "text-emerald-600", bg: "bg-emerald-50" },
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
      <section className="py-16 md:py-20 bg-primary" data-testid="section-what-youll-see">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 space-y-3" data-reveal>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">What you'll see in the full analysis</h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto">
              Four real analytical outputs — not estimates or averages, but your specific figures modelled under each settlement option.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: BarChart3,
                title: "Scenario comparison",
                desc: "Sell & Split · Keep the Home · Deferred Sale · Equalise Pensions — all four side-by-side",
                accentColor: "#06B6D4",
                iconColor: "text-cyan-400",
                barColor: "bg-cyan-400/50",
                preview: (
                  <div className="space-y-1.5 mt-2">
                    {["Sell & Split", "A Keeps Home", "B Keeps Home", "Deferred"].map((s, j) => (
                      <div key={j} className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-white/50">{s}</span>
                        <div className="h-1.5 rounded-full bg-cyan-400/40" style={{ width: `${[85, 72, 65, 78][j]}%` }} />
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                icon: Activity,
                title: "Monthly cash position",
                desc: "Post-settlement surplus or deficit each month — which scenario is actually liveable",
                accentColor: "#10B981",
                iconColor: "text-emerald-400",
                preview: (
                  <div className="mt-2 bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-white/40 mb-1">Monthly surplus after costs</p>
                    <p className="text-lg font-mono font-bold text-emerald-400">+£847</p>
                    <p className="text-[10px] text-white/30">Scenario 1 · Party A</p>
                  </div>
                ),
              },
              {
                icon: Calendar,
                title: "5-year projections",
                desc: "See how capital positions evolve over five years under static assumptions",
                accentColor: "#8B5CF6",
                iconColor: "text-violet-400",
                preview: (
                  <div className="mt-2 flex items-end gap-1 h-10">
                    {[40, 55, 48, 62, 70].map((h, j) => (
                      <div key={j} className="flex-1 rounded-t-sm bg-violet-400/50" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                ),
              },
              {
                icon: Gauge,
                title: "Financial Sustainability Index",
                desc: "A composite resilience score showing how stable each scenario is for each party",
                accentColor: "#F43F5E",
                iconColor: "text-rose-400",
                preview: (
                  <div className="mt-2 flex items-center justify-center">
                    <div className="relative w-16 h-8 overflow-hidden">
                      <div className="absolute inset-0 rounded-t-full border-4 border-white/10" />
                      <div className="absolute inset-0 rounded-t-full border-4 border-rose-400/60" style={{ clipPath: "inset(0 40% 0 0)" }} />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/70 origin-bottom rotate-[-30deg]" />
                    </div>
                    <p className="text-[10px] text-white/40 ml-2">72 / 100</p>
                  </div>
                ),
              },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 overflow-hidden relative" data-testid={`card-output-${i}`}>
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: card.accentColor }} />
                <div className="flex items-center gap-2 mb-2 mt-1">
                  <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                  <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">{card.desc}</p>
                {card.preview}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              onClick={startFresh}
              data-testid="button-explainer-start"
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
            >
              Start your financial model — free <ArrowRight className="w-4 h-4 ml-1.5" />
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
                title: "Built on UK law",
                body: "England & Wales jurisdiction throughout. HMRC 2026/27 income tax and National Insurance rates applied to every calculation. Not a generic global tool.",
                delay: "100",
                iconBg: "bg-cyan-50",
                iconColor: "text-cyan-600",
              },
              {
                icon: Lock,
                title: "Completely private",
                body: "All calculations happen in your browser. Your financial figures are never sent to, or stored on, our servers. We have no access to what you enter.",
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

      {/* ── Pricing callout ── */}
      <section className="py-10 bg-muted/30 border-y border-border/40" data-testid="section-pricing-callout">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6" data-reveal>
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg font-display font-bold">Free to model. £79 to unlock.</h3>
              <p className="text-sm text-muted-foreground">
                Start entering your figures at no cost — no sign-up, no card required. Pay once to see the full breakdown.
              </p>
            </div>
            <div className="text-center md:text-right space-y-2 shrink-0">
              <div className="flex flex-wrap gap-2 justify-center md:justify-end text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Free preview included</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Full analysis £79 one-time</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> 7-day guarantee</span>
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

      {/* ── Pricing ── */}
      <section className="py-16 md:py-20 bg-primary" data-testid="section-pricing">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full">
            One-time payment · No subscription
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white" data-testid="text-pricing-headline">
            The full picture. <span className="text-gold">&pound;79</span>. Yours for 12 months.
          </h2>
          <p className="text-white/65 leading-relaxed">
            The free version shows you the shape of your settlement. The full analysis shows you whether you can live on it. Twelve months of unlimited re-runs — so you can revisit as your situation develops.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center max-w-md mx-auto py-6 border-y border-white/10">
            <div>
              <p className="text-2xl font-bold text-cyan-400">20 min</p>
              <p className="text-xs text-white/55 mt-1">First analysis complete</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-violet-400">12 months</p>
              <p className="text-xs text-white/55 mt-1">Unlimited re-runs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">100%</p>
              <p className="text-xs text-white/55 mt-1">Private &amp; secure</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              "Full settlement comparison — all four options scored and ranked",
              "Financial Sustainability Indicator — know which option is genuinely viable",
              "5-year capital projections — see where your money stands under each option",
              "Stress testing — what happens if interest rates rise or income changes",
              "Downloadable Structured Financial Brief (PDF)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 justify-center text-left">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-white/75">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              onClick={startFresh}
              data-testid="button-pricing-start"
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { scrollTop(); setLocation("/unlock"); }}
              data-testid="button-pricing-buy"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              Unlock My Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40 pt-2">
            <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /><span>All calculations in-browser</span></div>
            <span>&middot;</span>
            <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /><span>No data stored on servers</span></div>
            <span>&middot;</span>
            <div className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /><span>Stripe-secured payments</span></div>
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
              <p>Modelling reflects principles of the Matrimonial Causes Act 1973 (England and Wales). Not applicable to Scottish law. All calculations run client-side in the browser — no financial data is stored on servers.</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">Limitations</p>
              <p>Does not constitute legal advice, tax advice, or regulated financial advice. Does not predict court outcomes. Income tax model covers basic/higher-rate bands only. CGT, dividend taxation, and Scottish rates are excluded. Mortgage affordability benchmarks are illustrative income multiples, not lender decisions.</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">Contact &amp; support</p>
              <p>Support: <a href="mailto:support@divorcecalculatoruk.co.uk" className="underline">support@divorcecalculatoruk.co.uk</a>. 7-day money-back guarantee on all purchases. Full methodology available at <Link href="/methodology" className="underline">/methodology</Link>. Privacy policy at <Link href="/privacy" className="underline">/privacy</Link>.</p>
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
              <p className="text-xs text-white/55 mt-1">We're here to help — get in touch any time. <span className="text-gold/70">7-day money-back guarantee on all purchases.</span></p>
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
                All calculations run privately in your browser. We never store your financial data on our servers.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">What's included</p>
              <ul className="space-y-2">
                <li className="text-xs text-white/40">Scenario comparison (all 4)</li>
                <li className="text-xs text-white/40">Financial Sustainability Index</li>
                <li className="text-xs text-white/40">5-year capital projections</li>
                <li className="text-xs text-white/40">Monthly cash position</li>
                <li className="text-xs text-white/40">Sensitivity analysis</li>
                <li className="text-xs text-white/40">Downloadable brief (PDF)</li>
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
