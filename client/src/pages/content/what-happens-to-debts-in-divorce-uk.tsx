import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const debtTypes = [
  { type: "Mortgage", note: "Usually the largest debt; what happens depends on what happens to the family home." },
  { type: "Joint credit cards", note: "Both parties remain liable until the debt is cleared or the account is separated." },
  { type: "Personal loans", note: "Treated as the liability of whoever took them out, but considered in the overall settlement." },
  { type: "Overdrafts", note: "Joint overdrafts must be addressed; individual ones factor into the financial picture." },
  { type: "Car finance", note: "Usually in one name; the debt follows the asset." },
  { type: "Business debts", note: "More complex; depends on business structure and personal guarantees." },
];

const faqItems = [
  {
    question: "Am I responsible for my spouse's debts after divorce?",
    answer: "You are responsible for any joint debt — regardless of divorce. For debts solely in your spouse's name, you are generally not liable, but courts may factor these into the overall settlement.",
  },
  {
    question: "Can a divorce settlement protect me from my ex's debts?",
    answer: "A consent order can include indemnity clauses requiring your ex to cover debts they agreed to take on. However, this does not affect third-party creditors — only the relationship between you and your ex.",
  },
  {
    question: "What happens to negative equity in divorce?",
    answer: "If the property is worth less than the mortgage, both parties may still be liable for the shortfall. Options include continuing joint ownership until values recover, one party taking the property and the negative equity, or selling and dealing with the remaining debt.",
  },
  {
    question: "Can I be forced to pay my ex's credit card debt?",
    answer: "If it is solely in their name, no. If it is a joint account, yes — both parties are jointly and severally liable.",
  },
  {
    question: "Does debt affect how assets are divided in divorce?",
    answer: "Yes. Courts look at the net financial position of each party. Significant personal debts reduce the available financial resources and are taken into account when deciding a fair overall settlement.",
  },
];

const relatedPages = [
  { title: "How is Property Divided in Divorce UK?", description: "The full guide to dividing the family home and other property.", href: "/how-is-property-divided-in-divorce-uk", badge: "Property" },
  { title: "Both Names on Mortgage in Divorce UK", description: "Options when both spouses are on the mortgage.", href: "/both-names-on-mortgage-divorce-uk", badge: "Mortgage" },
  { title: "Divorce Settlement Calculator UK", description: "Model assets and liabilities together for the full picture.", href: "/divorce-financial-settlement-calculator-uk", badge: "Calculator" },
];

export default function WhatHappensToDebtsPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="What Happens to Debts in Divorce UK?"
      subtitle="Debts do not disappear when you divorce. Learn how joint and individual debts are treated in a UK financial settlement — and what happens if your ex defaults."
      documentTitle="What Happens to Debts in Divorce UK? | DivorceCalculatorUK"
      metaDescription="Understand what happens to debts in divorce in the UK. Joint debts, mortgage liability, credit cards and how courts factor liabilities into a fair settlement."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "What Happens to Debts in Divorce UK?", href: "/what-happens-to-debts-in-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          When a marriage ends, most people focus on dividing assets — but debts do not disappear when you divorce. The key principle is that a divorce decree does not override your legal obligations to creditors: if your name is on a loan, you remain liable — regardless of what a divorce settlement says between the two of you.
        </p>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Joint Debts vs Individual Debts</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="pt-5 space-y-2">
              <Badge variant="outline">Joint Debts</Badge>
              <p className="text-sm text-muted-foreground">If both your names are on a debt — a joint mortgage, joint credit card, or joint loan — both of you are jointly and severally liable. A creditor can pursue either of you for the full amount, regardless of any agreement between you about who should pay. Divorcing does not change this.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-2">
              <Badge variant="outline">Individual Debts</Badge>
              <p className="text-sm text-muted-foreground">Debts solely in one person's name are legally that person's responsibility. However, in a divorce financial settlement, courts still consider them as part of the overall financial picture. A spouse with large personal debts may receive a greater share of assets, or the debts may be offset against their share.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-display font-bold mt-8 mb-4">Common Debts in Divorce Settlements</h2>
        <div className="space-y-3 mb-6">
          {debtTypes.map((d) => (
            <div key={d.type} className="flex items-start gap-3 p-3 rounded-lg border">
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-semibold">{d.type}</span>
                <p className="text-sm text-muted-foreground">{d.note}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">How Courts Deal with Debts</h2>
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg border bg-background">
            <p className="text-sm font-semibold mb-1">Debt offsetting</p>
            <p className="text-sm text-muted-foreground">One party takes on a debt in exchange for receiving a greater share of an asset. For example, one spouse takes the car and the car finance loan, while the other keeps more of the savings.</p>
          </div>
          <div className="p-4 rounded-lg border bg-background">
            <p className="text-sm font-semibold mb-1">Debt clearance on sale</p>
            <p className="text-sm text-muted-foreground">When the family home is sold, the mortgage and any secured loans are paid off from the proceeds before the equity is divided. This is the most common approach.</p>
          </div>
          <div className="p-4 rounded-lg border bg-background">
            <p className="text-sm font-semibold mb-1">Transfer of liability</p>
            <p className="text-sm text-muted-foreground">In some cases, a court can order that a jointly-held debt be transferred to one party. However, the creditor must agree to this. If the creditor refuses, both parties remain jointly liable.</p>
          </div>
        </div>

        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-5">
            <p className="text-sm font-semibold text-amber-800 mb-1">If Your Ex Defaults on an Agreed Debt</p>
            <p className="text-sm text-amber-700">If a court order states your ex will pay a joint debt and they default, the creditor can still come after you. Your only recourse is to take legal action against your ex for breach of the court order — but this takes time and money, and the damage to your credit file may already have been done. This is why closing or converting joint accounts before or at the point of divorce is strongly advisable.</p>
          </CardContent>
        </Card>

        <InlineCTA label="Model Your Full Financial Picture" />
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
