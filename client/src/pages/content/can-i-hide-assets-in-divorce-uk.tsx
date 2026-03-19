import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Search } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const tactics = [
  "Transferring assets to friends, family members, or business associates before proceedings",
  "Undervaluing property, businesses, or other assets",
  "Creating fictitious debts or loans to reduce the apparent value of assets",
  "Claiming assets have been spent or lost without evidence",
  "Delaying receipt of bonuses, contracts, or income until after the settlement",
  "Moving assets offshore or into complex corporate structures",
  "Purchasing physical assets (art, jewellery, cryptocurrency) that are harder to trace",
];

const detected = [
  "Form E financial disclosure covers 12 months of bank statements — unusual cash withdrawals and transfers are visible",
  "Courts can order disclosure from third parties — banks, employers, HMRC, accountants",
  "Courts can order a forensic accountant to investigate business accounts and complex financial structures",
  "HMRC records are available to courts and can be requested if income appears artificially low",
  "Courts have powers to freezing assets (freezing orders) to prevent dissipation before settlement",
];

const faqItems = [
  {
    question: "If my spouse hides assets and I can't prove it, what can I do?",
    answer: "You can ask the court to draw an adverse inference — meaning the court can treat the omission as evidence that hidden assets exist and adjust the settlement accordingly. Courts are experienced in recognising disclosure that appears incomplete. Keep all evidence of lifestyle, assets, and income during the marriage as this creates context.",
  },
  {
    question: "What if my spouse transferred assets to a family member before divorce?",
    answer: "Courts can set aside transactions made to defeat a financial remedy claim. This is called an 'avoidance of disposition' — the court can undo the transfer and treat the asset as if it still belongs to the person who transferred it. Time limits apply but courts can look back significantly.",
  },
  {
    question: "Is it legal to document my spouse's assets before they know about the divorce?",
    answer: "Gathering information that is legitimately available to you is generally acceptable — for example, looking at household bank statements you have access to or noting assets visible in the home. Accessing accounts without permission or covertly recording private conversations is potentially unlawful. Take legal advice on this.",
  },
];

const relatedPages = [
  { title: "Spouse Refuses Financial Disclosure UK", description: "What to do when your ex won't cooperate with disclosure.", href: "/spouse-refuses-financial-disclosure-uk", badge: "Disclosure" },
  { title: "Financial Disclosure in UK Divorce", description: "The legal duty of full and frank disclosure.", href: "/financial-disclosure-divorce-uk", badge: "Process" },
  { title: "Financial Remedy Proceedings UK", description: "How court proceedings compel disclosure and set consequences.", href: "/financial-remedy-proceedings-uk", badge: "Process" },
];

export default function HideAssetsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Can I Hide Assets in Divorce UK? The Legal Reality"
      subtitle="Hiding assets in UK divorce is a serious breach of the duty of full and frank disclosure. Courts have extensive powers to detect concealment — and the consequences for those caught are severe."
      documentTitle="Can I Hide Assets in Divorce UK? What the Law Says | DivorceCalculatorUK"
      metaDescription="The legal reality of hiding assets in UK divorce — why courts detect concealment, the consequences, and what you can do if you suspect your spouse is hiding assets."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Can I Hide Assets in Divorce UK?", href: "/can-i-hide-assets-in-divorce-uk" },
      ]}
    >
      <ContentSection>
        <Card className="border-red-200 bg-red-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800 mb-1">This is not a strategy guide</p>
                <p className="text-sm text-red-700">The honest answer to "can I hide assets?" is no. Courts have extensive powers to detect non-disclosure, and the consequences — adverse costs orders, adverse inferences in the settlement, contempt of court, and potentially criminal sanctions — far outweigh any perceived benefit. This page explains the reality, so you can protect yourself if you suspect your spouse is hiding assets.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-muted-foreground leading-relaxed mb-6">
          Both parties in divorce proceedings have a legal duty of full and frank disclosure — an obligation to disclose all assets, income, debts, and financial resources, proactively and honestly. Failing to do so is not a technicality — it is a serious legal breach that courts take very seriously.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Common Concealment Tactics (and Why They Fail)</h2>
        <ul className="space-y-2 mb-4">
          {tactics.map((item, i) => (
            <li key={i} className="flex items-start gap-2 p-3 rounded-lg border text-sm text-muted-foreground">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">How Concealment Is Detected</h2>
        <ul className="space-y-2 mb-6">
          {detected.map((item, i) => (
            <li key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <Search className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Consequences of Hiding Assets</h2>
        <div className="space-y-3 mb-6">
          {[
            { title: "Adverse inferences", desc: "Courts can treat incomplete disclosure as evidence of hidden assets and increase the other party's award." },
            { title: "Setting aside the order", desc: "If concealment is discovered after the settlement, the order can be set aside even years later." },
            { title: "Adverse costs orders", desc: "The court can order the non-disclosing party to pay a greater share (or all) of the legal costs." },
            { title: "Contempt of court", desc: "Breach of a court disclosure order can result in committal — a serious criminal sanction." },
          ].map((item, i) => (
            <Card key={i} className="border-red-100">
              <CardContent className="pt-5 space-y-1">
                <p className="text-sm font-semibold text-red-700">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Settlement With Full, Accurate Figures" />
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
