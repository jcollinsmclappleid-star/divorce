import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Same legal effect — different name", desc: "The 'final order' (post-April 2022) and 'decree absolute' (pre-April 2022) both legally end the marriage. If you were divorced before 6 April 2022 your decree absolute is still valid; you do not need to do anything to convert it." },
  { title: "Conditional order = decree nisi", desc: "The 'conditional order' is the modern equivalent of the old 'decree nisi'. It signals the court is satisfied the marriage has irretrievably broken down but does not yet end the marriage. Financial consent orders can be lodged at this stage." },
  { title: "Six-week wait is unchanged", desc: "Both before and after 2022, you must wait at least six weeks from the conditional order (or decree nisi) before applying for the final order (or decree absolute). The clock is the same — only the names changed." },
  { title: "Pre-2022 vs post-2022 procedure", desc: "Pre-April 2022, you also had to allege one of five 'facts' (adultery, behaviour, desertion, two-year separation with consent, five-year separation). Post-April 2022, no fact or fault is needed — irretrievable breakdown alone is enough." },
  { title: "Implications for finances", desc: "Whatever the order is called, the financial framework under the Matrimonial Causes Act 1973 is unchanged. Section 25 factors still apply. The risks of obtaining the final order before a sealed financial consent order are the same in both regimes." },
  { title: "Why people search both terms", desc: "Older guidance, news articles and templates still use 'decree absolute'. Solicitors often use both interchangeably with clients. Both are correct in context — only the procedural language differs." },
];

const figures = [
  "Date your divorce application was issued (pre or post 6 April 2022)",
  "Whether you have a conditional order / decree nisi yet",
  "Date of the conditional order or decree nisi",
  "Whether your financial consent order has been sealed",
  "CETV statements for both parties' pensions",
  "Status of any death-in-service or spousal pension rights",
  "Marriage certificate for the application reference",
  "Court reference number on prior orders",
];

const faqItems = [
  { question: "Is a final order the same as a decree absolute?", answer: "Yes — they have the same legal effect: ending the marriage. The terminology changed on 6 April 2022 with the Divorce, Dissolution and Separation Act 2020. 'Decree absolute' was renamed 'final order' and 'decree nisi' was renamed 'conditional order'. Older decree absolutes remain valid forever." },
  { question: "Do I still need to apply for the final order?", answer: "Yes. The final order does not happen automatically after the conditional order. The applicant must positively apply for it after the six-week minimum wait. If neither party applies for at least 12 months after the conditional order, the court may require an explanation." },
  { question: "Can I get a final order without a financial settlement?", answer: "Technically yes, but many family solicitors recommend sealing the financial order first. Once the marriage is legally ended, certain pension survivor rights and other marriage-linked benefits may be lost. If your spouse died after the final order but before a financial settlement, you could lose substantial benefits — this is one reason timing is commonly discussed with a solicitor." },
  { question: "What changed for couples already mid-divorce on 6 April 2022?", answer: "Cases issued before 6 April 2022 continued under the old rules with decree nisi and decree absolute terminology. Cases issued on or after that date use the new terminology. Both processes lead to the same legal outcome — ending the marriage." },
  { question: "How long between conditional order and final order?", answer: "The minimum wait is six weeks and one day from the conditional order. There is no maximum, but if more than 12 months pass the court will usually want to know why. In practice the gap is often longer while financial matters are resolved." },
  { question: "Can my spouse apply for the final order if I don't?", answer: "If the conditional order applicant does not apply for the final order within three months after the six-week wait expires, the other spouse can apply. They must give 14 days' notice. The court will usually grant it but will look at any reasons for delay (often financial)." },
];

const relatedPages = [
  { title: "No-Fault Divorce UK", description: "How the post-2022 process works.", href: "/no-fault-divorce-uk", badge: "Process" },
  { title: "How Long Does a Divorce Take UK?", description: "Realistic timelines explained.", href: "/how-long-does-a-divorce-take-uk", badge: "Timeline" },
  { title: "What is a Consent Order UK Divorce?", description: "Why you should seal a financial order first.", href: "/what-is-a-consent-order-uk-divorce", badge: "Order" },
  { title: "Preview the Full Financial Report", description: "Model your settlement before sealing.", href: "/unlock", badge: "Report" },
];

export default function DecreeAbsoluteVsFinalOrderPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Decree Absolute vs Final Order UK — What Changed in 2022"
      subtitle="Since 6 April 2022 the 'decree absolute' is called the 'final order' and the 'decree nisi' is the 'conditional order'. The legal effect is identical — only the names changed. Here is what you actually need to know."
      documentTitle="Decree Absolute vs Final Order UK | DivorceCalculatorUK"
      metaDescription="Decree absolute vs final order UK explained. The 2022 terminology change, how the process works, when to apply, and why timing matters for your financial settlement."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Decree Absolute vs Final Order UK", href: "/decree-absolute-vs-final-order-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          On 6 April 2022 the language of divorce in England and Wales changed. 'Decree nisi' became 'conditional order' and 'decree absolute' became 'final order'. The substance — what each milestone does — is unchanged. A final order ends the marriage in exactly the same way a decree absolute did. Older decree absolutes remain valid permanently and do not need to be reissued. The widespread search for both terms reflects the fact that older guidance, templates and news coverage still use the pre-2022 names.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">A common costly timing issue under both regimes is the same: applying for the final order (or decree absolute) before a financial consent order has been sealed. This can permanently affect pension survivor benefits, widow/widower's pension rights and other benefits tied to being legally married.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things to Know About the Change</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Financial Settlement" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Should Have to Hand</h2>
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
            { label: "Pension survivor benefits", desc: "Many occupational pensions provide a spouse's pension on death. Once the marriage ends with the final order, these may be lost. The financial consent order can preserve them by including pension sharing — but only if sealed before the final order." },
            { label: "Death-in-service lump sums", desc: "Most workplace death-in-service schemes are payable to the legal spouse. If the final order is granted before the consent order is sealed and a tragedy occurs, the lump sum may go elsewhere — often the deceased's estate or a default beneficiary." },
            { label: "Inheritance and wills", desc: "A divorce (final order) automatically removes a former spouse from prior wills as if they had died. This can cause unintended consequences — particularly where a will was last updated mid-marriage. Refresh your will at the same time you apply for the final order." },
            { label: "12-month delay", desc: "If neither party applies for the final order within 12 months of the conditional order, the court may want a reason. Long delays usually relate to unresolved finances — but unexplained delays can require a witness statement to the court." },
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
            "Whether you should delay the final order to preserve specific pension rights",
            "Whether your spouse's pension scheme has survivor benefits worth preserving",
            "How to update your will and beneficiary nominations alongside the divorce",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Are there pension survivor benefits I would lose by getting the final order now?</li>
          <li>Should we seal the consent order before applying for the final order?</li>
          <li>What happens to my will when the final order is granted?</li>
          <li>Do I need to update beneficiary nominations on workplace benefits?</li>
          <li>Are there tax timing reasons (CGT, stamp duty) to apply for the final order in a particular tax year?</li>
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
