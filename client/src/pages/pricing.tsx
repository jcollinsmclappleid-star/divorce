import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Check, X, Shield, Lock, Zap, ArrowRight,
  BarChart3, Sparkles, TrendingUp,
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { SiteNav } from "@/components/site-nav";
import { scrollTop } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-store";

const COMPARISON_ROWS = [
  { label: "Run the full financial model", group: "analyser", free: true },
  { label: "Asset pool ring chart (real figures)", group: "analyser", free: true },
  { label: "Scenario names & combined pool value", group: "analyser", free: true },
  { label: "Scenario capital breakdowns", group: "analyser", free: false },
  { label: "Cashflow Resilience Indicator (CRI) score per scenario", group: "analyser", free: false },
  { label: "5-year capital sustainability projections", group: "analyser", free: false },
  { label: "Monthly cash position (surplus/deficit) per scenario", group: "analyser", free: false },
  { label: "Sensitivity & stress-test analysis", group: "analyser", free: false },
  { label: "Guided Intelligence Report — plain-English analysis", group: "report", free: false },
  { label: "Tailored questions for your solicitor, broker & pension adviser", group: "report", free: false },
  { label: "Downloadable Structured Financial Brief (PDF)", group: "report", free: false },
  { label: "12 months unlimited re-runs", group: "access", free: false },
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
    a: "Email support@divorcecalculatoruk.co.uk and we can help with how the platform works, understanding what the figures on screen mean, account access, and billing. We cannot provide financial, legal, or tax advice — for that, you'll need a qualified solicitor or regulated financial adviser.",
  },
];

export default function PricingPage() {
  useDocumentTitle("Pricing — £79 One-Time | DivorceCalculatorUK");
  useMetaTags({
    description: "One-time £79 for 12-month access to full divorce settlement analysis — Settlement Analyser and Guided Intelligence Report. England and Wales.",
    canonical: "https://divorcecalculatoruk.co.uk/pricing",
    ogTitle: "Divorce Calculator UK Pricing — £79 One-Time",
    ogDescription: "Full settlement analysis for £79. Two products: Settlement Analyser and Guided Intelligence Report. England and Wales.",
    ogUrl: "https://divorcecalculatoruk.co.uk/pricing",
    ogType: "website",
  });
  const [, setLocation] = useLocation();
  const { startFresh } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">

        {/* Hero */}
        <section className="text-center space-y-4" data-testid="section-pricing-hero">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/20 text-xs font-semibold px-3 py-1 rounded-full">
            One-time payment · No subscription
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight" data-testid="text-pricing-title">
            Two products. One price.
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Free to start — no sign-up. £79 unlocks both your <strong>Settlement Analyser</strong> and your <strong>Guided Intelligence Report</strong> for 12 months.
          </p>
        </section>

        {/* Two-product pricing card */}
        <section className="bg-slate-50 border border-border/30 rounded-2xl p-6 md:p-8" data-testid="section-pricing-card">

          {/* Section intro */}
          <div className="text-center mb-8 space-y-1">
            <h2 className="text-xl font-display font-bold">What's included for £79</h2>
            <p className="text-sm text-muted-foreground">Both products unlock instantly after payment.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-border/30 overflow-hidden max-w-2xl mx-auto">

            {/* Two product rows */}
            <div className="p-6 md:p-8 space-y-4 border-b border-border/20">

              {/* Product 1 */}
              <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100" data-testid="card-product-analyser">
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

              {/* Plus divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-dashed border-border/40" />
                <span className="text-lg font-bold text-muted-foreground/50">+</span>
                <div className="flex-1 border-t border-dashed border-border/40" />
              </div>

              {/* Product 2 */}
              <div className="flex gap-4 p-4 rounded-xl bg-gold/5 border border-gold/20" data-testid="card-product-report">
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
              <div className="text-6xl font-bold text-gold font-mono tracking-tight" data-testid="text-price-display">£79</div>
              <p className="text-white/50 text-sm">One-time payment · No subscription · 12 months access</p>
            </div>

            {/* Feature checklist */}
            <div className="px-6 md:px-8 py-5 space-y-2.5 border-b border-border/20">
              {[
                "All four settlement scenarios compared and scored",
                "Cashflow Resilience Indicator (CRI) score with driver breakdown",
                "5-year capital depletion & sustainability projections",
                "Monthly cash position (surplus/deficit) per scenario",
                "Sensitivity analysis — which assumptions matter most",
                "Guided Intelligence Report — plain-English analysis of your figures",
                "Tailored questions to raise with your solicitor, broker & pension adviser",
                "Downloadable Structured Financial Brief (print-ready PDF)",
                "12 months unlimited access — update figures any time",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5" data-testid={`text-paid-feature-${i}`}>
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
                  data-testid="button-start-free"
                  className="flex-1 bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
                >
                  Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => { scrollTop(); setLocation("/unlock"); }}
                  data-testid="button-unlock"
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/5"
                >
                  Unlock Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60 pt-1">
                <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /><span>All calculations in-browser</span></div>
                <span>·</span>
                <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /><span>No names or contact details processed</span></div>
                <span>·</span>
                <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /><span>Stripe-secured payments</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Free vs Full comparison table */}
        <section data-testid="section-feature-table">
          <div className="text-center mb-6 space-y-1">
            <h2 className="text-xl font-display font-bold">Free vs Full — what's included</h2>
            <p className="text-sm text-muted-foreground">Start for free. Upgrade when you're ready to see the full picture.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                  <th className="py-4 px-4 text-center font-semibold text-muted-foreground w-32">Free preview</th>
                  <th className="py-4 px-4 text-center font-semibold text-primary bg-primary/5 w-36">Full access · £79</th>
                </tr>
              </thead>
              <tbody>
                {/* Settlement Analyser group */}
                <tr className="border-b border-border/40 bg-cyan-50/60">
                  <td colSpan={3} className="py-2 px-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-600" />
                      <span className="text-[11px] font-bold text-cyan-700 uppercase tracking-wide">Settlement Analyser</span>
                    </div>
                  </td>
                </tr>
                {COMPARISON_ROWS.filter(r => r.group === "analyser").map((f, i) => (
                  <tr key={`analyser-${i}`} className="border-b border-border/50 even:bg-muted/10">
                    <td className="py-3 px-6 text-foreground">{f.label}</td>
                    <td className="py-3 px-4 text-center">
                      {f.free
                        ? <Check className="w-4 h-4 text-green-500 mx-auto" />
                        : <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />}
                    </td>
                    <td className="py-3 px-4 text-center bg-primary/[0.02]">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}

                {/* Guided Intelligence Report group */}
                <tr className="border-b border-border/40 bg-amber-50/60">
                  <td colSpan={3} className="py-2 px-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">Guided Intelligence Report</span>
                    </div>
                  </td>
                </tr>
                {COMPARISON_ROWS.filter(r => r.group === "report").map((f, i) => (
                  <tr key={`report-${i}`} className="border-b border-border/50 even:bg-muted/10">
                    <td className="py-3 px-6 text-foreground">{f.label}</td>
                    <td className="py-3 px-4 text-center">
                      <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center bg-primary/[0.02]">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}

                {/* Access */}
                <tr className="border-b border-border/40 bg-emerald-50/60">
                  <td colSpan={3} className="py-2 px-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">Access</span>
                    </div>
                  </td>
                </tr>
                {COMPARISON_ROWS.filter(r => r.group === "access").map((f, i) => (
                  <tr key={`access-${i}`} className="border-b border-border/50 even:bg-muted/10">
                    <td className="py-3 px-6 text-foreground">{f.label}</td>
                    <td className="py-3 px-4 text-center">
                      <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
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

        {/* Trust signals */}
        <section className="border-y py-6" data-testid="section-trust">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { icon: Lock, text: "Core calculations run in your browser — no financial data on our servers" },
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
            Start modelling for free — no sign-up, no commitment. Unlock both products when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-white border-0"
              onClick={startFresh}
              data-testid="button-bottom-start"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { scrollTop(); setLocation("/unlock"); }}
              data-testid="button-bottom-unlock"
              className="border-primary/30 text-primary hover:bg-primary/5"
            >
              Unlock Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            England & Wales · Illustrative modelling only · Not legal or financial advice
          </p>
        </section>

      </main>
    </div>
  );
}
