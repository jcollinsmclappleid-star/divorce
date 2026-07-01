import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, PoundSterling, AlertCircle, CheckSquare, ExternalLink } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Twenty years is a long marriage", desc: "By this point the assets, pensions and lifestyle of the parties are typically deeply intertwined. The pre-marital/marital distinction is much weaker — the longer the marriage, the more 'all assets become matrimonial' for practical sharing purposes." },
  { label: "Sharing is an important reference point", desc: "Following White v White (2000) and Miller; McFarlane (2006), sharing of the matrimonial pool — including pensions — is often central in long-marriage discussions. The detail still depends on needs, resources and evidence." },
  { label: "Pensions usually need full attention", desc: "After a 20-year marriage, pension sharing or offsetting should usually be checked carefully, particularly where one spouse contributed less because of caring responsibilities." },
  { label: "Spousal maintenance may need review", desc: "Where one spouse cannot reasonably achieve financial independence at the time of divorce — for example because of age, ill health or a long career break — maintenance assumptions need case-specific advice." },
  { label: "Standard of living during the marriage is a real factor", desc: "Section 25(2)(c) of the Matrimonial Causes Act 1973 includes the standard of living enjoyed by the family before the breakdown. After 20 years that history may form part of the needs discussion." },
];

const faqItems = [
  { question: "What financial checks matter after 20 years of marriage in the UK?", answer: "There is no fixed percentage, but after a 20-year marriage the matrimonial pool, pensions, housing and retirement security usually need careful review. Needs, children, health and non-matrimonial property can all affect the discussion." },
  { question: "Should the husband's pension be checked after 20 years?", answer: "Yes, where pensions are meaningful. Pension sharing or offsetting may be relevant after a long marriage. The values, ages, scheme types and other assets should be checked, and a pensions on divorce expert (PODE) may be needed." },
  { question: "What about spousal maintenance after 20 years?", answer: "It may need review, particularly where one spouse has been out of the workforce for an extended period. Any ongoing payment or capitalised maintenance assumption should be treated as case-specific until reviewed by a solicitor." },
  { question: "Do inheritances and pre-marital assets still matter after 20 years?", answer: "They can, but the longer the marriage and the more those assets have been mingled into family use, the more complex the review becomes. The source of the asset can still be relevant, but it needs evidence and advice." },
  { question: "Does adultery or fault affect the financial split?", answer: "Almost never. England and Wales now has a no-fault divorce system under the Divorce, Dissolution and Separation Act 2020, and conduct only affects the financial outcome where it is so extreme that ignoring it would be inequitable. The reason for the breakdown is generally irrelevant to the financial settlement." },
  { question: "Is the position different in Scotland?", answer: "Yes. Scotland's Family Law (Scotland) Act 1985 focuses on matrimonial property accumulated between marriage and the relevant date (usually separation), with equal sharing the presumption. There is no equivalent of long-term joint-lives spousal maintenance — Scottish 'periodical allowance' is normally limited to three years post-divorce." },
];

const relatedPages = [
  { title: "Long Marriage Divorce Settlement", description: "How English courts treat marriages of 20+ years and the typical sharing approach.", href: "/long-marriage-divorce-settlement-uk", badge: "Length" },
  { title: "Pension Sharing vs Offsetting", description: "How to broadly equalise retirement provision after a long marriage.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Section 25 Factors Explained", description: "The statutory framework for every English financial settlement.", href: "/section-25-factors-divorce-uk", badge: "Law" },
  { title: "Model Your Settlement", description: "Compare four scenarios with your real numbers in five minutes.", href: "/wizard", badge: "Tool" },
];

export default function WifeEntitled20YearsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Financial Position After 20 Years of Marriage in the UK"
      subtitle="A long marriage. The matrimonial pool, pensions, housing and retirement security usually need careful review before relying on any headline percentage."
      documentTitle="Financial Position After 20 Years Marriage UK | DivorceCalculatorUK"
      metaDescription="Financial checks after 20 years of marriage in the UK — how sharing, pensions, maintenance assumptions and section 25 factors may shape the discussion."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "20-Year Marriage Checks", href: "/wife-entitled-divorce-uk-after-20-years" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          After two decades of marriage the lives, finances and pensions of both spouses are typically heavily intertwined. The pre-marital/matrimonial distinction matters far less than after a short marriage. The strong starting point is equal sharing of the matrimonial pool — but needs and pensions still drive the detail.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What to check after a 20-year marriage</h2>
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
        <InlineCTA label="Model an Equal Sharing Outcome" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional 20-year marriage, children now teenagers</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /><span>Family home equity £400k, husband's pension CETV £350k, wife's pension CETV £80k, joint ISAs £40k. Wife worked part-time for 12 years.</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>The model can test an equal-sharing assumption: total pool ≈ £870k, equal share ≈ £435k each. A solicitor or pension expert can advise whether pension sharing, property allocation and rehousing assumptions need adjustment.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only — every case turns on its facts.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures that drive a 20-year settlement</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Total matrimonial pool (assets minus liabilities)", "All pension CETVs (occupational, personal, SIPP, state)", "Equity in the family home and any other property", "Both parties' incomes and earning capacity", "Standard of living during the marriage", "Reasonable rehousing cost for both households", "Health, age and any caring responsibilities", "Any inheritances or gifts received during the marriage"].map((fig, i) => (
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
          {["The pension sharing assumptions to check — that may need a pensions on divorce expert (PODE) report", "Whether long-term spousal maintenance is appropriate or whether the need can be capitalised", "How inherited or pre-marital assets should be reviewed in your specific case"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/ukpga/1973/18/section/25" target="_blank" rel="noopener noreferrer">Matrimonial Causes Act 1973, section 25 <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank" rel="noopener noreferrer">GOV.UK — Money and property when a relationship ends <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.moneyhelper.org.uk/en/pensions-and-retirement/pension-problems/pensions-after-divorce-or-separation" target="_blank" rel="noopener noreferrer">MoneyHelper — Pensions after divorce or separation <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal, tax or financial advice. Take advice from a qualified family solicitor and pension specialist before agreeing a long-marriage settlement.</p>
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
