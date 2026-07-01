import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, Check, Shield, Lock, BarChart3,
  ClipboardList, Home, PoundSterling, Scale,
  TrendingUp, FileText, Activity, Users, Sparkles, HelpCircle,
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-store";
import { SiteNav } from "@/components/site-nav";
import { PRODUCT_NAMES, PRODUCT_PRICE } from "@/lib/product-copy";

const WIZARD_STEPS = [
  { n: 1, label: "Your Situation", desc: "Married or cohabiting? England & Wales? How long together?", icon: Users },
  { n: 2, label: "Your Home", desc: "Property value, mortgage balance, and ownership structure.", icon: Home },
  { n: 3, label: "Other Assets", desc: "Savings, investments, rental properties, and other assets.", icon: PoundSterling },
  { n: 4, label: "Pensions", desc: "Current transfer values for all pensions — often the largest asset.", icon: BarChart3 },
  { n: 5, label: "Your Income", desc: "Gross salaries, self-employed income, and optional spousal maintenance.", icon: TrendingUp },
  { n: 6, label: "Debts", desc: "Joint loans, credit cards, car finance, and other liabilities.", icon: Scale },
  { n: 7, label: "Living Costs", desc: "Monthly housing, transport, childcare, and household expenses.", icon: ClipboardList },
  { n: 8, label: "Children", desc: "Number and ages of dependent children — feeds the child maintenance estimate.", icon: Users },
  { n: 9, label: "Scenarios", desc: "Choose which settlement options to model and any split assumptions.", icon: FileText },
];

const STEP_CATS = [
  { bg: "bg-cyan-50", border: "border-cyan-300", iconColor: "text-cyan-600", lbl: "bg-cyan-100 text-cyan-700", lineColor: "#06B6D4", label: "Profile" },
  { bg: "bg-cyan-50", border: "border-cyan-300", iconColor: "text-cyan-600", lbl: "bg-cyan-100 text-cyan-700", lineColor: "#06B6D4", label: "Property" },
  { bg: "bg-violet-50", border: "border-violet-300", iconColor: "text-violet-600", lbl: "bg-violet-100 text-violet-700", lineColor: "#8B5CF6", label: "Assets" },
  { bg: "bg-violet-50", border: "border-violet-300", iconColor: "text-violet-600", lbl: "bg-violet-100 text-violet-700", lineColor: "#8B5CF6", label: "Assets" },
  { bg: "bg-rose-50", border: "border-rose-300", iconColor: "text-rose-600", lbl: "bg-rose-100 text-rose-700", lineColor: "#F43F5E", label: "Income" },
  { bg: "bg-rose-50", border: "border-rose-300", iconColor: "text-rose-600", lbl: "bg-rose-100 text-rose-700", lineColor: "#F43F5E", label: "Income" },
  { bg: "bg-emerald-50", border: "border-emerald-300", iconColor: "text-emerald-600", lbl: "bg-emerald-100 text-emerald-700", lineColor: "#10B981", label: "Costs" },
  { bg: "bg-emerald-50", border: "border-emerald-300", iconColor: "text-emerald-600", lbl: "bg-emerald-100 text-emerald-700", lineColor: "#10B981", label: "Children" },
  { bg: "bg-amber-50", border: "border-amber-300", iconColor: "text-amber-600", lbl: "bg-amber-100 text-amber-700", lineColor: "#F59E0B", label: "Scenarios" },
];


const ANALYSER_FEATURES = [
  { icon: BarChart3, title: "Cashflow Resilience Indicator (CRI)", desc: "A 0–100 score for each settlement option reflecting its five-year viability based on income, outgoings, and capital.", color: { bg: "bg-rose-50", icon: "text-rose-600" } },
  { icon: Scale, title: "4 settlement options side by side", desc: "Sell & Split, Party A keeps the home, Party B keeps the home, and a Deferred Sale — each showing the full net position.", color: { bg: "bg-cyan-50", icon: "text-cyan-600" } },
  { icon: PoundSterling, title: "Monthly cashflow for each party", desc: "Net income after tax and NI, minus living costs and housing payments — showing monthly surplus or deficit.", color: { bg: "bg-violet-50", icon: "text-violet-600" } },
  { icon: TrendingUp, title: "5-year capital projections", desc: "How the capital position of each settlement evolves over five years under your assumptions.", color: { bg: "bg-emerald-50", icon: "text-emerald-600" } },
  { icon: Activity, title: "Stress testing & sensitivity analysis", desc: "Adjust interest rates, expenses, or house prices to see how resilient each settlement option is to change.", color: { bg: "bg-amber-50", icon: "text-amber-600" } },
];

const REPORT_FEATURES = [
  { icon: Scale, title: PRODUCT_NAMES.layerBeforeAgree, desc: "Fixed source-backed sections on career, bills, children, pensions, the home and offers — figures to check, evidence to gather and professional questions. Not AI-written.", color: { bg: "bg-gold/10", icon: "text-gold" } },
  { icon: Sparkles, title: "Plain-English scenario narrative", desc: "Our analysis engine reads your figures and explains what each option could leave you with — what stands out, where financial pressure may appear, and what to watch out for.", color: { bg: "bg-gold/10", icon: "text-gold" } },
  { icon: HelpCircle, title: "Tailored professional questions", desc: "Bespoke questions to raise with your solicitor, mortgage broker, and pension adviser — produced from your specific numbers so you walk into every consultation prepared.", color: { bg: "bg-rose-50", icon: "text-rose-500" } },
  { icon: FileText, title: PRODUCT_NAMES.pdf, desc: "A print-ready PDF of your full analysis — useful for professional meetings, your own records, or sharing with a mediator.", color: { bg: "bg-blue-50", icon: "text-blue-600" } },
];

const TRUST_ITEMS = [
  { icon: Lock, title: "Private by design", desc: "Core calculations stay private in your browser. No names or contact details are ever included in any processing.", bg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { icon: Shield, title: "No financial advice", desc: "Illustrative modelling only. Always seek independent advice for decisions.", bg: "bg-amber-50", iconColor: "text-amber-600" },
  { icon: BarChart3, title: "Illustrative income tax model", desc: "UK 2026/27 income tax and Class 1 NI rates applied as indicative estimates to all income figures.", bg: "bg-cyan-50", iconColor: "text-cyan-600" },
];

export default function HowItWorksPage() {
  const [, setLocation] = useLocation();
  const reset = useAppStore((s) => s.reset);

  useDocumentTitle("How Divorce Calculator UK Works — 3 Stages");
  useMetaTags({
    description: "Enter your figures, preview your settlement scenarios, then unlock the full analysis — sustainability scores, 5-year projections, stress tests. Takes under 5 minutes. England and Wales.",
    canonical: "https://divorcecalculatoruk.co.uk/how-it-works",
    ogTitle: "How Divorce Calculator UK Works",
    ogDescription: "Three stages: enter figures, preview your settlement, then unlock full analysis with sustainability scores and 5-year projections. England and Wales.",
    ogUrl: "https://divorcecalculatoruk.co.uk/how-it-works",
    ogType: "website",
  });

  const startFresh = () => {
    reset();
    scrollTop();
    setLocation("/wizard");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-[hsl(220_52%_10%)] text-white/65 px-4 py-1.5 text-xs text-center font-medium" data-testid="text-disclaimer">
        Illustrative modelling only <span className="text-amber-400/60 mx-1">·</span> Not legal, tax or financial advice
      </div>

      <SiteNav onStartClick={startFresh} />

      {/* ── Hero ── */}
      <section className="py-14 md:py-20 bg-primary relative overflow-hidden" data-testid="section-hiw-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20" style={{ background: "radial-gradient(ellipse, #06B6D4 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[200px] rounded-full opacity-15" style={{ background: "radial-gradient(ellipse, #8B5CF6 0%, transparent 70%)" }} />
        </div>
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-5 relative z-10">
          <p className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">How it works</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight" data-testid="text-hiw-headline">
            From your figures to financial clarity in three stages
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed">
            No forms, no advisers, no waiting. Enter your details privately in your browser, see your asset pool immediately, then unlock your complete settlement analysis.
          </p>
          <Button
            size="lg"
            onClick={startFresh}
            data-testid="button-hiw-hero-cta"
            className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 mt-2"
          >
            Get My Financial Picture — Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-primary-foreground/50 text-xs">No payment card needed to start</p>
        </div>
      </section>

      {/* ── Three stages ── */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-three-stages">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-stages-headline">Three stages to your financial picture</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              The process is designed to give you something useful at every step — free from the start, fully detailed once you decide you want the complete picture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Enter your figures",
                desc: "Work through the nine-step financial wizard. All calculations run locally in your browser — nothing is sent to a server until you choose to save your session.",
                tag: "Free · No account needed",
                color: "bg-cyan-50 border-cyan-200",
                tagColor: "text-cyan-700 bg-cyan-100",
                numColor: "text-cyan-400/40",
              },
              {
                step: "02",
                title: "Preview your asset pool",
                desc: "See your total marital asset pool as a ring chart, the basic shape of your settlement options, and a preview of the financial indicators — with full detail locked.",
                tag: "Free · Instant results",
                color: "bg-violet-50 border-violet-200",
                tagColor: "text-violet-700 bg-violet-100",
                numColor: "text-violet-400/40",
              },
              {
                step: "03",
                title: "Unlock both products",
                desc: `One payment of ${PRODUCT_PRICE} unlocks ${PRODUCT_NAMES.fullPosition} for 12 months: ${PRODUCT_NAMES.layerScenarios.toLowerCase()}, ${PRODUCT_NAMES.layerStandsOut.toLowerCase()}, and ${PRODUCT_NAMES.layerBeforeAgree.toLowerCase()}.`,
                tag: "£79 · 12-month access",
                color: "bg-amber-50 border-amber-200",
                tagColor: "text-amber-700 bg-amber-100 font-semibold",
                numColor: "text-amber-500/40",
              },
            ].map((stage, i) => (
              <Card key={i} className={`border ${stage.color}`} data-testid={`card-stage-${i}`}>
                <CardContent className="pt-6 pb-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className={`text-3xl font-display font-bold leading-none ${stage.numColor}`}>{stage.step}</span>
                    <div>
                      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${stage.tagColor}`}>{stage.tag}</span>
                      <h3 className="text-base font-semibold text-foreground">{stage.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stage.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9-step wizard timeline ── */}
      <section className="py-16 md:py-20 bg-[#F1F5F9]" data-testid="section-wizard-steps">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 mb-2">9-Step Wizard</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold">What the wizard covers</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto">
              Nine short steps. Most people complete it in under 5 minutes. You can pause and return at any time.
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute left-5 top-5 bottom-5 w-0.5 z-0"
              style={{ background: "linear-gradient(to bottom, #06B6D4 0%, #06B6D4 22%, #8B5CF6 22%, #8B5CF6 44%, #F43F5E 44%, #F43F5E 66%, #10B981 66%, #10B981 88%, #F59E0B 88%)" }}
            />

            <div className="space-y-3">
              {WIZARD_STEPS.map((step, idx) => {
                const cat = STEP_CATS[idx];
                return (
                  <div key={step.n} className="relative flex items-start gap-4 z-10" data-testid={`card-wizard-step-${step.n}`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${cat.bg} border-2 ${cat.border} flex items-center justify-center shadow-sm`}>
                      <step.icon className={`w-4 h-4 ${cat.iconColor}`} />
                    </div>
                    <div
                      className="flex-1 bg-white rounded-xl border border-border/50 p-4 shadow-sm"
                      style={{ borderLeft: `4px solid ${cat.lineColor}` }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-semibold text-foreground">{step.label}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${cat.lbl}`}>{cat.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-start gap-3">
            <Shield className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-emerald-900/70 leading-relaxed">
              <strong className="text-emerald-900">Privacy by design.</strong> Core calculations happen in your browser. No names or contact details are ever included in any processing. You may save your session token to return later without re-entering your figures.
            </p>
          </div>
        </div>
      </section>

      {/* ── Results features ── */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-results-features">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold">What both products include</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto">
              Once unlocked, both products stay available for twelve months — revisit and re-run as many times as you need.
            </p>
          </div>

          {/* Product 1: Settlement Analyser */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-cyan-600" />
              </div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">{PRODUCT_NAMES.layerScenarios}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {ANALYSER_FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl border border-border/50 bg-background hover:shadow-sm hover:border-border transition-all"
                  data-testid={`card-analyser-feature-${i}`}
                >
                  <div className={`w-9 h-9 rounded-lg ${feature.color.bg} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className={`w-4 h-4 ${feature.color.icon}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 border-t border-dashed border-border/50" />
            <span className="text-xl font-bold text-muted-foreground/40">+</span>
            <div className="flex-1 border-t border-dashed border-border/50" />
          </div>

          {/* Product 2: Settlement Reality Check Report */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gold/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">{PRODUCT_NAMES.layerStandsOut}</h3>
              <span className="text-[10px] font-semibold text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full ml-1">Intelligently generated</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {REPORT_FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl border border-gold/20 bg-gold/5 hover:shadow-sm transition-all"
                  data-testid={`card-report-feature-${i}`}
                >
                  <div className={`w-9 h-9 rounded-lg ${feature.color.bg} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className={`w-4 h-4 ${feature.color.icon}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-14 md:py-16 bg-muted/30 border-y border-border/40" data-testid="section-hiw-pricing">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-display font-bold">Two products. One payment. No subscription.</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Free to start. {PRODUCT_PRICE} unlocks <strong>{PRODUCT_NAMES.fullPosition}</strong> — all three layers — for 12 months.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {[
              "4 settlement options fully modelled",
              "Cashflow Resilience Indicator (CRI) scores",
              "5-year projections & stress testing",
              `${PRODUCT_NAMES.layerStandsOut} — scenario outcomes and preparation guide`,
              "12 months unlimited access",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-foreground">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              onClick={startFresh}
              data-testid="button-hiw-cta-free"
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
            >
              Get My Financial Picture — Free
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { scrollTop(); setLocation("/unlock"); }}
              data-testid="button-hiw-cta-unlock"
              className="border-border"
            >
              Unlock My Full Analysis — £79
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Secure payment via Stripe · Instant access · No subscription</p>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="py-14 bg-background border-t border-border/40" data-testid="section-hiw-trust">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {TRUST_ITEMS.map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-3" data-testid={`card-trust-${i}`}>
                <div className={`w-11 h-11 rounded-full ${t.bg} flex items-center justify-center`}>
                  <t.icon className={`w-5 h-5 ${t.iconColor}`} />
                </div>
                <p className="text-sm font-semibold text-foreground">{t.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="pt-10 pb-8 bg-primary" data-testid="section-footer">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Logo href="/" size="sm" showBrandName className="brightness-0 invert" />
            <div className="flex flex-wrap gap-4 text-xs text-primary-foreground/60">
              <a href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-primary-foreground transition-colors">Terms</a>
              <a href="/methodology" className="hover:text-primary-foreground transition-colors">Methodology</a>
              <a href="/contact" className="hover:text-primary-foreground transition-colors">Contact</a>
              <a href="/faq" className="hover:text-primary-foreground transition-colors">FAQ</a>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/40 max-w-2xl leading-relaxed">
            This platform provides illustrative financial modelling only. It is not financial, legal, or tax advice and is not regulated by the FCA or SRA. For advice on your specific situation, consult a qualified family solicitor or regulated financial adviser.
          </p>
        </div>
      </footer>
    </div>
  );
}
