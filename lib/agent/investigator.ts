import {
  getEventsByLocation,
  getNearbyEvents,
  getDroneLogs,
  simulateDroneCheck,
} from "../tools";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { Event, InvestigationStep, AgentSummary } from "../../types/event";

const systemPrompt = `You are OpsLens, an AI-first intelligence investigator for Ridgeway Site (a large industrial facility).
You are analyzing overnight events to help the operations lead understand what happened.
Your goal is to investigate events, call tools to gather context, and iteratively form a clear conclusion.

You MUST ALWAYs output YOUR ENTIRE RESPONSE as a valid JSON object matching this schema. NO markdown wrapping, NO backticks, ONLY pure raw JSON:
{
  "thought": "Your reasoning for the next step or final conclusion.",
  "tool": "getEventsByLocation" | "getNearbyEvents" | "getDroneLogs" | "simulateDroneCheck" | "null",
  "input": { ... args ... } | null,
  "finalSummary": {
    "summary": "Final investigation conclusion",
    "riskLevel": "Low" | "Medium" | "High",
    "followUp": ["Review cameras", "Check sensor X"],
    "confidence": 0.8
  } | null
}

Available tools:
- "getEventsByLocation": find events in a specific location (args: { location: string })
- "getNearbyEvents": find events near a specific event ID (args: { eventId: string })
- "getDroneLogs": get drone patrol logs for an area (args: { area: string })
- "simulateDroneCheck": if needed to dispatch a drone now (args: { area: string })

If you have enough information, set tool to "null" and populate the finalSummary object. Otherwise, provide the tool name and input.`;

// Create Nvidia provider using OpenAI compatible endpoint
const nvidia = createOpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_API_KEY,
});

export async function runInvestigation(
  initialEvents: Event[],
  providerId: string = "nvidia",
  modelId: string = "meta/llama-3.1-405b-instruct",
  userInstruction?: string,
): Promise<AgentSummary> {
  let model;

  switch (providerId) {
    case "nvidia":
      model = nvidia.chat(modelId);
      break;
    default:
      model = nvidia.chat("meta/llama-3.1-405b-instruct");
  }

  const steps: InvestigationStep[] = [];
  const messages: any[] = [
    {
      role: "user",
      content: `Please investigate the following initial events:\n${JSON.stringify(initialEvents, null, 2)}\n\n${userInstruction ? `Additional instructions from user: ${userInstruction}\n\n` : ""}What is your next step?`,
    },
  ];

  // Iterative loop (max 4 times)
  for (let i = 0; i < 4; i++) {
    let object;
    try {
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), 55000); // Increased timeout to 55s

      const { text } = await generateText({
        model: model,
        system: systemPrompt,
        messages,
        abortSignal: abortController.signal,
      });
      clearTimeout(timeoutId);

      // Clean up markdown wrapping aggressively
      let cln = text
        .replace(/```json/gi, "")
        .replace(/```JSON/gi, "")
        .replace(/```/g, "")
        .trim();

      // If the LLM dumped conversational text before or after the JSON, slice to the first { and last }
      const jsonMatch = cln.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cln = jsonMatch[0];
      }

      try {
        object = JSON.parse(cln);
      } catch (parseErr) {
        console.error("Failed to parse JSON. Raw LLM output was:", text);
        throw new Error("Invalid JSON format returned from LLM.");
      }
    } catch (e: any) {
      console.error(
        "Investigation loop failed on iteration",
        i,
        ":",
        e.message || e,
      );
      break;
    }

    messages.push({ role: "assistant", content: JSON.stringify(object) });

    if (object.tool && object.tool !== "null") {
      let result;
      if (object.tool === "getEventsByLocation")
        result = await getEventsByLocation(object.input.location);
      if (object.tool === "getNearbyEvents")
        result = await getNearbyEvents(object.input.eventId);
      if (object.tool === "getDroneLogs")
        result = await getDroneLogs(object.input.area);
      if (object.tool === "simulateDroneCheck")
        result = await simulateDroneCheck(object.input.area);

      steps.push({
        thought: object.thought,
        tool: object.tool,
        input: object.input,
        result,
      });

      messages.push({
        role: "user",
        content: `Action taken: called ${object.tool} with ${JSON.stringify(object.input)}\nResult:\n${JSON.stringify(result, null, 2)}\n\nBased on this, what is your next step?`,
      });
    } else if (object.finalSummary) {
      steps.push({ thought: object.thought, tool: null, input: null });
      return {
        steps,
        summary: object.finalSummary.summary,
        riskLevel: object.finalSummary.riskLevel,
        followUp: object.finalSummary.followUp,
        confidence: object.finalSummary.confidence,
      };
    }
  }

  return {
    steps,
    summary:
      "Investigation reached maximum iterations without falling to a crisp conclusion. We see potential correlated activities. Please review logs manually.",
    riskLevel: "Medium",
    followUp: ["Review cameras manually", "Contact Night Supervisor"],
    confidence: 0.6,
  };
}
