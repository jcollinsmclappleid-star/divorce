import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLocation, Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight, ChevronRight, BarChart3,
  Briefcase,
  Lock, Shield, TrendingUp, Check, AlertTriangle,
  Eye, Activity,
  DollarSign, Home, Sparkles, Download,
  SearchCheck, Scale, Users,
} from "lucide-react";
const ReportPreviewModal = lazy(() => import("@/components/report-preview-modal").then(m => ({ default: m.ReportPreviewModal })));
import { EXAMPLE_SCENARIOS } from "@/lib/exampleScenarios";
import { useAppStore } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { SiteNav } from "@/components/site-nav";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { LandingCommandConsole } from "@/components/landing-command-console";
import { HeroMotifs } from "@/components/hero-motifs";
import { DemoCarousel } from "@/components/demo-dashboards";
import { AnimatedCounter } from "@/components/animated-counter";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";

const HOMEPAGE_QUESTION_CARDS = [
  {
    icon: Scale,
    question: "Is 50/50 actually fair?",
    answer: "A straight percentage can hide very different outcomes once property, pensions, debts, income and future costs are included.",
    cta: "Check a 50/50 split",
    intent: "fair_split",
  },
  {
    icon: Users,
    question: "Can I stay in the house with the children?",
    answer: "Model housing pressure, mortgage affordability, monthly costs and cash reserves so you can see whether a keep-home route looks workable.",
    cta: "Check children and housing",
    intent: "children_housing",
  },
  {
    icon: Briefcase,
    question: "What if one of us earns much less?",
    answer: "Income gaps, childcare, career breaks and future monthly costs can change whether a split is liveable in practice.",
    cta: "Check income imbalance",
    intent: "income_gap",
  },
  {
    icon: AlertTriangle,
    question: "Could debts leave me exposed?",
    answer: "Debts, loans, cards, mortgage pressure and low cash reserves can turn a settlement that looks fine on paper into a tight monthly position.",
    cta: "Check debt pressure",
    intent: "debt_pressure",
  },
  {
    icon: SearchCheck,
    question: "Is their offer actually workable?",
    answer: "Mirror the proposed split and see what it may leave each person with across capital, pensions, cashflow and affordability.",
    cta: "Check the offer",
    intent: "offer_check",
  },
];

const HOMEPAGE_FAQS = [
  {
    q: "What is a divorce settlement calculator?",
    a: "A divorce settlement calculator is a financial modelling tool that helps you compare how property, pensions, savings, debts, income and future cashflow may look under different settlement scenarios. Divorce Calculator UK provides scenario comparison and preparation support, not legal advice.",
  },
  {
    q: "Can this calculate a fair divorce settlement in the UK?",
    a: "It can help you model different financial outcomes and understand what each option may leave you with. It does not decide what is legally fair, predict what a court would order, or tell you what settlement to accept.",
  },
  {
    q: "Can I use this before speaking to a solicitor?",
    a: "Yes. Many people use the calculator privately before speaking to a solicitor, attending mediation or responding to an offer. It helps organise the numbers and identify questions worth raising with a qualified professional.",
  },
  {
    q: "Does this calculate house buyout after divorce?",
    a: "Yes. The model includes property value, mortgage balance, estimated sale costs, equity and keep-home scenarios so you can estimate buyout pressure and compare sale versus buyout outcomes.",
  },
  {
    q: "Does this work as a divorce house split calculator?",
    a: "Yes. It acts as a divorce house split calculator by modelling property equity, sale and split scenarios, keep-home scenarios, deferred sale assumptions and mortgage pressure.",
  },
  {
    q: "Does this include pensions?",
    a: "Yes. You can enter pension values using Cash Equivalent Transfer Value (CETV) figures and compare how pension split or offsetting assumptions affect the wider settlement picture.",
  },
  {
    q: "Can it show whether I can afford to keep the house?",
    a: "It can model mortgage pressure, estimated repayments, income, living costs and cash reserves under keep-home scenarios. It is not mortgage advice and does not replace a lender affordability assessment.",
  },
  {
    q: "Can it help me check a settlement offer?",
    a: "Yes. You can enter the figures behind a proposed split and compare what it leaves each person with across property, pensions, debts, monthly income and future cash reserves.",
  },
  {
    q: "Can it help me check whether 50/50 is workable?",
    a: "Yes. You can model a 50/50 split and compare it with other assumptions. The calculator shows financial outcomes under different splits, but it does not decide what is legally fair or what either person should accept.",
  },
  {
    q: "Does it consider children and housing needs?",
    a: "You can enter children, income, housing, mortgage and post-separation costs so the model can show affordability and cashflow pressure. It is a financial model only and does not replace legal advice on children or housing needs.",
  },
  {
    q: "Can it help if one person earns less or stayed at home?",
    a: "Yes. Income, expenses and maintenance assumptions feed into monthly surplus, resilience and runway outputs so you can see how an income gap affects each scenario.",
  },
  {
    q: "Does it include debts?",
    a: "Yes. You can add mortgages, credit cards, loans and other liabilities. The model shows how debts affect the asset pool, monthly pressure and settlement scenario outcomes.",
  },
  {
    q: "Can it help me protect my financial position?",
    a: "It can help you check whether important value or pressure points are being missed before you agree. It does not advise on tactics, concealment or what settlement to accept.",
  },
  {
    q: "Is this legal advice?",
    a: "No. This service provides impartial financial modelling and preparation support only. It is not legal, financial, mortgage or tax advice and does not predict court outcomes.",
  },
  {
    q: "What does the paid report include?",
    a: "The Settlement Reality Check Report includes scenario comparison, pressure points, mortgage and cashflow checks, reserve sustainability indicators, pension and debt trade-offs, a downloadable report and questions to raise before solicitor or mediation discussions.",
  },
  {
    q: "What does email support include?",
    a: "Platform and billing support is included. Optional paid report walkthrough support (£129, email only) can help you understand the calculator output and sense-check inputs after you have generated your report. It cannot provide legal, financial, mortgage or tax advice, or tell you what settlement to accept.",
  },
];

function trackHomepageEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer?.push({ event: name, ...params });
  w.gtag?.("event", name, params);
}

export default function LandingPage() {
  useDocumentTitle("Divorce Settlement Calculator UK | House, Pension & Asset Split");
  useMetaTags({
    description: "Use our UK divorce settlement calculator to model property, pensions, savings, debts, mortgage affordability and future cashflow. Free to start — unlock the Settlement Reality Check Report when you need pressure points and questions before agreeing.",
    canonical: "https://divorcecalculatoruk.co.uk/",
    ogTitle: "Divorce Settlement Calculator UK | House, Pension & Asset Split",
    ogDescription: "UK divorce settlement calculator for property, pensions, debts and cashflow. Free to start — Settlement Reality Check Report when you need a plain-English position check before agreeing.",
  });

  const [, setLocation] = useLocation();
  const loadState = useAppStore((s) => s.loadState);
  const reset = useAppStore((s) => s.reset);

  const startFresh = (intent = "start_free", eventName = "homepage_calculator_start") => {
    trackHomepageEvent(eventName, { intent });
    try {
      sessionStorage.setItem("dfm-homepage-intent", intent);
    } catch {
      // sessionStorage can be unavailable in strict privacy modes.
    }
    scrollTop();
    reset();
    setLocation("/wizard");
  };
  const [sampleReportOpen, setSampleReportOpen] = useState(false);

  const loadExample = () => {
    trackHomepageEvent("homepage_example_preview_click");
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

  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const dotY = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : 40]);
  const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const fadeUp = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: heroEase },
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.homepageFaq = "true";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HOMEPAGE_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans" ref={revealRef}>
      <ScrollProgressBar />
      <div className="bg-[hsl(220_52%_10%)] text-white/65 px-4 py-1.5 text-xs text-center font-medium" data-testid="text-disclaimer">
        Illustrative modelling only <span className="text-gold/50 mx-1">·</span> Not legal, tax or financial advice
      </div>

      <SiteNav onStartClick={() => startFresh()} />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-primary" data-testid="section-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_hsl(220_52%_28%),_transparent_70%)] pointer-events-none" />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ y: dotY }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
          </svg>
        </motion.div>
        <HeroMotifs />
        <div className="container mx-auto px-4 pt-14 pb-20 md:pt-20 md:pb-28 relative">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">

            {/* Left — copy */}
            <div className="space-y-5">
              <motion.div {...fadeUp(0)}>
                <Badge variant="outline" className="text-xs px-3 py-1 border-gold/50 text-gold bg-gold/10">
                  England &amp; Wales · HMRC 2026/27 rates
                </Badge>
              </motion.div>
              <motion.h1
                {...fadeUp(0.08)}
                className="text-4xl md:text-5xl font-display font-bold leading-tight text-white"
                data-testid="text-hero-headline"
              >
                Divorce Settlement Calculator UK: see what the split really leaves you with{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">before you agree.</span>
                  <motion.span
                    aria-hidden
                    className="absolute left-0 right-1 -bottom-0.5 h-[3px] rounded-full bg-gradient-to-r from-gold/0 via-gold to-gold-light origin-left"
                    initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: reduced ? 0 : 0.85, ease: heroEase }}
                  />
                </span>
              </motion.h1>
              <motion.p {...fadeUp(0.18)} className="text-base md:text-lg text-white/70 leading-relaxed">
                This UK divorce settlement calculator models the house, pensions, debts, mortgage pressure and monthly cashflow in under 5 minutes. See whether an offer looks workable before solicitor, mediation or settlement conversations.
              </motion.p>
              <motion.p {...fadeUp(0.28)} className="text-sm text-white/50 leading-relaxed border-l-2 border-gold/40 pl-3">
                Free to start. Unlock the £79 Settlement Reality Check Report when you want the pressure points, missing-value prompts and questions to raise before you agree.
              </motion.p>

              {/* Trust pills */}
              <motion.div
                className="flex flex-wrap gap-2 pt-1"
                initial={reduced ? false : "hidden"}
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.38 } },
                }}
              >
                {[
                  { text: "HMRC-sourced tax rate bands" },
                  { text: "Core calculations stay private in your browser" },
                  { text: "Reality Check report available" },
                  { text: "Your data is yours — we never sell or share it" },
                ].map((pill, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: heroEase } },
                    }}
                    className="flex items-center gap-1.5 text-[11px] text-white/50 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0" />
                    {pill.text}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div {...fadeUp(0.7)} className="flex flex-col gap-3 pt-1">
                <Button
                  size="lg"
                  onClick={() => startFresh()}
                  data-testid="button-hero-start"
                  className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 btn-shimmer cta-breath w-full sm:w-auto"
                >
                  Check My Settlement — Free <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => startFresh("offer_check", "homepage_offer_check_start")}
                  data-testid="button-hero-offer-check"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto"
                >
                  Check an Offer Before I Reply
                </Button>
                <p className="text-xs text-white/55" data-testid="text-hero-pricing">
                  Free to start <span className="text-white/30">·</span> Settlement Reality Check Report <span className="text-gold/90 font-medium">£79 one-off</span> <span className="text-white/30">·</span> No subscription
                </p>
                <p className="text-[11px] italic text-gold/70 leading-relaxed" data-testid="text-hero-trust">
                  We never share your details with solicitors, mortgage brokers, or anyone else. No follow-up calls. No spam. Ever.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                  <button
                    onClick={() => { trackHomepageEvent("homepage_unlock_click", { location: "hero" }); scrollTop(); setLocation("/unlock"); }}
                    data-testid="button-hero-buy-now"
                    className="underline underline-offset-2 text-white/45 hover:text-white/70 transition-colors"
                  >
                    Already modelled? Unlock now →
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
              </motion.div>
            </div>

            {/* Right — live Settlement Command Console */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: heroEase }}
              className="block"
            >
              <LandingCommandConsole />
            </motion.div>

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

      {/* ── Visual proof ── */}
      <section
        className="py-12 md:py-16 bg-gradient-to-b from-[#152e50] to-[#0f2440] overflow-hidden"
        data-testid="section-what-youll-see"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-10 items-center">
            <div className="space-y-4" data-reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Sample output · real model format
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                See the pressure before you read the report.
              </h2>
              <p className="text-white/65 text-sm md:text-base leading-relaxed">
                Start with the asset split slider, then stress housing shocks, maintenance pressure, and the 60-month cashflow heatmap — so you can see where a fair-looking offer may fail in real life.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "50/50", sub: "split slider" },
                  { label: "60 months", sub: "cashflow view" },
                  { label: "£79", sub: "full report" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-lg font-bold text-gold tabular-nums">{item.label}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">{item.sub}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={() => startFresh()}
                  data-testid="button-visual-proof-start"
                  className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
                >
                  Run this on my figures <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setSampleReportOpen(true)}
                  data-testid="button-visual-proof-preview"
                  className="border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-2" /> Preview report
                </Button>
              </div>
            </div>

            <div data-reveal>
              <DemoCarousel variant="dark" />
              <p className="text-center text-[11px] text-white/30 mt-4">
                Sample figures shown. Your analysis reflects your actual inputs — recalculated instantly in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Concern picker ── */}
      <section className="py-14 md:py-16 bg-background border-b border-border/50" data-testid="section-search-intent">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-10 items-start">
            <div className="space-y-5" data-reveal>
              <Badge variant="secondary" className="bg-gold/10 text-gold border border-gold/20">
                Choose the worry in your head
              </Badge>
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  Start with the question you need answered first.
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Most people are not looking for a spreadsheet. They want to know whether the house is realistic, whether an offer leaves them short, whether 50/50 works in practice, or what they should check before paying for advice.
                </p>
              </div>
              <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/10 to-amber-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-foreground">Free to start · £79 for the full report</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  Model your numbers for free. Unlock the Settlement Reality Check Report when you need pressure points, offer trade-offs, missing values and questions to raise before you agree.
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => startFresh("offer_check", "homepage_concern_primary_click")}
                className="bg-primary hover:bg-primary/90 text-white"
                data-testid="button-concern-primary"
              >
                Check what this offer leaves me with <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {HOMEPAGE_QUESTION_CARDS.map((card) => (
                <Card key={card.intent} className="group bg-white border-border/70 hover:border-gold/50 hover:shadow-md transition-all" data-testid={`card-homepage-question-${card.intent}`}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                        <card.icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-semibold leading-snug">{card.question}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{card.answer}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-0 text-primary hover:text-gold"
                      onClick={() => startFresh(card.intent, "homepage_question_card_click")}
                    >
                      {card.cta} <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What your full report includes ── */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-report-includes">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 space-y-3" data-reveal>
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full">
              Settlement Reality Check Report · £79 one-time · 12 months access
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">The report that shows what the settlement really leaves you with</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Your <strong>Settlement Analyser</strong> models each scenario from your figures. The <strong>Settlement Position Check</strong> then shows where a headline split may hide cashflow pressure, missing values, left-short risk and questions to raise before anyone agrees.
            </p>
          </div>

          {/* Settlement Analyser cards */}
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
                  icon: TrendingUp,
                  title: "Four Settlement Options",
                  body: "Sell & Split, A Keeps, B Keeps and Deferred Sale modelled side by side so you can see what each leaves both parties with.",
                  iconBg: "bg-emerald-50", iconColor: "text-emerald-600", accent: "border-t-emerald-400",
                },
                {
                  icon: DollarSign,
                  title: "Monthly Cashflow Pressure",
                  body: "Estimated take-home pay, housing costs, surplus or deficit, and whether cash reserves are being consumed month by month.",
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
                  title: "Reserve Runway",
                  body: "See whether capital sustains or erodes over the modelled projection period, and which party may be exposed first.",
                  iconBg: "bg-rose-50", iconColor: "text-rose-600", accent: "border-t-rose-400",
                },
                {
                  icon: Shield,
                  title: "Settlement Position Check",
                  body: "A preparation layer that flags missing values, left-short risk, debt pressure and offer trade-offs before you rely on an offer.",
                  iconBg: "bg-gold/10", iconColor: "text-gold", accent: "border-t-gold",
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

          {/* Settlement Reality Check Report — full-width elevated banner */}
          <div
            className="rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-gold/10 via-gold/5 to-amber-50/50 p-6 md:p-8 shadow-md"
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
                      <h3 className="text-base font-bold text-foreground">Settlement Reality Check Report</h3>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gold bg-gold/15 border border-gold/25 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        <Sparkles className="w-2.5 h-2.5" /> Personalised from your figures
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">A practical position-check report, not a generic template</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Once your Settlement Analyser runs, the report reads your figures and produces a plain-English position check: what each scenario leaves you with, where cashflow, housing or pension pressure appears, which values may be missing, and which questions to bring before any serious conversation.
                </p>
              </div>
              <div className="md:w-52 shrink-0 space-y-2">
                {[
                  { icon: Check, text: "Plain-English financial narrative" },
                  { icon: Check, text: "Left-short risk and pressure points" },
                  { icon: Check, text: "Missing-value and offer trade-off prompts" },
                  { icon: Download, text: "Questions before solicitor, broker or pension meetings" },
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
              One hour of professional advice can cost more than this full report. Use it to know what needs challenging before expensive conversations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => startFresh()}
                data-testid="button-report-includes-start"
                className="bg-gold hover:bg-gold/90 text-white border-0 shadow-md shadow-gold/20"
              >
                Build my report — takes 5 minutes <ArrowRight className="w-4 h-4 ml-1.5" />
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
              Settlement Reality Check Report. One price.
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The free version shows you the shape of your settlement. £79 unlocks the full analyser, pressure checks, PDF export and plain-English report that shows what may leave either party short.
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
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Four settlement scenarios modelled side-by-side — with Cashflow Resilience Indicator (CRI) scores, projection-period reserves, mortgage pressure checks and stress-testing.</p>
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
                    <h3 className="text-sm font-bold text-foreground">Settlement Reality Check Report</h3>
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 font-semibold">
                      <Sparkles className="w-2.5 h-2.5" /> Personalised
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">A plain-English position check of your figures — what stands out, where someone may be left short, what may be missing, and questions for your solicitor, mediator, broker and pension adviser.</p>
                </div>
              </div>
            </div>

            {/* Price hero — anchored against solicitor cost */}
            <div className="bg-primary px-6 md:px-8 py-7 text-center space-y-3">
              <p className="text-white/55 text-xs tracking-wide uppercase font-semibold">Both products, bundled together for</p>
              <div className="flex items-end justify-center gap-3">
                <div className="text-left">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Solicitor (indicative)</p>
                  <p className="text-2xl font-mono font-semibold text-white/35 line-through tabular-nums">£200–400<span className="text-base">/hr</span></p>
                </div>
                <div className="text-white/30 text-xl pb-1">→</div>
                <div className="text-left">
                  <p className="text-[10px] text-gold/70 uppercase tracking-wider mb-0.5 font-semibold">This report</p>
                  <AnimatedCounter
                    value={79}
                    prefix="£"
                    duration={900}
                    className="text-6xl font-bold text-gold font-mono tracking-tight leading-none block tabular-nums"
                    testId="text-price-hero"
                  />
                </div>
              </div>
              <p className="text-white/50 text-sm">One-time payment · No subscription · 12 months access</p>
              <p className="text-[11px] text-white/40 italic max-w-md mx-auto">UK family-law solicitors may charge anywhere from £200 to £400 per hour. This report could cost less than a single hour of advice — and you walk in with your numbers already structured.</p>
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
                  {["All 4 scenarios fully modelled", "Cashflow Resilience Indicator (CRI) scores & sustainability ratings", "Projection-period reserve modelling", "Stress tests & mortgage checks", "Settlement Reality Check Report"].map(item => (
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
                "Projection-period reserves — see whether capital sustains or runs down",
                "Mortgage pressure checks — affordability benchmarks for keep-home scenarios",
                "Settlement Reality Check Report — left-short risk, offer trade-offs and professional questions",
                "Downloadable Settlement Reality Check PDF",
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
              <p className="text-xs text-muted-foreground/70 italic text-center">One hour of professional advice can cost more than this full report. Use it to walk in with the pressure points already mapped.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => startFresh()}
                  data-testid="button-pricing-start"
                  className="flex-1 bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
                >
                  Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => { trackHomepageEvent("homepage_unlock_click", { location: "pricing" }); scrollTop(); setLocation("/unlock"); }}
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

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-muted/20 border-y border-border/40" data-testid="section-homepage-faq">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8 space-y-3" data-reveal>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Divorce calculator questions, answered plainly</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Clear answers for the common searches around house splits, pensions, settlement offers, affordability and what the calculator can and cannot do.
            </p>
          </div>

          <Accordion type="single" collapsible className="rounded-2xl border border-border/60 bg-white px-4 md:px-6">
            {HOMEPAGE_FAQS.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-sm md:text-base font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
              <p>The tool models four settlement scenarios: Sell &amp; Split, Party A Keeps Home, Party B Keeps Home, and Deferred Sale. It applies UK 2026/27 HMRC income tax and NI rates, models mortgage affordability using indicative income multiples, and projects reserve positions over the configured modelling period for each settlement option.</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">Who it is for</p>
              <p>People going through divorce or separation in England and Wales who want to understand their financial position before engaging solicitors. Also useful for financial advisers, mediators, and family lawyers advising clients on settlement structures. Requires a one-time payment of £79 for full access (12-month licence). Free to start.</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground/80 mb-1">Legal basis</p>
              <p>Modelling reflects general financial principles relevant to divorce in England and Wales. Not applicable to Scottish law. Core calculations run privately in your browser. If you use the optional Settlement Reality Check Report, only selected model figures are processed — no names or contact details are included.</p>
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
                <li className="text-xs text-white/40">Settlement Reality Check Report</li>
                <li className="text-xs text-white/40">Projection-period reserves</li>
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
              onClick={() => startFresh()}
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
