import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, Gavel, Users } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Do I need a solicitor if I use mediation?",
    answer: "Not during the mediation sessions themselves. However, it is strongly advisable to take independent legal advice before signing a consent order — even if reached through mediation. A solicitor reviews the mediated agreement to ensure you understand the terms and it adequately protects you.",
  },
  {
    question: "Can a mediator give me legal advice?",
    answer: "No. Mediators are neutral and cannot advise either party on their legal rights or what a fair outcome would be. They facilitate discussion. This is different from collaborative law, where each party has their own solicitor present throughout.",
  },
  {
    question: "What if mediation doesn't work — do I have to start from scratch?",
    answer: "No — anything agreed in mediation can form the starting point for solicitor negotiations or court proceedings. Information shared in mediation is confidential and cannot be used in court (with limited exceptions), but agreed terms can be carried forward into a consent order.",
  },
  {
    question: "How do I find a family mediator?",
    answer: "Look for a mediator registered with the Family Mediation Council (FMC). FMC-registered mediators have completed accredited training and follow the FMC Code of Practice. Resolution (an organisation of family law professionals) also has a mediator directory. Many mediators offer an initial free or subsidised consultation.",
  },
];

const relatedPages = [
  { title: "Mediation vs Court Divorce UK Costs", description: "The cost difference between mediation and contested court proceedings.", href: "/mediation-vs-court-divorce-uk-costs", badge: "Costs" },
  { title: "Settling Out of Court vs Court Divorce UK", description: "The full comparison of out-of-court and court routes.", href: "/settling-out-of-court-vs-court-divorce-uk", badge: "Process" },
  { title: "My Ex Doesn't Agree With the Settlement UK", description: "What to do when negotiation fails.", href: "/ex-doesnt-agree-settlement-uk", badge: "Process" },
];

export default function SolicitorVsMediationPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce Solicitor vs Mediation UK: Which is Right for You?"
      subtitle="Solicitors and mediators play different roles in divorce. Knowing when to use each — and when you need both — helps you navigate efficiently and avoid unnecessary cost."
      documentTitle="Divorce Solicitor vs Mediation UK: When to Use Which | DivorceCalculatorUK"
      metaDescription="Compare divorce solicitors vs mediation in the UK — what each offers, costs, when you need one or both, and how to choose the right approach for your situation."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Divorce Solicitor vs Mediation UK", href: "/divorce-solicitor-vs-mediation-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Solicitors and mediators serve different purposes in the divorce process. Understanding what each can and cannot do helps you make smart decisions about when to invest in each — and how to use them together effectively.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-primary" />
                <p className="font-semibold text-sm">Divorce Solicitor</p>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">What they do:</p>
                <ul className="space-y-1 list-disc list-inside ml-2">
                  <li>Advise you on your legal rights and likely court outcomes</li>
                  <li>Negotiate directly with your ex's solicitor on your behalf</li>
                  <li>Draft consent orders and court documents</li>
                  <li>Represent you in court proceedings</li>
                  <li>Provide independent legal advice on an agreement</li>
                </ul>
                <p className="font-medium text-foreground mt-2">Cost: £200–£400/hour. Full representation: £5,000–£30,000+</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <p className="font-semibold text-sm">Family Mediator</p>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">What they do:</p>
                <ul className="space-y-1 list-disc list-inside ml-2">
                  <li>Facilitate structured negotiation between the parties</li>
                  <li>Help both parties reach a mutually acceptable agreement</li>
                  <li>Produce a Memorandum of Understanding (not legally binding)</li>
                  <li>Remain neutral — they advise neither party</li>
                  <li>Can cover both financial and children matters</li>
                </ul>
                <p className="font-medium text-foreground mt-2">Cost: £100–250/hour shared. Total: £500–£3,000 typically.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">The Typical Hybrid Approach</h2>
        <p className="text-muted-foreground text-sm mb-4">Most people benefit from a combination: mediation for the discussion and agreement, solicitor for the legal advice and consent order drafting. A common efficient path:</p>
        <div className="space-y-3 mb-6">
          {[
            { step: "1", title: "Initial solicitor consultation", desc: "Get legal advice on your rights and likely range of outcomes. This gives you the context to negotiate effectively in mediation." },
            { step: "2", title: "Attend MIAM", desc: "Required before court proceedings. The MIAM itself can help identify whether mediation is appropriate for your situation." },
            { step: "3", title: "Mediation sessions", desc: "Work towards a mutually acceptable agreement. Use your legal advice as context. Mediators help structure the discussion constructively." },
            { step: "4", title: "Solicitor reviews the agreement", desc: "Before signing, get independent legal advice on the mediated agreement. This protects you and is required by some courts." },
            { step: "5", title: "Solicitor drafts consent order", desc: "The mediated agreement is converted into a formal consent order. This is submitted to the court for approval." },
          ].map((s) => (
            <div key={s.step} className="flex gap-3 p-3 rounded-lg border bg-background">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</div>
              <div>
                <p className="text-sm font-semibold mb-0.5">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">When You Definitely Need a Solicitor</h2>
        <ul className="space-y-2 mb-6 text-sm text-muted-foreground list-disc list-inside ml-2">
          <li>Your ex has a solicitor and you do not (significant imbalance)</li>
          <li>There is domestic abuse or a history of coercive control</li>
          <li>You suspect hidden assets and need disclosure compelled</li>
          <li>Court proceedings have been started</li>
          <li>The assets are complex (business, significant pensions, multiple properties)</li>
          <li>You are being pressured to sign something without understanding it</li>
        </ul>

        <InlineCTA label="Understand Your Position Before Any Negotiation" />
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
