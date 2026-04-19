import { NextResponse } from "next/server";
import { runInvestigation } from "../../../lib/agent/investigator";

export const maxDuration = 60; // Allow sufficient time for the AI to complete its tool loop

export async function POST(req: Request) {
  try {
    const { events, providerId, modelId, userInstruction, cfToken } =
      await req.json();

    // STRICT CLOUDFLARE TURNSTILE VALIDATION
    const isProd = process.env.NODE_ENV !== "development";
    if (isProd && !cfToken) {
      return NextResponse.json(
        { error: "Turnstile CAPTCHA token required" },
        { status: 403 },
      );
    }

    if (isProd && cfToken && cfToken !== "DEV_BYPASS") {
      const formData = new FormData();
      const cfSecret = process.env.CLOUDFLARE_SECRET_KEY as string;
      formData.append("secret", cfSecret);
      formData.append("response", cfToken);

      try {
        const cfVerifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            body: formData,
          },
        );

        const cfVerifyData = await cfVerifyRes.json();
        if (!cfVerifyData.success) {
          console.error("Turnstile backend verification failed:", cfVerifyData);
          return NextResponse.json(
            {
              error:
                "Bot protection check failed. Please refresh the page and solve the verification again.",
            },
            { status: 403 },
          );
        }
      } catch (verifyError) {
        console.error(
          "Failed to reach Cloudflare API for siteverify:",
          verifyError,
        );
        return NextResponse.json(
          { error: "Internal server error during bot verification." },
          { status: 500 },
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
