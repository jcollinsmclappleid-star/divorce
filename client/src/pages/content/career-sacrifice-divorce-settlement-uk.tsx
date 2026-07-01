import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Briefcase, AlertTriangle, CheckSquare, Scale } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const factors = [
  {
    title: "Recognised contribution to the marriage",
    desc: "UK courts treat homemaking and child-rearing as contributions equal in principle to paid work. Time out of employment to support the family is not treated as a weakness in the assessment — it is part of the marriage's history.",
  },
  {
    title: "Future earning capacity",
    desc: "A long career break often reduces realistic earning capacity going forward. That gap may be weighed when courts look at capital, housing and whether spousal maintenance could bridge income needs.",
  },
  {
    title: "Pension imbalance",
    desc: "The partner who stayed in paid work may have built a much larger pension. Pension sharing or offsetting is commonly discussed where there is a significant gap — pensions are often under-modelled in early negotiations.",
  },
  {
    title: "Housing and children's needs",
    desc: "Where children are involved, housing suitable for their care may influence how property equity is structured — including deferred sale arrangements in some cases.",
  },
  {
    title: "Compensation principles (select cases)",
    desc: "In some cases, where one party gave up significant career progression for the family, compensation arguments may arise. This is fact-specific and not automatic — qualified legal advice is needed on whether it applies.",
  },
];

const modelFirst = [
  "Property equity and mortgage pressure after separation",
  "Pension CETVs on both sides — not just the family home",
  "Monthly income and expenses — whether a headline split is liveable",
  "Child maintenance assumptions for cashflow modelling only",
  "Side-by-side scenarios (e.g. 50/50 vs alternatives)",
  "Plain-English flags on gaps to verify before agreeing",
];

const faqItems = [
  {
    question: "Does giving up my career help or hurt me in a divorce settlement?",
    answer: "Neither automatically. UK law recognises non-financial contributions, and a career break may affect earning capacity, pensions and housing needs — all Section 25 factors courts may weigh. There is no formula. Modelling your full figures illustratively helps you see how these elements interact before negotiation or legal advice.",
  },
  {
    question: "Can career sacrifice change the financial picture?",
    answer: "There is no automatic uplift. Career sacrifice may be one factor among many — alongside asset pool size, children, ages, health, housing needs and pensions. Outcomes vary widely. This guide and our calculator provide educational context and illustrative modelling only, not a prediction of any legal outcome.",
  },
  {
    question: "What if my pension is much smaller than my ex's?",
    answer: "Pension imbalance is common where one partner worked full-time and the other took career breaks. Pension sharing or offsetting may need professional discussion, but the suitable route depends on the whole picture. Include CETV figures in any model so pension value is not hidden behind property headlines.",
  },
  {
    question: "Can I model my position before seeing a solicitor?",
    answer: "Yes, for illustrative purposes. Enter rough figures privately to see how property, pensions, debts and monthly costs could interact under different splits. That can help you prepare informed questions. It does not replace legal advice on your specific case.",
  },
  {
    question: "Should I return to work before the financial settlement?",
    answer: "This is case-specific and should be discussed with a qualified family solicitor. The calculator can help organise current income, likely future income, childcare costs and monthly pressure, but it cannot decide work timing or negotiation strategy.",
  },
  {
    question: "Is this page legal advice?",
    answer: "No. DivorceCalculatorUK provides general educational information and illustrative financial modelling only. For advice on your rights, options or negotiation strategy, consult a qualified family solicitor in England and Wales.",
  },
];

const relatedPages = [
  { title: "Stay-at-Home Parent Divorce Settlement", description: "Homemaking, pensions and housing in more detail.", href: "/stay-at-home-parent-divorce-settlement-uk", badge: "Children" },
  { title: "Woman Who Gave Up Her Career — Divorce UK", description: "The emotional and financial picture before you negotiate.", href: "/woman-gave-up-career-divorce-uk", badge: "Career" },
  { title: "How Much Will I Get in a Divorce UK?", description: "Model your share across assets and monthly costs.", href: "/how-much-will-i-get-divorce-uk", badge: "Calculator" },
  { title: "Divorce Where One Earns More UK", description: "How income disparity may shape the financial picture.", href: "/divorce-where-one-earns-more-uk", badge: "Income" },
];

export default function CareerSacrificeDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Career Sacrifice and Divorce Settlement UK"
      subtitle="If you stepped back from paid work to raise a family or support your partner's career, that history may be weighed alongside pensions, housing and income needs. Here is how the framework typically approaches career sacrifice — and how to model your full picture before you negotiate."
      documentTitle="Career Sacrifice Divorce Settlement UK | DivorceCalculatorUK"
      metaDescription="Gave up your career for family? How UK divorce settlements may weigh career sacrifice, pensions and earning capacity — illustrative modelling to see your full position before negotiating."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Career Sacrifice Divorce Settlement UK", href: "/career-sacrifice-divorce-settlement-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Many people who reduced hours, paused promotions or left paid work entirely during marriage arrive at separation with the same worry: <em>did I give up too much — and will that be reflected in the settlement?</em> The honest answer is that England and Wales does not apply a fixed formula. Career sacrifice is one factor among several that courts may consider under Section 25 of the Matrimonial Causes Act 1973.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          What helps at this stage is clarity on the numbers: property equity, pension values, debts, realistic income and monthly costs. A headline percentage can look fair on paper while leaving the lower-earning party short once pensions and living costs are included. Modelling those figures illustratively — before you accept an offer or pay for solicitor time — can show where pressure points may sit.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                Educational information and illustrative modelling only — not legal, tax or financial advice. No tool can determine a legal outcome or promise a result. Use the figures to prepare informed questions, then take qualified legal advice on your case.
              </p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">How Career Sacrifice May Be Weighed</h2>
        <div className="space-y-4 mb-6">
          {factors.map((item, i) => (
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
        <InlineCTA label="Model My Full Position — Free" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">See the Full Picture Before You Negotiate</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Negotiations often start with property and a percentage split. Career sacrifice cases frequently turn on what is <em>not</em> in the first conversation: pension CETVs, future earning gaps and whether monthly costs are covered. Our calculator lets you enter rough figures and compare scenarios side by side — privately, in your browser.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {modelFirst.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <Card className="border-primary/20 bg-primary/5 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Questions to discuss with a solicitor:</strong> How might my career break affect earning-capacity arguments? Is pension equalisation appropriate? Could spousal maintenance bridge a short-term income gap? Does compensation apply to our facts?
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
