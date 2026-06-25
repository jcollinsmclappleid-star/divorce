import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, Banknote, BarChart3, ArrowRightLeft } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "How is home equity calculated in divorce?",
    answer: "Net equity is the current estimated market value of the property, minus the outstanding mortgage balance, minus estimated transaction costs (estate agent fees, legal costs, and any early repayment charges). The resulting figure is the net equity available for division. For example: £400,000 value – £150,000 mortgage – £15,000 costs = £235,000 net equity.",
  },
  {
    question: "Does home equity always get split 50/50 in UK divorce?",
    answer: "Not automatically. How property equity is divided depends on the overall settlement — including other assets, income disparity, children's needs, and housing requirements. Equal division of equity is a common starting point in long marriages, but the final split may deviate based on needs and the broader asset pool composition.",
  },
  {
    question: "What happens if one party wants to keep the house?",
    answer: "The retaining party buys out the other's equity share — either from savings, a new mortgage, or by offsetting against other assets (such as pensions). The calculator models this as a 'buyout scenario', showing the net equity the departing party receives and what the retaining party needs to fund.",
  },
  {
    question: "Can the equity split be unequal?",
    answer: "Yes. You can model any equity split percentage — 60/40, 70/30, or other distributions — and see how that affects the overall asset distribution and income sustainability for both parties. An unequal equity split may be appropriate where one party has a greater housing need, primary childcare responsibilities, or where other assets balance the overall settlement.",
  },
  {
    question: "What if the property is in negative equity?",
    answer: "If the outstanding mortgage exceeds the property value, the property has negative equity. The calculator models this scenario — the net equity figure will be negative, reducing the overall asset pool. This affects how other assets must be distributed to achieve a viable settlement. Negative equity in divorce can be particularly complex and legal advice is relevant.",
  },
];

const relatedPages = [
  { title: "Divorce House Buyout Calculator UK", description: "Model the financial implications of retaining the family home.", href: "/divorce-house-buyout-calculator-uk", badge: "Property" },
  { title: "House Divorce Calculator", description: "Entry-level property scenario comparison.", href: "/house-divorce-calculator", badge: "Property" },
  { title: "Divorce Asset Split Calculator", description: "Model the full matrimonial asset pool division.", href: "/divorce-asset-split-calculator", badge: "Assets" },
  { title: "Buying Partner Out of House", description: "How a property buyout works in practice.", href: "/buying-partner-out-of-house-divorce-uk", badge: "Guide" },
  { title: "Negative Equity and Divorce UK", description: "What happens when the mortgage exceeds the property value.", href: "/negative-equity-and-divorce-uk", badge: "Guide" },
  { title: "Preview the Full Financial Report", description: "Model your property equity split in the full report.", href: "/unlock", badge: "Report" },
];

export default function EquitySplitDivorceCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      showProductShowcase
      title="Equity Split Divorce Calculator UK"
      subtitle="Model how property equity could be divided between the parties — under a sale, a buyout, or a deferred arrangement. Compare the financial implications of different equity split percentages and buyout amounts."
      documentTitle="Equity Split Divorce Calculator UK | DivorceCalculatorUK"
      metaDescription="UK divorce equity split calculator — model how home equity is divided under different scenarios. Calculate buyout amounts, net equity, and the financial impact of property division."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Equity Split Divorce Calculator UK", href: "/equity-split-divorce-calculator" },
      ]}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-equity-calculation">
          Calculating Net Equity
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Before modelling any equity split, the net equity figure must be established. Three inputs drive this calculation.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Card data-testid="card-property-value">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Home className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Property value</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Current estimated market value — not the purchase price. An up-to-date valuation or estate agent estimate is appropriate.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-mortgage">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Outstanding mortgage</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">The redemption figure from your mortgage statement — this is deducted in full from the property value.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-sale-costs">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Sale costs</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Estate agent fees (typically 1–3%), conveyancing costs, and any early repayment charges. These reduce the net equity available.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Calculate your net equity" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-split-scenarios">
          Equity Split Scenarios
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          The calculator models three main property equity outcomes. Each produces a different financial position for the parties.
        </p>
        <div className="space-y-3">
          {[
            { icon: ArrowRightLeft, title: "Sale and split", desc: "The property is sold and net proceeds are divided between the parties in a defined ratio. Each party receives their share in cash — the most liquid outcome for both." },
            { icon: Home, title: "One party retains the property", desc: "The retaining party buys out the other's equity share. The buyout amount equals the departing party's share of net equity. The retaining party assumes the full mortgage liability and must demonstrate affordability." },
            { icon: BarChart3, title: "Deferred sale", desc: "One party remains in the property for a defined period before a future sale and split. Both parties' equity shares are preserved but crystallise only at the point of future sale." },
          ].map((s, i) => (
            <Card key={i} data-testid={`card-scenario-${i}`}>
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
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-illustrative">
          Illustrative Example
        </h2>
        <Card data-testid="card-example">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-4">Property: £425,000 value — £175,000 mortgage — £17,000 estimated sale costs</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Net equity</span>
                <span className="font-medium text-foreground">£233,000</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">50/50 sale — each party receives</span>
                <span className="font-medium text-foreground">£116,500</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">60/40 sale — Party A receives</span>
                <span className="font-medium text-foreground">£139,800</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">60/40 sale — Party B receives</span>
                <span className="font-medium text-foreground">£93,200</span>
              </div>
              <div className="flex justify-between gap-2 pt-2 border-t">
                <span className="text-muted-foreground">Buyout (50/50) — amount payable by retaining party</span>
                <span className="font-medium text-foreground">£116,500</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">Illustrative only. The retaining party would also assume the £175,000 mortgage. Actual figures depend on current property valuations and sale costs.</p>
          </CardContent>
        </Card>
        <InlineCTA label="Model your equity split" />
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
