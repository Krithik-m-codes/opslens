import { NextResponse } from "next/server";
import { runInvestigation } from "../../../lib/agent/investigator";

export async function POST(req: Request) {
  try {
    const { events, providerId, modelId, userInstruction, cfToken } =
      await req.json();

    // STRICT CLOUDFLARE TURNSTILE VALIDATION
    if (!cfToken && process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "Turnstile CAPTCHA token required" },
        { status: 403 },
      );
    }

    if (cfToken && process.env.NODE_ENV !== "development") {
      const formData = new FormData();
      formData.append("secret", process.env.CLOUDFLARE_SECRET_KEY as string);
      formData.append("response", cfToken);

      const cfVerifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: formData,
        },
      );

      const cfVerifyData = await cfVerifyRes.json();
      if (!cfVerifyData.success) {
        console.error("Turnstile failed:", cfVerifyData);
        return NextResponse.json(
          { error: "Invalid CAPTCHA token. Please reload and try again." },
          { status: 403 },
        );
      }
    }

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
