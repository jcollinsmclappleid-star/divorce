import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, Shield, Lock, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { SiteNav } from "@/components/site-nav";
import { scrollTop } from "@/lib/utils";

const FREE_FEATURES = [
  { label: "Run the full financial model", included: true },
  { label: "Asset pool ring chart (real figures)", included: true },
  { label: "Scenario names visible", included: true },
  { label: "Combined pool value", included: true },
  { label: "Scenario capital breakdowns", included: false },
  { label: "Financial Sustainability Index score", included: false },
  { label: "5-year sustainability projections", included: false },
  { label: "Monthly cash position per scenario", included: false },
  { label: "Sensitivity & stress-test analysis", included: false },
  { label: "Downloadable Structured Financial Brief", included: false },
  { label: "12 months unlimited re-runs", included: false },
];

const PAID_FEATURES = [
  { label: "Run the full financial model", included: true },
  { label: "Asset pool ring chart (real figures)", included: true },
  { label: "Scenario names visible", included: true },
  { label: "Combined pool value", included: true },
  { label: "Scenario capital breakdowns", included: true },
  { label: "Financial Sustainability Index score", included: true },
  { label: "5-year sustainability projections", included: true },
  { label: "Monthly cash position per scenario", included: true },
  { label: "Sensitivity & stress-test analysis", included: true },
  { label: "Downloadable Structured Financial Brief", included: true },
  { label: "12 months unlimited re-runs", included: true },
];

const FAQ_ITEMS = [
  {
    q: "Is this a one-time payment or a subscription?",
    a: "One-time payment of £79. No subscription, no renewal, no hidden fees. Your access is valid for 12 months from the date of purchase.",
  },
  {
    q: "What if my figures change after I pay?",
    a: "You can update your inputs and re-run the analysis as many times as you need within your 12-month access period. The model re-calculates instantly.",
  },
  {
    q: "What if I have questions about my results?",
    a: "Email support@divorcecalculatoruk.co.uk within 7 days of purchase and we'll help you understand your analysis and get the most from it. For technical access issues, contact the same address and we'll resolve them promptly.",
  },
];

export default function PricingPage() {
  useDocumentTitle("Pricing | DivorceCalculatorUK — £79 One-Time");
  useMetaTags({
    description: "DivorceCalculatorUK pricing. One-time £79 payment for 12-month access to the full divorce financial analysis — scenario comparisons, 5-year projections, FSI score, and downloadable brief.",
    canonical: "https://divorcecalculatoruk.co.uk/pricing",
  });
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">

        {/* Hero */}
        <section className="text-center space-y-4" data-testid="section-pricing-hero">
          <Badge variant="outline" className="text-xs px-3 py-1 border-primary/30 text-primary">
            No subscription · No sign-up required
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight" data-testid="text-pricing-title">
            Free to model. £79 to unlock.
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Start entering your figures for free — no sign-up, no commitment. Pay once when you're ready to see the full analysis.
          </p>
        </section>

        {/* Feature comparison table */}
        <section data-testid="section-feature-table">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                  <th className="py-4 px-4 text-center font-semibold text-muted-foreground">Free preview</th>
                  <th className="py-4 px-4 text-center font-semibold text-primary bg-primary/5">Full access · £79</th>
                </tr>
              </thead>
              <tbody>
                {FREE_FEATURES.map((f, i) => (
                  <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                    <td className="py-3 px-6 text-foreground">{f.label}</td>
                    <td className="py-3 px-4 text-center">
                      {f.included
                        ? <Check className="w-4 h-4 text-green-500 mx-auto" />
                        : <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />}
                    </td>
                    <td className="py-3 px-4 text-center bg-primary/[0.02]">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing card + trust signals */}
        <section className="grid md:grid-cols-2 gap-10 items-start" data-testid="section-pricing-card">
          <div className="space-y-5">
            <h2 className="text-xl font-display font-bold">What you get for £79</h2>
            <ul className="space-y-3">
              {[
                "All four settlement scenarios compared side-by-side",
                "Financial Sustainability Index score with driver breakdown",
                "5-year capital depletion & sustainability projections",
                "Monthly cash position (surplus/deficit) per scenario",
                "Sensitivity analysis — which assumptions matter most",
                "Stress-test modelling for interest rate changes",
                "Downloadable Structured Financial Brief (print-ready)",
                "12 months unlimited access — update figures any time",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" data-testid={`text-paid-feature-${i}`}>
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-primary border border-white/10 shadow-2xl overflow-hidden" data-testid="section-payment-card">
            <div className="px-6 pt-6 pb-4 text-center border-b border-white/10 space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-gold/15 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full">
                One-time payment · 12 months access
              </div>
              <div className="text-5xl font-bold tracking-tight text-gold pt-1 font-mono" data-testid="text-price-display">£79</div>
              <div className="text-sm text-white/55">No subscription. No renewal.</div>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/5 rounded-lg py-2.5">
                  <p className="text-sm font-bold text-white">15 min</p>
                  <p className="text-[10px] text-white/45 mt-0.5">To model</p>
                </div>
                <div className="bg-white/5 rounded-lg py-2.5">
                  <p className="text-sm font-bold text-white">4</p>
                  <p className="text-[10px] text-white/45 mt-0.5">Scenarios</p>
                </div>
                <div className="bg-white/5 rounded-lg py-2.5">
                  <p className="text-sm font-bold text-white">100%</p>
                  <p className="text-[10px] text-white/45 mt-0.5">Private</p>
                </div>
              </div>

              <Button
                className="w-full bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/30 text-base font-semibold"
                size="lg"
                onClick={() => { scrollTop(); setLocation("/wizard"); }}
                data-testid="button-start-free"
              >
                Start free — no sign-up
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <div className="flex flex-col items-center gap-1 text-xs text-white/50">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Questions about your results?</span>
                </div>
                <span className="text-white/40">Email <a href="mailto:support@divorcecalculatoruk.co.uk" className="underline hover:text-white/60 transition-colors">support@divorcecalculatoruk.co.uk</a> — we'll help within 7 days</span>
              </div>

              <p className="text-xs text-white/40 text-center">
                Secured by Stripe · Payment required to unlock full access
              </p>
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="border-y py-6" data-testid="section-trust">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { icon: Lock, text: "Browser-only calculations — zero data on our servers" },
              { icon: Shield, text: "UK 2026/27 HMRC tax rates" },
              { icon: Zap, text: "Instant access after payment" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2" data-testid={`text-trust-${i}`}>
                <s.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">{s.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto space-y-4" data-testid="section-faq">
          <h2 className="text-xl font-display font-bold text-center">Common questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left" data-testid={`button-faq-${i}`}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-faq-${i}`}>
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-xs text-muted-foreground text-center pt-2">
            More questions? See our <Link href="/refund-policy" className="underline text-primary hover:text-primary/80" data-testid="link-refund-policy">Refund Policy</Link> or <Link href="/contact" className="underline text-primary hover:text-primary/80" data-testid="link-contact">contact support</Link>.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="text-center space-y-4 pb-8" data-testid="section-bottom-cta">
          <h2 className="text-xl font-display font-bold">Ready to see your financial picture?</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Start modelling for free — no sign-up, no commitment. Unlock the full analysis when you're ready.
          </p>
          <Button
            size="lg"
            className="bg-gold hover:bg-gold/90 text-white border-0"
            onClick={() => { scrollTop(); setLocation("/wizard"); }}
            data-testid="button-bottom-start"
          >
            Start free — no sign-up
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <p className="text-xs text-muted-foreground">
            England & Wales · Illustrative modelling only · Not legal or financial advice
          </p>
        </section>

      </main>
    </div>
  );
}
