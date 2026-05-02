import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Three armed forces pension schemes", desc: "Service personnel may have benefits in AFPS 75, AFPS 05 and AFPS 15. The schemes have substantially different rules — particularly around immediate pension entitlement, lump sums and early departure payments." },
  { title: "AFPS 75 — generous and complex", desc: "Closed to new entrants in 2005. Provides immediate pension on completion of 22 years' service for other ranks (or 16 for officers). Lump sum of 3x annual pension. Complex 'reserved' rights for those who left before pension age." },
  { title: "AFPS 05 — career average lite", desc: "Open from April 2005 to April 2015. 1/70 accrual on final pensionable earnings, normal pension age 55, lump sum of 3x annual pension. Early Departure Payment available from age 40 with 18+ years' service." },
  { title: "AFPS 15 — career average", desc: "All current service personnel build benefits in AFPS 15. Accrual rate 1/47, normal pension age = State Pension Age (with EDP from age 40 with 20+ years' service). Revalued in service by CPI plus 1.5%." },
  { title: "McCloud remedy applies", desc: "Service personnel returned to their legacy scheme (AFPS 75 or AFPS 05) for service between 2015 and 2022, with a choice at retirement between legacy and AFPS 15 benefits for that period. CETVs must reflect the higher of the two." },
  { title: "Pension sharing is standard", desc: "Armed forces pensions are split by pension sharing order. The receiving party becomes a pension credit member of the relevant scheme. CETVs are calculated by Veterans UK and often significantly understate real lifetime value." },
];

const figures = [
  "Latest pension benefit statement (or annual statement)",
  "Latest CETV from Veterans UK",
  "Service record showing dates and ranks",
  "Pensionable salary history",
  "McCloud remedy election status",
  "Any Early Departure Payments (EDPs) in payment or expected",
  "Service-attributable injury or compensation awards",
  "Survivor benefit terms (forces family pension)",
];

const faqItems = [
  { question: "Can a military pension be split on divorce?", answer: "Yes. All three armed forces pension schemes (AFPS 75, AFPS 05, AFPS 15) accept pension sharing orders. The receiving party becomes a pension credit member of the relevant scheme with their own benefits." },
  { question: "How is a military pension valued?", answer: "By CETV, calculated by Veterans UK (the pension administrator). CETVs for AFPS 75 in particular often significantly understate real lifetime value because the immediate pension on completion of qualifying service is a substantial and immediate income, not just a long-deferred entitlement." },
  { question: "What about Early Departure Payments?", answer: "EDPs (lump sum and income paid before normal pension age in AFPS 05 and AFPS 15) are factored into the CETV. Where a service person is approaching EDP eligibility or already receiving an EDP, the impact on the divorce CETV needs careful actuarial input." },
  { question: "Does McCloud affect military pension divorces?", answer: "Yes. Like other public-sector schemes, the McCloud remedy gives service personnel a choice between legacy (AFPS 75 or 05) and AFPS 15 benefits for the 2015–2022 'remedy period'. CETVs must reflect the higher figure but the choice is not made until retirement." },
  { question: "Can my ex receive a share even if they are not in the forces?", answer: "Yes. The receiving party becomes a pension credit member of the AFPS scheme regardless of their own occupation. Their share is held in the scheme and paid as a pension at the relevant retirement age." },
  { question: "What if my spouse is on a tour of duty?", answer: "Active service does not prevent divorce or pension sharing. CETVs and disclosure proceed as usual. Specific protections under the Mental Capacity Act and procedural accommodations may be needed for service personnel deployed on operations." },
];

const relatedPages = [
  { title: "CETV Explained Divorce UK", description: "Why CETVs matter and where they go wrong.", href: "/cetv-explained-divorce-uk", badge: "Pensions" },
  { title: "Final Salary Pension on Divorce UK", description: "DB pension principles applied broadly.", href: "/final-salary-pension-on-divorce-uk", badge: "Pensions" },
  { title: "Pension Sharing vs Offsetting UK", description: "Choosing between the two main pension routes.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Preview the Full Financial Report", description: "Model military pension scenarios.", href: "/unlock", badge: "Report" },
];

export default function MilitaryPensionDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Military Pension on Divorce UK — AFPS 75, 05 and 15"
      subtitle="Service personnel typically have benefits across two or three armed forces pension schemes. Pension sharing is standard. AFPS 75 in particular often has CETVs that significantly understate real lifetime value."
      documentTitle="Military Pension on Divorce UK | DivorceCalculatorUK"
      metaDescription="Military pension on divorce UK. AFPS 75, AFPS 05 and AFPS 15 pension sharing, Early Departure Payments, McCloud remedy, CETVs and Veterans UK administration."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Military Pension on Divorce UK", href: "/military-pension-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Armed forces pensions are typically the largest single financial asset in a service person's divorce. Most serving personnel have benefits in AFPS 15, with many also having earlier accrued benefits in AFPS 05 or the very generous AFPS 75 scheme. The combination of immediate pensions on completion of qualifying service, Early Departure Payments and the McCloud remedy makes military pension valuation more complex than most other public-sector schemes.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">AFPS 75 CETVs often understate the true value of the pension by a wide margin — sometimes 40% or more — because the scheme pays an immediate pension on completion of qualifying service. Specialist actuarial input via a Pensions on Divorce Expert (PODE) is normally essential where AFPS 75 service is involved.</p>
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
        <InlineCTA label="Model Military Pension Scenarios" />
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
            { label: "AFPS 75 immediate pension undervaluation", desc: "AFPS 75 pays an immediate pension on completion of qualifying service. CETVs often fail to reflect the cash value of an income that starts in the member's 40s and continues for life." },
            { label: "Early Departure Payments", desc: "EDPs paid in payment alongside continued service or in transition can complicate the picture. Where an EDP is being received, the matrimonial vs post-separation portion may need apportionment." },
            { label: "McCloud and remedy period", desc: "The 2015–2022 service must be valued at the higher of legacy or AFPS 15 benefits. This typically increases the CETV but adds uncertainty until retirement." },
            { label: "Service-attributable awards", desc: "Pensions enhanced for service-attributable injuries or AFCS (Armed Forces Compensation Scheme) awards have specific protections. These may be partly outside the matrimonial pot." },
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
            "How an AFPS 75 immediate pension should be discounted or grossed up",
            "How service-attributable injury awards should be treated",
            "Whether to share or offset the military pension",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a PODE report on the AFPS pensions?</li>
          <li>How is the EDP being treated in the CETV?</li>
          <li>What is the impact of the McCloud remedy on our settlement?</li>
          <li>Are any benefits attributable to service injury and ringfenced?</li>
          <li>Should we share or offset, given the AFPS 75 immediate pension features?</li>
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
