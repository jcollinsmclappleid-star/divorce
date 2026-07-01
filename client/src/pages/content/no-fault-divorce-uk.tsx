import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scale, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const stages = [
  { title: "Sole or joint application", desc: "Either one spouse alone (sole) or both together (joint) can apply for divorce. Joint applications avoid one party being formally 'served' but still require both to engage at later stages." },
  { title: "Statement of irretrievable breakdown", desc: "The applicant simply states the marriage has irretrievably broken down. There is no need to allege adultery, unreasonable behaviour or to prove fault. The court must accept the statement as conclusive." },
  { title: "20-week reflection period", desc: "After the application is issued, a mandatory 20-week 'period of reflection' begins before the conditional order can be applied for. This is intended to give space to consider whether reconciliation is possible and to start sorting finances." },
  { title: "Conditional order (formerly decree nisi)", desc: "After the 20 weeks, the applicant confirms they wish to proceed and the court issues a conditional order. The marriage is not yet ended at this stage; financial orders can now be applied for and approved." },
  { title: "Six-week pause", desc: "A further minimum six-week wait runs from the conditional order before the final order can be applied for. In some cases this is used to finalise a consent order on finances." },
  { title: "Final order (formerly decree absolute)", desc: "Once granted the marriage is legally ended. Most people wait until financial matters are resolved by a sealed consent order before applying — applying too early can prejudice pension rights and other claims." },
];

const figures = [
  "Marriage certificate (original or certified copy)",
  "£593 court fee (or fee remission application if eligible)",
  "Spouse's full name and current address",
  "Date and place of marriage exactly as on certificate",
  "Bank details for any joint accounts to be addressed",
  "List of property, pensions, debts and significant assets",
  "Any prior separation or postnuptial agreements",
  "Children's names and dates of birth (if any)",
];

const faqItems = [
  { question: "When did no-fault divorce start in the UK?", answer: "The Divorce, Dissolution and Separation Act 2020 came into force on 6 April 2022 in England and Wales. It removed the need to prove fault (adultery, unreasonable behaviour, desertion) or wait two or five years living apart, and replaced the old 'decree nisi/decree absolute' terminology with 'conditional order' and 'final order'." },
  { question: "How long does a no-fault divorce take?", answer: "The legal minimum is around 26 weeks: 20 weeks from issue of the application to the conditional order, plus a further 6 weeks before the final order. In practice it is usually longer because most couples wait to apply for the final order until their financial settlement is sealed by the court." },
  { question: "Can my spouse stop a no-fault divorce?", answer: "It is no longer possible to defend a divorce on the basis of disagreement with the divorce itself. Very narrow grounds remain (jurisdiction, fraud, or that the marriage is not legally valid) but contested divorces are now extremely rare." },
  { question: "Should I get the final order before sorting finances?", answer: "Many couples wait until finances are settled. Applying for the final order before a sealed financial consent order is in place can affect pension rights, widow/widower benefits and other marriage-linked benefits if your spouse later dies. Family solicitors commonly discuss sealing the financial order first, then applying for the final order." },
  { question: "Does no-fault divorce change the financial settlement?", answer: "No. The financial settlement is still governed by the Matrimonial Causes Act 1973 section 25 factors. Removing fault from the divorce did not change how courts approach property, pensions, income and capital. Conduct only affects financial outcomes in rare extreme cases." },
  { question: "Can we make a joint application?", answer: "Yes — and many couples do where the separation is amicable. A joint application means neither party is the 'respondent' and the divorce process feels more collaborative. Either party can switch to a sole application later if cooperation breaks down." },
];

const relatedPages = [
  { title: "Decree Absolute vs Final Order UK", description: "How divorce terminology changed in 2022.", href: "/decree-absolute-vs-final-order-uk", badge: "Process" },
  { title: "How Long Does a Divorce Take UK?", description: "Realistic timelines from application to final order.", href: "/how-long-does-a-divorce-take-uk", badge: "Timeline" },
  { title: "Section 25 Factors Divorce UK", description: "How courts weigh financial outcomes.", href: "/section-25-factors-divorce-uk", badge: "Law" },
  { title: "Preview the Full Financial Report", description: "Model your settlement scenarios in minutes.", href: "/unlock", badge: "Report" },
];

export default function NoFaultDivorceUkPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="No-Fault Divorce UK — How It Works in 2026"
      subtitle="Since 6 April 2022, divorce in England and Wales no longer requires fault or separation periods. Here is the full no-fault process — application, conditional order, final order — and how it affects your financial settlement."
      documentTitle="No-Fault Divorce UK 2026 — How It Works | DivorceCalculatorUK"
      metaDescription="No-fault divorce UK explained. Process, 20-week reflection period, conditional and final orders, joint applications, and how the 2022 reforms affect your financial settlement."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "No-Fault Divorce UK", href: "/no-fault-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          No-fault divorce came into force in England and Wales on 6 April 2022 under the Divorce, Dissolution and Separation Act 2020. The reform removed the need to allege adultery or unreasonable behaviour, ended defended divorces in almost all cases, and renamed the two key milestones from 'decree nisi' and 'decree absolute' to 'conditional order' and 'final order'. The legal minimum from application to final order is now around 26 weeks, but most couples take longer because the financial settlement should usually be finalised first.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">The divorce itself is now relatively quick, but the financial settlement is a separate process and usually the harder part. Applying for the final order before a sealed consent order is in place can prejudice pension rights and widow/widower benefits — most solicitors will advise waiting.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Six Stages of a No-Fault Divorce</h2>
        <div className="space-y-4 mb-6">
          {stages.map((s, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{s.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model the Financial Settlement" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Will Need to Apply</h2>
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
            { label: "Sole vs joint application", desc: "Joint applications feel collaborative but require both parties to remain engaged at every stage. If cooperation breaks down, switching to a sole application is possible but adds time and complication." },
            { label: "Timing of the final order", desc: "Applying for the final order before the financial consent order is sealed risks losing pension rights and other benefits if your spouse dies before finances are concluded. The temptation to 'just be divorced' can be expensive." },
            { label: "20-week reflection period", desc: "This is unwaivable. Even where both parties want to move quickly, the 20-week clock runs from the date the court issues the application — which can be later than you submitted it online." },
            { label: "Confusion with the financial process", desc: "The divorce and the financial settlement are two separate court processes. Getting the divorce does not automatically resolve money, and a clean break only exists if a court order says so." },
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
            "When the right time is for you to apply for the final order",
            "Whether a joint or sole application suits your situation better",
            "Whether to negotiate finances before or in parallel with the divorce application",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is a sole or joint application better for our circumstances?</li>
          <li>How should we sequence the divorce application and the financial settlement?</li>
          <li>Are there any pension or insurance reasons to delay the final order?</li>
          <li>Do we need a separation agreement before the divorce application?</li>
          <li>What happens if one of us dies before the final order is granted?</li>
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
