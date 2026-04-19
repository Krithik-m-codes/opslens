import { NextResponse } from "next/server";
import { runInvestigation } from "../../../lib/agent/investigator";

export async function POST(req: Request) {
  try {
    const { events, providerId, modelId, userInstruction } = await req.json();

    // console.log("Received investigation request with events:", events);
    console.log("Using provider:", providerId, "and model:", modelId);

    if (!events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: "Events array required" },
        { status: 400 },
      );
    }

    const summary = await runInvestigation(
      events,
      providerId,
      modelId,
      userInstruction,
    );
    return NextResponse.json(summary);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to run agent investigation" },
      { status: 500 },
    );
  }
}
