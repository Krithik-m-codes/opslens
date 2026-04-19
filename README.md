# 🚁 OpsLens 6:10 Assistant

> _It is 6:10 AM at Ridgeway Site. You have less than two hours before the morning review. What happened last night?_

**OpsLens** is an AI-first intelligence product built for operations leads to make sense of overnight activity at large industrial facilities. Instead of flooding users with raw logs or generic dashboards, OpsLens uses an autonomous AI agent to investigate alerts, dispatch simulated drones, read security logs, and stitch together a cohesive morning briefing.

## ✨ Features

- 🧠 **AI-First Investigation Workflow**: An autonomous agent that actively calls tools to gather context before presenting a conclusion.
- 🗺️ **Spatial Awareness**: Interactive timeline and map interface designed for split-second situational awareness.
- 🛩️ **Drone Simulation Integration**: The AI can dynamically dispatch drones and read simulated live-feed logs to resolve uncertainties.
- 🤝 **Human-in-the-Loop Review**: The operator handles the final review. Reject, approve, or provide **custom text refinement instructions** back to the AI to dig deeper.
- ⚡ **Next-Gen Stack**: Built on the bleeding edge using **Next.js 16** with **Tailwind CSS v4**.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) \*
- **AI Orchestration**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Models Supported**: Nvidia (Llama 3.1 405b), Google (Gemini 1.5 Pro)
- **Icons**: [Lucide React](https://lucide.dev/)

> **_Architectural Note on Next.js 16 & Tailwind v4_**: _This project intentionally adopts Next.js 16 and Tailwind v4. As a result of this modern stack, there is no traditional `tailwind.config.ts` required for styling configuration, and we use a Proxy file approach rather than standard Next.js Middleware for request interception._

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-repo/opslens.git
cd opslens
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root of your project and add your API keys:

```env
NVIDIA_API_KEY=your_nvidia_nim_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the 6:10 Assistant in action.

## 🕵️ How the AI Works

Unlike standard chat interfaces, OpsLens employs an **Agentic Loop** using standard SDKs rather than heavy frameworks like LangChain/LangGraph.

1. **Context Ingestion**: The agent is fed the initial messy events from the night.
2. **Tool Calling**: The agent decides which tools to call. Available tools include:
   - `getEventsByLocation`: Query events by string matching.
   - `getNearbyEvents`: Discover correlated events geographically.
   - `getDroneLogs`: Fetch past thermal/optical drone records.
   - `simulateDroneCheck`: Dispatch a live simulated drone to an area of interest.
3. **Synthesis**: The agent runs up to 4 iterations, checking logs and validating assumptions.
4. **Conclusion**: It surfaces an actionable `AgentSummary` detailing the risk level, follow-up actions, and its general confidence level.

## 🎯 The Philosophy

- _"We care less about polished UI and more about how you design systems, use AI meaningfully, and make product decisions."_
- Humans stay in control. AI does the heavy lifting of correlation.
- Depth matters more than breadth.

---

Built for the **Skylark Drones** Founding Full Stack Engineer Assignment.
