import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Home } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Sell and split the proceeds", desc: "The simplest route — sell the BTL, settle the mortgage, pay CGT on any gain (no PRR available), and divide the net proceeds. Useful where neither party wants the BTL or where the equity is needed in the wider settlement." },
  { title: "Transfer to one party", desc: "One party takes the BTL, with the equity counted in their share of the matrimonial pot. The mortgage is moved to that party (lender approval required). Stamp duty on the transfer of equity needs to be considered, particularly the 5% additional rate." },
  { title: "Retain jointly post-separation", desc: "Less common but sometimes appropriate where rental income is needed by both parties or where market timing makes sale unattractive. Requires a clear agreement on rental income split, repairs, voids and the sale trigger." },
  { title: "Capital gains tax always applies", desc: "BTL property does not qualify for Principal Residence Relief. CGT applies on any gain on transfer or sale. Spouses can transfer between themselves at no gain/no loss until the end of the third tax year following separation (post-April 2023 rule)." },
  { title: "Stamp duty surcharge complications", desc: "BTL transfers between spouses typically attract the 5% Higher Rates for Additional Dwellings (post-Autumn 2024 rate). Some specific divorce reliefs apply but the position needs careful tax checking — not all transfers qualify." },
  { title: "Mortgage lender approval needed", desc: "Transferring a BTL mortgage to one party requires lender approval. BTL mortgage affordability is assessed on rental income coverage, typically requiring rent to cover 125–145% of mortgage interest at a stressed rate." },
];

const figures = [
  "Property valuation (ideally three independent valuations)",
  "Outstanding BTL mortgage and current interest rate",
  "Original purchase price and dates",
  "Capital improvements receipts (allowable for CGT)",
  "Current rental income and tenancy agreements",
  "Annual operating costs (letting agent, insurance, repairs)",
  "Mortgage redemption penalties / ERCs",
  "Existing CGT base cost calculations",
];

const faqItems = [
  { question: "How is buy-to-let property treated in UK divorce?", answer: "BTL property is part of the matrimonial pot like any other asset. The three main options are sale and division of proceeds, transfer to one party with offset against the wider settlement, or continued joint retention. Tax treatment (CGT, stamp duty) is more complex than for the main residence." },
  { question: "Do we have to pay CGT when transferring BTL between spouses on divorce?", answer: "Transfers between spouses are at 'no gain/no loss' for CGT until the end of the third tax year after separation (post-April 2023 rule). Outside that window, transfers are treated as disposals at market value and CGT applies on any gain. The base cost transfers to the receiving spouse for future disposals." },
  { question: "Is there stamp duty on transferring BTL on divorce?", answer: "Usually yes. BTL transfers between divorcing spouses typically attract the 5% Higher Rates for Additional Dwellings on top of standard SDLT. Specific reliefs may be available where the transfer is pursuant to a court order, but the position is complex and often catches couples out. Specialist tax input is normally needed." },
  { question: "What happens to the BTL mortgage on divorce?", answer: "If the BTL is being transferred to one party, that party must take over the BTL mortgage — which requires lender approval based on rental income coverage at a stressed interest rate. If neither party qualifies on their own, the property may need to be remortgaged with a different lender, sold, or held jointly until refinancing is possible." },
  { question: "Can we keep the BTL jointly after divorce?", answer: "Yes, but it requires a clear agreement. Joint ownership of a BTL after divorce ties the parties together financially indefinitely. Issues to address: rental income split, who manages the property, who pays for repairs, what happens when major works are needed, and the trigger for eventual sale. Most clean-break settlements avoid this." },
  { question: "How is BTL income taxed after divorce?", answer: "Each party reports their share of rental profits on their own tax return. Mortgage interest relief is restricted to a 20% tax credit (since 2020). High earners pay 40% or 45% income tax on net rental profits, materially affecting the after-tax yield. This needs to be modelled when assessing whether to retain BTL." },
];

const relatedPages = [
  { title: "Capital Gains Tax on Divorce UK", description: "How CGT applies across all asset transfers.", href: "/capital-gains-tax-on-divorce-uk", badge: "Tax" },
  { title: "Stamp Duty on Transfer of Equity Divorce UK", description: "SDLT on property transfers in divorce.", href: "/stamp-duty-on-transfer-of-equity-divorce-uk", badge: "Tax" },
  { title: "How is Property Divided in Divorce UK?", description: "Main residence treatment.", href: "/how-is-property-divided-in-divorce-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model BTL settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function BuyToLetDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Buy-to-Let Property on Divorce UK — Tax, Mortgage and Settlement Options"
      subtitle="BTL portfolios add complexity — CGT applies, stamp duty surcharges hit transfers, and BTL mortgages have their own affordability rules. Here are the three main routes and what they actually cost."
      documentTitle="Buy-to-Let Property on Divorce UK | DivorceCalculatorUK"
      metaDescription="Buy-to-let property on divorce UK. CGT, stamp duty surcharge, transfer of equity, BTL mortgage affordability, and the three main settlement options for BTL portfolios."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Buy-to-Let Property on Divorce UK", href: "/buy-to-let-property-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Buy-to-let property in a divorce settlement is more tax-complex than the family home. CGT applies on transfer or sale (no Principal Residence Relief). Stamp duty surcharges typically hit any transfer. And BTL mortgage affordability is assessed differently to residential mortgages — based on rental income coverage at a stressed interest rate, not on personal income alone. Getting the tax and mortgage analysis right is often the difference between a workable settlement and one that unravels at completion.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Spouse-to-spouse 'no gain/no loss' CGT treatment now expires at the end of the third tax year after separation. Where a BTL transfer happens after that window, full CGT applies — often a six-figure liability. Timing matters enormously.</p>
          </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things You Need to Know</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Home className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model BTL Settlement Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Will Need</h2>
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
            { label: "CGT timing window", desc: "Three tax years from separation to use 'no gain/no loss' transfers between spouses. After that, a BTL transfer is a chargeable disposal. The CGT cost can dwarf any 'savings' from delay." },
            { label: "Stamp duty surcharge", desc: "5% Higher Rates for Additional Dwellings hits most BTL transfers, even on divorce. Specific reliefs exist for transfers under court orders but they are narrow and easy to miss." },
            { label: "BTL mortgage affordability", desc: "BTL lenders assess rental income coverage at a stressed rate. A property that is fine on a joint application may not qualify for one party alone, particularly on a higher current interest rate." },
            { label: "Section 24 income tax restrictions", desc: "Mortgage interest is no longer fully deductible against rental income — replaced by a 20% tax credit. High earners face much higher effective tax on rental profits, materially affecting the case for retaining BTL." },
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
            "What CGT base cost and reliefs apply to your specific BTL portfolio",
            "Whether a court-order SDLT relief applies to your transfer",
            "Whether either party will qualify for a sole BTL mortgage",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What CGT will apply on each option (sell, transfer, retain)?</li>
          <li>Does the SDLT additional rate apply, and is any relief available?</li>
          <li>Will the BTL mortgage lender approve the proposed transfer?</li>
          <li>What is the after-tax rental yield for each party?</li>
          <li>Is the timing within the three-year 'no gain/no loss' window?</li>
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
