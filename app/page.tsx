'use client';
import { useEffect } from "react";
import Script from "next/script";
import Image from "next/image";

export default function Page() {
  useEffect(() => {
    // Você pode usar este espaço para outros scripts, se quiser
  }, []);

  return (
    <>
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

      <div style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#FFE600",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif"
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 32 }}>
          <Image
            src="/logo.png"
            alt="Logo da sua empresa"
            width={120}
            height={120}
            priority
          />
        </div>

        {/* Headline */}
        <h1 style={{
          color: "#222",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 32,
          maxWidth: 440,
          lineHeight: 1.2,
          marginBottom: 48
        }}>
          PAGAR CARO NUNCA MAIS!<br />
          NÓS TEMOS AS MELHORES OFERTAS DA INTERNET!
        </h1>

        {/* Botão */}
        <a
          href="https://chat.whatsapp.com/EddfpaqyfucGbz1qzIPS2b"
          
          rel="noopener noreferrer"
          style={{
            padding: "20px 48px",
            background: "#25D366",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
            fontSize: 22,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: 1.2,
            transition: "background 0.2s",
            marginBottom: 20
          }}
        >
          👉 Acessar grupo de ofertas VIP
        </a>
      </div>
    </>
  );
}