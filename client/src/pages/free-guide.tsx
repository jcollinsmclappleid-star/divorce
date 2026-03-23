import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/site-nav";
import { scrollTop } from "@/lib/utils";
import {
  BookOpen, ChevronRight, CheckCircle2, ArrowRight,
  Home, PoundSterling, Scale, TrendingUp, FileText, Lock
} from "lucide-react";

function InlineCTA({ label = "Model your own figures" }: { label?: string }) {
  const [, setLocation] = useLocation();
  return (
    <div className="my-8 p-5 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">Apply these principles to your own situation with our financial modelling tool.</p>
      </div>
      <Button
        size="sm"
        onClick={() => { scrollTop(); setLocation("/wizard"); }}
        data-testid="button-cta-inline"
        className="shrink-0"
      >
        Start modelling <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </div>
  );
}

const CHAPTERS = [
  {
    icon: Scale,
    number: 1,
    title: "How UK Divorce Finances Are Decided",
    content: `
When a marriage ends in England or Wales, the law requires a "fair" financial settlement — but the courts have wide discretion about what that means in practice. There is no automatic formula, no fixed starting point, and no guarantee of a 50/50 split.

The starting point under the Matrimonial Causes Act 1973 is to achieve "financial need" first. Only if all needs are met does the court consider equality. The key factors a court considers include:

**The welfare of any children.** If there are dependent children, their housing and financial stability comes first. The parent with primary care will typically be prioritised for the family home where possible.

**Financial needs, obligations, and responsibilities.** Each party's current and future financial needs are central. A party who gave up a career to care for children will have needs the court takes seriously.

**The standard of living during the marriage.** Not to preserve it indefinitely, but to understand the context of reasonable expectations.

**Age, health, and earning capacity.** A younger, higher-earning party will be expected to rebuild their financial position. A party with limited earning capacity due to age, health, or career breaks may receive more.

**Contributions to the marriage.** Both financial and non-financial (including child-rearing and homemaking). Courts treat these as equal in principle.

**Conduct.** Only rarely does the court take conduct into account — and only where it would be "inequitable to disregard it." Financial misconduct (hiding assets, running up debt) is the most common exception.

**Duration of the marriage.** Short marriages (under 5 years) may result in the court "ring-fencing" pre-marital assets. Long marriages typically lead to more equal division.

The key takeaway: understanding the principles doesn't tell you the outcome. But understanding the framework helps you enter negotiations with realistic expectations — and a clearer sense of where to focus.
    `,
  },
  {
    icon: Home,
    number: 2,
    title: "The Family Home — Your Options",
    content: `
The family home is often the most emotionally charged asset in a divorce — and frequently the most financially significant. There are four main outcomes, and each has very different financial implications.

**Option 1: Sell and split the proceeds.** The most straightforward option. The net equity (sale price minus mortgage balance minus selling costs of roughly 1.5–2%) is divided between the parties. This provides a clean break but means both parties must find new housing from their share.

**Option 2: One party buys the other out.** The party retaining the home takes on the full mortgage and pays the other their equity share — either from savings, a remortgage, or a lump sum from other assets. The key constraint: can the retaining party obtain a mortgage on a single income? As a general illustration, lenders typically apply income multiples of 4–4.5× gross annual salary, though actual criteria vary significantly by lender and individual circumstance.

**Option 3: Deferred sale (Mesher or Martin order).** The sale is delayed — typically until the youngest child reaches 18, or until the resident party remarries or chooses to sell. The departing party retains a defined share of future equity. This preserves stability for children but delays a clean break and can lead to disputes over maintenance of the property.

**Option 4: Transfer to one party with no buyout.** Sometimes one party receives the home in lieu of other assets (e.g., the other party retains the pension). This requires careful modelling — the property may not be liquid when needed, and pensions have their own access rules.

The right option depends on income levels, mortgage capacity, other assets, children's needs, and each party's long-term financial situation. Modelling the numbers — rather than negotiating from position — often reveals which options are genuinely viable.
    `,
  },
  {
    icon: PoundSterling,
    number: 3,
    title: "Pensions — The Often-Overlooked Asset",
    content: `
Pensions are frequently the second-largest asset in a divorce — sometimes larger than the family home — yet they are often poorly understood and easy to undervalue.

**What gets divided?** Usually only the portion of pension value built up during the marriage is considered a marital asset. Pre-marital and post-separation pension growth may be ring-fenced, depending on circumstances.

**The three main options for pensions:**

*Pension sharing order.* A defined percentage of one party's pension is transferred to the other, creating a separate pension pot for the recipient. This achieves a clean break on the pension. It requires a court order and may incur implementation costs.

*Pension offsetting.* Instead of dividing the pension, one party receives more of another asset (commonly the home) in lieu. This avoids the complexity of pension sharing but requires careful valuation — £100,000 of pension is not worth the same as £100,000 of house equity, because pension income is taxed on drawdown and typically not accessible until later life.

*Earmarking (attachment orders).* Less commonly used. One party receives a share of the other's pension at the time they draw it. The problem: it doesn't achieve a clean break, and entitlement can cease on death or remarriage.

**How are pensions valued?** The Cash Equivalent Transfer Value (CETV) is the starting point — it's the amount the pension scheme would pay to transfer the pension elsewhere. However, Defined Benefit (DB) pensions (final salary or career average) are often worth significantly more than the CETV implies. Specialist pension actuaries can produce an "Offsetting Report" for complex cases.

The most common mistake: accepting a 50/50 split of the CETV when one pension is a DB and the other is a defined contribution (DC). They are not equivalent.
    `,
  },
  {
    icon: TrendingUp,
    number: 4,
    title: "Monthly Finances After Separation — What to Model",
    content: `
Capital allocation (who gets what) is only half the picture. The other half is monthly cash flow — whether each party can actually live on their income after the settlement.

**Net income after tax.** For employed income, income tax and employee National Insurance reduce gross pay significantly. In 2025/26, the basic rate of income tax is 20% on income between £12,571 and £50,270. The higher rate is 40% above £50,270 up to £125,140. Employee NI (Class 1) applies at 8% between the primary threshold (£12,570/year) and the upper earnings limit (£50,270/year), and 2% above.

**Living costs — individual and shared.** Costs need to be re-modelled post-separation. Many expenses that were shared (rent/mortgage, utilities, streaming, insurance) will now be duplicated across two households. This is the "two-household problem" and is one of the most common causes of post-divorce financial stress.

**Housing costs.** If either party is renting, this is likely the largest single cost. If one party retains the home with a mortgage, the mortgage payment must be sustainable from their income. As a generalised illustration, a common affordability benchmark is that the mortgage payment should not exceed approximately 35–40% of net monthly income — though this varies by lender.

**Child maintenance.** If there are dependent children, the non-resident parent will typically pay child maintenance under the Child Maintenance Service (CMS) basic-rate formula. This is based on gross weekly income of the paying parent, with rates set at:
- 12% for 1 child
- 16% for 2 children  
- 19% for 3 or more children
(Reduced by shared care nights above a threshold.)

**Spousal maintenance.** In some cases, one party pays the other ongoing maintenance — particularly where there is a significant income disparity and one party has reduced earning capacity. The amount and duration are highly fact-specific and determined by courts.

Modelling each of these elements realistically — rather than optimistically — is the difference between a settlement that works and one that creates ongoing financial difficulty.
    `,
  },
  {
    icon: FileText,
    number: 5,
    title: "Getting to a Settlement — Process and Costs",
    content: `
Understanding the process helps you make informed choices about how to reach a settlement — and how to manage costs.

**Negotiation between solicitors.** The traditional route. Each party instructs a solicitor who negotiates on their behalf. Advantages: legally robust, covers disclosure obligations, appropriate for high-conflict or complex cases. Disadvantages: typically the most expensive route, can take 12–24 months, and can become adversarial.

**Mediation.** A trained mediator (who is not a judge or decision-maker) helps both parties reach agreement. Mediation is voluntary, confidential, and significantly cheaper than contested proceedings. It is not appropriate in all cases (for example, where there is a significant power imbalance or concerns about disclosure). If you reach agreement in mediation, a solicitor should still draft a consent order to make it legally binding.

**Collaborative law.** Both parties and their solicitors commit to resolving the matter without going to court. All meetings happen with both parties and solicitors present. If the process breaks down, both solicitors must withdraw — which creates an incentive to resolve.

**Court proceedings.** If agreement cannot be reached through any other route, the court decides. This is the most expensive, slowest, and least predictable option. Court proceedings for financial matters typically take 12–18 months from start to final hearing.

**What does it cost?** Legal costs vary enormously. An agreed, straightforward case handled predominantly by the parties themselves with solicitor oversight might cost £1,500–£5,000. A contested case going to a final hearing can cost £15,000–£50,000+ per party.

**The consent order.** Whatever route you take, a consent order sealed by the court is essential to make the financial agreement legally binding and to achieve a clean break. Without it, either party can make future financial claims.

The key principle: the more that can be agreed between you, the lower the cost and the greater your control over the outcome. Understanding the numbers before you negotiate gives you the clearest possible foundation.
    `,
  },
];

function ChapterSection({ chapter, expanded, onToggle }: {
  chapter: typeof CHAPTERS[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  const Icon = chapter.icon;
  const paragraphs = chapter.content.trim().split("\n\n");

  return (
    <div className="border rounded-lg overflow-hidden" data-testid={`chapter-${chapter.number}`}>
      <button
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
        onClick={onToggle}
        data-testid={`button-chapter-${chapter.number}`}
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Chapter {chapter.number}</span>
          </div>
          <p className="font-semibold text-foreground">{chapter.title}</p>
        </div>
        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${expanded ? "rotate-90" : ""}`} />
      </button>
      {expanded && (
        <div className="px-5 pb-6 border-t bg-muted/10">
          <div className="pt-5 prose prose-sm max-w-none space-y-3">
            {paragraphs.map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return <h3 key={i} className="font-semibold text-foreground mt-4 mb-1 text-base">{para.slice(2, -2)}</h3>;
              }
              const boldReplaced = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              const italicReplaced = boldReplaced.replace(/\*(.*?)\*/g, '<em>$1</em>');
              return <p key={i} className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: italicReplaced }} />;
            })}
          </div>
          {(chapter.number === 2 || chapter.number === 4) && (
            <InlineCTA label={chapter.number === 2 ? "Model your housing scenarios" : "Model your monthly cash flow"} />
          )}
        </div>
      )}
    </div>
  );
}

export default function FreeGuidePage() {
  useDocumentTitle("Free UK Divorce Finances Guide | DivorceCalculatorUK");
  useMetaTags({
    description: "A free guide to UK divorce finances covering assets, pensions, property, income, and financial settlements. Five chapters to help you prepare for separation.",
    canonical: "https://divorcecalculatoruk.co.uk/free-guide",
  });
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: firstName || undefined, source: "free_guide" }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
    setShowContent(true);
    scrollTop();
  };

  const toggleChapter = (n: number) => {
    setExpandedChapter(prev => prev === n ? null : n);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="text-primary border-primary/30">Free Resource</Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight leading-tight" data-testid="text-guide-title">
              Your Free UK Divorce Finances Guide
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              Five practical chapters covering everything you need to understand about your financial position before you negotiate, mediate, or go to court.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "How UK divorce finances are actually decided",
              "Your options for the family home — modelled",
              "Pensions — the most undervalued asset",
              "Monthly finances: the two-household problem",
              "Settlement process, costs, and what to expect",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          {!showContent ? (
            <Card className="border-primary/20" data-testid="card-guide-form">
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-1">
                  <h2 className="font-semibold text-foreground">Send me the guide</h2>
                  <p className="text-sm text-muted-foreground">Enter your email and we'll send you all five chapters. Or skip straight to reading below.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">First name (optional)</Label>
                      <Input
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="e.g. Sarah"
                        data-testid="input-guide-firstname"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">Email address</Label>
                      <Input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        data-testid="input-guide-email"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" disabled={loading} className="flex-1" data-testid="button-guide-submit">
                      {loading ? "Saving..." : "Send me the guide"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowContent(true)}
                      data-testid="button-guide-skip"
                    >
                      Read it here instead
                    </Button>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="w-3 h-3" />
                    No spam. We use your email only to send the guide and occasional updates. Unsubscribe anytime.
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : submitted ? (
            <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 text-center space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
              <p className="font-medium text-sm text-emerald-900 dark:text-emerald-200">Guide on its way — check your inbox.</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">Your full analysis is ready whenever you are.</p>
            </div>
          ) : null}

          {showContent && (
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-foreground">The Guide — Five Chapters</h2>
              </div>
              <div className="space-y-3">
                {CHAPTERS.map(ch => (
                  <ChapterSection
                    key={ch.number}
                    chapter={ch}
                    expanded={expandedChapter === ch.number}
                    onToggle={() => toggleChapter(ch.number)}
                  />
                ))}
              </div>
              <InlineCTA label="Ready to model your own situation?" />
            </div>
          )}

          <Separator />

          <div className="text-center space-y-4">
            <h2 className="font-semibold text-foreground">Ready to see your actual numbers?</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              The guide gives you the framework. The tool shows you what it means for your specific assets, income, and circumstances.
            </p>
            <Button
              onClick={() => { scrollTop(); setLocation("/wizard"); }}
              size="lg"
              data-testid="button-guide-cta-bottom"
            >
              Start financial modelling <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-xs text-muted-foreground">From £79 · One-time · 12-month access</p>
          </div>

          <div className="p-4 rounded-md bg-muted/30 border text-xs text-muted-foreground leading-relaxed">
            <p className="font-medium text-foreground mb-1">Disclaimer</p>
            <p>This guide is provided for general information purposes only. It does not constitute legal, tax, or financial advice. Divorce law and financial outcomes depend on individual circumstances. Always seek independent legal advice from a qualified family law solicitor. DivorceCalculatorUK is not a legal services provider and is not regulated by the Solicitors Regulation Authority or the Financial Conduct Authority.</p>
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
