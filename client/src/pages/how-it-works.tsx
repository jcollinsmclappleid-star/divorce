import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, Check, Shield, Lock, BarChart3,
  ClipboardList, Home, PoundSterling, Scale,
  TrendingUp, FileText, Activity, Users,
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-store";
import { SiteNav } from "@/components/site-nav";

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

const RESULTS_FEATURES = [
  { icon: BarChart3, title: "Financial Sustainability Indicator", desc: "A 0–100 score for each settlement option reflecting its five-year viability based on income, outgoings, and capital." },
  { icon: Scale, title: "4 settlement options side by side", desc: "Sell & Split, Party A keeps the home, Party B keeps the home, and a Deferred Sale — each showing the full net position." },
  { icon: PoundSterling, title: "Monthly cashflow for each party", desc: "Net income after tax and NI, minus living costs and housing payments — showing monthly surplus or deficit." },
  { icon: TrendingUp, title: "5-year capital projections", desc: "How the capital position of each settlement evolves over five years under your assumptions." },
  { icon: Activity, title: "Stress testing", desc: "Adjust interest rates, expenses, or house prices to see how resilient each settlement option is to change." },
  { icon: FileText, title: "Downloadable Financial Brief", desc: "A structured PDF summary of your full analysis — useful for solicitors, mediators, or your own records." },
];

export default function HowItWorksPage() {
  const [, setLocation] = useLocation();
  const reset = useAppStore((s) => s.reset);

  useDocumentTitle("How It Works | Divorce Calculator UK — Financial Clarity Platform");
  useMetaTags({
    description: "See how Divorce Calculator UK models your financial settlement in three stages: enter your figures, preview your asset pool, then unlock your full settlement analysis.",
    canonical: "https://divorcecalculatoruk.co.uk/how-it-works",
    ogTitle: "How Divorce Calculator UK Works",
    ogDescription: "Three stages: enter figures, preview your asset pool, then unlock your complete settlement analysis with FSI scores, cashflow, and stress testing.",
  });

  const startFresh = () => {
    reset();
    scrollTop();
    setLocation("/wizard");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20" data-testid="text-disclaimer">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <SiteNav onStartClick={startFresh} />

      <section className="py-14 md:py-20 bg-primary" data-testid="section-hiw-hero">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-5">
          <p className="text-gold text-sm font-semibold tracking-wide uppercase">How it works</p>
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
                color: "bg-primary/8 border-primary/20",
                tagColor: "text-primary bg-primary/10",
              },
              {
                step: "02",
                title: "Preview your asset pool",
                desc: "See your total marital asset pool as a ring chart, the basic shape of your settlement options, and a preview of the financial indicators — with full detail locked.",
                tag: "Free · Instant results",
                color: "bg-background border-border",
                tagColor: "text-primary bg-primary/10",
              },
              {
                step: "03",
                title: "Unlock your full analysis",
                desc: "One payment of £79 unlocks 12 months of access to the complete analysis: FSI scores, monthly cashflow, stress testing, five-year projections, and a downloadable brief.",
                tag: "£79 · 12-month access",
                color: "bg-gold/8 border-gold/25",
                tagColor: "text-gold bg-gold/10 font-semibold",
              },
            ].map((stage, i) => (
              <Card key={i} className={`border ${stage.color}`} data-testid={`card-stage-${i}`}>
                <CardContent className="pt-6 pb-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl font-display font-bold text-muted-foreground/30 leading-none">{stage.step}</span>
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

      <section className="py-16 md:py-20 bg-muted/30 border-y border-border/40" data-testid="section-wizard-steps">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold">What the wizard covers</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto">
              Nine short steps. Most people complete it in under 20 minutes. You can pause and return at any time.
            </p>
          </div>

          <div className="space-y-3">
            {WIZARD_STEPS.map((step) => (
              <div
                key={step.n}
                className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border/50"
                data-testid={`card-wizard-step-${step.n}`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{step.n}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/40 border border-border flex items-start gap-3">
            <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Privacy by design.</strong> All calculations happen in your browser. The financial data you enter is never transmitted to our servers. You may save your session token to return later without re-entering your figures.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background" data-testid="section-results-features">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold">What your full analysis includes</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto">
              Once unlocked, the full analysis stays available for twelve months. Download, revisit, and stress test as many times as you need.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {RESULTS_FEATURES.map((feature, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl border border-border/50 bg-background"
                data-testid={`card-result-feature-${i}`}
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4.5 h-4.5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-muted/30 border-y border-border/40" data-testid="section-hiw-pricing">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-display font-bold">One payment. Twelve months. No subscription.</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            The free analysis shows you the shape of your settlement. The full picture — for £79, once — shows you whether you can afford to live in it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {[
              "4 settlement options modelled",
              "UK tax & NI applied",
              "Stress testing included",
              "PDF download",
              "12 months unlimited access",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-foreground">
                <Check className="w-3.5 h-3.5 text-gold" />
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

      <section className="py-14 bg-muted/20 border-t border-border/40" data-testid="section-hiw-trust">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Lock, title: "Private by design", desc: "Your financial data never leaves your browser." },
              { icon: Shield, title: "No financial advice", desc: "Illustrative modelling only. Always seek independent advice for decisions." },
              { icon: BarChart3, title: "Accurate tax engine", desc: "UK 2026/27 income tax and Class 1 NI applied to all income figures." },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-3" data-testid={`card-trust-${i}`}>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <t.icon className="w-5 h-5 text-primary" />
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
