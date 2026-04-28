import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, ArrowRight, LogIn, LogOut, BarChart3 } from "lucide-react";
import { Logo } from "@/components/logo";
import { scrollTop } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-store";
import { useAccess } from "@/hooks/use-access";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Guides", href: "/divorce-financial-guides" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface SiteNavProps {
  onStartClick?: () => void;
}

export function SiteNav({ onStartClick }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [hasSession, setHasSession] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reset = useAppStore((s) => s.reset);
  const assets = useAppStore((s) => s.assets);
  const incomes = useAppStore((s) => s.incomes);
  const { hasAccess, isAuthenticated, email, logout } = useAccess();

  const hasModelData = assets.length > 0 || incomes.length > 0;

  const myAnalysisHref = hasAccess ? "/results" : hasModelData ? "/preview" : "/wizard";

  useEffect(() => {
    const check = () => setHasSession(!!(isAuthenticated || localStorage.getItem('dfm-session-token')));
    check();
  }, [isAuthenticated]);

  const handleStart = () => {
    setOpen(false);
    scrollTop();
    if (onStartClick) {
      onStartClick();
    } else {
      setLocation("/wizard");
    }
  };

  const handleSignOut = async () => {
    await logout();
    reset();
    setHasSession(false);
    setOpen(false);
    setLocation("/");
  };

  const handleNavClick = () => {
    setOpen(false);
    scrollTop();
  };

  return (
    <nav
      className={`sticky top-0 z-[100] w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${scrolled ? "border-border/60 bg-background/97 shadow-sm" : "border-border/40 bg-background/95"}`}
      data-testid="nav-site"
    >
      <div className="container mx-auto px-4 h-12 flex items-center justify-between gap-2">
        <div className="flex items-center gap-5 min-w-0">
          <Logo href="/" size="sm" showBrandName />

          <div className="hidden md:flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={scrollTop}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
            {(hasModelData || hasAccess) ? (
              <>
                <Link
                  href={myAnalysisHref}
                  onClick={scrollTop}
                  className="text-sm text-primary font-medium hover:text-primary/80 transition-colors whitespace-nowrap flex items-center gap-1"
                  data-testid="link-nav-my-analysis"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  My Analysis
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap flex items-center gap-1"
                  data-testid="button-nav-sign-out"
                  title={isAuthenticated && email ? `Signed in as ${email}` : undefined}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {isAuthenticated && email ? (
                    <span className="flex items-center gap-1">
                      <span className="max-w-[140px] truncate text-xs text-muted-foreground/80">{email}</span>
                      <span>·</span>Sign Out
                    </span>
                  ) : "Sign Out"}
                </button>
              </>
            ) : hasSession ? (
              <button
                onClick={handleSignOut}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap flex items-center gap-1"
                data-testid="button-nav-sign-out"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            ) : (
              <Link
                href="/recover"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap flex items-center gap-1"
                data-testid="link-nav-sign-in"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={handleStart}
            data-testid="button-nav-start"
            className="bg-gold hover:bg-gold/90 text-white border-0 hidden sm:flex"
          >
            Get My Financial Picture — Free
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                data-testid="button-nav-menu"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full max-w-full sm:max-w-full flex flex-col p-0 inset-0 h-full md:hidden"
            >
              <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/40 text-left">
                <SheetTitle asChild>
                  <div>
                    <Logo href="/" size="sm" showBrandName />
                  </div>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-0.5 px-3 pt-4 flex-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      onClick={handleNavClick}
                      className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted transition-colors"
                      data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <div className="border-t border-border/40 my-3 mx-0" />

                {(hasModelData || hasAccess) ? (
                  <>
                    <SheetClose asChild>
                      <Link
                        href={myAnalysisHref}
                        onClick={scrollTop}
                        className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-primary hover:bg-primary/5 transition-colors"
                        data-testid="link-mobile-my-analysis"
                      >
                        <BarChart3 className="w-5 h-5" />
                        My Analysis
                      </Link>
                    </SheetClose>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:bg-muted transition-colors text-left w-full"
                      data-testid="button-mobile-sign-out"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                ) : hasSession ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:bg-muted transition-colors text-left w-full"
                    data-testid="button-mobile-sign-out"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                ) : (
                  <SheetClose asChild>
                    <Link
                      href="/recover"
                      className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:bg-muted transition-colors"
                      data-testid="link-mobile-sign-in"
                    >
                      <LogIn className="w-5 h-5" />
                      Sign In
                    </Link>
                  </SheetClose>
                )}
              </nav>

              <div className="px-5 py-5 border-t border-border/40 mt-auto">
                <Button
                  onClick={handleStart}
                  data-testid="button-mobile-cta"
                  className="w-full bg-gold hover:bg-gold/90 text-white border-0 h-12 text-base"
                >
                  Get My Financial Picture — Free
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
