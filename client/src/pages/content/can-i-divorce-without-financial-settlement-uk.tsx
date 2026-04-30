import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, Shield, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Can I divorce without sorting out finances first?",
    answer: "Yes — the divorce and the financial settlement are two separate legal processes. You can obtain a final divorce order (formerly Decree Absolute) without having a financial order in place. However, this is strongly inadvisable, as it leaves all financial claims open indefinitely.",
  },
  {
    question: "Do I need a financial order to remarry?",
    answer: "No — you need a final divorce order to remarry, not a financial order. However, remarriage automatically bars you from making a financial claim against your ex-spouse if you have not already issued a financial remedy application. Make sure you have applied before you remarry.",
  },
  {
    question: "What if we agree informally and never go to court?",
    answer: "An informal agreement — even written — is not legally binding. Either party can walk away from it and make financial claims in court at any time, potentially years later. Only a court-approved consent order creates a legally binding settlement.",
  },
  {
    question: "How long can financial claims be made after divorce?",
    answer: "Technically indefinitely — until a clean break consent order is made. There is no time limit on financial applications after divorce in England and Wales. The landmark Wyatt v Vince case (2015) involved a financial claim more than 20 years after the divorce.",
  },
  {
    question: "Can a clean break order be obtained cheaply?",
    answer: "A clean break consent order can be relatively low-cost compared to contested proceedings. The court fee is £53, and many straightforward cases can be drafted by a solicitor for a few hundred pounds. Online services also offer consent order drafting. The cost is small compared to the legal risk of leaving claims open.",
  },
  {
    question: "Does a financial order always require a court hearing?",
    answer: "Not necessarily. A consent order — where both parties agree — can be submitted to the court for approval without a formal hearing. A judge reviews the order on paper and approves it if it appears fair. Contested proceedings require hearings, but where parties reach agreement, the process can be largely administrative.",
  },
];

const relatedPages = [
  { title: "What is a Clean Break Order UK?", description: "Why a clean break order permanently closes all financial claims.", href: "/what-is-a-clean-break-order-uk", badge: "Legal Orders" },
  { title: "When is a Divorce Financial Settlement Legally Binding?", description: "The difference between agreement and legal finality.", href: "/when-is-divorce-financial-settlement-legally-binding-uk", badge: "Legal" },
  { title: "How Long After Divorce Can Financial Claims Be Made UK?", description: "The time limits (and lack of them) on financial claims after divorce.", href: "/how-long-after-divorce-can-financial-claims-be-made-uk", badge: "Legal" },
  { title: "Preview the Full Financial Report", description: "Understand what a complete financial settlement model covers.", href: "/unlock", badge: "Report" },
];

export default function DivorceWithoutFinancialSettlementPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Can I Divorce Without a Financial Settlement UK?"
      subtitle="Technically yes — but it is one of the most financially dangerous things you can do. Without a clean break consent order, financial claims against you remain open for life — no matter how long ago you divorced."
      documentTitle="Can I Divorce Without a Financial Settlement UK? | DivorceCalculatorUK"
      metaDescription="Understand the risks of divorcing without a financial settlement in England and Wales — why financial claims remain open for life without a clean break consent order."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Can I Divorce Without Financial Settlement UK?", href: "/can-i-divorce-without-financial-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          In England and Wales, the divorce process and the financial settlement are completely separate legal processes. You can obtain a final divorce order without having addressed the finances at all. Courts will not automatically refuse to grant a divorce simply because financial matters are unresolved. However, divorcing without a financial order is one of the most significant financial risks you can take — and understanding why matters before modelling any scenario.
        </p>

        <Card className="border-red-200 bg-red-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800 mb-1">The Wyatt v Vince Warning</p>
                <p className="text-sm text-red-700">In this landmark Supreme Court case (2015), Kathleen Wyatt successfully applied to make a financial claim against Dale Vince — her ex-husband — more than 20 years after their divorce. No financial order had ever been made. He had since become a multimillionaire through his green energy business. The case confirmed that financial claims after divorce have no time limit without a clean break consent order.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What Happens Without a Financial Order?</h2>
        <div className="space-y-3 mb-6">
          {[
            "All financial claims — property, savings, pensions, and income — remain legally open",
            "Either party can return to court to make claims at any time in the future",
            "Future assets — including inheritance, business success, or lottery wins — can be claimed",
            "Remarriage bars your own claims (if you remarry without applying) but not your ex's claims against you",
            "An informal agreement between the parties is not legally binding",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">The Solution: A Clean Break Consent Order</h2>
        <div className="flex items-start gap-3 p-4 rounded-lg border bg-background mb-6">
          <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold mb-1">What a clean break consent order does</p>
            <p className="text-sm text-muted-foreground">A clean break consent order, approved by the Family Court, permanently dismisses all financial claims between the parties — for both capital (property, savings, pensions) and income (maintenance). It provides absolute legal certainty. Even where both parties have very limited assets, a clean break consent order protects them both from future claims.</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">Getting a clean break consent order costs significantly less than the risk of future proceedings. The court fee is £53, and simple consent orders can be drafted relatively cheaply. This is money well spent for permanent legal protection.</p>
        <InlineCTA label="Understand What Your Settlement Should Include" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures Worth Modelling Before Any Agreement</h2>
        <p className="text-sm text-muted-foreground mb-4">Before agreeing a settlement — even informally — having a clear picture of the full financial position is important:</p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Property value and outstanding mortgage balance",
            "Pension CETVs for both parties",
            "Savings, ISAs, and investments",
            "Joint and sole liabilities (loans, credit cards)",
            "Gross income of both parties",
            "Monthly income and expenditure for both parties",
            "Any assets in sole names (vehicles, business interests)",
            "Anticipated future income changes",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Financial Pressure Points Without a Settlement</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Future inheritance claims", desc: "Without a consent order, any inheritance you receive in the future could be the subject of a financial claim by your ex-spouse, regardless of how many years have passed." },
            { label: "Business growth vulnerability", desc: "If you build a business or accumulate significant wealth post-divorce, a former partner without a consent order in place may be able to claim against those assets." },
            { label: "Pension claims remain open", desc: "Pension sharing orders can only be made during financial remedy proceedings or with a consent order. Without one, pension claims remain open indefinitely." },
            { label: "Re-mortgage or property sale complications", desc: "If both names are on the mortgage or property title, disposing of property without resolving the financial settlement can create practical and legal complications." },
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
            "Whether a clean break is achievable in your specific circumstances — this depends on assets, income, and needs",
            "What the court would consider a fair settlement — the calculator models scenarios, not legal outcomes",
            "Whether you need a full consent order or just a simple clean break — a solicitor's view may be relevant",
            "The tax implications of different settlement structures — professional advice may be needed",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What should be included in the consent order to achieve a complete clean break?</li>
          <li>Is a simple clean break achievable given the assets and income positions of both parties?</li>
          <li>How should pension rights be addressed in the consent order?</li>
          <li>What is the cost and timeline of obtaining a straightforward consent order in our situation?</li>
        </ul>
        <InlineCTA label="Model the Full Financial Position Before Agreeing Anything" />
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
