import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Gavel, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const features = [
  { title: "Both parties choose the arbitrator", desc: "The arbitrator is typically a senior family law barrister, retired judge or specialist solicitor selected jointly by the parties — giving more control than the random court allocation of judges." },
  { title: "Tailored process and timetable", desc: "The parties agree the rules, the timetable, the documents to exchange and the format of any hearing. This typically results in a much faster resolution than the court timetable." },
  { title: "Private and confidential", desc: "Unlike court proceedings, arbitration is private. The hearing is not open to the public or press, and the award itself is not normally published." },
  { title: "Binding award", desc: "The arbitrator issues an award which is binding on the parties and is then converted into a consent order by the court. The court will normally make the order without re-examining the merits." },
  { title: "Costs typically lower than full court", desc: "While the parties pay the arbitrator's fees (which can be significant), the streamlined timetable and avoidance of repeat hearings typically result in lower overall costs than a contested final hearing." },
  { title: "Suitable for almost any financial issue", desc: "Arbitration can deal with division of assets, pensions, maintenance, schedule 1 claims (children) and most aspects of a financial settlement. Some matters such as international child relocation are not arbitrable." },
];

const faqItems = [
  {
    question: "What is family arbitration?",
    answer: "Family arbitration is a private dispute resolution process where the parties appoint a qualified arbitrator (usually under the Institute of Family Law Arbitrators scheme — IFLA) to decide their case. The arbitrator's award is binding on the parties and is then converted into a court order. It is sometimes called 'private justice' because the parties effectively choose their own decision-maker.",
  },
  {
    question: "How does arbitration differ from mediation?",
    answer: "In mediation, a neutral third party helps you reach your own agreement — the mediator does not decide. In arbitration, the arbitrator hears both sides and makes a binding decision, much like a judge. Arbitration is therefore more like court but faster, more flexible and confidential.",
  },
  {
    question: "Is the arbitrator's decision binding?",
    answer: "Yes. The award is contractually binding on the parties from the moment it is made and is then converted into a court order, normally without the court re-examining the merits. Challenges to an arbitral award are very limited — broadly only on grounds of serious irregularity or law.",
  },
  {
    question: "How long does arbitration typically take?",
    answer: "From appointment of the arbitrator to award, many cases conclude within 4–6 months — sometimes faster. By contrast, contested financial remedy proceedings in court can take 12–18 months or longer to reach a final hearing.",
  },
  {
    question: "How much does arbitration cost?",
    answer: "The parties pay the arbitrator's fees (typically charged at a senior practitioner's hourly rate or a fixed-fee package), plus their own legal costs. Total costs vary widely with the complexity of the case but are often lower than reaching a contested final hearing in court.",
  },
  {
    question: "When is arbitration not the right choice?",
    answer: "Arbitration depends on both parties consenting to use it. It can also be unsuitable where there are concerns about non-disclosure or coercion, or where one party is not represented. Some issues — particularly some matters concerning children — cannot be arbitrated. A qualified family solicitor can advise on whether arbitration fits your case.",
  },
];

const relatedPages = [
  { title: "Divorce Mediation Process UK", description: "How mediation works as an alternative to court.", href: "/divorce-mediation-process-uk", badge: "Mediation" },
  { title: "Settling Out of Court vs Court", description: "Comparing the routes through to a financial settlement.", href: "/settling-out-of-court-vs-court-divorce-uk", badge: "Process" },
  { title: "Mediation vs Court UK Costs", description: "Cost comparison between dispute resolution routes.", href: "/mediation-vs-court-divorce-uk-costs", badge: "Costs" },
  { title: "Preview the Full Financial Report", description: "Model possible outcomes before choosing your dispute route.", href: "/unlock", badge: "Report" },
];

export default function ArbitrationDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Arbitration in UK Divorce: A Faster, Private Alternative to Court"
      subtitle="Family arbitration is a private process where both parties appoint a senior family law specialist to decide their financial dispute. The award is binding and is then converted into a court order."
      documentTitle="Arbitration in UK Divorce | DivorceCalculatorUK"
      metaDescription="A clear guide to family arbitration in the UK — how it works, how it compares with mediation and court, what it costs, and when it's the right choice."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Arbitration in UK Divorce", href: "/arbitration-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Family arbitration is a binding form of private dispute resolution introduced in England and Wales in 2012. It is increasingly used by couples who want a final decision without the cost, delay and publicity of court proceedings. The arbitrator — typically a senior family law barrister, retired judge or specialist solicitor — is jointly appointed by the parties under the Institute of Family Law Arbitrators (IFLA) scheme. Their award is contractually binding and is then converted into a court order, usually without the court re-examining the merits.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Arbitration depends on both parties consenting to use it. It is binding once started — meaning you cannot drop out of the process if you don't like how it's going. Take qualified family law advice on whether arbitration fits your case.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Key Features of Family Arbitration</h2>
        <div className="space-y-4 mb-6">
          {features.map((f, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Gavel className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{f.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Settlement Outcomes Before You Choose a Route" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures to Capture in the Calculator</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Total combined matrimonial pot — assets minus liabilities",
            "Family home value and outstanding mortgage",
            "Combined pension CETVs across all schemes",
            "Each party's gross annual income",
            "Each party's monthly income need post-separation",
            "Number and ages of dependent children",
            "Estimated arbitration costs (arbitrator's fee plus your own legal costs)",
            "Estimated alternative cost — contested court route to final hearing",
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
            { label: "Choosing the right arbitrator", desc: "The arbitrator's experience with your specific issues (e.g. business valuations, complex pensions, international assets) matters significantly. The wrong choice can produce an outcome that doesn't reflect best practice." },
            { label: "Limited rights of challenge", desc: "Once the award is made, the grounds for challenging it are very narrow. This is the price of finality — but it means thorough preparation is essential before the arbitration starts." },
            { label: "Cost ramp-up if scope expands", desc: "Arbitration costs are predictable when scope is well defined, but can escalate if disclosure issues, valuation disputes or expert evidence drag in. Budget for some contingency." },
            { label: "Not suitable where non-disclosure is suspected", desc: "Arbitration depends on both parties cooperating with disclosure. If one party may be hiding assets, the formal investigative powers of the court may be needed." },
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
            "Whether arbitration is the right route for your specific dispute",
            "Which arbitrator would be best suited to your case",
            "Whether you have grounds to challenge an arbitration award already made",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is arbitration likely to suit our dispute or are mediation/court a better fit?</li>
          <li>Which arbitrators have experience with our specific issues?</li>
          <li>How should we structure the arbitration agreement and scope?</li>
          <li>What disclosure is needed before arbitration begins?</li>
          <li>What is the realistic cost and timetable for our case?</li>
        </ul>
        <InlineCTA label="Model Settlement Scenarios for the Arbitration Brief" />
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
