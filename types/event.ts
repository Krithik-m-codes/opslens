export type EventType = "fence" | "vehicle" | "badge" | "drone" | "sensor";

export type Event = {
  id: string;
  type: EventType;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  timestamp: string;
  metadata?: Record<string, any>;
};

export type InvestigationStep = {
  thought: string;
  tool: string | null;
  input: any;
  result?: any;
};

export type AgentSummary = {
  steps: InvestigationStep[];
  summary: string;
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  followUp: string[];
};
