import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Handshake, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const principles = [
  { title: "Both parties have collaboratively trained solicitors", desc: "Each party is represented by their own solicitor who is specifically trained in the collaborative process. The solicitors agree to work cooperatively rather than adversarially." },
  { title: "Participation agreement signed at the start", desc: "All parties (and solicitors) sign a participation agreement setting out the principles of the process — full disclosure, good faith, and respectful communication." },
  { title: "Disqualification clause", desc: "If the collaborative process breaks down and either party goes to court, both solicitors are required to withdraw. New solicitors must be instructed for any contested proceedings — a strong incentive to make collaboration work." },
  { title: "Four-way meetings", desc: "Discussions take place in face-to-face meetings between both parties and both solicitors. This format encourages transparent communication and avoids the back-and-forth of letter-writing." },
  { title: "Other professionals brought in jointly", desc: "Where needed, the parties jointly instruct a financial neutral, a child specialist, or a pension expert. There is no duplication of expert witnesses." },
  { title: "Outcome captured in a binding agreement", desc: "Whatever is agreed is then captured in a consent order and submitted to the court for approval, in the same way as any other negotiated settlement." },
];

const faqItems = [
  {
    question: "What is collaborative law in divorce?",
    answer: "Collaborative law is a structured negotiation process where both parties commit (with their lawyers) to resolving the financial settlement without going to court. Discussions take place in face-to-face meetings, with all four parties present, and any agreement reached is then converted into a binding consent order.",
  },
  {
    question: "How does it differ from mediation?",
    answer: "In mediation, a single neutral mediator helps the parties reach agreement — and parties typically take separate legal advice outside the sessions. In collaborative law, each party is directly represented by their own collaborative solicitor in the meetings themselves. Many people find it gives them more support during the conversations.",
  },
  {
    question: "What is the disqualification clause?",
    answer: "Both collaborative solicitors agree at the outset that if the collaborative process breaks down and either party initiates court proceedings, both solicitors must withdraw. The parties have to instruct new solicitors. This creates a powerful financial and practical incentive for everyone — including the lawyers — to keep the collaborative process working.",
  },
  {
    question: "How long does collaborative law take?",
    answer: "It varies with complexity. A typical case might involve 4–6 meetings over 3–6 months. This is usually quicker than contested court proceedings but slower than mediation in straightforward cases. The timetable is set by the parties.",
  },
  {
    question: "How much does collaborative law cost?",
    answer: "Each party pays their own solicitor's fees. Costs are typically lower than contested court proceedings (no preparation for hearings, no barrister fees) but higher than mediation (because both solicitors are present at every meeting). A qualified family solicitor can give a realistic estimate for your case.",
  },
  {
    question: "When is collaborative law not the right choice?",
    answer: "It depends on both parties being willing to engage openly and honestly. Where there are significant disclosure concerns, history of coercive control, or major emotional volatility, collaborative law may not be suitable. A qualified family solicitor can advise on whether your case is a good fit.",
  },
];

const relatedPages = [
  { title: "Divorce Mediation Process UK", description: "Single-mediator alternative to collaborative law.", href: "/divorce-mediation-process-uk", badge: "Mediation" },
  { title: "Arbitration in UK Divorce", description: "Binding private decision by a chosen arbitrator.", href: "/arbitration-divorce-uk", badge: "Arbitration" },
  { title: "Settling Out of Court vs Court", description: "Comparing the dispute resolution routes.", href: "/settling-out-of-court-vs-court-divorce-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Bring numbers to the collaborative table.", href: "/unlock", badge: "Report" },
];

export default function CollaborativeLawDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Collaborative Law in UK Divorce: How It Works"
      subtitle="Collaborative law is a structured negotiation process where both parties — with their own collaborative solicitors — commit to reaching agreement without going to court. Here's how it works in practice."
      documentTitle="Collaborative Law UK Divorce | DivorceCalculatorUK"
      metaDescription="A plain-English guide to collaborative law in UK divorce — the principles, the disqualification clause, how it differs from mediation and arbitration, and when it's the right choice."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Collaborative Law UK Divorce", href: "/collaborative-law-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Collaborative law (sometimes called collaborative practice) is a non-court dispute resolution process where both parties retain their own collaboratively trained solicitors and commit, in writing, to reaching a settlement through structured face-to-face meetings rather than litigation. It sits between mediation (single neutral mediator) and arbitration (binding decision by a private judge), giving each party direct legal support throughout the conversation.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Collaborative law depends on both parties engaging openly and honestly. Where there are significant disclosure concerns, history of coercive control, or major imbalances in negotiation power, this route may not fit. Specialist family law advice will help assess suitability.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Six Principles That Define Collaborative Law</h2>
        <div className="space-y-4 mb-6">
          {principles.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Handshake className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Bring Modelled Numbers to the Collaborative Table" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Combined matrimonial pot — assets minus liabilities",
            "Family home value and outstanding mortgage",
            "Combined pension CETVs across all schemes",
            "Each party's gross annual income",
            "Each party's monthly income need post-separation",
            "Number and ages of dependent children",
            "Estimated total cost of the collaborative process",
            "Estimated cost of the contested court alternative",
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Disqualification clause as a double-edged sword", desc: "The disqualification clause is what makes collaborative law work — but it also means that if talks collapse, both parties have to start again with new solicitors. The wasted cost can be significant." },
            { label: "Solicitor compatibility matters", desc: "The collaborative solicitors need to work effectively together. Where there is friction between the lawyers, the process is much harder to keep on track." },
            { label: "Disclosure still needs to be thorough", desc: "Collaborative law depends on both parties disclosing fully and honestly. Without this, the process cannot deliver a fair outcome." },
            { label: "Not always cheaper than mediation", desc: "Because both solicitors attend every meeting, collaborative law can cost more than mediation. The benefit is direct legal support throughout the conversation." },
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
            "Whether collaborative law is the right route for your specific dispute",
            "Which collaborative solicitor is best suited to your case",
            "Whether the other party will engage honestly in the process",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is collaborative law likely to suit our case versus mediation or arbitration?</li>
          <li>Are there particular collaborative solicitors who specialise in cases like ours?</li>
          <li>What disclosure should we exchange before the first meeting?</li>
          <li>Should we bring in a financial neutral or pension expert?</li>
          <li>What's the realistic cost and timetable for our situation?</li>
        </ul>
        <InlineCTA label="Model Settlement Scenarios Before the First Four-Way Meeting" />
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
