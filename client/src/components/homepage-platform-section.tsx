import {
  ArrowRight, BarChart3, Briefcase, Coins, Eye, FileText, Home,
  Receipt, Scale, SearchCheck, Sparkles, TrendingUp, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HERO_EYEBROW,
  PRODUCT_LAYERS,
  PRODUCT_NAMES,
  PRODUCT_PRICE,
} from "@/lib/product-copy";

const CONCERN_QUESTIONS = [
  { icon: Eye, tag: "Share clarity", q: "I need to know what I could get." },
  { icon: Home, tag: "Home pressure", q: "Can I keep the house — or afford to buy them out?" },
  { icon: TrendingUp, tag: "Pension risk", q: "What happens to my pension — am I giving up too much?" },
  { icon: Briefcase, tag: "Career & children", q: "I gave up my career or looked after the children — does that count?" },
  { icon: SearchCheck, tag: "Offer check", q: "What would their offer leave me with monthly?" },
  { icon: Scale, tag: "Monthly reality", q: "What does 50/50 leave me with once bills are included?" },
  { icon: Receipt, tag: "Often overlooked", q: "I paid most of the mortgage and bills — does that count?" },
  { icon: Coins, tag: "Entitlement", q: "What am I entitled to in a divorce?" },
  { icon: Users, tag: "With children", q: "Will I have enough to live on with the kids?" },
] as const;

const MODELLING_OUTCOMES = [
  "Your asset pool, modelled privately in-browser",
  "Four settlement paths compared side-by-side",
  "Monthly pressure, reserves and mortgage stress",
] as const;

const REPORT_OUTCOMES = [
  "What each option leaves you with",
  "Where pressure appears in your case",
  "What to check before you agree",
] as const;

interface HomepagePlatformSectionProps {
  onStart: () => void;
  onScrollToPricing: () => void;
}

export function HomepagePlatformSection({ onStart, onScrollToPricing }: HomepagePlatformSectionProps) {
  return (
    <section
      className="py-10 md:py-12 bg-white border-b border-border/40"
      data-testid="section-concern-picker"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Platform message */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3" data-reveal>
          <Badge variant="secondary" className="bg-gold/10 text-gold border border-gold/20">
            {HERO_EYEBROW}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            What does this mean for me?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            The questions in your head — house, share, pension, offer, children — mapped from your figures with the numbers, trade-offs and checks to help you decide. Not a legal verdict on what&apos;s fair.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-10 items-start">
          {/* Questions — compact, mobile-first */}
          <div className="space-y-4" data-reveal>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              The questions you&apos;re asking
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CONCERN_QUESTIONS.map((item) => (
                <div
                  key={item.q}
                  className="flex gap-2 rounded-lg border border-border/60 bg-slate-50/50 px-2.5 py-2 md:gap-2.5 md:px-3 md:py-2.5"
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[8px] md:text-[9px] font-semibold uppercase tracking-wide text-primary/70">{item.tag}</p>
                    <p className="text-[12px] md:text-[13px] font-display font-semibold text-foreground leading-snug">{item.q}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              size="lg"
              onClick={onStart}
              className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-white border-0 shadow-md font-semibold"
              data-testid="button-concern-primary"
            >
              Start with my figures <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          {/* Product offering — outcome-led illustration */}
          <div className="space-y-3" data-reveal data-reveal-delay="80">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              What you get
            </p>
            <div className="rounded-2xl border-2 border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 md:p-5 space-y-4 shadow-sm">
              {/* Modelling layer */}
              <div className="rounded-xl border border-cyan-200/80 bg-white overflow-hidden">
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-cyan-50 to-white border-b border-cyan-100">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-4 h-4 text-cyan-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Financial modelling</p>
                    <p className="text-[10px] text-muted-foreground">Free snapshot from your inputs</p>
                  </div>
                  <Badge variant="outline" className="ml-auto text-[9px] border-emerald-200 text-emerald-700 bg-emerald-50 shrink-0">
                    Free
                  </Badge>
                </div>
                <ul className="px-3.5 py-3 space-y-1.5">
                  {MODELLING_OUTCOMES.map((line) => (
                    <li key={line} className="flex gap-2 text-[11px] text-foreground/85 leading-snug">
                      <span className="text-cyan-600 shrink-0 mt-0.5">→</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center">
                <div className="h-6 w-px bg-gradient-to-b from-cyan-300 to-gold/50" aria-hidden />
              </div>

              {/* Three reports */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 px-0.5">
                  <p className="text-xs font-bold text-foreground">Three reports + PDF</p>
                  <span className="text-[10px] font-semibold text-gold tabular-nums">{PRODUCT_PRICE}</span>
                </div>
                {PRODUCT_LAYERS.map((layer, i) => (
                  <div
                    key={layer.key}
                    className="flex gap-3 rounded-lg border border-border/50 bg-white px-3 py-2.5 shadow-sm"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: layer.color }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground leading-snug">{layer.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{REPORT_OUTCOMES[i]}</p>
                    </div>
                    {i === 1 ? (
                      <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5 opacity-70" aria-hidden />
                    ) : null}
                  </div>
                ))}
                <div className="flex gap-3 rounded-lg border-2 border-gold/25 bg-gold/[0.06] px-3 py-2.5">
                  <div className="w-6 h-6 rounded-md bg-gold/20 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{PRODUCT_NAMES.pdf}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">All three reports combined — download and share</p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={onScrollToPricing}
                className="w-full border-primary/25 text-primary hover:bg-primary/5 font-semibold"
                data-testid="button-concern-to-pricing"
              >
                See full {PRODUCT_NAMES.fullPosition} — {PRODUCT_PRICE}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
