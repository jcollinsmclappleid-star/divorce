import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const timeline = [
  { phase: "Separation", timing: "Day 0", desc: "You and your spouse separate. Document the date clearly. Begin gathering financial information — bank statements, pension statements, mortgage statements. Consider notifying the mortgage lender if you are the non-occupying party." },
  { phase: "Legal divorce application", timing: "When ready", desc: "File online at MyHMCTS (gov.uk). Either party can apply (joint applications are possible since 2022). No minimum separation period required under the Divorce, Dissolution and Separation Act 2020." },
  { phase: "Financial disclosure", timing: "Early in process", desc: "Exchange financial information informally (if negotiating privately) or formally through Form E (in court proceedings). This takes 4–12 weeks depending on complexity." },
  { phase: "Negotiations or mediation", timing: "Months 1–6", desc: "Negotiate a settlement through mediation, collaborative law, or solicitor correspondence. If agreement is reached, proceed to consent order." },
  { phase: "Conditional Order", timing: "~6 weeks after divorce application accepted", desc: "The court grants the Conditional Order (formerly Decree Nisi). This does not end the marriage — it is a declaration that the court is satisfied you are entitled to divorce. It is usually a paper exercise with no court attendance." },
  { phase: "Financial consent order submitted", timing: "Typically around or after Conditional Order", desc: "The consent order is drafted, signed, and submitted with Form D81 to the Family Court. Allow 4–8 weeks for court approval." },
  { phase: "Final Order", timing: "6+ weeks after Conditional Order", desc: "The Final Order (formerly Decree Absolute) formally ends the marriage. Apply for this at least 43 days after the Conditional Order. Many people wait until the financial consent order is in place first." },
  { phase: "Implementation", timing: "Immediately after Final Order and consent order approval", desc: "Implement the settlement — property transfer, pension sharing, account closures, maintenance payments. Full implementation typically takes 2–4 months." },
];

const faqItems = [
  {
    question: "Can I get the Final Order before the financial settlement is agreed?",
    answer: "Yes — but this is generally inadvisable. Once you remarry (which requires the Final Order), you lose the ability to make capital financial claims (though you can still claim maintenance). Many solicitors advise waiting for the financial consent order to be in place or at least filed before applying for the Final Order.",
  },
  {
    question: "How long is the fastest divorce in the UK?",
    answer: "Under the new no-fault divorce rules (from April 2022), the minimum total time from application to Final Order is approximately 26 weeks (6 months). This is a statutory 20-week 'reflection period' plus additional processing time. Financial settlement can run alongside this.",
  },
  {
    question: "Do financial proceedings affect the divorce timeline?",
    answer: "The financial settlement and the divorce are separate processes. Contested financial proceedings (going to a final hearing) typically take longer than the divorce itself and can run well beyond the date of the Final Order. Courts can and do make financial orders after the divorce is finalised.",
  },
];

const relatedPages = [
  { title: "How Long Does Divorce Financial Settlement Take UK?", description: "Detailed timelines by route for the financial settlement.", href: "/how-long-does-divorce-financial-settlement-take-uk", badge: "Timeline" },
  { title: "Financial Remedy Proceedings UK", description: "The full court process timeline from Form A to Final Hearing.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Steps After the Final Order UK", description: "What to do after the financial settlement is approved.", href: "/steps-after-final-order-finances-uk", badge: "Process" },
];

export default function DivorceTimelinePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Timeline of Divorce and Financial Settlement UK"
      subtitle="Understanding the full divorce and financial settlement timeline helps you plan, manage expectations, and make decisions at the right time. Here is the complete picture from separation to financial finalisation."
      documentTitle="Timeline of Divorce and Financial Settlement UK | DivorceCalculatorUK"
      metaDescription="The complete timeline of divorce and financial settlement in England and Wales — from separation through conditional order, consent order, final order, and implementation."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Timeline of Divorce and Financial Settlement UK", href: "/timeline-of-divorce-and-financial-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The divorce process and the financial settlement process run in parallel in England and Wales — but they are separate legal processes with separate documents, separate timelines, and separate court applications. Understanding how they interact helps you plan effectively and avoid common mistakes (like applying for the Final Order before the financial settlement is in place).
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">The Full Timeline</h2>
        <div className="space-y-4 mb-6">
          {timeline.map((t, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold">{t.phase}</p>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{t.timing}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Typical Total Timelines</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse border">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-2 border text-xs">Route</th>
                <th className="text-left p-2 border text-xs">Typical Total Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border text-muted-foreground">Simple agreed settlement</td><td className="p-2 border text-muted-foreground">6–9 months</td></tr>
              <tr className="bg-muted/30"><td className="p-2 border text-muted-foreground">Agreement reached through mediation</td><td className="p-2 border text-muted-foreground">8–12 months</td></tr>
              <tr><td className="p-2 border text-muted-foreground">Court proceedings, settle at FDR</td><td className="p-2 border text-muted-foreground">12–18 months</td></tr>
              <tr className="bg-muted/30"><td className="p-2 border text-muted-foreground">Court proceedings, full final hearing</td><td className="p-2 border text-muted-foreground">24–36+ months</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mb-6">Timelines are approximate and affected by court backlogs, complexity of assets, and cooperation between the parties.</p>
        <InlineCTA label="Understand Your Financial Position to Speed Negotiations" />
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
