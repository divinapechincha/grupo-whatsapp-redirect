import { NextRequest, NextResponse } from "next/server";
import { insertEvent } from "@/lib/supabase";

export const runtime = "nodejs";

const BOT = /bot|crawl|spider|facebookexternalhit|preview|slurp|headless|lighthouse/i;

function device(ua: string) {
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  return "Desktop";
}

function clean(v: unknown, max = 200) {
  return typeof v === "string" && v ? v.slice(0, max) : null;
}

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get("user-agent") || "";
    if (BOT.test(ua)) return NextResponse.json({ ok: true, skipped: true });

    const b = await req.json();
    if (b.event !== "view" && b.event !== "click") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    let referrer = clean(b.referrer);
    try {
      if (referrer) referrer = new URL(referrer).hostname;
    } catch {}

    await insertEvent({
      event: b.event,
      visitor_id: clean(b.visitorId, 64),
      source: clean(b.source, 80),
      medium: clean(b.medium, 80),
      campaign: clean(b.campaign, 120),
      referrer,
      device: device(ua),
      country: req.headers.get("x-vercel-ip-country"),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
