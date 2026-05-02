import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Three police pension schemes", desc: "Police officers may have benefits in the 1987 PPS, the 2006 NPPS, and the 2015 CARE scheme. Long-serving officers often have entitlements in two or all three. Each has different accrual rates, retirement ages and commutation options." },
  { title: "1987 PPS — most generous", desc: "Closed to new entrants in 2006 but still active for many serving officers. Benefits accrue at 1/60 (then 2/60) of final salary, allowing retirement on a full pension after 30 years' service from age 50. CETVs for long-serving 1987 PPS members can be very large." },
  { title: "2006 NPPS — career average", desc: "1/60 accrual, normal pension age 55, optional lump sum via commutation. Closed to new accrual in April 2022 with the McCloud remedy returning members to original schemes for the 2015–2022 period." },
  { title: "2015 CARE scheme", desc: "All police officers now build benefits in the 2015 CARE scheme. Accrual rate 1/55.3, normal pension age = State Pension Age. Pension is revalued in service by CPI plus 1.25%." },
  { title: "McCloud remedy applies", desc: "Like NHS, the McCloud remedy returned all officers to their legacy schemes (1987 or 2006) for service between 2015 and 2022. The choice between legacy and 2015 benefits is made at retirement, complicating divorce CETV calculations." },
  { title: "Pension sharing is the standard route", desc: "Police pensions are split via pension sharing order. The receiving party becomes a pension credit member of the police scheme — they do not need to be a serving officer to receive these benefits." },
];

const figures = [
  "Latest annual benefit statement showing all three sections",
  "Latest CETV from the police pension administrator",
  "Service history with dates of joining each scheme",
  "Current pensionable pay and pay history",
  "McCloud remedy election status (if known)",
  "Any added pension or additional voluntary contributions",
  "Survivor benefit terms for current spouse",
  "Whether ill-health or injury award is in prospect",
];

const faqItems = [
  { question: "How is a police pension split on divorce?", answer: "By pension sharing order. The court orders that a percentage of the police officer's CETV be transferred to the receiving party. The receiving party becomes a 'pension credit member' of the police pension scheme with their own retirement benefits." },
  { question: "Does my ex have to be a police officer to receive a share?", answer: "No. The receiving party becomes a pension credit member of the police scheme regardless of their occupation. Their pension credit is held within the scheme until normal retirement age." },
  { question: "How is a 1987 PPS pension valued?", answer: "By Cash Equivalent Transfer Value (CETV), calculated by the police pension administrator using prescribed actuarial assumptions. CETVs for the 1987 scheme tend to be substantial because of the generous accrual rate and early normal retirement age, but they often understate real lifetime value." },
  { question: "What if my spouse is taking ill-health retirement?", answer: "Ill-health retirement enhances the pension benefits for the officer (and so increases CETV). This can complicate timing — settling shortly before an expected ill-health award may significantly undervalue the pension. Specialist advice is essential where ill-health retirement is in prospect." },
  { question: "How does McCloud affect police pension valuations on divorce?", answer: "The McCloud remedy gives officers a choice between legacy benefits (1987 or 2006) and 2015 CARE benefits for the 2015–2022 period. Until that choice is made (usually at retirement), the CETV must reflect the higher of the two structures. This adds complexity and often increases the CETV used in divorce." },
  { question: "How long does a police pension share take to implement?", answer: "After the sealed pension sharing order, the police pension administrator has four months to implement the share. The receiving party becomes a pension credit member and receives confirmation statements within the following 1–2 months." },
];

const relatedPages = [
  { title: "CETV Explained Divorce UK", description: "The valuation figure underpinning every pension settlement.", href: "/cetv-explained-divorce-uk", badge: "Pensions" },
  { title: "NHS Pension on Divorce UK", description: "Comparable public-sector scheme analysis.", href: "/nhs-pension-on-divorce-uk", badge: "Pensions" },
  { title: "Final Salary Pension on Divorce UK", description: "How DB pensions are treated overall.", href: "/final-salary-pension-on-divorce-uk", badge: "Pensions" },
  { title: "Preview the Full Financial Report", description: "Model police pension scenarios.", href: "/unlock", badge: "Report" },
];

export default function PolicePensionDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Police Pension on Divorce UK — Splitting the 1987, 2006 and 2015 Schemes"
      subtitle="Most police officers have benefits across two or three pension schemes. Pension sharing is the standard route. The 1987 PPS is particularly generous — and CETVs frequently understate its lifetime value."
      documentTitle="Police Pension on Divorce UK | DivorceCalculatorUK"
      metaDescription="Police pension on divorce UK. Splitting the 1987 PPS, 2006 NPPS and 2015 CARE schemes. Pension sharing orders, CETV valuation, McCloud remedy and ill-health retirement issues."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Police Pension on Divorce UK", href: "/police-pension-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Police pension benefits are typically the largest single asset in a police officer's divorce — often substantially exceeding the family home in lifetime value. Most serving officers have benefits across the 1987 PPS, the 2006 NPPS and the 2015 CARE scheme. Splitting them properly via a pension sharing order, with proper actuarial valuation, is usually the most important financial decision in the settlement.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">The 1987 Police Pension Scheme is one of the most generous in the UK public sector. Its CETV often significantly understates the real lifetime value of the pension. A Pensions on Divorce Expert (PODE) report is normally essential where 1987 PPS service is involved.</p>
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
        <InlineCTA label="Model Police Pension Scenarios" />
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
            { label: "1987 PPS is hard to value", desc: "The combination of a generous accrual rate, early normal retirement age and 30-year full-pension trigger means the 1987 PPS often produces CETVs that look modest relative to the pension's real lifetime value." },
            { label: "McCloud remedy", desc: "The 2015–2022 'remedy period' service may be treated under either the legacy or 2015 scheme rules. CETVs must reflect the higher figure, but uncertainty remains until retirement." },
            { label: "Ill-health retirement timing", desc: "Settling shortly before an ill-health enhancement is awarded can substantially undervalue the pension. Disclosure of any pending ill-health applications is critical." },
            { label: "Survivor benefits and remarriage", desc: "Police pension survivor benefits historically had remarriage forfeiture provisions for some categories. Pension sharing creates a clean break and avoids these complications for the receiving party." },
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
            "Whether the 1987, 2006 or 2015 sections should be split equally",
            "What discount applies if the police pension is offset against the house",
            "How any pending ill-health retirement should be treated",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a PODE report given the 1987 PPS service?</li>
          <li>How does the McCloud remedy affect the divorce CETV?</li>
          <li>Is ill-health retirement in prospect, and how should we factor it in?</li>
          <li>Should the police pension be shared or offset?</li>
          <li>What survivor benefits exist and what happens to them on a share?</li>
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
