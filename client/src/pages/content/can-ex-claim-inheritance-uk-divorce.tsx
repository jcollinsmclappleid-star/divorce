import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, AlertTriangle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const includedWhen = [
  "When it was inherited during a long marriage and mixed with joint funds",
  "When it was used to fund the family home or joint lifestyle",
  "When the other party has a significant financial need that cannot otherwise be met",
];

const protectedWhen = [
  "Short marriages where the inheritance clearly predates or is separate from the marital relationship",
  "Inheritance kept entirely separate — never mixed with joint accounts or used for joint purposes",
  "Very recent inheritances received close to or after separation",
];

const protectionSteps = [
  "Keep inherited funds in a separate, sole-name account — never mix with joint accounts",
  "Do not use inherited funds to pay down joint debts or improve joint property",
  "Consider a pre-nuptial or post-nuptial agreement identifying the inheritance as non-matrimonial",
  "Keep documentary evidence — inheritance tax forms, grant of probate, bank statements showing the source and separate handling",
];

const faqItems = [
  {
    question: "Can my ex claim inheritance I received after we separated?",
    answer: "Less likely — but not impossible. If no clean break order has been made, financial claims remain open. Inheritance received after a clear separation date is more likely to be excluded, but courts have discretion. This is another reason why a clean break consent order is essential.",
  },
  {
    question: "Does it matter if the inheritance was from my parents?",
    answer: "No — the source of the inheritance does not determine its treatment. What matters is how it was handled and whether it retained its separate identity.",
  },
  {
    question: "What if I inherited property, not cash?",
    answer: "Inherited property is treated the same way as inherited cash — it may or may not be included depending on the factors above. If the inherited property has been used as the family home or rented out with joint income, ring-fencing becomes harder.",
  },
  {
    question: "Can a pre-nuptial agreement protect inheritance?",
    answer: "Yes — a well-drafted pre-nuptial agreement that specifically identifies inheritance as a non-matrimonial asset is one of the most effective protections. While not automatically binding, courts give significant weight to pre-nuptial agreements made with legal advice and proper disclosure.",
  },
];

const relatedPages = [
  { title: "Is Inheritance Included in Divorce Settlement UK?", description: "The full legal picture on when inheritance features in a settlement.", href: "/is-inheritance-included-in-divorce-settlement-uk", badge: "Assets" },
  { title: "How Are Savings Split in Divorce UK?", description: "How savings and bank accounts are treated in a UK divorce settlement.", href: "/how-are-savings-split-in-divorce-uk", badge: "Assets" },
  { title: "What is a Clean Break Order UK?", description: "How to protect future assets from claims after divorce.", href: "/what-is-a-clean-break-order-uk", badge: "Legal Orders" },
  { title: "Preview the Full Financial Report", description: "See how inheritance fits into the full asset pool model.", href: "/unlock", badge: "Report" },
];

export default function InheritanceClaimPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Can My Ex Claim My Inheritance in UK Divorce?"
      subtitle="Inheritance is not automatically protected from divorce claims in England and Wales. Whether your ex can claim it depends on when you received it, whether you mixed it with joint funds, and the length of your marriage."
      documentTitle="Can My Ex Claim My Inheritance in UK Divorce? | DivorceCalculatorUK"
      metaDescription="Can your ex claim your inheritance in a UK divorce? Learn when inheritance is included or ring-fenced in a financial settlement in England and Wales."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Can My Ex Claim My Inheritance in UK Divorce?", href: "/can-ex-claim-inheritance-uk-divorce" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This is one of the most frequently asked questions about divorce financial settlements — and the answer is not a simple yes or no. In England and Wales, inheritance is not automatically protected from divorce claims. Unlike some other jurisdictions, England and Wales does not provide an automatic 'inheritance exception.' Courts have wide discretion to include any asset when deciding a financial settlement, and the welfare of children and meeting both parties' basic needs always take priority over protecting one party's inheritance.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card className="border-red-200">
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-semibold text-red-700">When Inheritance May Be Included</p>
              <ul className="space-y-2">
                {includedWhen.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-semibold text-green-700">When Inheritance Is More Likely Protected</p>
              <ul className="space-y-2">
                {protectedWhen.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground">The longer the marriage and the greater the other party's financial need, the harder it is to ring-fence an inheritance. Courts have broad discretion, and there is no absolute rule. Where meeting the other party's reasonable financial needs — particularly housing needs for a parent with children — cannot be achieved without including the inheritance, courts may do so.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">How to Protect Your Inheritance</h2>
        <div className="space-y-3 mb-6">
          {protectionSteps.map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-background">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <p className="text-sm text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-4">Whether your inheritance is included or excluded from the settlement will significantly affect the overall outcome. Modelling both scenarios — with and without the inheritance in the pot — using a divorce financial settlement calculator helps you understand what is at stake.</p>

        <InlineCTA label="Model Your Settlement With and Without Inheritance" />
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
