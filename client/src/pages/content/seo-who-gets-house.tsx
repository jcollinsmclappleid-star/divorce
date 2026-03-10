import { useLocation, Link } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { ArrowRight, Info, Home } from "lucide-react";

function InlineCTA({ label = "Model your housing scenarios" }: { label?: string }) {
  const [, setLocation] = useLocation();
  return (
    <div className="my-8 p-5 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">See what each housing outcome means for your long-term financial position.</p>
      </div>
      <Button size="sm" onClick={() => { scrollTop(); setLocation("/wizard"); }} data-testid="button-cta-inline" className="shrink-0">
        Start modelling <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </div>
  );
}

export default function SeoWhoGetsHousePage() {
  useDocumentTitle("Who Gets the House in a UK Divorce? | DivorceCalculatorUK");
  useMetaTags({
    description: "Can you keep the family home after divorce in the UK? A plain-English guide to your four main options — sell, buyout, Mesher order, or transfer — and how courts decide.",
    canonical: "https://divorcecalculatoruk.co.uk/who-gets-house-divorce-uk",
  });
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/40 bg-background/95">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Logo size="md" />
          <Button variant="ghost" size="sm" onClick={() => { scrollTop(); setLocation("/"); }} data-testid="button-nav-home">Home</Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-8">
          <div className="space-y-3">
            <Badge variant="outline" className="text-primary border-primary/30">England & Wales · 2025/26</Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight leading-tight" data-testid="text-page-title">
              Who Gets the House in a UK Divorce?
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The four main options for the family home after divorce in England and Wales — and the financial factors that determine which is viable.
            </p>
          </div>

          <div className="p-4 rounded-md border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 dark:text-amber-200">
                There is no automatic rule in English law about who gets the house. Courts look at the financial needs of both parties — particularly the needs of any dependent children — and the overall asset pool.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Option 1 — Sell and divide the proceeds</h2>
            <p className="text-muted-foreground leading-relaxed">
              This is the most common outcome where children are not involved, or where neither party can afford to take over the mortgage alone. The property is sold on the open market, and the net proceeds (sale price minus mortgage balance minus selling costs) are divided between the parties.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Selling costs</strong> typically include estate agent fees (1–2% plus VAT), conveyancing solicitor fees, and any remaining mortgage early repayment charges. As a rough guide, budget approximately 1.5–2% of the property value.
            </p>
            <div className="p-4 rounded-md bg-muted/30 border text-sm space-y-2">
              <p className="font-medium">Illustrative example</p>
              <p className="text-muted-foreground">Property value: £350,000 · Mortgage: £180,000 · Selling costs (2%): £7,000 · Net equity: £163,000 · 50/50 split: £81,500 each</p>
              <p className="text-xs text-muted-foreground italic">Illustrative only. Actual figures depend on your specific circumstances.</p>
            </div>
          </section>

          <InlineCTA label="Model what a sale would mean for your specific asset pool" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Option 2 — One party buys the other out</h2>
            <p className="text-muted-foreground leading-relaxed">
              One party retains the property by paying the other their share of the net equity — typically via a remortgage into their sole name, using savings, or receiving less of other assets (such as pensions) in exchange.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The critical question: <strong>can the retaining party afford a sole mortgage?</strong> As a general illustration, mortgage lenders typically apply income multiples of 4–4.5× gross annual income — though actual criteria vary significantly between lenders and depend on individual circumstances including credit history, outgoings, and the lender's own affordability model.
            </p>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-semibold">Gross annual income</th>
                    <th className="text-left p-3 font-semibold">Indicative borrowing capacity (4.5×)</th>
                    <th className="text-left p-3 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["£30,000", "~£135,000", "Illustrative only — varies by lender"],
                    ["£40,000", "~£180,000", "Illustrative only — varies by lender"],
                    ["£55,000", "~£247,500", "Illustrative only — varies by lender"],
                    ["£70,000", "~£315,000", "Illustrative only — varies by lender"],
                  ].map(([income, capacity, note], i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="p-3 tabular-nums">{income}</td>
                      <td className="p-3 tabular-nums font-medium">{capacity}</td>
                      <td className="p-3 text-muted-foreground text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground italic">These are illustrative income multiple figures only. Actual mortgage capacity depends on lender-specific criteria, credit history, and affordability assessment. Always speak to a mortgage broker.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Option 3 — Deferred sale (Mesher or Martin order)</h2>
            <p className="text-muted-foreground leading-relaxed">
              A deferred sale order — commonly called a <strong>Mesher order</strong> — keeps the property held jointly (technically on trust) until a specified trigger event. The most common triggers are: the youngest child reaching 18 (or finishing education), the resident party remarrying or cohabiting, or the resident party choosing to sell.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The departing party retains a defined percentage of the future proceeds. This provides housing stability for children but delays a clean break and can lead to complications around maintenance of the property and what happens if either party's circumstances change.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A <strong>Martin order</strong> is similar but used where there are no dependent children — the sale is deferred until the resident party dies, remarries, or voluntarily leaves.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Option 4 — Transfer with no buyout (offsetting)</h2>
            <p className="text-muted-foreground leading-relaxed">
              The home is transferred entirely to one party in lieu of other assets — typically the pension. For example, one party keeps the house; the other keeps their pension. This approach is known as <strong>offsetting</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              It requires careful modelling. Property equity and pension value are not directly comparable: £150,000 of property equity provides immediate housing security, while £150,000 of pension value is not accessible until retirement and is subject to income tax on drawdown. Getting this comparison right is critical.
            </p>
            <div className="p-4 rounded-md border border-amber-200 bg-amber-50/30 text-sm space-y-1">
              <p className="font-medium text-amber-900 dark:text-amber-200">Important note on pension offsetting</p>
              <p className="text-muted-foreground">For Defined Benefit (final salary) pensions, the CETV often significantly understates the true value. A specialist pension actuary's report may be needed before offsetting a DB pension against property equity.</p>
            </div>
          </section>

          <InlineCTA label="Compare all four housing scenarios using your own figures" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">How courts decide</h2>
            <p className="text-muted-foreground leading-relaxed">
              Where parties cannot agree, courts prioritise the housing needs of dependent children first. The parent with primary care will typically be prioritised for the family home — but only if they can afford to maintain it. Courts will not make an order that is unaffordable for the party retaining the property.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Where children are not involved, the court looks at each party's ability to rehouse from their share, their respective incomes, and whether a clean break is achievable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Frequently asked questions</h2>
            <Accordion type="single" collapsible data-testid="faq-accordion">
              {[
                ["Can I stay in the house until the children are 18?", "Possibly, through a Mesher order — but this requires the agreement of both parties or a court order. The court will only make a Mesher order if it is fair to the departing party and financially viable."],
                ["What if the house is in my partner's name only?", "In England and Wales, the fact that the home is in one party's sole name does not automatically determine who gets it in a divorce. The court looks at the overall financial position of both parties."],
                ["Do I have to sell if I don't want to?", "If you cannot reach agreement and the court orders a sale, you are legally obliged to cooperate. Failure to do so can result in costs orders and contempt of court proceedings."],
                ["What if there is negative equity?", "If the property is worth less than the mortgage, the 'equity' is negative. This is treated as a liability. Selling would require both parties to contribute to clearing the remaining mortgage debt."],
                ["Is stamp duty payable on a transfer between spouses?", "A transfer of property between spouses as part of a divorce settlement can qualify for stamp duty relief. However, this depends on the specific circumstances and you should take legal advice. SDLT rules can be complex."],
              ].map(([q, a], i) => (
                <AccordionItem key={i} value={`faq-${i}`} data-testid={`faq-item-${i}`}>
                  <AccordionTrigger className="text-sm font-medium text-left">{q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Card>
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> This page provides general information only. It does not constitute legal or financial advice. Housing decisions in divorce depend on individual circumstances. Always seek independent legal advice from a qualified family law solicitor and mortgage advice from an authorised broker.
              </p>
            </CardContent>
          </Card>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">Also see:</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/how-much-does-divorce-cost-uk" onClick={scrollTop} className="text-primary hover:underline">Divorce costs</Link>
              <Link href="/divorce-financial-settlement-calculator-uk" onClick={scrollTop} className="text-primary hover:underline">How assets are divided</Link>
              <Link href="/how-pensions-split-divorce-uk" onClick={scrollTop} className="text-primary hover:underline">How pensions are split</Link>
              <Link href="/divorce-settlement-examples-uk" onClick={scrollTop} className="text-primary hover:underline">Settlement examples</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground space-x-4">
          <Link href="/privacy" onClick={scrollTop} className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" onClick={scrollTop} className="hover:text-foreground">Terms</Link>
          <Link href="/methodology" onClick={scrollTop} className="hover:text-foreground">Methodology</Link>
          <Link href="/" onClick={scrollTop} className="hover:text-foreground">Home</Link>
        </div>
      </footer>
    </div>
  );
}
