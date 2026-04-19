import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy checker to be invoked before sensitive routes or layout renders.
 * Ensures the traffic is actually coming through Cloudflare (to utilize their bot/DDoS protection).
 */
export function proxy(req: NextRequest) {
  // Bypass Cloudflare proxy check in local development or default Vercel domains
  if (
    process.env.NODE_ENV === "development" ||
    req.nextUrl.hostname === "localhost" ||
    req.nextUrl.hostname.endsWith(".vercel.app")
  ) {
    const response = NextResponse.next();
    response.headers.set("x-opslens-proxy", "dev-bypassed");
    return response;
  }

  // Cloudflare injects specific headers. If they are missing, it's likely a direct hit by a bot.
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  const cfRay = req.headers.get("cf-ray");

  if (!cfConnectingIp || !cfRay) {
    // If these headers are missing, reject the request
    return new NextResponse(
      JSON.stringify({
        error: "Forbidden",
        message:
          "Direct IP access is not allowed. Please use the official domain to ensure Cloudflare bot protection is active.",
      }),
      {
        status: 403,
        headers: { "content-type": "application/json" },
      },
    );
  }

  // Request is verified as coming through Cloudflare. Proceed.
  const response = NextResponse.next();
  response.headers.set("x-opslens-proxy", "verified");
  return response;
}
