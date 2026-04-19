"use client";
import { AgentSummary } from "../types/event";
import { AlertCircle, Target, Navigation2 } from "lucide-react";
import clsx from "clsx";

export function SummaryPanel({ summary }: { summary: AgentSummary | null }) {
  if (!summary) return null;

  return (
    <div className="p-6 h-full flex flex-col bg-gradient-to-b from-transparent to-[#030712]/50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" /> Morning Briefing
        </h3>
        <div className={clsx(
            "px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl backdrop-blur-md border",
            summary.riskLevel === "High" ? "bg-red-500/20 text-red-300 border-red-500/30" :
            summary.riskLevel === "Medium" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" :
            "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
        )}>
          {summary.riskLevel === "High" && <AlertCircle className="w-3 h-3" />}
          {summary.riskLevel === "Medium" && <AlertCircle className="w-3 h-3" />}
          {summary.riskLevel === "Low" && <AlertCircle className="w-3 h-3" />}
          {summary.riskLevel} Risk
        </div>
      </div>

      <p className="text-slate-200 text-[15px] leading-relaxed mb-6 font-medium">
        {summary.summary}
      </p>

      {summary.followUp && summary.followUp.length > 0 && (
        <div className="mt-8 space-y-3">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Navigation2 className="w-3.5 h-3.5 text-indigo-400" /> Recommended Actions
          </h4>
          <div className="flex flex-col gap-2">
            {summary.followUp.map((item, i) => (
              <button 
                key={i} 
                onClick={() => alert(`Initiating action: ${item}\n\n(A real OpsLens agent would perform this tool call recursively or dispatch a security team)`)}
                className="flex text-left gap-3 text-sm text-slate-300 bg-indigo-950/20 hover:bg-indigo-500/20 transition-colors p-3 rounded-lg border border-indigo-900/30 hover:border-indigo-400/50 shadow-inner group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)] group-hover:scale-150 transition-transform" />
                <span className="font-medium group-hover:text-indigo-200 transition-colors">{item}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
