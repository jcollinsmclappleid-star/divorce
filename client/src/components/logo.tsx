import { Link } from "wouter";
import logoImage from "@assets/9204D1B1-4FBF-42EF-9A10-FF773B2F9F35_1771463140495.png";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-10",
  md: "h-14",
  lg: "h-20",
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
      className={`h-12 w-auto object-contain ${className}`}
      data-testid="img-logo-print"
    />
  );
}
