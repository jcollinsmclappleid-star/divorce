import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Gavel, Home } from "lucide-react";
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
    answer: "Courts take children's welfare seriously and may defer a sale where they live in the property. However, this does not permanently prevent sale — it may defer it. A Mesher Order or Martin Order can provide for a deferred sale while protecting the occupying parent and children.",
  },
  {
    question: "What if my ex lives in the house and won't leave?",
    answer: "If your ex will not leave voluntarily after a court order has been made, you may need to apply for a possession order and potentially an ouster order. This is a separate step after the sale or transfer order has been made.",
  },
];

const relatedPages = [
  { title: "Both Names on Mortgage Divorce UK", description: "Your options when both names are on the mortgage.", href: "/both-names-on-mortgage-divorce-uk", badge: "Mortgage" },
  { title: "Who Pays the Mortgage During Divorce UK?", description: "Managing mortgage payments during proceedings.", href: "/who-pays-mortgage-during-divorce-uk", badge: "Mortgage" },
  { title: "How Is Property Divided in Divorce UK?", description: "The full picture of how courts approach property division.", href: "/how-is-property-divided-in-divorce-uk", badge: "Property" },
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
