import { Check, ChevronDown, Cpu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type AIProvider = {
  id: string;
  name: string;
  models: { id: string; name: string }[];
};

export const providers: AIProvider[] = [
  {
    id: "nvidia",
    name: "NVIDIA NIM",
    models: [
      { id: "meta/llama-3.1-405b-instruct", name: "Llama 3.1 405B" },
      { id: "meta/llama-3.1-70b-instruct", name: "Llama 3.1 70B" },
      { id: "mistralai/mixtral-8x22b-instruct-v0.1", name: "Mixtral 8x22B" },
    ],
  },
  {
    id: "google",
    name: "Google Gemini",
    models: [
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
    ],
  },
];

export function ModelSelector({
  selectedProvider,
  setSelectedProvider,
  selectedModel,
  setSelectedModel,
}: {
  selectedProvider: string;
  setSelectedProvider: (p: string) => void;
  selectedModel: string;
  setSelectedModel: (m: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const currentProviderName = providers.find(
    (p) => p.id === selectedProvider,
  )?.name;
  const currentModelName = providers
    .find((p) => p.id === selectedProvider)
    ?.models.find((m) => m.id === selectedModel)?.name;

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-black/60 hover:bg-emerald-900/20 border border-emerald-900/50 rounded-lg px-3 py-2 text-xs text-emerald-100 transition-all shadow-sm focus:ring-2 ring-emerald-500/50 uppercase font-mono tracking-wider"
      >
        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-semibold">{currentProviderName}</span>
        <span className="text-emerald-800">/</span>
        <span className="text-emerald-400/80">{currentModelName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 ml-1 text-emerald-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            style={{ zIndex: 9999 }}
            className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-[85vw] sm:w-72 bg-black/95 backdrop-blur-xl border border-emerald-900/50 rounded-xl shadow-2xl overflow-hidden divide-y divide-emerald-900/30"
          >
            {providers.map((provider) => (
              <div key={provider.id} className="p-2">
                <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-600/70">
                  {provider.name}
                </div>
                {provider.models.map((model) => {
                  const isSelected =
                    selectedProvider === provider.id &&
                    selectedModel === model.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedProvider(provider.id);
                        setSelectedModel(model.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono tracking-wide flex items-center justify-between transition-colors ${isSelected ? "bg-emerald-500/10 text-emerald-300" : "text-emerald-100/50 hover:bg-emerald-900/20 hover:text-emerald-100"}`}
                    >
                      {model.name}
                      {isSelected && (
                        <Check className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
