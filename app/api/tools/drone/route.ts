import { NextResponse } from "next/server";
import { getDroneLogs } from "../../../../lib/tools";

export async function POST(req: Request) {
  const { area } = await req.json();
  
  if (!area) {
     return NextResponse.json({ error: "Area is required" }, { status: 400 });
  }
  
  const logs = await getDroneLogs(area);
  return NextResponse.json({ logs });
}
