import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, Gavel, PoundSterling } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Is mediation always cheaper than court?",
    answer: "For most cases, yes — significantly cheaper. However, if mediation fails after several sessions, you may still need to go to court, paying both mediation costs and court costs. Mediation is most cost-effective when both parties are broadly willing to engage constructively.",
  },
  {
    question: "Can I get legal aid for divorce mediation?",
    answer: "Legal aid for family mediation is available to those who qualify financially. Since 2013, legal aid for most family court proceedings has been abolished, but mediation (where a MIAM is involved) can still be funded. Check with the Legal Aid Agency or a solicitor whether you qualify.",
  },
  {
    question: "Does mediation work if there is domestic abuse?",
    answer: "Mediation is generally not appropriate where there has been domestic abuse, coercive control, or a significant power imbalance. Mediators are trained to identify these situations and will not proceed with mediation where it is not safe or appropriate. Legal aid exemptions exist for these cases.",
  },
  {
    question: "Can court proceedings be stopped once started?",
    answer: "Yes — many cases settle at or after the FDR hearing, even after proceedings have started. You pay the costs incurred to that point, but agreeing at the FDR stage is significantly cheaper than a full final hearing. Cases can also be settled 'at the door of the court' on the day of a final hearing.",
  },
];

const relatedPages = [
  { title: "Financial Remedy Proceedings UK", description: "How the three-stage court process works in detail.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Settling Out of Court vs Court Divorce UK", description: "The full comparison of out-of-court and court routes.", href: "/settling-out-of-court-vs-court-divorce-uk", badge: "Process" },
  { title: "Divorce Solicitor vs Mediation UK", description: "When to use a solicitor and when mediation is more appropriate.", href: "/divorce-solicitor-vs-mediation-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "Model your settlement before deciding on mediation or court.", href: "/unlock", badge: "Report" },
];

export default function MediationVsCourtPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Mediation vs Court: Divorce UK Costs Compared"
      subtitle="Mediation typically costs £500–£3,000 total. A contested court final hearing can cost £20,000–£100,000+ per party. Understanding the cost difference is essential for making informed decisions about how to resolve your financial settlement."
      documentTitle="Mediation vs Court Divorce UK Costs | DivorceCalculatorUK"
      metaDescription="Compare the real costs of mediation vs contested court proceedings for divorce financial settlements in England and Wales — with typical price ranges and timelines."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Mediation vs Court Divorce UK Costs", href: "/mediation-vs-court-divorce-uk-costs" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The choice between mediation and court proceedings is one of the most consequential financial decisions in a divorce. The cost difference is dramatic — and legal costs come out of the matrimonial pot, reducing what both parties ultimately receive. Understanding the realistic costs of each route helps you make an informed decision about how to proceed.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className="border-green-200">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-sm text-green-700">Mediation</p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><PoundSterling className="w-3 h-3" /><span>MIAM: £100–200 per person</span></div>
                <div className="flex items-center gap-2"><PoundSterling className="w-3 h-3" /><span>Mediation sessions: £100–250/hour shared</span></div>
                <div className="flex items-center gap-2"><PoundSterling className="w-3 h-3" /><span>Typical total: £500–£3,000</span></div>
                <div className="flex items-center gap-2"><PoundSterling className="w-3 h-3" /><span>Consent order drafting: £500–£1,500</span></div>
                <div className="mt-2 pt-2 border-t font-semibold text-green-700">Total per couple: £1,500–£5,000</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-red-600" />
                <p className="font-semibold text-sm text-red-700">Contested Court Proceedings</p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><PoundSterling className="w-3 h-3" /><span>Court fees (Form A + hearings): £500–£1,000</span></div>
                <div className="flex items-center gap-2"><PoundSterling className="w-3 h-3" /><span>Solicitor costs: £300–£400/hour</span></div>
                <div className="flex items-center gap-2"><PoundSterling className="w-3 h-3" /><span>Settling at FDR: £5,000–£20,000 per party</span></div>
                <div className="flex items-center gap-2"><PoundSterling className="w-3 h-3" /><span>Full final hearing: £20,000–£100,000+ per party</span></div>
                <div className="mt-2 pt-2 border-t font-semibold text-red-700">Total per couple at FDR: £10,000–£40,000</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">When Mediation Works Best</h2>
        <ul className="space-y-2 mb-6 text-sm text-muted-foreground list-disc list-inside ml-2">
          <li>Both parties are broadly willing to negotiate in good faith</li>
          <li>There is no significant power imbalance or domestic abuse history</li>
          <li>The financial situation is relatively clear and assets are not disputed</li>
          <li>Both parties want to maintain a working co-parenting relationship</li>
          <li>The financial difference between your positions is bridgeable</li>
        </ul>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">When Court Proceedings May Be Necessary</h2>
        <ul className="space-y-2 mb-6 text-sm text-muted-foreground list-disc list-inside ml-2">
          <li>Your spouse refuses to engage with mediation or disclose finances</li>
          <li>There is a history of domestic abuse or coercive control</li>
          <li>One party is hiding or dissipating assets</li>
          <li>There are complex assets (business, pensions, international elements) requiring court powers to properly investigate</li>
          <li>Urgent financial protection is needed (e.g. a freezing order)</li>
        </ul>

        <p className="text-sm text-muted-foreground mb-6">The most cost-effective overall path is typically: mediation first → if that fails, negotiate through solicitors → if that fails, court proceedings → settle at the FDR. Cases that proceed to a final hearing are almost always more expensive than the parties' combined savings from 'winning'.</p>
        <InlineCTA label="Understand Your Range Before Negotiating" />
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
