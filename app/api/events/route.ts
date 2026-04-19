import { NextResponse } from "next/server";
import { initialEvents } from "../../../data/events";

export async function GET() {
  return NextResponse.json({ events: initialEvents });
}
