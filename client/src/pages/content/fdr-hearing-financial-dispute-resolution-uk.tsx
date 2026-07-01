import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Scale } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "FDR is the second financial remedy hearing", desc: "The Financial Dispute Resolution appointment is the second listed hearing in financial remedy proceedings, after the First Directions Appointment (FDA). Its sole purpose is to encourage settlement." },
  { title: "Without prejudice — judge cannot try the case later", desc: "Everything said at FDR is on a 'without prejudice' basis. The judge cannot later be the trial judge if the case proceeds. This frees both sides and the judge to be candid about strengths, weaknesses and likely outcomes." },
  { title: "Indications from the judge", desc: "The whole point of FDR is for the judge to give a non-binding steer on strengths, weaknesses, litigation risk and what a sensible settlement range might look like. These indications can carry significant weight." },
  { title: "Settlement rate is high", desc: "Around 60–70% of cases settle at or shortly after FDR. The combination of judicial indication, costs pressure, and the cooler reality of a hearing often concentrates minds." },
  { title: "Position statements and offers required", desc: "Both parties typically file position statements and 'open' or 'without prejudice' offers in advance. The court expects realistic offers — not aspirational opening positions. Unreasonable offers can attract adverse costs orders." },
  { title: "If FDR fails — directions to final hearing", desc: "If no settlement is reached, the court gives directions for trial preparation: any further disclosure, expert evidence, witness statements, and a date for the final hearing (usually 4–8 months later)." },
];

const figures = [
  "Updated Form Es and full disclosure",
  "Schedule of assets, liabilities and incomes",
  "Pension CETVs (refreshed if more than 3 months old)",
  "Property valuations (typically three independent)",
  "Position statement (each side, filed in advance)",
  "Open or without-prejudice offers (filed in advance)",
  "Schedule of issues and chronology",
  "Expert reports (PODE, forensic accountant) if instructed",
];

const faqItems = [
  { question: "What is an FDR hearing in divorce?", answer: "FDR stands for Financial Dispute Resolution — the second listed hearing in financial remedy proceedings. Its purpose is settlement: the judge provides indications about likely outcomes, both parties present their positions, and the court actively encourages a deal. Around 60–70% of cases settle at or shortly after FDR. Anything said at FDR is on a 'without prejudice' basis and the FDR judge cannot later be the trial judge." },
  { question: "How long does an FDR hearing last?", answer: "Typically half a day, though longer cases (HNW, business valuations) may have a full day listed. Most of the time is spent in negotiation between the parties, with the judge giving indications at the start and being available throughout. The actual time in court before the judge is often only 30–60 minutes." },
  { question: "What should I bring to FDR?", answer: "All disclosure, updated Form E (if material changes since the original), refreshed pension CETVs, current property valuations, your position statement, your offers, the schedule of assets, and any expert reports. Most documents will already have been filed in advance — bring spare copies for use at the hearing." },
  { question: "What is a 'without prejudice' offer?", answer: "An offer made in negotiation that cannot later be referred to the trial judge if the case fails to settle. Without prejudice offers allow both parties to be flexible without their negotiating positions being held against them later. Open offers (which the trial judge can see) are different and used strategically for costs purposes." },
  { question: "What happens if FDR doesn't settle the case?", answer: "The court gives directions for trial preparation: deadlines for any remaining disclosure, expert reports, witness statements, and a date for the final hearing — usually 4–8 months ahead. Costs orders may be made if either party has been unreasonable. Both sides usually try harder to settle in the weeks after FDR before incurring final hearing costs." },
  { question: "Should I make an open offer before FDR?", answer: "Often yes. A reasonable open offer made before FDR can put significant costs pressure on the other side if they fail to beat it at the final hearing. Calderbank-style offers can be costly weapons. Get specialist legal advice on offer strategy — this is where experienced family lawyers earn their fees." },
];

const relatedPages = [
  { title: "First Directions Appointment FDA UK", description: "The first hearing in financial remedy proceedings.", href: "/first-directions-appointment-fda-uk", badge: "Process" },
  { title: "Financial Remedy Proceedings UK", description: "The full court process explained.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "MIAM Mediation Information UK", description: "The mandatory mediation step before court.", href: "/miam-mediation-information-assessment-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Model your settlement before FDR.", href: "/unlock", badge: "Report" },
];

export default function FdrHearingPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="FDR Hearing — Financial Dispute Resolution Appointment UK"
      subtitle="The FDR is the settlement-focused second hearing in financial remedy proceedings. Around two-thirds of cases settle at or shortly after FDR — making it the most important date in the financial remedy process."
      documentTitle="FDR Hearing Financial Dispute Resolution UK | DivorceCalculatorUK"
      metaDescription="FDR hearing UK explained. The Financial Dispute Resolution appointment, judicial indications, without prejudice offers, settlement rates, position statements and what to expect."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "FDR Hearing UK", href: "/fdr-hearing-financial-dispute-resolution-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The Financial Dispute Resolution (FDR) appointment is the second listed hearing in UK financial remedy proceedings and exists for a single purpose: settlement. The judge — who cannot later try the case — provides candid indications about likely outcomes, the parties exchange positions and offers, and the court actively encourages a deal. Around two-thirds of cases settle at or shortly after FDR, making it the most important date in the financial remedy process.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">FDR judges expect realistic offers, not opening positions. Parties who arrive at FDR with manifestly unreasonable offers risk a poor judicial indication and adverse cost orders later. Senior counsel input on FDR strategy is normally well-justified by the values at stake.</p>
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
                  <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your FDR Position" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">What You Need for FDR</h2>
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
            { label: "Unrealistic position statements", desc: "Position statements that are wishful rather than realistic typically receive an unfavourable judicial indication and undermine settlement prospects. Position should reflect a defensible reading of the law and facts, not the best possible argument." },
            { label: "Stale disclosure", desc: "Pension CETVs, property valuations and bank balances all date quickly. FDR with stale figures often fails to settle because both sides distrust the numbers. Refresh everything in the weeks before FDR." },
            { label: "Offer strategy", desc: "Open offers can put significant costs pressure on the other side. Without prejudice offers protect negotiating flexibility. The interaction is strategic and benefits from experienced family law input." },
            { label: "Costs of failure", desc: "If FDR fails, both sides typically face £30k–£100k+ of further costs through to a final hearing. The cost of settling at FDR — even at slightly less favourable terms — is usually a fraction of the cost of fighting on." },
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
            "What position to take in your FDR position statement",
            "What offer level is most likely to settle",
            "Whether and when to make open offers for costs purposes",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What position statement gives us the best FDR outcome?</li>
          <li>Should we make an open offer before FDR for costs purposes?</li>
          <li>Are our pension CETVs and valuations recent enough?</li>
          <li>What does the realistic settlement range look like in our case?</li>
          <li>What is the costs and time exposure if FDR doesn't settle?</li>
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
