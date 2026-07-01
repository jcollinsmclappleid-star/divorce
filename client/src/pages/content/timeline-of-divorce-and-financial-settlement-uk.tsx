import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, CheckSquare, AlertCircle } from "lucide-react";
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
  { phase: "Conditional Order", timing: "~6 weeks after divorce application accepted", desc: "The Conditional Order (formerly Decree Nisi) confirms the divorce can proceed. This does not end the marriage. It is usually a paper exercise with no court attendance." },
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
  {
    question: "When should I start modelling the financial settlement?",
    answer: "As early as possible — ideally before or at the same time as starting the legal divorce process. Modelling scenarios early helps you understand your financial position, identify what information you need to gather, and enter negotiations (or mediation) with a clear picture of what is reasonable.",
  },
  {
    question: "What happens if the consent order is not approved?",
    answer: "The court reviews consent orders on paper to ensure they are fair. If a judge considers the order unreasonable (e.g., significantly one-sided), they can request further information or decline to approve it. This is uncommon but it is why consent orders should be drafted carefully — ideally with legal assistance.",
  },
];

const relatedPages = [
  { title: "How Long Does Divorce Financial Settlement Take UK?", description: "Detailed timelines by route for the financial settlement.", href: "/how-long-does-divorce-financial-settlement-take-uk", badge: "Timeline" },
  { title: "Financial Remedy Proceedings UK", description: "The full court process timeline from Form A to Final Hearing.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Steps After the Final Order UK", description: "What to do after the financial settlement is approved.", href: "/steps-after-final-order-finances-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "See what your financial settlement model covers from the start.", href: "/unlock", badge: "Report" },
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
        <h2 className="text-2xl font-display font-bold mb-6">Financial Information to Gather Early</h2>
        <p className="text-sm text-muted-foreground mb-4">Starting the financial modelling early requires gathering key figures. The sooner you have these, the better prepared you will be for negotiations:</p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Mortgage statements (balance, rate, remaining term)",
            "Property valuation (estate agent or surveyor estimate)",
            "Pension statements — request CETV from each provider",
            "Bank, savings, and ISA balances",
            "Payslips or P60s for both parties",
            "Any sole-name accounts or investments",
            "Life assurance policies and surrender values",
            "Outstanding loans, credit cards, or finance agreements",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Timing Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Applying for the Final Order too early", desc: "Remarrying after the Final Order without having made a capital financial claim bars you from making one. Many solicitors advise filing or completing the financial settlement first." },
            { label: "Mortgage payments during proceedings", desc: "Someone needs to maintain the mortgage throughout the process. Falling behind can trigger lender action regardless of what stage proceedings are at." },
            { label: "Pension CETV expiry", desc: "CETVs (pension valuations) typically expire after 3 months. If you are close to agreement, allow time for updated CETVs rather than discovering they have expired at a critical point." },
            { label: "Court backlogs extending timelines", desc: "Financial remedy proceedings in England and Wales are affected by court backlogs. First hearings can take 4–6 months to schedule in busy court centres. Starting early reduces the pressure." },
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
            "What the right timing is for your specific situation — this depends on your circumstances and goals",
            "Whether to apply for the Final Order before or after the financial settlement is resolved",
            "What the current local Family Court timetable looks like",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Should we apply for the Final Order before or after the financial consent order is in place?</li>
          <li>What is the realistic timeline for reaching an agreement given our circumstances?</li>
          <li>At what point should we move from informal negotiations to filing formally?</li>
          <li>How should mortgage payments and the family home be managed during the process?</li>
        </ul>
        <InlineCTA label="Start Modelling Your Settlement Today" />
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
