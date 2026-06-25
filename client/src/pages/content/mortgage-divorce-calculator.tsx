import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, Home, TrendingUp, Banknote, BarChart3, ArrowRightLeft } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "What happens to the mortgage in a divorce?",
    answer: "Both parties remain jointly liable for a joint mortgage until the property is sold or the mortgage is formally transferred into sole ownership. Simply moving out does not remove a party's liability. The mortgage lender must be notified and must agree to any change in borrower arrangements. A 'transfer of equity' removes one party from the mortgage and title — subject to the remaining party meeting the lender's sole-applicant affordability criteria.",
  },
  {
    question: "How does the calculator model mortgage affordability?",
    answer: "The calculator models monthly mortgage repayments on the outstanding balance (or a new assumed balance after buyout) at a specified interest rate. It compares these repayments against the retaining party's net take-home pay and outgoings to show whether the housing costs are sustainable. Stress-testing at higher rates shows how repayments would change if rates increase.",
  },
  {
    question: "Can I get a mortgage after divorce with only one income?",
    answer: "Whether a sole-income mortgage is available depends on income, the required loan size, existing credit commitments, and the lender's criteria. The calculator models what is mathematically sustainable at various loan-to-income multiples — actual lending decisions require a formal affordability assessment by a lender or mortgage broker. The calculator output is not a mortgage offer or eligibility assessment.",
  },
  {
    question: "What is the difference between keeping the mortgage and remortgaging?",
    answer: "If the existing mortgage is portable or transferable, the lender may agree to remove one party and continue the existing mortgage product (a product transfer). More commonly, a new sole-name mortgage is required — which means going through a fresh affordability assessment, potentially at a different rate. Timing relative to the existing mortgage's fixed or tracker period can affect whether an early repayment charge applies.",
  },
  {
    question: "Should I sell or keep the house from a mortgage perspective?",
    answer: "This depends on the relative financial positions of both parties after the settlement. Keeping the home may preserve housing stability but concentrates wealth in an illiquid asset and places the full mortgage burden on one income. Selling releases equity for both parties to rehouse at a potentially more affordable level. The calculator compares the sale vs keep decision by modelling post-settlement monthly financial sustainability under each approach — not just the mortgage cost in isolation.",
  },
];

const relatedPages = [
  { title: "Mortgage After Divorce UK", description: "Affordability, stress-testing, and sustainability assessment.", href: "/divorce-mortgage-affordability-after-separation", badge: "Tool" },
  { title: "House Divorce Calculator UK", description: "Compare all property outcomes in one model.", href: "/house-divorce-calculator", badge: "Property" },
  { title: "Can I Keep the House? — Calculator", description: "Scenario comparison for the keep vs sell decision.", href: "/can-i-keep-the-house-after-divorce-calculator", badge: "Property" },
  { title: "Transfer of Equity in Divorce", description: "The legal and practical process of taking over the mortgage.", href: "/transfer-of-equity-divorce-uk", badge: "Property" },
  { title: "Both Names on Mortgage — Divorce UK", description: "What joint mortgage liability means during proceedings.", href: "/both-names-on-mortgage-divorce-uk", badge: "Guide" },
  { title: "Preview the Full Financial Report", description: "Model mortgage scenarios with full affordability analysis.", href: "/unlock", badge: "Report" },
];

export default function MortgageDivorceCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      showProductShowcase
      title="Mortgage Divorce Calculator UK"
      subtitle="Model whether retaining the family home mortgage is sustainable on one income — and compare the sale vs keep decision by assessing post-settlement monthly financial position under different assumptions."
      documentTitle="Mortgage Divorce Calculator UK | DivorceCalculatorUK"
      metaDescription="UK mortgage divorce calculator — model mortgage affordability on one income, compare selling vs keeping the family home, and stress-test repayments against rate changes."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Mortgage Divorce Calculator UK", href: "/mortgage-divorce-calculator" },
      ]}
    >
      <ContentSection>
        <Card className="border-amber-200 bg-amber-50 mb-6" data-testid="card-mortgage-disclaimer">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">
              This calculator does not provide mortgage advice. Affordability outputs are illustrative planning models based on the figures you enter — they are not mortgage offers, eligibility assessments, or lending decisions. Actual lender criteria vary. An independent mortgage broker can provide an accurate assessment for your circumstances.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-what-modelled">
          What the Mortgage Model Covers
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The mortgage model focuses on the sale vs keep decision — comparing the monthly financial position under each outcome, rather than just the cost of the mortgage itself.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-repayments">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Monthly repayments</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Repayment amount modelled on the outstanding or new loan balance at a specified interest rate — for both capital-repayment and interest-only assumptions.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-stress">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Rate stress testing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">How repayments change if interest rates rise by 1%, 2%, or 3% — showing whether the housing costs remain manageable under adverse rate movements.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-sustainability">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Sustainability vs income</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Monthly repayments plus all other outgoings compared against net take-home pay — showing monthly surplus or deficit under each property scenario.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-sale-comparison">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <ArrowRightLeft className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Sale vs keep comparison</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">The financial position of the retaining party under a buyout scenario, compared against the same party's position if the home is sold and they rehouse at a lower cost level.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model your mortgage scenario" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-illustrative">
          Illustrative Repayment Comparison
        </h2>
        <Card data-testid="card-rate-comparison">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-4">Mortgage: £200,000 outstanding — 25-year term</p>
            <div className="space-y-2 text-sm">
              {[
                { rate: "3.5%", repayment: "£1,000/month" },
                { rate: "4.5%", repayment: "£1,110/month" },
                { rate: "5.5%", repayment: "£1,228/month" },
                { rate: "6.5%", repayment: "£1,349/month" },
              ].map((r, i) => (
                <div key={i} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Interest rate {r.rate}</span>
                  <span className="font-medium text-foreground">{r.repayment}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">Illustrative capital-repayment figures. Actual repayments depend on the specific mortgage product, lender, and term. These are not mortgage quotes.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-sale-vs-keep">
          Sale vs Keep: The Full Picture
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Focusing only on mortgage repayment cost understates the full financial comparison. Selling and rehousing in a smaller, less expensive property may produce a lower monthly outgoing — and leave liquid capital from the sale proceeds — even if rehousing costs are incurred.
        </p>
        <div className="space-y-3">
          {[
            { icon: Home, label: "Keep: what it costs", desc: "Full mortgage repayment, plus maintenance, utilities, and insurance — all on one income, plus the cost of any buyout funding." },
            { icon: ArrowRightLeft, label: "Sell: what it releases", desc: "Net equity proceeds available for deposit on a smaller property. Potentially lower monthly housing costs if rehousing in a less expensive property." },
            { icon: BarChart3, label: "The comparison", desc: "Net monthly cashflow position — income minus all outgoings — under the 'keep' and 'sell' scenarios. This is what the calculator models." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg border text-sm">
              <item.icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-muted-foreground mt-0.5 leading-relaxed text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Compare sale and keep scenarios" />
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
