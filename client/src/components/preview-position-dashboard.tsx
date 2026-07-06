import { Lock, Sparkles, TrendingUp, Wallet, HelpCircle, Home, PieChart } from "lucide-react";
import { PREVIEW_UNLOCK_PILLARS } from "@/lib/product-copy";
import { formatCurrency } from "@/lib/utils";

const PILLAR_ICONS = {
  share: TrendingUp,
  lasts: Wallet,
  questions: HelpCircle,
} as const;

type ChartSlice = { name: string; value: number; color?: string };

type SnapshotProps = {
  combinedPool: number;
  halfPool: number;
  netHomeEquity: number;
  chartData: ChartSlice[];
  chartTotal: number;
  intentBridge: string;
};

function DashboardShell({
  eyebrow,
  title,
  accent,
  badge,
  children,
  testId,
}: {
  eyebrow: string;
  title: string;
  accent: "cyan" | "gold";
  badge?: React.ReactNode;
  children: React.ReactNode;
  testId?: string;
}) {
  const accentBar = accent === "cyan" ? "from-cyan-500/90 to-teal-400/80" : "from-amber-400/90 to-gold/80";
  const eyebrowColor = accent === "cyan" ? "text-cyan-300/95" : "text-amber-200/95";

  return (
    <div
      className="overflow-hidden rounded-xl border border-slate-800/10 shadow-[0_4px_24px_rgba(15,23,42,0.08)]"
      data-testid={testId}
    >
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-3.5 py-3 sm:px-4">
        <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accentBar}`} />
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 space-y-0.5">
            <p className={`text-[9px] font-semibold uppercase tracking-[0.2em] ${eyebrowColor}`}>{eyebrow}</p>
            <p className="text-sm font-semibold text-white leading-snug">{title}</p>
          </div>
          {badge}
        </div>
      </div>
      <div className="bg-gradient-to-b from-slate-50/95 to-white p-3 sm:p-3.5">{children}</div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  hint,
  accent,
  testId,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: string;
  testId?: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-slate-200/90 bg-white p-2.5 sm:p-3 shadow-sm"
      data-testid={testId}
    >
      {accent ? (
        <div className="absolute inset-y-0 left-0 w-0.5" style={{ background: accent }} />
      ) : null}
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 pl-1">{label}</p>
      <p className="mt-1 text-lg sm:text-xl font-bold tabular-nums text-slate-900 pl-1">{value}</p>
      {hint ? <p className="mt-0.5 text-[10px] text-slate-500 leading-snug pl-1 hidden sm:block">{hint}</p> : null}
    </div>
  );
}

function CompositionBars({ slices, total }: { slices: ChartSlice[]; total: number }) {
  if (slices.length === 0 || total <= 0) return null;

  return (
    <div className="space-y-2" data-testid="preview-composition-bars">
      <div className="flex h-2 overflow-hidden rounded-full bg-slate-100">
        {slices.map((slice) => (
          <div
            key={slice.name}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${Math.max(4, Math.round((slice.value / total) * 100))}%`,
              background: slice.color,
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {slices.map((slice) => (
          <div key={slice.name} className="flex items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-2 min-w-0 text-slate-600">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: slice.color }} />
              <span className="truncate">{slice.name}</span>
            </div>
            <div className="shrink-0 tabular-nums text-right">
              <span className="font-semibold text-slate-800">{formatCurrency(slice.value)}</span>
              <span className="ml-1 text-slate-400">({Math.round((slice.value / total) * 100)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Live snapshot metrics — shown first on preview. */
export function PreviewSnapshotDashboard({
  combinedPool,
  halfPool,
  netHomeEquity,
  chartData,
  chartTotal,
  intentBridge,
}: SnapshotProps) {
  const slices: ChartSlice[] = chartData.map((d, i) => ({
    name: d.name,
    value: d.value,
    color: d.color ?? ["#0d9488", "hsl(220,52%,32%)", "#64748b"][i % 3],
  }));

  return (
    <DashboardShell
      eyebrow="Live snapshot"
      title="Your figures, totalled"
      accent="cyan"
      badge={
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Active
        </span>
      }
      testId="preview-snapshot-dashboard"
    >
      <div className="grid grid-cols-2 gap-2" data-testid="preview-snapshot-hero">
        <MetricTile
          label="Combined pool"
          value={formatCurrency(combinedPool)}
          hint="Property equity plus liquid assets"
          accent="#0891b2"
          testId="value-asset-pool"
        />
        <MetricTile
          label="~50/50 start"
          value={formatCurrency(halfPool)}
          hint="Before housing & pension splits"
          accent="#C9A84C"
          testId="value-half-pool"
        />
        <div className="col-span-2">
          <MetricTile
            label="Net property equity"
            value={formatCurrency(netHomeEquity)}
            hint="Value less mortgage and estimated sale costs"
            accent="#7c3aed"
            testId="card-net-equity"
          />
        </div>
      </div>

      {slices.length > 0 ? (
        <div className="mt-3 rounded-lg border border-slate-200/80 bg-white p-2.5 sm:p-3" data-testid="preview-snapshot-breakdown">
          <div className="mb-2 flex items-center gap-1.5">
            <PieChart className="h-3.5 w-3.5 text-slate-500" />
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Pool composition</p>
          </div>
          <CompositionBars slices={slices} total={chartTotal} />
        </div>
      ) : null}

      <div
        className="mt-3 flex gap-2 rounded-lg border border-cyan-200/60 bg-cyan-50/50 px-2.5 py-2"
        data-testid="text-intent-bridge"
      >
        <Home className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-700" />
        <p className="text-[11px] sm:text-xs font-medium leading-relaxed text-slate-700">{intentBridge}</p>
      </div>
    </DashboardShell>
  );
}

/** Full report pillars — shown after settlement scenario dashboards. */
export function PreviewUnlockRevealsDashboard() {
  return (
    <DashboardShell
      eyebrow="Full report"
      title="What unlock reveals"
      accent="gold"
      badge={
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/70">
          <Lock className="h-2.5 w-2.5" />
          Locked
        </span>
      }
      testId="preview-what-unlock-reveals"
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2" data-testid="preview-unlock-pillars">
        {PREVIEW_UNLOCK_PILLARS.map((pillar, i) => {
          const Icon = PILLAR_ICONS[pillar.id];
          return (
            <div
              key={pillar.id}
              className="group relative overflow-hidden rounded-lg border border-slate-200/90 bg-white p-2.5"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 opacity-80" style={{ background: pillar.color }} />
              <div className="flex items-start justify-between gap-1">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
                  style={{ background: pillar.color }}
                >
                  {i + 1}
                </div>
                <Lock className="h-3 w-3 shrink-0 text-slate-300" />
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: pillar.color }} />
                <p className="text-xs font-semibold leading-snug text-slate-900">{pillar.question}</p>
              </div>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-500">{pillar.answer}</p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/90 to-transparent" />
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-amber-200/50 bg-amber-50/40 px-2.5 py-2">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-600" />
        <p className="text-[10px] leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-800">Three dedicated reports + PDF</span>
          {" "}— capital paths, pressure points, and checks before you agree.
        </p>
      </div>
    </DashboardShell>
  );
}

/** @deprecated Use PreviewSnapshotDashboard + PreviewUnlockRevealsDashboard separately */
export function PreviewPositionDashboard(props: SnapshotProps) {
  return (
    <div className="space-y-3" data-testid="preview-position-dashboard">
      <PreviewSnapshotDashboard {...props} />
      <PreviewUnlockRevealsDashboard />
    </div>
  );
}
