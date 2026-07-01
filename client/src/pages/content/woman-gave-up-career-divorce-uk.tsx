import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heart, AlertTriangle, Eye, CheckSquare } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const thoughts = [
  {
    title: "\"I gave up my career — does that mean I'll get less?\"",
    desc: "Not necessarily in principle. UK law recognises homemaking and childcare as contributions. What matters in practice is how your full financial picture — assets, pensions, income needs and children's housing — fits together. There is no automatic rule either way.",
  },
  {
    title: "\"I don't know what's in the pensions — he handled the money\"",
    desc: "This is very common. Workplace pensions accrued during marriage are usually matrimonial assets. CETV figures should be exchanged in disclosure; until then, even rough estimates in a calculator can show whether a property-heavy split hides a weak pension outcome.",
  },
  {
    title: "\"I need to know if I can afford to say no to an offer\"",
    desc: "That is a financial question you can model illustratively: what does the offer leave you with monthly, after housing, bills and childcare? A calculator will not tell you whether to accept — it shows whether the numbers look workable under the assumptions you enter.",
  },
  {
    title: "\"I feel guilty asking for 'more' — I just want what is fair\"",
    desc: "Wanting clarity on your position is not greed. Courts weigh needs and contributions across the whole marriage. Understanding your figures helps you negotiate from knowledge rather than fear — then a solicitor can advise on what is reasonable in law.",
  },
];

const faqItems = [
  {
    question: "I'm a woman who gave up my career for the family — am I at a disadvantage?",
    answer: "UK courts do not treat homemaking as a lesser contribution. Many women in this position worry they will be penalised; in practice, career breaks, pension gaps and housing needs for children are factors that may be weighed alongside assets. Every case differs. Modelling your figures can help you see the financial picture before legal advice.",
  },
  {
    question: "How do I know if an offer is enough to live on?",
    answer: "Model monthly income, housing costs, bills and childcare against what the offer would leave you with in capital and pension terms. Our calculator is illustrative only — it shows cashflow pressure under your assumptions, not a legal view on whether an offer is adequate.",
  },
  {
    question: "Should I negotiate hard for a bigger share?",
    answer: "This page does not advise on negotiation tactics. Financial settlements depend on many factors and professional guidance. What we offer is private, illustrative modelling so you understand your position and can ask informed questions of a qualified family solicitor.",
  },
  {
    question: "What if I have no income and haven't worked for years?",
    answer: "Lower current income and reduced earning capacity may be relevant factors — alongside pensions, housing and maintenance. Courts look at realistic future capacity, not just today's payslip. Include best-estimate figures in any model and discuss your situation with a solicitor.",
  },
  {
    question: "Is this legal advice?",
    answer: "No. DivorceCalculatorUK provides general information and illustrative financial modelling for England and Wales. For advice on rights, options or court process, consult a qualified family solicitor.",
  },
];

const relatedPages = [
  { title: "Career Sacrifice Divorce Settlement UK", description: "The legal and financial factors courts may weigh.", href: "/career-sacrifice-divorce-settlement-uk", badge: "Framework" },
  { title: "Stay-at-Home Parent Divorce Settlement", description: "Pensions, housing and maintenance in detail.", href: "/stay-at-home-parent-divorce-settlement-uk", badge: "Children" },
  { title: "How Much Will I Get in a Divorce UK?", description: "Model property, pensions and monthly outcomes.", href: "/how-much-will-i-get-divorce-uk", badge: "Calculator" },
  { title: "What Financial Checks Matter in Divorce UK?", description: "Needs, sharing and contributions explained.", href: "/what-am-i-entitled-to-in-divorce-uk", badge: "Checks" },
];

export default function WomanGaveUpCareerDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Woman Who Gave Up Her Career — Divorce UK"
      subtitle="If you stepped back from paid work while your partner progressed, you may feel behind on money and unsure what you are walking into. Here is how to think about your financial position calmly — and model the numbers before you negotiate."
      documentTitle="Woman Gave Up Career Divorce UK | DivorceCalculatorUK"
      metaDescription="Gave up your career for family and facing divorce? Understand how UK settlements may weigh your contribution — model pensions, housing and monthly costs illustratively before negotiating."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Woman Who Gave Up Her Career — Divorce UK", href: "/woman-gave-up-career-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          This guide is for anyone who reduced or left paid work to raise children or support a partner's career — a path still taken more often by women, though the legal principles apply regardless of gender. If you are searching at 2am, worried you gave up too much and now face separation without a clear picture of the finances, you are not alone.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The first step is not a fight over a headline percentage — it is understanding what your situation could look like across property, pensions, debts and monthly costs. That clarity reduces the fear of accepting too little or rejecting an offer you cannot afford to refuse. Our tool provides illustrative modelling only; a family solicitor advises on legal rights and options.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                Not legal advice. We do not promise outcomes, provide negotiation tactics, or suggest any particular share. Use illustrative figures to prepare, then consult a qualified family solicitor.
              </p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">What You May Be Thinking — And What Helps</h2>
        <div className="space-y-4 mb-6">
          {thoughts.map((item, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
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
        <h2 className="text-2xl font-display font-bold mb-4">Model Privately Before Anyone Else Sees Your Numbers</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Many people in this position have never seen pension statements or know the mortgage balance. Rough estimates are enough to start. Core calculations run in your browser — enter figures privately, compare splits, and unlock the £79 Settlement Reality Check Report when you want a structured review of gaps and questions to raise.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            "Property equity and whether keeping the home is affordable",
            "Pension CETVs — often the largest hidden asset",
            "Monthly surplus or shortfall under each scenario",
            "Child maintenance estimates for cashflow only",
            "Side-by-side comparison of settlement options",
            "Plain-English flags — not legal recommendations",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <Card className="border-primary/20 bg-primary/5 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                For the legal framework on career sacrifice, pensions and earning capacity, see our{" "}
                <a href="/career-sacrifice-divorce-settlement-uk" className="text-primary font-medium hover:underline">
                  Career Sacrifice Divorce Settlement guide
                </a>
                . For detailed stay-at-home parent considerations, see the{" "}
                <a href="/stay-at-home-parent-divorce-settlement-uk" className="text-primary font-medium hover:underline">
                  Stay-at-Home Parent guide
                </a>
                .
              </p>
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
