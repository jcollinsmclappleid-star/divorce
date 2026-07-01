import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale, AlertTriangle, CheckSquare, Eye } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const whatYouCouldGet = [
  { title: "Your share of the family home", desc: "Equity after the mortgage — whether you keep, sell or buy out. Often the largest single figure people care about." },
  { title: "Pension value", desc: "CETVs from workplace and private pensions. Frequently the biggest asset after property, and the one most often underestimated." },
  { title: "Savings and investments", desc: "ISAs, accounts and other liquid capital that form part of the matrimonial pot." },
  { title: "Monthly income after tax", desc: "What each party may have to live on once the split is applied — the real test of whether an offer works." },
  { title: "Child maintenance (if relevant)", desc: "Indicative CMS-based estimates to model cashflow — not a formal CMS calculation." },
  { title: "What a 50/50 split actually leaves you", desc: "A straight percentage can hide very different outcomes once housing, pensions and costs are included." },
];

const faqItems = [
  {
    question: "How much will I get in a divorce UK?",
    answer: "There is no fixed amount or automatic formula. What you may receive depends on the total asset pool, housing needs, income, pensions, debts, children and the length of the marriage. Courts apply Section 25 factors — there is no entitlement table. A settlement calculator models possible outcomes from your own figures so you can see a range before negotiating.",
  },
  {
    question: "Can I find out what I might get without seeing a solicitor first?",
    answer: "Yes — for illustrative modelling. You can enter rough figures into a calculator privately and see what different splits could leave you with across property, pensions and monthly costs. That helps you prepare before paid professional advice. It does not replace legal advice on your specific circumstances.",
  },
  {
    question: "Is 50/50 the starting point for what I'll receive?",
    answer: "In many long marriages, equal sharing of matrimonial assets is a common reference point — but it is not automatic. Housing needs, income disparity, children and contributions can all affect the financial picture. The important question is what a headline split leaves you with in practice, not the percentage alone.",
  },
  {
    question: "What if I was the lower earner or stayed at home with children?",
    answer: "Non-financial contributions such as raising children and running the home are recognised in UK law. Lower earning capacity, career breaks and housing needs for children can all affect how capital and maintenance are divided. Modelling income and expenses alongside assets helps show whether a split is liveable.",
  },
  {
    question: "What does the £79 report add that the free calculator doesn't?",
    answer: "The free model shows scenario shapes and headline figures. The Settlement Reality Check Report adds a plain-English position check — what stands out in your numbers, where you may be left short, missing values to verify, and specific questions to raise before agreeing or paying for solicitor time.",
  },
  {
    question: "Will this tell me exactly what the legal outcome is?",
    answer: "No. The calculator provides illustrative financial modelling only — not legal advice and not a prediction of a court outcome. It helps you understand your financial position and prepare informed questions. For advice on your rights and options, consult a qualified family solicitor.",
  },
];

const relatedPages = [
  { title: "What Financial Checks Matter in Divorce UK?", description: "The legal framework — needs, sharing and contributions.", href: "/what-am-i-entitled-to-in-divorce-uk", badge: "Checks" },
  { title: "Divorce 50/50 Split Calculator UK", description: "Test whether an equal split works in practice.", href: "/divorce-50-50-split-calculator-uk", badge: "Calculator" },
  { title: "Stay-at-Home Parent Divorce Settlement", description: "How caring contributions affect the financial picture.", href: "/stay-at-home-parent-divorce-settlement-uk", badge: "Contributions" },
  { title: "Career Sacrifice Divorce Settlement UK", description: "How stepping back from work may be weighed in the assessment.", href: "/career-sacrifice-divorce-settlement-uk", badge: "Career" },
  { title: "How Much Does Divorce Cost UK?", description: "Compare calculator cost vs solicitor fees.", href: "/how-much-does-divorce-cost-uk", badge: "Costs" },
];

export default function HowMuchWillIGetDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="How Much Will I Get in a Divorce UK?"
      subtitle="There is no fixed answer — but you can model what your situation could leave you with before you negotiate, accept an offer, or pay for a solicitor. Here is how to understand your share across property, pensions, savings and monthly costs."
      documentTitle="How Much Will I Get in a Divorce UK? | DivorceCalculatorUK"
      metaDescription="Model what you could receive from a UK divorce settlement — illustrative share of house, pensions, savings and monthly income. Free to start; not legal advice."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "How Much Will I Get in a Divorce UK", href: "/how-much-will-i-get-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          If you are asking "how much will I get?", you are not alone — it is one of the first questions people search when facing separation. The honest answer is that England and Wales does not use a fixed formula. What you may receive depends on your full financial picture: the house, pensions, savings, debts, income, children and how long you were married.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          You do not need to see a solicitor before you understand the numbers. Many people — especially those who were not the main financial decision-maker — want a private first view of what their share could look like. A settlement calculator lets you model that from your own figures in under five minutes, before any negotiation or paid advice.
        </p>

        <Card className="border-primary/20 bg-primary/5 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Free to start.</strong> Enter rough figures and see what different splits could leave you with. Unlock the £79 Settlement Reality Check Report when you want a plain-English position check — what stands out, where you may be left short, and questions to raise before agreeing.
              </p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">What "How Much Will I Get?" Usually Means</h2>
        <div className="space-y-4 mb-6">
          {whatYouCouldGet.map((item, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="See What My Figures Could Leave Me With — Free" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Understand Your Position Before a Solicitor</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A solicitor gives legal advice on your specific circumstances. A calculator gives you illustrative numbers from your own figures — so you walk into that conversation knowing your asset pool, testing 50/50, and seeing monthly pressure points. That preparation can save hundreds of pounds in billed time explaining basics.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Model property equity and mortgage pressure",
            "Include pension CETVs — often the hidden asset",
            "Test whether 50/50 leaves enough to live on",
            "See four settlement scenarios side by side",
            "Get a plain-English position check for £79",
            "Core calculations stay private in your browser",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Illustrative modelling only — not legal, tax or financial advice. No tool can determine a legal outcome. Use the figures to prepare informed questions, then take qualified legal advice on your specific case.</p>
            </div>
          </CardContent>
        </Card>
        <InlineCTA label="Start My Free Settlement Model" />
      </ContentSection>

      <ContentSection muted>
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
