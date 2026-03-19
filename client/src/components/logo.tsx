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

function ChartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" fill="#1a3357" />

      <line x1="9" y1="12" x2="9" y2="31" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.3" />
      <line x1="9" y1="31" x2="32" y2="31" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.3" />
      <line x1="9" y1="23" x2="32" y2="23" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="2 2" />
      <line x1="9" y1="17" x2="32" y2="17" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="2 2" />

      <polyline
        points="9,26 16,22 22,19 28,14 32,11"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <polyline
        points="9,26 16,27 22,26 28,28 32,29"
        stroke="#C9A84C"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.55"
        fill="none"
      />

      <circle cx="9" cy="26" r="1.8" fill="#C9A84C" />
      <circle cx="22" cy="19" r="1.5" fill="#C9A84C" />
      <circle cx="32" cy="11" r="2" fill="#C9A84C" />
    </svg>
  );
}

export function Logo({ href = "/", size = "md", className = "", showBrandName = false }: LogoProps) {
  const content = (
    <div className="flex items-center gap-2.5 shrink-0">
      <ChartIcon className={iconSizeMap[size]} />
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
      <ChartIcon className="w-7 h-7" />
      <div className="flex flex-col">
        <span className="font-display font-bold text-lg">Divorce Calculator UK</span>
        <span className="text-muted-foreground text-xs uppercase">Financial Modelling</span>
      </div>
    </div>
  );
}
