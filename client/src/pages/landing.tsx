import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "wouter";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator, Shield, ArrowRight, ChevronRight, ChevronLeft,
  BarChart3, Lock,
  FileText, TrendingUp, Activity,
  Check, X, Scale
} from "lucide-react";
import { EXAMPLE_SCENARIOS } from "@/lib/exampleScenarios";
import { useAppStore } from "@/hooks/use-store";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useMetaTags } from "@/hooks/use-meta-tags";
import { Logo } from "@/components/logo";

const WHAT_YOU_GET = [
  "See your net property equity across four settlement structures",
  "Understand how assets, pensions and debts are allocated under each option",
  "Know your take-home income after tax and National Insurance (UK 2025/26 rates)",
  "See indicative borrowing capacity benchmarks — to assess whether you can keep the home",
  "Understand capital concentration risk and liquidity position",
  "See where your money stands in five years under every settlement option",
  "Stress-test your position against rising interest rates and income changes",
  "Download a Structured Financial Brief to use with your solicitor or mediator",
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Enter Your Financial Picture",
    body: "Privately, in your own time. No sign-up, no pressure, no data leaving your device.",
    icon: Calculator,
  },
  {
    step: 2,
    title: "See Four Settlement Options",
    body: "Sell and split, you keep the home, they keep the home, deferred sale — side by side.",
    icon: BarChart3,
  },
  {
    step: 3,
    title: "Understand What Each Option Means",
    body: "Not just totals — monthly income, sustainability scores, and five-year projections for each.",
    icon: Activity,
  },
  {
    step: 4,
    title: "Take Your Numbers Into the Room",
    body: "Download a clear financial brief to inform any professional conversation.",
    icon: FileText,
  },
];

const FAQ_ITEMS_LANDING = [
  {
    q: "Is divorce always split 50/50 in England and Wales?",
    a: "No. The law requires a fair outcome, not an equal one. Courts consider a wide range of factors under the Matrimonial Causes Act 1973 — including housing needs, income and earning capacity, the welfare of children, the length of the marriage, and each party's contributions. In many cases where one party has significantly lower income or primary caring responsibilities, a 50/50 split of assets would not produce a fair result. The starting point for long marriages is often equality, but the outcome regularly departs from it.",
  },
  {
    q: "How is the family home treated in a divorce settlement?",
    a: "The family home is typically the largest asset and the one most people are most worried about. Courts prioritise the welfare of any children when deciding what happens to it. Options include selling and splitting the proceeds, one party buying the other out, or a deferred sale — where one party stays in the property until the children are older, then the home is sold and the proceeds divided. This platform lets you see all of these options side by side with the full financial picture for each.",
  },
  {
    q: "Are pensions included in a divorce settlement?",
    a: "Yes, in most cases. Pensions are considered a marital asset in England and Wales and can be shared, offset against other assets, or attached to future payments. Pensions are often the second-largest asset after the family home — and sometimes the largest. They are frequently underestimated or overlooked entirely. This platform includes pension values in the total asset pool and shows how they are allocated under each settlement option.",
  },
  {
    q: "What debts are taken into account in a divorce?",
    a: "Joint debts — including joint mortgages, credit cards, loans, and other shared obligations — are generally treated as shared liabilities. Sole debts may or may not be considered depending on how they were incurred. Courts look at the full financial picture, including debts, when deciding what a fair settlement looks like. You can enter all debts in this platform and see exactly how they affect each party's net position under every settlement option.",
  },
  {
    q: "What is a clean break order?",
    a: "A clean break order is a court order that legally ends any future financial claims between two parties. Once made, neither party can make claims against the other — even years after the divorce. Clean break orders provide certainty and finality. Not all settlements result in a clean break — for example, if one party receives ongoing maintenance payments, a full clean break may not be possible. A consent order is the document that records the agreed financial terms and is approved by the court.",
  },
  {
    q: "Can I keep the house after divorce?",
    a: "It depends on affordability, the needs of any children, and whether the other party can be fairly bought out. Keeping the house requires a remortgage in your name alone — which depends on your income and the lender's criteria. If you cannot afford the mortgage independently, or cannot raise enough equity to make the buyout fair, keeping the house may not be viable. This platform shows you a dedicated 'you retain the home' settlement option — with a sustainability score and five-year projection — so you can see clearly whether it works for you.",
  },
  {
    q: "How long does a financial settlement take?",
    a: "Financial settlements in England and Wales typically take between nine months and two years to resolve, depending on whether the parties reach agreement or require court proceedings. Mediated or negotiated settlements are faster and significantly cheaper. Court proceedings — known as financial remedy hearings — can take twelve to twenty-four months. A consent order, once agreed, must be approved by the court to become legally binding. Starting with a clear financial picture often shortens the process considerably.",
  },
  {
    q: "Does this predict what I will receive in court?",
    a: "No. This platform does not predict court outcomes, judicial discretion, legal entitlement, or settlement fairness. It shows the financial structure of each settlement option only. A court considers a wide range of factors — including needs, contributions, and the welfare of children — that are beyond the scope of any financial model.",
  },
  {
    q: "Is this financial or legal advice?",
    a: "No. This platform provides illustrative financial analysis only. It is not authorised or regulated by the FCA, SRA, or any other professional body. Independent professional advice may be warranted before making any decisions.",
  },
  {
    q: "How accurate are the tax calculations?",
    a: "The tax engine applies UK income tax and employee Class 1 National Insurance calculations based on published HMRC 2025/26 rates. It excludes dividend rates, Scottish rates, self-employed NI, Capital Gains Tax, pension relief, and other reliefs. Full details are available on the Methodology page.",
  },
  {
    q: "What do the lending capacity benchmarks mean?",
    a: "These are generalised income multiple illustrations (typically 4–4.5x gross income) and do not constitute a lending assessment, mortgage advice, or credit approval indication. Actual lending decisions depend on individual creditworthiness, lender criteria, and other factors.",
  },
  {
    q: "Is my data safe?",
    a: "All financial calculations are performed locally in your web browser. The financial data you enter is never transmitted to our servers. Payment processing is handled securely by Stripe.",
  },
  {
    q: "What does the Financial Sustainability Indicator mean?",
    a: "The Financial Sustainability Indicator is a score from 0 to 100 that reflects how viable each settlement option looks over a five-year horizon — based on income, outgoings, housing costs, and capital position. It does not constitute financial advice, risk profiling, or a suitability assessment. Green means sustainable under current assumptions. Amber warrants attention. Red indicates financial stress.",
  },
];

function useLandingFaqJsonLd(faqItems: { q: string; a: string }[]) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a,
        },
      })),
    };
    script.textContent = JSON.stringify(faqData);
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [faqItems]);
}

const ANALYSIS_PREVIEW_FEATURES = [
  {
    icon: BarChart3,
    title: "Four settlement options. One clear comparison.",
    body: "See Sell and Split, you keep the home, they keep the home, and deferred sale — side by side. Know which works for you before any negotiation starts.",
  },
  {
    icon: Activity,
    title: "Can you actually afford to keep the house?",
    body: "The Financial Sustainability Indicator gives each settlement option a score from 0 to 100 — with a plain-English explanation of exactly what's driving it. Not a number. An answer.",
  },
  {
    icon: TrendingUp,
    title: "See where your money is in five years.",
    body: "Does your settlement leave you financially stable or quietly stretched? The five-year projection shows you — under each option — before you commit to anything.",
  },
];

const FEATURE_SLIDES = [
  { id: 0, label: "Sustainability Score", badge: "Key insight" },
  { id: 1, label: "Settlement Comparison", badge: "4 options" },
  { id: 2, label: "5-Year Projection", badge: "Long-term" },
  { id: 3, label: "Monthly Cashflow", badge: "Month by month" },
  { id: 4, label: "Stress Testing", badge: "What-if" },
  { id: 5, label: "Financial Brief", badge: "Downloadable" },
];

function FeatureShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(index, FEATURE_SLIDES.length - 1));
  };

  return (
    <div className="relative" data-testid="div-dashboard-mockup">
      <div className="rounded-xl border border-white/15 bg-background shadow-2xl overflow-hidden ring-1 ring-white/10">
        <div className="bg-primary/8 border-b border-border/40 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="text-[10px] text-muted-foreground ml-2 font-mono">
              {FEATURE_SLIDES[activeSlide]?.label} — Full Analysis
            </span>
          </div>
          <div className="flex items-center gap-1 text-white/30">
            <ChevronLeft className="w-3 h-3" />
            <span className="text-[9px]">swipe</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="min-w-full snap-start p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Financial Sustainability Indicator</p>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-gold border-gold/40 bg-gold/5">Full analysis</Badge>
            </div>
            {[
              { label: "Sell & Split", score: 82, colour: "bg-green-500", text: "82", verdict: "Sustainable", textCol: "text-green-600" },
              { label: "You keep home", score: 67, colour: "bg-amber-500", text: "67", verdict: "Monitor closely", textCol: "text-amber-600" },
              { label: "They keep home", score: 38, colour: "bg-red-500", text: "38", verdict: "Financial stress risk", textCol: "text-red-600" },
              { label: "Deferred sale", score: 74, colour: "bg-green-400", text: "74", verdict: "Sustainable", textCol: "text-green-600" },
            ].map(row => (
              <div key={row.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-medium">{row.label}</span>
                  <span className={`text-[10px] font-bold ${row.textCol}`}>{row.text} · {row.verdict}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`${row.colour} h-2 rounded-full`} style={{ width: `${row.score}%` }} />
                </div>
              </div>
            ))}
            <p className="text-[9px] text-muted-foreground/50 text-center pt-1">Scored 0–100 · Illustrative example</p>
          </div>

          <div className="min-w-full snap-start p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Settlement Comparison</p>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-gold border-gold/40 bg-gold/5">4 options</Badge>
            </div>
            {[
              { label: "Sell & Split", you: 52, them: 48, youK: "£187k", themK: "£172k" },
              { label: "You keep home", you: 30, them: 70, youK: "£108k", themK: "£251k" },
              { label: "They keep home", you: 65, them: 35, youK: "£233k", themK: "£126k" },
              { label: "Deferred sale", you: 50, them: 50, youK: "£179k", themK: "£179k" },
            ].map(row => (
              <div key={row.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-medium">{row.label}</span>
                  <div className="flex gap-2 text-[10px]">
                    <span className="text-primary font-semibold">{row.youK}</span>
                    <span className="text-muted-foreground/50">/</span>
                    <span className="text-teal-600 font-semibold">{row.themK}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 h-3 rounded overflow-hidden">
                  <div className="bg-primary rounded-l-sm" style={{ width: `${row.you}%` }} />
                  <div className="bg-teal-500 rounded-r-sm" style={{ width: `${row.them}%` }} />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1"><div className="h-2 w-3 bg-primary rounded-sm" /><span className="text-[9px] text-muted-foreground">You</span></div>
              <div className="flex items-center gap-1"><div className="h-2 w-3 bg-teal-500 rounded-sm" /><span className="text-[9px] text-muted-foreground">Other party</span></div>
            </div>
          </div>

          <div className="min-w-full snap-start p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">5-Year Capital Projection</p>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-gold border-gold/40 bg-gold/5">Long-term</Badge>
            </div>
            <svg viewBox="0 0 220 70" className="w-full h-20" fill="none">
              <text x="0" y="10" className="text-[6px]" fill="hsl(var(--muted-foreground))" fontSize="6">Year 1</text>
              <text x="50" y="10" className="text-[6px]" fill="hsl(var(--muted-foreground))" fontSize="6">Year 2</text>
              <text x="100" y="10" className="text-[6px]" fill="hsl(var(--muted-foreground))" fontSize="6">Year 3</text>
              <text x="150" y="10" className="text-[6px]" fill="hsl(var(--muted-foreground))" fontSize="6">Year 4</text>
              <text x="195" y="10" className="text-[6px]" fill="hsl(var(--muted-foreground))" fontSize="6">Year 5</text>
              <polyline points="0,65 55,55 110,42 165,32 220,20" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="0,68 55,65 110,62 165,66 220,64" stroke="#14b8a6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" />
              <polyline points="0,62 55,58 110,52 165,48 220,42" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 3" opacity="0.6" />
            </svg>
            <div className="flex items-center gap-4 text-[9px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-primary rounded" /> Sell &amp; Split</span>
              <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-teal-500 rounded" style={{backgroundImage:"repeating-linear-gradient(to right,#14b8a6 0,#14b8a6 4px,transparent 4px,transparent 8px)"}} /> You retain</span>
              <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-gold rounded opacity-60" /> Deferred</span>
            </div>
            <p className="text-[9px] text-muted-foreground/50 text-center">Under each settlement option · Illustrative</p>
          </div>

          <div className="min-w-full snap-start p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Monthly Cashflow After Divorce</p>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-gold border-gold/40 bg-gold/5">Per party</Badge>
            </div>
            {[
              { option: "Sell & Split", youNet: "+£680/mo", themNet: "+£420/mo", youGreen: true, themGreen: true },
              { option: "You keep home", youNet: "−£240/mo", themNet: "+£850/mo", youGreen: false, themGreen: true },
              { option: "They keep home", youNet: "+£920/mo", themNet: "−£110/mo", youGreen: true, themGreen: false },
              { option: "Deferred sale", youNet: "+£310/mo", themNet: "+£290/mo", youGreen: true, themGreen: true },
            ].map(row => (
              <div key={row.option} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
                <span className="text-[10px] text-muted-foreground font-medium truncate pr-2">{row.option}</span>
                <div className="flex gap-3 shrink-0">
                  <span className={`text-[10px] font-bold ${row.youGreen ? "text-green-600" : "text-red-500"}`}>{row.youNet}</span>
                  <span className={`text-[10px] font-bold ${row.themGreen ? "text-teal-600" : "text-red-500"}`}>{row.themNet}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1"><div className="h-2 w-3 bg-primary rounded-sm" /><span className="text-[9px] text-muted-foreground">Your surplus</span></div>
              <div className="flex items-center gap-1"><div className="h-2 w-3 bg-teal-500 rounded-sm" /><span className="text-[9px] text-muted-foreground">Their surplus</span></div>
            </div>
          </div>

          <div className="min-w-full snap-start p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Stress Test — What If?</p>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-gold border-gold/40 bg-gold/5">Sensitivity</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground">Adjusting: Interest rates +2%</p>
            {[
              { label: "Sell & Split", before: 82, after: 74, beforeCol: "bg-green-500", afterCol: "bg-green-400" },
              { label: "You keep home", before: 67, after: 41, beforeCol: "bg-amber-500", afterCol: "bg-red-500" },
              { label: "They keep home", before: 38, after: 22, beforeCol: "bg-red-500", afterCol: "bg-red-600" },
              { label: "Deferred sale", before: 74, after: 68, beforeCol: "bg-green-400", afterCol: "bg-amber-500" },
            ].map(row => (
              <div key={row.label} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-medium">{row.label}</span>
                  <span className="text-[10px] text-muted-foreground">{row.before} → <span className="font-bold text-foreground">{row.after}</span></span>
                </div>
                <div className="relative w-full bg-muted rounded-full h-2">
                  <div className={`${row.beforeCol} h-2 rounded-full opacity-30`} style={{ width: `${row.before}%` }} />
                  <div className={`${row.afterCol} h-2 rounded-full absolute top-0 left-0`} style={{ width: `${row.after}%` }} />
                </div>
              </div>
            ))}
            <p className="text-[9px] text-muted-foreground/50 text-center">Grey = original · Colour = stress-tested · Illustrative</p>
          </div>

          <div className="min-w-full snap-start p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Downloadable Financial Brief</p>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-gold border-gold/40 bg-gold/5">PDF</Badge>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-border/30">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-semibold text-foreground">Structured Financial Brief</span>
              </div>
              {[
                "Total asset pool & allocation",
                "Net position per party · all 4 options",
                "Financial Sustainability Indicator scores",
                "Monthly surplus / deficit breakdown",
                "5-year capital projections",
                "Stress test sensitivity summary",
                "UK tax & NI applied throughout",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-500 shrink-0" />
                  <span className="text-[10px] text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-muted-foreground/50 text-center">Generated from your figures · Take to any professional conversation</p>
          </div>
        </div>

        <div className="border-t border-border/30 bg-muted/20 px-4 py-2.5 flex items-center justify-between">
          <div className="flex gap-1.5">
            {FEATURE_SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => scrollTo(i)}
                data-testid={`dot-feature-${i}`}
                className={`rounded-full transition-all duration-200 ${
                  activeSlide === i
                    ? "w-4 h-1.5 bg-gold"
                    : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
                aria-label={`View ${slide.label}`}
              />
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground/50">Illustrative figures only</p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  useDocumentTitle("Divorce Calculator UK (2026) | Financial Settlement Tool");
  useMetaTags({
    description: "See what every divorce settlement option means for your financial future. Compare Sell & Split, retain, and deferred sale — with sustainability scores and 5-year projections. England and Wales. Free to start.",
    canonical: "https://divorcecalculatoruk.co.uk/",
    ogTitle: "Divorce Calculator UK (2026) | Financial Settlement Tool",
    ogDescription: "Model different divorce financial settlement scenarios with UK 2025/26 tax rules applied. Compare sell vs retain options and understand long-term outcomes.",
  });
  useLandingFaqJsonLd(FAQ_ITEMS_LANDING);
  const [, setLocation] = useLocation();
  const loadState = useAppStore((s) => s.loadState);
  const reset = useAppStore((s) => s.reset);

  const startFresh = () => {
    scrollTop();
    reset();
    setLocation("/wizard");
  };

  const loadExample = (index: number) => {
    const example = EXAMPLE_SCENARIOS[index];
    loadState(example.data);
    setLocation("/preview");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20" data-testid="text-disclaimer">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <nav className="sticky top-0 z-[100] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-4">
            <Logo href="/" size="sm" showBrandName />
            <Link href="/methodology" onClick={scrollTop} className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline" data-testid="link-nav-methodology">Methodology</Link>
            <Link href="/divorce-financial-modelling" onClick={scrollTop} className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline" data-testid="link-nav-guides">Guides</Link>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                scrollTop();
                setLocation("/unlock");
              }}
              data-testid="button-nav-buy-now"
              className="bg-gold hover:bg-gold/90 text-white border-0"
            >
              Buy Now
            </Button>
            <Button
              onClick={startFresh}
              data-testid="button-nav-start"
              className="bg-gold hover:bg-gold/90 text-white border-0"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-primary" data-testid="section-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(220_60%_35%),_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-6 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <Badge variant="outline" className="text-xs px-3 py-1 border-gold/50 text-gold bg-gold/10">
                  UK 2025/26 Tax &amp; NI Rates
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-white" data-testid="text-hero-headline">
                Stop negotiating your divorce blind.
              </h1>
              <p className="text-lg text-white/70 leading-relaxed">
                In 20 minutes, see exactly what each settlement option means for your financial future — which ones are sustainable, which leave you stretched, and what your money looks like in five years under each. Free to start. No sign-up.
              </p>
              <p className="text-sm text-white/50 leading-relaxed border-l-2 border-gold/40 pl-3">
                If you're here, you're probably trying to make sense of a situation that feels financially overwhelming. You're not sure what you're entitled to, you're worried about the house, and you don't know whether you can afford to keep it. That's exactly what this is for.
              </p>
              <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start gap-3 pt-1">
                <div className="flex flex-col gap-2 items-center lg:items-start w-full sm:w-auto">
                  <Button
                    size="lg"
                    onClick={startFresh}
                    data-testid="button-hero-start"
                    className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 w-full sm:w-auto"
                  >
                    Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => {
                      scrollTop();
                      setLocation("/unlock");
                    }}
                    data-testid="button-hero-buy-now"
                    className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 w-full sm:w-auto"
                  >
                    Unlock My Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                  <p className="text-xs text-white/45">No sign-up. No data stored. Used by people who want to walk into their solicitor's office knowing their numbers.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-center lg:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadExample(0)}
                    data-testid="button-hero-example"
                    className="border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
                  >
                    View Example <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/45">
                <span>Private. All calculations run in your browser.</span>
                <span>·</span>
                <Link href="/free-guide" onClick={scrollTop} className="underline underline-offset-2 text-white/55 hover:text-white transition-colors" data-testid="link-hero-free-guide">
                  Free guide →
                </Link>
              </div>
            </div>

            <FeatureShowcase />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background" data-testid="section-features">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-differentiators-headline">
                Why this isn't just another calculator
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Most divorce calculators show you a split. This one shows you what that split means for your life.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: BarChart3,
                  heading: "Four settlement structures. One clear comparison.",
                  body: "See Sell and Split, you keep the home, they keep the home, and deferred sale — side by side. Know which works for you before the negotiation starts.",
                  testid: "card-diff-0",
                },
                {
                  icon: Activity,
                  heading: "Can you actually afford to keep the house?",
                  body: "The Financial Sustainability Indicator gives each settlement option a score from 0 to 100 — with a plain-English explanation of exactly what's driving it. Not a number. An answer.",
                  testid: "card-diff-1",
                },
                {
                  icon: TrendingUp,
                  heading: "See where your money goes over the next five years.",
                  body: "Does your settlement leave you financially stable or quietly stretched? The five-year projection shows you — under each option — before you commit to anything.",
                  testid: "card-diff-2",
                },
                {
                  icon: Calculator,
                  heading: "Built on real UK numbers.",
                  body: "Every calculation applies 2025/26 HMRC income tax and National Insurance rates. Not estimates. Not approximations. The actual figures that will affect your take-home income after divorce.",
                  testid: "card-diff-3",
                },
                {
                  icon: FileText,
                  heading: "Your financial brief. Ready to take anywhere.",
                  body: "Download a structured PDF summary of your full analysis — clear enough to discuss with a solicitor, detailed enough to inform your own decisions.",
                  testid: "card-diff-4",
                },
                {
                  icon: Lock,
                  heading: "Your data never leaves your device.",
                  body: "Everything you enter is processed entirely in your browser. Nothing is transmitted to any server. Your financial situation stays completely private.",
                  testid: "card-diff-5",
                },
              ].map((item) => (
                <Card key={item.testid} data-testid={item.testid} className="shadow-sm hover:shadow-md transition-shadow border-border/60">
                  <CardContent className="pt-5 pb-5 space-y-3">
                    <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold leading-snug">{item.heading}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="border-t border-border/40 pt-10 grid gap-12 lg:gap-16 lg:grid-cols-2">
              <div className="space-y-5">
                <h2 className="text-xl font-display font-bold" data-testid="text-quantifies-headline">
                  What you'll understand after 20 minutes
                </h2>
                <ul className="space-y-2.5">
                  {WHAT_YOU_GET.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5" data-testid={`text-feature-${i}`}>
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5">
                <h2 className="text-xl font-display font-bold" data-testid="text-how-headline">
                  How it works
                </h2>
                <div className="space-y-5">
                  {HOW_IT_WORKS.map((item) => (
                    <div key={item.step} className="flex items-start gap-4" data-testid={`step-how-${item.step}`}>
                      <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-analysis-preview">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-analysis-preview-headline">
              What your full analysis shows you
            </h2>
            <p className="text-sm text-muted-foreground mt-3">
              Three outputs that answer the questions most people can't answer before they start negotiating.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
            {ANALYSIS_PREVIEW_FEATURES.map((feature, i) => (
              <Card key={i} data-testid={`card-analysis-feature-${i}`} className="shadow-sm hover:shadow-md transition-shadow border-border/60">
                <CardContent className="pt-5 pb-5 space-y-3">
                  <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.body}</p>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-gold border-gold/40 bg-gold/5">
                    Included in full analysis
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary/6 border-y border-primary/15" data-testid="section-fsi-callout">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <Badge className="text-xs px-3 py-1 bg-primary/10 text-primary border-primary/20" variant="outline">
                Unique to this platform
              </Badge>
              <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-fsi-headline">
                The question most people can't answer until it's too late: can I actually afford to keep the house?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Most divorce platforms show you a split. The Financial Sustainability Indicator (FSI) shows you what that split <em>means</em> — giving each settlement option a score from 0 to 100, with a plain-English explanation of exactly what's driving it.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Green means sustainable. Amber warrants attention. Red indicates financial stress under current assumptions. Each score comes with specific driver explanations — so you know exactly where the pressure points are.
              </p>
              <Button onClick={startFresh} data-testid="button-fsi-cta" className="bg-gold hover:bg-gold/90 text-white border-0 shadow-md shadow-gold/20">
                Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Sell & Split", score: 82, colour: "bg-green-500", text: "82 — Sustainable" },
                { label: "You Retain Home", score: 67, colour: "bg-amber-500", text: "67 — Monitor closely" },
                { label: "They Retain Home", score: 48, colour: "bg-red-500", text: "48 — Financial stress risk" },
              ].map(row => (
                <div key={row.label} className="p-3 rounded-md bg-background border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{row.label}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{row.text}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`${row.colour} h-2 rounded-full transition-all`} style={{ width: `${row.score}%` }} />
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground/60 text-center pt-1">Illustrative example — your scores will be personalised to your figures</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-examples">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-examples-headline">
              Example Output
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
              Load a sample settlement to explore the full structured analysis. No sign-up required.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {EXAMPLE_SCENARIOS.map((example, i) => (
              <Card
                key={example.id}
                className="hover-elevate active-elevate-2 cursor-pointer transition-all"
                onClick={() => loadExample(i)}
                data-testid={`card-example-${example.id}`}
              >
                <CardContent className="pt-5 pb-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{example.title}</h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground">{example.subtitle}</p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">{example.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {example.highlights.map((h, hi) => (
                      <Badge key={hi} variant="outline" className="text-[10px] px-1.5 py-0">
                        {h}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-y border-border/40" data-testid="section-comparison">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-comparison-headline">
              Free to start. Unlock the full picture.
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
              The free version shows you the shape of your settlement. The full analysis shows you whether you can live on it.
            </p>
          </div>

          <div className="rounded-xl border border-border/60 overflow-hidden shadow-sm bg-background">
            <div className="grid grid-cols-3 bg-primary/6 border-b border-border/40">
              <div className="py-4 px-5 col-span-1 flex items-center">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What you get</span>
              </div>
              <div className="py-4 px-4 text-center border-l border-border/40">
                <span className="text-sm font-semibold text-foreground">Free Preview</span>
                <p className="text-[11px] text-muted-foreground mt-0.5">No payment needed</p>
              </div>
              <div className="py-4 px-4 text-center border-l border-border/40 bg-gold/8">
                <span className="text-sm font-bold text-foreground">Full Analysis</span>
                <p className="text-[11px] text-gold font-semibold mt-0.5">£79 one-time</p>
              </div>
            </div>

            {[
              { feature: "9-step financial wizard", free: true, paid: true },
              { feature: "Enter assets, debts, income & pensions", free: true, paid: true },
              { feature: "Asset pool ring chart (total marital pot)", free: true, paid: true },
              { feature: "Preview of settlement options (blurred)", free: true, paid: false, freeNote: "Preview only" },
              { feature: "Full settlement comparison — Sell & Split, retain, deferred sale", free: false, paid: true },
              { feature: "Net position per party for each settlement option", free: false, paid: true },
              { feature: "Monthly surplus / deficit analysis", free: false, paid: true },
              { feature: "Financial Sustainability Indicator (0–100 score)", free: false, paid: true },
              { feature: "5-year capital sustainability projections", free: false, paid: true },
              { feature: "Interest rate & expense stress testing", free: false, paid: true },
              { feature: "UK 2025/26 income tax & NI applied", free: false, paid: true },
              { feature: "Downloadable Structured Financial Brief (PDF)", free: false, paid: true },
              { feature: "Access duration", free: false, paid: true, freeLabel: "—", paidLabel: "12 months unlimited" },
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-b border-border/30 last:border-b-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                data-testid={`row-comparison-${i}`}
              >
                <div className="py-3 px-5 col-span-1 flex items-center">
                  <span className="text-xs text-foreground leading-snug">{row.feature}</span>
                </div>
                <div className="py-3 px-4 flex items-center justify-center border-l border-border/30">
                  {row.freeLabel ? (
                    <span className="text-xs text-muted-foreground">{row.freeLabel}</span>
                  ) : row.freeNote ? (
                    <span className="text-[11px] text-amber-600 font-medium">{row.freeNote}</span>
                  ) : row.free ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground/40" />
                  )}
                </div>
                <div className="py-3 px-4 flex items-center justify-center border-l border-border/30 bg-gold/5">
                  {row.paidLabel ? (
                    <span className="text-xs text-gold font-semibold">{row.paidLabel}</span>
                  ) : row.paid ? (
                    <Check className="w-4 h-4 text-gold" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground/40" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button
              size="lg"
              onClick={startFresh}
              data-testid="button-comparison-free"
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { scrollTop(); setLocation("/unlock"); }}
              data-testid="button-comparison-buy"
              className="border-border"
            >
              Unlock My Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Start for free · No account needed · Pay only when you want the full picture
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-muted/40 border-y border-border/50" data-testid="section-solicitor-cost">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-solicitor-headline">
            Your solicitor's first meeting costs £250 to £400. It shapes everything that follows.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Most people arrive at that meeting with no financial picture prepared. They leave having paid for an hour of confusion. Divorce Calculator UK gives you the numbers before you walk in — so every professional conversation you have is informed, not exploratory.
          </p>
          <p className="text-sm font-medium text-foreground">
            Average UK divorce legal fees: £12,000 to £15,000 per person. This platform: free to start, £79 for the full picture.
          </p>
          <Button
            size="lg"
            onClick={startFresh}
            data-testid="button-solicitor-start"
            className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 mt-2"
          >
            Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary" data-testid="section-pricing">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            One-time payment · No subscription
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white" data-testid="text-pricing-headline">
            The full picture. <span className="text-gold">&pound;79</span>. Yours for 12 months.
          </h2>
          <p className="text-white/65 leading-relaxed">
            The free version shows you the shape of your settlement. The full analysis shows you whether you can live on it. Twelve months of unlimited re-runs — so you can revisit as your situation develops.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center max-w-md mx-auto py-6 border-y border-white/10">
            <div>
              <p className="text-2xl font-bold text-gold">20 min</p>
              <p className="text-xs text-white/55 mt-1">First analysis complete</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gold">12 months</p>
              <p className="text-xs text-white/55 mt-1">Unlimited re-runs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gold">100%</p>
              <p className="text-xs text-white/55 mt-1">Private &amp; secure</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              onClick={startFresh}
              data-testid="button-pricing-start"
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { scrollTop(); setLocation("/unlock"); }}
              data-testid="button-pricing-buy"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              Unlock My Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40 pt-2">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>All calculations in-browser</span>
            </div>
            <span>&middot;</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>No data stored on servers</span>
            </div>
            <span>&middot;</span>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Stripe-secured payments</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-amber-50 border-y border-amber-200/60" data-testid="section-urgency">
        <div className="container mx-auto px-4 max-w-2xl text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-display font-bold text-amber-900" data-testid="text-urgency-headline">
            Every week without a financial picture is a week you're negotiating on guesswork.
          </h2>
          <p className="text-amber-800/80 leading-relaxed text-sm max-w-lg mx-auto">
            Your ex may already have a clear financial picture of this settlement. Most people who get the best outcomes are the ones who arrive already knowing their position — before the first offer, before the first meeting, before anything is signed.
          </p>
          <Button
            size="lg"
            onClick={startFresh}
            data-testid="button-urgency-start"
            className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 mt-2"
          >
            Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background" data-testid="section-cta">
        <div className="container mx-auto px-4 max-w-xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold" data-testid="text-cta-headline">
            Your ex may already have a clear financial picture of this settlement. Do you?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Knowing your numbers — before the first conversation, before the first offer, before you sign anything — changes what's possible.
          </p>
          <div className="space-y-3">
            <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-sm mx-auto">
              {[
                "Full settlement comparison — all four options scored and ranked",
                "Financial Sustainability Indicator — know which option is genuinely viable",
                "5-year capital projections — see where your money is in 2030 under each option",
                "Stress testing — what happens if interest rates rise or your income changes",
                "Downloadable PDF Structured Financial Brief — your complete financial picture",
                "12 months unlimited access — revisit as your situation develops",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              size="lg"
              onClick={() => { scrollTop(); setLocation("/unlock"); }}
              data-testid="button-cta-buy-now"
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25"
            >
              Unlock My Full Analysis — £79 <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={startFresh}
              data-testid="button-cta-start"
            >
              Get My Financial Picture — Free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            One-time payment. No subscription. All calculations private and in-browser.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-faq">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold" data-testid="text-faq-headline">
              Questions people ask before they start
            </h2>
            <p className="text-sm text-muted-foreground mt-3">Answers that are direct, specific, and written for England and Wales.</p>
          </div>
          <div className="space-y-6">
            {FAQ_ITEMS_LANDING.map((item, i) => (
              <div key={i} data-testid={`faq-item-${i}`}>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-background border-t border-border/40" data-testid="section-popular-guides">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl md:text-2xl font-display font-bold text-center mb-2">Popular Guides</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">Understand the key topics before you model your position.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/divorce-financial-settlement-calculator-uk" onClick={scrollTop} data-testid="link-guide-settlement-calc" className="group block p-5 rounded-lg border border-border hover:border-primary/40 hover:shadow-md transition-all bg-background">
              <div className="w-8 h-8 rounded-md bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                <Scale className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">How Assets Are Divided</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">How UK courts approach divorce financial settlements — and what drives the outcome.</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-primary">Read guide <ChevronRight className="w-3 h-3" /></span>
            </Link>
            <Link href="/how-much-does-divorce-cost-uk" onClick={scrollTop} data-testid="link-guide-divorce-costs" className="group block p-5 rounded-lg border border-border hover:border-primary/40 hover:shadow-md transition-all bg-background">
              <div className="w-8 h-8 rounded-md bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">How Much Does Divorce Cost?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">A breakdown of typical legal fees, court costs, and financial advice costs in the UK.</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-primary">Read guide <ChevronRight className="w-3 h-3" /></span>
            </Link>
            <Link href="/can-i-keep-the-house-after-divorce-uk" onClick={scrollTop} data-testid="link-guide-who-gets-house" className="group block p-5 rounded-lg border border-border hover:border-primary/40 hover:shadow-md transition-all bg-background">
              <div className="w-8 h-8 rounded-md bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Who Gets the House?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">The factors that determine what happens to the family home when a marriage ends.</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-primary">Read guide <ChevronRight className="w-3 h-3" /></span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="pt-12 pb-8 bg-primary" data-testid="section-footer">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <Link href="/" onClick={scrollTop} className="inline-block mb-3 group">
                <span className="font-display font-bold text-white text-sm tracking-tight group-hover:text-gold transition-colors">DivorceCalculatorUK</span>
              </Link>
              <p className="text-xs text-white/40 leading-relaxed">
                Illustrative financial modelling for separation and divorce in England &amp; Wales.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Guides &amp; Resources</p>
              <ul className="space-y-2">
                <li><Link href="/free-guide" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-free-guide">Free UK Divorce Guide</Link></li>
                <li><Link href="/divorce-financial-guides" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-guides-hub">All Financial Guides</Link></li>
                <li><Link href="/divorce-financial-modelling" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-guides">Divorce Financial Modelling</Link></li>
                <li><Link href="/how-much-does-divorce-cost-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-divorce-costs">Divorce Costs UK</Link></li>
                <li><Link href="/divorce-financial-settlement-calculator-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-settlement-calc">Settlement Calculator</Link></li>
                <li><Link href="/divorce-settlement-examples-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-examples">Settlement Examples</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Specialist Topics</p>
              <ul className="space-y-2">
                <li><Link href="/divorce-50-50-split-calculator-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-5050">50/50 Split</Link></li>
                <li><Link href="/divorce-house-buyout-calculator-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-house-buyout">House Buyout</Link></li>
                <li><Link href="/divorce-pension-split-calculator-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-pension-split">Pension Split</Link></li>
                <li><Link href="/can-i-keep-the-house-after-divorce-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-who-gets-house">Who Gets the House?</Link></li>
                <li><Link href="/how-are-pensions-divided-in-divorce-uk" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-how-pensions">How Pensions Are Split</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Legal &amp; Support</p>
              <ul className="space-y-2">
                <li><Link href="/about" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-about">About This Tool</Link></li>
                <li><Link href="/methodology" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-methodology">Model Methodology</Link></li>
                <li><Link href="/privacy" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-privacy">Privacy Policy</Link></li>
                <li><Link href="/terms" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-terms">Terms of Use</Link></li>
                <li><Link href="/refund-policy" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-refund-policy">Refund Policy</Link></li>
                <li><Link href="/contact" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-contact">Contact &amp; Support</Link></li>
                <li><Link href="/recover" onClick={scrollTop} className="text-xs text-white/50 hover:text-white transition-colors" data-testid="link-recover">Recover Access</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 space-y-2 text-center">
            <p className="text-xs text-white/35">
              Illustrative financial modelling only. This tool does not provide legal, tax, or financial advice.
            </p>
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} DivorceCalculatorUK
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
