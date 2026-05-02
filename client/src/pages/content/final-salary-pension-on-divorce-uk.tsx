import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Final salary = guaranteed income for life", desc: "A final salary (defined benefit) pension promises a fixed pension at retirement based on years of service and final pensionable pay. The investment risk and longevity risk sit with the scheme, not the member." },
  { title: "CETV is not the same as cash value", desc: "The Cash Equivalent Transfer Value of a final salary pension is an actuarial calculation based on prescribed assumptions. It often understates the true lifetime value of the guaranteed income — sometimes by 30–50%." },
  { title: "Pension sharing is the cleanest route", desc: "A pension sharing order debits a percentage from the member's CETV and credits it to the receiving party. The receiving party becomes either an internal member of the scheme (where allowed) or transfers the credit to a personal pension." },
  { title: "Internal vs external transfer", desc: "Public-sector and many private DB schemes give the receiving party a credit within the scheme — preserving the DB nature of the benefits. Some private schemes require the credit to be transferred out, converting the guaranteed income into a DC pot at the receiving party's risk." },
  { title: "Equality of CETV ≠ equality of income", desc: "Splitting two final-salary CETVs 50/50 rarely gives equal retirement income because of differences in age, accrual rate, normal pension age and revaluation rules. Equal income, not equal CETV, is usually the right target." },
  { title: "PODE input is normally essential", desc: "For substantial DB pensions (CETV > ~£100k), a Pensions on Divorce Expert (PODE) report is normally essential to calculate the right sharing percentage and assess offsetting fairly." },
];

const figures = [
  "Latest CETV statement (less than three months old)",
  "Scheme rules: revaluation, indexation, survivor benefits",
  "Member's date of joining and total service",
  "Normal pension age and current age",
  "Final pensionable pay and pay history",
  "Pension already in payment (if any)",
  "Tax-free cash entitlement at retirement",
  "Any GMP (Guaranteed Minimum Pension) or contracted-out portion",
];

const faqItems = [
  { question: "How is a final salary pension valued in divorce?", answer: "By Cash Equivalent Transfer Value (CETV) — an actuarial calculation by the scheme of what your guaranteed pension is 'worth' in lump sum terms today. CETVs are calculated using prescribed assumptions (notably gilt yields) and often significantly understate the true lifetime value of the income, particularly for younger members of generous schemes." },
  { question: "Can a final salary pension be split?", answer: "Yes. Pension sharing orders can be made against final salary pensions. After the order is sealed, the scheme implements the share within four months. The receiving party becomes either an internal member of the scheme or transfers the credit out to a personal pension, depending on the scheme rules." },
  { question: "Should I aim for equal CETV or equal income?", answer: "Almost always equal income, not equal CETV. The CETV is just a proxy for value. The actual question — what proportion of the lifetime pension income each party will receive — depends on age, scheme rules and the receiving party's circumstances. A PODE report calculates the sharing percentage needed to produce equal income at retirement." },
  { question: "What if the scheme makes me transfer the credit out?", answer: "Some private DB schemes do not accept internal pension credit members and require the receiving party to transfer the credit to a personal pension or SIPP. This converts a guaranteed income into a DC pot — the receiving party then bears all investment and longevity risk. This is a material disadvantage that should be reflected in the sharing percentage." },
  { question: "Can I offset the final salary pension against the house instead?", answer: "Yes — but with significant caution. CETVs typically understate true value, so a face-value offset can substantially shortchange the party giving up the pension share. Where offsetting is used, a 20–35% utility discount is normally applied to the CETV, plus an actuarial uplift to reflect the understatement of value in the CETV itself." },
  { question: "What about pension already in payment?", answer: "A DB pension already being paid can still be subject to a pension sharing order. The CETV is calculated reflecting the income in payment. After the share, the member's pension is reduced and the receiving party gets their own pension from the scheme (sometimes immediately, sometimes from a later age, depending on scheme rules)." },
];

const relatedPages = [
  { title: "CETV Explained Divorce UK", description: "Why CETVs matter and where they go wrong.", href: "/cetv-explained-divorce-uk", badge: "Pensions" },
  { title: "Pension Sharing vs Offsetting UK", description: "Choosing between the two main routes.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Pension Attachment Order vs Sharing Order UK", description: "How the two pension orders differ.", href: "/pension-attachment-order-vs-sharing-order-uk", badge: "Pensions" },
  { title: "Preview the Full Financial Report", description: "Model DB pension scenarios.", href: "/unlock", badge: "Report" },
];

export default function FinalSalaryPensionDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Final Salary Pension on Divorce UK — Sharing, Offsetting and CETV"
      subtitle="Defined benefit pensions are typically the most valuable — and most misunderstood — assets in UK divorce. Equal CETV does not mean equal income. Specialist actuarial input is normally essential."
      documentTitle="Final Salary Pension on Divorce UK | DivorceCalculatorUK"
      metaDescription="Final salary (defined benefit) pension on divorce UK. CETV vs lifetime value, pension sharing orders, internal vs external transfer, offsetting and PODE actuarial input."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Final Salary Pension on Divorce UK", href: "/final-salary-pension-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Final salary (defined benefit) pensions promise a guaranteed income for life. They are typically the most valuable — and most misunderstood — assets in UK divorce. The Cash Equivalent Transfer Value used in financial disclosure is just a proxy for the true lifetime value, and frequently understates it. Splitting a DB pension fairly requires understanding the difference between CETV and income, the scheme rules around internal vs external transfers, and the appropriate discount when offsetting against other assets.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">For substantial DB pensions, settling without a Pensions on Divorce Expert (PODE) report is one of the most expensive mistakes commonly made in UK divorce. The cost of a PODE report is typically £1,500–£3,500. The cost of getting the share wrong on a £500k+ CETV can be six figures.</p>
          </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Defining Features of DB Pensions in Divorce</h2>
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
        <InlineCTA label="Model DB Pension Scenarios" />
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
            { label: "External-only transfer schemes", desc: "Some private DB schemes require the receiving party to transfer the credit out to a personal pension. This converts guaranteed income into investment risk — a material disadvantage that should be reflected in either a higher sharing percentage or appropriate offsetting." },
            { label: "Age and accrual rate differences", desc: "A 50-year-old with 20 years' service in a 1/60 scheme has a very different CETV-to-income relationship than a 40-year-old with 10 years in a 1/80 scheme. Equal CETV split rarely produces equal income." },
            { label: "GMP and contracted-out portions", desc: "Older DB pensions often include a Guaranteed Minimum Pension (GMP) representing contracted-out periods. GMP rules around revaluation, equalisation and survivor benefits add complexity to sharing calculations." },
            { label: "Survivor benefits lost", desc: "Pension sharing creates a clean break — the receiving party gets their own pension. But survivor benefits that would have been paid to a future spouse on the member's death may be reduced or lost." },
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
            "What sharing percentage produces equal income at retirement",
            "What discount applies if the DB pension is offset against the house",
            "Whether the scheme's transfer rules disadvantage the receiving party",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a PODE report on this DB pension?</li>
          <li>Should we aim at equal CETV or equal income?</li>
          <li>Does the scheme allow internal pension credit membership?</li>
          <li>What discount factor applies if we offset against the house?</li>
          <li>What survivor benefits are lost or preserved by the share?</li>
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
