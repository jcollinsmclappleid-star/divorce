import { useState } from "react";
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

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
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

  const assets = useAppStore((s) => s.assets);
  const incomes = useAppStore((s) => s.incomes);
  const reset = useAppStore((s) => s.reset);

  const hasSession = assets.length > 0 || incomes.length > 0;

  const handleStart = () => {
    setOpen(false);
    scrollTop();
    if (onStartClick) {
      onStartClick();
    } else {
      setLocation("/wizard");
    }
  };

  const handleSignOut = () => {
    reset();
    localStorage.removeItem("dfm-session-token");
    setOpen(false);
    setLocation("/");
  };

  const handleNavClick = () => {
    setOpen(false);
    scrollTop();
  };

  return (
    <nav
      className="sticky top-0 z-[100] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
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
            {hasSession ? (
              <>
                <Link
                  href="/results"
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
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </>
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

            <SheetContent side="right" className="w-[280px] flex flex-col p-0">
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
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                      data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <div className="border-t border-border/40 my-2 mx-0" />

                {hasSession ? (
                  <>
                    <SheetClose asChild>
                      <Link
                        href="/results"
                        className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                        data-testid="link-mobile-my-analysis"
                      >
                        <BarChart3 className="w-4 h-4" />
                        My Analysis
                      </Link>
                    </SheetClose>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted transition-colors text-left w-full"
                      data-testid="button-mobile-sign-out"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <SheetClose asChild>
                    <Link
                      href="/recover"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                      data-testid="link-mobile-sign-in"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Link>
                  </SheetClose>
                )}
              </nav>

              <div className="px-5 py-4 border-t border-border/40 mt-auto">
                <Button
                  onClick={handleStart}
                  data-testid="button-mobile-cta"
                  className="w-full bg-gold hover:bg-gold/90 text-white border-0"
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
