'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function Page() {
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
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'entrar_grupo_whatsapp',
      event_category: 'engajamento',
      event_label: 'botao',
    });

    e.preventDefault();
    setTimeout(() => {
      window.location.href = linkWhatsApp;
    }, 300);
  };

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
        <Image
          src="/logo.png"
          alt="Divina Pechincha"
          width={120}
          height={120}
          priority
        />
      </div>

      {/* TEXTO */}
      <h1 className="headline">
        Ofertas que você não encontra sozinho
      </h1>

      <p className="sub">
        Economize todos os dias com promoções reais e atualizadas
      </p>

      {/* BOTÃO */}
      <a
        href={linkWhatsApp}
        rel="noopener noreferrer"
        onClick={handleClick}
        className="cta"
      >
        👉 Quero entrar no grupo VIP
      </a>

      {/* REDES SOCIAIS */}
      <div className="social">
        <p>Siga nossas ofertas 👇</p>

        <div className="icons">
  <a href="https://www.instagram.com/divina.pechincha" target="_blank">
    <svg viewBox="0 0 24 24">
      <path d="M7 2C4 2 2 4 2 7v10c0 3 2 5 5 5h10c3 0 5-2 5-5V7c0-3-2-5-5-5H7zm5 5a5 5 0 110 10 5 5 0 010-10zm6.5-.9a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
    </svg>
  </a>

  <a href="https://www.tiktok.com/@divinapechincha2" target="_blank">
    <svg viewBox="0 0 24 24">
      <path d="M12 2v14a4 4 0 11-4-4h1.5a2.5 2.5 0 102.5 2.5V6a6 6 0 004 2V5a4 4 0 01-4-3z"/>
    </svg>
  </a>
</div>

      {/* PROVA SOCIAL */}
      <p className="proof">
        +10.000 pessoas economizando 💰
      </p>

    </main>
  );
}
