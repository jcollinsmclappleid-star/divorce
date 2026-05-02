import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Scale } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "FDA is the first listed hearing in financial remedy", desc: "After Form A is issued, the court typically lists the First Directions Appointment 12–16 weeks later. By then both parties should have exchanged Form Es and a Statement of Issues." },
  { title: "Procedural, not substantive", desc: "The FDA is about getting the case ready, not deciding it. The court reviews disclosure, identifies what's missing, addresses any expert evidence needed, and lists the FDR (and provisionally the final hearing)." },
  { title: "Form E exchange must be complete", desc: "Both parties should have filed and exchanged Form Es at least 35 days before FDA. Failure to comply, or significantly incomplete Form Es, can attract court criticism and costs." },
  { title: "Questionnaires and replies", desc: "Each party files a Questionnaire on the other's Form E (essentially a request for further information). The court considers proportionality of questions and orders replies by a deadline before FDR." },
  { title: "Expert evidence directions", desc: "If business valuations, pension actuarial reports (PODE), or other experts are needed, the FDA is when these are formally directed — usually as 'single joint experts' rather than each side instructing their own." },
  { title: "Mediation referral", desc: "The court may refer the case to mediation or otherwise encourage settlement at this stage. Some FDAs are 'accelerated FDRs' where the judge is willing to give an indication if both parties want one." },
];

const figures = [
  "Both parties' Form Es exchanged 35+ days before FDA",
  "Statement of Issues filed by both parties",
  "Chronology and case summary",
  "Schedule of assets, liabilities and incomes",
  "Each party's Questionnaire on the other's Form E",
  "List of any expert evidence being requested",
  "Estimate of costs to date and projected to FDR",
  "Proposed timetable for any further work",
];

const faqItems = [
  { question: "What is the FDA in divorce?", answer: "FDA stands for First Directions Appointment — the first listed hearing in financial remedy proceedings, typically held 12–16 weeks after Form A is issued. The FDA is procedural: the court reviews what disclosure has been done, identifies gaps, orders any further work (questionnaires, expert reports), and sets directions through to the FDR. It does not decide the case." },
  { question: "How long does an FDA last?", answer: "Typically 30–60 minutes — much shorter than FDR or final hearing. The court works through directions efficiently, addressing any contested points (often around the scope of questionnaires or whether to order expert evidence). Most FDAs are not particularly contentious if both parties have prepared properly." },
  { question: "What documents are needed for FDA?", answer: "Both parties must have filed Form E at least 35 days beforehand. Other typical filings: Statement of Issues, Chronology, schedule of assets, Questionnaire on the other's Form E, list of any expert evidence requested, and a costs estimate. The court rules and individual local court directions specify exactly what's required." },
  { question: "Will the judge make decisions about the settlement at FDA?", answer: "No — the FDA is procedural. The judge does not give views on the merits, indicate likely outcomes, or settle the case. The next listed hearing — FDR — is where settlement-focused indications are given. Some courts will offer an 'accelerated FDR' at FDA in suitable cases if both parties consent." },
  { question: "What happens if I don't have my Form E ready by FDA?", answer: "The court can adjourn the FDA, make 'unless' orders requiring filing by a specific date, and award costs against the defaulting party. Repeated non-compliance can result in 'debarring' orders preventing the defaulting party from defending the financial application. Always meet the Form E deadline." },
  { question: "Can the case settle at FDA?", answer: "Occasionally — usually where both parties arrive ready to negotiate and the assets are straightforward. Most cases do not settle at FDA because the questionnaires have not yet been answered and the picture is incomplete. FDR (the next hearing) is the dedicated settlement stage." },
];

const relatedPages = [
  { title: "FDR Hearing UK", description: "The settlement-focused second hearing.", href: "/fdr-hearing-financial-dispute-resolution-uk", badge: "Process" },
  { title: "Financial Remedy Proceedings UK", description: "The full court process explained.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Form E Financial Disclosure UK", description: "The disclosure document at the heart of FDA.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
  { title: "Preview the Full Financial Report", description: "Model your settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function FdaPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="First Directions Appointment FDA — UK Financial Remedy"
      subtitle="The FDA is the procedural first hearing in financial remedy proceedings. It reviews disclosure, identifies gaps, orders questionnaire replies and expert evidence, and lists the case through to FDR."
      documentTitle="First Directions Appointment FDA UK | DivorceCalculatorUK"
      metaDescription="First Directions Appointment FDA UK explained. Procedural first hearing in financial remedy proceedings, Form E deadlines, questionnaires, expert evidence and timetable to FDR."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "First Directions Appointment FDA UK", href: "/first-directions-appointment-fda-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The First Directions Appointment (FDA) is the first listed hearing in financial remedy proceedings — usually 12–16 weeks after Form A is issued. It is procedural rather than substantive: the court is not deciding the case, but ensuring it is ready for the next stage. By FDA, both parties should have exchanged Form Es, filed Statements of Issues, and prepared questionnaires on each other's disclosure. The court orders any necessary further work and timetables the case through to the Financial Dispute Resolution appointment (FDR).
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Failing to file Form E in time, or filing it incomplete, frequently results in adverse cost orders at FDA. The 35-day rule is rigid. Engage with disclosure as soon as Form A is issued — or even before, voluntarily.</p>
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
        <InlineCTA label="Model Your Financial Position" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">What You Need for FDA</h2>
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
            { label: "Form E delays", desc: "Late or incomplete Form Es are the most common cause of FDA difficulty. Even where late filing is allowed, it usually delays questionnaires and expert directions, pushing FDR back." },
            { label: "Disproportionate questionnaires", desc: "Long, fishing-style questionnaires are often cut down by the court at FDA. Focused, proportionate questionnaires get a better reception and don't waste resources." },
            { label: "Expert evidence disputes", desc: "Disputes over whether to instruct experts (PODE for pensions, forensic accountant for businesses) are common at FDA. Where instructed, single joint experts are preferred over each side instructing their own." },
            { label: "Costs already mounting", desc: "By FDA, both sides have typically incurred £15k–£40k of legal costs. The trajectory matters — if costs look set to exceed the matrimonial pot, the court may push hard for settlement." },
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
            "What experts to instruct and on what terms",
            "What questionnaire scope is proportionate in your case",
            "Whether to seek an accelerated FDR at FDA",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is our Form E ready and complete enough for FDA?</li>
          <li>What experts (if any) should we ask the court to direct?</li>
          <li>Is our questionnaire proportionate or too broad?</li>
          <li>Would an accelerated FDR be sensible in our case?</li>
          <li>What is our realistic costs trajectory through to FDR?</li>
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
