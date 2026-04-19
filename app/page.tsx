"use client";

import { useEffect, useState, useRef } from "react";
import { Event, AgentSummary } from "../types/event";
import { Timeline } from "../components/Timeline";
import MapView from "../components/MapView";
import { InvestigationPanel } from "../components/InvestigationPanel";
import { SummaryPanel } from "../components/SummaryPanel";
import { ReviewControls } from "../components/ReviewControls";
import { ModelSelector } from "../components/ModelSelector";
import { Activity, Beaker, Zap, Play, ShieldCheck } from "lucide-react";
import Script from "next/script";

// Add window type extension for Turnstile
declare global {
  interface Window {
    turnstile: any;
  }
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [summary, setSummary] = useState<AgentSummary | null>(null);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // AI State
  const [provider, setProvider] = useState<string>("nvidia");
  const [model, setModel] = useState<string>("meta/llama-3.1-405b-instruct");
  const hasTriggeredRef = useRef(false);

  // Turnstile Vanilla Context
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const isHuman = !!turnstileToken;

  useEffect(() => {
    async function fetchEventsAndTrigger() {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data.events);
    }
    fetchEventsAndTrigger();
  }, []);

  const triggerInvestigation = async (
    evtData: Event[],
    prov: string,
    mod: string,
    instruction?: string,
  ) => {
    setIsInvestigating(true);
    setSummary(null);
    try {
      const bodyPayload: any = {
        events: evtData,
        providerId: prov,
        modelId: mod,
        cfToken: turnstileToken, // Send token to backend for optional strict verification
      };
      if (instruction) {
        bodyPayload.userInstruction = instruction;
      }

      const invRes = await fetch("/api/investigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });
      const invData = await invRes.json();
      setSummary(invData);
    } catch (err) {
      console.error("Investigation failed", err);
    } finally {
      setIsInvestigating(false);
    }
  };

  const handleManualTrigger = () => {
    triggerInvestigation(events, provider, model);
  };

  const handleReject = () => {
    if (
      confirm(
        "Are you sure you want to reject this investigation and clear the summary?",
      )
    ) {
      setSummary(null);
    }
  };

  const handleRefine = (instruction: string) => {
    triggerInvestigation(events, provider, model, instruction);
  };

  const handleApprove = () => {
    alert(
      "Briefing approved successfully! Further workflow steps would go here.",
    );
  };

  return (
    <div className="relative flex h-screen w-full bg-[#050907] text-slate-300 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Official Cloudflare Turnstile Initialization via explicit render */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.turnstile && turnstileContainerRef.current) {
            window.turnstile.render(turnstileContainerRef.current, {
              sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY,
              callback: (token: string) => setTurnstileToken(token),
              theme: "dark",
            });
          }
        }}
      />

      {/* Tactical Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Radar concentric rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-emerald-900/20 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-emerald-900/10 rounded-full" />
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen translate-x-1/3 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-teal-900/10 blur-[100px] rounded-full mix-blend-screen -translate-x-1/2 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
        {/* CRT Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 pointer-events-none opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full h-full p-2 lg:p-4 gap-4 overflow-y-auto lg:overflow-hidden">
        {/* Left Bento Column (Timeline) */}
        <aside className="w-full lg:w-80 flex flex-col gap-4 h-[50vh] lg:h-full shrink-0">
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-emerald-900/50 p-6 shadow-2xl flex items-center justify-between shadow-emerald-900/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 blur-md opacity-30 rounded-full" />
                <div className="relative p-2.5 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-xl shadow-lg ring-1 ring-white/10">
                  <Activity className="w-6 h-6 text-black" />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-xl text-white tracking-tight uppercase">
                  Ridgeway Ops
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
                  6:10 Assistant
                </p>
              </div>
            </div>

            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          </div>

          <div className="flex-1 bg-black/60 backdrop-blur-xl rounded-2xl border border-emerald-900/50 p-5 shadow-2xl overflow-hidden flex flex-col relative group shadow-emerald-900/10">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent flex"></div>
            <Timeline
              events={events}
              selectedEventId={selectedEventId}
              onEventClick={setSelectedEventId}
            />
          </div>
        </aside>

        <main className="flex-1 flex flex-col gap-4 h-[60vh] lg:h-full shrink-0 lg:shrink relative z-50">
          <header className="h-auto min-h-[5rem] py-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-emerald-900/50 px-4 lg:px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-2xl shadow-emerald-900/10 relative z-50">
            <div className="flex items-center gap-6">
              <div>
                <h2 className="font-bold text-lg text-emerald-50 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" /> SITE OVERVIEW
                </h2>
                <div
                  suppressHydrationWarning
                  className="text-xs font-mono text-emerald-500/70 mt-1 uppercase"
                >
                  {new Date().toLocaleDateString()} &middot; Ridgeway Site
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full lg:w-auto items-stretch sm:items-center gap-3 bg-black/40 p-2 rounded-xl border border-emerald-900/40 ring-1 ring-white/5 shadow-inner relative z-50">
              {/* Native Turnstile Container */}
              <div
                ref={turnstileContainerRef}
                className="overflow-hidden rounded-lg scale-90 sm:scale-100 origin-left place-self-center pointer-events-auto shrink-0 mr-2"
              />

              <ModelSelector
                selectedProvider={provider}
                setSelectedProvider={setProvider}
                selectedModel={model}
                setSelectedModel={setModel}
              />
              <button
                onClick={handleManualTrigger}
                disabled={isInvestigating || !isHuman}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] active:scale-95 uppercase tracking-wide"
              >
                {isInvestigating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-emerald-100/20 border-t-emerald-100 rounded-full animate-spin" />{" "}
                    ANALYZING...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Play className="fill-white w-3 h-3" /> INITIATE SCAN
                  </span>
                )}
              </button>
            </div>
          </header>

          <div className="flex-1 bg-black/60 backdrop-blur-xl rounded-2xl border border-emerald-900/50 shadow-2xl relative overflow-hidden z-0 shadow-emerald-900/20">
            <div className="absolute inset-0 bg-emerald-500/5 z-10 pointer-events-none" />
            <div className="w-full h-full relative z-0 pointer-events-auto">
              <MapView
                events={events}
                selectedEventId={selectedEventId}
                onEventClick={setSelectedEventId}
              />
            </div>
          </div>
        </main>

        {/* Right Bento Column (AI Synthesis) */}
        <aside className="w-full lg:w-[440px] flex flex-col gap-4 h-auto lg:h-full shrink-0 relative z-10 pb-8 lg:pb-0">
          {!isInvestigating && summary ? (
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-emerald-900/50 shadow-2xl overflow-hidden shrink-0 shadow-emerald-900/10">
              <SummaryPanel summary={summary} />
            </div>
          ) : null}

          <div className="flex-1 bg-black/60 backdrop-blur-xl rounded-2xl border border-emerald-900/50 p-1 shadow-2xl overflow-hidden flex flex-col shadow-emerald-900/10">
            <InvestigationPanel summary={summary} isPending={isInvestigating} />
          </div>

          <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-emerald-900/50 p-4 shadow-2xl shrink-0 shadow-emerald-900/10">
            <ReviewControls
              onReject={handleReject}
              onRefine={handleRefine}
              onApprove={handleApprove}
              isInvestigating={isInvestigating}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
