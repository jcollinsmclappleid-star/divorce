import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, PoundSterling } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const steps = [
  { step: "1", title: "Agree the terms in the financial settlement", desc: "The consent order or court order should specify that the property is to be transferred to one party, the price (if any equity payment is involved), and the timeline for the transfer." },
  { step: "2", title: "Instruct a conveyancing solicitor", desc: "A solicitor handles the transfer of legal ownership. Both parties need to sign transfer documents (Land Registry TR1 form). Costs: typically £500–£1,500 for a straightforward transfer." },
  { step: "3", title: "Mortgage lender approval", desc: "If there is a mortgage, the lender must formally consent to the transfer and remove the outgoing party from the mortgage. This typically requires a new mortgage application in the name of the remaining party." },
  { step: "4", title: "Stamp Duty Land Tax", desc: "A transfer of equity on divorce may attract Stamp Duty Land Tax (SDLT) if there is an outstanding mortgage being assumed. However, transfers pursuant to a court order or deed of separation are generally exempt from SDLT. Take specialist advice on your specific situation." },
  { step: "5", title: "Land Registry registration", desc: "The conveyancing solicitor registers the new ownership at the Land Registry. The title is updated to reflect the single owner. The outgoing party is formally removed from the deeds." },
];

const faqItems = [
  {
    question: "What if I can't afford the mortgage on my own?",
    answer: "If you cannot pass the lender's affordability assessment on your sole income, you will not be able to take over the mortgage on a buyout. Options include: using a guarantor (though lenders rarely accept ex-spouses), selling the property, agreeing a deferred sale arrangement (Mesher order), or one party paying the other equity compensation from other assets rather than keeping the property.",
  },
  {
    question: "What is the difference between a transfer of equity and a buyout?",
    answer: "They are effectively the same thing. A 'transfer of equity' is the legal process by which one party's ownership interest is transferred to the other. A 'buyout' describes the financial arrangement, where the party keeping the property pays compensation to the departing party. These are two ways of describing the same transaction.",
  },
  {
    question: "Can I be forced to sign a transfer of equity?",
    answer: "If a court order requires a property to be transferred or sold and one party refuses to sign, the court can appoint a judge to sign the transfer documents on their behalf under Section 39 of the Senior Courts Act 1981. Deliberate refusal to comply with a court order can result in contempt of court proceedings.",
  },
  {
    question: "Does the mortgage lender have a say in the transfer?",
    answer: "Yes — the mortgage lender must consent to any transfer of equity that affects the mortgage. They will assess whether the remaining party can afford the mortgage independently. If they refuse, the property may need to be sold rather than transferred. In practice, lenders are commonly approached early in the process so that affordability requirements are understood before terms are agreed.",
  },
];

const relatedPages = [
  { title: "Buying Your Partner Out of the House", description: "How a buyout works in practice — costs, mortgage, and equity calculation.", href: "/buying-partner-out-of-house-divorce-uk", badge: "Property" },
  { title: "Both Names on the Mortgage — Divorce", description: "What happens when the mortgage is in joint names and you are separating.", href: "/both-names-on-mortgage-divorce-uk", badge: "Property" },
  { title: "Mortgage Affordability After Separation", description: "What lenders look at for a sole mortgage after divorce.", href: "/divorce-mortgage-affordability-after-separation", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model a transfer of equity alongside the overall settlement.", href: "/unlock", badge: "Report" },
];

export default function TransferOfEquityPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Transfer of Equity in Divorce UK: How It Works"
      subtitle="When one party keeps the family home in a divorce, ownership must be legally transferred through a 'transfer of equity'. Here is the complete process — from the consent order to Land Registry registration."
      documentTitle="Transfer of Equity in Divorce UK | DivorceCalculatorUK"
      metaDescription="Understand the transfer of equity process in UK divorce — the legal steps, mortgage lender requirements, Stamp Duty implications, and what to do if one party refuses to sign."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Transfer of Equity in Divorce UK", href: "/transfer-of-equity-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          When a couple divorces and one party is to keep the family home, the legal ownership of the property must be formally transferred from joint names into one party's sole name. This is called a 'transfer of equity'. It is a legal conveyancing process that runs alongside — and depends upon — the financial consent order.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">The Transfer of Equity Process</h2>
        <div className="space-y-4 mb-6">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-4 p-4 rounded-lg border">
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
        <InlineCTA label="Model a Buyout Scenario with the Settlement Calculator" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative Example: Costs of a Transfer</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Scenario: £350,000 property with £150,000 mortgage remaining</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Home className="w-4 h-4 text-primary" /><span>Net equity: £200,000 — 50% share to departing party: £100,000</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>Conveyancing solicitor fees: £800–£1,500</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>Mortgage arrangement fee (if remortgaging): £0–£2,000</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>Land Registry fee: typically £135–£295</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>SDLT: Often exempt where transfer is pursuant to a court order — seek specialist advice</span></div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Key Mortgage Considerations</h2>
        <div className="space-y-3 mb-6">
          {[
            "The remaining party must pass affordability checks on their sole income — including any spousal maintenance assumption being relied on",
            "The mortgage lender must formally agree to release the departing party from the mortgage liability",
            "You may need to remortgage to a new product to achieve the release — which may be at a higher rate than the current deal",
            "If the existing mortgage is in a fixed rate period, early repayment charges may apply to a remortgage",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              {item}
            </div>
          ))}
        </div>
        <InlineCTA label="Check Your Mortgage Affordability Calculation" />
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
