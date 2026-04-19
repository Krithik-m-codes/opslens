import { NextResponse } from "next/server";
import { getEventsByLocation, getNearbyEvents } from "../../../../lib/tools";

export async function POST(req: Request) {
  const { action, location, eventId, timeRange } = await req.json();
  
  if (action === "getNearbyEvents" && eventId) {
    const events = await getNearbyEvents(eventId);
    return NextResponse.json({ events });
  }
  
  if (action === "getEventsByLocation" && location) {
    const events = await getEventsByLocation(location, timeRange);
    return NextResponse.json({ events });
  }

  return NextResponse.json({ error: "Invalid action or missing parameters" }, { status: 400 });
}
