import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, PoundSterling, AlertCircle, CheckSquare, ExternalLink } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Five years counts as a 'short to medium' marriage", desc: "There is no statutory cut-off, but case law generally treats marriages under five years as short. The court will look at any pre-marital cohabitation as part of the overall relationship — five years married plus three years living together is usually treated as an eight-year relationship for needs purposes." },
  { label: "Children change the analysis significantly", desc: "Where there are minor children, their welfare is the court's first consideration under section 25(1) of the Matrimonial Causes Act 1973. Housing the primary carer and the children typically takes precedence over an equal split of the matrimonial pool." },
  { label: "Pre-marital assets often retain protection", desc: "After a short marriage, the court is more likely to ringfence assets brought into the marriage by either party — particularly property owned before the relationship. The longer the marriage, the more those distinctions blur." },
  { label: "Sharing focuses on what was built together", desc: "The 'sharing principle' applies most strongly to matrimonial property — assets accumulated during the marriage. After five years that pool may be modest compared to pre-marital wealth, especially with no children." },
  { label: "Spousal maintenance is rarer in shorter marriages", desc: "Courts increasingly favour a clean break where achievable. After a five-year marriage with no children and broadly comparable earning capacity, ongoing spousal maintenance is unlikely. Where there is a clear income gap or caring responsibilities, time-limited maintenance may apply." },
];

const faqItems = [
  { question: "What is a wife entitled to after 5 years of marriage in the UK?", answer: "There is no fixed percentage. The court applies section 25 of the Matrimonial Causes Act 1973 — looking at needs, resources, contributions, length of marriage, and the welfare of any children. After five years with no children and limited shared assets, each party may largely keep what they brought in, share what they built together, and aim for a clean break. With children, housing for the primary carer typically takes priority." },
  { question: "Does the wife automatically get half the house after 5 years?", answer: "No. The family home is matrimonial property and is in scope of the sharing principle, but how it is divided depends on needs, contributions and any pre-marital ownership. If one party owned the property before the marriage, the court may give them credit for that contribution — though it does not automatically exclude the home from sharing if both parties have lived in it as the matrimonial home." },
  { question: "Can my husband keep his pension after a 5-year marriage?", answer: "Pensions accrued during the marriage form part of the matrimonial pool. Pensions accrued before the marriage may be given less weight after a short marriage — particularly with no children. Pension sharing or offsetting is still possible and often appropriate. The Nuffield Foundation's Fair Shares research found pension sharing is significantly underused even where it would be the fair outcome." },
  { question: "Is spousal maintenance likely after 5 years?", answer: "Less likely than after a long marriage, but possible — particularly where one spouse has paused their career to raise young children, or where there is a significant income gap with no immediate prospect of closing it. Where awarded after a short marriage it is normally time-limited (term maintenance) rather than open-ended." },
  { question: "Does cohabitation before marriage count?", answer: "Yes — courts in England and Wales generally treat 'seamless' cohabitation moving directly into marriage as part of the overall relationship for needs purposes. Five years married preceded by three years of cohabitation is usually treated as an eight-year relationship in financial-remedy proceedings." },
  { question: "Where can I find the law that applies?", answer: "Section 25 of the Matrimonial Causes Act 1973 (available on legislation.gov.uk) sets out the statutory factors English and Welsh courts apply. GOV.UK's 'Money and property when a relationship ends' guidance is the official starting point. Scotland and Northern Ireland have separate legislation." },
];

const relatedPages = [
  { title: "Short Marriage Divorce Settlement UK", description: "How courts treat marriages under five years, with and without children.", href: "/short-marriage-divorce-settlement-uk", badge: "Length" },
  { title: "Section 25 Factors Explained", description: "The eight statutory factors every settlement is built on.", href: "/section-25-factors-divorce-uk", badge: "Law" },
  { title: "Pre-Marital Assets in Divorce", description: "When assets brought into the marriage are protected — and when they are not.", href: "/pre-marital-assets-divorce-uk", badge: "Assets" },
  { title: "Model Your Settlement", description: "See what different splits look like for your numbers.", href: "/wizard", badge: "Tool" },
];

export default function WifeEntitled5YearsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="What Is a Wife Entitled to After 5 Years of Marriage in the UK?"
      subtitle="A short-to-medium marriage. The law does not give a percentage answer — it gives a framework. Here is how that framework usually plays out at the five-year mark."
      documentTitle="Wife Entitled to After 5 Years Marriage UK | DivorceCalculatorUK"
      metaDescription="What a wife is entitled to after 5 years of marriage in the UK — how section 25 factors, pre-marital assets, children and pensions are weighed by family courts."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Entitled After 5 Years", href: "/wife-entitled-divorce-uk-after-5-years" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Five years is generally considered a short to medium marriage in England and Wales. There is no fixed percentage entitlement — the court applies the section 25 statutory factors and looks at what each party needs, what each contributed, and what they built together.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How the court approaches a 5-year marriage</h2>
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
        <InlineCTA label="See What Your Settlement Could Look Like" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenarios</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Two fictional five-year marriages, two very different starting points</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /><span><strong>Scenario A — no children:</strong> Both parties working, modest joint savings, husband owned the flat before the marriage. The court is likely to credit pre-marital contribution to the flat, share the joint savings and any equity built up during the marriage, and aim for a clean break.</span></div>
              <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-primary" /><span><strong>Scenario B — two young children:</strong> Wife reduced hours after the first child. The court's first consideration is housing for the children with their primary carer. The capital split typically prioritises that, even at the expense of an equal division of the matrimonial pool.</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span>Identical length of marriage. Very different outcomes — because the children's welfare and the housing need drive the analysis.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Actual outcomes depend on the full circumstances of each case.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures that drive a 5-year settlement</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Equity in any matrimonial home", "Pre-marital property values at the date of marriage", "Pensions accrued before vs during the marriage", "Joint savings and investments", "Each party's net income and earning capacity", "Childcare costs (if children)", "Reasonable rehousing budget for both parties", "Any debts in joint or sole names"].map((fig, i) => (
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
          {["Whether assets one party brought into the marriage will be ringfenced or shared", "Whether your spouse will agree to your proposed split", "Whether term maintenance is appropriate in your circumstances"].map((item, i) => (
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
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/looking-after-children-divorce" target="_blank" rel="noopener noreferrer">GOV.UK — Looking after children if you divorce or separate <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal, tax or financial advice. Take advice from a qualified family solicitor before agreeing any settlement.</p>
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
