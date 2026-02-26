import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { Logo } from "@/components/logo";

interface RelatedPage {
  title: string;
  description: string;
  href: string;
  badge: string;
}

interface ContentPageLayoutProps {
  title: string;
  subtitle: string;
  documentTitle: string;
  metaDescription: string;
  relatedPages: RelatedPage[];
  children: React.ReactNode;
}

function useOgMeta(title: string, description: string, path: string) {
  useEffect(() => {
    const baseUrl = "https://divorcecalculatoruk.co.uk";
    const tags: { property: string; content: string }[] = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${baseUrl}${path}` },
      { property: "og:image", content: `${baseUrl}/og-image.png` },
    ];

    const created: HTMLMetaElement[] = [];
    tags.forEach(({ property, content }) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", property);
      meta.content = content;
      document.head.appendChild(meta);
      created.push(meta);
    });

    return () => {
      created.forEach((meta) => {
        if (meta.parentNode) meta.parentNode.removeChild(meta);
      });
    };
  }, [title, description, path]);
}

export function ContentPageLayout({
  title,
  subtitle,
  documentTitle,
  metaDescription,
  relatedPages,
  children,
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

  useOgMeta(documentTitle, metaDescription, location);

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-primary/10 text-primary px-4 py-1.5 text-xs text-center font-medium border-b border-primary/20" data-testid="text-disclaimer-bar">
        Illustrative modelling only. Not legal, tax or financial advice.
      </div>

      <nav className="sticky top-0 z-[100] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-testid="nav-content-page">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-4">
            <Logo href="/" size="sm" showBrandName />
            <Link href="/methodology" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline" data-testid="link-nav-methodology">Methodology</Link>
            <Link href="/divorce-financial-modelling" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline" data-testid="link-nav-guides">Guides</Link>
          </div>
          <Button size="sm" onClick={() => setLocation("/wizard")} data-testid="button-nav-start">
            Start Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </nav>

      <section className="py-12 md:py-16" data-testid="section-content-hero">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="mb-6 -ml-2"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Home
          </Button>
          <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight" data-testid="text-content-title">
            {title}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed max-w-2xl" data-testid="text-content-subtitle">
            {subtitle}
          </p>
          <Button
            className="mt-6"
            onClick={() => setLocation("/wizard")}
            data-testid="button-hero-cta"
          >
            Start Modelling <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </section>

      <div data-testid="section-content-body">
        {children}
      </div>

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
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">Terms of Use</Link>
            <Link href="/methodology" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-methodology">Model Methodology</Link>
            <Link href="/recover" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-recover">Recover Access</Link>
          </div>
          <p className="text-xs text-muted-foreground" data-testid="text-footer-disclaimer">
            Illustrative financial modelling only. This tool does not provide legal, tax, or financial advice.
          </p>
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} DivorceCalculatorUK
          </p>
        </div>
      </footer>
    </div>
  );
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
