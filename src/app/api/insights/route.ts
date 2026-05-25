import { NextResponse } from "next/server";
import { z } from "zod";
import { sunSignFor } from "@/lib/astrology";

export const runtime = "nodejs";

const Query = z.object({
  month: z.coerce.number().int().min(1).max(12),
  day: z.coerce.number().int().min(1).max(31),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = Query.safeParse({
    month: url.searchParams.get("month"),
    day: url.searchParams.get("day"),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Provide ?month=1-12&day=1-31" }, { status: 400 });
  }

  const profile = sunSignFor(parsed.data.month, parsed.data.day);
  if (!profile) {
    return NextResponse.json({ error: "Could not resolve sign." }, { status: 422 });
  }
  return NextResponse.json(profile);
}
