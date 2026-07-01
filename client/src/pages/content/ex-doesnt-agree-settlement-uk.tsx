import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, Gavel, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const routes = [
  { icon: Scale, title: "Mediation", desc: "A trained mediator facilitates discussion to reach a mutually acceptable agreement. This is usually the most cost-effective route and courts require you to consider mediation (by attending a MIAM) before filing. Mediation is not binding — but an agreement reached can form the basis of a consent order." },
  { icon: Scale, title: "Collaborative law", desc: "Both parties and their solicitors commit to resolving the matter without court proceedings. A structured process with face-to-face meetings. Effective where both parties want resolution but need structured guidance." },
  { icon: Gavel, title: "Financial Dispute Resolution hearing (FDR)", desc: "Part of the court process. Both parties attend, a judge provides a non-binding indication of the likely outcome, and this often results in settlement. Most cases settle at or shortly after the FDR." },
  { icon: Gavel, title: "Final hearing (contested)", desc: "A full trial where a judge hears evidence and makes a binding financial remedy order. The most expensive and time-consuming route. Final hearings can last from one day to several weeks in complex cases." },
];

const faqItems = [
  {
    question: "Can my spouse block a divorce financial settlement?",
    answer: "No. If you cannot agree, either party can apply to court. A judge will then decide the settlement if the parties cannot resolve it themselves at the FDR stage. Your spouse's refusal to cooperate does not prevent a settlement — it simply makes it more expensive and takes longer.",
  },
  {
    question: "What if my ex makes completely unrealistic demands?",
    answer: "At the Financial Dispute Resolution hearing, the judge gives a non-binding indication of what they think is a reasonable outcome. This is specifically designed to make unrealistic positions difficult to maintain. If a party's position is unreasonable, they may face adverse costs orders if they persist to a final hearing unnecessarily.",
  },
  {
    question: "Can my spouse be forced to mediate?",
    answer: "Both parties must attend a MIAM (Mediation Information and Assessment Meeting) before filing for court proceedings (with limited exceptions). However, they cannot be forced to continue with mediation — only to attend the information meeting. If mediation fails, you file for court proceedings.",
  },
  {
    question: "How long does it take if my ex won't agree?",
    answer: "A contested financial case typically takes 12–24 months from filing Form A to a final hearing. If the case settles at the FDR stage (which many do), the timeline is often 8–14 months. Delays can be caused by complex assets, non-disclosure, or a party's deliberate delay tactics (which courts can sanction with cost orders).",
  },
  {
    question: "Does entering court proceedings mean I lose control of the outcome?",
    answer: "Not entirely. Most court financial cases settle before the final hearing — often at the FDR stage — because the judge's non-binding indication gives both parties a realistic assessment of the likely outcome. Proceeding to a full contested hearing is the exception, not the rule.",
  },
  {
    question: "Can the calculator help if my ex's position seems unreasonable?",
    answer: "Yes. Modelling the full financial picture — property scenarios, income positions, pension values — gives you an evidence-based view of what a reasonable settlement looks like. This can help you and your solicitor form a clear negotiating position, and identify if your ex's demands are genuinely disproportionate.",
  },
];

const relatedPages = [
  { title: "Mediation vs Court Divorce UK Costs", description: "The cost difference between mediation and contested court proceedings.", href: "/mediation-vs-court-divorce-uk-costs", badge: "Costs" },
  { title: "Financial Remedy Proceedings UK", description: "How the three-stage court process works when you cannot agree.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Settling Out of Court vs Court Divorce UK", description: "The pros, cons, and costs of each route.", href: "/settling-out-of-court-vs-court-divorce-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "See what a reasonable settlement looks like modelled across your figures.", href: "/unlock", badge: "Report" },
];

export default function ExDoesntAgreeSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="My Ex Doesn't Agree With the Divorce Settlement UK: What Now?"
      subtitle="If your ex refuses to accept a reasonable settlement, you are not powerless. Courts exist precisely for this situation. Understanding your options — and the realistic cost and timeline of each — helps you decide how to proceed."
      documentTitle="Ex Refuses Divorce Settlement UK: Your Options | DivorceCalculatorUK"
      metaDescription="What to do when your ex refuses to agree on a divorce financial settlement in the UK — mediation, FDR, contested hearings, and how courts make orders when parties cannot agree."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "My Ex Doesn't Agree With the Settlement UK", href: "/ex-doesnt-agree-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Settlement disagreements are common in divorce financial proceedings. In England and Wales, your ex's refusal to agree does not mean you are stuck — courts have full authority to impose a financial settlement if the parties cannot reach agreement themselves. The key is understanding the escalating options available to you, from mediation through to a fully contested final hearing.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Your Options: Escalating from Negotiation to Court</h2>
        <div className="space-y-4 mb-6">
          {routes.map((r, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <r.icon className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">{r.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Costs of Disagreement</h2>
        <p className="text-muted-foreground text-sm mb-4">The longer and harder a dispute is fought, the more it costs both parties. Approximate costs by route:</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse border">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-2 border text-xs">Route</th>
                <th className="text-left p-2 border text-xs">Approximate Costs Per Party</th>
                <th className="text-left p-2 border text-xs">Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border text-muted-foreground">Mediation</td><td className="p-2 border text-muted-foreground">£500–£2,000</td><td className="p-2 border text-muted-foreground">2–6 months</td></tr>
              <tr className="bg-muted/30"><td className="p-2 border text-muted-foreground">Collaborative law</td><td className="p-2 border text-muted-foreground">£3,000–£10,000</td><td className="p-2 border text-muted-foreground">3–9 months</td></tr>
              <tr><td className="p-2 border text-muted-foreground">Court — settling at FDR</td><td className="p-2 border text-muted-foreground">£5,000–£20,000</td><td className="p-2 border text-muted-foreground">8–14 months</td></tr>
              <tr className="bg-muted/30"><td className="p-2 border text-muted-foreground">Court — final hearing</td><td className="p-2 border text-muted-foreground">£20,000–£100,000+</td><td className="p-2 border text-muted-foreground">18–36 months</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground mb-6">These costs come out of the matrimonial pot — the money that could otherwise go to you. Understanding what is reasonable before entering negotiations helps you frame realistic positions and avoid unnecessary escalation.</p>
        <InlineCTA label="Model What a Reasonable Settlement Looks Like" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures That Help Frame a Negotiating Position</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Net equity in the family home (value minus mortgage)",
            "Pension CETVs for both parties",
            "Gross and net income of both parties",
            "Savings, ISAs, and investments",
            "Joint and sole liabilities",
            "Monthly housing costs post-separation",
            "Any maintenance already being paid",
            "Children's ages and care arrangements",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points When an Ex Won't Agree</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Emotional rather than financial objections", desc: "Disagreements are often driven by principle or emotion rather than financial logic. Modelling the actual numbers can depersonalise discussions and shift focus to what is financially reasonable." },
            { label: "One party underestimating litigation risk", desc: "A professional review can compare the proposal with the financial evidence, FDR indication if there is one, and likely costs of continuing the dispute." },
            { label: "Legal costs eating into the settlement", desc: "Every month of delay or escalation costs money. Contested final hearings can cost each party £20,000–£100,000 — funds that could have been part of the settlement itself." },
            { label: "Property valuation disputes", desc: "Disagreement about property value is common. Instructing a joint surveyor is usually quicker and cheaper than two separate valuations plus a dispute." },
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
            "Whether your ex's position is legally reasonable — that requires a solicitor's assessment",
            "How a solicitor may assess the risks of an FDR or final hearing in your specific case",
            "Whether mediation is appropriate in your circumstances (particularly where there are safety concerns)",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Based on the figures, is my ex's position within a range worth discussing with a solicitor?</li>
          <li>At what point is it more cost-effective to apply to court than continue negotiating?</li>
          <li>What is the realistic litigation risk if we proceed to a final hearing?</li>
          <li>Could an FDR indication resolve things without going all the way to a contested hearing?</li>
          <li>Are there any red flags in the other party's position that would justify a costs order?</li>
        </ul>
        <InlineCTA label="Build an Evidence-Based Negotiating Position" />
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
