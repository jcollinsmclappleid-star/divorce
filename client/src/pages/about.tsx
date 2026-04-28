import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, Shield, Lock, FileText, BarChart3, TrendingUp,
  Scale, Home, PiggyBank, Users, AlertTriangle, CheckCircle2,
} from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { useLocation } from "wouter";
import { SiteNav } from "@/components/site-nav";

const COVERS = [
  { icon: Home, label: "Property & house division", desc: "Sell & split, retain, deferred sale, and buyout — modelled for both parties", iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
  { icon: PiggyBank, label: "Pensions", desc: "Sharing, offsetting and attachment across all scenario types", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  { icon: BarChart3, label: "Assets & savings", desc: "Savings, ISAs, investments, joint accounts and liquid capital", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
  { icon: FileText, label: "Debts & liabilities", desc: "Joint and sole debts, credit cards, loans, negative equity", iconBg: "bg-rose-50", iconColor: "text-rose-600" },
  { icon: Users, label: "Income & maintenance", desc: "Spousal and child maintenance, monthly surplus/deficit per party", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { icon: TrendingUp, label: "5-year projections", desc: "Capital sustainability modelling under each settlement structure", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
];

const NOT_LIST = [
  "Not legal advice — does not predict what a court would order or assess legal entitlement",
  "Not financial advice — not regulated by the FCA or authorised to provide investment or financial planning recommendations",
  "Not tax advice — applies a simplified income tax and NI model only; excludes CGT, dividend rates, Scottish rates and many reliefs",
  "Not a lending assessment — affordability benchmarks are illustrative income multiples only, not lender decisions",
  "Not applicable to Scottish law or jurisdictions outside England and Wales",
];

export default function AboutPage() {
  useDocumentTitle("About Divorce Calculator UK | Financial Modelling Tool");
  useMetaTags({
    description: "Divorce Calculator UK models divorce financial settlements for England and Wales — free to start, no sign-up. Based on the Matrimonial Causes Act 1973. Not legal or financial advice.",
    canonical: "https://divorcecalculatoruk.co.uk/about",
    ogTitle: "About Divorce Calculator UK — Financial Modelling Tool",
    ogDescription: "Free divorce financial modelling for England and Wales. See what every settlement option means for your money. Not legal advice.",
    ogUrl: "https://divorcecalculatoruk.co.uk/about",
    ogType: "website",
  });

  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-[hsl(220_52%_10%)] text-white/65 px-4 py-1.5 text-xs text-center font-medium">
        Illustrative modelling only <span className="text-gold/50 mx-1">·</span> Not legal, tax or financial advice
      </div>

      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-16 md:py-24" data-testid="section-about-hero">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-96 h-40 rounded-full bg-gold/5 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 max-w-3xl text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 mb-2">
            <Scale className="w-3.5 h-3.5" /> England &amp; Wales · 2026/27 tax rules
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight" data-testid="text-about-headline">
            About Divorce Calculator UK
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            A structured financial modelling tool for people going through divorce or separation in England and Wales — built to help you understand your financial position before spending thousands on legal fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              onClick={() => { scrollTop(); setLocation("/wizard"); }}
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/30 h-11 px-6 font-semibold btn-shimmer"
              data-testid="button-hero-start"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button variant="outline" asChild className="bg-white/10 border-white/25 text-white hover:bg-white/20 h-11">
              <Link href="/divorce-financial-guides" onClick={scrollTop} data-testid="link-hero-guides">
                Read the free guides
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-12 bg-muted/20 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-4 p-6 rounded-xl bg-white border border-border/60 shadow-sm">
            <p className="text-foreground leading-relaxed font-medium">
              Divorce is already one of the hardest things a person goes through. The financial side shouldn't also be a mystery.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              We built Divorce Calculator UK because most people arrive at the most important financial negotiation of their lives with nothing but anxiety and guesswork. They don't know where they stand financially. They don't know whether they can afford to keep the house. They don't know what each settlement option means for their monthly income, their capital position, or their financial stability in five years. We think that's wrong.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              You deserve to know your numbers — before the first meeting, before the first offer, before you sign anything.
            </p>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="py-12 md:py-16" data-testid="section-what-it-is">
        <div className="container mx-auto px-4 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center bg-cyan-100 text-cyan-700 text-xs font-semibold px-2.5 py-1 rounded-full">What this platform is</span>
          </div>
          <h2 className="text-2xl font-display font-bold">Scenario modelling for England &amp; Wales</h2>
          <p className="text-muted-foreground leading-relaxed">
            Divorce Calculator UK is a financial clarity platform for people navigating separation and divorce in England and Wales. It is structured around general principles of English and Welsh family law — with reference to factors courts commonly consider under the Matrimonial Causes Act 1973 — to illustrate how assets, property, pensions, savings and debts might be divided across different settlement structures, and what each could mean for your financial future. It does not apply the law, predict court outcomes, or constitute legal advice.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every calculation applies UK 2026/27 HMRC income tax and National Insurance rates as illustrative estimates. It models mortgage affordability against indicative income multiples, and projects how capital positions may change over five years under each settlement option. Core calculations run entirely in your browser. No names or contact details are ever included in any processing.
          </p>
        </div>
      </section>

      {/* What it covers */}
      <section className="py-10 md:py-14 bg-muted/20 border-y border-border/40" data-testid="section-what-it-covers">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <div>
            <span className="inline-flex items-center bg-violet-100 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">Coverage</span>
            <h2 className="text-2xl font-display font-bold">What it covers</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {COVERS.map((item) => (
              <Card key={item.label} className="border-border/60 bg-white" data-testid={`card-covers-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                <CardContent className="pt-4 pb-4 flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} />
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
      </section>

      {/* Legal basis */}
      <section className="py-12 md:py-16" data-testid="section-legal-basis">
        <div className="container mx-auto px-4 max-w-3xl space-y-4">
          <span className="inline-flex items-center bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-1">Legal basis</span>
          <h2 className="text-2xl font-display font-bold">Matrimonial Causes Act 1973</h2>
          <p className="text-muted-foreground leading-relaxed">
            The modelling framework reflects English and Welsh family law under the Matrimonial Causes Act 1973, which gives courts broad discretion to achieve a fair outcome considering needs, contributions, and the welfare of children. This tool models financial structures and outcomes — it does not replicate judicial discretion, predict court orders, or assess legal entitlement.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This tool is not applicable to Scottish law, which operates under different legislation.
          </p>
        </div>
      </section>

      {/* What it is NOT */}
      <section className="py-10 md:py-12 bg-amber-50/50 border-y border-amber-200/60" data-testid="section-not-advice">
        <div className="container mx-auto px-4 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-display font-bold text-amber-900">What this tool is not</h2>
          </div>
          <ul className="space-y-2.5">
            {NOT_LIST.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-amber-900 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-amber-800/80 pt-1">
            Independent professional advice from a family solicitor or regulated financial adviser may be warranted before making financial decisions. Full methodology is available on the{" "}
            <Link href="/methodology" className="underline font-medium">Model Methodology</Link> page.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-16" data-testid="section-pricing">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">Pricing</span>
          </div>
          <h2 className="text-2xl font-display font-bold mb-4">Free to start — £79 for the full analysis</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border-2 border-border/60 p-5 space-y-3 bg-white">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Free access</p>
              <p className="text-2xl font-bold">£0</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Enter your full financial picture", "Asset pool summary", "Preview your scenarios (blurred)", "Free UK Divorce Finance Guide"].map((f) => (
                  <li key={f} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-gold/40 bg-gold/5 p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Full access</div>
              <p className="text-xs font-semibold text-gold/80 uppercase tracking-wide">One-time payment</p>
              <p className="text-2xl font-bold text-gold">£79</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "All 4 settlement scenarios compared",
                  "Cashflow Resilience Indicator (CRI) scores",
                  "5-year capital projections",
                  "Stress testing sliders",
                  "Downloadable PDF brief",
                  "12 months unlimited re-runs",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Average UK divorce legal fees are £12,000–£15,000 per person. This tool is designed to help you prepare before those conversations begin — not to replace them. Questions about your results? Email support@divorcecalculatoruk.co.uk within 7 days and we'll help.
          </p>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-10 md:py-12 bg-emerald-50/40 border-y border-emerald-200/50" data-testid="section-privacy">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-display font-bold text-emerald-900">Privacy &amp; your data</h2>
              <p className="text-sm text-emerald-800/80 leading-relaxed">
                Core financial calculations run entirely in your browser. No names or contact details are ever included in any processing. Your session is stored only in your browser's local storage. Payment processing is handled securely by Stripe. See the{" "}
                <Link href="/privacy" className="underline font-medium">Privacy Policy</Link> for full details.
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-xs text-emerald-700/70 font-medium">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> No server-side financial data</span>
                <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Browser-only calculations</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> GDPR compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 md:py-16" data-testid="section-contact">
        <div className="container mx-auto px-4 max-w-3xl space-y-4">
          <span className="inline-flex items-center bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-1">Contact &amp; support</span>
          <h2 className="text-2xl font-display font-bold">Questions?</h2>
          <p className="text-muted-foreground leading-relaxed">
            For support, access recovery, or questions about your purchase, contact us at{" "}
            <a href="mailto:support@divorcecalculatoruk.co.uk" className="underline text-primary font-medium">support@divorcecalculatoruk.co.uk</a>. We do not provide legal or financial advice by email.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For more detail on how the model works, read the <Link href="/methodology" className="underline text-primary">Model Methodology</Link> page. For an accessible introduction to UK divorce finances, read the <Link href="/free-guide" className="underline text-primary">Free UK Divorce Finances Guide</Link>.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-16 bg-primary" data-testid="section-about-cta">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Ready to see your financial picture?</h2>
          <p className="text-white/65 text-sm max-w-lg mx-auto leading-relaxed">Free to start. No account required. All calculations run privately in your browser.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => { scrollTop(); setLocation("/wizard"); }}
              data-testid="button-about-start"
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/30 h-11 px-6 font-semibold btn-shimmer"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button variant="outline" asChild className="bg-white/10 border-white/25 text-white hover:bg-white/20 h-11">
              <Link href="/divorce-financial-guides" onClick={scrollTop} data-testid="link-about-guides">
                Browse all guides
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
