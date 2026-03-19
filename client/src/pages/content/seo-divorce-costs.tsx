import { useLocation, Link } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { ArrowRight, Info, CheckCircle2 } from "lucide-react";

function InlineCTA({ label = "Model your financial settlement" }: { label?: string }) {
  const [, setLocation] = useLocation();
  return (
    <div className="my-8 p-5 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">See what your settlement could look like — based on your actual figures.</p>
      </div>
      <Button size="sm" onClick={() => { scrollTop(); setLocation("/wizard"); }} data-testid="button-cta-inline" className="shrink-0">
        Start modelling <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </div>
  );
}

export default function SeoDivorceCostsPage() {
  useDocumentTitle("How Much Does Divorce Cost in the UK? (2025/26) | DivorceCalculatorUK");
  useMetaTags({
    description: "A plain-English breakdown of UK divorce costs in 2025/26 — solicitor fees, court fees, mediation costs, and how to keep costs down. Covers England & Wales.",
    canonical: "https://divorcecalculatoruk.co.uk/how-much-does-divorce-cost-uk",
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
          <div className="mb-2">
            <Link href="/divorce-financial-guides" onClick={scrollTop} className="text-sm text-primary hover:underline flex items-center gap-1" data-testid="link-all-guides">← All guides</Link>
          </div>
          <div className="space-y-3">
            <Badge variant="outline" className="text-primary border-primary/30">England & Wales · 2025/26</Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight leading-tight" data-testid="text-page-title">
              How Much Does Divorce Cost in the UK?
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A plain-English guide to divorce costs — from court fees to solicitor costs — and how financial preparation can reduce your overall spend.
            </p>
          </div>

          <div className="p-4 rounded-md border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900 dark:text-blue-200">
                This page covers costs in England and Wales only. Scotland and Northern Ireland have different legal systems and different fee structures.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Court and application fees</h2>
            <p className="text-muted-foreground leading-relaxed">
              The court fee to issue a divorce application (previously called a petition) is currently <strong>£593</strong> in England and Wales. This is payable when the application is filed. If you cannot afford the fee, you may be eligible for a fee remission — check the government's Help with Fees service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you need a court order for financial matters (a consent order to make a financial agreement legally binding), there is a separate court fee of <strong>£53</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Solicitor costs — the biggest variable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Solicitor fees vary enormously depending on the complexity of your case, the level of conflict, and where in the country you are. As a general guide:
            </p>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-semibold">Route</th>
                    <th className="text-left p-3 font-semibold">Typical cost range</th>
                    <th className="text-left p-3 font-semibold">What drives cost</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["DIY / online service", "£200–£1,000", "Court fees + simple online tool"],
                    ["Mediation + consent order", "£1,500–£5,000", "Number of sessions, solicitor review"],
                    ["Solicitor-led negotiation (agreed)", "£3,000–£10,000 per party", "Complexity, asset types, cooperation"],
                    ["Collaborative process", "£5,000–£15,000 per party", "Time in joint sessions"],
                    ["Contested court proceedings", "£15,000–£50,000+ per party", "Number of hearings, expert reports"],
                  ].map(([route, cost, driver], i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="p-3 font-medium">{route}</td>
                      <td className="p-3 tabular-nums">{cost}</td>
                      <td className="p-3 text-muted-foreground">{driver}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground italic">These are illustrative ranges only. Actual costs depend on individual circumstances. Always obtain a written costs estimate from your solicitor.</p>
          </section>

          <InlineCTA label="See what your financial position looks like before solicitor negotiations" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Mediation costs</h2>
            <p className="text-muted-foreground leading-relaxed">
              Family mediation typically costs <strong>£100–£200 per person per session</strong>, with most financial cases requiring 3–6 sessions. An initial Mediation Information and Assessment Meeting (MIAM) — which is mandatory before applying to court in most cases — costs around <strong>£100–£150</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Where income is below a threshold, legal aid may be available for mediation. Check gov.uk for current eligibility criteria.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">What makes financial cases more expensive</h2>
            <div className="space-y-3">
              {[
                ["Business assets", "Valuing a business typically requires an independent accountant's report — costs of £2,000–£10,000+ are common."],
                ["Pension disputes", "Where pension values are disputed or significant, a pension actuary may be needed. Reports typically cost £1,000–£3,000."],
                ["Property disputes", "Where the value of the family home is disputed, a joint independent surveyor will be required."],
                ["Hidden assets", "If one party suspects the other is hiding assets, forensic investigation through the court process significantly increases costs."],
                ["Non-cooperation", "The single biggest cost driver. Cases where both parties engage constructively are dramatically cheaper than contested proceedings."],
              ].map(([factor, explanation], i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-md border">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{factor}</p>
                    <p className="text-sm text-muted-foreground">{explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCTA label="Run your own settlement scenarios" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Frequently asked questions</h2>
            <Accordion type="single" collapsible data-testid="faq-accordion">
              {[
                ["Who pays for divorce?", "Either party can pay the initial court fee. For financial proceedings, each party typically pays their own solicitor costs — costs orders against one party (making them pay the other's costs) are relatively rare in financial proceedings."],
                ["Can I get legal aid?", "Legal aid for private family law matters is now very limited. It may be available in cases involving domestic abuse or child protection concerns. Check gov.uk for current eligibility."],
                ["Is mediation compulsory?", "You must attend a MIAM before making most court applications — but you cannot be forced to participate in mediation itself. Courts do take into account whether parties have engaged with non-court dispute resolution."],
                ["Does the court divide everything 50/50?", "No. The starting point under English law is fairness, not equality. Meeting each party's financial needs comes first. See our guide to UK divorce finances for more detail."],
                ["How long does a financial settlement take?", "If agreed: 3–6 months from start to consent order. If contested: typically 12–24 months. Complexity, disclosure disputes, and court availability all affect timing."],
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
                <strong className="text-foreground">Disclaimer:</strong> The information on this page is provided for general guidance only. It does not constitute legal or financial advice. Costs and procedures may change — always verify current fees with HMCTS and obtain a costs estimate from a qualified solicitor. DivorceCalculatorUK is not a law firm and is not regulated by the Solicitors Regulation Authority.
              </p>
            </CardContent>
          </Card>

          <section className="space-y-4 pt-4 border-t" data-testid="section-related-articles">
            <h2 className="text-lg font-semibold text-foreground">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/mediation-vs-court-divorce-uk-costs", label: "Mediation vs court — costs compared", desc: "The real cost difference between the two main routes to settlement." },
                { href: "/timeline-of-divorce-and-financial-settlement-uk", label: "Timeline of divorce and financial settlement", desc: "From separation to final order — the full process mapped out." },
                { href: "/how-long-does-divorce-financial-settlement-take-uk", label: "How long does a financial settlement take?", desc: "Typical timelines for agreed, FDR, and contested cases." },
                { href: "/settling-out-of-court-vs-court-divorce-uk", label: "Settling out of court vs court proceedings", desc: "Compare the time, cost, and outcome control of each route." },
              ].map((link) => (
                <Link key={link.href} href={link.href} onClick={scrollTop} className="block group p-3 rounded-lg border hover:border-primary/40 hover:bg-primary/5 transition-all" data-testid={`link-related-${link.href.replace(/\//g, "")}`}>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{link.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">Also see:</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/divorce-financial-settlement-calculator-uk" onClick={scrollTop} className="text-primary hover:underline">Financial settlement guide</Link>
              <Link href="/can-i-keep-the-house-after-divorce-uk" onClick={scrollTop} className="text-primary hover:underline">Who gets the house?</Link>
              <Link href="/how-are-pensions-divided-in-divorce-uk" onClick={scrollTop} className="text-primary hover:underline">How pensions are split</Link>
              <Link href="/divorce-settlement-examples-uk" onClick={scrollTop} className="text-primary hover:underline">Settlement examples</Link>
              <Link href="/free-guide" onClick={scrollTop} className="text-primary hover:underline">Free divorce finances guide</Link>
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
