import { Link, useLocation } from "wouter";
import { FileText, PieChart, Calculator, Settings, Menu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCreateSession } from "@/hooks/use-sessions";
import { useAppStore } from "@/hooks/use-store";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: PieChart },
  { href: "/assets", label: "Assets & Debts", icon: Calculator },
  { href: "/budget", label: "Income & Budget", icon: FileText },
  { href: "/scenarios", label: "Scenarios", icon: Settings },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const state = useAppStore();
  const saveSession = useCreateSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSave = () => {
    saveSession.mutate({ 
      name: `Session ${new Date().toLocaleDateString()}`, 
      data: state 
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Disclaimer Banner */}
      <div className="bg-primary/10 text-primary px-4 py-2 text-xs md:text-sm text-center font-medium border-b border-primary/20">
        Disclaimer: Illustrative financial modelling only. Not legal, tax, or financial advice.
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="flex items-center gap-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <Calculator className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight hidden sm:inline-block">
                Divorce<span className="font-sans font-semibold text-primary">CalculatorUK</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`text-sm font-medium transition-colors hover:text-primary ${location === item.href ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={saveSession.isPending}>
              {saveSession.isPending ? "Saving..." : "Save Session"}
            </Button>
            <Button size="sm" className="shadow-lg shadow-primary/25">
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} DivorceCalculatorUK. All rights reserved.</p>
          <p className="mt-2 text-xs">Data is stored locally in your browser unless explicitly saved.</p>
        </div>
      </footer>
    </div>
  );
}
