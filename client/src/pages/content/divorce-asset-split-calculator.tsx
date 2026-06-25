import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, PiggyBank, Coins, Package, ArrowRightLeft } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const assetTypes = [
  { icon: Home, label: "Property", desc: "Family home and any additional properties. The calculator uses current estimated value minus outstanding mortgage and estimated sale costs to arrive at net equity." },
  { icon: PiggyBank, label: "Pensions", desc: "Workplace and personal pension funds. Entered as Cash Equivalent Transfer Values (CETVs) — the scheme's estimate of the capital value. CETVs for defined benefit pensions may not reflect true economic value." },
  { icon: Coins, label: "Savings and investments", desc: "Cash savings, ISAs, stocks and shares portfolios, investment accounts, and premium bonds. Generally treated as liquid assets available for immediate division." },
  { icon: Package, label: "Other assets", desc: "Business interests, vehicles, valuables, and other assets with significant value. These can be included in the overall pool figure." },
  { icon: ArrowRightLeft, label: "Liabilities", desc: "Credit card balances, personal loans, car finance, and other joint or individual debts are deducted from the asset pool before distribution." },
];

const faqItems = [
  {
    question: "What is the matrimonial asset pool?",
    answer: "The matrimonial asset pool (or 'pot') is the total of all assets minus all liabilities considered in the financial settlement. It typically includes the family home equity, savings, investments, and pension values. Pre-marital assets, gifts, and inheritance may be treated differently, particularly in shorter marriages.",
  },
  {
    question: "Are all assets split equally?",
    answer: "Not necessarily. The total pool is identified first, and then the court (or the parties by agreement) decides how to divide it. Equal division is a common reference point in long marriages, but the composition of each party's share — not just the total value — matters significantly. A party receiving primarily property equity faces ongoing housing costs; a party receiving primarily pensions has long-term retirement provision but limited immediate access.",
  },
  {
    question: "Are pre-marital assets included in the split?",
    answer: "Pre-marital assets are potentially in scope for disclosure but may be treated differently in the settlement, particularly in shorter marriages. In longer marriages, pre-marital assets are more likely to be considered part of the overall pool, especially if they have been 'mingled' with matrimonial assets. This is a complex area where legal advice is relevant.",
  },
  {
    question: "How does the calculator handle debts?",
    answer: "Debts (mortgage, credit cards, loans) are entered as liabilities and deducted from the gross asset total to arrive at net assets available for division. The calculator models the net position — what each party is left with after all obligations are accounted for.",
  },
  {
    question: "Can I model an unequal asset split?",
    answer: "Yes. The scenarios allow you to define different property allocation outcomes (one party retains the home, sale and split, deferred sale) and the overall asset split ratio can be modelled at any level — 50/50, 60/40, or other distributions. The calculator then shows what each party receives and their resulting income sustainability position.",
  },
];

const relatedPages = [
  { title: "Divorce Settlement Calculator UK", description: "Full settlement modelling including income sustainability.", href: "/divorce-settlement-calculator-uk", badge: "Tool" },
  { title: "Equity Split Divorce Calculator", description: "Model property equity splits and buyout amounts.", href: "/equity-split-divorce-calculator", badge: "Property" },
  { title: "50/50 Split Calculator UK", description: "Model equal asset division and liquidity implications.", href: "/divorce-50-50-split-calculator-uk", badge: "Asset Division" },
  { title: "Matrimonial vs Non-Matrimonial Assets", description: "What counts as a marital asset in England and Wales.", href: "/matrimonial-vs-non-matrimonial-assets-uk", badge: "Guide" },
  { title: "Preview the Full Financial Report", description: "See a full asset split modelled with your figures.", href: "/unlock", badge: "Report" },
];

export default function DivorceAssetSplitCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      showProductShowcase
      title="Divorce Asset Split Calculator UK"
      subtitle="Model how the matrimonial asset pool — property, savings, pensions, and investments — could be divided between the parties under different settlement assumptions."
      documentTitle="Divorce Asset Split Calculator UK | DivorceCalculatorUK"
      metaDescription="UK divorce asset split calculator — model how the matrimonial pool of property, savings, pensions and investments is divided under different settlement scenarios."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Divorce Asset Split Calculator UK", href: "/divorce-asset-split-calculator" },
      ]}
    >
      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-asset-types">
          Assets Included in the Pool
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          The starting point for any settlement model is identifying and valuing all assets and liabilities. The calculator covers the following categories.
        </p>
        <div className="space-y-3">
          {assetTypes.map((a, i) => (
            <Card key={i} data-testid={`card-asset-${i}`}>
              <CardContent className="pt-4 pb-3 flex gap-3">
                <a.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{a.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{a.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Enter your asset figures" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-worked-example">
          Worked Example
        </h2>
        <Card data-testid="card-worked-example">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-semibold text-foreground mb-4">Illustrative asset pool</p>
            <div className="space-y-2 mb-4">
              {[
                { label: "Family home (net equity after mortgage)", value: "£280,000", badge: "Property" },
                { label: "Cash savings (joint and individual)", value: "£40,000", badge: "Liquid" },
                { label: "ISA and investments", value: "£25,000", badge: "Liquid" },
                { label: "Pension — Party A (CETV)", value: "£150,000", badge: "Illiquid" },
                { label: "Pension — Party B (CETV)", value: "£40,000", badge: "Illiquid" },
                { label: "Credit card and loan liabilities", value: "– £12,000", badge: "Debt" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground flex-1">{row.label}</span>
                  <Badge variant="outline" className="text-xs">{row.badge}</Badge>
                  <span className="font-medium text-foreground w-20 text-right">{row.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-2 text-sm pt-2 border-t font-semibold">
                <span>Total net asset pool</span>
                <span>£523,000</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Note: £190,000 of the pool is in illiquid pension assets. A 50/50 split by total value does not mean each party receives the same liquidity or the same asset types. Scenario modelling illustrates these differences.</p>
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
