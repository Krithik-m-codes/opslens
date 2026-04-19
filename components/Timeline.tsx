"use client";
import { Event } from "../types/event";
import { Clock, ShieldAlert, Cpu, Car, BadgeCent } from "lucide-react";

import clsx from "clsx";

export function Timeline({ 
  events, 
  selectedEventId, 
  onEventClick 
}: { 
  events: Event[]; 
  selectedEventId?: string | null; 
  onEventClick?: (id: string) => void;
}) {
  const getIcon = (type: string) => {
    switch (type) {
      case "fence": return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case "drone": return <Cpu className="w-4 h-4 text-blue-400" />;
      case "vehicle": return <Car className="w-4 h-4 text-emerald-400" />;
      case "badge": return <BadgeCent className="w-4 h-4 text-purple-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-2 custom-scrollbar">
      <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-400" /> Overnight Activity
      </h3>
      <div className="flex flex-col space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {events.map((evt, idx) => (
          <div 
            key={evt.id} 
            className={clsx(
              "relative flex items-center gap-4 cursor-pointer transition-all",
              selectedEventId === evt.id ? "scale-[1.02] ml-1" : "hover:ml-1"
            )}
            onClick={() => onEventClick?.(evt.id)}
          >
            <div className={clsx(
              "w-10 h-10 rounded-full border shadow flex items-center justify-center shrink-0 z-10 transition-colors",
              selectedEventId === evt.id 
                ? "bg-slate-700 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.4)]" 
                : "bg-slate-800 border-slate-700 text-slate-300"
            )}>
              {getIcon(evt.type)}
            </div>
            <div className={clsx(
              "flex-1 p-3 rounded-lg border transition-colors",
              selectedEventId === evt.id
                ? "bg-indigo-900/40 border-indigo-500/50 shadow-inner"
                : "bg-slate-800/60 border-slate-700/50 hover:bg-slate-800"
            )}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-slate-200 capitalize text-sm">{evt.type}</span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-slate-400">{evt.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
