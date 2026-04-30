import { useLocation, Link } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteNav } from "@/components/site-nav";
import { scrollTop } from "@/lib/utils";
import { ArrowRight, Info } from "lucide-react";

function InlineCTA({ label = "Model your financial settlement" }: { label?: string }) {
  const [, setLocation] = useLocation();
  return (
    <div className="my-8 p-5 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">See how different asset divisions would affect your long-term financial position.</p>
      </div>
      <Button size="sm" onClick={() => { scrollTop(); setLocation("/wizard"); }} data-testid="button-cta-inline" className="shrink-0">
        Start modelling <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </div>
  );
}

export default function SeoAssetDivisionPage() {
  useDocumentTitle("Divorce Financial Settlement Calculator UK — How Assets Are Divided | DivorceCalculatorUK");
  useMetaTags({
    description: "How are assets divided in a UK divorce? A plain-English guide to financial settlements in England and Wales — property, pensions, savings, and debts.",
    canonical: "https://divorcecalculatoruk.co.uk/divorce-financial-settlement-calculator-uk",
  });
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-8">
          <div className="mb-2">
            <Link href="/divorce-financial-guides" onClick={scrollTop} className="text-sm text-primary hover:underline flex items-center gap-1" data-testid="link-all-guides">← All guides</Link>
          </div>
          <div className="space-y-3">
            <Badge variant="outline" className="text-primary border-primary/30">England & Wales · 2026/27</Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight leading-tight" data-testid="text-page-title">
              Divorce Financial Settlement UK — How Assets Are Divided
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A plain-English guide to how property, pensions, savings, and debts are dealt with in English and Welsh divorce financial settlements.
            </p>
          </div>

          <div className="p-4 rounded-md border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900 dark:text-blue-200">
                This page covers England and Wales only. Scotland operates under different legislation (the Family Law (Scotland) Act 1985). Northern Ireland has its own rules under the Matrimonial Causes (Northern Ireland) Order 1978.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">The legal framework — Section 25 factors</h2>
            <p className="text-muted-foreground leading-relaxed">
              In England and Wales, courts divide assets under the Matrimonial Causes Act 1973, applying the criteria set out in Section 25. The overriding objective is to achieve a "fair" outcome. The key factors are:
            </p>
            <div className="space-y-2">
              {[
                ["Financial resources", "Each party's current and likely future assets, income, and earning capacity"],
                ["Financial needs and obligations", "Living costs, housing needs, obligations to children"],
                ["Standard of living", "The lifestyle enjoyed during the marriage — context, not a guarantee"],
                ["Age and length of marriage", "Short marriages may result in pre-marital assets being ring-fenced"],
                ["Contributions", "Financial and non-financial — homemaking and child-rearing count equally"],
                ["Disabilities or health", "May affect earning capacity and financial needs"],
                ["Conduct", "Rarely relevant; only if it would be inequitable to disregard it"],
              ].map(([factor, desc], i) => (
                <div key={i} className="grid grid-cols-[140px_1fr] gap-3 py-2 border-b last:border-0 text-sm">
                  <span className="font-medium">{factor}</span>
                  <span className="text-muted-foreground">{desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">What counts as a marital asset?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Generally, all assets — regardless of whose name they are in — are treated as available for distribution if they were acquired during the marriage or used for the benefit of the family. This includes:
            </p>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-semibold">Asset type</th>
                    <th className="text-left p-3 font-semibold">Typical treatment</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Family home", "Usually the primary focus. Options: sell, buyout, defer."],
                    ["Other property", "Investment properties treated as marital assets if acquired during marriage."],
                    ["Pensions (accrued during marriage)", "Significant — often the second-largest asset. Shared by pension sharing order, offsetting, or earmarking."],
                    ["ISAs, savings, investments", "Marital if accumulated during marriage. Pre-marital may be ring-fenced in short marriages."],
                    ["Business interests", "Valued (often by an independent accountant). May be ring-fenced if pre-marital, but often partially included."],
                    ["Inheritances/gifts", "Received during marriage: courts have discretion. Received before marriage: more likely ring-fenced."],
                    ["Debts and liabilities", "Included as negative assets. Joint debts are both parties' responsibility."],
                  ].map(([asset, treatment], i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="p-3 font-medium">{asset}</td>
                      <td className="p-3 text-muted-foreground">{treatment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <InlineCTA label="See your asset pool broken down across four settlement scenarios" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Is it always 50/50?</h2>
            <p className="text-muted-foreground leading-relaxed">
              No. Courts start with the principle of equal sharing — but this is a starting point, not a rule. Departures from equality are common where:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
              <li>One party has significantly greater financial needs (e.g., primary carer of young children with limited earning capacity)</li>
              <li>One party made substantially greater contributions — though courts are increasingly sceptical of this argument for long marriages</li>
              <li>Significant pre-marital wealth exists</li>
              <li>The marriage was short (under 5 years)</li>
              <li>One party is significantly older with limited future earning capacity</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              In practice, many financial settlements do end up close to equal — but the route to that outcome, and the form the settlement takes (who gets the house, who gets the pension), varies enormously.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">How the settlement process works</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most financial settlements are reached by agreement — either through direct negotiation, solicitor correspondence, or mediation — rather than by a court imposing a decision. Once agreement is reached, a consent order is filed with the court. The judge reviews and approves it without a hearing in most cases.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If parties cannot agree, the court process (called an FDR — Financial Dispute Resolution — process) involves an initial hearing, an FDR appointment (a settlement-focused hearing), and if still unresolved, a final hearing where the judge decides.
            </p>
          </section>

          <InlineCTA label="Understand what four different settlement structures look like for your figures" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Frequently asked questions</h2>
            <Accordion type="single" collapsible data-testid="faq-accordion">
              {[
                ["Do I have to go to court?", "No. The majority of financial settlements are reached by agreement without a final court hearing. You do need a consent order to make the agreement legally binding — but that is usually a paper process without attendance."],
                ["Can my spouse claim assets in my name?", "Generally yes, if they were accumulated during the marriage. The fact that an asset is in one party's sole name does not usually protect it from a financial claim."],
                ["How long does a financial settlement take?", "An agreed case can typically be resolved in 3–6 months. A contested case going to a final hearing typically takes 12–24 months."],
                ["What is a clean break order?", "A clean break order dismisses all future financial claims between the parties. It prevents either party from making claims later (including against estates after death). Courts encourage clean breaks where financially viable."],
                ["Can I remarry before the financial settlement is resolved?", "Yes, but if you remarry before your financial claims are resolved in court proceedings, you lose the right to make a capital claim. You should take legal advice before remarrying."],
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
                <strong className="text-foreground">Disclaimer:</strong> This page provides general information only. It does not constitute legal or financial advice. Financial settlements depend on individual facts and circumstances. Always seek independent legal advice from a qualified family law solicitor.
              </p>
            </CardContent>
          </Card>

          <section className="space-y-4 pt-4 border-t" data-testid="section-related-articles">
            <h2 className="text-lg font-semibold text-foreground">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/what-is-a-consent-order-uk-divorce", label: "What is a consent order?", desc: "How to make a financial agreement legally binding." },
                { href: "/what-is-a-clean-break-order-uk", label: "What is a clean break order?", desc: "How to end all future financial claims between parties." },
                { href: "/financial-disclosure-divorce-uk", label: "Financial disclosure in divorce", desc: "What you are legally required to disclose." },
                { href: "/how-are-savings-split-in-divorce-uk", label: "How are savings split in divorce?", desc: "How courts approach joint and sole savings accounts." },
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
              <Link href="/how-much-does-divorce-cost-uk" onClick={scrollTop} className="text-primary hover:underline">Divorce costs guide</Link>
              <Link href="/can-i-keep-the-house-after-divorce-uk" onClick={scrollTop} className="text-primary hover:underline">Who gets the house?</Link>
              <Link href="/how-are-pensions-divided-in-divorce-uk" onClick={scrollTop} className="text-primary hover:underline">How pensions are split</Link>
              <Link href="/divorce-settlement-examples-uk" onClick={scrollTop} className="text-primary hover:underline">Settlement examples</Link>
              <Link href="/unlock" onClick={scrollTop} className="text-primary hover:underline">Preview full report</Link>
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
