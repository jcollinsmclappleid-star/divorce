import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, Home, Banknote, TrendingUp, BarChart3, ShieldAlert } from "lucide-react";
import {
  ContentPageLayout,
  ContentSection,
  InlineCTA,
  useFaqJsonLd,
} from "@/components/content-page-layout";

const faqItems = [
  {
    question: "What determines whether keeping the house is viable?",
    answer: "Three main factors shape viability: mortgage affordability (can you service the mortgage on one income?), buyout affordability (do you have sufficient cash or equity to pay out your spouse's share?), and ongoing cost sustainability (can you cover mortgage repayments, maintenance, and other housing costs on your income going forward?). Scenario comparison can help clarify which of these presents the biggest constraint in your situation.",
  },
  {
    question: "Can I keep the house if my income is lower than my spouse's?",
    answer: "A lower income makes mortgage refinancing harder, but it does not automatically rule out keeping the house. The size of the remaining mortgage relative to your income is the key variable. A large deposit (from a lump-sum settlement or existing equity) could reduce the mortgage to a level you can service alone. Modelling different assumed mortgage levels against your income can show what may be achievable.",
  },
  {
    question: "What if I can't afford to buy out my spouse's equity share?",
    answer: "If you cannot fund a buyout from savings or a new mortgage, other options may include offsetting your spouse's equity share against pension assets, agreeing a deferred sale (where you stay in the property until a triggering event), or accepting a smaller equity share in exchange for other financial concessions. Scenario comparison helps illustrate the financial implications of each approach.",
  },
  {
    question: "Does staying in the house always cost less than moving?",
    answer: "Not necessarily. Staying can mean taking on a larger mortgage or being left with very little liquid capital after buying out your spouse. Moving may allow a smaller property purchase or rental with lower monthly costs, and may leave more liquid savings. Comparing the full financial position — property, savings, income, outgoings — under 'keep' and 'sell' scenarios is more informative than comparing only monthly housing costs.",
  },
  {
    question: "What is a transfer of equity?",
    answer: "A transfer of equity is the legal process of removing one party's name from the property title and mortgage, transferring sole ownership to the retaining party. The remaining mortgage lender must agree to the transfer and will assess the sole applicant's affordability before consenting. Legal costs and stamp duty implications may arise depending on the circumstances.",
  },
];

const relatedPages = [
  { title: "Can I Keep the House After Divorce?", description: "The four main options for the family home — and the deciding factors.", href: "/can-i-keep-the-house-after-divorce-uk", badge: "FAQ" },
  { title: "House Divorce Calculator UK", description: "Compare all four property scenarios side by side.", href: "/house-divorce-calculator", badge: "Property" },
  { title: "Divorce House Buyout Calculator UK", description: "Detailed net equity and affordability modelling.", href: "/divorce-house-buyout-calculator-uk", badge: "Property" },
  { title: "Mortgage After Divorce UK", description: "Mortgage affordability and sustainability assessment.", href: "/divorce-mortgage-affordability-after-separation", badge: "Mortgage" },
  { title: "Transfer of Equity in Divorce", description: "The legal process for transferring the home into sole ownership.", href: "/transfer-of-equity-divorce-uk", badge: "Property" },
  { title: "Preview the Full Financial Report", description: "Model keeping vs selling with your figures.", href: "/unlock", badge: "Report" },
];

export default function CanIKeepHouseCalculatorPage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Can I Keep the House After Divorce? — Calculator"
      subtitle="Model whether retaining the family home is financially viable under your specific assumptions. Compare the 'keep' and 'sell' scenarios side by side — including affordability, buyout costs, and long-term sustainability. This page frames everything as scenario comparison, not a prediction of what you can or cannot do."
      documentTitle="Can I Keep the House After Divorce? Calculator UK | DivorceCalculatorUK"
      metaDescription="Model whether keeping the family home after divorce is financially viable. Compare keep vs sell scenarios, calculate buyout costs, and assess mortgage affordability on one income."
      relatedPages={relatedPages}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Can I Keep the House? Calculator", href: "/can-i-keep-the-house-after-divorce-calculator" },
      ]}
    >
      <ContentSection>
        <Card className="border-amber-200 bg-amber-50 mb-6" data-testid="card-scenario-framing">
          <CardContent className="pt-5 pb-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 leading-relaxed">
              This calculator compares scenarios — it does not predict whether you will or will not be able to keep the house, and does not constitute mortgage or legal advice. Actual lender decisions depend on individual affordability assessments. Legal outcomes depend on your specific circumstances and the overall settlement structure.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-three-tests">
          Three Key Tests to Model
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Modelling whether property retention may be viable under your assumptions involves three interconnected tests. The calculator addresses all three.
        </p>
        <div className="space-y-3 mb-8">
          <Card data-testid="card-test-buyout">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">1. Buyout affordability</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Can you fund your spouse's equity share from savings, a new mortgage, or by offsetting against other assets? The buyout amount is your spouse's percentage of the net equity — determined by the agreed split ratio and the net equity figure.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-test-mortgage">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <Home className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">2. Mortgage affordability</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Can the outstanding mortgage (or a new sole-name mortgage) be serviced on your income alone? Lenders assess affordability based on income, existing commitments, and stress-tested repayments at higher rates. The calculator models monthly repayments under different rate assumptions.</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-test-sustainability">
            <CardContent className="pt-5 pb-4 flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">3. Ongoing cost sustainability</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Can you sustain all housing costs — mortgage, utilities, maintenance, insurance — alongside your other outgoings on a single income? The sustainability assessment compares total monthly expenses against net take-home pay.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <InlineCTA label="Run the scenario comparison" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-keep-vs-sell">
          Keep vs Sell — Comparison Overview
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Rather than asking only whether you can retain the home, comparing the two main outcomes side by side provides a fuller picture of the financial trade-offs.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card data-testid="card-keep">
            <CardContent className="pt-5 pb-4">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" /> Keep the home
              </h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-start gap-1.5"><span className="text-primary">+</span> Housing stability — no immediate move required</p>
                <p className="flex items-start gap-1.5"><span className="text-primary">+</span> Children remain in familiar environment</p>
                <p className="flex items-start gap-1.5"><span className="text-destructive">–</span> Wealth concentrated in illiquid property asset</p>
                <p className="flex items-start gap-1.5"><span className="text-destructive">–</span> May require sacrificing other assets (pension, savings)</p>
                <p className="flex items-start gap-1.5"><span className="text-destructive">–</span> Full ongoing costs fall on one income</p>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-sell">
            <CardContent className="pt-5 pb-4">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> Sell and split
              </h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-start gap-1.5"><span className="text-primary">+</span> Both parties receive liquid capital</p>
                <p className="flex items-start gap-1.5"><span className="text-primary">+</span> Clean financial separation on property</p>
                <p className="flex items-start gap-1.5"><span className="text-primary">+</span> Smaller property may be more affordable</p>
                <p className="flex items-start gap-1.5"><span className="text-destructive">–</span> Disruption and relocation costs for both parties</p>
                <p className="flex items-start gap-1.5"><span className="text-destructive">–</span> Property market timing risk</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>Which outcome produces a more sustainable financial position depends on individual incomes, asset composition, and the full settlement structure. Scenario modelling quantifies these trade-offs.</span>
        </div>
      </ContentSection>

      <ContentSection>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-illustrative-example">
          Illustrative Example: Keep vs Sell
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Under these illustrative assumptions, the two scenarios produce different capital and monthly cashflow outcomes. These figures are for illustration only.
        </p>
        <div className="rounded-lg border overflow-hidden mb-6" data-testid="table-keep-sell-example">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Item</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Keep scenario</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground">Sell and split</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">Property value</td>
                <td className="px-4 py-2.5 text-right">£350,000</td>
                <td className="px-4 py-2.5 text-right">£350,000</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">Mortgage remaining</td>
                <td className="px-4 py-2.5 text-right">£180,000</td>
                <td className="px-4 py-2.5 text-right">Paid off on sale</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">Buyout required (50% equity split)</td>
                <td className="px-4 py-2.5 text-right font-medium">£78,500</td>
                <td className="px-4 py-2.5 text-right text-muted-foreground">n/a</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">Retaining party capital after</td>
                <td className="px-4 py-2.5 text-right font-medium">£0 liquid (equity locked in property)</td>
                <td className="px-4 py-2.5 text-right font-medium">~£78,500 cash</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">Est. monthly mortgage (sole name)</td>
                <td className="px-4 py-2.5 text-right font-medium">~£940/month (25yr, 4.5%)</td>
                <td className="px-4 py-2.5 text-right text-muted-foreground">No longer applies</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          Keeping the home may preserve housing stability but can leave the retaining party with limited liquid capital and higher monthly commitments. Entering your own figures will produce outputs specific to your situation.
        </p>
        <InlineCTA label="Model keep vs sell with your figures" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-xl md:text-2xl font-display font-bold mb-4" data-testid="text-faq">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="text-xs text-muted-foreground mt-8 leading-relaxed border-t pt-4">
          DivorceCalculatorUK is an assumption-based financial modelling tool. It does not provide legal, financial, tax, pension, mortgage or investment advice and does not predict court outcomes.
        </p>
      </ContentSection>
    </ContentPageLayout>
  );
}
