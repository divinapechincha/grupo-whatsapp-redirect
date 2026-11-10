import Dove from "./dove";
import CtaGrupo from "./cta-grupo";
import Contador from "./contador";
import Interacoes from "./interacoes";
import { IconInstagram, IconPlay, IconTelegram, IconTikTok, IconWhatsApp } from "./icons";

const CHANNELS = [
  {
    id: "canal_whatsapp",
    name: "Canal no WhatsApp",
    hint: "Só as ofertas",
    href: "https://whatsapp.com/channel/0029VbE13978vd1XB19SyB3I",
    icon: <IconWhatsApp />,
  },
  {
    id: "canal_telegram",
    name: "Canal no Telegram",
    hint: "@divinapechincha2",
    href: "https://t.me/divinapechincha2",
    icon: <IconTelegram />,
  },
  {
    id: "instagram",
    name: "Instagram",
    hint: "Stories de ofertas",
    href: "https://www.instagram.com/divina.pechincha",
    icon: <IconInstagram />,
  },
  {
    id: "tiktok",
    name: "TikTok",
    hint: "@divinapechincha2",
    href: "https://www.tiktok.com/@divinapechincha2",
    icon: <IconTikTok />,
  },
];

const RADIO_URL = "https://divina-fm.stable-llama-0387.chatgpt.site/";

export default function Page() {
  return (
    <main className="stage">
      <Interacoes />

      {/* Zona da marca */}
      <section className="brand-zone">
        <div className="brand-inner">
          <div className="dove-wrap" data-parallax>
            <span className="dove-halo" aria-hidden />
            <div className="dove-float">
              <Dove />
            </div>
            <span className="dove-shadow" aria-hidden />
          </div>

          <h1 className="wordmark">
            <span className="mask">
              <span style={{ "--d": "120ms" } as React.CSSProperties}>Divina</span>
            </span>
            <span className="mask">
              <span style={{ "--d": "210ms" } as React.CSSProperties}>Pechincha</span>
            </span>
          </h1>

          <p className="tagline rise" style={{ "--d": "380ms" } as React.CSSProperties}>
            Ofertas que você não encontra sozinho
          </p>

          <div className="rise" style={{ "--d": "480ms" } as React.CSSProperties}>
            <CtaGrupo />
          </div>

          <div className="rise" style={{ "--d": "580ms" } as React.CSSProperties}>
            <Contador />
          </div>
        </div>
      </section>

      {/* Zona dos canais */}
      <section className="sheet" aria-labelledby="canais">
        <div className="sheet-inner">
          <h2 id="canais" className="sheet-title">
            Acompanhe também
          </h2>

          <ul className="rows">
            {CHANNELS.map((c) => (
              <li key={c.id}>
                <a
                  className="row"
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-destino={c.id}
                >
                  <span className="row-icon">{c.icon}</span>
                  <span className="row-name">{c.name}</span>
                  <span className="row-hint">{c.hint}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            className="radio"
            href={RADIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-destino="radio"
          >
            <span className="eq" aria-hidden>
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="radio-text">
              <b>Rádio Divina FM</b>
              <small>Ouça enquanto garimpa</small>
            </span>
            <span className="radio-play" aria-hidden>
              <IconPlay />
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
