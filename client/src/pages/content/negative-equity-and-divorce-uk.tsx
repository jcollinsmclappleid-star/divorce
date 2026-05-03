import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home, AlertCircle, CheckSquare, ExternalLink, TrendingDown } from "lucide-react";
import { ContentPageLayout, ContentSection, InlineCTA, useFaqJsonLd } from "@/components/content-page-layout";

const factors = [
  { label: "Negative equity is a shared liability, not a shared asset", desc: "If both names are on the mortgage, both remain jointly and severally liable to the lender — meaning each party can be pursued for the full debt, not just their 'half'. The divorce court cannot release a party from a mortgage; only the lender can." },
  { label: "The home cannot simply be 'transferred'", desc: "Where there is no equity (or negative equity), there is nothing to share — but the obligation to pay the mortgage continues. A transfer of equity is unlikely to be possible while the property is in negative equity, because the lender is unlikely to release the leaving party without the equity to support a re-mortgage." },
  { label: "Selling at a loss requires lender consent", desc: "A short sale (selling for less than the outstanding mortgage) usually requires the lender's express consent and arrangements to repay the shortfall. Without consent, the lender can refuse to release the charge and block the sale." },
  { label: "Bankruptcy is a real risk for both parties", desc: "If the property is repossessed and sold at a loss, both joint borrowers can be pursued for the shortfall debt. This can affect credit files for years and, in serious cases, lead to bankruptcy." },
  { label: "A Mesher order may defer the problem", desc: "Where there is no equity to divide and one party needs to remain in the home (often the primary carer of children), a Mesher order can defer the sale until a trigger event — for example, the youngest child reaching 18 — by which point the equity position may have improved." },
];

const faqItems = [
  { question: "What happens to a house in negative equity in a UK divorce?", answer: "Both joint borrowers remain liable to the lender regardless of what the divorce settlement says. Common options include continuing to share the mortgage and reviewing the position later, selling with lender consent and agreeing how to split the shortfall, deferring the sale via a Mesher order, or in extreme cases handing the property back to the lender — all of which carry serious financial consequences." },
  { question: "Can I be removed from a joint mortgage if there is no equity?", answer: "Generally no. Lenders agree to release a borrower only if the remaining borrower can demonstrate affordability and there is enough equity to support the position. In negative equity it is very unusual to obtain lender consent without first injecting capital or restructuring the loan." },
  { question: "Does the court order I have to pay half the shortfall?", answer: "The court can order how a shortfall is dealt with as between the parties — but the lender is not bound by that order and can still pursue either borrower for the full debt. If your spouse fails to pay, you may end up paying the lender first and then trying to recover from your spouse separately, which is rarely straightforward." },
  { question: "Are there any government schemes that help?", answer: "There is no specific UK government scheme for divorcing couples in negative equity. The Mortgage Charter (2023) sets out commitments by participating lenders for borrowers in difficulty — including extended terms and short-term interest-only switches. The FCA's MCOB rules require lenders to treat customers in payment difficulty fairly. MoneyHelper (a free service from the Money and Pensions Service) provides debt and mortgage guidance." },
  { question: "Should I just hand the keys back?", answer: "'Voluntary surrender' is rarely a good option. The lender will still sell the property and pursue you for any shortfall, and your credit file will record the surrender for six years. It is normally better to talk to the lender first about forbearance options under the Mortgage Charter and to take debt advice from a free service like StepChange or Citizens Advice before considering surrender." },
  { question: "Can the calculator model negative equity?", answer: "Yes — the property module accepts a negative net equity value (mortgage greater than market value), and the engine treats this as a shared liability rather than an asset. You can model who would carry the negative equity in each scenario and see the impact on each party's net financial position." },
];

const relatedPages = [
  { title: "Both Names on Mortgage During Divorce", description: "Joint and several liability — what it means and what it does not.", href: "/both-names-on-mortgage-divorce-uk", badge: "Mortgage" },
  { title: "Mesher vs Martin Orders", description: "Deferred sale orders that buy time for housing in difficult markets.", href: "/mesher-vs-martin-order-uk", badge: "Orders" },
  { title: "What Happens to Debts in Divorce", description: "How joint and sole debts are treated in a financial settlement.", href: "/what-happens-to-debts-in-divorce-uk", badge: "Debts" },
  { title: "Bankruptcy and Divorce", description: "Where serious financial difficulty meets a financial settlement.", href: "/bankruptcy-and-divorce-uk", badge: "Insolvency" },
];

export default function NegativeEquityDivorcePage() {
  useFaqJsonLd(faqItems);
  return (
    <ContentPageLayout
      title="Negative Equity and Divorce in the UK"
      subtitle="When the mortgage is bigger than the property is worth, there is nothing to divide — only liabilities to manage. Here is how UK divorces typically deal with negative equity."
      documentTitle="Negative Equity and Divorce UK | DivorceCalculatorUK"
      metaDescription="What happens when you divorce with a property in negative equity in the UK — joint liability, Mesher orders, lender consent, and the options under the Mortgage Charter."
      relatedPages={relatedPages}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Guides", href: "/divorce-financial-guides" }, { name: "Negative Equity and Divorce", href: "/negative-equity-and-divorce-uk" }]}
    >
      <ContentSection>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Negative equity — where the outstanding mortgage exceeds the market value of the property — is a particularly difficult feature of any divorce. There is no equity to share between the parties, but the joint mortgage liability continues, and the lender's rights are unaffected by anything the divorce court orders.
        </p>
        <h2 className="text-2xl font-display font-bold mt-8 mb-4">How negative equity changes the picture</h2>
        <div className="space-y-3 mb-6">
          {factors.map((f, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-lg border">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold mb-1">{f.label}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <InlineCTA label="Model a Negative Equity Scenario" />
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">Illustrative scenario</h2>
        <Card className="mb-6">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-semibold">Fictional couple, property worth £220k, mortgage £245k</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Home className="w-4 h-4 text-primary" /><span>Net equity: <strong>−£25,000</strong>. Selling now would leave a £25k shortfall plus disposal costs to repay to the lender — which both joint borrowers remain liable for.</span></div>
              <div className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-primary" /><span>Realistic options: agree to keep the mortgage running for 2–3 years and review; one party stays with primary carer of children under a Mesher order; or speak to the lender about forbearance under the Mortgage Charter.</span></div>
            </div>
            <p className="text-xs text-muted-foreground">Illustrative only. Take professional debt and family law advice before acting.</p>
          </CardContent>
        </Card>
      </ContentSection>

      <ContentSection>
        <h2 className="text-2xl font-display font-bold mb-6">Figures and information you will need</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {["Current realistic market value (multiple agent valuations)", "Outstanding mortgage balance (most recent statement)", "Early repayment charges and exit fees", "Estimated sale costs (agent + legal ≈ 2–3% of price)", "Both parties' current incomes and outgoings", "Any other joint debts (loans, credit cards)", "Local rental costs to compare with current mortgage", "Lender forbearance options previously offered"].map((fig, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-lg border">
              <CheckSquare className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {fig}
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection muted>
        <h2 className="text-2xl font-display font-bold mb-4">What the calculator cannot decide</h2>
        <div className="space-y-3 mb-6">
          {["Whether your lender will agree to a short sale or transfer of equity", "Whether voluntary surrender is the right choice in your situation — speak to a free debt adviser first", "Whether bankruptcy might be appropriate for either party"].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border bg-background text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mt-6 mb-4">Official sources</h2>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
          <li><a className="underline hover:text-primary" href="https://www.gov.uk/government/publications/the-mortgage-charter" target="_blank" rel="noopener noreferrer">GOV.UK / HM Treasury — The Mortgage Charter <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.fca.org.uk/consumers/mortgage-payment-difficulties" target="_blank" rel="noopener noreferrer">FCA — Mortgage payment difficulties <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.moneyhelper.org.uk/en/homes/buying-a-home/negative-equity-what-it-means-and-what-you-can-do" target="_blank" rel="noopener noreferrer">MoneyHelper — Negative equity: what it means and what you can do <ExternalLink className="inline w-3 h-3" /></a></li>
          <li><a className="underline hover:text-primary" href="https://www.stepchange.org/" target="_blank" rel="noopener noreferrer">StepChange — Free debt advice <ExternalLink className="inline w-3 h-3" /></a></li>
        </ul>
        <p className="text-xs text-muted-foreground italic">General information only. Not legal, tax, financial or debt advice. Take advice from a regulated debt adviser and family solicitor before making decisions about a property in negative equity.</p>
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
