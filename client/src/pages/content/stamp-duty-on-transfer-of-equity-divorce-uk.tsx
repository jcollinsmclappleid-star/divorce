import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Home } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "Family home transfers under court order", desc: "Where a property transfer between divorcing spouses is made under a court order or formal agreement in connection with the divorce, an SDLT exemption is available under FA 2003 Schedule 3 paragraph 3. No SDLT is payable on the transfer of equity itself, regardless of value." },
  { title: "Mortgage assumption is the SDLT trap", desc: "If the spouse taking the property assumes the other's share of the outstanding mortgage, that assumption is treated as 'consideration' for SDLT. Where the assumed mortgage share exceeds the SDLT nil-rate band, SDLT is payable on the excess — even if no cash changes hands." },
  { title: "Buy-to-let and second homes — 5% surcharge applies", desc: "The court-order exemption applies cleanly to the matrimonial home. For BTL or second properties transferred between divorcing spouses, the 5% Higher Rates for Additional Dwellings (HRAD, post-Autumn 2024 rate) typically applies on top of standard SDLT. Specialist tax checking is essential." },
  { title: "Stamp duty in Scotland (LBTT)", desc: "Scotland has its own land transaction tax — Land and Buildings Transaction Tax (LBTT) — administered by Revenue Scotland. Equivalent court-order exemptions exist but the rates and thresholds differ from English SDLT. Welsh property has Land Transaction Tax (LTT)." },
  { title: "Pre-divorce voluntary transfers don't get the exemption", desc: "The court-order exemption requires the transfer to be made pursuant to a court order, formal agreement under section 24 MCA 1973, or in connection with the dissolution. Voluntary transfers between spouses before any divorce proceedings begin do not qualify." },
  { title: "First-time buyer reliefs lost", desc: "If the spouse leaving the home wants to use first-time buyer SDLT relief on a future purchase, owning even a small share of the family home historically can disqualify them. The transfer of equity may make a future purchase fully chargeable to standard SDLT." },
];

const figures = [
  "Property valuation (multiple, ideally three independent)",
  "Outstanding mortgage balance and ownership shares",
  "Whether the transfer is being made under a court order or formal agreement",
  "Whether the property is the main residence, BTL or second home",
  "Each party's existing property holdings (for HRAD analysis)",
  "Marriage and separation dates (for transfer timing)",
  "Future purchase plans for the leaving party",
  "Solicitor's SDLT analysis (essential for non-trivial transfers)",
];

const faqItems = [
  { question: "Do you pay stamp duty on transfer of equity in a divorce?", answer: "For the family home transferred between divorcing spouses under a court order or formal agreement, no SDLT is payable on the transfer itself. However, where the spouse taking the property assumes the other's share of the outstanding mortgage, the assumed mortgage share is treated as 'consideration' for SDLT. If that exceeds the nil-rate band (currently £125,000 for residential property), SDLT is payable on the excess." },
  { question: "What is the court-order SDLT exemption?", answer: "Under Schedule 3 paragraph 3 of the Finance Act 2003, transfers between spouses (or civil partners) made in connection with their divorce, dissolution or annulment — and pursuant to a court order or formal written agreement — are exempt from SDLT on the equity transferred. This is a long-standing relief specifically for matrimonial transfers." },
  { question: "Does the 5% surcharge (HRAD) apply on divorce transfers?", answer: "For the matrimonial home, no — the court-order exemption is clean. For buy-to-let or second properties, the 5% Higher Rates for Additional Dwellings (post-Autumn 2024 rate) typically still applies even on divorce transfers. There are some narrow reliefs but the position is complex and easy to get wrong without specialist tax input." },
  { question: "Can I avoid SDLT by transferring before getting a court order?", answer: "No — that approach removes the very protection you need. The exemption requires the transfer to be made pursuant to a court order, formal agreement, or in connection with the dissolution. A voluntary transfer before proceedings begin is fully chargeable to SDLT (including any HRAD if applicable). Always wait for the formal arrangement to be in place." },
  { question: "How does the transfer of equity affect first-time buyer relief?", answer: "First-time buyer relief is only available to people who have never owned a property anywhere in the world. If you have owned even a share of the family home, you no longer qualify for first-time buyer relief on a future purchase — even after divorce. This can add £5,000–£15,000 to a future purchase cost." },
  { question: "What happens with stamp duty in Scotland and Wales?", answer: "Scotland has Land and Buildings Transaction Tax (LBTT) administered by Revenue Scotland; Wales has Land Transaction Tax (LTT) administered by the Welsh Revenue Authority. Both have equivalent reliefs for divorce transfers but the thresholds and rates differ from English SDLT. Always check the position with a solicitor familiar with the relevant tax regime." },
];

const relatedPages = [
  { title: "Transfer of Equity Divorce UK", description: "The legal process behind property transfers.", href: "/transfer-of-equity-divorce-uk", badge: "Property" },
  { title: "Buying Partner Out of House Divorce UK", description: "How buyouts work financially and legally.", href: "/buying-partner-out-of-house-divorce-uk", badge: "Property" },
  { title: "Buy-to-Let Property on Divorce UK", description: "BTL-specific stamp duty issues.", href: "/buy-to-let-property-on-divorce-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model property settlement scenarios.", href: "/unlock", badge: "Report" },
];

export default function StampDutyTransferEquityPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Stamp Duty on Transfer of Equity in Divorce UK"
      subtitle="Family home transfers under a court order are usually SDLT-exempt — but the assumption of mortgage debt can trigger a charge, and BTL or second-home transfers typically attract the 5% surcharge. Here is what actually applies."
      documentTitle="Stamp Duty on Transfer of Equity Divorce UK | DivorceCalculatorUK"
      metaDescription="Stamp duty on transfer of equity in divorce UK. Court-order exemption, mortgage assumption trap, 5% HRAD surcharge for BTL, Scotland LBTT and Wales LTT, and first-time buyer relief loss."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Stamp Duty on Transfer of Equity Divorce UK", href: "/stamp-duty-on-transfer-of-equity-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Stamp Duty Land Tax (SDLT) on property transfers in divorce is one of the most commonly misunderstood areas of UK divorce tax. The good news for the family home: a long-standing exemption applies to transfers made under a court order or formal agreement in connection with the divorce. The catch: if the spouse taking the home assumes the other's share of the outstanding mortgage, that assumption is treated as 'consideration' for SDLT and may produce a charge. For buy-to-let or second properties, the 5% surcharge typically still applies. Specialist conveyancing and tax input is normally essential for non-trivial transfers.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">The 'mortgage assumption equals SDLT consideration' rule catches couples out repeatedly. On a £600k home with a £400k joint mortgage, transferring to one party means they assume £200k of mortgage from the other. That £200k is SDLT 'consideration' and SDLT is payable on the excess over the nil-rate band — typically £1,500–£3,500. Plan for it.</p>
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
        <InlineCTA label="Model Property Transfer Scenarios" />
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
            { label: "Mortgage assumption traps", desc: "Even where no cash changes hands, taking on the other party's share of the mortgage is SDLT 'consideration'. On any non-trivial mortgage this can produce a charge. Solicitors should always check this." },
            { label: "BTL surcharge confusion", desc: "Many couples assume the divorce exemption covers all properties. It does not — the matrimonial home is generally exempt; BTL and second homes typically attract the 5% HRAD surcharge unless a narrow relief applies." },
            { label: "First-time buyer relief loss", desc: "Once you have owned any share of any property anywhere in the world, you lose first-time buyer status forever. The transfer of equity to your ex makes future purchases fully SDLT-chargeable." },
            { label: "Devolved tax regimes", desc: "Scotland (LBTT) and Wales (LTT) have their own rules that differ from English SDLT. Cross-border couples or properties need specialist input on the relevant regime." },
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
            "Whether your specific transfer qualifies for the court-order SDLT exemption",
            "Whether the 5% HRAD applies to your BTL or second property transfer",
            "How LBTT or LTT differs from SDLT for your specific property",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Will mortgage assumption trigger an SDLT charge in our case?</li>
          <li>Does the BTL transfer attract the 5% HRAD surcharge?</li>
          <li>Will I lose first-time buyer relief on future purchases?</li>
          <li>Are there any LBTT or LTT-specific reliefs we should know about?</li>
          <li>When should the transfer of equity actually happen for tax efficiency?</li>
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
