import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAccess, useSessionToken } from "@/hooks/use-access";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle, Loader2, Shield, Lock, Zap, ArrowRight,
  BarChart3, TrendingUp, FileText, Sparkles, HelpCircle,
  ChevronRight, Calendar, RefreshCw,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { SiteNav } from "@/components/site-nav";
import { useNoIndex } from "@/hooks/use-noindex";

const ANALYSER_FEATURES = [
  {
    icon: BarChart3,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
    title: "Four scenarios, one view",
    desc: "Sell & Split, A Keeps Home, B Keeps Home, and Deferred Sale — all modelled and scored side-by-side.",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
    title: "5-year capital projections",
    desc: "See how your capital position evolves under each scenario, with Cashflow Resilience Indicator scores and sustainability ratings.",
  },
  {
    icon: RefreshCw,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    title: "Sensitivity & stress-testing",
    desc: "Adjust interest rate assumptions and re-run instantly. See which scenarios hold up and which are fragile.",
  },
  {
    icon: FileText,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Downloadable Structured Financial Brief",
    desc: "A print-ready PDF summarising your full analysis — useful for professional meetings and keeping your own records.",
  },
];

const REPORT_FEATURES = [
  {
    icon: Sparkles,
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
    title: "Intelligently generated narrative",
    desc: "Your figures run through our analysis engine and come back as a plain-English commentary — what stands out, where the financial pressure points are, and what to watch out for.",
  },
  {
    icon: HelpCircle,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
    title: "Tailored professional questions",
    desc: "Bespoke questions to raise with your solicitor, mortgage broker, and pension adviser — produced from your specific numbers so you walk into every consultation prepared.",
  },
];

const STEPS = [
  { n: "1", label: "Pay once — £79", sub: "Stripe-secured. Instant." },
  { n: "2", label: "Unlock your Settlement Analyser", sub: "All four scenarios. Access immediately." },
  { n: "3", label: "Generate your Guided Intelligence Report", sub: "Intelligently produced from your figures." },
];

const FAQ_ITEMS = [
  {
    question: "What happens after I pay?",
    answer: "You get immediate access to both products — the Settlement Analyser (all four scenarios, 5-year projections, sustainability scores, stress-testing) and the Guided Intelligence Report. Your access lasts 12 months.",
  },
  {
    question: "Is my data safe?",
    answer: "Core financial calculations run entirely in your browser. When you choose to generate the Guided Intelligence Report, only anonymous model figures are sent to our analysis engine — no names, addresses, or contact details are ever included.",
  },
  {
    question: "Can I update my figures later?",
    answer: "Yes. During your 12-month access period you can update your inputs and re-run the full analysis as many times as you need. The model re-calculates instantly.",
  },
  {
    question: "How does this compare to a professional consultation?",
    answer: "A single hour with a solicitor typically costs £250–£400. This gives you structured, quantified financial modelling for £79 — so you walk into professional consultations with your figures already clear.",
  },
];

// Last day of current month — factually accurate offer window
function getPromoExpiry() {
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return last.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function UnlockPage() {
  useDocumentTitle("Unlock Full Analysis | DivorceCalculatorUK");
  useNoIndex();
  const [, navigate] = useLocation();
  const sessionToken = useSessionToken();
  const { hasAccess, isLoading } = useAccess();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const promoExpiry = getPromoExpiry();

  useEffect(() => {
    if (!isLoading && hasAccess) navigate("/results");
  }, [hasAccess, isLoading, navigate]);

  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout failed:", data.message || "Unknown error");
        alert("Payment page failed to load. Please try again.");
        setCheckoutLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("An error occurred. Please try again.");
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary" data-testid="section-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_hsl(220_52%_28%),_transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="unlock-dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#unlock-dot-grid)" />
          </svg>
        </div>
        <div className="relative container mx-auto px-4 py-12 md:py-16 max-w-4xl text-center space-y-5">
          <Badge variant="outline" className="text-xs px-3 py-1 border-gold/50 text-gold bg-gold/10">
            Your figures are entered · Both products unlock instantly
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight" data-testid="text-hero-headline">
            Your financial picture is<br />
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">ready to unlock.</span>
          </h1>
          <p className="text-white/65 max-w-xl mx-auto text-sm leading-relaxed">
            One payment unlocks two products: your <span className="text-white/85 font-medium">Settlement Analyser</span> — four scenarios modelled side-by-side with 5-year projections — and your <span className="text-white/85 font-medium">Guided Intelligence Report</span>, intelligently produced from your figures in plain English.
          </p>

          {/* 3-step timeline */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-0 mt-6">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-sm font-bold">
                    {step.n}
                  </div>
                  <p className="text-white/90 text-xs font-semibold whitespace-nowrap">{step.label}</p>
                  <p className="text-white/45 text-[10px] whitespace-nowrap">{step.sub}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-white/20 hidden sm:block shrink-0" />
                )}
              </div>
            ))}
          </div>

          <Button
            size="lg"
            onClick={handleCheckout}
            disabled={checkoutLoading}
            data-testid="button-checkout-hero"
            className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 text-base font-semibold mt-2"
          >
            {checkoutLoading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Redirecting to payment...</>
            ) : (
              <>Unlock Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" /></>
            )}
          </Button>
          <p className="text-white/35 text-xs">
            One-time payment · 12 months access · Secured by Stripe
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-14">

        {/* ── What you unlock ── */}
        <section data-testid="section-value-proposition" className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl md:text-2xl font-display font-bold">Two products. One £79 payment.</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">Unlock both instantly and revisit for 12 months — no subscription.</p>
          </div>

          {/* Product 1: Settlement Analyser */}
          <div className="rounded-2xl border border-border/60 bg-muted/10 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40 bg-muted/20">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4 text-cyan-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Settlement Analyser</p>
                <p className="text-[11px] text-muted-foreground">Financial modelling engine — all four settlement scenarios</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 p-4">
              {ANALYSER_FEATURES.map((f, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl border border-border/40 bg-background" data-testid={`card-analyser-${i}`}>
                  <div className={`w-8 h-8 rounded-lg ${f.iconBg} flex items-center justify-center shrink-0`}>
                    <f.icon className={`w-4 h-4 ${f.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-foreground leading-snug">{f.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plus connector */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-dashed border-border/50" />
            <span className="text-2xl font-bold text-muted-foreground/40">+</span>
            <div className="flex-1 border-t border-dashed border-border/50" />
          </div>

          {/* Product 2: Guided Intelligence Report */}
          <div className="rounded-2xl border border-gold/30 bg-gold/5 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gold/20 bg-gold/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Guided Intelligence Report</p>
                  <p className="text-[11px] text-muted-foreground">Intelligently produced from your figures by our analysis engine</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gold bg-gold/15 border border-gold/30 px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                <Sparkles className="w-2.5 h-2.5" /> Included
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 p-4">
              {REPORT_FEATURES.map((f, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl border border-gold/20 bg-white/60" data-testid={`card-report-${i}`}>
                  <div className={`w-8 h-8 rounded-lg ${f.iconBg} flex items-center justify-center shrink-0`}>
                    <f.icon className={`w-4 h-4 ${f.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-foreground leading-snug">{f.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing card ── */}
        <section data-testid="section-pricing" className="max-w-md mx-auto">
          <div className="rounded-2xl bg-primary border border-white/10 shadow-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-4 text-center border-b border-white/10 space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-gold/15 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full" data-testid="badge-access-duration">
                <Calendar className="w-3 h-3" /> Twelve Months · Unlimited Access
              </div>
              <div className="text-5xl font-bold tracking-tight text-gold pt-1 font-mono" data-testid="text-price">£79</div>
              <div className="text-sm text-white/55">One-time payment. No subscription.</div>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Stat strip — no "100%" */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/5 rounded-xl py-3">
                  <p className="text-sm font-bold text-white">4 scenarios</p>
                  <p className="text-[10px] text-white/45 mt-0.5">All modelled simultaneously</p>
                </div>
                <div className="bg-white/5 rounded-xl py-3 flex flex-col items-center justify-center gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <p className="text-sm font-bold text-white">Private & Secure</p>
                  </div>
                  <p className="text-[10px] text-white/45">Core calculations in-browser</p>
                </div>
              </div>

              {/* Promo code offer */}
              <div className="rounded-xl bg-amber-950/40 border border-amber-500/30 px-4 py-3 text-center space-y-0.5">
                <p className="text-[10px] text-amber-400/70 uppercase tracking-widest font-semibold">This month only — valid until {promoExpiry}</p>
                <p className="text-2xl font-black tracking-[0.2em] text-amber-300">CLARITY15</p>
                <p className="text-xs text-white/50">Enter at checkout for <span className="text-white/80 font-semibold">15% off</span> — £79 becomes £67.15</p>
              </div>

              <Button
                className="w-full bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/30 text-base font-semibold"
                size="lg"
                onClick={handleCheckout}
                disabled={checkoutLoading}
                data-testid="button-checkout"
              >
                {checkoutLoading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Redirecting to payment...</>
                ) : (
                  "Unlock Full Analysis — £79"
                )}
              </Button>

              {/* Trust strip directly under pay button */}
              <div className="flex items-center justify-center gap-3 text-[10px] text-white/55 font-medium">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> Stripe-secured</span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-gold" /> Instant access</span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-cyan-400" /> 12 months</span>
              </div>

              <p className="text-center text-xs text-white/40 italic">
                A single solicitor hour costs £250–£400. This covers your entire financial picture.
              </p>

              <div className="flex items-center justify-center gap-1.5 text-xs text-white/50">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Platform or billing questions? Email <a href="mailto:support@divorcecalculatoruk.co.uk" className="underline">support@divorcecalculatoruk.co.uk</a> — general support only</span>
              </div>

              <p className="text-xs text-white/40 text-center flex items-center justify-center gap-1.5">
                <Zap className="w-3 h-3" /> Secured by Stripe · Instant access after payment
              </p>

              <div className="text-xs text-white/35 text-center space-y-1 border-t border-white/10 pt-3">
                <p>Illustrative modelling only. Not legal or financial advice. See <Link href="/terms" className="underline text-white/55 hover:text-white transition-colors" data-testid="link-refund-terms">Terms</Link>.</p>
                <p>
                  Already purchased? <Link href="/recover" className="underline text-white/55 hover:text-white transition-colors" data-testid="link-recover">Recover your access</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust signals ── */}
        <section className="py-4 border-y border-border/40" data-testid="section-trust-signals">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { icon: Lock, text: "Core calculations run in your browser — no financial data on our servers" },
              { icon: Shield, text: "UK 2026/27 HMRC income tax & NI rates applied" },
              { icon: Zap, text: "Instant access after payment" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2" data-testid={`text-trust-signal-${i}`}>
                <s.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">{s.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-lg mx-auto space-y-4" data-testid="section-faq">
          <h2 className="text-xl font-display font-bold text-center">Common questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left" data-testid={`button-faq-${i}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-faq-answer-${i}`}>
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="text-center space-y-4 pb-6" data-testid="section-reinforcement">
          <h2 className="text-lg font-display font-bold">Ready to see your full picture?</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Your figures are saved. Unlock your Settlement Analyser and Guided Intelligence Report now — both ready in seconds.
          </p>
          <Button
            size="lg"
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="bg-gold hover:bg-gold/90 text-white border-0"
            data-testid="button-checkout-secondary"
          >
            {checkoutLoading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Redirecting to payment...</>
            ) : (
              <>Unlock Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" /></>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">England & Wales · Illustrative modelling only · Not legal or financial advice</p>
        </section>

      </main>

      <footer className="border-t py-6">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            This tool provides illustrative, scenario-based financial modelling only. It does not provide legal, tax, or financial advice. No advisory relationship is created.
          </p>
        </div>
      </footer>
    </div>
  );
}
