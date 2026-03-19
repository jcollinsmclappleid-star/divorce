import { Link } from "wouter";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showBrandName?: boolean;
}

const imageHeightMap = {
  sm: "h-8",
  md: "h-10",
  lg: "h-14",
};

export function Logo({ href = "/", size = "md", className = "" }: LogoProps) {
  const content = (
    <div className={`flex items-center shrink-0 ${className}`} data-testid="img-logo-icon">
      <img
        src="/logo.png"
        alt="DivorceCalculator UK"
        className={`${imageHeightMap[size]} w-auto object-contain`}
      />
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
    <div className={`flex items-center ${className}`} data-testid="img-logo-print">
      <img
        src="/logo.png"
        alt="DivorceCalculator UK"
        className="h-10 w-auto object-contain"
      />
    </div>
  );
}
