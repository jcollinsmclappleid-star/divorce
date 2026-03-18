import { useLocation, Link } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { ArrowRight, PoundSterling, Home, BookOpen, Scale, Calculator, TrendingUp } from "lucide-react";

export default function DivorceFinancialGuidesPage() {
  useDocumentTitle("Divorce Financial Guides UK | DivorceCalculatorUK");
  useMetaTags({
    description: "Understand how finances are divided in a UK divorce — property, pensions, costs, and settlement outcomes. Plain-English guides to help you navigate every stage.",
    canonical: "https://divorcecalculatoruk.co.uk/divorce-financial-guides",
    ogTitle: "Divorce Financial Guides UK | DivorceCalculatorUK",
    ogDescription: "Plain-English guides to UK divorce finances — property, pensions, costs, and how to estimate your financial settlement.",
  });
  const [, setLocation] = useLocation();

  const sections = [
    {
      icon: PoundSterling,
      title: "Divorce Costs",
      links: [
        { href: "/how-much-does-divorce-cost-uk", label: "How much does divorce cost in the UK?", desc: "Court fees, solicitor costs, mediation, and how financial preparation reduces spend." },
      ],
    },
    {
      icon: Home,
      title: "Property & Housing",
      links: [
        { href: "/can-i-keep-the-house-after-divorce-uk", label: "Can I keep the house after divorce?", desc: "Your four main options — sell, buyout, Mesher order, or transfer — and how courts decide." },
        { href: "/divorce-mortgage-affordability-after-separation", label: "Mortgage affordability after separation", desc: "What lenders look at when one party wants to buy out the other or buy a new home." },
        { href: "/divorce-house-buyout-calculator-uk", label: "House buyout calculator", desc: "Model the equity split and stamp duty implications of a buyout." },
      ],
    },
    {
      icon: TrendingUp,
      title: "Pensions & Assets",
      links: [
        { href: "/how-are-pensions-divided-in-divorce-uk", label: "How are pensions divided in divorce?", desc: "Pension sharing orders, offsetting, CETV, and defined benefit vs defined contribution." },
        { href: "/divorce-pension-split-calculator-uk", label: "Pension split calculator", desc: "Model pension sharing assumptions alongside your other assets." },
        { href: "/divorce-financial-settlement-calculator-uk", label: "How assets are divided in a UK divorce", desc: "A full overview of the financial settlement process — from disclosure to consent order." },
      ],
    },
    {
      icon: Scale,
      title: "Settlements",
      links: [
        { href: "/divorce-settlement-examples-uk", label: "UK divorce settlement examples", desc: "Four real-world style examples showing how assets, pensions, and maintenance are typically structured." },
        { href: "/is-50-50-split-automatic-uk", label: "Is a 50/50 split automatic in UK divorce?", desc: "Why equal division is the starting point — but not always the outcome." },
        { href: "/divorce-50-50-split-calculator-uk", label: "50/50 split calculator", desc: "Model an equal split and compare it against other settlement structures." },
        { href: "/divorce-financial-checklist-before-mediation", label: "Financial checklist before mediation", desc: "Everything you need to gather before your first mediation session." },
      ],
    },
    {
      icon: Calculator,
      title: "Tools",
      links: [
        { href: "/", label: "Divorce Calculator UK", desc: "Model different settlement scenarios based on your actual figures — property, pensions, income, and debts." },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/40 bg-background/95">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Logo size="md" href="/" />
          <Button variant="ghost" size="sm" onClick={() => { scrollTop(); setLocation("/"); }} data-testid="button-nav-home">Home</Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">England & Wales · 2025/26</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight leading-tight" data-testid="text-page-title">
              Divorce Financial Guides
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Understand how finances are divided in a UK divorce — including property, pensions, and settlement outcomes. Use the guides below to navigate each stage.
            </p>
          </div>

          <Card className="bg-primary text-white border-0">
            <CardContent className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white text-sm">Use our Divorce Calculator to estimate your financial split</p>
                <p className="text-xs text-white/70 mt-0.5">Model different scenarios based on your actual figures — property, pensions, income, and debts.</p>
              </div>
              <Button
                size="sm"
                onClick={() => { scrollTop(); setLocation("/wizard"); }}
                data-testid="button-cta-top"
                className="bg-gold hover:bg-gold/90 text-white border-0 shrink-0"
              >
                Start modelling <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.title} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Icon className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                </div>
                <div className="space-y-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={scrollTop}
                      className="block group"
                      data-testid={`link-guide-${link.href.replace(/\//g, "")}`}
                    >
                      <div className="p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">{link.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{link.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          <div className="text-center space-y-3 pt-4">
            <p className="text-sm text-muted-foreground">Also see:</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/free-guide" onClick={scrollTop} className="text-primary hover:underline">Free divorce finances guide</Link>
              <Link href="/methodology" onClick={scrollTop} className="text-primary hover:underline">Model methodology</Link>
              <Link href="/contact" onClick={scrollTop} className="text-primary hover:underline">Contact & support</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground space-x-4">
          <Link href="/privacy" onClick={scrollTop} className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" onClick={scrollTop} className="hover:text-foreground">Terms</Link>
          <Link href="/methodology" onClick={scrollTop} className="hover:text-foreground">Methodology</Link>
          <Link href="/" onClick={scrollTop} className="hover:text-foreground">Home</Link>
        </div>
      </footer>
    </div>
  );
}
