import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator, Shield, TrendingUp, Eye, FileText,
  ArrowRight, ChevronRight, CheckCircle2, BarChart3,
  AlertTriangle, Clock, Lock, Landmark, Play,
  Users, Baby, Home
} from "lucide-react";
import walkthroughVideo from "../assets/videos/walkthrough.mp4";
import { EXAMPLE_SCENARIOS } from "@/lib/exampleScenarios";
import { useAppStore } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";

const EXAMPLE_ICONS = [Users, Baby, Home] as const;

const USP_ITEMS = [
  {
    icon: Landmark,
    title: "Understand Your Options Before Committing",
    body: "See how property equity, savings, pensions and debts combine — so you know your true starting position before any discussions.",
  },
  {
    icon: BarChart3,
    title: "Compare What Each Path Really Means",
    body: "Understand how selling, keeping the home, or adjusting the split changes your liquidity, mortgage burden and long-term outlook.",
  },
  {
    icon: AlertTriangle,
    title: "Assess the Long-Term Sustainability of Each Option",
    body: "See which scenarios leave you financially resilient — and which create pressure points you need to plan for.",
  },
  {
    icon: Eye,
    title: "Know Your Monthly Reality",
    body: "Understand your likely monthly position after settlement — not just headline totals.",
  },
  {
    icon: FileText,
    title: "Clarity for Productive Discussions with Your Solicitor",
    body: "Generate a clear, organised financial overview to bring structure and focus to professional conversations.",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Enter Your Numbers",
    body: "Use best estimates \u2014 you can refine them later.",
    icon: Calculator,
  },
  {
    step: 2,
    title: "Compare Illustrative Scenarios",
    body: "See selling, keeping, and adjusted splits side-by-side.",
    icon: BarChart3,
  },
  {
    step: 3,
    title: "Review Clear Explanations",
    body: "Understand not just the totals \u2014 but what drives them.",
    icon: Eye,
  },
  {
    step: 4,
    title: "Download Your Structured Summary",
    body: "Keep a calm, organised overview of your options.",
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
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-bold tracking-tight">
              DivorceModeller<span className="text-primary">.UK</span>
            </span>
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
        <div className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-xs px-3 py-1">
              UK 2025/26 Tax Rules
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight" data-testid="text-hero-headline">
              Clarity Before Costly Decisions.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Understand what selling, keeping the home, or changing the split really means for your future &mdash; in clear, structured financial terms.
            </p>
            <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-md mx-auto">
              You don't need spreadsheets. You don't need perfect numbers. You just need to see how the outcomes change &mdash; calmly, privately, and on your own terms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button
                size="lg"
                onClick={() => setLocation("/wizard")}
                data-testid="button-hero-start"
              >
                Start My Financial Snapshot <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToHowItWorks}
                data-testid="button-hero-how"
              >
                See How It Works <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Illustrative modelling only. Not legal advice.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-muted/50 border-y px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground max-w-3xl mx-auto" data-testid="text-disclaimer-banner">
          This tool provides illustrative financial modelling only. It does not constitute legal, tax, or financial advice. 
          Outputs are estimates based on the information you provide and should not be relied upon for decision-making without independent professional advice.
        </p>
      </div>

      <section className="py-12 md:py-16" data-testid="section-video">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold" data-testid="text-video-headline">
              See how it works in 30 seconds
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              From entering your numbers to a clear, structured financial overview.
            </p>
          </div>
          <div className="rounded-md overflow-hidden border border-border shadow-lg">
            <video
              src={walkthroughVideo}
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-video bg-muted"
              data-testid="video-walkthrough"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-emotional">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-emotional-headline">
            When everything feels uncertain, your numbers shouldn't.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Separation and divorce often bring one overwhelming question:
          </p>
          <p className="text-xl md:text-2xl font-display font-semibold italic text-primary/80">
            "Will I be financially okay?"
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Most people don't struggle with the maths &mdash; they struggle with understanding what the numbers mean.
          </p>
          <div className="text-left max-w-md mx-auto space-y-3 pt-4">
            {[
              "See where your money actually comes from",
              "Understand how a settlement structure changes your stability",
              "Compare selling versus keeping the home",
              "Identify risks before they become expensive mistakes",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-muted-foreground pt-2">All in plain English.</p>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-usp">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-usp-headline">
              What You'll Understand in Minutes
            </h2>
          </div>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {USP_ITEMS.map((item, i) => (
              <Card key={i} data-testid={`card-usp-${i}`}>
                <CardContent className="pt-6 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8" data-testid="section-who-what">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Who this tool is for</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Individuals navigating separation or divorce who want to understand the financial implications of different settlement structures before engaging professional advisors.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What this tool does not do</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">This tool does not provide legal, financial, or tax advice. It does not predict court outcomes, assess entitlement, or replace the need for a qualified solicitor or financial advisor.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-muted/30" data-testid="section-examples">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="text-xs px-3 py-1 mb-3">
              Interactive Examples
            </Badge>
            <h2 className="text-xl md:text-2xl font-display font-bold" data-testid="text-examples-headline">
              See it in action with a real scenario
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
              Click any example below to load sample numbers and explore the full results. No sign-up needed.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {EXAMPLE_SCENARIOS.map((example, i) => {
              const Icon = EXAMPLE_ICONS[i];
              return (
                <Card
                  key={example.id}
                  className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                  onClick={() => loadExample(i)}
                  data-testid={`card-example-${example.id}`}
                >
                  <CardContent className="pt-5 pb-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/50 mt-2.5 flex-shrink-0" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{example.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{example.subtitle}</p>
                    </div>
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-reassurance">
        <div className="container mx-auto px-4 max-w-xl text-center space-y-6">
          <div className="flex justify-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-reassurance-headline">
            Private. Structured. On Your Terms.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You're not committing to anything. You're exploring possibilities.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This isn't about predicting court outcomes. It's about understanding your financial position clearly before making decisions.
          </p>
          <p className="text-sm text-muted-foreground">
            You can adjust assumptions, test scenarios, and see what changes matter most.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-20" data-testid="section-how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-how-headline">
              How It Works
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center space-y-3" data-testid={`step-how-${item.step}`}>
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto shadow-lg shadow-primary/20">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-value">
        <div className="container mx-auto px-4 max-w-xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-value-headline">
            Financial clarity before expensive conversations.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A single legal consultation can cost <span className="font-semibold text-foreground">&pound;250&ndash;&pound;400 per hour</span>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A structured financial modelling report gives you clarity first &mdash; so you can approach conversations informed and confident.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-cta">
        <div className="container mx-auto px-4 max-w-lg text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold" data-testid="text-cta-headline">
            Start with clarity.
          </h2>
          <Button
            size="lg"
            onClick={() => setLocation("/wizard")}
            data-testid="button-cta-start"
          >
            Start My Financial Snapshot <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <p className="text-xs text-muted-foreground">
            Private and secure. All calculations run in your browser.
          </p>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8 bg-muted/20" data-testid="section-footer">
        <div className="container mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="h-6 w-6 bg-primary rounded-md flex items-center justify-center">
              <Calculator className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-display font-bold">
              DivorceModeller<span className="text-primary">.UK</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
              Terms of Use
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Illustrative financial modelling only. This tool does not provide legal, tax, or financial advice.
          </p>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} DivorceModeller.UK
          </p>
        </div>
      </footer>
    </div>
  );
}
