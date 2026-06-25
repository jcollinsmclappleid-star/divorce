import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, DollarSign, BarChart3, AlertCircle, Scale } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "What types of maintenance can be modelled?",
    answer: "The calculator covers spousal maintenance (periodical payments from one ex-spouse to the other) and child maintenance outgoings (entered as monthly expenses for one or both parties). These are separate types of payment with different legal bases: spousal maintenance is court-ordered or agreed, while child maintenance is typically calculated by the Child Maintenance Service using a statutory formula.",
  },
  {
    question: "What is the difference between spousal and child maintenance?",
    answer: "Spousal maintenance is paid directly between ex-spouses to address financial needs and is based on the court's assessment of each party's income, needs, and ability to pay. Child maintenance is paid to support the children's living costs and is calculated by the CMS using gross income and number of children. They are separate obligations and should be modelled as such.",
  },
  {
    question: "How does the calculator treat child maintenance?",
    answer: "Child maintenance is entered as a monthly expense outgoing for the paying party (reducing their disposable income) and as additional monthly income for the receiving party. The CMS formula can be used to estimate the approximate amount — the calculator accepts the figure you enter rather than calculating it independently.",
  },
  {
    question: "Can maintenance and capital settlement be modelled together?",
    answer: "Yes. The full settlement model combines capital distribution (property, savings, pensions) with post-separation income (gross income converted to net take-home pay, then adjusted for maintenance and outgoings). This lets you see how the capital split and any maintenance element work together to produce each party's overall financial position.",
  },
  {
    question: "What is a capitalised clean break for maintenance?",
    answer: "A capitalised clean break converts future maintenance payments into a one-off lump sum. For example, instead of £1,000/month for 5 years, the parties agree on an equivalent capital sum. This ends all future maintenance obligations and provides certainty for both parties. Whether it is financially viable depends on whether sufficient capital is available. The calculator can help illustrate whether a clean break or ongoing maintenance produces a more sustainable outcome given the overall asset pool.",
  },
];

const relatedPages = [
  { title: "Spousal Maintenance Calculator UK", description: "Model spousal maintenance pressure and cashflow impact.", href: "/spousal-maintenance-calculator-uk", badge: "Tool" },
  { title: "Spousal Maintenance After Divorce UK", description: "Full guide to how spousal maintenance works.", href: "/spousal-maintenance-after-divorce-uk", badge: "Guide" },
  { title: "Child Maintenance vs Spousal Maintenance", description: "Key differences between the two types of maintenance.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Guide" },
  { title: "How Much Maintenance After Divorce?", description: "Factors determining maintenance levels and duration.", href: "/how-much-maintenance-after-divorce-uk", badge: "Guide" },
  { title: "Divorce With Children Financial Settlement", description: "How children affect the financial settlement.", href: "/divorce-with-children-financial-settlement-uk", badge: "Guide" },
  { title: "Preview the Full Financial Report", description: "Model maintenance alongside your full settlement.", href: "/unlock", badge: "Report" },
];

export default function DivorceMaintenanceCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      showProductShowcase
      title="Divorce Maintenance Calculator UK"
      subtitle="Model the financial impact of both spousal and child maintenance on post-separation monthly income for both parties. Compare scenarios with and without maintenance to understand sustainability under different assumptions."
      documentTitle="Divorce Maintenance Calculator UK | DivorceCalculatorUK"
      metaDescription="UK divorce maintenance calculator — model spousal and child maintenance payments, compare income sustainability, and see the cashflow impact of different maintenance assumptions."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Divorce Maintenance Calculator UK", href: "/divorce-maintenance-calculator" },
      ]}
    >
      <ContentSection>
        <Card className="border-amber-200 bg-amber-50 mb-6" data-testid="card-maintenance-disclaimer">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">
              This calculator models maintenance as a monthly cashflow transfer. It does not calculate what a court would order, and does not constitute legal or financial advice. Spousal maintenance is assessed on individual needs and ability to pay. Child maintenance is calculated by the Child Maintenance Service using a statutory formula.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-types">
          Two Types of Maintenance Modelled
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-spousal">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <DollarSign className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Spousal maintenance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">A monthly payment from one ex-spouse to the other, reflecting financial need and ability to pay. No fixed formula — agreed between the parties or ordered by a court.</p>
                <p className="text-xs text-muted-foreground leading-relaxed">The calculator applies the amount you enter as an income transfer and shows the resulting monthly cashflow position for both parties.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-child">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Child maintenance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">Calculated by the Child Maintenance Service (CMS) based on gross income and number of children. Entered as a monthly outgoing (paying party) or income supplement (receiving party).</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Use the <a href="https://www.gov.uk/calculate-your-child-maintenance" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CMS calculator</a> to estimate your child maintenance figure, then enter it here.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model your maintenance scenario" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-combined-impact">
          Combined Maintenance Impact
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Where both spousal and child maintenance are payable, the combined monthly outgoing can materially affect the paying party's financial sustainability. Modelling both together provides the most accurate picture of post-separation monthly cashflow.
        </p>
        <Card data-testid="card-combined-example">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-3">Illustrative example — paying party</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Net take-home pay</span>
                <span className="font-medium text-foreground">£3,800/month</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Housing and essential outgoings</span>
                <span className="font-medium text-foreground">– £2,200/month</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Child maintenance (CMS estimate)</span>
                <span className="font-medium text-foreground">– £400/month</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Spousal maintenance (proposed)</span>
                <span className="font-medium text-foreground">– £600/month</span>
              </div>
              <div className="flex justify-between gap-2 pt-2 border-t font-semibold">
                <span>Monthly surplus</span>
                <span>£600/month</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">Illustrative only. Actual maintenance amounts depend on specific circumstances and are not predicted by this calculator.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-clean-break-vs-maintenance">
          Clean Break vs Ongoing Maintenance
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Where sufficient capital exists, a clean break — converting future maintenance into a lump sum capital adjustment — may be preferable to ongoing periodical payments.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-ongoing">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Ongoing maintenance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Provides regular income support to the receiving party. Can be varied if circumstances change. Creates ongoing financial link between the parties.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-clean-break">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Capitalised clean break</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">A lump sum payment ends all future maintenance claims. Provides certainty for both parties but requires sufficient capital to fund the equivalent lump sum.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Compare maintenance scenarios in the full report" />
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
