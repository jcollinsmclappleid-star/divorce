import { useLocation, Link } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { scrollTop } from "@/lib/utils";
import { ArrowRight, Home, Scale, PiggyBank, Users, TrendingUp, BookOpen, Calculator } from "lucide-react";

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
      icon: Home,
      title: "Property & Housing",
      links: [
        { href: "/can-i-keep-the-house-after-divorce-uk", label: "Who gets the house — and can I keep it?", desc: "The four main options for the family home — sell, buyout, Mesher order, or transfer — and how courts weigh affordability." },
        { href: "/how-is-property-divided-in-divorce-uk", label: "How is property divided in divorce?", desc: "The legal principles and process for dividing the family home and any other property in England and Wales." },
        { href: "/divorce-house-buyout-calculator-uk", label: "House buyout calculator", desc: "Model the equity split and financial implications of one party retaining the family home." },
        { href: "/both-names-on-mortgage-divorce-uk", label: "Both names on the mortgage — what happens?", desc: "Your options when the mortgage is in joint names and you are separating." },
        { href: "/can-i-force-sale-of-house-after-divorce-uk", label: "Can I force the sale of the house?", desc: "When a court can order a jointly owned property to be sold — and how long it takes." },
        { href: "/who-pays-mortgage-during-divorce-uk", label: "Who pays the mortgage during divorce?", desc: "How courts typically approach mortgage payments while separation proceedings are ongoing." },
        { href: "/buying-partner-out-of-house-divorce-uk", label: "Buying your partner out of the house", desc: "How a buyout works — equity, mortgage transfer, and the costs involved." },
        { href: "/transfer-of-equity-divorce-uk", label: "Transfer of equity in divorce", desc: "The legal process for moving the family home from joint names into sole ownership." },
        { href: "/unmarried-separating-house-uk", label: "Unmarried couples separating — property rights", desc: "How property is handled differently for cohabiting couples without marriage protections." },
        { href: "/divorce-mortgage-affordability-after-separation", label: "Mortgage affordability after separation", desc: "What lenders look at when one party wants to retain the home or buy a new property on a single income." },
      ],
    },
    {
      icon: Scale,
      title: "Legal Orders & Process",
      links: [
        { href: "/how-much-does-divorce-cost-uk", label: "How much does divorce cost in the UK?", desc: "Court fees, solicitor costs, mediation costs, and how financial preparation can reduce the total." },
        { href: "/timeline-of-divorce-and-financial-settlement-uk", label: "Timeline of divorce and financial settlement", desc: "The complete timeline from separation through conditional order, consent order, and final order." },
        { href: "/how-long-does-divorce-financial-settlement-take-uk", label: "How long does a financial settlement take?", desc: "Typical timelines by route — agreed settlement, FDR hearing, and contested final hearing." },
        { href: "/what-is-a-consent-order-uk-divorce", label: "What is a consent order?", desc: "How to make a financial agreement legally binding with a court-approved consent order." },
        { href: "/what-is-a-clean-break-order-uk", label: "What is a clean break order?", desc: "A clean break ends all future financial claims — when it is used and when it is not appropriate." },
        { href: "/consent-order-vs-clean-break-order-uk", label: "Consent order vs clean break order", desc: "The key differences between the two main types of financial order and when each is used." },
        { href: "/financial-disclosure-divorce-uk", label: "Financial disclosure in divorce", desc: "What you are legally required to disclose — and the consequences of failing to do so." },
        { href: "/financial-remedy-proceedings-uk", label: "Financial remedy proceedings", desc: "The three-stage court process — FDA, FDR, and Final Hearing — and what happens at each stage." },
        { href: "/when-is-divorce-financial-settlement-legally-binding-uk", label: "When is a financial settlement legally binding?", desc: "Why informal agreements are not enough — and what makes a settlement enforceable in law." },
        { href: "/can-i-reopen-divorce-settlement-uk", label: "Can I reopen a divorce settlement?", desc: "The limited circumstances in which a court may revisit a previously agreed financial order." },
        { href: "/how-long-after-divorce-can-financial-claims-be-made-uk", label: "How long after divorce can claims be made?", desc: "The time limits on financial claims — and why obtaining a clean break order matters." },
        { href: "/can-i-refuse-divorce-financial-settlement-uk", label: "Can I refuse a financial settlement?", desc: "What happens if you disagree with proposed settlement terms — and when courts impose an outcome." },
        { href: "/can-i-divorce-without-financial-settlement-uk", label: "Can I divorce without a financial settlement?", desc: "The risks of finalising a divorce without a financial order — and when it may be acceptable." },
        { href: "/ex-doesnt-agree-settlement-uk", label: "My ex doesn't agree with the settlement", desc: "What to do when the other party refuses to negotiate or accept reasonable proposals." },
        { href: "/steps-after-final-order-finances-uk", label: "Steps after the final order — finances", desc: "What to do once the divorce is finalised — implementing the financial settlement in practice." },
        { href: "/can-i-hide-assets-in-divorce-uk", label: "Can I hide assets in divorce?", desc: "Why concealing assets is a serious legal offence — and how courts and solicitors detect it." },
        { href: "/spouse-refuses-financial-disclosure-uk", label: "Spouse refuses financial disclosure", desc: "What you can do when the other party will not provide financial information." },
        { href: "/what-happens-to-debts-in-divorce-uk", label: "What happens to debts in divorce?", desc: "How joint and sole debts are handled in the financial settlement process." },
        { href: "/mediation-vs-court-divorce-uk-costs", label: "Mediation vs court — costs compared", desc: "The dramatic cost difference between mediation (£1,500–£5,000) and contested court proceedings (£20,000–£100,000+)." },
        { href: "/divorce-solicitor-vs-mediation-uk", label: "Solicitor vs mediation — which to use?", desc: "When each route is appropriate — and when you need both a mediator and a solicitor." },
        { href: "/settling-out-of-court-vs-court-divorce-uk", label: "Settling out of court vs court proceedings", desc: "The full comparison of time, cost, control over the outcome, and emotional impact." },
        { href: "/divorce-mediation-process-uk", label: "The divorce mediation process — step by step", desc: "The full mediation process from MIAM through to Memorandum of Understanding and consent order." },
        { href: "/divorce-financial-checklist-before-mediation", label: "Financial checklist before mediation", desc: "Everything you need to gather and prepare before your first mediation session." },
      ],
    },
    {
      icon: PiggyBank,
      title: "Assets & Savings",
      links: [
        { href: "/divorce-financial-settlement-calculator-uk", label: "How assets are divided in a UK divorce", desc: "A full overview of the financial settlement process — from disclosure to consent order." },
        { href: "/divorce-settlement-examples-uk", label: "UK divorce settlement examples", desc: "Four illustrative examples showing how different asset positions lead to different settlement structures." },
        { href: "/is-50-50-split-automatic-uk", label: "Is a 50/50 split automatic in UK divorce?", desc: "Why equal division is the starting point — but not always the outcome courts reach." },
        { href: "/divorce-50-50-split-calculator-uk", label: "50/50 split calculator", desc: "Model an equal division and compare it against other settlement structures side by side." },
        { href: "/divorce-settlement-no-assets-uk", label: "Divorce settlement with no assets", desc: "What happens when there are few or no assets to divide — and what courts focus on instead." },
        { href: "/how-are-savings-split-in-divorce-uk", label: "How are savings split in divorce?", desc: "How courts approach joint and sole savings accounts in financial settlements." },
        { href: "/how-are-investments-divided-in-divorce-uk", label: "How are investments divided in divorce?", desc: "Shares, ISAs, bonds, and other investment assets — the treatment in UK divorce proceedings." },
        { href: "/joint-bank-accounts-after-divorce-uk", label: "Joint bank accounts after divorce", desc: "What happens to joint accounts during and after separation — and how to protect yourself." },
        { href: "/can-ex-claim-inheritance-uk-divorce", label: "Can my ex claim my inheritance in divorce?", desc: "When courts include inherited wealth in the asset pool — and when they do not." },
        { href: "/is-inheritance-included-in-divorce-settlement-uk", label: "Is inheritance included in the divorce settlement?", desc: "The key factors courts weigh when one party has received an inheritance." },
        { href: "/how-are-pensions-divided-in-divorce-uk", label: "How are pensions divided in divorce?", desc: "Pension sharing orders, offsetting, CETV, and defined benefit vs defined contribution pensions." },
        { href: "/divorce-pension-split-calculator-uk", label: "Pension split calculator", desc: "Model pension sharing assumptions alongside your other assets in our financial modelling tool." },
        { href: "/divorce-pension-offsetting-uk", label: "Pension offsetting vs pension sharing", desc: "Trading pension value against other assets — when offsetting makes sense and how it is valued." },
      ],
    },
    {
      icon: Users,
      title: "Children",
      links: [
        { href: "/divorce-with-children-financial-settlement-uk", label: "Divorce with children — financial settlement", desc: "How children's needs shape the overall financial settlement — housing, income, and maintenance." },
        { href: "/how-does-child-custody-affect-financial-settlement-uk", label: "How does child custody affect the financial settlement?", desc: "The link between living arrangements for children and the housing and income settlement." },
        { href: "/child-maintenance-vs-spousal-maintenance-uk", label: "Child maintenance vs spousal maintenance", desc: "The key differences between CMS child support and court-ordered spousal maintenance." },
        { href: "/who-pays-what-after-divorce-with-children-uk", label: "Who pays what after divorce with children?", desc: "The allocation of ongoing financial responsibilities for housing, bills, and child costs." },
        { href: "/does-having-children-change-divorce-settlement-uk", label: "Does having children change the settlement?", desc: "Precisely how children influence asset division, housing decisions, and maintenance orders." },
      ],
    },
    {
      icon: TrendingUp,
      title: "Income & Earnings",
      links: [
        { href: "/divorce-where-one-earns-more-uk", label: "Divorce where one partner earns more", desc: "How income inequality and the needs principle typically shape financial outcomes." },
        { href: "/how-much-maintenance-after-divorce-uk", label: "How much maintenance after divorce?", desc: "How courts calculate spousal maintenance — the factors considered, the range, and how long it lasts." },
        { href: "/spousal-maintenance-after-divorce-uk", label: "Spousal maintenance — a complete guide", desc: "How spousal maintenance is calculated, how long it lasts, and what a clean break alternative looks like." },
      ],
    },
    {
      icon: Calculator,
      title: "Tools & Resources",
      links: [
        { href: "/", label: "Divorce Calculator UK", desc: "Model different settlement scenarios based on your actual figures — property, pensions, income, and debts." },
        { href: "/divorce-financial-modelling", label: "Divorce Financial Modelling Guide", desc: "Comprehensive guide to structured financial scenario modelling for separation in England and Wales." },
        { href: "/free-guide", label: "Free UK Divorce Finances Guide", desc: "Five chapters covering the full financial process — from disclosure through to implementing your settlement." },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />

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
