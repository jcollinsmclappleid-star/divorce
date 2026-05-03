import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gem, AlertCircle, CheckSquare, ExternalLink, Gift } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "An engagement ring is presumed to be an absolute gift", desc: "Under section 3(2) of the Law Reform (Miscellaneous Provisions) Act 1970, an engagement ring is presumed to be an absolute gift to the recipient — meaning it belongs to the person who received it and does not have to be returned if the engagement or marriage breaks down. The presumption can be rebutted only with clear evidence to the contrary." },
  { label: "Inherited rings or family heirlooms may be different", desc: "Where the ring was a family heirloom passed down on the express condition that it would be returned if the marriage failed, the gift may be conditional rather than absolute. Evidence — a contemporaneous letter, family member's testimony, or other proof of the condition — is needed to rebut the statutory presumption." },
  { label: "Wedding gifts from third parties are jointly owned by default", desc: "Wedding gifts from family or friends are generally treated as gifts to both parties unless the giver clearly intended otherwise (for example, an heirloom gifted specifically to one party). On divorce these would normally be treated as matrimonial property and shared like other modest household assets." },
  { label: "Rings rarely move the financial settlement", desc: "Even valuable rings are typically a small fraction of the matrimonial pool and rarely worth fighting over in financial-remedy proceedings. Solicitors will normally advise clients to focus negotiation on the assets that move the dial — property, pensions, income — rather than on personal items." },
  { label: "Symbolism vs valuation matters", desc: "While the law is clear, the emotional significance of rings often makes them disputed even where the legal answer is straightforward. Many couples agree to return rings (or not) outside the formal financial settlement to avoid the cost and acrimony of arguing about them through solicitors." },
];

const faqItems = [
  { question: "Do I have to give back my engagement ring after divorce in the UK?", answer: "Generally no. Under section 3(2) of the Law Reform (Miscellaneous Provisions) Act 1970, an engagement ring is presumed to be an absolute gift. It belongs to the person who received it and does not have to be returned. The presumption can only be rebutted by clear evidence that the gift was conditional — for example, a documented agreement that it would be returned if the marriage failed." },
  { question: "What if the ring is a family heirloom?", answer: "Family heirlooms can be a different matter. If the ring was given on the express condition that it would be returned if the marriage ended (and that condition can be proved), the gift may be conditional rather than absolute. The presumption of absolute gift in the 1970 Act can be rebutted in those cases — but evidence is required." },
  { question: "What about wedding gifts from family and friends?", answer: "Wedding gifts are generally presumed to be joint gifts to both spouses unless there is clear evidence the giver intended otherwise. On divorce they are matrimonial property and are dealt with as part of household contents. In most cases the parties agree how to divide them informally." },
  { question: "Do these rules apply to civil partnerships?", answer: "The Law Reform (Miscellaneous Provisions) Act 1970 specifically deals with engagement rings between heterosexual couples who agreed to marry. Civil partnership and same-sex marriage analogues are not directly addressed by that statute, but the underlying gift principles are similar — the law of gifts treats an unconditional gift as belonging to the recipient." },
  { question: "Will the court order the return of a ring?", answer: "Very rarely. Family courts have wide discretion under section 25 of the Matrimonial Causes Act 1973 to deal with property, but they generally do not order the return of personal items where the law presumes them to be the recipient's property. Litigating over a ring usually costs more in legal fees than the ring is worth." },
  { question: "What about rings bought during the marriage?", answer: "Wedding bands and rings purchased for either spouse during the marriage are normally treated as personal effects — small-value matrimonial assets that are usually kept by whoever wears them. They almost never feature meaningfully in the financial settlement." },
];

const relatedPages = [
  { title: "Pre-Marital Assets in Divorce", description: "When assets brought into a marriage are protected.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
  { title: "Matrimonial vs Non-Matrimonial Assets", description: "The crucial distinction in English family law.", href: "/matrimonial-vs-non-matrimonial-assets-uk", badge: "Assets" },
  { title: "Is Inheritance Included in Divorce Settlement?", description: "How inherited and gifted assets are treated.", href: "/is-inheritance-included-in-divorce-settlement-uk", badge: "Inheritance" },
  { title: "Section 25 Factors Explained", description: "The framework for every English financial settlement.", href: "/section-25-factors-divorce-uk", badge: "Law" },
];

export default function EngagementRingDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Engagement Ring and Wedding Gifts in a UK Divorce"
      subtitle="An engagement ring is presumed to be an absolute gift to the recipient under the Law Reform (Miscellaneous Provisions) Act 1970. Family heirlooms and conditional gifts can be different — evidence is the key."
      documentTitle="Engagement Ring and Wedding Gifts in Divorce UK | DivorceCalculatorUK"
      metaDescription="Who keeps the engagement ring after a UK divorce? How the Law Reform (Miscellaneous Provisions) Act 1970 treats engagement rings, family heirlooms and wedding gifts."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Engagement Ring and Wedding Gifts", href: "/engagement-ring-and-wedding-gifts-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The engagement ring question comes up in almost every divorce. The legal answer in England and Wales is usually clear — an engagement ring is presumed to be an absolute gift — but the emotional and family-heirloom dimensions can complicate matters in practice.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">The legal framework</h2>
        <div className="space-y-3 mb-6">
          {factors.map((f, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-lg border">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold mb-1">{f.label}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Focus on Assets That Move the Dial" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative situations</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">When the law is clear and when it isn't</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Gem className="w-4 h-4 text-primary" /><span><strong>Standard engagement ring purchased by partner:</strong> Presumed absolute gift — recipient keeps it.</span></div>
              <div className="flex items-center gap-2"><Gift className="w-4 h-4 text-primary" /><span><strong>Family heirloom passed down with documented condition:</strong> May be conditional — evidence of the condition required to rebut the statutory presumption.</span></div>
              <div className="flex items-center gap-2"><Gift className="w-4 h-4 text-primary" /><span><strong>Wedding gifts from joint friends and family:</strong> Generally jointly owned — usually divided informally without involvement of the divorce court.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only — the precise treatment depends on the facts.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Practical considerations</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Recent independent valuation if the ring is genuinely valuable", "Provenance — was it newly bought or a family heirloom?", "Any documented conditions attached to the gift", "Insurance and which party's policy covers it", "Other significant gifts of personal items between the parties", "Wedding gifts from third parties (joint vs individual)", "Whether the issue is worth solicitor time to argue", "Practical agreement between the parties outside the formal settlement"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the calculator cannot do</h2>
        <div className="space-y-3 mb-6">
          {["Adjudicate ownership of personal items where the parties disagree", "Value rings or jewellery — this needs an independent jeweller's valuation", "Decide whether litigation over a ring is worth the legal fees"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/ukpga/1970/33/section/3" target="_blank" rel="noopener noreferrer">Law Reform (Miscellaneous Provisions) Act 1970, s.3 — Property of engaged couples <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/ukpga/1973/18/section/25" target="_blank" rel="noopener noreferrer">Matrimonial Causes Act 1973, section 25 <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank" rel="noopener noreferrer">GOV.UK — Money and property when a relationship ends <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal advice. Disputes about specific items should be discussed with a qualified family solicitor.</p>
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
