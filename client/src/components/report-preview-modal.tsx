import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  X, ArrowRight, AlertTriangle, TrendingUp, Sparkles,
  BookOpen, AlertCircle, FileSearch, Scale, Home, PiggyBank,
  Check, ChevronRight,
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

function Row({ label, value, sub, bold, red, green }: { label: string; value: string; sub?: string; bold?: boolean; red?: boolean; green?: boolean }) {
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
                  { label: "Combined Net Worth", value: "£253,000", color: "text-gold" },
                  { label: "Scenarios Modelled", value: "4", color: "text-emerald-300" },
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
                    <Row label="Net Property Equity (est. 3% sale costs)" value="£64,750" />
                    <Row label="Total Liquid Pool (equity + savings)" value="£172,750" bold />
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
                  { label: "Party A", gross: "£126,000", allowance: "£0", note: "(tapered — high income)", tax: "(£40,232)", ni: "(£7,548)", net: "£78,220", monthly: "≈ £6,518/mo" },
                  { label: "Party B", gross: "£60,000", allowance: "£12,570", note: "", tax: "(£11,432)", ni: "(£4,284)", net: "£44,284", monthly: "≈ £3,690/mo" },
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
                            <td className="py-2 px-3 text-right text-gray-600">{col.allowance} <span className="text-[10px] text-gray-400">{col.note}</span></td>
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
                            <td className="py-2.5 px-3 font-semibold text-gray-800">Take-Home Pay (annual)</td>
                            <td className="py-2.5 px-3 text-right font-bold text-emerald-700">{col.net}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5 text-right">{col.monthly} net income</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Monthly Cashflow */}
          <section>
            <ReportBand title="3. Monthly Cashflow — Sell & Split (Scenario 1)" accent="#2563EB" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="rounded-lg p-3 mx-5 mt-5 mb-3" style={{ background: "#2563EB18", borderLeft: "3px solid #2563EB" }}>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "A Starting Position", value: "£86,375" },
                    { label: "B Starting Position", value: "£86,375" },
                    { label: "A FSI Score", value: "72/100" },
                    { label: "B FSI Score", value: "61/100" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-bold text-gray-800 tabular-nums">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Party A — Monthly Cashflow",
                      rows: [
                        { label: "Net Monthly Income", value: "£6,518" },
                        { label: "Child Maintenance (payable)", value: "(£412)" },
                        { label: "Estimated Rent", value: "(£1,650)" },
                        { label: "Living Costs (estimated)", value: "(£1,800)" },
                        { label: "Monthly Surplus / Deficit", value: "+£2,656", green: true, bold: true },
                      ],
                    },
                    {
                      label: "Party B — Monthly Cashflow",
                      rows: [
                        { label: "Net Monthly Income", value: "£3,690" },
                        { label: "Child Maintenance (received)", value: "+£412", green: true },
                        { label: "Estimated Rent", value: "(£1,650)" },
                        { label: "Living Costs (estimated)", value: "(£1,800)" },
                        { label: "Monthly Surplus / Deficit", value: "+£652", green: true, bold: true },
                      ],
                    },
                  ].map(col => (
                    <div key={col.label}>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{col.label}</p>
                      {col.rows.map(r => (
                        <Row key={r.label} label={r.label} value={r.value} bold={r.bold} red={(r.value as string).startsWith("(")} green={r.green} />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-800">
                  Under Scenario 1 (Sell & Split), both parties retain a monthly surplus. Party A's higher income and lower housing costs result in a significantly stronger cash position than Party B.
                </div>
              </div>
            </div>
          </section>

          {/* 4. Scenario Comparison */}
          <section>
            <ReportBand title="4. Settlement Scenario Comparison" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-500 mb-4">Asset split: 50% / 50%. Pension split: 50% / 50%. Figures after estimated sale costs (3%).</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[520px]">
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
                      { label: "Liquid Capital — A",        values: ["£86,375", "£29,375", "£119,375", "£76,375"] },
                      { label: "Liquid Capital — B",        values: ["£86,375", "£143,375", "£53,375",  "£96,375"] },
                      { label: "Pension (CETV) — A",        values: ["£30,000", "£30,000",  "£30,000",  "£30,000"] },
                      { label: "Pension (CETV) — B",        values: ["£30,000", "£30,000",  "£30,000",  "£30,000"] },
                      { label: "Total Net Position — A",    values: ["£116,375", "£59,375", "£149,375", "£106,375"], bold: true },
                      { label: "Total Net Position — B",    values: ["£116,375", "£173,375", "£83,375", "£126,375"], bold: true },
                      { label: "Monthly Mortgage",          values: ["None", "£2,941 (A)", "£2,941 (B)", "£1,470 each"] },
                      { label: "Monthly Surplus — A",       values: ["+£2,656", "+£358", "+£3,908", "+£1,848"], green: true },
                      { label: "Monthly Surplus — B",       values: ["+£652", "+£2,582", "(£599)", "+£1,182"], mixed: true },
                      { label: "FSI Score — A",             values: ["72", "55", "88", "67"] },
                      { label: "FSI Score — B",             values: ["61", "74", "38", "58"] },
                      { label: "5-yr Reserves — A",        values: ["Sustained", "Yr 3 est.", "Sustained", "Sustained"] },
                      { label: "5-yr Reserves — B",        values: ["Sustained", "Sustained", "Yr 2 est.", "Sustained"] },
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
              <div className="grid sm:grid-cols-4 gap-2 mt-5">
                {[
                  { label: "Sell & Split", tag: "Most balanced", color: "bg-blue-50 text-blue-700 border-blue-200" },
                  { label: "A Keeps Home", tag: "A under pressure", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                  { label: "B Keeps Home", tag: "B deficit", color: "bg-violet-50 text-violet-700 border-violet-200" },
                  { label: "Deferred Sale", tag: "Compromise", color: "bg-amber-50 text-amber-700 border-amber-200" },
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
            <ReportBand title="5. A Keeps Home — Detail" accent="#10B981" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">
              <div className="rounded-lg p-3" style={{ background: "#10B98118", borderLeft: "3px solid #10B981" }}>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "A Starting Position", value: "£29,375" },
                    { label: "B Starting Position", value: "£143,375" },
                    { label: "A FSI Score", value: "55/100" },
                    { label: "B FSI Score", value: "74/100" },
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
                  In this scenario, Party A retains the family home and buys out Party B's share. Party A receives £29,375 in liquid capital after funding the buyout, while Party B receives £143,375 in cash. The monthly mortgage repayment of £2,941 represents 45% of Party A's gross income — above typical lending comfort benchmarks. Party A's FSI score of 55/100 indicates moderate financial strain. Party B's position improves significantly given the large cash allocation.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Financial Sustainability Indicator (FSI) — Illustrative</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Party A", score: 55, color: "#F59E0B",
                      drivers: [
                        { label: "Income vs mortgage", value: "Stretched (45% ratio)", status: "warn" },
                        { label: "Liquid capital post-settlement", value: "Low (£29,375)", status: "warn" },
                        { label: "Monthly surplus", value: "+£358/mo", status: "pass" },
                        { label: "5-yr reserve sustainability", value: "Depletes ~Yr 3", status: "fail" },
                      ],
                    },
                    {
                      label: "Party B", score: 74, color: "#10B981",
                      drivers: [
                        { label: "Income vs housing cost", value: "Manageable", status: "pass" },
                        { label: "Liquid capital post-settlement", value: "Strong (£143,375)", status: "pass" },
                        { label: "Monthly surplus", value: "+£2,582/mo", status: "pass" },
                        { label: "5-yr reserve sustainability", value: "Sustained", status: "pass" },
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
                      <div className="space-y-1">
                        {party.drivers.map(d => (
                          <div key={d.label} className="flex justify-between text-xs gap-2">
                            <span className="text-gray-500">{d.label}</span>
                            <span className={d.status === "pass" ? "text-emerald-600 font-medium" : d.status === "warn" ? "text-amber-600 font-medium" : "text-rose-600 font-medium"}>{d.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">5-Year Capital Projection</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Party A", color: "#10B981",
                      rows: [
                        { yr: "Year 1", val: "£19,662" },
                        { yr: "Year 2", val: "£9,623" },
                        { yr: "Year 3", val: "(£719)", red: true },
                        { yr: "Year 4", val: "(£11,384)", red: true },
                        { yr: "Year 5", val: "(£22,376)", red: true },
                      ],
                      note: "Capital depletes around Year 3 unless income increases or outgoings reduce.",
                    },
                    {
                      label: "Party B", color: "#10B981",
                      rows: [
                        { yr: "Year 1", val: "£174,349" },
                        { yr: "Year 2", val: "£205,322" },
                        { yr: "Year 3", val: "£236,295" },
                        { yr: "Year 4", val: "£267,268" },
                        { yr: "Year 5", val: "£298,241" },
                      ],
                      note: "Sustained positive trajectory with monthly surplus invested.",
                    },
                  ].map(party => (
                    <div key={party.label}>
                      <p className="text-[10px] text-gray-400 mb-2">{party.label} — projected liquid capital</p>
                      <div className="space-y-1">
                        {party.rows.map(r => (
                          <div key={r.yr} className="flex justify-between text-xs">
                            <span className="text-gray-400">{r.yr}</span>
                            <span className={`font-semibold tabular-nums ${r.red ? "text-rose-600" : "text-emerald-700"}`}>{r.val}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 italic mt-2">{party.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                <strong>Mortgage affordability note:</strong> Party A's gross income of £126,000 supports an estimated borrowing capacity of approximately £504,000 (4x income multiple). The outstanding mortgage of £590,000 exceeds this benchmark, suggesting that a sole mortgage transfer may face lender resistance without a significant capital reduction or income increase.
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
                  <p className="text-[10px] text-white/40 mt-0.5">Plain-English interpretation of this sample scenario</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Confidence: Medium</span>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">

              <div className="border-l-4 border-l-blue-800/40 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Plain-English Overview</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The combined estate centres on a family home valued at £675,000, carrying an outstanding mortgage of £590,000 — meaning the net equity is relatively modest at around £64,750 after sale costs. When combined with liquid savings, the distributable pool reaches approximately £172,750. The most financially balanced outcome across both parties appears to be a Sell and Split arrangement, where both parties receive a similar capital allocation and maintain positive monthly cashflows. Any arrangement where one party retains the property brings significant financial pressure due to the high mortgage relative to individual incomes.
                </p>
                <p className="text-xs text-gray-400 italic mt-2">This is a sample summary. Your real summary is generated from your own figures, not these fictional ones.</p>
              </div>

              <div className="border-l-4 border-l-yellow-500/50 pl-4 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">What Stands Out</p>
                <ul className="space-y-2">
                  {[
                    "The outstanding mortgage of £590,000 on a £675,000 property (87% LTV) leaves very little equity to negotiate with — both parties start from a weaker financial position than the headline asset values suggest.",
                    "Party A earns more than twice Party B's gross income (£126,000 vs £60,000). This income gap affects how well each party sustains their finances after settlement, particularly under scenarios involving mortgage retention.",
                    "The monthly mortgage repayment of £2,941 is 80% of Party B's net monthly income (£3,690) — making it effectively unaffordable for Party B to retain the property on their current income alone.",
                    "Party A's income of £126,000 suggests a maximum sole borrowing of approximately £504,000 (4x income) — the outstanding balance of £590,000 exceeds this, indicating A may also face lending challenges without a capital injection.",
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
                    "Home retention viability: Neither party's income comfortably supports the current mortgage in sole name. A keep-home scenario likely requires remortgaging with a capital reduction or significant income evidence. Lender assessment would be required.",
                    "Party A's liquidity after a buyout: In the 'A Keeps Home' scenario, Party A retains only £29,375 in liquid capital — providing minimal buffer for emergencies, legal costs, or future capital needs.",
                    "Party B's sustainability in 'B Keeps Home': Party B would face an estimated monthly deficit of £599 under this scenario, with capital reserves depleting within approximately 2 years.",
                    "Pension gap: Party A holds £42,000 CETV vs Party B's £18,000. Depending on the parties' ages and pension types, this difference may warrant actuarial review before any pension offsetting or sharing order is agreed.",
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
                        "Given that the outstanding mortgage (£590,000) exceeds both parties' estimated sole borrowing capacity, how does this affect the viability of a keep-home arrangement — and what conditions might the court consider in a contested settlement?",
                        "The income gap between the parties (£126,000 vs £60,000) is significant. Should a spousal maintenance arrangement be considered alongside the capital settlement, and if so, what factors typically determine the amount and duration?",
                        "Party A's pension CETV (£42,000) is more than twice Party B's (£18,000). Should a pension sharing order be considered to equalise retirement positions, or would pension offsetting against other assets be more appropriate here?",
                        "Are there any implications for capital gains tax on the ISA holdings (£50,000) or other investment assets if transferred between parties as part of a divorce settlement?",
                      ],
                    },
                    {
                      icon: Home, color: "text-emerald-600", label: "Mortgage Broker",
                      questions: [
                        "On a gross income of £126,000, Party A could typically borrow up to approximately £504,000–£567,000 depending on the lender's multiplier. The outstanding balance is £590,000. What options exist to bring the mortgage within an acceptable solo LTV or income multiple — for example, using settlement capital to reduce the balance before transfer?",
                        "Party B's gross income of £60,000 would support solo borrowing of around £240,000–£270,000 — far below the outstanding balance. If Party B wished to rehouse independently after a sale, what deposit would be needed to access a property at, say, £350,000?",
                        "If the property is sold rather than retained, are there likely to be any early repayment charges on the existing mortgage that should be factored into the net equity calculation?",
                      ],
                    },
                    {
                      icon: PiggyBank, color: "text-violet-600", label: "Pension Expert",
                      questions: [
                        "The pension CETVs entered are £42,000 (Party A) and £18,000 (Party B). Are these CETVs recent, and do they reflect the full actuarial value — particularly if either pension is a defined benefit (final salary) scheme?",
                        "Given the relatively modest pension values relative to the overall estate, would pension offsetting (using capital to compensate for the pension difference) or a pension sharing order produce a more tax-efficient and practically manageable outcome?",
                        "Should either party consider seeking an actuarial report before agreeing to any pension-related element of the settlement?",
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
                  This sample model includes core income, property equity, savings, and pension figures. Not included: transaction costs (stamp duty, legal fees, moving costs, ERC on mortgage), detailed monthly budget breakdowns, childcare or other specific outgoings, and actuarial pension analysis. Adding these would improve confidence to High. The pension CETV figures are nominal only — pension type, scheme rules, and normal retirement age are not assessed.
                </p>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic mt-3">
              This guided summary is illustrative. It is not legal, tax, or financial advice. Always consult qualified professionals before making financial decisions.
            </p>
          </section>

          {/* Assumptions */}
          <section>
            <ReportBand title="Assumptions & Methodology" />
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
                {[
                  ["Asset Settlement Ratio", "50% / 50%"],
                  ["Pension Settlement Ratio", "50% / 50%"],
                  ["Mortgage Interest Rate", "4.5% p.a."],
                  ["Mortgage Term", "25 years remaining"],
                  ["Projection Period", "5 years"],
                  ["Inflation Rate", "2.5% p.a."],
                  ["Tax Model", "UK 2026/27 (HMRC bands)"],
                  ["Sale Costs Estimate", "3% of property value"],
                  ["Income Multiples (illustrative)", "4x–4.5x gross income"],
                  ["Child Maintenance", "CMS 2-child rate applied"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500 text-xs">{label}</span>
                    <span className="text-gray-800 text-xs font-medium tabular-nums">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 italic mt-4">
                This sample is fictional and for product preview only. The tool provides illustrative modelling — not legal, financial, tax, or mortgage advice.
              </p>
            </div>
          </section>

        </div>

        {/* Sticky CTA footer */}
        <div className="sticky bottom-0 border-t border-gray-100 bg-white/97 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Ready to model your actual figures?</p>
            <p className="text-xs text-gray-500">Your real report will reflect your numbers — not these fictional ones. Free to start.</p>
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
