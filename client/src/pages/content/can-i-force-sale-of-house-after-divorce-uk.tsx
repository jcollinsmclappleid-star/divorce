import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Gavel, Home, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "How long does a forced sale order take?",
    answer: "Applying for a court order to force sale typically takes 3–6 months through financial remedy proceedings. If the property is already subject to a consent order or financial remedy order requiring sale, enforcement action (which includes forcing sale via appointment of a receiver) may take a further 3–6 months if contested.",
  },
  {
    question: "Can my ex stop me selling our jointly owned home?",
    answer: "If both names are on the deeds, your ex can technically refuse to cooperate. However, courts can compel a sale under the Trusts of Land and Appointment of Trustees Act 1996 (TOLATA) and the Matrimonial Causes Act 1973. Refusal to comply with a court order can result in contempt of court proceedings.",
  },
  {
    question: "Can children stop the sale of the family home?",
    answer: "Children's housing can be a relevant issue and may lead to discussion about deferred sale options. A Mesher Order or Martin Order is a specialist legal structure, so get advice before assuming a sale will happen immediately or be delayed.",
  },
  {
    question: "What if my ex lives in the house and won't leave?",
    answer: "If your ex will not leave voluntarily after a court order has been made, you may need to apply for a possession order and potentially an ouster order. This is a separate step after the sale or transfer order has been made.",
  },
  {
    question: "What is the difference between a Mesher Order and a Martin Order?",
    answer: "A Mesher Order defers the sale of the family home until a specified trigger event relating to children — typically the youngest child turning 18 or leaving full-time education. A Martin Order defers sale until the occupying party remarries, cohabits, or dies — regardless of children. Both orders allow the property to be occupied but retain the non-occupying party's interest until the trigger.",
  },
  {
    question: "Can I sell my share of the house without my ex agreeing?",
    answer: "You cannot sell the whole property without your ex's cooperation if both names are on the title. You may theoretically be able to sell your 'interest' in the property to a third party, but in practice this is rarely viable as buyers will not purchase a partial interest in an occupied matrimonial home. The practical route is a court order requiring sale.",
  },
];

const relatedPages = [
  { title: "Both Names on Mortgage Divorce UK", description: "Your options when both names are on the mortgage.", href: "/both-names-on-mortgage-divorce-uk", badge: "Mortgage" },
  { title: "Who Pays the Mortgage During Divorce UK?", description: "Managing mortgage payments during proceedings.", href: "/who-pays-mortgage-during-divorce-uk", badge: "Mortgage" },
  { title: "How Is Property Divided in Divorce UK?", description: "The full picture of how courts approach property division.", href: "/how-is-property-divided-in-divorce-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Compare a property sale against buyout and deferred sale scenarios.", href: "/unlock", badge: "Report" },
];

export default function ForceSaleHousePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Can I Force Sale of House After Divorce UK?"
      subtitle="Yes — in most cases, courts in England and Wales can order the sale of the family home even if your ex objects. The route to achieving this depends on whether you already have a court order and how your ex is responding."
      documentTitle="Can I Force Sale of House After Divorce UK? | DivorceCalculatorUK"
      metaDescription="Can you force the sale of a house after divorce in the UK? Learn when courts order forced sale, how long it takes, and what happens when an ex refuses to cooperate."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Can I Force Sale of House After Divorce UK?", href: "/can-i-force-sale-of-house-after-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Courts in England and Wales have broad powers to order the sale of a property — including the family home — as part of a divorce financial settlement. If your ex refuses to agree to a sale, you can seek a court order compelling it. This applies whether you are trying to initiate a sale or enforce an order that has already been made.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Step 1: Is There Already a Court Order?</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-semibold text-primary">No court order yet</p>
              <p className="text-sm text-muted-foreground">You can apply to the Family Court for a financial remedy order including a sale order. This is part of the normal financial remedy proceedings. The court can order the property to be sold even if your ex disagrees — provided it is just and equitable to do so.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-semibold text-primary">Court order already made but not followed</p>
              <p className="text-sm text-muted-foreground">If a consent order or financial remedy order requires the property to be sold and your ex is not cooperating, you can return to court for enforcement. Courts can appoint a 'receiver' to sell the property on behalf of both parties if one party refuses.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Routes to Forced Sale</h2>
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Gavel className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Matrimonial Causes Act 1973</p>
            </div>
            <p className="text-sm text-muted-foreground">Courts have direct power to order property adjustment, including sale, in divorce proceedings. This is the primary route for divorcing spouses.</p>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Home className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Trusts of Land and Appointment of Trustees Act 1996 (TOLATA)</p>
            </div>
            <p className="text-sm text-muted-foreground">For unmarried couples or in cases where the property is held on trust (e.g. in different shares), TOLATA allows an application to court for a sale order. The court balances the interests of all beneficiaries.</p>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Gavel className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Enforcement — Section 39 of the Senior Courts Act 1981</p>
            </div>
            <p className="text-sm text-muted-foreground">Where a court order requires a transfer or sale but the other party refuses to execute the documents, the court can authorise another person (such as a court officer) to sign on their behalf.</p>
          </div>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Children and Deferred Sale</h2>
        <p className="text-muted-foreground text-sm mb-4">Where children live in the family home, courts may defer a sale — particularly if the resident parent cannot find suitable alternative accommodation. However, deferral is not indefinite and courts will consider a range of factors including the children's welfare, both parties' housing needs, and the financial impact of delay.</p>
        <p className="text-sm text-muted-foreground mb-6">A Mesher Order allows the family home to be sold at a deferred trigger event — typically when the youngest child reaches 18 or leaves full-time education. A Martin Order allows deferral until the resident party remarries, cohabits, or dies. These are compromise solutions that avoid immediate sale but give both parties certainty about what happens next.</p>
        <InlineCTA label="Model Sale and Other Scenarios Side by Side" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures Needed to Model Property Scenarios</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Current market value of the property",
            "Outstanding mortgage balance",
            "Estimated sale costs (agent fees, legal costs — typically 3%)",
            "Net equity (value minus mortgage minus sale costs)",
            "Rental cost in the local area if rehousing",
            "Each party's income (to assess re-mortgage affordability)",
            "Any second charges or secured loans on the property",
            "Children's ages if a deferred sale is being considered",
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
            { label: "Negative equity complicating sale", desc: "Where the outstanding mortgage exceeds the property value, a sale may crystallise a joint liability. Both parties need to understand how any shortfall will be allocated." },
            { label: "One party unable to afford the buyout", desc: "If one party wants to keep the property, they need sufficient income to re-mortgage in their sole name. Income multiples and affordability assessments may make this impossible." },
            { label: "Delays costing both parties", desc: "Every month the property is occupied without contributing to a resolution is a month of mortgage interest, maintenance costs, and legal fees that reduce the final pot." },
            { label: "Mesher Order locking in illiquid equity", desc: "A deferred sale can trap one party's equity for years. If the non-occupying party needs their equity to rehouse, this can create significant financial strain." },
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
            "Whether immediate sale or a deferred arrangement is suitable to discuss given the specific circumstances",
            "Whether a Mesher or Martin Order should be raised with a solicitor for your situation",
            "What the enforcement timeline and costs would be in your specific court centre",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Given the children's ages and the available equity, would a Mesher Order or immediate sale be more likely?</li>
          <li>If my ex refuses to cooperate with the sale, what are the realistic costs and timelines for enforcement?</li>
          <li>Could one party afford to buy the other out based on their current income?</li>
          <li>How should sale costs, capital gains tax (if applicable), and timing be managed?</li>
        </ul>
        <InlineCTA label="Compare Sale, Buyout and Deferred Scenarios" />
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
