import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Pensions are usually the largest asset", desc: "For couples divorcing in their 50s and 60s, pensions often outweigh the family home. Defined benefit pensions in particular can have surprisingly high CETVs (sometimes £500k+ for long-service public sector or final salary scheme members)." },
  { title: "Pension sharing orders dominate", desc: "Splitting pensions properly via pension sharing orders is the single most important financial decision in most silver divorces. Offsetting (one party keeps the house, the other keeps the pension) often leaves one party housed but cash-poor in retirement." },
  { title: "Length of marriage can make sharing central", desc: "After 25, 30 or 40 years of marriage, a professional review may focus heavily on sharing, needs and pensions built up during the marriage. Pre-marital pension contributions may need separate evidence and advice." },
  { title: "State pension forecasts need review", desc: "State pension is not directly shareable on divorce, but each party's National Insurance record matters — including any 'Home Responsibilities Protection' or credits during child-rearing. Both parties should request State Pension forecasts from gov.uk." },
  { title: "Mortgage capacity in later life is constrained", desc: "Lenders cap mortgages by age and by income at retirement. A 60-year-old wanting to take a mortgage to buy out the other's share of the house may find lenders will only lend on a much shorter term, requiring substantial deposit." },
  { title: "Spousal maintenance is shorter at retirement", desc: "Joint lives spousal maintenance is rare. In silver divorces, maintenance is usually limited or capitalised given that earned income is reducing for both parties. The focus shifts to capital and pension division for long-term security." },
];

const figures = [
  "CETVs for every pension held by both parties (DB and DC)",
  "State pension forecasts from gov.uk for both parties",
  "Defined benefit scheme rules — particularly survivor benefits and revaluation",
  "Property valuations (multiple, at least three) for the family home",
  "Mortgage capacity assessments for both parties at current age",
  "Estimated retirement income for each party in 5/10/15 years",
  "Healthcare and care cost projections",
  "Inheritance tax position and existing wills",
];

const faqItems = [
  { question: "Is divorce in your 50s or 60s different to divorce earlier?", answer: "Yes, in important ways. Pensions are usually larger and more central. Earning capacity to rebuild assets is more limited. Mortgage borrowing is restricted by age. Healthcare and long-term care costs come into focus. The settlement needs to provide both parties with sustainable income and housing for life — which is much more complex than a younger settlement." },
  { question: "How are pensions split in a long marriage?", answer: "Most commonly through a pension sharing order, which transfers a percentage of one party's CETV into the other's name as a separate pension. After 20+ years of marriage, the starting point is usually equal sharing of pension benefits accrued during the marriage. Defined benefit schemes require careful actuarial input to ensure equality of income, not just CETV." },
  { question: "Can I keep the house and let my ex keep the pension?", answer: "Yes — this is called pension offsetting. But it should be modelled carefully. CETVs typically understate the real lifetime value of a defined benefit pension, so a £400k house traded against a £400k CETV may not be a fair swap. Specialist input from a Pensions on Divorce Expert (PODE) is normally needed for substantial offsetting." },
  { question: "Will I get spousal maintenance in my 60s?", answer: "Joint lives maintenance is rare, especially where the paying party is approaching or in retirement. Maintenance is usually term-limited (perhaps until State Pension Age) or capitalised into a one-off lump sum. The focus is typically on dividing capital and pensions to provide long-term security." },
  { question: "What about my state pension?", answer: "State pension is not shareable directly. However, the State Pension forecast from gov.uk is essential financial information both parties should obtain. Long marriages where one party reduced work to raise children may have a lower forecast; this gap can sometimes be addressed through the wider settlement." },
  { question: "How does inheritance tax affect a silver divorce?", answer: "Divorce ends the spouse exemption from inheritance tax. After the final order, gifts and asset transfers between former spouses are no longer IHT-free. Wills should be reviewed and updated immediately. For high-value estates, IHT planning becomes a key part of the post-divorce financial picture." },
];

const relatedPages = [
  { title: "Pension Sharing vs Offsetting UK", description: "How to choose between the two main pension routes.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "CETV Explained Divorce UK", description: "Understanding the pension valuation that drives settlements.", href: "/cetv-explained-divorce-uk", badge: "Pensions" },
  { title: "Long Marriage Divorce Settlement UK", description: "How long marriages are treated.", href: "/long-marriage-divorce-settlement-uk", badge: "Settlement" },
  { title: "Preview the Full Financial Report", description: "Model your retirement scenarios.", href: "/unlock", badge: "Report" },
];

export default function SilverDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Silver Divorce UK — Financial Settlements in Your 50s and 60s"
      subtitle="Divorce in later life is fundamentally different. Pensions usually outweigh the house, mortgage capacity is constrained, and the settlement must provide both parties with income for the rest of their lives. Here is what changes."
      documentTitle="Silver Divorce UK — Over 50s and Over 60s | DivorceCalculatorUK"
      metaDescription="Silver divorce UK explained. How pensions, mortgage capacity, spousal maintenance and inheritance tax differ when divorcing in your 50s or 60s. Long marriage settlement principles."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Silver Divorce UK", href: "/silver-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          'Silver divorce' — the popular term for divorce in your 50s, 60s and beyond — is the fastest-growing divorce demographic in the UK. The financial dynamics are markedly different from divorce earlier in life. Pensions are typically the largest single asset; both parties have less time and less earning capacity to rebuild; and the settlement must provide income and housing security for the rest of both parties' lives. Decisions made now have less time to be corrected. Getting them right matters more than ever.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">The single most common mistake in silver divorces is treating the family home and the pension CETV as direct equivalents. They are not. A defined benefit CETV often understates lifetime value by 30–50%. Specialist pension advice (a Pensions on Divorce Expert, PODE) is normally well worth the cost.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things That Change After 50</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <PiggyBank className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Retirement Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures and Documents You Will Need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {figures.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Pension offsetting math", desc: "Trading the house for the pension is intuitive but often unfair — the CETV-to-house equivalence rarely reflects real lifetime value, especially for defined benefit schemes." },
            { label: "Housing on a single income later in life", desc: "A 60-year-old wanting to keep or buy a property typically faces sharply restricted mortgage terms (10–15 years maximum). The capital required to house both parties is often more than the matrimonial pot supports." },
            { label: "Future care costs", desc: "Average lifetime care costs in the UK can exceed £100k. Settlements that look balanced in cash terms may leave one party much more exposed to care costs in their 80s than the other." },
            { label: "Inheritance and wills", desc: "Existing wills written during marriage are partially revoked by divorce. Estate planning, IHT positions and beneficiary nominations all need urgent attention before and after the final order." },
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
            "What discount or premium should apply when offsetting pensions against property",
            "Your individual pension scheme's revaluation, survivor benefits and indexation",
            "Whether equity release or downsizing is the right route to fund your settlement",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Should we instruct a Pensions on Divorce Expert (PODE) for actuarial input?</li>
          <li>How do we ensure equality of pension income, not just CETV?</li>
          <li>What mortgage capacity do I realistically have at my age?</li>
          <li>Should I update my will and pension nominations now or after the final order?</li>
          <li>What are the inheritance tax implications of the proposed settlement?</li>
        </ul>
        <InlineCTA label="Compare Settlement Scenarios" />
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
