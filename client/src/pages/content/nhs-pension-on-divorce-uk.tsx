import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Three NHS pension sections", desc: "Most NHS staff have benefits across the 1995 section, the 2008 section and the 2015 CARE scheme. Long-serving staff often have benefits in all three. Each has different accrual rates, retirement ages and revaluation rules." },
  { title: "1995 section — final salary", desc: "Closed to new accrual but still pays out for service before April 2015 (April 2022 for protected members). Pension calculated as 1/80 of best final salary per year of service, with a 3x lump sum. Normal pension age 60 (55 for special classes)." },
  { title: "2008 section — final salary, age 65", desc: "Pension at 1/60 of reckonable pay per year, optional commutation to lump sum. Normal retirement age 65. Same final-salary basis as 1995 but with later normal retirement age and no automatic lump sum." },
  { title: "2015 section — career average (CARE)", desc: "All NHS staff now build benefits in the 2015 CARE scheme. Each year you accrue 1/54 of pensionable pay, revalued annually by CPI plus 1.5%. Normal pension age = State Pension Age." },
  { title: "Pension sharing is the standard route", desc: "NHS pensions can be split via pension sharing order. The receiving party becomes a 'pension credit member' of the NHS scheme with their own benefits — they do not need to be NHS staff to receive these benefits." },
  { title: "CETV understates real value", desc: "NHS CETVs — particularly for the 1995 and 2008 final-salary sections — are calculated using prescribed assumptions and often significantly understate lifetime value. PODE input is normally needed for any substantial NHS pension settlement." },
];

const figures = [
  "TRS (Total Reward Statement) showing accrual in each section",
  "Latest CETV statement from NHS Pensions",
  "Service history (start date, breaks, full/part-time hours)",
  "Current pensionable pay and pay history (5 years)",
  "Whether McCloud remedy choice has been made (post-2015 service)",
  "Any added pension or additional voluntary contributions",
  "Survivor benefit details for current spouse",
  "Whether ill-health early retirement is in prospect",
];

const faqItems = [
  { question: "Can the NHS pension be split on divorce?", answer: "Yes. The NHS pension scheme allows pension sharing orders. Following a sealed court order, the scheme administrator (NHS Business Services Authority) creates a 'pension credit' for the receiving party — who becomes a member of the NHS scheme in their own right with their own retirement benefits." },
  { question: "Does my ex have to be an NHS employee to receive a share?", answer: "No. The receiving party becomes a pension credit member of the NHS pension scheme regardless of their own occupation. Their pension credit is held within the scheme until their normal retirement age and is paid alongside any other NHS benefits they may have." },
  { question: "How is an NHS pension valued for divorce?", answer: "By CETV — Cash Equivalent Transfer Value — calculated separately for each section (1995, 2008, 2015). For long-serving members the CETVs across the three sections can total £500,000–£1m+. Specialist actuarial input is normally needed because CETVs often understate the real lifetime value of NHS final-salary benefits." },
  { question: "Is offsetting the NHS pension against the house a good idea?", answer: "Usually no, particularly for substantial NHS final-salary entitlements. The CETV typically understates real value, so a 'fair' offset based on CETV-to-house equivalence often disadvantages the party giving up the pension share. Specialist advice from a Pensions on Divorce Expert is normally well worth the cost." },
  { question: "What is the McCloud remedy and how does it affect divorce?", answer: "The McCloud judgment found that 2015 NHS pension reforms unlawfully discriminated against younger members. As a remedy, NHS members can now choose between 1995/2008 and 2015 benefits for service from 2015–2022. This choice may not be settled until retirement and complicates divorce CETVs significantly. The CETV must reflect the higher of the two benefit structures." },
  { question: "How long does an NHS pension share take to implement?", answer: "After the sealed pension sharing order, NHS Pensions has four months to implement the share. The receiving party then becomes a pension credit member with their own benefits. Statements confirming the new entitlements typically follow within a further 1–2 months." },
];

const relatedPages = [
  { title: "CETV Explained Divorce UK", description: "The pension valuation that drives every settlement.", href: "/cetv-explained-divorce-uk", badge: "Pensions" },
  { title: "Final Salary Pension on Divorce UK", description: "How DB pensions are treated.", href: "/final-salary-pension-on-divorce-uk", badge: "Pensions" },
  { title: "Pension Sharing vs Offsetting UK", description: "Choosing between the two main routes.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Preview the Full Financial Report", description: "Model NHS pension scenarios.", href: "/unlock", badge: "Report" },
];

export default function NhsPensionDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="NHS Pension on Divorce UK — How the Three Sections Are Split"
      subtitle="Most NHS staff have benefits in the 1995, 2008 and 2015 sections. Pension sharing orders are the standard route. CETVs typically understate real lifetime value — actuarial input is usually essential."
      documentTitle="NHS Pension on Divorce UK | DivorceCalculatorUK"
      metaDescription="NHS pension on divorce UK. Pension sharing across the 1995, 2008 and 2015 sections, McCloud remedy, CETV valuation, and how a pension credit member is created."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "NHS Pension on Divorce UK", href: "/nhs-pension-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The NHS pension scheme is one of the most generous occupational pensions in the UK, with around 1.5 million active members and benefits accrued across three distinct sections (1995, 2008 and 2015). For NHS staff or their spouses going through divorce, the pension is typically the largest single asset after the family home — and frequently larger. Splitting it properly via a pension sharing order, with proper actuarial valuation, is usually the most important financial decision in the settlement.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">NHS CETVs often understate the lifetime value of the pension by 30–50%. Settlement based purely on face-value CETV — particularly when offsetting against the house — typically shortchanges the party giving up the pension share. A Pensions on Divorce Expert (PODE) report is normally well worth the cost.</p>
          </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things You Need to Know</h2>
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
        <InlineCTA label="Model NHS Pension Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Will Need</h2>
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
            { label: "McCloud remedy uncertainty", desc: "Members with service either side of 2015 may have a choice of benefit structures that is not settled until retirement. This complicates CETVs and makes pension sharing percentages hard to crystallise without specialist input." },
            { label: "Three-section complexity", desc: "Splitting an NHS pension means addressing benefits in the 1995, 2008 and 2015 sections separately. Each has different normal retirement ages and accrual rates. A simple percentage applied to total CETV may not produce a fair income split." },
            { label: "Survivor benefits", desc: "NHS pensions provide spouse's pensions on death. Pension sharing creates a clean break — the receiving party gets their own NHS benefits — but the sharing party's surviving partner (if any) loses entitlement on the shared portion." },
            { label: "Long implementation timeline", desc: "NHS Pensions has up to four months to implement a pension sharing order after sealing. Where parties want clean financial separation alongside the divorce final order, this timeline needs to be factored in." },
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
            "Which McCloud benefit structure should be used in the CETV calculation",
            "What discount applies if you offset the NHS pension against the house",
            "Whether to share within the NHS scheme or transfer the credit elsewhere",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a Pensions on Divorce Expert (PODE) report on the NHS pension?</li>
          <li>How does the McCloud remedy affect our CETV?</li>
          <li>Should we share the pension or offset it against other assets?</li>
          <li>What sharing percentage produces equal pension income at retirement?</li>
          <li>What survivor benefits will be lost or preserved by the share?</li>
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
