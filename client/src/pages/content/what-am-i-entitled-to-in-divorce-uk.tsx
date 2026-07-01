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
  { title: "Standard of living during the marriage", desc: "The lifestyle the family had during the marriage is a reference point, but resources may not stretch to recreating the same standard in two households." },
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
    question: "Is half of everything automatic?",
    answer: "No. There is no automatic 50/50 rule in England and Wales. Equal sharing can be an important reference point in long marriages, but housing needs, income, children, contributions and many other factors affect the financial discussion. Short marriages and cases involving significant pre-marital wealth may need a different review.",
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
    question: "What if my ex hides assets to reduce the visible financial picture?",
    answer: "Both parties are required to provide full and frank financial disclosure (typically via Form E in court proceedings). If a party is found to have hidden assets, the settlement can be set aside and re-opened. Courts treat non-disclosure very seriously.",
  },
];

const relatedPages = [
  { title: "How Much Will I Get in a Divorce UK?", description: "Model your share from your own figures — free to start.", href: "/how-much-will-i-get-divorce-uk", badge: "Calculator" },
  { title: "Career Sacrifice Divorce Settlement UK", description: "How career breaks may be weighed in the assessment.", href: "/career-sacrifice-divorce-settlement-uk", badge: "Career" },
  { title: "Section 25 Factors in UK Divorce", description: "The legal framework courts use to determine financial outcomes.", href: "/section-25-factors-divorce-uk", badge: "Legal" },
  { title: "Form E Financial Disclosure UK", description: "What goes into the standard financial disclosure form.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
  { title: "Matrimonial vs Non-Matrimonial Assets", description: "How courts distinguish between shared and individual assets.", href: "/matrimonial-vs-non-matrimonial-assets-uk", badge: "Assets" },
  { title: "Preview the Full Financial Report", description: "Model your asset position with figures from your own situation.", href: "/unlock", badge: "Report" },
];

export default function WhatAmIEntitledToPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="What Financial Checks Matter in a Divorce UK?"
      subtitle="There is no fixed formula, no automatic 50/50, and no percentage table. UK divorce settlements are assessed by weighing factors set out in the Matrimonial Causes Act 1973. Here's what to understand before you rely on a headline split."
      documentTitle="Financial Checks in Divorce UK | DivorceCalculatorUK"
      metaDescription="Understand the financial checks that matter in a UK divorce — Section 25 factors, needs, contributions, pensions, the family home and preparation questions."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Financial Checks in Divorce UK", href: "/what-am-i-entitled-to-in-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The honest answer is: it depends. Unlike some other jurisdictions, England and Wales does not use a fixed formula. Courts apply a set of statutory factors (commonly called the Section 25 factors) and aim for an outcome that is fair given all the circumstances. The starting point in long marriages is often equal sharing of matrimonial assets, but the actual outcome can differ significantly based on housing needs, income disparity, the welfare of any children, and what each party brought into and contributed during the marriage.
        </p>

        <Card className="border-primary/20 bg-primary/5 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Want a number from your own figures?</strong>{" "}
              <a href="/how-much-will-i-get-divorce-uk" className="text-primary underline underline-offset-2 hover:text-gold">Model what your figures could leave you with</a>
              {" "}with the free calculator — then unlock the £79 Settlement Reality Check Report for your full position check.
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">No two divorce settlements are alike. Anyone giving a fixed percentage without seeing your full financial picture is guessing. Use illustrative modelling to understand the financial range to discuss, then take qualified legal advice on your specific case.</p>
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
            { label: "The income disparity question", desc: "If one party earns significantly more or has greater earning potential, capital, maintenance assumptions and monthly affordability may all need review — particularly in long marriages with caring responsibilities." },
            { label: "Children's housing and welfare", desc: "Where there are children under 18, housing, childcare costs and monthly affordability may become central practical checks." },
            { label: "Pre-marital and inherited wealth", desc: "Assets that pre-date the marriage or were inherited may need separate evidence and legal review. Long marriages, mingling and needs can all affect that discussion." },
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
            "How a qualified solicitor may assess your specific case",
            "How needs, sharing and resources may be weighed in your situation",
            "Whether pre-marital, inherited or gifted assets need separate review or may be part of the wider pot",
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
