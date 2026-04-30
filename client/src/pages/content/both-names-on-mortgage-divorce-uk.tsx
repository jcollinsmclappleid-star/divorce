import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const options = [
  { title: "Option 1: Sell the Property and Redeem the Mortgage", desc: "The most straightforward outcome. The property is sold, the mortgage is redeemed from the proceeds, and any remaining equity is divided between the parties according to the settlement. Both parties are released from the mortgage obligation on completion of the sale." },
  { title: "Option 2: One Party Buys the Other Out (Transfer of Equity)", desc: "One spouse pays the other their share of the equity and takes over full ownership of the property. For the non-remaining party to be released from the mortgage, the remaining party must apply to the lender to transfer the mortgage into their sole name. If the remaining party cannot meet the affordability criteria alone, the lender may refuse to release the other party." },
  { title: "Option 3: Temporarily Retain the Joint Mortgage", desc: "In some cases — particularly where children are present — the property may remain in joint names for a period, with one party continuing to live in it. A formal legal arrangement (often a Mesher Order) governs the deferral. Both remain liable to the lender throughout this period." },
];

const steps = [
  "Agree on the property value (instruct an independent valuation if disputed)",
  "Calculate the equity (value minus outstanding mortgage and selling costs)",
  "Agree the split of equity (may not be 50/50 depending on circumstances)",
  "Raise the funds to pay the other party — either from savings or by remortgaging",
  "Apply to the lender to remove the other party from the mortgage",
  "Complete the legal transfer of ownership (via a solicitor)",
  "Have the financial settlement formalised in a consent order",
];

const faqItems = [
  {
    question: "Can I be forced off a joint mortgage without my consent?",
    answer: "Not without a court order or lender agreement. However, a court can order a transfer of equity and require the lender to reassess the mortgage.",
  },
  {
    question: "What if my ex refuses to pay their share of the mortgage?",
    answer: "The lender will pursue both parties. Contact the lender immediately if mortgage payments are at risk. You may need to apply for a court order to force sale or transfer. You could also pay to protect your credit record and seek reimbursement through the courts.",
  },
  {
    question: "How long does a transfer of equity take?",
    answer: "Typically 4–12 weeks from lender application, though remortgaging can take longer. The legal transfer is handled by a solicitor.",
  },
  {
    question: "What if the property is in negative equity?",
    answer: "If the property is worth less than the outstanding mortgage, selling does not clear the debt. Both parties remain liable for the shortfall unless the lender agrees otherwise. Options include continuing to hold until values recover, one party taking on the debt, or negotiating with the lender.",
  },
  {
    question: "Can one party stay in the property without re-mortgaging immediately?",
    answer: "Yes — but this is a risk for the party not living there. Until the mortgage is transferred, both parties remain jointly liable. The non-occupying party's credit can be affected if payments are missed, and their ability to get a new mortgage may be restricted while the joint mortgage is outstanding.",
  },
];

const relatedPages = [
  { title: "Who Pays the Mortgage During Divorce UK?", description: "Practical guide to mortgage payments during the divorce process.", href: "/who-pays-mortgage-during-divorce-uk", badge: "Mortgage" },
  { title: "Can I Force Sale of House After Divorce UK?", description: "Your legal options if your ex won't agree to sell.", href: "/can-i-force-sale-of-house-after-divorce-uk", badge: "Property" },
  { title: "Buying Partner Out of House in Divorce UK", description: "Step-by-step guide to buying out your partner's equity share.", href: "/buying-partner-out-of-house-divorce-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Compare sale, buyout and deferred scenarios with your property figures.", href: "/unlock", badge: "Report" },
];

export default function BothNamesOnMortgagePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Both Names on Mortgage in Divorce UK: Your Options"
      subtitle="If both names are on the mortgage, you are both legally liable to the lender — regardless of what your divorce settlement says. Divorce does not change your mortgage contract. Here's what you can do."
      documentTitle="Both Names on Mortgage in Divorce UK | DivorceCalculatorUK"
      metaDescription="Learn your options when both names are on the mortgage in a UK divorce — selling, transfer of equity, buyout, forced sale, and what happens if your ex stops paying."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Both Names on Mortgage in Divorce UK", href: "/both-names-on-mortgage-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A mortgage is a contract between you, your spouse, and the lender. Your divorce does not change that contract. The lender is not bound by your divorce settlement. Both parties remain fully liable for the mortgage debt until the property is sold and the mortgage is redeemed, the mortgage is transferred into one name with lender approval, or the mortgage is refinanced in a sole name.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">If your ex stops paying their share of the mortgage, your credit record is affected — and the lender can pursue you for the full amount. Both parties remain jointly and severally liable until the mortgage is redeemed or transferred.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Your Three Main Options</h2>
        <div className="space-y-4 mb-6">
          {options.map((o, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Home className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{o.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{o.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Property Settlement" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Buying Your Partner Out: Step-by-Step</h2>
        <div className="space-y-3 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <p className="text-sm text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-6">Figures Needed to Assess Your Options</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Current property market value",
            "Outstanding mortgage balance",
            "Estimated sale costs (agent + legal — typically 3%)",
            "Net equity (value minus mortgage minus costs)",
            "Gross income of the party who may take on the mortgage",
            "Lender's affordability multiplier (typically 4–4.5× income)",
            "Monthly mortgage payment at current rate",
            "Rental cost in the area as a comparison",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Financial Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Affordability of sole re-mortgage", desc: "The most common obstacle to a buyout is that the remaining party cannot qualify for a sole mortgage large enough to buy out the other. Lenders typically require 4–4.5× annual gross income. On a £250,000 mortgage, that means needing a gross income of around £55,000–£62,500." },
            { label: "Joint mortgage affecting new borrowing", desc: "Until the joint mortgage is transferred or redeemed, the non-occupying party remains liable for the full debt. This counts against them in any future mortgage application, as lenders factor in 100% of joint mortgage commitments." },
            { label: "Mortgage payments during the process", desc: "Someone must maintain the mortgage payments throughout proceedings. Missed payments affect both credit records and can trigger lender action independently of the divorce process." },
            { label: "Negative equity trap", desc: "If the property value has fallen below the outstanding mortgage balance, neither party can sell without crystallising a debt. This creates a difficult situation requiring lender cooperation or holding the property until values recover." },
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
            "Whether a lender will approve a sole re-mortgage — this requires a mortgage assessment",
            "What a court would order regarding the property if the parties cannot agree",
            "The specific tax implications of the transfer — professional advice may be needed",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Based on my income, could I realistically qualify for a sole re-mortgage?</li>
          <li>What are the options if neither of us can afford to buy the other out?</li>
          <li>If we keep the property jointly for a period, what legal arrangement should govern this?</li>
          <li>How should the equity split be reflected in the consent order?</li>
        </ul>
        <InlineCTA label="Compare Sale and Buyout Scenarios in the Calculator" />
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
