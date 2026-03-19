import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Gavel } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Can I simply refuse to engage with financial settlement proceedings?",
    answer: "You can refuse to engage, but courts will proceed without you. The other party can apply for a financial remedy order and the court will decide the settlement based on the information available. You will be worse off by refusing to engage, as the court will not have your side of the story.",
  },
  {
    question: "Can I refuse a consent order I previously agreed to?",
    answer: "Before it is approved by the court, you can withdraw your agreement — though this has costs implications if you change your mind unreasonably. Once the court has approved the consent order, it is legally binding and you cannot simply refuse it. Non-compliance is contempt of court.",
  },
  {
    question: "What if the proposed settlement is genuinely unfair?",
    answer: "If you believe a proposed settlement is unfair, the right response is to make counter-proposals — not to refuse to engage at all. Explain your position, provide evidence, and negotiate. Engaging with the process gives you the best chance of a fair outcome. Refusing to engage undermines your position.",
  },
  {
    question: "Can I delay the financial settlement process?",
    answer: "Courts have strict timetables and can penalise delay tactics with cost orders. Courts can also make unless orders — if a party fails to comply by a deadline, they are barred from taking further steps in the proceedings. Deliberate delay is taken very seriously.",
  },
];

const relatedPages = [
  { title: "My Ex Doesn't Agree With the Settlement UK", description: "What to do when your ex is being unreasonable.", href: "/ex-doesnt-agree-settlement-uk", badge: "Process" },
  { title: "Financial Remedy Proceedings UK", description: "How courts handle financial settlements when parties cannot agree.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
  { title: "Can I Divorce Without a Financial Settlement UK?", description: "The risks of avoiding the financial settlement process entirely.", href: "/can-i-divorce-without-financial-settlement-uk", badge: "Process" },
];

export default function RefuseSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Can I Refuse a Divorce Financial Settlement UK?"
      subtitle="Refusing to engage with the financial settlement process does not make the problem go away — it typically makes your position worse. Courts can proceed without you and impose a settlement regardless."
      documentTitle="Can I Refuse a Divorce Financial Settlement UK? | DivorceCalculatorUK"
      metaDescription="What happens if you refuse to engage with a divorce financial settlement in England and Wales — courts can proceed without you and impose a settlement."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Can I Refuse a Divorce Financial Settlement UK?", href: "/can-i-refuse-divorce-financial-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          You cannot simply refuse to participate in the financial settlement process and expect the problem to disappear. In England and Wales, once a financial application has been filed with the court, the process proceeds regardless of whether one party wants it to. Courts have powers to proceed in a party's absence, to compel disclosure, and to make financial orders without the non-cooperating party's consent.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Refusing to Engage Makes Your Position Worse</p>
                <p className="text-sm text-amber-700">If you do not participate, the court will not have your evidence or your account of the circumstances. The judgment will be made on the other party's evidence alone, and courts will draw inferences from non-participation. You will also typically face adverse cost orders for wasting the court's time and the other party's resources.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What Courts Can Do if You Refuse to Cooperate</h2>
        <div className="space-y-4 mb-6">
          {[
            { icon: Gavel, title: "Proceed in your absence", desc: "If you fail to attend a court hearing, the court can proceed without you and make orders in your absence. These are fully enforceable." },
            { icon: Gavel, title: "Compel disclosure from third parties", desc: "Courts can obtain financial information directly from your bank, employer, HMRC, and pension providers. Your refusal to disclose does not prevent the court from getting the information." },
            { icon: Gavel, title: "Draw adverse inferences", desc: "If you refuse to disclose or refuse to attend, courts can draw adverse inferences — treating non-participation as evidence of hidden assets and making orders accordingly." },
            { icon: Gavel, title: "Make unless orders", desc: "Courts can make an 'unless order' — if you fail to comply by a deadline, you are barred from taking further steps in the proceedings. This effectively hands the case to the other party." },
            { icon: Gavel, title: "Cost orders", desc: "Unreasonable non-cooperation results in adverse cost orders. You may be ordered to pay the other party's legal costs as well as your own." },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg border">
              <item.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-0.5">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What You Should Do Instead</h2>
        <p className="text-muted-foreground text-sm mb-4">If you are unhappy with what is being proposed, the constructive responses are:</p>
        <div className="space-y-3 mb-6">
          {[
            "Make counter-proposals and explain your reasoning with evidence",
            "Attend mediation or a MIAM and try to reach an agreement",
            "Engage a solicitor to represent your interests and negotiate on your behalf",
            "Participate in court proceedings and present your case to the judge",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              {item}
            </div>
          ))}
        </div>
        <InlineCTA label="Understand What a Fair Settlement Looks Like" />
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
