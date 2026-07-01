import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const stages = [
  { title: "Application issued (week 0)", desc: "Submit the divorce application online or by post. The court issues the application and serves the respondent (in sole applications). The 20-week clock starts from issue, not from your submission date." },
  { title: "Acknowledgement of service (weeks 1–4)", desc: "The respondent confirms they have received the application. In joint applications this stage is skipped. Delays here are common where addresses are wrong or the respondent disengages." },
  { title: "20-week reflection period (weeks 0–20)", desc: "The mandatory minimum wait between application issue and being able to apply for the conditional order. Use this time to start financial disclosure (Form E or voluntary), instruct mediators, and gather pension CETVs." },
  { title: "Conditional order (around week 22–26)", desc: "Apply for the conditional order after the 20 weeks. Administrative timing is often around 4–8 weeks, but delays vary. The marriage is not yet ended. Financial consent orders can now be lodged for approval." },
  { title: "Six-week minimum wait (weeks 26–32)", desc: "From conditional order, you must wait at least six weeks before applying for the final order. Most couples use this period — and often longer — to finalise their financial settlement and have it sealed." },
  { title: "Final order (week 32+)", desc: "Apply for and receive the final order. The marriage is legally ended. Total: legal minimum around 26–32 weeks (~6–8 months). Realistic average where finances are also being sorted: 12–18 months." },
];

const figures = [
  "Date the application was issued (not submitted)",
  "Whether application is sole or joint",
  "Date of the acknowledgement of service",
  "Whether a conditional order has been applied for",
  "Date of the conditional order if granted",
  "Status of the financial settlement (none, in progress, sealed)",
  "Status of pension valuations (CETVs requested or received)",
  "Any tax-year deadlines that may affect timing",
];

const faqItems = [
  { question: "What is the minimum time for a divorce in the UK?", answer: "The legal minimum from issuing the application to the final order is around 26 weeks: 20 weeks from issue to applying for the conditional order, plus a further 6 weeks from the conditional order to applying for the final order. In practice it usually takes 6–8 months at fastest." },
  { question: "Why do most divorces take longer than 6 months?", answer: "Because the financial settlement runs in parallel and is usually the slower part. Disclosure (Form E), pension valuations, mortgage capacity assessments, mediation, and the consent order itself all take time. Most couples wait to apply for the final order until finances are sealed, which often pushes the total to 12–18 months." },
  { question: "How long does a contested divorce take in the UK?", answer: "Truly contested divorces (where the divorce itself is disputed) are now extremely rare under the no-fault regime. What is more commonly 'contested' are the finances. A financial remedy court process with First Directions Appointment and Financial Dispute Resolution can take 12–24 months from start to a final hearing if needed." },
  { question: "Can I speed up my divorce?", answer: "The 20-week and 6-week statutory waits cannot be shortened — they are absolute minimums. You can speed things up by submitting accurate information first time, choosing a joint application, sorting finances in parallel rather than after, and engaging early in mediation rather than waiting for court." },
  { question: "How long does the financial settlement take?", answer: "If both parties are cooperative and use mediation or solicitor negotiation: 4–9 months from start to sealed consent order. If court intervention is needed (financial remedy proceedings): 12–24 months. If a final hearing is required: longer still. Most cases settle before the final hearing." },
  { question: "Does the time from separation to divorce matter?", answer: "Under the no-fault regime, separation length is no longer a 'fact' to prove. However, the date of separation can still be relevant for finances — particularly for valuing assets, treating post-separation income, and assessing how matrimonial vs non-matrimonial property has been built up." },
];

const relatedPages = [
  { title: "No-Fault Divorce UK", description: "The 2022 process explained.", href: "/no-fault-divorce-uk", badge: "Process" },
  { title: "How Long Does a Divorce Financial Settlement Take?", description: "Realistic financial timelines.", href: "/how-long-does-divorce-financial-settlement-take-uk", badge: "Timeline" },
  { title: "Timeline of Divorce and Financial Settlement", description: "How the two processes fit together.", href: "/timeline-of-divorce-and-financial-settlement-uk", badge: "Timeline" },
  { title: "Preview the Full Financial Report", description: "Model your settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function HowLongDivorceTakePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="How Long Does a Divorce Take in the UK?"
      subtitle="The legal minimum is around 26 weeks under the no-fault divorce regime — but realistic timelines, including the financial settlement, are typically 6 to 18 months. Here is the breakdown stage by stage."
      documentTitle="How Long Does a Divorce Take UK | DivorceCalculatorUK"
      metaDescription="How long does a divorce take in the UK? The 20-week reflection period, 6-week wait, conditional and final orders, and realistic timelines including financial settlement."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "How Long Does a Divorce Take UK", href: "/how-long-does-a-divorce-take-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Under the no-fault divorce regime introduced on 6 April 2022, the legal minimum from issuing a divorce application to receiving the final order is around 26 weeks. In practice almost no one moves at that pace — the financial settlement is a separate, parallel process and is usually the slower of the two. Realistic end-to-end timelines including a sealed financial consent order are typically 6 to 18 months. Where court proceedings are needed for finances, 12 to 24 months is normal.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">The 20-week and 6-week statutory waits are absolute minimums and cannot be shortened. The fastest way to a finished divorce is to start the financial disclosure work in parallel with the divorce application — not after it.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Six Stages — and How Long Each Takes</h2>
        <div className="space-y-4 mb-6">
          {stages.map((s, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{s.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Plan the Financial Settlement Alongside" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Dates and Documents to Track</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {figures.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">What Slows a Divorce Down</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Pension valuations (CETVs)", desc: "Defined benefit schemes can take 3–4 months to issue a CETV after a request. Many financial settlements wait on these. Request CETVs early — even before the divorce application is issued." },
            { label: "Disagreement on finances", desc: "If finances are disputed, the financial remedy court process kicks in — adding 9–18 months between the First Directions Appointment, the Financial Dispute Resolution and (if needed) the final hearing." },
            { label: "Disengaged respondent", desc: "Where one party will not engage with disclosure or court directions, the process takes longer and can require enforcement applications. Joint applications and mediation reduce this risk." },
            { label: "Backlog at court", desc: "Court processing times vary by region and have been longer than usual since 2023. Online divorce applications process faster than paper-based ones." },
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
            "How quickly your specific court region is processing applications",
            "How long your spouse's pension scheme will take to issue CETVs",
            "Whether mediation or court proceedings will be needed in your case",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What is realistic for our case — straightforward, contested, or somewhere in between?</li>
          <li>Should we request pension CETVs before issuing the divorce application?</li>
          <li>Would mediation be quicker than negotiating through solicitors?</li>
          <li>Are there tax-year deadlines (CGT) that affect when we should aim to finalise?</li>
          <li>What happens to interim arrangements (mortgage, school fees) while we wait?</li>
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
