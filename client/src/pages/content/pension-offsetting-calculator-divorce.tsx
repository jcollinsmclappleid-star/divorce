import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, BarChart3, Home, PiggyBank, Scale } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "What is pension offsetting in divorce?",
    answer: "Pension offsetting is where one party retains their pension while the other party receives a larger share of a different asset — typically property equity or savings — to compensate. No pension transfer occurs. The parties' pensions remain with their current holders, and the imbalance is addressed through the allocation of other assets.",
  },
  {
    question: "Why can't pension and property values be compared directly?",
    answer: "Pension and property are fundamentally different assets. Pension funds are locked until minimum pension age, tax-advantaged, and subject to income tax on drawdown. Property equity is accessible (subject to sale) and subject to Capital Gains Tax on disposal above the annual allowance. A pound of pension CETV does not have the same economic value today as a pound of property equity — particularly after accounting for the different tax treatments.",
  },
  {
    question: "Is pension offsetting the right approach?",
    answer: "It depends on the circumstances. Offsetting may be appropriate where one party has an urgent housing need, or where the pension holder strongly wishes to preserve their pension structure. However, the risk of comparing unlike assets means that a nominal 'equal' offset may not produce genuinely equivalent financial outcomes. The calculator models the numbers — whether it represents a sound economic exchange requires professional analysis.",
  },
  {
    question: "How is the offset amount calculated?",
    answer: "The starting point is the CETV of the pension to be offset. However, financial planners and courts often apply a 'discount' to the pension CETV when comparing it with property equity — to reflect the inaccessibility, tax treatment, and illiquidity of pension assets versus cash. The appropriate discount varies by individual circumstances and is not standardised.",
  },
  {
    question: "What happens to pension offsetting if the property falls in value?",
    answer: "If the property value falls after the settlement, the party who received property equity rather than pension shares may end up with less than anticipated, while the party who retained the pension is unaffected by the property market. This is one of the risks of offsetting — assets that appeared equivalent at settlement date may diverge significantly over time.",
  },
];

const relatedPages = [
  { title: "Pension Sharing Calculator", description: "Model pension sharing order percentages instead.", href: "/pension-sharing-calculator-divorce", badge: "Pensions" },
  { title: "Divorce Pension Calculator UK", description: "Overview of all pension division approaches.", href: "/divorce-pension-calculator", badge: "Pensions" },
  { title: "Pension Offsetting vs Pension Sharing", description: "Detailed comparison guide with pros and cons.", href: "/divorce-pension-offsetting-uk", badge: "Guide" },
  { title: "Equity Split Divorce Calculator", description: "Model property equity splits alongside pension assumptions.", href: "/equity-split-divorce-calculator", badge: "Property" },
  { title: "Divorce Pension Split Calculator", description: "Side-by-side pension scenario comparison.", href: "/divorce-pension-split-calculator-uk", badge: "Tool" },
  { title: "Preview the Full Financial Report", description: "Model pension offsetting in your full settlement.", href: "/unlock", badge: "Report" },
];

export default function PensionOffsettingCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Pension Offsetting Calculator — Divorce UK"
      subtitle="Model pension offsetting scenarios — where one party keeps the pension while the other receives more from property or savings. Compare offsetting and pension sharing side by side to understand the financial trade-offs."
      documentTitle="Pension Offsetting Calculator Divorce UK | DivorceCalculatorUK"
      metaDescription="Model pension offsetting in UK divorce — compare pension value against property equity, see the trade-offs vs pension sharing, and understand the financial implications of different approaches."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Pension Offsetting Calculator — Divorce", href: "/pension-offsetting-calculator-divorce" },
      ]}
    >
      <ContentSection>
        <Card className="border-amber-200 bg-amber-50 mb-6" data-testid="card-offsetting-warning">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Pension values are not directly equivalent to cash or property</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                Pension CETVs and property equity are not directly comparable. Pensions are illiquid, tax-advantaged, and unavailable until minimum pension age. Property equity is accessible (subject to sale). Nominal offsetting figures should not be treated as economically equivalent. This calculator models the numbers — professional pension and financial advice may be warranted before agreeing to offset.
              </p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-how-offsetting-works">
          How Pension Offsetting Works
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          In an offsetting arrangement, no pension transfer occurs. Instead, the financial settlement is structured so that one party's pension advantage is balanced by the other party receiving more from non-pension assets.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card data-testid="card-pension-holder">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <PiggyBank className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Pension holder</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Retains full pension. Typically receives less from property equity or savings to compensate for the pension advantage retained.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-other-party">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Home className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Other party</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Receives no pension transfer. Instead gets a larger share of property equity, savings, or other liquid assets to offset the pension imbalance.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-comparison">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">The comparison challenge</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Comparing pension CETV directly to property equity may overstate the pension's current economic value due to access restrictions and tax treatment differences.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model offsetting vs sharing scenarios" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-illustrative-example">
          Illustrative Comparison
        </h2>
        <Card data-testid="card-example">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-4">
              Assets: Property net equity £250,000 — Pension CETV £200,000 — Savings £50,000
            </p>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-medium text-foreground mb-2">Option A — Offsetting</p>
                <div className="space-y-1 text-muted-foreground text-xs">
                  <p>Party A (pension holder): retains £200k pension + £25k savings</p>
                  <p>Party B: receives £250k property equity + £25k savings</p>
                  <p className="text-amber-700 mt-2">Risk: £200k pension ≠ £200k equity in real terms due to access, tax, and illiquidity</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Option B — 50% pension sharing</p>
                <div className="space-y-1 text-muted-foreground text-xs">
                  <p>Pension split: £100k each</p>
                  <p>Property split: £125k each (sale and equal division)</p>
                  <p>Savings split: £25k each</p>
                  <p className="text-primary mt-2">Clean break — both parties hold pension and liquid assets</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">Illustrative only. Actual outcomes depend on specific circumstances. These figures are not pension or financial advice.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-trade-offs">
          Offsetting Trade-offs
        </h2>
        <div className="space-y-3">
          {[
            { icon: BarChart3, label: "Simpler to implement", desc: "No pension transfer is required, avoiding the administrative process and scheme fees associated with a pension sharing order." },
            { icon: Home, label: "Useful when housing is the priority", desc: "Where one party urgently needs property equity for rehousing, offsetting allows the pension to remain untouched while the housing need is met through the property split." },
            { icon: AlertTriangle, label: "Risk of unequal exchange", desc: "Pension CETV and property equity may look equivalent on paper but differ significantly in real economic value. A financial adviser can model the long-term implications." },
            { icon: Scale, label: "No clean break on pension assets", desc: "While the overall settlement may include a clean break, the pension holder's long-term retirement advantage may persist. This may or may not be appropriate depending on the full picture." },
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg border text-sm">
              <t.icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{t.label}</p>
                <p className="text-muted-foreground mt-0.5 leading-relaxed text-xs">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Compare offsetting and sharing in the full report" />
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
