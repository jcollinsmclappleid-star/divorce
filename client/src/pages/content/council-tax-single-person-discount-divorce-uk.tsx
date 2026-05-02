import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, Home } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "25% discount for sole adult occupants", desc: "Council Tax is charged on the property, not per person — but a 25% Single Person Discount applies where there is only one adult (aged 18+) liable to pay Council Tax in the property. Most people moving out of the family home trigger this for the remaining occupant." },
  { title: "Apply via the local council", desc: "The discount is not automatic. The remaining occupant must apply to the local council. Most councils have an online form. Backdating is sometimes possible to the date the other adult left." },
  { title: "Children and students don't count", desc: "For SPD purposes, children under 18, full-time students, certain carers and several other 'disregarded' categories do not count as adult occupants. A parent living alone with children retains the SPD." },
  { title: "Empty property surcharges in many areas", desc: "Where the family home is left empty during separation (e.g. one party moves out and no-one lives there), many councils now apply Empty Property Premiums of 100–300% on top of normal Council Tax after a few months. Check the local council policy." },
  { title: "Dual occupancy during transition", desc: "Where one party has moved out but is also paying for accommodation elsewhere, both properties may attract Council Tax. The party who has moved into a new property as their main home should claim SPD on whichever is their sole-occupancy household." },
  { title: "Impact on the divorce financial settlement", desc: "Council Tax (after any SPD) is a meaningful budget line. A 25% discount on a Band D property is around £550–£700 per year. Make sure both parties' post-separation budgets reflect their actual Council Tax position." },
];

const figures = [
  "Council Tax band of each property involved",
  "Date the other adult moved out (for backdating)",
  "Whether children remain in the property",
  "Whether any 'disregarded' adults remain (students, severely mentally impaired, carers)",
  "Online application reference for the local council",
  "Annual Council Tax bills for both parties' new accommodation",
  "Empty property premium policy of relevant local council (if home left empty)",
  "Both parties' post-separation budgets including Council Tax",
];

const faqItems = [
  { question: "How do I claim the Single Person Discount after my partner moves out?", answer: "Apply to your local council — usually via their website. You'll need to provide the date the other adult moved out and confirm you are the sole adult occupant. Some councils require evidence (e.g. tenancy agreement at the new address). The discount can usually be backdated to the date the other adult actually left, even if you apply months later." },
  { question: "Do my children stop me getting the Single Person Discount?", answer: "No. Children under 18 are 'disregarded' for Council Tax purposes. A parent living alone with children of any age under 18 still qualifies for the 25% Single Person Discount. Adult children (18+) living at home do count and would prevent the SPD unless they are full-time students or otherwise disregarded." },
  { question: "What if my ex still uses the address occasionally?", answer: "The test is normally where the person's 'sole or main residence' is. If your ex has clearly moved out and established a different sole or main residence elsewhere, occasional visits or use of the address for post don't affect your SPD. Where there is genuine dual residence, the position is more complex and the council may investigate." },
  { question: "Will the empty family home attract higher Council Tax during separation?", answer: "Possibly, depending on the local council's policy. Many councils now apply Empty Property Premiums of 100–300% on top of normal Council Tax after a property has been unoccupied for 6 months to 2 years. Where the family home is being left empty pending sale, this premium can add thousands per year and should be planned for." },
  { question: "Can both ex-spouses claim the Single Person Discount on different properties?", answer: "Yes — each property attracts its own Council Tax based on its occupants. If you and your ex now live in separate properties, each as the sole adult, both can claim the SPD on your respective households. Apply separately to whichever local council each property is in." },
  { question: "Do I have to inform the council that my ex has moved out?", answer: "Yes. Council Tax is your responsibility as the household occupant. Failing to inform the council of the change (or claiming SPD when you are not in fact the sole adult) is potentially fraudulent. Update the council promptly when occupancy changes — most councils make this easy via online forms." },
];

const relatedPages = [
  { title: "Child Benefit After Divorce UK", description: "Other post-separation entitlements.", href: "/child-benefit-after-divorce-uk", badge: "Income" },
  { title: "Who Pays Mortgage During Divorce UK", description: "Other property-related expenses during separation.", href: "/who-pays-mortgage-during-divorce-uk", badge: "Property" },
  { title: "Both Names on Mortgage Divorce UK", description: "Joint property liabilities during separation.", href: "/both-names-on-mortgage-divorce-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model your post-divorce budget.", href: "/unlock", badge: "Report" },
];

export default function CouncilTaxSPDPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Council Tax Single Person Discount on Divorce UK"
      subtitle="A 25% Single Person Discount applies where one adult lives in the property. It is not automatic — apply to your local council. Empty property premiums and dual-occupancy issues catch separating couples out."
      documentTitle="Council Tax Single Person Discount Divorce UK | DivorceCalculatorUK"
      metaDescription="Council Tax Single Person Discount on divorce UK. How to claim the 25% SPD, children and disregarded adults, empty property premiums, dual occupancy and backdating."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Council Tax Single Person Discount Divorce UK", href: "/council-tax-single-person-discount-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A 25% Council Tax Single Person Discount (SPD) applies where one adult is liable for Council Tax at a property. Most adults who become the sole occupant after a partner moves out qualify — but the discount is not automatic and must be applied for through the local council. Children under 18 don't count for SPD purposes, so a parent living alone with children still qualifies. Empty property premiums (100–300% extra) increasingly hit the family home if it is left vacant pending sale. These are small individual amounts but real lines in a post-separation budget.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">An empty property premium can add £2,000–£6,000 a year to the Council Tax bill on a vacant family home. Where the home is being left empty during a sale process, this needs to be factored into the holding cost — sometimes pushing both parties to maintain occupation or accept a lower-but-faster sale price.</p>
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
        <InlineCTA label="Model Your Post-Separation Budget" />
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
            { label: "Late SPD application", desc: "Many separating couples don't apply for SPD until months after the separation. Backdating is usually possible but needs evidence. Apply promptly." },
            { label: "Empty property premium", desc: "Where the family home is empty for months pending sale, premium charges of 100–300% kick in. Plan for this — or maintain occupancy." },
            { label: "Disputed dual residence", desc: "Where one party occasionally returns to the family home, the SPD claim can be challenged. Establishing clear sole or main residence elsewhere is important." },
            { label: "Council Tax Reduction (CTR)", desc: "On low post-separation income, the local Council Tax Reduction scheme may further reduce the bill. Each council has its own scheme — apply separately to SPD." },
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
            "Whether your local council applies an empty property premium",
            "Whether you qualify for additional Council Tax Reduction",
            "How disputed dual residence affects your SPD claim",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Should I apply for SPD now and from what effective date?</li>
          <li>Will the family home incur an empty property premium during sale?</li>
          <li>Can I apply for Council Tax Reduction on top of SPD?</li>
          <li>Are there issues if my ex still uses the address occasionally?</li>
          <li>Have we factored Council Tax accurately into both budgets?</li>
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
