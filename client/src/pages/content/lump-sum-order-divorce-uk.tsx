import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Banknote, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const features = [
  { title: "Single payment or instalments", desc: "A lump sum order can require a one-off payment or a series of payments over time. Both are still 'lump sum' in legal terms — periodic instalments differ from spousal maintenance because the total amount is fixed at the outset." },
  { title: "Often paired with property and pension orders", desc: "A lump sum is rarely the only element of a settlement. It typically sits alongside property transfer, pension sharing, and (sometimes) maintenance to make up the overall package." },
  { title: "Final and binding once made", desc: "Unlike spousal maintenance (which can be varied if circumstances change), a lump sum order is generally final. Once the consent order is sealed and the payment terms set, varying the figure later is very difficult." },
  { title: "Used to fund the receiving party's housing", desc: "The most common purpose of a lump sum is to provide capital for the receiving party to rehouse — either as a deposit on a new property or as the cash to buy outright. The size of the lump sum is often driven by housing need." },
  { title: "Tax-free in the receiving party's hands", desc: "Lump sums between divorcing spouses paid under a court order are not subject to income tax for the recipient. (Capital gains tax may still arise on the assets sold to fund the lump sum — qualified tax advice is normally needed.)" },
  { title: "Funded from available assets", desc: "Lump sums are typically funded from cash, savings, sale of property, or borrowing. Where the paying party doesn't have liquid funds, the order may permit instalments — but the obligation is to pay regardless of how it's funded." },
];

const figures = [
  "Total assets in the matrimonial pot",
  "Liquid assets available to fund a lump sum (cash, savings)",
  "Property equity that could be released",
  "Borrowing capacity of the paying party",
  "Receiving party's housing need (target purchase price)",
  "Receiving party's deposit and mortgage capacity",
  "CGT implications of liquidating assets to fund the lump sum",
  "Whether instalments are realistic given the paying party's cashflow",
];

const faqItems = [
  {
    question: "What is a lump sum order in UK divorce?",
    answer: "A lump sum order requires one party to pay the other a fixed sum of money — either as a single payment or in scheduled instalments. It is one of the standard types of financial order made on divorce, sitting alongside property adjustment orders, pension sharing orders, and (sometimes) maintenance orders.",
  },
  {
    question: "Is a lump sum order taxable?",
    answer: "Lump sums paid under a divorce financial order are not taxable income for the recipient. There may be capital gains tax considerations on the assets sold to fund the lump sum (e.g. selling shares or property) — qualified tax advice is normally needed.",
  },
  {
    question: "Can a lump sum order be paid in instalments?",
    answer: "Yes. The order can specify a single payment or a series of instalments over a defined period. The total amount is fixed at the outset — this is what makes it a lump sum order rather than a maintenance order, even when paid over time.",
  },
  {
    question: "Can a lump sum order be varied later?",
    answer: "Generally no — lump sum orders are intended to be final and binding. Variation is only possible in very limited circumstances (typically only the timing of instalments). This is one of the main advantages of a lump sum: it gives both parties certainty.",
  },
  {
    question: "What if the paying party can't fund the lump sum?",
    answer: "The order is binding regardless of how it's funded. If the paying party doesn't have liquid funds, they may need to sell assets, borrow, or apply for an instalment schedule. Failure to pay can lead to enforcement action — including charging orders against property and ultimately forced sale of assets.",
  },
  {
    question: "Is a lump sum better than spousal maintenance?",
    answer: "It depends on circumstances. Lump sums give certainty and a clean break — no ongoing financial relationship. Maintenance gives ongoing income but creates a long-term financial tie. Where there is enough capital, a clean break with a lump sum is often preferred. Where capital is limited, maintenance may be the only realistic option.",
  },
];

const relatedPages = [
  { title: "What is a Clean Break Order UK?", description: "How a lump sum supports a clean break.", href: "/what-is-a-clean-break-order-uk", badge: "Orders" },
  { title: "What is a Consent Order in UK Divorce?", description: "The document that contains the lump sum order.", href: "/what-is-a-consent-order-uk-divorce", badge: "Orders" },
  { title: "Spousal Maintenance After Divorce UK", description: "The alternative to a lump sum for ongoing income provision.", href: "/spousal-maintenance-after-divorce-uk", badge: "Maintenance" },
  { title: "Preview the Full Financial Report", description: "Model lump sum scenarios with your figures.", href: "/unlock", badge: "Report" },
];

export default function LumpSumOrderPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Lump Sum Order in UK Divorce"
      subtitle="A lump sum order requires one party to pay the other a fixed amount — either as a single payment or in instalments. It's a common feature of UK divorce settlements, particularly where one party needs capital to rehouse."
      documentTitle="Lump Sum Order UK Divorce | DivorceCalculatorUK"
      metaDescription="How lump sum orders work in UK divorce — single payments vs instalments, tax treatment, funding options, finality, and how lump sums fit alongside property and pension orders."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Lump Sum Order UK Divorce", href: "/lump-sum-order-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A lump sum order is one of the standard types of financial order a court can make on divorce in England and Wales. It requires one party to pay the other a fixed amount — either as a single payment or as a series of scheduled instalments. Lump sums often sit alongside property adjustment orders and pension sharing orders to make up the overall settlement package, and are most commonly used to fund the receiving party's housing or compensate for unequal asset division elsewhere.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">A lump sum order is generally final and not variable — once made, you typically cannot revisit the figure later if circumstances change. Get the modelling right before agreeing the amount.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Things to Know About Lump Sum Orders</h2>
        <div className="space-y-4 mb-6">
          {features.map((f, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Banknote className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{f.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Lump Sum vs Maintenance Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures You Will Need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {figures.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Funding the lump sum", desc: "If the paying party doesn't have liquid funds, the lump sum may need to come from selling assets, releasing equity from property, or borrowing. Each of these has its own cost and timeline — the order should match what's actually achievable." },
            { label: "Tax cost of liquidation", desc: "Selling investments to fund a lump sum can crystallise capital gains tax. The net cost to the paying party may be higher than the headline lump sum amount. CGT planning matters." },
            { label: "Instalment risk", desc: "If the lump sum is paid by instalments, the receiving party carries the risk of non-payment. Charging orders, security against property, or upfront partial payment can mitigate this." },
            { label: "Finality vs flexibility", desc: "A lump sum gives certainty but no flexibility for future change. If circumstances are likely to shift significantly, a different settlement structure (e.g. maintenance with periodic review) may be more appropriate." },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <p className="text-sm font-semibold mb-1">{p.label}</p>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the Calculator Cannot Decide</h2>
        <div className="space-y-3 mb-6">
          {[
            "The right size of lump sum for your case — this depends on the overall settlement",
            "Whether instalments are appropriate, and what schedule would be acceptable",
            "How CGT or other tax should be factored into the calculation",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is a lump sum the right structure for our case, or would maintenance work better?</li>
          <li>How will the lump sum be funded, and what's the tax cost of liquidating assets?</li>
          <li>Should the lump sum be paid in instalments, and if so on what schedule?</li>
          <li>What security should the receiving party have for instalment payments?</li>
          <li>How does the lump sum interact with property and pension orders in our package?</li>
        </ul>
        <InlineCTA label="Compare Settlement Structures" />
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
