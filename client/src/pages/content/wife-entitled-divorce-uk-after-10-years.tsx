import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, PoundSterling, AlertCircle, CheckSquare, ExternalLink } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Ten years counts as a medium-length marriage", desc: "Sharing of matrimonial property can become more relevant at this length. The pre-marital/marital distinction may matter less than after a short marriage, especially where assets have mingled." },
  { label: "Needs are often central", desc: "For many couples after ten years, the practical question is not surplus wealth but whether both households can survive and rehouse. Section 25 needs issues should be discussed with a solicitor." },
  { label: "Pensions accrued during the marriage need attention", desc: "Pension sharing or offsetting may need professional discussion after ten years, particularly where one spouse contributed less to a pension because they took on more childcare or part-time work." },
  { label: "Career sacrifice attracts more weight than at 5 years", desc: "Where one spouse has paused or scaled back a career to support the family, that contribution is recognised under section 25(2)(f) as a non-financial contribution. After ten years that history is harder to undo by the time of the divorce." },
  { label: "Time-limited maintenance may need review", desc: "A clean break may be discussed where possible, but where there is a real income gap — for example because the primary carer has been out of full-time work — maintenance assumptions need case-specific advice." },
];

const faqItems = [
  { question: "What financial checks matter after 10 years of marriage in the UK?", answer: "There is no fixed percentage. Section 25 factors include resources, needs, earning capacity, children, contributions and pensions. After ten years, the matrimonial pool, housing and income needs should usually be reviewed carefully with a solicitor." },
  { question: "Does the wife automatically get half the house after 10 years?", answer: "No. Total resources, needs, rehousing, children and mortgage affordability all matter. Where the family home is the largest asset, property and pension options need to be modelled together rather than assumed from a headline percentage." },
  { question: "Should pension sharing be checked after a 10-year marriage?", answer: "Yes, where pensions are meaningful. Pension sharing or offsetting may need professional discussion, especially where there is a significant pension imbalance. The Nuffield Foundation's Fair Shares research (2023) found pension sharing is often underused." },
  { question: "Should spousal maintenance be checked after 10 years?", answer: "Yes, particularly where there is a clear income gap and the lower-earning spouse needs time to rebuild earning capacity. Any maintenance assumption should be treated as a modelling input until reviewed by a qualified professional." },
  { question: "Does the way the marriage ended affect the financial settlement?", answer: "England and Wales now operates a no-fault divorce system under the Divorce, Dissolution and Separation Act 2020. Conduct only affects the financial settlement in extreme cases (e.g. financial misconduct or violence so serious that ignoring it would be inequitable). The reason for the divorce is normally irrelevant to the financial outcome." },
  { question: "Is the position different in Scotland?", answer: "Yes. Scotland operates under the Family Law (Scotland) Act 1985 — a different regime that focuses on matrimonial property acquired between the marriage and the date of separation, with a presumption of equal sharing. If you live in Scotland, take Scottish-qualified advice." },
];

const relatedPages = [
  { title: "Section 25 Factors Explained", description: "The statutory framework every English and Welsh financial settlement is built on.", href: "/section-25-factors-divorce-uk", badge: "Law" },
  { title: "Pension Sharing vs Offsetting", description: "Two ways to deal with pension imbalances after a longer marriage.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Spousal Maintenance After Divorce", description: "When term maintenance is awarded and how courts size it.", href: "/spousal-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "Model Your Settlement", description: "See your numbers split four different ways in under five minutes.", href: "/wizard", badge: "Tool" },
];

export default function WifeEntitled10YearsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Financial Position After 10 Years of Marriage in the UK"
      subtitle="A medium-length marriage. The matrimonial pool, needs, housing and pensions may all need careful review before relying on a headline split."
      documentTitle="Financial Position After 10 Years Marriage UK | DivorceCalculatorUK"
      metaDescription="Financial checks after 10 years of marriage in the UK — how section 25 factors, pensions, housing and maintenance assumptions may shape the discussion."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "10-Year Marriage Checks", href: "/wife-entitled-divorce-uk-after-10-years" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A ten-year marriage is in the middle of the spectrum. The sharing principle is more straightforward than after a short marriage, but the dominant question is usually whether both parties can rehouse and meet ongoing needs — not how to divide surplus wealth.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What to check after a 10-year marriage</h2>
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
        <InlineCTA label="See Your Settlement Across 4 Scenarios" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional 10-year marriage with two children and pension imbalance</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /><span>Wife works 3 days a week, husband full-time. Family home equity £250k, husband's pension CETV £180k, wife's pension CETV £30k, modest joint savings.</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>The model should test housing, pensions and income-gap assumptions together. A solicitor can advise whether pension sharing, maintenance or a different property route needs to be discussed.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only — every case turns on its own facts.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures that drive a 10-year settlement</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Net equity in the family home", "Pension CETVs for both parties", "Joint and sole savings, ISAs, investments", "Each party's net monthly income", "Reasonable monthly outgoings post-separation", "Childcare costs and care arrangements", "Realistic rehousing cost in the local area", "Any debts in joint or sole names"].map((fig, i) => (
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
          {["Whether term maintenance is appropriate, and for how long", "Whether pension sharing or offsetting is the better approach for you", "Whether your proposed division will be acceptable to your spouse or a court"].map((item, i) => (
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
          <li><a className="underline hover:text-primary" href="https://www.moneyhelper.org.uk/en/family-and-care/divorce-and-separation" target="_blank" rel="noopener noreferrer">MoneyHelper (MaPS) — Divorce and separation <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal, tax or financial advice. Always take advice from a qualified family solicitor before agreeing a settlement.</p>
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
