import { NextResponse } from "next/server";
import { simulateDroneCheck } from "../../../../lib/tools";

export async function POST(req: Request) {
  const { area } = await req.json();
  
  if (!area) {
     return NextResponse.json({ error: "Area is required" }, { status: 400 });
  }
  
  const simulation = await simulateDroneCheck(area);
  return NextResponse.json({ simulation });
}
