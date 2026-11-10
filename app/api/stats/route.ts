import { NextResponse } from "next/server";
import { getStats } from "@/lib/supabase";

export const runtime = "nodejs";

const DAYS = 7;

// Número público e agregado para a página inicial:
// pessoas diferentes que clicaram em "Entrar no grupo" nos últimos 7 dias.
export async function GET() {
  try {
    const s = await getStats(DAYS);
    const people = Number(s?.totals?.clickers) || 0;
    return NextResponse.json(
      { people, days: DAYS },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json(
      { people: 0, days: DAYS },
      { headers: { "Cache-Control": "public, s-maxage=60" } }
    );
  }
}
