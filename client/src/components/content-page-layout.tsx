import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
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

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = fullUrl;
    document.head.appendChild(canonical);

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
      if (canonical.parentNode) canonical.parentNode.removeChild(canonical);
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
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl" />
          <div className="absolute top-4 right-8 w-48 h-48 rounded-full bg-violet-500/8 blur-3xl" />
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

      <section className="py-10 md:py-12 bg-primary border-y border-white/10" data-testid="section-calculator-cta">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Model this for your own situation</p>
              <p className="text-xs text-white/55 leading-relaxed max-w-md">
                Divorce Calculator UK lets you enter your actual figures and see how different settlement options compare — free to start, with a full analysis available for £79.
              </p>
            </div>
            <Button
              onClick={() => setLocation("/wizard")}
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-lg shadow-gold/25 shrink-0 btn-shimmer"
              data-testid="button-article-cta"
            >
              Start My Free Financial Model <ArrowRight className="w-4 h-4 ml-1.5" />
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
            This page provides high-level financial modelling information only. It does not constitute legal, tax, or financial advice and does not predict court outcomes. Independent professional advice may be warranted before making financial decisions.
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
    <div className="py-4">
      <Button onClick={() => setLocation(href)} data-testid="button-inline-cta">
        {label} <ArrowRight className="w-4 h-4 ml-1.5" />
      </Button>
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
