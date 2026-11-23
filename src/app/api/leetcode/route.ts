import { NextResponse } from "next/server";
import { fetchLeetCodeActivity } from "@/lib/leetcode";

// Static export: snapshot generated at build time (refreshed by the scheduled Pages workflow)
export const dynamic = "force-static";

export async function GET() {
  const payload = await fetchLeetCodeActivity();
  return NextResponse.json(payload);
}
