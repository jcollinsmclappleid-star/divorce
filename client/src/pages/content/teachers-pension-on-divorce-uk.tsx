import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Two main TPS sections", desc: "The Teachers' Pension Scheme has a 'final salary' section (closed to new accrual) and a 'career average' section. Most serving teachers have benefits in both, with the split depending on age and protection status under the 2015 reforms." },
  { title: "Final salary section", desc: "Pension at 1/80 of final salary per year of service, plus an automatic 3x lump sum (Normal Pension Age 60 or 65 depending on when the member joined). All accrual ceased in April 2022 with the McCloud remedy." },
  { title: "Career average (CARE) section", desc: "Accrual at 1/57 of pensionable earnings each year, revalued in service by CPI plus 1.6%. Normal Pension Age = State Pension Age. All teachers now build benefits exclusively in this section." },
  { title: "McCloud remedy applies", desc: "Teachers in service between 2015 and 2022 may choose between final salary and CARE benefits for that period at retirement. CETVs in divorce must reflect the higher of the two structures." },
  { title: "Pension sharing is standard", desc: "Teachers' pensions are split by pension sharing order. The receiving party becomes a pension credit member of the TPS — they do not need to be a teacher to receive these benefits." },
  { title: "CETV understates lifetime value", desc: "Final-salary section CETVs in particular often significantly understate the lifetime value of the pension. Specialist actuarial input is normally needed for substantial TPS settlements." },
];

const figures = [
  "Latest TPS annual benefit statement",
  "Latest CETV from Teachers' Pensions",
  "Service history including any breaks or part-time periods",
  "Current pensionable salary and salary history",
  "McCloud remedy election status",
  "Whether protection (full or tapered) applied to the member",
  "Any added pension or AVCs (Prudential)",
  "Survivor benefit details for the current spouse",
];

const faqItems = [
  { question: "Can a teacher's pension be split on divorce?", answer: "Yes. The Teachers' Pension Scheme (TPS) accepts pension sharing orders. The receiving party becomes a pension credit member of the scheme with their own retirement benefits." },
  { question: "Does my ex have to be a teacher to receive a share?", answer: "No. The receiving party becomes a pension credit member of the TPS regardless of occupation. Their share is held within the scheme until normal retirement age." },
  { question: "How is the TPS valued for divorce?", answer: "By CETV, calculated by Teachers' Pensions. CETVs for the final-salary section often significantly understate the lifetime value of the benefits, particularly for younger members. A Pensions on Divorce Expert (PODE) report is normally needed for substantial TPS settlements." },
  { question: "What is the McCloud remedy and how does it affect TPS divorces?", answer: "The McCloud judgment found the 2015 pension reforms unlawfully discriminated against younger members. As a remedy, members in service between 2015 and 2022 may choose between final salary and CARE benefits for that period at retirement. CETVs in divorce must reflect the higher of the two — typically increasing the CETV but adding uncertainty." },
  { question: "Can the teachers' pension be offset against the house?", answer: "Yes, but with caution. Final-salary CETVs typically understate real value, so a face-value offset can shortchange the party giving up the pension share. A 20–35% utility discount is commonly applied where pensions are offset against immediately-realisable assets like property." },
  { question: "How long does a TPS pension share take?", answer: "After the sealed pension sharing order, Teachers' Pensions has four months to implement the share. The receiving party becomes a pension credit member and receives confirmation statements within the following 1–2 months." },
];

const relatedPages = [
  { title: "CETV Explained Divorce UK", description: "How the central pension number works.", href: "/cetv-explained-divorce-uk", badge: "Pensions" },
  { title: "NHS Pension on Divorce UK", description: "Comparable public-sector pension analysis.", href: "/nhs-pension-on-divorce-uk", badge: "Pensions" },
  { title: "Final Salary Pension on Divorce UK", description: "How DB pensions are treated.", href: "/final-salary-pension-on-divorce-uk", badge: "Pensions" },
  { title: "Preview the Full Financial Report", description: "Model teachers' pension scenarios.", href: "/unlock", badge: "Report" },
];

export default function TeachersPensionDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Teachers' Pension on Divorce UK — Final Salary and Career Average"
      subtitle="Most teachers have benefits in both the final salary and career average sections of the TPS. Pension sharing is the standard route. CETVs typically understate lifetime value."
      documentTitle="Teachers' Pension on Divorce UK | DivorceCalculatorUK"
      metaDescription="Teachers' pension on divorce UK. TPS final salary and career average sections, pension sharing orders, McCloud remedy, CETV valuation, and offsetting against property."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Teachers' Pension on Divorce UK", href: "/teachers-pension-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The Teachers' Pension Scheme (TPS) is one of the largest occupational pension schemes in the UK, covering roughly half a million active teachers. For teachers (or their spouses) going through divorce, the TPS is typically the most valuable single asset after the family home — and frequently larger. Long-serving teachers will have benefits in both the closed final-salary section and the open career-average (CARE) section, with the McCloud remedy potentially affecting the 2015–2022 portion.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">TPS final-salary CETVs often understate lifetime pension value by 30–50%. Settlements based purely on face-value CETV — particularly when offsetting against the house — typically shortchange the party giving up the pension share. A PODE report is normally well worth the cost.</p>
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
        <InlineCTA label="Model TPS Scenarios" />
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
            { label: "Two-section split", desc: "Splitting the TPS means addressing the final-salary and CARE sections together. A single percentage applied to total CETV may not produce equal income, given the very different normal retirement ages." },
            { label: "McCloud uncertainty", desc: "The 2015–2022 service may attract either final salary or CARE benefits — chosen at retirement. CETVs must reflect the higher figure, typically the final salary basis." },
            { label: "Part-time and career breaks", desc: "Many teachers have part-time service or career breaks — particularly during child-rearing years. CETVs need to reflect this accurately, and the matrimonial vs pre-marital portion must often be calculated." },
            { label: "AVC pots (Prudential)", desc: "Many teachers have additional voluntary contribution pots with Prudential alongside their main TPS benefits. These are often overlooked in disclosure but should be included in the matrimonial pot." },
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
            "Whether to split equally across both sections or weight the split",
            "What McCloud remedy assumption should be used in the CETV",
            "Whether to share or offset against other assets",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a PODE report given the final-salary section?</li>
          <li>How does McCloud affect our specific CETV?</li>
          <li>Are there AVC pots we should disclose alongside the main TPS?</li>
          <li>Does part-time service need separate treatment in the disclosure?</li>
          <li>Should we share, offset, or use a combination?</li>
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
