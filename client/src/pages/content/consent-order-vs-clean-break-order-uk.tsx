import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, Shield, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Is a clean break order a type of consent order?",
    answer: "Yes — a clean break order is contained within a consent order. The consent order is the document; the clean break clause is the provision within it that dismisses all future financial claims. All clean break orders are consent orders, but not all consent orders contain a clean break (some provide for ongoing maintenance without a clean break).",
  },
  {
    question: "Can I have a consent order without a clean break?",
    answer: "Yes. If one party is receiving spousal maintenance, the consent order will record the maintenance arrangements but will not contain a clean break clause — because financial claims (specifically income claims) remain ongoing. The maintenance may continue for a fixed term, after which a deferred clean break takes effect.",
  },
  {
    question: "Do I need both a consent order and a clean break order?",
    answer: "You need a consent order. If it contains a clean break clause, that is your clean break order — they are not two separate documents. Your solicitor will draft a consent order that includes all necessary provisions, including the clean break if appropriate.",
  },
  {
    question: "Which is more important to get right — the financial terms or the clean break?",
    answer: "Both are essential. The financial terms determine what you each receive now. The clean break ensures neither party can make future claims. Both must be correct — a generous financial settlement without a clean break leaves future claims open, and a clean break with inadequate financial terms gives you finality but not fairness.",
  },
  {
    question: "What happens if I divorce without a consent order at all?",
    answer: "All financial claims remain permanently open. This includes claims on property, savings, pensions, and income. There is no time limit on bringing a financial claim after divorce (unless the parties have obtained a consent order). Either party could make a financial claim years later if circumstances change.",
  },
  {
    question: "How much does a consent order with clean break cost?",
    answer: "The court filing fee is £53. Solicitor drafting costs vary — a simple clean break consent order may cost £300–800; a more complex one with property transfers, pension sharing, and maintenance will cost more. Some online services offer fixed-fee drafting for simpler cases. Both parties should have the opportunity to take independent legal advice before signing.",
  },
];

const relatedPages = [
  { title: "What is a Consent Order in UK Divorce?", description: "How the consent order document works and what it includes.", href: "/what-is-a-consent-order-uk-divorce", badge: "Legal Orders" },
  { title: "What is a Clean Break Order UK?", description: "How the clean break clause closes future financial claims.", href: "/what-is-a-clean-break-order-uk", badge: "Legal Orders" },
  { title: "When is a Divorce Financial Settlement Legally Binding?", description: "Understanding exactly when the consent order takes effect.", href: "/when-is-divorce-financial-settlement-legally-binding-uk", badge: "Legal" },
  { title: "Preview the Full Financial Report", description: "Understand what your settlement covers before agreeing to any consent order.", href: "/unlock", badge: "Report" },
];

export default function ConsentVsCleanBreakPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Consent Order vs Clean Break Order UK: What's the Difference?"
      subtitle="These two terms are often confused — but they are not the same thing. A consent order is the legal document; a clean break is a provision within it. Understanding the distinction helps you know what needs checking."
      documentTitle="Consent Order vs Clean Break Order UK | DivorceCalculatorUK"
      metaDescription="Clear explanation of the difference between a consent order and a clean break order in UK divorce — what each term means, what each covers, and which you need."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Consent Order vs Clean Break Order UK", href: "/consent-order-vs-clean-break-order-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The terms 'consent order' and 'clean break order' are often used interchangeably — but they mean different things. Understanding the distinction is important, because what you need from your settlement depends on whether your situation allows for a clean break at all.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className="border-blue-200">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-sm text-blue-700">Consent Order</p>
              </div>
              <p className="text-sm text-muted-foreground">A consent order is the legal document — the court order itself. It is drawn up by a solicitor, signed by both parties, and submitted to the Family Court for approval. Once approved by a judge, it becomes a binding court order.</p>
              <p className="text-sm text-muted-foreground">A consent order can contain many different provisions — property transfers, pension sharing, maintenance payments, lump sum orders — as well as (or without) a clean break clause.</p>
              <p className="text-sm font-medium">Think of it as: the container.</p>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-sm text-green-700">Clean Break Order</p>
              </div>
              <p className="text-sm text-muted-foreground">A clean break order is not a separate document — it is a specific provision within a consent order. The clean break clause dismisses all future financial claims between the parties permanently.</p>
              <p className="text-sm text-muted-foreground">A consent order without a clean break clause deals with the financial division but leaves income claims (maintenance) open. A consent order with a clean break dismisses everything — capital and income claims — permanently.</p>
              <p className="text-sm font-medium">Think of it as: the future-claims clause inside the container.</p>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">When Can You Have a Clean Break?</h2>
        <p className="text-muted-foreground text-sm mb-4">A clean break is possible when the capital settlement provides each party with enough to meet their reasonable needs independently — without ongoing maintenance. Courts cannot impose a clean break where it would leave a party genuinely unable to meet their needs.</p>
        <div className="space-y-3 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-1">
              <p className="text-sm font-semibold text-green-700">Clean break is achievable where:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                <li>Both parties are in work and earn broadly comparable incomes</li>
                <li>The marriage was shorter and both have independent financial histories</li>
                <li>There is sufficient capital to leave both parties financially self-sufficient</li>
                <li>Any income gap can be addressed through capital (e.g. one party taking a larger lump sum)</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-1">
              <p className="text-sm font-semibold text-amber-700">Clean break may not be immediate where:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                <li>There is a significant income gap and insufficient capital to bridge it</li>
                <li>The primary carer has reduced earning capacity due to childcare responsibilities</li>
                <li>The lower earner needs a transition period to become financially independent</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">In these cases, a deferred clean break may apply — maintenance for a fixed term, then a clean break takes effect automatically.</p>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Model Whether a Clean Break Works for You" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures to Help Assess Clean Break Viability</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Net income of both parties post-separation",
            "Monthly essential outgoings for each party",
            "Net equity in the family home",
            "Pension CETVs for both parties",
            "Any savings or investment assets",
            "Childcare costs (if applicable)",
            "Likely rental or mortgage cost for each party",
            "Any income support (benefits, tax credits) available",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Assuming a clean break is always achievable", desc: "Where there is a significant income gap — particularly after a long marriage with a career sacrificed by one partner — a clean break may not be immediately achievable. Maintenance for a transitional period is common." },
            { label: "Leaving financial claims open without a consent order", desc: "Many divorces proceed without a consent order. Both parties may intend to 'sort it out later'. Without a consent order, all claims remain permanently open — including claims on future inheritances, property acquisitions, or business success." },
            { label: "Not understanding the difference until it is too late", desc: "Some people believe they have a 'clean break' because they verbally agreed or exchanged emails. A court-approved consent order with a clean break clause is the formal route for closing future financial claims. Informal agreements are not enforceable in the same way." },
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
            "Whether a clean break is legally achievable in your specific circumstances — this requires a professional assessment of needs and ability to pay",
            "Whether a deferred clean break with a fixed maintenance term is more appropriate than an immediate clean break",
            "How to discuss clean-break fairness with a solicitor if you cannot agree",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is an immediate clean break achievable given both parties' income positions?</li>
          <li>If not, what would a reasonable maintenance term be before a deferred clean break?</li>
          <li>Could the income gap be addressed through additional capital rather than maintenance?</li>
          <li>Are there any pension or capital claims that could survive a standard clean break clause?</li>
        </ul>
        <InlineCTA label="Model Your Settlement to Test Clean Break Viability" />
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
