import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, PoundSterling, AlertCircle, CheckSquare, ExternalLink } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "A 25-year marriage is squarely a long marriage", desc: "By this point any pre-marital/matrimonial property distinction may be much less clear. The whole pool, including pensions, usually needs careful review alongside needs and retirement security." },
  { label: "Retirement is in view — pensions matter most", desc: "After 25 years one or both spouses may be approaching retirement. Pension provision becomes one of the most important parts of the settlement discussion, and specialist pension input may be needed." },
  { label: "Career and caring contributions are weighted equally", desc: "Section 25(2)(f) of the Matrimonial Causes Act 1973 treats financial and non-financial contributions equally. The spouse who built a career and the spouse who supported it are not viewed differently when the matrimonial pool is shared." },
  { label: "Standard of living is a strong reference point", desc: "Section 25 includes the standard of living enjoyed by the family before the breakdown. After a long marriage at a comfortable standard of living, that history may be relevant to needs, within what the assets can support." },
  { label: "Spousal maintenance may need review", desc: "Where one spouse cannot achieve genuine financial independence at the time of divorce because of age, health or a long career break, maintenance assumptions need case-specific professional advice." },
];

const faqItems = [
  { question: "What financial checks matter after 25 years of marriage in the UK?", answer: "After a marriage of this length, the entire matrimonial pool, pensions, housing, health, retirement security and maintenance assumptions usually need careful review. There is still no automatic percentage that applies to every case." },
  { question: "Is a 50/50 split automatic after 25 years?", answer: "No. Sharing may be an important reference point, but the actual structure may not look 50/50 on every line item. Property, pensions, liquidity and rehousing need to be modelled together and reviewed with a professional." },
  { question: "Should my husband's pension be checked after 25 years?", answer: "Yes, if pension values are meaningful. Pension sharing or offsetting may be central in long marriages, but the percentage depends on pension values, ages, scheme types and other capital. A pensions on divorce expert (PODE) report may be needed." },
  { question: "Should long-term spousal maintenance be checked?", answer: "Yes, particularly where one spouse is older, in poor health, or has been out of the workforce for many years and cannot reasonably rebuild full-time earnings. Any maintenance assumption should be reviewed with a solicitor." },
  { question: "Do inherited assets count after such a long marriage?", answer: "Inherited assets may still matter, but after 25 years they may have been mingled into family use — used to pay down the mortgage, fund holidays, or support the children. Evidence, timing and needs should all be reviewed." },
  { question: "Is the position different in Scotland or Northern Ireland?", answer: "Yes. Scotland's Family Law (Scotland) Act 1985 generally only shares matrimonial property accumulated between marriage and separation, with equal sharing the presumption. Spousal maintenance ('periodical allowance') is generally limited to three years. Northern Ireland's regime is broadly similar to England and Wales but operates under different legislation. Always take jurisdiction-specific advice." },
];

const relatedPages = [
  { title: "Silver Divorce UK", description: "Divorce in later life — pensions, retirement housing, and reduced earning years.", href: "/silver-divorce-uk", badge: "Later Life" },
  { title: "Long Marriage Divorce Settlement", description: "How English courts treat marriages of 20+ years.", href: "/long-marriage-divorce-settlement-uk", badge: "Length" },
  { title: "Pension Sharing vs Offsetting", description: "Two ways to deal with pension imbalances in a long marriage.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Model Your Settlement", description: "See your numbers shared four ways in five minutes.", href: "/wizard", badge: "Tool" },
];

export default function WifeEntitled25YearsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Financial Position After 25 Years of Marriage in the UK"
      subtitle="A long marriage with retirement in view. Pensions, housing, liquidity, health and standard of living usually need careful review before relying on any headline split."
      documentTitle="Financial Position After 25 Years Marriage UK | DivorceCalculatorUK"
      metaDescription="Financial checks after 25 years of marriage in the UK — how pension sharing, maintenance assumptions, standard of living and section 25 factors may shape the discussion."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "25-Year Marriage Checks", href: "/wife-entitled-divorce-uk-after-25-years" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          After 25 years, almost all assets and pensions may need to be reviewed as part of the shared financial picture. The big practical questions are how to handle pensions, how both parties can rehouse, and whether any maintenance assumption needs professional advice alongside the capital split.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How a long marriage is approached</h2>
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
        <InlineCTA label="Model an Equal-Sharing Outcome" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional 25-year marriage, both in their late 50s</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /><span>Family home equity £500k, husband's pension CETV £600k, wife's pension CETV £100k, joint savings £80k. Children adult and independent.</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>Total pool ≈ £1.28m. The model can test an equal-sharing assumption of roughly £640k each, then a solicitor or pension expert can review whether pension sharing, property and savings assumptions need adjustment.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only — every case turns on its specific facts.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures that drive a 25-year settlement</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Total matrimonial pool (assets minus liabilities)", "All pension CETVs (occupational, personal, SIPP, state)", "Net equity in family home + any other property", "Each party's expected retirement age", "Standard of living during the marriage", "Health and any age-related earning constraints", "Reasonable rehousing cost for both households", "Any inheritances received during the marriage"].map((fig, i) => (
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
          {["The pension sharing assumptions to check — that may need a PODE report on your specific schemes", "Whether longer-term spousal maintenance is appropriate or capitalisable", "How inherited or pre-marital assets should be reviewed after a long marriage"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/ukpga/1973/18/section/25" target="_blank" rel="noopener noreferrer">Matrimonial Causes Act 1973, section 25 <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.moneyhelper.org.uk/en/pensions-and-retirement/pension-problems/pensions-after-divorce-or-separation" target="_blank" rel="noopener noreferrer">MoneyHelper — Pensions after divorce or separation <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/state-pension" target="_blank" rel="noopener noreferrer">GOV.UK — State Pension <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal, tax or financial advice. Always take advice from a qualified family solicitor and pension specialist before agreeing a long-marriage settlement.</p>
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
