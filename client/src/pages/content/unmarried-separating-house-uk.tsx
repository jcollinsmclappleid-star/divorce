import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Home } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "We are not married but lived together for 10 years — do I have rights to the house?",
    answer: "Not automatically. Your claim to the property depends on whether your name is on the title deeds, whether a trust was created (expressly or by implication), and whether you made contributions that give rise to a beneficial interest. The length of the relationship alone does not create property rights for cohabiting couples.",
  },
  {
    question: "I paid the deposit but my name is not on the deeds — can I claim it back?",
    answer: "Potentially. Paying a deposit may give rise to a resulting trust — where the beneficial interest reflects financial contributions. You would need to demonstrate the payment and that it was not intended as a gift. Court action under TOLATA would be needed if you cannot agree.",
  },
  {
    question: "My partner owns the house and I have been making the mortgage payments — do I have a claim?",
    answer: "Possibly. Regular mortgage contributions may establish a constructive trust — but this is not automatic. Courts look at the overall common intention of the parties when they made those contributions. Evidence of discussions about ownership, combined with financial contributions, strengthens the argument.",
  },
  {
    question: "Is cohabitation law different in Scotland?",
    answer: "Yes — Scotland has different rules under the Family Law (Scotland) Act 2006, which provides more statutory protection for cohabiting partners on separation. If you are in Scotland, seek advice under Scottish law specifically.",
  },
  {
    question: "What is a declaration of trust and can it help?",
    answer: "A declaration of trust is a document that formally records what share each party owns in a property. If you have one, it is strong evidence of the intended split. If you do not have one and cannot agree, you will need to go to court.",
  },
];

const relatedPages = [
  { title: "Can I Force Sale of House After Divorce UK?", description: "Court powers to compel property sale — applies to TOLATA cases too.", href: "/can-i-force-sale-of-house-after-divorce-uk", badge: "Property" },
  { title: "Buying Partner Out of House in Divorce UK", description: "How to buy out a co-owner's share when separating.", href: "/buying-partner-out-of-house-divorce-uk", badge: "Property" },
  { title: "Divorce Financial Settlement Calculator UK", description: "Model your financial position after separation.", href: "/divorce-financial-settlement-calculator-uk", badge: "Calculator" },
  { title: "Preview the Full Financial Report", description: "Understand your financial position before separation.", href: "/unlock", badge: "Report" },
];

export default function UnmarriedSeparatingHousePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Unmarried Separating: What Happens to the House UK?"
      subtitle="There is no 'common law marriage' in England and Wales. Unmarried couples have no automatic rights to each other's property on separation — but financial contributions, trust law, and the title deeds all matter."
      documentTitle="Unmarried Couple Separating: What Happens to the House UK? | DivorceCalculatorUK"
      metaDescription="Understand what happens to the house when an unmarried couple separates in England and Wales. TOLATA, beneficial interests, trust law, and when courts can order a sale."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Unmarried Separating: House Rights UK", href: "/unmarried-separating-house-uk" },
      ]}
    >
      <ContentSection>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">The Myth of Common Law Marriage</p>
                <p className="text-sm text-amber-700">Despite widespread belief, there is no such thing as 'common law marriage' in England and Wales. Cohabiting couples — no matter how long they have lived together — do not have the same rights as married couples on separation. Courts do not have the same broad financial discretion as in divorce. Property rights depend entirely on legal ownership, trust law, and financial contributions.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-muted-foreground leading-relaxed mb-6">
          When an unmarried couple separates, what happens to the home depends primarily on who owns it legally — as shown on the title deeds at the Land Registry — and whether there are any claims based on financial contributions or agreements about ownership.
        </p>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Three Common Scenarios</h2>
        <div className="space-y-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Both names on the title deeds</p>
              </div>
              <p className="text-sm text-muted-foreground">Both parties are legal co-owners and have the right to live there and a share in the property. The share may be equal (joint tenants — each owns 100% and the survivor inherits all) or unequal (tenants in common — each owns a specific percentage). If you cannot agree on a sale or buyout, either party can apply to court under TOLATA for a sale order.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Only one name on the title deeds</p>
              </div>
              <p className="text-sm text-muted-foreground">The named party is the legal owner. The other party has no automatic rights, but may have an equitable (beneficial) interest if they made financial contributions to the deposit, mortgage, or major improvements. This must be argued through the courts using trust law — specifically constructive trust or resulting trust principles (the Lloyds Bank v Rosset / Stack v Dowden framework).</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">A Declaration of Trust exists</p>
              </div>
              <p className="text-sm text-muted-foreground">If the couple made a formal declaration of trust when they bought the property — recording their agreed ownership shares — this is the starting point and usually determinative. Courts will depart from it only in limited circumstances.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Applying Under TOLATA</h2>
        <p className="text-muted-foreground text-sm mb-4">The Trusts of Land and Appointment of Trustees Act 1996 (TOLATA) is the legal route for resolving property disputes between unmarried couples. Courts can order:</p>
        <ul className="space-y-1 mb-6 text-sm text-muted-foreground list-disc list-inside ml-2">
          <li>A declaration of the parties' respective shares</li>
          <li>An order for sale (even if one party objects)</li>
          <li>An order regulating the occupation of the property</li>
        </ul>
        <p className="text-sm text-muted-foreground mb-6">TOLATA proceedings are handled in the County Court and are separate from any contact or children disputes. Legal costs can be significant, and courts consider the welfare of any children when deciding whether to order a sale.</p>
        <InlineCTA label="Understand Your Financial Position After Separation" />
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
