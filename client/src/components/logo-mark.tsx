interface LogoMarkProps {
  size?: number;
  className?: string;
  variant?: "navy" | "white" | "muted";
}

export function LogoMark({ size = 64, className = "", variant = "navy" }: LogoMarkProps) {
  const colors = {
    navy: { box: "hsl(220, 50%, 25%)", accent: "hsl(215, 60%, 55%)", letter: "hsl(220, 50%, 25%)" },
    white: { box: "rgba(255,255,255,0.85)", accent: "hsl(215, 60%, 55%)", letter: "rgba(255,255,255,0.85)" },
    muted: { box: "hsl(220, 20%, 70%)", accent: "hsl(215, 40%, 65%)", letter: "hsl(220, 20%, 70%)" },
  };
  const c = colors[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="img-logo-mark"
      aria-label="DivorceCalculatorUK"
    >
      <rect x="8" y="12" width="60" height="76" rx="2" stroke={c.box} strokeWidth="3.5" fill="none" />
      <rect x="32" y="12" width="60" height="76" rx="2" stroke={c.accent} strokeWidth="2.5" fill="none" opacity="0.5" />

      <text
        x="38"
        y="74"
        fontFamily="'Playfair Display', 'Georgia', serif"
        fontSize="62"
        fontWeight="700"
        fill={c.letter}
        letterSpacing="-3"
      >
        D
      </text>

      <line x1="55" y1="18" x2="32" y2="82" stroke={c.accent} strokeWidth="3" opacity="0.7" />
    </svg>
  );
}
