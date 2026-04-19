"use client";
import { Check, Edit2, X, Send } from "lucide-react";
import { useState } from "react";

export function ReviewControls({
  onReject,
  onRefine,
  onApprove,
  isInvestigating,
}: {
  onReject: () => void;
  onRefine: (instruction: string) => void;
  onApprove: () => void;
  isInvestigating?: boolean;
}) {
  const [isRefining, setIsRefining] = useState(false);
  const [instruction, setInstruction] = useState("");

  if (isRefining) {
    return (
      <div className="flex flex-col gap-3 pt-4 justify-end mt-auto border-t border-slate-800">
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="E.g., Check the drone logs for area 51 again..."
          className="w-full bg-[#030712]/50 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 resize-none h-20"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsRefining(false)}
            className="px-4 py-2 hover:bg-slate-800 text-slate-400 rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!instruction.trim() || isInvestigating}
            onClick={() => {
              onRefine(instruction);
              setIsRefining(false);
              setInstruction("");
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" /> Send Instruction
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 pt-4 justify-end mt-auto border-t border-slate-800">
      <button
        onClick={onReject}
        disabled={isInvestigating}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors border border-slate-700 disabled:opacity-50"
      >
        <X className="w-4 h-4" /> Reject
      </button>
      <button
        onClick={() => setIsRefining(true)}
        disabled={isInvestigating}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors border border-slate-700 disabled:opacity-50"
      >
        <Edit2 className="w-4 h-4" /> Refine
      </button>
      <button
        onClick={onApprove}
        disabled={isInvestigating}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-indigo-900/20 disabled:opacity-50"
      >
        <Check className="w-4 h-4" /> Approve Briefing
      </button>
    </div>
  );
}
