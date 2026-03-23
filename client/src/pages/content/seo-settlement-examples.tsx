import { useLocation, Link } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteNav } from "@/components/site-nav";
import { scrollTop } from "@/lib/utils";
import { ArrowRight, Info, AlertTriangle } from "lucide-react";

function InlineCTA({ label = "Model your own settlement" }: { label?: string }) {
  const [, setLocation] = useLocation();
  return (
    <div className="my-8 p-5 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">These examples are illustrative. Your figures will produce your own personalised analysis.</p>
      </div>
      <Button size="sm" onClick={() => { scrollTop(); setLocation("/wizard"); }} data-testid="button-cta-inline" className="shrink-0">
        Start modelling <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </div>
  );
}

function ExampleCard({ title, scenario, assets, outcome, note }: {
  title: string;
  scenario: string;
  assets: string[];
  outcome: string[];
  note: string;
}) {
  return (
    <div className="rounded-lg border p-5 space-y-4">
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{scenario}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-1.5">
          <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Assets & context</p>
          {assets.map((a, i) => <p key={i} className="text-muted-foreground">· {a}</p>)}
        </div>
        <div className="space-y-1.5">
          <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Illustrative outcome</p>
          {outcome.map((o, i) => <p key={i} className="text-foreground">· {o}</p>)}
        </div>
      </div>
      <div className="flex items-start gap-2 pt-1 border-t">
        <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground italic">{note}</p>
      </div>
    </div>
  );
}

export default function SeoSettlementExamplesPage() {
  useDocumentTitle("UK Divorce Settlement Examples — Illustrative Case Studies | DivorceCalculatorUK");
  useMetaTags({
    description: "Illustrative UK divorce settlement examples covering property, pensions, and income across different asset levels. These are worked examples only — not legal advice.",
    canonical: "https://divorcecalculatoruk.co.uk/divorce-settlement-examples-uk",
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
            <Badge variant="outline" className="text-primary border-primary/30">England & Wales · Illustrative only</Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight leading-tight" data-testid="text-page-title">
              UK Divorce Settlement Examples
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Illustrative examples showing how different asset positions and circumstances can lead to different settlement structures. These are worked examples — not predictions or legal advice.
            </p>
          </div>

          <div className="p-4 rounded-md border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 dark:text-amber-200">
                All examples below are entirely illustrative and are presented for educational purposes only. They do not represent actual cases, and the outcomes shown are not predictions of what a court would order. Every case is decided on its specific facts.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Example 1 — Young couple, limited assets</h2>
            <ExampleCard
              title="Short marriage, rented property, modest savings"
              scenario="A couple aged 31 and 28, married 4 years, no children. They rent their home. Combined savings of approximately £28,000. Party A earns £42,000/yr, Party B earns £26,000/yr."
              assets={[
                "No property equity",
                "Party A savings: £18,000",
                "Party B savings: £10,000",
                "Small workplace pensions (DC) accrued during marriage",
                "No significant liabilities",
              ]}
              outcome={[
                "Clean break — no spousal maintenance",
                "Savings divided roughly equally (~£14,000 each)",
                "Pension sharing order to equalise pension accrual during marriage",
                "No property or housing issues",
              ]}
              note="Short marriage, similar earning capacities, no children. Courts typically favour a clean break and broadly equal division of marital assets only. Pre-marital savings may be ring-fenced."
            />
          </section>

          <InlineCTA label="Apply this framework to your own figures" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Example 2 — Mid-life couple, family home and pensions</h2>
            <ExampleCard
              title="15-year marriage, two children, significant assets"
              scenario="A couple aged 46 and 43, married 15 years, two children aged 12 and 9. Party A earns £75,000/yr, Party B works part-time earning £22,000/yr after career break for childcare."
              assets={[
                "Family home value: £480,000",
                "Mortgage outstanding: £190,000",
                "Net equity: ~£275,000 (after selling costs)",
                "Party A pension CETV: £180,000 (DC)",
                "Party B pension CETV: £35,000 (DC)",
                "Savings: £42,000 combined",
              ]}
              outcome={[
                "Party B retains family home (children in primary care)",
                "Party B remortgages in sole name to pay Party A ~£80,000",
                "Party A receives larger pension share to partially offset housing",
                "Child maintenance: approximately £748/month (CMS basic rate for 2 children on £75k gross)",
                "Some spousal maintenance for a defined period to support Party B's return to full-time work",
              ]}
              note="Long marriage, primary carer with reduced earning capacity, children's housing stability prioritised. Pension offsetting and partial buyout used together. Actual outcome depends heavily on individual circumstances."
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Example 3 — High-value assets, complex pensions</h2>
            <ExampleCard
              title="Long marriage, significant DB pension, investment property"
              scenario="A couple aged 55 and 52, married 22 years. Party A is a public sector professional with a significant Defined Benefit pension. Party B has an investment property in addition to the family home."
              assets={[
                "Family home equity: ~£420,000 (net)",
                "Investment property equity: ~£180,000 (net of CGT)",
                "Party A DB pension CETV: £580,000 (but actuary values it at ~£780,000)",
                "Party B DC pension: £140,000",
                "Savings: £95,000 combined",
              ]}
              outcome={[
                "Family home sold — proceeds split equally (neither can afford to maintain it solo in retirement)",
                "Investment property transferred to Party B (CGT implications — specialist tax advice needed)",
                "Pension sharing order: 40% of Party A's DB pension transferred to Party B",
                "Clean break — no spousal maintenance given similar ages and earning capacity",
                "Net result: broadly equal overall position using actuarial pension values",
              ]}
              note="Long marriage, high-complexity assets. DB pension actuary report was critical — CETV significantly understated true pension value. CGT on investment property reduced its net value in offsetting calculations."
            />
          </section>

          <InlineCTA label="Model your own asset pool across four settlement scenarios" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Example 4 — Deferred sale (Mesher order)</h2>
            <ExampleCard
              title="Young children, one party cannot rehouse independently"
              scenario="A couple aged 39 and 37, married 10 years, three children aged 3, 6, and 9. Party B is the primary carer and earns £18,000/yr part-time. Party A earns £55,000/yr."
              assets={[
                "Family home value: £295,000",
                "Mortgage outstanding: £165,000",
                "Net equity: ~£124,000",
                "Small pensions on both sides",
                "Minimal savings",
              ]}
              outcome={[
                "Mesher order: home remains for Party B and children until youngest child is 18",
                "At sale, proceeds split 55% Party B / 45% Party A",
                "Child maintenance: approximately £660/month (CMS basic rate for 3 children on £55k)",
                "Pensions shared to provide Party B with some retirement provision",
                "No immediate buyout — insufficient capital on either side",
              ]}
              note="Neither party could afford independent rehousing from the limited equity. The Mesher order preserved stability for the children while preserving Party A's future equity interest. Both parties remain exposed to property market fluctuations until the sale trigger."
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Key patterns across these examples</h2>
            <div className="space-y-3">
              {[
                ["Children come first", "Where dependent children are involved, their housing stability is prioritised. The primary carer's housing needs typically drive the structure of the settlement."],
                ["Earning capacity matters", "A significant income disparity — particularly where it was caused by career breaks for childcare — affects the division of capital and may lead to maintenance."],
                ["Pensions are often the decisive asset", "For couples over 45, pensions frequently exceed the home equity in value. Getting the valuation right — especially for DB pensions — is critical."],
                ["A clean break is preferred", "Courts prefer a clean break where financially viable. Long-term maintenance awards have become less common, particularly for younger parties."],
                ["Complexity = cost", "Business assets, DB pensions, investment properties, and offshore assets all add complexity and cost to the process."],
              ].map(([pattern, desc], i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-md border">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">{i + 1}</div>
                  <div>
                    <p className="font-medium text-sm">{pattern}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Frequently asked questions</h2>
            <Accordion type="single" collapsible data-testid="faq-accordion">
              {[
                ["Do courts always follow these patterns?", "No. Courts have very wide discretion, and outcomes depend entirely on the specific facts of each case. These examples are purely illustrative of common patterns — not predictions of what would happen in your case."],
                ["Can I use these examples to negotiate?", "You can use them to understand the general framework. But negotiating from worked examples that don't match your specific facts can lead to unrealistic expectations. Modelling your own figures — using a tool like this one — is more useful."],
                ["What if our situation doesn't fit any of these?", "Most situations are unique. The principles are consistent, but the specifics vary enormously. Use these examples to understand the framework, then model your own numbers."],
                ["Where can I find real published divorce cases?", "Financial remedy cases above a certain value are published on the BAILII website (bailii.org). These can give a sense of how courts approach complex cases — but each case turns on its own facts."],
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
                <strong className="text-foreground">Disclaimer:</strong> All examples on this page are entirely illustrative and created for educational purposes only. They do not represent actual cases. They are not predictions of court outcomes and should not be relied upon as legal or financial advice. Always seek independent legal advice from a qualified family law solicitor for your specific situation.
              </p>
            </CardContent>
          </Card>

          <section className="space-y-4 pt-4 border-t" data-testid="section-related-articles">
            <h2 className="text-lg font-semibold text-foreground">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/divorce-financial-settlement-calculator-uk", label: "How assets are divided in divorce", desc: "The legal principles courts apply when splitting assets." },
                { href: "/divorce-where-one-earns-more-uk", label: "Divorce where one partner earns more", desc: "How income disparity affects settlement outcomes." },
                { href: "/divorce-with-children-financial-settlement-uk", label: "Settlement when there are children", desc: "How children's needs shape the financial division." },
                { href: "/consent-order-vs-clean-break-order-uk", label: "Consent order vs clean break order", desc: "Which type of order is right for your situation?" },
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
              <Link href="/how-are-pensions-divided-in-divorce-uk" onClick={scrollTop} className="text-primary hover:underline">How pensions are split</Link>
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
