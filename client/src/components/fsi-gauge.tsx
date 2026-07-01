import { Lock } from "lucide-react";

interface GaugeColor {
  stroke: string;
  text: string;
  label: string;
  track: string;
}

const getGaugeColor = (score: number): GaugeColor => {
  if (score >= 70) return { stroke: "#10B981", text: "#059669", label: "Sustainable", track: "#D1FAE5" };
  if (score >= 40) return { stroke: "#F59E0B", text: "#D97706", label: "Attention needed", track: "#FEF3C7" };
  return { stroke: "#EF4444", text: "#DC2626", label: "Under pressure", track: "#FEE2E2" };
};

/** Semicircle arc from 180° (left) to 0° (right) through the top — score fills left to right. */
function buildSemicircleArcPaths(score: number, size: number) {
  const width = size;
  const height = Math.round(size * (64 / 120));
  const cx = width / 2;
  const cy = size * (62 / 120);
  const r = size * (52 / 120);
  const sw = Math.max(3, size * (11 / 120));
  const clamped = Math.max(0, Math.min(100, score));

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const pt = (deg: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  });

  const start = pt(180);
  const end = pt(0);
  const fillEnd = pt(180 - (clamped / 100) * 180);

  const bgPath = `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
  const fillPath = clamped > 0 ? `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${fillEnd.x} ${fillEnd.y}` : "";

  return { width, height, bgPath, fillPath, sw };
}

interface FsiGaugeProps {
  score: number;
  size?: number;
  label?: string;
  showLabel?: boolean;
}

export function FsiGauge({ score, size = 120, label, showLabel = true }: FsiGaugeProps) {
  const color = getGaugeColor(score);
  const { width, height, bgPath, fillPath, sw } = buildSemicircleArcPaths(score, size);
  const displayLabel = label ?? color.label;
  const tuck = Math.max(2, Math.round(size * 0.04));

  return (
    <div className="flex flex-col items-center gap-1" data-testid="fsi-gauge">
      <div className="flex flex-col items-center">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block shrink-0"
          role="img"
          aria-hidden="true"
        >
          <path d={bgPath} fill="none" stroke={color.track} strokeWidth={sw} strokeLinecap="round" />
          {fillPath ? (
            <path d={fillPath} fill="none" stroke={color.stroke} strokeWidth={sw} strokeLinecap="round" />
          ) : null}
        </svg>
        {/* Score below arc arms — HTML only, no SVG overlap */}
        <div
          className="flex flex-col items-center text-center leading-none"
          style={{ marginTop: -tuck }}
          aria-label={`Cashflow Resilience Indicator score: ${Math.round(score)} out of 100`}
        >
          <span className="font-bold tabular-nums" style={{ color: color.text, fontSize: size * 0.2 }}>
            {Math.round(score)}
          </span>
          <span className="text-muted-foreground mt-0.5" style={{ fontSize: Math.max(9, size * 0.083) }}>
            /100
          </span>
        </div>
      </div>
      {showLabel && displayLabel ? (
        <span className="text-xs font-semibold tracking-wide text-center" style={{ color: color.text }}>
          {displayLabel}
        </span>
      ) : null}
    </div>
  );
}

export function FsiGaugeLocked({ size = 120 }: { size?: number }) {
  const { width, height, bgPath, sw } = buildSemicircleArcPaths(0, size);
  const tuck = Math.max(2, Math.round(size * 0.04));

  return (
    <div className="flex flex-col items-center gap-1" data-testid="fsi-gauge-locked">
      <div className="flex flex-col items-center">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block shrink-0 opacity-30 blur-[2px]"
          role="img"
          aria-label="Cashflow Resilience Indicator — locked"
        >
          <path
            d={bgPath}
            fill="none"
            stroke="#D1D5DB"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
        </svg>
        <div className="flex items-center justify-center" style={{ marginTop: -tuck - size * 0.06 }}>
          <Lock className="text-gray-400" style={{ width: size * 0.18, height: size * 0.18 }} />
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground">Unlock to view</span>
    </div>
  );
}
