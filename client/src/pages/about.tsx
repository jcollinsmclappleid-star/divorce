import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Lock, FileText, BarChart3, TrendingUp, Scale } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { useLocation } from "wouter";
import { SiteNav } from "@/components/site-nav";

export default function AboutPage() {
  useDocumentTitle("About Divorce Calculator UK | Financial Modelling Tool");
  useMetaTags({
    description: "About Divorce Calculator UK — a free financial modelling tool for people going through divorce or separation in England and Wales. Based on the Matrimonial Causes Act 1973.",
    canonical: "https://divorcecalculatoruk.co.uk/about",
    ogTitle: "About Divorce Calculator UK",
    ogDescription: "What this tool does, how it works, what it covers, and what it doesn't do. Free UK divorce financial settlement modelling.",
  });

  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <SiteNav />

      <section className="py-14 md:py-20 bg-primary">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-5">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight" data-testid="text-about-headline">
            About Divorce Calculator UK
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            A structured financial modelling tool for people going through divorce or separation in England and Wales — built to help you understand your financial position before spending thousands on legal fees.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-10">

          <div className="space-y-4 p-6 rounded-xl bg-muted/30 border border-border">
            <p className="text-foreground leading-relaxed">
              Divorce is already one of the hardest things a person goes through. The financial side shouldn't also be a mystery.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We built Divorce Calculator UK because most people arrive at the most important financial negotiation of their lives with nothing but anxiety and guesswork. They don't know what they're entitled to. They don't know whether they can keep the house. They don't know what each settlement option actually means for their monthly income, their capital position, or their financial stability in five years. We think that's wrong.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You deserve to know your numbers — before the first meeting, before the first offer, before you sign anything. That's what this platform is for.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold">What this platform is</h2>
            <p className="text-muted-foreground leading-relaxed">
              Divorce Calculator UK is a financial clarity platform for people navigating separation and divorce in England and Wales. It applies the principles of English and Welsh family law — primarily the Matrimonial Causes Act 1973 — to show how assets, property, pensions, savings and debts might be divided across different settlement structures, and what each one means for your financial future.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every calculation applies UK 2025/26 HMRC income tax and National Insurance rates. It models mortgage affordability against indicative income multiples, and projects how capital positions may change over five years under each settlement option. All calculations run entirely in your browser — no financial data is ever transmitted to our servers.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold">What it covers</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Scale, label: "Property & house division", desc: "Sell & split, retain, deferred sale, buyout calculations" },
                { icon: TrendingUp, label: "Pensions", desc: "Sharing, offsetting and attachment across all scenario types" },
                { icon: BarChart3, label: "Assets & savings", desc: "Savings, ISAs, investments, joint accounts and liquid capital" },
                { icon: FileText, label: "Debts & liabilities", desc: "Joint and sole debts, credit cards, loans, negative equity" },
                { icon: ArrowRight, label: "Income & maintenance", desc: "Spousal and child maintenance, monthly surplus/deficit per party" },
                { icon: TrendingUp, label: "5-year projections", desc: "Capital sustainability modelling under each settlement structure" },
              ].map((item) => (
                <Card key={item.label} className="border-border/60">
                  <CardContent className="pt-4 pb-4 flex items-start gap-3">
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold">Legal basis</h2>
            <p className="text-muted-foreground leading-relaxed">
              The modelling framework reflects English and Welsh family law under the Matrimonial Causes Act 1973, which gives courts broad discretion to achieve a fair outcome considering needs, contributions, and the welfare of children. This tool models financial structures and outcomes — it does not replicate judicial discretion, predict court orders, or assess legal entitlement.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This tool is not applicable to Scottish law, which operates under different legislation.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold">What this tool is not</h2>
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-200">
              <ul className="space-y-2 text-sm text-amber-900 leading-relaxed">
                <li>Not legal advice — it does not predict what a court would order or assess legal entitlement</li>
                <li>Not financial advice — it is not regulated by the FCA or authorised to provide investment or financial planning recommendations</li>
                <li>Not tax advice — it applies a simplified income tax and NI model only; it excludes CGT, dividend rates, Scottish rates and many reliefs</li>
                <li>Not a lending assessment — affordability benchmarks are illustrative income multiples only, not lender decisions</li>
                <li>Not applicable to Scottish law or jurisdictions outside England and Wales</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Independent professional advice from a family solicitor or regulated financial adviser may be warranted before making financial decisions. Full methodology is available on the <Link href="/methodology" className="underline text-primary">Model Methodology</Link> page.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold">Pricing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Entering your financial details and viewing your asset pool is completely free. There is no account required and no subscription. A one-time payment of £79 unlocks the full structured analysis — including all scenario comparisons, Financial Sustainability Indicator scores, 5-year projections, stress testing, and a downloadable PDF Structured Financial Brief — with 12 months of unlimited re-runs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Average UK divorce legal fees are £12,000–£15,000 per person. This tool is designed to help you prepare before those conversations begin, not to replace them.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold">Privacy & data</h2>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border/50">
              <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                All financial calculations run entirely in your browser. The financial data you enter is never transmitted to our servers. Payment processing is handled securely by Stripe. See the <Link href="/privacy" className="underline text-primary">Privacy Policy</Link> for full details.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold">Contact & support</h2>
            <p className="text-muted-foreground leading-relaxed">
              For support, access recovery, or questions about your purchase, contact us at <a href="mailto:support@divorcecalculatoruk.co.uk" className="underline text-primary">support@divorcecalculatoruk.co.uk</a>. We do not provide legal or financial advice by email.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For more detail on how the model works, read the <Link href="/methodology" className="underline text-primary">Model Methodology</Link> page. For an accessible introduction to UK divorce finances, read the <Link href="/free-guide" className="underline text-primary">Free UK Divorce Finances Guide</Link>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/40">
            <Button
              onClick={() => { scrollTop(); setLocation("/wizard"); }}
              data-testid="button-about-start"
              className="bg-gold hover:bg-gold/90 text-white border-0"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button variant="outline" asChild>
              <Link href="/divorce-financial-guides" onClick={scrollTop} data-testid="link-about-guides">
                Browse all guides <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8 bg-muted/20">
        <div className="container mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center">
            <Logo href="/" size="sm" showBrandName />
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/divorce-financial-guides" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Guides</Link>
            <Link href="/methodology" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Methodology</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground/60">&copy; {new Date().getFullYear()} Divorce Calculator UK. Illustrative financial modelling only. Not legal, tax or financial advice.</p>
        </div>
      </footer>
    </div>
  );
}
