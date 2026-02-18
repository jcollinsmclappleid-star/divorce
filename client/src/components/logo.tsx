import { Link } from "wouter";
import logoImage from "@assets/99837457-0E25-4053-9466-A21F982CCA30_1771443541335.png";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-6",
  md: "h-8",
  lg: "h-10",
};

export function Logo({ href = "/", size = "md", className = "" }: LogoProps) {
  const img = (
    <img
      src={logoImage}
      alt="DivorceCalculatorUK"
      className={`${sizeMap[size]} w-auto object-contain ${className}`}
      data-testid="img-logo"
    />
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center shrink-0">
        {img}
      </Link>
    );
  }

  return <div className="flex items-center shrink-0">{img}</div>;
}

export function LogoPrint({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoImage}
      alt="DivorceCalculatorUK"
      className={`h-8 w-auto object-contain ${className}`}
      data-testid="img-logo-print"
    />
  );
}
