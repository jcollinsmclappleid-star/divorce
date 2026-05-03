import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, PoundSterling, AlertCircle, CheckSquare, ExternalLink } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Twenty years is a long marriage", desc: "By this point the assets, pensions and lifestyle of the parties are typically deeply intertwined. The pre-marital/marital distinction is much weaker — the longer the marriage, the more 'all assets become matrimonial' for practical sharing purposes." },
  { label: "Equal sharing is the strong starting point", desc: "Following White v White (2000) and Miller; McFarlane (2006), equal division of the matrimonial pool — including pensions — is the typical starting point for a long marriage. Departures from equality need a clear justification." },
  { label: "Pensions are usually addressed in full", desc: "After a 20-year marriage it is normal for pension sharing orders to be considered to broadly equalise pension provision in retirement, particularly where one spouse contributed less because of caring responsibilities." },
  { label: "Spousal maintenance is more likely than after a shorter marriage", desc: "Where one spouse cannot reasonably achieve financial independence at the time of the divorce — for example because of age, ill health or a long career break — longer-term or even joint-lives maintenance remains possible, though courts still favour a clean break where the assets allow capitalisation." },
  { label: "Standard of living during the marriage is a real factor", desc: "Section 25(2)(c) of the Matrimonial Causes Act 1973 requires the court to consider the standard of living enjoyed by the family before the breakdown. After 20 years that standard is well established and forms part of the needs analysis." },
];

const faqItems = [
  { question: "What is a wife entitled to after 20 years of marriage in the UK?", answer: "There is no fixed percentage, but after a 20-year marriage equal division of the matrimonial pool — including pensions — is the typical starting point under English and Welsh law. Departures from equality usually reflect housing needs, the welfare of any minor children, or significant non-matrimonial property." },
  { question: "Is the wife entitled to half the husband's pension after 20 years?", answer: "Not automatically, but pension sharing aimed at broadly equalising retirement income is common after a long marriage. The exact percentage of a pension shared depends on the values, the parties' ages, and what other assets are available to balance the overall settlement. A pensions on divorce expert (PODE) is often instructed to advise on the right share." },
  { question: "What about spousal maintenance after 20 years?", answer: "More likely than after a shorter marriage, particularly where one spouse has been out of the workforce for an extended period. Courts still prefer a clean break where the capital allows the maintenance need to be capitalised into a lump sum, but ongoing periodical payments — sometimes long-term — remain a real possibility." },
  { question: "Are inheritances and pre-marital assets safe after 20 years?", answer: "Less so than after a short marriage. The longer the marriage and the more those assets have been mingled into family use (e.g. an inherited sum used to reduce the mortgage), the more likely they are to be treated as part of the sharing pool — though the source of the asset can still influence the eventual division." },
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
      title="What Is a Wife Entitled to After 20 Years of Marriage in the UK?"
      subtitle="A long marriage. The strong starting point is equal sharing of the matrimonial pool — including pensions — with departures only where there is a clear justification."
      documentTitle="Wife Entitled to After 20 Years Marriage UK | DivorceCalculatorUK"
      metaDescription="What a wife is entitled to after 20 years of marriage in the UK — how equal sharing, pensions, spousal maintenance and section 25 factors apply to a long marriage."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Entitled After 20 Years", href: "/wife-entitled-divorce-uk-after-20-years" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          After two decades of marriage the lives, finances and pensions of both spouses are typically heavily intertwined. The pre-marital/matrimonial distinction matters far less than after a short marriage. The strong starting point is equal sharing of the matrimonial pool — but needs and pensions still drive the detail.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How courts approach a 20-year marriage</h2>
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
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>Equal sharing as a starting point: total pool ≈ £870k, equal share ≈ £435k each. Likely structured via a pension sharing order to broadly equalise pensions, plus a property and savings allocation that lets both parties rehouse.</span></div>
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
          {["The exact percentage to share each pension — that needs a pensions on divorce expert (PODE) report in most cases", "Whether long-term spousal maintenance is appropriate or whether the need can be capitalised", "How a court would treat any inherited or pre-marital assets in your specific case"].map((item, i) => (
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
