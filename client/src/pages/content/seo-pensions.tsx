import { useLocation, Link } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { ArrowRight, Info, AlertTriangle } from "lucide-react";

function InlineCTA({ label = "Model pension scenarios using your figures" }: { label?: string }) {
  const [, setLocation] = useLocation();
  return (
    <div className="my-8 p-5 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">See how pension allocation choices affect both parties' long-term financial position.</p>
      </div>
      <Button size="sm" onClick={() => { scrollTop(); setLocation("/wizard"); }} data-testid="button-cta-inline" className="shrink-0">
        Start modelling <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </div>
  );
}

export default function SeoPensionsPage() {
  useDocumentTitle("How Are Pensions Split in a UK Divorce? | DivorceCalculatorUK");
  useMetaTags({
    description: "A plain-English guide to pension division in UK divorce — pension sharing orders, offsetting, earmarking, CETV, and Defined Benefit vs Defined Contribution pensions.",
    canonical: "https://divorcecalculatoruk.co.uk/how-are-pensions-divided-in-divorce-uk",
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
              How Are Pensions Split in a UK Divorce?
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Pensions are often the most significant asset in a divorce — and the most commonly misunderstood. A plain-English guide to your options.
            </p>
          </div>

          <div className="p-4 rounded-md border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 dark:text-amber-200">
                Pension division in divorce is a specialist area. The information below is a general introduction. For your specific situation — particularly for Defined Benefit pensions — you should take advice from a qualified pension actuary and a family law solicitor.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Why pensions matter so much in divorce</h2>
            <p className="text-muted-foreground leading-relaxed">
              For couples in their 40s and 50s, pension values often exceed the value of the family home. Yet pensions are routinely undervalued or ignored in informal negotiations — partly because they are complex, and partly because their value is not immediately tangible.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Research by the Pension Policy Institute suggests that at least <strong>one in three divorces</strong> does not include pension assets in the settlement. This frequently disadvantages the lower-earning spouse — often the party who reduced their career to care for children.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">The three main approaches</h2>
            <div className="space-y-4">
              {[
                {
                  title: "1. Pension sharing order",
                  desc: "A defined percentage of one party's pension is transferred to the other, creating an entirely separate pension pot for the recipient. This is the cleanest approach — it achieves a clean break, removes dependency on the payer's future decisions, and gives the recipient their own pension to manage.",
                  note: "A pension sharing order requires a court order and typically incurs an administration charge from the pension scheme (varies but often £500–£2,000+).",
                },
                {
                  title: "2. Pension offsetting",
                  desc: "Instead of dividing the pension, one party receives more of another asset — typically property — in lieu of their share of the pension. For example: one party keeps the house, the other keeps their pension. No pension sharing order is needed.",
                  note: "Offsetting requires careful valuation. £100,000 of pension CETV is not equivalent to £100,000 of property equity — pension income is taxable on drawdown and not accessible until typically age 55–57. Defined Benefit pensions in particular are often worth significantly more than their CETV implies.",
                },
                {
                  title: "3. Earmarking (pension attachment order)",
                  desc: "The court orders the pension scheme to pay a specified proportion of pension payments or lump sums to the other party when the pension is drawn. Less commonly used and no longer fashionable.",
                  note: "Earmarking does not achieve a clean break. Rights cease on the recipient's death or remarriage. If the pension holder dies before drawing the pension, the earmarked amount may be lost.",
                },
              ].map((opt, i) => (
                <div key={i} className="p-4 rounded-md border space-y-2">
                  <p className="font-semibold">{opt.title}</p>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                  <div className="flex items-start gap-2 pt-1">
                    <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground italic">{opt.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineCTA label="See how pension allocation affects each party's long-term position" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Defined Benefit vs Defined Contribution — a critical distinction</h2>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-semibold">Feature</th>
                    <th className="text-left p-3 font-semibold">Defined Contribution (DC)</th>
                    <th className="text-left p-3 font-semibold">Defined Benefit (DB)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Type", "Workplace pension / SIPP / stakeholder", "Final salary / career average"],
                    ["What you're entitled to", "A pot of money", "An income at retirement"],
                    ["Value shown on statement", "Pot value", "CETV (transfer value)"],
                    ["CETV reliability", "CETV ≈ actual value", "CETV often understates true value"],
                    ["Actuary needed?", "Rarely", "Often recommended"],
                    ["Complexity for divorce", "Lower", "Higher — specialist advice strongly recommended"],
                  ].map(([feature, dc, db], i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="p-3 font-medium">{feature}</td>
                      <td className="p-3 text-muted-foreground">{dc}</td>
                      <td className="p-3 text-muted-foreground">{db}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">What is a CETV?</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Cash Equivalent Transfer Value (CETV) is the lump sum that a pension scheme would pay to transfer the pension to another scheme. For Defined Contribution pensions, the CETV is approximately equal to the fund value — it's a reasonably accurate representation of what you have.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For Defined Benefit pensions, the CETV is the amount needed to replicate the pension through a DC scheme. It can significantly understate the true economic value of the pension — particularly in low-interest-rate environments or for public sector pensions with generous indexation and spouse's benefits.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You can request a CETV from your pension provider. There is typically a 12-month validity period for court purposes.
            </p>
          </section>

          <InlineCTA label="Enter your pension values and model what sharing or offsetting looks like" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Frequently asked questions</h2>
            <Accordion type="single" collapsible data-testid="faq-accordion">
              {[
                ["Is my state pension included?", "The state pension cannot be shared in divorce proceedings. However, you may be able to inherit some of your spouse's state pension entitlement built up before April 2016. Check gov.uk for your state pension forecast."],
                ["Do I need an actuary?", "For straightforward Defined Contribution pensions, probably not. For significant Defined Benefit pensions (particularly public sector schemes), a pension actuary's report is strongly recommended and may be required by the court."],
                ["What if my partner hides their pension?", "In court proceedings, full financial disclosure is required. Pension providers must respond to court disclosure requests. Failure to disclose is treated seriously by courts."],
                ["Can I get my ex-partner's pension without a court order?", "No. A pension sharing order must be made by a court and served on the pension scheme. Pension providers will not act without a formal order."],
                ["What happens to pension payments already being received?", "If a pension is already in payment, the options are different. An earmarking order or pension sharing order can still be made, but the mechanics differ. Take specialist advice."],
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
                <strong className="text-foreground">Disclaimer:</strong> This page provides general information only. It does not constitute legal, tax, or financial advice. Pension division in divorce is a specialist area. Always seek independent legal advice from a qualified family law solicitor and consider specialist pension advice from a pension actuary or IFA regulated by the FCA.
              </p>
            </CardContent>
          </Card>

          <section className="space-y-4 pt-4 border-t" data-testid="section-related-articles">
            <h2 className="text-lg font-semibold text-foreground">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/how-are-pensions-divided-in-divorce-uk", label: "How pensions are divided — FAQ", desc: "Answers to the most common pension-sharing questions." },
                { href: "/pension-offsetting-divorce-uk", label: "Pension offsetting explained", desc: "Trading pension value against other assets — how it works." },
                { href: "/divorce-pension-split-calculator-uk", label: "Pension split calculator guide", desc: "Model different pension split assumptions in our tool." },
                { href: "/how-are-investments-divided-in-divorce-uk", label: "How are investments divided?", desc: "ISAs, shares, and investment accounts in divorce." },
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
              <Link href="/how-much-does-divorce-cost-uk" onClick={scrollTop} className="text-primary hover:underline">Divorce costs</Link>
              <Link href="/divorce-financial-settlement-calculator-uk" onClick={scrollTop} className="text-primary hover:underline">How assets are divided</Link>
              <Link href="/can-i-keep-the-house-after-divorce-uk" onClick={scrollTop} className="text-primary hover:underline">Who gets the house?</Link>
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
