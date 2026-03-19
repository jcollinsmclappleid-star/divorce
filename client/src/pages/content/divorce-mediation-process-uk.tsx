import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Scale } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const steps = [
  { step: "1", title: "MIAM (Mediation Information and Assessment Meeting)", desc: "A single meeting (usually 45–90 mins) with a mediator, individually or together, to explore whether mediation is appropriate for your situation. This is required by law before filing for court proceedings. Cost: typically £100–200 per person." },
  { step: "2", title: "Joint mediation sessions", desc: "Both parties meet with the mediator — typically 90 minutes to 2 hours per session. The mediator facilitates discussion but does not make decisions or advise either party. Financial information is exchanged during these sessions. Typically 2–6 sessions are needed." },
  { step: "3", title: "Open financial disclosure", desc: "Both parties provide financial information to enable informed discussion. This is less formal than court disclosure (Form E) but should cover all significant assets, income, and liabilities." },
  { step: "4", title: "Memorandum of Understanding (MoU)", desc: "If agreement is reached, the mediator produces an MoU summarising the agreed terms. This is not legally binding — it must be converted into a consent order by a solicitor." },
  { step: "5", title: "Independent legal advice and consent order", desc: "Both parties take independent legal advice on the MoU. A solicitor then drafts the consent order based on the agreed terms and submits it to the Family Court for approval." },
];

const faqItems = [
  {
    question: "Does the mediator help me get the best deal?",
    answer: "No — mediators are neutral. They facilitate discussion and help the parties communicate, but they do not negotiate on your behalf or advise what a fair settlement would be. You need a solicitor for advice on your legal rights and whether the mediated outcome is fair.",
  },
  {
    question: "What happens if we reach partial agreement in mediation?",
    answer: "Partial agreement is still valuable. Areas where you agree can be documented in a partial MoU; remaining disputed matters can proceed to court. This reduces the scope of any subsequent litigation and its associated costs.",
  },
  {
    question: "Is mediation suitable for all divorces?",
    answer: "Mediation is not appropriate where there is domestic abuse, coercive control, or a significant power imbalance. Mediators screen for these issues at the MIAM stage. It is also less suitable where one party has hidden assets, as mediation cannot compel disclosure.",
  },
  {
    question: "Do both parties have to pay for mediation?",
    answer: "Costs are typically split equally, though this can be agreed differently. Legal aid for mediation is available for those who qualify financially — check your eligibility through the Legal Aid Agency website.",
  },
];

const relatedPages = [
  { title: "Mediation vs Court Divorce UK Costs", description: "The cost comparison between mediation and contested court proceedings.", href: "/mediation-vs-court-divorce-uk-costs", badge: "Costs" },
  { title: "Divorce Solicitor vs Mediation UK", description: "When to use a solicitor vs a mediator — and when you need both.", href: "/divorce-solicitor-vs-mediation-uk", badge: "Process" },
  { title: "Divorce Mediation Process UK", description: "The step-by-step guide to how mediation works.", href: "/divorce-mediation-process-uk", badge: "Process" },
];

export default function MediationProcessPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="The Divorce Mediation Process UK: A Step-by-Step Guide"
      subtitle="Family mediation can resolve divorce financial disputes faster and cheaper than court proceedings — but it requires both parties to engage constructively. Here is exactly how the process works."
      documentTitle="The Divorce Mediation Process UK: Step-by-Step Guide | DivorceCalculatorUK"
      metaDescription="Understand the full divorce mediation process in England and Wales — MIAM, joint sessions, the Memorandum of Understanding, and converting agreement to a consent order."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "The Divorce Mediation Process UK", href: "/divorce-mediation-process-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Family mediation is an alternative to court proceedings where a neutral, trained mediator helps divorcing couples discuss and agree their financial and child arrangements. It is not marriage counselling — it is a structured negotiation process. The mediator facilitates but does not make decisions. Both parties remain in control of the outcome.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">The Mediation Process: Five Stages</h2>
        <div className="space-y-4 mb-6">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-4 p-4 rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                {s.step}
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Success Rates and When It Works Best</h2>
        <p className="text-muted-foreground text-sm mb-4">Research suggests that around 70% of couples who complete mediation reach a full or partial agreement. Mediation is most likely to succeed where:</p>
        <div className="space-y-2 mb-6">
          {[
            "Both parties want to resolve the matter without the cost and stress of court proceedings",
            "There is no domestic abuse or coercive control",
            "Both parties can engage in open communication",
            "The financial situation is relatively clear and not significantly disputed",
            "Both parties are willing to accept a compromise",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Preparing for Mediation</h2>
        <p className="text-muted-foreground text-sm mb-4">The most useful preparation for mediation sessions:</p>
        <div className="space-y-2 mb-6">
          {[
            "Take a round of independent legal advice before the sessions start — so you understand your rights",
            "Prepare a full schedule of assets, liabilities, and income — so discussions are based on complete information",
            "Use a divorce financial modelling calculator to understand the realistic range of outcomes",
            "Identify your key priorities — what matters most to you and where you have more flexibility",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <InlineCTA label="Prepare Your Financial Picture for Mediation" />
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
