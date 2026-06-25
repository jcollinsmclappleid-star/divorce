import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, Scale, BarChart3, TrendingUp } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Does 'fair' mean a 50/50 split in UK divorce?",
    answer: "Not necessarily. English family law uses fairness as its guiding principle, but this does not translate to a fixed formula. In long marriages, equality is a common starting point. In shorter marriages, or where one party has significantly greater needs or childcare responsibilities, outcomes may diverge materially from equal division. The court's discretion is broad.",
  },
  {
    question: "What factors determine a fair settlement?",
    answer: "Courts in England and Wales apply Section 25 of the Matrimonial Causes Act 1973. Key factors include: the welfare of any dependent children, the financial needs and resources of each party, earning capacity (current and future), standard of living during the marriage, contributions made (financial and non-financial), age and health, and the duration of the marriage. No single factor is determinative.",
  },
  {
    question: "Can the calculator tell me what is fair for my situation?",
    answer: "No. This page helps you compare scenarios numerically — it does not decide what is legally fair or predict a court outcome. Fairness in a legal sense depends on your specific circumstances, the discretion of the court, and professional legal advice. The calculator is a planning and comparison tool, not a legal assessment.",
  },
  {
    question: "Is a 60/40 split unfair in a long marriage?",
    answer: "Not necessarily — it depends on the circumstances. A 60/40 split might reflect one party's greater housing need, primary childcare responsibilities, lower earning capacity, or other factors. The calculator can model any split ratio, so you can compare 50/50, 60/40, 70/30, and other distributions side by side to understand the financial implications of each.",
  },
];

const scenarios = [
  { label: "50/50 baseline", desc: "An equal split by total net asset value — the most common reference point in long marriages." },
  { label: "Needs-adjusted", desc: "One party receives a greater share to reflect childcare responsibilities, lower income, or greater housing need." },
  { label: "Contributions-adjusted", desc: "Pre-marital assets, inheritance, or significantly unequal contributions may warrant departure from equality." },
  { label: "Income-weighted", desc: "Where income disparity is large, maintenance or a capital adjustment may produce a more sustainable outcome than a strict equal split." },
];

const relatedPages = [
  { title: "Divorce Settlement Calculator UK", description: "Comprehensive scenario modelling for your figures.", href: "/divorce-settlement-calculator-uk", badge: "Tool" },
  { title: "50/50 Split Calculator UK", description: "Model equal asset division and its liquidity implications.", href: "/divorce-50-50-split-calculator-uk", badge: "Asset Division" },
  { title: "Divorce Financial Modelling Guide", description: "How structured scenario modelling works in practice.", href: "/divorce-financial-modelling", badge: "Pillar Guide" },
  { title: "Is a 50/50 Split Automatic in UK Divorce?", description: "The legal reality behind equal division.", href: "/is-50-50-split-automatic-uk", badge: "FAQ" },
  { title: "Divorce Settlement Examples", description: "Worked examples across different asset profiles.", href: "/divorce-settlement-examples-uk", badge: "Examples" },
  { title: "Preview the Full Financial Report", description: "Compare scenarios side by side in the full report.", href: "/unlock", badge: "Report" },
];

export default function FairDivorceSettlementCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      showProductShowcase
      title="Fair Divorce Settlement Calculator UK"
      subtitle="Compare different settlement scenarios side by side to understand the financial implications of each approach. This page helps you model scenarios — it does not decide what is legally fair or predict a court outcome."
      documentTitle="Fair Divorce Settlement Calculator UK | DivorceCalculatorUK"
      metaDescription="Model and compare divorce settlement scenarios in England and Wales — equal splits, needs-based adjustments, and different asset allocations — to understand the financial implications of each."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Fair Divorce Settlement Calculator", href: "/fair-divorce-settlement-calculator" },
      ]}
    >
      <ContentSection>
        <Card className="border-amber-200 bg-amber-50 mb-8" data-testid="card-fairness-disclaimer">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Important: Modelling tool, not a legal assessment</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                This page helps you compare scenarios — it does not decide what is legally fair or predict a court outcome. What constitutes a fair settlement in England and Wales depends on your specific circumstances and is ultimately determined by agreement between the parties or by a court exercising broad discretion. Independent legal advice may be warranted.
              </p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-scenario-types">
          Settlement Scenarios to Compare
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The calculator lets you define your own split assumptions and compare the resulting financial positions side by side. Common scenarios worth modelling include the following.
        </p>
        <div className="space-y-3">
          {scenarios.map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg border text-sm">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <div>
                <p className="font-medium text-foreground">{s.label}</p>
                <p className="text-muted-foreground mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Model your scenarios" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-beyond-percentages">
          Beyond Simple Percentages
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          A settlement that appears numerically equal by total value may produce materially different real-world outcomes for each party, depending on which assets each receives.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card data-testid="card-liquidity">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Liquidity</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Property equity and pensions are illiquid. A party receiving primarily these assets may struggle with immediate cash needs despite appearing well-capitalised on paper.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-sustainability">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Income sustainability</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">A party with a larger capital share but lower income may face an unsustainable monthly cashflow. Modelling income alongside capital provides a fuller picture.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-long-term">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Long-term position</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Pension allocation has long-term retirement implications. A settlement that ignores pension disparity may produce financial inequality at retirement even where capital looks balanced at separation.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-illustrative-example">
          Illustrative Example: 50/50 vs 60/40
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Under these illustrative assumptions, a 10-percentage-point shift in the split ratio produces a material difference in each party's capital position. These figures are for illustration only.
        </p>
        <div className="rounded-lg border overflow-hidden mb-6" data-testid="table-fair-example">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Settlement assumption</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Party A receives</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Party B receives</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">50/50 split (£300,000 pool)</td>
                <td className="px-4 py-2.5 text-right font-medium">£150,000</td>
                <td className="px-4 py-2.5 text-right font-medium">£150,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">60/40 split (needs-adjusted)</td>
                <td className="px-4 py-2.5 text-right font-medium">£180,000</td>
                <td className="px-4 py-2.5 text-right font-medium">£120,000</td>
              </tr>
              <tr className="bg-primary/5">
                <td className="px-4 py-2.5 font-semibold text-foreground">Difference</td>
                <td className="px-4 py-2.5 text-right font-semibold">+£30,000</td>
                <td className="px-4 py-2.5 text-right font-semibold">−£30,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          The calculator lets you model any percentage split — not just 50/50 or 60/40 — and compares the resulting capital and income positions for both parties simultaneously. Entering your own figures will produce outputs specific to your asset pool.
        </p>
        <InlineCTA label="Model your split scenarios" />
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
