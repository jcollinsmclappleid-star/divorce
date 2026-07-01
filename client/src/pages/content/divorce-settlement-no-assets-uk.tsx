import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "Do I still need a consent order if we have no assets?",
    answer: "Yes. Even if you have no assets now, a clean break consent order is the formal route for closing future financial claims. Without one, future claims may remain possible if one of you later acquires significant assets — for example through a lottery win, inheritance, business success, or property purchase.",
  },
  {
    question: "Can I get a consent order for free if there are no assets?",
    answer: "You cannot avoid the court fee (£53), but some online services offer low-cost consent order drafting for simple situations. Both parties should have the opportunity to take independent legal advice before signing, even if neither instructs a solicitor formally.",
  },
  {
    question: "What about pensions if we have no other assets?",
    answer: "Pensions are often the most significant asset in marriages with no property. Even if there is no property or savings, pensions may need to be addressed — through pension sharing or earmarking — or a clean break order should dismiss all pension claims.",
  },
  {
    question: "What if we have debt but no assets?",
    answer: "Debt is different from assets — it cannot be transferred to a third party (the creditor) without their consent. Your divorce settlement can address who is responsible for which debts between yourselves, but the creditor is not bound by your consent order. Both parties remain liable to creditors for joint debts.",
  },
  {
    question: "If both of us are renting, does financial settlement still matter?",
    answer: "Yes. Even where neither party owns property, financial claims remain open without a consent order. Future assets — including an inheritance, a property purchase, or a business interest — can all be claimed by a former spouse years later. A clean break consent order is important regardless of current asset levels.",
  },
  {
    question: "Can the calculator still be useful if we have no significant assets?",
    answer: "Yes. The calculator models income positions, monthly cashflow, and the income gap between parties. Even in a low-asset divorce, understanding the ongoing income dynamic — who needs what to cover living costs — can be important for agreeing any maintenance position and for modelling life post-separation.",
  },
];

const relatedPages = [
  { title: "What is a Clean Break Order UK?", description: "Why a clean break order is essential even with no significant assets.", href: "/what-is-a-clean-break-order-uk", badge: "Legal Orders" },
  { title: "What Happens to Debts in Divorce UK?", description: "How debts are treated and divided during divorce proceedings.", href: "/what-happens-to-debts-in-divorce-uk", badge: "Debts" },
  { title: "Can I Divorce Without a Financial Settlement UK?", description: "The risks of divorcing without addressing finances formally.", href: "/can-i-divorce-without-financial-settlement-uk", badge: "Process" },
  { title: "Preview the Full Financial Report", description: "See what a financial settlement model covers — even in simpler situations.", href: "/unlock", badge: "Report" },
];

export default function DivorceNoAssetsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Divorce Settlement With No Assets UK"
      subtitle="If you have no significant assets, divorce finances may seem straightforward — but leaving financial claims legally open can create serious problems in the future. Here is what you need to do even in a low-asset divorce."
      documentTitle="Divorce Settlement With No Assets UK | DivorceCalculatorUK"
      metaDescription="Understand what happens in a UK divorce with no assets — why a clean break consent order may still matter, how debts are handled, and what to check before leaving claims open."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Divorce Settlement With No Assets UK", href: "/divorce-settlement-no-assets-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Not every divorce involves property, pensions, and savings. Where both parties have very limited assets, the financial settlement process can be much simpler. However, even in a low-asset divorce, it is essential to formally close all financial claims with a clean break consent order — or the door remains open for future claims if circumstances change.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">What 'No Assets' Usually Means</h2>
        <div className="space-y-3 mb-6">
          {[
            "No property owned (both renting)",
            "No significant savings",
            "No investments or business interests",
            "Either very small pensions or no private pensions at all",
            "Some debts but no assets to offset them",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border text-sm text-muted-foreground">
              <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Don't Overlook Pensions</p>
                <p className="text-sm text-amber-700">Many couples in their 30s and 40s with no property and limited savings still have pensions — even small ones. It is important to check and disclose all pension values before finalising a settlement. Pension claims can be made years later if not formally dismissed.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">The Key Steps Even With No Assets</h2>
        <div className="space-y-4 mb-6">
          {[
            { step: "1", title: "Complete financial disclosure", desc: "Even in a simple case, both parties should exchange full financial disclosure — all accounts, pensions, liabilities. This is needed before a court can approve any consent order." },
            { step: "2", title: "Address any debts", desc: "Agree who is responsible for which debts. Be aware that a consent order cannot transfer liability to a creditor — only between the parties." },
            { step: "3", title: "Consider pension claims", desc: "If either party has any pension — even a small one — the settlement should address pension claims, either through pension sharing or a pension clean break." },
            { step: "4", title: "Obtain a clean break consent order", desc: "The most important step. A clean break consent order permanently dismisses all future financial claims. It is submitted to the Family Court (usually without a hearing) and costs £53 in court fees plus legal drafting costs." },
          ].map((s) => (
            <div key={s.step} className="flex gap-4 p-4 bg-background rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                {s.step}
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Understand Your Financial Position Clearly" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures to Gather Even in a Low-Asset Divorce</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Pension statements — request CETV from each provider",
            "Bank account balances for both parties",
            "Any outstanding loans or credit card balances",
            "Gross income of both parties",
            "Monthly essential expenditure",
            "Any savings, ISAs, or shares",
            "Any significant assets in sole names (vehicle, etc.)",
            "Details of any joint financial products",
          ].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points in Low-Asset Divorces</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Income gap between parties", desc: "Where one party earns significantly more, the lower earner may face an income shortfall after separation — especially if they were not working or working part-time during the marriage." },
            { label: "Joint debts with no assets to offset them", desc: "Credit cards, car finance, or personal loans in joint names remain the liability of both parties regardless of what the consent order says. Creditors are not bound by it." },
            { label: "Pension imbalance going unnoticed", desc: "Even small pension pots accumulated over a long marriage can represent a material asset. Both parties should obtain CETVs before agreeing a clean break." },
            { label: "Future vulnerability if no consent order in place", desc: "Low-asset divorces are often done 'informally' with no consent order. This leaves both parties exposed to future claims if either later acquires property, an inheritance, or other assets." },
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
            "Whether a clean break is legally achievable given any income or maintenance considerations",
            "Whether any pension values are significant enough to require a formal pension sharing order",
            "How unequal income or needs should be reviewed if the parties' situations are very different",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Is a straightforward clean break achievable, or does the income gap require maintenance consideration?</li>
          <li>Should pension values be addressed even if they are relatively small?</li>
          <li>What is the most cost-effective way to get a consent order in our situation?</li>
          <li>How should joint debts be handled in the consent order?</li>
        </ul>
        <InlineCTA label="Model Your Income and Cashflow Post-Separation" />
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
