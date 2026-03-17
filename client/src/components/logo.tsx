import { Link } from "wouter";
import logoImage from "@assets/IMG_0336_1773713450202.png";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showBrandName?: boolean;
}

const sizeMap = {
  sm: "h-10",
  md: "h-14",
  lg: "h-20",
};

const brandTextSize = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

const brandSubSize = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
};

export function Logo({ href = "/", size = "md", className = "", showBrandName = false }: LogoProps) {
  const content = (
    <div className="flex items-center gap-3 shrink-0">
      <img
        src={logoImage}
        alt="DivorceCalculatorUK"
        className={`${sizeMap[size]} w-auto object-contain ${className}`}
        data-testid="img-logo"
      />
      {showBrandName && (
        <div className="flex flex-col" data-testid="text-brand-name">
          <span className={`font-display font-bold tracking-tight leading-tight ${brandTextSize[size]}`}>
            DivorceCalculatorUK
          </span>
          <span className={`text-muted-foreground tracking-wide uppercase leading-tight ${brandSubSize[size]}`}>
            Structured Financial Modelling
          </span>
        </div>
      )}
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
    <img
      src={logoImage}
      alt="DivorceCalculatorUK"
      className={`h-12 w-auto object-contain ${className}`}
      data-testid="img-logo-print"
    />
  );
}
