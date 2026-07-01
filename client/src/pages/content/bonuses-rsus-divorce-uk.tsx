import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrendingUp, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const components = [
  { title: "Cash bonuses (annual or discretionary)", desc: "Variable cash bonuses are usually treated as part of overall income for maintenance assessment. Where bonuses are substantial and regular, they may be averaged over several years to give a fair income figure. One-off exceptional bonuses may be treated separately as capital." },
  { title: "Restricted Stock Units (RSUs) — vested", desc: "RSUs that have vested before the divorce are part of the matrimonial pot. They are typically valued at the market price of the shares on the relevant date and treated like any other shareholding." },
  { title: "Restricted Stock Units (RSUs) — unvested", desc: "Unvested RSUs are more complex. The portion attributable to work done during the marriage is typically matrimonial; the portion attributable to future work post-separation is typically not. Apportionment formulas — sometimes based on a 'time rule' — are commonly used." },
  { title: "Stock options (vested and unvested)", desc: "Stock options follow similar principles to RSUs. Vested options have a current valuation; unvested options need apportionment between the matrimonial period and post-separation work. Tax treatment is more complex with options than with RSUs." },
  { title: "Long-term incentive plans (LTIPs)", desc: "LTIPs typically vest based on multi-year performance conditions. They require careful analysis to determine which portion is attributable to the marriage period and what realistic value can be ascribed before performance conditions are met." },
  { title: "Carried interest and deferred compensation", desc: "Common in private equity and finance roles. These deferred payments are often substantial and may stretch many years past separation. Treatment varies — apportionment, deferred division on receipt, or capitalised valuation are all options." },
];

const figures = [
  "Last 3 years of bonus payments and bonus letter terms",
  "Full schedule of all RSUs (granted, vested, unvested, vesting dates)",
  "All stock option grants with strike prices and vesting schedules",
  "Vesting conditions for each award (time-based, performance-based)",
  "Current market value of vested holdings",
  "Estimated value of unvested holdings (with appropriate apportionment)",
  "Tax position on each award (income tax, NIC, CGT exposure)",
  "Any carried interest, LTIP or deferred compensation arrangements",
];

const faqItems = [
  {
    question: "Are bonuses included in divorce settlements?",
    answer: "Yes. Bonuses paid during the marriage are part of household income and feed into both the asset position (where saved or invested) and any maintenance assessment. Where bonuses are variable, they are typically averaged over several years to give a fair sustainable income figure for ongoing maintenance.",
  },
  {
    question: "How are RSUs treated in UK divorce?",
    answer: "Vested RSUs are treated as shareholdings — part of the matrimonial pot at market value. Unvested RSUs require apportionment: the portion earned for work during the marriage is typically matrimonial; the portion attributable to future post-separation work is not. Apportionment is fact-specific and often disputed.",
  },
  {
    question: "What about RSUs that vest after the divorce?",
    answer: "If the RSUs were granted for work done during the marriage but only vest later, that portion is typically matrimonial regardless of vesting date. If they were granted for future work, only the portion attributable to the marriage period is matrimonial. Time-based apportionment formulas are commonly used.",
  },
  {
    question: "How do you split RSUs that haven't vested yet?",
    answer: "Several approaches may be discussed: deferred division on actual vesting, upfront capitalised value with a discount for vesting risk, or offsetting against other matrimonial assets at present value. The suitable route depends on the size of the awards and the parties' attitudes to risk.",
  },
  {
    question: "Are stock options treated the same as RSUs?",
    answer: "Similar principles apply but the mechanics differ. Stock options have a strike price and may expire; their value depends heavily on the share price at exercise. They are typically valued either at intrinsic value (current price minus strike) or with an option pricing model. Tax treatment is more complex than RSUs.",
  },
  {
    question: "What about carried interest in private equity?",
    answer: "Carried interest is usually a long-term deferred payment dependent on fund performance. Approaches in divorce settlements include: apportioning based on time spent during the marriage, deferred sharing on actual receipt, or specialist valuation at present value. Specialist input is normally needed for substantial carried interest.",
  },
];

const relatedPages = [
  { title: "Self-Employed Divorce UK", description: "Income disclosure for variable earners.", href: "/self-employed-divorce-uk", badge: "Income" },
  { title: "How are Investments Divided in Divorce UK?", description: "General principles for splitting shareholdings.", href: "/how-are-investments-divided-in-divorce-uk", badge: "Investments" },
  { title: "Form E Financial Disclosure UK", description: "How to disclose RSUs, options and bonuses properly.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
  { title: "Preview the Full Financial Report", description: "Model settlements with variable income components.", href: "/unlock", badge: "Report" },
];

export default function BonusesRsusDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Bonuses, RSUs and Stock Options in UK Divorce"
      subtitle="Variable pay components — bonuses, restricted stock units, stock options, LTIPs and carried interest — are often the most contested elements of high-earner divorce settlements. Apportionment, valuation and timing all matter."
      documentTitle="Bonuses, RSUs and Stock Options in Divorce UK | DivorceCalculatorUK"
      metaDescription="How variable pay is treated in UK divorce — bonuses, vested and unvested RSUs, stock options, LTIPs and carried interest. Apportionment, valuation and disclosure issues explained."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Bonuses and RSUs in Divorce UK", href: "/bonuses-rsus-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          For higher-earning professionals, variable pay components — bonuses, RSUs, stock options, LTIPs and carried interest — often make up a substantial part of total compensation. They are also commonly the most contested elements of a divorce financial settlement. The challenges are valuation (especially for unvested awards), apportionment between matrimonial and post-separation work, and disclosure of complex schemes that may stretch many years into the future.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">Variable pay schemes are routinely undervalued or misclassified in disclosure. Specialist input — typically a forensic accountant or remuneration specialist — is often essential where awards are substantial. Cutting corners on disclosure here can cost the receiving party significantly.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Components and How They Are Treated</h2>
        <div className="space-y-4 mb-6">
          {components.map((c, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{c.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Settlement With Variable Income Components" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Figures and Documents You Will Need</h2>
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
            { label: "Apportionment of unvested awards", desc: "Apportioning unvested RSUs and options between work done during the marriage and future work is one of the most disputed areas. Time-based formulas are common but blunt — performance-based vesting can require more sophisticated analysis." },
            { label: "Vesting risk", desc: "Unvested awards may not pay out if performance conditions aren't met or the employee leaves. Discounting unvested awards for vesting risk is contested — too small a discount overpays the receiving party, too large underpays." },
            { label: "Tax cost of disposals", desc: "Selling vested shares to fund a settlement crystallises income tax (where shares were granted as RSUs and not yet sold), CGT, and possibly NIC. The net amount available is often much less than the headline figure." },
            { label: "Future bonus uncertainty", desc: "Maintenance based on a percentage of future bonuses can work — but introduces ongoing dispute potential. A fixed lump-sum settlement avoids this but requires both parties to agree a fair valuation upfront." },
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
            "The right apportionment formula for your unvested awards",
            "What discount should apply for vesting risk",
            "The tax-efficient structure for releasing equity awards to fund the settlement",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>What apportionment approach should we use for unvested RSUs and options?</li>
          <li>Do we need a forensic accountant or remuneration specialist for valuation?</li>
          <li>Should bonuses be included in maintenance, and if so on what basis?</li>
          <li>What's the tax cost of disposing of vested awards to fund the settlement?</li>
          <li>Is deferred division (sharing on actual vesting) a realistic option in our case?</li>
        </ul>
        <InlineCTA label="Compare Settlement Scenarios" />
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
