import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DollarSign, TrendingDown, Clock, BarChart3, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "How is spousal maintenance pressure modelled?",
    answer: "The calculator models spousal maintenance as a monthly income transfer from one party to the other. It shows how a given maintenance amount affects post-tax monthly income for both the paying party (reduced by the maintenance amount) and the receiving party (increased by it). This lets you compare financial sustainability with and without maintenance, and at different maintenance levels.",
  },
  {
    question: "Is there a formula for spousal maintenance in the UK?",
    answer: "No. Unlike child maintenance, there is no statutory formula for spousal maintenance in England and Wales. Courts assess the recipient's reasonable monthly needs, subtract their own income, and check whether the paying party can afford the difference after meeting their own reasonable needs. The resulting figure is a starting point for negotiation — actual amounts vary widely by individual circumstance.",
  },
  {
    question: "What figures do I need to model maintenance pressure?",
    answer: "You need gross income for both parties (the calculator converts these to net take-home pay using UK tax and NI rates), monthly outgoings for both parties (housing costs, utilities, childcare, and other essentials), and your assumptions about maintenance amount and duration. Exact figures are not required — estimates are sufficient for planning purposes.",
  },
  {
    question: "How long does spousal maintenance typically last?",
    answer: "Duration varies significantly. Short-term maintenance (2–5 years) is increasingly preferred by courts to allow the receiving party time to achieve financial independence. Joint lives maintenance (until one party dies or the recipient remarries) is now relatively rare and typically reserved for very long marriages where independence is not realistically achievable. Courts increasingly expect both parties to take steps toward self-sufficiency.",
  },
  {
    question: "Can maintenance be changed after it is agreed?",
    answer: "Yes. Either party can apply to vary the maintenance if circumstances change significantly — for example, if the paying party loses their job, the receiving party's income increases substantially, or the recipient cohabits with a new partner. The court has broad discretion to vary, suspend, or capitalise (convert to a lump sum) maintenance at any point.",
  },
];

const relatedPages = [
  { title: "Divorce Maintenance Calculator", description: "Broader maintenance modelling covering both spousal and child maintenance.", href: "/divorce-maintenance-calculator", badge: "Tool" },
  { title: "Spousal Maintenance After Divorce UK", description: "Full guide — how maintenance is assessed, duration, and variations.", href: "/spousal-maintenance-after-divorce-uk", badge: "Guide" },
  { title: "How Much Maintenance After Divorce?", description: "Factors that determine maintenance levels in practice.", href: "/how-much-maintenance-after-divorce-uk", badge: "Guide" },
  { title: "Child Maintenance vs Spousal Maintenance", description: "The key differences between CMS support and court-ordered maintenance.", href: "/child-maintenance-vs-spousal-maintenance-uk", badge: "Guide" },
  { title: "Clean Break Order UK", description: "How a clean break ends all future financial claims.", href: "/what-is-a-clean-break-order-uk", badge: "Guide" },
  { title: "Preview the Full Financial Report", description: "Model maintenance and its cashflow impact on both parties.", href: "/unlock", badge: "Report" },
];

export default function SpousalMaintenanceCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Spousal Maintenance Calculator UK"
      subtitle="Model the monthly cashflow pressure of different spousal maintenance assumptions. See how maintenance transfers affect post-separation income sustainability for both the paying and receiving party."
      documentTitle="Spousal Maintenance Calculator UK | DivorceCalculatorUK"
      metaDescription="UK spousal maintenance calculator — model possible maintenance pressure, compare income sustainability with and without maintenance, and see the cashflow impact on both parties."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Spousal Maintenance Calculator UK", href: "/spousal-maintenance-calculator-uk" },
      ]}
    >
      <ContentSection>
        <Card className="border-amber-200 bg-amber-50 mb-6" data-testid="card-maintenance-disclaimer">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">
              This calculator models possible maintenance pressure — it does not calculate what you will receive or pay, and does not predict what a court would order. Spousal maintenance in England and Wales is assessed on a needs and ability-to-pay basis specific to each couple's circumstances. Independent legal advice is relevant for maintenance decisions.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-what-modelling-shows">
          What Maintenance Modelling Illustrates
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The calculator applies a maintenance income transfer between parties and shows the resulting monthly income position for each. This helps both parties understand the financial sustainability implications of different maintenance assumptions before negotiating.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-paying-party">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingDown className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Paying party impact</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Net monthly income minus maintenance payment, compared against their outgoings. Shows whether the paying party can sustain the proposed amount after meeting their own reasonable needs.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-receiving-party">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <DollarSign className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Receiving party impact</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Net monthly income plus maintenance received, compared against outgoings. Shows whether the proposed amount covers the shortfall between income and expenses.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-duration">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Short-term vs longer-term</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Compare the cashflow impact of transitional maintenance (e.g. 3 years) versus longer-term arrangements, and see how the receiving party's position changes if income increases over time.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-clean-break">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">With vs without maintenance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Compare settlement scenarios with no maintenance (clean break capital split) against scenarios with a maintenance element, to see the income and capital trade-offs.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model maintenance assumptions" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-illustrative-example">
          Illustrative Example
        </h2>
        <Card data-testid="card-example">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-4">
              Party A net income: £4,200/month — outgoings: £3,000/month — surplus: £1,200/month<br />
              Party B net income: £1,600/month — outgoings: £2,400/month — shortfall: £800/month
            </p>
            <div className="space-y-3 text-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-1">£800/month maintenance</p>
                  <p className="text-xs text-muted-foreground">Party A: £4,200 – £800 = £3,400 net; surplus vs outgoings: £400/month. Party B: £1,600 + £800 = £2,400 net; exactly meets outgoings.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">No maintenance (clean break)</p>
                  <p className="text-xs text-muted-foreground">Party A: full £1,200 surplus. Party B: £800/month shortfall — requires either reduced outgoings, additional income, or a larger capital allocation from the settlement.</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">Illustrative only. These figures do not constitute advice on what a court would order or what amount is appropriate.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
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
