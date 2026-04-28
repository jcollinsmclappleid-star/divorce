import { useLocation, Link } from "wouter";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, ChevronRight, BarChart3,
  HelpCircle, BookOpen, FileText,
  Lock, Shield, TrendingUp, Check,
} from "lucide-react";
import { EXAMPLE_SCENARIOS } from "@/lib/exampleScenarios";
import { useAppStore } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { SiteNav } from "@/components/site-nav";
import { useMetaTags } from "@/hooks/use-meta-tags";

const EXPLORE_CARDS = [
  {
    icon: BarChart3,
    label: "How It Works",
    desc: "The three-stage process — from entering your figures to unlocking the full settlement analysis.",
    href: "/how-it-works",
    testid: "card-explore-how-it-works",
  },
  {
    icon: FileText,
    label: "Settlement Examples",
    desc: "See real-style settlement structures across different family situations.",
    href: "/divorce-settlement-examples-uk",
    testid: "card-explore-examples",
  },
  {
    icon: HelpCircle,
    label: "Full FAQ",
    desc: "Questions about divorce law, the platform, your data, and how to interpret results.",
    href: "/faq",
    testid: "card-explore-faq",
  },
  {
    icon: BookOpen,
    label: "Free Guide",
    desc: "The UK Divorce Finances Guide — five chapters covering the essentials before you model anything.",
    href: "/free-guide",
    testid: "card-explore-guide",
  },
];

export default function LandingPage() {
  useDocumentTitle("Divorce Calculator UK (2026) | Financial Settlement Tool");
  useMetaTags({
    description: "See what every divorce settlement option means for your financial future. Compare Sell & Split, retain, and deferred sale — with sustainability scores and 5-year projections. England and Wales. Free to start.",
    canonical: "https://divorcecalculatoruk.co.uk/",
    ogTitle: "Divorce Calculator UK (2026) | Financial Settlement Tool",
    ogDescription: "Model different divorce financial settlement scenarios with UK 2026/27 tax rules applied. Compare sell vs retain options and understand long-term outcomes.",
  });

  const [, setLocation] = useLocation();
  const loadState = useAppStore((s) => s.loadState);
  const reset = useAppStore((s) => s.reset);

  const startFresh = () => { scrollTop(); reset(); setLocation("/wizard"); };

  const loadExample = () => {
    const example = EXAMPLE_SCENARIOS[0];
    loadState(example.data);
    setLocation("/preview");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20" data-testid="text-disclaimer">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <SiteNav onStartClick={startFresh} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary" data-testid="section-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(220_60%_35%),_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline" className="text-xs px-3 py-1 border-gold/50 text-gold bg-gold/10">
                UK 2026/27 Tax &amp; NI Rates
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-white" data-testid="text-hero-headline">
              Stop negotiating your divorce blind.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              In 20 minutes, see exactly what each settlement option means for your financial future — which ones are sustainable, which leave you stretched, and what your money looks like in five years under each. Free to start. No sign-up.
            </p>
            <p className="text-sm text-white/50 leading-relaxed border-l-2 border-gold/40 pl-3 text-left">
              If you're here, you're probably trying to make sense of a situation that feels financially overwhelming. You're not sure what you're entitled to, you're worried about the house, and you don't know whether you can afford to keep it. That's exactly what this is for.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
              <Button
                size="lg"
                onClick={startFresh}
                data-testid="button-hero-start"
                className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
              >
                Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => { scrollTop(); setLocation("/unlock"); }}
                data-testid="button-hero-buy-now"
                className="border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                Unlock My Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40 pt-1">
              <span>Private. All calculations run in your browser.</span>
              <span>·</span>
              <button
                onClick={loadExample}
                className="underline underline-offset-2 text-white/55 hover:text-white transition-colors"
                data-testid="button-hero-example"
              >
                View example →
              </button>
              <span>·</span>
              <Link href="/free-guide" onClick={scrollTop} className="underline underline-offset-2 text-white/55 hover:text-white transition-colors" data-testid="link-hero-free-guide">
                Free guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore grid ── */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-explore">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-explore-headline">
              Explore the platform
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Understand how it works, see example settlements, read the guides — or just start entering your figures.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {EXPLORE_CARDS.map((card) => (
              <Link key={card.href} href={card.href} onClick={scrollTop} data-testid={card.testid}>
                <Card className="h-full hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="pt-5 pb-5 space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <card.icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{card.label}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary font-medium pl-13">
                      Explore <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 md:py-20 bg-primary" data-testid="section-pricing">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full">
            One-time payment · No subscription
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white" data-testid="text-pricing-headline">
            The full picture. <span className="text-gold">&pound;79</span>. Yours for 12 months.
          </h2>
          <p className="text-white/65 leading-relaxed">
            The free version shows you the shape of your settlement. The full analysis shows you whether you can live on it. Twelve months of unlimited re-runs — so you can revisit as your situation develops.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center max-w-md mx-auto py-6 border-y border-white/10">
            <div>
              <p className="text-2xl font-bold text-gold">20 min</p>
              <p className="text-xs text-white/55 mt-1">First analysis complete</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gold">12 months</p>
              <p className="text-xs text-white/55 mt-1">Unlimited re-runs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gold">100%</p>
              <p className="text-xs text-white/55 mt-1">Private &amp; secure</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              "Full settlement comparison — all four options scored and ranked",
              "Financial Sustainability Indicator — know which option is genuinely viable",
              "5-year capital projections — see where your money stands under each option",
              "Stress testing — what happens if interest rates rise or income changes",
              "Downloadable Structured Financial Brief (PDF)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 justify-center text-left">
                <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="text-sm text-white/75">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              onClick={startFresh}
              data-testid="button-pricing-start"
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { scrollTop(); setLocation("/unlock"); }}
              data-testid="button-pricing-buy"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              Unlock My Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40 pt-2">
            <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /><span>All calculations in-browser</span></div>
            <span>&middot;</span>
            <div className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /><span>No data stored on servers</span></div>
            <span>&middot;</span>
            <div className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /><span>Stripe-secured payments</span></div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pt-12 pb-8 bg-primary border-t border-white/10" data-testid="section-footer">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <Link href="/" onClick={scrollTop} className="inline-block mb-3 group">
                <span className="font-display font-bold text-white text-sm tracking-tight group-hover:text-gold transition-colors">DivorceCalculatorUK</span>
              </Link>
              <p className="text-xs text-white/40 leading-relaxed">
                Illustrative financial modelling for separation and divorce in England &amp; Wales.
              </p>
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
    </div>
  );
}
