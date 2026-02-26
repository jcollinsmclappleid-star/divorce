import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Scale,
  Home,
  Wallet,
  TrendingUp,
  HeartPulse,
  Users,
  ArrowRight,
  CheckCircle,
  Building2,
  PiggyBank,
  Banknote,
  CreditCard,
} from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  ExternalLinkButton,
} from "@/components/content-page-layout";

const relatedPages = [
  {
    title: "Divorce 50/50 Split Calculator UK",
    description: "Model equal division scenarios and compare outcomes side by side.",
    href: "/divorce-50-50-split-calculator-uk",
    badge: "Calculator",
  },
  {
    title: "Divorce Financial Modelling",
    description: "Understand the full structured modelling framework for England & Wales.",
    href: "/divorce-financial-modelling",
    badge: "Pillar Guide",
  },
  {
    title: "Divorce House Buyout Calculator UK",
    description: "Calculate equity splits and affordability when one party retains the home.",
    href: "/divorce-house-buyout-calculator-uk",
    badge: "Property",
  },
];

const practiceItems = [
  { icon: Scale, text: "Establish a neutral baseline for negotiation" },
  { icon: TrendingUp, text: "Compare alternative percentage scenarios" },
  { icon: PiggyBank, text: "Highlight pension vs capital trade-offs" },
  { icon: Building2, text: "Assess mortgage affordability impact" },
  { icon: Wallet, text: "Identify potential liquidity pressure" },
];

const financialBreakdownItems = [
  { icon: Building2, label: "Property Equity", description: "Total property value minus outstanding mortgage balances and estimated sale costs." },
  { icon: PiggyBank, label: "Pension Values", description: "Cash Equivalent Transfer Values (CETVs) of all pension assets held by both parties." },
  { icon: Banknote, label: "Savings & Investments", description: "Bank accounts, ISAs, investment portfolios, and other liquid assets." },
  { icon: CreditCard, label: "Outstanding Debts", description: "Credit cards, personal loans, and other liabilities deducted from total assets." },
];

export default function FAQ5050Automatic() {
  const [, setLocation] = useLocation();

  return (
    <ContentPageLayout
      title="Is a 50/50 Divorce Split Automatic in the UK?"
      subtitle="In England & Wales, a 50/50 split of assets is not automatic. Courts consider statutory factors and exercise discretion based on individual circumstances."
      documentTitle="Is a 50/50 Divorce Split Automatic in the UK? | DivorceCalculatorUK"
      metaDescription="Understand whether a 50/50 asset split is automatic in UK divorce proceedings. Learn about statutory factors, judicial discretion, and how to model equal division scenarios."
      relatedPages={relatedPages}
    >
      <ContentSection>
        <Card className="border-primary/30 bg-primary/5" data-testid="card-short-answer">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-start gap-3">
              <Scale className="w-6 h-6 text-primary mt-0.5 shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-foreground" data-testid="text-short-answer-title">Short Answer</h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed" data-testid="text-short-answer-body">
                  No. Courts assess statutory factors and exercise discretion. Financial arrangements following divorce are determined under a discretionary legal framework. In longer marriages, equality is often referenced as a starting point for discussion, but this does not create a presumption that assets will be divided equally in every case.
                </p>
                <div className="mt-3">
                  <ExternalLinkButton href="https://www.gov.uk/money-property-when-relationship-ends/apply-for-a-financial-order">
                    GOV.UK: Financial orders in divorce
                  </ExternalLinkButton>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-financial-meaning-heading">
          What Does "50/50" Mean Financially?
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          A 50/50 split refers to an equal division of net marital assets after liabilities are deducted. However, equal totals do not necessarily mean equal liquidity.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {financialBreakdownItems.map((item) => (
            <Card key={item.label} data-testid={`card-breakdown-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          One party may retain property while the other retains pension assets, meaning access to capital may differ significantly even in a numerically equal split.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-practice-heading">
          What This Means in Practice
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Equal division modelling helps illustrate the financial consequences of a specific numerical assumption. It does not determine entitlement or predict court outcomes.
        </p>
        <div className="space-y-3">
          {practiceItems.map((item) => (
            <div key={item.text} className="flex items-center gap-3" data-testid={`item-practice-${item.text.slice(0, 20).toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
        <InlineCTA label="Model an equal division scenario" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-equality-heading">
          Why Equality Is Not Always Applied
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Courts may depart from equal division based on individual circumstances. These assessments are fact-specific and discretionary. Financial calculators cannot replicate judicial discretion; they provide structured numerical comparison only.
        </p>
        <Accordion type="multiple" className="w-full" data-testid="accordion-equality-reasons">
          <AccordionItem value="housing">
            <AccordionTrigger className="text-sm">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                Housing needs differ
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Where one party has primary care of children, the court may allocate a greater share of housing assets to meet accommodation needs. This is a needs-based adjustment, not a penalty.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="income">
            <AccordionTrigger className="text-sm">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                Income disparity is significant
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Where there is a substantial difference in earning capacity, the court may adjust capital division to compensate for reduced future income potential, particularly where one party sacrificed career progression during the marriage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="children">
            <AccordionTrigger className="text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                There are dependent children
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              The welfare of minor children is a primary consideration. This may influence housing allocation, maintenance arrangements, and the overall distribution of assets.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="non-matrimonial">
            <AccordionTrigger className="text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Assets are non-matrimonial
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Assets acquired before the marriage, inherited, or received as gifts may be treated differently from assets accumulated during the marriage. The treatment depends on the specific facts of each case.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="health">
            <AccordionTrigger className="text-sm">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-primary" />
                Health or earning capacity differs
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Where one party has health conditions or disabilities that affect their ability to earn, the court may adjust the division to account for increased needs or reduced earning potential.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-mediation-heading">
          Using Structured Modelling Before Mediation
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Before mediation or legal consultation, modelling an equal division scenario can help clarify asset totals, identify liquidity risks, support informed discussions, and reduce misunderstandings about headline figures.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: CheckCircle, text: "Clarify asset totals" },
            { icon: CheckCircle, text: "Identify liquidity risks" },
            { icon: CheckCircle, text: "Support informed discussions" },
            { icon: CheckCircle, text: "Reduce misunderstandings" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-foreground">
              <item.icon className="w-4 h-4 text-primary shrink-0" />
              {item.text}
            </div>
          ))}
        </div>
        <InlineCTA label="Explore scenario comparisons" />
      </ContentSection>
    </ContentPageLayout>
  );
}
