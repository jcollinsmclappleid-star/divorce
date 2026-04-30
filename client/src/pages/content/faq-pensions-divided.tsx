import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PiggyBank,
  Scale,
  ArrowLeftRight,
  Link2,
  Clock,
  TrendingDown,
  ShieldQuestion,
  Banknote,
  CheckCircle,
  Landmark,
  Users,
} from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  ExternalLinkButton,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const relatedPages = [
  {
    title: "Divorce Pension Split Calculator UK",
    description: "Model pension sharing and offsetting scenarios with structured comparison.",
    href: "/divorce-pension-split-calculator-uk",
    badge: "Pensions",
  },
  {
    title: "Divorce Financial Modelling",
    description: "Understand the full structured modelling framework for England & Wales.",
    href: "/divorce-financial-modelling",
    badge: "Pillar Guide",
  },
  {
    title: "Divorce 50/50 Split Calculator UK",
    description: "Model equal division scenarios including pension and property trade-offs.",
    href: "/divorce-50-50-split-calculator-uk",
    badge: "Calculator",
  },
  {
    title: "Pension Offsetting in Divorce",
    description: "Trading pension for other assets — how offsetting is structured and valued.",
    href: "/divorce-pension-offsetting-uk",
    badge: "Pensions",
  },
  {
    title: "How Are Savings Split in Divorce?",
    description: "How courts approach joint and sole savings accounts alongside pension assets.",
    href: "/how-are-savings-split-in-divorce-uk",
    badge: "Assets",
  },
  { title: "Preview the Full Financial Report", description: "Model pension sharing in the full settlement calculator.", href: "/unlock", badge: "Report" },
];

const approaches = [
  {
    icon: ArrowLeftRight,
    label: "Pension Sharing",
    description: "A percentage of one pension fund is transferred into the other party's name, creating independent pension rights. This provides a clean break for retirement planning.",
  },
  {
    icon: Scale,
    label: "Offsetting",
    description: "One party retains pension assets while the other receives alternative capital (e.g., more property equity or savings). This avoids splitting the pension directly but requires careful valuation.",
  },
  {
    icon: Link2,
    label: "Attachment Orders",
    description: "In limited cases, future pension income may be redirected to the other party when the pension comes into payment. This does not provide a clean break.",
  },
];

const complexityReasons = [
  { icon: Clock, text: "They are not immediately accessible" },
  { icon: TrendingDown, text: "Their value may fluctuate over time" },
  { icon: ShieldQuestion, text: "They are subject to retirement age rules" },
  { icon: Banknote, text: "They have long-term income implications" },
];

const FAQ_SCHEMA_ITEMS = [
  {
    question: "How are pensions divided in divorce in the UK?",
    answer: "There are three main approaches: pension sharing (transferring a percentage to the other party), offsetting (retaining pension in exchange for other assets), and attachment orders (redirecting future pension income). The approach depends on individual circumstances.",
  },
  {
    question: "What is pension sharing in divorce?",
    answer: "Pension sharing transfers a percentage of one party's pension fund into the other party's name, creating independent pension rights. This provides a clean break for retirement planning but may reduce other capital available for division.",
  },
  {
    question: "Why are pensions complex in divorce?",
    answer: "Pensions differ from other assets because they are not immediately accessible, their value may fluctuate, they are subject to retirement age rules, and they have long-term income implications. Equal capital division does not always result in equal retirement income.",
  },
];

export default function FAQPensionsDivided() {
  const [, setLocation] = useLocation();
  useFaqJsonLd(FAQ_SCHEMA_ITEMS);

  return (
    <ContentPageLayout
      title="How Are Pensions Divided in Divorce?"
      subtitle="Pensions are treated as financial assets within divorce financial remedy proceedings in England & Wales. They may represent a substantial proportion of overall marital wealth."
      documentTitle="How Are Pensions Divided in Divorce UK? | DivorceCalculatorUK"
      metaDescription="Learn how pensions are divided in UK divorce proceedings. Understand pension sharing, offsetting, and attachment orders, and model scenarios before professional advice."
      relatedPages={relatedPages}
    >
      <ContentSection>
        <div className="flex items-start gap-2 mb-6">
          <ExternalLinkButton href="https://www.gov.uk/government/publications/pension-sharing-on-divorce-or-dissolution">
            GOV.UK: Pension sharing orders guidance
          </ExternalLinkButton>
        </div>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-approaches-heading">
          Main Approaches to Pension Division
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          There are three main approaches to handling pensions in divorce. Each has different implications for liquidity, retirement planning, and overall asset division.
        </p>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
          {approaches.map((item) => (
            <Card key={item.label} data-testid={`card-approach-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary/10 shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-complexity-heading">
          Why Pensions Are Complex
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Pensions differ from other assets in several important ways. Equal capital division does not always result in equal retirement income.
        </p>
        <div className="space-y-3">
          {complexityReasons.map((item) => (
            <div key={item.text} className="flex items-center gap-3" data-testid={`item-complexity-${item.text.slice(0, 20).toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-state-pension-heading">
          State Pension Considerations
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          An important distinction exists between the State Pension and private or workplace pensions in the context of divorce. The State Pension cannot be shared or split as part of a divorce financial order. Pension sharing orders apply only to private and occupational pensions.
        </p>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          However, State Pension entitlement may still be a relevant consideration in the overall financial picture. Each party's National Insurance contribution record determines their State Pension amount. Where one party has a significantly reduced contribution record — for example, due to time spent as a primary carer — this may affect their retirement income and could be a factor in the overall settlement assessment.
        </p>
        <Card className="bg-muted/40" data-testid="card-state-pension">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-start gap-3">
              <Landmark className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">Key Points</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed mt-1">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">-</span>
                    State Pension cannot be subject to a pension sharing order
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">-</span>
                    National Insurance credits (including credits for caring responsibilities) affect entitlement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">-</span>
                    Disparities in State Pension entitlement may be relevant to the overall financial settlement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">-</span>
                    The full new State Pension requires 35 qualifying years of National Insurance contributions
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-practice-heading">
          What This Means in Practice
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          When modelling pension division, it is useful to compare total asset allocation, liquidity impact, retirement timeline effects, and short-term capital needs.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          {[
            "Total asset allocation",
            "Liquidity impact",
            "Retirement timeline effects",
            "Short-term capital needs",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              {text}
            </div>
          ))}
        </div>
        <Card className="bg-muted/40" data-testid="card-example">
          <CardContent className="pt-5 pb-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">For example:</h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">-</span>
                Retaining more pension may reduce immediate liquidity.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">-</span>
                Offsetting may increase short-term capital but reduce long-term retirement security.
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3">
              Structured modelling allows scenario comparison without recommending a specific approach.
            </p>
          </CardContent>
        </Card>
        <InlineCTA label="Compare pension division scenarios" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-tax-heading">
          Tax & Valuation Considerations
        </h2>
        <Accordion type="multiple" className="w-full" data-testid="accordion-tax">
          <AccordionItem value="cetv">
            <AccordionTrigger className="text-sm">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-primary" />
                Cash Equivalent Transfer Values (CETVs)
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Pension values are typically based on CETVs, which represent the transfer value at a specific point in time. These values can change and may not reflect the true income potential of a pension, particularly for defined benefit (final salary) schemes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tax">
            <AccordionTrigger className="text-sm">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-primary" />
                Tax implications
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Tax implications, lifetime allowance history, and scheme-specific rules may affect real-world outcomes. These complexities are not fully captured in simplified modelling. Modelling illustrates numerical impact only.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="scheme">
            <AccordionTrigger className="text-sm">
              <div className="flex items-center gap-2">
                <ShieldQuestion className="w-4 h-4 text-primary" />
                Scheme-specific rules
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Different pension schemes have different rules regarding sharing, transfer, and access. Public sector schemes, private defined benefit schemes, and defined contribution schemes each operate differently. Professional actuarial advice may be needed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-actuary-heading">
          The Role of a Pension Actuary
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          In cases involving significant pension assets — particularly defined benefit (final salary) schemes — actuarial expertise may be warranted to provide a more accurate assessment of pension value and the implications of different division approaches.
        </p>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          A Pension on Divorce Expert (PODE) is a specialist actuary who provides reports for use in divorce proceedings. These reports typically assess the value of pensions for the purpose of division, analyse the impact of different sharing percentages, and may calculate the pension share needed to equalise retirement income rather than simply equalising capital values. The distinction between equalising capital and equalising income can be significant, particularly where one party holds a defined benefit scheme and the other holds defined contribution pensions.
        </p>
        <Card className="bg-muted/40" data-testid="card-actuary-when">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">When Actuarial Involvement May Be Warranted</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Actuarial reports may be particularly relevant where there are defined benefit pensions with substantial CETVs, where there is a significant disparity in pension values between the parties, where pension assets form a large proportion of the overall marital estate, or where the parties are close to retirement age and the income implications of sharing are more immediate. Simplified modelling can illustrate general scenarios, but actuarial analysis provides the precision needed for formal proceedings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-2" data-testid="text-modelling-heading">
          Using Modelling Before Professional Advice
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Before consulting a solicitor or financial adviser, modelling can help clarify asset distribution differences, liquidity trade-offs, and long-term sustainability considerations.
        </p>
        <div className="grid gap-3 sm:grid-cols-1">
          {[
            "Asset distribution differences",
            "Liquidity trade-offs",
            "Long-term sustainability considerations",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              {text}
            </div>
          ))}
        </div>
        <InlineCTA label="Explore structured comparisons" />
      </ContentSection>
    </ContentPageLayout>
  );
}
