import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { scrollTop } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  X, ArrowRight, AlertTriangle, TrendingUp, Sparkles,
  BookOpen, AlertCircle, FileSearch, Scale, Home, PiggyBank,
  Check,
} from "lucide-react";

interface ReportPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

function SampleBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
      Sample report — fictional example
    </div>
  );
}

function ReportBand({ title, accent = "bg-primary" }: { title: string; accent?: string }) {
  return (
    <div className={`${accent} px-5 py-2.5 rounded-lg mb-4`}>
      <h3 className="text-xs font-bold text-white uppercase tracking-widest">{title}</h3>
    </div>
  );
}

function Row({ label, value, sub, bold, red }: { label: string; value: string; sub?: string; bold?: boolean; red?: boolean }) {
  return (
    <div className={`flex items-start justify-between gap-4 py-1.5 border-b border-gray-100 last:border-0 ${bold ? "font-semibold" : ""}`}>
      <span className="text-sm text-gray-600 flex-1">{label}{sub && <span className="text-xs text-gray-400 ml-1">({sub})</span>}</span>
      <span className={`text-sm tabular-nums shrink-0 ${bold ? "text-gray-900" : red ? "text-red-600" : "text-gray-800"}`}>{value}</span>
    </div>
  );
}

function ScenarioTag({ label, color, textColor }: { label: string; color: string; textColor: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${color} ${textColor}`}>{label}</span>
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
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden" data-testid="modal-sample-report">
        {/* ── Sticky close bar ── */}
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

        {/* ── Report body ── */}
        <div className="px-6 py-8 space-y-8">

          {/* Cover */}
          <div className="bg-primary rounded-xl px-6 py-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">DivorceCalculatorUK</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Financial Modelling</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Generated</p>
                <p className="text-xs text-white/70 font-medium">April 2026</p>
              </div>
            </div>
            <div className="border-t border-white/15 pt-4">
              <h1 className="text-2xl font-bold text-white tracking-tight">Divorce Financial Report</h1>
              <p className="text-sm text-white/55 mt-1">Financial modelling and guided summary · England & Wales</p>
              <p className="text-xs text-amber-300/80 mt-3 italic">
                Sample report — fictional example. Illustrative modelling only. Not legal, tax or financial advice.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg text-xs text-amber-900 leading-relaxed">
            <p className="font-semibold text-amber-800 mb-1">IMPORTANT — PLEASE READ</p>
            <p>
              This sample report uses entirely fictional figures for product illustration purposes only. It does not constitute legal, tax, or financial advice. All figures are illustrative estimates. Independent professional review is recommended before making any financial decisions relating to separation or divorce.
            </p>
          </div>

          {/* Financial Snapshot */}
          <section>
            <ReportBand title="1. Financial Position Summary" />
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Assets</p>
                <Row label="Family Home" value="£675,000" sub="primary residence" />
                <Row label="Party A Pension (CETV)" value="£42,000" />
                <Row label="Party B Pension (CETV)" value="£18,000" />
                <Row label="Savings & Investments" value="£108,000" />
                <Row label="Total Assets" value="£843,000" bold />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Liabilities</p>
                <Row label="Outstanding Mortgage" value="(£590,000)" red />
                <Row label="Total Liabilities" value="(£590,000)" bold red />
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <Row label="Combined Net Worth" value="£253,000" bold />
                  <Row label="Net Property Equity (after sale costs)" value="£64,750" sub="est. 3% costs" />
                  <Row label="Combined Liquid Pool" value="£172,750" sub="equity + savings" />
                </div>
              </div>
            </div>
          </section>

          {/* Income Summary */}
          <section>
            <ReportBand title="2. Income & Tax Summary" />
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { label: "Party A", gross: "£126,000", allowance: "£0 (tapered)", tax: "(£40,232)", ni: "(£7,548)", net: "£78,220" },
                { label: "Party B", gross: "£60,000", allowance: "£12,570", tax: "(£11,432)", ni: "(£4,284)", net: "£44,284" },
              ].map(col => (
                <div key={col.label}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{col.label}</p>
                  <Row label="Gross Annual Income" value={col.gross} />
                  <Row label="Personal Allowance" value={col.allowance} />
                  <Row label="Income Tax" value={col.tax} red />
                  <Row label="National Insurance" value={col.ni} red />
                  <Row label="Net Annual Take-Home" value={col.net} bold />
                  <p className="text-[10px] text-gray-400 mt-1">{col.net === "£78,220" ? "≈ £6,518/mo net" : "≈ £3,690/mo net"}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scenario Comparison */}
          <section>
            <ReportBand title="4. Settlement Scenario Comparison" />
            <p className="text-xs text-gray-500 mb-3">Asset split: 50% / 50%. Pension split: 50% / 50%.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[480px]">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-tl-md">Metric</th>
                    {[
                      { label: "Sell & Split", color: "#2563EB", tag: "Balanced" },
                      { label: "A Keeps Home", color: "#10B981", tag: "Moderate pressure" },
                      { label: "B Keeps Home", color: "#8B5CF6", tag: "High pressure" },
                      { label: "Deferred Sale", color: "#F59E0B", tag: "Complex" },
                    ].map(sc => (
                      <th key={sc.label} className="text-right py-2 px-2 text-[10px] font-bold text-white rounded-t-sm" style={{ background: sc.color }}>
                        {sc.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Liquid Capital — Party A", values: ["£86,375", "£29,375", "£119,375", "£76,375"] },
                    { label: "Liquid Capital — Party B", values: ["£86,375", "£143,375", "£53,375", "£96,375"] },
                    { label: "Pension — Party A (CETV)", values: ["£30,000", "£30,000", "£30,000", "£30,000"] },
                    { label: "Pension — Party B (CETV)", values: ["£30,000", "£30,000", "£30,000", "£30,000"] },
                    { label: "Total Net Position — Party A", values: ["£116,375", "£59,375", "£149,375", "£106,375"], bold: true },
                    { label: "Total Net Position — Party B", values: ["£116,375", "£173,375", "£83,375", "£126,375"], bold: true },
                    { label: "Monthly Mortgage — Party A", values: ["—", "£2,941", "—", "£1,470"] },
                    { label: "Monthly Mortgage — Party B", values: ["—", "—", "£2,941", "£1,470"] },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-gray-100 ${row.bold ? "bg-gray-50 font-semibold" : ""}`}>
                      <td className="py-1.5 px-2 text-gray-600">{row.label}</td>
                      {row.values.map((v, vi) => (
                        <td key={vi} className="py-1.5 px-2 text-right tabular-nums">{v}</td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 px-2 text-gray-600">5-yr Reserves — Party A</td>
                    <td className="py-1.5 px-2 text-right text-green-600 font-medium">Sustained</td>
                    <td className="py-1.5 px-2 text-right text-amber-600 font-medium">Yr 3 est.</td>
                    <td className="py-1.5 px-2 text-right text-green-600 font-medium">Sustained</td>
                    <td className="py-1.5 px-2 text-right text-green-600 font-medium">Sustained</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 text-gray-600">5-yr Reserves — Party B</td>
                    <td className="py-1.5 px-2 text-right text-green-600 font-medium">Sustained</td>
                    <td className="py-1.5 px-2 text-right text-green-600 font-medium">Sustained</td>
                    <td className="py-1.5 px-2 text-right text-amber-600 font-medium">Yr 2 est.</td>
                    <td className="py-1.5 px-2 text-right text-green-600 font-medium">Sustained</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-4 gap-2 mt-4">
              {[
                { label: "Sell & Split", tag: "Balanced", color: "bg-blue-50 text-blue-700 border-blue-200" },
                { label: "A Keeps Home", tag: "Moderate pressure", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { label: "B Keeps Home", tag: "High pressure", color: "bg-violet-50 text-violet-700 border-violet-200" },
                { label: "Deferred Sale", tag: "Complex", color: "bg-amber-50 text-amber-700 border-amber-200" },
              ].map(sc => (
                <div key={sc.label} className={`text-center p-2 rounded-lg border text-[11px] font-semibold ${sc.color}`}>
                  {sc.label}<br /><span className="font-normal opacity-80">{sc.tag}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Guided Report Summary */}
          <section>
            <div className="bg-gradient-to-r from-primary to-[hsl(220_52%_28%)] px-5 py-3 rounded-lg mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gold" />
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Guided Report Summary</h3>
              </div>
              <span className="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded-full">Model confidence: Medium</span>
            </div>

            <div className="space-y-4">
              {/* Overview */}
              <div className="border-l-4 border-primary/40 pl-4 py-1">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary/60" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Plain-English Overview</p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This sample model shows that most of the household wealth is tied up in the family home. The combined net position of £253,000 is modest relative to the total asset value, because the outstanding mortgage of £590,000 consumes a large portion of the property's value. The main question for any settlement is whether either party could afford to retain the property while maintaining enough monthly cashflow and liquid capital.
                </p>
                <p className="text-xs text-gray-400 italic mt-2">Note: This is an illustrative summary based on the figures entered. It is not legal, tax, or financial advice. Please consult qualified professionals before making any decisions.</p>
              </div>

              {/* What stands out */}
              <div className="border-l-4 border-gold/50 pl-4 py-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-gold/70" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What Stands Out</p>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "The family home represents 80% of total assets — it will drive the core negotiation.",
                    "Party A earns more than twice Party B's gross income (£126,000 vs £60,000), which may affect post-settlement sustainability in some scenarios.",
                    "Retaining the property creates a monthly mortgage obligation of approximately £2,941 — significant relative to both parties' net income.",
                    "Pension values are included, but pension type and drawdown implications are not assessed in this illustrative model.",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-gold/70 shrink-0 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pressure Points */}
              <div className="border-l-4 border-rose-300 pl-4 py-1">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pressure Points</p>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Mortgage affordability: the monthly repayment on the existing mortgage is high relative to each party's net income. A lender would typically expect this to be below 35% of gross income.",
                    "Liquidity after a buyout: the party retaining the home would have reduced liquid capital, which may limit short-term financial flexibility.",
                    "Excluded costs: moving costs, legal fees, potential stamp duty on a new purchase, and early repayment charges are not modelled and could materially affect each scenario's true cost.",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-rose-400 shrink-0 mt-0.5">!</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Questions for Professionals */}
              <div className="border-l-4 border-cyan-300 pl-4 py-1">
                <div className="flex items-center gap-2 mb-3">
                  <FileSearch className="w-4 h-4 text-cyan-500" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Questions for Professionals</p>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      icon: Scale, label: "Solicitor / Mediator", color: "text-primary/60",
                      questions: [
                        "How should the significant income difference between the parties be considered when reviewing settlement options?",
                        "What protections might be appropriate if one party retains the property on a high mortgage?",
                        "Would pension sharing or pension offsetting need further review given the CETV difference between the parties?",
                        "Are there any potential capital gains tax implications on the savings or investment assets?",
                      ],
                    },
                    {
                      icon: Home, label: "Mortgage Broker", color: "text-emerald-600",
                      questions: [
                        "Could either party realistically refinance the existing mortgage in their sole name, given their individual income?",
                        "How would existing personal debts or financial commitments affect borrowing capacity?",
                        "What deposit would be required to purchase a separate property if the family home is sold?",
                      ],
                    },
                    {
                      icon: PiggyBank, label: "Pension Expert", color: "text-violet-600",
                      questions: [
                        "Are the Cash Equivalent Transfer Values (CETV) figures provided sufficient, or should the pension type and benefits be reviewed by a specialist?",
                        "Would a pension sharing order or pension offsetting be more appropriate given the overall asset picture?",
                        "Is an actuarial review recommended before any pension division is agreed?",
                      ],
                    },
                  ].map(g => (
                    <div key={g.label}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <g.icon className={`w-3.5 h-3.5 ${g.color}`} />
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{g.label}</p>
                      </div>
                      <ol className="list-decimal list-inside space-y-1">
                        {g.questions.map((q, qi) => (
                          <li key={qi} className="text-sm text-gray-700 leading-relaxed">{q}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing information */}
              <div className="border-l-4 border-amber-300 pl-4 py-1">
                <div className="flex items-center gap-2 mb-2">
                  <FileSearch className="w-4 h-4 text-amber-500" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Missing Information & Model Confidence</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-400 text-amber-600 bg-amber-50">Model confidence: Medium</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This sample model has medium confidence. Core income, property equity, and pension figures are included. However, transaction costs (stamp duty, legal fees, moving costs), detailed pension analysis, and any maintenance obligations are excluded. Adding these figures would improve reliability. The pension CETV figures are entered as nominal values only — pension type and actuarial factors are not assessed in this model.
                </p>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic mt-4">
              This guided summary is illustrative and generated from the figures entered. It is not legal, tax, or financial advice.
            </p>
          </section>

          {/* Assumptions */}
          <section>
            <ReportBand title="Assumptions & Methodology" />
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
              {[
                ["Asset Settlement Ratio", "50% / 50%"],
                ["Pension Settlement Ratio", "50% / 50%"],
                ["Mortgage Interest Rate", "4.5%"],
                ["Mortgage Term", "25 years"],
                ["Projection Period", "5 years"],
                ["Inflation Rate", "2.5%"],
                ["Tax Model", "UK 2026/27"],
                ["Sale Costs Estimate", "3% of property value"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 text-xs">{label}</span>
                  <span className="text-gray-800 text-xs font-medium tabular-nums">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 italic mt-3">
              This sample is fictional and for product preview only. The tool provides illustrative modelling, not legal, financial, tax or mortgage advice.
            </p>
          </section>

        </div>

        {/* ── Sticky CTA footer ── */}
        <div className="sticky bottom-0 border-t border-gray-100 bg-white/97 backdrop-blur px-6 py-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Ready to model your own figures?</p>
            <p className="text-xs text-gray-500">Free to start. No sign-up. Yours in under 5 minutes.</p>
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
