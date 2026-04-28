import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, TrendingUp, Activity, BarChart3, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

const SCENARIO_DATA = [
  { name: "Sell & Split",    alex: 232500, jordan: 172500 },
  { name: "Alex Keeps",      alex: 249000, jordan: 158000 },
  { name: "Jordan Keeps",    alex: 195000, jordan: 215000 },
  { name: "Deferred Sale",   alex: 218000, jordan: 185000 },
];

const PROJECTION_DATA = [
  { year: "Now",  alex: 232500, jordan: 172500 },
  { year: "Yr 1", alex: 244100, jordan: 177200 },
  { year: "Yr 2", alex: 256400, jordan: 182100 },
  { year: "Yr 3", alex: 269200, jordan: 188600 },
  { year: "Yr 4", alex: 282800, jordan: 195500 },
  { year: "Yr 5", alex: 297100, jordan: 203100 },
];

const CASHFLOW_ROWS = [
  { label: "Net monthly income",      alex:  3200, jordan:  2267, type: "income"  },
  { label: "Mortgage / rent",         alex: -1280, jordan:  -950, type: "expense" },
  { label: "Household expenses",      alex: -1050, jordan:  -870, type: "expense" },
];
const CASHFLOW_SURPLUS = { alex: 870, jordan: 447 };

const SENSITIVITY = [
  { rank: 1, label: "Income reduction (−5%)",    alexPct: 80, jordanPct: 57, alexVal: "−£160/mo", jordanVal: "−£113/mo" },
  { rank: 2, label: "Interest rate (+1%)",        alexPct: 77, jordanPct: 0,  alexVal: "−£154/mo", jordanVal: "—"        },
  { rank: 3, label: "Expense inflation (+10%)",   alexPct: 53, jordanPct: 44, alexVal: "−£105/mo", jordanVal: "−£87/mo"  },
  { rank: 4, label: "House price (−10%)",         alexPct: 93, jordanPct: 93, alexVal: "−£18.5k",  jordanVal: "−£18.5k"  },
];

const fmtK  = (v: number) => `£${Math.round(v / 1000)}k`;
const fmtGbp = (v: number) => `£${Math.abs(v).toLocaleString()}`;


function PanelHeader({ icon: Icon, color, title, subtitle }: {
  icon: typeof BarChart3;
  color: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-0.5">
        <Icon className={`w-4 h-4 ${color}`} />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-[11px] text-muted-foreground leading-snug">{subtitle}</p>
    </div>
  );
}

function ScenarioPanel() {
  return (
    <div className="flex flex-col h-full">
      <PanelHeader
        icon={BarChart3}
        color="text-blue-600"
        title="Settlement Scenario Comparison"
        subtitle="Net worth per party across all four settlement structures — Alex & Jordan"
      />
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SCENARIO_DATA} margin={{ top: 4, right: 4, left: -14, bottom: 32 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: "#6B7280" }}
              interval={0}
              angle={-20}
              textAnchor="end"
              tickLine={false}
            />
            <YAxis
              tickFormatter={fmtK}
              tick={{ fontSize: 9, fill: "#6B7280" }}
              width={36}
              tickLine={false}
              axisLine={false}
            />
            <RechartsTooltip
              formatter={(v: number, name: string) => [`£${v.toLocaleString()}`, name]}
              contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
            <Legend wrapperStyle={{ fontSize: 10, paddingTop: 0 }} />
            <Bar dataKey="alex"   name="Alex"   fill="#2563EB" radius={[3,3,0,0]} maxBarSize={26} />
            <Bar dataKey="jordan" name="Jordan" fill="#10B981" radius={[3,3,0,0]} maxBarSize={26} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="pt-2 border-t mt-1">
        <div className="flex flex-wrap gap-3 text-[10px] text-muted-foreground">
          <span>Combined marital pool <span className="font-semibold text-foreground">£485,000</span></span>
          <span>Property <span className="font-semibold text-foreground">£420k</span> · Mortgage <span className="font-semibold text-foreground">£235k</span></span>
        </div>
      </div>
    </div>
  );
}

function CashflowPanel() {
  return (
    <div className="flex flex-col h-full">
      <PanelHeader
        icon={Activity}
        color="text-emerald-600"
        title="Monthly Financial Position"
        subtitle="Post-settlement cashflow · Alex Keeps Home scenario"
      />
      <div className="mb-2">
        <Badge variant="outline" className="text-[10px] bg-emerald-50 border-emerald-200 text-emerald-700 font-medium">
          Alex Keeps Home
        </Badge>
      </div>

      <div className="flex-1 space-y-0 text-xs">
        <div className="grid grid-cols-3 text-[10px] text-muted-foreground font-semibold pb-2 border-b">
          <span />
          <span className="text-right text-blue-600">Alex</span>
          <span className="text-right text-emerald-600">Jordan</span>
        </div>
        {CASHFLOW_ROWS.map((row, i) => (
          <div key={i} className="grid grid-cols-3 py-2.5 border-b border-muted/40">
            <span className="text-[11px] text-muted-foreground pr-2 leading-tight">{row.label}</span>
            <span className={`text-right tabular-nums font-medium text-[11px] ${row.type === "expense" ? "text-red-600" : "text-foreground"}`}>
              {row.alex < 0 ? `−${fmtGbp(row.alex)}` : `${fmtGbp(row.alex)}`}
            </span>
            <span className={`text-right tabular-nums font-medium text-[11px] ${row.type === "expense" ? "text-red-600" : "text-foreground"}`}>
              {row.jordan < 0 ? `−${fmtGbp(row.jordan)}` : `${fmtGbp(row.jordan)}`}
            </span>
          </div>
        ))}
        <div className="grid grid-cols-3 py-3 bg-emerald-50 rounded-lg mt-2 px-2">
          <span className="text-xs font-semibold text-foreground">Monthly surplus</span>
          <span className="text-right tabular-nums font-bold text-emerald-600 text-sm">+£{CASHFLOW_SURPLUS.alex.toLocaleString()}</span>
          <span className="text-right tabular-nums font-bold text-emerald-600 text-sm">+£{CASHFLOW_SURPLUS.jordan.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t">
        <p className="text-[10px] text-muted-foreground mb-2">Financial Sustainability Index · this scenario</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Alex",   score: 71, bg: "bg-emerald-50 border-emerald-200", color: "text-emerald-600", label: "Sustainable"      },
            { name: "Jordan", score: 62, bg: "bg-amber-50 border-amber-200",     color: "text-amber-600",   label: "Attention needed" },
          ].map((p, i) => (
            <div key={i} className={`rounded-lg border px-3 py-2 ${p.bg} text-center`}>
              <p className="text-[10px] text-muted-foreground font-medium">{p.name}</p>
              <p className={`text-lg font-bold tabular-nums ${p.color}`}>
                {p.score}<span className="text-[10px] font-normal">/100</span>
              </p>
              <p className={`text-[9px] font-medium ${p.color}`}>{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectionPanel() {
  return (
    <div className="flex flex-col h-full">
      <PanelHeader
        icon={TrendingUp}
        color="text-violet-600"
        title="5-Year Capital Projection"
        subtitle="Sell & Split scenario · capital trajectory under current assumptions"
      />
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PROJECTION_DATA} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="landingAlexGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="landingJordanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10B981" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 9, fill: "#6B7280" }} tickLine={false} />
            <YAxis
              tickFormatter={fmtK}
              tick={{ fontSize: 9, fill: "#6B7280" }}
              width={40}
              tickLine={false}
              axisLine={false}
            />
            <RechartsTooltip
              formatter={(v: number, name: string) => [`£${v.toLocaleString()}`, name]}
              contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Area type="monotone" dataKey="alex"   name="Alex"   stroke="#2563EB" fill="url(#landingAlexGrad)"   strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="jordan" name="Jordan" stroke="#10B981" fill="url(#landingJordanGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="pt-2 border-t mt-1">
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>Year 5 — Alex: <span className="text-blue-600 font-semibold tabular-nums">£297k</span></span>
          <span>Jordan: <span className="text-emerald-600 font-semibold tabular-nums">£203k</span></span>
        </div>
      </div>
    </div>
  );
}

function MiniArcGauge({ score, color, trackColor }: { score: number; color: string; trackColor: string }) {
  // Pure arc SVG — no text inside, avoiding any overlap
  const W = 120, H = 64;
  const cx = 60, cy = 62, r = 52, sw = 11;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const pt = (deg: number) => `${cx + r * Math.cos(toRad(deg))} ${cy + r * Math.sin(toRad(deg))}`;
  const endDeg = 180 - (score / 100) * 180;
  const bgPath   = `M ${pt(180)} A ${r} ${r} 0 0 1 ${pt(0)}`;
  const fillPath = score > 0 ? `M ${pt(180)} A ${r} ${r} 0 ${score > 50 ? 1 : 0} 1 ${pt(endDeg)}` : "";
  return (
    <div className="relative flex flex-col items-center">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <path d={bgPath}   fill="none" stroke={trackColor} strokeWidth={sw} strokeLinecap="round" />
        {fillPath && <path d={fillPath} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />}
      </svg>
      {/* Score sits below the arc arms — in HTML, guaranteed no SVG overlap */}
      <div className="flex flex-col items-center -mt-1">
        <span className="text-2xl font-bold tabular-nums leading-none" style={{ color }}>{score}</span>
        <span className="text-[10px] text-muted-foreground leading-none mt-0.5">/100</span>
      </div>
    </div>
  );
}

function FsiPanel() {
  const parties = [
    { name: "Alex",   score: 78, color: "#059669", trackColor: "#D1FAE5", bg: "bg-emerald-50 border-emerald-200", label: "Sustainable",      labelColor: "text-emerald-700" },
    { name: "Jordan", score: 54, color: "#D97706", trackColor: "#FEF3C7", bg: "bg-amber-50 border-amber-200",   label: "Attention needed", labelColor: "text-amber-700"   },
  ];
  return (
    <div className="flex flex-col h-full">
      <PanelHeader
        icon={Gauge}
        color="text-rose-500"
        title="Financial Sustainability Index"
        subtitle="Composite resilience score per party · Sell & Split scenario"
      />
      <div className="flex gap-2 mt-2">
        {parties.map((p) => (
          <div key={p.name} className={`flex-1 rounded-xl border px-2 pt-3 pb-2 flex flex-col items-center ${p.bg}`}>
            <p className="text-[11px] font-semibold text-foreground mb-1">{p.name}</p>
            <MiniArcGauge score={p.score} color={p.color} trackColor={p.trackColor} />
            <p className={`text-[10px] font-semibold mt-0.5 ${p.labelColor}`}>{p.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t space-y-2.5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Supporting metrics</p>
        {[
          { label: "Liquidity ratio — Alex",   value: "3.1× expenses", color: "text-emerald-600" },
          { label: "Liquidity ratio — Jordan", value: "1.8× expenses", color: "text-amber-600"   },
          { label: "Reserves — Alex",          value: "Sustained",      color: "text-emerald-600" },
          { label: "Reserves — Jordan",        value: "Depletes Yr 4",  color: "text-amber-600"   },
        ].map((row, i) => (
          <div key={i} className="flex justify-between items-center text-[11px]">
            <span className="text-muted-foreground">{row.label}</span>
            <span className={`font-medium tabular-nums ${row.color}`}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SensitivityPanel() {
  return (
    <div className="flex flex-col h-full relative">
      <PanelHeader
        icon={Activity}
        color="text-amber-500"
        title="Sensitivity Analysis"
        subtitle="Assumptions ranked by impact on monthly surplus · Sell & Split"
      />
      <div className="flex-1 space-y-2.5">
        {SENSITIVITY.map((s) => (
          <div key={s.rank} className="rounded-lg border border-border/60 bg-muted/20 p-2.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[9px] font-bold flex items-center justify-center shrink-0">
                {s.rank}
              </span>
              <span className="text-[10px] font-medium text-foreground leading-tight">{s.label}</span>
            </div>
            <div className="space-y-1.5">
              {[
                { name: "Alex",   pct: s.alexPct,   val: s.alexVal   },
                { name: "Jordan", pct: s.jordanPct, val: s.jordanVal },
              ].map((party, j) => (
                <div key={j} className="flex items-center gap-2">
                  <span className="text-[9px] text-muted-foreground w-9 shrink-0">{party.name}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full"
                      style={{ width: `${party.pct}%` }}
                    />
                  </div>
                  <span className="text-[9px] tabular-nums text-red-600 w-14 text-right shrink-0">
                    {party.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PANELS = [
  { id: "scenario",    accentColor: "#2563EB", component: ScenarioPanel    },
  { id: "cashflow",    accentColor: "#10B981", component: CashflowPanel    },
  { id: "projection",  accentColor: "#8B5CF6", component: ProjectionPanel  },
  { id: "fsi",         accentColor: "#F43F5E", component: FsiPanel         },
  { id: "sensitivity", accentColor: "#F59E0B", component: SensitivityPanel },
];

const PANEL_WIDTH = 424;
const GAP = 20;

export function LandingDashboardPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(PANELS.length - 1, idx));
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: clamped * (PANEL_WIDTH + GAP), behavior: "smooth" });
    }
    setActiveIdx(clamped);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const idx = Math.round(scrollRef.current.scrollLeft / (PANEL_WIDTH + GAP));
      setActiveIdx(Math.min(Math.max(idx, 0), PANELS.length - 1));
    }
  };

  return (
    <div className="relative px-0 md:px-10">
      <button
        onClick={() => scrollTo(activeIdx - 1)}
        disabled={activeIdx === 0}
        aria-label="Previous panel"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-6 z-20 w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full items-center justify-center text-white transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        data-testid="dashboard-preview-strip"
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {PANELS.map((panel) => {
          const Component = panel.component;
          return (
            <div
              key={panel.id}
              data-testid={`dashboard-panel-${panel.id}`}
              className="snap-center shrink-0 w-[310px] sm:w-[380px] md:w-[424px] h-[490px] bg-white rounded-xl shadow-md border border-border/50 p-5 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                style={{ background: panel.accentColor }}
              />
              <div className="pt-1 h-full">
                <Component />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scrollTo(activeIdx + 1)}
        disabled={activeIdx === PANELS.length - 1}
        aria-label="Next panel"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-6 z-20 w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full items-center justify-center text-white transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {PANELS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to panel ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === activeIdx ? "bg-white w-6" : "bg-white/30 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
