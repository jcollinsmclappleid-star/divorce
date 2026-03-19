import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Gavel, Scale, FileText } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const hearings = [
  {
    icon: FileText,
    name: "First Directions Appointment (FDA)",
    timing: "Usually 12–16 weeks after Form A is filed",
    desc: "The judge identifies what evidence is needed, orders valuations (property, pensions, businesses), and sets timetables for disclosure. Both parties and their solicitors attend. Typically lasts 30–60 minutes.",
  },
  {
    icon: Scale,
    name: "Financial Dispute Resolution (FDR)",
    timing: "Most important pre-trial hearing",
    desc: "Both parties attend with their solicitors. The judge reads the papers, hears brief arguments, and gives a non-binding indication of the likely outcome. This 'indication' is specifically designed to encourage settlement — most cases settle at or shortly after the FDR.",
  },
  {
    icon: Gavel,
    name: "Final Hearing",
    timing: "Only if the case has not settled after the FDR",
    desc: "A full trial — both parties give evidence, are cross-examined, experts may give evidence, and lawyers make submissions. The judge makes a binding Financial Remedy Order. Final hearings can last one day to several weeks.",
  },
];

const orders = [
  "Property adjustment orders — transferring ownership of the family home or other property",
  "Sale orders — requiring jointly owned property to be sold",
  "Lump sum orders — requiring one party to pay a specific sum to the other",
  "Pension sharing orders — transferring a percentage of one party's pension to the other",
  "Periodical payments (maintenance) orders — ongoing income payments",
  "Clean break orders — dismissing all future financial claims",
];

const faqItems = [
  {
    question: "How long do financial remedy proceedings take?",
    answer: "From filing Form A to final hearing (if required): typically 12–24 months. If the case settles at the FDR stage: often 8–14 months. Court backlogs in England and Wales can extend these timelines.",
  },
  {
    question: "Do I need a barrister for financial remedy proceedings?",
    answer: "You are not required to have a barrister — a solicitor can represent you. However, for final hearings in complex cases, a barrister with specialist family finance expertise is strongly advisable. Many solicitors brief a barrister for the FDR and Final Hearing.",
  },
  {
    question: "Can I represent myself in financial remedy proceedings?",
    answer: "Yes — you can be a litigant in person. Courts try to assist unrepresented parties, but the process is procedurally complex and the stakes are high. At minimum, seek legal advice before filing and before each hearing.",
  },
  {
    question: "What is Form E?",
    answer: "Form E is the financial disclosure document that both parties must complete in financial remedy proceedings. It covers all assets, income, liabilities, pensions, and outgoings. It must be exchanged with the other party 35 days before the FDA. It is a lengthy document but completing it accurately is critical.",
  },
];

const relatedPages = [
  { title: "Mediation vs Court Divorce UK Costs", description: "The true cost difference between mediation and fully contested proceedings.", href: "/mediation-vs-court-divorce-uk-costs", badge: "Costs" },
  { title: "Settling Out of Court vs Court Divorce UK", description: "Pros, cons, and costs of each route compared.", href: "/settling-out-of-court-vs-court-divorce-uk", badge: "Process" },
  { title: "What is a Consent Order in UK Divorce?", description: "How to formalise an agreed settlement without a full hearing.", href: "/what-is-a-consent-order-uk-divorce", badge: "/consent-order" },
];

export default function FinancialRemedyProceedingsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Financial Remedy Proceedings UK: A Plain-English Explanation"
      subtitle="Financial remedy proceedings are the formal court process by which a judge decides how assets are divided when a couple cannot agree. Understanding how they work helps you see what you're heading into — and why agreeing without court is almost always preferable."
      documentTitle="Financial Remedy Proceedings UK Explained | DivorceCalculatorUK"
      metaDescription="Understand financial remedy proceedings in England and Wales — when they start, the three-hearing structure (FDA, FDR, Final Hearing), costs, and what orders a court can make."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Financial Remedy Proceedings UK", href: "/financial-remedy-proceedings-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Financial remedy proceedings are the formal court process by which a judge decides how money and assets are divided when a couple cannot agree on their own. In England and Wales, these proceedings sit within the Family Court and are governed by the Matrimonial Causes Act 1973 and the Family Procedure Rules 2010.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">When Are Financial Remedy Proceedings Used?</h2>
        <div className="space-y-2 mb-6 text-sm text-muted-foreground">
          <p>Financial remedy proceedings typically begin when:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Negotiation or mediation has failed to produce agreement</li>
            <li>One party refuses to engage with the financial settlement process</li>
            <li>One party has concerns about hidden assets and needs court powers to compel disclosure</li>
            <li>The financial issues are sufficiently complex that court direction is needed</li>
          </ul>
        </div>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-primary mb-2">How to Start: File Form A</p>
            <p className="text-sm text-muted-foreground">To start proceedings, you file Form A — an application for a Financial Remedy Order — with the Family Court. This attracts a court fee (currently £275). Before filing, you must have attended a MIAM (Mediation Information and Assessment Meeting) or have an exemption (for example, in cases involving domestic abuse or urgency).</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Three-Hearing Structure</h2>
        <div className="space-y-4 mb-6">
          {hearings.map((h, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <h.icon className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-sm">{h.name}</span>
                  <Badge variant="outline" className="text-xs">{h.timing}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{h.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Understand Your Settlement Range Before Proceeding" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Orders a Court Can Make</h2>
        <ul className="space-y-2 mb-6">
          {orders.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <Gavel className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {o}
            </li>
          ))}
        </ul>

        <Card className="bg-amber-50 border-amber-200 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-amber-800 mb-1">Costs Warning</p>
            <p className="text-sm text-amber-700">Financial remedy proceedings are expensive. Solicitor costs, barrister fees, expert witnesses, and court fees can easily reach £10,000–£50,000+ per party in contested cases. The default position is that each party bears their own costs — but courts can and do make costs orders against a party who has behaved unreasonably.</p>
          </CardContent>
        </Card>

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
