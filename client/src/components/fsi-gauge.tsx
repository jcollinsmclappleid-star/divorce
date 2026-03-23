import { Lock } from "lucide-react";

interface GaugeColor {
  stroke: string;
  text: string;
  label: string;
}

const getGaugeColor = (score: number): GaugeColor => {
  if (score >= 70) return { stroke: "#10B981", text: "#059669", label: "Sustainable" };
  if (score >= 40) return { stroke: "#F59E0B", text: "#D97706", label: "Attention needed" };
  return { stroke: "#EF4444", text: "#DC2626", label: "Under pressure" };
};

function buildArcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const sx = cx + r * Math.cos(startAngle);
  const sy = cy + r * Math.sin(startAngle);
  const ex = cx + r * Math.cos(endAngle);
  const ey = cy + r * Math.sin(endAngle);
  const largeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;
}

interface FsiGaugeProps {
  score: number;
  size?: number;
  label?: string;
}

export function FsiGauge({ score, size = 120, label }: FsiGaugeProps) {
  const cx = size / 2;
  const cy = size / 2 + size * 0.08;
  const r = size * 0.36;
  const strokeW = size * 0.075;

  const startAngle = Math.PI;
  const endAngle = 0;
  const fillAngle = startAngle + (endAngle - startAngle) * (score / 100);

  const bgPath = buildArcPath(cx, cy, r, startAngle, endAngle);
  const fillPath = buildArcPath(cx, cy, r, startAngle, fillAngle);

  const color = getGaugeColor(score);

  return (
    <div className="flex flex-col items-center gap-1" data-testid="fsi-gauge">
      <svg
        width={size}
        height={size * 0.65}
        viewBox={`0 0 ${size} ${size * 0.65}`}
        role="img"
        aria-label={`Financial Sustainability Indicator score: ${score}`}
      >
        <path d={bgPath} fill="none" stroke="#E5E7EB" strokeWidth={strokeW} strokeLinecap="round" />
        <path d={fillPath} fill="none" stroke={color.stroke} strokeWidth={strokeW} strokeLinecap="round" />
        <text
          x={cx}
          y={cy - r * 0.1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.22}
          fontWeight="700"
          fill={color.text}
          fontFamily="Inter, sans-serif"
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + r * 0.22}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.085}
          fill="#6B7280"
          fontFamily="Inter, sans-serif"
        >
          /100
        </text>
      </svg>
      <span className="text-xs font-semibold tracking-wide" style={{ color: color.text }}>
        {label ?? color.label}
      </span>
    </div>
  );
}

export function FsiGaugeLocked({ size = 120 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2 + size * 0.08;
  const r = size * 0.36;
  const strokeW = size * 0.075;

  const bgPath = buildArcPath(cx, cy, r, Math.PI, 0);

  return (
    <div className="flex flex-col items-center gap-1 relative" data-testid="fsi-gauge-locked">
      <div className="relative">
        <svg
          width={size}
          height={size * 0.65}
          viewBox={`0 0 ${size} ${size * 0.65}`}
          role="img"
          aria-label="Financial Sustainability Indicator — locked"
          className="opacity-30 blur-[2px]"
        >
          <path d={bgPath} fill="none" stroke="#D1D5DB" strokeWidth={strokeW} strokeLinecap="round" strokeDasharray="4 3" />
          <text
            x={cx}
            y={cy - r * 0.1}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size * 0.22}
            fontWeight="700"
            fill="#9CA3AF"
            fontFamily="Inter, sans-serif"
          >
            —
          </text>
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ paddingBottom: `${size * 0.1}px` }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <Lock className="text-gray-400" style={{ width: size * 0.2, height: size * 0.2 }} />
          </div>
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground">Unlock to view</span>
    </div>
  );
}
