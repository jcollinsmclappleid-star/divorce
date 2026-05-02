import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PiggyBank, AlertTriangle, CheckSquare, AlertCircle } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const sharing = [
  "Splits a defined percentage of one party's pension to the other",
  "Receiving party gets their own pension pot in their own name",
  "Provides genuine retirement income to the receiving party",
  "Implemented via a pension sharing order in the consent order",
  "Schemes have 4 months from sealing to implement",
  "May involve scheme charges (typically £500–£2,000+)",
  "Effective for both defined contribution and defined benefit schemes",
  "Most appropriate where pensions are a substantial part of the pot",
];

const offsetting = [
  "One party keeps their pension; the other receives more of other assets",
  "No new pension is created for the receiving party",
  "Provides immediate access to capital (e.g. property equity)",
  "Avoids scheme implementation charges and delay",
  "Requires careful valuation — pension £ vs cash £ are not equivalent",
  "Typically uses a 'utility' or 'cash equivalent' adjustment",
  "May leave the receiving party short on retirement income",
  "Often used where one party urgently needs capital for housing",
];

const factors = [
  { title: "Receiving party's age and retirement horizon", desc: "Younger parties have more time to rebuild a pension if they take cash now. Older parties closer to retirement typically benefit more from pension sharing — they don't have time to make up the gap from elsewhere." },
  { title: "Liquidity needs of the receiving party", desc: "Where the receiving party needs immediate capital — typically for housing — offsetting can be the practical answer. Pension money is locked away until a minimum age (currently 55, rising to 57) and cannot help with today's house purchase." },
  { title: "Type of pension involved", desc: "Defined benefit (final salary) pensions are typically more valuable per £ of CETV than defined contribution pensions. £1 of DB pension may be worth more than £1 of cash for retirement income purposes — careful valuation is essential." },
  { title: "Existing pension provision of the receiving party", desc: "Where the receiving party has limited pension provision of their own (e.g. a stay-at-home parent), pension sharing rebuilds their retirement position. Offsetting in this scenario can leave a permanent retirement income gap." },
];

const faqItems = [
  {
    question: "What's the difference between pension sharing and pension offsetting?",
    answer: "Pension sharing splits one party's pension and creates a new pension in the other party's name — effective via a pension sharing order. Pension offsetting keeps the pension intact for one party and gives the other a larger share of other assets (typically cash or property equity) instead. They achieve different outcomes for the receiving party: pension income vs immediate capital.",
  },
  {
    question: "Which is better — sharing or offsetting?",
    answer: "It depends on the receiving party's needs and circumstances. Sharing is typically better where retirement income is the priority and the receiving party has limited pension of their own. Offsetting is typically better where immediate capital is needed (e.g. for housing) and the receiving party has time and means to rebuild pension provision.",
  },
  {
    question: "Can £1 of pension be swapped for £1 of cash in offsetting?",
    answer: "Generally no. £1 of pension and £1 of cash are not equivalent — pension money is taxed differently, locked away until retirement age, and (for defined benefit pensions) provides a guaranteed income stream. Most settlements use an adjustment factor (sometimes called a 'utility ratio') when offsetting pension against cash. Specialist actuarial advice is often used.",
  },
  {
    question: "How long does pension sharing take to implement?",
    answer: "Once the pension sharing order is sealed by the court, the pension scheme has 4 months to implement it. In practice, complex schemes (especially defined benefit) sometimes take longer. The receiving party typically receives confirmation of their new pension pot from the scheme on completion.",
  },
  {
    question: "Are there charges for a pension sharing order?",
    answer: "Yes. Pension schemes charge for implementation — typically £500–£2,000 for defined contribution schemes, often more for defined benefit schemes. The order should specify which party pays. There may also be costs for actuarial advice on complex schemes.",
  },
  {
    question: "What about earmarking — is that the same?",
    answer: "No. Earmarking (also called 'pension attachment') is a third option where part of one party's pension income, when drawn, is paid to the other party. It's much less common than sharing or offsetting because it creates ongoing dependency and ends if the recipient dies or remarries. Most modern settlements use sharing or offsetting in preference.",
  },
];

const relatedPages = [
  { title: "Divorce Pension Offsetting UK", description: "Detailed guide to the offsetting approach.", href: "/divorce-pension-offsetting-uk", badge: "Pensions" },
  { title: "How are Pensions Divided in Divorce UK?", description: "Overview of the pension division options.", href: "/how-are-pensions-divided-in-divorce-uk", badge: "Pensions" },
  { title: "Pension Split Calculator UK", description: "Use the calculator to model both approaches.", href: "/divorce-pension-split-calculator-uk", badge: "Calculator" },
  { title: "Preview the Full Financial Report", description: "Compare sharing and offsetting outcomes for your case.", href: "/unlock", badge: "Report" },
];

export default function PensionSharingVsOffsettingPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Pension Sharing vs Pension Offsetting in UK Divorce"
      subtitle="Two very different ways of splitting pension wealth — sharing creates a new pension for the receiving party, offsetting compensates with other assets. Each has its place, and choosing the wrong one can leave a permanent retirement income gap."
      documentTitle="Pension Sharing vs Pension Offsetting UK | DivorceCalculatorUK"
      metaDescription="The trade-offs between pension sharing and pension offsetting in UK divorce — when each approach is better, the £ pension vs £ cash valuation problem, and the practical timing and cost differences."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/divorce-financial-guides" },
        { name: "Pension Sharing vs Pension Offsetting UK", href: "/pension-sharing-vs-offsetting-uk" },
      ]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Pensions are often the largest or second-largest asset in a UK divorce — frequently larger than the family home. There are two main ways to address pension inequality between divorcing parties: pension sharing (split the pension itself) and pension offsetting (keep the pension and give the other party more of other assets). They look superficially similar but produce very different outcomes for the receiving party. Choosing the right approach often determines retirement security.
        </p>

        <Card className="border-amber-200 bg-amber-50 mb-6">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">£1 of pension is not equivalent to £1 of cash. Pension money is locked away until retirement age, taxed differently, and (for defined benefit schemes) provides guaranteed income for life. Offsetting £-for-£ typically short-changes the receiving party. Specialist actuarial advice is often essential.</p>
            </div>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Pension Sharing — Key Features</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {sharing.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border bg-background">
              <PiggyBank className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {s}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Pension Offsetting — Key Features</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {offsetting.map((o, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border bg-background">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {o}
            </div>
          ))}
        </div>
        <InlineCTA label="Model Sharing vs Offsetting Outcomes" />
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Four Factors That Decide Which Approach Fits</h2>
        <div className="space-y-4 mb-8">
          {factors.map((f, i) => (
            <Card key={i}>
              <CardContent className="pt-5 space-y-2">
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mb-4">Common Pressure Points</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Undervaluing defined benefit pensions", desc: "Final salary pensions are often more valuable than their CETV suggests, particularly for older members. Offsetting cash against a DB pension at face value can significantly underpay the receiving party." },
            { label: "Locking up retirement income", desc: "Where the receiving party offsets cash for the working spouse's pension, they get immediate liquidity but lose long-term retirement income. Without significant other assets to invest, this can mean a much weaker retirement position." },
            { label: "Implementation costs and delays", desc: "Pension sharing orders take time and money to implement — particularly in DB schemes. Building this into the timeline avoids surprises." },
            { label: "Tax treatment in retirement", desc: "Pension drawdown is taxed as income (with 25% normally tax-free). Cash invested elsewhere is taxed differently. Comparing pre-tax pension £ with after-tax cash £ is the only meaningful comparison." },
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
            "The correct utility/cash adjustment factor for offsetting in your case — actuarial advice is normally needed",
            "Whether sharing or offsetting better suits your retirement and capital needs",
            "The realistic future value of either pension or cash at your retirement age",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Questions Worth Raising With a Professional</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li>Given my age and circumstances, does sharing or offsetting better meet my needs?</li>
          <li>What's the right adjustment factor for offsetting cash against pension in our case?</li>
          <li>Is a defined benefit pension involved, and if so should we instruct an actuary?</li>
          <li>What's the long-term retirement income implication of each approach?</li>
          <li>Who pays the scheme implementation charges, and how much are they?</li>
        </ul>
        <InlineCTA label="Compare Pension Approaches in the Calculator" />
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
