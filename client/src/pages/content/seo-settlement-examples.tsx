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
    <div className="my-8 p-5 rounded-xl bg-primary border border-primary/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
      <div>
        <p className="font-semibold text-white text-sm">{label}</p>
        <p className="text-xs text-white/60 mt-0.5">These examples are illustrative. Your figures will produce your own personalised analysis.</p>
      </div>
      <Button size="sm" onClick={() => { scrollTop(); setLocation("/wizard"); }} data-testid="button-cta-inline" className="shrink-0 bg-gold hover:bg-gold/90 text-white border-0 shadow-md shadow-gold/25 btn-shimmer">
        Start modelling free <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </div>
  );
}

function ExampleCard({ title, scenario, assets, outcome, note, accentBorder, accentBg, accentText, badge }: {
  title: string;
  scenario: string;
  assets: string[];
  outcome: string[];
  note: string;
  accentBorder?: string;
  accentBg?: string;
  accentText?: string;
  badge?: string;
}) {
  return (
    <div className={`rounded-xl border-2 border-t-4 ${accentBorder ?? "border-t-primary/40"} border-border/60 bg-white overflow-hidden shadow-sm`}>
      <div className="p-5 space-y-4">
        <div>
          {badge && (
            <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 ${accentBg} ${accentText}`}>{badge}</span>
          )}
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{scenario}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1.5">
            <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wide">Assets &amp; context</p>
            {assets.map((a, i) => (
              <div key={i} className="flex items-start gap-1.5 text-muted-foreground text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-1.5 shrink-0" />
                {a}
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wide">Illustrative outcome</p>
            {outcome.map((o, i) => (
              <div key={i} className="flex items-start gap-1.5 text-foreground text-xs">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${accentBg ?? "bg-primary/40"}`} />
                {o}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-start gap-2 pt-2 border-t border-border/40">
          <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground italic leading-relaxed">{note}</p>
        </div>
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

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden bg-primary py-12 md:py-16">
          <div className="pointer-events-none absolute inset-0">
          </div>
          <div className="relative container mx-auto px-4 max-w-3xl">
            <Link href="/divorce-financial-guides" onClick={scrollTop} className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white mb-4 transition-colors" data-testid="link-all-guides">
              ← All guides
            </Link>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold px-2.5 py-1 rounded-full">England &amp; Wales</span>
              <span className="inline-flex items-center bg-white/10 text-white/70 text-xs font-semibold px-2.5 py-1 rounded-full">Illustrative only</span>
              <span className="inline-flex items-center bg-white/10 text-white/70 text-xs font-semibold px-2.5 py-1 rounded-full">4 case studies</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight" data-testid="text-page-title">
              UK Divorce Settlement Examples
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mt-3 max-w-2xl">
              Illustrative examples showing how different asset positions and circumstances lead to different settlement structures. Worked examples — not predictions or legal advice.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 max-w-3xl space-y-8">
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                All examples below are entirely illustrative and presented for educational purposes only. They do not represent actual cases, and the outcomes shown are not predictions of what a court would order. Every case is decided on its specific facts.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center bg-cyan-100 text-cyan-700 text-xs font-semibold px-2.5 py-1 rounded-full">Example 1</span>
              <h2 className="text-xl font-semibold text-foreground">Young couple, limited assets</h2>
            </div>
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
              accentBorder="border-t-cyan-400"
              accentBg="bg-cyan-100"
              accentText="text-cyan-700"
              badge="Short marriage · 4 years · No children"
            />
          </section>

          <InlineCTA label="Apply this framework to your own figures" />

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">Example 2</span>
              <h2 className="text-xl font-semibold text-foreground">Mid-life couple, family home and pensions</h2>
            </div>
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
              accentBorder="border-t-amber-400"
              accentBg="bg-amber-100"
              accentText="text-amber-700"
              badge="Family home · 15 years · 2 children"
            />
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center bg-violet-100 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full">Example 3</span>
              <h2 className="text-xl font-semibold text-foreground">High-value assets, complex pensions</h2>
            </div>
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
              accentBorder="border-t-violet-400"
              accentBg="bg-violet-100"
              accentText="text-violet-700"
              badge="High-value · 22 years · DB pension"
            />
          </section>

          <InlineCTA label="Model your own asset pool across four settlement scenarios" />

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">Example 4</span>
              <h2 className="text-xl font-semibold text-foreground">Deferred sale (Mesher order)</h2>
            </div>
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
              accentBorder="border-t-emerald-400"
              accentBg="bg-emerald-100"
              accentText="text-emerald-700"
              badge="Deferred sale · 10 years · 3 children"
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Key patterns across these examples</h2>
            <div className="space-y-3">
              {[
                { pattern: "Children come first", desc: "Where dependent children are involved, their housing stability is prioritised. The primary carer's housing needs typically drive the structure of the settlement.", bg: "bg-cyan-100", text: "text-cyan-700" },
                { pattern: "Earning capacity matters", desc: "A significant income disparity — particularly where it was caused by career breaks for childcare — affects the division of capital and may lead to maintenance.", bg: "bg-amber-100", text: "text-amber-700" },
                { pattern: "Pensions are often the decisive asset", desc: "For couples over 45, pensions frequently exceed the home equity in value. Getting the valuation right — especially for DB pensions — is critical.", bg: "bg-violet-100", text: "text-violet-700" },
                { pattern: "A clean break is preferred", desc: "Courts prefer a clean break where financially viable. Long-term maintenance awards have become less common, particularly for younger parties.", bg: "bg-emerald-100", text: "text-emerald-700" },
                { pattern: "Complexity = cost", desc: "Business assets, DB pensions, investment properties, and offshore assets all add complexity and cost to the process.", bg: "bg-rose-100", text: "text-rose-700" },
              ].map(({ pattern, desc, bg, text }, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-white">
                  <div className={`w-7 h-7 rounded-full ${bg} flex items-center justify-center shrink-0 text-xs font-bold ${text}`}>{i + 1}</div>
                  <div>
                    <p className="font-semibold text-sm">{pattern}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
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
