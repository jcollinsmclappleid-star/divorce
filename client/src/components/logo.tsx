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
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-12 h-12",
};

const brandSubSize = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
};

function CalcIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" fill="#1a3357" />
      <rect x="9" y="8" width="22" height="24" rx="3" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
      <rect x="12" y="11" width="16" height="5" rx="1.5" fill="#C9A84C" opacity="0.9" />
      <rect x="12" y="20" width="4.5" height="4" rx="1" fill="#C9A84C" opacity="0.7" />
      <rect x="17.75" y="20" width="4.5" height="4" rx="1" fill="#C9A84C" opacity="0.7" />
      <rect x="23.5" y="20" width="4.5" height="4" rx="1" fill="#C9A84C" opacity="0.7" />
      <rect x="12" y="26" width="4.5" height="4" rx="1" fill="#C9A84C" opacity="0.7" />
      <rect x="17.75" y="26" width="4.5" height="4" rx="1" fill="#C9A84C" opacity="0.7" />
      <rect x="23.5" y="26" width="4.5" height="4" rx="1" fill="#C9A84C" />
    </svg>
  );
}

export function Logo({ href = "/", size = "md", className = "", showBrandName = false }: LogoProps) {
  const content = (
    <div className="flex items-center gap-2.5 shrink-0">
      <CalcIcon className={iconSizeMap[size]} />
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
    <div className={`flex items-center gap-2.5 ${className}`} data-testid="img-logo-print">
      <CalcIcon className="w-7 h-7" />
      <div className="flex flex-col">
        <span className="font-display font-bold text-lg">Divorce Calculator UK</span>
        <span className="text-muted-foreground text-xs uppercase">Financial Modelling</span>
      </div>
    </div>
  );
}
