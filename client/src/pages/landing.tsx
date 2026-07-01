import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLocation, Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight,
  Briefcase,
  Lock, Shield, TrendingUp, Check,
  Home, SearchCheck, Scale,
  Coins, ShieldCheck, Laptop,
} from "lucide-react";
const ReportPreviewModal = lazy(() => import("@/components/report-preview-modal").then(m => ({ default: m.ReportPreviewModal })));
import { EXAMPLE_SCENARIOS } from "@/lib/exampleScenarios";
import { useAppStore } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { SiteNav } from "@/components/site-nav";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { LandingCommandConsole } from "@/components/landing-command-console";
import { DemoCarousel } from "@/components/demo-dashboards";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { FullPositionValueShowcase } from "@/components/full-position-value-showcase";
import { HomepagePlatformSection } from "@/components/homepage-platform-section";
import { HomepageReportPortfolio } from "@/components/homepage-report-portfolio";
import {
  HERO_CHIPS,
  HERO_EYEBROW,
  PRODUCT_NAMES,
  PRODUCT_PRICE,
  PRODUCT_TAGLINE,
} from "@/lib/product-copy";

const HERO_CHIP_ICONS = {
  coins: Coins,
  home: Home,
  search: SearchCheck,
  scale: Scale,
  pension: TrendingUp,
  briefcase: Briefcase,
} as const;

const HOMEPAGE_FAQS = [
  {
    q: "What is a divorce settlement calculator?",
    a: "A divorce settlement calculator is a financial modelling tool that helps you compare how property, pensions, savings, debts, income and future cashflow may look under different settlement scenarios. Divorce Calculator UK provides scenario comparison and preparation support, not legal advice.",
  },
  {
    q: "Can this calculate a fair divorce settlement in the UK?",
    a: "It can help you model different financial outcomes and understand what each option may leave you with. It does not decide what is legally fair, predict a legal outcome, or tell you what settlement to accept.",
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
    a: "Yes. You can model a 50/50 split and compare it with other assumptions. The calculator shows financial outcomes under different splits, but it does not decide what is legally fair or what either person should rely on.",
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
    a: `${PRODUCT_NAMES.fullPosition} includes scenario comparison, pressure points, ${PRODUCT_NAMES.layerBeforeAgree.toLowerCase()}, mortgage and cashflow checks, reserve sustainability indicators, pension and debt trade-offs, a downloadable report and questions to raise before solicitor or mediation discussions.`,
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
    description: `Use our UK divorce settlement calculator to model property, pensions, savings, debts, mortgage affordability and future cashflow. Free to start — unlock ${PRODUCT_NAMES.fullPosition} when you need pressure points and questions before agreeing.`,
    canonical: "https://divorcecalculatoruk.co.uk/",
    ogTitle: "Divorce Settlement Calculator UK | House, Pension & Asset Split",
    ogDescription: `UK divorce settlement calculator for property, pensions, debts and cashflow. Free to start — ${PRODUCT_NAMES.fullPosition} when you need a plain-English position check before agreeing.`,
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

  const scrollToPricing = () => {
    document.getElementById("full-position-showcase")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="min-h-screen bg-background font-sans overflow-x-hidden" ref={revealRef}>
      <ScrollProgressBar />
      <div className="bg-[hsl(220_52%_10%)] text-white/65 px-4 py-1.5 text-xs text-center font-medium" data-testid="text-disclaimer">
        England &amp; Wales <span className="text-gold/50 mx-1">·</span> HMRC 2026/27 rates{" "}
        <span className="text-gold/50 mx-1">·</span> Illustrative modelling only{" "}
        <span className="text-gold/50 mx-1">·</span> Not legal, tax or financial advice
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
        <div className="container relative z-10 mx-auto px-4 pt-14 pb-20 md:pt-20 md:pb-28">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">

            {/* Left — copy */}
            <div className="space-y-5">
              <motion.div {...fadeUp(0)}>
                <Badge variant="outline" className="text-xs px-3 py-1 border-gold/50 text-gold bg-gold/10">
                  England &amp; Wales <span className="text-gold/50 mx-1">·</span> HMRC 2026/27 rates
                </Badge>
              </motion.div>
              <motion.p {...fadeUp(0.04)} className="text-sm text-gold/90 font-medium italic">
                {HERO_EYEBROW}
              </motion.p>
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
              <motion.p {...fadeUp(0.18)} className="text-sm md:text-lg text-white/70 leading-relaxed">
                UK divorce settlement calculator that models your share across the house, pensions, debts and monthly costs — then answers the real questions in your head with three tailored reports from your figures. Private, free to start, ready in under 5 minutes — before you pay for a solicitor or accept an offer.
              </motion.p>

              {/* CTAs */}
              <motion.div {...fadeUp(0.34)} className="flex flex-col gap-3 pt-1">
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

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {HERO_CHIPS.map((chip) => {
                    const ChipIcon = HERO_CHIP_ICONS[chip.icon];
                    return (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => startFresh(chip.intent, "homepage_hero_chip_click")}
                        className="inline-flex items-center gap-1.5 text-[11px] text-white/75 bg-white/5 border border-white/15 rounded-full px-2.5 py-1 hover:bg-white/10 hover:border-gold/30 hover:text-white transition-colors"
                        data-testid={`hero-chip-${chip.intent}`}
                      >
                        <ChipIcon className="w-3 h-3 text-gold/80 shrink-0" />
                        {chip.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-sm text-white/80 font-medium leading-relaxed" data-testid="text-hero-pricing">
                  Free to start <span className="text-white/35">·</span>{" "}
                  <span className="text-gold font-semibold">{PRODUCT_NAMES.fullPosition}</span>{" "}
                  <span className="text-gold font-bold">{PRODUCT_PRICE}</span> one-off{" "}
                  <span className="text-white/35">·</span> 12 months access
                </p>
                <motion.div
                  className="flex flex-wrap gap-1.5"
                  initial={reduced ? false : "hidden"}
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                  }}
                >
                  {[
                    { icon: Laptop, text: "Core calculations stay private in your browser" },
                    { icon: ShieldCheck, text: "Your data is yours — we never sell or share it" },
                  ].map((pill, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 6 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: heroEase } },
                      }}
                      className="inline-flex items-center gap-1.5 text-[11px] text-white/55 bg-white/5 border border-white/10 rounded-full px-2.5 py-1"
                    >
                      <pill.icon className="w-3 h-3 text-gold/70 shrink-0" />
                      {pill.text}
                    </motion.span>
                  ))}
                </motion.div>
                <p className="text-sm text-gold/85 leading-relaxed max-w-md" data-testid="text-hero-trust">
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

      <HomepagePlatformSection
        onStart={() => startFresh("first_private_view", "homepage_concern_primary_click")}
        onScrollToPricing={scrollToPricing}
      />

      {/* ── Live dashboard — directly under hero ── */}
      <section
        className="py-12 md:py-14 bg-slate-50 border-b border-border/30 overflow-hidden"
        data-testid="section-what-youll-see"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-10 items-center">
            <div className="space-y-4" data-reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                Live model · sample figures
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                See where pressure appears before you agree.
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Split slider, housing shocks, maintenance pressure and 60-month cashflow — recalculated instantly from your inputs in the browser. Free to start.
              </p>
              <Button
                size="lg"
                onClick={() => startFresh()}
                data-testid="button-visual-proof-start"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Run this on my figures <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
            <div data-reveal data-reveal-delay="100">
              <div className="rounded-2xl border-2 border-slate-200/90 bg-white shadow-xl shadow-slate-900/8 overflow-hidden p-1">
                <DemoCarousel variant="light" />
              </div>
              <p className="text-center text-[11px] text-muted-foreground mt-4">
                Sample figures shown. Your analysis reflects your actual inputs.
              </p>
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
              { icon: Shield, text: "England & Wales", iconColor: "text-violet-600", bg: "bg-violet-50" },
              { icon: TrendingUp, text: "12 months access when unlocked", iconColor: "text-cyan-600", bg: "bg-cyan-50" },
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

      <HomepageReportPortfolio
        onOpenFullSample={() => setSampleReportOpen(true)}
        onScrollToPricing={scrollToPricing}
      />

      <FullPositionValueShowcase
        onStartFree={() => startFresh("fair_split", "homepage_showcase_start")}
        onPreviewReport={() => setSampleReportOpen(true)}
        onUnlock={() => { trackHomepageEvent("homepage_unlock_click", { location: "showcase" }); scrollTop(); setLocation("/unlock"); }}
      />

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
