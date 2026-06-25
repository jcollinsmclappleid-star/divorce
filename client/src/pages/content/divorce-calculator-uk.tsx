import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, Coins, BarChart3, TrendingUp, PiggyBank } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "What does a divorce calculator actually calculate?",
    answer: "A divorce financial calculator models the numerical implications of different settlement assumptions. It computes net equity (property value minus mortgage and sale costs), distributes assets between parties under different scenarios, applies UK income tax and National Insurance to gross incomes, and shows post-separation monthly income for each party. It does not determine legal entitlement or predict court outcomes.",
  },
  {
    question: "Do UK divorce courts use a calculator to decide settlements?",
    answer: "No. Courts in England and Wales exercise broad discretion under Section 25 of the Matrimonial Causes Act 1973. They consider needs, resources, earning capacity, age, health, contributions, and other factors. There is no formula. A financial modelling calculator helps you understand the numbers — it does not replicate judicial decision-making.",
  },
  {
    question: "How accurate are divorce calculator results?",
    answer: "Outputs are as accurate as the figures you enter and the assumptions you set. The engine uses UK tax rates and NI thresholds configured in real time. However, property valuations, actual sale costs, future income, and pension transfer values all involve uncertainty. Results should be treated as planning models, not definitive figures.",
  },
  {
    question: "Should I use the calculator before or after seeing a solicitor?",
    answer: "Many users find it helpful to run the calculator before their first solicitor meeting. Understanding the approximate numbers — asset pool size, rough scenario outcomes, monthly income sustainability — can make professional consultations more productive and focused.",
  },
  {
    question: "Can the calculator model pensions and property together?",
    answer: "Yes. The wizard collects property values, mortgage balances, pension values (CETVs), savings, investments, and debts. The scenario engine models how different allocations of these assets between parties affect each person's overall financial position — including the liquidity difference between illiquid pension assets and cash or property equity.",
  },
];

const relatedPages = [
  { title: "Free Divorce Calculator UK", description: "Start modelling with no signup required.", href: "/free-divorce-calculator-uk", badge: "Free Tool" },
  { title: "Divorce Financial Settlement Calculator", description: "Comprehensive scenario modelling with full report.", href: "/divorce-financial-settlement-calculator-uk", badge: "Tool" },
  { title: "Divorce Financial Modelling Guide", description: "How scenario-based financial modelling works.", href: "/divorce-financial-modelling", badge: "Pillar Guide" },
  { title: "50/50 Split Calculator UK", description: "Model an equal asset division numerically.", href: "/divorce-50-50-split-calculator-uk", badge: "Asset Division" },
  { title: "Divorce Financial Settlement Examples", description: "Real-style worked examples across different asset profiles.", href: "/divorce-settlement-examples-uk", badge: "Examples" },
  { title: "Preview the Full Financial Report", description: "See the full report before purchasing.", href: "/unlock", badge: "Report" },
];

export default function DivorceCalculatorUkPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      showProductShowcase
      title="Divorce Calculator UK"
      subtitle="Structured financial modelling for divorce settlements in England and Wales. Enter your assets, debts, incomes, and expenses — and compare what different settlements look like numerically."
      documentTitle="Divorce Calculator UK | DivorceCalculatorUK"
      metaDescription="UK divorce calculator — model your settlement scenarios, compare asset splits, pension division and post-separation income. Runs in your browser, no data stored."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Divorce Calculator UK", href: "/divorce-calculator-uk" },
      ]}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-asset-areas">
          What the Calculator Covers
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Divorce financial modelling covers five interconnected areas. The calculator collects figures across all of them and shows how they interact under different settlement assumptions.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card data-testid="card-property">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Home className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Property</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Current value, outstanding mortgage, estimated sale costs, and net equity for each property held.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-savings">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Coins className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Savings and Investments</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Cash savings, ISAs, investment portfolios, and other liquid or near-liquid assets held by either party.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-pensions">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <PiggyBank className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Pensions</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Cash Equivalent Transfer Values (CETVs) for workplace and personal pensions held by both parties.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-income">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Income</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Gross annual employment or self-employment income for each party. The engine computes net take-home pay using current UK tax bands and NI thresholds.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2" data-testid="card-outgoings">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Outgoings</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Monthly essential expenses — housing costs, utilities, childcare, and other regular commitments — used to assess post-separation financial sustainability for each party.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Start modelling now" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-scenarios">
          Settlement Scenarios Modelled
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The calculator models four standard property settlement scenarios side by side. Each shows the capital allocation and post-tax monthly income position for both parties.
        </p>
        <div className="space-y-3">
          {[
            { title: "Sell and split", desc: "The family home is sold and net proceeds are divided in a defined ratio. Each party receives their share in cash." },
            { title: "Party A retains home", desc: "One party buys out the other's share. The retaining party assumes the full mortgage and pays out the other party's equity share." },
            { title: "Party B retains home", desc: "The same buyout structure from the other party's perspective." },
            { title: "Deferred sale", desc: "One party occupies the property for a defined period (e.g. until youngest child reaches 18) before sale. Equity is split at the future sale date." },
          ].map((s, i) => (
            <Card key={i} data-testid={`card-scenario-${i}`}>
              <CardContent className="pt-4 pb-3 flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-illustrative-example">
          Illustrative Modelling Example
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Under these assumptions, here is how the calculator models a sell-and-split scenario for illustrative purposes only. Outcomes vary materially depending on the figures entered.
        </p>
        <div className="rounded-lg border overflow-hidden mb-4">
          <table className="w-full text-sm" data-testid="table-example">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Assumption</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="px-4 py-2.5 text-muted-foreground">Property value</td><td className="px-4 py-2.5 text-right font-medium">£380,000</td></tr>
              <tr><td className="px-4 py-2.5 text-muted-foreground">Outstanding mortgage</td><td className="px-4 py-2.5 text-right font-medium">£160,000</td></tr>
              <tr><td className="px-4 py-2.5 text-muted-foreground">Estimated sale costs (2%)</td><td className="px-4 py-2.5 text-right font-medium">£7,600</td></tr>
              <tr className="bg-primary/5"><td className="px-4 py-2.5 font-semibold text-foreground">Net equity</td><td className="px-4 py-2.5 text-right font-semibold">£212,400</td></tr>
              <tr><td className="px-4 py-2.5 text-muted-foreground">Joint savings</td><td className="px-4 py-2.5 text-right font-medium">£40,000</td></tr>
              <tr className="bg-primary/5"><td className="px-4 py-2.5 font-semibold text-foreground">Total divisible pool</td><td className="px-4 py-2.5 text-right font-semibold">£252,400</td></tr>
            </tbody>
          </table>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <Card data-testid="card-example-party-a">
            <CardContent className="pt-4 pb-3">
              <p className="text-xs font-semibold text-foreground mb-2">Party A — 50% share</p>
              <p className="text-sm font-bold text-primary">£126,200</p>
              <p className="text-xs text-muted-foreground mt-1">Net capital received under sell-and-split assumption</p>
            </CardContent>
          </Card>
          <Card data-testid="card-example-party-b">
            <CardContent className="pt-4 pb-3">
              <p className="text-xs font-semibold text-foreground mb-2">Party B — 50% share</p>
              <p className="text-sm font-bold text-primary">£126,200</p>
              <p className="text-xs text-muted-foreground mt-1">Net capital received under sell-and-split assumption</p>
            </CardContent>
          </Card>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          These are illustrative figures under a single scenario assumption. The full calculator also models income, tax, monthly cashflow, pension allocation, and up to four settlement scenarios simultaneously.
        </p>
        <InlineCTA label="Model your own figures" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-faq">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="text-xs text-muted-foreground mt-8 leading-relaxed border-t pt-4">
          DivorceCalculatorUK is an assumption-based financial modelling tool. It does not provide legal, financial, tax, pension, mortgage or investment advice and does not predict court outcomes.
        </p>
      </ContentSection>
    </ContentPageLayout>
  );
}
