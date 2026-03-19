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

function ScalesIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" fill="#1a3357" />
      <g transform="translate(6, 5)">
        <circle cx="14" cy="4.5" r="1.8" fill="#C9A84C" />
        <rect x="13.25" y="4.5" width="1.5" height="17" rx="0.75" fill="#C9A84C" />
        <rect x="3" y="8" width="22" height="1.4" rx="0.7" fill="#C9A84C" />
        <line x1="5" y1="9.4" x2="3" y2="16" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="9" y1="9.4" x2="11" y2="16" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M2 16 Q7 19.5 12 16" stroke="#C9A84C" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <line x1="17" y1="9.4" x2="19" y2="16" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="23" y1="9.4" x2="21" y2="16" stroke="#C9A84C" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M16 16 Q21 19.5 26 16" stroke="#C9A84C" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <rect x="10" y="21.5" width="8" height="1.3" rx="0.65" fill="#C9A84C" />
      </g>
    </svg>
  );
}

export function Logo({ href = "/", size = "md", className = "", showBrandName = false }: LogoProps) {
  const content = (
    <div className="flex items-center gap-2.5 shrink-0">
      <ScalesIcon className={iconSizeMap[size]} />
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
      <ScalesIcon className="w-7 h-7" />
      <div className="flex flex-col">
        <span className="font-display font-bold text-lg">Divorce Calculator UK</span>
        <span className="text-muted-foreground text-xs uppercase">Financial Modelling</span>
      </div>
    </div>
  );
}
