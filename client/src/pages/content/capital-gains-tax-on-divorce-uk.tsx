import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calculator, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const rules = [
  { title: "Three-year window for no-gain/no-loss transfers", desc: "Following changes that took effect in April 2023, transfers of assets between separating spouses can be made on a no-gain/no-loss basis for up to three full tax years after the year of permanent separation. This gives much more time than the previous tax-year-end rule." },
  { title: "Extended window for transfers under a formal court order", desc: "Where assets are transferred under a formal divorce financial order or agreement, the no-gain/no-loss treatment can apply beyond the standard three-year window in certain circumstances — but conditions apply and the rules are technical. The receiving spouse takes on the original acquisition cost, so any latent gain remains in that asset until disposal. Take qualified tax advice on whether your specific transfer qualifies." },
  { title: "Principal Private Residence (PPR) relief and the family home", desc: "PPR relief usually exempts your main home from CGT. After separation, the spouse who moves out can still claim PPR for the period they lived there plus an additional period — and election rules apply where the property is being transferred to the remaining spouse." },
  { title: "CGT on second properties and investment assets", desc: "Buy-to-lets, shares held outside ISAs, second homes and other investment assets can trigger CGT when sold or transferred outside the no-gain/no-loss window. Understanding the latent gain in each asset matters when deciding who keeps what." },
  { title: "Annual exempt amount", desc: "Each individual has an annual CGT-free allowance (currently a relatively small amount). Larger gains realised on a sale are taxed above this allowance at the prevailing CGT rates, which differ for residential property and other assets." },
  { title: "Stamp Duty Land Tax (SDLT) — separate consideration", desc: "Transfers of property between divorcing spouses under a court order are typically exempt from SDLT, but if one party then buys a new property they may face the higher additional-property rate of SDLT depending on their property holdings at completion." },
];

const figures = [
  "Date of permanent separation (the trigger for the three-year window)",
  "Original acquisition cost of each asset (purchase price plus costs)",
  "Current market value of each asset",
  "Likely sale costs (estate agent + legal for property)",
  "Any improvement expenditure that increases the base cost",
  "Each party's available CGT annual exempt amount",
  "Whether each party will be a basic-rate or higher-rate taxpayer in the year of disposal",
  "Whether the family home qualifies for full PPR relief or partial",
];

const faqItems = [
  {
    question: "Do I pay capital gains tax when transferring our family home to my spouse?",
    answer: "Often not, but it depends on the facts. The family home is normally covered (in whole or in part) by Principal Private Residence relief, and inter-spouse transfers within the no-gain/no-loss window do not crystallise a gain. There are important nuances — particularly where one spouse moved out well before the transfer, or where the property has periods of letting — that can change the position. Take qualified tax advice on the specifics.",
  },
  {
    question: "What is the no-gain/no-loss rule and how long does it apply?",
    answer: "Transfers of assets between separating spouses can be made without triggering CGT for up to three full tax years following the year of permanent separation. An extended period can apply where the transfer is made under a formal court order or divorce agreement, but conditions apply and the position is technical. In all cases the receiving spouse inherits the transferring spouse's original cost base, so the latent gain remains in the asset until eventual disposal. Take qualified tax advice on your specific situation.",
  },
  {
    question: "What happens if we sell a buy-to-let as part of the settlement?",
    answer: "A sale to a third party crystallises the gain. The gain is the sale proceeds (less costs) minus the original acquisition cost (plus any improvement expenditure). Each owner's share of the gain is taxed individually, after the annual exempt amount, at residential property CGT rates — which are higher than rates for other assets. A qualified accountant can model the exact figure.",
  },
  {
    question: "Are pension transfers subject to CGT?",
    answer: "No. Pension sharing orders and pension transfers between separating spouses do not trigger CGT. Pension benefits remain in the pension wrapper and are taxed only when drawn in retirement.",
  },
  {
    question: "What about stocks, shares and investments?",
    answer: "Outside ISAs, listed shares and other investment assets are subject to CGT on disposal. Inter-spouse transfers within the no-gain/no-loss window do not trigger CGT — the receiving spouse takes on the original acquisition cost. Sales to third parties trigger gains in the normal way.",
  },
  {
    question: "Should we time disposals to minimise CGT?",
    answer: "Sometimes. Timing across tax years to use both annual exempt amounts, or completing transfers within the no-gain/no-loss window, can reduce overall tax. CGT planning is technical and the savings can be material — qualified tax advice is usually worthwhile where significant gains are involved.",
  },
];

const relatedPages = [
  { title: "How is Property Divided in Divorce UK?", description: "Property division options and tax considerations.", href: "/how-is-property-divided-in-divorce-uk", badge: "Property" },
  { title: "Transfer of Equity in Divorce UK", description: "The legal process for transferring property between spouses.", href: "/transfer-of-equity-divorce-uk", badge: "Property" },
  { title: "How are Investments Divided in Divorce UK?", description: "Splitting ISAs, shares and investment portfolios.", href: "/how-are-investments-divided-in-divorce-uk", badge: "Investments" },
  { title: "Preview the Full Financial Report", description: "Model net-of-tax settlement scenarios with your figures.", href: "/unlock", badge: "Report" },
];

export default function CapitalGainsTaxDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Capital Gains Tax on Divorce UK"
      subtitle="Asset transfers between separating spouses can be made without triggering CGT — but the rules are time-sensitive and often misunderstood. Understanding the CGT picture matters because it changes the real value of any settlement."
      documentTitle="Capital Gains Tax on Divorce UK | DivorceCalculatorUK"
      metaDescription="How capital gains tax applies to UK divorce — the no-gain/no-loss window, principal private residence relief, transfers under court orders, and the assets where CGT really matters."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Capital Gains Tax on Divorce UK", href: "/capital-gains-tax-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Capital gains tax (CGT) often determines the real, after-tax value of a divorce settlement — yet it is one of the most overlooked elements. The rules changed significantly in April 2023, giving separating spouses a much longer window to transfer assets between themselves on a no-gain/no-loss basis. Where assets like buy-to-lets, second homes, or non-ISA investments are involved, the CGT picture can shift the negotiation materially.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">CGT on divorce is technical and the rules changed materially in April 2023. This guide outlines the framework only — qualified tax advice from a chartered accountant or tax specialist is normally needed before completing any disposal or transfer.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Six Things That Matter</h2>
        <div className="space-y-4 mb-6">
          {rules.map((r, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Calculator className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{r.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Your Settlement Net of Tax" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures You Will Need to Assess CGT</h2>
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
            { label: "Latent gains on second properties", desc: "Buy-to-lets and second homes purchased years ago may have substantial latent gains. The party who keeps such an asset takes on the future CGT liability — this should be reflected in the asset valuation when negotiating the split." },
            { label: "Missing the no-gain/no-loss window", desc: "Although the window is now much longer (three years from end of separation tax year), in some cases — particularly where separation predates April 2023 or transfers drag on — careful timing is needed. Acting outside the window can crystallise gains that need not have been triggered." },
            { label: "PPR relief on the family home", desc: "Where one spouse moved out years ago, the period away from the home may not all qualify for PPR relief. Specific elections and the historical occupation pattern can change the CGT outcome significantly." },
            { label: "Stamp Duty Land Tax on the next purchase", desc: "If one spouse uses settlement money to buy another property while still owning a share of the matrimonial home, the higher additional-property SDLT rate may apply. Sequencing of completions can matter." },
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
            "The exact CGT liability on your specific assets — this requires qualified tax advice",
            "Whether a particular transfer will qualify for no-gain/no-loss treatment in your case",
            "The most tax-efficient sequencing of disposals across tax years",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Which of our assets carry latent CGT, and what's the size of the liability?</li>
          <li>Are we still inside the no-gain/no-loss window for asset transfers between us?</li>
          <li>How does PPR relief apply to the family home given our occupation history?</li>
          <li>If I buy a new home before the settlement completes, do I face the additional SDLT rate?</li>
          <li>Is there a tax-efficient sequencing of disposals we should plan for?</li>
        </ul>
        <InlineCTA label="Compare Net-of-Tax Scenarios in the Calculator" />
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
