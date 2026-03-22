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
    }, 2800);

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

  // 🎬 INTRO
  if (showIntro) {
    return (
      <main className="intro">
        <div className="vignette"></div>

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

  // 🚀 LANDING
  return (
    <main className="container">

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
        👉 Quero entrar no grupo VIP
      </a>

      {/* REDES */}
      <div className="social">
        <p>Veja as ofertas ao vivo 👇</p>

        <div className="icons">

          {/* INSTAGRAM */}
          <a href="https://www.instagram.com/divina.pechincha" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* TIKTOK */}
          <a href="https://www.tiktok.com/@divinapechincha2" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 448 512">
              <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.32c7.87 33.32 31.27 60.33 62.11 74.27a121.14 121.14 0 0 0 58.8 15.32Z"/>
            </svg>
          </a>

        </div>
      </div>

      {/* PROVA SOCIAL */}
      <p className="proof">
        +10.000 pessoas economizando 💰
      </p>

    </main>
  );
}
