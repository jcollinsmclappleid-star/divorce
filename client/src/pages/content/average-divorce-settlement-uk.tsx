import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scale, PoundSterling, AlertCircle, CheckSquare, ExternalLink } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const myths = [
  { label: "There is no 'average' that applies to your case", desc: "England and Wales family courts make orders by reference to the section 25 factors of the Matrimonial Causes Act 1973 — needs, resources, ages, length of marriage, contributions, and the standard of living during the marriage. Two couples with identical assets can reach very different outcomes." },
  { label: "50/50 is a starting point, not a default", desc: "The 'sharing principle' established in White v White (2000) and Miller; McFarlane (2006) treats equal division of matrimonial property as a starting point, but needs (especially housing for any children) routinely override an equal split in lower- and middle-asset cases." },
  { label: "Reported figures are skewed by litigated cases", desc: "Press-reported settlement figures usually come from contested final hearings — a small minority of cases. Most divorces settle by consent order, and those settlements are not published or aggregated by HMCTS." },
  { label: "Pensions are often the largest hidden asset", desc: "Government data and academic studies consistently find that pensions are routinely undervalued in informal settlements. The Nuffield Foundation 'Fair Shares' research (2023) found only around 11% of divorces include pension sharing despite pensions often being the second-largest asset." },
  { label: "Most cases have far less wealth than the headlines", desc: "ONS data shows median household wealth in Great Britain is well below the figures quoted in big-money divorce reporting. For most couples the question is not 'how much extra' but 'how do we both house ourselves and survive financially after this?'" },
];

const faqItems = [
  { question: "Is there an average divorce settlement amount in the UK?", answer: "There is no published official 'average' figure. The Ministry of Justice publishes Family Court statistics, but they do not aggregate financial-remedy outcomes by amount. Settlement values vary enormously based on assets, income, length of marriage, and whether children are involved. Any figure presented as 'the average' should be treated with scepticism." },
  { question: "What percentage of assets does a wife typically get?", answer: "There is no fixed percentage. Courts apply the section 25 factors in each case. In a long marriage with substantial assets above what either party 'needs', the sharing principle points to roughly equal division. In a needs case (most cases), the lower-earning party — often the primary carer for children — may receive more than half the capital to ensure they can house themselves and the children." },
  { question: "Does a 50/50 split apply by default in England and Wales?", answer: "No. Equal sharing is a starting point for matrimonial property, not a default outcome. Section 25 of the Matrimonial Causes Act 1973 requires the court to consider needs, resources, contributions, length of marriage, and the welfare of any minor children — and needs often override equal sharing in practice." },
  { question: "Is the law the same across the UK?", answer: "No. England and Wales operate one regime under the Matrimonial Causes Act 1973. Scotland operates a different regime under the Family Law (Scotland) Act 1985 — broadly only matrimonial property acquired during the marriage is shared, with a presumption of equal division. Northern Ireland has its own legislation broadly similar to England and Wales. Always check the jurisdiction that applies to your case." },
  { question: "Where can I find official UK family court data?", answer: "The Ministry of Justice publishes quarterly Family Court Statistics on GOV.UK. These include numbers of divorce applications, financial-remedy applications, and timelines — but not aggregated settlement amounts. The Nuffield Foundation's 'Fair Shares' research (2023) is the most comprehensive published study of actual divorce financial outcomes in England and Wales." },
  { question: "Can the calculator tell me what my settlement will be worth?", answer: "No tool can predict what a court would order or what your spouse will agree to. The Divorce Calculator UK is a modelling tool — it shows you what different splits would mean for both parties' net capital, monthly cashflow, and 5-year financial position. The actual settlement is a negotiated outcome (or a court order based on section 25) — the model helps you understand the range of possibilities." },
];

const relatedPages = [
  { title: "What Am I Entitled to in Divorce UK?", description: "How section 25 factors shape your entitlement — and why there is no fixed formula.", href: "/what-am-i-entitled-to-in-divorce-uk", badge: "Entitlement" },
  { title: "Section 25 Factors Explained", description: "The eight statutory factors English courts apply to every financial settlement.", href: "/section-25-factors-divorce-uk", badge: "Law" },
  { title: "Is a 50/50 Split Automatic?", description: "Why equal sharing is a starting point, not a guaranteed outcome.", href: "/is-50-50-split-automatic-uk", badge: "Splits" },
  { title: "Settlement Examples by Scenario", description: "Worked illustrative examples across short, medium and long marriages.", href: "/divorce-settlement-examples-uk", badge: "Examples" },
];

export default function AverageDivorceSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Average Divorce Settlement UK: What the Numbers Actually Show"
      subtitle="There is no published official 'average' divorce settlement in England and Wales. Here is what the law, the data, and the research actually say — and how to model your own figures rather than rely on someone else's."
      documentTitle="Average Divorce Settlement UK | DivorceCalculatorUK"
      metaDescription="Is there an 'average' divorce settlement in the UK? What official data and the Nuffield Foundation Fair Shares research show — and how to model your own outcome."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Average Divorce Settlement UK", href: "/average-divorce-settlement-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          When people search for the 'average UK divorce settlement', they are usually looking for a benchmark. The honest answer is that no single benchmark applies — and presenting one would be misleading. Settlements in England and Wales are governed by section 25 of the Matrimonial Causes Act 1973, which directs the court to a set of statutory factors rather than to any percentage formula.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Below we set out what the published data actually says, what the leading research has found, and how to think about your own figures.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What the data does — and does not — tell us</h2>
        <div className="space-y-3 mb-6">
          {myths.map((f, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-lg border">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold mb-1">{f.label}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Model Your Own Settlement Range" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Why the 'average' figure is not useful</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Two fictional couples — same total assets, very different outcomes</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span><strong>Couple A:</strong> 25-year marriage, £600k pool (£400k home, £150k pensions, £50k cash), two adult children. Equal sharing is the likely starting point — both parties may walk away with around £300k of capital each, structured to allow both to rehouse.</span></div>
              <div className="flex items-center gap-2"><PoundSterling className="w-4 h-4 text-primary" /><span><strong>Couple B:</strong> 4-year marriage, same £600k pool, no children, both bringing in significant pre-marital assets. The court may discount non-matrimonial property and award each closer to what they brought in plus a smaller share of the joint accumulation.</span></div>
              <div className="flex items-center gap-2"><Scale className="w-4 h-4 text-primary" /><span>Same headline pool. Very different outcomes — driven by length of marriage, source of the assets, and needs.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Outcomes depend on the full facts of each case.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures that actually matter for your case</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Total matrimonial pool (assets minus liabilities) at separation",
            "Pension CETVs for both parties (often the second-largest asset)",
            "Net equity in the family home and any other property",
            "Each party's net monthly income after tax, NI and pension contributions",
            "Reasonable monthly outgoings post-separation for two households",
            "Childcare costs and care arrangements where relevant",
            "Length of the marriage (and any pre-marital cohabitation)",
            "Pre-marital assets, inheritances and gifts received during the marriage",
          ].map((fig, i) => (
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
          {[
            "What share of the matrimonial pool a court would award you on your specific facts",
            "Whether your spouse will agree to the figures you put forward",
            "How a judge would weigh non-matrimonial property, contributions or conduct",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources & further reading</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/government/collections/family-court-statistics-quarterly" target="_blank" rel="noopener noreferrer">Ministry of Justice — Family Court Statistics Quarterly <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/ukpga/1973/18/section/25" target="_blank" rel="noopener noreferrer">Matrimonial Causes Act 1973, section 25 (legislation.gov.uk) <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.nuffieldfoundation.org/project/fair-shares-sorting-out-money-and-property-on-divorce" target="_blank" rel="noopener noreferrer">Nuffield Foundation — Fair Shares: Sorting Out Money and Property on Divorce (2023) <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank" rel="noopener noreferrer">GOV.UK — Money and property when a relationship ends <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">This page is general information based on publicly available UK government and research sources. It is not legal, tax or financial advice and is not a substitute for advice from a qualified solicitor, accountant or financial adviser regulated in the UK.</p>
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
