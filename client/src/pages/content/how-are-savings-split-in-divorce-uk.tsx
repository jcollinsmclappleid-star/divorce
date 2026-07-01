import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PiggyBank, AlertTriangle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const matrimonialSavings = [
  "Current accounts and easy-access savings accounts in either party's sole name",
  "Cash ISAs accumulated during the marriage",
  "Fixed-term savings bonds and notice accounts",
  "Premium Bonds (valued at face value of invested amount)",
  "Cash held in investment platforms or stockbroking accounts",
];

const steps = [
  { step: "1", title: "Identify all savings", desc: "Full financial disclosure (Form E) requires both parties to list every savings account, balance, and 12 months of statements. This is a legal obligation — concealing savings is contempt of court." },
  { step: "2", title: "Categorise as matrimonial or non-matrimonial", desc: "Savings clearly accumulated before marriage, or received as inheritance and kept entirely separate, may be argued as non-matrimonial. Anything built up from marital income is matrimonial." },
  { step: "3", title: "Consider the overall settlement", desc: "Savings are rarely divided in isolation. A party who keeps the family home may receive a smaller share of savings; a party who loses their pension share may receive more savings to compensate." },
];

const faqItems = [
  {
    question: "Are savings in my sole name protected in divorce?",
    answer: "No. Savings built up from marital income are matrimonial assets regardless of whose name they are in. The account owner is irrelevant — what matters is when and how the savings were accumulated.",
  },
  {
    question: "Can I withdraw my savings before divorce proceedings?",
    answer: "You can, but courts look back at transactions and can treat withdrawn funds as if they still exist. Dissipating assets to put them beyond the settlement is treated very seriously and can result in adverse findings against you.",
  },
  {
    question: "What about savings in a joint account?",
    answer: "Joint savings are clearly matrimonial. The balance should ideally be frozen by agreement on separation and divided as part of the overall settlement. Unilaterally emptying a joint account is viewed negatively by courts.",
  },
  {
    question: "Do savings affect spousal maintenance?",
    answer: "Yes — if one party has significant savings, their ability to generate income from those savings is taken into account when assessing spousal maintenance needs. Large savings may reduce the amount or duration of maintenance awarded.",
  },
  {
    question: "Can savings be offset against pension?",
    answer: "Yes. Pension offsetting is a common approach — one party keeps savings while the other keeps (or takes a larger share of) the pension. A specialist pension actuary can help calculate whether the values are truly equivalent.",
  },
  {
    question: "What if one party has hidden savings?",
    answer: "Courts take financial disclosure extremely seriously. You can request bank statements as part of the disclosure process, apply for third-party disclosure orders requiring banks to produce records directly, or instruct a forensic accountant. Courts can draw adverse inferences and increase your award if they believe concealment has occurred.",
  },
];

const relatedPages = [
  { title: "How Are Investments Divided in Divorce UK?", description: "Shares, ISAs, and portfolios — how they are valued and split.", href: "/how-are-investments-divided-in-divorce-uk", badge: "Assets" },
  { title: "Joint Bank Accounts After Divorce UK", description: "What to do with joint accounts at separation and during proceedings.", href: "/joint-bank-accounts-after-divorce-uk", badge: "Assets" },
  { title: "Divorce Financial Settlement Calculator UK", description: "Model savings, property, and pension trade-offs.", href: "/divorce-financial-settlement-calculator-uk", badge: "Calculator" },
  { title: "Preview the Full Financial Report", description: "Include savings in your full settlement model.", href: "/unlock", badge: "Report" },
];

export default function SavingsSplitPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="How Are Savings Split in Divorce UK?"
      subtitle="Savings accumulated during a marriage are treated as matrimonial assets and subject to division. Equal sharing is the starting point — but courts have wide discretion to depart from this based on need, contributions, and marriage length."
      documentTitle="How Are Savings Split in Divorce UK? | DivorceCalculatorUK"
      metaDescription="Learn how savings are divided in divorce in England and Wales. Matrimonial vs pre-marital savings, what you can protect, and how hidden savings are handled."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "How Are Savings Split in Divorce UK?", href: "/how-are-savings-split-in-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          In English and Welsh divorce law, any savings built up during the marriage are generally treated as jointly owned, regardless of whose name the account is in. The starting point is equal sharing, but courts have wide discretion to depart from this based on each party's financial needs, contributions, and the length of the marriage.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What Savings Count as Matrimonial Assets?</h2>
        <ul className="space-y-2 mb-4">
          {matrimonialSavings.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <PiggyBank className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-amber-800 mb-1">Pre-Marital Savings</p>
            <p className="text-sm text-amber-700">Savings that clearly predate the marriage — and can be evidenced by bank statements — have a stronger argument for non-matrimonial treatment. However, in longer marriages or where financial need is high, courts may still include them. The longer a marriage and the greater the other party's need, the harder it becomes to keep them separate.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">How Savings Are Actually Divided</h2>
        <p className="text-muted-foreground text-sm mb-4">Courts follow the same Section 25 Matrimonial Causes Act 1973 framework as for all assets. The typical approach:</p>
        <div className="space-y-4 mb-6">
          {steps.map((s) => (
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

        <div className="p-5 bg-background rounded-lg border mb-4">
          <p className="text-sm font-semibold mb-2">Real-World Example</p>
          <p className="text-sm text-muted-foreground">Neil and Sharon are divorcing after 10 years. Neil has £35,000 in a personal savings account (largely built up during the marriage). Sharon has £8,000 in her own ISA. They have no children and both work full-time. Their savings are treated as matrimonial — total £43,000. Starting from equal shares (£21,500 each), there is a modest adjustment to reflect Sharon's lower earnings. The final split is £18,000 to Neil, £25,000 to Sharon — modelling this in a divorce financial settlement calculator helped them reach this without solicitor negotiations.</p>
        </div>

        <InlineCTA label="Model Your Savings Division" />
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
