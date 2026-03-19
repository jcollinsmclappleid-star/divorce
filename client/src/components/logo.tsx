import { Link } from "wouter";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showBrandName?: boolean;
}

const sizeMap = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

const iconSizeMap = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
};

const brandSubSize = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
};

export function Logo({ href = "/", size = "md", className = "", showBrandName = false }: LogoProps) {
  const content = (
    <div className="flex items-center gap-2 shrink-0">
      <img src="/favicon.png" alt="DivorceCalculatorUK logo" className={iconSizeMap[size]} data-testid="img-logo-icon" />
      <div className="flex flex-col" data-testid="text-brand-name">
        <span className={`font-display font-bold tracking-tight leading-tight ${sizeMap[size]}`}>
          Divorce Calculator UK
        </span>
        {showBrandName && (
          <span className={`text-muted-foreground tracking-wide uppercase leading-tight ${brandSubSize[size]}`}>
            Financial Modelling
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}

export function LogoPrint({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} data-testid="img-logo-print">
      <img src="/favicon.png" alt="DivorceCalculatorUK logo" className="w-8 h-8" />
      <div className="flex flex-col">
        <span className="font-display font-bold text-lg">Divorce Calculator UK</span>
        <span className="text-muted-foreground text-xs uppercase">Financial Modelling</span>
      </div>
    </div>
  );
}
