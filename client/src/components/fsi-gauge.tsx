interface FsiGaugeProps {
  score: number;
  size?: number;
  locked?: boolean;
  label?: string;
}

const getGaugeColor = (score: number) => {
  if (score >= 70) return { stroke: "#10B981", text: "#059669", label: "Sustainable" };
  if (score >= 40) return { stroke: "#F59E0B", text: "#D97706", label: "Attention needed" };
  return { stroke: "#EF4444", text: "#DC2626", label: "Under pressure" };
};

export function FsiGauge({ score, size = 120, locked = false, label }: FsiGaugeProps) {
  const cx = size / 2;
  const cy = size / 2 + size * 0.08;
  const r = size * 0.36;
  const strokeW = size * 0.075;

  const startAngle = Math.PI;
  const endAngle = 0;
  const totalArc = endAngle - startAngle;

  const polarX = (angle: number) => cx + r * Math.cos(angle);
  const polarY = (angle: number) => cy + r * Math.sin(angle);

  const bgPath = `M ${polarX(startAngle)} ${polarY(startAngle)} A ${r} ${r} 0 0 1 ${polarX(endAngle)} ${polarY(endAngle)}`;

  const fillAngle = startAngle + totalArc * (locked ? 0.65 : score / 100);
  const largeFillArc = Math.abs(fillAngle - startAngle) > Math.PI ? 1 : 0;
  const fillPath = `M ${polarX(startAngle)} ${polarY(startAngle)} A ${r} ${r} 0 ${largeFillArc} 1 ${polarX(fillAngle)} ${polarY(fillAngle)}`;

  const color = locked ? "#6B7280" : getGaugeColor(score);
  const strokeColor = locked ? "#D1D5DB" : (color as ReturnType<typeof getGaugeColor>).stroke;
  const textColor = locked ? "#9CA3AF" : (color as ReturnType<typeof getGaugeColor>).text;
  const displayLabel = locked ? "Locked" : ((color as ReturnType<typeof getGaugeColor>).label);

  return (
    <div className="flex flex-col items-center gap-1" data-testid="fsi-gauge">
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`} role="img" aria-label={locked ? "Financial Sustainability Indicator — locked" : `Financial Sustainability Indicator score: ${score}`}>
        <path
          d={bgPath}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
        {!locked && (
          <path
            d={fillPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
        )}
        {locked && (
          <path
            d={fillPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
        )}
        <text
          x={cx}
          y={cy - r * 0.1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={locked ? size * 0.12 : size * 0.22}
          fontWeight="700"
          fill={textColor}
          fontFamily="Inter, sans-serif"
        >
          {locked ? "?" : score}
        </text>
        <text
          x={cx}
          y={cy + r * 0.22}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.085}
          fill={locked ? "#9CA3AF" : "#6B7280"}
          fontFamily="Inter, sans-serif"
        >
          {locked ? "unlock to view" : "/100"}
        </text>
      </svg>
      <span
        className="text-xs font-semibold tracking-wide"
        style={{ color: locked ? "#9CA3AF" : textColor }}
      >
        {label ?? displayLabel}
      </span>
    </div>
  );
}

export function FsiGaugeLocked({ size = 120 }: { size?: number }) {
  return <FsiGauge score={0} size={size} locked />;
}
