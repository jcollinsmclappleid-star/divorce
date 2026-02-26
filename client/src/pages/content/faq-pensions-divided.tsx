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
} from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  ExternalLinkButton,
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

export default function FAQPensionsDivided() {
  const [, setLocation] = useLocation();

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
