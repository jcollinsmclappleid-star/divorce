import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, ExternalLink, BarChart3, TrendingUp, FileText, SlidersHorizontal, Lightbulb, Download } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Logo } from "@/components/logo";
import { SiteNav } from "@/components/site-nav";

interface RelatedPage {
  title: string;
  description: string;
  href: string;
  badge: string;
}

interface Breadcrumb {
  name: string;
  href: string;
}

interface ContentPageLayoutProps {
  title: string;
  subtitle: string;
  documentTitle: string;
  metaDescription: string;
  relatedPages: RelatedPage[];
  children: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
}

function useSeoMeta(title: string, description: string, path: string, pageTitle: string, breadcrumbs?: Breadcrumb[]) {
  useEffect(() => {
    const baseUrl = "https://divorcecalculatoruk.co.uk";
    const fullUrl = `${baseUrl}${path}`;

    const ogTags: { property: string; content: string }[] = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: fullUrl },
      { property: "og:image", content: `${baseUrl}/og-image.png` },
    ];

    const createdMeta: HTMLMetaElement[] = [];
    ogTags.forEach(({ property, content }) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", property);
      meta.content = content;
      document.head.appendChild(meta);
      createdMeta.push(meta);
    });

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const canonicalWasNew = !canonical;
    const prevCanonicalHref = canonical?.href ?? "";
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;
    const canonicalRef = canonical;

    const articleSchema = document.createElement("script");
    articleSchema.type = "application/ld+json";
    const articleData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": pageTitle,
      "description": description,
      "url": fullUrl,
      "publisher": {
        "@type": "Organization",
        "name": "Divorce Calculator UK",
        "url": baseUrl,
      },
      "inLanguage": "en-GB",
      "about": {
        "@type": "Thing",
        "name": "Divorce financial settlement",
        "description": "Financial division of assets, property, pensions and debts in UK divorce proceedings under the Matrimonial Causes Act 1973"
      },
      "mentions": [
        { "@type": "Legislation", "name": "Matrimonial Causes Act 1973" }
      ]
    };
    articleSchema.textContent = JSON.stringify(articleData);
    document.head.appendChild(articleSchema);

    let breadcrumbScript: HTMLScriptElement | null = null;
    if (breadcrumbs && breadcrumbs.length > 0) {
      breadcrumbScript = document.createElement("script");
      breadcrumbScript.type = "application/ld+json";
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((bc, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": bc.name,
          "item": `${baseUrl}${bc.href}`,
        })),
      };
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(breadcrumbScript);
    }

    return () => {
      createdMeta.forEach((meta) => {
        if (meta.parentNode) meta.parentNode.removeChild(meta);
      });
      if (canonicalWasNew) {
        if (canonicalRef.parentNode) canonicalRef.parentNode.removeChild(canonicalRef);
      } else {
        canonicalRef.href = prevCanonicalHref;
      }
      if (articleSchema.parentNode) articleSchema.parentNode.removeChild(articleSchema);
      if (breadcrumbScript?.parentNode) breadcrumbScript.parentNode.removeChild(breadcrumbScript);
    };
  }, [title, description, path, pageTitle, breadcrumbs]);
}

export function ContentPageLayout({
  title,
  subtitle,
  documentTitle,
  metaDescription,
  relatedPages,
  children,
  breadcrumbs,
}: ContentPageLayoutProps) {
  useDocumentTitle(documentTitle);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const existed = !!meta;
    const prevContent = meta?.content || "";
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = metaDescription;
    return () => {
      if (existed && meta) {
        meta.content = prevContent;
      } else if (meta && meta.parentNode) {
        meta.parentNode.removeChild(meta);
      }
    };
  }, [metaDescription]);

  const defaultBreadcrumbs = breadcrumbs || [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/divorce-financial-guides" },
    { name: title, href: location },
  ];

  useSeoMeta(documentTitle, metaDescription, location, title, defaultBreadcrumbs);

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20" data-testid="text-disclaimer-bar">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <SiteNav />

      <header className="relative overflow-hidden bg-primary py-12 md:py-16" data-testid="section-content-hero">
        <div className="pointer-events-none absolute inset-0">
        </div>
        <div className="relative container mx-auto px-4 max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-3 -ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              className="text-white/70 hover:text-white hover:bg-white/10"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Home
            </Button>
            <span className="text-white/30 text-sm">/</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/divorce-financial-guides")}
              className="text-white/70 hover:text-white hover:bg-white/10"
              data-testid="button-back-guides"
            >
              All Guides
            </Button>
          </nav>
          <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight text-white" data-testid="text-content-title">
            {title}
          </h1>
          <p className="text-white/70 mt-3 text-lg leading-relaxed max-w-2xl" data-testid="text-content-subtitle">
            {subtitle}
          </p>
          <Button
            className="mt-6 bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 btn-shimmer"
            onClick={() => setLocation("/wizard")}
            data-testid="button-hero-cta"
          >
            Start Modelling <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </header>

      <article data-testid="section-content-body">
        {children}
      </article>

      <section className="py-12 md:py-16 border-y border-border/40" data-testid="section-report-showcase">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs font-semibold tracking-wider uppercase text-primary mb-2">What the full report shows</p>
          <h2 className="text-xl md:text-2xl font-display font-bold mb-2">See the numbers, not just the concepts</h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            The free wizard builds your financial picture. The full report — unlocked for £79 — shows every scenario calculated with your actual figures.
          </p>

          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden mb-8" data-testid="card-report-mockup">
            <div className="px-4 py-3 border-b border-border/60 bg-muted/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">Scenario comparison — illustrative</span>
              <Badge variant="outline" className="text-[10px]">Full report</Badge>
            </div>
            <div className="divide-y divide-border/40">
              {[
                { label: "Sell & Split (50/50)", capitalA: "£128,400", capitalB: "£128,400", incomeA: "£2,840/mo", incomeB: "£1,620/mo", highlight: false },
                { label: "Party A keeps home", capitalA: "£0 equity + home", capitalB: "£256,800 cash", incomeA: "£2,840/mo", incomeB: "£1,620/mo", highlight: true },
                { label: "Deferred sale (5 yr)", capitalA: "Occupies home", capitalB: "£128,400 future", incomeA: "£2,840/mo", incomeB: "£1,620/mo", highlight: false },
              ].map((row, i) => (
                <div key={i} className={`px-4 py-3 ${row.highlight ? "bg-primary/5" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">{row.label}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>A: <span className="font-medium text-foreground">{row.capitalA}</span></span>
                        <span>B: <span className="font-medium text-foreground">{row.capitalB}</span></span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-muted-foreground mb-0.5">Net monthly income</p>
                      <p className="text-xs text-foreground">A: <span className="font-semibold text-primary">{row.incomeA}</span></p>
                      <p className="text-xs text-foreground">B: <span className="font-semibold text-primary">{row.incomeB}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 bg-muted/50 border-t border-border/60">
              <p className="text-[10px] text-muted-foreground">Illustrative only. Your report uses the figures you enter — property, pensions, income, debts, and expenses.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              { icon: BarChart3, title: "Four settlement scenarios", desc: "Sell & split, two buyout options, and deferred sale — all calculated side by side." },
              { icon: TrendingUp, title: "Income sustainability model", desc: "Post-tax monthly income vs outgoings for both parties under every scenario." },
              { icon: SlidersHorizontal, title: "Stress test sliders", desc: "See how scenarios hold up if rates rise, property falls, or income changes." },
              { icon: Lightbulb, title: "Guided summary", desc: "Plain-English interpretation of what each scenario means for each party." },
              { icon: FileText, title: "Pension & asset breakdown", desc: "Liquid vs illiquid split, pension sharing and offsetting comparisons." },
              { icon: Download, title: "PDF download", desc: "Shareable report with all scenarios, for use in mediation or solicitor meetings." },
            ].map((f, i) => (
              <div key={i} className="flex gap-3 items-start" data-testid={`feature-${i}`}>
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <f.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border border-primary/20 bg-primary/5">
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Full report — £79 one-time</p>
              <p className="text-xs text-muted-foreground">12 months access · all scenarios · PDF download · no subscription</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                size="sm"
                className="bg-gold hover:bg-gold/90 text-white border-0 shadow-sm btn-shimmer"
                onClick={() => setLocation("/wizard")}
                data-testid="button-showcase-start"
              >
                Start free <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setLocation("/preview")}
                data-testid="button-showcase-preview"
              >
                Preview report
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary border-y border-white/10" data-testid="section-calculator-cta">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs font-semibold tracking-wider uppercase text-gold mb-3">Model your own figures</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">See where you could stand financially</h2>
          <p className="text-white/65 text-sm leading-relaxed max-w-xl mb-6">
            Use the divorce settlement calculator to compare property, pensions, income, debts and cashflow across settlement scenarios. Unlike a solicitor lead form, this is built around financial modelling. Start free — unlock the full report when ready.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setLocation("/wizard")}
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 btn-shimmer"
              data-testid="button-article-cta-start"
            >
              Start free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              onClick={() => setLocation("/unlock")}
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white"
              data-testid="button-article-cta-preview"
            >
              Preview sample report
            </Button>
          </div>
        </div>
      </section>

      {relatedPages.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30" data-testid="section-related-pages">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-6" data-testid="text-related-heading">
              Related Guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map((page) => (
                <Link key={page.href} href={page.href} className="block group" data-testid={`link-related-${page.href.replace(/\//g, "")}`}>
                  <Card className="h-full hover-elevate active-elevate-2 transition-all" data-testid={`card-related-${page.href.replace(/\//g, "")}`}>
                    <CardContent className="pt-5 pb-4 space-y-2.5">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0" data-testid={`badge-related-${page.href.replace(/\//g, "")}`}>{page.badge}</Badge>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors" data-testid={`text-related-title-${page.href.replace(/\//g, "")}`}>{page.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{page.description}</p>
                      <div className="flex items-center gap-1 text-xs text-primary font-medium">
                        Read more <ArrowRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-border/40 bg-muted/20 py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-xs text-muted-foreground leading-relaxed" data-testid="text-page-disclaimer">
            This guide provides general information and financial modelling context only. It is not legal, financial, tax or mortgage advice and does not recommend what either party should do. Figures used are illustrative only. Independent professional advice from a qualified solicitor, regulated financial adviser, or other relevant professional may be needed before making any financial decisions.
          </p>
        </div>
      </div>

      <footer className="border-t border-border/40 py-8 bg-muted/20" data-testid="section-footer">
        <div className="container mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center">
            <Logo href="/" size="sm" showBrandName />
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/divorce-financial-modelling" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-guides">Guides</Link>
            <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">About</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">Terms of Use</Link>
            <Link href="/methodology" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-methodology">Model Methodology</Link>
            <Link href="/recover" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-recover">Recover Access</Link>
          </div>
          <p className="text-xs text-muted-foreground" data-testid="text-footer-disclaimer">
            Illustrative financial modelling only. This tool does not provide legal, tax, or financial advice.
          </p>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Divorce Calculator UK
          </p>
        </div>
      </footer>
    </div>
  );
}

export function useFaqJsonLd(faqItems: { question: string; answer: string }[]) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
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

interface ExternalLinkButtonProps {
  href: string;
  children: React.ReactNode;
}

export function ExternalLinkButton({ href, children }: ExternalLinkButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      asChild
      data-testid="button-external-link"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <ExternalLink className="w-3 h-3 ml-1.5" />
      </a>
    </Button>
  );
}

interface InlineCTAProps {
  label: string;
  href?: string;
}

export function InlineCTA({ label, href = "/wizard" }: InlineCTAProps) {
  const [, setLocation] = useLocation();
  return (
    <div className="py-4 flex flex-wrap items-center gap-x-4 gap-y-2">
      <Button onClick={() => setLocation(href)} data-testid="button-inline-cta">
        {label} <ArrowRight className="w-4 h-4 ml-1.5" />
      </Button>
      <span className="text-xs text-muted-foreground">
        Free to start &middot; full report £79 &middot;{" "}
        <button
          onClick={() => setLocation("/preview")}
          className="text-primary underline-offset-2 hover:underline"
          data-testid="button-inline-preview"
        >
          preview sample report
        </button>
      </span>
    </div>
  );
}

interface ContentSectionProps {
  children: React.ReactNode;
  muted?: boolean;
  className?: string;
}

export function ContentSection({ children, muted = false, className = "" }: ContentSectionProps) {
  return (
    <section className={`py-10 md:py-14 ${muted ? "bg-muted/30" : ""} ${className}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        {children}
      </div>
    </section>
  );
}
