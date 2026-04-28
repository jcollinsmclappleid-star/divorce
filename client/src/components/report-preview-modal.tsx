import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  X, ArrowRight, AlertTriangle, TrendingUp, Sparkles,
  BookOpen, AlertCircle, FileSearch, Scale, Home, PiggyBank,
} from "lucide-react";

interface ReportPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

function SampleBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
      Sample report — fictional figures
    </div>
  );
}

function ReportBand({ title, accent }: { title: string; accent?: string }) {
  return (
    <div className="flex items-stretch gap-0 mb-5 rounded-lg overflow-hidden shadow-sm">
      <div className="w-1.5 shrink-0" style={{ background: accent ?? "#1e3a5f" }} />
      <div className="flex-1 bg-gradient-to-r from-[hsl(220_52%_20%)] to-[hsl(220_52%_16%)] px-5 py-2.5">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest">{title}</h3>
      </div>
    </div>
  );
}

function Row({ label, value, sub, bold, red, green }: {
  label: string; value: string; sub?: string; bold?: boolean; red?: boolean; green?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 py-1.5 border-b border-gray-100 last:border-0 ${bold ? "font-semibold" : ""}`}>
      <span className="text-sm text-gray-600 flex-1">{label}{sub && <span className="text-xs text-gray-400 ml-1">({sub})</span>}</span>
      <span className={`text-sm tabular-nums shrink-0 ${bold ? (green ? "text-emerald-700" : red ? "text-rose-600" : "text-gray-900") : red ? "text-rose-600" : green ? "text-emerald-700" : "text-gray-800"}`}>{value}</span>
    </div>
  );
}

export function ReportPreviewModal({ open, onClose }: ReportPreviewModalProps) {
  const [, setLocation] = useLocation();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleStart = () => {
    onClose();
    scrollTop();
    setLocation("/wizard");
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Sample divorce financial report"
    >
      <div className="relative w-full max-w-3xl bg-[#f8f9fb] rounded-2xl shadow-2xl overflow-hidden" data-testid="modal-sample-report">

        {/* Sticky close bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-white/95 backdrop-blur border-b border-gray-100">
          <SampleBadge />
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Close sample report"
            data-testid="button-close-sample-report"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-8 space-y-8">

          {/* Cover */}
          <div className="bg-gradient-to-br from-primary via-[hsl(220_52%_22%)] to-[hsl(220_52%_16%)] rounded-2xl px-7 py-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.03] rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-gold/[0.06] rounded-full translate-y-8 -translate-x-6" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-0.5">DivorceCalculatorUK</p>
                  <p className="text-[10px] text-white/35 uppercase tracking-wider">Financial Modelling</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/35 uppercase tracking-widest">Report generated</p>
                  <p className="text-xs text-white/70 font-medium mt-0.5">April 2026</p>
                  <p className="text-[10px] text-white/30 mt-0.5">UK 2026/27 Tax Rules</p>
                </div>
              </div>
              <div className="border-t border-white/15 pt-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-6 bg-gold rounded-full" />
                  <h1 className="text-2xl font-bold text-white tracking-tight">Divorce Financial Report</h1>
                </div>
                <p className="text-sm text-white/50 ml-3">Illustrative financial modelling · England & Wales · 4 scenarios analysed</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Total Assets", value: "£843,000", color: "text-cyan-300" },
                  { label: "Net Worth", value: "£253,000", color: "text-gold" },
                  { label: "Scenarios", value: "4", color: "text-emerald-300" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white/8 border border-white/10 rounded-xl px-3 py-2.5">
                    <p className="text-[9px] text-white/35 uppercase tracking-wider mb-1">{label}</p>
                    <p className={`text-base font-bold tabular-nums ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-3">
            <span className="text-amber-600 font-bold shrink-0 mt-0.5 text-[10px] uppercase tracking-wider">Sample</span>
            <p>This report uses entirely fictional figures for illustration. It does not constitute legal, tax, or financial advice. Independent professional review is recommended before making any financial decisions.</p>
          </div>

          {/* 1. Financial Position */}
          <section>
            <ReportBand title="1. Financial Position Summary" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Assets</p>
                  <Row label="Family Home" value="£675,000" sub="primary residence" />
                  <Row label="Party A Pension (CETV)" value="£42,000" />
                  <Row label="Party B Pension (CETV)" value="£18,000" />
                  <Row label="Joint Savings" value="£58,000" />
                  <Row label="Investments (ISA)" value="£50,000" />
                  <Row label="Total Assets" value="£843,000" bold />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Liabilities & Net Position</p>
                  <Row label="Outstanding Mortgage" value="(£590,000)" red />
                  <Row label="Total Liabilities" value="(£590,000)" bold red />
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <Row label="Combined Net Worth" value="£253,000" bold />
                    <Row label="Net Property Equity (est. 2% sale costs)" value="£71,500" />
                    <Row label="Distributable Settlement Pool" value="£179,500" bold sub="equity + liquid savings" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Income & Tax */}
          <section>
            <ReportBand title="2. Income & Tax Summary" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: "Party A", gross: "£126,000", allowance: "£0", note: "tapered — income above £125,140", tax: "(£40,232)", ni: "(£7,548)", net: "£78,220", monthly: "≈ £6,518" },
                  { label: "Party B", gross: "£60,000", allowance: "£12,570", note: "", tax: "(£11,432)", ni: "(£4,284)", net: "£44,284", monthly: "≈ £3,690" },
                ].map(col => (
                  <div key={col.label}>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">{col.label}</p>
                    <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 px-3 text-gray-600">Gross Annual Income</td>
                            <td className="py-2 px-3 text-right font-medium text-gray-800">{col.gross}</td>
                          </tr>
                          <tr className="border-b border-gray-100 bg-white">
                            <td className="py-2 px-3 text-gray-500">Personal Allowance</td>
                            <td className="py-2 px-3 text-right text-gray-600">{col.allowance}{col.note && <span className="text-[10px] text-gray-400 ml-1">({col.note})</span>}</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 px-3 text-gray-500">Income Tax</td>
                            <td className="py-2 px-3 text-right text-rose-600 font-medium">{col.tax}</td>
                          </tr>
                          <tr className="border-b border-gray-100 bg-white">
                            <td className="py-2 px-3 text-gray-500">National Insurance</td>
                            <td className="py-2 px-3 text-right text-rose-600 font-medium">{col.ni}</td>
                          </tr>
                          <tr className="bg-primary/5 border-t-2 border-primary/20">
                            <td className="py-2.5 px-3 font-semibold text-gray-800">Net Annual Take-Home</td>
                            <td className="py-2.5 px-3 text-right font-bold text-emerald-700">{col.net}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5 text-right">{col.monthly}/mo net income</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Monthly Cashflow — Sell & Split */}
          <section>
            <ReportBand title="3. Monthly Cashflow — Sell & Split (Scenario 1)" accent="#2563EB" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="rounded-lg p-3 mx-5 mt-5 mb-3" style={{ background: "#2563EB18", borderLeft: "3px solid #2563EB" }}>
                <p className="text-xs text-gray-600">Under this scenario, both parties sell the property and split proceeds equally. Neither retains a mortgage — both are assumed to rent separately.</p>
              </div>
              <div className="px-5 pb-5">
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Party A — Monthly",
                      rows: [
                        { label: "Net Monthly Income", value: "£6,518" },
                        { label: "Child Maintenance (payable)", value: "(£412)" },
                        { label: "Estimated Rent", value: "(£1,650)" },
                        { label: "Living Costs (estimated)", value: "(£1,800)" },
                        { label: "Monthly Surplus", value: "+£2,656", green: true, bold: true },
                      ],
                    },
                    {
                      label: "Party B — Monthly",
                      rows: [
                        { label: "Net Monthly Income", value: "£3,690" },
                        { label: "Child Maintenance (received)", value: "+£412", green: true },
                        { label: "Estimated Rent", value: "(£1,650)" },
                        { label: "Living Costs (estimated)", value: "(£1,800)" },
                        { label: "Monthly Surplus", value: "+£652", green: true, bold: true },
                      ],
                    },
                  ].map(col => (
                    <div key={col.label}>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{col.label}</p>
                      {col.rows.map(r => (
                        <Row
                          key={r.label}
                          label={r.label}
                          value={r.value}
                          bold={r.bold}
                          red={r.value.startsWith("(")}
                          green={r.green && !r.value.startsWith("(")}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-800">
                  Both parties maintain a monthly surplus under Sell & Split. Party A's higher income produces a significantly stronger cash position (£2,656/mo vs £652/mo). Party B's surplus, while positive, leaves limited buffer after rent and living costs.
                </div>
              </div>
            </div>
          </section>

          {/* 4. Scenario Comparison */}
          <section>
            <ReportBand title="4. Settlement Scenario Comparison" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-500 mb-4">
                Asset split 50% / 50%. Pension split 50% / 50%. Sale costs estimated at 2% of property value. Mortgage: 4.5% p.a. / 25-year term (monthly repayment ≈ £3,280). Monthly cashflows assume £1,650/mo rent and £1,800/mo living costs per party where applicable.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[540px]">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 rounded-tl">Metric</th>
                      {[
                        { label: "Sell & Split", color: "#2563EB" },
                        { label: "A Keeps Home", color: "#10B981" },
                        { label: "B Keeps Home", color: "#8B5CF6" },
                        { label: "Deferred Sale", color: "#F59E0B" },
                      ].map(sc => (
                        <th key={sc.label} className="text-right py-2 px-2 text-[10px] font-bold text-white" style={{ background: sc.color }}>
                          {sc.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Liquid Capital — A",     values: ["£89,750",  "£18,250",  "£89,750",  "£54,000"] },
                      { label: "Liquid Capital — B",     values: ["£89,750",  "£89,750",  "£18,250",  "£54,000"] },
                      { label: "Pension (CETV) — A",     values: ["£30,000",  "£30,000",  "£30,000",  "£30,000"] },
                      { label: "Pension (CETV) — B",     values: ["£30,000",  "£30,000",  "£30,000",  "£30,000"] },
                      { label: "Total Net Position — A", values: ["£119,750", "£133,250†","£119,750", "£140,000‡"], bold: true },
                      { label: "Total Net Position — B", values: ["£119,750", "£119,750", "£133,250†","£140,000‡"], bold: true },
                      { label: "Monthly Mortgage",       values: ["None",     "£3,280 (A)","£3,280 (B)","£1,640 each"] },
                      { label: "Monthly Surplus — A",    values: ["+£2,656",  "+£1,026",  "+£2,656",  "+£2,666"], green: true },
                      { label: "Monthly Surplus — B",    values: ["+£652",    "+£652",    "(£978)",   "+£662"],   mixed: true },
                      { label: "CRI Score — A",          values: ["78/100",   "52/100",   "82/100",   "71/100"] },
                      { label: "CRI Score — B",          values: ["63/100",   "71/100",   "22/100",   "54/100"] },
                      { label: "10-yr Runway — A",       values: ["Sustained","Sustained","Sustained","Sustained"] },
                      { label: "10-yr Runway — B",       values: ["Sustained","Sustained","Yr 2 est.","Sustained"] },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 ${row.bold ? "bg-gray-50" : i % 2 === 0 ? "" : "bg-gray-50/40"}`}>
                        <td className={`py-1.5 px-2 text-gray-600 ${row.bold ? "font-semibold" : ""}`}>{row.label}</td>
                        {row.values.map((v, vi) => (
                          <td key={vi} className={`py-1.5 px-2 text-right tabular-nums ${row.bold ? "font-semibold" : ""} ${
                            row.green ? "text-emerald-700" :
                            row.mixed ? (v.startsWith("(") ? "text-rose-600" : "text-emerald-700") :
                            v.includes("Yr") ? "text-amber-600" :
                            v === "Sustained" ? "text-emerald-600" :
                            ""
                          }`}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-gray-400 mt-3">
                † Includes £85,000 gross home equity (property value minus mortgage balance, before sale). ‡ Includes estimated deferred equity of ~£56,000 each after 3-year Mesher Order (2% annual growth assumed).
              </p>
              <div className="grid sm:grid-cols-4 gap-2 mt-4">
                {[
                  { label: "Sell & Split",  tag: "Most balanced",   color: "bg-blue-50 text-blue-700 border-blue-200" },
                  { label: "A Keeps Home",  tag: "A: low capital",   color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                  { label: "B Keeps Home",  tag: "B: monthly deficit",color: "bg-violet-50 text-violet-700 border-violet-200" },
                  { label: "Deferred Sale", tag: "Compromise",       color: "bg-amber-50 text-amber-700 border-amber-200" },
                ].map(sc => (
                  <div key={sc.label} className={`text-center p-2.5 rounded-lg border text-[11px] font-semibold ${sc.color}`}>
                    {sc.label}<br /><span className="font-normal opacity-80">{sc.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Scenario Deep-Dive: A Keeps Home */}
          <section>
            <ReportBand title="5. A Keeps Home — Full Detail" accent="#10B981" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">
              <div className="rounded-lg p-3" style={{ background: "#10B98118", borderLeft: "3px solid #10B981" }}>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "A Liquid Capital", value: "£18,250" },
                    { label: "B Liquid Capital", value: "£89,750" },
                    { label: "A CRI Score",       value: "52/100" },
                    { label: "B CRI Score",       value: "71/100" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-bold text-gray-800 tabular-nums">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Executive Summary</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  In this scenario, Party A retains the family home and buys out Party B's 50% equity share (£35,750). After funding the buyout from their share of liquid assets, Party A is left with £18,250 in cash — approximately 2.8 months of net income. Party B receives £89,750 in liquid capital. The monthly mortgage of approximately £3,280 represents 50% of Party A's net monthly income. While Party A maintains a positive monthly surplus of £1,026, the combination of low liquid capital and high mortgage-to-income ratio creates meaningful financial pressure. The model indicates the mortgage balance (£590,000) slightly exceeds Party A's estimated solo borrowing capacity (4.5× gross income = £567,000), which may present a challenge when applying to transfer the mortgage into sole name.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Cashflow Resilience Indicator (CRI) — Illustrative</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    {
                      label: "Party A", score: 52, color: "#F59E0B",
                      drivers: [
                        { label: "Mortgage-to-net-income ratio",   value: "50% (£3,280 of £6,518)", status: "warn" },
                        { label: "Liquid capital post-settlement", value: "Low (£18,250 = 2.8mo net)", status: "warn" },
                        { label: "Monthly surplus",                value: "+£1,026/mo",              status: "pass" },
                        { label: "10-year runway",                 value: "Sustained",               status: "pass" },
                      ],
                    },
                    {
                      label: "Party B", score: 71, color: "#10B981",
                      drivers: [
                        { label: "Housing cost (renting)",         value: "Manageable",              status: "pass" },
                        { label: "Liquid capital post-settlement", value: "Strong (£89,750)",         status: "pass" },
                        { label: "Monthly surplus",                value: "+£652/mo",                status: "pass" },
                        { label: "10-year runway",                 value: "Sustained",               status: "pass" },
                      ],
                    },
                  ].map(party => (
                    <div key={party.label}>
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-xs text-gray-500 font-medium">{party.label}</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-24 h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${party.score}%`, background: party.color }} />
                          </div>
                          <span className="text-sm font-bold tabular-nums" style={{ color: party.color }}>{party.score}/100</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {party.drivers.map(d => (
                          <div key={d.label} className="flex justify-between text-xs gap-2">
                            <span className="text-gray-500">{d.label}</span>
                            <span className={`font-medium ${d.status === "pass" ? "text-emerald-600" : d.status === "warn" ? "text-amber-600" : "text-rose-600"}`}>{d.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">5-Year Capital Projection (illustrative)</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Party A — projected liquid capital",
                      rows: [
                        { yr: "Start (Year 0)", val: "£18,250" },
                        { yr: "Year 1",         val: "£30,927" },
                        { yr: "Year 2",         val: "£43,858" },
                        { yr: "Year 3",         val: "£57,047" },
                        { yr: "Year 4",         val: "£70,500" },
                        { yr: "Year 5",         val: "£84,222" },
                      ],
                      note: "Capital grows steadily from a low starting base. The minimal initial buffer (£18,250) means an unexpected cost in Year 1 or 2 could place significant pressure on finances.",
                    },
                    {
                      label: "Party B — projected liquid capital",
                      rows: [
                        { yr: "Start (Year 0)", val: "£89,750" },
                        { yr: "Year 1",         val: "£99,369" },
                        { yr: "Year 2",         val: "£109,180" },
                        { yr: "Year 3",         val: "£119,188" },
                        { yr: "Year 4",         val: "£129,396" },
                        { yr: "Year 5",         val: "£139,808" },
                      ],
                      note: "Positive trajectory throughout. Monthly surplus allows for continued capital growth, providing a strong long-term position.",
                    },
                  ].map(party => (
                    <div key={party.label}>
                      <p className="text-[10px] text-gray-400 mb-2">{party.label}</p>
                      <div className="space-y-1">
                        {party.rows.map(r => (
                          <div key={r.yr} className="flex justify-between text-xs border-b border-gray-50 py-0.5">
                            <span className="text-gray-400">{r.yr}</span>
                            <span className="font-semibold tabular-nums text-emerald-700">{r.val}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 italic mt-2">{party.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                <strong>Mortgage affordability note:</strong> Party A's gross income of £126,000 supports an estimated solo borrowing capacity of approximately £567,000 (4.5× income multiple). The outstanding mortgage of £590,000 exceeds this threshold by approximately £23,000. Most lenders would require evidence of a planned capital reduction or demonstrated income growth before approving a sole transfer. A mortgage broker assessment would be strongly recommended before this scenario is agreed.
              </div>
            </div>
          </section>

          {/* Guided Report Summary */}
          <section>
            <div className="bg-gradient-to-r from-[hsl(220_52%_22%)] to-[hsl(220_52%_16%)] rounded-xl px-5 py-4 mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest">Guided Report Summary</h3>
                  <p className="text-[10px] text-white/40 mt-0.5">Plain-English interpretation generated from this scenario's figures</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Confidence: Medium</span>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">

              <div className="border-l-4 border-l-blue-800/40 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Plain-English Overview</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The combined estate is dominated by the family home (£675,000), but the outstanding mortgage of £590,000 — representing an 87% loan-to-value ratio — means the net equity available for division is only £71,500 after estimated sale costs. When combined with liquid savings of £108,000, the total distributable pool is £179,500. The most financially balanced outcome appears to be the Sell and Split scenario, where both parties receive equal capital and maintain positive monthly cashflows. Scenarios involving one party retaining the home introduce significant pressure due to the high mortgage relative to individual incomes.
                </p>
                <p className="text-xs text-gray-400 italic mt-2">Note: This is an illustrative summary based on the figures entered. It is not legal, tax, or financial advice. Please consult qualified professionals before making any decisions.</p>
              </div>

              <div className="border-l-4 border-l-yellow-500/50 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">What Stands Out</p>
                <ul className="space-y-2">
                  {[
                    "The outstanding mortgage of £590,000 on a £675,000 property represents an 87% loan-to-value ratio — leaving a net equity of only £71,500 after estimated sale costs. Both parties start from a significantly weaker capital position than the headline asset value of £843,000 suggests.",
                    "Party A earns more than twice Party B's gross income (£126,000 vs £60,000). This income disparity materially affects each party's ability to sustain housing costs and monthly outgoings after settlement.",
                    "The monthly mortgage repayment of approximately £3,280 represents 50% of Party A's net monthly income (£6,518) and an unaffordable 89% of Party B's (£3,690). Only Party A could plausibly retain the home, and only under financial pressure.",
                    "Party A's estimated solo borrowing capacity (4.5× gross = £567,000) is £23,000 short of the outstanding mortgage balance (£590,000). A sole transfer to Party A's name may require a capital reduction or additional income evidence before lender approval.",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-yellow-500/70 shrink-0 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-l-rose-400/60 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Pressure Points</p>
                <ul className="space-y-2">
                  {[
                    "Under 'B Keeps Home' (Scenario 3), Party B faces an estimated monthly deficit of £978 — meaning outgoings exceed net income by that amount each month. With only £18,250 in liquid capital, the model projects capital depletion within approximately 2 years. This scenario appears financially unsustainable without an additional income source or significant reduction in outgoings.",
                    "Under 'A Keeps Home' (Scenario 2), Party A retains only £18,250 in liquid capital after funding the buyout — approximately 2.8 months of net income. This leaves very limited buffer for unexpected costs, legal fees, or early repayment charges not modelled here.",
                    "The mortgage balance slightly exceeds Party A's standard solo borrowing capacity. Before agreeing any keep-home arrangement, lender affordability would need to be formally assessed. A funding gap or requirement to reduce the outstanding balance before a transfer could affect the viability of this scenario.",
                    "Pension values are included as nominal CETV figures only. Party A holds £42,000 CETV vs Party B's £18,000. The £24,000 difference may warrant review by a pension specialist before any division is agreed — particularly if either pension is a defined benefit (final salary) scheme, where CETVs can understate true value.",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-rose-400 shrink-0 mt-0.5 font-bold">!</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-l-cyan-400/50 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Questions for Professionals</p>
                <div className="space-y-5">
                  {[
                    {
                      icon: Scale, color: "text-primary/60", label: "Solicitor / Mediator",
                      questions: [
                        "Under 'B Keeps Home', Party B faces a projected monthly deficit of £978 and capital depletion within approximately 2 years. Should any negotiated settlement include a minimum capital floor to protect against this outcome, and how might a court weigh this when assessing the fairness of each scenario?",
                        "The income disparity between the parties (£126,000 vs £60,000 gross) is significant. Should spousal maintenance be considered alongside the capital settlement — and if so, what factors typically influence the amount and duration in cases with this income profile?",
                        "Party A's pension CETV of £42,000 is more than double Party B's (£18,000). Would pension sharing or pension offsetting against other assets be more appropriate given the modest overall estate — and would the administrative complexity of a pension sharing order be justified here?",
                        "Are there capital gains tax implications on the ISA or savings assets if transferred between parties as part of the settlement, and how should any such liability be factored into the negotiation?",
                      ],
                    },
                    {
                      icon: Home, color: "text-emerald-600", label: "Mortgage Broker",
                      questions: [
                        "Party A earns £126,000 gross — suggesting a solo borrowing capacity of approximately £567,000 (4.5× income). The outstanding balance is £590,000, which is £23,000 above this threshold. What options exist to bring the mortgage within a standard lending multiple — for example, applying a lump sum from settlement proceeds before transfer?",
                        "Party B earns £60,000 gross, suggesting a solo capacity of approximately £270,000 — far below the £590,000 outstanding balance. If the property is sold and Party B receives £89,750 in capital (Scenario 1), what would that support in terms of an independent purchase, and at what property value and loan-to-value?",
                        "Does the existing mortgage carry an early repayment charge, and if so, how should this be factored into the net equity figure before any settlement is finalised?",
                        "If Party A retains the home and applies to transfer the mortgage into their sole name, what documentation would typically be required — and how long does a consent to transfer process usually take?",
                      ],
                    },
                    {
                      icon: PiggyBank, color: "text-violet-600", label: "Pension Expert",
                      questions: [
                        "The CETVs entered are £42,000 (Party A) and £18,000 (Party B). Are these figures recent — typically within the last 3 months — and do they represent the full actuarial value? If either pension is a defined benefit (final salary) scheme, the CETV may significantly understate the true long-term benefit.",
                        "Given the £24,000 gap in pension values, would pension offsetting (using other assets to compensate Party B for the difference) or a pension sharing order produce a more practical and tax-efficient outcome in this case?",
                        "Should either party request a formal actuarial report before any pension element of the settlement is agreed?",
                      ],
                    },
                  ].map(g => (
                    <div key={g.label}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <g.icon className={`w-3.5 h-3.5 ${g.color}`} />
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{g.label}</p>
                      </div>
                      <ol className="space-y-2">
                        {g.questions.map((q, qi) => (
                          <li key={qi} className="flex gap-2.5 text-sm text-gray-700">
                            <span className="text-primary/40 shrink-0 font-semibold tabular-nums">{qi + 1}.</span>
                            <span className="leading-relaxed">{q}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-l-amber-400/60 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Missing Information & Model Confidence</p>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-amber-400 text-amber-700 bg-amber-50 inline-block mb-2">Confidence: Medium</span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This sample model has medium confidence. Core income, property equity, liquid savings, and pension CETVs are included. However, the following are not modelled and would affect the reliability of results: transaction costs beyond the 2% sale cost estimate (legal fees, stamp duty on a new purchase, moving costs, early repayment charges), childcare or other specific regular outgoings, and any actuarial pension assessment. Adding these would move confidence to High. The pension CETV figures are nominal values only — pension type, scheme rules, and normal retirement age are not assessed in this model.
                </p>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic mt-3">
              This guided summary is illustrative only. It is not legal, tax, or financial advice. Always consult qualified professionals before making financial decisions.
            </p>
          </section>

          {/* Assumptions */}
          <section>
            <ReportBand title="Assumptions & Methodology" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0.5">
                {[
                  ["Asset Settlement Ratio",       "50% / 50%"],
                  ["Pension Settlement Ratio",      "50% / 50%"],
                  ["Mortgage Interest Rate",        "4.5% p.a."],
                  ["Mortgage Term",                 "25 years remaining"],
                  ["Monthly Repayment (£590k)",     "≈ £3,280/mo"],
                  ["Projection Period",             "10 years"],
                  ["Inflation / Growth Rate",       "2.0% p.a."],
                  ["Tax Model",                     "UK 2026/27 (HMRC)"],
                  ["Sale Costs Estimate",           "2% of property value"],
                  ["Income Multiple (affordability)","4.5× gross income"],
                  ["Deferred Sale Growth Period",   "3 years (Mesher Order)"],
                  ["Child Maintenance",             "CMS 2-child rate applied"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500 text-xs">{label}</span>
                    <span className="text-gray-800 text-xs font-medium tabular-nums">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 italic mt-4">
                This sample uses fictional figures for product preview only. Figures are for illustrative modelling — not legal, financial, tax, or mortgage advice.
              </p>
            </div>
          </section>

        </div>

        {/* Sticky CTA footer */}
        <div className="sticky bottom-0 border-t border-gray-100 bg-white/97 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Ready to model your actual figures?</p>
            <p className="text-xs text-gray-500">Your real report uses your numbers, not these fictional ones. Free to start — no sign-up needed.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={onClose} data-testid="button-close-modal-footer">
              Close preview
            </Button>
            <Button
              onClick={handleStart}
              className="bg-gold hover:bg-gold/90 text-white border-0 shadow-md shadow-gold/20"
              data-testid="button-start-from-modal"
            >
              Start my report — free <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
