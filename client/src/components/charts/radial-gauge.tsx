import { useEffect, useState } from "react";
import { gaugeColor } from "@/lib/chart-theme";

interface RadialGaugeProps {
  score: number;
  size?: number;
  label?: string;
  tickMarks?: boolean;
  animate?: boolean;
  testId?: string;
}

export function RadialGauge({
  score,
  size = 180,
  label,
  tickMarks = true,
  animate = true,
  testId,
}: RadialGaugeProps) {
  const [val, setVal] = useState(animate ? 0 : score);
  useEffect(() => {
    if (!animate) { setVal(score); return; }
    const start = performance.now();
    const from = val;
    const to = Math.max(0, Math.min(100, score));
    const dur = 1100;
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(from + (to - from) * eased);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, animate]);

  const cx = size / 2, cy = size / 2 + size * 0.08;
  const r = size * 0.4;
  const sw = size * 0.085;
  const startA = Math.PI * 0.85;
  const endA = Math.PI * 2.15;
  const sweep = endA - startA;
  const fillA = startA + sweep * (val / 100);

  const arc = (from: number, to: number) => {
    const sx = cx + r * Math.cos(from), sy = cy + r * Math.sin(from);
    const ex = cx + r * Math.cos(to),   ey = cy + r * Math.sin(to);
    const large = Math.abs(to - from) > Math.PI ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  };

  const c = gaugeColor(score);
  const gid = `gauge-grad-${Math.round(score * 1000)}`;

  // Tick positions across the arc
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const a = startA + sweep * (i / 10);
    const inner = r - sw * 0.6, outer = r + sw * 0.05;
    return {
      x1: cx + inner * Math.cos(a), y1: cy + inner * Math.sin(a),
      x2: cx + outer * Math.cos(a), y2: cy + outer * Math.sin(a),
      active: i / 10 <= val / 100,
    };
  });

  return (
    <div className="flex flex-col items-center" data-testid={testId ?? "radial-gauge"}>
      <svg width={size} height={size * 0.78} viewBox={`0 0 ${size} ${size * 0.78}`} role="img" aria-label={`Score ${Math.round(score)} of 100`}>
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={c.stroke} stopOpacity={0.6} />
            <stop offset="60%"  stopColor={c.stroke} stopOpacity={1} />
            <stop offset="100%" stopColor={c.stroke} stopOpacity={1} />
          </linearGradient>
          <filter id={`${gid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d={arc(startA, endA)} stroke="rgba(15,27,45,0.07)" strokeWidth={sw} fill="none" strokeLinecap="round" />
        <path d={arc(startA, fillA)} stroke={`url(#${gid})`} strokeWidth={sw} fill="none" strokeLinecap="round" filter={`url(#${gid}-glow)`} />
        {tickMarks && ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.active ? c.stroke : "rgba(15,27,45,0.18)"}
            strokeWidth={i % 5 === 0 ? 1.4 : 0.8}
            strokeLinecap="round"
            opacity={t.active ? 1 : 0.55} />
        ))}
        <text x={cx} y={cy + size * 0.02} textAnchor="middle" fontSize={size * 0.26} fontWeight={700}
          fill={c.stroke} fontFamily='"Fraunces", Georgia, serif' style={{ letterSpacing: "-0.02em" }}>
          {Math.round(val)}
        </text>
        <text x={cx} y={cy + size * 0.18} textAnchor="middle" fontSize={size * 0.075} fill="#6B7280" fontFamily='"Inter", sans-serif'>
          / 100
        </text>
      </svg>
      {label && <span className="text-[11px] font-semibold tracking-wide mt-0.5" style={{ color: c.stroke }}>{label}</span>}
    </div>
  );
}
