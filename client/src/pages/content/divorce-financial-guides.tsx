import { useLocation, Link } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { scrollTop } from "@/lib/utils";
import { ArrowRight, Home, Scale, PiggyBank, Users, TrendingUp, BookOpen, Calculator } from "lucide-react";

const SECTION_ACCENTS: Record<string, { iconBg: string; iconColor: string; pillBg: string; pillText: string; hoverBorder: string }> = {
  "Property & Housing": { iconBg: "bg-cyan-100", iconColor: "text-cyan-600", pillBg: "bg-cyan-100", pillText: "text-cyan-700", hoverBorder: "hover:border-cyan-300 hover:bg-cyan-50/40" },
  "Legal Orders & Process": { iconBg: "bg-violet-100", iconColor: "text-violet-600", pillBg: "bg-violet-100", pillText: "text-violet-700", hoverBorder: "hover:border-violet-300 hover:bg-violet-50/40" },
  "Assets & Savings": { iconBg: "bg-amber-100", iconColor: "text-amber-600", pillBg: "bg-amber-100", pillText: "text-amber-700", hoverBorder: "hover:border-amber-300 hover:bg-amber-50/40" },
  "Children": { iconBg: "bg-rose-100", iconColor: "text-rose-500", pillBg: "bg-rose-100", pillText: "text-rose-700", hoverBorder: "hover:border-rose-300 hover:bg-rose-50/40" },
  "Income & Earnings": { iconBg: "bg-emerald-100", iconColor: "text-emerald-600", pillBg: "bg-emerald-100", pillText: "text-emerald-700", hoverBorder: "hover:border-emerald-300 hover:bg-emerald-50/40" },
  "Tools & Resources": { iconBg: "bg-blue-100", iconColor: "text-blue-600", pillBg: "bg-blue-100", pillText: "text-blue-700", hoverBorder: "hover:border-blue-300 hover:bg-blue-50/40" },
};

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
        { href: "/mesher-vs-martin-order-uk", label: "Mesher vs Martin order — deferred sale explained", desc: "Two ways to defer the sale of the family home — when each is used and the practical pressure points." },
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
        { href: "/form-e-financial-disclosure-uk", label: "Form E financial disclosure — what goes into it", desc: "A breakdown of the eight sections of Form E and the documents you'll need to gather." },
        { href: "/financial-remedy-proceedings-uk", label: "Financial remedy proceedings", desc: "The three-stage court process — FDA, FDR, and Final Hearing — and what happens at each stage." },
        { href: "/section-25-factors-divorce-uk", label: "Section 25 factors — the legal framework", desc: "The eight statutory factors UK courts consider when deciding a financial settlement." },
        { href: "/what-am-i-entitled-to-in-divorce-uk", label: "What am I entitled to in a UK divorce?", desc: "How the framework typically plays out — needs, sharing, and the role of contributions." },
        { href: "/lump-sum-order-divorce-uk", label: "Lump sum order — single payments and instalments", desc: "How lump sum orders work, when they're used, and how they fit alongside other orders." },
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
        { href: "/pension-sharing-vs-offsetting-uk", label: "Pension sharing vs pension offsetting compared", desc: "The trade-offs between the two approaches — when each is right and the £ pension vs £ cash issue." },
        { href: "/matrimonial-vs-non-matrimonial-assets-uk", label: "Matrimonial vs non-matrimonial assets", desc: "What can be ring-fenced from the settlement — and what conditions apply." },
        { href: "/pre-marital-assets-divorce-uk", label: "Pre-marital assets in divorce", desc: "How assets brought into the marriage are treated — and the steps that strengthen protection." },
        { href: "/capital-gains-tax-on-divorce-uk", label: "Capital gains tax on divorce", desc: "The no-gain/no-loss window, PPR relief, and where CGT really matters in a settlement." },
        { href: "/cryptocurrency-divorce-uk", label: "Cryptocurrency in UK divorce", desc: "How crypto is disclosed, valued, split and taxed in UK divorce settlements." },
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
        { href: "/stay-at-home-parent-divorce-settlement-uk", label: "Stay-at-home parent divorce settlement", desc: "How UK law recognises the homemaking contribution — pensions, housing and maintenance considerations." },
      ],
    },
    {
      icon: TrendingUp,
      title: "Income & Earnings",
      links: [
        { href: "/divorce-where-one-earns-more-uk", label: "Divorce where one partner earns more", desc: "How income inequality and the needs principle typically shape financial outcomes." },
        { href: "/how-much-maintenance-after-divorce-uk", label: "How much maintenance after divorce?", desc: "How courts calculate spousal maintenance — the factors considered, the range, and how long it lasts." },
        { href: "/spousal-maintenance-after-divorce-uk", label: "Spousal maintenance — a complete guide", desc: "How spousal maintenance is calculated, how long it lasts, and what a clean break alternative looks like." },
        { href: "/short-marriage-divorce-settlement-uk", label: "Short marriage divorce settlement", desc: "How short marriages are typically approached — pre-marital protection and the role of children." },
        { href: "/long-marriage-divorce-settlement-uk", label: "Long marriage divorce settlement", desc: "Equal sharing as the starting point in long marriages — and where outcomes typically depart from 50/50." },
        { href: "/self-employed-divorce-uk", label: "Self-employed divorce — income and business value", desc: "How self-employment income, business value, and director's loan accounts are handled." },
        { href: "/bonuses-rsus-divorce-uk", label: "Bonuses, RSUs and stock options in divorce", desc: "How variable pay components are valued and apportioned in UK divorce settlements." },
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

      {/* Hero */}
      <div className="relative overflow-hidden bg-primary py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-80 h-24 rounded-full bg-amber-500/5 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 max-w-3xl space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center bg-white/10 text-white/70 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/15">England &amp; Wales · 2026/27</span>
            <span className="inline-flex items-center bg-white/10 text-white/70 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/15">50+ guides</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight" data-testid="text-page-title">
            Divorce Financial Guides
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
            Understand how finances are divided in a UK divorce — property, pensions, costs, and settlement outcomes. Use the guides below to navigate every stage.
          </p>
          <Button
            size="sm"
            onClick={() => { scrollTop(); setLocation("/wizard"); }}
            data-testid="button-cta-hero"
            className="bg-gold hover:bg-gold/90 text-white border-0 shadow-md shadow-gold/25 btn-shimmer"
          >
            Start my financial model — free <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-10">

          {sections.map((section) => {
            const Icon = section.icon;
            const accent = SECTION_ACCENTS[section.title] ?? { iconBg: "bg-primary/10", iconColor: "text-primary", pillBg: "bg-primary/10", pillText: "text-primary", hoverBorder: "hover:border-primary/30 hover:bg-primary/5" };
            return (
              <section key={section.title} className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <div className={`w-8 h-8 rounded-lg ${accent.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${accent.iconColor}`} />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <span className={`ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full ${accent.pillBg} ${accent.pillText}`}>{section.links.length} guides</span>
                </div>
                <div className="space-y-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={scrollTop}
                      className="block group"
                      data-testid={`link-guide-${link.href.replace(/\//g, "")}`}
                    >
                      <div className={`p-4 rounded-lg border border-border/60 transition-all ${accent.hoverBorder}`}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-medium text-foreground group-hover:text-foreground transition-colors text-sm truncate">{link.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{link.desc}</p>
                          </div>
                          <ArrowRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-colors group-hover:${accent.iconColor}`} />
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
              <Link href="/unlock" onClick={scrollTop} className="text-primary hover:underline">Preview full report</Link>
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
