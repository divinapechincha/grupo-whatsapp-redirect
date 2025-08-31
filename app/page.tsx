'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

// Declaração do dataLayer para TypeScript
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
      // Android: usar link com intent
      setLinkWhatsApp(
        "intent://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF#Intent;scheme=https;package=com.whatsapp;end"
      );
    } else {
      // iOS e outros: link normal
      setLinkWhatsApp("https://chat.whatsapp.com/KFQMgFZ6ZOmK9rXkCcdpFF");
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Envia evento para o GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'entrar_grupo_whatsapp',
      event_category: 'engajamento',
      event_label: 'botao',
    });

    // Atraso opcional de 300ms para garantir envio do evento antes do redirecionamento
    e.preventDefault();
    setTimeout(() => {
      window.location.href = linkWhatsApp;
    }, 300);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#ffdc46",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 28, width: 120, height: 120 }}>
        <Image
          src="/logo.png"
          alt="Logo Divina Pechincha"
          width={120}
          height={120}
          priority
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            borderRadius: 16,
            background: "#fff",
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.04)"
          }}
        />
      </div>

      {/* Headline */}
      <h1 style={{
        color: "#000000",
        textAlign: "center",
        fontWeight: 700,
        fontSize: "2rem",
        maxWidth: 330,
        lineHeight: 1.15,
        marginBottom: 36,
        letterSpacing: ".03em"
      }}>
        PAGAR CARO NUNCA MAIS!<br />
        NÓS TEMOS AS MELHORES OFERTAS DA INTERNET!
      </h1>

      {/* Botão */}
      <a
        href={linkWhatsApp}
        rel="noopener noreferrer"
        onClick={handleClick}
        style={{
          padding: "18px 32px",
          background: "#1f2468",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.13)",
          fontSize: "1.13rem",
          fontWeight: 700,
          textDecoration: "none",
          letterSpacing: 1,
          transition: "background 0.2s",
          marginBottom: 20,
          width: "90vw",
          maxWidth: 350,
          textAlign: "center",
          display: "inline-block",
        }}
      >
        👉 Acessar grupo de ofertas VIP
      </a>
    </main>
  );
}
