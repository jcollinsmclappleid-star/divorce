import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, Calculator, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const steps = [
  { step: "1", title: "Get an independent property valuation", desc: "Commission a RICS-qualified surveyor to value the property. This provides an agreed starting point. If you and your ex cannot agree on a valuation, each instructing their own surveyor and taking the average is a common approach." },
  { step: "2", title: "Calculate your partner's equity share", desc: "Equity = property value minus outstanding mortgage minus selling costs (usually 1–2% of value). The equity share may not be 50/50 — it will reflect the terms of the overall settlement." },
  { step: "3", title: "Raise the funds to pay them out", desc: "You can fund the buyout through personal savings, re-mortgaging the property (borrowing against the equity to release cash), or a combination. The key test is whether you can afford the mortgage as a sole applicant." },
  { step: "4", title: "Apply to the lender for a transfer of equity", desc: "Your mortgage lender must agree to remove your ex from the mortgage and add you as the sole borrower. They will reassess your affordability as a sole applicant based on your income. This is not guaranteed — seek a mortgage in principle first." },
  { step: "5", title: "Complete the legal transfer", desc: "A solicitor handles the transfer of legal ownership at the Land Registry. You pay Stamp Duty Land Tax (SDLT) on the value of the equity share you receive in the transfer (not the full property value)." },
  { step: "6", title: "Formalise in a consent order", desc: "The buyout must be captured in a legally binding consent order as part of the overall settlement. This ensures neither party can make future claims." },
];

const faqItems = [
  {
    question: "Can I buy out my partner without remortgaging?",
    answer: "If you have sufficient savings or other assets to pay your partner their equity share, you do not have to remortgage. However, the mortgage may still need to be transferred into your sole name — which requires lender approval even without additional borrowing.",
  },
  {
    question: "What if the lender won't lend me enough to buy out my partner?",
    answer: "If you cannot pass affordability as a sole borrower, the lender will not release your partner from the mortgage. In that case, you may need to consider a guarantor, wait until income increases, or explore whether a family member can assist. If it is not possible, the property may need to be sold.",
  },
  {
    question: "Can my ex force me to sell rather than allow a buyout?",
    answer: "If you cannot agree, either party can ask the court to decide. Courts can order a buyout or a sale depending on all the circumstances — housing needs, children, affordability, and what is most practical.",
  },
  {
    question: "Do I pay Stamp Duty on a buyout?",
    answer: "Stamp Duty Land Tax (SDLT) applies to the value of equity you receive in a transfer of equity. Rates depend on whether it is your main residence, whether you own other properties, and the total value. Take advice from a conveyancing solicitor on SDLT implications before completing.",
  },
  {
    question: "How long does a buyout take from start to finish?",
    answer: "Typically 3–5 months from agreement to completion, though this varies. The mortgage transfer and re-mortgage process takes 4–8 weeks, and the legal transfer adds further time. Getting agreement on valuation and equity split is often the longest part.",
  },
];

const relatedPages = [
  { title: "Both Names on Mortgage in Divorce UK", description: "The full picture of your options when both names are on the mortgage.", href: "/both-names-on-mortgage-divorce-uk", badge: "Mortgage" },
  { title: "Divorce Mortgage Affordability After Separation", description: "How to assess whether you can afford the mortgage alone.", href: "/divorce-mortgage-affordability-after-separation", badge: "Affordability" },
  { title: "Divorce Financial Settlement Calculator UK", description: "Model the buyout and the overall settlement in numbers.", href: "/divorce-financial-settlement-calculator-uk", badge: "Calculator" },
  { title: "Preview the Full Financial Report", description: "Compare buyout vs sale scenarios with your own property figures.", href: "/unlock", badge: "Report" },
];

export default function BuyingPartnerOutPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Buying Your Partner Out of the House in Divorce UK"
      subtitle="Buying out your partner's share of the family home is one of the most common divorce financial arrangements. Here is the complete step-by-step guide: valuation, equity calculation, lender approval, legal transfer, and consent order."
      documentTitle="Buying Partner Out of House in Divorce UK | DivorceCalculatorUK"
      metaDescription="Learn how to buy out your partner's equity share in the family home during divorce in England and Wales — valuation, remortgage, transfer of equity, and consent order explained."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Buying Partner Out of House in Divorce UK", href: "/buying-partner-out-of-house-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A buyout allows one party to stay in the family home by purchasing the other party's share of the equity. It is an alternative to selling the property — and for many families, particularly those with children who want to minimise disruption, it is the preferred outcome. But it is not always possible — affordability is the key constraint.
        </p>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-primary">Equity Calculation Example</p>
            </div>
            <p className="text-sm text-muted-foreground">Property value: £350,000. Outstanding mortgage: £200,000. Selling costs (if relevant): £7,000. Net equity: £143,000. If a 50/50 split, Partner B's share = £71,500. This is the minimum cash needed to buy them out (before SDLT and legal fees).</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Buyout Process: Step by Step</h2>
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
        <InlineCTA label="Model Whether a Buyout Works for You" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures You Will Need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Current market value of the property (RICS valuation)",
            "Outstanding mortgage balance",
            "Estimated selling costs (1–2% of property value)",
            "Net equity (value minus mortgage minus costs)",
            "Agreed equity split percentage",
            "Your gross annual income (for re-mortgage affordability)",
            "Lender's affordability multiple (typically 4–4.5× income)",
            "SDLT calculation on equity transfer value",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Affordability gap on sole re-mortgage", desc: "The most common obstacle. If your income alone cannot support the mortgage balance required, the lender will decline. A £250,000 mortgage typically requires a gross income of £55,000–£62,500." },
            { label: "Valuation disputes", desc: "If you and your ex cannot agree on the property value, the equity calculation is disputed. Instructing a joint RICS-qualified surveyor or agreeing to average two independent valuations is usually the most efficient resolution." },
            { label: "Ex refusing to cooperate with transfer", desc: "If your ex agrees to the buyout in principle but delays signing documents, you can seek a court order directing them to sign. Deliberate obstruction is taken seriously by courts." },
            { label: "Equity split disagreement", desc: "The buyout can only proceed once the equity split is agreed. If the parties disagree on whether the split is 50/50 or different, the property issue must be resolved as part of the broader financial settlement." },
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
            "Whether a lender will approve your solo re-mortgage — this requires a full mortgage application",
            "The SDLT amount on your specific transfer — a conveyancing solicitor will calculate this",
            "Whether the overall equity split is fair — this is part of the broader financial settlement",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Based on my income, could I qualify for a sole re-mortgage at the required level?</li>
          <li>What SDLT would I pay on the equity transfer in our specific case?</li>
          <li>Should I seek a mortgage in principle before agreeing the buyout in the consent order?</li>
          <li>If the re-mortgage is declined, what are our alternative options?</li>
        </ul>
        <InlineCTA label="Model the Buyout and Remaining Mortgage Payments" />
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
