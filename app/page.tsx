'use client';
import { useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { League_Spartan } from "next/font/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

export default function Page() {
  return (
    <>
      {/* Google Fonts fallback (para garantir em todos navegadores) */}
      <link
        href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Google Analytics GA4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3Z83EGB4VK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3Z83EGB4VK');
        `}
      </Script>

      {/* Meta Pixel (Facebook) */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1772846193267355'); 
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{display:"none"}} src="https://www.facebook.com/tr?id=1772846193267355&ev=PageView&noscript=1" />
      </noscript>

      <div
        className={leagueSpartan.className}
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: "#FFE600",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'League Spartan', sans-serif",
          padding: "0",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 28, width: 120, height: 120 }}>
          {/* 
            Coloque sua logo em public/logo.png para funcionar.
            Se estiver em outra pasta ou url, troque o src abaixo!
            O width/height controla o tamanho da logo no layout.
          */}
          <Image
            src="/logo.png"
            alt="Logo da sua empresa"
            width={120}
            height={120}
            priority
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
              borderRadius: 16,
              background: "#fff",
              boxShadow: "0 2px 16px 0 rgba(0,0,0,0.04)"
            }}
            // fallback inline caso imagem não carregue
            onError={(e) => {
              // Substitui por fallback em SVG ou texto
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='120' height='120' fill='%23ccc'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23333' font-size='18'>Logo</text></svg>";
            }}
          />
        </div>

        {/* Headline */}
        <h1 style={{
          color: "#222",
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
          href="https://chat.whatsapp.com/EddfpaqyfucGbz1qzIPS2b"
          
          rel="noopener noreferrer"
          style={{
            padding: "18px 32px",
            background: "#25D366",
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
            textAlign: "center"
          }}
        >
          👉 Acessar grupo de ofertas VIP
        </a>
      </div>

      {/* Responsividade extra para headline/button (exemplo rápido com global CSS) */}
      <style jsx global>{`
        @media (min-width: 450px) {
          h1 {
            font-size: 2.2rem !important;
            max-width: 420px !important;
          }
          a {
            font-size: 1.3rem !important;
            max-width: 320px !important;
          }
        }
      `}</style>
    </>
  );
}