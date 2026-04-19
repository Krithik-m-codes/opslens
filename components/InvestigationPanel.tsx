"use client";
import { InvestigationStep, AgentSummary } from "../types/event";
import {
  Search,
  PenTool,
  CheckCircle2,
  Loader2,
  Link2,
  GitMerge,
  Cpu,
  BrainCircuit,
} from "lucide-react";
import { motion } from "framer-motion";

export function InvestigationPanel({
  summary,
  isPending,
}: {
  summary: AgentSummary | null;
  isPending: boolean;
}) {
  if (isPending) {
    return (
      <div className="flex flex-col gap-6 h-full p-6 items-center justify-center text-slate-400">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="relative"
        >
          <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full blur-sm" />
          <BrainCircuit className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        </motion.div>
        <div className="text-center space-y-2">
          <h3 className="font-bold text-lg text-slate-200 tracking-tight">
            AI Agent Analyzing
          </h3>
          <p className="text-sm">
            Synthesizing available streams via MCP toolkits...
          </p>
        </div>
      </div>
    );
  }

  if (!summary || !summary.steps) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-slate-500/50 p-6 text-center">
        <GitMerge className="w-12 h-12 mb-3 stroke-[1.5] text-emerald-500/30 animate-pulse" />
        <p className="text-sm font-medium mb-4 text-emerald-100/50">
          AI Workflow Interface.
          <br />
          Click <strong>INITIATE SCAN</strong> to start the autonomous agent
          loop.
        </p>
        <div className="text-[10px] text-slate-600 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-slate-800/50">
          Agent connects implicitly to spatial &amp; drone tools
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[500px] lg:h-full overflow-y-auto custom-scrollbar p-6 bg-gradient-to-b from-[#0a0f0d] to-[#040806]">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0a0f0d]/90 backdrop-blur-md z-20 py-2 border-b border-emerald-900/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 ring-1 ring-emerald-500/20">
            <GitMerge className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300">
            Agent Workflow
          </h3>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-emerald-500/50 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
          MCP Connected
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[15px] before:h-full before:w-[2px] before:bg-gradient-to-b before:from-emerald-900/50 before:via-slate-800 before:to-transparent">
        {summary.steps.map((step, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
            key={idx}
            className="relative flex gap-6"
          >
            <div className="w-8 h-8 rounded-full bg-[#030712] border border-emerald-700 shadow-[0_0_15px_rgba(52,211,153,0.2)] flex items-center justify-center text-emerald-400 z-10 shrink-0 font-mono text-xs">
              <span className="text-[10px] text-emerald-600/50 mr-0.5">S</span>
              {idx + 1}
            </div>

            <div className="flex-1 space-y-3 pt-1 pb-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1.5">
                  <BrainCircuit className="w-3 h-3" /> Agent Reasoning
                </span>
                <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-[95%]">
                  {step.thought}
                </p>
              </div>

              {step.tool && step.tool !== "null" && (
                <div className="mt-4 flex flex-col gap-2 bg-[#020504] p-3 rounded-xl border border-emerald-900/40 shadow-inner relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 flex">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-500/80 mb-1">
                    <Link2 className="w-3 h-3" /> MCP Tool Execution
                  </div>
                  <div className="text-xs font-mono text-emerald-400 px-1 font-semibold flex items-center gap-2">
                    <span className="text-emerald-600">&gt;</span> {step.tool}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 px-1 truncate bg-black/40 p-1.5 rounded border border-slate-800/50 mt-1">
                    {JSON.stringify(step.input)}
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
          className="relative flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-300 ml-8 mt-4 shadow-[0_0_20px_rgba(52,211,153,0.1)] backdrop-blur-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wide">
              Workflow Execution Complete
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-500/60 mt-0.5">
              Synthesizing human review panel
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
