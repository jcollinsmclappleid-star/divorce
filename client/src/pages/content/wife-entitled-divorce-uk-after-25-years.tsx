import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, PoundSterling, AlertCircle, CheckSquare, ExternalLink } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "A 25-year marriage is squarely a long marriage", desc: "By this point any meaningful pre-marital/matrimonial property distinction has usually faded. The whole pool is typically treated as matrimonial for sharing purposes — equal division is the strong starting point under English and Welsh case law." },
  { label: "Retirement is in view — pensions matter most", desc: "After 25 years one or both spouses may be approaching retirement. Pension provision becomes one of the most important parts of the settlement. Pension sharing orders aimed at broadly equalising retirement income are routine in long marriages." },
  { label: "Career and caring contributions are weighted equally", desc: "Section 25(2)(f) of the Matrimonial Causes Act 1973 treats financial and non-financial contributions equally. The spouse who built a career and the spouse who supported it are not viewed differently when the matrimonial pool is shared." },
  { label: "Standard of living is a strong reference point", desc: "Courts consider the standard of living enjoyed by the family before the breakdown when assessing needs. After a long marriage at a comfortable standard of living, both parties' reasonable needs are typically pegged closer to that level — within what the assets can support." },
  { label: "Spousal maintenance — including longer-term — is realistic", desc: "Where one spouse cannot achieve genuine financial independence at the time of the divorce (age, health, long career break), longer-term or even joint-lives maintenance remains possible. Courts still prefer to capitalise the need into a lump sum where the assets allow." },
];

const faqItems = [
  { question: "What is a wife entitled to after 25 years of marriage in the UK?", answer: "After a marriage of this length the strong starting point in England and Wales is equal sharing of the entire matrimonial pool, including all pensions. Departures from equality need a clear justification — usually housing needs, ill health, or a serious imbalance in needs that cannot be met by an equal split." },
  { question: "Is a 50/50 split the most likely outcome after 25 years?", answer: "Equal sharing of capital and pensions is the typical starting point. The actual division may not look 50/50 on every line item — for example, the family home may be allocated 60/40 to allow the primary spouse to remain there, balanced by 40/60 of the pensions. The aim is broad overall equality, not equality of every individual asset." },
  { question: "Will I get half my husband's pension after 25 years?", answer: "Pension sharing orders aimed at broadly equalising pension assets are routine in long marriages. The percentage shared depends on the relative pension values, the ages of the parties, and what other capital is available to balance the settlement. A pensions on divorce expert (PODE) report is normally needed in any case with significant pensions." },
  { question: "Is long-term spousal maintenance still likely?", answer: "It can be — particularly where the receiving spouse is older, in poor health, or has been out of the workforce for many years and cannot reasonably rebuild full-time earnings. Courts still favour a clean break where the assets allow the need to be capitalised into a lump sum payment." },
  { question: "Do inherited assets count after such a long marriage?", answer: "Inherited assets remain non-matrimonial in principle, but after 25 years they are more likely to have been mingled into family use — used to pay down the mortgage, fund holidays, or support the children. The longer they have been treated as joint family resources, the more likely they will be drawn into the sharing pool." },
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
      title="What Is a Wife Entitled to After 25 Years of Marriage in the UK?"
      subtitle="A long marriage with retirement in view. Equal sharing of the entire matrimonial pool — including pensions — is the typical starting point. Pensions and standard of living drive most of the detail."
      documentTitle="Wife Entitled to After 25 Years Marriage UK | DivorceCalculatorUK"
      metaDescription="What is a wife entitled to after 25 years of marriage in the UK? How equal sharing, pension sharing, spousal maintenance and standard of living shape a long-marriage settlement."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Entitled After 25 Years", href: "/wife-entitled-divorce-uk-after-25-years" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          After 25 years the law treats almost all the assets and pensions as part of the shared matrimonial pool. Equal division is the strong starting point in England and Wales. The big practical questions are how to handle pensions, how to ensure both parties can rehouse, and whether spousal maintenance is needed alongside the capital split.
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
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>Total pool ≈ £1.28m. An equal-sharing outcome ≈ £640k each, typically achieved through a substantial pension sharing order alongside a property and savings allocation that lets both parties rehouse comfortably.</span></div>
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
          {["The right pension sharing percentage — that needs a PODE report on your specific schemes", "Whether longer-term spousal maintenance is appropriate or capitalisable", "How a court would treat your specific inherited or pre-marital assets after a long marriage"].map((item, i) => (
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
