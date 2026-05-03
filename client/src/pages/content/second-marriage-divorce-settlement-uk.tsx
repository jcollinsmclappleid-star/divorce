import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, AlertCircle, CheckSquare, ExternalLink, Users } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Each marriage is treated separately", desc: "There is no special 'second marriage' regime in English and Welsh law. The court applies the same section 25 factors of the Matrimonial Causes Act 1973 to every marriage. What changes are the facts: pre-existing children, pre-marital assets brought from a first divorce, and the length of the second marriage." },
  { label: "Assets brought in from a first marriage are non-matrimonial", desc: "Capital received as a settlement from a first divorce, or assets retained from before the second marriage, are non-matrimonial property in principle. Whether they remain ringfenced depends on length of the second marriage, how they were used, and overall needs." },
  { label: "Existing maintenance commitments are taken into account", desc: "Spousal maintenance from a first marriage automatically ends on remarriage of the receiving party. Child maintenance for children from a previous relationship continues and is a real call on the paying party's resources — relevant to affordability for any new financial settlement." },
  { label: "Children from previous relationships matter", desc: "A party's first responsibility is usually to their minor biological children. Where children from a first relationship live with the paying party, that affects housing needs in the second divorce settlement. Stepchildren are not financially the responsibility of the step-parent for CMS purposes unless formally adopted." },
  { label: "Prenups are more common — and given more weight", desc: "After Radmacher v Granatino (2010), the Supreme Court held that prenuptial agreements should be given decisive weight provided they were entered into freely with a full understanding of their implications, unless it would be unfair to hold the parties to them. Prenups are particularly common in second marriages where both parties bring assets in." },
];

const faqItems = [
  { question: "Is a second marriage divorce settlement different in the UK?", answer: "There is no separate legal regime — the same section 25 factors apply. What is often different is the factual picture: shorter cohabitation, more pre-marital assets brought in from a previous divorce, and existing financial commitments to children from previous relationships. These factors usually mean the court is more willing to ringfence pre-marital property after a short second marriage." },
  { question: "Can my spouse claim against assets I brought from my first divorce?", answer: "Assets received in a first divorce settlement are non-matrimonial property in principle, but they can be drawn into the sharing pool if needs require it or if they have been mingled into family use during the second marriage. The longer the second marriage and the more those assets have been used jointly, the harder it is to ringfence them." },
  { question: "Does my child maintenance from a previous relationship affect my second divorce?", answer: "Yes — it is a real outgoing affecting your affordability for any new spousal maintenance or housing costs. Both the Child Maintenance Service and the family court will recognise existing CMS or court-ordered maintenance for children from previous relationships when assessing what you can reasonably pay." },
  { question: "What about my new spouse's children from a previous relationship?", answer: "You have no automatic financial responsibility for stepchildren unless you have formally adopted them. The CMS does not include stepchildren when calculating maintenance. However, where a new spouse's resources are used to support stepchildren in the family home, that is part of the household financial picture and will be considered when assessing standard of living and needs." },
  { question: "Should second marriages have a prenup?", answer: "Many practitioners recommend it, particularly where both parties have significant pre-marital assets, children from previous relationships, or business interests. A properly prepared prenup — with full disclosure, independent advice, and signed at least 28 days before the wedding — is now likely to be upheld by an English court following Radmacher v Granatino, unless it would produce an unfair result." },
  { question: "Does the calculator handle previous maintenance commitments?", answer: "Yes — you can include child maintenance payable to children from previous relationships as a fixed monthly outgoing for the paying party, so the model reflects affordability after those commitments. You can also include any spousal maintenance still being received from a first marriage — though remember it ends if the recipient remarries." },
];

const relatedPages = [
  { title: "Pre-Marital Assets in Divorce UK", description: "When assets brought into a marriage are protected, and when they are not.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
  { title: "Prenuptial Agreement UK", description: "How English courts treat prenups after Radmacher v Granatino.", href: "/prenuptial-agreement-uk", badge: "Agreements" },
  { title: "Spousal Maintenance After Divorce", description: "How spousal maintenance ends on remarriage of the recipient.", href: "/spousal-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "Section 25 Factors Explained", description: "The statutory framework for every English financial settlement.", href: "/section-25-factors-divorce-uk", badge: "Law" },
];

export default function SecondMarriageDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Second Marriage Divorce Settlement UK"
      subtitle="There is no separate legal regime for second marriages — the same section 25 factors apply. The facts are usually different: pre-existing assets, prior children, and existing financial commitments shape the analysis."
      documentTitle="Second Marriage Divorce Settlement UK | DivorceCalculatorUK"
      metaDescription="How second marriage divorce settlements work in England and Wales — pre-marital assets, children from previous relationships, prenups, and existing maintenance commitments."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Second Marriage Divorce", href: "/second-marriage-divorce-settlement-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A second marriage uses the same legal framework as a first — but the facts the court has to weigh are usually quite different. People marrying for the second time typically bring more pre-existing assets, may have ongoing financial commitments to children from previous relationships, and are more likely to have a prenup in place.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How second marriages typically differ</h2>
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
        <InlineCTA label="Model a Second Marriage Settlement" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional 6-year second marriage, both parties with prior children</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /><span>Husband owned the home before the marriage; wife brought in £80k from her first divorce. Two children from his first marriage live with them part-time. He pays CMS to his ex.</span></div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /><span>The court is likely to give significant credit for pre-marital property, ringfence the wife's £80k inheritance/settlement, and focus on what was built together during the 6-year marriage. CMS payments will be treated as a real outgoing affecting affordability.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only — every case turns on its specific facts.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures and information you will need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Date of the second marriage and any pre-marital cohabitation", "Pre-marital asset values at the date of the marriage", "Prenuptial / postnuptial agreements (if any)", "Children from previous relationships and care arrangements", "CMS / court-ordered maintenance payable to or received from former spouses", "Pension CETVs (which may include pension sharing credits from a first divorce)", "Joint and sole assets accumulated during this marriage", "Each party's net income and reasonable outgoings"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the calculator cannot decide</h2>
        <div className="space-y-3 mb-6">
          {["Whether a prenup will be enforced in your specific circumstances", "How a court will treat assets brought in from a first divorce", "How existing CMS commitments will be balanced against new spousal needs"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/ukpga/1973/18/section/25" target="_blank" rel="noopener noreferrer">Matrimonial Causes Act 1973, section 25 <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/child-maintenance-service" target="_blank" rel="noopener noreferrer">GOV.UK — Child Maintenance Service <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/marriages-civil-partnerships" target="_blank" rel="noopener noreferrer">GOV.UK — Marriages and civil partnerships <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal, tax or financial advice. Always take advice from a qualified family solicitor.</p>
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
