'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { track } from "@/lib/track";
import Contador from "./contador";

// Mude para true para reativar a animação de abertura
const SHOW_INTRO = false;

const GROUP_URL = "https://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF";
const GROUP_URL_ANDROID =
  "intent://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF#Intent;scheme=https;package=com.whatsapp;end";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

type Channel = {
  id: string;
  name: string;
  hint: string;
  href: string;
  icon: React.ReactNode;
};

const iconProps = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
} as const;

const CHANNELS: Channel[] = [
  {
    id: "canal_whatsapp",
    name: "Canal no WhatsApp",
    hint: "Só as ofertas, sem conversa de grupo",
    href: "https://whatsapp.com/channel/0029VbE13978vd1XB19SyB3I",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 1.8a7.2 7.2 0 1 1-3.7 13.4l-.3-.2-2.4.6.7-2.3-.2-.3A7.2 7.2 0 0 1 12 4.8Zm-2.6 3.4c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.7 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.3Z" />
      </svg>
    ),
  },
  {
    id: "canal_telegram",
    name: "Canal no Telegram",
    hint: "As mesmas ofertas, no Telegram",
    href: "https://t.me/divinapechincha2",
    icon: (
      <svg {...iconProps}>
        <path d="M20.6 4.1 3.3 10.8c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.2c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.1-2 4.4 3.3c.8.4 1.4.2 1.6-.8l2.9-13.7c.3-1.2-.4-1.7-1.3-1.3ZM9 13.4l8.2-5.2c.4-.2.7-.1.4.2l-6.8 6.1-.3 3-1.5-4.1Z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    hint: "Stories de ofertas",
    href: "https://www.instagram.com/divina.pechincha",
    icon: (
      <svg {...iconProps} className="stroke">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" className="dot" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    name: "TikTok",
    hint: "@divinapechincha2",
    href: "https://www.tiktok.com/@divinapechincha2",
    icon: (
      <svg viewBox="0 0 448 512" aria-hidden focusable={false}>
        <path d="M448 209.9a210 210 0 0 1-123-39v178a162.5 162.5 0 1 1-140-161v90a74.6 74.6 0 1 0 52 71V0h88a121 121 0 0 0 2 22c8 33 31 60 62 74a121 121 0 0 0 59 15z" />
      </svg>
    ),
  },
];

const RADIO_URL = "https://divina-fm.stable-llama-0387.chatgpt.site/";

function pushEvent(destino: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "clique_link_divina", destino });
}

export default function Page() {
  const [showIntro, setShowIntro] = useState(SHOW_INTRO);
  const [groupLink, setGroupLink] = useState(GROUP_URL);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) setGroupLink(GROUP_URL_ANDROID);

    track("view");

    if (!SHOW_INTRO) return;
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleGroupClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "entrar_grupo_whatsapp" });

    track("click");

    e.preventDefault();
    setTimeout(() => {
      window.location.href = groupLink;
    }, 300);
  };

  if (showIntro) {
    return (
      <main className="intro">
        <div className="intro-content">
          <Image src="/pomba.png" alt="" width={200} height={200} priority unoptimized />
          <h1>Divina Pechincha</h1>
          <p>Ofertas que você não encontra sozinho</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="wrap">
        {/* Apresentação + ação principal */}
        <section className="hero">
          {/* PNG sem recompressão: o amarelo da imagem é idêntico ao do fundo da página */}
          <Image
            src="/pomba.png"
            alt=""
            width={320}
            height={320}
            className="dove"
            priority
            unoptimized
          />

          <h1 className="brand">Divina Pechincha</h1>
          <p className="headline">Ofertas que você não encontra sozinho</p>

          <a href={groupLink} onClick={handleGroupClick} className="cta">
            <svg viewBox="0 0 24 24" aria-hidden focusable={false}>
              <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 1.8a7.2 7.2 0 1 1-3.7 13.4l-.3-.2-2.4.6.7-2.3-.2-.3A7.2 7.2 0 0 1 12 4.8Zm-2.6 3.4c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.7 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.3Z" />
            </svg>
            Entrar no grupo do WhatsApp
          </a>

          <Contador />
        </section>

        {/* Outros canais */}
        <section className="channels" aria-labelledby="canais-titulo">
          <h2 id="canais-titulo">Acompanhe também</h2>

          <ul className="channel-list">
            {CHANNELS.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel"
                  onClick={() => pushEvent(c.id)}
                >
                  <span className="channel-icon">{c.icon}</span>
                  <span className="channel-text">
                    <b>{c.name}</b>
                    <small>{c.hint}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={RADIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="radio"
            onClick={() => pushEvent("radio")}
          >
            <span className="radio-icon">
              <svg viewBox="0 0 24 24" aria-hidden focusable={false}>
                <path d="M4 9a2 2 0 0 1 1.4-1.9L18 2.6l.7 1.9L9.5 7.8H20a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Zm0 2v8h16v-8H4Zm4 1.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm6 .3h4v1.6h-4v-1.6Zm0 3h4v1.6h-4v-1.6Z" />
              </svg>
            </span>
            <span className="channel-text">
              <b>Rádio Divina FM</b>
              <small>Ouça enquanto garimpa</small>
            </span>
            <span className="radio-play" aria-hidden>
              <svg viewBox="0 0 24 24" focusable={false}>
                <path d="M8 5.5v13a1 1 0 0 0 1.5.9l10-6.5a1 1 0 0 0 0-1.8l-10-6.5A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
          </a>
        </section>
      </div>
    </main>
  );
}
