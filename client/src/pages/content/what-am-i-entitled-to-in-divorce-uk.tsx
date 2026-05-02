import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const factors = [
  { title: "Needs of the parties (especially housing)", desc: "The court's first concern is that both parties — and any children — have somewhere suitable to live. Housing needs often shape the asset split before any concept of 'fairness' is applied." },
  { title: "Income and earning capacity", desc: "Current income, future earning potential, and any career sacrifices made during the marriage are all weighed. A long career break to raise children typically affects the assessment." },
  { title: "Standard of living during the marriage", desc: "The lifestyle the family had during the marriage is a reference point — not a guarantee, but courts try to avoid a sharp drop in standard of living for either party where possible." },
  { title: "Length of the marriage", desc: "Short marriages (under 5 years) tend toward returning each party to their pre-marriage position. Long marriages (15+ years) tend toward a sharing approach across all matrimonial assets." },
  { title: "Contributions (financial and non-financial)", desc: "Both earning income and raising children/running the home are recognised contributions. The courts have repeatedly confirmed that homemaking contributions count equally with financial ones." },
  { title: "Age and health of both parties", desc: "Older parties closer to retirement, or those with health conditions affecting earning capacity, are typically given more weight in needs-based reasoning." },
];

const assetTypes = [
  "The family home and any other property",
  "Pensions (often the largest asset after property)",
  "Savings, ISAs and investment accounts",
  "Business interests and shareholdings",
  "Stocks, bonds, RSUs and share schemes",
  "Cash, vehicles and valuable possessions",
  "Joint and individual debts (mortgage, loans, cards)",
  "Future income and earning capacity",
];

const faqItems = [
  {
    question: "Am I automatically entitled to half of everything?",
    answer: "No. There is no automatic 50/50 rule in England and Wales. The starting point in long marriages is often equal sharing of matrimonial assets, but the actual outcome depends on housing needs, income, the children, contributions and many other factors. Short marriages and cases where one party brought significant pre-marital wealth often result in different splits.",
  },
  {
    question: "Do I have to share assets I owned before the marriage?",
    answer: "Pre-marital assets are sometimes treated as 'non-matrimonial' and may be retained by the original owner — but only if the needs of both parties (and any children) can still be met from the rest of the pot. In needs-based cases, even pre-marital assets can be drawn into the settlement.",
  },
  {
    question: "Does my pension form part of the settlement?",
    answer: "Yes. Pensions accrued during the marriage are matrimonial assets and form part of the financial settlement. Options include pension sharing orders, pension offsetting (against other assets), and earmarking. Pensions are often a substantial portion of the total pot.",
  },
  {
    question: "Will my contribution as a stay-at-home parent be recognised?",
    answer: "Yes. UK courts have repeatedly confirmed that homemaking and child-rearing contributions count equally with financial contributions. A long career break to raise children is a recognised factor in the settlement.",
  },
  {
    question: "How long do I have to make a financial claim after divorce?",
    answer: "There is no strict statutory deadline, but financial claims should ideally be resolved at the time of divorce and finalised in a consent order. Without a clean break order, claims can technically remain open for many years — but the longer the delay, the harder claims become to pursue successfully.",
  },
  {
    question: "What if my ex hides assets to reduce my entitlement?",
    answer: "Both parties are required to provide full and frank financial disclosure (typically via Form E in court proceedings). If a party is found to have hidden assets, the settlement can be set aside and re-opened. Courts treat non-disclosure very seriously.",
  },
];

const relatedPages = [
  { title: "Section 25 Factors in UK Divorce", description: "The legal framework courts use to determine financial outcomes.", href: "/section-25-factors-divorce-uk", badge: "Legal" },
  { title: "Form E Financial Disclosure UK", description: "What goes into the standard financial disclosure form.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
  { title: "Matrimonial vs Non-Matrimonial Assets", description: "How courts distinguish between shared and individual assets.", href: "/matrimonial-vs-non-matrimonial-assets-uk", badge: "Assets" },
  { title: "Preview the Full Financial Report", description: "Model your asset position with figures from your own situation.", href: "/unlock", badge: "Report" },
];

export default function WhatAmIEntitledToPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="What Am I Entitled to in a Divorce UK?"
      subtitle="There is no fixed formula, no automatic 50/50, and no entitlement table. UK divorce settlements are decided by weighing a set of factors set out in the Matrimonial Causes Act 1973. Here's what those factors are and how they typically play out."
      documentTitle="What Am I Entitled to in a Divorce UK? | DivorceCalculatorUK"
      metaDescription="Understand what you may be entitled to in a UK divorce — Section 25 factors, the role of needs, contributions, pensions, the family home and how the courts approach financial settlements."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "What Am I Entitled to in a Divorce UK", href: "/what-am-i-entitled-to-in-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The honest answer is: it depends. Unlike some other jurisdictions, England and Wales does not use a fixed formula. Courts apply a set of statutory factors (commonly called the Section 25 factors) and aim for an outcome that is fair given all the circumstances. The starting point in long marriages is often equal sharing of matrimonial assets, but the actual outcome can differ significantly based on housing needs, income disparity, the welfare of any children, and what each party brought into and contributed during the marriage.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">No two divorce settlements are alike. Anyone telling you "you're entitled to X%" without seeing your full financial picture is guessing. Use illustrative modelling to understand the range of possible outcomes, then take qualified legal advice on your specific case.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Six Factors That Shape Most Settlements</h2>
        <div className="space-y-4 mb-6">
          {factors.map((f, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{f.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Settlement Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Assets That Typically Form the Pot</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {assetTypes.map((a, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {a}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Each party's gross annual income",
            "Combined liquid capital — savings, ISAs, investments",
            "Family home equity after typical 2–3% sale costs",
            "Outstanding joint debts (mortgages, loans, credit cards)",
            "Combined pension CETVs across all schemes",
            "Number and ages of dependent children",
            "Length of marriage in full years",
            "Each party's estimated monthly income need post-divorce",
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Housing-need cases vs sharing cases", desc: "Where total assets are modest, the focus shifts almost entirely to making sure both parties have somewhere to live. Where assets are substantial, the analysis tends to emphasise sharing of what was built during the marriage." },
            { label: "The income disparity question", desc: "If one party earns significantly more (or has greater earning potential), the lower-earning party may receive a larger share of capital, ongoing maintenance, or both — particularly in long marriages with caring responsibilities." },
            { label: "Children's welfare comes first", desc: "The court's first consideration is the welfare of any children under 18. This often means the parent with day-to-day care is housed in something suitable for the children, even if that requires an unequal capital split." },
            { label: "Pre-marital and inherited wealth", desc: "Assets that pre-date the marriage or were inherited can sometimes be ring-fenced — but only if the rest of the pot is enough to meet both parties' needs. Long marriages tend to dilute the protection of pre-marital assets." },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <p className="text-sm font-semibold mb-1">{p.label}</p>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the Calculator Cannot Decide</h2>
        <div className="space-y-3 mb-6">
          {[
            "What a court would actually order in your specific case — only a qualified solicitor can give a view on that",
            "How a judge would weight needs vs sharing in your situation",
            "Whether pre-marital, inherited or gifted assets will be ring-fenced or drawn into the pot",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Given our finances, is this likely to be treated as a needs case or a sharing case?</li>
          <li>What weight is likely to be given to pre-marital or inherited assets in our situation?</li>
          <li>How might the court approach pension division given the disparity in our pension values?</li>
          <li>Is spousal maintenance likely, and if so, on what term and amount range?</li>
          <li>What is the realistic range of outcomes if this went to a final hearing?</li>
        </ul>
        <InlineCTA label="Compare Settlement Scenarios in the Calculator" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ContentSection>
    </ContentPageLayout>
  );
}
