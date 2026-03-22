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
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>

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
          <a href="https://instagram.com" target="_blank">📸</a>
          <a href="https://tiktok.com" target="_blank">🎵</a>
        </div>
      </div>

      {/* PROVA SOCIAL */}
      <p className="proof">
        +10.000 pessoas economizando 💰
      </p>

    </main>
  );
}
