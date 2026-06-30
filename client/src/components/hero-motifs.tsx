/** Ambient gold line-art for the landing hero — decorative only. */
export function HeroMotifs() {
  const stroke = "#C9A84C";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* House — upper right */}
      <svg
        className="absolute -right-4 top-16 w-44 h-44 md:w-56 md:h-56 opacity-[0.07]"
        viewBox="0 0 120 120"
      >
        <path {...common} d="M60 18 L18 52 V98 H102 V52 Z" />
        <path {...common} d="M42 98 V68 H78 V98" />
        <path {...common} d="M60 18 L60 8" opacity={0.6} />
      </svg>

      {/* £ mark — lower left */}
      <svg
        className="absolute left-6 bottom-20 w-28 h-28 md:w-36 md:h-36 opacity-[0.06]"
        viewBox="0 0 80 80"
      >
        <path
          {...common}
          d="M52 18 C38 18 28 28 28 40 C28 52 38 62 52 62 H22 M22 34 H48 M22 48 H44"
        />
      </svg>

      {/* Split line / balance — centre-right */}
      <svg
        className="absolute right-[18%] bottom-[28%] w-32 h-32 opacity-[0.05] hidden md:block"
        viewBox="0 0 100 100"
      >
        <path {...common} d="M50 12 V88" opacity={0.5} />
        <path {...common} d="M22 36 H78 M22 64 H78" />
        <circle {...common} cx="32" cy="36" r="6" />
        <circle {...common} cx="68" cy="64" r="6" />
      </svg>
    </div>
  );
}
