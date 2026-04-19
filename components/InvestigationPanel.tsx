"use client";
import { InvestigationStep, AgentSummary } from "../types/event";
import { Search, PenTool, CheckCircle2, Loader2, Link2 } from "lucide-react";
import { motion } from "framer-motion";

export function InvestigationPanel({ summary, isPending }: { summary: AgentSummary | null, isPending: boolean }) {
  if (isPending) {
    return (
      <div className="flex flex-col gap-6 h-full p-6 items-center justify-center text-slate-400">
        <motion.div 
           animate={{ rotate: 360 }} 
           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
           className="relative"
        >
           <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full blur-sm" />
           <Loader2 className="w-10 h-10 text-indigo-400" />
        </motion.div>
        <div className="text-center space-y-2">
          <h3 className="font-bold text-lg text-slate-200 tracking-tight">AI Connecting the Dots</h3>
          <p className="text-sm">Synthesizing available streams and tool outputs...</p>
        </div>
      </div>
    );
  }

  if (!summary || !summary.steps) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-slate-500/50 p-6 text-center">
        <Search className="w-12 h-12 mb-3 stroke-[1.5] text-emerald-500/30 animate-pulse" />
        <p className="text-sm font-medium mb-4 text-emerald-100/50">
          OpsLens 6:10 Assistant is ready.<br/>
          Click <strong>INITIATE SCAN</strong> to analyze timeline events.
        </p>
        <div className="text-[10px] text-slate-600 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-slate-800/50">
          System automatically processes context &amp; location data.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 ring-1 ring-indigo-500/20">
           <Search className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300">Live Synthesis Log</h3>
      </div>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[15px] before:h-full before:w-[2px] before:bg-gradient-to-b before:from-indigo-900/50 before:via-slate-800 before:to-transparent">
        {summary.steps.map((step, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
            key={idx} 
            className="relative flex gap-6"
          >
            <div className="w-8 h-8 rounded-full bg-[#030712] border border-slate-700 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-slate-400 z-10 shrink-0 font-mono text-xs">
              <span className="text-[10px] text-slate-500 mr-0.5">S</span>{idx + 1}
            </div>
            
            <div className="flex-1 space-y-3 pt-1 pb-2">
              <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-[95%]">
                {step.thought}
              </p>
              
              {step.tool && step.tool !== "null" && (
                <div className="mt-4 flex flex-col gap-2 bg-[#030712]/50 p-3 rounded-xl border border-slate-800/80 shadow-inner">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-500/80">
                    <Link2 className="w-3 h-3" /> Tool Call Initiated
                  </div>
                  <div className="text-xs font-mono text-emerald-400 px-1">
                    &gt; {step.tool}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 px-1 truncate">
                    Args: {JSON.stringify(step.input)}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: summary.steps.length * 0.15 }}
           className="relative flex items-center gap-4 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl text-indigo-300 ml-8 mt-4 shadow-[0_0_20px_rgba(99,102,241,0.1)] backdrop-blur-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
          <span className="text-sm font-semibold tracking-wide">Analysis Concluded Successfully</span>
        </motion.div>
      </div>
    </div>
  );
}
