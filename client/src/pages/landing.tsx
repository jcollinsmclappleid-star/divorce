import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator, Shield, ArrowRight, ChevronRight,
  BarChart3, Lock,
  FileText, TrendingUp, Activity,
  Check
} from "lucide-react";
import { EXAMPLE_SCENARIOS } from "@/lib/exampleScenarios";
import { useAppStore } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Logo } from "@/components/logo";

const WHAT_YOU_GET = [
  "Net property equity and transaction cost modelling",
  "Liquid assets, liabilities, and pension allocation analysis",
  "UK 2025/26 income tax and National Insurance modelling",
  "Indicative lending capacity benchmarks (non-lender specific)",
  "Capital allocation and liquidity concentration analysis",
  "5-year capital sustainability projections",
  "Interest rate and expense sensitivity testing",
  "Downloadable Structured Financial Brief (PDF)",
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Enter Your Financial Assumptions",
    body: "Privately, in your own time, with no pressure to share.",
    icon: Calculator,
  },
  {
    step: 2,
    title: "Model Settlement Structures",
    body: "Compare selling, retaining the home, and adjusted splits.",
    icon: BarChart3,
  },
  {
    step: 3,
    title: "Compare Stability & Sustainability",
    body: "Understand what drives each outcome, not just the headline totals.",
    icon: Activity,
  },
  {
    step: 4,
    title: "Generate a Financial Brief",
    body: "A clear overview to inform professional conversations.",
    icon: FileText,
  },
];

export default function LandingPage() {
  useDocumentTitle("Divorce Financial Settlement Calculator UK | DivorceCalculatorUK");
  const [, setLocation] = useLocation();
  const loadState = useAppStore((s) => s.loadState);

  const loadExample = (index: number) => {
    const example = EXAMPLE_SCENARIOS[index];
    loadState(example.data);
    setLocation("/preview");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20" data-testid="text-disclaimer">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <div className="w-full py-10 px-4">
        <div className="container mx-auto flex justify-center">
          <Logo href="/" size="lg" showBrandName />
        </div>
      </div>

      <nav className="sticky top-0 z-[100] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-4">
            <Logo href="/" size="sm" showBrandName />
            <Link href="/methodology" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline" data-testid="link-nav-methodology">Methodology</Link>
          </div>
          <Button
            onClick={() => setLocation("/wizard")}
            data-testid="button-nav-start"
          >
            Start Now <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </nav>

      <section className="relative overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/3 pointer-events-none" />
        <div className="container mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32 relative">
          <div className="max-w-2xl mx-auto text-center space-y-7">
            <Badge variant="secondary" className="text-xs px-3 py-1">
              UK 2025/26 Income Tax &amp; NI Rates
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight" data-testid="text-hero-headline">
              Structured Financial Modelling for Separation & Divorce
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Model how different settlement structures affect your liquidity, lending capacity, and long-term financial position &mdash; privately, before important conversations take place.
            </p>
            <p className="text-sm text-muted-foreground/80">
              Illustrative financial modelling. Not legal, tax, or financial advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                size="lg"
                onClick={() => setLocation("/wizard")}
                data-testid="button-hero-start"
              >
                Start My Financial Model <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => loadExample(0)}
                data-testid="button-hero-example"
              >
                View Example Output <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground/70 pt-1">
              Private. Structured. No sign-up required to explore.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-features">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-quantifies-headline">
                  What This Model Quantifies
                </h2>
                <ul className="space-y-2.5">
                  {WHAT_YOU_GET.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5" data-testid={`text-feature-${i}`}>
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-how-headline">
                  How It Works
                </h2>
                <div className="space-y-5">
                  {HOW_IT_WORKS.map((item) => (
                    <div key={item.step} className="flex items-start gap-4" data-testid={`step-how-${item.step}`}>
                      <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-examples">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-examples-headline">
              Example Output
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
              Load a sample scenario to explore the full structured analysis. No sign-up required.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {EXAMPLE_SCENARIOS.map((example, i) => (
              <Card
                key={example.id}
                className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={() => loadExample(i)}
                data-testid={`card-example-${example.id}`}
              >
                <CardContent className="pt-5 pb-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{example.title}</h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground">{example.subtitle}</p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">{example.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {example.highlights.map((h, hi) => (
                      <Badge key={hi} variant="outline" className="text-[10px] px-1.5 py-0">
                        {h}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-pricing">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-pricing-headline">
            Structured Financial Modelling &mdash; &pound;59
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A single professional consultation typically costs <span className="font-semibold text-foreground">&pound;250&ndash;&pound;400 per hour</span>. This platform provides structured modelling and scenario comparison for a <span className="font-semibold text-foreground">one-time &pound;59</span>, with six months of unlimited reruns.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center max-w-md mx-auto py-4">
            <div>
              <p className="text-lg font-bold text-foreground">15 min</p>
              <p className="text-xs text-muted-foreground">First model complete</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">6 months</p>
              <p className="text-xs text-muted-foreground">Unlimited reruns</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">100%</p>
              <p className="text-xs text-muted-foreground">Private &amp; secure</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/70">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>All calculations in-browser</span>
            </div>
            <span>&middot;</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>No data stored on servers</span>
            </div>
            <span>&middot;</span>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Stripe-secured payments</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/60">
            No subscription. No recurring fees. No sign-up required to explore.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-cta">
        <div className="container mx-auto px-4 max-w-lg text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold" data-testid="text-cta-headline">
            Start with structure.
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Seeing the numbers clearly, before conversations begin, changes the nature of those conversations entirely.
          </p>
          <Button
            size="lg"
            onClick={() => setLocation("/wizard")}
            data-testid="button-cta-start"
          >
            Start My Financial Model <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <p className="text-xs text-muted-foreground">
            Private and secure. All calculations run in your browser.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-faq">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10" data-testid="text-faq-headline">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Does this predict what I will receive in court?",
                a: "No. This tool does not predict court outcomes, judicial discretion, legal entitlement, or settlement fairness. It models financial structures only. A court considers a wide range of factors — including needs, contributions, and welfare of children — that are beyond the scope of any mathematical model.",
              },
              {
                q: "Is this financial or legal advice?",
                a: "No. This tool provides illustrative financial modelling only. It is not authorised or regulated by the FCA, SRA, or any other professional body. Independent professional advice may be warranted before making any decisions.",
              },
              {
                q: "How accurate are the tax calculations?",
                a: "The tax engine applies a simplified UK income tax and employee Class 1 National Insurance calculation only, based on published HMRC 2025/26 rates. It excludes dividend rates, Scottish rates, self-employed NI, Capital Gains Tax, pension relief, and other reliefs. Full details are available on the Model Methodology page.",
              },
              {
                q: "What do the lending capacity benchmarks mean?",
                a: "These are generalised income multiple illustrations (typically 4-4.5x gross income) and do not constitute a lending assessment, mortgage advice, or credit approval indication. Actual lending decisions depend on individual creditworthiness, lender criteria, and other factors.",
              },
              {
                q: "Is my data safe?",
                a: "All financial calculations are performed locally in your web browser. The financial data you enter is not transmitted to our servers. Payment processing is handled securely by Stripe.",
              },
              {
                q: "What are the scope and limitations of this tool?",
                a: "This platform provides illustrative financial modelling only. It does not provide legal, financial, or tax advice. It does not predict court outcomes, assess entitlement, provide suitability assessments or lending evaluations, or replace independent professional advice. All outputs are generated solely from the financial assumptions entered by the user.",
              },
              {
                q: "What does the Financial Sustainability Indicator mean?",
                a: "This is a model-based indicator generated by a simplified mathematical model. It reflects liquidity sustainability and lending capacity benchmarks under current modelling assumptions. It does not constitute financial advice, risk profiling, or suitability assessment.",
              },
            ].map((item, i) => (
              <div key={i} data-testid={`faq-item-${i}`}>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8 bg-muted/20" data-testid="section-footer">
        <div className="container mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center">
            <Logo href="/" size="sm" showBrandName />
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
              Terms of Use
            </Link>
            <Link href="/methodology" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-methodology">
              Model Methodology
            </Link>
            <Link href="/recover" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-recover">
              Recover Access
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Illustrative financial modelling only. This tool does not provide legal, tax, or financial advice.
          </p>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} DivorceCalculatorUK
          </p>
        </div>
      </footer>
    </div>
  );
}
