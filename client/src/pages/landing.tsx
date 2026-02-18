import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator, Shield, ArrowRight, ChevronRight,
  BarChart3, Lock, Landmark, Home, TrendingUp,
  FileText, Sliders, PoundSterling, PiggyBank, Activity
} from "lucide-react";
import { EXAMPLE_SCENARIOS } from "@/lib/exampleScenarios";
import { useAppStore } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Logo } from "@/components/logo";

const QUANTIFIES_ITEMS = [
  {
    icon: Home,
    title: "Net Property Equity",
    body: "Net property equity and transaction cost assumptions.",
  },
  {
    icon: PiggyBank,
    title: "Liquid Assets & Liabilities",
    body: "Liquid assets and liabilities, based on the figures entered.",
  },
  {
    icon: Landmark,
    title: "Pension Allocation",
    body: "Pension allocation on a transfer value basis, based on the assumptions entered.",
  },
  {
    icon: Calculator,
    title: "UK 2025/26 Tax Modelling",
    body: "Income tax and National Insurance modelling assumptions for 2025/26.",
  },
  {
    icon: PoundSterling,
    title: "Lending Capacity Benchmark",
    body: "Indicative lending capacity benchmark (non-lender specific), based on the assumptions entered.",
  },
  {
    icon: BarChart3,
    title: "Capital Allocation",
    body: "Capital allocation and liquidity concentration analysis.",
  },
  {
    icon: TrendingUp,
    title: "5-Year Sustainability",
    body: "5-year capital sustainability projection, based on the assumptions entered.",
  },
  {
    icon: Sliders,
    title: "Sensitivity Testing",
    body: "Interest rate and expense assumption sensitivity testing.",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Enter Your Financial Assumptions",
    body: "In your own time, privately, with no pressure to share.",
    icon: Calculator,
  },
  {
    step: 2,
    title: "Model Alternative Settlement Structures",
    body: "Compare selling, retaining the home, and adjusted splits.",
    icon: BarChart3,
  },
  {
    step: 3,
    title: "Compare Indicative Stability & Sustainability",
    body: "Understand what drives each outcome, not just the headline totals.",
    icon: Activity,
  },
  {
    step: 4,
    title: "Generate a Structured Financial Brief",
    body: "A clear, organised overview to inform professional conversations.",
    icon: FileText,
  },
];

export default function LandingPage() {
  useDocumentTitle("Divorce Financial Settlement Calculator UK | DivorceCalculatorUK");
  const [, setLocation] = useLocation();
  const loadState = useAppStore((s) => s.loadState);

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

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

      <nav className="sticky top-0 z-[100] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Logo size="md" />
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
              Model how different settlement structures affect your liquidity, lending capacity benchmarks, and long-term financial position &mdash; based solely on the assumptions you enter.
            </p>
            <p className="text-sm text-muted-foreground/80">
              Illustrative financial modelling. Not legal, tax, or financial advice. Does not predict court outcomes or assess entitlement.
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

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-problem">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-problem-headline">
            Separation Changes Financial Structure &mdash; Not Just Circumstances.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            When a household becomes two, the financial picture changes in ways that are difficult to see clearly &mdash; until they're modelled.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            What changes is not simply who owns what &mdash; but how structure affects liquidity, lending capacity, and sustainability over time.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            DivorceCalculatorUK allows you to explore those structural differences before important conversations take place.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-quantifies">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-quantifies-headline">
              What This Model Quantifies
            </h2>
          </div>
          <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {QUANTIFIES_ITEMS.map((item, i) => (
              <Card key={i} data-testid={`card-quantifies-${i}`}>
                <CardContent className="pt-6 space-y-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-20 bg-muted/30" data-testid="section-how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-how-headline">
              A Structured Approach
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center space-y-3" data-testid={`step-how-${item.step}`}>
                <div className="h-12 w-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-why">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-why-headline">
            Private Exploration Before Public Decisions
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A structured financial overview allows you to approach professional discussions informed by quantified assumptions.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Many people find that seeing the numbers clearly, before conversations begin, changes the nature of those conversations entirely.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Instead of relying on estimates or verbal descriptions, you can see how structural changes affect liquidity and projected sustainability.
          </p>
          <p className="text-sm text-muted-foreground/80">
            This tool does not replace professional advice. It supports more informed conversations.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-examples">
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

      <section className="py-16 md:py-20" data-testid="section-pricing">
        <div className="container mx-auto px-4 max-w-xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-pricing-headline">
            Structured Financial Modelling &mdash; &pound;79
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A single professional consultation typically costs <span className="font-semibold text-foreground">&pound;250&ndash;&pound;400 per hour</span>. Many individuals attend several before their financial picture becomes clearer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This platform provides structured modelling and scenario comparison for a <span className="font-semibold text-foreground">one-time &pound;79</span>, including six months of unlimited scenario reruns.
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
          <p className="text-sm text-muted-foreground/80">
            No subscription. No recurring fees. No sign-up required to explore.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-scope">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8" data-testid="text-scope-headline">
            Scope & Limitations
          </h2>
          <p className="text-muted-foreground leading-relaxed text-center mb-6">
            This platform provides illustrative financial modelling only.
          </p>
          <div className="space-y-3 max-w-md mx-auto">
            {[
              "Provide legal advice",
              "Provide financial advice",
              "Provide tax advice",
              "Predict court outcomes, judicial discretion, or settlement fairness",
              "Assess entitlement or legal rights",
              "Provide suitability assessments or lending evaluations",
              "Replace independent professional advice",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-muted-foreground/60 text-sm mt-0.5 flex-shrink-0">&mdash;</span>
                <span className="text-sm text-muted-foreground">It does not {item.toLowerCase()}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 text-center mt-6">
            All outputs are generated solely from the financial assumptions entered by the user.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-reassurance">
        <div className="container mx-auto px-4 max-w-xl text-center space-y-5">
          <div className="flex justify-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Used by individuals preparing for mediation, solicitor meetings, and financial disclosure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/70 pt-2">
            <span>All calculations in-browser</span>
            <span>&middot;</span>
            <span>No data stored on servers</span>
            <span>&middot;</span>
            <span>Stripe-secured payments</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-cta">
        <div className="container mx-auto px-4 max-w-lg text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold" data-testid="text-cta-headline">
            Start with structure.
          </h2>
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
            <Logo href="/" size="sm" />
          </div>
          <p className="text-xs text-muted-foreground/70 max-w-md mx-auto">
            Structured Financial Modelling for Separation & Divorce
          </p>
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
