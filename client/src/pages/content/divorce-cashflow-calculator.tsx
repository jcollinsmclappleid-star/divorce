import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrendingUp, TrendingDown, BarChart3, Clock, Banknote, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "What is post-divorce cashflow modelling?",
    answer: "Cashflow modelling shows the flow of money in and out for each party on a monthly basis after separation — net income minus all outgoings, adjusted for any maintenance payments. It moves beyond the static capital split to show whether each party's monthly financial position is sustainable under the proposed settlement. A settlement that looks numerically balanced on paper can produce an unsustainable monthly cashflow for one party.",
  },
  {
    question: "What figures do I need to model cashflow?",
    answer: "You need net monthly income for each party (or gross income — the calculator converts to net using UK tax and NI rates), monthly housing costs (mortgage or rent), other essential outgoings (utilities, childcare, transport, food), any maintenance payments, and the income from capital released in the settlement (e.g. savings interest). Exact figures are not required — estimates produce useful planning models.",
  },
  {
    question: "How does cashflow modelling differ from the capital split?",
    answer: "The capital split tells you who gets what assets — property, pensions, savings. Cashflow modelling tells you whether each party can afford to live on their income after separation, given their outgoings. A party may receive a large capital allocation but have a very tight monthly cashflow — particularly if they retain an expensive property on a modest income. Both dimensions are important for a complete financial picture.",
  },
  {
    question: "What is a 12-month cashflow projection?",
    answer: "A 12-month projection models cumulative income and expenditure for each party over the first year after separation. It shows whether and when a monthly deficit might deplete available savings reserves, and highlights any seasonal or one-off costs that could create pressure within the year. It is an illustrative planning tool, not a financial forecast.",
  },
  {
    question: "How does maintenance affect the cashflow model?",
    answer: "Maintenance is modelled as a monthly transfer: it reduces the paying party's disposable income and increases the receiving party's disposable income. The cashflow model shows both parties' positions with and without maintenance, and at different maintenance levels — helping to identify the maintenance amount at which both parties' positions become sustainable.",
  },
];

const relatedPages = [
  { title: "Divorce Settlement Calculator UK", description: "Full settlement modelling including capital and income.", href: "/divorce-settlement-calculator-uk", badge: "Tool" },
  { title: "Spousal Maintenance Calculator UK", description: "Model the cashflow impact of different maintenance assumptions.", href: "/spousal-maintenance-calculator-uk", badge: "Tool" },
  { title: "Divorce Financial Modelling Guide", description: "How scenario-based modelling works and what to expect.", href: "/divorce-financial-modelling", badge: "Pillar Guide" },
  { title: "Divorce Where One Partner Earns More", description: "How income disparity typically shapes financial outcomes.", href: "/divorce-where-one-earns-more-uk", badge: "Situations" },
  { title: "How Much Maintenance After Divorce?", description: "Factors that determine maintenance levels and duration.", href: "/how-much-maintenance-after-divorce-uk", badge: "Guide" },
  { title: "Preview the Full Financial Report", description: "Access detailed cashflow projections in the full report.", href: "/unlock", badge: "Report" },
];

export default function DivorceCashflowCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      showProductShowcase
      title="Divorce Cashflow Calculator UK"
      subtitle="Model post-separation monthly cashflow for both parties under different settlement assumptions. See whether each party's income covers their outgoings — and where maintenance or capital adjustments may affect sustainability."
      documentTitle="Divorce Cashflow Calculator UK | DivorceCalculatorUK"
      metaDescription="UK divorce cashflow calculator — model post-separation monthly income, expenses, and financial sustainability for both parties. Compare scenarios with and without maintenance."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Divorce Cashflow Calculator UK", href: "/divorce-cashflow-calculator" },
      ]}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-why-cashflow">
          Why Monthly Cashflow Matters
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          A settlement that divides capital equally may still leave one party in financial difficulty if their monthly income does not cover their outgoings. Cashflow modelling shows the income-expenditure position for each party — not just the capital allocation — giving a more complete picture of whether a proposed settlement is sustainable.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-income-side">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Income side</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Net take-home pay (after income tax and National Insurance), plus any maintenance received, savings interest, or other regular income sources.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-outgoings-side">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingDown className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Outgoings side</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Housing costs (mortgage or rent), utilities, childcare, transport, food, and other regular monthly expenditure — plus any maintenance paid.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-monthly-position">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Monthly surplus or deficit</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">The difference — a surplus indicates a financially sustainable position; a deficit indicates that outgoings exceed income and capital reserves may deplete over time.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-projection">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">12-month projection concept</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">The full report extends cashflow over a 12-month and 5-year horizon — showing how surplus or deficit accumulates and whether it is manageable given available reserves.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model post-separation cashflow" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-illustrative">
          Illustrative Cashflow Comparison
        </h2>
        <Card data-testid="card-cashflow-example">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-4">Scenario: Settlement agreed — Party A retains home, Party B rehouses</p>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-medium text-foreground mb-2">Party A (retains home)</p>
                <div className="space-y-1.5 text-muted-foreground text-xs">
                  <div className="flex justify-between gap-2"><span>Net income</span><span>£2,800/month</span></div>
                  <div className="flex justify-between gap-2"><span>Mortgage repayment</span><span>– £950/month</span></div>
                  <div className="flex justify-between gap-2"><span>Utilities + bills</span><span>– £500/month</span></div>
                  <div className="flex justify-between gap-2"><span>Other outgoings</span><span>– £600/month</span></div>
                  <div className="flex justify-between gap-2 pt-1 border-t font-semibold text-foreground"><span>Monthly surplus</span><span>£750</span></div>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Party B (rehouses in rented)</p>
                <div className="space-y-1.5 text-muted-foreground text-xs">
                  <div className="flex justify-between gap-2"><span>Net income</span><span>£1,800/month</span></div>
                  <div className="flex justify-between gap-2"><span>Rent</span><span>– £900/month</span></div>
                  <div className="flex justify-between gap-2"><span>Utilities + bills</span><span>– £350/month</span></div>
                  <div className="flex justify-between gap-2"><span>Other outgoings</span><span>– £400/month</span></div>
                  <div className="flex justify-between gap-2 pt-1 border-t font-semibold text-destructive"><span>Monthly deficit</span><span>– £150</span></div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
              <span>Party B's monthly deficit may be addressed through: a maintenance payment from Party A, a larger capital allocation to supplement income, or reduced outgoings through a less expensive housing arrangement. The calculator models all of these adjustments.</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">Illustrative only. Actual figures depend on specific circumstances.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-five-year">
          Short-term vs Longer-term Cashflow
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          A monthly cashflow deficit is not always unsustainable if sufficient capital reserves exist to cover it while income adjusts. The critical questions are: how long is the deficit period, and are the capital reserves sufficient to bridge it?
        </p>
        <div className="space-y-3">
          {[
            { icon: Banknote, label: "Immediate post-separation period", desc: "The first 6–12 months are often the most financially intense — relocation costs, setting up a new home, legal fees, and potentially two properties to fund simultaneously." },
            { icon: BarChart3, label: "Short-term outlook (1–3 years)", desc: "As housing arrangements stabilise and income potentially adjusts (through part-time work, retraining, or career progression), the monthly cashflow position may improve. Modelling this transition period helps assess whether initial deficits are bridgeable." },
            { icon: TrendingUp, label: "Longer-term sustainability (5 years)", desc: "The full paid report extends projections to 5 years, incorporating assumed income growth and changing outgoings — providing a view of longer-term financial sustainability under different settlement structures." },
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
        <InlineCTA label="Access 5-year cashflow projections in the full report" />
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
