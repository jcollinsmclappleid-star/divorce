import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Gavel, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const options = [
  { step: "1", title: "Write formally requesting disclosure", desc: "A written request through solicitors — on the record — is the starting point. This documents that you asked, and their refusal is evidence of non-cooperation that will be relevant to costs." },
  { step: "2", title: "File for court proceedings", desc: "Filing Form A starts financial remedy proceedings. Once in proceedings, your spouse is legally required to complete Form E (full financial disclosure) by a set deadline. Failure to do so is contempt of court." },
  { step: "3", title: "Apply for a Questionnaire order", desc: "At the First Directions Appointment (FDA), the court can order specific disclosure questions to be answered and additional documents to be provided. The court sets a deadline — non-compliance is contempt." },
  { step: "4", title: "Apply for third-party disclosure orders", desc: "Courts can compel third parties — banks, employers, HMRC, pension providers, companies, accountants — to produce financial records directly. This bypasses your spouse entirely." },
  { step: "5", title: "Apply for adverse inference", desc: "Where a party persistently fails to comply with disclosure orders, the court can draw adverse inferences — treating the non-disclosure as evidence of hidden assets and awarding a greater share to the other party." },
];

const faqItems = [
  {
    question: "Can my spouse be jailed for refusing financial disclosure?",
    answer: "In serious cases where a party repeatedly fails to comply with court orders, committal for contempt of court is a real possibility. However, courts apply escalating sanctions — cost orders, adverse inferences, and suspended committal orders — before imprisonment. The threat of committal is powerful leverage.",
  },
  {
    question: "How long can my spouse delay the process by refusing disclosure?",
    answer: "Delay tactics are increasingly difficult once proceedings have started. Courts have strict timetables and can penalise parties who fail to comply. Persistent non-compliance ultimately leads to adverse inferences, cost orders, and potentially the court making its best assessment of the assets based on available evidence — even if disclosure is incomplete.",
  },
  {
    question: "What if my spouse has assets in their sole name that I know nothing about?",
    answer: "Your spouse is legally required to disclose all assets in their sole name. If you have information suggesting hidden assets, share this with your solicitor. Courts can order disclosure from third parties (banks, HMRC) independently of your spouse.",
  },
  {
    question: "Can I use a financial modelling calculator without full disclosure?",
    answer: "Yes — and it can be useful to model with known or estimated figures before disclosure is complete. Modelling different asset scenarios based on what you do know can help identify what information is most material to the outcome, and help you prepare questions and instructions for your solicitor.",
  },
  {
    question: "What is Form E and why does it matter?",
    answer: "Form E is the standard financial disclosure document used in financial remedy proceedings in England and Wales. Both parties must complete it with full details of their assets, income, liabilities, and financial needs. It is a sworn document — providing false information on Form E is perjury.",
  },
];

const relatedPages = [
  { title: "Can I Hide Assets in Divorce UK?", description: "The consequences of non-disclosure and how courts detect concealment.", href: "/can-i-hide-assets-in-divorce-uk", badge: "Disclosure" },
  { title: "Financial Disclosure in UK Divorce", description: "The legal duty of full and frank disclosure explained.", href: "/financial-disclosure-divorce-uk", badge: "Process" },
  { title: "Financial Remedy Proceedings UK", description: "How the court process works when you cannot agree.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "See what a complete financial model covers across property, pensions and income.", href: "/unlock", badge: "Report" },
];

export default function SpouseRefusesDisclosurePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Spouse Refuses Financial Disclosure UK: Your Options"
      subtitle="If your spouse refuses to disclose their finances in a UK divorce, you are not powerless. Courts have strong tools to compel disclosure — including ordering banks, employers, and HMRC to provide information directly."
      documentTitle="Spouse Refuses Financial Disclosure UK | DivorceCalculatorUK"
      metaDescription="What to do when your spouse refuses financial disclosure in a UK divorce — court orders, third-party disclosure, adverse inferences, and contempt of court explained."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Spouse Refuses Financial Disclosure UK", href: "/spouse-refuses-financial-disclosure-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Financial disclosure in UK divorce proceedings is a legal obligation — not optional. Both parties are required by law to provide full and frank disclosure of all assets, income, liabilities, and financial resources. Where a party refuses to comply, courts have a range of powers to compel disclosure and to penalise non-compliance. Understanding those powers is important before assuming you are stuck.
        </p>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-primary mb-2">The Good News</p>
            <p className="text-sm text-muted-foreground">If your spouse refuses to disclose, they are not hiding assets from you alone — they are refusing to comply with a legal court process. This is treated very seriously. Courts can and do obtain information directly from third parties (banks, HMRC, employers) without your spouse's involvement. Their refusal ultimately hurts them more than it hurts you.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">What You Can Do: Escalating Steps</h2>
        <div className="space-y-4 mb-6">
          {options.map((s) => (
            <div key={s.step} className="flex gap-4 p-4 bg-background rounded-lg border">
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

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Adverse Inference: The Ultimate Sanction</p>
                <p className="text-sm text-amber-700">Where a party persistently refuses disclosure despite court orders, courts can make their best assessment of the parties' assets based on all available evidence — including the inference that hidden assets exist. They may then make an award that exceeds what would be justified by disclosed assets alone. This is a powerful disincentive to non-disclosure.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <InlineCTA label="Model With the Figures You Do Know" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures That May Be Relevant to Gather</h2>
        <p className="text-sm text-muted-foreground mb-4">Even where disclosure is incomplete, gathering what you can helps build the picture for your solicitor:</p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Property value (Zoopla or Rightmove estimate)",
            "Outstanding mortgage balance (from statements)",
            "Your own income, pension CETV, savings",
            "Known joint accounts and their approximate balances",
            "Employment details (employer, approximate salary) of other party",
            "Any known sole-name accounts or investments",
            "Business interests or self-employment income (if known)",
            "Credit commitments visible on joint statements",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points When Disclosure Is Refused</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Inability to model with incomplete data", desc: "Without full disclosure, any financial model is built on estimates. Modelling conservative and optimistic scenarios for the undisclosed assets can still be useful for planning and negotiation." },
            { label: "Cost pressure of court proceedings", desc: "Forcing disclosure through court proceedings is expensive. Cost orders can recover some of this from the non-disclosing party — but professional guidance on whether to litigate is important." },
            { label: "Delay extending financial uncertainty", desc: "Refusal to disclose prolongs proceedings, creates uncertainty, and can affect both parties' ability to plan rehousing and financial futures. Early escalation through solicitors may resolve it faster than people expect." },
            { label: "Pension values particularly difficult to estimate", desc: "Defined benefit (final salary) pensions require actuarial assessment and cannot be reliably estimated without a CETV from the pension provider. Courts can order this directly." },
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
            "What assets the other party actually holds — the calculator uses figures you provide",
            "Whether court proceedings are suitable in your specific situation",
            "How estimated or partial figures may affect any professional assessment",
            "Whether a third-party disclosure order would be granted in your case",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What is the most effective and cost-efficient way to obtain disclosure from a reluctant spouse?</li>
          <li>Could a third-party disclosure order compel banks or HMRC to provide records directly?</li>
          <li>What are the cost risks if disclosure enforcement becomes contested?</li>
          <li>At what point might adverse inference become relevant in our case?</li>
          <li>How should pension values be obtained if the other party will not cooperate?</li>
        </ul>
        <InlineCTA label="Start Modelling With the Figures You Have" />
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
