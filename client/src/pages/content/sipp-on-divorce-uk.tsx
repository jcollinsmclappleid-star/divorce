import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PiggyBank, AlertCircle, CheckSquare, ExternalLink, TrendingUp } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "A SIPP is a defined contribution pension", desc: "A Self-Invested Personal Pension (SIPP) is a money-purchase (defined contribution) scheme where the value is the sum of the contributions plus investment growth, less charges. Unlike a defined benefit/final salary pension, the CETV is straightforward — it is essentially the current fund value." },
  { label: "Pension sharing works the same way", desc: "SIPPs are subject to pension sharing orders in the same way as any other UK pension. The order specifies a percentage of the SIPP fund value to be transferred to a pension credit for the other spouse — usually into a new pension in their name (or a designated SIPP receiving scheme)." },
  { label: "Investment risk needs to be considered", desc: "Because a SIPP is invested, the value can move significantly between the date of valuation and the date of implementation of any pension sharing order. The order specifies a percentage, not a fixed pound amount — so both parties take the investment risk between the date of the order and the date of implementation." },
  { label: "Charges and complexity vary widely", desc: "SIPPs range from low-cost online platforms holding standard funds to full-service SIPPs holding commercial property, EIS investments, and unlisted shares. Complex SIPPs may take longer to value and to implement a pension sharing order against, and may require specialist advice from a regulated financial adviser and a Pensions on Divorce Expert (PODE)." },
  { label: "Drawdown SIPPs need extra care", desc: "Where a SIPP is in drawdown (the holder is taking income), the income payments interact with the pension share. The order may need to address whether income is suspended during implementation, how Uncrystallised vs Crystallised funds are split, and tax treatment of subsequent withdrawals. PODE input is normally needed." },
];

const faqItems = [
  { question: "Can a SIPP be shared in a UK divorce?", answer: "Yes. SIPPs are subject to the same pension sharing rules as any other UK pension under the Welfare Reform and Pensions Act 1999. The court can make a pension sharing order specifying a percentage of the SIPP fund value to be transferred to a pension credit in the other spouse's name." },
  { question: "How is a SIPP valued for divorce purposes?", answer: "The Cash Equivalent Transfer Value (CETV) of a SIPP is essentially the fund value at the valuation date — the underlying investments at market value, less any charges. This is much simpler than valuing a defined benefit pension. Most SIPP providers can produce a CETV statement on request, often free of charge." },
  { question: "Can the receiving spouse take the SIPP money as cash?", answer: "Not from the pension share itself. A pension credit must be paid into a pension scheme — either an existing pension or a new one. Once the pension credit is in a pension, the receiving spouse can choose, subject to age (currently 55, rising to 57 from 2028) and the usual tax rules, to take the 25% pension commencement lump sum and draw or annuitise the rest." },
  { question: "What about complex SIPP investments — property, unlisted shares?", answer: "SIPPs holding commercial property or unlisted investments can be much harder to value and to split. Some providers will not accept partial in-specie transfers — meaning the assets may need to be sold to release cash for the pension share, with implications for tax, fees, and timing. A Pensions on Divorce Expert (PODE) and the SIPP provider should be involved early." },
  { question: "Does pension offsetting work for SIPPs?", answer: "Yes — instead of a pension sharing order, the parties can agree that one party keeps the SIPP and the other receives a larger share of other (non-pension) assets to compensate. This is usually only sensible where the SIPP is one of several assets and where both parties have other resources. Offsetting needs careful valuation because pension assets and non-pension assets are not pound-for-pound equivalent in the hand." },
  { question: "Is regulated financial advice needed?", answer: "It is strongly recommended for any pension sharing order. The receiving spouse needs to set up a pension scheme to receive the pension credit, and the choice of scheme has long-term implications. The Money and Pensions Service (MoneyHelper) provides free pension guidance via Pension Wise (for over-50s) — but for advice you need an FCA-regulated independent financial adviser." },
];

const relatedPages = [
  { title: "CETV Explained", description: "The cash equivalent value used to share pensions on divorce.", href: "/cetv-explained-divorce-uk", badge: "Pensions" },
  { title: "Pension Sharing vs Offsetting", description: "Two ways to deal with pension imbalances on divorce.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Pension Attachment vs Pension Sharing", description: "Two different pension order types and their consequences.", href: "/pension-attachment-order-vs-sharing-order-uk", badge: "Orders" },
  { title: "Final Salary Pension on Divorce", description: "How defined benefit pensions are valued and shared.", href: "/final-salary-pension-on-divorce-uk", badge: "Pensions" },
];

export default function SippOnDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="SIPP on Divorce in the UK"
      subtitle="Self-Invested Personal Pensions are subject to the same pension sharing rules as any other UK pension. The valuation is simpler than for a final salary scheme — but complex investments inside a SIPP need extra care."
      documentTitle="SIPP on Divorce UK | DivorceCalculatorUK"
      metaDescription="How a Self-Invested Personal Pension (SIPP) is treated on divorce in the UK — pension sharing orders, valuation, complex investments, drawdown, and offsetting alternatives."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "SIPP on Divorce", href: "/sipp-on-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          SIPPs are common, particularly among self-employed professionals and those who have consolidated workplace pensions. On divorce they are treated like any other UK pension — pension sharing orders are routine — but the breadth of what a SIPP can hold means valuations and implementation can vary from very straightforward to genuinely complex.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Key things to know</h2>
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
        <InlineCTA label="Model a Pension Sharing Outcome" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional couple — long marriage, husband holds SIPP</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><PiggyBank className="w-4 h-4 text-primary" /><span>Husband's SIPP value £400k (low-cost platform, mainstream funds). Wife has small workplace pension £40k. Family home equity £350k.</span></div>
              <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /><span>A pension sharing order of around 45% of the SIPP could broadly equalise pensions. Implementation typically takes 4–6 months from final order; fund values can move during that period — both parties take that risk.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Always involve an FCA-regulated financial adviser and PODE.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Information you will need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Most recent SIPP CETV statement", "Underlying investment breakdown", "Whether the SIPP is in drawdown", "Annual statement showing charges and fund performance", "Any in-specie restrictions from the provider", "Both parties' ages and intended retirement dates", "Other pension arrangements for both parties", "Total matrimonial pool value (for context)"].map((fig, i) => (
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
          {["Recommend a specific pension sharing percentage — that needs PODE input", "Recommend a receiving scheme for the pension credit — that needs an FCA-regulated adviser", "Predict investment performance during implementation"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.legislation.gov.uk/ukpga/1999/30/contents" target="_blank" rel="noopener noreferrer">Welfare Reform and Pensions Act 1999 (pension sharing) <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.moneyhelper.org.uk/en/pensions-and-retirement/pension-problems/pensions-after-divorce-or-separation" target="_blank" rel="noopener noreferrer">MoneyHelper — Pensions after divorce or separation <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.moneyhelper.org.uk/en/pensions-and-retirement/pension-wise" target="_blank" rel="noopener noreferrer">Pension Wise (free guidance, age 50+) <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.fca.org.uk/" target="_blank" rel="noopener noreferrer">FCA — Find a regulated financial adviser <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal, tax, financial or pension advice. Pension decisions on divorce should be taken with input from an FCA-regulated adviser and a Pensions on Divorce Expert.</p>
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
