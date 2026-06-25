import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, BarChart3, TrendingUp, Banknote, PiggyBank } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "What is a divorce settlement calculator?",
    answer: "A divorce settlement calculator models the financial implications of different settlement assumptions for both parties. It computes net asset pool size, distributes assets between parties under user-defined splits, and shows post-tax monthly income sustainability — helping both parties understand the numbers before negotiating or attending mediation.",
  },
  {
    question: "How is the net asset pool calculated?",
    answer: "The matrimonial asset pool is typically all assets minus all liabilities. The calculator deducts outstanding mortgage balances and estimated sale costs from property values, adds savings, investments, and pension CETVs, and subtracts any shared debts. The resulting figure is the starting point for scenario comparison.",
  },
  {
    question: "Does the calculator include pensions in the settlement?",
    answer: "Yes. Pension values (entered as CETVs — Cash Equivalent Transfer Values) are included in the asset pool. You can model how different pension allocation assumptions — such as pension sharing or offsetting against property — affect the overall distribution of assets between the parties.",
  },
  {
    question: "Can the calculator model maintenance payments?",
    answer: "Yes. The wizard includes an optional spousal maintenance toggle. When enabled, you can model a monthly income transfer between parties and see how it affects post-separation net monthly income for both. Child maintenance can also be factored into outgoings.",
  },
  {
    question: "What is the difference between this and a full financial adviser?",
    answer: "This calculator is a scenario modelling tool — it shows what the numbers look like under different assumptions. A financial adviser provides regulated advice tailored to your specific circumstances, including tax planning, pension analysis, and recommendations. The calculator is a planning aid, not a substitute for professional advice.",
  },
];

const relatedPages = [
  { title: "Free Divorce Calculator UK", description: "Start modelling without any commitment.", href: "/free-divorce-calculator-uk", badge: "Free Tool" },
  { title: "Fair Divorce Settlement Calculator", description: "Compare scenarios against a fairness framing.", href: "/fair-divorce-settlement-calculator", badge: "Scenarios" },
  { title: "50/50 Split Calculator UK", description: "Model equal asset division numerically.", href: "/divorce-50-50-split-calculator-uk", badge: "Asset Division" },
  { title: "Divorce Financial Modelling Guide", description: "How structured scenario modelling works.", href: "/divorce-financial-modelling", badge: "Pillar Guide" },
  { title: "Divorce Settlement Examples", description: "Worked examples across different asset profiles.", href: "/divorce-settlement-examples-uk", badge: "Examples" },
  { title: "Preview the Full Financial Report", description: "See a full settlement modelled with real figures.", href: "/unlock", badge: "Report" },
];

export default function DivorceSettlementCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce Settlement Calculator UK"
      subtitle="Model the financial outcomes of different divorce settlement structures. Compare asset splits, income sustainability, and long-term financial positions side by side — before negotiating or attending mediation."
      documentTitle="Divorce Settlement Calculator UK | DivorceCalculatorUK"
      metaDescription="UK divorce settlement calculator — model asset pool distribution, property scenarios, pension allocation, and post-separation monthly income for both parties."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Divorce Settlement Calculator UK", href: "/divorce-settlement-calculator-uk" },
      ]}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-settlement-components">
          What a Settlement Model Covers
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          A meaningful settlement model goes beyond simply dividing a total figure. It accounts for asset composition, tax implications, and post-separation income sustainability for both parties.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-capital">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Capital Division</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">How the matrimonial asset pool is divided — property equity, savings, investments, and pension CETVs — under different split assumptions.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-income">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Income Sustainability</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Post-tax net monthly income for each party after separation, compared against their individual outgoings to assess financial sustainability.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-liquidity">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Liquidity Profile</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">How much of each party's settlement is immediately accessible versus locked in property equity or pension funds unavailable until retirement age.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-pensions">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <PiggyBank className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Pension Allocation Impact</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">How different pension sharing percentages or offsetting assumptions affect the overall distribution and each party's long-term retirement provision.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model your settlement" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-illustrative-example">
          Illustrative Example
        </h2>
        <Card data-testid="card-example">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-4">Assets: Family home £450,000 — Mortgage £150,000 — Savings £60,000 — Pensions £220,000</p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-foreground mb-1">Net asset pool</p>
                <p className="text-muted-foreground">Approximately £562,000 after mortgage and estimated sale costs of £18,000</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">50/50 allocation</p>
                <p className="text-muted-foreground">~£281,000 each — but composition differs significantly by scenario</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Income position</p>
                <p className="text-muted-foreground">Monthly sustainability depends on housing costs assumed and whether maintenance is included</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">This is illustrative only. Actual figures depend on the specific circumstances of each case.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-stress-testing">
          Stress Testing Your Settlement Model
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          A settlement that appears sustainable under current assumptions may become fragile under changed conditions. The full report includes stress test sliders for interest rate changes, property value shifts, and income changes — showing how each scenario holds up under pressure.
        </p>
        <div className="space-y-3">
          {[
            { label: "Interest rate stress", desc: "How mortgage affordability changes if rates rise by 1%, 2%, or 3%." },
            { label: "Property value sensitivity", desc: "How net equity changes if property values fall or rise by 10–20%." },
            { label: "Income change scenarios", desc: "How monthly surplus/deficit changes if income falls due to part-time work, career break, or job loss." },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg border text-sm">
              <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{s.label}</p>
                <p className="text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Access stress testing in the full report" />
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
