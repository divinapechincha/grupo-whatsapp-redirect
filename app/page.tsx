'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);
  const [linkWhatsApp, setLinkWhatsApp] = useState(
    "https://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF"
  );

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      setLinkWhatsApp(
        "intent://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF#Intent;scheme=https;package=com.whatsapp;end"
      );
    }

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'entrar_grupo_whatsapp',
    });

    e.preventDefault();
    setTimeout(() => {
      window.location.href = linkWhatsApp;
    }, 300);
  };

  // INTRO
  if (showIntro) {
    return (
      <main className="intro">

        <div className="intro-cloud intro-cloud1">
          <svg viewBox="0 0 200 60">
            <path d="M20 40 Q40 10 80 30 T140 30 Q180 10 180 40 Q180 60 140 60 H40 Q20 60 20 40 Z" />
          </svg>
        </div>

        <div className="intro-cloud intro-cloud2">
          <svg viewBox="0 0 200 60">
            <path d="M20 40 Q40 10 80 30 T140 30 Q180 10 180 40 Q180 60 140 60 H40 Q20 60 20 40 Z" />
          </svg>
        </div>

        <div className="intro-content">
          <div className="intro-logo">
            <Image src="/logo.png" alt="logo" width={120} height={120} priority />
          </div>

          <h1 className="intro-title">DIVINA PECHINCHA</h1>

          <p className="intro-sub">
            Ofertas que você não encontra sozinho
          </p>
        </div>
      </main>
    );
  }

  // LANDING
  return (
    <main className="container">

      {/* GLOW (NÃO BLOQUEIA CLIQUE) */}
      <div className="divine-glow"></div>

      {/* NUVENS */}
      <div className="cloud-svg cloud1">
        <svg viewBox="0 0 200 60">
          <path d="M20 40 Q40 10 80 30 T140 30 Q180 10 180 40 Q180 60 140 60 H40 Q20 60 20 40 Z" />
        </svg>
      </div>

      <div className="cloud-svg cloud2">
        <svg viewBox="0 0 200 60">
          <path d="M20 40 Q40 10 80 30 T140 30 Q180 10 180 40 Q180 60 140 60 H40 Q20 60 20 40 Z" />
        </svg>
      </div>

      {/* LOGO */}
      <div className="logo">
        <Image src="/logo.png" alt="logo" width={120} height={120} priority />
      </div>

      {/* TEXTO */}
      <h1 className="headline">
        Ofertas que você não encontra sozinho
      </h1>

      <p className="sub">
        Economize todos os dias com promoções reais
      </p>

      {/* BOTÃO */}
      <a href={linkWhatsApp} onClick={handleClick} className="cta">
        👉 Entrar no grupo e economizar agora
      </a>

      {/* REDES */}
      <div className="social">
        <p>Veja as ofertas ao vivo 👇</p>

        <div className="icons">

          <a href="https://www.instagram.com/divina.pechincha" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17" cy="7" r="1" />
            </svg>
          </a>

          <a href="https://www.tiktok.com/@divinapechincha2" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 448 512">
              <path d="M448 209.9a210 210 0 0 1-123-39v178a162.5 162.5 0 1 1-140-161v90a74.6 74.6 0 1 0 52 71V0h88a121 121 0 0 0 2 22c8 33 31 60 62 74a121 121 0 0 0 59 15z"/>
            </svg>
          </a>

        </div>
      </div>

      <p className="proof">
        +10.000 pessoas economizando 💰
      </p>

    </main>
  );
}
