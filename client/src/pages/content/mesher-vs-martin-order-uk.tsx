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

const comparison = [
  { title: "Mesher Order — sale deferred until a trigger event", desc: "The family home is held in joint names (or transferred to one party with a charge in favour of the other). Sale is deferred until a trigger event — most commonly the youngest child reaching 18 or finishing full-time education, the resident parent remarrying or cohabiting, the resident parent voluntarily selling, or the resident parent's death. On sale, the proceeds are split in a fixed proportion." },
  { title: "Martin Order — sale deferred for the resident party's life or until a personal trigger", desc: "The resident party (typically the spouse without children at home) has the right to occupy for life — or until they remarry, cohabit, voluntarily sell, or die. The other party retains a charge on the property which crystallises on the trigger event. More commonly used in childless cases where one party needs ongoing housing security." },
  { title: "Trigger events compared", desc: "Mesher orders are typically tied to children — sale on youngest child becoming independent. Martin orders are typically tied to the occupying party's circumstances — sale on remarriage, cohabitation, or no longer needing the property as a home." },
  { title: "Effect on financial settlement", desc: "Both deferred sale arrangements allow one party to remain housed while preserving the other party's eventual share of equity. They are sometimes the only way to bridge a housing-needs case where there is not enough capital for two separate homes." },
];

const considerations = [
  "Both parties remain joint owners (or one owns subject to a charge) throughout the deferral",
  "Maintenance of the property — repairs, insurance, mortgage — needs clear allocation in the order",
  "The non-occupying party's capital is locked up until the trigger event",
  "The non-occupying party may face mortgage difficulties on a new property while the joint mortgage continues",
  "Property value at the trigger event may differ significantly from current value",
  "Mortgage payments during the deferral period need to be agreed and funded",
  "Any improvements to the property may complicate the eventual split",
  "The arrangement should be reflected in a sealed consent order or court order",
];

const faqItems = [
  {
    question: "What is a Mesher Order?",
    answer: "A Mesher Order is a court order that defers the sale of the family home until a specified trigger event — usually the youngest child reaching 18 or finishing full-time education. It allows the resident parent to remain in the home with the children while preserving the other party's share of equity, which is realised on eventual sale.",
  },
  {
    question: "What is a Martin Order?",
    answer: "A Martin Order is similar but more typically used in childless cases. It allows one party to occupy the property for life or until a personal trigger event (remarriage, cohabitation, voluntary sale, death). The non-resident party retains a charge on the property which crystallises on the trigger event.",
  },
  {
    question: "Which order is right for me?",
    answer: "Mesher orders typically suit cases where children need stable housing during their dependency. Martin orders typically suit cases where one party needs long-term housing security but no children are involved. Outright sale and split is often preferred where capital allows two homes — deferred sale arrangements are usually a workaround for limited capital. A solicitor can advise on which is suitable for your case.",
  },
  {
    question: "What happens to mortgage payments during the deferred period?",
    answer: "Mortgage liability typically remains joint until the property is sold or the mortgage is refinanced into one name. The order usually specifies who pays the mortgage during the deferral. Both parties remain liable to the lender, regardless of what the order says — the lender is not bound by the divorce settlement.",
  },
  {
    question: "Can the non-resident party get another mortgage during the deferral?",
    answer: "It is more difficult. The continued joint mortgage liability counts against affordability when applying for new borrowing, and lenders typically take 100% of the existing joint mortgage into account. This is one of the main practical drawbacks of deferred sale arrangements for the non-resident party.",
  },
  {
    question: "What if the property value falls during the deferral?",
    answer: "Both parties are exposed to property value movement. If the property falls in value, both parties' eventual shares are smaller. Some orders include indexation provisions or fix the percentage split rather than absolute amounts to manage this — but the underlying property risk is shared.",
  },
];

const relatedPages = [
  { title: "Both Names on Mortgage in Divorce UK", description: "What happens to a joint mortgage during a deferred sale.", href: "/both-names-on-mortgage-divorce-uk", badge: "Mortgage" },
  { title: "Can I Force Sale of House After Divorce UK?", description: "Your options if the deferred sale isn't working.", href: "/can-i-force-sale-of-house-after-divorce-uk", badge: "Property" },
  { title: "Stay-at-Home Parent Divorce Settlement UK", description: "Why deferred sale often features in stay-at-home parent cases.", href: "/stay-at-home-parent-divorce-settlement-uk", badge: "Children" },
  { title: "Preview the Full Financial Report", description: "Model deferred sale scenarios with your figures.", href: "/unlock", badge: "Report" },
];

export default function MesherVsMartinOrderPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Mesher vs Martin Order UK: Deferred Sale Explained"
      subtitle="A Mesher or Martin order defers the sale of the family home until a trigger event — letting one party stay while preserving the other's eventual share. They're often the answer when there isn't enough capital for two separate homes."
      documentTitle="Mesher vs Martin Order UK | DivorceCalculatorUK"
      metaDescription="The difference between Mesher and Martin orders in UK divorce — when each is used, how trigger events work, mortgage implications, and the key practical pressure points to plan for."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Mesher vs Martin Order UK", href: "/mesher-vs-martin-order-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          When there isn't enough capital in a divorce settlement to provide two separate homes, the family home doesn't always have to be sold immediately. A Mesher Order (named after the case Mesher v Mesher) or a Martin Order (named after Martin v Martin) defers the sale until a specified trigger event — keeping one party housed while preserving the other party's eventual share of the equity. Each has its place, and each has practical pressure points worth understanding.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Deferred sale arrangements lock up capital for the non-resident party — sometimes for many years. They are typically a solution to limited capital, not a first-choice approach. Where capital allows two homes, an outright sale and split is often cleaner.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">How the Two Orders Compare</h2>
        <div className="space-y-4 mb-6">
          {comparison.map((c, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Home className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{c.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Deferred Sale Scenarios in the Calculator" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Practical Considerations to Spell Out in the Order</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {considerations.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {c}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Capital lock-up for the non-resident party", desc: "The non-resident party's share of equity is unavailable until the trigger event — sometimes many years away. This affects their ability to buy their own home, fund retirement, or weather financial setbacks." },
            { label: "Mortgage continuation", desc: "If a mortgage is still outstanding during the deferral, both parties typically remain liable to the lender. This can affect the non-resident party's credit and ability to borrow elsewhere." },
            { label: "Property maintenance and improvements", desc: "Disputes can arise over who pays for major repairs and whether improvements paid for by the resident party should affect the eventual split. The order should address these explicitly." },
            { label: "Trigger event ambiguity", desc: "Phrases like 'cohabitation' need careful definition — is a partner staying three nights a week cohabitation? Disputes over whether a trigger has occurred are common. Tight drafting reduces this risk." },
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
            "Whether a Mesher or Martin order is the right approach for your situation",
            "How a court would draft the trigger events for your case",
            "What property value will be at the future trigger event",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is a deferred sale really the best option, or could we make an outright sale work?</li>
          <li>What trigger events would be appropriate for our situation?</li>
          <li>How should mortgage payments be allocated during the deferral?</li>
          <li>What protections should be built in for the non-resident party's interests?</li>
          <li>How should improvements and repairs be treated for the eventual split?</li>
        </ul>
        <InlineCTA label="Compare Sale, Buyout and Deferred Sale Scenarios" />
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
