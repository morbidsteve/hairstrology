import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

// Force the node runtime — Prisma needs it.
export const runtime = "nodejs";

const Body = z.object({
  email: z.string().email("Please enter a real email."),
  name: z.string().trim().max(120).optional().nullable(),
  role: z.string().trim().max(40).optional().nullable(),
  yearsBehindChair: z.coerce.number().int().min(0).max(80).optional().nullable(),
  zip: z.string().trim().max(20).optional().nullable(),
  source: z.string().trim().max(80).optional().nullable(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const entry = await prisma.waitlistEntry.upsert({
      where: { email: data.email.toLowerCase() },
      update: {
        name: data.name ?? undefined,
        role: data.role ?? undefined,
        yearsBehindChair: data.yearsBehindChair ?? undefined,
        zip: data.zip ?? undefined,
        source: data.source ?? undefined,
      },
      create: {
        email: data.email.toLowerCase(),
        name: data.name ?? undefined,
        role: data.role ?? undefined,
        yearsBehindChair: data.yearsBehindChair ?? undefined,
        zip: data.zip ?? undefined,
        source: data.source ?? undefined,
      },
    });

    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("[waitlist] failed:", err);
    return NextResponse.json(
      { error: "Could not save your entry. Try again in a moment." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Quick count for ops checks; nothing sensitive.
  try {
    const count = await prisma.waitlistEntry.count();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0, db: "unavailable" }, { status: 503 });
  }
}
