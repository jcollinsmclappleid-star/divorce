import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, Banknote, ArrowRightLeft, Clock, TrendingUp } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "What happens to the house in a divorce?",
    answer: "There are four main outcomes for the family home in an English divorce: it can be sold and the net proceeds divided; one party can buy out the other's equity and remain in the property; one party can remain temporarily while the other waits for a future sale (a Mesher or Martin order); or the home can be transferred to one party as part of an unequal asset split. The right outcome depends on each party's financial needs and resources.",
  },
  {
    question: "How is the house valued for a divorce settlement?",
    answer: "The family home is typically valued at its current estimated market value, agreed between the parties or obtained from an independent surveyor or estate agent. The relevant figure for settlement purposes is the net equity — market value minus outstanding mortgage and estimated sale costs. It is the net equity (not the gross value) that is available for division.",
  },
  {
    question: "Can I stay in the house if I can't afford the mortgage alone?",
    answer: "Mortgage affordability under one income is one of the key tests for whether retaining the home is viable. Lenders typically apply income multiple benchmarks (often around 4–4.5x gross income, though criteria vary). If the mortgage cannot be refinanced under sole ownership, selling and splitting the proceeds may be the more practical outcome. Modelling illustrates what is potentially achievable under different income and mortgage assumptions.",
  },
  {
    question: "Who pays the mortgage during divorce proceedings?",
    answer: "This depends on the agreement between the parties and any interim court orders. Both names on the mortgage remain liable until the property is sold or formally transferred. Defaulting on mortgage payments can affect both parties' credit ratings regardless of who is actually living in the property. Keeping payments up to date while proceedings continue is generally advisable.",
  },
  {
    question: "What is a Mesher order?",
    answer: "A Mesher order postpones the sale of the family home until a specified triggering event — typically when the youngest child reaches 18 or leaves full-time education. Both parties retain a defined share of the equity, which is realised at the point of future sale. Mesher orders prioritise housing stability for children but mean the non-occupying party's capital remains tied up in the property for a potentially long period.",
  },
];

const relatedPages = [
  { title: "Divorce House Buyout Calculator UK", description: "Detailed buyout scenario modelling with net equity and affordability.", href: "/divorce-house-buyout-calculator-uk", badge: "Property" },
  { title: "Equity Split Divorce Calculator", description: "Model property equity splits and buyout amounts.", href: "/equity-split-divorce-calculator", badge: "Property" },
  { title: "Can I Keep the House After Divorce?", description: "The factors that determine which property outcome is viable.", href: "/can-i-keep-the-house-after-divorce-uk", badge: "FAQ" },
  { title: "Mortgage After Divorce UK", description: "Affordability and sustainability considerations.", href: "/divorce-mortgage-affordability-after-separation", badge: "Mortgage" },
  { title: "Transfer of Equity in Divorce", description: "The legal process for moving the home into sole ownership.", href: "/transfer-of-equity-divorce-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model your property scenario with full figures.", href: "/unlock", badge: "Report" },
];

export default function HouseDivorceCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="House Divorce Calculator UK"
      subtitle="Model the financial implications of different property outcomes in your divorce. Compare selling, keeping, or deferring the family home — and see what each scenario means for both parties' financial positions."
      documentTitle="House Divorce Calculator UK | DivorceCalculatorUK"
      metaDescription="UK house divorce calculator — model selling, keeping or deferring the family home. Calculate net equity, compare property scenarios, and see the financial impact on both parties."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "House Divorce Calculator UK", href: "/house-divorce-calculator" },
      ]}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-four-outcomes">
          Four Property Outcomes to Model
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The calculator models all four main property settlement outcomes side by side, showing the financial position of both parties under each scenario.
        </p>
        <div className="space-y-3">
          {[
            { icon: ArrowRightLeft, title: "Sell and split", desc: "The home is sold and net proceeds are divided. Both parties receive cash — the most liquid outcome. Each party must then rehouse from their share of the proceeds." },
            { icon: Home, title: "One party retains the home", desc: "The occupying party buys out the other's equity share. Requires refinancing under sole income. The departing party receives their equity share in cash." },
            { icon: TrendingUp, title: "Other party retains the home", desc: "The same buyout structure from the other perspective — useful for modelling who could realistically afford the property given each party's income." },
            { icon: Clock, title: "Deferred sale", desc: "One party occupies the property — typically while dependent children are in the home — with a sale and split occurring at a future triggering event. Both parties' equity shares crystallise at that point." },
          ].map((s, i) => (
            <Card key={i} data-testid={`card-outcome-${i}`}>
              <CardContent className="pt-4 pb-3 flex gap-3">
                <s.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model your property scenario" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-net-equity">
          Starting with Net Equity
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          All property scenarios start from the same figure: net equity. This is calculated by deducting the outstanding mortgage and estimated transaction costs from the current property value.
        </p>
        <Card data-testid="card-equity-example">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-3">Illustrative calculation</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Current property value</span>
                <span className="font-medium text-foreground">£350,000</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Outstanding mortgage</span>
                <span className="font-medium text-foreground">– £130,000</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Estimated sale costs (agents + legal)</span>
                <span className="font-medium text-foreground">– £14,000</span>
              </div>
              <div className="flex justify-between gap-2 pt-2 border-t font-semibold">
                <span>Net equity available for division</span>
                <span>£206,000</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">Illustrative only. Sale costs vary — typically 1–3% agent fee plus legal costs and any early repayment charges.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-affordability">
          Affordability in a Buyout Scenario
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          If one party intends to retain the property, affordability of the mortgage under a single income must be assessed. The full report includes a mortgage sustainability model showing monthly repayments under different interest rate assumptions.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-income-multiple">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Income multiple test</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Lenders typically use income multiples to assess maximum borrowing. These are generalised benchmarks — actual lending criteria vary significantly by lender and individual circumstances.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-monthly-repayment">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Monthly repayment sustainability</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Monthly repayments on the new mortgage plus other outgoings compared against net take-home pay — showing whether the retained property is financially sustainable.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model property affordability" />
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
