import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const steps = [
  { title: "Implement the property provisions", desc: "If the family home is to be sold, instruct estate agents and solicitors. If one party is taking ownership, complete the transfer of equity at the Land Registry. Ensure the mortgage is transferred or redeemed as required." },
  { title: "Implement pension sharing orders", desc: "Send the pension sharing order to the relevant pension provider. They will implement the transfer once they have received all required documentation. This typically takes 4–8 weeks and requires both parties' cooperation with the pension provider." },
  { title: "Transfer financial assets", desc: "Transfer savings accounts, investments, and ISAs as set out in the order. Close joint accounts once all agreed transfers have been made. Ensure both parties have received their agreed share." },
  { title: "Address joint debts", desc: "Arrange to pay down, transfer, or restructure joint debts as per the order. Remember that creditors are not bound by the consent order — you must actively manage joint debt obligations." },
  { title: "Set up any maintenance payments", desc: "If the order includes spousal maintenance, establish a standing order payment arrangement. Child maintenance arrangements should be confirmed with the CMS or established as a private arrangement." },
  { title: "Review financial protections", desc: "Update life insurance beneficiaries, write a new will (divorce automatically revokes a will), review pension nominations, and update your tax arrangements as a single person." },
];

const faqItems = [
  {
    question: "What happens if my ex doesn't comply with the consent order?",
    answer: "You can return to court to enforce the order. Courts have a range of enforcement powers including charging orders on property, attachment of earnings orders, deduction from bank accounts, and in serious cases committal for contempt of court. Act quickly — do not wait and hope compliance will eventually happen.",
  },
  {
    question: "When should I update my will after divorce?",
    answer: "Immediately. Divorce automatically revokes any will made during the marriage under UK law. If you die without a new will, the intestacy rules apply — which may not reflect your current wishes. Make a new will as soon as practical after the financial settlement is concluded.",
  },
  {
    question: "How long does the pension sharing order take to implement?",
    answer: "Pension providers typically take 4–12 weeks to implement a pension sharing order once they have received all required documentation. Both parties need to provide identification and complete the pension provider's forms. Delays are common — follow up actively with the provider.",
  },
  {
    question: "Do I need to notify HMRC after my divorce?",
    answer: "Yes — inform HMRC of your change in marital status as it affects tax codes, Marriage Allowance (if applicable), and Child Benefit arrangements. If the property has been transferred as part of the settlement, you may also have CGT considerations to address.",
  },
  {
    question: "What should I do about joint financial products that aren't addressed in the consent order?",
    answer: "Review all joint financial products — current accounts, savings accounts, credit cards, insurance policies — and either close them or transfer to a sole name. Even if not specifically addressed in the consent order, leaving joint accounts open can create complications and ongoing joint liability.",
  },
];

const relatedPages = [
  { title: "When is a Divorce Financial Settlement Legally Binding?", description: "Understanding when the consent order takes effect.", href: "/when-is-divorce-financial-settlement-legally-binding-uk", badge: "Legal" },
  { title: "Both Names on Mortgage in Divorce UK", description: "The practical steps for property transfers and mortgage changes.", href: "/both-names-on-mortgage-divorce-uk", badge: "Property" },
  { title: "What is a Consent Order in UK Divorce?", description: "What the consent order document covers and how it works.", href: "/what-is-a-consent-order-uk-divorce", badge: "Legal Orders" },
  { title: "Preview the Full Financial Report", description: "Understand the full financial settlement picture before implementation.", href: "/unlock", badge: "Report" },
];

export default function StepsAfterFinalOrderPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Steps After the Final Order: Implementing Your Financial Settlement UK"
      subtitle="Getting the consent order approved is not the end — it is the beginning of implementation. Here are the practical steps to ensure the settlement is properly carried out."
      documentTitle="Steps After Divorce Financial Settlement UK | DivorceCalculatorUK"
      metaDescription="What to do after your divorce financial settlement is finalised — implementing property transfers, pension sharing orders, closing joint accounts, and setting up maintenance payments."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Steps After the Final Order UK", href: "/steps-after-final-order-finances-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Once your consent order has been approved by the Family Court, the hard part is just beginning. Turning the words on paper into real financial change requires coordinated action across multiple areas — property, pensions, banking, and tax. Each element has its own timeline, its own process, and its own parties to coordinate with.
        </p>

        <Card className="bg-primary/5 border-primary/20 mb-6">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-primary mb-2">Immediate Priority</p>
            <p className="text-sm text-muted-foreground">Review your consent order carefully and identify every action required, by whom, and by what deadline. Some elements must be completed within a specific timeframe. Failure to comply with a consent order is contempt of court — the same applies to your ex-spouse.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">The Implementation Checklist</h2>
        <div className="space-y-4 mb-6">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4 p-4 bg-background rounded-lg border">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-1">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Financial Fresh Start Checklist</h2>
        <div className="grid sm:grid-cols-2 gap-2 mb-6">
          {[
            "Update your will (divorce revokes existing will)",
            "Review life insurance beneficiaries",
            "Update pension nominations of beneficiary",
            "Open new sole bank accounts",
            "Inform HMRC of change in marital status",
            "Check credit file and remove any joint financial products",
            "Review benefits entitlements as a single person",
            "Update car insurance, home insurance policies",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg border bg-background text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <InlineCTA label="Start Planning Your Post-Divorce Finances" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures to Have Available During Implementation</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Copy of the approved consent order (with court seal)",
            "Pension sharing annexure (for pension providers)",
            "Land Registry title number (for property transfers)",
            "Mortgage account number and lender contact details",
            "Bank account details for all agreed transfers",
            "CMS case reference if child maintenance is involved",
            "HMRC reference for tax and Marriage Allowance changes",
            "Current insurance policy details to update or cancel",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Implementation Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Pension sharing delays", desc: "Pension providers routinely take 4–12 weeks to implement pension sharing orders. Some providers have backlogs. Chase proactively — do not assume it is happening without checking." },
            { label: "Property transfer complications", desc: "Transfer of equity requires the mortgage lender's consent (if re-mortgaging in one name). If a party cannot afford the re-mortgage, the property may need to be sold instead — even where the order says otherwise." },
            { label: "Joint debt remaining after settlement", desc: "The consent order allocates responsibility between the parties, but the creditor can still pursue either party. Joint credit card, loan, or overdraft liabilities need to be actively resolved, not just addressed on paper." },
            { label: "Ex-spouse non-compliance", desc: "If the other party is not cooperating with implementation, you may need to return to court for enforcement. Acting early and documenting non-compliance is important." },
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
            "Whether the property transfer or sale will proceed smoothly — practical complications can arise",
            "The timeline for pension implementation — each provider has different processes",
            "What tax implications arise from specific assets being transferred — professional tax advice may be needed",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Are there any CGT implications from the property transfer or asset disposals?</li>
          <li>What is the realistic timeline for all elements of the settlement to be implemented?</li>
          <li>What are my enforcement options if the other party does not comply?</li>
          <li>Do I need a new mortgage application and what is my likely affordability position?</li>
        </ul>
        <InlineCTA label="Model Your Post-Settlement Financial Position" />
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
