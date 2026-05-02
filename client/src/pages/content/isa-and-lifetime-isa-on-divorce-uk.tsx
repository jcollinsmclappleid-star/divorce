import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "ISAs cannot be jointly held", desc: "Every ISA is held in one person's name. There is no such thing as a 'joint ISA'. On divorce, each party's ISAs remain in their own name — they cannot be transferred between spouses without losing the tax wrapper." },
  { title: "Stocks & shares ISAs are matrimonial assets", desc: "ISA balances built up during the marriage are part of the matrimonial pot. The total ISA holdings of both parties are typically aggregated and divided through the wider settlement, even though the ISAs themselves cannot move between names." },
  { title: "Lifetime ISA — penalty risk", desc: "Lifetime ISAs (LISAs) attract a 25% withdrawal penalty if cashed in before age 60 for non-qualifying purposes (i.e. not first home or retirement). On divorce, withdrawing a LISA to fund a settlement can lose 25% of the value — material money on substantial pots." },
  { title: "APS — the inheritance ISA allowance doesn't apply", desc: "The Additional Permitted Subscription (APS) allowance is a special inheritance ISA allowance that lets a surviving spouse inherit ISA tax wrapper on death. It does not apply on divorce — only bereavement. Divorcing spouses lose their ex's ISA wrapper entirely." },
  { title: "Help to Buy ISAs", desc: "Help to Buy ISAs are closed to new accounts but existing ones still receive the 25% government bonus on first home purchase. On divorce, each party retains their own H2B ISA. The bonus is only available on a qualifying first home purchase up to a £450k cap (£250k outside London)." },
  { title: "Junior ISAs are the children's", desc: "Junior ISAs (JISAs) are held in the child's name and become the child's at age 18. They are NOT matrimonial assets. Both parents typically continue to contribute pro-rata or as agreed in the settlement, but the funds are the child's." },
];

const figures = [
  "Latest valuations of all ISAs (cash, S&S, LISA, H2B) for both parties",
  "Annual subscriptions made over the marriage",
  "Date each ISA was opened",
  "Any LISA withdrawal penalties triggered by settlement structure",
  "Any Help to Buy ISA balances and home purchase plans",
  "Junior ISA balances for each child (excluded from matrimonial pot)",
  "Underlying investment holdings and any embedded gains",
  "Any pending ISA transfers between providers",
];

const faqItems = [
  { question: "Can I transfer an ISA to my ex on divorce?", answer: "No — ISAs cannot be transferred between living people. Each ISA is held in one name. On divorce, the value is taken into account in the wider settlement (e.g. one party gets a larger share of cash savings to balance the other's larger ISA holding). The Additional Permitted Subscription only applies on bereavement, not divorce." },
  { question: "What happens to my Lifetime ISA if I withdraw to fund the divorce settlement?", answer: "A non-qualifying withdrawal from a LISA before age 60 attracts a 25% government penalty. On a £20,000 LISA, that's a £5,000 hit. If a LISA is being used to fund the settlement, this penalty needs to be factored into the analysis. Where possible, other assets should be used in preference to LISA withdrawals." },
  { question: "Do Junior ISAs count in the divorce settlement?", answer: "No. Junior ISAs (JISAs) are held in the child's name and become the child's at 18. They are not part of either parent's matrimonial pot. However, ongoing contributions to a JISA may form part of the child maintenance arrangements going forward." },
  { question: "Are stocks and shares ISA gains taxed on transfer?", answer: "Within the ISA wrapper, no — gains and dividends are tax-free. But if you withdraw from an ISA and pay your ex out of cash, the ISA tax wrapper is lost forever on those amounts. The remaining cash (now outside the ISA) attracts CGT and dividend/income tax going forward like any other investment." },
  { question: "Can my ex claim my Help to Buy ISA bonus?", answer: "No. The H2B bonus is only paid on the qualifying first home purchase by the ISA holder. It cannot be transferred to the divorcing spouse. However, the existing balance and the entitlement to claim the bonus on a future first home purchase form part of the ISA holder's matrimonial assets." },
  { question: "Should we both keep our existing ISAs?", answer: "Usually yes — preserving the ISA wrappers for both parties is tax-efficient. Other matrimonial assets (cash, savings, the house) can be used to balance any difference in ISA values. Only withdraw from ISAs to fund the settlement where there is no other realistic option." },
];

const relatedPages = [
  { title: "How are Savings Split in Divorce UK?", description: "Cash and savings treatment overall.", href: "/how-are-savings-split-in-divorce-uk", badge: "Savings" },
  { title: "How are Investments Divided in Divorce UK?", description: "S&S investments and tax treatment.", href: "/how-are-investments-divided-in-divorce-uk", badge: "Investments" },
  { title: "Capital Gains Tax on Divorce UK", description: "CGT on investment disposals.", href: "/capital-gains-tax-on-divorce-uk", badge: "Tax" },
  { title: "Preview the Full Financial Report", description: "Model ISA-aware settlements.", href: "/unlock", badge: "Report" },
];

export default function IsaLisaPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="ISAs and Lifetime ISAs on Divorce UK"
      subtitle="ISAs cannot be transferred between spouses on divorce. Lifetime ISA withdrawals carry a 25% penalty. Junior ISAs are the children's. Here is how each ISA type interacts with a divorce settlement."
      documentTitle="ISA and Lifetime ISA on Divorce UK | DivorceCalculatorUK"
      metaDescription="ISA and Lifetime ISA on divorce UK. Why ISAs can't be transferred between spouses, the 25% LISA withdrawal penalty, Help to Buy ISA, Junior ISAs and Additional Permitted Subscription."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "ISA and Lifetime ISA on Divorce UK", href: "/isa-and-lifetime-isa-on-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          ISAs are individual by design — there is no such thing as a joint ISA, and the tax wrapper cannot be transferred between living people. On divorce, each party keeps their own ISAs but the values are taken into account in the wider settlement. Lifetime ISAs carry a 25% withdrawal penalty for non-qualifying use before age 60, which can hit hard if the LISA is needed to fund the settlement. Junior ISAs are the children's and are excluded from the matrimonial pot.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">A 25% LISA withdrawal penalty can be the most expensive line in a divorce settlement on a £-for-£ basis. Where possible, balance ISA values through other matrimonial assets rather than triggering withdrawals.</p>
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
                  <PiggyBank className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model ISA Settlement Scenarios" />
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
            { label: "LISA penalty trap", desc: "A 25% LISA withdrawal penalty applies for non-qualifying use before age 60. Settlement structures that force LISA withdrawal can destroy 25% of the LISA value with no offsetting benefit." },
            { label: "Loss of ISA tax wrapper", desc: "Once funds leave the ISA, the tax wrapper cannot be reinstated for those amounts (subject to annual subscription limits going forward). Settlement design should preserve ISA wrappers wherever possible." },
            { label: "Junior ISA assumed not matrimonial", desc: "JISAs are the child's not the parents' — but contributions made out of matrimonial funds are sometimes raised in disclosure. They are typically not 'reclaimed' but can be relevant to ongoing maintenance discussions." },
            { label: "Help to Buy ISA bonus only on first home", desc: "The H2B bonus is locked to the holder's first home purchase up to value caps. On divorce where one party retains the family home, the H2B bonus may be lost if that party will not buy a new first home." },
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
            "Whether a LISA withdrawal penalty is unavoidable in your settlement",
            "Whether Junior ISA contributions should be raised in financial discussions",
            "How to balance ISA values across other matrimonial assets",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Can the LISA withdrawal penalty be avoided in our settlement design?</li>
          <li>How should we treat the children's Junior ISAs in the wider settlement?</li>
          <li>Will preserving both parties' ISA wrappers create a fairer outcome long-term?</li>
          <li>Are there H2B ISA bonuses that may be lost depending on settlement choices?</li>
          <li>What are the CGT implications of any ISA-funded payments?</li>
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
