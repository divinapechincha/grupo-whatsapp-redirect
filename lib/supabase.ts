// Acesso ao Supabase via REST (sem dependências extras). Só usar no servidor.
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

function headers() {
  return {
    apikey: key!,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export async function insertEvent(row: Record<string, unknown>) {
  if (!url || !key) return;
  await fetch(`${url}/rest/v1/link_events`, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
}

export async function getStats(days: number) {
  if (!url || !key) throw new Error("Supabase não configurado");
  const res = await fetch(`${url}/rest/v1/rpc/get_link_stats`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ p_days: days }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
