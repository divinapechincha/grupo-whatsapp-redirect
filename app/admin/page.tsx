import { cookies } from "next/headers";
import { getStats } from "@/lib/supabase";
import { tokenFor } from "@/lib/auth";
import { login, logout } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Painel · Divina Pechincha", robots: { index: false, follow: false } };

type Row = { name: string; views: number; clicks: number };
type Day = { day: string; views: number; clicks: number };

const pct = (a: number, b: number) => (b ? ((a / b) * 100).toFixed(1) + "%" : "–");
const fmt = (n: number) => new Intl.NumberFormat("pt-BR").format(n);

function Table({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section className="adm-card">
      <h2>{title}</h2>
      {rows.length === 0 ? (
        <p className="adm-muted">Sem dados ainda</p>
      ) : (
        <table>
          <thead>
            <tr><th>Nome</th><th>Visitas</th><th>Cliques</th><th>Conv.</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td><td>{fmt(r.views)}</td><td>{fmt(r.clicks)}</td>
                <td>{pct(r.clicks, r.views)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function Chart({ data }: { data: Day[] }) {
  const max = Math.max(1, ...data.map((d) => d.views));
  const w = 100 / data.length;
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="adm-chart" role="img" aria-label="Visitas e cliques por dia">
      {data.map((d, i) => (
        <g key={d.day}>
          <title>{`${d.day.split("-").reverse().slice(0, 2).join("/")}: ${d.views} visitas, ${d.clicks} cliques`}</title>
          <rect x={i * w + w * 0.1} y={40 - (d.views / max) * 38} width={w * 0.8} height={(d.views / max) * 38} fill="#cbd5e1" />
          <rect x={i * w + w * 0.1} y={40 - (d.clicks / max) * 38} width={w * 0.8} height={(d.clicks / max) * 38} fill="#16a34a" />
        </g>
      ))}
    </svg>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string; dias?: string }>;
}) {
  const sp = await searchParams;
  const pass = process.env.ADMIN_PASSWORD;
  const authed = !!pass && (await cookies()).get("admin")?.value === tokenFor(pass);

  if (!authed) {
    return (
      <main className="adm">
        <form action={login} className="adm-card adm-login">
          <h1>Painel</h1>
          {!pass && <p className="adm-err">Defina ADMIN_PASSWORD nas variáveis de ambiente.</p>}
          {sp.erro && <p className="adm-err">Senha incorreta.</p>}
          <input type="password" name="password" placeholder="Senha" autoFocus required />
          <button type="submit">Entrar</button>
        </form>
        <Styles />
      </main>
    );
  }

  const days = [7, 30, 90].includes(Number(sp.dias)) ? Number(sp.dias) : 30;
  let s;
  let error = "";
  try {
    s = await getStats(days);
  } catch (e) {
    error = e instanceof Error ? e.message : "Erro ao carregar";
  }

  return (
    <main className="adm">
      <header className="adm-head">
        <h1>Divina Pechincha · Cliques</h1>
        <nav>
          {[7, 30, 90].map((d) => (
            <a key={d} href={`/admin?dias=${d}`} className={d === days ? "on" : ""}>{d} dias</a>
          ))}
          <form action={logout}><button type="submit" className="link">Sair</button></form>
        </nav>
      </header>

      {error || !s ? (
        <p className="adm-err">{error || "Sem dados"}</p>
      ) : (
        <>
          <div className="adm-kpis">
            <div className="adm-card"><span>Cliques hoje</span><b>{fmt(s.today.clicks)}</b><small>{fmt(s.today.views)} visitas hoje</small></div>
            <div className="adm-card"><span>Cliques ({days}d)</span><b>{fmt(s.totals.clicks)}</b><small>{fmt(s.totals.clickers)} pessoas únicas</small></div>
            <div className="adm-card"><span>Visitas ({days}d)</span><b>{fmt(s.totals.views)}</b><small>{fmt(s.totals.visitors)} pessoas únicas</small></div>
            <div className="adm-card"><span>Taxa de clique</span><b>{pct(s.totals.clicks, s.totals.views)}</b><small>cliques ÷ visitas</small></div>
          </div>

          <section className="adm-card">
            <h2>Por dia <small className="adm-muted">(cinza = visitas, verde = cliques)</small></h2>
            <Chart data={s.daily} />
          </section>

          <div className="adm-grid">
            <Table title="Origem" rows={s.sources} />
            <Table title="Campanhas (utm_campaign)" rows={s.campaigns} />
            <Table title="Dispositivo" rows={s.devices} />
          </div>
        </>
      )}
      <Styles />
    </main>
  );
}

function Styles() {
  return (
    <style>{`
      body{background:#f8fafc!important}
      .adm{max-width:960px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;color:#0f172a;text-align:left;display:block;min-height:100vh}
      .adm h1{font-size:1.25rem;margin:0}
      .adm h2{font-size:1rem;margin:0 0 12px}
      .adm-head{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px}
      .adm-head nav{display:flex;gap:8px;align-items:center}
      .adm-head nav a{padding:6px 12px;border-radius:8px;background:#e2e8f0;color:#0f172a;text-decoration:none;font-size:.875rem}
      .adm-head nav a.on{background:#0f172a;color:#fff}
      .adm-card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:16px}
      .adm-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
      .adm-kpis .adm-card{margin:0;display:flex;flex-direction:column;gap:4px}
      .adm-kpis span{font-size:.8rem;color:#64748b}
      .adm-kpis b{font-size:2rem}
      .adm-kpis small,.adm-muted{color:#64748b;font-weight:400;font-size:.8rem}
      .adm-kpis{margin-bottom:16px}
      .adm-chart{width:100%;height:180px;display:block}
      .adm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
      .adm table{width:100%;border-collapse:collapse;font-size:.875rem}
      .adm th{text-align:left;color:#64748b;font-weight:500}
      .adm th,.adm td{padding:6px 4px;border-bottom:1px solid #f1f5f9}
      .adm td:not(:first-child),.adm th:not(:first-child){text-align:right}
      .adm-login{max-width:320px;margin:20vh auto 0;display:flex;flex-direction:column;gap:12px}
      .adm-login input{padding:10px;border:1px solid #cbd5e1;border-radius:8px;font-size:1rem}
      .adm button{padding:10px;border:0;border-radius:8px;background:#16a34a;color:#fff;font-size:1rem;cursor:pointer}
      .adm button.link{background:none;color:#64748b;padding:6px;font-size:.875rem}
      .adm-err{color:#dc2626;font-size:.875rem}
    `}</style>
  );
}
