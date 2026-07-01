import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, CheckSquare, AlertCircle, PiggyBank } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const points = [
  { title: "What CETV stands for", desc: "Cash Equivalent Transfer Value — the lump sum the pension scheme would pay if you transferred your benefits out today. It is the standard valuation figure used in UK divorce financial disclosure on Form E." },
  { title: "DC pensions: CETV is reasonably accurate", desc: "For defined contribution (workplace or personal) pensions, the CETV is essentially the current pot value. It reflects what the pension is actually worth and is a fair basis for division." },
  { title: "DB pensions: CETV often understates real value", desc: "For defined benefit (final salary or career-average) pensions, the CETV is an actuarial calculation of what your defined retirement income is worth today. It commonly understates real lifetime value by 30–50%, especially for younger members or generous public-sector schemes." },
  { title: "How to request a CETV", desc: "Members can usually request one free CETV per year. Request it in writing from the pension scheme administrator. DC schemes typically respond within 10 working days; DB schemes can take up to 3 months." },
  { title: "CETV and equality of income", desc: "Splitting two pensions 50/50 by CETV does not automatically produce equal income at retirement. The age, benefit structure and revaluation rules of each scheme matter enormously. For substantial pensions, actuarial input is needed." },
  { title: "CETV vs offsetting against the house", desc: "CETV-to-property offsetting is one of the most common — and most error-prone — settlement approaches. Specialist advice (Pensions on Divorce Expert) is normally needed where CETVs are above ~£100k." },
];

const figures = [
  "Up-to-date CETV statement (each pension)",
  "Scheme rules: revaluation, indexation, survivor benefits",
  "Date of joining the scheme (matrimonial vs pre-marital portion)",
  "Normal retirement age and current age of member",
  "Whether the pension is in payment or deferred",
  "Any GMP or protected rights",
  "Tax-free cash option at retirement",
  "Any pension protections (LTA fixed protection, enhanced protection)",
];

const faqItems = [
  { question: "What is a CETV in divorce?", answer: "Cash Equivalent Transfer Value — the lump sum a pension scheme calculates as the current value of your pension benefits, for the purposes of transferring them out. It is the figure you must disclose on Form E in financial proceedings and is the starting point for pension sharing or offsetting." },
  { question: "Why does my DB pension CETV seem so low?", answer: "Defined benefit CETVs are an actuarial calculation, not a market value. They are typically calculated using gilt yield discount rates, which can make the CETV look much lower than the lifetime cash value of the income the pension will actually pay. Public-sector DB pensions in particular often have CETVs that significantly understate real value." },
  { question: "How do I request a CETV?", answer: "Write to the pension scheme administrator or use their online portal requesting a Cash Equivalent Transfer Value for divorce purposes. Members can usually request one free CETV per year. DC schemes typically respond within days; DB schemes can take up to three months under regulatory timeframes." },
  { question: "Is the CETV the appropriate figure to use in a settlement?", answer: "For DC pensions, broadly yes. For DB pensions, the CETV is the legal disclosure figure but may not reflect lifetime income on its own. Equality of CETV does not equal equality of retirement income. A Pensions on Divorce Expert (PODE) report is commonly used for substantial DB pensions." },
  { question: "Can a CETV change while we negotiate?", answer: "Yes. CETVs are calculated at a point in time and reflect market conditions, scheme assumptions and individual circumstances. They typically need refreshing if more than three months old. A material change in gilt yields can move CETVs by 10–20% in either direction over a year." },
  { question: "What happens to my CETV after a pension sharing order?", answer: "The court order specifies a percentage of the CETV to be transferred to the receiving party. The scheme then 'debits' the member's benefits and 'credits' the receiving party — either as a member of the same scheme (internal transfer) or as a transfer to a separate scheme. Implementation typically takes 4 months from the sealed order." },
];

const relatedPages = [
  { title: "Pension Sharing vs Offsetting UK", description: "How CETVs are used in real settlements.", href: "/pension-sharing-vs-offsetting-uk", badge: "Pensions" },
  { title: "Final Salary Pension on Divorce UK", description: "Why DB pensions need special care.", href: "/final-salary-pension-on-divorce-uk", badge: "Pensions" },
  { title: "Form E Financial Disclosure UK", description: "How CETVs are disclosed in financial proceedings.", href: "/form-e-financial-disclosure-uk", badge: "Disclosure" },
  { title: "Preview the Full Financial Report", description: "Model pension scenarios.", href: "/unlock", badge: "Report" },
];

export default function CetvExplainedPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="CETV Explained — Cash Equivalent Transfer Value in UK Divorce"
      subtitle="The CETV is the central pension number in every UK divorce. It is fair for DC pensions but routinely understates the lifetime value of defined benefit pensions. Here is what it is, how to use it, and where it goes wrong."
      documentTitle="CETV Explained Divorce UK | DivorceCalculatorUK"
      metaDescription="CETV (Cash Equivalent Transfer Value) explained for UK divorce. How it is calculated, why DB CETVs understate value, how to request one, and how it drives pension sharing."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "CETV Explained Divorce UK", href: "/cetv-explained-divorce-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The Cash Equivalent Transfer Value (CETV) is the figure used to value pensions in UK divorce financial disclosure. For defined contribution pensions it is broadly the pot value and reasonably reliable. For defined benefit pensions it is an actuarial calculation that often understates the real lifetime value of the pension by a substantial margin. Misunderstanding this is one of the most common — and most expensive — mistakes in UK divorce settlements.
        </p>
        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">A £400,000 CETV in a final salary scheme is not the same as £400,000 of cash. The lifetime income that CETV represents could be worth £600,000–£800,000 in cash equivalent terms. Offsetting pensions against the house using face-value CETVs almost always shortchanges the party giving up the pension share.</p>
          </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-6">Six Key Things to Know About CETVs</h2>
        <div className="space-y-4 mb-6">
          {points.map((p, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-start gap-2">
                  <PiggyBank className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-semibold">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <InlineCTA label="Model Pension Sharing Scenarios" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-4">Information You Will Need</h2>
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
            { label: "Apples-to-oranges comparisons", desc: "Comparing a public-sector DB CETV with a SIPP balance is misleading without actuarial adjustment. Both are 'pensions' but the income they will pay per £1 of CETV is very different." },
            { label: "Stale CETVs", desc: "CETVs more than three months old are usually too out of date for negotiation. Refresh them before final settlement, particularly where gilt yields have moved." },
            { label: "Equality of CETV vs equality of income", desc: "A 50/50 CETV split rarely produces 50/50 retirement income because of differences in age, scheme accrual rates and indexation. Equal CETVs ≠ equal pensions." },
            { label: "Offsetting discounts", desc: "Where pensions are offset against liquid assets, a discount or 'utility factor' is normally applied to the CETV — typically 20–35% — to reflect that pension income is locked away until later in life." },
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
            "What discount or premium should apply to your specific DB CETV",
            "Whether equal CETV or equal income is the right basis for sharing",
            "What 'utility factor' to apply when offsetting against cash or property",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Do we need a Pensions on Divorce Expert (PODE) report on the CETVs?</li>
          <li>Should the split aim at equal CETV or equal pension income?</li>
          <li>Is the CETV stale and does it need refreshing?</li>
          <li>What discount factor applies if we offset the pension against the house?</li>
          <li>Are there tax protections on either pension that need preserving?</li>
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
